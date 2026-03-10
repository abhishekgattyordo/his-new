"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { useDoctor } from "../layout";

export default function PatientsPage() {
  const router = useRouter();
  const { patients } = useDoctor();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (patientId: string) => {
    router.push(`/doctor/ehr/${patientId}/current-visit`);
  };

  const handleViewEHRClick = (e: React.MouseEvent, patientId: string) => {
    e.stopPropagation(); // Prevent row click from firing
    router.push(`/doctor/ehr/${patientId}/current-visit`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
        onClick={() => router.push('/doctor/patients/new')}>
          <Plus className="w-4 h-4" />
          Add New Patient
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search patients by name or condition..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Patient</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Age/Gender</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Condition</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Last Visit</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr
                key={patient.id}
                onClick={() => handleRowClick(patient.id)}
                className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {patient.name}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-600">{patient.age} / {patient.gender}</td>
                <td className="p-4 text-sm text-gray-600">{patient.condition}</td>
                <td className="p-4 text-sm text-gray-600">{patient.lastVisit}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    patient.status === 'Critical' ? 'bg-red-100 text-red-600' :
                    patient.status === 'Stable' ? 'bg-green-100 text-green-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {patient.status}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={(e) => handleViewEHRClick(e, patient.id)}
                    className="text-blue-600 text-sm hover:text-blue-800 hover:underline"
                  >
                    View EHR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}