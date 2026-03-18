
"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  Users,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import { useDoctor } from "../layout";

export default function DashboardPage() {
  const { appointments, patients, invoices } = useDoctor();

  const stats = [
    {
      title: "Today's Appointments",
      value: appointments.length.toString(),
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-100"
    },
    {
      title: "Total Patients",
      value: patients.length.toString(),
      icon: <Users className="w-6 h-6 text-green-600" />,
      color: "bg-green-100"
    },
    {
      title: "Pending Payments",
      value: invoices.filter(i => i.status === "Pending").length.toString(),
      icon: <DollarSign className="w-6 h-6 text-orange-600" />,
      color: "bg-orange-100"
    },
    {
      title: "Completed Today",
      value: appointments.filter(a => a.status === "Completed").length.toString(),
      icon: <CheckCircle2 className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-100"
    },
  ];

  const upcomingAppointments = appointments.filter(apt => apt.status !== "Completed").slice(0, 3);

  return (
    <div className="space-y-6">
    
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule Preview */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Today's Schedule</h3>
            <Link href="/doctor/schedule" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>
          <div className="p-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition mb-2">
                <div className="w-16 text-sm font-medium text-gray-600">{apt.time}</div>
                <div className={`w-2 h-2 rounded-full ${
                  apt.status === 'Ready' ? 'bg-green-500' :
                  apt.status === 'Checked-in' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <Link
                    href={`/ehr/${apt.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline cursor-pointer"
                  >
                    {apt.name}
                  </Link>
                  <p className="text-xs text-gray-500">{apt.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Invoices</h3>
            <Link href="/doctor/billing" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>
          <div className="p-4">
            {invoices.slice(0, 3).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{invoice.patientName}</p>
                  <p className="text-xs text-gray-500">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${invoice.amount.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-600' :
                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}