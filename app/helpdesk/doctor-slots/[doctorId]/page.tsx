"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Clock, Plus, Trash2, Loader2 } from "lucide-react";

interface Doctor {
  id: number;
  firstName: string;
  lastName: string;
  specialty: string;
}

interface TimeSlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  duration: number;
}

const DAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export default function ManageDoctorSlotsPage() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.doctorId as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    fetchDoctor();
    fetchAvailability();
  }, [doctorId]);

  const fetchDoctor = async () => {
    try {
      const res = await fetch(`/api/doctors/${doctorId}`);
      const data = await res.json();
      if (data.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      console.error("Error fetching doctor:", error);
    }
  };

  const fetchAvailability = async () => {
    try {
      const res = await fetch(`/api/doctors/${doctorId}/availability`);
      const data = await res.json();
      if (data.success) {
        setSlots(data.data);
      }
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSlot = () => {
    setSlots([...slots, {
      dayOfWeek: 1, // Monday default
      startTime: "09:00",
      endTime: "17:00",
      duration: 30
    }]);
  };

  const updateSlot = (index: number, field: keyof TimeSlot, value: any) => {
    const newSlots = [...slots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setSlots(newSlots);
  };

  const removeSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/doctors/${doctorId}/availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slots })
      });
      
      if (res.ok) {
        router.push('/helpdesk/doctor-slots');
      }
    } catch (error) {
      console.error("Error saving slots:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Manage Slots - Dr. {doctor?.firstName} {doctor?.lastName}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{doctor?.specialty}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Slots
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Schedule</h2>
            <button
              onClick={addSlot}
              className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Slot
            </button>
          </div>

          <div className="space-y-4">
            {slots.map((slot, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <select
                  value={slot.dayOfWeek}
                  onChange={(e) => updateSlot(index, 'dayOfWeek', parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {DAYS.map((day, i) => (
                    <option key={i} value={i}>{day}</option>
                  ))}
                </select>

                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) => updateSlot(index, 'startTime', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <span className="text-gray-500">to</span>

                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) => updateSlot(index, 'endTime', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />

                <select
                  value={slot.duration}
                  onChange={(e) => updateSlot(index, 'duration', parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={15}>15 min</option>
                  <option value={30}>30 min</option>
                  <option value={45}>45 min</option>
                  <option value={60}>60 min</option>
                </select>

                <button
                  onClick={() => removeSlot(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            {slots.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No slots configured. Click "Add Slot" to create availability.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}