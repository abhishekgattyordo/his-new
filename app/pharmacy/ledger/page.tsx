// app/pharmacy/ledger/page.tsx
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Download, Menu, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/pharmacy/Sidebar';

// Mock Data (move to separate file later)
const ledgerEntries = [
  {
    id: "ledger1",
    date: "2025-03-01",
    patientName: "Robert Johnson",
    type: "OP" as const,
    medicine: "Amoxicillin 500mg",
    batch: "BATCH-001",
    qty: 10,
    unitPrice: 12.50,
    tax: 15.00,
    total: 140.00,
    refId: "RX-2025-0123",
    status: "Billed",
  },
  {
    id: "ledger2",
    date: "2025-03-01",
    patientName: "Emily Davis",
    type: "OP" as const,
    medicine: "Metformin 500mg",
    batch: "BATCH-003",
    qty: 30,
    unitPrice: 8.25,
    tax: 24.75,
    total: 272.25,
    refId: "RX-2025-0124",
    status: "Billed",
  },
  {
    id: "ledger3",
    date: "2025-02-28",
    patientName: "James Wilson",
    type: "IP" as const,
    medicine: "Atorvastatin 10mg",
    batch: "BATCH-004",
    qty: 30,
    unitPrice: 15.00,
    tax: 54.00,
    total: 504.00,
    refId: "IP-2025-0125",
    status: "Billed",
  },
  {
    id: "ledger4",
    date: "2025-02-27",
    patientName: "Sarah Williams",
    type: "OP" as const,
    medicine: "Paracetamol 650mg",
    batch: "BATCH-002",
    qty: 6,
    unitPrice: 5.75,
    tax: 3.45,
    total: 37.95,
    refId: "RX-2025-0118",
    status: "Returned",
  },
  {
    id: "ledger5",
    date: "2025-02-26",
    patientName: "Michael Chen",
    type: "IP" as const,
    medicine: "Clopidogrel 75mg",
    batch: "BATCH-006",
    qty: 30,
    unitPrice: 18.50,
    tax: 66.60,
    total: 621.60,
    refId: "IP-2025-0120",
    status: "Pending",
  },
];

export default function LedgerPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "OP" | "IP">("all");
  const [selectedEntry, setSelectedEntry] = useState<typeof ledgerEntries[0] | null>(null);

  const filtered = ledgerEntries.filter((e) => {
    const matchSearch = e.patientName.toLowerCase().includes(search.toLowerCase()) || 
                       e.medicine.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || e.type === typeFilter;
    return matchSearch && matchType;
  });

  const handleExport = () => {
    toast.success("Export started", {
      description: "Your ledger report will be downloaded shortly.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Billed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Billed</Badge>;
      case "Returned":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Returned</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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
                  Pharmacy Ledger
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Complete transaction history
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search patient or medicine..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="OP">OP</SelectItem>
                    <SelectItem value="IP">IP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            {/* Table - Desktop */}
            <div className="hidden md:block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Medicine</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Unit Price</TableHead>
                      <TableHead>Tax</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((e) => (
                      <TableRow
                        key={e.id}
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        onClick={() => setSelectedEntry(e)}
                      >
                        <TableCell className="text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {e.date}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900 dark:text-white">
                          {e.patientName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            e.type === "OP" 
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                              : "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                          }>
                            {e.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">
                          {e.medicine}
                        </TableCell>
                        <TableCell className="text-gray-500 dark:text-gray-400">
                          {e.batch}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">
                          {e.qty}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">
                          ₹{e.unitPrice.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">
                          ₹{e.tax.toFixed(2)}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900 dark:text-white">
                          ₹{e.total.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(e.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filtered.length === 0 && (
                  <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No ledger entries found
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filtered.map((e) => (
                <Card
                  key={e.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedEntry(e)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{e.patientName}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{e.medicine}</p>
                      </div>
                      {getStatusBadge(e.status)}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                        <p className="font-medium text-gray-900 dark:text-white">{e.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Type</p>
                        <Badge variant="outline" className={
                          e.type === "OP" 
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                            : "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                        }>
                          {e.type}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Batch</p>
                        <p className="font-medium text-gray-900 dark:text-white">{e.batch}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Qty</p>
                        <p className="font-medium text-gray-900 dark:text-white">{e.qty}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Unit Price</p>
                        <p className="font-medium text-gray-900 dark:text-white">₹{e.unitPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                        <p className="font-bold text-green-600 dark:text-green-400">₹{e.total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Ref: {e.refId}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {filtered.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No ledger entries found
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Detail Drawer */}
            <Sheet open={!!selectedEntry} onOpenChange={() => setSelectedEntry(null)}>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>Transaction Details</SheetTitle>
                </SheetHeader>
                {selectedEntry && (
                  <div className="space-y-4 mt-6">
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Date</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedEntry.date}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Patient</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedEntry.patientName}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Type</span>
                      <Badge variant="outline" className={
                        selectedEntry.type === "OP" 
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                          : "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                      }>
                        {selectedEntry.type}
                      </Badge>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Medicine</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedEntry.medicine}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Batch</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedEntry.batch}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Quantity</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedEntry.qty}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Unit Price</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">₹{selectedEntry.unitPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Tax</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">₹{selectedEntry.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Total</span>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400">₹{selectedEntry.total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Reference ID</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedEntry.refId}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                      <span>{getStatusBadge(selectedEntry.status)}</span>
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