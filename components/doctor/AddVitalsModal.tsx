"use client";

import React from "react";

interface AddVitalsModalProps {
  onClose: () => void;
  onAdd: () => void;
  newVitals: {
    bp: string;
    hr: string;
    temp: string;
    weight: string;
    rr: string;
    spo2: string;
  };
  setNewVitals: React.Dispatch<React.SetStateAction<{
    bp: string;
    hr: string;
    temp: string;
    weight: string;
    rr: string;
    spo2: string;
  }>>;
}

export default function AddVitalsModal({
  onClose,
  onAdd,
  newVitals,
  setNewVitals,
}: AddVitalsModalProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVitals(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-white">monitor_heart</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Add Vitals</h2>
              <p className="text-xs text-slate-500 mt-0.5">Enter patient vital signs</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Blood Pressure *
              </label>
              <input
                type="text"
                name="bp"
                value={newVitals.bp}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
                placeholder="120/80"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Heart Rate *
              </label>
              <input
                type="number"
                name="hr"
                value={newVitals.hr}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
                placeholder="72"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Temperature *
              </label>
              <input
                type="number"
                step="0.1"
                name="temp"
                value={newVitals.temp}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
                placeholder="36.6"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                name="weight"
                value={newVitals.weight}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
                placeholder="68"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                Respiratory Rate
              </label>
              <input
                type="number"
                name="rr"
                value={newVitals.rr}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
                placeholder="16"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                SpO2 (%)
              </label>
              <input
                type="number"
                name="spo2"
                value={newVitals.spo2}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
                placeholder="98"
              />
            </div>
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
            Add Vitals
          </button>
        </div>
      </div>
    </div>
  );
}