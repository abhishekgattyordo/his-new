// app/pharmacy/stock/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Download, Menu, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/pharmacy/Sidebar';

// Mock Data (move to separate file later)
const categories = [
  "Antibiotics",
  "Pain Relief",
  "Cardiovascular",
  "Diabetes",
  "Respiratory",
  "Gastrointestinal"
];

const stockItems = [
  {
    id: "1",
    medicineName: "Amoxicillin 500mg",
    batch: "BATCH-001",
    expiryDate: "2025-12-31",
    availableQty: 150,
    reorderLevel: 100,
    purchasePrice: 8.50,
    mrp: 15.00,
  },
  {
    id: "2",
    medicineName: "Paracetamol 650mg",
    batch: "BATCH-002",
    expiryDate: "2024-06-15",
    availableQty: 25,
    reorderLevel: 50,
    purchasePrice: 3.25,
    mrp: 7.00,
  },
  {
    id: "3",
    medicineName: "Insulin Glargine",
    batch: "BATCH-003",
    expiryDate: "2024-08-20",
    availableQty: 0,
    reorderLevel: 20,
    purchasePrice: 28.50,
    mrp: 42.00,
  },
  {
    id: "4",
    medicineName: "Atorvastatin 10mg",
    batch: "BATCH-004",
    expiryDate: "2025-03-10",
    availableQty: 200,
    reorderLevel: 150,
    purchasePrice: 15.00,
    mrp: 25.00,
  },
  {
    id: "5",
    medicineName: "Metformin 500mg",
    batch: "BATCH-005",
    expiryDate: "2024-05-30",
    availableQty: 45,
    reorderLevel: 60,
    purchasePrice: 8.25,
    mrp: 15.00,
  },
];

function getStockStatus(item: typeof stockItems[0]) {
  const now = new Date();
  const exp = new Date(item.expiryDate);
  const daysToExpiry = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysToExpiry <= 0) return { 
    label: "Expired", 
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
  };
  if (item.availableQty === 0) return { 
    label: "Out of Stock", 
    className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" 
  };
  if (daysToExpiry <= 30) return { 
    label: "Expiring Soon", 
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" 
  };
  if (item.availableQty <= item.reorderLevel) return { 
    label: "Low Stock", 
    className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" 
  };
  return { 
    label: "OK", 
    className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
  };
}

export default function CurrentStockPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [selectedItem, setSelectedItem] = useState<typeof stockItems[0] | null>(null);

  const filtered = stockItems.filter((s) => {
    const matchSearch = s.medicineName.toLowerCase().includes(search.toLowerCase());
    const matchLow = !lowStockOnly || s.availableQty <= s.reorderLevel;
    return matchSearch && matchLow;
  });

  const handleExportCSV = () => {
    toast.success("Export started", {
      description: "Your stock report will be downloaded shortly.",
    });
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
              
            
              
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Current Stock
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {filtered.length} batch entries
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search medicine..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="lowStock"
                    checked={lowStockOnly}
                    onCheckedChange={(checked) => setLowStockOnly(checked as boolean)}
                  />
                  <Label htmlFor="lowStock" className="text-sm text-gray-600 dark:text-gray-300">
                    Low stock only
                  </Label>
                </div>
              </div>
              <Button variant="outline" onClick={handleExportCSV} className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>

            {/* Table - Desktop */}
            <div className="hidden md:block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medicine</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Available Qty</TableHead>
                      <TableHead>Reorder Level</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((s) => {
                      const status = getStockStatus(s);
                      const isExpired = new Date(s.expiryDate) < new Date();
                      return (
                        <TableRow
                          key={s.id}
                          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                          onClick={() => setSelectedItem(s)}
                        >
                          <TableCell className="font-medium text-gray-900 dark:text-white">
                            {s.medicineName}
                          </TableCell>
                          <TableCell className="text-gray-500 dark:text-gray-400">
                            {s.batch}
                          </TableCell>
                          <TableCell className={isExpired ? "text-red-600 dark:text-red-400 font-medium" : ""}>
                            {s.expiryDate}
                          </TableCell>
                          <TableCell className={s.availableQty === 0 ? "text-red-600 dark:text-red-400 font-bold" : "font-medium"}>
                            {s.availableQty}
                          </TableCell>
                          <TableCell className="text-gray-500 dark:text-gray-400">
                            {s.reorderLevel}
                          </TableCell>
                          <TableCell>
                            <Badge className={status.className}>
                              {status.label}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((s) => {
                const status = getStockStatus(s);
                const isExpired = new Date(s.expiryDate) < new Date();
                return (
                  <Card
                    key={s.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedItem(s)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{s.medicineName}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Batch: {s.batch}</p>
                        </div>
                        <Badge className={status.className}>
                          {status.label}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm mt-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Expiry Date</p>
                          <p className={`font-medium ${isExpired ? 'text-red-600 dark:text-red-400' : ''}`}>
                            {s.expiryDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Available Qty</p>
                          <p className={`font-medium ${s.availableQty === 0 ? 'text-red-600 dark:text-red-400 font-bold' : ''}`}>
                            {s.availableQty}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Reorder Level</p>
                          <p className="font-medium">{s.reorderLevel}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                          <p className="font-medium">₹{s.purchasePrice.toFixed(2)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {filtered.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No stock items found matching your filters
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Detail Drawer */}
            <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Batch Details</SheetTitle>
                </SheetHeader>
                {selectedItem && (
                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Medicine</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedItem.medicineName}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Batch</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedItem.batch}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Expiry Date</span>
                      <span className={`text-sm font-medium ${
                        new Date(selectedItem.expiryDate) < new Date() 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {selectedItem.expiryDate}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Available Qty</span>
                      <span className={`text-sm font-medium ${
                        selectedItem.availableQty === 0 
                          ? 'text-red-600 dark:text-red-400 font-bold' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {selectedItem.availableQty}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Reorder Level</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedItem.reorderLevel}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Purchase Price</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ₹{selectedItem.purchasePrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">MRP</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        ₹{selectedItem.mrp.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                      <Badge className={getStockStatus(selectedItem).className}>
                        {getStockStatus(selectedItem).label}
                      </Badge>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </main>
      </div>
    </div>
  );
}