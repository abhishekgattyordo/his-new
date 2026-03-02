


// 'use client';

// import { useState, useMemo } from "react";
// import { beds as initialBeds, type Bed, type BedStatus } from "../../../data/wardData";
// import { BedCard } from "../../../data/BedCard";
// import { FloorPlan } from "../../../data/FloorPlan";
// import { BedDetailPanel } from "../../../data/BedDetailPanel";
// import { AdmissionDialog, DischargeDialog, TransferDialog } from "../../../data/ADTDialogs";
// import { OccupancyHeatmap } from "../../../data/OccupancyHeatmap";
// import { ShiftHandover } from "../../../data/ShiftHandover";
// import { PredictiveChart } from "../../../data/PredictiveChart";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import {
//   BedDouble, Activity, Search, LayoutGrid, Map, BarChart3,
//   ClipboardList, TrendingUp, Hospital
// } from "lucide-react";

// // Import the admin layout components
// import Sidebar from "@/components/admin/Sidebar";
// import Header from "@/components/admin/Header";
// import { Menu, X } from 'lucide-react';

// // Mock toast (replace with real one later)
// const useToast = () => ({
//   toast: ({ title, description }: { title: string; description: string }) => {
//     console.log(`TOAST: ${title} - ${description}`);
//   }
// });

// type ViewMode = "grid" | "floor";

// export default function WardPage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [beds, setBeds] = useState<Bed[]>(initialBeds);
//   const [viewMode, setViewMode] = useState<ViewMode>("grid");
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [typeFilter, setTypeFilter] = useState<string>("all");
//   const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
//   const [detailOpen, setDetailOpen] = useState(false);
//   const [admitBed, setAdmitBed] = useState<Bed | null>(null);
//   const [dischargeBed, setDischargeBed] = useState<Bed | null>(null);
//   const [transferBed, setTransferBed] = useState<Bed | null>(null);
//   const { toast } = useToast();

//   // Stats
//   const stats = useMemo(() => {
//     const total = beds.length;
//     const occupied = beds.filter(b => b.status === "occupied").length;
//     const available = beds.filter(b => b.status === "available").length;
//     const cleaning = beds.filter(b => b.status === "cleaning").length;
//     const expectedDischarges = beds.filter(b => b.patient?.estimatedDischarge === "2026-02-16").length;
//     return { total, occupied, available, cleaning, expectedDischarges };
//   }, [beds]);

//   // Filtered beds
//   const filteredBeds = useMemo(() => {
//     return beds.filter(b => {
//       if (statusFilter !== "all" && b.status !== statusFilter) return false;
//       if (typeFilter !== "all" && b.type !== typeFilter) return false;
//       if (search) {
//         const q = search.toLowerCase();
//         return b.number.toLowerCase().includes(q) ||
//           b.patient?.name.toLowerCase().includes(q) ||
//           b.patient?.mrn.toLowerCase().includes(q);
//       }
//       return true;
//     });
//   }, [beds, statusFilter, typeFilter, search]);

//   const availableBeds = beds.filter(b => b.status === "available");

//   // Handlers
//   const handleSelect = (bed: Bed) => { setSelectedBed(bed); setDetailOpen(true); };
//   const handleAdmit = (bed: Bed, name: string, mrn: string) => {
//     setBeds(prev => prev.map(b => b.id === bed.id ? {
//       ...b, status: "occupied" as BedStatus, recentlyChanged: true,
//       patient: { 
//         name, 
//         initials: name.split(" ").map(w => w[0]).join(""), 
//         gender: "M", age: 30, mrn, 
//         admissionDate: new Date().toISOString().split('T')[0], 
//         estimatedDischarge: "2026-02-20", 
//         diagnosis: "Pending evaluation", 
//         contact: "", 
//         specialRequirements: "" 
//       }
//     } : b));
//     toast({ title: "Patient admitted", description: `${name} assigned to Bed ${bed.number}` });
//   };
//   const handleDischarge = (bed: Bed) => {
//     setBeds(prev => prev.map(b => b.id === bed.id ? { ...b, status: "cleaning" as BedStatus, patient: undefined, vitals: undefined, notes: [], recentlyChanged: true } : b));
//     setDetailOpen(false);
//     toast({ title: "Patient discharged", description: `Bed ${bed.number} moved to cleaning` });
//   };
//   const handleTransfer = (bed: Bed, destId: string) => {
//     setBeds(prev => {
//       const updated = [...prev];
//       const srcIdx = updated.findIndex(b => b.id === bed.id);
//       const dstIdx = updated.findIndex(b => b.id === destId);
//       if (srcIdx >= 0 && dstIdx >= 0) {
//         updated[dstIdx] = { ...updated[dstIdx], status: "occupied", patient: updated[srcIdx].patient, vitals: updated[srcIdx].vitals, notes: updated[srcIdx].notes, recentlyChanged: true };
//         updated[srcIdx] = { ...updated[srcIdx], status: "cleaning", patient: undefined, vitals: undefined, notes: [], recentlyChanged: true };
//       }
//       return updated;
//     });
//     toast({ title: "Patient transferred", description: `Transfer from Bed ${bed.number} complete` });
//   };
//   const handleMarkAvailable = (bed: Bed) => {
//     setBeds(prev => prev.map(b => b.id === bed.id ? { ...b, status: "available" as BedStatus, recentlyChanged: true } : b));
//     toast({ title: "Bed available", description: `Bed ${bed.number} is now available` });
//   };

//   const statCards = [
//     { label: "Total Beds", value: stats.total, icon: BedDouble, filter: "all" },
//     { label: "Occupied", value: stats.occupied, icon: Activity, filter: "occupied", color: "text-status-occupied" },
//     { label: "Available", value: stats.available, icon: BedDouble, filter: "available", color: "text-status-available" },
//     { label: "Cleaning", value: stats.cleaning, icon: BedDouble, filter: "cleaning", color: "text-status-cleaning" },
//     { label: "Expected DC Today", value: stats.expectedDischarges, icon: TrendingUp, filter: "all" },
//     { label: "Predicted 8 PM", value: "82%", icon: BarChart3, filter: "all" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
//       {/* Mobile Menu Button */}
//     <button
//   className="lg:hidden fixed bottom-20 right-6 z-50 p-3 bg-white-600 hover:bg-green-700 text-blue rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
//   onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//   aria-label="Toggle menu"
// >
//   {isSidebarOpen ? (
//     <X className="w-5 h-5" />
//   ) : (
//     <Menu className="w-5 h-5" />
//   )}
// </button>

// {/* Sidebar Component - Stays on left */}
// <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

// {/* Overlay for mobile sidebar - Kept the same */}
// {isSidebarOpen && (
//   <div
//     className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
//     onClick={() => setIsSidebarOpen(false)}
//   />
// )}

//       <main className="flex-1 flex flex-col overflow-y-auto">
//         <Header />

//         <div className="p-5 lg:p-6 space-y-6">
//           {/* Ward Management Header */}
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//             <div>
//               <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                 Ward & Bed Management
//               </h2>
//               <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
//                 Real‑time bed availability, occupancy, and ADT workflows
//               </p>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
//             {statCards.map((s) => (
//               <button
//                 key={s.label}
//                 onClick={() => setStatusFilter(s.filter === "all" ? "all" : s.filter)}
//                 className="rounded-lg border bg-background p-2.5 text-left hover:bg-muted/50 transition-colors"
//               >
//                 <div className="flex items-center gap-1.5 mb-1">
//                   <s.icon className={`h-3.5 w-3.5 ${s.color || "text-muted-foreground"}`} />
//                   <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</span>
//                 </div>
//                 <p className={`text-xl font-bold ${s.color || "text-foreground"}`}>{s.value}</p>
//               </button>
//             ))}
//           </div>

//           {/* Tabs and Filters */}
//           <Tabs defaultValue="beds" className="space-y-4">
//             <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
//               <TabsList>
//                 <TabsTrigger value="beds"><BedDouble className="h-4 w-4 mr-1" /> Beds</TabsTrigger>
//                 <TabsTrigger value="heatmap"><BarChart3 className="h-4 w-4 mr-1" /> Heatmap</TabsTrigger>
//                 <TabsTrigger value="handover"><ClipboardList className="h-4 w-4 mr-1" /> Handover</TabsTrigger>
//                 <TabsTrigger value="analytics"><TrendingUp className="h-4 w-4 mr-1" /> Analytics</TabsTrigger>
//               </TabsList>

//               <div className="flex items-center gap-2">
//                 <div className="relative">
//                   <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="Search bed, patient, MRN…"
//                     className="pl-9 h-9 w-56"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                   />
//                 </div>
//                 <Select value={statusFilter} onValueChange={setStatusFilter}>
//                   <SelectTrigger className="h-9 w-32">
//                     <SelectValue placeholder="Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Status</SelectItem>
//                     <SelectItem value="available">Available</SelectItem>
//                     <SelectItem value="occupied">Occupied</SelectItem>
//                     <SelectItem value="cleaning">Cleaning</SelectItem>
//                     <SelectItem value="maintenance">Maintenance</SelectItem>
//                     <SelectItem value="reserved">Reserved</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <Select value={typeFilter} onValueChange={setTypeFilter}>
//                   <SelectTrigger className="h-9 w-32">
//                     <SelectValue placeholder="Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Types</SelectItem>
//                     <SelectItem value="General">General</SelectItem>
//                     <SelectItem value="ICU">ICU</SelectItem>
//                     <SelectItem value="Pediatric">Pediatric</SelectItem>
//                     <SelectItem value="Emergency">Emergency</SelectItem>
//                     <SelectItem value="Maternity">Maternity</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 <div className="flex rounded-md border">
//                   <Button
//                     variant={viewMode === "grid" ? "default" : "ghost"}
//                     size="icon"
//                     className="h-9 w-9 rounded-r-none"
//                     onClick={() => setViewMode("grid")}
//                   >
//                     <LayoutGrid className="h-4 w-4" />
//                   </Button>
//                   <Button
//                     variant={viewMode === "floor" ? "default" : "ghost"}
//                     size="icon"
//                     className="h-9 w-9 rounded-l-none"
//                     onClick={() => setViewMode("floor")}
//                   >
//                     <Map className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             <TabsContent value="beds">
//               {viewMode === "grid" ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//                   {filteredBeds.map(bed => (
//                     <BedCard
//                       key={bed.id}
//                       bed={bed}
//                       onSelect={handleSelect}
//                       onAssign={(b) => setAdmitBed(b)}
//                       onDischarge={(b) => setDischargeBed(b)}
//                       onTransfer={(b) => setTransferBed(b)}
//                       onMarkCleaning={handleMarkAvailable}
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <FloorPlan beds={filteredBeds} onSelect={handleSelect} />
//               )}
//               {filteredBeds.length === 0 && (
//                 <div className="text-center py-12 text-muted-foreground">
//                   No beds match your filters.
//                 </div>
//               )}
//             </TabsContent>

//             <TabsContent value="heatmap">
//               <OccupancyHeatmap />
//             </TabsContent>
//             <TabsContent value="handover">
//               <ShiftHandover />
//             </TabsContent>
//             <TabsContent value="analytics">
//               <PredictiveChart />
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>

//       {/* Dialogs */}
//       <BedDetailPanel
//         bed={selectedBed}
//         open={detailOpen}
//         onClose={() => setDetailOpen(false)}
//         onDischarge={(b) => { setDetailOpen(false); setDischargeBed(b); }}
//         onTransfer={(b) => { setDetailOpen(false); setTransferBed(b); }}
//       />
//       <AdmissionDialog
//         bed={admitBed}
//         open={!!admitBed}
//         onClose={() => setAdmitBed(null)}
//         onConfirm={handleAdmit}
//       />
//       <DischargeDialog
//         bed={dischargeBed}
//         open={!!dischargeBed}
//         onClose={() => setDischargeBed(null)}
//         onConfirm={handleDischarge}
//       />
//       <TransferDialog
//         bed={transferBed}
//         open={!!transferBed}
//         onClose={() => setTransferBed(null)}
//         onConfirm={handleTransfer}
//         availableBeds={availableBeds}
//       />
//     </div>
//   );
// }



// app/admin/bed-management/page.tsx


'use client';

import { useState, useMemo, useEffect } from "react";
import { useWardData, Bed, BedStatus } from "../../../data/wardData";
import { BedCard } from "../../../data/BedCard";
import { FloorPlan } from "../../../data/FloorPlan";
import { BedDetailPanel } from "../../../data/BedDetailPanel";
import { AdmissionDialog, DischargeDialog, TransferDialog } from "../../../data/ADTDialogs";
import { OccupancyHeatmap } from "../../../data/OccupancyHeatmap";
import { ShiftHandover } from "../../../data/ShiftHandover";
import { PredictiveChart } from "../../../data/PredictiveChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BedDouble, Activity, Search, LayoutGrid, Map, BarChart3,
  ClipboardList, TrendingUp, RefreshCw, Loader2
} from "lucide-react";
import { patchBed } from "@/lib/api/bed-config";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { Menu, X } from 'lucide-react';
import { toast } from "sonner";

type ViewMode = "grid" | "floor";

export default function WardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [admitBed, setAdmitBed] = useState<Bed | null>(null);
  const [dischargeBed, setDischargeBed] = useState<Bed | null>(null);
  const [transferBed, setTransferBed] = useState<Bed | null>(null);

  // Use the real data hook
const { beds, wards, forecast, loading, error, refresh } = useWardData();
  
  const [localBeds, setLocalBeds] = useState<Bed[]>([]);

  useEffect(() => {
    setLocalBeds(beds);
  }, [beds]);

  const stats = useMemo(() => {
    const currentBeds = localBeds;
    const total = currentBeds.length;
    const occupied = currentBeds.filter(b => b.status === "occupied").length;
    const available = currentBeds.filter(b => b.status === "available").length;
    const cleaning = currentBeds.filter(b => b.status === "cleaning").length;
    const maintenance = currentBeds.filter(b => b.status === "maintenance").length;
    const reserved = currentBeds.filter(b => b.status === "reserved").length;
    
    const predictedOccupancy = forecast.length > 0 
      ? forecast[forecast.length - 1]?.occupancy + "%"
      : "82%";
    
    return { total, occupied, available, cleaning, maintenance, reserved, predictedOccupancy };
  }, [localBeds, forecast]);

  const filteredBeds = useMemo(() => {
    return localBeds.filter(b => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (typeFilter !== "all" && b.type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return b.number.toLowerCase().includes(q) ||
          b.patient?.name?.toLowerCase().includes(q) ||
          b.patient?.mrn?.toLowerCase().includes(q) ||
          b.ward.toLowerCase().includes(q);
      }
      return true;
    });
  }, [localBeds, statusFilter, typeFilter, search]);

  const availableBeds = localBeds.filter(b => b.status === "available");

  const handleSelect = (bed: Bed) => { 
    setSelectedBed(bed); 
    setDetailOpen(true); 
  };

  const handleAdmit = async (bed: Bed, name: string, mrn: string) => {
    try {
      setLocalBeds(prev => prev.map(b => b.id === bed.id ? {
        ...b, status: "occupied" as BedStatus, recentlyChanged: true,
        patient: { 
          name, 
          initials: name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2), 
          gender: "M", age: 30, mrn, 
          admissionDate: new Date().toISOString().split('T')[0], 
          estimatedDischarge: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
          diagnosis: "Pending evaluation", 
          contact: "", 
          specialRequirements: "" 
        }
      } : b));

      const bedId = parseInt(bed.id);
      await patchBed(bedId, {
        status: "occupied",
        attributes: {
          patient_name: name,
          patient_initials: name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2),
          mrn,
          admission_date: new Date().toISOString().split('T')[0],
        }
      });

      toast.success("Patient admitted", {
        description: `${name} assigned to Bed ${bed.number}`
      });
    } catch (error) {
      setLocalBeds(beds);
      toast.error("Failed to admit patient");
    }
  };

  const handleDischarge = async (bed: Bed) => {
    try {
      setLocalBeds(prev => prev.map(b => b.id === bed.id ? { 
        ...b, 
        status: "cleaning" as BedStatus, 
        patient: undefined, 
        vitals: undefined, 
        notes: [], 
        recentlyChanged: true 
      } : b));
      
      setDetailOpen(false);

      const bedId = parseInt(bed.id);
      await patchBed(bedId, {
        status: "cleaning",
        attributes: {
          patient_name: undefined,
          patient_initials: undefined,
          mrn: undefined,
          admission_date: undefined,
        }
      });

      toast.success("Patient discharged", {
        description: `Bed ${bed.number} moved to cleaning`
      });
    } catch (error) {
      setLocalBeds(beds);
      toast.error("Failed to discharge patient");
    }
  };

  const handleTransfer = async (bed: Bed, destId: string) => {
    try {
      setLocalBeds(prev => {
        const updated = [...prev];
        const srcIdx = updated.findIndex(b => b.id === bed.id);
        const dstIdx = updated.findIndex(b => b.id === destId);
        
        if (srcIdx >= 0 && dstIdx >= 0) {
          updated[dstIdx] = { 
            ...updated[dstIdx], 
            status: "occupied", 
            patient: updated[srcIdx].patient, 
            vitals: updated[srcIdx].vitals, 
            notes: updated[srcIdx].notes, 
            recentlyChanged: true 
          };
          updated[srcIdx] = { 
            ...updated[srcIdx], 
            status: "cleaning", 
            patient: undefined, 
            vitals: undefined, 
            notes: [], 
            recentlyChanged: true 
          };
        }
        return updated;
      });

      const srcId = parseInt(bed.id);
      const dstId = parseInt(destId);
      
      await patchBed(srcId, { status: "cleaning" });
      
      if (bed.patient) {
        await patchBed(dstId, {
          status: "occupied",
          attributes: {
            patient_name: bed.patient.name,
            patient_initials: bed.patient.initials,
            mrn: bed.patient.mrn,
            admission_date: bed.patient.admissionDate,
          }
        });
      }

      toast.success("Patient transferred", {
        description: `Transfer from Bed ${bed.number} complete`
      });
    } catch (error) {
      setLocalBeds(beds);
      toast.error("Failed to transfer patient");
    }
  };

  const handleMarkAvailable = async (bed: Bed) => {
    try {
      setLocalBeds(prev => prev.map(b => b.id === bed.id ? { 
        ...b, 
        status: "available" as BedStatus, 
        recentlyChanged: true 
      } : b));

      const bedId = parseInt(bed.id);
      await patchBed(bedId, { status: "available" });

      toast.success("Bed available", {
        description: `Bed ${bed.number} is now available`
      });
    } catch (error) {
      setLocalBeds(beds);
      toast.error("Failed to update bed status");
    }
  };

  const statCards = [
    { label: "Total Beds", value: stats.total, icon: BedDouble, filter: "all" },
    { label: "Occupied", value: stats.occupied, icon: Activity, filter: "occupied", color: "text-status-occupied" },
    { label: "Available", value: stats.available, icon: BedDouble, filter: "available", color: "text-status-available" },
    { label: "Cleaning", value: stats.cleaning, icon: BedDouble, filter: "cleaning", color: "text-status-cleaning" },
    { label: "Maintenance", value: stats.maintenance, icon: BedDouble, filter: "maintenance", color: "text-status-maintenance" },
    { label: "Reserved", value: stats.reserved, icon: BedDouble, filter: "reserved", color: "text-status-reserved" },
    { label: "Predicted", value: stats.predictedOccupancy, icon: BarChart3, filter: "all" },
  ];

  if (loading && localBeds.length === 0) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Loading ward data...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed bottom-20 right-6 z-50 p-3 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header />

        <div className="p-5 lg:p-6 space-y-6">
          {/* Header with Refresh */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Ward & Bed Management
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Real‑time bed availability, occupancy, and ADT workflows
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {statCards.map((s) => (
              <button
                key={s.label}
                onClick={() => setStatusFilter(s.filter === "all" ? "all" : s.filter)}
                className="rounded-lg border bg-background p-2.5 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <s.icon className={`h-3.5 w-3.5 ${s.color || "text-muted-foreground"}`} />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</span>
                </div>
                <p className={`text-xl font-bold ${s.color || "text-foreground"}`}>{s.value}</p>
              </button>
            ))}
          </div>

          {/* Tabs and Filters */}
          <Tabs defaultValue="beds" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
              <TabsList>
                <TabsTrigger value="beds"><BedDouble className="h-4 w-4 mr-1" /> Beds</TabsTrigger>
                <TabsTrigger value="heatmap"><BarChart3 className="h-4 w-4 mr-1" /> Heatmap</TabsTrigger>
                <TabsTrigger value="handover"><ClipboardList className="h-4 w-4 mr-1" /> Handover</TabsTrigger>
                <TabsTrigger value="analytics"><TrendingUp className="h-4 w-4 mr-1" /> Analytics</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search bed, patient, MRN…"
                    className="pl-9 h-9 w-56"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="h-9 w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="h-9 w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="ICU">ICU</SelectItem>
                    <SelectItem value="Pediatric">Pediatric</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                    <SelectItem value="Maternity">Maternity</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex rounded-md border">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "floor" ? "default" : "ghost"}
                    size="icon"
                    className="h-9 w-9 rounded-l-none"
                    onClick={() => setViewMode("floor")}
                  >
                    <Map className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value="beds">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {filteredBeds.map(bed => (
                    <BedCard
                      key={bed.id}
                      bed={bed}
                      onSelect={handleSelect}
                      onAssign={(b) => setAdmitBed(b)}
                      onDischarge={(b) => setDischargeBed(b)}
                      onTransfer={(b) => setTransferBed(b)}
                      onMarkCleaning={handleMarkAvailable}
                    />
                  ))}
                </div>
              ) : (
                <FloorPlan beds={filteredBeds} onSelect={handleSelect} />
              )}
              {filteredBeds.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No beds match your filters.
                </div>
              )}
            </TabsContent>

            <TabsContent value="heatmap">
             <OccupancyHeatmap wards={wards} />
            </TabsContent>
            <TabsContent value="handover">
              <ShiftHandover beds={localBeds} />
            </TabsContent>
            <TabsContent value="analytics">
              <PredictiveChart forecast={forecast} beds={localBeds} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Dialogs */}
      <BedDetailPanel
        bed={selectedBed}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onDischarge={(b) => { setDetailOpen(false); setDischargeBed(b); }}
        onTransfer={(b) => { setDetailOpen(false); setTransferBed(b); }}
      />
      <AdmissionDialog
        bed={admitBed}
        open={!!admitBed}
        onClose={() => setAdmitBed(null)}
        onSuccess={refresh}
      />
      <DischargeDialog
        bed={dischargeBed}
        open={!!dischargeBed}
        onClose={() => setDischargeBed(null)}
        onSuccess={refresh}
      />
      <TransferDialog
        bed={transferBed}
        open={!!transferBed}
        onClose={() => setTransferBed(null)}
        onSuccess={refresh}
        availableBeds={availableBeds}
      />
    </div>
  );
}