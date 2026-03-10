"use client";

import { useEHR } from "../layout";

export default function VitalsPage() {
  const { vitals, setShowAddVitalsModal } = useEHR();

  const getVitalStatus = (value: number, type: string) => {
    if (type === "hr") {
      if (value >= 60 && value <= 100) return "normal";
      return "abnormal";
    }
    if (type === "temp") {
      if (value >= 36.1 && value <= 37.2) return "normal";
      return "abnormal";
    }
    if (type === "spo2") {
      if (value >= 95) return "normal";
      return "abnormal";
    }
    return "normal";
  };

  return (
    <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#137fec]">monitor_heart</span>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Patient Vitals</h3>
            <p className="text-xs text-slate-500">Historical vital signs and measurements</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddVitalsModal(true)}
          className="text-[#137fec] bg-transparent hover:bg-blue-50 text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-lg transition-all border border-[#137fec]"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Add Vitals
        </button>
      </div>

      <div className="space-y-4">
        {vitals.map((vital) => (
          <div key={vital.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#137fec]">calendar_month</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {vital.date} at {vital.time}
                  </p>
                  <p className="text-xs text-slate-500">Recorded by {vital.recordedBy}</p>
                </div>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1.5 rounded-full w-fit ${
                  vital.bp === "120/80" ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                }`}
              >
                Current Reading
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-red-400">monitor_heart</span>
                  BP
                </p>
                <p className="text-lg font-bold text-slate-900">{vital.bp}</p>
                <p className="text-[10px] text-slate-400">mmHg</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-red-400">ecg_heart</span>
                  HR
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-slate-900">{vital.hr}</p>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      getVitalStatus(vital.hr, "hr") === "normal"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {getVitalStatus(vital.hr, "hr") === "normal" ? "Normal" : "High"}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">bpm</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-amber-400">thermometer</span>
                  Temp
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-slate-900">{vital.temp}</p>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      getVitalStatus(vital.temp, "temp") === "normal"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {getVitalStatus(vital.temp, "temp") === "normal" ? "Normal" : "Fever"}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">°C</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-blue-400">scale</span>
                  Weight
                </p>
                <p className="text-lg font-bold text-slate-900">{vital.weight}</p>
                <p className="text-[10px] text-slate-400">kg</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-green-400">respiratory_rate</span>
                  RR
                </p>
                <p className="text-lg font-bold text-slate-900">{vital.rr}</p>
                <p className="text-[10px] text-slate-400">breaths/min</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg">
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                  <span className="material-symbols-outlined text-[14px] text-purple-400">oxygen_saturation</span>
                  SpO2
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-slate-900">{vital.spo2}</p>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      getVitalStatus(vital.spo2, "spo2") === "normal"
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {vital.spo2}%
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 text-[#137fec] text-sm font-semibold hover:underline flex items-center gap-1">
        View All Vitals History
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
      </button>
    </section>
  );
}