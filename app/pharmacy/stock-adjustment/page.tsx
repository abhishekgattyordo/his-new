// app/pharmacy/stock-adjustment/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Menu, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/pharmacy/Sidebar';

// Mock Data (move to separate file later)
const medicines = [
  {
    id: "med1",
    name: "Amoxicillin 500mg",
    isActive: true,
  },
  {
    id: "med2",
    name: "Paracetamol 650mg",
    isActive: true,
  },
  {
    id: "med3",
    name: "Metformin 500mg",
    isActive: true,
  },
  {
    id: "med4",
    name: "Atorvastatin 10mg",
    isActive: true,
  },
  {
    id: "med5",
    name: "Clopidogrel 75mg",
    isActive: false,
  },
];

const stockItems = [
  {
    id: "stock1",
    medicineId: "med1",
    batch: "BATCH-001",
    expiryDate: "2025-12-31",
    availableQty: 150,
  },
  {
    id: "stock2",
    medicineId: "med1",
    batch: "BATCH-002",
    expiryDate: "2025-06-30",
    availableQty: 75,
  },
  {
    id: "stock3",
    medicineId: "med2",
    batch: "BATCH-003",
    expiryDate: "2024-06-15",
    availableQty: 25,
  },
  {
    id: "stock4",
    medicineId: "med3",
    batch: "BATCH-004",
    expiryDate: "2025-03-10",
    availableQty: 200,
  },
  {
    id: "stock5",
    medicineId: "med4",
    batch: "BATCH-005",
    expiryDate: "2024-05-30",
    availableQty: 45,
  },
];

const adjustmentTypes = ["Damage", "Expired", "Correction"];

export default function StockAdjustmentPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [adjustmentType, setAdjustmentType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const batches = stockItems.filter((s) => s.medicineId === selectedMedicine);
  const currentStock = batches.find((b) => b.batch === selectedBatch);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!selectedMedicine) e.medicine = "Select a medicine";
    if (!selectedBatch) e.batch = "Select a batch";
    if (!adjustmentType) e.type = "Select adjustment type";
    if (!quantity || Number(quantity) <= 0) e.quantity = "Enter valid quantity";
    if (!reason.trim()) e.reason = "Reason is mandatory";
    if (currentStock && Number(quantity) > currentStock.availableQty) e.quantity = "Cannot exceed available stock";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    toast.success("Stock adjustment recorded successfully", {
      description: `${quantity} units of ${medicines.find(m => m.id === selectedMedicine)?.name} (${selectedBatch}) have been adjusted.`,
    });
    // Reset form
    setSelectedMedicine("");
    setSelectedBatch("");
    setAdjustmentType("");
    setQuantity("");
    setReason("");
    setErrors({});
  };

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} <span className="text-red-500">*</span>
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={12} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
        <button
            className="lg:hidden fixed bottom-20 right-6 z-50 p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:ml-0 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center gap-3">
              {/* Spacer for mobile menu */}
              <div className="w-8 lg:hidden"></div>
              
            
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Stock Adjustment
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Record damage, expiry, or corrections
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6 space-y-5">
                {/* Medicine Selection */}
                <Field label="Medicine" error={errors.medicine}>
                  <Select 
                    value={selectedMedicine} 
                    onValueChange={(value) => {
                      setSelectedMedicine(value);
                      setSelectedBatch("");
                    }}
                  >
                    <SelectTrigger className={errors.medicine ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select medicine" />
                    </SelectTrigger>
                    <SelectContent>
                      {medicines.filter(m => m.isActive).map((m) => (
                        <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {/* Batch Selection */}
                <Field label="Batch" error={errors.batch}>
                  <Select 
                    value={selectedBatch} 
                    onValueChange={setSelectedBatch}
                    disabled={!selectedMedicine}
                  >
                    <SelectTrigger className={errors.batch ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches.map((b) => (
                        <SelectItem key={b.batch} value={b.batch}>
                          {b.batch} — Exp: {b.expiryDate} — Qty: {b.availableQty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {/* Current Stock Display */}
                {currentStock && (
                  <div className="rounded-lg bg-gray-100 dark:bg-gray-800 p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Current Available Stock
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {currentStock.availableQty}
                      </span>
                    </div>
                  </div>
                )}

                {/* Adjustment Type */}
                <Field label="Adjustment Type" error={errors.type}>
                  <Select value={adjustmentType} onValueChange={setAdjustmentType}>
                    <SelectTrigger className={errors.type ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {adjustmentTypes.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {/* Quantity */}
                <Field label="Quantity" error={errors.quantity}>
                  <Input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className={errors.quantity ? "border-red-500" : ""}
                    placeholder="Enter quantity"
                  />
                </Field>

                {/* Reason */}
                <Field label="Reason" error={errors.reason}>
                  <Textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={4}
                    className={errors.reason ? "border-red-500" : ""}
                    placeholder="Provide a detailed reason for this adjustment..."
                  />
                </Field>

                {/* Submit Button */}
                <Button onClick={handleSubmit} className="w-full">
                  Submit Adjustment
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Confirmation Dialog */}
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Stock Adjustment</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-2">
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Medicine:</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {medicines.find(m => m.id === selectedMedicine)?.name}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Batch:</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{selectedBatch}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Type:</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{adjustmentType}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Quantity:</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{quantity}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Reason:</span>{' '}
                    <span className="font-medium text-gray-900 dark:text-white">{reason}</span>
                  </p>
                  {currentStock && (
                    <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Stock will change from{' '}
                        <span className="font-bold text-gray-900 dark:text-white">{currentStock.availableQty}</span>
                        {' → '}
                        <span className="font-bold text-gray-900 dark:text-white">
                          {currentStock.availableQty - Number(quantity)}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setConfirmOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={handleConfirm} className="w-full sm:w-auto">
                  Confirm Adjustment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}