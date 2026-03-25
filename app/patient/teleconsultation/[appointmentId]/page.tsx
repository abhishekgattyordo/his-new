// // app/teleconsultation/[appointmentId]/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import Header from "@/components/ui/Header";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Calendar, Clock, User, Video, Phone, Loader2 } from "lucide-react";
// import { appointmentsApi } from "@/lib/api/appointments";
// import toast from "react-hot-toast";

// interface Appointment {
//   id: string;
//   doctor_id: number;
//   doctor_name: string;
//   doctor_specialty: string;
//   appointment_date: string;
//   appointment_time: string;
//   consultation_type: string;
//   status: string;
//   notes?: string;
//   patient_id?: string;
// }

// export default function TeleconsultationPage() {
//   const params = useParams();
//   const router = useRouter();
//   const appointmentId = params.appointmentId as string;

//   const [appointment, setAppointment] = useState<Appointment | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [joining, setJoining] = useState(false);

//   useEffect(() => {
//     const fetchAppointment = async () => {
//       try {
//         const response = await appointmentsApi.getAppointment(appointmentId);
//         const data = response.data?.data || response.data;

//         console.log("Appointment data:", data);

//         // Handle both single object and array responses
//         let apt: Appointment | null = null;
//         if (Array.isArray(data)) {
//           // If it's an array, find the one matching the ID (in case the endpoint returned all appointments)
//           apt = data.find((item: any) => item.id === appointmentId) || null;
//         } else if (data && typeof data === "object") {
//           apt = data;
//         }

//         if (apt && apt.id) {
//           setAppointment(apt);
//         } else {
//           setError("Appointment not found");
//         }
//       } catch (err) {
//         console.error("Failed to fetch appointment:", err);
//         setError("Could not load appointment details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (appointmentId) {
//       fetchAppointment();
//     }
//   }, [appointmentId]);

//   const isToday = (dateStr: string) => {
//     const today = new Date().toISOString().split("T")[0];
//     return dateStr === today;
//   };

//   const canJoin = () => {
//     if (!appointment) return false;
//     return (
//       appointment.status === "BOOKED" &&
//       appointment.consultation_type === "teleconsultation" &&
//       isToday(appointment.appointment_date)
//     );
//   };

//   const handleJoinCall = () => {
//     if (!appointment) return;
//     setJoining(true);

//     // Generate a unique room name based on appointment ID
//     const roomName = `ordo-tele-${appointment.id}`;

//     // Add patient name for display in the call
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     const userName = user?.full_name_en || "Patient";

//     // Jitsi Meet URL (free, no account needed)
//     const jitsiUrl = `https://meet.jit.si/${roomName}?userInfo.displayName=${encodeURIComponent(userName)}&config.startWithAudioMuted=false&config.startWithVideoMuted=false`;

//     // Open in a new tab
//     window.open(jitsiUrl, "_blank");

//     toast.success("Opening video call...");
//     setJoining(false);
//   };

//   const formatDateTime = (dateStr: string, timeStr: string) => {
//     const date = new Date(dateStr);
//     const formattedDate = date.toLocaleDateString(undefined, {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//     const [hours, minutes] = timeStr.split(":");
//     const hour = parseInt(hours);
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const hour12 = hour % 12 || 12;
//     return { formattedDate, time: `${hour12}:${minutes} ${ampm}` };
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//         <Header />
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <div className="text-center">
//             <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
//             <p className="text-gray-600 dark:text-gray-400">Loading appointment...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !appointment) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//         <Header />
//         <div className="flex items-center justify-center min-h-[60vh]">
//           <Card className="w-full max-w-md">
//             <CardHeader>
//               <CardTitle className="text-center text-red-600">Error</CardTitle>
//             </CardHeader>
//             <CardContent className="text-center">
//               <p>{error || "Appointment not found"}</p>
//               <Button
//                 className="mt-4"
//                 variant="outline"
//                 onClick={() => router.push("/patient/dashboard")}
//               >
//                 Back to Dashboard
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   const { formattedDate, time } = formatDateTime(appointment.appointment_date, appointment.appointment_time);
//   const isJoinable = canJoin();

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Header />
//       <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
//         <Card>
//           <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-xl">
//             <CardTitle className="flex items-center gap-2 text-xl">
//               <Video className="h-6 w-6" />
//               Teleconsultation
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-6 space-y-6">
//             {/* Doctor Info */}
//             <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
//               <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
//                 <User className="h-8 w-8 text-green-600" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                   {appointment.doctor_name}
//                 </h2>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   {appointment.doctor_specialty}
//                 </p>
//               </div>
//             </div>

//             {/* Appointment Details */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex items-center gap-3">
//                 <Calendar className="h-5 w-5 text-green-600" />
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
//                   <p className="font-medium text-gray-900 dark:text-white">{formattedDate}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <Clock className="h-5 w-5 text-green-600" />
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
//                   <p className="font-medium text-gray-900 dark:text-white">{time}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Status Badge */}
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-500">Status</span>
//               <Badge
//                 className={`${
//                   appointment.status === "BOOKED"
//                     ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
//                     : "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {appointment.status}
//               </Badge>
//             </div>

//             {/* Notes */}
//             {appointment.notes && (
//               <div>
//                 <p className="text-sm text-gray-500 mb-1">Notes</p>
//                 <p className="text-sm text-gray-700 dark:text-gray-300">{appointment.notes}</p>
//               </div>
//             )}

//             {/* Join Call Button */}
//             {isJoinable ? (
//               <div className="pt-4">
//                 <Button
//                   onClick={handleJoinCall}
//                   disabled={joining}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
//                 >
//                   {joining ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Opening Call...
//                     </>
//                   ) : (
//                     <>
//                       <Phone className="mr-2 h-4 w-4" />
//                       Join Video Call
//                     </>
//                   )}
//                 </Button>
//                 <p className="text-xs text-gray-500 text-center mt-2">
//                   You can join the call 15 minutes before the scheduled time.
//                 </p>
//               </div>
//             ) : (
//               <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-center">
//                 <p className="text-amber-800 dark:text-amber-300">
//                   {appointment.status !== "BOOKED"
//                     ? "This appointment is no longer available for teleconsultation."
//                     : appointment.consultation_type !== "teleconsultation"
//                     ? "This is an in‑person appointment. Please visit the hospital."
//                     : "You can join the call only on the scheduled date."}
//                 </p>
//                 <Button
//                   variant="outline"
//                   className="mt-3"
//                   onClick={() => router.push("/patient/dashboard")}
//                 >
//                   Back to Dashboard
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


// app/teleconsultation/[appointmentId]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/ui/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Video, Phone, Loader2 } from "lucide-react";
import { appointmentsApi } from "@/lib/api/appointments";
import toast from "react-hot-toast";

interface Appointment {
  id: string;
  doctor_id: number;
  doctor_name: string;
  doctor_specialty: string;
  appointment_date: string;
  appointment_time: string;
  consultation_type: string;
  status: string;
  notes?: string;
  patient_id?: string;
}

export default function TeleconsultationPage() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.appointmentId as string;

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await appointmentsApi.getAppointment(appointmentId);
        const data = response.data?.data || response.data;

        console.log("Appointment data:", data);

        // Handle both single object and array responses
        let apt: Appointment | null = null;
        if (Array.isArray(data)) {
          apt = data.find((item: any) => item.id === appointmentId) || null;
        } else if (data && typeof data === "object") {
          apt = data;
        }

        if (apt && apt.id) {
          setAppointment(apt);
        } else {
          setError("Appointment not found");
        }
      } catch (err) {
        console.error("Failed to fetch appointment:", err);
        setError("Could not load appointment details");
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      fetchAppointment();
    }
  }, [appointmentId]);

  // 🧪 TEST MODE: Always allow joining (remove this after testing)
  const canJoin = () => true;

  const handleJoinCall = () => {
    if (!appointment) return;
    setJoining(true);

    // Generate a unique room name based on appointment ID
    const roomName = `ordo-tele-${appointment.id}`;

    // Add patient name for display in the call
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userName = user?.full_name_en || "Patient";

    // Jitsi Meet URL
    const jitsiUrl = `https://meet.jit.si/${roomName}?userInfo.displayName=${encodeURIComponent(userName)}&config.startWithAudioMuted=false&config.startWithVideoMuted=false`;

    // Open in a new tab
    window.open(jitsiUrl, "_blank");

    toast.success("Opening video call...");
    setJoining(false);
  };

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return { formattedDate, time: `${hour12}:${minutes} ${ampm}` };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading appointment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-red-600">Error</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>{error || "Appointment not found"}</p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => router.push("/patient/dashboard")}
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { formattedDate, time } = formatDateTime(appointment.appointment_date, appointment.appointment_time);
  const isJoinable = canJoin(); // Always true in test mode

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Video className="h-6 w-6" />
              Teleconsultation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Doctor Info */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {appointment.doctor_name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {appointment.doctor_specialty}
                </p>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{time}</p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Status</span>
              <Badge
                className={`${
                  appointment.status === "BOOKED"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {appointment.status}
              </Badge>
            </div>

            {/* Notes */}
            {appointment.notes && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Notes</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{appointment.notes}</p>
              </div>
            )}

            {/* Join Call Button – Always visible in test mode */}
            <div className="pt-4">
              <Button
                onClick={handleJoinCall}
                disabled={joining}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
              >
                {joining ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Opening Call...
                  </>
                ) : (
                  <>
                    <Phone className="mr-2 h-4 w-4" />
                    Join Video Call (Test Mode)
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Test mode – button always enabled. Remove condition after verification.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}