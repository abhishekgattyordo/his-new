'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/admin/Header';
import Sidebar from '@/components/admin/Sidebar';
import {
  ArrowBack,
  Person,
  Upload,
  CheckCircle,
  ErrorOutline,
  Phone,
  Email,
  Badge,
  Work,
  AdminPanelSettings,
  Security,
  Business,
  Home,
  Language,
  Info,
  Close,
  Save
} from '@mui/icons-material';

export default function AdminProfilePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>('/avatars/admin-default.jpg'); // placeholder
  const [formData, setFormData] = useState({
    // Personal
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@hospital.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'System Administrator',
    department: 'IT Administration',
    role: 'Super Admin',
    
    // Bio
    bio: 'Experienced IT administrator with over 10 years in healthcare systems management. Responsible for user access control, system security, and compliance.',
    
    // Permissions (checkboxes)
    permissions: {
      manageUsers: true,
      managePatients: true,
      manageDoctors: true,
      manageAppointments: true,
      manageBilling: false,
      manageReports: true,
      systemSettings: true,
      auditLogs: false
    },
    
    // Address
    address: '123 Admin Tower',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    
    // Security
    twoFactorEnabled: true,
    lastLogin: '2026-02-13 09:30 AM',
    accountStatus: 'active'
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Role options
  const roles = ['Super Admin', 'Admin', 'Manager', 'Auditor'];
  const departments = ['IT Administration', 'HR', 'Finance', 'Operations', 'Compliance'];

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handlePermissionChange = (perm: keyof typeof formData.permissions) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [perm]: !prev.permissions[perm]
      }
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
    setAvatarPreview('/avatars/admin-default.jpg');
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
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.role) newErrors.role = 'Role is required';
    
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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        onClick={toggleSidebar}
      >
        <div className="w-5 h-5 flex flex-col justify-center items-center">
          <div className="w-full h-0.5 bg-gray-600 mb-1" />
          <div className="w-full h-0.5 bg-gray-600 mb-1" />
          <div className="w-full h-0.5 bg-gray-600" />
        </div>
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <main className="flex-1 flex flex-col overflow-y-auto">
        <Header />
        
        <div className="p-4 lg:p-6">
          {/* Back Button and Header */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-[#7e3af2] dark:hover:text-[#9f7aea] transition-colors p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <ArrowBack className="text-lg" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Admin Profile
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                View and manage your administrator account details
              </p>
            </div>
            {/* Edit Toggle */}
            <button
              onClick={toggleEdit}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isEditing
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                  : 'bg-[#7e3af2] text-white hover:bg-[#6c2bd9]'
              }`}
            >
              {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>

          {/* Main Form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Form Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-700 text-white">
                  <AdminPanelSettings className="text-2xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Administrator Information
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Your personal and security details
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Personal & Role Info */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Person className="text-purple-600 dark:text-purple-400" />
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
                                : 'border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20'
                            } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                              !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                            }`}
                            placeholder="Enter first name"
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
                                : 'border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20'
                            } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                              !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                            }`}
                            placeholder="Enter last name"
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
                                  : 'border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20'
                              } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                                !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                              }`}
                              placeholder="admin@hospital.com"
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
                                  : 'border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20'
                              } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                                !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                              }`}
                              placeholder="+1 (555) 123-4567"
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
                      </div>
                    </div>

                    {/* Role & Department */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Work className="text-purple-600 dark:text-purple-400" />
                        Role & Department
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Job Title */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Job Title *
                          </label>
                          <input
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                              errors.jobTitle 
                                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                                : 'border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20'
                            } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                              !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                            }`}
                            placeholder="e.g., System Administrator"
                            readOnly={!isEditing}
                          />
                          {errors.jobTitle && (
                            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <ErrorOutline className="text-xs" />
                              {errors.jobTitle}
                            </p>
                          )}
                        </div>

                        {/* Department */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Department *
                          </label>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                              errors.department 
                                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                                : 'border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20'
                            } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                              !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                            }`}
                          >
                            <option value="">Select department</option>
                            {departments.map(dept => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                          {errors.department && (
                            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <ErrorOutline className="text-xs" />
                              {errors.department}
                            </p>
                          )}
                        </div>

                        {/* Role */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Role *
                          </label>
                          <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2.5 rounded-lg border ${
                              errors.role 
                                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' 
                                : 'border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20'
                            } bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                              !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                            }`}
                          >
                            <option value="">Select role</option>
                            {roles.map(role => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                          {errors.role && (
                            <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                              <ErrorOutline className="text-xs" />
                              {errors.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Biography */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Biography
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        disabled={!isEditing}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors resize-none ${
                          !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                        }`}
                        placeholder="Brief professional biography..."
                        readOnly={!isEditing}
                      />
                    </div>

                    {/* Permissions Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Security className="text-purple-600 dark:text-purple-400" />
                        System Permissions
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(formData.permissions).map(([key, value]) => (
                          <label
                            key={key}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${
                              isEditing
                                ? 'border-slate-300 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 cursor-pointer'
                                : 'border-slate-200 dark:border-slate-800 cursor-default'
                            } transition-colors`}
                          >
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() => isEditing && handlePermissionChange(key as keyof typeof formData.permissions)}
                              disabled={!isEditing}
                              className="w-4 h-4 text-purple-600 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 rounded focus:ring-purple-500"
                            />
                            <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </label>
                        ))}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        * Permissions are assigned by the Super Admin. Some changes may require approval.
                      </p>
                    </div>
                  </div>

                  {/* Right Column - Avatar, Address, Security */}
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
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-800/10 flex items-center justify-center mb-4">
                              <Person className="text-purple-500 dark:text-purple-400 text-3xl" />
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
                            <div className="cursor-pointer py-3 px-4 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors text-sm font-medium text-center">
                              {avatarPreview ? 'Change Photo' : 'Upload Photo'}
                            </div>
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Home className="text-purple-600 dark:text-purple-400" />
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
                            className={`w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                              !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                            }`}
                            placeholder="123 Admin Tower"
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
                              className={`w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                                !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                              }`}
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
                              className={`w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                                !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                              }`}
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
                              className={`w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                                !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                              }`}
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
                              className={`w-full px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:border-[#7e3af2] focus:ring-2 focus:ring-purple-500/20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white transition-colors ${
                                !isEditing && 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed'
                              }`}
                              placeholder="Country"
                              readOnly={!isEditing}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security Info */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <Security className="text-purple-600 dark:text-purple-400" />
                        Security Status
                      </h3>
                      <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Two‑Factor Authentication</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            formData.twoFactorEnabled
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                          }`}>
                            {formData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Last Login</span>
                          <span className="text-sm text-slate-900 dark:text-white">{formData.lastLogin}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600 dark:text-slate-400">Account Status</span>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                            Active
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Contact IT support to change security settings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              {isEditing && (
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900/30">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      <p className="flex items-center gap-2">
                        <CheckCircle className="text-purple-500" />
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
                        className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-700 text-white hover:from-purple-700 hover:to-indigo-800 shadow-lg shadow-purple-500/25 hover:shadow-purple-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm font-medium flex items-center gap-2"
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