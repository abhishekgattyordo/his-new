"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDoctor } from "../../layout";
import { ArrowLeft } from "lucide-react";

export default function NewPatientPage() {
  const router = useRouter();
  const { patients, setPatients } = useDoctor();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    condition: "",
    status: "Stable",
    lastVisit: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    else if (parseInt(formData.age) < 0 || parseInt(formData.age) > 120) newErrors.age = "Age must be between 0 and 120";
    if (!formData.condition.trim()) newErrors.condition = "Condition is required";
    if (!formData.lastVisit) newErrors.lastVisit = "Last visit date is required";
    if (formData.phone && !/^\+?[\d\s-]+$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Generate a new ID (simple incremental – in real app this would come from backend)
    const newId = `p${String(patients.length + 1).padStart(3, '0')}`;

    const newPatient = {
      id: newId,
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender as "M" | "F" | "Other",
      condition: formData.condition,
      status: formData.status as "Stable" | "Critical" | "Improving" | "Monitoring",
      lastVisit: formData.lastVisit,
      phone: formData.phone || "(555) 000-0000",
      email: formData.email || "patient@example.com",
    };

    setPatients([...patients, newPatient]);
    router.push("/doctor/patients");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Add New Patient</h2>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.name ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                max="120"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.age ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="54"
              />
              {errors.age && <p className="text-xs text-red-600">{errors.age}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Condition *</label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.condition ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Hypertension"
              />
              {errors.condition && <p className="text-xs text-red-600">{errors.condition}</p>}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Stable">Stable</option>
                <option value="Critical">Critical</option>
                <option value="Improving">Improving</option>
                <option value="Monitoring">Monitoring</option>
              </select>
            </div>

            {/* Last Visit */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Last Visit *</label>
              <input
                type="date"
                name="lastVisit"
                value={formData.lastVisit}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.lastVisit ? "border-red-500" : "border-gray-200"
                }`}
              />
              {errors.lastVisit && <p className="text-xs text-red-600">{errors.lastVisit}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.phone ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="(555) 123-4567"
              />
              {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.email ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}