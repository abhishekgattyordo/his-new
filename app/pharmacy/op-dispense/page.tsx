// app/pharmacy/op-dispense/page.tsx
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
import { CheckCircle2, AlertTriangle, User, Stethoscope, Menu, X, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/pharmacy/Sidebar';

// Mock Data (move to separate file later)
const prescriptions = [
  {
    id: "rx1",
    patientName: "Robert Johnson",
    patientAge: 42,
    patientGender: "M",
    doctor: "Dr. Sarah Jenkins",
    consultationId: "OPD-2025-0123",
    date: "2025-03-01",
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
    id: "rx2",
    patientName: "Emily Davis",
    patientAge: 35,
    patientGender: "F",
    doctor: "Dr. Michael Chen",
    consultationId: "OPD-2025-0124",
    date: "2025-03-01",
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
    id: "rx3",
    patientName: "James Wilson",
    patientAge: 58,
    patientGender: "M",
    doctor: "Dr. Sarah Jenkins",
    consultationId: "OPD-2025-0125",
    date: "2025-02-28",
    status: "Pending",
    items: [
      {
        medicineId: "med4",
        medicineName: "Atorvastatin 10mg",
        prescribedQty: 30,
        dispensedQty: 0,
        availableQty: 45,
      },
      {
        medicineId: "med5",
        medicineName: "Clopidogrel 75mg",
        prescribedQty: 30,
        dispensedQty: 0,
        availableQty: 0,
      },
    ],
  },
];

export default function OPDispensePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [rxList, setRxList] = useState(prescriptions);
  const [selectedRx, setSelectedRx] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dispensedSuccess, setDispensedSuccess] = useState(false);
  const [dispenseQtys, setDispenseQtys] = useState<Record<string, number>>({});

  const rx = rxList.find((r) => r.id === selectedRx);

  const selectRx = (id: string) => {
    const r = rxList.find((p) => p.id === id);
    if (!r) return;
    setSelectedRx(id);
    setDispensedSuccess(false);
    const qtys: Record<string, number> = {};
    r.items.forEach((item) => {
      qtys[item.medicineId] = Math.min(item.prescribedQty - item.dispensedQty, item.availableQty);
    });
    setDispenseQtys(qtys);
  };

  const handleDispense = () => {
    if (!rx) return;
    setRxList((prev) =>
      prev.map((r) =>
        r.id === rx.id
          ? {
              ...r,
              status: "Dispensed" as const,
              items: r.items.map((item) => ({
                ...item,
                dispensedQty: item.dispensedQty + (dispenseQtys[item.medicineId] || 0),
              })),
            }
          : r
      )
    );
    setConfirmOpen(false);
    setDispensedSuccess(true);
    toast.success("Prescription dispensed successfully", {
      description: `${rx.patientName}'s prescription has been dispensed.`,
    });
  };

  const totalBill = rx?.items.reduce((acc, item) => {
    const qty = dispenseQtys[item.medicineId] || 0;
    return acc + qty * 68; // mock unit price
  }, 0) || 0;

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
                  OP Prescription Dispensing
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Select a prescription to dispense
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Prescription List */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Pending Prescriptions
              </h2>
              <div className="space-y-3">
                {rxList.filter((r) => r.status !== "Dispensed").map((r) => (
                  <Card
                    key={r.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedRx === r.id ? "border-green-500 dark:border-green-400 ring-1 ring-green-500 dark:ring-green-400" : ""
                    }`}
                    onClick={() => selectRx(r.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {r.patientName}
                        </span>
                        <Badge className={
                          r.status === "Pending" 
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        }>
                          {r.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
                        <p>{r.doctor} • {r.consultationId}</p>
                        <p>{r.items.length} items • {r.date}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {rxList.filter((r) => r.status !== "Dispensed").length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center text-gray-500 dark:text-gray-400">
                      No pending prescriptions
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Dispense Panel */}
            <div className="lg:col-span-2">
              {!rx ? (
                <Card className="flex items-center justify-center h-64">
                  <CardContent>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Select a prescription from the list
                    </p>
                  </CardContent>
                </Card>
              ) : dispensedSuccess ? (
                <Card className="flex flex-col items-center justify-center h-64 gap-4">
                  <CardContent className="text-center">
                    <CheckCircle2 size={48} className="text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Dispensed Successfully!
                    </p>
                    <Button variant="outline" onClick={() => { setSelectedRx(null); setDispensedSuccess(false); }}>
                      Back to List
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Patient Card */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-green-600 dark:text-green-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Patient</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{rx.patientName}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Age / Gender</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {rx.patientAge} / {rx.patientGender}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Stethoscope size={16} className="text-green-600 dark:text-green-400" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Doctor</p>
                            <p className="font-semibold text-gray-900 dark:text-white">{rx.doctor}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Consultation</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{rx.consultationId}</p>
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
                            <th className="px-4 py-3">Available</th>
                            <th className="px-4 py-3">Dispense Qty</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {rx.items.map((item) => {
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
                                <td className={`px-4 py-3 ${item.availableQty === 0 ? "text-red-600 dark:text-red-400 font-bold" : "text-gray-600 dark:text-gray-300"}`}>
                                  {item.availableQty}
                                </td>
                                <td className="px-4 py-3">
                                  <Input
                                    type="number"
                                    min={0}
                                    max={Math.min(remaining, item.availableQty)}
                                    value={dispenseQtys[item.medicineId] || 0}
                                    onChange={(e) => setDispenseQtys({ ...dispenseQtys, [item.medicineId]: Number(e.target.value) })}
                                    className="w-20"
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
                                      Low Stock
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
                    {rx.items.map((item) => {
                      const remaining = item.prescribedQty - item.dispensedQty;
                      const insufficient = item.availableQty < remaining;
                      return (
                        <Card key={item.medicineId} className={insufficient ? "border-amber-200 dark:border-amber-800" : ""}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{item.medicineName}</h3>
                              </div>
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

                            <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Prescribed</p>
                                <p className="font-medium text-gray-900 dark:text-white">{item.prescribedQty}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Available</p>
                                <p className={`font-medium ${item.availableQty === 0 ? 'text-red-600 dark:text-red-400' : ''}`}>
                                  {item.availableQty}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">To Dispense</p>
                                <Input
                                  type="number"
                                  min={0}
                                  max={Math.min(remaining, item.availableQty)}
                                  value={dispenseQtys[item.medicineId] || 0}
                                  onChange={(e) => setDispenseQtys({ ...dispenseQtys, [item.medicineId]: Number(e.target.value) })}
                                  className="w-full"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Action Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sticky bottom-0 bg-gray-50 dark:bg-gray-900 py-3 border-t border-gray-200 dark:border-gray-700 -mx-6 px-6">
                    <Button variant="outline" onClick={() => setSelectedRx(null)} className="w-full sm:w-auto order-2 sm:order-1">
                      Cancel
                    </Button>
                    <Button onClick={() => setConfirmOpen(true)} className="w-full sm:w-auto order-1 sm:order-2">
                      Dispense
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Confirmation Modal */}
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirm Dispensing</DialogTitle>
              </DialogHeader>
              {rx && (
                <div className="space-y-3">
                  {rx.items.map((item) => {
                    const qty = dispenseQtys[item.medicineId] || 0;
                    if (qty === 0) return null;
                    return (
                      <div key={item.medicineId} className="flex justify-between text-sm border-b border-gray-200 dark:border-gray-700 pb-2">
                        <span className="text-gray-600 dark:text-gray-300">{item.medicineName}</span>
                        <span className="font-medium text-gray-900 dark:text-white">× {qty}</span>
                      </div>
                    );
                  })}
                  <div className="flex justify-between font-bold text-base pt-2">
                    <span className="text-gray-900 dark:text-white">Total Bill</span>
                    <span className="text-green-600 dark:text-green-400">₹{totalBill.toFixed(2)}</span>
                  </div>
                </div>
              )}
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={() => setConfirmOpen(false)} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button onClick={handleDispense} className="w-full sm:w-auto">
                  Confirm Dispense
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}