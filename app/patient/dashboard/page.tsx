

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/patient/Sidebar";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

// Define types for appointments from API
interface Appointment {
  id: string;
  date: string;
  time: string;
  type: string;
  status: string;
  notes: string;
  doctor_id: string;
  doctor_name: string;
  doctor_specialty: string;
  doctor_image: string;
  fee: number;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "canceled">("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Patient");
  const router = useRouter();
  

  // Fetch appointments on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        
        if (!user || !user.id) {
          router.push("/login");
          return;
        }
        
        setUserName(user.name || "Patient");
        
        // Use patient_id if available, otherwise fallback to id
        const patientId = user.patient_id || String(user.id);
        await fetchAppointments(patientId);
      } catch (error) {
        console.error("Error in useEffect:", error);
      }
    };
    
    fetchData();
  }, [router]);

  const fetchAppointments = async (patientId: string) => {
    try {
      setLoading(true);
      
      const res = await fetch(`/api/appointments/patient/${patientId}`);
      
      if (!res.ok) {
        console.error("API error:", res.status, res.statusText);
        return;
      }
      
      const data = await res.json();
      
      if (data.success) {
        setAppointments(data.data);
      } else {
        console.log("Failed to fetch appointments:", data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to parse date
  const parseDate = (dateStr: string) => new Date(dateStr);

  // Filter appointments based on activeTab
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = appointments.filter(apt => {
    const aptDate = parseDate(apt.date);
    return apt.status === "BOOKED" && aptDate >= today;
  });

  const past = appointments.filter(apt => {
    const aptDate = parseDate(apt.date);
    return apt.status === "COMPLETED" || aptDate < today;
  });

  const canceled = appointments.filter(apt => apt.status === "CANCELLED");

  // Further filter by consultation type
  const filterByType = (list: Appointment[]) => {
    if (filterType === "All Types") return list;
    return list.filter(apt => apt.type === filterType.toLowerCase());
  };

  const displayedAppointments = (() => {
    switch (activeTab) {
      case "upcoming": return filterByType(upcoming);
      case "past": return filterByType(past);
      case "canceled": return filterByType(canceled);
      default: return [];
    }
  })();

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      time: new Date(dateStr + 'T' + appointments.find(a => a.date === dateStr)?.time).toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      full: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "BOOKED": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "COMPLETED": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "CANCELLED": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "BOOKED": return "Confirmed";
      case "COMPLETED": return "Completed";
      case "CANCELLED": return "Cancelled";
      default: return status;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-display antialiased">
      {/* Tailwind CSS Configuration */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

        :root {
          --font-inter: "Inter", sans-serif;
        }

        body {
          font-family: var(--font-inter);
        }
      `}</style>

      {/* Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed bottom-20 right-6 z-50 p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Welcome, <span className="text-green-600">{userName}</span> 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Here's a quick look at your upcoming and past appointments.
              </p>
            </div>
            <Link href="/doctor-selection">
              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
                <span className="material-icons text-lg">add</span>
                Book New Appointment
              </button>
            </Link>
          </div>

          {/* Service Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                name: "Doctor Consultation",
                icon: "local_hospital",
                path: "/appointments",
              },
              {
                name: "Medical Records",
                icon: "folder",
                path: "/patient/medical-records",
              },
              {
                name: "History",
                icon: "history",
                path: "/patient/admission-summary",
              },
              { name: "Diagnostics", icon: "biotech", path: "/diagnostics" },
            ].map((service) => (
              <div
                key={service.name}
                onClick={() => router.push(service.path)}
                className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-green-200 dark:border-green-900 shadow-sm hover:shadow-md hover:border-green-400 dark:hover:border-green-700 transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <span className="material-icons text-green-600 dark:text-green-400 text-2xl">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {service.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Tabs & Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-green-200 dark:border-green-900 pb-4 mb-8 gap-4">
            <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-xl border border-green-200 dark:border-green-900">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                }`}
              >
                Upcoming ({upcoming.length})
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "past"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                }`}
              >
                Past ({past.length})
              </button>
              <button
                onClick={() => setActiveTab("canceled")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "canceled"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                }`}
              >
                Canceled ({canceled.length})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide mr-1">
                Filter by:
              </span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="form-select bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 py-1.5 pl-3 pr-8"
              >
                <option>All Types</option>
                <option>teleconsultation</option>
                <option>in-person</option>
              </select>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your appointments...</p>
            </div>
          )}

          {/* No Appointments Message */}
          {!loading && displayedAppointments.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              <span className="material-icons text-5xl text-gray-400 mb-3">event_busy</span>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                No {activeTab} appointments
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {activeTab === "upcoming" 
                  ? "You don't have any upcoming appointments."
                  : activeTab === "past"
                  ? "No past appointments found."
                  : "No canceled appointments."}
              </p>
              {activeTab === "upcoming" && (
                <Link href="/doctor-selection">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium">
                    Book an Appointment
                  </button>
                </Link>
              )}
            </div>
          )}

          {/* Appointments Grid */}
          {!loading && displayedAppointments.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
              {displayedAppointments.map((apt) => {
                const formattedDate = formatDate(apt.date);
                
                return (
                  <div
                    key={apt.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-green-200 dark:border-green-900 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 p-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                        {getStatusText(apt.status)}
                      </span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        {apt.doctor_image ? (
                          <div className="relative w-16 h-16">
                            <Image
                              src={apt.doctor_image}
                              alt={apt.doctor_name}
                              fill
                              className="rounded-xl object-cover shadow-sm"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/64";
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                            <span className="material-icons text-3xl">medical_services</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-1">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
                          {apt.doctor_name}
                        </h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {apt.doctor_specialty}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                          <span className="material-icons text-sm">
                            {apt.type === "teleconsultation" ? "videocam" : "location_on"}
                          </span>
                          {apt.type === "teleconsultation" ? "Video Consultation" : "In-Person Visit"}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-black/20 rounded-xl p-3 mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-white/5 rounded-lg text-center min-w-[3rem] border border-gray-100 dark:border-white/5">
                          <span className="block text-xs text-gray-400 uppercase font-bold">
                            {formattedDate.month}
                          </span>
                          <span className="block text-sm font-bold text-gray-800 dark:text-gray-200">
                            {formattedDate.day}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {apt.time}
                          </p>
                          <p className="text-xs text-gray-500">
                            {apt.notes || "Consultation"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      {apt.type === "teleconsultation" && apt.status === "BOOKED" && (
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                          <span className="material-icons text-lg">videocam</span>
                          Join Teleconsult
                        </button>
                      )}
                      {apt.type === "in-person" && apt.status === "BOOKED" && (
                        <>
                          <button className="flex-1 bg-white dark:bg-gray-800 border border-green-600 text-green-700 dark:text-green-400 font-bold py-2.5 px-4 rounded-lg text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors flex items-center justify-center gap-2">
                            <span className="material-icons text-lg">map</span>
                            View Directions
                          </button>
                          <button
                            className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors"
                            title="Reschedule"
                          >
                            <span className="material-icons">edit_calendar</span>
                          </button>
                        </>
                      )}
                      {(apt.status === "COMPLETED" || apt.status === "CANCELLED") && (
                        <Link href={`/ehr/${apt.doctor_id}`} className="flex-1">
                          <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold py-2.5 px-4 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            {apt.status === "COMPLETED" ? "View Summary" : "View Details"}
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Past Appointments Table View */}
          {!loading && past.length > 0 && activeTab === "past" && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                Recent History
              </h2>

              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 dark:bg-black/20 text-gray-500 dark:text-gray-400 border-b border-green-200 dark:border-green-900">
                      <tr>
                        <th className="px-6 py-4 font-medium">Doctor / Facility</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Type</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {past.slice(0, 3).map((apt) => {
                        const formattedDate = formatDate(apt.date);
                        return (
                          <tr key={apt.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {apt.doctor_image ? (
                                  <div className="relative w-10 h-10">
                                    <Image
                                      src={apt.doctor_image}
                                      alt={apt.doctor_name}
                                      fill
                                      className="rounded-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/40";
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                    <span className="material-icons text-xl">medication</span>
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">
                                    {apt.doctor_name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {apt.doctor_specialty}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                              {formattedDate.full}
                            </td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                              {apt.type === "teleconsultation" ? "Teleconsult" : "In-Person"}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(apt.status)}`}>
                                {getStatusText(apt.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Link
                                href={`/ehr/${apt.doctor_id}`}
                                className="text-green-700 dark:text-green-400 hover:underline text-sm font-medium"
                              >
                                View Summary
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {past.length > 3 && (
                  <div className="bg-gray-50 dark:bg-black/20 px-6 py-3 border-t border-green-200 dark:border-green-900 text-center">
                    <button className="text-sm font-medium text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      View All Past Appointments
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}