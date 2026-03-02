

// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   Calendar,
//   Clock,
//   Video,
//   User,
//   Phone,
//   Mail,
//   Activity,
//   Heart,
//   Thermometer,
//   Droplets,
//   AlertCircle,
//   FileText,
//   Pill,
//   AlertTriangle,
//   ChevronRight,
//   Search,
//   Menu,
//   Bell,
//   ChevronLeft,
//   Plus,
//   Stethoscope,
//   MapPin,
//   CalendarDays,
//   Clock3,
//   UserCircle,
//   FilePlus,
//   X,
//   CheckCircle2,
//   Users,
//   Edit,
//   Save,
//   Trash2,
//   LayoutDashboard,
//   CreditCard,
//   FolderKanban,
//   DollarSign,
//   Receipt,
// } from "lucide-react";

// // Define TypeScript interfaces
// interface Appointment {
//   id: string;
//   time: string;
//   name: string;
//   age: number;
//   gender: string;
//   reason: string;
//   meta: string;
//   type: string;
//   status: string;
//   statusColor: string;
//   action: string;
//   icon: React.ReactNode;
//   highlight?: boolean;
//   notes?: string;
// }

// interface AvailabilityItem {
//   day: string;
//   date: string;
//   slots: string[];
// }

// interface NewAppointmentFormData {
//   patientType: string;
//   patientId: string;
//   firstName: string;
//   lastName: string;
//   dob: string;
//   gender: string;
//   phone: string;
//   email: string;
//   appointmentDate: string;
//   appointmentTime: string;
//   appointmentType: string;
//   reason: string;
//   doctor: string;
//   notes: string;
// }

// interface Patient {
//   id: string;
//   name: string;
//   age: number;
//   gender: string;
//   lastVisit: string;
//   condition: string;
//   status: string;
//   phone: string;
//   email: string;
// }

// interface Invoice {
//   id: string;
//   patientName: string;
//   date: string;
//   amount: number;
//   status: string;
//   method?: string;
// }

// export default function DoctorDashboardPage() {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [activeSection, setActiveSection] = useState("schedule");
//   const [selectedPatientId, setSelectedPatientId] = useState<string>("p002");
//   const [showNewAppointment, setShowNewAppointment] = useState(false);
//   const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

//   // Sample data
//   const [appointments, setAppointments] = useState<Appointment[]>([
//     {
//       id: "p001",
//       time: "09:00 AM",
//       name: "John Doe",
//       age: 54,
//       gender: "M",
//       reason: "Follow-up",
//       meta: "54M • Follow-up",
//       type: "In-Person",
//       status: "Completed",
//       statusColor: "text-green-600 bg-green-50",
//       action: "View Notes",
//       icon: <FileText className="w-3 h-3" />,
//     },
//     {
//       id: "p002",
//       time: "09:30 AM",
//       name: "Jane Smith",
//       age: 32,
//       gender: "F",
//       reason: "Palpitations",
//       meta: "32F • High Risk",
//       type: "In-Person",
//       status: "Ready",
//       statusColor: "text-blue-600 bg-blue-100",
//       action: "Start Visit",
//       icon: <User className="w-3 h-3" />,
//       highlight: true,
//     },
//     {
//       id: "p003",
//       time: "10:00 AM",
//       name: "Michael Brown",
//       age: 45,
//       gender: "M",
//       reason: "Annual physical",
//       meta: "45M • Annual Checkup",
//       type: "In-Person",
//       status: "Checked-in",
//       statusColor: "text-orange-600 bg-orange-50",
//       action: "Start Visit",
//       icon: <User className="w-3 h-3" />,
//     },
//     {
//       id: "p004",
//       time: "10:30 AM",
//       name: "Emily Chen",
//       age: 28,
//       gender: "F",
//       reason: "Consultation",
//       meta: "28F • Consultation",
//       type: "In-Person",
//       status: "Confirmed",
//       statusColor: "text-gray-600 bg-gray-100",
//       action: "Reschedule",
//       icon: <Calendar className="w-3 h-3" />,
//     },
//   ]);

//   const [patients, setPatients] = useState<Patient[]>([
//     { id: "p001", name: "John Doe", age: 54, gender: "M", lastVisit: "Oct 15, 2023", condition: "Hypertension", status: "Stable", phone: "(415) 555-0123", email: "john.doe@email.com" },
//     { id: "p002", name: "Jane Smith", age: 32, gender: "F", lastVisit: "Oct 22, 2023", condition: "Arrhythmia", status: "Critical", phone: "(415) 555-0124", email: "jane.smith@email.com" },
//     { id: "p003", name: "Michael Brown", age: 45, gender: "M", lastVisit: "Oct 10, 2023", condition: "Diabetes Type 2", status: "Stable", phone: "(415) 555-0125", email: "michael.brown@email.com" },
//     { id: "p004", name: "Emily Chen", age: 28, gender: "F", lastVisit: "Oct 18, 2023", condition: "Asthma", status: "Improving", phone: "(415) 555-0126", email: "emily.chen@email.com" },
//     { id: "p005", name: "Robert Wilson", age: 62, gender: "M", lastVisit: "Oct 20, 2023", condition: "Post-MI", status: "Monitoring", phone: "(415) 555-0127", email: "robert.wilson@email.com" },
//   ]);

//   const [invoices, setInvoices] = useState<Invoice[]>([
//     { id: "inv001", patientName: "John Doe", date: "Oct 15, 2023", amount: 150.00, status: "Paid", method: "Insurance" },
//     { id: "inv002", patientName: "Jane Smith", date: "Oct 22, 2023", amount: 275.50, status: "Pending", method: "Credit Card" },
//     { id: "inv003", patientName: "Michael Brown", date: "Oct 10, 2023", amount: 89.99, status: "Paid", method: "Cash" },
//     { id: "inv004", patientName: "Emily Chen", date: "Oct 18, 2023", amount: 199.99, status: "Overdue", method: "Insurance" },
//     { id: "inv005", patientName: "Robert Wilson", date: "Oct 20, 2023", amount: 325.00, status: "Pending", method: "Credit Card" },
//   ]);

//   const handleEditAppointment = (appointment: Appointment) => {
//     setSelectedAppointment(appointment);
//     setShowEditModal(true);
//   };

//   const handleSaveEdit = (updatedAppointment: Appointment) => {
//     setAppointments(appointments.map(apt => 
//       apt.id === updatedAppointment.id ? updatedAppointment : apt
//     ));
//     setShowEditModal(false);
//     setSelectedAppointment(null);
//   };

//   // Navigation items
//   const navItems = [
//     { id: "schedule", label: "Schedule", icon: <Calendar className="w-5 h-5" />, badge: "12" },
//     { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
//     { id: "patients", label: "Patients", icon: <Users className="w-5 h-5" />, badge: patients.length.toString() },
//     { id: "billing", label: "Billing", icon: <CreditCard className="w-5 h-5" />, badge: invoices.filter(i => i.status === "Pending").length.toString() },
//   ];

//   return (
//     <div className="min-h-screen bg-[#f6f7f8] flex font-sans">
//       {/* ================= SIDEBAR ================= */}
//       <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0`}>
//         {/* Collapse Button at Top */}
//         <div className="flex items-center justify-end p-4 border-b border-gray-200">
//           <button
//             onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//             className="p-1.5 hover:bg-gray-100 rounded-lg transition"
//           >
//             {sidebarCollapsed ? (
//               <ChevronRight className="w-4 h-4 text-gray-600" />
//             ) : (
//               <ChevronLeft className="w-4 h-4 text-gray-600" />
//             )}
//           </button>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto py-6">
//           {navItems.map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActiveSection(item.id)}
//               className={`w-full flex items-center px-4 py-3 transition-colors relative ${
//                 activeSection === item.id
//                   ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
//                   : 'text-gray-600 hover:bg-gray-50'
//               } ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}
//             >
//               {item.icon}
//               {!sidebarCollapsed && (
//                 <>
//                   <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
//                   {item.badge && (
//                     <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
//                       {item.badge}
//                     </span>
//                   )}
//                 </>
//               )}
//               {sidebarCollapsed && item.badge && (
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
//               )}
//             </button>
//           ))}
//         </nav>

//         {/* Doctor Info at Bottom */}
//         <div className="border-t border-gray-200 p-4">
//           <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xs">
//               SB
//             </div>
//             {!sidebarCollapsed && (
//               <div className="text-left">
//                 <p className="text-xs font-medium text-gray-900">Dr. Sarah Bennett</p>
//                 <p className="text-xs text-gray-500">Cardiology</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </aside>

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Navigation */}
//         <header className="flex items-center justify-end border-b bg-white px-6 py-3">
//           <div className="flex items-center gap-4">
//             {/* Search */}
//             <div className="relative">
//               <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//               />
//             </div>

//             {/* Notifications */}
//             <button className="relative p-2 hover:bg-gray-100 rounded-lg">
//               <Bell className="w-5 h-5 text-gray-600" />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <main className="flex-1 overflow-y-auto p-6">
//           {activeSection === "schedule" && (
//             <ScheduleContent 
//               appointments={appointments}
//               onEditAppointment={handleEditAppointment}
//               onManageAvailability={() => setShowAvailabilityModal(true)}
//               onNewAppointment={() => setShowNewAppointment(true)}
//             />
//           )}

//           {activeSection === "dashboard" && (
//             <DashboardContent 
//               appointments={appointments}
//               patients={patients}
//               invoices={invoices}
//             />
//           )}

//           {activeSection === "patients" && (
//             <PatientsContent patients={patients} />
//           )}

//           {activeSection === "billing" && (
//             <BillingContent invoices={invoices} />
//           )}
//         </main>
//       </div>

//       {/* Modals */}
//       {showAvailabilityModal && (
//         <ManageAvailabilityModal onClose={() => setShowAvailabilityModal(false)} />
//       )}

//       {showNewAppointment && (
//         <NewAppointmentModal onClose={() => setShowNewAppointment(false)} />
//       )}

//       {showEditModal && selectedAppointment && (
//         <EditAppointmentModal 
//           appointment={selectedAppointment}
//           onSave={handleSaveEdit}
//           onClose={() => {
//             setShowEditModal(false);
//             setSelectedAppointment(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// /* ================= SCHEDULE CONTENT ================= */
// interface ScheduleContentProps {
//   appointments: Appointment[];
//   onEditAppointment: (appointment: Appointment) => void;
//   onManageAvailability: () => void;
//   onNewAppointment: () => void;
// }

// function ScheduleContent({ appointments, onEditAppointment, onManageAvailability, onNewAppointment }: ScheduleContentProps) {
//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <div className="flex items-center gap-2">
//             <Calendar className="w-5 h-5 text-blue-600" />
//             <h1 className="text-2xl font-bold text-gray-800">Daily Schedule</h1>
//           </div>
//           <p className="text-sm text-gray-500 mt-1 ml-7">
//             Today, Oct 24, 2023 · <span className="font-medium text-blue-600">12 appointments</span> remaining
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button 
//             onClick={onManageAvailability}
//             className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-50 transition"
//           >
//             <Clock className="w-4 h-4" />
//             Manage Availability
//           </button>
//           <button 
//             onClick={onNewAppointment}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-blue-600 hover:text-blue-800 border border-gray-300 hover:border-blue-300 transition"
//           >
//             <Plus className="w-4 h-4" />
//             New Appointment
//           </button>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-white border rounded-xl p-5">
//           <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
//             <Users className="w-3 h-3" />
//             TOTAL
//           </p>
//           <p className="text-3xl font-bold mt-1 text-gray-800">15</p>
//         </div>
//         <div className="bg-white border rounded-xl p-5">
//           <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
//             <UserCircle className="w-3 h-3" />
//             WAITING ROOM
//           </p>
//           <p className="text-3xl font-bold mt-1 text-gray-800">3</p>
//           <p className="text-xs text-gray-400 mt-1">2 ready, 1 checked-in</p>
//         </div>
//         <div className="bg-white border rounded-xl p-5">
//           <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
//             <CheckCircle2 className="w-3 h-3" />
//             COMPLETED
//           </p>
//           <p className="text-3xl font-bold mt-1 text-gray-800">8</p>
//           <p className="text-xs text-green-600 mt-1">Today's visits</p>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
//         {/* TABLE HEADER */}
//         <div className="grid grid-cols-12 px-6 py-4 text-xs text-gray-500 font-semibold bg-gray-50 border-b">
//           <div className="col-span-2 flex items-center gap-1 border-r border-gray-200 pr-4">
//             <Clock className="w-3 h-3" /> TIME
//           </div>
//           <div className="col-span-4 flex items-center gap-1 border-r border-gray-200 px-4">
//             <User className="w-3 h-3" /> PATIENT DETAILS
//           </div>
//           <div className="col-span-2 text-center border-r border-gray-200 px-4">TYPE</div>
//           <div className="col-span-2 text-center border-r border-gray-200 px-4">STATUS</div>
//           <div className="col-span-2 text-center">ACTIONS</div>
//         </div>

//         {/* TABLE ROWS - MODIFIED: Patient names are now clickable links */}
//         {appointments.map((appointment) => (
//           <div key={appointment.id} className={`border-b ${appointment.highlight ? 'bg-blue-50' : ''}`}>
//             <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 transition">
//               <div className="col-span-2 text-gray-700 font-medium flex items-center gap-1 border-r border-gray-200 pr-4">
//                 <Clock className="w-3.5 h-3.5 text-gray-400" />
//                 {appointment.time}
//               </div>
//               <div className="col-span-4 border-r border-gray-200 px-4">
//                 <Link 
//                   href={`/ehr/${appointment.id}`}
//                   className="font-bold text-gray-800 hover:text-blue-600 hover:underline cursor-pointer"
//                 >
//                   {appointment.name}
//                 </Link>
//                 <p className="text-sm text-gray-500 mt-0.5">{appointment.meta}</p>
//               </div>
//               <div className="col-span-2 text-center border-r border-gray-200 px-4">
//                 <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit mx-auto bg-gray-100 text-gray-600">
//                   <User className="w-3 h-3" />
//                   {appointment.type}
//                 </span>
//               </div>
//               <div className="col-span-2 text-center border-r border-gray-200 px-4">
//                 <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit mx-auto ${appointment.statusColor}`}>
//                   {appointment.status === 'Ready' && <User className="w-3 h-3" />}
//                   {appointment.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
//                   {appointment.status === 'Checked-in' && <User className="w-3 h-3" />}
//                   {appointment.status === 'Confirmed' && <Calendar className="w-3 h-3" />}
//                   {appointment.status}
//                 </span>
//               </div>
//               <div className="col-span-2 text-center">
//                 <button 
//                   onClick={() => onEditAppointment(appointment)}
//                   className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center justify-center gap-1 mx-auto"
//                 >
//                   <Edit className="w-3 h-3" />
//                   Edit
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}

//         {/* Available Slot Row */}
//         <div className="px-6 py-4 text-gray-400 italic text-sm flex items-center gap-2 border-t border-gray-200">
//           <Clock className="w-4 h-4" />
//           11:00 AM · Available Slot
//           <button 
//             onClick={onNewAppointment}
//             className="ml-auto text-blue-600 font-medium not-italic hover:text-blue-700"
//           >
//             + Book now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= DASHBOARD CONTENT ================= */
// interface DashboardContentProps {
//   appointments: Appointment[];
//   patients: Patient[];
//   invoices: Invoice[];
// }

// function DashboardContent({ appointments, patients, invoices }: DashboardContentProps) {
//   // Stats cards
//   const stats = [
//     { 
//       title: "Today's Appointments", 
//       value: appointments.length.toString(), 
//       icon: <Calendar className="w-6 h-6 text-blue-600" />,
//       color: "bg-blue-100"
//     },
//     { 
//       title: "Total Patients", 
//       value: patients.length.toString(), 
//       icon: <Users className="w-6 h-6 text-green-600" />,
//       color: "bg-green-100"
//     },
//     { 
//       title: "Pending Payments", 
//       value: invoices.filter(i => i.status === "Pending").length.toString(), 
//       icon: <DollarSign className="w-6 h-6 text-orange-600" />,
//       color: "bg-orange-100"
//     },
//     { 
//       title: "Completed Today", 
//       value: appointments.filter(a => a.status === "Completed").length.toString(), 
//       icon: <CheckCircle2 className="w-6 h-6 text-purple-600" />,
//       color: "bg-purple-100"
//     },
//   ];

//   // Upcoming appointments - MODIFIED: Patient names are now clickable links
//   const upcomingAppointments = appointments.filter(apt => apt.status !== "Completed").slice(0, 3);

//   return (
//     <div className="space-y-6">
//       {/* Welcome Banner */}
//       <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
//         <h2 className="text-2xl font-bold mb-2">Welcome back, Dr. Bennett</h2>
//         <p className="text-blue-100">You have {appointments.filter(a => a.status !== "Completed").length} appointments today</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
//             <div className="flex items-center justify-between mb-4">
//               <div className={`p-3 rounded-lg ${stat.color}`}>
//                 {stat.icon}
//               </div>
//             </div>
//             <p className="text-sm text-gray-500">{stat.title}</p>
//             <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Two Column Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Today's Schedule Preview */}
//         <div className="bg-white rounded-xl border border-gray-200">
//           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//             <h3 className="font-semibold text-gray-900">Today's Schedule</h3>
//             <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
//           </div>
//           <div className="p-4">
//             {upcomingAppointments.map((apt) => (
//               <div key={apt.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition mb-2">
//                 <div className="w-16 text-sm font-medium text-gray-600">{apt.time}</div>
//                 <div className={`w-2 h-2 rounded-full ${
//                   apt.status === 'Ready' ? 'bg-green-500' :
//                   apt.status === 'Checked-in' ? 'bg-yellow-500' : 'bg-blue-500'
//                 }`}></div>
//                 <div className="flex-1">
//                   <Link 
//                     href={`/ehr/${apt.id}`}
//                     className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline cursor-pointer"
//                   >
//                     {apt.name}
//                   </Link>
//                   <p className="text-xs text-gray-500">{apt.reason}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Invoices */}
//         <div className="bg-white rounded-xl border border-gray-200">
//           <div className="p-6 border-b border-gray-200 flex items-center justify-between">
//             <h3 className="font-semibold text-gray-900">Recent Invoices</h3>
//             <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
//           </div>
//           <div className="p-4">
//             {invoices.slice(0, 3).map((invoice) => (
//               <div key={invoice.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition mb-2">
//                 <div>
//                   <p className="text-sm font-medium text-gray-900">{invoice.patientName}</p>
//                   <p className="text-xs text-gray-500">{invoice.date}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium text-gray-900">${invoice.amount.toFixed(2)}</p>
//                   <span className={`text-xs px-2 py-1 rounded-full ${
//                     invoice.status === 'Paid' ? 'bg-green-100 text-green-600' :
//                     invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
//                     'bg-red-100 text-red-600'
//                   }`}>
//                     {invoice.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= PATIENTS CONTENT ================= */
// interface PatientsContentProps {
//   patients: Patient[];
// }

// function PatientsContent({ patients }: PatientsContentProps) {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredPatients = patients.filter(p => 
//     p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     p.condition.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
//           <Plus className="w-4 h-4" />
//           Add New Patient
//         </button>
//       </div>

//       {/* Search */}
//       <div className="relative">
//         <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//         <input
//           type="text"
//           placeholder="Search patients by name or condition..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//         />
//       </div>

//       {/* Patients Table - MODIFIED: Patient names are now clickable links */}
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Patient</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Age/Gender</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Condition</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Last Visit</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Status</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPatients.map((patient) => (
//               <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
//                 <td className="p-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                       <span className="text-xs font-medium text-blue-600">
//                         {patient.name.split(' ').map(n => n[0]).join('')}
//                       </span>
//                     </div>
//                     <Link 
//                       href={`/ehr/${patient.id}`}
//                       className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline cursor-pointer"
//                     >
//                       {patient.name}
//                     </Link>
//                   </div>
//                 </td>
//                 <td className="p-4 text-sm text-gray-600">{patient.age} / {patient.gender}</td>
//                 <td className="p-4 text-sm text-gray-600">{patient.condition}</td>
//                 <td className="p-4 text-sm text-gray-600">{patient.lastVisit}</td>
//                 <td className="p-4">
//                   <span className={`px-2 py-1 text-xs rounded-full ${
//                     patient.status === 'Critical' ? 'bg-red-100 text-red-600' :
//                     patient.status === 'Stable' ? 'bg-green-100 text-green-600' :
//                     'bg-yellow-100 text-yellow-600'
//                   }`}>
//                     {patient.status}
//                   </span>
//                 </td>
//                 <td className="p-4">
//                   <Link 
//                     href={`/ehr/${patient.id}`}
//                     className="text-blue-600 text-sm hover:text-blue-800 hover:underline"
//                   >
//                     View EHR
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /* ================= BILLING CONTENT ================= */
// interface BillingContentProps {
//   invoices: Invoice[];
// }

// function BillingContent({ invoices }: BillingContentProps) {
//   const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
//   const pendingAmount = invoices.filter(i => i.status === "Pending").reduce((sum, inv) => sum + inv.amount, 0);
//   const paidAmount = invoices.filter(i => i.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0);

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold text-gray-800">Billing</h2>
//         <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
//           <Plus className="w-4 h-4" />
//           Create Invoice
//         </button>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="bg-white rounded-xl p-6 border border-gray-200">
//           <p className="text-sm text-gray-500 mb-2">Total Revenue</p>
//           <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
//         </div>
//         <div className="bg-white rounded-xl p-6 border border-gray-200">
//           <p className="text-sm text-gray-500 mb-2">Pending Payments</p>
//           <p className="text-2xl font-bold text-orange-600">${pendingAmount.toFixed(2)}</p>
//         </div>
//         <div className="bg-white rounded-xl p-6 border border-gray-200">
//           <p className="text-sm text-gray-500 mb-2">Paid</p>
//           <p className="text-2xl font-bold text-green-600">${paidAmount.toFixed(2)}</p>
//         </div>
//       </div>

//       {/* Invoices Table */}
//       <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50 border-b border-gray-200">
//             <tr>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Invoice ID</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Patient</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Date</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Amount</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Status</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Method</th>
//               <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {invoices.map((invoice) => (
//               <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
//                 <td className="p-4 text-sm font-medium text-gray-900">{invoice.id}</td>
//                 <td className="p-4 text-sm text-gray-600">{invoice.patientName}</td>
//                 <td className="p-4 text-sm text-gray-600">{invoice.date}</td>
//                 <td className="p-4 text-sm font-medium text-gray-900">${invoice.amount.toFixed(2)}</td>
//                 <td className="p-4">
//                   <span className={`px-2 py-1 text-xs rounded-full ${
//                     invoice.status === 'Paid' ? 'bg-green-100 text-green-600' :
//                     invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
//                     'bg-red-100 text-red-600'
//                   }`}>
//                     {invoice.status}
//                   </span>
//                 </td>
//                 <td className="p-4 text-sm text-gray-600">{invoice.method || '-'}</td>
//                 <td className="p-4">
//                   <button className="text-blue-600 text-sm hover:text-blue-800">View</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// /* ================= MANAGE AVAILABILITY MODAL ================= */
// interface ManageAvailabilityModalProps {
//   onClose: () => void;
// }

// function ManageAvailabilityModal({ onClose }: ManageAvailabilityModalProps) {
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [availability, setAvailability] = useState<AvailabilityItem[]>([
//     { day: "Monday", date: "Oct 23", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
//     { day: "Tuesday", date: "Oct 24", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
//     { day: "Wednesday", date: "Oct 25", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
//     { day: "Thursday", date: "Oct 26", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
//     { day: "Friday", date: "Oct 27", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
//     { day: "Saturday", date: "Oct 28", slots: [] },
//     { day: "Sunday", date: "Oct 29", slots: [] },
//   ]);

//   const [editingDay, setEditingDay] = useState<string | null>(null);
//   const [editSlots, setEditSlots] = useState<string>("");

//   const handleEditClick = (day: string, slots: string[]) => {
//     setEditingDay(day);
//     setEditSlots(slots.join(", "));
//   };

//   const handleSaveSlots = (day: string) => {
//     const newSlots = editSlots.split(",").map(s => s.trim()).filter(s => s);
//     setAvailability(availability.map(item => 
//       item.day === day ? { ...item, slots: newSlots } : item
//     ));
//     setEditingDay(null);
//     setEditSlots("");
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
//               <Clock className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-gray-900">Manage Availability</h2>
//               <p className="text-xs text-gray-500">Set your weekly schedule</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>
//         <div className="p-6">
//           <div className="mb-6">
//             <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
//               Select Week
//             </label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
//             />
//           </div>
//           <div className="space-y-4">
//             {availability.map((item) => (
//               <div key={item.day} className="border border-gray-200 rounded-xl p-4">
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 className="font-semibold text-gray-800">{item.day}</h3>
//                       <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.date}</span>
//                     </div>
//                     {editingDay === item.day ? (
//                       <div className="mt-2">
//                         <textarea
//                           value={editSlots}
//                           onChange={(e) => setEditSlots(e.target.value)}
//                           placeholder="Enter time slots (e.g., 09:00, 10:00, 11:00)"
//                           className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
//                           rows={2}
//                         />
//                         <div className="flex gap-2 mt-2">
//                           <button
//                             onClick={() => handleSaveSlots(item.day)}
//                             className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 flex items-center gap-1"
//                           >
//                             <Save className="w-3 h-3" />
//                             Save
//                           </button>
//                           <button
//                             onClick={() => setEditingDay(null)}
//                             className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       </div>
//                     ) : (
//                       <>
//                         {item.slots.length > 0 ? (
//                           <div className="flex flex-wrap gap-2 mt-2">
//                             {item.slots.map((slot) => (
//                               <span key={slot} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
//                                 {slot}
//                               </span>
//                             ))}
//                           </div>
//                         ) : (
//                           <p className="text-sm text-gray-400 italic mt-2">No availability</p>
//                         )}
//                       </>
//                     )}
//                   </div>
//                   {editingDay !== item.day && (
//                     <button
//                       onClick={() => handleEditClick(item.day, item.slots)}
//                       className="p-2 hover:bg-gray-100 rounded-lg"
//                     >
//                       <Edit className="w-4 h-4 text-gray-500" />
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
//           <button onClick={onClose} className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
//             Done
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ================= EDIT APPOINTMENT MODAL ================= */
// interface EditAppointmentModalProps {
//   appointment: Appointment;
//   onSave: (updatedAppointment: Appointment) => void;
//   onClose: () => void;
// }

// function EditAppointmentModal({ appointment, onSave, onClose }: EditAppointmentModalProps) {
//   const [editedAppointment, setEditedAppointment] = useState<Appointment>({ ...appointment });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setEditedAppointment((prev: Appointment) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(editedAppointment);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
//               <Edit className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-gray-900">Edit Appointment</h2>
//               <p className="text-xs text-gray-500">Update appointment details</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="p-6 space-y-5">
//             <div className="bg-slate-50 p-4 rounded-lg border border-gray-200">
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <User className="w-4 h-4 text-blue-600" />
//                 Patient Information
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">Patient Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={editedAppointment.name}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">Patient Meta</label>
//                   <input
//                     type="text"
//                     name="meta"
//                     value={editedAppointment.meta}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="bg-slate-50 p-4 rounded-lg border border-gray-200">
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <Calendar className="w-4 h-4 text-blue-600" />
//                 Appointment Details
//               </h3>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
//                   <input
//                     type="text"
//                     name="time"
//                     value={editedAppointment.time}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
//                   <select
//                     name="type"
//                     value={editedAppointment.type}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
//                   >
//                     <option value="In-Person">In-Person</option>
//                     <option value="Teleconsult">Teleconsult</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
//                   <select
//                     name="status"
//                     value={editedAppointment.status}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
//                   >
//                     <option value="Completed">Completed</option>
//                     <option value="Ready">Ready</option>
//                     <option value="Checked-in">Checked-in</option>
//                     <option value="Confirmed">Confirmed</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 mb-1">Reason</label>
//                   <input
//                     type="text"
//                     name="reason"
//                     value={editedAppointment.reason}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="bg-slate-50 p-4 rounded-lg border border-gray-200">
//               <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
//                 <FileText className="w-4 h-4 text-blue-600" />
//                 Additional Notes
//               </h3>
//               <textarea
//                 name="notes"
//                 value={editedAppointment.notes || ""}
//                 onChange={handleChange}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
//                 placeholder="Add any notes..."
//               />
//             </div>
//           </div>
//           <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
//             <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2">
//               <Save className="w-4 h-4" />
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ================= NEW APPOINTMENT MODAL ================= */
// interface NewAppointmentModalProps {
//   onClose: () => void;
// }

// function NewAppointmentModal({ onClose }: NewAppointmentModalProps) {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState<NewAppointmentFormData>({
//     patientType: "existing",
//     patientId: "",
//     firstName: "",
//     lastName: "",
//     dob: "",
//     gender: "",
//     phone: "",
//     email: "",
//     appointmentDate: "",
//     appointmentTime: "",
//     appointmentType: "inperson",
//     reason: "",
//     doctor: "dr-bennett",
//     notes: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev: NewAppointmentFormData) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Appointment scheduled:", formData);
//     onClose();
//     alert("Appointment scheduled successfully!");
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//         <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
//               <FilePlus className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold text-gray-900">Schedule New Appointment</h2>
//               <p className="text-xs text-gray-500">Fill in the details</p>
//             </div>
//           </div>
//           <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
//             <X className="w-5 h-5 text-gray-500" />
//           </button>
//         </div>

//         <div className="px-6 pt-6 pb-2">
//           <div className="flex items-center">
//             <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 step >= 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
//               }`}>
//                 {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : '1'}
//               </div>
//               <span className="ml-2 text-sm font-medium">Patient</span>
//             </div>
//             <div className={`w-16 h-px mx-2 ${step >= 2 ? 'bg-blue-300' : 'bg-gray-200'}`}></div>
//             <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 step >= 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
//               }`}>
//                 {step > 2 ? <CheckCircle2 className="w-4 h-4" /> : '2'}
//               </div>
//               <span className="ml-2 text-sm font-medium">Appointment</span>
//             </div>
//             <div className={`w-16 h-px mx-2 ${step >= 3 ? 'bg-blue-300' : 'bg-gray-200'}`}></div>
//             <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
//                 step >= 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
//               }`}>
//                 3
//               </div>
//               <span className="ml-2 text-sm font-medium">Confirm</span>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="p-6">
//             {step === 1 && (
//               <div className="space-y-5">
//                 <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4 flex items-start gap-2">
//                   <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
//                   <div>
//                     <p className="text-sm text-blue-700 font-medium">Select patient type</p>
//                     <p className="text-xs text-blue-600">Choose existing or create new</p>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
//                     Patient Type
//                   </label>
//                   <div className="flex gap-4">
//                     <label className={`flex items-center gap-3 p-3 border rounded-lg flex-1 cursor-pointer ${
//                       formData.patientType === "existing" ? "border-blue-500 bg-blue-50" : "border-gray-200"
//                     }`}>
//                       <input
//                         type="radio"
//                         name="patientType"
//                         value="existing"
//                         checked={formData.patientType === "existing"}
//                         onChange={handleChange}
//                         className="w-4 h-4 text-blue-600"
//                       />
//                       <span className="text-sm">Existing patient</span>
//                     </label>
//                     <label className={`flex items-center gap-3 p-3 border rounded-lg flex-1 cursor-pointer ${
//                       formData.patientType === "new" ? "border-blue-500 bg-blue-50" : "border-gray-200"
//                     }`}>
//                       <input
//                         type="radio"
//                         name="patientType"
//                         value="new"
//                         checked={formData.patientType === "new"}
//                         onChange={handleChange}
//                         className="w-4 h-4 text-blue-600"
//                       />
//                       <span className="text-sm">New patient</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             )}
//             {step === 2 && (
//               <div className="space-y-5">
//                 <div className="grid grid-cols-2 gap-5">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Date</label>
//                     <input
//                       type="date"
//                       name="appointmentDate"
//                       value={formData.appointmentDate}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Time</label>
//                     <select
//                       name="appointmentTime"
//                       value={formData.appointmentTime}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
//                       required
//                     >
//                       <option value="">Select time</option>
//                       <option value="09:00">09:00 AM</option>
//                       <option value="09:30">09:30 AM</option>
//                       <option value="10:00">10:00 AM</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Reason</label>
//                   <textarea
//                     name="reason"
//                     value={formData.reason}
//                     onChange={handleChange}
//                     rows={3}
//                     className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
//                     required
//                   />
//                 </div>
//               </div>
//             )}
//             {step === 3 && (
//               <div className="space-y-5">
//                 <div className="bg-green-50 border border-green-200 rounded-lg p-5">
//                   <CheckCircle2 className="w-5 h-5 text-green-600 mb-2" />
//                   <h3 className="text-sm font-medium text-green-800">Ready to schedule</h3>
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-5">
//                   <p className="text-sm">Review the details before confirming</p>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
//             <div>
//               {step > 1 && (
//                 <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 text-sm text-gray-600 flex items-center gap-1">
//                   <ChevronLeft className="w-4 h-4" />
//                   Back
//                 </button>
//               )}
//             </div>
//             <div className="flex gap-3">
//               <button type="button" onClick={onClose} className="px-5 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg">
//                 Cancel
//               </button>
//               {step < 3 ? (
//                 <button type="button" onClick={() => setStep(step + 1)} className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg flex items-center gap-1">
//                   Continue
//                   <ChevronRight className="w-4 h-4" />
//                 </button>
//               ) : (
//                 <button type="submit" className="px-5 py-2 bg-green-600 text-white text-sm rounded-lg">
//                   Confirm
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  User,
  Phone,
  Mail,
  Activity,
  Heart,
  Thermometer,
  Droplets,
  AlertCircle,
  FileText,
  Pill,
  AlertTriangle,
  ChevronRight,
  Search,
  Menu,
  Bell,
  ChevronLeft,
  Plus,
  Stethoscope,
  MapPin,
  CalendarDays,
  Clock3,
  UserCircle,
  FilePlus,
  X,
  CheckCircle2,
  Users,
  Edit,
  Save,
  Trash2,
  LayoutDashboard,
  CreditCard,
  FolderKanban,
  DollarSign,
  Receipt,
} from "lucide-react";

// Define TypeScript interfaces
interface Appointment {
  id: string;
  time: string;
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
}

interface AvailabilityItem {
  day: string;
  date: string;
  slots: string[];
}

interface NewAppointmentFormData {
  patientType: string;
  patientId: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  phone: string;
  email: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
  reason: string;
  doctor: string;
  notes: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  condition: string;
  status: string;
  phone: string;
  email: string;
}

interface Invoice {
  id: string;
  patientName: string;
  date: string;
  amount: number;
  status: string;
  method?: string;
}

export default function DoctorDashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("schedule");
  const [selectedPatientId, setSelectedPatientId] = useState<string>("p002");
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  // Sample data
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "p001",
      time: "09:00 AM",
      name: "John Doe",
      age: 54,
      gender: "M",
      reason: "Follow-up",
      meta: "54M • Follow-up",
      type: "In-Person",
      status: "Completed",
      statusColor: "text-green-600 bg-green-50",
      action: "View Notes",
      icon: <FileText className="w-3 h-3" />,
    },
    {
      id: "p002",
      time: "09:30 AM",
      name: "Jane Smith",
      age: 32,
      gender: "F",
      reason: "Palpitations",
      meta: "32F • High Risk",
      type: "In-Person",
      status: "Ready",
      statusColor: "text-blue-600 bg-blue-100",
      action: "Start Visit",
      icon: <User className="w-3 h-3" />,
      highlight: true,
    },
    {
      id: "p003",
      time: "10:00 AM",
      name: "Michael Brown",
      age: 45,
      gender: "M",
      reason: "Annual physical",
      meta: "45M • Annual Checkup",
      type: "In-Person",
      status: "Checked-in",
      statusColor: "text-orange-600 bg-orange-50",
      action: "Start Visit",
      icon: <User className="w-3 h-3" />,
    },
    {
      id: "p004",
      time: "10:30 AM",
      name: "Emily Chen",
      age: 28,
      gender: "F",
      reason: "Consultation",
      meta: "28F • Consultation",
      type: "In-Person",
      status: "Confirmed",
      statusColor: "text-gray-600 bg-gray-100",
      action: "Reschedule",
      icon: <Calendar className="w-3 h-3" />,
    },
  ]);

  const [patients, setPatients] = useState<Patient[]>([
    { id: "p001", name: "John Doe", age: 54, gender: "M", lastVisit: "Oct 15, 2023", condition: "Hypertension", status: "Stable", phone: "(415) 555-0123", email: "john.doe@email.com" },
    { id: "p002", name: "Jane Smith", age: 32, gender: "F", lastVisit: "Oct 22, 2023", condition: "Arrhythmia", status: "Critical", phone: "(415) 555-0124", email: "jane.smith@email.com" },
    { id: "p003", name: "Michael Brown", age: 45, gender: "M", lastVisit: "Oct 10, 2023", condition: "Diabetes Type 2", status: "Stable", phone: "(415) 555-0125", email: "michael.brown@email.com" },
    { id: "p004", name: "Emily Chen", age: 28, gender: "F", lastVisit: "Oct 18, 2023", condition: "Asthma", status: "Improving", phone: "(415) 555-0126", email: "emily.chen@email.com" },
    { id: "p005", name: "Robert Wilson", age: 62, gender: "M", lastVisit: "Oct 20, 2023", condition: "Post-MI", status: "Monitoring", phone: "(415) 555-0127", email: "robert.wilson@email.com" },
  ]);

  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "inv001", patientName: "John Doe", date: "Oct 15, 2023", amount: 150.00, status: "Paid", method: "Insurance" },
    { id: "inv002", patientName: "Jane Smith", date: "Oct 22, 2023", amount: 275.50, status: "Pending", method: "Credit Card" },
    { id: "inv003", patientName: "Michael Brown", date: "Oct 10, 2023", amount: 89.99, status: "Paid", method: "Cash" },
    { id: "inv004", patientName: "Emily Chen", date: "Oct 18, 2023", amount: 199.99, status: "Overdue", method: "Insurance" },
    { id: "inv005", patientName: "Robert Wilson", date: "Oct 20, 2023", amount: 325.00, status: "Pending", method: "Credit Card" },
  ]);

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowEditModal(true);
  };

  const handleSaveEdit = (updatedAppointment: Appointment) => {
    setAppointments(appointments.map(apt => 
      apt.id === updatedAppointment.id ? updatedAppointment : apt
    ));
    setShowEditModal(false);
    setSelectedAppointment(null);
  };

  // Navigation items
  const navItems = [
    { id: "schedule", label: "Schedule", icon: <Calendar className="w-5 h-5" />, badge: "12" },
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "patients", label: "Patients", icon: <Users className="w-5 h-5" />, badge: patients.length.toString() },
    { id: "billing", label: "Billing", icon: <CreditCard className="w-5 h-5" />, badge: invoices.filter(i => i.status === "Pending").length.toString() },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7f8] flex font-sans">
      {/* ================= SIDEBAR ================= */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0`}>
        {/* Top Section with Doctor Info and Collapse Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {/* Doctor Info - Now on the left */}
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center w-full' : 'gap-2'}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xs flex-shrink-0">
              SB
            </div>
            {!sidebarCollapsed && (
              <div className="text-left overflow-hidden">
                <p className="text-xs font-medium text-gray-900 truncate">Dr. Sarah Bennett</p>
                <p className="text-xs text-gray-500 truncate">Cardiology</p>
              </div>
            )}
          </div>
          
          {/* Collapse Button - Now on the right */}
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
          )}
          
          {/* When sidebar is collapsed, show only the collapse button (right arrow) centered */}
          {sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition w-full flex justify-center"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-4 py-3 transition-colors relative ${
                activeSection === item.id
                  ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              } ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}
            >
              {item.icon}
              {!sidebarCollapsed && (
                <>
                  <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
              {sidebarCollapsed && item.badge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="flex items-center justify-end border-b bg-white px-6 py-3">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeSection === "schedule" && (
            <ScheduleContent 
              appointments={appointments}
              onEditAppointment={handleEditAppointment}
              onManageAvailability={() => setShowAvailabilityModal(true)}
              onNewAppointment={() => setShowNewAppointment(true)}
            />
          )}

          {activeSection === "dashboard" && (
            <DashboardContent 
              appointments={appointments}
              patients={patients}
              invoices={invoices}
            />
          )}

          {activeSection === "patients" && (
            <PatientsContent patients={patients} />
          )}

          {activeSection === "billing" && (
            <BillingContent invoices={invoices} />
          )}
        </main>
      </div>

      {/* Modals */}
      {showAvailabilityModal && (
        <ManageAvailabilityModal onClose={() => setShowAvailabilityModal(false)} />
      )}

      {showNewAppointment && (
        <NewAppointmentModal onClose={() => setShowNewAppointment(false)} />
      )}

      {showEditModal && selectedAppointment && (
        <EditAppointmentModal 
          appointment={selectedAppointment}
          onSave={handleSaveEdit}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
}

/* ================= SCHEDULE CONTENT ================= */
interface ScheduleContentProps {
  appointments: Appointment[];
  onEditAppointment: (appointment: Appointment) => void;
  onManageAvailability: () => void;
  onNewAppointment: () => void;
}

function ScheduleContent({ appointments, onEditAppointment, onManageAvailability, onNewAppointment }: ScheduleContentProps) {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Daily Schedule</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1 ml-7">
            Today, Oct 24, 2023 · <span className="font-medium text-blue-600">12 appointments</span> remaining
          </p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onManageAvailability}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm bg-white text-gray-700 hover:bg-gray-50 transition"
          >
            <Clock className="w-4 h-4" />
            Manage Availability
          </button>
          <button 
            onClick={onNewAppointment}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-blue-600 hover:text-blue-800 border border-gray-300 hover:border-blue-300 transition"
          >
            <Plus className="w-4 h-4" />
            New Appointment
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
            <Users className="w-3 h-3" />
            TOTAL
          </p>
          <p className="text-3xl font-bold mt-1 text-gray-800">15</p>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
            <UserCircle className="w-3 h-3" />
            WAITING ROOM
          </p>
          <p className="text-3xl font-bold mt-1 text-gray-800">3</p>
          <p className="text-xs text-gray-400 mt-1">2 ready, 1 checked-in</p>
        </div>
        <div className="bg-white border rounded-xl p-5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            COMPLETED
          </p>
          <p className="text-3xl font-bold mt-1 text-gray-800">8</p>
          <p className="text-xs text-green-600 mt-1">Today's visits</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        {/* TABLE HEADER */}
        <div className="grid grid-cols-12 px-6 py-4 text-xs text-gray-500 font-semibold bg-gray-50 border-b">
          <div className="col-span-2 flex items-center gap-1 border-r border-gray-200 pr-4">
            <Clock className="w-3 h-3" /> TIME
          </div>
          <div className="col-span-4 flex items-center gap-1 border-r border-gray-200 px-4">
            <User className="w-3 h-3" /> PATIENT DETAILS
          </div>
          <div className="col-span-2 text-center border-r border-gray-200 px-4">TYPE</div>
          <div className="col-span-2 text-center border-r border-gray-200 px-4">STATUS</div>
          <div className="col-span-2 text-center">ACTIONS</div>
        </div>

        {/* TABLE ROWS */}
        {appointments.map((appointment) => (
          <div key={appointment.id} className={`border-b ${appointment.highlight ? 'bg-blue-50' : ''}`}>
            <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 transition">
              <div className="col-span-2 text-gray-700 font-medium flex items-center gap-1 border-r border-gray-200 pr-4">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {appointment.time}
              </div>
              <div className="col-span-4 border-r border-gray-200 px-4">
                <Link 
                  href={`/ehr/${appointment.id}`}
                  className="font-bold text-gray-800 hover:text-blue-600 hover:underline cursor-pointer"
                >
                  {appointment.name}
                </Link>
                <p className="text-sm text-gray-500 mt-0.5">{appointment.meta}</p>
              </div>
              <div className="col-span-2 text-center border-r border-gray-200 px-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit mx-auto bg-gray-100 text-gray-600">
                  <User className="w-3 h-3" />
                  {appointment.type}
                </span>
              </div>
              <div className="col-span-2 text-center border-r border-gray-200 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit mx-auto ${appointment.statusColor}`}>
                  {appointment.status === 'Ready' && <User className="w-3 h-3" />}
                  {appointment.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                  {appointment.status === 'Checked-in' && <User className="w-3 h-3" />}
                  {appointment.status === 'Confirmed' && <Calendar className="w-3 h-3" />}
                  {appointment.status}
                </span>
              </div>
              <div className="col-span-2 text-center">
                <button 
                  onClick={() => onEditAppointment(appointment)}
                  className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center justify-center gap-1 mx-auto"
                >
                  <Edit className="w-3 h-3" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Available Slot Row */}
        <div className="px-6 py-4 text-gray-400 italic text-sm flex items-center gap-2 border-t border-gray-200">
          <Clock className="w-4 h-4" />
          11:00 AM · Available Slot
          <button 
            onClick={onNewAppointment}
            className="ml-auto text-blue-600 font-medium not-italic hover:text-blue-700"
          >
            + Book now
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= DASHBOARD CONTENT ================= */
interface DashboardContentProps {
  appointments: Appointment[];
  patients: Patient[];
  invoices: Invoice[];
}

function DashboardContent({ appointments, patients, invoices }: DashboardContentProps) {
  // Stats cards
  const stats = [
    { 
      title: "Today's Appointments", 
      value: appointments.length.toString(), 
      icon: <Calendar className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-100"
    },
    { 
      title: "Total Patients", 
      value: patients.length.toString(), 
      icon: <Users className="w-6 h-6 text-green-600" />,
      color: "bg-green-100"
    },
    { 
      title: "Pending Payments", 
      value: invoices.filter(i => i.status === "Pending").length.toString(), 
      icon: <DollarSign className="w-6 h-6 text-orange-600" />,
      color: "bg-orange-100"
    },
    { 
      title: "Completed Today", 
      value: appointments.filter(a => a.status === "Completed").length.toString(), 
      icon: <CheckCircle2 className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-100"
    },
  ];

  // Upcoming appointments
  const upcomingAppointments = appointments.filter(apt => apt.status !== "Completed").slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Dr. Bennett</h2>
        <p className="text-blue-100">You have {appointments.filter(a => a.status !== "Completed").length} appointments today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule Preview */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Today's Schedule</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="p-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition mb-2">
                <div className="w-16 text-sm font-medium text-gray-600">{apt.time}</div>
                <div className={`w-2 h-2 rounded-full ${
                  apt.status === 'Ready' ? 'bg-green-500' :
                  apt.status === 'Checked-in' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <Link 
                    href={`/ehr/${apt.id}`}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline cursor-pointer"
                  >
                    {apt.name}
                  </Link>
                  <p className="text-xs text-gray-500">{apt.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Recent Invoices</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="p-4">
            {invoices.slice(0, 3).map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{invoice.patientName}</p>
                  <p className="text-xs text-gray-500">{invoice.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${invoice.amount.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-600' :
                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= PATIENTS CONTENT ================= */
interface PatientsContentProps {
  patients: Patient[];
}

function PatientsContent({ patients }: PatientsContentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Patients</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
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
              <tr key={patient.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <Link 
                      href={`/ehr/${patient.id}`}
                      className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline cursor-pointer"
                    >
                      {patient.name}
                    </Link>
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
                  <Link 
                    href={`/ehr/${patient.id}`}
                    className="text-blue-600 text-sm hover:text-blue-800 hover:underline"
                  >
                    View EHR
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= BILLING CONTENT ================= */
interface BillingContentProps {
  invoices: Invoice[];
}

function BillingContent({ invoices }: BillingContentProps) {
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices.filter(i => i.status === "Pending").reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(i => i.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Billing</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Pending Payments</p>
          <p className="text-2xl font-bold text-orange-600">${pendingAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Paid</p>
          <p className="text-2xl font-bold text-green-600">${paidAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Invoice ID</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Patient</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Method</th>
              <th className="text-left p-4 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 text-sm font-medium text-gray-900">{invoice.id}</td>
                <td className="p-4 text-sm text-gray-600">{invoice.patientName}</td>
                <td className="p-4 text-sm text-gray-600">{invoice.date}</td>
                <td className="p-4 text-sm font-medium text-gray-900">${invoice.amount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    invoice.status === 'Paid' ? 'bg-green-100 text-green-600' :
                    invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-600">{invoice.method || '-'}</td>
                <td className="p-4">
                  <button className="text-blue-600 text-sm hover:text-blue-800">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= MANAGE AVAILABILITY MODAL ================= */
interface ManageAvailabilityModalProps {
  onClose: () => void;
}

function ManageAvailabilityModal({ onClose }: ManageAvailabilityModalProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availability, setAvailability] = useState<AvailabilityItem[]>([
    { day: "Monday", date: "Oct 23", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
    { day: "Tuesday", date: "Oct 24", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
    { day: "Wednesday", date: "Oct 25", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
    { day: "Thursday", date: "Oct 26", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
    { day: "Friday", date: "Oct 27", slots: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"] },
    { day: "Saturday", date: "Oct 28", slots: [] },
    { day: "Sunday", date: "Oct 29", slots: [] },
  ]);

  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [editSlots, setEditSlots] = useState<string>("");

  const handleEditClick = (day: string, slots: string[]) => {
    setEditingDay(day);
    setEditSlots(slots.join(", "));
  };

  const handleSaveSlots = (day: string) => {
    const newSlots = editSlots.split(",").map(s => s.trim()).filter(s => s);
    setAvailability(availability.map(item => 
      item.day === day ? { ...item, slots: newSlots } : item
    ));
    setEditingDay(null);
    setEditSlots("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Manage Availability</h2>
              <p className="text-xs text-gray-500">Set your weekly schedule</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
              Select Week
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div className="space-y-4">
            {availability.map((item) => (
              <div key={item.day} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{item.day}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.date}</span>
                    </div>
                    {editingDay === item.day ? (
                      <div className="mt-2">
                        <textarea
                          value={editSlots}
                          onChange={(e) => setEditSlots(e.target.value)}
                          placeholder="Enter time slots (e.g., 09:00, 10:00, 11:00)"
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => handleSaveSlots(item.day)}
                            className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 flex items-center gap-1"
                          >
                            <Save className="w-3 h-3" />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingDay(null)}
                            className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs rounded-lg hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {item.slots.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.slots.map((slot) => (
                              <span key={slot} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                                {slot}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-400 italic mt-2">No availability</p>
                        )}
                      </>
                    )}
                  </div>
                  {editingDay !== item.day && (
                    <button
                      onClick={() => handleEditClick(item.day, item.slots)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= EDIT APPOINTMENT MODAL ================= */
interface EditAppointmentModalProps {
  appointment: Appointment;
  onSave: (updatedAppointment: Appointment) => void;
  onClose: () => void;
}

function EditAppointmentModal({ appointment, onSave, onClose }: EditAppointmentModalProps) {
  const [editedAppointment, setEditedAppointment] = useState<Appointment>({ ...appointment });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedAppointment((prev: Appointment) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedAppointment);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Edit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Edit Appointment</h2>
              <p className="text-xs text-gray-500">Update appointment details</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div className="bg-slate-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                Patient Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Patient Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedAppointment.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Patient Meta</label>
                  <input
                    type="text"
                    name="meta"
                    value={editedAppointment.meta}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Appointment Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                  <input
                    type="text"
                    name="time"
                    value={editedAppointment.time}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
                  <select
                    name="type"
                    value={editedAppointment.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="In-Person">In-Person</option>
                    <option value="Teleconsult">Teleconsult</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
                  <select
                    name="status"
                    value={editedAppointment.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ready">Ready</option>
                    <option value="Checked-in">Checked-in</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Reason</label>
                  <input
                    type="text"
                    name="reason"
                    value={editedAppointment.reason}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Additional Notes
              </h3>
              <textarea
                name="notes"
                value={editedAppointment.notes || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="Add any notes..."
              />
            </div>
          </div>
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ================= NEW APPOINTMENT MODAL ================= */
interface NewAppointmentModalProps {
  onClose: () => void;
}

function NewAppointmentModal({ onClose }: NewAppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<NewAppointmentFormData>({
    patientType: "existing",
    patientId: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    appointmentDate: "",
    appointmentTime: "",
    appointmentType: "inperson",
    reason: "",
    doctor: "dr-bennett",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: NewAppointmentFormData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Appointment scheduled:", formData);
    onClose();
    alert("Appointment scheduled successfully!");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <FilePlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Schedule New Appointment</h2>
              <p className="text-xs text-gray-500">Fill in the details</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center">
            <div className={`flex items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
              }`}>
                {step > 1 ? <CheckCircle2 className="w-4 h-4" /> : '1'}
              </div>
              <span className="ml-2 text-sm font-medium">Patient</span>
            </div>
            <div className={`w-16 h-px mx-2 ${step >= 2 ? 'bg-blue-300' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
              }`}>
                {step > 2 ? <CheckCircle2 className="w-4 h-4" /> : '2'}
              </div>
              <span className="ml-2 text-sm font-medium">Appointment</span>
            </div>
            <div className={`w-16 h-px mx-2 ${step >= 3 ? 'bg-blue-300' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
              }`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Confirm</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {step === 1 && (
              <div className="space-y-5">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Select patient type</p>
                    <p className="text-xs text-blue-600">Choose existing or create new</p>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-2">
                    Patient Type
                  </label>
                  <div className="flex gap-4">
                    <label className={`flex items-center gap-3 p-3 border rounded-lg flex-1 cursor-pointer ${
                      formData.patientType === "existing" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}>
                      <input
                        type="radio"
                        name="patientType"
                        value="existing"
                        checked={formData.patientType === "existing"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm">Existing patient</span>
                    </label>
                    <label className={`flex items-center gap-3 p-3 border rounded-lg flex-1 cursor-pointer ${
                      formData.patientType === "new" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}>
                      <input
                        type="radio"
                        name="patientType"
                        value="new"
                        checked={formData.patientType === "new"}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm">New patient</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Date</label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Time</label>
                    <select
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="09:30">09:30 AM</option>
                      <option value="10:00">10:00 AM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase mb-2">Reason</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm"
                    required
                  />
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-5">
                <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mb-2" />
                  <h3 className="text-sm font-medium text-green-800">Ready to schedule</h3>
                </div>
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="text-sm">Review the details before confirming</p>
                </div>
              </div>
            )}
          </div>

          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="px-4 py-2 text-sm text-gray-600 flex items-center gap-1">
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="px-5 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg">
                Cancel
              </button>
              {step < 3 ? (
                <button type="button" onClick={() => setStep(step + 1)} className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg flex items-center gap-1">
                  Continue
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button type="submit" className="px-5 py-2 bg-green-600 text-white text-sm rounded-lg">
                  Confirm
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}