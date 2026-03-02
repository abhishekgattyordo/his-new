"use client";

import React, { useState } from "react";
import {
  Search,
  Notifications,
  Help,
  DateRange,
  Download,
  Groups,
  TrendingUp,
  TrendingDown,
  LocalHospital,
  Payments,
  Hotel,
  Warning,
  PersonAdd,
  CloudDone,
  Update,
  MoreHoriz,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { Menu, X } from 'lucide-react';

// Types
interface Personnel {
  id: string;
  name: string;
  role: string;
  department: string;
  facility: string;
  registrationDate: string;
  status: "active" | "pending";
  avatar: string;
}

interface Alert {
  id: string;
  type: "warning" | "success" | "info" | "update";
  title: string;
  description: string;
  time: string;
}

interface KPI {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactElement;
  color: string;
  trend: "up" | "down";
  
}

// Sample data
const personnelData: Personnel[] = [
  {
    id: "DOC-92834",
    name: "Dr. Elena Kostic",
    role: "Neurologist",
    department: "NEUROLOGY",
    facility: "Northside Medical Center",
    registrationDate: "Oct 24, 2023",
    status: "active",
    avatar: "EK",
  },
  {
    id: "NUR-82341",
    name: "Marcus Thorne",
    role: "Nurse",
    department: "EMERGENCY",
    facility: "General City Hospital",
    registrationDate: "Oct 23, 2023",
    status: "pending",
    avatar: "MT",
  },
  {
    id: "DOC-10293",
    name: "Dr. Sarah Jenkins",
    role: "Cardiologist",
    department: "CARDIOLOGY",
    facility: "Westside Heart Clinic",
    registrationDate: "Oct 23, 2023",
    status: "active",
    avatar: "SJ",
  },
];

const alertsData: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Capacity Threshold Reached",
    description: "St. Mary's ICU is at 98% occupancy. Rerouting requested.",
    time: "2 MINUTES AGO",
  },
  {
    id: "2",
    type: "success",
    title: "New Doctor Registration",
    description: "Dr. Sarah Jenkins has completed onboarding for Cardiology.",
    time: "45 MINUTES AGO",
  },
  {
    id: "3",
    type: "info",
    title: "Backup Completed",
    description: "Daily system snapshot successfully saved to Secure Vault 3.",
    time: "3 HOURS AGO",
  },
  {
    id: "4",
    type: "update",
    title: "Maintenance Scheduled",
    description: "System-wide update planned for Sunday at 02:00 AM.",
    time: "5 HOURS AGO",
  },
];

// Define icons with className directly in the data
const kpiData: KPI[] = [
  {
    title: "Total Patients",
    value: "12,450",
    change: 5.2,
    icon: <Groups className="w-6 h-6" />,
    color: "blue",
    trend: "up",
  },
  {
    title: "New Registrations",
    value: "342",
    change: 8.3,
    icon: <PersonAdd className="w-6 h-6" />,
    color: "green",
    trend: "up",
  },
  {
    title: "Active Doctors",
    value: "842",
    change: 2.1,
    icon: <LocalHospital className="w-6 h-6" />,
    color: "purple",
    trend: "up",
  },
  {
    title: "Bed Occupancy",
    value: "88%",
    change: -1.2,
    icon: <Hotel className="w-6 h-6" />,
    color: "orange",
    trend: "down",
  },
];

// Chart data
const chartData = [
  { week: "Week 01", admissions: 180 },
  { week: "Week 02", admissions: 100 },
  { week: "Week 03", admissions: 120 },
  { week: "Week 04", admissions: 60 },
  { week: "Week 05", admissions: 80 },
];

export default function HealthcareDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("daily");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400";
      case "pending":
        return "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-400";
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400";
      case "success":
        return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400";
      case "info":
        return "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
      case "update":
        return "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <Warning className="text-base" />;
      case "success":
        return <PersonAdd className="text-base" />;
      case "info":
        return <CloudDone className="text-base" />;
      case "update":
        return <Update className="text-base" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
      {/* Mobile Menu Button */}
   {/* Mobile Menu Button - Bottom Right with modern styling */}
<button
  className="lg:hidden fixed bottom-20 right-6 z-50 p-3 bg-white-600 hover:bg-green-700 text-blue rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
  aria-label="Toggle menu"
>
  {isSidebarOpen ? (
    <X className="w-5 h-5" />
  ) : (
    <Menu className="w-5 h-5" />
  )}
</button>

{/* Sidebar Component - Stays on left */}
<Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

{/* Overlay for mobile sidebar - Kept the same */}
{isSidebarOpen && (
  <div
    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
    onClick={() => setIsSidebarOpen(false)}
  />
)}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header />

        <div className="p-5 lg:p-6 space-y-6">
          {/* Page Header - More compact */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                System Dashboard
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Comprehensive overview of performance across 12 healthcare
                facilities
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors shadow-sm">
                <DateRange className="text-sm" />
                <span>Last 30 Days</span>
              </button>
              <button className="px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/20">
                <Download className="text-sm" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* KPI Stats Section - Compact */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
  {kpiData.map((kpi, index) => (
    <div
      key={index}
      className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          {/* Left content */}
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
              {kpi.title}
            </p>
            <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {kpi.value}
            </p>
          </div>

          {/* Icon - Now using kpi.icon directly since className is already applied */}
          <div
            className={`p-3 rounded-lg ${
              kpi.color === "blue"
                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : kpi.color === "purple"
                  ? "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                  : kpi.color === "green"
                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                    : "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
            }`}
          >
            {kpi.icon}
          </div>
        </div>

        {/* Progress bar only for Bed Occupancy */}
        {kpi.title === "Bed Occupancy" && (
          <div className="space-y-1.5">
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full"
                style={{ width: kpi.value.toString() }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
              <span>0%</span>
              <span>Capacity</span>
              <span>100%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  ))}
</div>

          {/* Patient Growth Chart - Compact */}
          <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-3">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Patient Admission Trends
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                  Weekly admissions across all facilities
                </p>
              </div>
              <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                {["daily", "weekly", "monthly"].map((tab) => (
                  <button
                    key={tab}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      activeTab === tab
                        ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    strokeOpacity={0.3}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 11 }}
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6b7280", fontSize: 11 }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "12px",
                    }}
                    labelStyle={{ fontWeight: 600, color: "#374151" }}
                    formatter={(value) => [`${value} admissions`, "Admissions"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="admissions"
                    stroke="#3b82f6"
                    fill="url(#colorAdmissions)"
                    strokeWidth={2}
                    dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 3 }}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <defs>
                    <linearGradient
                      id="colorAdmissions"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}