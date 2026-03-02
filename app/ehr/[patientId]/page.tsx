"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function EHRPage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.patientId as string;
  
  const [activeTab, setActiveTab] = useState("current-visit");
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showAddMedicationModal, setShowAddMedicationModal] = useState(false);
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: "Amoxicillin",
      category: "Antibiotic",
      dosage: "500mg - 2x Daily",
      duration: "7 Days",
      color: "blue"
    },
    {
      id: 2,
      name: "Paracetamol",
      category: "Analgesic",
      dosage: "500mg - PRN",
      duration: "3 Days",
      color: "amber"
    }
  ]);

  const [newMedication, setNewMedication] = useState({
    name: "",
    category: "",
    dosage: "",
    duration: ""
  });

  const [vitals, setVitals] = useState([
    { id: 1, date: "Oct 12, 2023", time: "09:30 AM", bp: "120/80", hr: 72, temp: 36.6, weight: 68, rr: 16, spo2: 98, recordedBy: "Dr. Sarah Jenkins" },
    { id: 2, date: "Oct 10, 2023", time: "02:15 PM", bp: "118/78", hr: 68, temp: 36.4, weight: 68, rr: 14, spo2: 99, recordedBy: "Nurse Thompson" },
    { id: 3, date: "Oct 5, 2023", time: "11:00 AM", bp: "122/82", hr: 74, temp: 36.7, weight: 68.2, rr: 16, spo2: 97, recordedBy: "Dr. Sarah Jenkins" },
    { id: 4, date: "Sep 28, 2023", time: "10:30 AM", bp: "125/85", hr: 76, temp: 36.8, weight: 68.5, rr: 18, spo2: 96, recordedBy: "Dr. Smith" },
  ]);

  const [showAddVitalsModal, setShowAddVitalsModal] = useState(false);
  const [newVitals, setNewVitals] = useState({
    bp: "",
    hr: "",
    temp: "",
    weight: "",
    rr: "",
    spo2: ""
  });

  const [labResults] = useState([
    { id: 1, test: "Complete Blood Count", date: "Oct 12, 2023", result: "Normal", status: "normal" },
    { id: 2, test: "Rapid Strep Test", date: "Oct 12, 2023", result: "Positive", status: "abnormal" },
    { id: 3, test: "COVID-19 PCR", date: "Oct 10, 2023", result: "Negative", status: "normal" },
    { id: 4, test: "Urinalysis", date: "Sep 28, 2023", result: "Normal", status: "normal" },
  ]);

  const [carePlan] = useState({
    diagnosis: "Upper Respiratory Infection (J06.9)",
    recommendations: [
      "Rest for 48-72 hours",
      "Increase fluid intake (2-3L daily)",
      "Use humidifier for congestion",
      "Avoid strenuous activity"
    ],
    followUp: "7-10 days if symptoms persist",
    referrals: ["ENT Specialist if recurrent"],
    patientEducation: "Warning signs: difficulty breathing, high fever >39°C, chest pain"
  });

  // Get patient data based on ID
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
        {
          id: Date.now(),
          ...newMedication,
          color: randomColor
        }
      ]);
      
      setNewMedication({
        name: "",
        category: "",
        dosage: "",
        duration: ""
      });
      setShowAddMedicationModal(false);
    }
  };

  const handleAddVitals = () => {
    if (newVitals.bp && newVitals.hr && newVitals.temp) {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const formattedTime = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
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
          recordedBy: "Dr. Sarah Jenkins"
        },
        ...vitals
      ]);
      
      setNewVitals({
        bp: "",
        hr: "",
        temp: "",
        weight: "",
        rr: "",
        spo2: ""
      });
      setShowAddVitalsModal(false);
    }
  };

  const handleDeleteMedication = (id: number) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'normal': return 'text-green-600 bg-green-50';
      case 'abnormal': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getVitalStatus = (value: number, type: string) => {
    if (type === 'hr') {
      if (value >= 60 && value <= 100) return 'normal';
      return 'abnormal';
    }
    if (type === 'temp') {
      if (value >= 36.1 && value <= 37.2) return 'normal';
      return 'abnormal';
    }
    if (type === 'spo2') {
      if (value >= 95) return 'normal';
      return 'abnormal';
    }
    return 'normal';
  };

  return (
    <div className="bg-[#f6f7f8] min-h-screen font-[Manrope] text-slate-900 antialiased flex flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-10 py-3 flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-slate-900">
            <div className="w-8 h-8 bg-[#137fec] rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">local_hospital</span>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">MediCare Plus</h2>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => router.push('/doctor/dashboard')}
              className="text-slate-500 hover:text-[#137fec] text-sm font-medium leading-normal transition-colors"
            >
              Dashboard
            </button>
            <button className="text-[#137fec] text-sm font-bold leading-normal">
              EHR
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-[#137fec] placeholder:text-slate-400 w-64"
              placeholder="Search patient, ID..."
              type="text"
            />
          </div>
          <div 
            className="w-9 h-9 rounded-full bg-slate-200 bg-center bg-cover border border-slate-300"
            style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBc1ly-7oHgR_cJDzdGEf9kJ6L2HQuxObUC4-h9KYlkQDhfsCPK-E4kIQT44WCSBcODOX-E_q3r29QpuBKo9a77oXBj34wNLGv3rpgeLyG92SV6istRs3r6n5Ve_nKAzYWByl4LqaKseiJ1nWX3R0IkJzfVm6a5vBxwIHtDoQg2jqg8_nKb6vpBTl2xkLfpvW-ekBHNTO7q5yB8CvOg0BqSdIxkwU7dsWN-1QN-RkucV57ssEl_PoUr4wyS5nKXRaw_BSvor77FgEY')`}}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-[1440px] mx-auto w-full px-4 md:px-6 py-6 gap-6">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <button 
            onClick={() => router.push('/doctor/dashboard')}
            className="text-slate-500 hover:text-[#137fec] transition-colors"
          >
            Dashboard
          </button>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium">{patient.name}</span>
        </div>

        {/* Profile Header - Dynamic based on patient */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div className={`w-20 h-20 rounded-full bg-${patient.avatarColor}-600 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-md`}>
              {patient.avatar}
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 leading-tight">{patient.name}</h1>
                <span className={`px-2.5 py-1 rounded-full ${
                  patient.status === 'Critical' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                } text-xs font-bold uppercase tracking-wider border`}>
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
                  <span>{patient.age} Yrs, {patient.gender}</span>
                </span>
                {patient.allergies[0] !== "None" && (
                  <>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span className="flex items-center gap-1.5 text-red-600 font-medium">
                      <span className="material-symbols-outlined text-[16px]">warning</span>
                      Allergies: {patient.allergies.join(', ')}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid - Rest of your content remains exactly the same */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start h-full">
          {/* Left Sidebar: Timeline */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
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
                {/* Timeline Container */}
                <div className="grid grid-cols-[24px_1fr] gap-x-4">
                  {/* Current Visit (Active) */}
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
                  
                  {/* Past Visit 1 */}
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-2 h-2 bg-slate-300 rounded-full z-10"></div>
                    <div className="w-[2px] bg-slate-200 h-full -mb-4"></div>
                  </div>
                  <div className="pb-6">
                    <p className="text-slate-900 text-sm font-semibold">Oct 12, 2023</p>
                    <p className="text-slate-500 text-xs">Routine Checkup • Dr. Smith</p>
                  </div>
                  
                  {/* Past Visit 2 */}
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-2 h-2 bg-slate-300 rounded-full z-10"></div>
                    <div className="w-[2px] bg-slate-200 h-full -mb-4"></div>
                  </div>
                  <div className="pb-6">
                    <p className="text-slate-900 text-sm font-semibold">Aug 05, 2023</p>
                    <p className="text-slate-500 text-xs">Teleconsultation • Dr. Adams</p>
                  </div>
                  
                  {/* Past Visit 3 */}
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-2 h-2 bg-slate-300 rounded-full z-10"></div>
                  </div>
                  <div className="pb-2">
                    <p className="text-slate-900 text-sm font-semibold">Feb 10, 2023</p>
                    <p className="text-slate-500 text-xs">Emergency Visit • Dr. Lee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
            {/* Tabbed Container */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[600px] flex flex-col overflow-hidden">
              {/* Tabs */}
              <div className="flex items-center px-6 pt-2 border-b border-slate-200 overflow-x-auto bg-slate-50/50">
                <button 
                  onClick={() => setActiveTab("current-visit")}
                  className={`px-4 py-4 text-sm font-semibold border-b-2 focus:outline-none transition-colors ${
                    activeTab === "current-visit" 
                      ? "text-[#137fec] border-[#137fec] bg-white" 
                      : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-white"
                  }`}
                >
                  Current Visit
                </button>
                <button 
                  onClick={() => setActiveTab("vitals")}
                  className={`px-4 py-4 text-sm font-semibold border-b-2 focus:outline-none transition-colors ${
                    activeTab === "vitals" 
                      ? "text-[#137fec] border-[#137fec] bg-white" 
                      : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-white"
                  }`}
                >
                  Vitals
                </button>
                <button 
                  onClick={() => setActiveTab("prescriptions")}
                  className={`px-4 py-4 text-sm font-semibold border-b-2 focus:outline-none transition-colors ${
                    activeTab === "prescriptions" 
                      ? "text-[#137fec] border-[#137fec] bg-white" 
                      : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-white"
                  }`}
                >
                  Prescriptions
                </button>
                <button 
                  onClick={() => setActiveTab("lab-results")}
                  className={`px-4 py-4 text-sm font-semibold border-b-2 focus:outline-none transition-colors flex items-center gap-2 ${
                    activeTab === "lab-results" 
                      ? "text-[#137fec] border-[#137fec] bg-white" 
                      : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-white"
                  }`}
                >
                  Lab Results <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">1</span>
                </button>
                <button 
                  onClick={() => setActiveTab("care-plan")}
                  className={`px-4 py-4 text-sm font-semibold border-b-2 focus:outline-none transition-colors ${
                    activeTab === "care-plan" 
                      ? "text-[#137fec] border-[#137fec] bg-white" 
                      : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-white"
                  }`}
                >
                  Care Plan
                </button>
              </div>

              {/* Content Body - Keep all your existing tab content exactly as is */}
              <div className="p-6 md:p-8 flex-1 flex flex-col gap-8">
                {activeTab === "current-visit" && (
                  <>
                    {/* Diagnosis Section */}
                    <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[#137fec]">clinical_notes</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">Assessment & Diagnosis</h3>
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
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
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
                          <h3 className="text-lg font-bold text-slate-900">Follow-up & Instructions</h3>
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
                  </>
                )}

                {activeTab === "vitals" && (
                  <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#137fec]">monitor_heart</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">Patient Vitals</h3>
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
                                <p className="font-semibold text-slate-900">{vital.date} at {vital.time}</p>
                                <p className="text-xs text-slate-500">Recorded by {vital.recordedBy}</p>
                              </div>
                            </div>
                            <span className={`text-xs font-medium px-3 py-1.5 rounded-full w-fit ${
                              vital.bp === "120/80" ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                            }`}>
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
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                  getVitalStatus(vital.hr, 'hr') === 'normal' 
                                    ? 'bg-green-50 text-green-600' 
                                    : 'bg-red-50 text-red-600'
                                }`}>
                                  {getVitalStatus(vital.hr, 'hr') === 'normal' ? 'Normal' : 'High'}
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
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                  getVitalStatus(vital.temp, 'temp') === 'normal' 
                                    ? 'bg-green-50 text-green-600' 
                                    : 'bg-red-50 text-red-600'
                                }`}>
                                  {getVitalStatus(vital.temp, 'temp') === 'normal' ? 'Normal' : 'Fever'}
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
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                  getVitalStatus(vital.spo2, 'spo2') === 'normal' 
                                    ? 'bg-green-50 text-green-600' 
                                    : 'bg-red-50 text-red-600'
                                }`}>
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
                )}

                {activeTab === "prescriptions" && (
                  <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#137fec]">pill</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">Prescribed Medications</h3>
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
                )}

                {activeTab === "lab-results" && (
                  <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#137fec]">lab_research</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Laboratory Results</h3>
                        <p className="text-xs text-slate-500">Recent test results and trends</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {labResults.map((result) => (
                        <div key={result.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-lg hover:shadow-sm transition">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${result.status === 'normal' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <div>
                              <p className="font-semibold text-slate-900">{result.test}</p>
                              <p className="text-xs text-slate-500">{result.date}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                            {result.result}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <button className="mt-4 text-[#137fec] text-sm font-semibold hover:underline flex items-center gap-1">
                      View All Results
                      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </section>
                )}

                {activeTab === "care-plan" && (
                  <section className="bg-gradient-to-br from-white to-slate-50 p-5 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#137fec]">assignment</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">Care Plan</h3>
                        <p className="text-xs text-slate-500">Treatment plan and patient guidance</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-4 rounded-lg border border-slate-100">
                        <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-blue-500">diagnosis</span>
                          Primary Diagnosis
                        </p>
                        <p className="text-slate-900 font-medium">{carePlan.diagnosis}</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-slate-100">
                        <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-blue-500">followup</span>
                          Follow-up
                        </p>
                        <p className="text-slate-900 font-medium">{carePlan.followUp}</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-slate-100 md:col-span-2">
                        <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-blue-500">checklist</span>
                          Recommendations
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                          {carePlan.recommendations.map((rec, index) => (
                            <li key={index} className="text-slate-900 text-sm">{rec}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-slate-100">
                        <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-blue-500">referral</span>
                          Referrals
                        </p>
                        <p className="text-slate-900 text-sm">{carePlan.referrals.join(', ')}</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-lg border border-slate-100">
                        <p className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-blue-500">info</span>
                          Patient Education
                        </p>
                        <p className="text-slate-900 text-sm">{carePlan.patientEducation}</p>
                      </div>
                    </div>
                    
                    <button className="mt-6 text-white bg-gradient-to-r from-[#137fec] to-blue-600 text-sm font-bold px-6 py-3 rounded-lg hover:shadow-md transition-all flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                      Update Care Plan
                    </button>
                  </section>
                )}
              </div>

              {/* Footer Actions */}
              <div className="bg-gradient-to-r from-slate-50 to-white p-6 border-t border-slate-200 rounded-b-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-blue-500 text-[18px]">lock_clock</span>
                    </div>
                    <div>
                      <p className="font-medium">Consultation in progress</p>
                      <p className="text-xs text-slate-500">Started at 09:30 AM • Duration: 25m</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3 w-full md:w-auto">
                  <button className="h-11 px-5 rounded-lg border border-slate-200 text-slate-700 font-bold text-sm bg-white hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm hover:shadow">
                    <span className="material-symbols-outlined text-[20px]">print</span>
                    Print Record
                  </button>
                  <button className="h-11 px-5 rounded-lg border border-slate-200 text-slate-700 font-bold text-sm bg-white hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm hover:shadow">
                    <span className="material-symbols-outlined text-[20px]">share</span>
                    Share Securely
                  </button>
                  <button className="h-11 px-6 rounded-lg bg-gradient-to-r from-[#137fec] to-blue-600 text-white font-bold text-sm hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200/50 hover:shadow-xl">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                    Finalize & Lock
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Visit History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#137fec] to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-white">history</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Complete Visit History</h2>
                  <p className="text-xs text-slate-500 mt-0.5">All past visits and encounters</p>
                </div>
              </div>
              <button 
                onClick={() => setShowHistoryModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {visitHistory.map((visit, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition bg-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#137fec]">calendar_month</span>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{visit.date}</p>
                          <p className="text-sm text-slate-600">{visit.type}</p>
                          <p className="text-xs text-slate-500 mt-1">{visit.doctor}</p>
                        </div>
                      </div>
                      <div className="md:text-right">
                        <p className="text-sm text-slate-700 font-medium">Diagnosis:</p>
                        <p className="text-sm text-slate-600">{visit.diagnosis}</p>
                        <p className="text-xs text-slate-500 mt-1 max-w-md">{visit.notes}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-5 py-2 bg-[#137fec] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {showAddMedicationModal && (
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
              <button 
                onClick={() => setShowAddMedicationModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
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
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
                  placeholder="e.g. Amoxicillin"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  value={newMedication.category}
                  onChange={(e) => setNewMedication({...newMedication, category: e.target.value})}
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
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
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
                  value={newMedication.duration}
                  onChange={(e) => setNewMedication({...newMedication, duration: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
                  placeholder="e.g. 7 Days"
                />
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddMedicationModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMedication}
                className="px-4 py-2 bg-[#137fec] text-white text-sm font-medium rounded-lg hover:bg-blue-600 flex items-center gap-2 transition shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Medication
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vitals Modal */}
      {showAddVitalsModal && (
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
              <button 
                onClick={() => setShowAddVitalsModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
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
                    value={newVitals.bp}
                    onChange={(e) => setNewVitals({...newVitals, bp: e.target.value})}
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
                    value={newVitals.hr}
                    onChange={(e) => setNewVitals({...newVitals, hr: e.target.value})}
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
                    value={newVitals.temp}
                    onChange={(e) => setNewVitals({...newVitals, temp: e.target.value})}
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
                    value={newVitals.weight}
                    onChange={(e) => setNewVitals({...newVitals, weight: e.target.value})}
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
                    value={newVitals.rr}
                    onChange={(e) => setNewVitals({...newVitals, rr: e.target.value})}
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
                    value={newVitals.spo2}
                    onChange={(e) => setNewVitals({...newVitals, spo2: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-[#137fec]"
                    placeholder="98"
                  />
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddVitalsModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVitals}
                className="px-4 py-2 bg-[#137fec] text-white text-sm font-medium rounded-lg hover:bg-blue-600 flex items-center gap-2 transition shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                Add Vitals
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Material Icons and Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
        rel="stylesheet" 
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
      
      {/* Add Material Icons CSS */}
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      `}</style>
    </div>
  );
}