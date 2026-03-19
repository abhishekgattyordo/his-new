"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

type Appointment = {
  id: string;
  patientName: string;
  patientId: string;
  age: number;
  gender: string;
  appointmentDate: string;
  appointmentTime: string;
  doctorName: string;
  doctorId: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  type: "checkup" | "consultation" | "followup" | "emergency";
  notes?: string;
};

type Doctor = {
  id: string;
  name: string;
  specialization: string;
};

type Props = {
  appointment: Appointment;
  doctors: Doctor[];
  onClose: () => void;
  onSave: (updated: Appointment) => void;
  onCancelAppointment: (id: string) => void;
  getStatusColor: (status: Appointment["status"]) => string;
  getTypeColor: (type: Appointment["type"]) => string;
};

export default function EditAppointmentModal({
  appointment,
  doctors,
  onClose,
  onSave,
  onCancelAppointment,
  getStatusColor,
  getTypeColor,
}: Props) {
  const [edited, setEdited] = useState(appointment);

  const handleChange = (field: keyof Appointment, value: any) => {
    setEdited({ ...edited, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(edited);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Edit Appointment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Patient Info (read‑only) */}
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <span className="material-icons text-sm text-blue-600">person</span>
              Patient Details
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-slate-500">Name:</span> {edited.patientName}</div>
              <div><span className="text-slate-500">ID:</span> {edited.patientId}</div>
              <div><span className="text-slate-500">Age/Gender:</span> {edited.age}y, {edited.gender}</div>
              <div>
                <span className="text-slate-500">Type:</span>{" "}
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(edited.type)}`}>
                  {edited.type}
                </span>
              </div>
            </div>
          </div>

          {/* Appointment Schedule */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="material-icons text-sm text-blue-600">event</span>
              Appointment Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Date</label>
                <input
                  type="date"
                  value={edited.appointmentDate}
                  onChange={(e) => handleChange("appointmentDate", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Time</label>
                <input
                  type="time"
                  value={edited.appointmentTime}
                  onChange={(e) => handleChange("appointmentTime", e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          {/* Reassign Doctor */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="material-icons text-sm text-blue-600">stethoscope</span>
              Reassign Doctor
            </h3>
            <select
              value={edited.doctorId}
              onChange={(e) => {
                const newDoctor = doctors.find(d => d.id === e.target.value);
                if (newDoctor) {
                  setEdited({ ...edited, doctorId: newDoctor.id, doctorName: newDoctor.name });
                }
              }}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20"
            >
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialization}</option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <span className="material-icons text-xs">info</span>
              Current: {edited.doctorName}
            </p>
          </div>

          {/* Update Status */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="material-icons text-sm text-blue-600">update</span>
              Update Status
            </h3>
            <select
              value={edited.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="flex items-center gap-2 mt-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(edited.status).split(' ')[0]}`}></div>
              <span className="text-xs text-slate-500">Current status: {edited.status}</span>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="material-icons text-sm text-blue-600">note</span>
              Notes
            </h3>
            <textarea
              value={edited.notes || ""}
              onChange={(e) => handleChange("notes", e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                onCancelAppointment(edited.id);
                onClose();
              }}
              className="w-full sm:w-auto px-4 py-2 bg-rose-50 text-rose-700 rounded-lg hover:bg-rose-100"
            >
              Cancel Appointment
            </button>
            <div className="flex gap-2 w-full sm:w-auto">
              <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Close
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}