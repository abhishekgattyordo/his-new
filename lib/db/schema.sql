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




