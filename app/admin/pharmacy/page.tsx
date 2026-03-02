// app/admin/pharmacy/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/admin/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/admin/dropdown-menu';
import {
  Pill,
  AlertTriangle,
  AlertCircle,
  Bell,
  BellRing,
  QrCode,
  Scan,
  Package,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Star,
  StarHalf,
  StarOff,
  Menu,
  X,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Users,
  Home,
  Truck,
  ShoppingBag,
  RefreshCw,
  Printer,
  Download,
  Upload,
  Settings,
  HelpCircle,
  Info,
  AlertOctagon,
  FlaskRound,
  Syringe,
  Thermometer,
  Box,
  Layers,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Microscope,
  Heart,
  Ambulance,
  PackageCheck,
  PackageX,
  PackageOpen,
  Wallet,
  Building2,
  Globe,
  Link,
  ExternalLink,
  BookOpen,
  Database,
  Send,
  MessageSquare,
  BellOff,
  CheckCircle2,
} from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';
import { Badge as BadgeComponent } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// Types
type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contact: string;
  email: string;
  address: string;
  bloodGroup: string;
  allergies: string[];
  chronicConditions: string[];
  medications: {
    drugId: string;
    drugName: string;
    prescribedDate: string;
    prescribedBy: string;
    dosage: string;
    frequency: string;
    duration: string;
    status: 'active' | 'completed' | 'discontinued';
  }[];
  insuranceProvider?: string;
  insuranceId?: string;
};

type Prescription = {
  id: string;
  prescriptionNumber: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  hospitalId: string;
  hospitalName: string;
  issueDate: string;
  expiryDate: string;
  type: 'new' | 'repeat' | 'emergency' | 'controlled';
  status: 'pending' | 'verified' | 'processing' | 'dispensed' | 'cancelled' | 'rejected';
  items: {
    drugId: string;
    drugName: string;
    drugCode: string;
    dosage: string;
    form: string;
    strength: string;
    quantity: number;
    frequency: string;
    duration: string;
    instructions: string;
    substitutionAllowed: boolean;
    dispensedQuantity?: number;
    dispensedBatch?: string;
    pricePerUnit: number;
    totalPrice: number;
    insuranceCovered: number;
    patientPays: number;
  }[];
  totalAmount: number;
  insuranceCovered: number;
  patientResponsibility: number;
  paymentStatus: 'paid' | 'partial' | 'unpaid' | 'insurance';
  paymentMethod?: string;
  notes?: string;
  clinicalNotes?: string;
  diagnosis?: string[];
  refills: {
    allowed: number;
    used: number;
    remaining: number;
  };
  ePrescriptionId?: string;
  digitalSignature?: string;
  createdBy: string;
  verifiedBy?: string;
  dispensedBy?: string;
  dispensedAt?: string;
  createdAt: string;
  updatedAt: string;
};

type Drug = {
  id: string;
  code: string;
  name: string;
  genericName: string;
  brandName: string;
  manufacturer: string;
  category: string;
  subCategory: string;
  form: 'tablet' | 'capsule' | 'syrup' | 'injection' | 'cream' | 'ointment' | 'drops' | 'inhaler' | 'patch' | 'suppository';
  strength: string;
  strengthUnit: string;
  schedule: 'OTC' | 'H' | 'G' | 'X' | 'Controlled'; // India's CDSCO schedules
  narcotic: boolean;
  psychotropic: boolean;
  requiresPrescription: boolean;
  maxQuantityPerPrescription?: number;
  minAge?: number;
  contraindications: string[];
  warnings: string[];
  sideEffects: string[];
  drugInteractions: {
    drugId: string;
    drugName: string;
    severity: 'mild' | 'moderate' | 'severe' | 'contraindicated';
    description: string;
  }[];
  foodInteractions: string[];
  pregnancyCategory: 'A' | 'B' | 'C' | 'D' | 'X' | 'N/A';
  lactation: 'safe' | 'caution' | 'contraindicated';
  storage: string;
  shelfLife: number; // months
  reorderLevel: number;
  maxStock: number;
  price: {
    unit: number;
    packSize: number;
    packPrice: number;
    mrp: number;
    gst: number;
  };
  alternatives: string[]; // drug IDs
  substitutions: string[]; // drug IDs
  cdscoId?: string; // India's CDSCO registration
  uspMonograph?: string; // USP reference
  ingredients: {
    name: string;
    strength: number;
    unit: string;
  }[];
  lastUpdated: string;
};

type Dispensing = {
  id: string;
  prescriptionId: string;
  prescriptionNumber: string;
  patientId: string;
  patientName: string;
  items: {
    drugId: string;
    drugName: string;
    batchNumber: string;
    quantity: number;
    unit: string;
    expiryDate: string;
    price: number;
  }[];
  pharmacistId: string;
  pharmacistName: string;
  dispensingDate: string;
  deliveryMethod: 'in-person' | 'home-delivery' | 'courier';
  deliveryAddress?: string;
  deliveryStatus?: 'pending' | 'dispatched' | 'delivered' | 'returned';
  trackingNumber?: string;
  deliveryPartner?: string;
  estimatedDelivery?: string;
  notes?: string;
  signature?: string;
};

type RefillReminder = {
  id: string;
  patientId: string;
  patientName: string;
  patientContact: string;
  drugId: string;
  drugName: string;
  prescriptionId: string;
  lastFilled: string;
  nextRefillDue: string;
  refillsRemaining: number;
  status: 'pending' | 'sent' | 'cancelled' | 'processed';
  reminderMethod: 'sms' | 'email' | 'push' | 'whatsapp';
  sentAt?: string;
  response?: 'confirmed' | 'postponed' | 'cancelled';
};

type DrugInteractionCheck = {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'mild' | 'moderate' | 'severe' | 'contraindicated';
  description: string;
  mechanism: string;
  management: string;
  references: string[];
};

// Mock Data
const patients: Patient[] = [
  {
    id: 'pat1',
    name: 'Robert Johnson',
    age: 42,
    gender: 'male',
    contact: '+1 (555) 123-4567',
    email: 'robert.j@email.com',
    address: '123 Main St, Apt 4B, New York, NY 10001',
    bloodGroup: 'O+',
    allergies: ['Penicillin', 'Sulfa'],
    chronicConditions: ['Hypertension', 'Type 2 Diabetes'],
    medications: [
      {
        drugId: 'drug2',
        drugName: 'Lisinopril 10mg',
        prescribedDate: '2025-01-15',
        prescribedBy: 'Dr. Sarah Jenkins',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '30 days',
        status: 'active',
      },
      {
        drugId: 'drug3',
        drugName: 'Metformin 500mg',
        prescribedDate: '2025-01-15',
        prescribedBy: 'Dr. Sarah Jenkins',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '90 days',
        status: 'active',
      },
    ],
    insuranceProvider: 'Blue Cross',
    insuranceId: 'BC12345678',
  },
  {
    id: 'pat2',
    name: 'Emily Davis',
    age: 35,
    gender: 'female',
    contact: '+1 (555) 234-5678',
    email: 'emily.d@email.com',
    address: '456 Park Ave, New York, NY 10022',
    bloodGroup: 'A+',
    allergies: ['Codeine'],
    chronicConditions: ['Asthma'],
    medications: [
      {
        drugId: 'drug4',
        drugName: 'Albuterol Inhaler',
        prescribedDate: '2025-02-10',
        prescribedBy: 'Dr. Michael Chen',
        dosage: '90mcg',
        frequency: 'As needed',
        duration: '30 days',
        status: 'active',
      },
    ],
    insuranceProvider: 'Aetna',
    insuranceId: 'AE87654321',
  },
  {
    id: 'pat3',
    name: 'James Wilson',
    age: 58,
    gender: 'male',
    contact: '+1 (555) 345-6789',
    email: 'james.w@email.com',
    address: '789 Broadway, New York, NY 10003',
    bloodGroup: 'B-',
    allergies: ['Aspirin', 'Ibuprofen'],
    chronicConditions: ['Coronary Artery Disease', 'Hyperlipidemia'],
    medications: [
      {
        drugId: 'drug5',
        drugName: 'Atorvastatin 20mg',
        prescribedDate: '2025-01-05',
        prescribedBy: 'Dr. Sarah Jenkins',
        dosage: '20mg',
        frequency: 'Once daily at night',
        duration: '90 days',
        status: 'active',
      },
      {
        drugId: 'drug6',
        drugName: 'Clopidogrel 75mg',
        prescribedDate: '2025-01-05',
        prescribedBy: 'Dr. Sarah Jenkins',
        dosage: '75mg',
        frequency: 'Once daily',
        duration: '90 days',
        status: 'active',
      },
    ],
    insuranceProvider: 'Medicare',
    insuranceId: 'MC135792468',
  },
];

const prescriptions: Prescription[] = [
  {
    id: 'rx1',
    prescriptionNumber: 'RX-2025-0123',
    patientId: 'pat1',
    patientName: 'Robert Johnson',
    patientAge: 42,
    patientGender: 'male',
    doctorId: 'doc1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialty: 'Cardiology',
    hospitalId: 'hosp1',
    hospitalName: 'City General Hospital',
    issueDate: '2025-03-01',
    expiryDate: '2025-06-01',
    type: 'new',
    status: 'pending',
    items: [
      {
        drugId: 'drug2',
        drugName: 'Lisinopril 10mg',
        drugCode: 'DRG-LIS-10',
        dosage: '10mg',
        form: 'tablet',
        strength: '10mg',
        quantity: 30,
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take in the morning',
        substitutionAllowed: true,
        pricePerUnit: 0.45,
        totalPrice: 13.50,
        insuranceCovered: 10.80,
        patientPays: 2.70,
      },
      {
        drugId: 'drug3',
        drugName: 'Metformin 500mg',
        drugCode: 'DRG-MET-500',
        dosage: '500mg',
        form: 'tablet',
        strength: '500mg',
        quantity: 60,
        frequency: 'Twice daily with meals',
        duration: '30 days',
        instructions: 'Take with food',
        substitutionAllowed: true,
        pricePerUnit: 0.30,
        totalPrice: 18.00,
        insuranceCovered: 14.40,
        patientPays: 3.60,
      },
    ],
    totalAmount: 31.50,
    insuranceCovered: 25.20,
    patientResponsibility: 6.30,
    paymentStatus: 'unpaid',
    refills: {
      allowed: 3,
      used: 0,
      remaining: 3,
    },
    ePrescriptionId: 'ep-2025-0123',
    createdBy: 'Dr. Sarah Jenkins',
    createdAt: '2025-03-01T10:30:00Z',
    updatedAt: '2025-03-01T10:30:00Z',
  },
  {
    id: 'rx2',
    prescriptionNumber: 'RX-2025-0124',
    patientId: 'pat2',
    patientName: 'Emily Davis',
    patientAge: 35,
    patientGender: 'female',
    doctorId: 'doc2',
    doctorName: 'Dr. Michael Chen',
    doctorSpecialty: 'Pulmonology',
    hospitalId: 'hosp1',
    hospitalName: 'City General Hospital',
    issueDate: '2025-02-28',
    expiryDate: '2025-05-28',
    type: 'new',
    status: 'verified',
    items: [
      {
        drugId: 'drug4',
        drugName: 'Albuterol Inhaler',
        drugCode: 'DRG-ALB-90',
        dosage: '90mcg',
        form: 'inhaler',
        strength: '90mcg/inhalation',
        quantity: 1,
        frequency: 'As needed',
        duration: '30 days',
        instructions: 'Use 2 puffs every 4-6 hours as needed',
        substitutionAllowed: false,
        pricePerUnit: 35.00,
        totalPrice: 35.00,
        insuranceCovered: 28.00,
        patientPays: 7.00,
      },
    ],
    totalAmount: 35.00,
    insuranceCovered: 28.00,
    patientResponsibility: 7.00,
    paymentStatus: 'insurance',
    refills: {
      allowed: 2,
      used: 0,
      remaining: 2,
    },
    ePrescriptionId: 'ep-2025-0124',
    createdBy: 'Dr. Michael Chen',
    createdAt: '2025-02-28T14:15:00Z',
    updatedAt: '2025-02-28T16:30:00Z',
    verifiedBy: 'Pharm. David Lee',
  },
  {
    id: 'rx3',
    prescriptionNumber: 'RX-2025-0115',
    patientId: 'pat3',
    patientName: 'James Wilson',
    patientAge: 58,
    patientGender: 'male',
    doctorId: 'doc1',
    doctorName: 'Dr. Sarah Jenkins',
    doctorSpecialty: 'Cardiology',
    hospitalId: 'hosp1',
    hospitalName: 'City General Hospital',
    issueDate: '2025-02-25',
    expiryDate: '2025-05-25',
    type: 'repeat',
    status: 'dispensed',
    items: [
      {
        drugId: 'drug5',
        drugName: 'Atorvastatin 20mg',
        drugCode: 'DRG-ATO-20',
        dosage: '20mg',
        form: 'tablet',
        strength: '20mg',
        quantity: 90,
        frequency: 'Once daily at night',
        duration: '90 days',
        instructions: 'Take at bedtime',
        substitutionAllowed: true,
        dispensedQuantity: 90,
        dispensedBatch: 'BATCH-ATO-2025-01',
        pricePerUnit: 0.55,
        totalPrice: 49.50,
        insuranceCovered: 39.60,
        patientPays: 9.90,
      },
      {
        drugId: 'drug6',
        drugName: 'Clopidogrel 75mg',
        drugCode: 'DRG-CLO-75',
        dosage: '75mg',
        form: 'tablet',
        strength: '75mg',
        quantity: 90,
        frequency: 'Once daily',
        duration: '90 days',
        instructions: 'Take with food',
        substitutionAllowed: true,
        dispensedQuantity: 90,
        dispensedBatch: 'BATCH-CLO-2025-01',
        pricePerUnit: 1.20,
        totalPrice: 108.00,
        insuranceCovered: 86.40,
        patientPays: 21.60,
      },
    ],
    totalAmount: 157.50,
    insuranceCovered: 126.00,
    patientResponsibility: 31.50,
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    refills: {
      allowed: 5,
      used: 1,
      remaining: 4,
    },
    ePrescriptionId: 'ep-2025-0115',
    createdBy: 'Dr. Sarah Jenkins',
    createdAt: '2025-02-25T09:45:00Z',
    updatedAt: '2025-02-26T11:20:00Z',
    verifiedBy: 'Pharm. David Lee',
    dispensedBy: 'Pharm. Maria Garcia',
    dispensedAt: '2025-02-26T11:20:00Z',
  },
];

const drugs: Drug[] = [
  {
    id: 'drug1',
    code: 'DRG-AMOX-500',
    name: 'Amoxicillin 500mg',
    genericName: 'Amoxicillin',
    brandName: 'Amoxil',
    manufacturer: 'PharmaCorp',
    category: 'antibiotic',
    subCategory: 'penicillins',
    form: 'capsule',
    strength: '500',
    strengthUnit: 'mg',
    schedule: 'H',
    narcotic: false,
    psychotropic: false,
    requiresPrescription: true,
    contraindications: ['Penicillin allergy'],
    warnings: ['May cause diarrhea', 'Complete full course'],
    sideEffects: ['Nausea', 'Diarrhea', 'Rash'],
    drugInteractions: [
      {
        drugId: 'drug8',
        drugName: 'Warfarin',
        severity: 'moderate',
        description: 'Increased bleeding risk',
      },
      {
        drugId: 'drug9',
        drugName: 'Methotrexate',
        severity: 'severe',
        description: 'Increased methotrexate toxicity',
      },
    ],
    foodInteractions: ['May be taken with or without food'],
    pregnancyCategory: 'B',
    lactation: 'safe',
    storage: 'Store at room temperature 20-25°C',
    shelfLife: 24,
    reorderLevel: 5000,
    maxStock: 50000,
    price: {
      unit: 0.22,
      packSize: 100,
      packPrice: 22.00,
      mrp: 25.00,
      gst: 12,
    },
    alternatives: ['drug7'],
    substitutions: ['drug7'],
    cdscoId: 'CDSCO/2024/DRUG/00123',
    uspMonograph: 'USP42-NF37',
    ingredients: [
      { name: 'Amoxicillin trihydrate', strength: 500, unit: 'mg' },
    ],
    lastUpdated: '2025-01-15',
  },
  {
    id: 'drug2',
    code: 'DRG-LIS-10',
    name: 'Lisinopril 10mg',
    genericName: 'Lisinopril',
    brandName: 'Zestril',
    manufacturer: 'PharmaCorp',
    category: 'cardiovascular',
    subCategory: 'ACE inhibitors',
    form: 'tablet',
    strength: '10',
    strengthUnit: 'mg',
    schedule: 'H',
    narcotic: false,
    psychotropic: false,
    requiresPrescription: true,
    contraindications: ['Angioedema history', 'Pregnancy'],
    warnings: ['Monitor blood pressure', 'Check renal function'],
    sideEffects: ['Cough', 'Dizziness', 'Hyperkalemia'],
    drugInteractions: [
      {
        drugId: 'drug6',
        drugName: 'Potassium supplements',
        severity: 'moderate',
        description: 'Increased risk of hyperkalemia',
      },
      {
        drugId: 'drug7',
        drugName: 'NSAIDs',
        severity: 'moderate',
        description: 'Reduced antihypertensive effect',
      },
    ],
    foodInteractions: ['Take on empty stomach'],
    pregnancyCategory: 'D',
    lactation: 'caution',
    storage: 'Store at room temperature',
    shelfLife: 36,
    reorderLevel: 2000,
    maxStock: 20000,
    price: {
      unit: 0.45,
      packSize: 30,
      packPrice: 13.50,
      mrp: 15.00,
      gst: 12,
    },
    alternatives: ['drug8'],
    substitutions: ['drug8'],
    cdscoId: 'CDSCO/2024/DRUG/00456',
    uspMonograph: 'USP42-NF37',
    ingredients: [
      { name: 'Lisinopril', strength: 10, unit: 'mg' },
    ],
    lastUpdated: '2025-01-15',
  },
  {
    id: 'drug3',
    code: 'DRG-MET-500',
    name: 'Metformin 500mg',
    genericName: 'Metformin',
    brandName: 'Glucophage',
    manufacturer: 'MediPharm',
    category: 'diabetes',
    subCategory: 'biguanides',
    form: 'tablet',
    strength: '500',
    strengthUnit: 'mg',
    schedule: 'H',
    narcotic: false,
    psychotropic: false,
    requiresPrescription: true,
    contraindications: ['Renal impairment', 'Metabolic acidosis'],
    warnings: ['Lactic acidosis risk', 'Monitor renal function'],
    sideEffects: ['GI upset', 'Diarrhea', 'Metallic taste'],
    drugInteractions: [
      {
        drugId: 'drug10',
        drugName: 'Contrast media',
        severity: 'severe',
        description: 'Risk of lactic acidosis',
      },
    ],
    foodInteractions: ['Take with meals to reduce GI upset'],
    pregnancyCategory: 'B',
    lactation: 'safe',
    storage: 'Store at room temperature',
    shelfLife: 36,
    reorderLevel: 5000,
    maxStock: 50000,
    price: {
      unit: 0.30,
      packSize: 100,
      packPrice: 30.00,
      mrp: 35.00,
      gst: 12,
    },
    alternatives: ['drug11'],
    substitutions: ['drug11'],
    cdscoId: 'CDSCO/2024/DRUG/00789',
    uspMonograph: 'USP42-NF37',
    ingredients: [
      { name: 'Metformin hydrochloride', strength: 500, unit: 'mg' },
    ],
    lastUpdated: '2025-01-15',
  },
  {
    id: 'drug4',
    code: 'DRG-ALB-90',
    name: 'Albuterol Inhaler',
    genericName: 'Albuterol',
    brandName: 'Ventolin',
    manufacturer: 'Respirex',
    category: 'respiratory',
    subCategory: 'bronchodilators',
    form: 'inhaler',
    strength: '90',
    strengthUnit: 'mcg/inhalation',
    schedule: 'H',
    narcotic: false,
    psychotropic: false,
    requiresPrescription: true,
    contraindications: ['Hypersensitivity'],
    warnings: ['Paradoxical bronchospasm', 'Cardiovascular effects'],
    sideEffects: ['Tremor', 'Tachycardia', 'Nervousness'],
    drugInteractions: [
      {
        drugId: 'drug12',
        drugName: 'Beta-blockers',
        severity: 'moderate',
        description: 'Reduced bronchodilator effect',
      },
    ],
    foodInteractions: ['No known food interactions'],
    pregnancyCategory: 'C',
    lactation: 'safe',
    storage: 'Store at room temperature, protect from freezing',
    shelfLife: 24,
    reorderLevel: 100,
    maxStock: 1000,
    price: {
      unit: 35.00,
      packSize: 1,
      packPrice: 35.00,
      mrp: 40.00,
      gst: 12,
    },
    alternatives: ['drug13'],
    substitutions: ['drug13'],
    cdscoId: 'CDSCO/2024/DRUG/00987',
    uspMonograph: 'USP42-NF37',
    ingredients: [
      { name: 'Albuterol sulfate', strength: 90, unit: 'mcg' },
    ],
    lastUpdated: '2025-01-15',
  },
  {
    id: 'drug5',
    code: 'DRG-ATO-20',
    name: 'Atorvastatin 20mg',
    genericName: 'Atorvastatin',
    brandName: 'Lipitor',
    manufacturer: 'PharmaCorp',
    category: 'cardiovascular',
    subCategory: 'statins',
    form: 'tablet',
    strength: '20',
    strengthUnit: 'mg',
    schedule: 'H',
    narcotic: false,
    psychotropic: false,
    requiresPrescription: true,
    contraindications: ['Liver disease', 'Pregnancy'],
    warnings: ['Monitor liver enzymes', 'Muscle pain'],
    sideEffects: ['Myalgia', 'Elevated liver enzymes', 'GI upset'],
    drugInteractions: [
      {
        drugId: 'drug14',
        drugName: 'Grapefruit juice',
        severity: 'moderate',
        description: 'Increased statin levels',
      },
      {
        drugId: 'drug15',
        drugName: 'Cyclosporine',
        severity: 'severe',
        description: 'Increased risk of myopathy',
      },
    ],
    foodInteractions: ['Avoid grapefruit juice'],
    pregnancyCategory: 'X',
    lactation: 'contraindicated',
    storage: 'Store at room temperature',
    shelfLife: 36,
    reorderLevel: 1000,
    maxStock: 10000,
    price: {
      unit: 0.55,
      packSize: 30,
      packPrice: 16.50,
      mrp: 20.00,
      gst: 12,
    },
    alternatives: ['drug16'],
    substitutions: ['drug16'],
    cdscoId: 'CDSCO/2024/DRUG/01023',
    uspMonograph: 'USP42-NF37',
    ingredients: [
      { name: 'Atorvastatin calcium', strength: 20, unit: 'mg' },
    ],
    lastUpdated: '2025-01-15',
  },
  {
    id: 'drug6',
    code: 'DRG-CLO-75',
    name: 'Clopidogrel 75mg',
    genericName: 'Clopidogrel',
    brandName: 'Plavix',
    manufacturer: 'PharmaCorp',
    category: 'cardiovascular',
    subCategory: 'antiplatelets',
    form: 'tablet',
    strength: '75',
    strengthUnit: 'mg',
    schedule: 'H',
    narcotic: false,
    psychotropic: false,
    requiresPrescription: true,
    contraindications: ['Active bleeding', 'Severe liver impairment'],
    warnings: ['Bleeding risk', 'Thrombotic thrombocytopenic purpura'],
    sideEffects: ['Bleeding', 'Bruising', 'GI bleeding'],
    drugInteractions: [
      {
        drugId: 'drug17',
        drugName: 'Warfarin',
        severity: 'severe',
        description: 'Increased bleeding risk',
      },
      {
        drugId: 'drug18',
        drugName: 'PPIs',
        severity: 'moderate',
        description: 'Reduced clopidogrel efficacy',
      },
    ],
    foodInteractions: ['No known food interactions'],
    pregnancyCategory: 'B',
    lactation: 'caution',
    storage: 'Store at room temperature',
    shelfLife: 36,
    reorderLevel: 1000,
    maxStock: 10000,
    price: {
      unit: 1.20,
      packSize: 30,
      packPrice: 36.00,
      mrp: 40.00,
      gst: 12,
    },
    alternatives: ['drug19'],
    substitutions: ['drug19'],
    cdscoId: 'CDSCO/2024/DRUG/01156',
    uspMonograph: 'USP42-NF37',
    ingredients: [
      { name: 'Clopidogrel bisulfate', strength: 75, unit: 'mg' },
    ],
    lastUpdated: '2025-01-15',
  },
];

const dispensings: Dispensing[] = [
  {
    id: 'disp1',
    prescriptionId: 'rx3',
    prescriptionNumber: 'RX-2025-0115',
    patientId: 'pat3',
    patientName: 'James Wilson',
    items: [
      {
        drugId: 'drug5',
        drugName: 'Atorvastatin 20mg',
        batchNumber: 'BATCH-ATO-2025-01',
        quantity: 90,
        unit: 'tablets',
        expiryDate: '2028-01-15',
        price: 49.50,
      },
      {
        drugId: 'drug6',
        drugName: 'Clopidogrel 75mg',
        batchNumber: 'BATCH-CLO-2025-01',
        quantity: 90,
        unit: 'tablets',
        expiryDate: '2028-01-15',
        price: 108.00,
      },
    ],
    pharmacistId: 'pharm1',
    pharmacistName: 'Pharm. Maria Garcia',
    dispensingDate: '2025-02-26T11:20:00Z',
    deliveryMethod: 'in-person',
    notes: 'Patient counseled on medication use and side effects',
    signature: 'patient-sig-001',
  },
];

const refillReminders: RefillReminder[] = [
  {
    id: 'rem1',
    patientId: 'pat1',
    patientName: 'Robert Johnson',
    patientContact: '+1 (555) 123-4567',
    drugId: 'drug2',
    drugName: 'Lisinopril 10mg',
    prescriptionId: 'rx1',
    lastFilled: '2025-03-01',
    nextRefillDue: '2025-03-31',
    refillsRemaining: 3,
    status: 'pending',
    reminderMethod: 'sms',
  },
  {
    id: 'rem2',
    patientId: 'pat3',
    patientName: 'James Wilson',
    patientContact: '+1 (555) 345-6789',
    drugId: 'drug5',
    drugName: 'Atorvastatin 20mg',
    prescriptionId: 'rx3',
    lastFilled: '2025-02-26',
    nextRefillDue: '2025-05-26',
    refillsRemaining: 4,
    status: 'pending',
    reminderMethod: 'email',
  },
];

const drugInteractions: DrugInteractionCheck[] = [
  {
    id: 'int1',
    drug1: 'Warfarin',
    drug2: 'Amoxicillin',
    severity: 'moderate',
    description: 'Increased bleeding risk',
    mechanism: 'Antibiotics may alter gut flora affecting vitamin K production',
    management: 'Monitor INR closely during and after antibiotic therapy',
    references: ['Drug Interaction Facts 2025', 'Lexicomp'],
  },
  {
    id: 'int2',
    drug1: 'Simvastatin',
    drug2: 'Grapefruit juice',
    severity: 'moderate',
    description: 'Increased statin levels, risk of myopathy',
    mechanism: 'Grapefruit inhibits CYP3A4 metabolism',
    management: 'Avoid grapefruit juice while taking statins',
    references: ['FDA Drug Safety Communication'],
  },
  {
    id: 'int3',
    drug1: 'Clopidogrel',
    drug2: 'Omeprazole',
    severity: 'moderate',
    description: 'Reduced antiplatelet effect',
    mechanism: 'CYP2C19 inhibition',
    management: 'Consider alternative PPI (pantoprazole)',
    references: ['FDA Label'],
  },
];

// Utility functions
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'verified': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    case 'processing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
    case 'dispensed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  }
};

const getInteractionSeverityColor = (severity: string) => {
  switch (severity) {
    case 'severe': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'contraindicated': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'moderate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'mild': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  }
};

const getDrugScheduleBadge = (schedule: string) => {
  switch (schedule) {
    case 'Controlled': return <Badge variant="destructive">Controlled</Badge>;
    case 'H': return <Badge variant="default">Prescription (H)</Badge>;
    case 'G': return <Badge variant="secondary">OTC (G)</Badge>;
    case 'X': return <Badge variant="destructive">Schedule X</Badge>;
    default: return <Badge variant="outline">{schedule}</Badge>;
  }
};

export default function PharmacyManagementPage() {
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [showInteractionCheck, setShowInteractionCheck] = useState(false);
  const [showNewPrescriptionDialog, setShowNewPrescriptionDialog] = useState(false);
  const [showDispenseDialog, setShowDispenseDialog] = useState(false);
  const [showDrugInfoDialog, setShowDrugInfoDialog] = useState(false);
  const [showRefillDialog, setShowRefillDialog] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter prescriptions
  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter(rx => {
      const matchesSearch = searchQuery === '' ||
        rx.prescriptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rx.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [searchQuery]);

  // Filter drugs
  const filteredDrugs = useMemo(() => {
    return drugs.filter(drug => {
      const matchesSearch = searchQuery === '' ||
        drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drug.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drug.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        drug.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [searchQuery]);

  // Calculate stats
  const stats = useMemo(() => {
    const totalPrescriptions = prescriptions.length;
    const pendingPrescriptions = prescriptions.filter(rx => rx.status === 'pending').length;
    const dispensedToday = prescriptions.filter(rx => 
      rx.status === 'dispensed' && rx.dispensedAt?.startsWith(new Date().toISOString().split('T')[0])
    ).length;
    const lowStockDrugs = drugs.filter(drug => drug.reorderLevel >= drug.maxStock * 0.2).length;
    const expiringSoon = drugs.filter(drug => drug.shelfLife <= 3).length;
    const refillsDue = refillReminders.filter(r => r.status === 'pending').length;
    
    return {
      totalPrescriptions,
      pendingPrescriptions,
      dispensedToday,
      lowStockDrugs,
      expiringSoon,
      refillsDue,
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col w-full lg:ml-0 min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  Pharmacy Management
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                  Handle prescriptions, dispensing, and drug interactions
                </p>
              </div>
              
              {/* Header Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex flex-col xs:flex-row gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full xs:w-auto"
                    onClick={() => setShowInteractionCheck(true)}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Check Interaction
                  </Button>
                  <Button 
                    size="sm"
                    className="w-full xs:w-auto"
                    onClick={() => setShowNewPrescriptionDialog(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Prescription
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Rx</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{stats.totalPrescriptions}</p>
                  </div>
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
                    <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pendingPrescriptions}</p>
                  </div>
                  <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Dispensed Today</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">{stats.dispensedToday}</p>
                  </div>
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Low Stock</p>
                    <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{stats.lowStockDrugs}</p>
                  </div>
                  <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <Package className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Expiring Soon</p>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">{stats.expiringSoon}</p>
                  </div>
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Refills Due</p>
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{stats.refillsDue}</p>
                  </div>
                  <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <RefreshCw className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Tabs List */}
            <div className="w-full overflow-x-auto pb-2">
              <TabsList className="inline-flex w-max lg:w-full lg:grid lg:grid-cols-5">
                <TabsTrigger value="prescriptions" className="px-4 py-2 whitespace-nowrap">Prescriptions</TabsTrigger>
                <TabsTrigger value="drugs" className="px-4 py-2 whitespace-nowrap">Drug Database</TabsTrigger>
                <TabsTrigger value="dispensing" className="px-4 py-2 whitespace-nowrap">Dispensing</TabsTrigger>
                <TabsTrigger value="interactions" className="px-4 py-2 whitespace-nowrap">Interactions</TabsTrigger>
                <TabsTrigger value="refills" className="px-4 py-2 whitespace-nowrap">Refill Reminders</TabsTrigger>
              </TabsList>
            </div>

            {/* Prescriptions Tab */}
            <TabsContent value="prescriptions" className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search prescriptions by number, patient, or doctor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              {/* Prescriptions Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[800px]">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-4 sm:px-6 py-3">Rx #</th>
                        <th className="px-4 sm:px-6 py-3">Patient</th>
                        <th className="px-4 sm:px-6 py-3">Doctor</th>
                        <th className="px-4 sm:px-6 py-3">Date</th>
                        <th className="px-4 sm:px-6 py-3">Items</th>
                        <th className="px-4 sm:px-6 py-3">Total</th>
                        <th className="px-4 sm:px-6 py-3">Status</th>
                        <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredPrescriptions.map((rx) => (
                        <tr key={rx.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 sm:px-6 py-4 font-medium">
                            {rx.prescriptionNumber}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div>
                              <p className="font-medium">{rx.patientName}</p>
                              <p className="text-xs text-gray-500">{rx.patientAge}y/{rx.patientGender}</p>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div>
                              <p className="font-medium">{rx.doctorName}</p>
                              <p className="text-xs text-gray-500">{rx.doctorSpecialty}</p>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {formatDate(rx.issueDate)}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {rx.items.length} items
                          </td>
                          <td className="px-4 sm:px-6 py-4 font-medium">
                            {formatCurrency(rx.totalAmount)}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <Badge className={getStatusColor(rx.status)}>
                              {rx.status}
                            </Badge>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => {
                                  setSelectedPrescription(rx);
                                  setShowDispenseDialog(true);
                                }}
                                disabled={rx.status !== 'verified' && rx.status !== 'pending'}
                              >
                                <Package className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Print Label</DropdownMenuItem>
                                  <DropdownMenuItem>Check Insurance</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Drugs Tab */}
            <TabsContent value="drugs" className="space-y-6">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, generic, brand, or code..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="antibiotic">Antibiotics</SelectItem>
                      <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                      <SelectItem value="respiratory">Respiratory</SelectItem>
                      <SelectItem value="diabetes">Diabetes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Database className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Drugs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDrugs.map((drug) => (
                  <Card key={drug.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            drug.schedule === 'Controlled' ? 'bg-red-50 dark:bg-red-900/20' :
                            drug.schedule === 'H' ? 'bg-blue-50 dark:bg-blue-900/20' :
                            'bg-green-50 dark:bg-green-900/20'
                          }`}>
                            <Pill className={`h-5 w-5 ${
                              drug.schedule === 'Controlled' ? 'text-red-600 dark:text-red-400' :
                              drug.schedule === 'H' ? 'text-blue-600 dark:text-blue-400' :
                              'text-green-600 dark:text-green-400'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {drug.name}
                            </h3>
                            <p className="text-xs text-gray-500">{drug.genericName}</p>
                          </div>
                        </div>
                        {getDrugScheduleBadge(drug.schedule)}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div>
                          <span className="text-gray-500">Form:</span>
                          <span className="ml-1 font-medium capitalize">{drug.form}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Strength:</span>
                          <span className="ml-1 font-medium">{drug.strength}{drug.strengthUnit}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Manufacturer:</span>
                          <span className="ml-1 font-medium truncate">{drug.manufacturer}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Price:</span>
                          <span className="ml-1 font-medium">{formatCurrency(drug.price.unit)}/unit</span>
                        </div>
                      </div>

                      {/* Stock Level */}
                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Stock Level</span>
                          <span className="font-medium">
                            {drug.reorderLevel} / {drug.maxStock}
                          </span>
                        </div>
                        <Progress 
                          value={(drug.reorderLevel / drug.maxStock) * 100} 
                          className="h-1.5"
                        />
                      </div>

                      {/* Interactions Warning */}
                      {drug.drugInteractions.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 mb-3">
                          <AlertTriangle className="h-3 w-3" />
                          <span>{drug.drugInteractions.length} interactions</span>
                        </div>
                      )}

                      <div className="flex justify-end gap-2 mt-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setSelectedDrug(drug);
                            setShowDrugInfoDialog(true);
                          }}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          Info
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          CDSCO
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Dispensing Tab */}
            <TabsContent value="dispensing" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[800px]">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-4 sm:px-6 py-3">Dispensing ID</th>
                        <th className="px-4 sm:px-6 py-3">Prescription</th>
                        <th className="px-4 sm:px-6 py-3">Patient</th>
                        <th className="px-4 sm:px-6 py-3">Pharmacist</th>
                        <th className="px-4 sm:px-6 py-3">Date</th>
                        <th className="px-4 sm:px-6 py-3">Items</th>
                        <th className="px-4 sm:px-6 py-3">Total</th>
                        <th className="px-4 sm:px-6 py-3">Method</th>
                        <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {dispensings.map((disp) => (
                        <tr key={disp.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 sm:px-6 py-4 font-medium">
                            {disp.id}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {disp.prescriptionNumber}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {disp.patientName}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {disp.pharmacistName}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {formatDate(disp.dispensingDate)}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {disp.items.length} items
                          </td>
                          <td className="px-4 sm:px-6 py-4 font-medium">
                            {formatCurrency(disp.items.reduce((sum, i) => sum + i.price, 0))}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <Badge variant="outline">{disp.deliveryMethod}</Badge>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Interactions Tab */}
            <TabsContent value="interactions" className="space-y-6">
              {/* Interaction Checker */}
              <Card>
                <CardHeader>
                  <CardTitle>Drug Interaction Checker</CardTitle>
                  <CardDescription>
                    Check for potential interactions between medications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label>Drug 1</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select drug" />
                        </SelectTrigger>
                        <SelectContent>
                          {drugs.map(d => (
                            <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Drug 2</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select drug" />
                        </SelectTrigger>
                        <SelectContent>
                          {drugs.map(d => (
                            <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Check Interactions
                  </Button>
                </CardContent>
              </Card>

              {/* Known Interactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Common Drug Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {drugInteractions.map((interaction) => (
                      <div key={interaction.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {interaction.drug1} + {interaction.drug2}
                            </h4>
                            <Badge className={`${getInteractionSeverityColor(interaction.severity)} mt-1`}>
                              {interaction.severity}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                          {interaction.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="font-medium">Mechanism:</span> {interaction.mechanism}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="font-medium">Management:</span> {interaction.management}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Refill Reminders Tab */}
            <TabsContent value="refills" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[800px]">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-4 sm:px-6 py-3">Patient</th>
                        <th className="px-4 sm:px-6 py-3">Drug</th>
                        <th className="px-4 sm:px-6 py-3">Last Filled</th>
                        <th className="px-4 sm:px-6 py-3">Next Refill</th>
                        <th className="px-4 sm:px-6 py-3">Remaining</th>
                        <th className="px-4 sm:px-6 py-3">Method</th>
                        <th className="px-4 sm:px-6 py-3">Status</th>
                        <th className="px-4 sm:px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {refillReminders.map((reminder) => (
                        <tr key={reminder.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 sm:px-6 py-4 font-medium">
                            {reminder.patientName}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {reminder.drugName}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {formatDate(reminder.lastFilled)}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {formatDate(reminder.nextRefillDue)}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            {reminder.refillsRemaining}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <Badge variant="outline">{reminder.reminderMethod}</Badge>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <Badge className={reminder.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}>
                              {reminder.status}
                            </Badge>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <Button variant="ghost" size="sm">
                              <Send className="h-4 w-4 mr-2" />
                              Send Reminder
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <footer className="mt-12 text-center px-4">
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              This pharmacy management system integrates with EHR and supports e-prescriptions.
              Always verify patient allergies and drug interactions before dispensing.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © 2026 HealthSync Hospital Management System. All rights reserved.
            </p>
          </footer>
        </main>
      </div>

      {/* Dialogs */}
      <Dialog open={showInteractionCheck} onOpenChange={setShowInteractionCheck}>
        <DialogContent className="sm:max-w-2xl w-[95vw]">
          <DialogHeader>
            <DialogTitle>Drug Interaction Checker</DialogTitle>
            <DialogDescription>
              Select drugs to check for potential interactions
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Drug 1</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select drug" />
                  </SelectTrigger>
                  <SelectContent>
                    {drugs.map(d => (
                      <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Drug 2</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select drug" />
                  </SelectTrigger>
                  <SelectContent>
                    {drugs.map(d => (
                      <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Patient's Current Medications (Optional)</Label>
              <Textarea placeholder="Enter other medications the patient is taking..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInteractionCheck(false)}>
              Cancel
            </Button>
            <Button type="submit">Check Interactions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewPrescriptionDialog} onOpenChange={setShowNewPrescriptionDialog}>
        <DialogContent className="sm:max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>New Prescription</DialogTitle>
            <DialogDescription>
              Create a new e-prescription
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Patient</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Doctor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doc1">Dr. Sarah Jenkins</SelectItem>
                    <SelectItem value="doc2">Dr. Michael Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-4">Medications</h3>
              <div className="border rounded-lg p-4">
                <div className="text-center text-gray-500 py-8">
                  No medications added. Click "Add Medication" to add items.
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Medication
              </Button>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Diagnosis / Indication</Label>
              <Textarea placeholder="Enter diagnosis or reason for prescription..." />
            </div>

            <div className="space-y-2">
              <Label>Clinical Notes</Label>
              <Textarea placeholder="Additional clinical notes..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Refills Allowed</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input type="date" />
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowNewPrescriptionDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Prescription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDispenseDialog} onOpenChange={setShowDispenseDialog}>
        <DialogContent className="sm:max-w-2xl w-[95vw]">
          <DialogHeader>
            <DialogTitle>Dispense Prescription</DialogTitle>
            <DialogDescription>
              {selectedPrescription?.prescriptionNumber} - {selectedPrescription?.patientName}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              {selectedPrescription?.items.map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold">{item.drugName}</h4>
                    <Badge variant="outline">{item.dosage}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Batch Number</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="batch1">BATCH-ATO-2025-01 (Exp: 2028-01-15)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity to Dispense</Label>
                      <Input type="number" defaultValue={item.quantity} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Delivery Method</Label>
              <Select defaultValue="in-person">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-person">In-Person Pickup</SelectItem>
                  <SelectItem value="home-delivery">Home Delivery</SelectItem>
                  <SelectItem value="courier">Courier</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Pharmacist Notes</Label>
              <Textarea placeholder="Counseling notes, special instructions..." />
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowDispenseDialog(false)}>
              Cancel
            </Button>
            <Button type="submit">Complete Dispensing</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDrugInfoDialog} onOpenChange={setShowDrugInfoDialog}>
        <DialogContent className="sm:max-w-2xl w-[95vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedDrug?.name}</DialogTitle>
            <DialogDescription>
              {selectedDrug?.genericName} | {selectedDrug?.brandName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Drug Code</p>
                <p className="font-medium">{selectedDrug?.code}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Schedule</p>
                <p className="font-medium">{selectedDrug?.schedule}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Manufacturer</p>
                <p className="font-medium">{selectedDrug?.manufacturer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">CDSCO ID</p>
                <p className="font-medium">{selectedDrug?.cdscoId}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2">Contraindications</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDrug?.contraindications.map((c, i) => (
                  <Badge key={i} variant="destructive">{c}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Warnings</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {selectedDrug?.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Side Effects</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                {selectedDrug?.sideEffects.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Drug Interactions</h4>
              <div className="space-y-2">
                {selectedDrug?.drugInteractions.map((interaction, i) => (
                  <div key={i} className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{interaction.drugName}</span>
                      <Badge className={getInteractionSeverityColor(interaction.severity)}>
                        {interaction.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{interaction.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Pregnancy & Lactation</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Pregnancy Category</p>
                  <p className="font-medium">{selectedDrug?.pregnancyCategory}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Lactation</p>
                  <p className="font-medium capitalize">{selectedDrug?.lactation}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Storage</h4>
              <p className="text-sm">{selectedDrug?.storage}</p>
              <p className="text-xs text-gray-500 mt-1">Shelf Life: {selectedDrug?.shelfLife} months</p>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => window.open('https://cdsco.gov.in', '_blank')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View on CDSCO
              </Button>
              <Button variant="outline" onClick={() => setShowDrugInfoDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}