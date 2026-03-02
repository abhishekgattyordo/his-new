
// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import toast from "react-hot-toast";
// import Sidebar from "@/components/admin/Sidebar";

// import {
//   Building2,
//   Plus,
//   Edit,
//   Trash2,
//   Layers,
//   DoorOpen,
//   BedDouble,
//   ChevronRight,
//   X,
//   Menu,
//   Download,
//   Upload,
//   RefreshCw,
// } from "lucide-react";

// // Import API functions
// import {
//   getFloors,
//   createFloor,
//    deleteFloor,
//   getWards,
//   createWard,
//   updateWard,
//   deleteWard,
//   getRooms,
//   createRoom,
//   deleteRoom,
//   getBeds,
//   createBeds,
//   patchBed,
//   deleteBed,
//   updateRoom,      // Add this
//   updateFloor,
// } from "@/lib/api/bed-config";

// // Types
// type Floor = {
//   id: number;
//   floor_number: number;
//   name: string | null;
//   created_at: string;
//   updated_at: string;
// };

// type WardType =
//   | "General"
//   | "Semi-Special"
//   | "Special"
//   | "VIP"
//   | "ICU"
//   | "Pediatric";
// type PatientCategory = "Male" | "Female" | "Children" | "Mixed";
// type BedStatus =
//   | "available"
//   | "occupied"
//   | "cleaning"
//   | "maintenance"
//   | "reserved";

// type Ward = {
//   id: number;
//   floor_id: number;
//   name: string;
//   type: WardType;
//   patient_category: PatientCategory;
//   description: string | null;
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
// };

// type Room = {
//   id: number;
//   ward_id: number;
//   room_number: string;
//   name: string | null;
//   description: string | null;
//   created_at: string;
//   updated_at: string;
// };

// type Bed = {
//   id: number;
//   ward_id: number;
//   room_id: number | null;
//   bed_number: string;
//   type: WardType;
//   floor_number: number;
//   status: BedStatus;
//   patient_category: PatientCategory;
//   attributes: Record<string, any> | null;
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
// };

// export default function BedConfigurationPage() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Data states
//   const [floors, setFloors] = useState<Floor[]>([]);
//   const [isEditFloorOpen, setIsEditFloorOpen] = useState(false);
//   const [editingFloor, setEditingFloor] = useState<Floor | null>(null);
//   const [wards, setWards] = useState<Ward[]>([]);
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [beds, setBeds] = useState<Bed[]>([]);

//   // Selection states
//   const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
//   const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
//   const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

//   // Dialog states
//   const [isAddFloorOpen, setIsAddFloorOpen] = useState(false);
//   const [isAddWardOpen, setIsAddWardOpen] = useState(false);
//   const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
//   const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
// const [editingRoom, setEditingRoom] = useState<Room | null>(null);
//   const [isAddBedOpen, setIsAddBedOpen] = useState(false);
//   const [isEditWardOpen, setIsEditWardOpen] = useState(false);
//   const [editingWard, setEditingWard] = useState<Ward | null>(null);

//   // Form states
//   const [newFloor, setNewFloor] = useState({ floor_number: 0, name: "" });
//   const [newWard, setNewWard] = useState({
//     name: "",
//     type: "General" as WardType,
//     patient_category: "Mixed" as PatientCategory,
//     description: "",
//   });
//   const [newRoom, setNewRoom] = useState({
//     ward_id: 0,
//     room_number: "",
//     name: "",
//     description: "",
//   });
//  const [bulkBedsData, setBulkBedsData] = useState<{
//   ward_id: number;
//   room_id?: number;          // optional or undefined
//   count: number;
//   prefix: string;
//   patient_category?: PatientCategory;  // optional or undefined
//   attributes: Record<string, any>;
// }>({
//   ward_id: 0,
//   room_id: undefined,
//   count: 5,
//   prefix: "",
//   patient_category: undefined,
//   attributes: {},
// });

//   // Load initial data
//   useEffect(() => {
//     loadFloors();
//   }, []);

//   useEffect(() => {
//     if (selectedFloor) {
//       loadWards(selectedFloor.id);
//     }
//   }, [selectedFloor]);

//   useEffect(() => {
//     if (selectedWard) {
//       loadRooms(selectedWard.id);
//       loadBeds(selectedWard.id, selectedRoom?.id);
//     }
//   }, [selectedWard, selectedRoom]);

//   // API Functions
//   const loadFloors = async () => {
//     try {
//       setIsLoading(true);
//       const response = await getFloors();
//       setFloors(response.data.data || []);
//     } catch (error) {
//       toast.error("Failed to load floors");
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const loadWards = async (floorId: number) => {
//     try {
//       const response = await getWards(floorId);
//      setWards(response.data.data || []);
//     } catch (error) {
//       toast.error("Failed to load wards");
//       console.error(error);
//     }
//   };

//   const loadRooms = async (wardId: number) => {
//     try {
//       const response = await getRooms(wardId);
//       setRooms(response.data.data || []);
//     } catch (error) {
//       toast.error("Failed to load rooms");
//       console.error(error);
//     }
//   };

//   const loadBeds = async (wardId?: number, roomId?: number) => {
//     try {
//       const params: any = {};
//       if (wardId) params.ward_id = wardId;
//       if (roomId) params.room_id = roomId;

//       const response = await getBeds(params);
//       setBeds(response.data.data || []);
//     } catch (error) {
//       toast.error("Failed to load beds");
//       console.error(error);
//     }
//   };

//   // Floor Handlers
//   const handleAddFloor = async () => {
//     if (!newFloor.floor_number) {
//       toast.error("Floor number required");
//       return;
//     }

//     try {
//       setIsLoading(true);
// const response = await createFloor(newFloor);
// if (response.data?.data) {
//   setFloors([...floors, response.data.data]);
//   setIsAddFloorOpen(false);
//   setNewFloor({ floor_number: 0, name: "" });
//   toast.success("Floor added successfully");
// } else {
//   toast.error(response.data?.message || "Failed to add floor");
// }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteFloor = async (floorId: number) => {
//     if (
//       !confirm(
//         "Are you sure you want to delete this floor? This will also delete all wards, rooms, and beds in this floor.",
//       )
//     )
//       return;

//     try {
//       setIsLoading(true);
//       await deleteFloor(floorId);
//       setFloors(floors.filter((f) => f.id !== floorId));
//       if (selectedFloor?.id === floorId) {
//         setSelectedFloor(null);
//         setSelectedWard(null);
//         setSelectedRoom(null);
//       }
//       toast.success("Floor deleted successfully");
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to delete floor");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Ward Handlers
//   const handleAddWard = async () => {
//     if (!selectedFloor) {
//       toast.error("Select a floor first");
//       return;
//     }
//     if (!newWard.name) {
//       toast.error("Ward name required");
//       return;
//     }

//     try {
//   setIsLoading(true);
//   const response = await createWard({
//     floor_id: selectedFloor.id,
//     ...newWard,
//   });
  
//   if (response.data?.success && response.data?.data) {
//     setWards([...wards, response.data.data]);
//     setIsAddWardOpen(false);
//     setNewWard({
//       name: "",
//       type: "General",
//       patient_category: "Mixed",
//       description: "",
//     });
//     toast.success("Ward added successfully");
//   } else {
//     // If API returns success: false, use its message
//     throw new Error(response.data?.message || "Failed to add ward");
//   }
// } catch (error: any) {
//   toast.error(error.response?.data?.message || error.message || "Failed to add ward");
// } finally {
//   setIsLoading(false);
// }
//   };

//  const handleUpdateWard = async () => {
//   if (!editingWard) return;

//   try {
//     setIsLoading(true);
//     const response = await updateWard(editingWard.id, {
//       name: editingWard.name,
//       type: editingWard.type,
//       patient_category: editingWard.patient_category,
//       description: editingWard.description,
//       // Include floor_id if needed (uncomment if API requires it)
//       // floor_id: editingWard.floor_id,
//     });

//     if (response.data?.success && response.data?.data) {
//       const updatedWard = response.data.data;
//       setWards(wards.map((w) => (w.id === editingWard.id ? updatedWard : w)));
//       setIsEditWardOpen(false);
//       setEditingWard(null);
//       toast.success("Ward updated successfully");
//     } else {
//       throw new Error(response.data?.message || "Failed to update ward");
//     }
//   } catch (error: any) {
//     toast.error(error.response?.data?.message || error.message || "Failed to update ward");
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const handleDeleteWard = async (wardId: number) => {
//     if (!confirm("Are you sure you want to deactivate this ward?")) return;

//     try {
//       await deleteWard(wardId);
//       setWards(
//         wards.map((w) => (w.id === wardId ? { ...w, is_active: false } : w)),
//       );
//       if (selectedWard?.id === wardId) setSelectedWard(null);
//       toast.success("Ward deactivated");
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to delete ward");
//     }
//   };

//   // Room Handlers
//  const handleAddRoom = async () => {
//   if (!selectedWard) {
//     toast.error("Select a ward first");
//     return;
//   }
//   if (!newRoom.room_number) {
//     toast.error("Room number required");
//     return;
//   }

//   try {
//     setIsLoading(true);
//     const response = await createRoom({
//       ward_id: selectedWard.id,
//       room_number: newRoom.room_number,
//       name: newRoom.name || null,
//       description: newRoom.description || null,
//     });

//     if (response.data?.success && response.data?.data) {
//       setRooms([...rooms, response.data.data]);
//       setIsAddRoomOpen(false);
//       setNewRoom({ ward_id: 0, room_number: "", name: "", description: "" });
//       toast.success("Room added successfully");
//     } else {
//       throw new Error(response.data?.message || "Failed to add room");
//     }
//   } catch (error: any) {
//     toast.error(error.response?.data?.message || error.message || "Failed to add room");
//   } finally {
//     setIsLoading(false);
//   }
// };

//   // Room Edit Handlers
// const handleUpdateRoom = async () => {
//   if (!editingRoom) return;

//   try {
//     setIsLoading(true);
//     const response = await updateRoom(editingRoom.id, {
//       room_number: editingRoom.room_number,
//       name: editingRoom.name,
//       description: editingRoom.description,
//     });

//     if (response.data?.success && response.data?.data) {
//       const updatedRoom = response.data.data;
//       setRooms(rooms.map((r) => (r.id === editingRoom.id ? updatedRoom : r)));
//       setIsEditRoomOpen(false);
//       setEditingRoom(null);
//       toast.success("Room updated successfully");
//     } else {
//       throw new Error(response.data?.message || "Failed to update room");
//     }
//   } catch (error: any) {
//     toast.error(error.response?.data?.message || error.message || "Failed to update room");
//   } finally {
//     setIsLoading(false);
//   }
// };

// const handleDeleteRoom = async (roomId: number) => {
//   if (!confirm("Are you sure you want to delete this room?")) return;

//   try {
//     const response = await deleteRoom(roomId);
//     // If API returns a success flag, check it; otherwise assume success if no error thrown
//     if (response.data?.success === false) {
//       toast.error(response.data.message || "Failed to delete room");
//       return;
//     }
//     setRooms(rooms.filter((r) => r.id !== roomId));
//     if (selectedRoom?.id === roomId) setSelectedRoom(null);
//     toast.success("Room deleted");
//   } catch (error: any) {
//     toast.error(error.response?.data?.message || "Failed to delete room");
//   }
// };


// const handleUpdateFloor = async () => {
//   if (!editingFloor) return;

//   try {
//     setIsLoading(true);
//     const response = await updateFloor(editingFloor.id, {
//       floor_number: editingFloor.floor_number,
//       name: editingFloor.name,
//     });

//     if (response.data?.success && response.data?.data) {
//       const updatedFloor = response.data.data; // ✅ now known to be Floor
//       setFloors(floors.map((f) => (f.id === editingFloor.id ? updatedFloor : f)));
//       setIsEditFloorOpen(false);
//       setEditingFloor(null);
//       toast.success("Floor updated successfully");
//     } else {
//       throw new Error(response.data?.message || "Failed to update floor");
//     }
//   } catch (error: any) {
//     toast.error(error.response?.data?.message || "Failed to update floor");
//   } finally {
//     setIsLoading(false);
//   }
// };

//   // Bed Handlers
//   const handleAddBeds = async () => {
//   if (!selectedWard) {
//     toast.error("Select a ward first");
//     return;
//   }

//   try {
//     setIsLoading(true);
//     const response = await createBeds({
//       ward_id: selectedWard.id,
//       room_id: selectedRoom?.id,
//       count: bulkBedsData.count,
//       prefix: bulkBedsData.prefix || undefined,
//       patient_category: bulkBedsData.patient_category,
//       attributes: bulkBedsData.attributes,
//     });

//     // Refresh beds
//     await loadBeds(selectedWard.id, selectedRoom?.id);

//     setIsAddBedOpen(false);
//     setBulkBedsData({
//       ward_id: 0,
//       room_id: undefined,
//       count: 5,
//       prefix: "",
//       patient_category: undefined,
//       attributes: {},
//     });

//     const addedCount = response.data?.data?.length || 0;
//     toast.success(`${addedCount} beds added successfully`);
//   } catch (error: any) {
//     toast.error(error.response?.data?.message || "Failed to add beds");
//   } finally {
//     setIsLoading(false);
//   }
// };

// const handleUpdateBedStatus = async (bedId: number, status: BedStatus) => {
//   // Find the bed
//   const bed = beds.find(b => b.id === bedId);
  
//   // Prevent status change if bed is occupied
//   if (bed?.status === 'occupied') {
//     toast.error("Cannot change status of an occupied bed");
//     return;
//   }

//  try {
//   const response = await patchBed(bedId, { status });
//   if (response.data?.success && response.data?.data) {
//     const updatedBed = response.data.data;
//     setBeds(beds.map((b) => (b.id === bedId ? updatedBed : b)));
//     toast.success(`Bed status updated to ${status}`);
//   } else {
//     toast.error(response.data?.message || "Failed to update bed");
//   }
// } catch (error: any) {
//   toast.error(error.response?.data?.message || "Failed to update bed");
// }
// };

//   const handleDeleteBed = async (bedId: number) => {
//     if (!confirm("Are you sure you want to delete this bed?")) return;

//     try {
//       await deleteBed(bedId);
//       setBeds(beds.filter((b) => b.id !== bedId));
//       toast.success("Bed deleted");
//     } catch (error: any) {
//       toast.error(error.response?.data?.message || "Failed to delete bed");
//     }
//   };

//   // Filtered data
//   const filteredWards = wards.filter(
//     (w) => w.floor_id === selectedFloor?.id && w.is_active,
//   );
//   const filteredRooms = rooms.filter((r) => r.ward_id === selectedWard?.id);
//   const filteredBeds = beds.filter(
//     (b) =>
//       b.ward_id === selectedWard?.id &&
//       (selectedRoom ? b.room_id === selectedRoom.id : true) &&
//       b.is_active,
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Mobile menu button */}
//       <button
//         className="lg:hidden fixed bottom-20 right-6 z-50 p-3 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//       >
//         {isSidebarOpen ? (
//           <X className="w-5 h-5" />
//         ) : (
//           <Menu className="w-5 h-5" />
//         )}
//       </button>

//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       <main className="flex-1 flex flex-col overflow-y-auto">
//         <div className="p-5 lg:p-6 space-y-6">
//           {/* Header */}
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//             <div>
//               <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//                 Bed Configuration
//               </h2>
//               <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
//                 Define floors, wards, rooms, and beds
//               </p>
//             </div>
//             <div className="flex gap-2">
//               <Button variant="outline" size="sm" onClick={loadFloors}>
//                 <RefreshCw className="h-4 w-4 mr-1" /> Refresh
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Download className="h-4 w-4 mr-1" /> Export
//               </Button>
//             </div>
//           </div>

//           {/* Loading indicator */}
//           {isLoading && (
//             <div className="flex justify-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//             </div>
//           )}

//           {/* Main configuration area */}
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             {/* Left panel: Floors list */}
//             <Card className="lg:col-span-1">
//               <CardHeader className="pb-3">
//                 <CardTitle className="text-sm font-medium flex items-center justify-between">
//                   <span className="flex items-center">
//                     <Building2 className="h-4 w-4 mr-2" />
//                     Floors
//                   </span>
//                   <Dialog
//                     open={isAddFloorOpen}
//                     onOpenChange={setIsAddFloorOpen}
//                   >
//                     <DialogTrigger asChild>
//                       <Button variant="ghost" size="icon" className="h-7 w-7">
//                         <Plus className="h-4 w-4" />
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>Add New Floor</DialogTitle>
//                       </DialogHeader>
//                       <div className="space-y-4 py-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="floor-number">Floor Number *</Label>
//                           <Input
//                             id="floor-number"
//                             type="number"
//                             min="1"
//                             value={newFloor.floor_number || ""}
//                             onChange={(e) =>
//                               setNewFloor({
//                                 ...newFloor,
//                                 floor_number: parseInt(e.target.value) || 0,
//                               })
//                             }
//                             placeholder="Enter floor number"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="floor-name">
//                             Floor Name (optional)
//                           </Label>
//                           <Input
//                             id="floor-name"
//                             value={newFloor.name}
//                             onChange={(e) =>
//                               setNewFloor({ ...newFloor, name: e.target.value })
//                             }
//                             placeholder="e.g., Ground Floor"
//                           />
//                         </div>
//                       </div>
//                       <DialogFooter>
//                         <Button
//                           variant="outline"
//                           onClick={() => setIsAddFloorOpen(false)}
//                         >
//                           Cancel
//                         </Button>
//                         <Button onClick={handleAddFloor} disabled={isLoading}>
//                           {isLoading ? "Adding..." : "Add Floor"}
//                         </Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>
//                 </CardTitle>
//               </CardHeader>
//               {/* Edit Floor Dialog */}
// <Dialog open={isEditFloorOpen} onOpenChange={setIsEditFloorOpen}>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Edit Floor</DialogTitle>
//     </DialogHeader>
//     {editingFloor && (
//       <div className="space-y-4 py-4">
//         <div className="space-y-2">
//           <Label htmlFor="edit-floor-number">Floor Number *</Label>
//           <Input
//             id="edit-floor-number"
//             type="number"
//             min="1"
//             value={editingFloor.floor_number}
//             onChange={(e) =>
//               setEditingFloor({
//                 ...editingFloor,
//                 floor_number: parseInt(e.target.value) || 0,
//               })
//             }
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="edit-floor-name">Floor Name (optional)</Label>
//           <Input
//             id="edit-floor-name"
//             value={editingFloor.name || ""}
//             onChange={(e) =>
//               setEditingFloor({
//                 ...editingFloor,
//                 name: e.target.value,
//               })
//             }
//           />
//         </div>
//       </div>
//     )}
//     <DialogFooter>
//       <Button
//         variant="outline"
//         onClick={() => setIsEditFloorOpen(false)}
//       >
//         Cancel
//       </Button>
//       <Button onClick={handleUpdateFloor} disabled={isLoading}>
//         {isLoading ? "Saving..." : "Save Changes"}
//       </Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog>
//               <CardContent className="p-0">
//                 <ScrollArea className="h-[calc(100vh-300px)]">
//                   {floors.map((floor) => (
//                     <div
//                       key={floor.id}
//                       className={`flex items-center justify-between p-3 border-b hover:bg-muted/50 transition-colors ${selectedFloor?.id === floor.id ? "bg-muted" : ""}`}
//                     >
//                       <div
//                         className="flex-1 cursor-pointer"
//                         onClick={() => setSelectedFloor(floor)}
//                       >
//                         <p className="font-medium">
//                           Floor {floor.floor_number}
//                         </p>
//                         {floor.name && (
//                           <p className="text-xs text-muted-foreground">
//                             {floor.name}
//                           </p>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-7 w-7"
//                           onClick={() => {
//                             setEditingFloor(floor);
//                             setIsEditFloorOpen(true);
//                           }}
//                         >
//                           <Edit className="h-3.5 w-3.5" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-7 w-7"
//                           onClick={() => handleDeleteFloor(floor.id)}
//                         >
//                           <Trash2 className="h-3.5 w-3.5 text-red-500" />
//                         </Button>
//                         <ChevronRight className="h-4 w-4 text-muted-foreground" />
//                       </div>
//                     </div>
//                   ))}
//                 </ScrollArea>
//               </CardContent>
//             </Card>

//             {/* Right panel: Ward, Room, Bed configuration */}
//             <div className="lg:col-span-3 space-y-6">
//               {selectedFloor ? (
//                 <>
//                   {/* Ward section */}
//                   <Card>
//                     <CardHeader className="pb-3">
//                       <CardTitle className="text-sm font-medium flex items-center justify-between">
//                         <span className="flex items-center">
//                           <Layers className="h-4 w-4 mr-2" />
//                           Wards on Floor {selectedFloor.floor_number}
//                         </span>
//                         <Dialog
//                           open={isAddWardOpen}
//                           onOpenChange={setIsAddWardOpen}
//                         >
//                           <DialogTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               className="h-7 w-7"
//                             >
//                               <Plus className="h-4 w-4" />
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent>
//                             <DialogHeader>
//                               <DialogTitle>Add New Ward</DialogTitle>
//                             </DialogHeader>
//                             <div className="space-y-4 py-4">
//                               <div className="space-y-2">
//                                 <Label htmlFor="ward-name">Ward Name *</Label>
//                                 <Input
//                                   id="ward-name"
//                                   value={newWard.name}
//                                   onChange={(e) =>
//                                     setNewWard({
//                                       ...newWard,
//                                       name: e.target.value,
//                                     })
//                                   }
//                                 />
//                               </div>
//                               <div className="space-y-2">
//                                 <Label htmlFor="ward-type">Ward Type</Label>
//                                 <Select
//                                   value={newWard.type}
//                                   onValueChange={(v: WardType) =>
//                                     setNewWard({ ...newWard, type: v })
//                                   }
//                                 >
//                                   <SelectTrigger>
//                                     <SelectValue />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="General">
//                                       General
//                                     </SelectItem>
//                                     <SelectItem value="Semi-Special">
//                                       Semi-Special
//                                     </SelectItem>
//                                     <SelectItem value="Special">
//                                       Special
//                                     </SelectItem>
//                                     <SelectItem value="VIP">VIP</SelectItem>
//                                     <SelectItem value="ICU">ICU</SelectItem>
//                                     <SelectItem value="Pediatric">
//                                       Pediatric
//                                     </SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label htmlFor="patient-category">
//                                   Patient Category
//                                 </Label>
//                                 <Select
//                                   value={newWard.patient_category}
//                                   onValueChange={(v: PatientCategory) =>
//                                     setNewWard({
//                                       ...newWard,
//                                       patient_category: v,
//                                     })
//                                   }
//                                 >
//                                   <SelectTrigger>
//                                     <SelectValue />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     <SelectItem value="Male">Male</SelectItem>
//                                     <SelectItem value="Female">
//                                       Female
//                                     </SelectItem>
//                                     <SelectItem value="Children">
//                                       Children
//                                     </SelectItem>
//                                     <SelectItem value="Mixed">Mixed</SelectItem>
//                                   </SelectContent>
//                                 </Select>
//                               </div>
//                               <div className="space-y-2">
//                                 <Label htmlFor="ward-desc">
//                                   Description (optional)
//                                 </Label>
//                                 <Input
//                                   id="ward-desc"
//                                   value={newWard.description}
//                                   onChange={(e) =>
//                                     setNewWard({
//                                       ...newWard,
//                                       description: e.target.value,
//                                     })
//                                   }
//                                 />
//                               </div>
//                             </div>
//                             <DialogFooter>
//                               <Button
//                                 variant="outline"
//                                 onClick={() => setIsAddWardOpen(false)}
//                               >
//                                 Cancel
//                               </Button>
//                               <Button
//                                 onClick={handleAddWard}
//                                 disabled={isLoading}
//                               >
//                                 Save
//                               </Button>
//                             </DialogFooter>
//                           </DialogContent>
//                         </Dialog>
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       {filteredWards.length === 0 ? (
//                         <p className="text-sm text-muted-foreground py-4 text-center">
//                           No wards. Click + to add one.
//                         </p>
//                       ) : (
//                         <div className="flex flex-wrap gap-2">
//                           {filteredWards.map((ward) => (
//                             <div
//                               key={ward.id}
//                               className="flex items-center gap-1"
//                             >
//                               <Badge
//                                 variant={
//                                   selectedWard?.id === ward.id
//                                     ? "default"
//                                     : "outline"
//                                 }
//                                 className="cursor-pointer px-3 py-1"
//                                 onClick={() => setSelectedWard(ward)}
//                               >
//                                 {ward.name} ({ward.type})
//                               </Badge>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="h-6 w-6"
//                                 onClick={() => {
//                                   setEditingWard(ward);
//                                   setIsEditWardOpen(true);
//                                 }}
//                               >
//                                 <Edit className="h-3 w-3" />
//                               </Button>
//                               <Button
//                                 variant="ghost"
//                                 size="icon"
//                                 className="h-6 w-6"
//                                 onClick={() => handleDeleteWard(ward.id)}
//                               >
//                                 <Trash2 className="h-3 w-3" />
//                               </Button>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>

//                   {/* Edit Ward Dialog */}
//                   <Dialog
//                     open={isEditWardOpen}
//                     onOpenChange={setIsEditWardOpen}
//                   >
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>Edit Ward</DialogTitle>
//                       </DialogHeader>
//                       {editingWard && (
//                         <div className="space-y-4 py-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="edit-ward-name">Ward Name</Label>
//                             <Input
//                               id="edit-ward-name"
//                               value={editingWard.name}
//                               onChange={(e) =>
//                                 setEditingWard({
//                                   ...editingWard,
//                                   name: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="edit-ward-type">Ward Type</Label>
//                             <Select
//                               value={editingWard.type}
//                               onValueChange={(v: WardType) =>
//                                 setEditingWard({ ...editingWard, type: v })
//                               }
//                             >
//                               <SelectTrigger>
//                                 <SelectValue />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="General">General</SelectItem>
//                                 <SelectItem value="Semi-Special">
//                                   Semi-Special
//                                 </SelectItem>
//                                 <SelectItem value="Special">Special</SelectItem>
//                                 <SelectItem value="VIP">VIP</SelectItem>
//                                 <SelectItem value="ICU">ICU</SelectItem>
//                                 <SelectItem value="Pediatric">
//                                   Pediatric
//                                 </SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="edit-patient-category">
//                               Patient Category
//                             </Label>
//                             <Select
//                               value={editingWard.patient_category}
//                               onValueChange={(v: PatientCategory) =>
//                                 setEditingWard({
//                                   ...editingWard,
//                                   patient_category: v,
//                                 })
//                               }
//                             >
//                               <SelectTrigger>
//                                 <SelectValue />
//                               </SelectTrigger>
//                               <SelectContent>
//                                 <SelectItem value="Male">Male</SelectItem>
//                                 <SelectItem value="Female">Female</SelectItem>
//                                 <SelectItem value="Children">
//                                   Children
//                                 </SelectItem>
//                                 <SelectItem value="Mixed">Mixed</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="edit-ward-desc">Description</Label>
//                             <Input
//                               id="edit-ward-desc"
//                               value={editingWard.description || ""}
//                               onChange={(e) =>
//                                 setEditingWard({
//                                   ...editingWard,
//                                   description: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                         </div>
//                       )}
//                       <DialogFooter>
//                         <Button
//                           variant="outline"
//                           onClick={() => setIsEditWardOpen(false)}
//                         >
//                           Cancel
//                         </Button>
//                         <Button onClick={handleUpdateWard} disabled={isLoading}>
//                           Save Changes
//                         </Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>

//                   {/* Room section */}
//                   {/* Room section */}
// {selectedWard && (
//   <Card>
//     <CardHeader className="pb-3">
//       <CardTitle className="text-sm font-medium flex items-center justify-between">
//         <span className="flex items-center">
//           <DoorOpen className="h-4 w-4 mr-2" />
//           Rooms in {selectedWard.name}
//         </span>
//         <Dialog
//           open={isAddRoomOpen}
//           onOpenChange={setIsAddRoomOpen}
//         >
//           <DialogTrigger asChild>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-7 w-7"
//             >
//               <Plus className="h-4 w-4" />
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Room</DialogTitle>
//             </DialogHeader>
//             <div className="space-y-4 py-4">
//               <div className="space-y-2">
//                 <Label htmlFor="room-number">
//                   Room Number *
//                 </Label>
//                 <Input
//                   id="room-number"
//                   value={newRoom.room_number}
//                   onChange={(e) =>
//                     setNewRoom({
//                       ...newRoom,
//                       room_number: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="room-name">
//                   Room Name (optional)
//                 </Label>
//                 <Input
//                   id="room-name"
//                   value={newRoom.name}
//                   onChange={(e) =>
//                     setNewRoom({
//                       ...newRoom,
//                       name: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="room-desc">
//                   Description (optional)
//                 </Label>
//                 <Input
//                   id="room-desc"
//                   value={newRoom.description}
//                   onChange={(e) =>
//                     setNewRoom({
//                       ...newRoom,
//                       description: e.target.value,
//                     })
//                   }
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               <Button
//                 variant="outline"
//                 onClick={() => setIsAddRoomOpen(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handleAddRoom}
//                 disabled={isLoading}
//               >
//                 Save
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       </CardTitle>
//     </CardHeader>
//     <CardContent>
//       {filteredRooms.length === 0 ? (
//         <p className="text-sm text-muted-foreground py-4 text-center">
//           No rooms. Add one or create beds directly in the
//           ward (open section).
//         </p>
//       ) : (
//         <div className="flex flex-wrap gap-2">
//           <Badge
//             variant={
//               selectedRoom === null ? "default" : "outline"
//             }
//             className="cursor-pointer px-3 py-1"
//             onClick={() => setSelectedRoom(null)}
//           >
//             Open Area
//           </Badge>
//           {filteredRooms.map((room) => (
//             <div
//               key={room.id}
//               className="flex items-center gap-1"
//             >
//               <Badge
//                 variant={
//                   selectedRoom?.id === room.id
//                     ? "default"
//                     : "outline"
//                 }
//                 className="cursor-pointer px-3 py-1"
//                 onClick={() => setSelectedRoom(room)}
//               >
//                 {room.room_number}{" "}
//                 {room.name && `- ${room.name}`}
//               </Badge>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-6 w-6"
//                 onClick={() => {
//                   setEditingRoom(room);
//                   setIsEditRoomOpen(true);
//                 }}
//               >
//                 <Edit className="h-3 w-3" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-6 w-6"
//                 onClick={() => handleDeleteRoom(room.id)}
//               >
//                 <Trash2 className="h-3 w-3" />
//               </Button>
//             </div>
//           ))}
//         </div>
//       )}
//     </CardContent>
//   </Card>
// )}

// {/* Edit Room Dialog */}
// <Dialog open={isEditRoomOpen} onOpenChange={setIsEditRoomOpen}>
//   <DialogContent>
//     <DialogHeader>
//       <DialogTitle>Edit Room</DialogTitle>
//     </DialogHeader>
//     {editingRoom && (
//       <div className="space-y-4 py-4">
//         <div className="space-y-2">
//           <Label htmlFor="edit-room-number">Room Number *</Label>
//           <Input
//             id="edit-room-number"
//             value={editingRoom.room_number}
//             onChange={(e) =>
//               setEditingRoom({
//                 ...editingRoom,
//                 room_number: e.target.value,
//               })
//             }
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="edit-room-name">Room Name (optional)</Label>
//           <Input
//             id="edit-room-name"
//             value={editingRoom.name || ""}
//             onChange={(e) =>
//               setEditingRoom({
//                 ...editingRoom,
//                 name: e.target.value,
//               })
//             }
//           />
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="edit-room-desc">Description (optional)</Label>
//           <Input
//             id="edit-room-desc"
//             value={editingRoom.description || ""}
//             onChange={(e) =>
//               setEditingRoom({
//                 ...editingRoom,
//                 description: e.target.value,
//               })
//             }
//           />
//         </div>
//       </div>
//     )}
//     <DialogFooter>
//       <Button
//         variant="outline"
//         onClick={() => setIsEditRoomOpen(false)}
//       >
//         Cancel
//       </Button>
//       <Button onClick={handleUpdateRoom} disabled={isLoading}>
//         {isLoading ? "Saving..." : "Save Changes"}
//       </Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog>

//                   {/* Beds section */}
//                   {selectedWard && (
//                     <Card>
//   <CardHeader className="pb-3">
//     <CardTitle className="text-sm font-medium flex items-center justify-between">
//       <span className="flex items-center">
//         <BedDouble className="h-4 w-4 mr-2" />
//         Beds{" "}
//         {selectedRoom
//           ? `in ${selectedRoom.room_number}`
//           : "in Open Area"}
//       </span>
//       <Dialog open={isAddBedOpen} onOpenChange={setIsAddBedOpen}>
//         <DialogTrigger asChild>
//           <Button variant="ghost" size="icon" className="h-7 w-7">
//             <Plus className="h-4 w-4" />
//           </Button>
//         </DialogTrigger>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Add Beds</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="bed-count">Number of beds</Label>
//               <Input
//                 id="bed-count"
//                 type="number"
//                 min="1"
//                 value={bulkBedsData.count}
//                 onChange={(e) =>
//                   setBulkBedData({
//                     ...bulkBedData,
//                     count: parseInt(e.target.value) || 1,
//                   })
//                 }
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="bed-prefix">Bed number prefix (optional)</Label>
//               <Input
//                 id="bed-prefix"
//                 value={bulkBedData.prefix}
//                 onChange={(e) => setBulkBedData({ ...bulkBedData, prefix: e.target.value })}
//                 placeholder="e.g., ICU-"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="bed-category">Patient Category (optional)</Label>
//               <Select
//                 value={bulkBedData.patient_category}
//                 onValueChange={(v: PatientCategory) =>
//                   setBulkBedData({ ...bulkBedData, patient_category: v })
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Use ward default" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Male">Male</SelectItem>
//                   <SelectItem value="Female">Female</SelectItem>
//                   <SelectItem value="Children">Children</SelectItem>
//                   <SelectItem value="Mixed">Mixed</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button variant="outline" onClick={() => setIsAddBedOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleAddBeds} disabled={isLoading}>
//               Add {bulkBedData.count} bed(s)
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </CardTitle>
//   </CardHeader>
//   <CardContent>
//     {filteredBeds.length === 0 ? (
//       <p className="text-sm text-muted-foreground py-4 text-center">
//         No beds in this area. Click + to add.
//       </p>
//     ) : (
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//         {filteredBeds.map((bed) => (
//           <div
//             key={bed.id}
//             className={`border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow ${
//               bed.status === 'occupied' 
//                 ? 'border-blue-300 bg-blue-50/50 dark:bg-blue-900/10' 
//                 : bed.status === 'cleaning'
//                 ? 'border-yellow-300 bg-yellow-50/50 dark:bg-yellow-900/10'
//                 : bed.status === 'maintenance'
//                 ? 'border-red-300 bg-red-50/50 dark:bg-red-900/10'
//                 : bed.status === 'reserved'
//                 ? 'border-purple-300 bg-purple-50/50 dark:bg-purple-900/10'
//                 : 'border-green-300 bg-green-50/50 dark:bg-green-900/10'
//             }`}
//           >
//             {/* Bed Header */}
//             <div className="flex justify-between items-start border-b pb-2">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <p className="font-bold text-base">{bed.bed_number}</p>
//                   <Badge 
//                     variant="outline" 
//                     className={`
//                       text-[10px] px-2 py-0.5
//                       ${bed.status === 'occupied' ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}
//                       ${bed.status === 'available' ? 'bg-green-100 text-green-700 border-green-200' : ''}
//                       ${bed.status === 'cleaning' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : ''}
//                       ${bed.status === 'maintenance' ? 'bg-red-100 text-red-700 border-red-200' : ''}
//                       ${bed.status === 'reserved' ? 'bg-purple-100 text-purple-700 border-purple-200' : ''}
//                     `}
//                   >
//                     {bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}
//                   </Badge>
//                 </div>
//                 <p className="text-xs text-muted-foreground mt-1">
//                   Type: {bed.type} | Floor: {bed.floor_number}
//                 </p>
//               </div>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="h-7 w-7"
//                 onClick={() => handleDeleteBed(bed.id)}
//                 disabled={bed.status === 'occupied'}
//                 title={bed.status === 'occupied' ? "Cannot delete occupied bed" : "Delete bed"}
//               >
//                 <Trash2 className={`h-3.5 w-3.5 ${bed.status === 'occupied' ? 'opacity-30' : 'text-red-500'}`} />
//               </Button>
//             </div>

//             {/* Status Dropdown - Only show for non-occupied beds */}
//             {bed.status !== 'occupied' && (
//               <div className="space-y-1">
//                 <Label className="text-xs">Change Status</Label>
//                 <Select
//                   value={bed.status}
//                   onValueChange={(v: BedStatus) => handleUpdateBedStatus(bed.id, v)}
//                 >
//                   <SelectTrigger className="h-8 text-xs">
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="available">Available</SelectItem>
//                     <SelectItem value="occupied">Occupied</SelectItem>
//                     <SelectItem value="cleaning">Cleaning</SelectItem>
//                     <SelectItem value="maintenance">Maintenance</SelectItem>
//                     <SelectItem value="reserved">Reserved</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             )}

//             {/* Patient Information for Occupied Beds */}
//             {bed.status === 'occupied' && bed.attributes?.currentPatient && (
//               <div className="mt-2 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-md space-y-2">
//                 <p className="font-semibold text-sm text-blue-800 dark:text-blue-300">
//                   👤 Patient Information
//                 </p>
//                 <div className="text-xs space-y-1.5">
//                   <div className="flex justify-between">
//                     <span className="font-medium text-blue-700 dark:text-blue-400">Name:</span>
//                     <span className="text-blue-800 dark:text-blue-300 text-right">
//                       {bed.attributes.currentPatient.name || 'N/A'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="font-medium text-blue-700 dark:text-blue-400">MRN:</span>
//                     <span className="text-blue-800 dark:text-blue-300">
//                       {bed.attributes.currentPatient.mrn || 'N/A'}
//                     </span>
//                   </div>
//                   {bed.attributes.currentPatient.diagnosis && (
//                     <div className="flex justify-between">
//                       <span className="font-medium text-blue-700 dark:text-blue-400">Diagnosis:</span>
//                       <span className="text-blue-800 dark:text-blue-300 text-right">
//                         {bed.attributes.currentPatient.diagnosis}
//                       </span>
//                     </div>
//                   )}
//                   {bed.attributes.currentPatient.admissionDate && (
//                     <div className="flex justify-between">
//                       <span className="font-medium text-blue-700 dark:text-blue-400">Admitted:</span>
//                       <span className="text-blue-800 dark:text-blue-300">
//                         {bed.attributes.currentPatient.admissionDate}
//                       </span>
//                     </div>
//                   )}
//                   {bed.attributes.currentPatient.estimatedDischarge && (
//                     <div className="flex justify-between">
//                       <span className="font-medium text-blue-700 dark:text-blue-400">Est. Discharge:</span>
//                       <span className="text-blue-800 dark:text-blue-300">
//                         {bed.attributes.currentPatient.estimatedDischarge}
//                       </span>
//                     </div>
//                   )}
//                   {bed.attributes.currentPatient.gender && (
//                     <div className="flex justify-between">
//                       <span className="font-medium text-blue-700 dark:text-blue-400">Gender:</span>
//                       <span className="text-blue-800 dark:text-blue-300">
//                         {bed.attributes.currentPatient.gender}
//                       </span>
//                     </div>
//                   )}
//                   {bed.attributes.currentPatient.age && (
//                     <div className="flex justify-between">
//                       <span className="font-medium text-blue-700 dark:text-blue-400">Age:</span>
//                       <span className="text-blue-800 dark:text-blue-300">
//                         {bed.attributes.currentPatient.age}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Bed Attributes for Non-Occupied Beds */}
//             {bed.attributes && bed.status !== 'occupied' && Object.keys(bed.attributes).length > 0 && (
//               <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
//                 <p className="text-xs font-semibold mb-1.5">📋 Bed Attributes</p>
//                 <div className="text-xs space-y-1 max-h-24 overflow-y-auto">
//                   {Object.entries(bed.attributes).map(([key, value]) => {
//                     if (value === null || value === undefined || key === 'currentPatient' || key === 'patientHistory') return null;
                    
//                     const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
//                     let displayValue = value;
                    
//                     if (typeof value === 'object') {
//                       displayValue = JSON.stringify(value).substring(0, 20);
//                       if (JSON.stringify(value).length > 20) displayValue += '...';
//                     }
                    
//                     return (
//                       <div key={key} className="flex justify-between text-[11px]">
//                         <span className="font-medium text-gray-600 dark:text-gray-400">{formattedKey}:</span>
//                         <span className="text-gray-800 dark:text-gray-200 ml-2 text-right">{String(displayValue)}</span>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             {/* No Attributes Message */}
//             {(!bed.attributes || Object.keys(bed.attributes).length === 0) && bed.status !== 'occupied' && (
//               <p className="text-xs text-muted-foreground italic text-center mt-2">
//                 No additional attributes
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     )}
//   </CardContent>
// </Card>
//                   )}
//                 </>
//               ) : (
//                 <Card className="p-12 text-center text-muted-foreground">
//                   <Building2 className="h-12 w-12 mx-auto mb-4 opacity-20" />
//                   <p>Select a floor to start configuring wards and beds.</p>
//                 </Card>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import Sidebar from "@/components/admin/Sidebar";

import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Layers,
  DoorOpen,
  BedDouble,
  ChevronRight,
  X,
  Menu,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";

// Import API functions
import {
  getFloors,
  createFloor,
  deleteFloor,
  updateFloor,
  getWards,
  createWard,
  updateWard,
  deleteWard,
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getBeds,
  createBeds,
  patchBed,
  deleteBed,
} from "@/lib/api/bed-config";

// Types
type Floor = {
  id: number;
  floor_number: number;
  name: string | null;
  created_at: string;
  updated_at: string;
};

type WardType =
  | "General"
  | "Semi-Special"
  | "Special"
  | "VIP"
  | "ICU"
  | "Pediatric";
type PatientCategory = "Male" | "Female" | "Children" | "Mixed";
type BedStatus =
  | "available"
  | "occupied"
  | "cleaning"
  | "maintenance"
  | "reserved";

type Ward = {
  id: number;
  floor_id: number;
  name: string;
  type: WardType;
  patient_category: PatientCategory;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

type Room = {
  id: number;
  ward_id: number;
  room_number: string;
  name: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
};

type Bed = {
  id: number;
  ward_id: number;
  room_id: number | null;
  bed_number: string;
  type: WardType;
  floor_number: number;
  status: BedStatus;
  patient_category: PatientCategory;
  attributes: Record<string, any> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// Helper to safely extract data from API responses
const safeExtractData = (response: any) => {
  if (!response?.data) return [];
  if (Array.isArray(response.data)) return response.data;
  if (response.data.data && Array.isArray(response.data.data)) return response.data.data;
  if (response.data.success && Array.isArray(response.data.data)) return response.data.data;
  console.warn('Unexpected API response format:', response.data);
  return [];
};

export default function BedConfigurationPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Data states
  const [floors, setFloors] = useState<Floor[]>([]);
  const [isEditFloorOpen, setIsEditFloorOpen] = useState(false);
  const [editingFloor, setEditingFloor] = useState<Floor | null>(null);
  const [wards, setWards] = useState<Ward[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [beds, setBeds] = useState<Bed[]>([]);

  // Selection states
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Dialog states
  const [isAddFloorOpen, setIsAddFloorOpen] = useState(false);
  const [isAddWardOpen, setIsAddWardOpen] = useState(false);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isEditRoomOpen, setIsEditRoomOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isAddBedOpen, setIsAddBedOpen] = useState(false);
  const [isEditWardOpen, setIsEditWardOpen] = useState(false);
  const [editingWard, setEditingWard] = useState<Ward | null>(null);

  // Form states
  const [newFloor, setNewFloor] = useState({ floor_number: 0, name: "" });
  const [newWard, setNewWard] = useState({
    name: "",
    type: "General" as WardType,
    patient_category: "Mixed" as PatientCategory,
    description: "",
  });
  const [newRoom, setNewRoom] = useState({
    ward_id: 0,
    room_number: "",
    name: "",
    description: "",
  });
  const [bulkBedsData, setBulkBedsData] = useState<{
    ward_id: number;
    room_id?: number;
    count: number;
    prefix: string;
    patient_category?: PatientCategory;
    attributes: Record<string, any>;
  }>({
    ward_id: 0,
    room_id: undefined,
    count: 5,
    prefix: "",
    patient_category: undefined,
    attributes: {},
  });

  // Load initial data
  useEffect(() => {
    loadFloors();
  }, []);

  useEffect(() => {
    if (selectedFloor) {
      loadWards(selectedFloor.id);
    } else {
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedFloor]);

  useEffect(() => {
    if (selectedWard) {
      loadRooms(selectedWard.id);
      loadBeds(selectedWard.id, selectedRoom?.id);
    } else {
      setRooms([]);
      setSelectedRoom(null);
    }
  }, [selectedWard]);

  useEffect(() => {
    if (selectedWard) {
      loadBeds(selectedWard.id, selectedRoom?.id);
    }
  }, [selectedRoom]);

  // API Functions
  const loadFloors = async () => {
    try {
      setIsLoading(true);
      const response = await getFloors();
      console.log('Floors API response:', response);
      const data = safeExtractData(response);
      setFloors(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load floors. Check console.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadWards = async (floorId: number) => {
    try {
      const response = await getWards(floorId);
      console.log(`Wards for floor ${floorId}:`, response);
      const data = safeExtractData(response);
      setWards(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load wards");
    }
  };

  const loadRooms = async (wardId: number) => {
    try {
      const response = await getRooms(wardId);
      console.log(`Rooms for ward ${wardId}:`, response);
      const data = safeExtractData(response);
      setRooms(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load rooms");
    }
  };

  const loadBeds = async (wardId?: number, roomId?: number) => {
    try {
      const params: any = {};
      if (wardId) params.ward_id = wardId;
      if (roomId) params.room_id = roomId;

      const response = await getBeds(params);
      console.log(`Beds for ward ${wardId} room ${roomId}:`, response);
      const data = safeExtractData(response);
      setBeds(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load beds");
    }
  };

  const getResponseData = (response: any) => {
  if (!response) return null;
  // If it's an Axios-like response with a data property
  if (response.data) {
    // If the inner data is a wrapper with its own data, return that
    if (response.data.data) return response.data.data;
    // Otherwise, return the response.data itself
    return response.data;
  }
  // If the response is already the data (unwrapped)
  return response;
};


  // Floor Handlers
const handleAddFloor = async () => {
  if (!newFloor.floor_number) {
    toast.error("Floor number required");
    return;
  }

  try {
    setIsLoading(true);
    const response = await createFloor(newFloor);
    console.log('Create floor response:', response);
    const data = getResponseData(response);
    
    if (data && data.id) {
      setFloors([...floors, data]);
      setIsAddFloorOpen(false);
      setNewFloor({ floor_number: 0, name: "" });
      toast.success("Floor added successfully");
    } else {
      const message = response?.data?.message || "Failed to add floor";
      toast.error(message);
    }
  } catch (error: any) {
    console.error(error);
    toast.error(error.response?.data?.message || "Failed to add floor");
  } finally {
    setIsLoading(false);
  }
};


const handleUpdateFloor = async () => {
  if (!editingFloor) return;

  try {
    setIsLoading(true);
    const response = await updateFloor(editingFloor.id, {
      floor_number: editingFloor.floor_number,
      name: editingFloor.name,
    });
    const data = getResponseData(response);

    if (data && data.id) {
      setFloors(floors.map((f) => (f.id === editingFloor.id ? data : f)));
      setIsEditFloorOpen(false);
      setEditingFloor(null);
      toast.success("Floor updated successfully");
    } else {
      throw new Error(response?.data?.message || "Failed to update floor");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to update floor");
  } finally {
    setIsLoading(false);
  }
};


  const handleDeleteFloor = async (floorId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this floor? This will also delete all wards, rooms, and beds in this floor."
      )
    )
      return;

    try {
      setIsLoading(true);
      await deleteFloor(floorId);
      setFloors(floors.filter((f) => f.id !== floorId));
      if (selectedFloor?.id === floorId) {
        setSelectedFloor(null);
        setSelectedWard(null);
        setSelectedRoom(null);
      }
      toast.success("Floor deleted successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete floor");
    } finally {
      setIsLoading(false);
    }
  };

  // Ward Handlers
const handleAddWard = async () => {
  if (!selectedFloor) {
    toast.error("Select a floor first");
    return;
  }
  if (!newWard.name) {
    toast.error("Ward name required");
    return;
  }

  try {
    setIsLoading(true);
    const response = await createWard({
      floor_id: selectedFloor.id,
      ...newWard,
    });
    const data = getResponseData(response);

    if (data && data.id) {
      setWards([...wards, data]);
      setIsAddWardOpen(false);
      setNewWard({
        name: "",
        type: "General",
        patient_category: "Mixed",
        description: "",
      });
      toast.success("Ward added successfully");
    } else {
      throw new Error(response?.data?.message || "Failed to add ward");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || error.message || "Failed to add ward");
  } finally {
    setIsLoading(false);
  }
};

const handleUpdateWard = async () => {
  if (!editingWard) return;

  try {
    setIsLoading(true);
    const response = await updateWard(editingWard.id, {
      name: editingWard.name,
      type: editingWard.type,
      patient_category: editingWard.patient_category,
      description: editingWard.description,
    });
    const data = getResponseData(response);

    if (data && data.id) {
      setWards(wards.map((w) => (w.id === editingWard.id ? data : w)));
      setIsEditWardOpen(false);
      setEditingWard(null);
      toast.success("Ward updated successfully");
    } else {
      throw new Error(response?.data?.message || "Failed to update ward");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || error.message || "Failed to update ward");
  } finally {
    setIsLoading(false);
  }
};

  const handleDeleteWard = async (wardId: number) => {
    if (!confirm("Are you sure you want to deactivate this ward?")) return;

    try {
      await deleteWard(wardId);
      setWards(
        wards.map((w) => (w.id === wardId ? { ...w, is_active: false } : w))
      );
      if (selectedWard?.id === wardId) setSelectedWard(null);
      toast.success("Ward deactivated");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete ward");
    }
  };

  // Room Handlers
const handleAddRoom = async () => {
  if (!selectedWard) {
    toast.error("Select a ward first");
    return;
  }
  if (!newRoom.room_number) {
    toast.error("Room number required");
    return;
  }

  try {
    setIsLoading(true);
    const response = await createRoom({
      ward_id: selectedWard.id,
      room_number: newRoom.room_number,
      name: newRoom.name || null,
      description: newRoom.description || null,
    });
    const data = getResponseData(response);

    if (data && data.id) {
      setRooms([...rooms, data]);
      setIsAddRoomOpen(false);
      setNewRoom({ ward_id: 0, room_number: "", name: "", description: "" });
      toast.success("Room added successfully");
    } else {
      throw new Error(response?.data?.message || "Failed to add room");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || error.message || "Failed to add room");
  } finally {
    setIsLoading(false);
  }
};

const handleUpdateRoom = async () => {
  if (!editingRoom) return;

  try {
    setIsLoading(true);
    const response = await updateRoom(editingRoom.id, {
      room_number: editingRoom.room_number,
      name: editingRoom.name,
      description: editingRoom.description,
    });
    const data = getResponseData(response);

    if (data && data.id) {
      setRooms(rooms.map((r) => (r.id === editingRoom.id ? data : r)));
      setIsEditRoomOpen(false);
      setEditingRoom(null);
      toast.success("Room updated successfully");
    } else {
      throw new Error(response?.data?.message || "Failed to update room");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || error.message || "Failed to update room");
  } finally {
    setIsLoading(false);
  }
};

  const handleDeleteRoom = async (roomId: number) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    try {
      const response = await deleteRoom(roomId);
      if (response.data?.success === false) {
        toast.error(response.data.message || "Failed to delete room");
        return;
      }
      setRooms(rooms.filter((r) => r.id !== roomId));
      if (selectedRoom?.id === roomId) setSelectedRoom(null);
      toast.success("Room deleted");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete room");
    }
  };

  // Bed Handlers
const handleAddBeds = async () => {
  if (!selectedWard) {
    toast.error("Select a ward first");
    return;
  }

  try {
    setIsLoading(true);
    const response = await createBeds({
      ward_id: selectedWard.id,
      room_id: selectedRoom?.id,
      count: bulkBedsData.count,
      prefix: bulkBedsData.prefix || undefined,
      patient_category: bulkBedsData.patient_category,
      attributes: bulkBedsData.attributes,
    });
    const data = getResponseData(response); // data should be an array of beds

    // Reload beds to get the updated list
    await loadBeds(selectedWard.id, selectedRoom?.id);

    setIsAddBedOpen(false);
    setBulkBedsData({
      ward_id: 0,
      room_id: undefined,
      count: 5,
      prefix: "",
      patient_category: undefined,
      attributes: {},
    });

    const addedCount = Array.isArray(data) ? data.length : 0;
    toast.success(`${addedCount} beds added successfully`);
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to add beds");
  } finally {
    setIsLoading(false);
  }
};

const handleUpdateBedStatus = async (bedId: number, status: BedStatus) => {
  const bed = beds.find((b) => b.id === bedId);

  if (bed?.status === "occupied") {
    toast.error("Cannot change status of an occupied bed");
    return;
  }

  try {
    const response = await patchBed(bedId, { status });
    const data = getResponseData(response);

    if (data && data.id) {
      setBeds(beds.map((b) => (b.id === bedId ? data : b)));
      toast.success(`Bed status updated to ${status}`);
    } else {
      toast.error(response?.data?.message || "Failed to update bed");
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to update bed");
  }
};

 const handleDeleteBed = async (bedId: number) => {
  if (!confirm("Are you sure you want to delete this bed?")) return;

  try {
    await deleteBed(bedId);
    setBeds(beds.filter((b) => b.id !== bedId));
    toast.success("Bed deleted");
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to delete bed");
  }
};

  // Filtered data
  const filteredWards = wards.filter(
    (w) => w.floor_id === selectedFloor?.id && w.is_active
  );
  const filteredRooms = rooms.filter((r) => r.ward_id === selectedWard?.id);
  const filteredBeds = beds.filter(
    (b) =>
      b.ward_id === selectedWard?.id &&
      (selectedRoom ? b.room_id === selectedRoom.id : true) &&
      b.is_active
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed bottom-20 right-6 z-50 p-3 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <main className="flex-1 flex flex-col overflow-y-auto">
        <div className="p-5 lg:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Bed Configuration
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Define floors, wards, rooms, and beds
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadFloors}>
                <RefreshCw className="h-4 w-4 mr-1" /> Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" /> Export
              </Button>
            </div>
          </div>

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Main configuration area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left panel: Floors list */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <span className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2" />
                    Floors
                  </span>
                  <Dialog open={isAddFloorOpen} onOpenChange={setIsAddFloorOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Floor</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="floor-number">Floor Number *</Label>
                          <Input
                            id="floor-number"
                            type="number"
                            min="1"
                            value={newFloor.floor_number || ""}
                            onChange={(e) =>
                              setNewFloor({
                                ...newFloor,
                                floor_number: parseInt(e.target.value) || 0,
                              })
                            }
                            placeholder="Enter floor number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="floor-name">
                            Floor Name (optional)
                          </Label>
                          <Input
                            id="floor-name"
                            value={newFloor.name}
                            onChange={(e) =>
                              setNewFloor({ ...newFloor, name: e.target.value })
                            }
                            placeholder="e.g., Ground Floor"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsAddFloorOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleAddFloor} disabled={isLoading}>
                          {isLoading ? "Adding..." : "Add Floor"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              {/* Edit Floor Dialog */}
              <Dialog open={isEditFloorOpen} onOpenChange={setIsEditFloorOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Floor </DialogTitle>
                  </DialogHeader>
                  {editingFloor && (
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-floor-number">Floor Number *</Label>
                        <Input
                          id="edit-floor-number"
                          type="number"
                          min="1"
                          value={editingFloor.floor_number}
                          onChange={(e) =>
                            setEditingFloor({
                              ...editingFloor,
                              floor_number: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-floor-name">
                          Floor Name (optional)
                        </Label>
                        <Input
                          id="edit-floor-name"
                          value={editingFloor.name || ""}
                          onChange={(e) =>
                            setEditingFloor({
                              ...editingFloor,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditFloorOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateFloor} disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  {floors.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      No floors. Click + to add one.
                    </div>
                  ) : (
                    floors.map((floor) => (
                      <div
                        key={floor.id}
                        className={`flex items-center justify-between p-3 border-b hover:bg-muted/50 transition-colors ${
                          selectedFloor?.id === floor.id ? "bg-muted" : ""
                        }`}
                      >
                        <div
                          className="flex-1 cursor-pointer"
                          onClick={() => setSelectedFloor(floor)}
                        >
                          <p className="font-medium">Floor {floor.floor_number}</p>
                          {floor.name && (
                            <p className="text-xs text-muted-foreground">
                              {floor.name}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => {
                              setEditingFloor(floor);
                              setIsEditFloorOpen(true);
                            }}
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => handleDeleteFloor(floor.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
                          </Button>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    ))
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Right panel: Ward, Room, Bed configuration */}
            <div className="lg:col-span-3 space-y-6">
              {selectedFloor ? (
                <>
                  {/* Ward section */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center justify-between">
                        <span className="flex items-center">
                          <Layers className="h-4 w-4 mr-2" />
                          Wards on Floor {selectedFloor.floor_number}
                        </span>
                        <Dialog open={isAddWardOpen} onOpenChange={setIsAddWardOpen}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Ward</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="ward-name">Ward Name *</Label>
                                <Input
                                  id="ward-name"
                                  value={newWard.name}
                                  onChange={(e) =>
                                    setNewWard({
                                      ...newWard,
                                      name: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="ward-type">Ward Type</Label>
                                <Select
                                  value={newWard.type}
                                  onValueChange={(v: WardType) =>
                                    setNewWard({ ...newWard, type: v })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="General">General</SelectItem>
                                    <SelectItem value="Semi-Special">
                                      Semi-Special
                                    </SelectItem>
                                    <SelectItem value="Special">Special</SelectItem>
                                    <SelectItem value="VIP">VIP</SelectItem>
                                    <SelectItem value="ICU">ICU</SelectItem>
                                    <SelectItem value="Pediatric">
                                      Pediatric
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="patient-category">
                                  Patient Category
                                </Label>
                                <Select
                                  value={newWard.patient_category}
                                  onValueChange={(v: PatientCategory) =>
                                    setNewWard({
                                      ...newWard,
                                      patient_category: v,
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Male">Male</SelectItem>
                                    <SelectItem value="Female">Female</SelectItem>
                                    <SelectItem value="Children">Children</SelectItem>
                                    <SelectItem value="Mixed">Mixed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="ward-desc">
                                  Description (optional)
                                </Label>
                                <Input
                                  id="ward-desc"
                                  value={newWard.description}
                                  onChange={(e) =>
                                    setNewWard({
                                      ...newWard,
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setIsAddWardOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleAddWard} disabled={isLoading}>
                                Save
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {filteredWards.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">
                          No wards. Click + to add one.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {filteredWards.map((ward) => (
                            <div key={ward.id} className="flex items-center gap-1">
                              <Badge
                                variant={
                                  selectedWard?.id === ward.id
                                    ? "default"
                                    : "outline"
                                }
                                className="cursor-pointer px-3 py-1"
                                onClick={() => setSelectedWard(ward)}
                              >
                                {ward.name} ({ward.type})
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => {
                                  setEditingWard(ward);
                                  setIsEditWardOpen(true);
                                }}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleDeleteWard(ward.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Edit Ward Dialog */}
                  <Dialog open={isEditWardOpen} onOpenChange={setIsEditWardOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Ward</DialogTitle>
                      </DialogHeader>
                      {editingWard && (
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-ward-name">Ward Name</Label>
                            <Input
                              id="edit-ward-name"
                              value={editingWard.name}
                              onChange={(e) =>
                                setEditingWard({
                                  ...editingWard,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-ward-type">Ward Type</Label>
                            <Select
                              value={editingWard.type}
                              onValueChange={(v: WardType) =>
                                setEditingWard({ ...editingWard, type: v })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="General">General</SelectItem>
                                <SelectItem value="Semi-Special">
                                  Semi-Special
                                </SelectItem>
                                <SelectItem value="Special">Special</SelectItem>
                                <SelectItem value="VIP">VIP</SelectItem>
                                <SelectItem value="ICU">ICU</SelectItem>
                                <SelectItem value="Pediatric">
                                  Pediatric
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-patient-category">
                              Patient Category
                            </Label>
                            <Select
                              value={editingWard.patient_category}
                              onValueChange={(v: PatientCategory) =>
                                setEditingWard({
                                  ...editingWard,
                                  patient_category: v,
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Children">Children</SelectItem>
                                <SelectItem value="Mixed">Mixed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-ward-desc">Description</Label>
                            <Input
                              id="edit-ward-desc"
                              value={editingWard.description || ""}
                              onChange={(e) =>
                                setEditingWard({
                                  ...editingWard,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditWardOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateWard} disabled={isLoading}>
                          Save Changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Room section */}
                  {selectedWard && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center justify-between">
                          <span className="flex items-center">
                            <DoorOpen className="h-4 w-4 mr-2" />
                            Rooms in {selectedWard.name}
                          </span>
                          <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add New Room</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="room-number">Room Number *</Label>
                                  <Input
                                    id="room-number"
                                    value={newRoom.room_number}
                                    onChange={(e) =>
                                      setNewRoom({
                                        ...newRoom,
                                        room_number: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="room-name">
                                    Room Name (optional)
                                  </Label>
                                  <Input
                                    id="room-name"
                                    value={newRoom.name}
                                    onChange={(e) =>
                                      setNewRoom({
                                        ...newRoom,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="room-desc">
                                    Description (optional)
                                  </Label>
                                  <Input
                                    id="room-desc"
                                    value={newRoom.description}
                                    onChange={(e) =>
                                      setNewRoom({
                                        ...newRoom,
                                        description: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setIsAddRoomOpen(false)}
                                >
                                  Cancel
                                </Button>
                                <Button onClick={handleAddRoom} disabled={isLoading}>
                                  Save
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {filteredRooms.length === 0 ? (
                          <p className="text-sm text-muted-foreground py-4 text-center">
                            No rooms. Add one or create beds directly in the
                            ward (open section).
                          </p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant={selectedRoom === null ? "default" : "outline"}
                              className="cursor-pointer px-3 py-1"
                              onClick={() => setSelectedRoom(null)}
                            >
                              Open Area
                            </Badge>
                            {filteredRooms.map((room) => (
                              <div key={room.id} className="flex items-center gap-1">
                                <Badge
                                  variant={
                                    selectedRoom?.id === room.id
                                      ? "default"
                                      : "outline"
                                  }
                                  className="cursor-pointer px-3 py-1"
                                  onClick={() => setSelectedRoom(room)}
                                >
                                  {room.room_number}{" "}
                                  {room.name && `- ${room.name}`}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => {
                                    setEditingRoom(room);
                                    setIsEditRoomOpen(true);
                                  }}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => handleDeleteRoom(room.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}

                  {/* Edit Room Dialog */}
                  <Dialog open={isEditRoomOpen} onOpenChange={setIsEditRoomOpen}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Room</DialogTitle>
                      </DialogHeader>
                      {editingRoom && (
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-room-number">Room Number *</Label>
                            <Input
                              id="edit-room-number"
                              value={editingRoom.room_number}
                              onChange={(e) =>
                                setEditingRoom({
                                  ...editingRoom,
                                  room_number: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-room-name">
                              Room Name (optional)
                            </Label>
                            <Input
                              id="edit-room-name"
                              value={editingRoom.name || ""}
                              onChange={(e) =>
                                setEditingRoom({
                                  ...editingRoom,
                                  name: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-room-desc">
                              Description (optional)
                            </Label>
                            <Input
                              id="edit-room-desc"
                              value={editingRoom.description || ""}
                              onChange={(e) =>
                                setEditingRoom({
                                  ...editingRoom,
                                  description: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsEditRoomOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateRoom} disabled={isLoading}>
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Beds section */}
                  {selectedWard && (
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center justify-between">
                          <span className="flex items-center">
                            <BedDouble className="h-4 w-4 mr-2" />
                            Beds{" "}
                            {selectedRoom
                              ? `in ${selectedRoom.room_number}`
                              : "in Open Area"}
                          </span>
                          <Dialog open={isAddBedOpen} onOpenChange={setIsAddBedOpen}>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-7 w-7">
                                <Plus className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                              <DialogHeader>
                                <DialogTitle>Add Beds</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="bed-count">Number of beds</Label>
                                  <Input
                                    id="bed-count"
                                    type="number"
                                    min="1"
                                    value={bulkBedsData.count}
                                    onChange={(e) =>
                                      setBulkBedsData({
                                        ...bulkBedsData,
                                        count: parseInt(e.target.value) || 1,
                                      })
                                    }
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="bed-prefix">
                                    Bed number prefix (optional)
                                  </Label>
                                  <Input
                                    id="bed-prefix"
                                    value={bulkBedsData.prefix}
                                    onChange={(e) =>
                                      setBulkBedsData({
                                        ...bulkBedsData,
                                        prefix: e.target.value,
                                      })
                                    }
                                    placeholder="e.g., ICU-"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="bed-category">
                                    Patient Category (optional)
                                  </Label>
                                  <Select
                                    value={bulkBedsData.patient_category}
                                    onValueChange={(v: PatientCategory) =>
                                      setBulkBedsData({
                                        ...bulkBedsData,
                                        patient_category: v,
                                      })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Use ward default" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Male">Male</SelectItem>
                                      <SelectItem value="Female">Female</SelectItem>
                                      <SelectItem value="Children">
                                        Children
                                      </SelectItem>
                                      <SelectItem value="Mixed">Mixed</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  variant="outline"
                                  onClick={() => setIsAddBedOpen(false)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleAddBeds}
                                  disabled={isLoading}
                                >
                                  Add {bulkBedsData.count} bed(s)
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {filteredBeds.length === 0 ? (
                          <p className="text-sm text-muted-foreground py-4 text-center">
                            No beds in this area. Click + to add.
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {filteredBeds.map((bed) => (
                              <div
                                key={bed.id}
                                className={`border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow ${
                                  bed.status === "occupied"
                                    ? "border-blue-300 bg-blue-50/50 dark:bg-blue-900/10"
                                    : bed.status === "cleaning"
                                    ? "border-yellow-300 bg-yellow-50/50 dark:bg-yellow-900/10"
                                    : bed.status === "maintenance"
                                    ? "border-red-300 bg-red-50/50 dark:bg-red-900/10"
                                    : bed.status === "reserved"
                                    ? "border-purple-300 bg-purple-50/50 dark:bg-purple-900/10"
                                    : "border-green-300 bg-green-50/50 dark:bg-green-900/10"
                                }`}
                              >
                                {/* Bed Header */}
                                <div className="flex justify-between items-start border-b pb-2">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-bold text-base">
                                        {bed.bed_number}
                                      </p>
                                      <Badge
                                        variant="outline"
                                        className={`
                                          text-[10px] px-2 py-0.5
                                          ${
                                            bed.status === "occupied"
                                              ? "bg-blue-100 text-blue-700 border-blue-200"
                                              : ""
                                          }
                                          ${
                                            bed.status === "available"
                                              ? "bg-green-100 text-green-700 border-green-200"
                                              : ""
                                          }
                                          ${
                                            bed.status === "cleaning"
                                              ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                              : ""
                                          }
                                          ${
                                            bed.status === "maintenance"
                                              ? "bg-red-100 text-red-700 border-red-200"
                                              : ""
                                          }
                                          ${
                                            bed.status === "reserved"
                                              ? "bg-purple-100 text-purple-700 border-purple-200"
                                              : ""
                                          }
                                        `}
                                      >
                                        {bed.status.charAt(0).toUpperCase() +
                                          bed.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      Type: {bed.type} | Floor: {bed.floor_number}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => handleDeleteBed(bed.id)}
                                    disabled={bed.status === "occupied"}
                                    title={
                                      bed.status === "occupied"
                                        ? "Cannot delete occupied bed"
                                        : "Delete bed"
                                    }
                                  >
                                    <Trash2
                                      className={`h-3.5 w-3.5 ${
                                        bed.status === "occupied"
                                          ? "opacity-30"
                                          : "text-red-500"
                                      }`}
                                    />
                                  </Button>
                                </div>

                                {/* Status Dropdown - Only show for non-occupied beds */}
                                {bed.status !== "occupied" && (
                                  <div className="space-y-1">
                                    <Label className="text-xs">Change Status</Label>
                                    <Select
                                      value={bed.status}
                                      onValueChange={(v: BedStatus) =>
                                        handleUpdateBedStatus(bed.id, v)
                                      }
                                    >
                                      <SelectTrigger className="h-8 text-xs">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="available">
                                          Available
                                        </SelectItem>
                                        <SelectItem value="occupied">
                                          Occupied
                                        </SelectItem>
                                        <SelectItem value="cleaning">
                                          Cleaning
                                        </SelectItem>
                                        <SelectItem value="maintenance">
                                          Maintenance
                                        </SelectItem>
                                        <SelectItem value="reserved">
                                          Reserved
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                )}

                                {/* Patient Information for Occupied Beds */}
                                {bed.status === "occupied" &&
                                  bed.attributes?.currentPatient && (
                                    <div className="mt-2 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-md space-y-2">
                                      <p className="font-semibold text-sm text-blue-800 dark:text-blue-300">
                                        👤 Patient Information
                                      </p>
                                      <div className="text-xs space-y-1.5">
                                        <div className="flex justify-between">
                                          <span className="font-medium text-blue-700 dark:text-blue-400">
                                            Name:
                                          </span>
                                          <span className="text-blue-800 dark:text-blue-300 text-right">
                                            {bed.attributes.currentPatient.name ||
                                              "N/A"}
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="font-medium text-blue-700 dark:text-blue-400">
                                            MRN:
                                          </span>
                                          <span className="text-blue-800 dark:text-blue-300">
                                            {bed.attributes.currentPatient.mrn ||
                                              "N/A"}
                                          </span>
                                        </div>
                                        {bed.attributes.currentPatient.diagnosis && (
                                          <div className="flex justify-between">
                                            <span className="font-medium text-blue-700 dark:text-blue-400">
                                              Diagnosis:
                                            </span>
                                            <span className="text-blue-800 dark:text-blue-300 text-right">
                                              {
                                                bed.attributes.currentPatient
                                                  .diagnosis
                                              }
                                            </span>
                                          </div>
                                        )}
                                        {bed.attributes.currentPatient
                                          .admissionDate && (
                                          <div className="flex justify-between">
                                            <span className="font-medium text-blue-700 dark:text-blue-400">
                                              Admitted:
                                            </span>
                                            <span className="text-blue-800 dark:text-blue-300">
                                              {
                                                bed.attributes.currentPatient
                                                  .admissionDate
                                              }
                                            </span>
                                          </div>
                                        )}
                                        {bed.attributes.currentPatient
                                          .estimatedDischarge && (
                                          <div className="flex justify-between">
                                            <span className="font-medium text-blue-700 dark:text-blue-400">
                                              Est. Discharge:
                                            </span>
                                            <span className="text-blue-800 dark:text-blue-300">
                                              {
                                                bed.attributes.currentPatient
                                                  .estimatedDischarge
                                              }
                                            </span>
                                          </div>
                                        )}
                                        {bed.attributes.currentPatient.gender && (
                                          <div className="flex justify-between">
                                            <span className="font-medium text-blue-700 dark:text-blue-400">
                                              Gender:
                                            </span>
                                            <span className="text-blue-800 dark:text-blue-300">
                                              {
                                                bed.attributes.currentPatient
                                                  .gender
                                              }
                                            </span>
                                          </div>
                                        )}
                                        {bed.attributes.currentPatient.age && (
                                          <div className="flex justify-between">
                                            <span className="font-medium text-blue-700 dark:text-blue-400">
                                              Age:
                                            </span>
                                            <span className="text-blue-800 dark:text-blue-300">
                                              {
                                                bed.attributes.currentPatient
                                                  .age
                                              }
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}

                                {/* Bed Attributes for Non-Occupied Beds */}
                                {bed.attributes &&
                                  bed.status !== "occupied" &&
                                  Object.keys(bed.attributes).length > 0 && (
                                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                                      <p className="text-xs font-semibold mb-1.5">
                                        📋 Bed Attributes
                                      </p>
                                      <div className="text-xs space-y-1 max-h-24 overflow-y-auto">
                                        {Object.entries(bed.attributes).map(
                                          ([key, value]) => {
                                            if (
                                              value === null ||
                                              value === undefined ||
                                              key === "currentPatient" ||
                                              key === "patientHistory"
                                            )
                                              return null;

                                            const formattedKey = key
                                              .replace(/([A-Z])/g, " $1")
                                              .replace(/^./, (str) =>
                                                str.toUpperCase()
                                              );
                                            let displayValue = value;

                                            if (typeof value === "object") {
                                              displayValue = JSON.stringify(
                                                value
                                              ).substring(0, 20);
                                              if (
                                                JSON.stringify(value).length > 20
                                              )
                                                displayValue += "...";
                                            }

                                            return (
                                              <div
                                                key={key}
                                                className="flex justify-between text-[11px]"
                                              >
                                                <span className="font-medium text-gray-600 dark:text-gray-400">
                                                  {formattedKey}:
                                                </span>
                                                <span className="text-gray-800 dark:text-gray-200 ml-2 text-right">
                                                  {String(displayValue)}
                                                </span>
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  )}

                                {/* No Attributes Message */}
                                {(!bed.attributes ||
                                  Object.keys(bed.attributes).length === 0) &&
                                  bed.status !== "occupied" && (
                                    <p className="text-xs text-muted-foreground italic text-center mt-2">
                                      No additional attributes
                                    </p>
                                  )}
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <Card className="p-12 text-center text-muted-foreground">
                  <Building2 className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Select a floor to start configuring wards and beds.</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}