

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
  availableSlots: {
    date: string;
    times: string[];
  }[];
};

type FilterType = 'patient' | 'date' | 'doctor' | 'status' | 'type' | 'age' | null;

type SortDirection = 'asc' | 'desc';

export default function HelpDeskPage() {
  const router = useRouter();
  
  // Sidebar state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock data for appointments
  const initialAppointments: Appointment[] = [
    {
      id: "APT001",
      patientName: "John Doe",
      patientId: "PAT1001",
      age: 45,
      gender: "Male",
      appointmentDate: "2024-01-15",
      appointmentTime: "10:00",
      doctorName: "Dr. Sarah Bennett",
      doctorId: "DOC001",
      status: "pending",
      type: "consultation",
      notes: "Follow-up for blood pressure",
    },
    {
      id: "APT002",
      patientName: "Jane Smith",
      patientId: "PAT1002",
      age: 32,
      gender: "Female",
      appointmentDate: "2024-01-15",
      appointmentTime: "11:30",
      doctorName: "Dr. Michael Chen",
      doctorId: "DOC002",
      status: "confirmed",
      type: "checkup",
      notes: "Annual physical examination",
    },
    {
      id: "APT003",
      patientName: "Robert Johnson",
      patientId: "PAT1003",
      age: 58,
      gender: "Male",
      appointmentDate: "2024-01-16",
      appointmentTime: "09:00",
      doctorName: "Dr. Sarah Bennett",
      doctorId: "DOC001",
      status: "pending",
      type: "emergency",
      notes: "Chest pain complaints",
    },
    {
      id: "APT004",
      patientName: "Emily Davis",
      patientId: "PAT1004",
      age: 28,
      gender: "Female",
      appointmentDate: "2024-01-16",
      appointmentTime: "14:00",
      doctorName: "Dr. Michael Chen",
      doctorId: "DOC002",
      status: "completed",
      type: "followup",
      notes: "Diabetes management",
    },
    {
      id: "APT005",
      patientName: "David Wilson",
      patientId: "PAT1005",
      age: 65,
      gender: "Male",
      appointmentDate: "2024-01-17",
      appointmentTime: "15:30",
      doctorName: "Dr. Lisa Park",
      doctorId: "DOC003",
      status: "pending",
      type: "consultation",
      notes: "Knee pain evaluation",
    },
  ];

  // Mock data for doctors
  const doctors: Doctor[] = [
    {
      id: "DOC001",
      name: "Dr. Sarah Bennett",
      specialization: "Cardiology",
      availableSlots: [
        {
          date: "2024-01-15",
          times: ["09:00", "10:00", "11:00", "14:00", "15:00"],
        },
        {
          date: "2024-01-16",
          times: ["09:00", "10:30", "13:00", "14:30"],
        },
        {
          date: "2024-01-17",
          times: ["08:00", "09:30", "11:00", "15:00", "16:00"],
        },
      ],
    },
    {
      id: "DOC002",
      name: "Dr. Michael Chen",
      specialization: "General Medicine",
      availableSlots: [
        {
          date: "2024-01-15",
          times: ["08:30", "10:00", "11:30", "13:00", "14:30", "16:00"],
        },
        {
          date: "2024-01-16",
          times: ["09:00", "10:00", "14:00", "15:30"],
        },
        {
          date: "2024-01-17",
          times: ["08:00", "09:00", "11:00", "13:00", "15:00"],
        },
      ],
    },
    {
      id: "DOC003",
      name: "Dr. Lisa Park",
      specialization: "Orthopedics",
      availableSlots: [
        {
          date: "2024-01-15",
          times: ["10:00", "11:00", "14:00", "15:00"],
        },
        {
          date: "2024-01-16",
          times: ["09:30", "11:00", "13:30", "15:00"],
        },
        {
          date: "2024-01-17",
          times: ["08:30", "10:00", "12:00", "14:00", "16:00"],
        },
      ],
    },
  ];

  // State management
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  
  // Filter dropdown states
  const [expandedSections, setExpandedSections] = useState({
    billNoDate: false,
    patientDetails: false,
    doctor: false,
    status: false,
    type: false
  });

  // Temporary filter states (only applied when Apply button is clicked)
  const [tempFilters, setTempFilters] = useState({
    billSearch: '',
    dateFrom: '',
    dateTo: '',
    dateSort: null as SortDirection | null,
    patientSearch: '',
    patientSort: null as SortDirection | null,
    ageRange: { min: '', max: '' },
    ageSort: null as SortDirection | null,
    doctorSearch: '',
    doctorSort: null as SortDirection | null,
    selectedStatuses: [] as string[],
    selectedTypes: [] as string[]
  });

  // Applied filter states (actual filters being used)
  const [appliedFilters, setAppliedFilters] = useState({
    billSearch: '',
    dateFrom: '',
    dateTo: '',
    dateSort: null as SortDirection | null,
    patientSearch: '',
    patientSort: null as SortDirection | null,
    ageRange: { min: '', max: '' },
    ageSort: null as SortDirection | null,
    doctorSearch: '',
    doctorSort: null as SortDirection | null,
    selectedStatuses: [] as string[],
    selectedTypes: [] as string[]
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Apply filters to appointments
  const getFilteredAppointments = () => {
    let filtered = [...appointments];

    // Patient filter (search)
    if (appliedFilters.patientSearch) {
      filtered = filtered.filter(apt => 
        apt.patientName.toLowerCase().includes(appliedFilters.patientSearch.toLowerCase()) ||
        apt.patientId.toLowerCase().includes(appliedFilters.patientSearch.toLowerCase())
      );
    }

    // Bill search (using patient ID as bill number for demo)
    if (appliedFilters.billSearch) {
      filtered = filtered.filter(apt => 
        apt.patientId.toLowerCase().includes(appliedFilters.billSearch.toLowerCase())
      );
    }

    // Patient sort
    if (appliedFilters.patientSort) {
      filtered.sort((a, b) => {
        const comparison = a.patientName.localeCompare(b.patientName);
        return appliedFilters.patientSort === 'asc' ? comparison : -comparison;
      });
    }

    // Date range filter
    if (appliedFilters.dateFrom) {
      filtered = filtered.filter(apt => apt.appointmentDate >= appliedFilters.dateFrom);
    }
    if (appliedFilters.dateTo) {
      filtered = filtered.filter(apt => apt.appointmentDate <= appliedFilters.dateTo);
    }

    // Date sort
    if (appliedFilters.dateSort) {
      filtered.sort((a, b) => {
        const dateA = new Date(a.appointmentDate + ' ' + a.appointmentTime).getTime();
        const dateB = new Date(b.appointmentDate + ' ' + b.appointmentTime).getTime();
        return appliedFilters.dateSort === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    // Doctor filter (search)
    if (appliedFilters.doctorSearch) {
      filtered = filtered.filter(apt => 
        apt.doctorName.toLowerCase().includes(appliedFilters.doctorSearch.toLowerCase())
      );
    }

    // Doctor sort
    if (appliedFilters.doctorSort) {
      filtered.sort((a, b) => {
        const comparison = a.doctorName.localeCompare(b.doctorName);
        return appliedFilters.doctorSort === 'asc' ? comparison : -comparison;
      });
    }

    // Status filter
    if (appliedFilters.selectedStatuses.length > 0) {
      filtered = filtered.filter(apt => appliedFilters.selectedStatuses.includes(apt.status));
    }

    // Type filter
    if (appliedFilters.selectedTypes.length > 0) {
      filtered = filtered.filter(apt => appliedFilters.selectedTypes.includes(apt.type));
    }

    // Age range filter
    if (appliedFilters.ageRange.min) {
      filtered = filtered.filter(apt => apt.age >= parseInt(appliedFilters.ageRange.min));
    }
    if (appliedFilters.ageRange.max) {
      filtered = filtered.filter(apt => apt.age <= parseInt(appliedFilters.ageRange.max));
    }

    // Age sort
    if (appliedFilters.ageSort) {
      filtered.sort((a, b) => {
        return appliedFilters.ageSort === 'asc' ? a.age - b.age : b.age - a.age;
      });
    }

    return filtered;
  };

  const filteredAppointments = getFilteredAppointments();

  const toggleStatus = (status: string) => {
    setTempFilters(prev => ({
      ...prev,
      selectedStatuses: prev.selectedStatuses.includes(status)
        ? prev.selectedStatuses.filter(s => s !== status)
        : [...prev.selectedStatuses, status]
    }));
  };

  const toggleType = (type: string) => {
    setTempFilters(prev => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(type)
        ? prev.selectedTypes.filter(t => t !== type)
        : [...prev.selectedTypes, type]
    }));
  };

  const clearAllFilters = () => {
    setTempFilters({
      billSearch: '',
      dateFrom: '',
      dateTo: '',
      dateSort: null,
      patientSearch: '',
      patientSort: null,
      ageRange: { min: '', max: '' },
      ageSort: null,
      doctorSearch: '',
      doctorSort: null,
      selectedStatuses: [],
      selectedTypes: []
    });
  };

  const applyFilters = () => {
    setAppliedFilters(tempFilters);
    setShowFilterMenu(false);
    setActiveFilter(null);
    // Reset expanded sections
    setExpandedSections({
      billNoDate: false,
      patientDetails: false,
      doctor: false,
      status: false,
      type: false
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (appliedFilters.billSearch) count++;
    if (appliedFilters.patientSearch || appliedFilters.patientSort) count++;
    if (appliedFilters.dateSort || appliedFilters.dateFrom || appliedFilters.dateTo) count++;
    if (appliedFilters.doctorSearch || appliedFilters.doctorSort) count++;
    if (appliedFilters.selectedStatuses.length > 0) count++;
    if (appliedFilters.selectedTypes.length > 0) count++;
    if (appliedFilters.ageRange.min || appliedFilters.ageRange.max || appliedFilters.ageSort) count++;
    return count;
  };

  // Handle appointment actions
  const confirmAppointment = (id: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "confirmed" } : apt
      )
    );
  };

  const completeAppointment = (id: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "completed" } : apt
      )
    );
  };

  const cancelAppointment = (id: string) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: "cancelled" } : apt
      )
    );
  };

  const handleEditAppointment = (id: string) => {
    const appointment = appointments.find((apt) => apt.id === id);
    if (appointment) {
      setSelectedAppointment(appointment);
      setShowEditModal(true);
    }
  };

  const saveEditedAppointment = () => {
    if (selectedAppointment) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === selectedAppointment.id ? selectedAppointment : apt
        )
      );
      setShowEditModal(false);
      setSelectedAppointment(null);
    }
  };

  const handleCreateAppointment = () => {
    const newId = `APT${String(appointments.length + 1).padStart(3, "0")}`;
    const selectedDoctor = doctors.find((d) => d.id === newAppointment.doctorId);

    const appointment: Appointment = {
      id: newId,
      patientName: newAppointment.patientName,
      patientId: newAppointment.patientId,
      age: parseInt(newAppointment.age),
      gender: newAppointment.gender,
      appointmentDate: newAppointment.appointmentDate,
      appointmentTime: newAppointment.appointmentTime,
      doctorName: selectedDoctor?.name || "",
      doctorId: newAppointment.doctorId,
      status: "pending",
      type: newAppointment.type as any,
      notes: newAppointment.notes,
    };

    setAppointments([...appointments, appointment]);
    setShowCreateModal(false);
    resetNewAppointmentForm();
  };

  const resetNewAppointmentForm = () => {
    setNewAppointment({
      patientName: "",
      patientId: "",
      age: "",
      gender: "Male",
      appointmentDate: "",
      appointmentTime: "",
      doctorId: "",
      type: "consultation",
      notes: "",
    });
  };

  // New appointment form state
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientId: "",
    age: "",
    gender: "Male",
    appointmentDate: "",
    appointmentTime: "",
    doctorId: "",
    type: "consultation",
    notes: "",
  });

  // Get available time slots for a doctor on a specific date
  const getAvailableTimeSlots = (doctorId: string, date: string): string[] => {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (!doctor) return [];

    const slot = doctor.availableSlots.find((s) => s.date === date);
    return slot ? slot.times : [];
  };

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "pending": return "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20";
      case "confirmed": return "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20";
      case "completed": return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20";
      case "cancelled": return "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20";
      default: return "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20";
    }
  };

  const getTypeColor = (type: Appointment["type"]) => {
    switch (type) {
      case "emergency": return "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20";
      case "consultation": return "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20";
      case "checkup": return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20";
      case "followup": return "bg-purple-50 text-purple-700 ring-1 ring-purple-600/20";
      default: return "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20";
    }
  };

  // Calculate filter popup position
  const [filterPosition, setFilterPosition] = useState({ top: 0, right: 0 });

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    setFilterPosition({
      top: rect.bottom + window.scrollY + 8,
      right: window.innerWidth - rect.right - window.scrollX,
    });
    setShowFilterMenu(!showFilterMenu);
  };

  // Navigation handlers
  const handleBillingClick = () => {
    router.push('/helpdesk/billing');
  };

  const handleRoomAvailabilityClick = () => {
    // You can add navigation for room availability if needed
    console.log('Room Availability clicked');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex overflow-hidden">
      {/* Material Icons Link */}
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar Dashboard - Sticky on left */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50
        transform transition-all duration-300 ease-in-out
        ${sidebarCollapsed ? 'w-20' : 'w-72'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white/80 backdrop-blur-sm border-r border-slate-200 flex flex-col shadow-xl
        h-full
      `}>
        {/* Logo and Collapse Button */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center w-full' : ''}`}>
            {!sidebarCollapsed ? (
              <>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 flex-shrink-0">
                  <span className="material-icons text-white text-2xl">medical_services</span>
                </div>
                <div className="overflow-hidden">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent whitespace-nowrap">HELPDESK</h1>
                  <p className="text-xs text-slate-500 mt-0.5 whitespace-nowrap">Reception Management</p>
                </div>
              </>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="material-icons text-white text-2xl">medical_services</span>
              </div>
            )}
          </div>
          
          {/* Collapse Button - Desktop */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden lg:block w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600 flex-shrink-0"
          >
            <span className="material-icons text-sm">
              {sidebarCollapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

 {/* Navigation with Icons - Scrollable */}
<div className="flex-1 overflow-y-auto p-4 space-y-1">
  <div className={`text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 ${sidebarCollapsed ? 'text-center' : ''}`}>
    {!sidebarCollapsed ? 'Dashboard' : '•••'}
  </div>

  {/* Room Availability Button */}
  <button 
    onClick={handleRoomAvailabilityClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 rounded-xl transition-all duration-200 group ${sidebarCollapsed ? 'justify-center' : ''}`}
  >
    <div className="w-8 h-8 bg-slate-100 group-hover:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
      <span className="material-icons text-lg text-slate-600 group-hover:text-blue-600">meeting_room</span>
    </div>
    {!sidebarCollapsed && <span className="font-medium whitespace-nowrap">Room Availability</span>}
  </button>

  {/* Doctor Slots Button */}
  <button 
    onClick={() => router.push('/helpdesk/doctor-slots')}
    className={`w-full flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 rounded-xl transition-all duration-200 group ${sidebarCollapsed ? 'justify-center' : ''}`}
  >
    <div className="w-8 h-8 bg-slate-100 group-hover:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
      <span className="material-icons text-lg text-slate-600 group-hover:text-blue-600">schedule</span>
    </div>
    {!sidebarCollapsed && <span className="font-medium whitespace-nowrap">Doctor Slots</span>}
  </button>

  {/* Billing Button */}
  <button 
    onClick={handleBillingClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 rounded-xl transition-all duration-200 group ${sidebarCollapsed ? 'justify-center' : ''}`}
  >
    <div className="w-8 h-8 bg-slate-100 group-hover:bg-white rounded-lg flex items-center justify-center flex-shrink-0">
      <span className="material-icons text-lg text-slate-600 group-hover:text-blue-600">receipt</span>
    </div>
    {!sidebarCollapsed && <span className="font-medium whitespace-nowrap">Billing</span>}
  </button>
</div>

        {/* Divider with Stats Preview - Hide when collapsed */}
        {!sidebarCollapsed && (
          <div className="px-4 py-6 flex-shrink-0">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="material-icons text-blue-700 text-lg">today</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Today's Schedule</p>
                  <p className="text-sm font-semibold text-slate-800">18 Appointments</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Pending</span>
                  <span className="font-semibold text-amber-600">4</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Confirmed</span>
                  <span className="font-semibold text-blue-600">8</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Completed</span>
                  <span className="font-semibold text-emerald-600">6</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Profile Section */}
        <div className={`p-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white flex-shrink-0 ${sidebarCollapsed ? 'text-center' : ''}`}>
          <div className={`flex items-center gap-3 px-3 py-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 flex-shrink-0">
              <span className="material-icons text-white text-sm">person</span>
            </div>
            {!sidebarCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-slate-800 whitespace-nowrap">Jane Doe</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 whitespace-nowrap">
                  <span className="material-icons text-xs">badge</span>
                  Reception Desk
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto h-full">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4 flex items-center gap-3 sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600"
          >
            <span className="material-icons">menu</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="material-icons text-white text-sm">medical_services</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">HELPDESK</h1>
          </div>
        </div>

        <div className="p-4 lg:p-8">
          {/* Stats Cards - Responsive Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 mb-8">
            {/* Total Expected Card */}
            <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-2 lg:mb-3">
                <span className="material-icons text-amber-700 text-sm lg:text-base">schedule</span>
              </div>
              <p className="text-xs lg:text-sm text-slate-500 mb-1">Total Expected</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl lg:text-3xl font-bold text-slate-800">45</p>
                <span className="text-xs text-slate-500">patients</span>
              </div>
            </div>

            {/* Checked In Card */}
            <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-2 lg:mb-3">
                <span className="material-icons text-blue-700 text-sm lg:text-base">how_to_reg</span>
              </div>
              <p className="text-xs lg:text-sm text-slate-500 mb-1">Checked In</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl lg:text-3xl font-bold text-slate-800">18</p>
                <span className="text-xs text-slate-500">/45</span>
              </div>
              <div className="mt-2 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden hidden lg:block">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            {/* Doctors Available Card */}
            <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-2 lg:mb-3">
                <span className="material-icons text-emerald-700 text-sm lg:text-base">stethoscope</span>
              </div>
              <p className="text-xs lg:text-sm text-slate-500 mb-1">Doctors Available</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl lg:text-3xl font-bold text-slate-800">12</p>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Active now</span>
              </div>
            </div>

            {/* Delayed Card */}
            <div className="bg-white/80 backdrop-blur-sm p-4 lg:p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-rose-100 rounded-xl flex items-center justify-center mb-2 lg:mb-3">
                <span className="material-icons text-rose-700 text-sm lg:text-base">warning</span>
              </div>
              <p className="text-xs lg:text-sm text-slate-500 mb-1">Delayed</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl lg:text-3xl font-bold text-slate-800">3</p>
                <span className="text-xs text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Needs attn.</span>
              </div>
            </div>
          </div>

          {/* Help Desk Section Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl lg:text-2xl font-bold text-slate-800">Help Desk</h1>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">Reception</span>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                <span className="material-icons text-sm">manage_accounts</span>
                Manage appointments and schedules
              </p>
            </div>
            {/* Create New Appointment Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full lg:w-auto px-5 py-2.5 text-blue-600 hover:text-blue-800 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 border border-slate-200 hover:border-blue-200"
            >
              <span className="material-icons">add</span>
              Create New Appointment
            </button>
          </div>

          {/* Appointments Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 lg:p-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-800">Today's Appointments</h2>
              <div>
                <button
                  onClick={handleFilterClick}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all duration-200 flex items-center gap-2"
                >
                  <span className="material-icons text-sm">filter_list</span>
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">PATIENT</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">DATE & TIME</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">DOCTOR</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">TYPE</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">STATUS</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">{appointment.patientName}</p>
                          <p className="text-sm text-slate-500">{appointment.patientId}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-slate-900">
                            {new Date(appointment.appointmentDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                          <p className="text-sm text-slate-500">{appointment.appointmentTime}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-slate-900">{appointment.doctorName}</p>
                          <p className="text-sm text-slate-500">
                            {doctors.find(d => d.id === appointment.doctorId)?.specialization}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getTypeColor(appointment.type)}`}>
                          {appointment.type === 'emergency' && <span className="material-icons text-xs">emergency</span>}
                          {appointment.type === 'consultation' && <span className="material-icons text-xs">chat</span>}
                          {appointment.type === 'checkup' && <span className="material-icons text-xs">health_and_safety</span>}
                          {appointment.type === 'followup' && <span className="material-icons text-xs">autorenew</span>}
                          {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getStatusColor(appointment.status)}`}>
                          {appointment.status === 'pending' && <span className="material-icons text-xs">hourglass_empty</span>}
                          {appointment.status === 'confirmed' && <span className="material-icons text-xs">check_circle</span>}
                          {appointment.status === 'completed' && <span className="material-icons text-xs">task_alt</span>}
                          {appointment.status === 'cancelled' && <span className="material-icons text-xs">cancel</span>}
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {appointment.status === "pending" && (
                            <button
                              onClick={() => confirmAppointment(appointment.id)}
                              className="px-2 py-1.5 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-all duration-200 flex items-center gap-1"
                              title="Confirm"
                            >
                              <span className="material-icons text-lg">check_circle</span>
                            </button>
                          )}
                          {appointment.status === "confirmed" && (
                            <button
                              onClick={() => completeAppointment(appointment.id)}
                              className="px-2 py-1.5 text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-slate-100 transition-all duration-200 flex items-center gap-1"
                              title="Complete"
                            >
                              <span className="material-icons text-lg">task_alt</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleEditAppointment(appointment.id)}
                            className="px-2 py-1.5 text-slate-600 hover:text-amber-600 rounded-lg hover:bg-slate-100 transition-all duration-200 flex items-center gap-1"
                            title="Edit"
                          >
                            <span className="material-icons text-lg">edit</span>
                          </button>
                          <button
                            onClick={() => cancelAppointment(appointment.id)}
                            className="px-2 py-1.5 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-all duration-200 flex items-center gap-1"
                            title="Cancel"
                          >
                            <span className="material-icons text-lg">cancel</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-slate-200">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-slate-800">{appointment.patientName}</p>
                      <p className="text-sm text-slate-500">{appointment.patientId}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                      {appointment.status === 'pending' && <span className="material-icons text-xs">hourglass_empty</span>}
                      {appointment.status === 'confirmed' && <span className="material-icons text-xs">check_circle</span>}
                      {appointment.status === 'completed' && <span className="material-icons text-xs">task_alt</span>}
                      {appointment.status === 'cancelled' && <span className="material-icons text-xs">cancel</span>}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-icons text-sm text-slate-400">calendar_month</span>
                      <span className="text-slate-700">
                        {new Date(appointment.appointmentDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {appointment.appointmentTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="material-icons text-sm text-slate-400">stethoscope</span>
                      <span className="text-slate-700">{appointment.doctorName} • {doctors.find(d => d.id === appointment.doctorId)?.specialization}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getTypeColor(appointment.type)}`}>
                        {appointment.type === 'emergency' && <span className="material-icons text-xs">emergency</span>}
                        {appointment.type === 'consultation' && <span className="material-icons text-xs">chat</span>}
                        {appointment.type === 'checkup' && <span className="material-icons text-xs">health_and_safety</span>}
                        {appointment.type === 'followup' && <span className="material-icons text-xs">autorenew</span>}
                        {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {appointment.status === "pending" && (
                      <button
                        onClick={() => confirmAppointment(appointment.id)}
                        className="px-3 py-2 text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-1"
                        title="Confirm"
                      >
                        <span className="material-icons">check_circle</span>
                      </button>
                    )}
                    {appointment.status === "confirmed" && (
                      <button
                        onClick={() => completeAppointment(appointment.id)}
                        className="px-3 py-2 text-slate-600 hover:text-emerald-600 rounded-lg hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-1"
                        title="Complete"
                      >
                        <span className="material-icons">task_alt</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleEditAppointment(appointment.id)}
                      className="px-3 py-2 text-slate-600 hover:text-amber-600 rounded-lg hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-1"
                      title="Edit"
                    >
                      <span className="material-icons">edit</span>
                    </button>
                    <button
                      onClick={() => cancelAppointment(appointment.id)}
                      className="px-3 py-2 text-slate-600 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-1"
                      title="Cancel"
                    >
                      <span className="material-icons">cancel</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredAppointments.length === 0 && (
              <div className="p-8 lg:p-12 text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-icons text-slate-400 text-3xl lg:text-4xl">event_busy</span>
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-slate-800 mb-1">No appointments found</h3>
                <p className="text-sm text-slate-500">Try adjusting your filters or create a new appointment</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Filter Popup - Positioned outside the appointments div */}
      {showFilterMenu && (
        <>
          {/* Backdrop to close menu when clicking outside */}
          <div 
            className="fixed inset-0 z-[100]"
            onClick={() => {
              setShowFilterMenu(false);
              setActiveFilter(null);
              setExpandedSections({
                billNoDate: false,
                patientDetails: false,
                doctor: false,
                status: false,
                type: false
              });
            }}
          />
          
          {/* Filter popup - Positioned absolutely based on button position */}
          <div 
            className="fixed z-[101] w-80 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            style={{
              top: filterPosition.top,
              right: filterPosition.right,
              maxHeight: 'calc(100vh - 150px)'
            }}
          >
            <div className="p-4 border-b border-slate-100 flex-shrink-0">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <span className="material-icons text-blue-600 text-lg">filter_list</span>
                Filters
              </h3>
            </div>
            
            <div className="p-4 space-y-2 overflow-y-auto flex-1">
              {/* BILL NO & DATE Section */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('billNoDate')}
                  className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <span>BILL NO & DATE</span>
                  <span className="material-icons text-slate-500">
                    {expandedSections.billNoDate ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                
                {expandedSections.billNoDate && (
                  <div className="p-4 space-y-3 bg-white">
                    {/* Search Bill */}
                    <div>
                      <input
                        type="text"
                        value={tempFilters.billSearch}
                        onChange={(e) => setTempFilters({...tempFilters, billSearch: e.target.value})}
                        placeholder="Search Bill..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      />
                    </div>
                    
                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="date"
                          value={tempFilters.dateFrom}
                          onChange={(e) => setTempFilters({...tempFilters, dateFrom: e.target.value})}
                          placeholder="From"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <input
                          type="date"
                          value={tempFilters.dateTo}
                          onChange={(e) => setTempFilters({...tempFilters, dateTo: e.target.value})}
                          placeholder="To"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>
                    </div>
                    
                    {/* Sort by Date */}
                    <div>
                      <p className="text-xs text-slate-500 mb-2">Sort by Date</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setTempFilters({...tempFilters, dateSort: tempFilters.dateSort === 'asc' ? null : 'asc'})}
                          className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-1 ${
                            tempFilters.dateSort === 'asc' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <span className="material-icons text-sm">arrow_upward</span>
                          <span className="text-xs">Asc</span>
                        </button>
                        <button
                          onClick={() => setTempFilters({...tempFilters, dateSort: tempFilters.dateSort === 'desc' ? null : 'desc'})}
                          className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-1 ${
                            tempFilters.dateSort === 'desc' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <span className="material-icons text-sm">arrow_downward</span>
                          <span className="text-xs">Desc</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* PATIENT DETAILS Section */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('patientDetails')}
                  className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <span>PATIENT DETAILS</span>
                  <span className="material-icons text-slate-500">
                    {expandedSections.patientDetails ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                
                {expandedSections.patientDetails && (
                  <div className="p-4 space-y-3 bg-white">
                    {/* Patient Search */}
                    <div>
                      <input
                        type="text"
                        value={tempFilters.patientSearch}
                        onChange={(e) => setTempFilters({...tempFilters, patientSearch: e.target.value})}
                        placeholder="Search Patient..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      />
                    </div>
                    
                    {/* Patient Sort */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTempFilters({...tempFilters, patientSort: tempFilters.patientSort === 'asc' ? null : 'asc'})}
                        className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-1 ${
                          tempFilters.patientSort === 'asc' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="material-icons text-sm">arrow_upward</span>
                        <span className="text-xs">A-Z</span>
                      </button>
                      <button
                        onClick={() => setTempFilters({...tempFilters, patientSort: tempFilters.patientSort === 'desc' ? null : 'desc'})}
                        className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-1 ${
                          tempFilters.patientSort === 'desc' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="material-icons text-sm">arrow_downward</span>
                        <span className="text-xs">Z-A</span>
                      </button>
                    </div>

                    {/* Age Range & Sort */}
                    <div className="space-y-2">
                      <p className="text-xs text-slate-500">Age Range</p>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={tempFilters.ageRange.min}
                          onChange={(e) => setTempFilters({...tempFilters, ageRange: {...tempFilters.ageRange, min: e.target.value}})}
                          placeholder="Min"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                        <input
                          type="number"
                          value={tempFilters.ageRange.max}
                          onChange={(e) => setTempFilters({...tempFilters, ageRange: {...tempFilters.ageRange, max: e.target.value}})}
                          placeholder="Max"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setTempFilters({...tempFilters, ageSort: tempFilters.ageSort === 'asc' ? null : 'asc'})}
                          className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-1 ${
                            tempFilters.ageSort === 'asc' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <span className="material-icons text-sm">arrow_upward</span>
                          <span className="text-xs">Youngest</span>
                        </button>
                        <button
                          onClick={() => setTempFilters({...tempFilters, ageSort: tempFilters.ageSort === 'desc' ? null : 'desc'})}
                          className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-1 ${
                            tempFilters.ageSort === 'desc' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <span className="material-icons text-sm">arrow_downward</span>
                          <span className="text-xs">Oldest</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* DOCTOR Section */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('doctor')}
                  className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <span>DOCTOR</span>
                  <span className="material-icons text-slate-500">
                    {expandedSections.doctor ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                
                {expandedSections.doctor && (
                  <div className="p-4 space-y-3 bg-white">
                    {/* Doctor Search */}
                    <div>
                      <input
                        type="text"
                        value={tempFilters.doctorSearch}
                        onChange={(e) => setTempFilters({...tempFilters, doctorSearch: e.target.value})}
                        placeholder="Search Doctor..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      />
                    </div>
                    
                    {/* Doctor Sort */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTempFilters({...tempFilters, doctorSort: tempFilters.doctorSort === 'asc' ? null : 'asc'})}
                        className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-1 ${
                          tempFilters.doctorSort === 'asc' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="material-icons text-sm">arrow_upward</span>
                        <span className="text-xs">A-Z</span>
                      </button>
                      <button
                        onClick={() => setTempFilters({...tempFilters, doctorSort: tempFilters.doctorSort === 'desc' ? null : 'desc'})}
                        className={`flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-1 ${
                          tempFilters.doctorSort === 'desc' ? 'bg-blue-50 text-blue-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="material-icons text-sm">arrow_downward</span>
                        <span className="text-xs">Z-A</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* STATUS Section */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('status')}
                  className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <span>STATUS</span>
                  <span className="material-icons text-slate-500">
                    {expandedSections.status ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                
                {expandedSections.status && (
                  <div className="p-4 space-y-2 bg-white">
                    {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => toggleStatus(status)}
                        className={`w-full px-4 py-3 rounded-lg flex items-center justify-between ${
                          tempFilters.selectedStatuses.includes(status) ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="capitalize">{status}</span>
                        {tempFilters.selectedStatuses.includes(status) && (
                          <span className="material-icons text-sm">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* TYPE Section */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection('type')}
                  className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <span>TYPE</span>
                  <span className="material-icons text-slate-500">
                    {expandedSections.type ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                
                {expandedSections.type && (
                  <div className="p-4 space-y-2 bg-white">
                    {['checkup', 'consultation', 'followup', 'emergency'].map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`w-full px-4 py-3 rounded-lg flex items-center justify-between ${
                          tempFilters.selectedTypes.includes(type) ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="capitalize">{type}</span>
                        {tempFilters.selectedTypes.includes(type) && (
                          <span className="material-icons text-sm">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons - Clear and Apply Filters */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3 flex-shrink-0">
              <button
                onClick={clearAllFilters}
                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 bg-white/50"
              >
                <span className="material-icons text-sm">clear</span>
                Clear
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
              >
                <span className="material-icons text-sm">check</span>
                Apply Filters
              </button>
            </div>
          </div>
        </>
      )}

      {/* Create Appointment Modal - Responsive */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-4 z-50">
          <div className="bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl w-full lg:max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-4 lg:p-6">
              <div className="flex justify-between items-center mb-4 lg:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="material-icons text-white text-lg lg:text-xl">post_add</span>
                  </div>
                  <div>
                    <h2 className="text-lg lg:text-2xl font-bold text-slate-800">Create New Appointment</h2>
                    <p className="text-xs lg:text-sm text-slate-500">Fill in the patient and appointment details</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="space-y-4 lg:space-y-5">
                {/* Patient Information */}
                <div className="bg-slate-50 p-4 lg:p-5 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3 lg:mb-4 flex items-center gap-2">
                    <span className="material-icons text-sm text-blue-600">person</span>
                    Patient Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Patient Name *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">badge</span>
                        <input
                          type="text"
                          value={newAppointment.patientName}
                          onChange={(e) => setNewAppointment({...newAppointment, patientName: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                          placeholder="Enter patient name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Patient ID *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">qr_code</span>
                        <input
                          type="text"
                          value={newAppointment.patientId}
                          onChange={(e) => setNewAppointment({...newAppointment, patientId: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                          placeholder="Enter patient ID"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Age *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">cake</span>
                          <input
                            type="number"
                            value={newAppointment.age}
                            onChange={(e) => setNewAppointment({...newAppointment, age: e.target.value})}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            placeholder="Age"
                            min="0"
                            max="120"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                          Gender *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">wc</span>
                          <select
                            value={newAppointment.gender}
                            onChange={(e) => setNewAppointment({...newAppointment, gender: e.target.value})}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Appointment Type *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">medical_services</span>
                        <select
                          value={newAppointment.type}
                          onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        >
                          <option value="consultation">Consultation</option>
                          <option value="checkup">Checkup</option>
                          <option value="followup">Follow-up</option>
                          <option value="emergency">Emergency</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="bg-slate-50 p-4 lg:p-5 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3 lg:mb-4 flex items-center gap-2">
                    <span className="material-icons text-sm text-blue-600">event</span>
                    Appointment Details
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Select Doctor *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">stethoscope</span>
                      <select
                        value={newAppointment.doctorId}
                        onChange={(e) => setNewAppointment({...newAppointment, doctorId: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      >
                        <option value="">Select a doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.name} - {doctor.specialization}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Appointment Date *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">calendar_today</span>
                        <input
                          type="date"
                          value={newAppointment.appointmentDate}
                          onChange={(e) => setNewAppointment({...newAppointment, appointmentDate: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Appointment Time *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">schedule</span>
                        {newAppointment.doctorId && newAppointment.appointmentDate ? (
                          <select
                            value={newAppointment.appointmentTime}
                            onChange={(e) => setNewAppointment({...newAppointment, appointmentTime: e.target.value})}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                          >
                            <option value="">Select time slot</option>
                            {getAvailableTimeSlots(newAppointment.doctorId, newAppointment.appointmentDate).map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="time"
                            value={newAppointment.appointmentTime}
                            onChange={(e) => setNewAppointment({...newAppointment, appointmentTime: e.target.value})}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                            disabled={!newAppointment.doctorId || !newAppointment.appointmentDate}
                            placeholder="Select doctor & date first"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-slate-50 p-4 lg:p-5 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3 lg:mb-4 flex items-center gap-2">
                    <span className="material-icons text-sm text-blue-600">note</span>
                    Additional Notes
                  </h3>
                  <div className="relative">
                    <span className="absolute left-3 top-3 material-icons text-slate-400 text-sm">description</span>
                    <textarea
                      value={newAppointment.notes}
                      onChange={(e) => setNewAppointment({...newAppointment, notes: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      rows={3}
                      placeholder="Any additional notes or special requirements..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-end gap-3 mt-6 lg:mt-8 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-full lg:w-auto px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2 bg-white order-2 lg:order-1"
                >
                  <span className="material-icons text-sm">close</span>
                  Cancel
                </button>
                <button
                  onClick={handleCreateAppointment}
                  disabled={!newAppointment.patientName || !newAppointment.patientId || !newAppointment.age || !newAppointment.doctorId || !newAppointment.appointmentDate || !newAppointment.appointmentTime}
                  className="w-full lg:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-indigo-600 order-1 lg:order-2"
                >
                  <span className="material-icons text-sm">add_task</span>
                  Create Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Appointment Modal - Responsive */}
      {showEditModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end lg:items-center justify-center p-0 lg:p-4 z-50">
          <div className="bg-white rounded-t-2xl lg:rounded-2xl shadow-2xl w-full lg:max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-4 lg:p-6">
              <div className="flex justify-between items-center mb-4 lg:mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center">
                    <span className="material-icons text-white text-lg lg:text-xl">edit</span>
                  </div>
                  <div>
                    <h2 className="text-lg lg:text-2xl font-bold text-slate-800">Edit Appointment</h2>
                    <p className="text-xs lg:text-sm text-slate-500">Update appointment details</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="space-y-4 lg:space-y-5">
                {/* Patient Info Display */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 lg:p-5 rounded-xl border border-blue-100">
                  <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="material-icons text-sm text-blue-600">person</span>
                    Patient Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/80 backdrop-blur-sm p-2 lg:p-3 rounded-lg">
                      <p className="text-xs text-slate-500">Patient Name</p>
                      <p className="text-sm lg:text-base font-medium text-slate-800 flex items-center gap-1 truncate">
                        <span className="material-icons text-xs lg:text-sm text-slate-400">badge</span>
                        {selectedAppointment.patientName}
                      </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-2 lg:p-3 rounded-lg">
                      <p className="text-xs text-slate-500">Patient ID</p>
                      <p className="text-sm lg:text-base font-medium text-slate-800 flex items-center gap-1 truncate">
                        <span className="material-icons text-xs lg:text-sm text-slate-400">qr_code</span>
                        {selectedAppointment.patientId}
                      </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-2 lg:p-3 rounded-lg">
                      <p className="text-xs text-slate-500">Age & Gender</p>
                      <p className="text-sm lg:text-base font-medium text-slate-800 flex items-center gap-1">
                        <span className="material-icons text-xs lg:text-sm text-slate-400">cake</span>
                        {selectedAppointment.age}y, {selectedAppointment.gender}
                      </p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-sm p-2 lg:p-3 rounded-lg">
                      <p className="text-xs text-slate-500">Appointment Type</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 mt-1 ${getTypeColor(selectedAppointment.type)}`}>
                        {selectedAppointment.type === 'emergency' && <span className="material-icons text-xs">emergency</span>}
                        {selectedAppointment.type === 'consultation' && <span className="material-icons text-xs">chat</span>}
                        {selectedAppointment.type === 'checkup' && <span className="material-icons text-xs">health_and_safety</span>}
                        {selectedAppointment.type === 'followup' && <span className="material-icons text-xs">autorenew</span>}
                        {selectedAppointment.type.charAt(0).toUpperCase() + selectedAppointment.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="bg-slate-50 p-4 lg:p-5 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3 lg:mb-4 flex items-center gap-2">
                    <span className="material-icons text-sm text-blue-600">event</span>
                    Appointment Schedule
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Appointment Date
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">calendar_today</span>
                        <input
                          type="date"
                          value={selectedAppointment.appointmentDate}
                          onChange={(e) => setSelectedAppointment({...selectedAppointment, appointmentDate: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                        Appointment Time
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">schedule</span>
                        <input
                          type="time"
                          value={selectedAppointment.appointmentTime}
                          onChange={(e) => setSelectedAppointment({...selectedAppointment, appointmentTime: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reassign Doctor */}
                <div className="bg-slate-50 p-4 lg:p-5 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3 lg:mb-4 flex items-center gap-2">
                    <span className="material-icons text-sm text-blue-600">stethoscope</span>
                    Reassign Doctor
                  </h3>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">stethoscope</span>
                    <select
                      value={selectedAppointment.doctorId}
                      onChange={(e) => {
                        const newDoctor = doctors.find(d => d.id === e.target.value);
                        if (newDoctor) {
                          setSelectedAppointment({
                            ...selectedAppointment,
                            doctorId: newDoctor.id,
                            doctorName: newDoctor.name
                          });
                        }
                      }}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    >
                      {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <span className="material-icons text-xs">info</span>
                    Current: {selectedAppointment.doctorName} - {doctors.find(d => d.id === selectedAppointment.doctorId)?.specialization}
                  </p>
                </div>

                {/* Status Update */}
                <div className="bg-slate-50 p-4 lg:p-5 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3 lg:mb-4 flex items-center gap-2">
                    <span className="material-icons text-sm text-blue-600">update</span>
                    Update Status
                  </h3>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons text-slate-400 text-sm">schedule</span>
                    <select
                      value={selectedAppointment.status}
                      onChange={(e) => setSelectedAppointment({...selectedAppointment, status: e.target.value as Appointment["status"]})}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedAppointment.status).split(' ')[0]}`}></div>
                    <span className="text-xs text-slate-500">
                      Current status: {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Notes */}
                <div className="bg-slate-50 p-4 lg:p-5 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-3 lg:mb-4 flex items-center gap-2">
                    <span className="material-icons text-sm text-blue-600">note</span>
                    Notes
                  </h3>
                  <div className="relative">
                    <span className="absolute left-3 top-3 material-icons text-slate-400 text-sm">description</span>
                    <textarea
                      value={selectedAppointment.notes || ""}
                      onChange={(e) => setSelectedAppointment({...selectedAppointment, notes: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                      rows={3}
                      placeholder="Add or update notes..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row justify-between items-center gap-3 mt-6 lg:mt-8 pt-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    cancelAppointment(selectedAppointment.id);
                    setShowEditModal(false);
                  }}
                  className="w-full lg:w-auto px-5 py-2.5 bg-rose-50 text-rose-700 rounded-xl hover:bg-rose-100 transition-all duration-200 flex items-center justify-center gap-2 order-3 lg:order-1"
                >
                  <span className="material-icons text-sm">cancel</span>
                  Cancel Appointment
                </button>
                <div className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto order-2">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="w-full lg:w-auto px-5 py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2 bg-white"
                  >
                    <span className="material-icons text-sm">close</span>
                    Close
                  </button>
                  <button
                    onClick={saveEditedAppointment}
                    className="w-full lg:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                  >
                    <span className="material-icons text-sm">save</span>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}