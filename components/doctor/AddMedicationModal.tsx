"use client";

import React from "react";

interface AddMedicationModalProps {
  onClose: () => void;
  onAdd: () => void;
  newMedication: {
    name: string;
    category: string;
    dosage: string;
    duration: string;
  };
  setNewMedication: React.Dispatch<React.SetStateAction<{
    name: string;
    category: string;
    dosage: string;
    duration: string;
  }>>;
}

export default function AddMedicationModal({
  onClose,
  onAdd,
  newMedication,
  setNewMedication,
}: AddMedicationModalProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewMedication(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white">pill</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Add Medication</h2>
              <p className="text-xs text-slate-500 mt-0.5">Enter prescription details</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Medication Name *
            </label>
            <input
              type="text"
              name="name"
              value={newMedication.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
              placeholder="e.g. Amoxicillin"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              name="category"
              value={newMedication.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
            >
              <option value="">Select category</option>
              <option value="Antibiotic">Antibiotic</option>
              <option value="Analgesic">Analgesic</option>
              <option value="Antihypertensive">Antihypertensive</option>
              <option value="Antidiabetic">Antidiabetic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Dosage *
            </label>
            <input
              type="text"
              name="dosage"
              value={newMedication.dosage}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
              placeholder="e.g. 500mg - 2x Daily"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={newMedication.duration}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
              placeholder="e.g. 7 Days"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-[#137fec] text-white text-sm font-medium rounded-lg hover:bg-blue-600 flex items-center gap-2 transition shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Medication
          </button>
        </div>
      </div>
    </div>
  );
}