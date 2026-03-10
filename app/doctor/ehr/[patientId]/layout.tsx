"use client";

import { useState, createContext, useContext } from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

// Import modal components
import VisitHistoryModal from "@/components/doctor/VisitHistoryModal";
import AddMedicationModal from "@/components/doctor/AddMedicationModal";
import AddVitalsModal from "@/components/doctor/AddVitalsModal";

// Sample patient data (you'd typically fetch this from an API/database)
const patientData = {
  "p001": {
    id: "p001",
    name: "John Doe",
    age: 54,
    gender: "M",
    patientId: "PAT1001",
    allergies: ["Penicillin (Severe)"],
    status: "Active",
    avatar: "JD",
    avatarColor: "blue",
  },
  "p002": {
    id: "p002",
    name: "Jane Smith",
    age: 32,
    gender: "F",
    patientId: "PAT1002",
    allergies: ["Sulfa"],
    status: "Critical",
    avatar: "JS",
    avatarColor: "green",
  },
  "p003": {
    id: "p003",
    name: "Michael Brown",
    age: 45,
    gender: "M",
    patientId: "PAT1003",
    allergies: ["None"],
    status: "Active",
    avatar: "MB",
    avatarColor: "purple",
  },
  "p004": {
    id: "p004",
    name: "Emily Chen",
    age: 28,
    gender: "F",
    patientId: "PAT1004",
    allergies: ["Latex"],
    status: "Active",
    avatar: "EC",
    avatarColor: "orange",
  },
};

// Types
interface Medication {
  id: number;
  name: string;
  category: string;
  dosage: string;
  duration: string;
  color: string;
}

interface Vital {
  id: number;
  date: string;
  time: string;
  bp: string;
  hr: number;
  temp: number;
  weight: number;
  rr: number;
  spo2: number;
  recordedBy: string;
}

interface EHRContextType {
  patient: typeof patientData[keyof typeof patientData];
  medications: Medication[];
  setMedications: React.Dispatch<React.SetStateAction<Medication[]>>;
  vitals: Vital[];
  setVitals: React.Dispatch<React.SetStateAction<Vital[]>>;
  showHistoryModal: boolean;
  setShowHistoryModal: React.Dispatch<React.SetStateAction<boolean>>;
  showAddMedicationModal: boolean;
  setShowAddMedicationModal: React.Dispatch<React.SetStateAction<boolean>>;
  showAddVitalsModal: boolean;
  setShowAddVitalsModal: React.Dispatch<React.SetStateAction<boolean>>;
  newMedication: any;
  setNewMedication: React.Dispatch<React.SetStateAction<any>>;
  newVitals: any;
  setNewVitals: React.Dispatch<React.SetStateAction<any>>;
  handleAddMedication: () => void;
  handleAddVitals: () => void;
  handleDeleteMedication: (id: number) => void;
}

const EHRContext = createContext<EHRContextType | undefined>(undefined);

export const useEHR = () => {
  const context = useContext(EHRContext);
  if (!context) throw new Error("useEHR must be used within EHRProvider");
  return context;
};

export default function EHRLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const pathname = usePathname();
  const patientId = params.patientId as string;

  const patient = patientData[patientId as keyof typeof patientData] || {
    id: patientId,
    name: "Unknown Patient",
    age: "--",
    gender: "--",
    patientId: patientId,
    allergies: ["Unknown"],
    status: "Unknown",
    avatar: "UN",
    avatarColor: "gray",
  };

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 1,
      name: "Amoxicillin",
      category: "Antibiotic",
      dosage: "500mg - 2x Daily",
      duration: "7 Days",
      color: "blue",
    },
    {
      id: 2,
      name: "Paracetamol",
      category: "Analgesic",
      dosage: "500mg - PRN",
      duration: "3 Days",
      color: "amber",
    },
  ]);

  const [vitals, setVitals] = useState<Vital[]>([
    { id: 1, date: "Oct 12, 2023", time: "09:30 AM", bp: "120/80", hr: 72, temp: 36.6, weight: 68, rr: 16, spo2: 98, recordedBy: "Dr. Sarah Jenkins" },
    { id: 2, date: "Oct 10, 2023", time: "02:15 PM", bp: "118/78", hr: 68, temp: 36.4, weight: 68, rr: 14, spo2: 99, recordedBy: "Nurse Thompson" },
    { id: 3, date: "Oct 5, 2023", time: "11:00 AM", bp: "122/82", hr: 74, temp: 36.7, weight: 68.2, rr: 16, spo2: 97, recordedBy: "Dr. Sarah Jenkins" },
    { id: 4, date: "Sep 28, 2023", time: "10:30 AM", bp: "125/85", hr: 76, temp: 36.8, weight: 68.5, rr: 18, spo2: 96, recordedBy: "Dr. Smith" },
  ]);

  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAddMedicationModal, setShowAddMedicationModal] = useState(false);
  const [showAddVitalsModal, setShowAddVitalsModal] = useState(false);
  const [newMedication, setNewMedication] = useState({ name: "", category: "", dosage: "", duration: "" });
  const [newVitals, setNewVitals] = useState({ bp: "", hr: "", temp: "", weight: "", rr: "", spo2: "" });

  const visitHistory = [
    { date: "Oct 12, 2023", type: "Routine Checkup", doctor: "Dr. Smith", notes: "Annual physical, vitals normal", diagnosis: "Healthy" },
    { date: "Aug 05, 2023", type: "Teleconsultation", doctor: "Dr. Adams", notes: "Follow-up on medication", diagnosis: "Hypertension - stable" },
    { date: "Feb 10, 2023", type: "Emergency Visit", doctor: "Dr. Lee", notes: "Severe headache, dizziness", diagnosis: "Migraine" },
    { date: "Nov 15, 2022", type: "Follow-up", doctor: "Dr. Chen", notes: "Lab results review", diagnosis: "Vitamin D deficiency" },
    { date: "Sep 03, 2022", type: "Annual Checkup", doctor: "Dr. Williams", notes: "Routine screening", diagnosis: "Healthy" },
  ];

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage) {
      const colors = ["blue", "amber", "green", "purple", "pink"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setMedications([
        ...medications,
        { id: Date.now(), ...newMedication, color: randomColor },
      ]);
      setNewMedication({ name: "", category: "", dosage: "", duration: "" });
      setShowAddMedicationModal(false);
    }
  };

  const handleAddVitals = () => {
    if (newVitals.bp && newVitals.hr && newVitals.temp) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      const formattedTime = today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      setVitals([
        {
          id: Date.now(),
          date: formattedDate,
          time: formattedTime,
          bp: newVitals.bp,
          hr: parseInt(newVitals.hr),
          temp: parseFloat(newVitals.temp),
          weight: parseFloat(newVitals.weight) || 0,
          rr: parseInt(newVitals.rr) || 0,
          spo2: parseInt(newVitals.spo2) || 0,
          recordedBy: "Dr. Sarah Jenkins",
        },
        ...vitals,
      ]);
      setNewVitals({ bp: "", hr: "", temp: "", weight: "", rr: "", spo2: "" });
      setShowAddVitalsModal(false);
    }
  };

  const handleDeleteMedication = (id: number) => {
    setMedications(medications.filter((med) => med.id !== id));
  };

  // Map avatar colors to actual Tailwind classes
  const avatarColorMap: Record<string, string> = {
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
    orange: "bg-orange-600",
    gray: "bg-gray-600",
  };

  // Tabs configuration
  const tabs = [
    { name: "Current Visit", href: `/doctor/ehr/${patientId}/current-visit` },
    { name: "Vitals", href: `/doctor/ehr/${patientId}/vitals` },
    { name: "Prescriptions", href: `/doctor/ehr/${patientId}/prescriptions` },
  ];

  // Determine active tab from pathname
  const activeTab = pathname.split('/').pop() || "current-visit";

  return (
    <EHRContext.Provider
      value={{
        patient,
        medications,
        setMedications,
        vitals,
        setVitals,
        showHistoryModal,
        setShowHistoryModal,
        showAddMedicationModal,
        setShowAddMedicationModal,
        showAddVitalsModal,
        setShowAddVitalsModal,
        newMedication,
        setNewMedication,
        newVitals,
        setNewVitals,
        handleAddMedication,
        handleAddVitals,
        handleDeleteMedication,
      }}
    >
      {/* Global styles - must be direct children of the provider, not inside any div */}
      <style jsx global>{`
        body {
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
        }
      `}</style>

      <div className="bg-[#f6f7f8] min-h-screen text-slate-900 antialiased flex flex-col">
        <main className="flex-1 flex flex-col max-w-[1440px] mx-auto w-full px- md:px-2 py-4 gap-4">
          {/* Profile Header - reduced padding */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div
                className={`w-20 h-20 rounded-full ${avatarColorMap[patient.avatarColor]} flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-md`}
              >
                {patient.avatar}
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900 leading-tight">{patient.name}</h1>
                  <span
                    className={`px-2.5 py-1 rounded-full ${
                      patient.status === "Critical"
                        ? "bg-red-50 text-red-700 border-red-100"
                        : "bg-emerald-50 text-emerald-700 border-emerald-100"
                    } text-xs font-bold uppercase tracking-wider border`}
                  >
                    {patient.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-600 text-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">fingerprint</span>
                    <span className="font-medium">ID: {patient.patientId}</span>
                  </span>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-slate-400">person</span>
                    <span>
                      {patient.age} Yrs, {patient.gender}
                    </span>
                  </span>
                  {patient.allergies[0] !== "None" && (
                    <>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <span className="flex items-center gap-1.5 text-red-600 font-medium">
                        <span className="material-symbols-outlined text-[16px]">warning</span>
                        Allergies: {patient.allergies.join(", ")}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Layout Grid - reduced gap */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Left Sidebar: Timeline */}
            <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-900">Visit History</h3>
                  <button
                    onClick={() => setShowHistoryModal(true)}
                    className="text-[#137fec] text-xs font-semibold hover:underline flex items-center gap-1"
                  >
                    View All
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
                <div className="p-4 relative">
                  <div className="grid grid-cols-[24px_1fr] gap-x-4">
                    {/* Current Visit */}
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#137fec] to-blue-600 rounded-full flex items-center justify-center text-white shadow-md shadow-blue-200 z-10">
                        <span className="material-symbols-outlined text-[14px]">edit_calendar</span>
                      </div>
                      <div className="w-[2px] bg-gradient-to-b from-blue-200 to-slate-200 h-full -mb-4"></div>
                    </div>
                    <div className="pb-8">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-3 shadow-sm">
                        <p className="text-[#137fec] font-bold text-sm">Today's Visit</p>
                        <p className="text-slate-600 text-xs mt-0.5">In Progress • Dr. Sarah Jenkins</p>
                      </div>
                    </div>

                    {/* Past visits */}
                    {visitHistory.slice(0, 3).map((visit, idx) => (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center pt-1">
                          <div className="w-2 h-2 bg-slate-300 rounded-full z-10"></div>
                          {idx < 2 && <div className="w-[2px] bg-slate-200 h-full -mb-4"></div>}
                        </div>
                        <div className={idx < 2 ? "pb-6" : "pb-2"}>
                          <p className="text-slate-900 text-sm font-semibold">{visit.date}</p>
                          <p className="text-slate-500 text-xs">
                            {visit.type} • {visit.doctor}
                          </p>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
              {/* Tab Navigation */}
              <div className="bg-white rounded-t-xl border border-slate-200 border-b-0">
                <div className="flex items-center px-6 pt-2 border-b border-slate-200 overflow-x-auto bg-slate-50/50">
                  {tabs.map((tab) => (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      className={`px-4 py-4 text-sm font-semibold border-b-2 focus:outline-none transition-colors whitespace-nowrap ${
                        activeTab === tab.href.split('/').pop()
                          ? "text-[#137fec] border-[#137fec] bg-white"
                          : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-white"
                      }`}
                    >
                      {tab.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Page Content */}
              <div className="bg-white rounded-b-xl border border-slate-200 border-t-0 p-6 md:p-8">
                {children}
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        {showHistoryModal && (
          <VisitHistoryModal history={visitHistory} onClose={() => setShowHistoryModal(false)} />
        )}
        {showAddMedicationModal && (
          <AddMedicationModal
            onClose={() => setShowAddMedicationModal(false)}
            onAdd={handleAddMedication}
            newMedication={newMedication}
            setNewMedication={setNewMedication}
          />
        )}
        {showAddVitalsModal && (
          <AddVitalsModal
            onClose={() => setShowAddVitalsModal(false)}
            onAdd={handleAddVitals}
            newVitals={newVitals}
            setNewVitals={setNewVitals}
          />
        )}
      </div>

      {/* Fonts and icon styles - also direct children */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }
      `}</style>
    </EHRContext.Provider>
  );
}