// // app/page.tsx
// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Sidebar from '@/components/patient/Sidebar';
// import Header from '@/components/patient/Header';
// import { useRouter } from "next/navigation";

// export default function HomePage() {
//   const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'canceled'>('upcoming');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('All Types');
//     const router = useRouter();
//     const userName = "Abhishek";

//   const upcomingAppointments = [
//      {
//       id: 1,
//       doctor: {
//         name: 'Dr. Sarah Jenkins',
//         specialty: 'General Practitioner',
//         image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfozx0TrazZmEphWkMY4mnntGA9X9bZgCnfzb_W_jWcCwl1Ulb7karb3rJZQUvQc0dL2G8qdHotN0pLhrtWrnifil0r_aZhqTYM72qXrlqVlM3kclqGlkP_Aw89RPheeoZHUQ4UEnkfyH69TumwsThTYwWVD640qwEFo5OIfywpluwWBXhNPqNn8ImgtwJbFWxd-https://lh3.googleusercontent.com/aida-public/AB6AXuBnYva-qaYv17x9Rjcl7rZUrqHJEoicfeK0UZz61fXo3z2jK3CZLgbCslnPWOf5uAp4TZ8zrrhnVQ7eSSKawJ4eBe_Lv0AsHIjZqI841eAHDrq6K7jqbaAnctzP1HrLul87wVvnCXq-8h_ASoGwXNqZA-eA30pMwIrYGNQMoz_Bxqweyax_v8k2mnlzJPBNhcAYqrzTHJd33BI2hFgrxgsUhSkzYikPz6tQlcp1fJeHmskl9hriLxeyJ1T3ylnfwQmj-pByPTyKde0',
//         type: 'in-person',
//         location: 'City Health Clinic',
//       },
//       date: {
//         day: '28',
//         month: 'Oct',
//         time: '02:30 PM',
//         label: 'Flu Vaccination',
//       },
//       status: {
//         text: 'Confirmed',
//         color: 'green-light',
//       },
//       isImminent: false,
//     },
//     {
//       id: 2,
//       doctor: {
//         name: 'Dr. Michael Ross',
//         specialty: 'General Practitioner',
//         image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfozx0TrazZmEphWkMY4mnntGA9X9bZgCnfzb_W_jWcCwl1Ulb7karb3rJZQUvQc0dL2G8qdHotN0pLhrtWrnifil0r_aZhqTYM72qXrlqVlM3kclqGlkP_Aw89RPheeoZHUQ4UEnkfyH69TumwsThTYwWVD640qwEFo5OIfywpluwWBXhNPqNn8ImgtwJbFWxd-0d76kEPsSMoYRrMmI48yyB39knE0kyEOnUZTXXW7bWOxOp5_A75pvUgSFlZ6Ov5fdDogANxbg',
//         type: 'in-person',
//         location: 'City Health Clinic',
//       },
//       date: {
//         day: '28',
//         month: 'Oct',
//         time: '02:30 PM',
//         label: 'Flu Vaccination',
//       },
//       status: {
//         text: 'Confirmed',
//         color: 'green-light',
//       },
//       isImminent: false,
//     },
//     {
//       id: 3,
//       doctor: {
//         name: 'Radiology Center',
//         specialty: 'Diagnostic Lab',
//         image: '',
//         type: 'in-person',
//         location: 'Main Hospital, Wing B',
//       },
//       date: {
//         day: '02',
//         month: 'Nov',
//         time: '09:00 AM',
//         label: 'MRI Scan (Knee)',
//       },
//       status: {
//         text: 'Pending',
//         color: 'amber',
//       },
//       isImminent: false,
//     },
//   ];

//   const pastAppointments = [
//     {
//       id: 1,
//       doctorName: 'Dr. Emily Chen',
//       specialty: 'Dermatologist',
//       image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR_A3_suSPb1D3PkdAU5NF_a_FU9H79qS3FR8ho6Msmhr7jg7D9THCbmliVM244KKiLwxJnGWNLavacrU2R8_WuIcBa4YEJRieCw-qILRZVOBbzSeTTULH99GkkBMhW33Ge0C-SSi4QOzVgG5HLm5Aj9El95hZQGuAlU4K24xW7kiFEQW6WNhKy0IeuQzkx6038oZZlG26xujd10un6B2CHg7tU0x7P_Urb9pHTa-ub9ZLOOlXjJ45K_6NGCpbbx_Y8NCY692TCXQ',
//       date: 'Sept 12, 2023',
//       type: 'In-Person',
//       status: 'Completed',
//       action: 'View Summary',
//     },
//     {
//       id: 2,
//       doctorName: 'Main Street Lab',
//       specialty: 'Blood Work',
//       image: '',
//       date: 'Aug 28, 2023',
//       type: 'Lab Visit',
//       status: 'Results Ready',
//       action: 'Download Report',
//     },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-display antialiased">

//       {/* Tailwind CSS Configuration */}
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
//         @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

//         :root {
//           --font-inter: 'Inter', sans-serif;
//         }

//         body {
//           font-family: var(--font-inter);
//         }
//       `}</style>

//       {/* Sidebar */}
//       <Sidebar/>

//       {/* Main Content Area */}
//       <main className="flex-1 flex flex-col h-screen overflow-hidden">
//         {/* Top Header */}
//          <Header
//                   searchQuery={searchQuery}
//                   onSearchChange={setSearchQuery}
//                   searchPlaceholder="Search medication or doctor..."
//                   nextAppointmentTime="Today, 2:00 PM"
//                   notificationCount={1}
//                 />

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto p-6 md:p-8">
//           {/* Page Header */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//            <div>
//   <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
//     Welcome, <span className="text-green-600">{userName}</span> 👋
//   </h1>
//   <p className="text-gray-500 dark:text-gray-400 text-sm">
//     Here’s a quick look at your upcoming and past appointments.
//   </p>
// </div>
//    <button
//       onClick={() => router.push("/appointments")}
//       className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 active:scale-95"
//     >
//       <span className="material-icons text-lg">add</span>
//       Book New Appointment
//     </button>
//           </div>

//           {/* Tabs & Filters */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-green-200 dark:border-green-900 pb-4 mb-8 gap-4">
//             <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-xl border border-green-200 dark:border-green-900">
//               <button
//                 onClick={() => setActiveTab('upcoming')}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   activeTab === 'upcoming'
//                     ? 'bg-green-600 text-white shadow-sm'
//                     : 'text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
//                 }`}
//               >
//                 Upcoming
//               </button>
//               <button
//                 onClick={() => setActiveTab('past')}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   activeTab === 'past'
//                     ? 'bg-green-600 text-white shadow-sm'
//                     : 'text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
//                 }`}
//               >
//                 Past
//               </button>
//               <button
//                 onClick={() => setActiveTab('canceled')}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   activeTab === 'canceled'
//                     ? 'bg-green-600 text-white shadow-sm'
//                     : 'text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
//                 }`}
//               >
//                 Canceled
//               </button>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide mr-1">
//                 Filter by:
//               </span>
//               <select
//                 value={filterType}
//                 onChange={(e) => setFilterType(e.target.value)}
//                 className="form-select bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 py-1.5 pl-3 pr-8"
//               >
//                 <option>All Types</option>
//                 <option>Teleconsult</option>
//                 <option>In-Person</option>
//               </select>
//             </div>
//           </div>

//           {/* Upcoming Appointments Grid */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
//             {upcomingAppointments.map((apt) => (
//               <div key={apt.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-green-200 dark:border-green-900 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
//                 <div className="absolute top-0 right-0 p-3">
//                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
//                     apt.status.color === 'green'
//                       ? 'bg-green-600 text-white'
//                       : apt.status.color === 'green-light'
//                       ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
//                       : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
//                   }`}>
//                     {apt.status.text}
//                   </span>
//                 </div>

//                 <div className="flex items-start gap-4 mb-4">
//                   <div className="relative">
//                     {apt.doctor.image ? (
//                       <div className="relative w-16 h-16">
//                         <Image
//                           src={apt.doctor.image}
//                           alt={apt.doctor.name}
//                           fill
//                           className="rounded-xl object-cover shadow-sm"
//                         />
//                       </div>
//                     ) : (
//                       <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
//                         <span className="material-icons text-3xl">medical_services</span>
//                       </div>
//                     )}
//                     {apt.doctor.type === 'video' && (
//                       <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
//                     )}
//                   </div>

//                   <div className="pt-1">
//                     <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
//                       {apt.doctor.name}
//                     </h3>
//                     <p className={`text-sm font-medium ${
//                       apt.isImminent
//                         ? 'text-green-700 dark:text-green-400'
//                         : 'text-gray-500 dark:text-gray-400'
//                     }`}>
//                       {apt.doctor.specialty}
//                     </p>
//                     <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
//                       <span className="material-icons text-sm">
//                         {apt.doctor.type === 'video' ? 'videocam' : 'location_on'}
//                       </span>
//                       {apt.doctor.location}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 dark:bg-black/20 rounded-xl p-3 mb-4 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 bg-white dark:bg-white/5 rounded-lg text-center min-w-[3rem] border border-gray-100 dark:border-white/5">
//                       <span className="block text-xs text-gray-400 uppercase font-bold">
//                         {apt.date.month}
//                       </span>
//                       <span className="block text-sm font-bold text-gray-800 dark:text-gray-200">
//                         {apt.date.day}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                         {apt.date.time}
//                       </p>
//                       <p className="text-xs text-gray-500">{apt.date.label}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   {apt.isImminent ? (
//                     <>
//                       <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
//                         <span className="material-icons text-lg">videocam</span>
//                         Join Teleconsult
//                       </button>
//                       <button className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-green-600 hover:border-green-600 transition-colors">
//                         <span className="material-icons">more_horiz</span>
//                       </button>
//                     </>
//                   ) : apt.doctor.type === 'video' ? (
//                     <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
//                       <span className="material-icons text-lg">videocam</span>
//                       Join Teleconsult
//                     </button>
//                   ) : (
//                     <>
//                       <button className="flex-1 bg-white dark:bg-gray-800 border border-green-600 text-green-700 dark:text-green-400 font-bold py-2.5 px-4 rounded-lg text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors flex items-center justify-center gap-2">
//                         <span className="material-icons text-lg">map</span>
//                         View Directions
//                       </button>
//                       <button
//                         className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors"
//                         title="Reschedule"
//                       >
//                         <span className="material-icons">edit_calendar</span>
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Past Appointments Section */}
//           <div className="mb-6">
//             <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//               <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
//               Recent History
//             </h2>

//             <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left text-sm">
//                   <thead className="bg-gray-50 dark:bg-black/20 text-gray-500 dark:text-gray-400 border-b border-green-200 dark:border-green-900">
//                     <tr>
//                       <th className="px-6 py-4 font-medium">Doctor / Facility</th>
//                       <th className="px-6 py-4 font-medium">Date</th>
//                       <th className="px-6 py-4 font-medium">Type</th>
//                       <th className="px-6 py-4 font-medium">Status</th>
//                       <th className="px-6 py-4 font-medium text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//                     {pastAppointments.map((apt) => (
//                       <tr key={apt.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             {apt.image ? (
//                               <div className="relative w-10 h-10">
//                                 <Image
//                                   src={apt.image}
//                                   alt={apt.doctorName}
//                                   fill
//                                   className="rounded-full object-cover"
//                                 />
//                               </div>
//                             ) : (
//                               <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500">
//                                 <span className="material-icons text-xl">medication</span>
//                               </div>
//                             )}
//                             <div>
//                               <p className="font-medium text-gray-900 dark:text-white">
//                                 {apt.doctorName}
//                               </p>
//                               <p className="text-xs text-gray-500 dark:text-gray-400">{apt.specialty}</p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{apt.date}</td>
//                         <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{apt.type}</td>
//                         <td className="px-6 py-4">
//                           <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
//                             {apt.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <a href="#" className="text-green-700 dark:text-green-400 hover:underline text-sm font-medium">
//                             {apt.action}
//                           </a>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="bg-gray-50 dark:bg-black/20 px-6 py-3 border-t border-green-200 dark:border-green-900 text-center">
//                 <button className="text-sm font-medium text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
//                   View All Past Appointments
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// app/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/patient/Sidebar";
import Header from "@/components/patient/Header";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "canceled">(
    "upcoming",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All Types");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const userName = "Abhishek";

  const upcomingAppointments = [
    {
      id: 1,
      doctor: {
        name: "Dr. Sarah Jenkins",
        specialty: "General Practitioner",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDfozx0TrazZmEphWkMY4mnntGA9X9bZgCnfzb_W_jWcCwl1Ulb7karb3rJZQUvQc0dL2G8qdHotN0pLhrtWrnifil0r_aZhqTYM72qXrlqVlM3kclqGlkP_Aw89RPheeoZHUQ4UEnkfyH69TumwsThTYwWVD640qwEFo5OIfywpluwWBXhNPqNn8ImgtwJbFWxd-https://lh3.googleusercontent.com/aida-public/AB6AXuBnYva-qaYv17x9Rjcl7rZUrqHJEoicfeK0UZz61fXo3z2jK3CZLgbCslnPWOf5uAp4TZ8zrrhnVQ7eSSKawJ4eBe_Lv0AsHIjZqI841eAHDrq6K7jqbaAnctzP1HrLul87wVvnCXq-8h_ASoGwXNqZA-eA30pMwIrYGNQMoz_Bxqweyax_v8k2mnlzJPBNhcAYqrzTHJd33BI2hFgrxgsUhSkzYikPz6tQlcp1fJeHmskl9hriLxeyJ1T3ylnfwQmj-pByPTyKde0",
        type: "in-person",
        location: "City Health Clinic",
      },
      date: {
        day: "28",
        month: "Oct",
        time: "02:30 PM",
        label: "Flu Vaccination",
      },
      status: {
        text: "Confirmed",
        color: "green-light",
      },
      isImminent: false,
    },
    {
      id: 2,
      doctor: {
        name: "Dr. Michael Ross",
        specialty: "General Practitioner",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDfozx0TrazZmEphWkMY4mnntGA9X9bZgCnfzb_W_jWcCwl1Ulb7karb3rJZQUvQc0dL2G8qdHotN0pLhrtWrnifil0r_aZhqTYM72qXrlqVlM3kclqGlkP_Aw89RPheeoZHUQ4UEnkfyH69TumwsThTYwWVD640qwEFo5OIfywpluwWBXhNPqNn8ImgtwJbFWxd-0d76kEPsSMoYRrMmI48yyB39knE0kyEOnUZTXXW7bWOxOp5_A75pvUgSFlZ6Ov5fdDogANxbg",
        type: "in-person",
        location: "City Health Clinic",
      },
      date: {
        day: "28",
        month: "Oct",
        time: "02:30 PM",
        label: "Flu Vaccination",
      },
      status: {
        text: "Confirmed",
        color: "green-light",
      },
      isImminent: false,
    },
    {
      id: 3,
      doctor: {
        name: "Radiology Center",
        specialty: "Diagnostic Lab",
        image: "",
        type: "in-person",
        location: "Main Hospital, Wing B",
      },
      date: {
        day: "02",
        month: "Nov",
        time: "09:00 AM",
        label: "MRI Scan (Knee)",
      },
      status: {
        text: "Pending",
        color: "amber",
      },
      isImminent: false,
    },
  ];

  const pastAppointments = [
    {
      id: 1,
      doctorName: "Dr. Emily Chen",
      specialty: "Dermatologist",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBR_A3_suSPb1D3PkdAU5NF_a_FU9H79qS3FR8ho6Msmhr7jg7D9THCbmliVM244KKiLwxJnGWNLavacrU2R8_WuIcBa4YEJRieCw-qILRZVOBbzSeTTULH99GkkBMhW33Ge0C-SSi4QOzVgG5HLm5Aj9El95hZQGuAlU4K24xW7kiFEQW6WNhKy0IeuQzkx6038oZZlG26xujd10un6B2CHg7tU0x7P_Urb9pHTa-ub9ZLOOlXjJ45K_6NGCpbbx_Y8NCY692TCXQ",
      date: "Sept 12, 2023",
      type: "In-Person",
      status: "Completed",
      action: "View Summary",
    },
    {
      id: 2,
      doctorName: "Main Street Lab",
      specialty: "Blood Work",
      image: "",
      date: "Aug 28, 2023",
      type: "Lab Visit",
      status: "Results Ready",
      action: "Download Report",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-display antialiased">
      {/* Tailwind CSS Configuration */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

        :root {
          --font-inter: "Inter", sans-serif;
        }

        body {
          font-family: var(--font-inter);
        }
      `}</style>

      {/* Sidebar */}
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

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Page Header with Welcome Message and Book Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Welcome, <span className="text-green-600">{userName}</span> 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Here’s a quick look at your upcoming and past appointments.
              </p>
            </div>
          </div>

          {/* Service Category Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                name: "Doctor Consultation",
                icon: "local_hospital",
                path: "/appointments",
              },
              {
                name: "Medical Records",
                icon: "folder",
                path: "/patient/medical-records",
              },
              {
                name: "History",
                icon: "local_pharmacy",
                path: "/patient/admission-summary",
              },
              { name: "Diagnostics", icon: "biotech", path: "/diagnostics" },
            ].map((service) => (
              <div
                key={service.name}
                onClick={() => router.push(service.path)}
                className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-green-200 dark:border-green-900 shadow-sm hover:shadow-md hover:border-green-400 dark:hover:border-green-700 transition-all cursor-pointer flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <span className="material-icons text-green-600 dark:text-green-400 text-2xl">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {service.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Tabs & Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-green-200 dark:border-green-900 pb-4 mb-8 gap-4">
            <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-xl border border-green-200 dark:border-green-900">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "past"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                }`}
              >
                Past
              </button>
              <button
                onClick={() => setActiveTab("canceled")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === "canceled"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                }`}
              >
                Canceled
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide mr-1">
                Filter by:
              </span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="form-select bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 py-1.5 pl-3 pr-8"
              >
                <option>All Types</option>
                <option>Teleconsult</option>
                <option>In-Person</option>
              </select>
            </div>
          </div>

          {/* Upcoming Appointments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            {upcomingAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-green-200 dark:border-green-900 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      apt.status.color === "green"
                        ? "bg-green-600 text-white"
                        : apt.status.color === "green-light"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                    }`}
                  >
                    {apt.status.text}
                  </span>
                </div>

                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    {apt.doctor.image ? (
                      <div className="relative w-16 h-16">
                        <Image
                          src={apt.doctor.image}
                          alt={apt.doctor.name}
                          fill
                          className="rounded-xl object-cover shadow-sm"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                        <span className="material-icons text-3xl">
                          medical_services
                        </span>
                      </div>
                    )}
                    {apt.doctor.type === "video" && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                    )}
                  </div>

                  <div className="pt-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
                      {apt.doctor.name}
                    </h3>
                    <p
                      className={`text-sm font-medium ${
                        apt.isImminent
                          ? "text-green-700 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {apt.doctor.specialty}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                      <span className="material-icons text-sm">
                        {apt.doctor.type === "video"
                          ? "videocam"
                          : "location_on"}
                      </span>
                      {apt.doctor.location}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-black/20 rounded-xl p-3 mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-white/5 rounded-lg text-center min-w-[3rem] border border-gray-100 dark:border-white/5">
                      <span className="block text-xs text-gray-400 uppercase font-bold">
                        {apt.date.month}
                      </span>
                      <span className="block text-sm font-bold text-gray-800 dark:text-gray-200">
                        {apt.date.day}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {apt.date.time}
                      </p>
                      <p className="text-xs text-gray-500">{apt.date.label}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {apt.isImminent ? (
                    <>
                      <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                        <span className="material-icons text-lg">videocam</span>
                        Join Teleconsult
                      </button>
                      <button className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-green-600 hover:border-green-600 transition-colors">
                        <span className="material-icons">more_horiz</span>
                      </button>
                    </>
                  ) : apt.doctor.type === "video" ? (
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                      <span className="material-icons text-lg">videocam</span>
                      Join Teleconsult
                    </button>
                  ) : (
                    <>
                      <button className="flex-1 bg-white dark:bg-gray-800 border border-green-600 text-green-700 dark:text-green-400 font-bold py-2.5 px-4 rounded-lg text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors flex items-center justify-center gap-2">
                        <span className="material-icons text-lg">map</span>
                        View Directions
                      </button>
                      <button
                        className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors"
                        title="Reschedule"
                      >
                        <span className="material-icons">edit_calendar</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Past Appointments Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              Recent History
            </h2>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 dark:bg-black/20 text-gray-500 dark:text-gray-400 border-b border-green-200 dark:border-green-900">
                    <tr>
                      <th className="px-6 py-4 font-medium">
                        Doctor / Facility
                      </th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Type</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {pastAppointments.map((apt) => (
                      <tr
                        key={apt.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {apt.image ? (
                              <div className="relative w-10 h-10">
                                <Image
                                  src={apt.image}
                                  alt={apt.doctorName}
                                  fill
                                  className="rounded-full object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                                <span className="material-icons text-xl">
                                  medication
                                </span>
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {apt.doctorName}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {apt.specialty}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {apt.date}
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                          {apt.type}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            {apt.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <a
                            href="#"
                            className="text-green-700 dark:text-green-400 hover:underline text-sm font-medium"
                          >
                            {apt.action}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 dark:bg-black/20 px-6 py-3 border-t border-green-200 dark:border-green-900 text-center">
                <button className="text-sm font-medium text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  View All Past Appointments
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
