"use client";

import React from "react";

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
  onConfirm: (appointment: Appointment) => void;
  onClose: () => void;
}

export default function ConfirmCancelModal({
  appointment,
  onConfirm,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Cancel Appointment</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to cancel the appointment for {appointment.name} at {appointment.time}?
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            No
          </button>
          <button onClick={() => onConfirm(appointment)} className="px-4 py-2 bg-red-600 text-white rounded-lg">
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}