-- Drop dependent tables first (order matters)
DROP TABLE IF EXISTS registration_audit CASCADE;
DROP TABLE IF EXISTS registrations CASCADE;
DROP TABLE IF EXISTS insurance_details CASCADE;
DROP TABLE IF EXISTS medical_history CASCADE;
DROP TABLE IF EXISTS patients CASCADE;

-- Recreate patients table with new columns
CREATE TABLE IF NOT EXISTS patients (
    patient_id BIGINT PRIMARY KEY,
    full_name_en VARCHAR(100) NOT NULL,
    full_name_hi VARCHAR(100),
    dob DATE NOT NULL,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female', 'other', 'prefer_not_to_say')),
    address TEXT NOT NULL,
    city VARCHAR(100),                            -- New: city
    state VARCHAR(50) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',         -- New: country with default
    pincode VARCHAR(6) NOT NULL,
    phone VARCHAR(20),                             -- New: phone number
    email VARCHAR(255),                             -- New: email address
    blood_group VARCHAR(10) CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown')), -- New
    registration_step INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    added_by_doctor_id INTEGER REFERENCES doctors(id) 
);

-- Create indexes (including new columns)
CREATE INDEX IF NOT EXISTS idx_patients_pincode ON patients(pincode);
CREATE INDEX IF NOT EXISTS idx_patients_state ON patients(state);
CREATE INDEX IF NOT EXISTS idx_patients_city ON patients(city);
CREATE INDEX IF NOT EXISTS idx_patients_email ON patients(email);
CREATE INDEX IF NOT EXISTS idx_patients_phone ON patients(phone);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for patients table
CREATE TRIGGER update_patients_updated_at 
    BEFORE UPDATE ON patients 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Medical History table
CREATE TABLE IF NOT EXISTS medical_history (
    id SERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    allergy VARCHAR(100) NOT NULL,
    chronic_condition VARCHAR(100) NOT NULL,
    medications TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_medical_history_patient_id ON medical_history(patient_id);

-- Insurance Details table (abha_id removed as requested)
CREATE TABLE IF NOT EXISTS insurance_details (
    id SERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL UNIQUE,
    insurance_provider VARCHAR(100),
    policy_number VARCHAR(50),
    valid_until DATE,
    group_id VARCHAR(50),
    -- abha_id column removed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_insurance_details_patient_id ON insurance_details(patient_id);
-- Index on abha_id removed

-- Create trigger for insurance_details table
CREATE TRIGGER update_insurance_details_updated_at 
    BEFORE UPDATE ON insurance_details 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL UNIQUE,
    registration_id VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('PENDING', 'ACTIVE', 'INACTIVE', 'SUSPENDED')),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_registrations_patient_id ON registrations(patient_id);
CREATE INDEX IF NOT EXISTS idx_registrations_registration_id ON registrations(registration_id);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);

-- Create function to generate patient ID
CREATE OR REPLACE FUNCTION generate_patient_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.patient_id = CAST(EXTRACT(EPOCH FROM NOW()) * 1000 AS BIGINT) * 10000 + FLOOR(RANDOM() * 10000)::INT;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate patient_id
CREATE TRIGGER generate_patient_id_trigger
    BEFORE INSERT ON patients
    FOR EACH ROW
    WHEN (NEW.patient_id IS NULL)
    EXECUTE FUNCTION generate_patient_id();

-- Create function to generate registration ID
CREATE OR REPLACE FUNCTION generate_registration_id()
RETURNS TRIGGER AS $$
BEGIN
    NEW.registration_id = 'REG-' || UPPER(SUBSTRING(MD5(EXTRACT(EPOCH FROM NOW())::TEXT) FROM 1 FOR 8));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate registration_id
CREATE TRIGGER generate_registration_id_trigger
    BEFORE INSERT ON registrations
    FOR EACH ROW
    WHEN (NEW.registration_id IS NULL)
    EXECUTE FUNCTION generate_registration_id();

-- (Optional) Drop the ABHA ID generation function and trigger if no longer needed anywhere
DROP FUNCTION IF EXISTS generate_abha_id CASCADE;

-- Updated view with new patient columns and without abha_id
CREATE OR REPLACE VIEW registration_details AS
SELECT 
    p.patient_id,
    p.full_name_en,
    p.full_name_hi,
    p.dob,
    p.gender,
    p.address,
    p.city,
    p.state,
    p.country,
    p.pincode,
    p.phone,
    p.email,
    p.blood_group,
    p.registration_step,
    p.created_at,
    p.updated_at,
    i.insurance_provider,
    i.policy_number,
    i.valid_until,
    i.group_id,
    -- abha_id removed from view
    r.registration_id,
    r.status as registration_status,
    r.completed_at
FROM patients p
LEFT JOIN insurance_details i ON p.patient_id = i.patient_id
LEFT JOIN registrations r ON p.patient_id = r.patient_id;









-------------------- login----------------------------------------


-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name_en VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('patient', 'doctor', 'admin', 'pharmacy', 'helpdesk')),
    patient_id VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_patient_id ON users(patient_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for users table
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert test users (password = 'password123')
INSERT INTO users (email, password, full_name_en, role, patient_id) VALUES
('admin@gmail.com', crypt('text123', gen_salt('bf')), 'Admin User', 'admin', NULL),
('patient@gmail.com', crypt('text123', gen_salt('bf')), 'John Doe', 'patient', '17719220477275068'),
('doctor@example.com', crypt('doctor456', gen_salt('bf')), 'Dr. Sarah Smith', 'doctor', NULL),
('pharmacy@gmail.com', crypt('text123', gen_salt('bf')), 'MedPlus Pharmacy', 'pharmacy', NULL),
('helpdesk@hospital.com', crypt('help123', gen_salt('bf')), 'Help Desk Support', 'helpdesk', NULL)
ON CONFLICT (email) DO NOTHING;

-- Verify table was created
\d users

-- Show inserted users
SELECT id, email, full_name_en, role, patient_id, created_at FROM users;







-- ---------------------------------bed configuration-------------------------------------

-- Floors table
CREATE TABLE IF NOT EXISTS floors (
    id SERIAL PRIMARY KEY,
    floor_number INTEGER UNIQUE NOT NULL,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wards table
CREATE TABLE IF NOT EXISTS wards (
    id SERIAL PRIMARY KEY,
    floor_id INTEGER NOT NULL REFERENCES floors(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('General', 'Semi-Special', 'Special', 'VIP', 'ICU', 'Pediatric')),
    patient_category VARCHAR(50) NOT NULL CHECK (patient_category IN ('Male', 'Female', 'Children', 'Mixed')),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    ward_id INTEGER NOT NULL REFERENCES wards(id) ON DELETE CASCADE,
    room_number VARCHAR(50) NOT NULL,
    name VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ward_id, room_number)
);

-- Beds table
CREATE TABLE IF NOT EXISTS beds (
    id SERIAL PRIMARY KEY,
    ward_id INTEGER NOT NULL REFERENCES wards(id) ON DELETE CASCADE,
    room_id INTEGER REFERENCES rooms(id) ON DELETE SET NULL,
    bed_number VARCHAR(50) NOT NULL,
    type VARCHAR(50) NOT NULL,
    floor_number INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (status IN ('available', 'occupied', 'cleaning', 'maintenance', 'reserved')),
    patient_category VARCHAR(50) NOT NULL,
    attributes JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(ward_id, bed_number)
);

-- Create indexes
CREATE INDEX idx_wards_floor_id ON wards(floor_id);
CREATE INDEX idx_rooms_ward_id ON rooms(ward_id);
CREATE INDEX idx_beds_ward_id ON beds(ward_id);
CREATE INDEX idx_beds_room_id ON beds(room_id);
CREATE INDEX idx_beds_status ON beds(status);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_floors_updated_at BEFORE UPDATE ON floors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wards_updated_at BEFORE UPDATE ON wards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_beds_updated_at BEFORE UPDATE ON beds FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();





-- -----------------------------------Doctors table.  ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS doctors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    license_number VARCHAR(100) UNIQUE NOT NULL,
    date_of_birth DATE,
    date_joined DATE NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100),
    qualifications JSONB DEFAULT '[]'::jsonb,
    experience INTEGER,
    bio TEXT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'on-leave', 'inactive')),
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_doctors_email ON doctors(email);
CREATE INDEX IF NOT EXISTS idx_doctors_license ON doctors(license_number);
CREATE INDEX IF NOT EXISTS idx_doctors_specialty ON doctors(specialty);
CREATE INDEX IF NOT EXISTS idx_doctors_department ON doctors(department);
CREATE INDEX IF NOT EXISTS idx_doctors_status ON doctors(status);

-- Specialties table (for dropdown options)
CREATE TABLE IF NOT EXISTS specialties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default specialties
INSERT INTO specialties (name, department) VALUES
('Cardiology', 'Cardiology Department'),
('Neurology', 'Neurology Department'),
('Pediatrics', 'Pediatrics Department'),
('Oncology', 'Oncology Center'),
('Orthopedics', 'Orthopedics Center'),
('Dermatology', 'Diagnostics'),
('Psychiatry', 'Psychiatry Department'),
('Radiology', 'Diagnostics'),
('Surgery', 'Surgery Department'),
('Internal Medicine', 'Internal Medicine Department'),
('Emergency Medicine', 'Emergency Department'),
('Anesthesiology', 'Surgery Department'),
('Pathology', 'Diagnostics'),
('Ophthalmology', 'Ophthalmology Department')
ON CONFLICT (name) DO NOTHING;

-- Insert default departments
INSERT INTO departments (name) VALUES
('Cardiology Department'),
('Neurology Department'),
('Pediatrics Department'),
('Surgery Department'),
('Emergency Department'),
('Intensive Care Unit'),
('Diagnostics'),
('Oncology Center'),
('Orthopedics Center'),
('Psychiatry Department'),
('Ophthalmology Department'),
('Internal Medicine Department')
ON CONFLICT (name) DO NOTHING;

-- Create updated_at trigger
CREATE TRIGGER update_doctors_updated_at 
    BEFORE UPDATE ON doctors 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();



-- -------------------pharmacy---------------------------

CREATE TABLE IF NOT EXISTS medicines (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  generic_name VARCHAR(255),
  brand_name VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  purchase_price DECIMAL(10,2) NOT NULL,
  selling_price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2),
  tax_percent DECIMAL(5,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);







-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  gst_no VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchases table (header)
CREATE TABLE IF NOT EXISTS purchases (
  id SERIAL PRIMARY KEY,
  supplier_id INTEGER REFERENCES suppliers(id),
  invoice_no VARCHAR(100) UNIQUE NOT NULL,
  invoice_date DATE NOT NULL,
  gst_no VARCHAR(50),
  payment_mode VARCHAR(50),
  subtotal DECIMAL(10,2) NOT NULL,
  tax_total DECIMAL(10,2) NOT NULL,
  grand_total DECIMAL(10,2) NOT NULL,
  is_delivered BOOLEAN DEFAULT false,      
  stock_updated BOOLEAN DEFAULT false, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase items (line items)
CREATE TABLE IF NOT EXISTS purchase_items (
  id SERIAL PRIMARY KEY,
  purchase_id INTEGER REFERENCES purchases(id) ON DELETE CASCADE,
  medicine_id INTEGER REFERENCES medicines(id),
  batch_no VARCHAR(100) NOT NULL,
  expiry_date DATE NOT NULL,
  quantity INTEGER NOT NULL,
  purchase_price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2) NOT NULL,
  tax_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stock table (current inventory per medicine/batch)
CREATE TABLE IF NOT EXISTS stock (
  id SERIAL PRIMARY KEY,
  medicine_id INTEGER REFERENCES medicines(id),
  batch_no VARCHAR(100) NOT NULL,
  expiry_date DATE NOT NULL,
  quantity INTEGER NOT NULL,
  purchase_price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2) NOT NULL,
  delivered_manual INTEGER,  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(medicine_id, batch_no)
);


-- Sales table (header)
CREATE TABLE IF NOT EXISTS sales (
  id SERIAL PRIMARY KEY,
  patient_id BIGINT REFERENCES patients(patient_id), -- nullable for walk‑ins
  walkin_name VARCHAR(255),
  doctor_name VARCHAR(255), 
  walkin_phone VARCHAR(50),
  walkin_address TEXT,
  sale_date DATE NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_total DECIMAL(10,2) NOT NULL,
  discount_total DECIMAL(10,2) DEFAULT 0,
  grand_total DECIMAL(10,2) NOT NULL,
  payment_mode VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sale items (line items)
CREATE TABLE IF NOT EXISTS sale_items (
  id SERIAL PRIMARY KEY,
  sale_id INTEGER REFERENCES sales(id) ON DELETE CASCADE,
  medicine_id INTEGER REFERENCES medicines(id),
  batch_no VARCHAR(100) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  tax_percent DECIMAL(5,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




-- Prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id SERIAL PRIMARY KEY,
  patient_id BIGINT REFERENCES patients(patient_id),
  doctor_id INTEGER REFERENCES doctors(id),
  consultation_id VARCHAR(50) UNIQUE NOT NULL,
  prescription_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'dispensed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prescription items
CREATE TABLE IF NOT EXISTS prescription_items (
  id SERIAL PRIMARY KEY,
  prescription_id INTEGER REFERENCES prescriptions(id) ON DELETE CASCADE,
  medicine_id INTEGER REFERENCES medicines(id),
  prescribed_qty INTEGER NOT NULL,
  dispensed_qty INTEGER DEFAULT 0,
  instructions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX idx_prescriptions_doctor_id ON prescriptions(doctor_id);
CREATE INDEX idx_prescriptions_status ON prescriptions(status);
CREATE INDEX idx_prescription_items_prescription_id ON prescription_items(prescription_id);
CREATE INDEX idx_prescription_items_medicine_id ON prescription_items(medicine_id);

-- Add prescription_id to sales (optional, for linking)
ALTER TABLE sales ADD COLUMN prescription_id INTEGER REFERENCES prescriptions(id);




-- ----------------------stock adjustment------------------------------

-- Table to record stock adjustments
CREATE TABLE IF NOT EXISTS stock_adjustments (
    id SERIAL PRIMARY KEY,
    medicine_id INTEGER NOT NULL REFERENCES medicines(id),
    batch_no VARCHAR(100) NOT NULL,
    adjustment_type VARCHAR(50) NOT NULL, -- e.g., 'Damage', 'Expired', 'Correction'
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    reason TEXT NOT NULL,
    previous_quantity INTEGER NOT NULL,
    new_quantity INTEGER NOT NULL,
    created_by INTEGER REFERENCES users(id) NULL, -- optional if you have user auth
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for faster lookups
CREATE INDEX idx_stock_adjustments_medicine_id ON stock_adjustments(medicine_id);
CREATE INDEX idx_stock_adjustments_batch_no ON stock_adjustments(batch_no);




-- =====================================================
-- DOCTOR AVAILABILITY
-- =====================================================



CREATE TABLE IF NOT EXISTS doctor_availability (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_duration_minutes INTEGER DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);
-- =====================================================
-- APPOINTMENTS ✅ (ONLY ONE — IMPORTANT)
-- =====================================================

CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id VARCHAR(50),
    doctor_id INTEGER NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time VARCHAR(20) NOT NULL,
    consultation_type VARCHAR(20)
        CHECK (consultation_type IN ('in-person','teleconsultation')),
    notes TEXT,
    status VARCHAR(20) DEFAULT 'BOOKED'
        CHECK (status IN ('BOOKED','COMPLETED','CANCELLED')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_appointments_doctor ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);

DROP TRIGGER IF EXISTS update_appointments_updated_at ON appointments;
CREATE TRIGGER update_appointments_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VIEWappointments

CREATE OR REPLACE VIEW registration_details AS
SELECT 
    p.*,
    i.insurance_provider,
    i.policy_number,
    i.valid_until,
    i.group_id,
    i.aadhaar_number,
    i.aadhaar_verified,
    i.abha_id,
    fv.face_verified,
    fv.verification_date,
    r.registration_id,
    r.status as registration_status,
    r.completed_at
FROM patients p
LEFT JOIN insurance_details i ON p.patient_id = i.patient_id
LEFT JOIN face_verification fv ON p.patient_id = fv.patient_id
LEFT JOIN registrations r ON p.patient_id = r.patient_id;



-- --------------------doctor appoitment----------------------
CREATE TABLE visit_details (
  id SERIAL PRIMARY KEY,
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  diagnosis TEXT,
  icd10_code VARCHAR(20),
  clinical_notes TEXT,
  follow_up_date DATE,
  patient_instructions TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE vitals (
  id SERIAL PRIMARY KEY,
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  bp VARCHAR(20),
  hr INTEGER,
  temp DECIMAL(4,2),
  weight DECIMAL(5,2),
  rr INTEGER,
  spo2 INTEGER,
  recorded_by VARCHAR(100),
  recorded_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE prescriptions (
  id SERIAL PRIMARY KEY,
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  medication_name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  dosage VARCHAR(100) NOT NULL,
  frequency VARCHAR(100),
  duration VARCHAR(100),
  instructions TEXT,
  recorded_by VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);


-- temporary helpdesk and admin------------

-- Roles table
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,   -- 'admin', 'helpdesk'
  description TEXT
);

-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,  -- store bcrypt hash
  full_name VARCHAR(100),
  role_id INT NOT NULL REFERENCES roles(id),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'System administrator with full access'),
  ('helpdesk', 'Helpdesk staff');

-- Insert a default admin user
-- Password: 'admin123' (replace with actual bcrypt hash)
-- To generate a bcrypt hash, use: bcrypt.hashSync('admin123', 10)
INSERT INTO users (username, email, password_hash, full_name, role_id) VALUES
  ('admin', 'admin@hospital.com', '$2a$10$your_generated_hash_here', 'System Admin', 1);

-- Insert a default helpdesk user
-- Password: 'helpdesk123' (replace with actual bcrypt hash)
-- To generate a bcrypt hash, use: bcrypt.hashSync('helpdesk123', 10)
INSERT INTO users (username, email, password_hash, full_name, role_id) VALUES
  ('helpdesk', 'helpdesk@hospital.com', '$2a$10$your_generated_hash_here', 'Helpdesk Staff', 2);