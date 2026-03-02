// app/pharmacy/ip-issue/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Bed, AlertTriangle, CheckCircle2, Menu, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/pharmacy/Sidebar';

// Mock Data (move to separate file later)
const ipOrders = [
  {
    id: "ip1",
    patientName: "Robert Johnson",
    admissionId: "IP-2025-0123",
    ward: "Ward A",
    bed: "A-101",
    date: "2025-03-01",
    issueType: "Regular",
    status: "Pending",
    items: [
      {
        medicineId: "med1",
        medicineName: "Amoxicillin 500mg",
        prescribedQty: 10,
        dispensedQty: 0,
        availableQty: 150,
      },
      {
        medicineId: "med2",
        medicineName: "Paracetamol 650mg",
        prescribedQty: 6,
        dispensedQty: 0,
        availableQty: 25,
      },
    ],
  },
  {
    id: "ip2",
    patientName: "Emily Davis",
    admissionId: "IP-2025-0124",
    ward: "Ward B",
    bed: "B-205",
    date: "2025-03-01",
    issueType: "Emergency",
    status: "Pending",
    items: [
      {
        medicineId: "med3",
        medicineName: "Metformin 500mg",
        prescribedQty: 30,
        dispensedQty: 0,
        availableQty: 200,
      },
    ],
  },
  {
    id: "ip3",
    patientName: "James Wilson",
    admissionId: "IP-2025-0125",
    ward: "ICU",
    bed: "ICU-03",
    date: "2025-02-28",
    issueType: "Regular",
    status: "Completed",
    items: [
      {
        medicineId: "med4",
        medicineName: "Atorvastatin 10mg",
        prescribedQty: 30,
        dispensedQty: 30,
        availableQty: 45,
      },
    ],
  },
];

export default function IPIssuePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState(ipOrders);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [issueQtys, setIssueQtys] = useState<Record<string, number>>({});

  const order = orders.find((o) => o.id === selectedId);

  const selectOrder = (id: string) => {
    const o = orders.find((ord) => ord.id === id);
    if (!o) return;
    setSelectedId(id);
    const qtys: Record<string, number> = {};
    o.items.forEach((item) => {
      qtys[item.medicineId] = Math.min(item.prescribedQty - item.dispensedQty, item.availableQty);
    });
    setIssueQtys(qtys);
  };

  const handleIssue = () => {
    if (!order) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id
          ? { 
              ...o, 
              status: "Completed" as const, 
              items: o.items.map((item) => ({ 
                ...item, 
                dispensedQty: item.dispensedQty + (issueQtys[item.medicineId] || 0) 
              })) 
            }
          : o
      )
    );
    setConfirmOpen(false);
    toast.success("Medicines issued successfully", {
      description: `Issued to ${order.patientName}`,
    });
    setSelectedId(null);
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
                  IP Medicine Issue
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Issue medicines to admitted patients
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order List */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                IP Orders
              </h2>
              <div className="space-y-3">
                {orders.map((o) => (
                  <Card
                    key={o.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedId === o.id 
                        ? "border-green-500 dark:border-green-400 ring-1 ring-green-500 dark:ring-green-400" 
                        : ""
                    } ${o.status === "Completed" ? "opacity-60" : ""}`}
                    onClick={() => o.status !== "Completed" && selectOrder(o.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {o.patientName}
                        </span>
                        <Badge className={
                          o.status === "Pending" 
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            : o.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }>
                          {o.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Building2 size={12} />
                          {o.ward}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bed size={12} />
                          {o.bed}
                        </span>
                        <Badge className={
                          o.issueType === "Emergency" 
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }>
                          {o.issueType}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {orders.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No IP orders found
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Issue Panel */}
            <div className="lg:col-span-2">
              {!order ? (
                <Card className="flex items-center justify-center h-64">
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Select an IP order
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Patient Info */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Admission ID</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{order.admissionId}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Ward / Bed</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{order.ward} / {order.bed}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Issue Type</p>
                          <Badge className={
                            order.issueType === "Emergency" 
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                          }>
                            {order.issueType}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Date</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{order.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Items Table - Desktop */}
                  <div className="hidden md:block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                          <tr>
                            <th className="px-4 py-3">Medicine</th>
                            <th className="px-4 py-3">Prescribed</th>
                            <th className="px-4 py-3">Previously Issued</th>
                            <th className="px-4 py-3">Available</th>
                            <th className="px-4 py-3">Issue Qty</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {order.items.map((item) => {
                            const remaining = item.prescribedQty - item.dispensedQty;
                            const insufficient = item.availableQty < remaining;
                            return (
                              <tr key={item.medicineId} className={insufficient ? "bg-amber-50 dark:bg-amber-900/10" : ""}>
                                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                  {item.medicineName}
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                                  {item.prescribedQty}
                                </td>
                                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                                  {item.dispensedQty}
                                </td>
                                <td className={`px-4 py-3 ${item.availableQty === 0 ? "text-red-600 dark:text-red-400 font-bold" : "text-gray-600 dark:text-gray-300"}`}>
                                  {item.availableQty}
                                </td>
                                <td className="px-4 py-3">
                                  <Input
                                    type="number"
                                    min={0}
                                    max={Math.min(remaining, item.availableQty)}
                                    value={issueQtys[item.medicineId] || 0}
                                    onChange={(e) => setIssueQtys({ ...issueQtys, [item.medicineId]: Number(e.target.value) })}
                                    className="w-20"
                                    disabled={order.status === "Completed"}
                                  />
                                </td>
                                <td className="px-4 py-3">
                                  {item.availableQty === 0 ? (
                                    <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                      No Stock
                                    </Badge>
                                  ) : insufficient ? (
                                    <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 flex items-center gap-1">
                                      <AlertTriangle size={12} />
                                      Low
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                      OK
                                    </Badge>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Items Mobile Cards */}
                  <div className="md:hidden space-y-3">
                    {order.items.map((item) => {
                      const remaining = item.prescribedQty - item.dispensedQty;
                      const insufficient = item.availableQty < remaining;
                      return (
                        <Card key={item.medicineId} className={insufficient ? "border-amber-200 dark:border-amber-800" : ""}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{item.medicineName}</h3>
                              {item.availableQty === 0 ? (
                                <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                                  No Stock
                                </Badge>
                              ) : insufficient ? (
                                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                                  Low Stock
                                </Badge>
                              ) : (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                  OK
                                </Badge>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Prescribed</p>
                                <p className="font-medium text-gray-900 dark:text-white">{item.prescribedQty}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Previously Issued</p>
                                <p className="font-medium text-gray-900 dark:text-white">{item.dispensedQty}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Available</p>
                                <p className={`font-medium ${item.availableQty === 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
                                  {item.availableQty}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Issue Qty</p>
                                <Input
                                  type="number"
                                  min={0}
                                  max={Math.min(remaining, item.availableQty)}
                                  value={issueQtys[item.medicineId] || 0}
                                  onChange={(e) => setIssueQtys({ ...issueQtys, [item.medicineId]: Number(e.target.value) })}
                                  className="w-full"
                                  disabled={order.status === "Completed"}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Action Buttons */}
                  {order.status !== "Completed" && (
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                      <Button variant="outline" onClick={() => setSelectedId(null)} className="w-full sm:w-auto">
                        Cancel
                      </Button>
                      <Button onClick={() => setConfirmOpen(true)} className="w-full sm:w-auto">
                        Issue Medicines
                      </Button>
                    </div>
                  )}

                  {order.status === "Completed" && (
                    <div className="flex items-center justify-center gap-2 p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                      <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">This order has been completed</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Confirmation Modal */}
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Issue</DialogTitle>
              </DialogHeader>
              {order && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Issue to: <span className="font-medium text-gray-900 dark:text-white">{order.patientName}</span> 
                    <span className="text-gray-500 dark:text-gray-400"> ({order.ward}/{order.bed})</span>
                  </p>
                  <div className="space-y-2">
                    {order.items.map((item) => {
                      const qty = issueQtys[item.medicineId] || 0;
                      if (qty === 0) return null;
                      return (
                        <div key={item.medicineId} className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
                          <span className="text-gray-600 dark:text-gray-300">{item.medicineName}</span>
                          <span className="font-medium text-gray-900 dark:text-white">× {qty}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setConfirmOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={handleIssue} className="w-full sm:w-auto">
                  Confirm Issue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}