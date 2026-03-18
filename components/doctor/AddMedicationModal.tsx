"use client";

import React, { useState } from "react";


export interface NewMedicationData {
  name: string;
  category: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface AddMedicationModalProps {
  onClose: () => void;
  onAdd: (medications: NewMedicationData[]) => void; // Now accepts an array
  initialValues?: Partial<NewMedicationData>;
}

export default function AddMedicationModal({
  onClose,
  onAdd,
}: AddMedicationModalProps) {
  const [medications, setMedications] = useState<NewMedicationData[]>([
    { name: "", category: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ]);

  const handleAddRow = () => {
    setMedications([
      ...medications,
      { name: "", category: "", dosage: "", frequency: "", duration: "", instructions: "" },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    } else {
      alert("At least one medication is required.");
    }
  };

  const handleChange = (
    index: number,
    field: keyof NewMedicationData,
    value: string
  ) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out rows that are missing required fields (name and dosage)
    const validMedications = medications.filter(
      (med) => med.name.trim() && med.dosage.trim()
    );
    if (validMedications.length === 0) {
      alert("Please add at least one medication with name and dosage.");
      return;
    }
    onAdd(validMedications);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white">pill</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Add Medications</h2>
              <p className="text-xs text-slate-500 mt-0.5">Enter one or more prescriptions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {medications.map((med, index) => (
            <div
              key={index}
              className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 relative"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-slate-700">Medication #{index + 1}</h4>
                {medications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={med.name}
                    onChange={(e) => handleChange(index, "name", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="e.g. Amoxicillin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={med.category}
                    onChange={(e) => handleChange(index, "category", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="">Select</option>
                    <option value="Antibiotic">Antibiotic</option>
                    <option value="Analgesic">Analgesic</option>
                    <option value="Antihypertensive">Antihypertensive</option>
                    <option value="Antidiabetic">Antidiabetic</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    value={med.dosage}
                    onChange={(e) => handleChange(index, "dosage", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="e.g. 500mg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                    Frequency
                  </label>
                  <input
                    type="text"
                    value={med.frequency}
                    onChange={(e) => handleChange(index, "frequency", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="e.g. Twice daily"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={med.duration}
                    onChange={(e) => handleChange(index, "duration", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                    placeholder="e.g. 7 days"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-500 uppercase mb-1">
                    Instructions
                  </label>
                  <textarea
                    value={med.instructions}
                    onChange={(e) => handleChange(index, "instructions", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none"
                    placeholder="e.g. Take with food"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddRow}
            className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:text-[#137fec] hover:border-[#137fec] transition flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Add Another Medication
          </button>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#137fec] text-white text-sm font-medium rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              Save All Medications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}