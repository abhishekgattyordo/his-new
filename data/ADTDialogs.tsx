

// import { useState } from "react";
// import { Bed } from "@/data/wardData";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
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
// import { toast } from "sonner";
// import { 
//   admitPatient, 
//   dischargePatient, 
//   transferPatient 
// } from "@/lib/api/bed-config";

// // ==================== Admission Dialog ====================
// interface AdmissionDialogProps {
//   bed: Bed | null;
//   open: boolean;
//   onClose: () => void;
//   onSuccess?: () => void;
// }

// export function AdmissionDialog({
//   bed,
//   open,
//   onClose,
//   onSuccess,
// }: AdmissionDialogProps) {
//   const [name, setName] = useState("");
//   const [mrn, setMrn] = useState("");
//   const [diagnosis, setDiagnosis] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   if (!bed) return null;

//   const handleSubmit = async () => {
//     if (!name || !mrn) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const bedId = parseInt(bed.id);
      
//       const response = await admitPatient(bedId, {
//         patientName: name,
//         mrn: mrn,
//         diagnosis: diagnosis || undefined,
//         estimatedDischarge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//           .toISOString()
//           .split('T')[0],
//       });

//       console.log("Admission response:", response);

//       // ✅ Handle both Axios response (response.data.success) and unwrapped data (response.success)
//       const isSuccess = response?.data?.success ?? (response as any)?.success ?? false;
      
//       if (isSuccess) {
//         toast.success("Patient admitted successfully", {
//           description: `${name} assigned to Bed ${bed.number}`
//         });
        
//         setName("");
//         setMrn("");
//         setDiagnosis("");
        
//         if (onSuccess) {
//           console.log("Calling onSuccess (refresh)");
//           try {
//             await onSuccess();
//           } catch (err) {
//             console.error("onSuccess error:", err);
//           }
//         }
        
//         onClose();
//       } else {
//         // Extract error message from either structure
//         const errorMsg = response?.data?.message || (response as any)?.message || "Failed to admit patient";
//         toast.error(errorMsg);
//       }
//     } catch (error: any) {
//       console.error("Admission error:", error);
//       toast.error(error.response?.data?.message || "Failed to admit patient");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Assign Bed {bed.number}</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4 py-2">
//           <div>
//             <Label className="mb-2 block">Patient Name *</Label>
//             <Input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Full name"
//               disabled={isLoading}
//             />
//           </div>
//           <div>
//             <Label>MRN *</Label>
//             <Input
//               value={mrn}
//               onChange={(e) => setMrn(e.target.value)}
//               placeholder="Medical record number"
//               disabled={isLoading}
//             />
//           </div>
//           <div>
//             <Label>Diagnosis (Optional)</Label>
//             <Input
//               value={diagnosis}
//               onChange={(e) => setDiagnosis(e.target.value)}
//               placeholder="e.g., Pneumonia"
//               disabled={isLoading}
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose} disabled={isLoading}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={!name || !mrn || isLoading}>
//             {isLoading ? "Admitting..." : "Assign"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// // ==================== Discharge Dialog ====================
// interface DischargeDialogProps {
//   bed: Bed | null;
//   open: boolean;
//   onClose: () => void;
//   onSuccess?: () => void;
// }

// export function DischargeDialog({
//   bed,
//   open,
//   onClose,
//   onSuccess,
// }: DischargeDialogProps) {
//   const [dischargeNotes, setDischargeNotes] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   if (!bed || !bed.patient) return null;

//   const handleSubmit = async () => {
//     setIsLoading(true);
//     try {
//       const bedId = parseInt(bed.id);
      
//       const response = await dischargePatient(bedId, {
//         dischargeNotes: dischargeNotes || undefined
//       });

//       console.log("Discharge response:", response);

//       const isSuccess = response?.data?.success ?? (response as any)?.success ?? false;

//       if (isSuccess) {
//         toast.success("Patient discharged successfully", {
//           description: `Bed ${bed.number} moved to cleaning`
//         });
//         setDischargeNotes("");
//         onClose();
//         if (onSuccess) onSuccess();
//       } else {
//         const errorMsg = response?.data?.message || (response as any)?.message || "Failed to discharge patient";
//         toast.error(errorMsg);
//       }
//     } catch (error: any) {
//       console.error("Discharge error:", error);
//       toast.error(error.response?.data?.message || "Failed to discharge patient");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Discharge Patient from Bed {bed.number}</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4 py-2">
//           <p className="text-sm">
//             Are you sure you want to discharge <span className="font-semibold">{bed.patient?.name}</span>? 
//             The bed will be marked for cleaning.
//           </p>
//           <div>
//             <Label>Discharge Notes (Optional)</Label>
//             <Input
//               value={dischargeNotes}
//               onChange={(e) => setDischargeNotes(e.target.value)}
//               placeholder="e.g., Patient recovered fully"
//               disabled={isLoading}
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose} disabled={isLoading}>
//             Cancel
//           </Button>
//           <Button
//             variant="destructive"
//             onClick={handleSubmit}
//             disabled={isLoading}
//           >
//             {isLoading ? "Processing..." : "Discharge"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// // ==================== Transfer Dialog ====================
// interface TransferDialogProps {
//   bed: Bed | null;
//   open: boolean;
//   onClose: () => void;
//   onSuccess?: () => void;
//   availableBeds: Bed[];
// }

// export function TransferDialog({
//   bed,
//   open,
//   onClose,
//   onSuccess,
//   availableBeds,
// }: TransferDialogProps) {
//   const [destId, setDestId] = useState<string>("");
//   const [transferReason, setTransferReason] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   if (!bed || !bed.patient) return null;

//   const handleSubmit = async () => {
//     if (!destId) {
//       toast.error("Please select a destination bed");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const bedId = parseInt(bed.id);
//       const destinationBedId = parseInt(destId);
      
//       const response = await transferPatient(bedId, {
//         destinationBedId,
//         reason: transferReason || undefined
//       });

//       console.log("Transfer response:", response);

//       const isSuccess = response?.data?.success ?? (response as any)?.success ?? false;

//       if (isSuccess) {
//         toast.success("Patient transferred successfully", {
//           description: `Patient moved from Bed ${bed.number} to Bed ${destId}`
//         });
//         setDestId("");
//         setTransferReason("");
//         onClose();
//         if (onSuccess) onSuccess();
//       } else {
//         const errorMsg = response?.data?.message || (response as any)?.message || "Failed to transfer patient";
//         toast.error(errorMsg);
//       }
//     } catch (error: any) {
//       console.error("Transfer error:", error);
//       toast.error(error.response?.data?.message || "Failed to transfer patient");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Transfer Patient from Bed {bed.number}</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4 py-2">
//           <p className="text-sm">
//             Transferring <span className="font-semibold">{bed.patient?.name}</span> from Bed {bed.number}
//           </p>
          
//           <div>
//             <Label>Destination Bed *</Label>
//             <Select value={destId} onValueChange={setDestId} disabled={isLoading}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select available bed" />
//               </SelectTrigger>
//               <SelectContent>
//                 {availableBeds
//                   .filter((b) => b.id !== bed.id && b.status === 'available')
//                   .map((b) => (
//                     <SelectItem key={b.id} value={b.id}>
//                       Bed {b.number} ({b.type}) - Floor {b.floor}
//                     </SelectItem>
//                   ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div>
//             <Label>Transfer Reason (Optional)</Label>
//             <Input
//               value={transferReason}
//               onChange={(e) => setTransferReason(e.target.value)}
//               placeholder="e.g., Need ICU care"
//               disabled={isLoading}
//             />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose} disabled={isLoading}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={!destId || isLoading}>
//             {isLoading ? "Transferring..." : "Transfer"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }


import { useState } from "react";
import { Bed } from "@/data/wardData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { 
  admitPatient, 
  dischargePatient, 
  transferPatient 
} from "@/lib/api/bed-config";
import { patientsApi } from "@/lib/api/registration";

// ==================== Admission Dialog ====================
interface AdmissionDialogProps {
  bed: Bed | null;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AdmissionDialog({
  bed,
  open,
  onClose,
  onSuccess,
}: AdmissionDialogProps) {
  const [name, setName] = useState("");
  const [mrn, setMrn] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Phone search states
  const [phoneSearch, setPhoneSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  if (!bed) return null;

  const handleSearch = async () => {
    const trimmedPhone = phoneSearch.trim();
    if (!trimmedPhone || trimmedPhone.length < 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    setIsSearching(true);
    try {
      const response = await patientsApi.getPatientsByPhone(trimmedPhone);
      // Extract patient list from response (handle both wrapped and direct arrays)
      let patients = response?.data?.data || response?.data || response;
      if (!Array.isArray(patients)) patients = [];
      setSearchResults(patients);
      if (patients.length === 0) {
        toast.error("No patient found with this phone number");
      } else if (patients.length === 1) {
        // Auto‑fill the first patient's details
        const patient = patients[0];
        setName(patient.full_name_en || "");
        setMrn(patient.mrn || "");
        setSearchResults([]);
        setShowDropdown(false);
        toast.success("Patient found");
      } else {
        // Show dropdown to select
        setShowDropdown(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Error searching for patient");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectPatient = (patient: any) => {
    setName(patient.full_name_en || "");
    setMrn(patient.mrn || "");
    setSearchResults([]);
    setShowDropdown(false);
    toast.success(`Selected ${patient.full_name_en}`);
  };

  const handleSubmit = async () => {
    if (!name || !mrn) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const bedId = parseInt(bed.id);
      
      const response = await admitPatient(bedId, {
        patientName: name,
        mrn: mrn,
        diagnosis: diagnosis || undefined,
        estimatedDischarge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0],
      });

      console.log("Admission response:", response);

      const isSuccess = response?.data?.success ?? (response as any)?.success ?? false;
      
      if (isSuccess) {
        toast.success("Patient admitted successfully", {
          description: `${name} assigned to Bed ${bed.number}`
        });
        
        // Reset form
        setName("");
        setMrn("");
        setDiagnosis("");
        setPhoneSearch("");
        setSearchResults([]);
        
        if (onSuccess) {
          console.log("Calling onSuccess (refresh)");
          try {
            await onSuccess();
          } catch (err) {
            console.error("onSuccess error:", err);
          }
        }
        
        onClose();
      } else {
        const errorMsg = response?.data?.message || (response as any)?.message || "Failed to admit patient";
        toast.error(errorMsg);
      }
    } catch (error: any) {
      console.error("Admission error:", error);
      toast.error(error.response?.data?.message || "Failed to admit patient");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Bed {bed.number}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          {/* Phone search */}
          <div>
            <Label className="mb-2 block">Search by Phone (optional)</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={phoneSearch}
                onChange={(e) => {
                  setPhoneSearch(e.target.value);
                  setSearchResults([]);
                  setShowDropdown(false);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter 10-digit phone number"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleSearch}
                disabled={isSearching || isLoading}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
            {showDropdown && searchResults.length > 0 && (
              <div className="mt-2 border rounded-md overflow-hidden">
                {searchResults.map((patient) => (
                  <div
                    key={patient.patient_id}
                    onClick={() => handleSelectPatient(patient)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {patient.full_name_en} {patient.mrn ? `(MRN: ${patient.mrn})` : ""}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Patient Name */}
          <div>
            <Label className="mb-2 block">Patient Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              disabled={isLoading}
            />
          </div>

          {/* MRN */}
          <div>
            <Label>MRN *</Label>
            <Input
              value={mrn}
              onChange={(e) => setMrn(e.target.value)}
              placeholder="Medical record number"
              disabled={isLoading}
            />
          </div>

          {/* Diagnosis */}
          <div>
            <Label>Diagnosis (Optional)</Label>
            <Input
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g., Pneumonia"
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name || !mrn || isLoading}>
            {isLoading ? "Admitting..." : "Assign"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ==================== Discharge Dialog ====================
interface DischargeDialogProps {
  bed: Bed | null;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function DischargeDialog({
  bed,
  open,
  onClose,
  onSuccess,
}: DischargeDialogProps) {
  const [dischargeNotes, setDischargeNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!bed || !bed.patient) return null;

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const bedId = parseInt(bed.id);
      
      const response = await dischargePatient(bedId, {
        dischargeNotes: dischargeNotes || undefined
      });

      console.log("Discharge response:", response);

      const isSuccess = response?.data?.success ?? (response as any)?.success ?? false;

      if (isSuccess) {
        toast.success("Patient discharged successfully", {
          description: `Bed ${bed.number} moved to cleaning`
        });
        setDischargeNotes("");
        onClose();
        if (onSuccess) onSuccess();
      } else {
        const errorMsg = response?.data?.message || (response as any)?.message || "Failed to discharge patient";
        toast.error(errorMsg);
      }
    } catch (error: any) {
      console.error("Discharge error:", error);
      toast.error(error.response?.data?.message || "Failed to discharge patient");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Discharge Patient from Bed {bed.number}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-sm">
            Are you sure you want to discharge <span className="font-semibold">{bed.patient?.name}</span>? 
            The bed will be marked for cleaning.
          </p>
          <div>
            <Label>Discharge Notes (Optional)</Label>
            <Input
              value={dischargeNotes}
              onChange={(e) => setDischargeNotes(e.target.value)}
              placeholder="e.g., Patient recovered fully"
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Discharge"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ==================== Transfer Dialog ====================
interface TransferDialogProps {
  bed: Bed | null;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  availableBeds: Bed[];
}

export function TransferDialog({
  bed,
  open,
  onClose,
  onSuccess,
  availableBeds,
}: TransferDialogProps) {
  const [destId, setDestId] = useState<string>("");
  const [transferReason, setTransferReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!bed || !bed.patient) return null;

  const handleSubmit = async () => {
    if (!destId) {
      toast.error("Please select a destination bed");
      return;
    }

    setIsLoading(true);
    try {
      const bedId = parseInt(bed.id);
      const destinationBedId = parseInt(destId);
      
      const response = await transferPatient(bedId, {
        destinationBedId,
        reason: transferReason || undefined
      });

      console.log("Transfer response:", response);

      const isSuccess = response?.data?.success ?? (response as any)?.success ?? false;

      if (isSuccess) {
        toast.success("Patient transferred successfully", {
          description: `Patient moved from Bed ${bed.number} to Bed ${destId}`
        });
        setDestId("");
        setTransferReason("");
        onClose();
        if (onSuccess) onSuccess();
      } else {
        const errorMsg = response?.data?.message || (response as any)?.message || "Failed to transfer patient";
        toast.error(errorMsg);
      }
    } catch (error: any) {
      console.error("Transfer error:", error);
      toast.error(error.response?.data?.message || "Failed to transfer patient");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer Patient from Bed {bed.number}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-sm">
            Transferring <span className="font-semibold">{bed.patient?.name}</span> from Bed {bed.number}
          </p>
          
          <div>
            <Label>Destination Bed *</Label>
            <Select value={destId} onValueChange={setDestId} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select available bed" />
              </SelectTrigger>
              <SelectContent>
                {availableBeds
                  .filter((b) => b.id !== bed.id && b.status === 'available')
                  .map((b) => (
                    <SelectItem key={b.id} value={b.id}>
                      Bed {b.number} ({b.type}) - Floor {b.floor}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Transfer Reason (Optional)</Label>
            <Input
              value={transferReason}
              onChange={(e) => setTransferReason(e.target.value)}
              placeholder="e.g., Need ICU care"
              disabled={isLoading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!destId || isLoading}>
            {isLoading ? "Transferring..." : "Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}