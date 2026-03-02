'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/patient/Sidebar';
import Header from '@/components/patient/Header';
import {
  ArrowBack,
  Person,
  Upload,
  CheckCircle,
  ErrorOutline,
  Phone,
  Email,
  CalendarToday,
  Badge,
  Home,
  Wc,
  Bloodtype,
  LocalHospital,
  ContactEmergency,
  Info,
  Close,
  Save,
  Medication,
  Healing,
  NoteAdd
} from '@mui/icons-material';
import { Menu, X } from 'lucide-react';

export default function PatientProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>('/avatars/patient-default.jpg');
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Mock patient data
  const [formData, setFormData] = useState({
    // Personal
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.r@example.com',
    phone: '+1 (555) 987-6543',
    dateOfBirth: '1985-06-15',
    gender: 'Female',
    bloodGroup: 'O+',
    
    // Medical
    primaryPhysician: 'Dr. Sarah Jenkins (Cardiology)',
    medicalConditions: ['Hypertension', 'Type 2 Diabetes'],
    allergies: ['Penicillin', 'Peanuts'],
    currentMedications: ['Lisinopril 10mg', 'Metformin 500mg'],
    
    // Emergency Contact
    emergencyName: 'David Rodriguez',
    emergencyRelation: 'Spouse',
    emergencyPhone: '+1 (555) 123-4567',
    
    // Address
    address: '456 Oak Avenue',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA',
    
    // Insurance
    insuranceProvider: 'Blue Cross Blue Shield',
    insurancePolicyNumber: 'BCS-87654321',
    insuranceGroupNumber: 'GRP-7890',
    
    // Account
    memberSince: '2023-02-10',
    lastVisit: '2026-02-10',
    status: 'active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Options
  const genders = ['Male', 'Female', 'Other'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Dynamic list handlers
  const addListItem = (field: 'medicalConditions' | 'allergies' | 'currentMedications') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const updateListItem = (field: 'medicalConditions' | 'allergies' | 'currentMedications', index: number, value: string) => {
    setFormData(prev => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const removeListItem = (field: 'medicalConditions' | 'allergies' | 'currentMedications', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview('/avatars/patient-default.jpg');
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Profile updated:', formData);
      setIsSubmitting(false);
      setIsEditing(false);
      alert('Profile updated successfully!');
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-display antialiased">
      
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
    
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    
        {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
     

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Back Button and Header */}
          <div className="flex items-center gap-4 mb-6">
          
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                My Profile
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                View and manage your personal and medical information
              </p>
            </div>
            {/* Edit Toggle */}
            <button
              onClick={toggleEdit}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isEditing
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>

          {/* Main Profile Form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Form Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 text-white">
                  <Person className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Patient Information
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Your personal and medical details – keep them up to date
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* LEFT COLUMN - Personal & Medical */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Badge className="text-green-600 dark:text-green-400" />
                        Personal Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                              errors.firstName 
                                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                                : 'border-slate-300 dark:border-slate-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                            } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                              !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                            }`}
                            placeholder="First name"
                            readOnly={!isEditing}
                          />
                          {errors.firstName && (
                            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <ErrorOutline className="text-xs" />
                              {errors.firstName}
                            </p>
                          )}
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                              errors.lastName 
                                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                                : 'border-slate-300 dark:border-slate-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                            } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                              !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                            }`}
                            placeholder="Last name"
                            readOnly={!isEditing}
                          />
                          {errors.lastName && (
                            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <ErrorOutline className="text-xs" />
                              {errors.lastName}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Email className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                                errors.email 
                                  ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                                  : 'border-slate-300 dark:border-slate-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                              } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                                !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                              }`}
                              placeholder="patient@example.com"
                              readOnly={!isEditing}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <ErrorOutline className="text-xs" />
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                                errors.phone 
                                  ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                                  : 'border-slate-300 dark:border-slate-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                              } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                                !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                              }`}
                              placeholder="+1 (555) 987-6543"
                              readOnly={!isEditing}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <ErrorOutline className="text-xs" />
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Date of Birth *
                          </label>
                          <div className="relative">
                            <CalendarToday className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                                errors.dateOfBirth 
                                  ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                                  : 'border-slate-300 dark:border-slate-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                              } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                                !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                              }`}
                              readOnly={!isEditing}
                            />
                          </div>
                          {errors.dateOfBirth && (
                            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <ErrorOutline className="text-xs" />
                              {errors.dateOfBirth}
                            </p>
                          )}
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Gender *
                          </label>
                          <div className="relative">
                            <Wc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <select
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border appearance-none ${
                                errors.gender 
                                  ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                                  : 'border-slate-300 dark:border-slate-700 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                              } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                                !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                              }`}
                            >
                              <option value="">Select gender</option>
                              {genders.map(g => (
                                <option key={g} value={g}>{g}</option>
                              ))}
                            </select>
                          </div>
                          {errors.gender && (
                            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <ErrorOutline className="text-xs" />
                              {errors.gender}
                            </p>
                          )}
                        </div>

                        {/* Blood Group */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Blood Group
                          </label>
                          <div className="relative">
                            <Bloodtype className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <select
                              name="bloodGroup"
                              value={formData.bloodGroup}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors appearance-none disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                            >
                              <option value="">Select blood group</option>
                              {bloodGroups.map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medical Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <LocalHospital className="text-green-600 dark:text-green-400" />
                        Medical Information
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Primary Care Physician (read-only) */}
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Primary Care Physician
                          </label>
                          <div className="relative">
                            <Healing className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              name="primaryPhysician"
                              value={formData.primaryPhysician}
                              disabled
                              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white cursor-not-allowed"
                              readOnly
                            />
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            To change your primary doctor, please contact the clinic.
                          </p>
                        </div>
                      </div>

                      {/* Medical Conditions */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Medical Conditions
                          </label>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => addListItem('medicalConditions')}
                              className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center gap-1"
                            >
                              <NoteAdd className="text-sm" />
                              Add Condition
                            </button>
                          )}
                        </div>
                        {formData.medicalConditions.map((condition, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={condition}
                              onChange={(e) => isEditing && updateListItem('medicalConditions', index, e.target.value)}
                              disabled={!isEditing}
                              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="e.g., Hypertension"
                              readOnly={!isEditing}
                            />
                            {isEditing && formData.medicalConditions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeListItem('medicalConditions', index)}
                                className="p-2 text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                              >
                                <Close className="text-lg" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Allergies */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Allergies
                          </label>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => addListItem('allergies')}
                              className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center gap-1"
                            >
                              <NoteAdd className="text-sm" />
                              Add Allergy
                            </button>
                          )}
                        </div>
                        {formData.allergies.map((allergy, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={allergy}
                              onChange={(e) => isEditing && updateListItem('allergies', index, e.target.value)}
                              disabled={!isEditing}
                              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="e.g., Penicillin"
                              readOnly={!isEditing}
                            />
                            {isEditing && formData.allergies.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeListItem('allergies', index)}
                                className="p-2 text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                              >
                                <Close className="text-lg" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Current Medications */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Current Medications
                          </label>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => addListItem('currentMedications')}
                              className="text-sm text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center gap-1"
                            >
                              <Medication className="text-sm" />
                              Add Medication
                            </button>
                          )}
                        </div>
                        {formData.currentMedications.map((med, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={med}
                              onChange={(e) => isEditing && updateListItem('currentMedications', index, e.target.value)}
                              disabled={!isEditing}
                              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="e.g., Lisinopril 10mg"
                              readOnly={!isEditing}
                            />
                            {isEditing && formData.currentMedications.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeListItem('currentMedications', index)}
                                className="p-2 text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"
                              >
                                <Close className="text-lg" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT COLUMN - Avatar, Emergency, Address, Insurance */}
                  <div className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Profile Photo
                      </h3>
                      <div className={`border-2 ${
                        avatarPreview ? 'border-slate-200 dark:border-slate-700' : 'border-dashed border-slate-300 dark:border-slate-700'
                      } rounded-2xl p-6 transition-colors`}>
                        {avatarPreview ? (
                          <div className="space-y-4">
                            <div className="relative">
                              <div className="w-32 h-32 mx-auto rounded-full bg-cover bg-center ring-4 ring-white dark:ring-slate-900 shadow-lg"
                                   style={{ backgroundImage: `url(${avatarPreview})` }} />
                              {isEditing && (
                                <button
                                  type="button"
                                  onClick={removeAvatar}
                                  className="absolute top-0 right-1/3 p-1 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
                                >
                                  <Close className="text-sm" />
                                </button>
                              )}
                            </div>
                            <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                              {isEditing ? 'Click to change photo' : ''}
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/10 flex items-center justify-center mb-4">
                              <Person className="text-green-500 dark:text-green-400 text-3xl" />
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                              {isEditing ? 'Upload a profile photo' : 'No photo uploaded'}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-500 mb-4">
                              JPG, PNG up to 2MB
                            </p>
                          </div>
                        )}
                        
                        {isEditing && (
                          <label className="block">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarChange}
                              className="hidden"
                            />
                            <div className="cursor-pointer py-3 px-4 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors text-sm font-medium text-center">
                              {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                            </div>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <ContactEmergency className="text-green-600 dark:text-green-400" />
                        Emergency Contact
                      </h3>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="emergencyName"
                            value={formData.emergencyName}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                            placeholder="Emergency contact name"
                            readOnly={!isEditing}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Relationship
                            </label>
                            <input
                              type="text"
                              name="emergencyRelation"
                              value={formData.emergencyRelation}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="Spouse, Parent..."
                              readOnly={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Phone
                            </label>
                            <input
                              type="tel"
                              name="emergencyPhone"
                              value={formData.emergencyPhone}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="+1 (555) 123-4567"
                              readOnly={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Home className="text-green-600 dark:text-green-400" />
                        Address
                      </h3>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Street Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                            placeholder="123 Main St"
                            readOnly={!isEditing}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="City"
                              readOnly={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              State
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="State"
                              readOnly={!isEditing}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="12345"
                              readOnly={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Country
                            </label>
                            <input
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="Country"
                              readOnly={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Insurance Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Info className="text-green-600 dark:text-green-400" />
                        Insurance Details
                      </h3>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Insurance Provider
                          </label>
                          <input
                            type="text"
                            name="insuranceProvider"
                            value={formData.insuranceProvider}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                            placeholder="e.g., Blue Cross"
                            readOnly={!isEditing}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Policy Number
                            </label>
                            <input
                              type="text"
                              name="insurancePolicyNumber"
                              value={formData.insurancePolicyNumber}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="Policy #"
                              readOnly={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              Group Number
                            </label>
                            <input
                              type="text"
                              name="insuranceGroupNumber"
                              value={formData.insuranceGroupNumber}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:cursor-not-allowed"
                              placeholder="Group #"
                              readOnly={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Summary */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Badge className="text-green-600 dark:text-green-400" />
                        Account Summary
                      </h3>
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Member Since</span>
                          <span className="text-sm text-slate-900 dark:text-white">{formData.memberSince}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Last Visit</span>
                          <span className="text-sm text-slate-900 dark:text-white">{formData.lastVisit}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Status</span>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions (only visible in edit mode) */}
              {isEditing && (
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900/30">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      <p className="flex items-center gap-2">
                        <CheckCircle className="text-green-500" />
                        Your changes will be saved and applied immediately
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={toggleEdit}
                        className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-500/25 hover:shadow-green-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="text-lg" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}