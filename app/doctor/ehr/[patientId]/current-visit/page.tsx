"use client";

import { useEHR } from "../layout";

export default function CurrentVisitPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Diagnosis Section */}
      <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#137fec]">clinical_notes</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Assessment & Diagnosis</h3>
              <p className="text-xs text-slate-500">Primary evaluation and clinical findings</p>
            </div>
          </div>
          <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-medium">
            Draft saved 2m ago
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">diagnosis</span>
              Primary Diagnosis
            </label>
            <div className="relative">
              <input
                className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] pl-10 py-3 shadow-sm"
                placeholder="e.g. Acute Bronchitis"
                type="text"
                defaultValue="Upper Respiratory Infection"
              />
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                search
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">code</span>
              ICD-10 Code
            </label>
            <input
              className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] py-3 px-4 shadow-sm"
              type="text"
              defaultValue="J06.9"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-400">note</span>
            Clinical Notes
          </label>
          <textarea
            className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] resize-none p-4 shadow-sm"
            placeholder="Enter patient complaints, observations, and assessment details..."
            rows={5}
            defaultValue="Patient presents with a 3-day history of sore throat, mild fever (38°C), and nasal congestion. No difficulty breathing. Lungs clear to auscultation. Pharynx erythematous without exudate."
          />
        </div>
      </section>

      {/* Follow Up Section */}
      <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#137fec]">event_upcoming</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Follow-up & Instructions</h3>
            <p className="text-xs text-slate-500">Schedule next visit and patient guidance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">calendar_month</span>
              Follow-up Date
            </label>
            <input
              className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] px-4 py-3 shadow-sm"
              type="date"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">description</span>
              Patient Instructions
            </label>
            <textarea
              className="w-full rounded-lg bg-white border border-slate-200 text-slate-900 text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec] resize-none p-3 shadow-sm"
              placeholder="Additional instructions..."
              rows={3}
              defaultValue="Rest, hydration, monitor temperature. Return if symptoms worsen or fever persists beyond 3 days."
            />
          </div>
        </div>
      </section>
    </div>
  );
}