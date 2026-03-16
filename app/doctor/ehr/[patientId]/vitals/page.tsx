"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { currentVisitApi } from "@/lib/api/ehr";
import toast from "react-hot-toast";

// ==================== Type Definitions ====================

interface Vital {
  id: number;
  bp: string;
  hr: number;
  temp: number;
  weight: number;
  rr: number;
  spo2: number;
  recordedBy: string;
  recordedAt: string;
}

interface NewVitalsForm {
  bp: string;
  hr: string;
  temp: string;
  weight: string;
  rr: string;
  spo2: string;
}

// API response types (simplified)
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  appointmentId?: string;
}

// ==================== AddVitalsModal ====================

interface AddVitalsModalProps {
  onClose: () => void;
  onAdd: (vitals: NewVitalsForm) => void;
  initialVitals?: NewVitalsForm;
  isEditing?: boolean;
}

function AddVitalsModal({
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

// ==================== VitalsPage ====================

export default function VitalsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const patientId = params.patientId as string;
  const date = searchParams.get("date");

  const [vitals, setVitals] = useState<Vital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddVitalsModal, setShowAddVitalsModal] = useState(false);
  const [newVitals, setNewVitals] = useState<NewVitalsForm>({
    bp: "",
    hr: "",
    temp: "",
    weight: "",
    rr: "",
    spo2: "",
  });
  const [editingVital, setEditingVital] = useState<Vital | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];

useEffect(() => {
  console.log("Vitals state updated:", vitals);
}, [vitals]);

 useEffect(() => {
  const fetchVitals = async () => {
    const fixedDate = todayStr;

    setLoading(true);
    setError(null);

    try {
      const response = await currentVisitApi.getVitalsByDate(
        patientId,
        fixedDate
      );

      console.log("Vitals response:", response);

      // API already returns array
      setVitals(response || []);

    } catch (err) {
      console.error("Error fetching vitals:", err);
      setError("Failed to load vitals");
    } finally {
      setLoading(false);
    }
  };

  fetchVitals();
}, [patientId]);

  const handleSaveVitals = async (vitalsData: NewVitalsForm) => {
    try {
      let response;

      if (editingVital) {
        // Update existing vital
        const updatePayload = {
          bp: vitalsData.bp,
          hr: Number(vitalsData.hr),
          temp: Number(vitalsData.temp),
          weight: Number(vitalsData.weight),
          rr: Number(vitalsData.rr),
          spo2: Number(vitalsData.spo2),
          recordedBy: "Dr. Sarah Jenkins",
        };
        response = await currentVisitApi.updateVital(
          patientId,
          editingVital.id.toString(),
          updatePayload,
        );
      } else {
        // Add new vital
        const payload = {
          date: todayStr,
          ...vitalsData,
          recordedBy: "Dr. Sarah Jenkins",
          _debug: Date.now(),
        };
        response = await currentVisitApi.saveVitals(patientId, payload);
      }

      const result = response.data !== undefined ? response.data : response;

      if (result && (result.success || result.appointmentId)) {
        toast.success(
          result.message ||
            (editingVital
              ? "Vitals updated successfully"
              : "Vitals saved successfully"),
        );

        // Refresh the list
        const fetchResponse = await currentVisitApi.getVitalsByDate(
          patientId,
          todayStr,
        );
        if (fetchResponse.data?.success) {
          setVitals(fetchResponse.data.data || []);
        }
      } else {
        toast.error(
          result?.message ||
            `Failed to ${editingVital ? "update" : "save"} vitals`,
        );
      }

      setShowAddVitalsModal(false);
      setEditingVital(null);
      setNewVitals({ bp: "", hr: "", temp: "", weight: "", rr: "", spo2: "" });
    } catch (error) {
      toast.error(`Error ${editingVital ? "updating" : "saving"} vitals`);
    }
  };

  const getVitalStatus = (
    value: number,
    type: string,
  ): "normal" | "abnormal" => {
    if (type === "hr") {
      return value >= 60 && value <= 100 ? "normal" : "abnormal";
    }
    if (type === "temp") {
      return value >= 36.1 && value <= 37.2 ? "normal" : "abnormal";
    }
    if (type === "spo2") {
      return value >= 95 ? "normal" : "abnormal";
    }
    return "normal";
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100 flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-[#137fec] border-t-transparent animate-spin rounded-full"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
        <p className="text-red-600 text-center">{error}</p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#137fec]">
                monitor_heart
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Patient Vitals
              </h3>
              <p className="text-xs text-slate-500">
                Historical vital signs and measurements
              </p>
              {date && (
                <p className="text-xs text-slate-400 mt-1">
                  Showing vitals for {new Date(date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              setEditingVital(null);
              setNewVitals({
                bp: "",
                hr: "",
                temp: "",
                weight: "",
                rr: "",
                spo2: "",
              });
              setShowAddVitalsModal(true);
            }}
            className="text-[#137fec] bg-transparent hover:bg-blue-50 text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-lg transition-all border border-[#137fec]"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Vitals
          </button>
        </div>

        {vitals.length === 0 ? (
          <p className="text-center text-slate-500 py-8">
            No vitals recorded for this visit.
          </p>
        ) : (
          <div className="space-y-4">
            {vitals.map((vital) => (
              <div
                key={vital.id}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#137fec]">
                        calendar_month
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {new Date(vital.recordedAt).toLocaleDateString()} at{" "}
                        {new Date(vital.recordedAt).toLocaleTimeString()}
                      </p>
                      <p className="text-xs text-slate-500">
                        Recorded by {vital.recordedBy}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingVital(vital);
                        setNewVitals({
                          bp: vital.bp || "",
                          hr: vital.hr?.toString() || "",
                          temp: vital.temp?.toString() || "",
                          weight: vital.weight?.toString() || "",
                          rr: vital.rr?.toString() || "",
                          spo2: vital.spo2?.toString() || "",
                        });
                        setShowAddVitalsModal(true);
                      }}
                      className="p-2 hover:bg-slate-100 rounded-lg transition"
                    >
                      <span className="material-symbols-outlined text-slate-500">
                        edit
                      </span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[14px] text-red-400">
                        monitor_heart
                      </span>
                      BP
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {vital.bp}
                    </p>
                    <p className="text-[10px] text-slate-400">mmHg</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[14px] text-red-400">
                        ecg_heart
                      </span>
                      HR
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-slate-900">
                        {vital.hr}
                      </p>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          getVitalStatus(vital.hr, "hr") === "normal"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {getVitalStatus(vital.hr, "hr") === "normal"
                          ? "Normal"
                          : "High"}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">bpm</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[14px] text-amber-400">
                        thermometer
                      </span>
                      Temp
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-slate-900">
                        {vital.temp}
                      </p>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          getVitalStatus(vital.temp, "temp") === "normal"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {getVitalStatus(vital.temp, "temp") === "normal"
                          ? "Normal"
                          : "Fever"}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">°C</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[14px] text-blue-400">
                        scale
                      </span>
                      Weight
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {vital.weight}
                    </p>
                    <p className="text-[10px] text-slate-400">kg</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[14px] text-green-400">
                        respiratory_rate
                      </span>
                      RR
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {vital.rr}
                    </p>
                    <p className="text-[10px] text-slate-400">breaths/min</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[14px] text-purple-400">
                        oxygen_saturation
                      </span>
                      SpO2
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-slate-900">
                        {vital.spo2}
                      </p>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          getVitalStatus(vital.spo2, "spo2") === "normal"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {getVitalStatus(vital.spo2, "spo2") === "normal"
                          ? "Normal"
                          : "Low"}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {showAddVitalsModal && (
        <AddVitalsModal
          onClose={() => {
            setShowAddVitalsModal(false);
            setEditingVital(null);
            setNewVitals({
              bp: "",
              hr: "",
              temp: "",
              weight: "",
              rr: "",
              spo2: "",
            });
          }}
          onAdd={handleSaveVitals}
          initialVitals={newVitals}
          isEditing={!!editingVital}
        />
      )}
    </>
  );
}
