
'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/admin/dropdown-menu';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Package,
  AlertTriangle,
  AlertCircle,
  Bell,
  QrCode,
  Scan,
  Warehouse,
  Pill,
  Syringe,
  Thermometer,
  Box,
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
  BellRing,
  StarOff,
  Menu,
  X,
} from 'lucide-react';
import Sidebar from '@/components/admin/Sidebar';

// Types (keeping all your existing type definitions)
type Warehouse = {
  id: string;
  name: string;
  location: string;
  type: 'main' | 'satellite' | 'pharmacy' | 'ward';
  capacity: number;
  currentLoad: number;
  temperature: {
    current: number;
    min: number;
    max: number;
    unit: 'C' | 'F';
  };
  humidity: number;
  staff: {
    id: string;
    name: string;
    role: string;
  }[];
};

type Supplier = {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  rating: number;
  paymentTerms: string;
  leadTime: number;
  categories: string[];
  certifications: string[];
  status: 'active' | 'inactive' | 'blacklisted';
};

type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: 'drug' | 'equipment' | 'supply';
  subCategory: string;
  manufacturer: string;
  supplier: string;
  supplierId: string;
  batches: {
    batchNumber: string;
    lotNumber: string;
    manufacturingDate: string;
    expiryDate: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    location: string;
    receivedDate: string;
    receivedBy: string;
    qualityCheck: 'passed' | 'pending' | 'failed';
    certificates?: string[];
  }[];
  totalQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  reorderPoint: number;
  reorderQuantity: number;
  storageConditions: {
    temperature?: { min: number; max: number; unit: 'C' | 'F' };
    humidity?: { min: number; max: number };
    lightSensitive: boolean;
    sterile: boolean;
    controlled: boolean;
  };
  unitCost: number;
  sellingPrice: number;
  margin: number;
  monthlyUsage: number;
  turnoverRate: number;
  lastOrdered: string;
  lastCounted: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired' | 'discontinued';
  isActive: boolean;
  barcode: string;
  qrCode: string;
};

type Order = {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplierName: string;
  items: {
    itemId: string;
    name: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    total: number;
    received?: number;
  }[];
  status: 'draft' | 'pending' | 'approved' | 'ordered' | 'shipped' | 'partial' | 'received' | 'cancelled';
  orderDate: string;
  expectedDelivery: string;
  receivedDate?: string;
  totalAmount: number;
  paidAmount: number;
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  paymentDue?: string;
  notes?: string;
  attachments?: string[];
  createdBy: string;
  approvedBy?: string;
};

type Alert = {
  id: string;
  type: 'low-stock' | 'expiry' | 'reorder' | 'quality' | 'temperature' | 'recall';
  severity: 'critical' | 'warning' | 'info';
  itemId: string;
  itemName: string;
  batchNumber?: string;
  message: string;
  details: string;
  timestamp: string;
  acknowledged: boolean;
  resolved: boolean;
  action?: string;
};

// Mock Data (keeping all your existing data)
const warehouses: Warehouse[] = [
  {
    id: 'wh1',
    name: 'Central Warehouse',
    location: 'Building A, Ground Floor',
    type: 'main',
    capacity: 50000,
    currentLoad: 34200,
    temperature: { current: 22, min: 18, max: 25, unit: 'C' },
    humidity: 45,
    staff: [
      { id: 's1', name: 'John Smith', role: 'Warehouse Manager' },
      { id: 's2', name: 'Maria Garcia', role: 'Inventory Specialist' },
    ],
  },
  {
    id: 'wh2',
    name: 'Pharmacy Store',
    location: 'Building B, First Floor',
    type: 'pharmacy',
    capacity: 15000,
    currentLoad: 12300,
    temperature: { current: 21, min: 18, max: 25, unit: 'C' },
    humidity: 40,
    staff: [
      { id: 's3', name: 'David Lee', role: 'Chief Pharmacist' },
    ],
  },
  {
    id: 'wh3',
    name: 'Equipment Storage',
    location: 'Building C, Basement',
    type: 'satellite',
    capacity: 25000,
    currentLoad: 18900,
    temperature: { current: 20, min: 15, max: 27, unit: 'C' },
    humidity: 50,
    staff: [
      { id: 's4', name: 'Robert Chen', role: 'Equipment Manager' },
    ],
  },
];

const suppliers: Supplier[] = [
  {
    id: 'sup1',
    name: 'MediSupply Co.',
    contactPerson: 'James Wilson',
    email: 'orders@medisupply.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Blvd, Suite 100, Health City, HC 12345',
    website: 'www.medisupply.com',
    rating: 4.5,
    paymentTerms: 'Net 30',
    leadTime: 3,
    categories: ['drugs', 'supplies'],
    certifications: ['ISO 13485', 'FDA Approved'],
    status: 'active',
  },
  {
    id: 'sup2',
    name: 'PharmaCorp International',
    contactPerson: 'Sarah Johnson',
    email: 'sales@pharmacorp.com',
    phone: '+1 (555) 234-5678',
    address: '456 Pharma Way, Suite 200, Med City, MC 67890',
    website: 'www.pharmacorp.com',
    rating: 4.8,
    paymentTerms: 'Net 45',
    leadTime: 5,
    categories: ['drugs', 'controlled'],
    certifications: ['GMP', 'ISO 9001', 'WHO Certified'],
    status: 'active',
  },
  {
    id: 'sup3',
    name: 'MedTech Equipment',
    contactPerson: 'Michael Brown',
    email: 'info@medtechequip.com',
    phone: '+1 (555) 345-6789',
    address: '789 Tech Park, Innovation City, IC 13579',
    website: 'www.medtechequip.com',
    rating: 4.2,
    paymentTerms: 'Net 30',
    leadTime: 7,
    categories: ['equipment'],
    certifications: ['CE Mark', 'ISO 13485'],
    status: 'active',
  },
];

const inventoryItems: InventoryItem[] = [
  {
    id: 'item1',
    sku: 'DRG-AMOX-500',
    name: 'Amoxicillin 500mg Capsules',
    description: 'Antibiotic medication, 100 capsules per bottle',
    category: 'drug',
    subCategory: 'Antibiotics',
    manufacturer: 'PharmaCorp',
    supplier: 'PharmaCorp International',
    supplierId: 'sup2',
    batches: [
      {
        batchNumber: 'BATCH-AMOX-2025-01',
        lotNumber: 'LOT-A1-001',
        manufacturingDate: '2025-01-15',
        expiryDate: '2027-01-14',
        quantity: 4500,
        unit: 'capsules',
        unitPrice: 0.25,
        location: 'wh1:A-01-01',
        receivedDate: '2025-01-20',
        receivedBy: 'Maria Garcia',
        qualityCheck: 'passed',
      },
      {
        batchNumber: 'BATCH-AMOX-2025-02',
        lotNumber: 'LOT-A1-002',
        manufacturingDate: '2025-02-10',
        expiryDate: '2027-02-09',
        quantity: 5000,
        unit: 'capsules',
        unitPrice: 0.26,
        location: 'wh1:A-01-02',
        receivedDate: '2025-02-15',
        receivedBy: 'Maria Garcia',
        qualityCheck: 'passed',
      },
    ],
    totalQuantity: 9500,
    minStockLevel: 2000,
    maxStockLevel: 10000,
    reorderPoint: 3000,
    reorderQuantity: 5000,
    storageConditions: {
      temperature: { min: 15, max: 25, unit: 'C' },
      humidity: { min: 30, max: 60 },
      lightSensitive: true,
      sterile: false,
      controlled: false,
    },
    unitCost: 0.22,
    sellingPrice: 0.45,
    margin: 51.1,
    monthlyUsage: 1800,
    turnoverRate: 8.2,
    lastOrdered: '2025-02-15',
    lastCounted: '2025-03-01',
    status: 'in-stock',
    isActive: true,
    barcode: '8901234567890',
    qrCode: 'qr-amox-500',
  },
  {
    id: 'item2',
    sku: 'DRG-INSU-100',
    name: 'Insulin Glargine 100U/mL',
    description: 'Long-acting insulin, 10mL vials, box of 5',
    category: 'drug',
    subCategory: 'Diabetes',
    manufacturer: 'MediPharm',
    supplier: 'MediSupply Co.',
    supplierId: 'sup1',
    batches: [
      {
        batchNumber: 'BATCH-INSU-2024-12',
        lotNumber: 'LOT-I2-001',
        manufacturingDate: '2024-12-05',
        expiryDate: '2025-12-04',
        quantity: 120,
        unit: 'vials',
        unitPrice: 28.50,
        location: 'wh2:B-02-01',
        receivedDate: '2024-12-10',
        receivedBy: 'David Lee',
        qualityCheck: 'passed',
      },
      {
        batchNumber: 'BATCH-INSU-2025-01',
        lotNumber: 'LOT-I2-002',
        manufacturingDate: '2025-01-20',
        expiryDate: '2026-01-19',
        quantity: 80,
        unit: 'vials',
        unitPrice: 29.75,
        location: 'wh2:B-02-02',
        receivedDate: '2025-01-25',
        receivedBy: 'David Lee',
        qualityCheck: 'passed',
      },
    ],
    totalQuantity: 200,
    minStockLevel: 100,
    maxStockLevel: 500,
    reorderPoint: 150,
    reorderQuantity: 200,
    storageConditions: {
      temperature: { min: 2, max: 8, unit: 'C' },
      lightSensitive: true,
      sterile: false,
      controlled: false,
    },
    unitCost: 25.00,
    sellingPrice: 42.00,
    margin: 40.5,
    monthlyUsage: 85,
    turnoverRate: 5.1,
    lastOrdered: '2025-01-25',
    lastCounted: '2025-03-01',
    status: 'low-stock',
    isActive: true,
    barcode: '8901234567891',
    qrCode: 'qr-insu-100',
  },
  {
    id: 'item3',
    sku: 'EQP-VENT-X1',
    name: 'Ventilator X1 Pro',
    description: 'Advanced ventilator with ICU capabilities',
    category: 'equipment',
    subCategory: 'Respiratory',
    manufacturer: 'MedTech Inc.',
    supplier: 'MedTech Equipment',
    supplierId: 'sup3',
    batches: [
      {
        batchNumber: 'BATCH-VENT-2024-01',
        lotNumber: 'LOT-V1-001',
        manufacturingDate: '2024-06-15',
        expiryDate: '2029-06-14',
        quantity: 15,
        unit: 'units',
        unitPrice: 12500,
        location: 'wh3:C-01-01',
        receivedDate: '2024-07-01',
        receivedBy: 'Robert Chen',
        qualityCheck: 'passed',
        certificates: ['cert-vent-001.pdf'],
      },
    ],
    totalQuantity: 15,
    minStockLevel: 5,
    maxStockLevel: 30,
    reorderPoint: 8,
    reorderQuantity: 10,
    storageConditions: {
      temperature: { min: 10, max: 30, unit: 'C' },
      humidity: { min: 20, max: 70 },
      lightSensitive: false,
      sterile: false,
      controlled: false,
    },
    unitCost: 10500,
    sellingPrice: 15750,
    margin: 33.3,
    monthlyUsage: 2,
    turnoverRate: 1.2,
    lastOrdered: '2024-07-01',
    lastCounted: '2025-02-15',
    status: 'in-stock',
    isActive: true,
    barcode: '8901234567892',
    qrCode: 'qr-vent-x1',
  },
  {
    id: 'item4',
    sku: 'SUP-GLOV-NTR',
    name: 'Nitrile Gloves - Large',
    description: 'Powder-free, sterile examination gloves, box of 100',
    category: 'supply',
    subCategory: 'PPE',
    manufacturer: 'SafeHands Inc.',
    supplier: 'MediSupply Co.',
    supplierId: 'sup1',
    batches: [
      {
        batchNumber: 'BATCH-GLOV-2024-11',
        lotNumber: 'LOT-G1-001',
        manufacturingDate: '2024-11-10',
        expiryDate: '2026-11-09',
        quantity: 2500,
        unit: 'boxes',
        unitPrice: 8.50,
        location: 'wh1:D-03-01',
        receivedDate: '2024-11-15',
        receivedBy: 'Maria Garcia',
        qualityCheck: 'passed',
      },
      {
        batchNumber: 'BATCH-GLOV-2025-01',
        lotNumber: 'LOT-G1-002',
        manufacturingDate: '2025-01-05',
        expiryDate: '2027-01-04',
        quantity: 3000,
        unit: 'boxes',
        unitPrice: 8.75,
        location: 'wh1:D-03-02',
        receivedDate: '2025-01-10',
        receivedBy: 'Maria Garcia',
        qualityCheck: 'passed',
      },
      {
        batchNumber: 'BATCH-GLOV-2025-02',
        lotNumber: 'LOT-G1-003',
        manufacturingDate: '2025-02-20',
        expiryDate: '2027-02-19',
        quantity: 1000,
        unit: 'boxes',
        unitPrice: 9.00,
        location: 'wh1:D-03-03',
        receivedDate: '2025-02-25',
        receivedBy: 'Maria Garcia',
        qualityCheck: 'pending',
      },
    ],
    totalQuantity: 6500,
    minStockLevel: 2000,
    maxStockLevel: 10000,
    reorderPoint: 3000,
    reorderQuantity: 5000,
    storageConditions: {
      temperature: { min: 15, max: 30, unit: 'C' },
      humidity: { min: 30, max: 70 },
      lightSensitive: false,
      sterile: true,
      controlled: false,
    },
    unitCost: 7.50,
    sellingPrice: 12.99,
    margin: 42.3,
    monthlyUsage: 2200,
    turnoverRate: 4.2,
    lastOrdered: '2025-02-25',
    lastCounted: '2025-03-01',
    status: 'in-stock',
    isActive: true,
    barcode: '8901234567893',
    qrCode: 'qr-glove-l',
  },
  {
    id: 'item5',
    sku: 'DRG-MORP-10',
    name: 'Morphine Sulfate 10mg/mL',
    description: 'Controlled substance, 1mL ampules, box of 25',
    category: 'drug',
    subCategory: 'Controlled',
    manufacturer: 'PharmaCorp',
    supplier: 'PharmaCorp International',
    supplierId: 'sup2',
    batches: [
      {
        batchNumber: 'BATCH-MORP-2024-09',
        lotNumber: 'LOT-M1-001',
        manufacturingDate: '2024-09-10',
        expiryDate: '2025-09-09',
        quantity: 450,
        unit: 'ampules',
        unitPrice: 12.50,
        location: 'wh2:C-01-01',
        receivedDate: '2024-09-15',
        receivedBy: 'David Lee',
        qualityCheck: 'passed',
      },
    ],
    totalQuantity: 450,
    minStockLevel: 200,
    maxStockLevel: 1000,
    reorderPoint: 300,
    reorderQuantity: 500,
    storageConditions: {
      temperature: { min: 15, max: 25, unit: 'C' },
      lightSensitive: true,
      sterile: true,
      controlled: true,
    },
    unitCost: 9.80,
    sellingPrice: 18.50,
    margin: 47.0,
    monthlyUsage: 180,
    turnoverRate: 4.8,
    lastOrdered: '2024-09-15',
    lastCounted: '2025-02-28',
    status: 'low-stock',
    isActive: true,
    barcode: '8901234567894',
    qrCode: 'qr-morp-10',
  },
];

const orders: Order[] = [
  {
    id: 'ord1',
    orderNumber: 'PO-2025-0042',
    supplierId: 'sup2',
    supplierName: 'PharmaCorp International',
    items: [
      {
        itemId: 'item1',
        name: 'Amoxicillin 500mg Capsules',
        quantity: 5000,
        unit: 'capsules',
        unitPrice: 0.26,
        total: 1300,
      },
    ],
    status: 'received',
    orderDate: '2025-02-10',
    expectedDelivery: '2025-02-17',
    receivedDate: '2025-02-15',
    totalAmount: 1300,
    paidAmount: 1300,
    paymentStatus: 'paid',
    createdBy: 'Maria Garcia',
    approvedBy: 'John Smith',
  },
  {
    id: 'ord2',
    orderNumber: 'PO-2025-0051',
    supplierId: 'sup1',
    supplierName: 'MediSupply Co.',
    items: [
      {
        itemId: 'item4',
        name: 'Nitrile Gloves - Large',
        quantity: 5000,
        unit: 'boxes',
        unitPrice: 8.75,
        total: 43750,
      },
      {
        itemId: 'item2',
        name: 'Insulin Glargine 100U/mL',
        quantity: 200,
        unit: 'vials',
        unitPrice: 29.75,
        total: 5950,
      },
    ],
    status: 'shipped',
    orderDate: '2025-02-20',
    expectedDelivery: '2025-02-27',
    totalAmount: 49700,
    paidAmount: 0,
    paymentStatus: 'unpaid',
    createdBy: 'Maria Garcia',
  },
  {
    id: 'ord3',
    orderNumber: 'PO-2025-0058',
    supplierId: 'sup3',
    supplierName: 'MedTech Equipment',
    items: [
      {
        itemId: 'item3',
        name: 'Ventilator X1 Pro',
        quantity: 5,
        unit: 'units',
        unitPrice: 12500,
        total: 62500,
      },
    ],
    status: 'pending',
    orderDate: '2025-02-25',
    expectedDelivery: '2025-03-05',
    totalAmount: 62500,
    paidAmount: 0,
    paymentStatus: 'unpaid',
    createdBy: 'Robert Chen',
  },
];

const alerts: Alert[] = [
  {
    id: 'alert1',
    type: 'low-stock',
    severity: 'warning',
    itemId: 'item2',
    itemName: 'Insulin Glargine 100U/mL',
    message: 'Low stock alert',
    details: 'Current quantity (200 vials) is below reorder point (300 vials)',
    timestamp: '2025-03-01T08:00:00Z',
    acknowledged: false,
    resolved: false,
    action: 'Reorder now',
  },
  {
    id: 'alert2',
    type: 'expiry',
    severity: 'critical',
    itemId: 'item5',
    itemName: 'Morphine Sulfate 10mg/mL',
    batchNumber: 'BATCH-MORP-2024-09',
    message: 'Batch expiring in 60 days',
    details: 'Batch LOT-M1-001 expires on 2025-09-09 (60 days from now)',
    timestamp: '2025-03-01T08:00:00Z',
    acknowledged: false,
    resolved: false,
    action: 'Review stock',
  },
  {
    id: 'alert3',
    type: 'reorder',
    severity: 'info',
    itemId: 'item1',
    itemName: 'Amoxicillin 500mg Capsules',
    message: 'Reorder recommendation',
    details: 'Based on monthly usage (1800 capsules), consider reordering',
    timestamp: '2025-03-01T08:00:00Z',
    acknowledged: false,
    resolved: false,
    action: 'Create order',
  },
  {
    id: 'alert4',
    type: 'temperature',
    severity: 'critical',
    itemId: 'wh2',
    itemName: 'Pharmacy Store',
    message: 'Temperature out of range',
    details: 'Current temperature 9°C exceeds maximum 8°C for refrigerated items',
    timestamp: '2025-03-01T09:45:00Z',
    acknowledged: false,
    resolved: false,
    action: 'Check cooling system',
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

const calculateDaysUntilExpiry = (expiryDate: string) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const getExpiryStatus = (days: number) => {
  if (days < 0) return { label: 'Expired', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' };
  if (days <= 30) return { label: 'Critical', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' };
  if (days <= 90) return { label: 'Warning', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' };
  return { label: 'Good', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' };
};

const getStockStatusColor = (status: string) => {
  switch (status) {
    case 'in-stock': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    case 'low-stock': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
    case 'out-of-stock': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
    case 'expired': return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
  }
};

const getAlertSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical': return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'warning': return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    default: return <Bell className="h-5 w-5 text-blue-500" />;
  }
};

export default function InventoryManagementPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter inventory items
  const filteredItems = useMemo(() => {
    return inventoryItems.filter(item => {
      const matchesSearch = searchQuery === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, categoryFilter, statusFilter]);

  // Calculate dashboard stats
  const stats = useMemo(() => {
    const totalItems = inventoryItems.length;
    const totalValue = inventoryItems.reduce((sum, item) => sum + (item.totalQuantity * item.unitCost), 0);
    const lowStockItems = inventoryItems.filter(item => item.status === 'low-stock').length;
    const expiringItems = inventoryItems.filter(item => 
      item.batches.some(batch => {
        const days = calculateDaysUntilExpiry(batch.expiryDate);
        return days <= 90 && days > 0;
      })
    ).length;
    const activeAlerts = alerts.filter(a => !a.acknowledged).length;
    
    return {
      totalItems,
      totalValue,
      lowStockItems,
      expiringItems,
      activeAlerts,
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:ml-0 min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                  Inventory Management
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                  Track drugs, equipment, and supplies with real-time alerts
                </p>
              </div>
              
              {/* Header Actions - Stack on mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Warehouse Selector - Hidden on small mobile, visible on larger screens */}
                <div className="hidden sm:block">
                  <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Warehouse className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select Warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Warehouses</SelectItem>
                      {warehouses.map(w => (
                        <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col xs:flex-row gap-2">
                  <Button 
                    onClick={() => setShowScanDialog(true)} 
                    size="sm"
                    className="w-full xs:w-auto"
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    <span className="xs:inline">Scan</span>
                  </Button>
                  <Button 
                    onClick={() => setShowOrderDialog(true)}
                    size="sm"
                    className="w-full xs:w-auto"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="xs:inline">New Order</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Mobile Warehouse Selector - Visible only on small screens */}
          <div className="mb-4 sm:hidden">
            <Select value={selectedWarehouse} onValueChange={setSelectedWarehouse}>
              <SelectTrigger className="w-full">
                <Warehouse className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select Warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                {warehouses.map(w => (
                  <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Alerts Bar */}
          {stats.activeAlerts > 0 && (
            <div className="mb-6">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <BellRing className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                      {stats.activeAlerts} active {stats.activeAlerts === 1 ? 'alert' : 'alerts'} require attention
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setActiveTab('alerts')}
                    className="w-full sm:w-auto"
                  >
                    View Alerts
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Tabs - Fixed Structure */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            {/* Tabs List - Scrollable on Mobile */}
            <div className="w-full overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0">
              <TabsList className="inline-flex w-max lg:w-full lg:grid lg:grid-cols-7">
                <TabsTrigger value="dashboard" className="px-4 py-2 text-sm whitespace-nowrap">Dashboard</TabsTrigger>
                <TabsTrigger value="inventory" className="px-4 py-2 text-sm whitespace-nowrap">Inventory</TabsTrigger>
                <TabsTrigger value="batches" className="px-4 py-2 text-sm whitespace-nowrap">Batch Tracking</TabsTrigger>
                <TabsTrigger value="orders" className="px-4 py-2 text-sm whitespace-nowrap">Orders</TabsTrigger>
                <TabsTrigger value="suppliers" className="px-4 py-2 text-sm whitespace-nowrap">Suppliers</TabsTrigger>
                <TabsTrigger value="alerts" className="px-4 py-2 text-sm whitespace-nowrap">Alerts</TabsTrigger>
                <TabsTrigger value="analytics" className="px-4 py-2 text-sm whitespace-nowrap">Analytics</TabsTrigger>
              </TabsList>
            </div>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats Cards - Responsive Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">Total Items</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                          {stats.totalItems}
                        </p>
                      </div>
                      <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex-shrink-0">
                        <Package className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">Inventory Value</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                          {formatCurrency(stats.totalValue)}
                        </p>
                      </div>
                      <div className="p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg flex-shrink-0">
                        <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">Low Stock Items</p>
                        <p className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
                          {stats.lowStockItems}
                        </p>
                      </div>
                      <div className="p-2 sm:p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">Expiring Soon</p>
                        <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                          {stats.expiringItems}
                        </p>
                      </div>
                      <div className="p-2 sm:p-3 bg-red-50 dark:bg-red-900/20 rounded-lg flex-shrink-0">
                        <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">Active Alerts</p>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {stats.activeAlerts}
                        </p>
                      </div>
                      <div className="p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex-shrink-0">
                        <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Warehouse Overview */}
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-base sm:text-lg">Warehouse Overview</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {warehouses.map(warehouse => (
                      <div key={warehouse.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                            {warehouse.name}
                          </h3>
                          <Badge variant="outline" className="w-fit text-xs">{warehouse.type}</Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">
                          {warehouse.location}
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Capacity</span>
                            <span className="font-medium">
                              {Math.round((warehouse.currentLoad / warehouse.capacity) * 100)}%
                            </span>
                          </div>
                          <Progress value={(warehouse.currentLoad / warehouse.capacity) * 100} className="h-2" />
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:text-sm">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 block">Temperature</span>
                            <span className="font-medium">
                              {warehouse.temperature.current}°{warehouse.temperature.unit}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400 block">Humidity</span>
                            <span className="font-medium">{warehouse.humidity}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card>
                <CardHeader className="px-4 sm:px-6">
                  <CardTitle className="text-base sm:text-lg">Recent Alerts</CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="space-y-4">
                    {alerts.slice(0, 3).map(alert => (
                      <div key={alert.id} className="flex flex-col sm:flex-row items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex-shrink-0">
                          {getAlertSeverityIcon(alert.severity)}
                        </div>
                        <div className="flex-1 w-full sm:w-auto min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white break-words">
                            {alert.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 break-words">
                            {alert.details}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            {formatDateTime(alert.timestamp)}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="w-full sm:w-auto mt-2 sm:mt-0">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inventory Tab */}
            <TabsContent value="inventory" className="space-y-6">
              {/* Filters - Stack on Mobile */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, SKU, or manufacturer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
                <div className="flex flex-col xs:flex-row gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full xs:w-[160px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="drug">Drugs</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="supply">Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full xs:w-[160px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Inventory Table - Scrollable */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[800px] lg:min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 font-medium">Item</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Category</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Stock Level</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Batches</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Unit Cost</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Status</th>
                        <th className="px-4 sm:px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg flex-shrink-0 ${
                                item.category === 'drug' ? 'bg-red-50 dark:bg-red-900/20' :
                                item.category === 'equipment' ? 'bg-blue-50 dark:bg-blue-900/20' :
                                'bg-green-50 dark:bg-green-900/20'
                              }`}>
                                {item.category === 'drug' && <Pill className="h-4 w-4 text-red-600 dark:text-red-400" />}
                                {item.category === 'equipment' && <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                                {item.category === 'supply' && <Box className="h-4 w-4 text-green-600 dark:text-green-400" />}
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white truncate max-w-[120px] sm:max-w-[200px]">
                                  {item.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SKU: {item.sku}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="text-gray-600 dark:text-gray-300 capitalize text-xs sm:text-sm">
                              {item.category}
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">{item.subCategory}</p>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                {item.totalQuantity} {item.batches[0]?.unit}
                              </span>
                              <div className="w-16 sm:w-20">
                                <Progress 
                                  value={(item.totalQuantity / item.maxStockLevel) * 100} 
                                  className="h-1.5"
                                />
                              </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 hidden sm:block">
                              Min: {item.minStockLevel} | Max: {item.maxStockLevel}
                            </p>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <span className="text-xs sm:text-sm font-medium">{item.batches.length} batches</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400 hidden lg:block">
                              Earliest: {formatDate(item.batches.sort((a, b) => 
                                new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
                              )[0]?.expiryDate)}
                            </p>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                            {formatCurrency(item.unitCost)}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <Badge className={`${getStockStatusColor(item.status)} text-xs`}>
                              {item.status.replace('-', ' ')}
                            </Badge>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1 sm:gap-2">
                              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                                <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                                <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8">
                                    <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="text-xs sm:text-sm">View Batches</DropdownMenuItem>
                                  <DropdownMenuItem className="text-xs sm:text-sm">View Movements</DropdownMenuItem>
                                  <DropdownMenuItem className="text-xs sm:text-sm">Create Order</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-xs sm:text-sm text-red-600">Deactivate</DropdownMenuItem>
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

            {/* Batch Tracking Tab */}
            <TabsContent value="batches" className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[800px] lg:min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 font-medium">Item</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Batch/Lot</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Quantity</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Location</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Mfg Date</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Expiry</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Status</th>
                        <th className="px-4 sm:px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {inventoryItems.flatMap(item => 
                        item.batches.map(batch => {
                          const daysToExpiry = calculateDaysUntilExpiry(batch.expiryDate);
                          const expiryStatus = getExpiryStatus(daysToExpiry);
                          
                          return (
                            <tr key={`${item.id}-${batch.batchNumber}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <td className="px-4 sm:px-6 py-4">
                                <div className="min-w-0">
                                  <p className="font-medium text-gray-900 dark:text-white text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[150px]">
                                    {item.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">SKU: {item.sku}</p>
                                </div>
                              </td>
                              <td className="px-4 sm:px-6 py-4">
                                <div>
                                  <p className="text-xs sm:text-sm font-medium truncate max-w-[100px] sm:max-w-none">
                                    {batch.batchNumber}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">Lot: {batch.lotNumber}</p>
                                </div>
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap">
                                {batch.quantity} {batch.unit}
                              </td>
                              <td className="px-4 sm:px-6 py-4 font-mono text-xs truncate max-w-[80px] sm:max-w-none">
                                {batch.location}
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap">
                                {formatDate(batch.manufacturingDate)}
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap">
                                {formatDate(batch.expiryDate)}
                              </td>
                              <td className="px-4 sm:px-6 py-4">
                                <Badge className={`${expiryStatus.color} text-xs`}>
                                  {expiryStatus.label}
                                </Badge>
                              </td>
                              <td className="px-4 sm:px-6 py-4 text-right">
                                <Button variant="ghost" size="sm" className="h-7 text-xs sm:h-8 sm:text-sm">
                                  View
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <Button onClick={() => setShowOrderDialog(true)} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Order
                </Button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left min-w-[800px] lg:min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 font-medium">Order #</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Supplier</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Items</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Order Date</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Expected</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Total</th>
                        <th className="px-4 sm:px-6 py-3 font-medium">Status</th>
                        <th className="px-4 sm:px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 sm:px-6 py-4 font-medium text-xs sm:text-sm">
                            {order.orderNumber}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                            {order.supplierName}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm">
                            {order.items.length} items
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap">
                            {formatDate(order.orderDate)}
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap">
                            {formatDate(order.expectedDelivery)}
                          </td>
                          <td className="px-4 sm:px-6 py-4 font-medium text-xs sm:text-sm">
                            {formatCurrency(order.totalAmount)}
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <Badge variant={
                              order.status === 'received' ? 'default' :
                              order.status === 'shipped' ? 'secondary' :
                              order.status === 'pending' ? 'outline' :
                              'destructive'
                            } className="text-xs">
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-4 sm:px-6 py-4 text-right">
                            <Button variant="ghost" size="sm" className="h-7 text-xs sm:h-8 sm:text-sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Suppliers Tab */}
            <TabsContent value="suppliers" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-end gap-3">
                <Button onClick={() => setShowSupplierDialog(true)} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Supplier
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suppliers.map(supplier => (
                  <Card key={supplier.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                            {supplier.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                            {supplier.contactPerson}
                          </p>
                        </div>
                        <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'} className="w-fit text-xs">
                          {supplier.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{supplier.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{supplier.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="truncate">{supplier.address}</span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1 sm:gap-2">
                        {supplier.categories.map(cat => (
                          <Badge key={cat} variant="outline" className="text-xs">
                            {cat}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => {
                            if (i < Math.floor(supplier.rating)) {
                              return <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />;
                            } else if (i < supplier.rating) {
                              return <StarHalf key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />;
                            } else {
                              return <StarOff key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />;
                            }
                          })}
                          <span className="text-xs sm:text-sm ml-1">{supplier.rating}</span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-500">
                          Lead: {supplier.leadTime}d
                        </span>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">Contact</Button>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto text-xs sm:text-sm">Orders</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts" className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {alerts.map(alert => (
                  <Card key={alert.id} className={`border-l-4 ${
                    alert.severity === 'critical' ? 'border-l-red-500' :
                    alert.severity === 'warning' ? 'border-l-amber-500' :
                    'border-l-blue-500'
                  }`}>
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="flex-shrink-0">
                          {getAlertSeverityIcon(alert.severity)}
                        </div>
                        <div className="flex-1 w-full min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base break-words">
                              {alert.message}
                            </h3>
                            <Badge variant="outline" className="w-fit text-xs">{alert.type}</Badge>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mt-1 break-words">
                            {alert.details}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="truncate">Item: {alert.itemName}</span>
                            {alert.batchNumber && <span className="truncate">Batch: {alert.batchNumber}</span>}
                            <span className="text-xs whitespace-nowrap">{formatDateTime(alert.timestamp)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                          <Button size="sm" variant="outline" className="flex-1 sm:flex-none text-xs">Acknowledge</Button>
                          {alert.action && (
                            <Button size="sm" className="flex-1 sm:flex-none text-xs">{alert.action}</Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Usage Trends */}
                <Card>
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-base sm:text-lg">Monthly Usage Trends</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="h-[200px] sm:h-[300px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-xs sm:text-sm text-gray-500">Chart component placeholder</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Turnover Rates */}
                <Card>
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-base sm:text-lg">Inventory Turnover</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="space-y-4">
                      {inventoryItems.slice(0, 5).map(item => (
                        <div key={item.id}>
                          <div className="flex justify-between text-xs sm:text-sm mb-1">
                            <span className="text-gray-600 dark:text-gray-300 truncate max-w-[120px] sm:max-w-[200px]">
                              {item.name}
                            </span>
                            <span className="font-medium whitespace-nowrap ml-2">{item.turnoverRate}x</span>
                          </div>
                          <Progress value={(item.turnoverRate / 12) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Stock Value by Category */}
                <Card>
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-base sm:text-lg">Stock Value by Category</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="space-y-4">
                      {['drug', 'equipment', 'supply'].map(cat => {
                        const value = inventoryItems
                          .filter(i => i.category === cat)
                          .reduce((sum, i) => sum + (i.totalQuantity * i.unitCost), 0);
                        const percentage = stats.totalValue > 0 ? (value / stats.totalValue) * 100 : 0;
                        
                        return (
                          <div key={cat}>
                            <div className="flex justify-between text-xs sm:text-sm mb-1">
                              <span className="capitalize text-gray-600 dark:text-gray-300">{cat}</span>
                              <span className="font-medium">{formatCurrency(value)}</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Expiry Forecast */}
                <Card>
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-base sm:text-lg">Expiry Forecast</CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Expired</span>
                        <Badge className="bg-red-100 text-red-800 text-xs">2 items</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Expiring in 30 days</span>
                        <Badge className="bg-red-100 text-red-800 text-xs">1 item</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Expiring in 90 days</span>
                        <Badge className="bg-amber-100 text-amber-800 text-xs">3 items</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer Disclaimer */}
          <footer className="mt-12 text-center px-4">
            <p className="text-xs text-gray-400 max-w-2xl mx-auto">
              This inventory management system tracks all medical supplies, equipment, and pharmaceuticals.
              Always verify expiry dates and storage conditions before use.
            </p>
            <p className="text-xs text-gray-400 mt-2">
              © 2026 HealthSync Hospital Management System. All rights reserved.
            </p>
          </footer>
        </main>
      </div>

      {/* Dialogs - keeping your existing dialogs */}
      <Dialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <DialogContent className="sm:max-w-md w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle>Scan Barcode/QR Code</DialogTitle>
            <DialogDescription>
              Position the code in front of your camera to scan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
              <QrCode className="h-16 w-16 sm:h-24 sm:w-24 text-gray-400" />
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
              Camera access required. Click below to start scanning.
            </p>
            <Button className="mt-4 w-full sm:w-auto">
              <Scan className="h-4 w-4 mr-2" />
              Start Scanning
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button variant="secondary" onClick={() => setShowScanDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
            <DialogDescription>
              Create a new purchase order for supplies.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Expected Delivery</Label>
                <Input type="date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Items</Label>
              <div className="border rounded-lg p-4">
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No items added. Click "Add Item" to add items.
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowOrderDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">Create Order</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSupplierDialog} onOpenChange={setShowSupplierDialog}>
        <DialogContent className="sm:max-w-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Supplier</DialogTitle>
            <DialogDescription>
              Add a new supplier to your vendor list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input placeholder="e.g., PharmaCorp Inc." />
              </div>
              <div className="space-y-2">
                <Label>Contact Person</Label>
                <Input placeholder="Full name" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="contact@company.com" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="+1 (555) 123-4567" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input placeholder="Street address" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Payment Terms</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net15">Net 15</SelectItem>
                    <SelectItem value="net30">Net 30</SelectItem>
                    <SelectItem value="net45">Net 45</SelectItem>
                    <SelectItem value="prepaid">Prepaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Lead Time (days)</Label>
                <Input type="number" placeholder="e.g., 5" />
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowSupplierDialog(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">Add Supplier</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}