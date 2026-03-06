// // app/pharmacy/expiry-report/page.tsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { AlertTriangle, Download, Menu, X, ArrowLeft } from 'lucide-react';
// import { toast } from 'sonner';
// import Sidebar from '@/components/pharmacy/Sidebar';

// // Mock Data (move to separate file later)
// const stockItems = [
//   {
//     id: "1",
//     medicineName: "Amoxicillin 500mg",
//     batch: "BATCH-001",
//     expiryDate: "2025-12-31",
//     availableQty: 150,
//   },
//   {
//     id: "2",
//     medicineName: "Paracetamol 650mg",
//     batch: "BATCH-002",
//     expiryDate: "2024-06-15",
//     availableQty: 25,
//   },
//   {
//     id: "3",
//     medicineName: "Insulin Glargine",
//     batch: "BATCH-003",
//     expiryDate: "2024-08-20",
//     availableQty: 0,
//   },
//   {
//     id: "4",
//     medicineName: "Atorvastatin 10mg",
//     batch: "BATCH-004",
//     expiryDate: "2025-03-10",
//     availableQty: 200,
//   },
//   {
//     id: "5",
//     medicineName: "Metformin 500mg",
//     batch: "BATCH-005",
//     expiryDate: "2024-05-30",
//     availableQty: 45,
//   },
//   {
//     id: "6",
//     medicineName: "Clopidogrel 75mg",
//     batch: "BATCH-006",
//     expiryDate: "2024-04-15",
//     availableQty: 90,
//   },
//   {
//     id: "7",
//     medicineName: "Salbutamol Inhaler",
//     batch: "BATCH-007",
//     expiryDate: "2023-12-31",
//     availableQty: 5,
//   },
// ];

// export default function ExpiryReportPage() {
//   const router = useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [filter, setFilter] = useState<"30" | "60" | "90" | "expired">("30");

//   const now = new Date();
//   const filtered = stockItems.filter((s) => {
//     const exp = new Date(s.expiryDate);
//     const days = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
//     if (filter === "expired") return days <= 0;
//     return days > 0 && days <= Number(filter);
//   });

//   const handleExport = () => {
//     toast.success("Export started", {
//       description: "Your expiry report will be downloaded shortly.",
//     });
//   };

//   const getDaysRemaining = (expiryDate: string) => {
//     const exp = new Date(expiryDate);
//     return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
//   };

//   const getStatusBadge = (days: number) => {
//     if (days <= 0) {
//       return (
//         <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1">
//           <AlertTriangle size={12} />
//           Expired
//         </Badge>
//       );
//     } else if (days <= 30) {
//       return (
//         <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
//           {days} days
//         </Badge>
//       );
//     } else {
//       return (
//         <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
//           {days} days
//         </Badge>
//       );
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Mobile Menu Button */}
//         <button
//             className="lg:hidden fixed bottom-20 right-6 z-50 p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           >
//             {isSidebarOpen ? (
//               <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//             ) : (
//               <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//             )}
//           </button>
    
//           {/* Sidebar */}
//           <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    
//           {/* Backdrop for mobile */}
//           {isSidebarOpen && (
//             <div
//               className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
//               onClick={() => setIsSidebarOpen(false)}
//             />
//           )}

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col w-full lg:ml-0 min-w-0">
//         {/* Header */}
//         <header className="sticky top-0 z-30 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
//           <div className="flex h-16 items-center px-4 md:px-6">
//             <div className="flex items-center gap-3">
//               {/* Spacer for mobile menu */}
//               <div className="w-8 lg:hidden"></div>
              
              
              
//               <div>
//                 <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
//                   Expiry Report
//                 </h1>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                   {filtered.length} {filtered.length === 1 ? 'item' : 'items'} found
//                 </p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           <div className="space-y-6">
//             {/* Header Actions */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               {/* Filter Buttons */}
//               <div className="flex flex-wrap gap-2">
//                 {(["30", "60", "90", "expired"] as const).map((f) => (
//                   <button
//                     key={f}
//                     onClick={() => setFilter(f)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                       filter === f 
//                         ? "bg-green-600 text-white dark:bg-green-600" 
//                         : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
//                     }`}
//                   >
//                     {f === "expired" ? "Already Expired" : `Within ${f} Days`}
//                   </button>
//                 ))}
//               </div>
              
//               <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto">
//                 <Download className="h-4 w-4 mr-2" />
//                 Export
//               </Button>
//             </div>

//             {/* Table - Desktop */}
//             <div className="hidden md:block rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Medicine</TableHead>
//                       <TableHead>Batch</TableHead>
//                       <TableHead>Expiry Date</TableHead>
//                       <TableHead>Quantity</TableHead>
//                       <TableHead>Days Remaining</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {filtered.length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
//                           No items found
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       filtered.map((s) => {
//                         const days = getDaysRemaining(s.expiryDate);
//                         const isExpired = days <= 0;
//                         const isExpiringSoon = days <= 30 && days > 0;
                        
//                         return (
//                           <TableRow key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
//                             <TableCell className="font-medium text-gray-900 dark:text-white">
//                               {s.medicineName}
//                             </TableCell>
//                             <TableCell className="text-gray-500 dark:text-gray-400">
//                               {s.batch}
//                             </TableCell>
//                             <TableCell className={
//                               isExpired 
//                                 ? "text-red-600 dark:text-red-400 font-medium" 
//                                 : isExpiringSoon 
//                                 ? "text-amber-600 dark:text-amber-400 font-medium" 
//                                 : ""
//                             }>
//                               {s.expiryDate}
//                             </TableCell>
//                             <TableCell className="text-gray-600 dark:text-gray-300">
//                               {s.availableQty}
//                             </TableCell>
//                             <TableCell>
//                               {getStatusBadge(days)}
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>
//             </div>

//             {/* Mobile Cards */}
//             <div className="md:hidden space-y-3">
//               {filtered.length === 0 ? (
//                 <Card>
//                   <CardContent className="p-8 text-center text-gray-500 dark:text-gray-400">
//                     No items found
//                   </CardContent>
//                 </Card>
//               ) : (
//                 filtered.map((s) => {
//                   const days = getDaysRemaining(s.expiryDate);
//                   const isExpired = days <= 0;
//                   const isExpiringSoon = days <= 30 && days > 0;
                  
//                   return (
//                     <Card key={s.id} className="overflow-hidden">
//                       <CardContent className="p-4">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <h3 className="font-semibold text-gray-900 dark:text-white">{s.medicineName}</h3>
//                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Batch: {s.batch}</p>
//                           </div>
//                           {getStatusBadge(days)}
//                         </div>

//                         <div className="grid grid-cols-2 gap-3 text-sm">
//                           <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">Expiry Date</p>
//                             <p className={`font-medium ${
//                               isExpired 
//                                 ? 'text-red-600 dark:text-red-400' 
//                                 : isExpiringSoon 
//                                 ? 'text-amber-600 dark:text-amber-400' 
//                                 : 'text-gray-900 dark:text-white'
//                             }`}>
//                               {s.expiryDate}
//                             </p>
//                           </div>
//                           <div>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">Quantity</p>
//                             <p className="font-medium text-gray-900 dark:text-white">{s.availableQty}</p>
//                           </div>
//                         </div>

//                         {isExpired && (
//                           <div className="mt-3 flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/10 rounded-lg">
//                             <AlertTriangle size={14} className="text-red-600 dark:text-red-400" />
//                             <span className="text-xs text-red-600 dark:text-red-400 font-medium">
//                               This item has expired and should be removed from stock
//                             </span>
//                           </div>
//                         )}

//                         {isExpiringSoon && !isExpired && (
//                           <div className="mt-3 flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
//                             <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400" />
//                             <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
//                               This item will expire in {days} days
//                             </span>
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   );
//                 })
//               )}
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
import { AlertTriangle, Download, Menu, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Sidebar from '@/components/pharmacy/Sidebar';
import { purchasesApi } from '@/lib/api/purchasesApi';

// Types based on API response
interface StockItem {
  id: number;
  medicine_id: number;
  medicineName: string;
  batch: string;
  expiryDate: string; // ISO date
  availableQty: number;
  reorderLevel: number;
  purchasePrice: number | string;
  mrp: number | string;
  delivered: number | string;
}

export default function ExpiryReportPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<"30" | "60" | "90" | "expired">("30");
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch stock data on mount
  useEffect(() => {
    const fetchStock = async () => {
      setLoading(true);
      try {
        const response = await purchasesApi.getStock();
        // Assuming response.data contains the array
        const data = response.data?.data || response.data || [];
        setStockItems(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load stock data');
      } finally {
        setLoading(false);
      }
    };
    fetchStock();
  }, []);

  const now = new Date();
  const filtered = stockItems.filter((s) => {
    const exp = new Date(s.expiryDate);
    const days = (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (filter === "expired") return days <= 0;
    return days > 0 && days <= Number(filter);
  });

  const handleExport = () => {
    toast.success("Export started", {
      description: "Your expiry report will be downloaded shortly.",
    });
    // In a real implementation, generate CSV from filtered data
  };

  const getDaysRemaining = (expiryDate: string) => {
    const exp = new Date(expiryDate);
    return Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (days: number) => {
    if (days <= 0) {
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1">
          <AlertTriangle size={12} />
          Expired
        </Badge>
      );
    } else if (days <= 30) {
      return (
        <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
          {days} days
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
          {days} days
        </Badge>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed bottom-20 right-6 z-50 p-2.5 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <div className="flex-1 flex flex-col w-full lg:ml-0 min-w-0">
        <header className="sticky top-0 z-30 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="flex h-16 items-center px-4 md:px-6">
            <div className="flex items-center gap-3">
              <div className="w-8 lg:hidden"></div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Expiry Report
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {filtered.length} {filtered.length === 1 ? 'item' : 'items'} found
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {(["30", "60", "90", "expired"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === f 
                        ? "bg-green-600 text-white dark:bg-green-600" 
                        : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {f === "expired" ? "Already Expired" : `Within ${f} Days`}
                  </button>
                ))}
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
                      <TableHead>Medicine</TableHead>
                      <TableHead>Batch</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Days Remaining</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                          No items found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filtered.map((s) => {
                        const days = getDaysRemaining(s.expiryDate);
                        const isExpired = days <= 0;
                        const isExpiringSoon = days <= 30 && days > 0;
                        
                        return (
                          <TableRow key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <TableCell className="font-medium text-gray-900 dark:text-white">
                              {s.medicineName}
                            </TableCell>
                            <TableCell className="text-gray-500 dark:text-gray-400">
                              {s.batch}
                            </TableCell>
                            <TableCell className={
                              isExpired 
                                ? "text-red-600 dark:text-red-400 font-medium" 
                                : isExpiringSoon 
                                ? "text-amber-600 dark:text-amber-400 font-medium" 
                                : ""
                            }>
                              {new Date(s.expiryDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-gray-600 dark:text-gray-300">
                              {s.availableQty}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(days)}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filtered.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No items found
                  </CardContent>
                </Card>
              ) : (
                filtered.map((s) => {
                  const days = getDaysRemaining(s.expiryDate);
                  const isExpired = days <= 0;
                  const isExpiringSoon = days <= 30 && days > 0;
                  
                  return (
                    <Card key={s.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">{s.medicineName}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Batch: {s.batch}</p>
                          </div>
                          {getStatusBadge(days)}
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Expiry Date</p>
                            <p className={`font-medium ${
                              isExpired 
                                ? 'text-red-600 dark:text-red-400' 
                                : isExpiringSoon 
                                ? 'text-amber-600 dark:text-amber-400' 
                                : 'text-gray-900 dark:text-white'
                            }`}>
                              {new Date(s.expiryDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Quantity</p>
                            <p className="font-medium text-gray-900 dark:text-white">{s.availableQty}</p>
                          </div>
                        </div>

                        {isExpired && (
                          <div className="mt-3 flex items-center gap-2 p-2 bg-red-50 dark:bg-red-900/10 rounded-lg">
                            <AlertTriangle size={14} className="text-red-600 dark:text-red-400" />
                            <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                              This item has expired and should be removed from stock
                            </span>
                          </div>
                        )}

                        {isExpiringSoon && !isExpired && (
                          <div className="mt-3 flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                            <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400" />
                            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                              This item will expire in {days} days
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}