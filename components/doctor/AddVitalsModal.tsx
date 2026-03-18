

"use client";

import React, { useState, useEffect } from "react";

export interface NewVitalsForm {
  bp: string;
  hr: string;
  temp: string;
  weight: string;
  rr: string;
  spo2: string;
}

interface AddVitalsModalProps {
  onClose: () => void;
  onAdd: (vitals: NewVitalsForm) => void;
  initialVitals?: NewVitalsForm;
  isEditing?: boolean;
}

export default function AddVitalsModal({
  onClose,
  onAdd,
  initialVitals = { bp: "", hr: "", temp: "", weight: "", rr: "", spo2: "" },
  isEditing = false,
}: AddVitalsModalProps) {
  const [formData, setFormData] = useState<NewVitalsForm>(initialVitals);

  useEffect(() => {
    setFormData(initialVitals);
  }, [initialVitals]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {isEditing ? "Edit Vitals" : "Add Vitals"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg"
          >
            <span className="material-symbols-outlined text-slate-500">
              close
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-2">
                BP
              </label>
              <input
                type="text"
                name="bp"
                value={formData.bp}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm"
                placeholder="120/80"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-2">
                HR
              </label>
              <input
                type="number"
                name="hr"
                value={formData.hr}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm"
                placeholder="72"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-2">
                Temp
              </label>
              <input
                type="number"
                step="0.1"
                name="temp"
                value={formData.temp}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm"
                placeholder="36.6"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-2">
                Weight
              </label>
              <input
                type="number"
                step="0.1"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm"
                placeholder="68"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-2">
                RR
              </label>
              <input
                type="number"
                name="rr"
                value={formData.rr}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm"
                placeholder="16"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase mb-2">
                SpO2
              </label>
              <input
                type="number"
                name="spo2"
                value={formData.spo2}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm"
                placeholder="98"
              />
            </div>
          </div>

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
              className="px-4 py-2 bg-[#137fec] text-white text-sm font-medium rounded-lg hover:bg-blue-600"
            >
              {isEditing ? "Update Vitals" : "Save Vitals"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}