

// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { currentVisitApi } from "@/lib/api/ehr";
// import toast from "react-hot-toast";

// export default function CurrentVisitPage() {
//   const params = useParams();
//   const searchParams = useSearchParams();
//   const patientId = params.patientId as string;
//   const appointmentId = params.appointmentId as string; // from route (if any)
//   const date = searchParams.get("date"); // from query (when coming from history)

//   const [formData, setFormData] = useState({
//     diagnosis: "",
//     icd10_code: "",
//     clinical_notes: "",
//     follow_up_date: "",
//     patient_instructions: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         let response;

//         if (date) {
//           console.log("Calling getCurrentVisitByDate API");
//           console.log("Patient ID:", patientId);
//           console.log("Date sent:", date);

//           response = await currentVisitApi.getCurrentVisitByDate(
//             patientId,
//             date,
//           );

//           console.log("API response object:", response);
//           console.log("API response data:", response.data);
//         } else if (appointmentId) {
//           console.log("Calling getCurrentVisit with appointmentId");
//           console.log("Patient ID:", patientId);
//           console.log("Appointment ID:", appointmentId);

//           response = await currentVisitApi.getCurrentVisit(
//             patientId,
//             appointmentId,
//           );

//           console.log("API response:", response);
//         } else {
//           console.log("Calling getCurrentVisit for latest visit");
//           console.log("Patient ID:", patientId);

//           response = await currentVisitApi.getCurrentVisit(patientId);

//           console.log("API response:", response);
//         }

//         const json = response.data;

//         if (json) {
//           const data = json;

//           const formattedDate = data.follow_up_date
//             ? data.follow_up_date.split("T")[0]
//             : "";

//           setFormData({
//             diagnosis: data.diagnosis || "",
//             icd10_code: data.icd10_code || "",
//             clinical_notes: data.clinical_notes || "",
//             follow_up_date: formattedDate,
//             patient_instructions: data.patient_instructions || "",
//           });
//         } else {
//           // If no data (new visit), leave form empty
//           setFormData({
//             diagnosis: "",
//             icd10_code: "",
//             clinical_notes: "",
//             follow_up_date: "",
//             patient_instructions: "",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching current visit:", error);
//         toast.error("Failed to load current visit data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [patientId, appointmentId, date]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const payload: any = { ...formData };
//       if (date) {
//         payload.date = date;
//       } else if (appointmentId) {
//         payload.appointmentId = appointmentId;
//       } // else no identifier, API will use latest

//       const response = await currentVisitApi.saveCurrentVisit(
//         patientId,
//         payload,
//       );
//       const json = response.data !== undefined ? response.data : response;

//       if (json && (json.success || json.appointmentId)) {
//         toast.success(json.message || "Current visit saved");
//       } else {
//         toast.error(json?.message || "Save failed");
//       }
//     } catch (error) {
//       console.error("Save error:", error);
//       toast.error("Error saving");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-8">
//       {/* Diagnosis Section */}
//       <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
//               <span className="material-symbols-outlined text-[#137fec]">
//                 clinical_notes
//               </span>
//             </div>
//             <div>
//               <h3 className="text-base font-bold text-slate-900">
//                 Assessment & Diagnosis
//               </h3>
//               <p className="text-xs text-slate-500">
//                 Primary evaluation and clinical findings
//               </p>
//             </div>
//           </div>
//           <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-medium">
//             {saving ? "Saving..." : "Draft saved"}
//           </span>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//               <span className="material-symbols-outlined text-[18px] text-slate-400">
//                 diagnosis
//               </span>
//               Primary Diagnosis
//             </label>
//             <div className="relative">
//               <input
//                 name="diagnosis"
//                 value={formData.diagnosis}
//                 onChange={handleChange}
//                 className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] pl-10 py-3 shadow-sm"
//                 placeholder="e.g. Acute Bronchitis"
//                 type="text"
//               />
//               <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
//                 search
//               </span>
//             </div>
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//               <span className="material-symbols-outlined text-[18px] text-slate-400">
//                 code
//               </span>
//               ICD-10 Code
//             </label>
//             <input
//               name="icd10_code"
//               value={formData.icd10_code}
//               onChange={handleChange}
//               className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] py-3 px-4 shadow-sm"
//               type="text"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//             <span className="material-symbols-outlined text-[18px] text-slate-400">
//               note
//             </span>
//             Clinical Notes
//           </label>
//           <textarea
//             name="clinical_notes"
//             value={formData.clinical_notes}
//             onChange={handleChange}
//             className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] resize-none p-4 shadow-sm"
//             placeholder="Enter patient complaints, observations, and assessment details..."
//             rows={5}
//           />
//         </div>
//       </section>

//       {/* Follow Up Section */}
//       <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
//             <span className="material-symbols-outlined text-[#137fec]">
//               event_upcoming
//             </span>
//           </div>
//           <div>
//             <h3 className="text-base font-bold text-slate-900">
//               Follow-up & Instructions
//             </h3>
//             <p className="text-xs text-slate-500">
//               Schedule next visit and patient guidance
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//               <span className="material-symbols-outlined text-[18px] text-slate-400">
//                 calendar_month
//               </span>
//               Follow-up Date
//             </label>
//             <input
//               name="follow_up_date"
//               value={formData.follow_up_date}
//               onChange={handleChange}
//               className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] px-4 py-3 shadow-sm"
//               type="date"
//             />
//           </div>

//           <div className="flex flex-col gap-2">
//             <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//               <span className="material-symbols-outlined text-[18px] text-slate-400">
//                 description
//               </span>
//               Patient Instructions
//             </label>
//             <textarea
//               name="patient_instructions"
//               value={formData.patient_instructions}
//               onChange={handleChange}
//               className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] resize-none p-3 shadow-sm"
//               placeholder="Additional instructions..."
//               rows={3}
//             />
//           </div>
//         </div>
//       </section>

//       <div className="flex justify-end">
//         <button
//           type="submit"
//           disabled={saving}
//           className="px-6 py-2 bg-[#137fec] text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
//         >
//           {saving ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </form>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { currentVisitApi } from "@/lib/api/ehr";
import toast from "react-hot-toast";

export default function CurrentVisitPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const patientId = params.patientId as string;
  const appointmentId = params.appointmentId as string;
  const date = searchParams.get("date");

  const [formData, setFormData] = useState({
    diagnosis: "",
    icd10_code: "",
    clinical_notes: "",
    follow_up_date: "",
    patient_instructions: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;

        if (date) {
          response = await currentVisitApi.getCurrentVisitByDate(patientId, date);
        } else if (appointmentId) {
          response = await currentVisitApi.getCurrentVisit(patientId, appointmentId);
        } else {
          response = await currentVisitApi.getCurrentVisit(patientId);
        }

        const json = response.data;

        if (json) {
          const data = json;

          const formattedDate = data.follow_up_date
            ? data.follow_up_date.split("T")[0]
            : "";

          setFormData({
            diagnosis: data.diagnosis || "",
            icd10_code: data.icd10_code || "",
            clinical_notes: data.clinical_notes || "",
            follow_up_date: formattedDate,
            patient_instructions: data.patient_instructions || "",
          });
        } else {
          setFormData({
            diagnosis: "",
            icd10_code: "",
            clinical_notes: "",
            follow_up_date: "",
            patient_instructions: "",
          });
        }
      } catch (error) {
        console.error("Error fetching current visit:", error);
        toast.error("Failed to load current visit data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [patientId, appointmentId, date]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload: any = { ...formData };
      if (date) {
        payload.date = date;
      } else if (appointmentId) {
        payload.appointmentId = appointmentId;
      }

      const response = await currentVisitApi.saveCurrentVisit(patientId, payload);
      const json = response.data !== undefined ? response.data : response;

      if (json && (json.success || json.appointmentId)) {
        toast.success(json.message || "Current visit saved");
      } else {
        toast.error(json?.message || "Save failed");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Error saving");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Diagnosis Section */}
      <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#137fec]">
                clinical_notes
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Assessment & Diagnosis
              </h3>
              <p className="text-xs text-slate-500">
                Primary evaluation and clinical findings
              </p>
            </div>
          </div>
          <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-medium">
            {saving ? "Saving..." : "Draft saved"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                diagnosis
              </span>
              Primary Diagnosis
            </label>
            <div className="relative">
              <input
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] pl-10 py-3 shadow-sm"
                placeholder="e.g. Acute Bronchitis"
                type="text"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                code
              </span>
              ICD-10 Code
            </label>
            <input
              name="icd10_code"
              value={formData.icd10_code}
              onChange={handleChange}
              className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] py-3 px-4 shadow-sm"
              type="text"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-400">
              note
            </span>
            Clinical Notes
          </label>
          <textarea
            name="clinical_notes"
            value={formData.clinical_notes}
            onChange={handleChange}
            className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] resize-none p-4 shadow-sm"
            placeholder="Enter patient complaints, observations, and assessment details..."
            rows={5}
          />
        </div>
      </section>

      {/* Follow Up Section */}
      <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#137fec]">
              event_upcoming
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Follow-up & Instructions
            </h3>
            <p className="text-xs text-slate-500">
              Schedule next visit and patient guidance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                calendar_month
              </span>
              Follow-up Date
            </label>
            <input
              name="follow_up_date"
              value={formData.follow_up_date}
              onChange={handleChange}
              className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] px-4 py-3 shadow-sm"
              type="date"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                description
              </span>
              Patient Instructions
            </label>
            <textarea
              name="patient_instructions"
              value={formData.patient_instructions}
              onChange={handleChange}
              className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] resize-none p-3 shadow-sm"
              placeholder="Additional instructions..."
              rows={3}
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-[#137fec] text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}