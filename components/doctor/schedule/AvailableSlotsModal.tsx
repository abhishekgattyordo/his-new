"use client";

import React from "react";
import { format } from "date-fns";
import { XCircle } from "lucide-react";

interface Props {
  date: string;
  slots: string[];
  onClose: () => void;
  onBook: (time: string) => void;
}

export default function AvailableSlotsModal({
  date,
  slots,
  onClose,
  onBook,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Available Slot</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          {format(new Date(date), "PPP")}
        </p>
        <div className="space-y-2">
          {slots.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No available slots for this date.
            </p>
          ) : (
            slots.map((time) => (
              <div
                key={time}
                onClick={() => onBook(time)}
                className="p-2 border rounded-lg hover:bg-blue-50 transition cursor-pointer"
              >
                <span className="font-medium">{time}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}