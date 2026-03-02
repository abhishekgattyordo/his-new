// app/pharmacy/quick-dispense/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  User, 
  Pill, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  Menu, 
  X, 
  ArrowLeft,
  Barcode,
  Camera,
  Plus,
  Minus,
  Receipt
} from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/pharmacy/Sidebar';

// Mock Data (move to separate file later)
const medicines = [
  {
    id: "med1",
    name: "Amoxicillin 500mg",
    generic: "Amoxicillin",
    category: "Antibiotics",
    stock: [
      { batch: "BATCH-001", expiryDate: "2025-12-31", quantity: 150, mrp: 15.00 },
      { batch: "BATCH-002", expiryDate: "2025-06-30", quantity: 75, mrp: 15.00 }
    ],
    price: 12.50,
    requiresPrescription: true
  },
  {
    id: "med2",
    name: "Paracetamol 650mg",
    generic: "Paracetamol",
    category: "Pain Relief",
    stock: [
      { batch: "BATCH-003", expiryDate: "2024-06-15", quantity: 25, mrp: 7.00 }
    ],
    price: 5.75,
    requiresPrescription: false
  },
  {
    id: "med3",
    name: "Metformin 500mg",
    generic: "Metformin",
    category: "Diabetes",
    stock: [
      { batch: "BATCH-004", expiryDate: "2025-03-10", quantity: 200, mrp: 15.00 }
    ],
    price: 8.25,
    requiresPrescription: true
  },
  {
    id: "med4",
    name: "Atorvastatin 10mg",
    generic: "Atorvastatin",
    category: "Cardiovascular",
    stock: [
      { batch: "BATCH-005", expiryDate: "2024-05-30", quantity: 45, mrp: 25.00 }
    ],
    price: 15.00,
    requiresPrescription: true
  },
  {
    id: "med5",
    name: "Cetirizine 10mg",
    generic: "Cetirizine",
    category: "Antihistamine",
    stock: [
      { batch: "BATCH-006", expiryDate: "2025-09-15", quantity: 80, mrp: 5.00 }
    ],
    price: 3.50,
    requiresPrescription: false
  }
];

const patients = [
  { id: "pat1", name: "John Doe", age: 45, gender: "Male", phone: "9876543210" },
  { id: "pat2", name: "Jane Smith", age: 32, gender: "Female", phone: "9876543211" },
  { id: "pat3", name: "Bob Johnson", age: 58, gender: "Male", phone: "9876543212" },
  { id: "pat4", name: "Alice Brown", age: 28, gender: "Female", phone: "9876543213" },
];

interface CartItem {
  id: string;
  medicineId: string;
  medicineName: string;
  batch: string;
  quantity: number;
  price: number;
  mrp: number;
  expiryDate: string;
  maxAvailable: number;
}

export default function QuickDispensePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const [showBarcodeScan, setShowBarcodeScan] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash');
  const [isDispensing, setIsDispensing] = useState(false);

  // Filter medicines based on search
  const filteredMedicines = medicines.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.generic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get available batches for selected medicine
  const availableBatches = selectedMedicine 
    ? selectedMedicine.stock.filter((s: any) => s.quantity > 0)
    : [];

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  const handleAddToCart = () => {
    if (!selectedMedicine || !selectedBatch || quantity <= 0) {
      toast.error("Please select medicine, batch, and valid quantity");
      return;
    }

    const batch = selectedMedicine.stock.find((s: any) => s.batch === selectedBatch);
    if (!batch) return;

    if (quantity > batch.quantity) {
      toast.error(`Only ${batch.quantity} units available`);
      return;
    }

    const existingItem = cart.find(item => 
      item.medicineId === selectedMedicine.id && item.batch === selectedBatch
    );

    if (existingItem) {
      if (existingItem.quantity + quantity > batch.quantity) {
        toast.error(`Total quantity exceeds available stock`);
        return;
      }
      setCart(cart.map(item => 
        item.medicineId === selectedMedicine.id && item.batch === selectedBatch
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, {
        id: `${selectedMedicine.id}-${selectedBatch}-${Date.now()}`,
        medicineId: selectedMedicine.id,
        medicineName: selectedMedicine.name,
        batch: selectedBatch,
        quantity,
        price: selectedMedicine.price,
        mrp: batch.mrp,
        expiryDate: batch.expiryDate,
        maxAvailable: batch.quantity
      }]);
    }

    // Reset selection
    setSelectedMedicine(null);
    setSelectedBatch('');
    setQuantity(1);
    setSearchQuery('');
    
    toast.success("Added to cart");
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    
    if (newQuantity > item.maxAvailable) {
      toast.error(`Only ${item.maxAvailable} units available`);
      return;
    }
    
    if (newQuantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    
    setCart(cart.map(i => 
      i.id === id ? { ...i, quantity: newQuantity } : i
    ));
  };

  const handleDispense = () => {
    if (!selectedPatient) {
      toast.error("Please select a patient");
      return;
    }
    
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setConfirmOpen(true);
  };

  const handleConfirmDispense = () => {
    setIsDispensing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsDispensing(false);
      setConfirmOpen(false);
      
      toast.success("Dispensed successfully", {
        description: `Bill amount: ₹${total.toFixed(2)}`,
      });
      
      // Reset form
      setCart([]);
      setSelectedPatient('');
      setPaymentMethod('Cash');
    }, 1500);
  };

  const getPatientName = (id: string) => {
    return patients.find(p => p.id === id)?.name || '';
  };

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
              
              {/* Back Button */}
              <button
                onClick={() => router.push("/pharmacy/dashboard")}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Dispense
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Fast OPD medicine dispensing
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Patient & Medicine Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Patient Selection Card */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold flex items-center gap-2">
                      <User size={18} className="text-green-600" />
                      Patient Details
                    </h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowPatientSearch(!showPatientSearch)}
                    >
                      {selectedPatient ? 'Change' : 'Select Patient'}
                    </Button>
                  </div>

                  {selectedPatient ? (
                    <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {getPatientName(selectedPatient)}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Age: {patients.find(p => p.id === selectedPatient)?.age} • 
                            Gender: {patients.find(p => p.id === selectedPatient)?.gender} • 
                            Phone: {patients.find(p => p.id === selectedPatient)?.phone}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Selected</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                      No patient selected
                    </div>
                  )}

                  {/* Patient Search (collapsible) */}
                  {showPatientSearch && (
                    <div className="mt-4 border-t pt-4">
                      <div className="relative mb-3">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search patients..."
                          className="pl-9"
                        />
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {patients.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              setSelectedPatient(p.id);
                              setShowPatientSearch(false);
                            }}
                            className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{p.name}</span>
                              <span className="text-sm text-gray-500">{p.age}y • {p.gender}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{p.phone}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Medicine Selection Card */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold flex items-center gap-2">
                      <Pill size={18} className="text-green-600" />
                      Add Medicines
                    </h2>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowBarcodeScan(true)}
                      >
                        <Barcode className="h-4 w-4 mr-1" />
                        Scan
                      </Button>
                    </div>
                  </div>

                  {/* Medicine Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search medicines by name, generic, or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  {/* Medicine List */}
                  <div className="space-y-2 max-h-60 overflow-y-auto mb-4 border rounded-lg p-2">
                    {filteredMedicines.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        No medicines found
                      </div>
                    ) : (
                      filteredMedicines.map((med) => (
                        <div
                          key={med.id}
                          onClick={() => {
                            setSelectedMedicine(med);
                            setSelectedBatch('');
                            setQuantity(1);
                          }}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedMedicine?.id === med.id
                              ? 'bg-green-50 dark:bg-green-900/10 border border-green-200'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{med.name}</p>
                              <p className="text-xs text-gray-500 mt-1">{med.generic} • {med.category}</p>
                            </div>
                            <Badge variant="outline">₹{med.price}</Badge>
                          </div>
                          <div className="flex gap-2 mt-2">
                            {med.stock.map((s: any) => (
                              <Badge 
                                key={s.batch}
                                variant="outline"
                                className="text-xs bg-gray-50"
                              >
                                {s.batch}: {s.quantity} units
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Batch Selection & Quantity */}
                  {selectedMedicine && (
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="text-xs font-medium text-gray-500 mb-1 block">
                            Select Batch
                          </label>
                          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose batch" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableBatches.map((batch: any) => (
                                <SelectItem key={batch.batch} value={batch.batch}>
                                  {batch.batch} - Exp: {batch.expiryDate} - Stock: {batch.quantity}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-500 mb-1 block">
                            Quantity
                          </label>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9"
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              min={1}
                              value={quantity}
                              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                              className="text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9"
                              onClick={() => {
                                const batch = availableBatches.find((b: any) => b.batch === selectedBatch);
                                if (batch) {
                                  setQuantity(Math.min(quantity + 1, batch.quantity));
                                } else {
                                  setQuantity(quantity + 1);
                                }
                              }}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <Button 
                        className="w-full mt-4"
                        onClick={handleAddToCart}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Cart & Checkout */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-5">
                  <h2 className="text-base font-semibold flex items-center gap-2 mb-4">
                    <Package size={18} className="text-green-600" />
                    Dispense Cart
                    {cart.length > 0 && (
                      <Badge className="ml-2 bg-green-100 text-green-800">
                        {cart.length} items
                      </Badge>
                    )}
                  </h2>

                  {/* Cart Items */}
                  <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 border rounded-lg">
                        <Package className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">Cart is empty</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium text-sm">{item.medicineName}</p>
                              <p className="text-xs text-gray-500">Batch: {item.batch}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-red-500"
                              onClick={() => handleRemoveFromCart(item.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="font-semibold text-green-600">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          {item.expiryDate && new Date(item.expiryDate) < new Date() && (
                            <div className="mt-2 flex items-center gap-1 text-xs text-red-500">
                              <AlertTriangle size={10} />
                              Expired batch
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {/* Payment Method */}
                  <div className="border-t pt-4 mb-4">
                    <label className="text-xs font-medium text-gray-500 mb-1 block">
                      Payment Method
                    </label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Card">Card</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Insurance">Insurance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bill Summary */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax (5%)</span>
                      <span className="font-medium">₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold pt-2 border-t">
                      <span>Total</span>
                      <span className="text-green-600">₹{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Dispense Button */}
                  <Button
                    className="w-full mt-4"
                    size="lg"
                    onClick={handleDispense}
                    disabled={!selectedPatient || cart.length === 0}
                  >
                    <Receipt className="h-4 w-4 mr-2" />
                    Complete Dispense
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Barcode Scanner Dialog */}
          <Dialog open={showBarcodeScan} onOpenChange={setShowBarcodeScan}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Scan Barcode</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center p-6">
                <div className="w-48 h-48 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 text-center mb-4">
                  Position the barcode in front of your camera
                </p>
                <Button className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Scanning
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Confirmation Dialog */}
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Dispense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg">
                  <p className="text-sm font-medium">Patient</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {getPatientName(selectedPatient)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Items</p>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm border-b pb-2">
                      <span className="text-gray-600">{item.medicineName} x{item.quantity}</span>
                      <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (5%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-2 border-t">
                    <span>Total</span>
                    <span className="text-green-600">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Payment Method</p>
                  <p className="text-sm font-medium">{paymentMethod}</p>
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setConfirmOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button 
                  onClick={handleConfirmDispense} 
                  className="w-full sm:w-auto"
                  disabled={isDispensing}
                >
                  {isDispensing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Dispense'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}