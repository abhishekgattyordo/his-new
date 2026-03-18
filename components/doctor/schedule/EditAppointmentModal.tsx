"use client";

import React, { useState } from "react";


export interface Appointment {
  id: string;
  time: string;
  patientId?: string;
  name: string;
  age: number;
  gender: string;
  reason: string;
  meta: string;
  type: string;
  status: string;
  statusColor: string;
  action: string;
  icon: React.ReactNode;
  highlight?: boolean;
  notes?: string;
  meetingLink?: string;
}

interface Props {
  appointment: Appointment;
  onSave: (updated: Appointment) => void;
  onClose: () => void;
}

export default function EditAppointmentModal({
  appointment,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState({
    patientName: appointment.name,
    consultationType: appointment.type.toLowerCase().includes("video") ? "video" : "in-person",
    notes: appointment.notes || "",
    status: appointment.status,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...appointment,
      name: form.patientName,
      type: form.consultationType === "video" ? "Video" : "In-Person",
      status: form.status,
      notes: form.notes,
      meetingLink: form.consultationType === "video" ? appointment.meetingLink || "https://meet.jit.si/..." : undefined,
    };
    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Edit Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Patient Name</label>
            <input
              type="text"
              value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Consultation Type</label>
            <select
              value={form.consultationType}
              onChange={(e) => setForm({ ...form, consultationType: e.target.value })}
              className="w-full border rounded-lg p-2"
            >
              <option value="in-person">In-Person</option>
              <option value="video">Video</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border rounded-lg p-2"
            >
              <option value="BOOKED">Booked</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full border rounded-lg p-2"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}