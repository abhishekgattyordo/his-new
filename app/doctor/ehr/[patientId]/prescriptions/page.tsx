"use client";

import { useEHR } from "../layout";

export default function PrescriptionsPage() {
  const { medications, setShowAddMedicationModal, handleDeleteMedication } = useEHR();

  return (
    <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#137fec]">pill</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Prescribed Medications</h3>
            <p className="text-xs text-slate-500">Current medications and dosage information</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddMedicationModal(true)}
          className="text-[#137fec] bg-transparent hover:bg-blue-50 text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-lg transition-all border border-[#137fec]"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Medication
        </button>
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-gradient-to-r from-slate-50 to-white text-slate-600 font-semibold">
            <tr>
              <th className="px-6 py-4">Medication</th>
              <th className="px-6 py-4">Dosage</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {medications.map((med) => (
              <tr key={med.id} className="bg-white hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-md bg-${med.color}-50 flex items-center justify-center`}>
                      <span className={`material-symbols-outlined text-${med.color}-500 text-[16px]`}>medication</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{med.name}</p>
                      <p className="text-xs text-slate-500">{med.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`bg-${med.color}-50 text-${med.color}-700 text-xs font-medium px-3 py-1 rounded-full w-fit`}>
                    {med.dosage}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{med.duration}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDeleteMedication(med.id)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded"
                  >
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}