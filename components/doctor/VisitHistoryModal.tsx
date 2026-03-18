// "use client";

// import React from "react";

// interface Visit {
//   date: string;
//   type: string;
//   doctor: string;
//   notes: string;
//   diagnosis: string;
// }

// interface VisitHistoryModalProps {
//   history: Visit[];
//   onClose: () => void;
//   onVisitClick?: (visit: Visit) => void;
// }

// export default function VisitHistoryModal({ history, onClose, onVisitClick }: VisitHistoryModalProps) {
//   return (
//     <div
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose} // Click on backdrop closes modal
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in duration-200"
//         onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
//       >
//         <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-[#137fec] to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
//               <span className="material-symbols-outlined text-white">history</span>
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">Complete Visit History</h2>
//               <p className="text-xs text-slate-500 mt-0.5">
//                 Click on a visit to view details
//               </p>
//             </div>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
//             <span className="material-symbols-outlined text-slate-500">close</span>
//           </button>
//         </div>

//         <div className="p-6">
//           <div className="space-y-4">
//             {history.map((visit, index) => (
//               <div
//                 key={index}
//                 onClick={() => onVisitClick?.(visit)}
//                 className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition bg-white cursor-pointer"
//               >
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
//                   <div className="flex items-start gap-3">
//                     <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
//                       <span className="material-symbols-outlined text-[#137fec]">calendar_month</span>
//                     </div>
//                     <div>
//                       <p className="font-bold text-slate-900">{visit.date}</p>
//                       <p className="text-sm text-slate-600">{visit.type}</p>
//                       <p className="text-xs text-slate-500 mt-1">{visit.doctor}</p>
//                     </div>
//                   </div>
//                   <div className="md:text-right">
//                     <p className="text-sm text-slate-700 font-medium">Diagnosis:</p>
//                     <p className="text-sm text-slate-600">{visit.diagnosis}</p>
//                     <p className="text-xs text-slate-500 mt-1 max-w-md">{visit.notes}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-5 py-2 bg-[#137fec] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition shadow-sm"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";

interface Visit {
  date: string;
  type: string;
  doctor: string;
  notes: string;
  diagnosis: string;
}

interface VisitHistoryModalProps {
  history: Visit[];
  onClose: () => void;
  onVisitClick?: (visit: Visit) => void;
  onViewVitals?: (visit: Visit) => void;
}

export default function VisitHistoryModal({
  history,
  onClose,
  onVisitClick,
  onViewVitals,
}: VisitHistoryModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#137fec] to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white">history</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Complete Visit History</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click on a visit to view details or use the vitals button
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {history.map((visit, index) => (
              <div
                key={index}
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition bg-white"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  {/* Left side – clickable for current visit */}
                  <div
                    onClick={() => onVisitClick?.(visit)}
                    className="flex items-start gap-3 flex-1 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#137fec]">calendar_month</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{visit.date}</p>
                      <p className="text-sm text-slate-600">{visit.type}</p>
                      <p className="text-xs text-slate-500 mt-1">{visit.doctor}</p>
                    </div>
                  </div>

                  {/* Right side – diagnosis and vitals button */}
                  <div className="md:text-right flex items-center gap-4">
                    <div>
                      <p className="text-sm text-slate-700 font-medium">Diagnosis:</p>
                      <p className="text-sm text-slate-600">{visit.diagnosis}</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-md">{visit.notes}</p>
                    </div>
                    {onViewVitals && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the parent onVisitClick
                          onViewVitals(visit);
                        }}
                        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                        title="View vitals for this date"
                      >
                        <span className="material-symbols-outlined">monitor_heart</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#137fec] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}