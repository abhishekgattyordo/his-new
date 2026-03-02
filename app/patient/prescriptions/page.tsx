// // app/patient/prescriptions/page.tsx
// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Sidebar from '@/components/patient/Sidebar';
// import Header from '@/components/patient/Header';

// export default function PrescriptionsPage() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeFilter, setActiveFilter] = useState('all');

//   const activePrescriptions = [
//     {
//       id: 1,
//       name: 'Amoxicillin',
//       dosage: '500mg Capsule',
//       type: 'Antibiotic',
//       status: 'Active',
//       icon: 'medication_liquid',
//       iconBg: 'green', // Changed from 'primary'
//       schedule: {
//         morning: 1,
//         noon: 0,
//         night: 1,
//         instruction: 'After Food',
//       },
//       progress: {
//         current: 3,
//         total: 5,
//         dosesLeft: 4,
//         percentage: 60,
//       },
//       doctor: {
//         name: 'Dr. Sarah Jenkins',
//         specialty: 'Cardiologist',
//         date: 'Oct 24',
//         image:
//           'https://lh3.googleusercontent.com/aida-public/AB6AXuCRVN6DI6TlqUN_Tm6EOUAGXa7K_XpA39hZXJ8VMG8dYS852O25TUwP9gS0ZBurktpNxB5jNRzU6sjVlI5np5vY3smZt3Bm0hiHSUKWCFVNBvsti4kcIXzoo404JgETYNZm3jFz9RqwIaYXc1EkR04OvSl--qmecfn1joCssmvae0nEbwYlCXOUqjK0bzhqCUi3T7it_0alksyOHHXTp8ir3aGJwhE6rY9nxOiBrBC_8NPzNDN4YTDfcXq8lASjlkdRkdLouNQsjPw',
//       },
//     },
//     {
//       id: 2,
//       name: 'Lisinopril',
//       dosage: '10mg Tablet',
//       type: 'Blood Pressure',
//       status: 'Active',
//       icon: 'pill',
//       iconBg: 'green', // Changed from 'indigo'
//       schedule: {
//         morning: 1,
//         noon: 0,
//         night: 0,
//         instruction: 'Before Breakfast',
//       },
//       progress: {
//         current: 12,
//         total: 30,
//         dosesLeft: 18,
//         percentage: 40,
//       },
//       doctor: {
//         name: 'Dr. Michael Chen',
//         specialty: 'General',
//         date: 'Oct 20',
//         image:
//           'https://lh3.googleusercontent.com/aida-public/AB6AXuDkxmrXCsoX3dc9t33QWhQ6-Saf4rn3YElsSBw3TWWE4fFu_IVx3tj3BWpRa06H_quhqjTHzYmeiEJdJVfXnk_il9yYQ5DTZfXmYA25gbar0yoqUXbLvpRe4-B4e4G6Wsc-OVVcb2mXG2ysLrizf37wHuKbd9yde3PfcOUCAvzJdK4E57FPCzQlYDDwJ4KUaQFPu_buSjXSjqE5_x89qoL9n1O9idHmyaQx53BPwYWPZVDQ2DaYivMogX2lPHdA2PL1DzweZFsH43c',
//       },
//     },
//   ];

//   const pastPrescriptions = [
//     {
//       id: 1,
//       name: 'Ibuprofen 400mg',
//       description: 'Pain relief',
//       doctor: {
//         name: 'Dr. J. Doe',
//         initials: 'JD',
//         color: 'green', // Changed from 'purple'
//       },
//       date: 'Sep 12, 2023',
//       status: 'Completed',
//       action: 'Reorder',
//     },
//     {
//       id: 2,
//       name: 'Azithromycin 250mg',
//       description: 'Antibiotic',
//       doctor: {
//         name: 'Dr. S. Jenkins',
//         image:
//           'https://lh3.googleusercontent.com/aida-public/AB6AXuAGTe54p5D2af--MQHWnAodeRJ5QlJ3mEWPJcPMqvs4TSI2MQDx5hzYFeLoW0EbofmrjfFJJc7W13ZrljXz6raSgWw4rtNNBhbzkReWxVYAJ_fTlTQzyrIiBUUTb88YGrU3aGiPnncr1uFADj9gVkHOZyH44TKzEMd-ZngWp4VVk9NYkuG9h15WKaBMILaI52B0Yo7QQcDMomELoMxkDdh4pX1LwAzlMmGREG-EcGtjUMiROmTiJ5aKvbdJ1ElMcpURhoC-7BgGsR4',
//         initials: 'SJ',
//       },
//       date: 'Aug 28, 2023',
//       status: 'Completed',
//       action: 'download',
//     },
//   ];

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-display antialiased">

//       {/* Tailwind CSS Configuration - Using same green primary color as main page */}
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
//         @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
//         @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

//         :root {
//           --font-inter: 'Inter', sans-serif;
//         }

//         body {
//           font-family: var(--font-inter);
//         }

//         /* Custom green-primary classes for components */
//         .bg-primary {
//           background-color: #16a34a; /* green-600 */
//         }
//         .bg-primary-dark {
//           background-color: #15803d; /* green-700 */
//         }
//         .text-primary {
//           color: #16a34a; /* green-600 */
//         }
//         .text-primary-dark {
//           color: #15803d; /* green-700 */
//         }
//         .border-primary {
//           border-color: #16a34a;
//         }
//         .bg-primary\\/10 {
//           background-color: rgba(22, 163, 74, 0.1);
//         }
//         .bg-primary\\/20 {
//           background-color: rgba(22, 163, 74, 0.2);
//         }
//         .bg-primary\\/5 {
//           background-color: rgba(22, 163, 74, 0.05);
//         }
//         .border-primary\\/20 {
//           border-color: rgba(22, 163, 74, 0.2);
//         }
//         .shadow-primary\\/20 {
//           box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.1), 0 4px 6px -2px rgba(22, 163, 74, 0.05);
//         }
//         .shadow-primary\\/40 {
//           box-shadow: 0 20px 25px -5px rgba(22, 163, 74, 0.2), 0 10px 10px -5px rgba(22, 163, 74, 0.1);
//         }
//         .hover\\:shadow-primary\\/5:hover {
//           box-shadow: 0 10px 15px -3px rgba(22, 163, 74, 0.05), 0 4px 6px -2px rgba(22, 163, 74, 0.025);
//         }
//       `}</style>

//       {/* Sidebar */}
//       <Sidebar/>

//       {/* Main Content Area */}
//       <main className="flex-1 flex flex-col h-screen overflow-hidden">
//         {/* Header with search */}
//         <Header
//           searchQuery={searchQuery}
//           onSearchChange={setSearchQuery}
//           searchPlaceholder="Search medication or doctor..."
//           nextAppointmentTime="Today, 2:00 PM"
//           notificationCount={1}
//         />

//         {/* Scrollable Content */}
//         <div className="flex-1 overflow-y-auto p-6 md:p-8">
//           {/* Page Header */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
//                 My Prescriptions
//               </h1>
//               <p className="text-gray-500 dark:text-gray-400 text-sm">
//                 Manage your active medications and prescription history.
//               </p>
//             </div>
//             <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-5 rounded-lg transition-all shadow-lg shadow-green-600/20 hover:shadow-green-600/40 active:scale-95">
//               <span className="material-icons text-lg">add</span>
//               Order Refill
//             </button>
//           </div>

//           {/* Active Prescriptions Section */}
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
//                 Active Prescriptions
//               </h2>
//               <span className="text-sm text-gray-500">Updated today</span>
//             </div>

//             <div className="grid grid-cols-1 gap-6">
//               {activePrescriptions.map((prescription) => (
//                 <div
//                   key={prescription.id}
//                   className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-green-200 dark:hover:border-green-900 transition-all duration-300"
//                 >
//                   <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
//                     {/* Medicine Info */}
//                     <div className="flex items-start gap-4 lg:w-1/3">
//                       <div
//                         className={`w-12 h-12 bg-${prescription.iconBg}-50 dark:bg-${prescription.iconBg}-900/20 rounded-xl flex items-center justify-center shrink-0`}
//                       >
//                         <span
//                           className={`material-icons text-${prescription.iconBg}-600 dark:text-${prescription.iconBg}-400 text-2xl`}
//                         >
//                           {prescription.icon}
//                         </span>
//                       </div>
//                       <div>
//                         <div className="flex items-center gap-3 mb-1">
//                           <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                             {prescription.name}
//                           </h3>
//                           <span className="px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 rounded-full">
//                             {prescription.status}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           {prescription.dosage} • {prescription.type}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Schedule Visual */}
//                     <div className="flex flex-col items-center gap-2 lg:border-l lg:border-r border-gray-200 dark:border-gray-700 lg:px-8 lg:w-1/3">
//                       <div className="flex items-center gap-3">
//                         <div className="flex flex-col items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-400 min-w-[4rem]">
//                           <span className="material-icons text-sm mb-0.5">wb_sunny</span>
//                           <span className="text-xs font-bold">{prescription.schedule.morning}</span>
//                         </div>
//                         <div className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400 min-w-[4rem]">
//                           <span className="material-icons text-sm mb-0.5">wb_twilight</span>
//                           <span className="text-xs font-bold">{prescription.schedule.noon}</span>
//                         </div>
//                         <div
//                           className={`flex flex-col items-center p-2 min-w-[4rem] rounded-lg ${
//                             prescription.schedule.night > 0
//                               ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
//                               : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
//                           }`}
//                         >
//                           <span className="material-icons text-sm mb-0.5">dark_mode</span>
//                           <span className="text-xs font-bold">{prescription.schedule.night}</span>
//                         </div>
//                       </div>
//                       <p className="text-xs font-medium text-gray-500">
//                         {prescription.schedule.instruction}
//                       </p>
//                     </div>

//                     {/* Doctor & Actions */}
//                     <div className="flex flex-col sm:flex-row items-center justify-between gap-4 lg:w-1/3">
//                       <div className="flex items-center gap-3 w-full sm:w-auto">
//                         <div className="relative w-10 h-10">
//                           <Image
//                             src={prescription.doctor.image}
//                             alt={prescription.doctor.name}
//                             fill
//                             className="rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
//                           />
//                         </div>
//                         <div>
//                           <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                             {prescription.doctor.name}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {prescription.doctor.specialty} • {prescription.doctor.date}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
//                         <button
//                           className="p-2.5 text-gray-400 hover:text-green-600 border border-gray-200 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-900 rounded-lg transition-colors"
//                           title="Download PDF"
//                         >
//                           <span className="material-icons">download</span>
//                         </button>
//                         <button className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg shadow-md shadow-green-600/20 hover:shadow-green-600/40 transition-all active:scale-95 flex items-center gap-2">
//                           <span className="material-icons text-lg">shopping_cart</span>
//                           Order
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Progress Bar */}
//                   <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4 text-xs">
//                     <span className="text-gray-500 whitespace-nowrap">
//                       Day {prescription.progress.current} of {prescription.progress.total}
//                     </span>
//                     <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
//                       <div
//                         className="h-full bg-green-600 rounded-full"
//                         style={{ width: `${prescription.progress.percentage}%` }}
//                       ></div>
//                     </div>
//                     <span className="text-gray-900 dark:text-white font-medium whitespace-nowrap">
//                       {prescription.progress.dosesLeft} doses left
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Past Prescriptions / History */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-bold text-gray-900 dark:text-white">Past Prescriptions</h2>
//               <button className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium flex items-center gap-1">
//                 View all history
//                 <span className="material-icons text-base">arrow_forward</span>
//               </button>
//             </div>

//             <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left text-sm">
//                   <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
//                     <tr>
//                       <th className="px-6 py-4 font-medium">Medication</th>
//                       <th className="px-6 py-4 font-medium">Prescribed By</th>
//                       <th className="px-6 py-4 font-medium">Date</th>
//                       <th className="px-6 py-4 font-medium">Status</th>
//                       <th className="px-6 py-4 font-medium text-right">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//                     {pastPrescriptions.map((prescription) => (
//                       <tr
//                         key={prescription.id}
//                         className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
//                       >
//                         <td className="px-6 py-4">
//                           <p className="font-semibold text-gray-900 dark:text-white">
//                             {prescription.name}
//                           </p>
//                           <p className="text-xs text-gray-500">{prescription.description}</p>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-2">
//                             {prescription.doctor.image ? (
//                               <div className="relative w-6 h-6">
//                                 <Image
//                                   src={prescription.doctor.image}
//                                   alt={prescription.doctor.name}
//                                   fill
//                                   className="rounded-full object-cover"
//                                 />
//                               </div>
//                             ) : (
//                               <div
//                                 className={`w-6 h-6 rounded-full bg-${prescription.doctor.color}-100 text-${prescription.doctor.color}-600 flex items-center justify-center text-xs font-bold`}
//                               >
//                                 {prescription.doctor.initials}
//                               </div>
//                             )}
//                             <span className="text-gray-700 dark:text-gray-300">
//                               {prescription.doctor.name}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
//                           {prescription.date}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//                             <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
//                             {prescription.status}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           {prescription.action === 'Reorder' ? (
//                             <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium text-xs">
//                               Reorder
//                             </button>
//                           ) : (
//                             <button className="text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">
//                               <span className="material-icons text-lg">download</span>
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
//                 <button className="text-sm font-medium text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
//                   Load More History
//                 </button>
//               </div>
//             </div>
//           </section>

//           {/* Footer Disclaimer */}
//           <footer className="mt-12 text-center">
//             <p className="text-xs text-gray-400 max-w-2xl mx-auto">
//               Disclaimer: This digital prescription record is for information management purposes.
//               Always consult the official printed prescription or your doctor for precise medical
//               advice. In case of emergency, contact local emergency services immediately.
//             </p>
//           </footer>
//         </div>
//       </main>
//     </div>
//   );
// }

// app/patient/prescriptions/page.tsx

// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import Sidebar from '@/components/patient/Sidebar';
// import Header from '@/components/patient/Header';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
// import {
//   Pill,
//   Calendar,
//   User,
//   Clock,
//   Download,
//   ShoppingCart,
//   ChevronRight,
//   Sun,
//   Sunset,
//   Moon,
//   FileText,
//   Activity,
// } from 'lucide-react';

// // Types
// interface ActivePrescription {
//   id: number;
//   name: string;
//   dosage: string;
//   type: string;
//   status: 'Active' | 'Discontinued' | 'Completed';
//   icon: 'medication' | 'pill';
//   iconBg: 'green' | 'blue' | 'purple';
//   schedule: {
//     morning: number;
//     noon: number;
//     night: number;
//     instruction: string;
//   };
//   progress: {
//     current: number;
//     total: number;
//     dosesLeft: number;
//     percentage: number;
//   };
//   doctor: {
//     name: string;
//     specialty: string;
//     date: string;
//     image: string;
//   };
// }

// interface PastPrescription {
//   id: number;
//   name: string;
//   description: string;
//   doctor: {
//     name: string;
//     initials?: string;
//     image?: string;
//     color?: string;
//   };
//   date: string;
//   status: string;
//   action: 'Reorder' | 'download';
// }

// // Sample data
// const activePrescriptions: ActivePrescription[] = [
//   {
//     id: 1,
//     name: 'Amoxicillin',
//     dosage: '500mg Capsule',
//     type: 'Antibiotic',
//     status: 'Active',
//     icon: 'medication',
//     iconBg: 'green',
//     schedule: {
//       morning: 1,
//       noon: 0,
//       night: 1,
//       instruction: 'After Food',
//     },
//     progress: {
//       current: 3,
//       total: 5,
//       dosesLeft: 4,
//       percentage: 60,
//     },
//     doctor: {
//       name: 'Dr. Sarah Jenkins',
//       specialty: 'Cardiologist',
//       date: 'Oct 24',
//       image:
//         'https://lh3.googleusercontent.com/aida-public/AB6AXuCRVN6DI6TlqUN_Tm6EOUAGXa7K_XpA39hZXJ8VMG8dYS852O25TUwP9gS0ZBurktpNxB5jNRzU6sjVlI5np5vY3smZt3Bm0hiHSUKWCFVNBvsti4kcIXzoo404JgETYNZm3jFz9RqwIaYXc1EkR04OvSl--qmecfn1joCssmvae0nEbwYlCXOUqjK0bzhqCUi3T7it_0alksyOHHXTp8ir3aGJwhE6rY9nxOiBrBC_8NPzNDN4YTDfcXq8lASjlkdRkdLouNQsjPw',
//     },
//   },
//   {
//     id: 2,
//     name: 'Lisinopril',
//     dosage: '10mg Tablet',
//     type: 'Blood Pressure',
//     status: 'Active',
//     icon: 'pill',
//     iconBg: 'blue',
//     schedule: {
//       morning: 1,
//       noon: 0,
//       night: 0,
//       instruction: 'Before Breakfast',
//     },
//     progress: {
//       current: 12,
//       total: 30,
//       dosesLeft: 18,
//       percentage: 40,
//     },
//     doctor: {
//       name: 'Dr. Michael Chen',
//       specialty: 'General',
//       date: 'Oct 20',
//       image:
//         'https://lh3.googleusercontent.com/aida-public/AB6AXuDkxmrXCsoX3dc9t33QWhQ6-Saf4rn3YElsSBw3TWWE4fFu_IVx3tj3BWpRa06H_quhqjTHzYmeiEJdJVfXnk_il9yYQ5DTZfXmYA25gbar0yoqUXbLvpRe4-B4e4G6Wsc-OVVcb2mXG2ysLrizf37wHuKbd9yde3PfcOUCAvzJdK4E57FPCzQlYDDwJ4KUaQFPu_buSjXSjqE5_x89qoL9n1O9idHmyaQx53BPwYWPZVDQ2DaYivMogX2lPHdA2PL1DzweZFsH43c',
//     },
//   },
// ];

// const pastPrescriptions: PastPrescription[] = [
//   {
//     id: 1,
//     name: 'Ibuprofen 400mg',
//     description: 'Pain relief',
//     doctor: {
//       name: 'Dr. J. Doe',
//       initials: 'JD',
//       color: 'purple',
//     },
//     date: 'Sep 12, 2023',
//     status: 'Completed',
//     action: 'Reorder',
//   },
//   {
//     id: 2,
//     name: 'Azithromycin 250mg',
//     description: 'Antibiotic',
//     doctor: {
//       name: 'Dr. S. Jenkins',
//       image:
//         'https://lh3.googleusercontent.com/aida-public/AB6AXuAGTe54p5D2af--MQHWnAodeRJ5QlJ3mEWPJcPMqvs4TSI2MQDx5hzYFeLoW0EbofmrjfFJJc7W13ZrljXz6raSgWw4rtNNBhbzkReWxVYAJ_fTlTQzyrIiBUUTb88YGrU3aGiPnncr1uFADj9gVkHOZyH44TKzEMd-ZngWp4VVk9NYkuG9h15WKaBMILaI52B0Yo7QQcDMomELoMxkDdh4pX1LwAzlMmGREG-EcGtjUMiROmTiJ5aKvbdJ1ElMcpURhoC-7BgGsR4',
//     },
//     date: 'Aug 28, 2023',
//     status: 'Completed',
//     action: 'download',
//   },
// ];

// // Helper to get icon component based on prescription type
// const getPrescriptionIcon = (icon: string, iconBg: string) => {
//   const iconClass = `h-5 w-5 text-${iconBg}-600 dark:text-${iconBg}-400`;
//   switch (icon) {
//     case 'medication':
//       return <FileText className={iconClass} />;
//     default:
//       return <Pill className={iconClass} />;
//   }
// };

// export default function PrescriptionsPage() {
//   const [searchQuery, setSearchQuery] = useState('');

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Sidebar />
//       <div className="flex-1 flex flex-col">
//         <Header
//           searchQuery={searchQuery}
//           onSearchChange={setSearchQuery}
//           searchPlaceholder="Search medications or doctors..."
//           nextAppointmentTime="Today, 2:00 PM"
//           notificationCount={1}
//         />

//         <main className="flex-1 overflow-y-auto p-6 md:p-8">
//           {/* Page Header */}
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//               My Prescriptions
//             </h1>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               Manage your active medications and prescription history.
//             </p>
//           </div>

//           {/* Active Prescriptions */}
//           <section className="mb-12">
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
//                 Active Prescriptions
//               </h2>
//               <span className="text-sm text-gray-500">Updated today</span>
//             </div>

//             <div className="grid grid-cols-1 gap-6">
//               {activePrescriptions.map((prescription) => (
//                 <Card
//                   key={prescription.id}
//                   className="group hover:shadow-lg transition-shadow duration-200 border-0 shadow-sm"
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
//                       {/* Medicine Info */}
//                       <div className="flex items-start gap-4 lg:w-1/3">
//                         <div
//                           className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 ${
//                             prescription.iconBg === 'green'
//                               ? 'bg-green-50 dark:bg-green-900/20'
//                               : prescription.iconBg === 'blue'
//                               ? 'bg-blue-50 dark:bg-blue-900/20'
//                               : 'bg-purple-50 dark:bg-purple-900/20'
//                           }`}
//                         >
//                           {getPrescriptionIcon(prescription.icon, prescription.iconBg)}
//                         </div>
//                         <div>
//                           <div className="flex items-center gap-3 mb-1">
//                             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                               {prescription.name}
//                             </h3>
//                             <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
//                               {prescription.status}
//                             </Badge>
//                           </div>
//                           <p className="text-sm text-gray-500 dark:text-gray-400">
//                             {prescription.dosage} • {prescription.type}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Schedule Visual */}
//                       <div className="flex flex-col items-center gap-2 lg:border-l lg:border-r border-gray-200 dark:border-gray-700 lg:px-8 lg:w-1/3">
//                         <div className="flex items-center gap-3">
//                           <div className="flex flex-col items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg min-w-[4rem]">
//                             <Sun className="h-4 w-4 text-green-600 dark:text-green-400 mb-1" />
//                             <span className="text-xs font-bold text-green-700 dark:text-green-300">
//                               {prescription.schedule.morning}
//                             </span>
//                           </div>
//                           <div className="flex flex-col items-center p-2 bg-gray-100 dark:bg-gray-700 rounded-lg min-w-[4rem]">
//                             <Sunset className="h-4 w-4 text-gray-500 dark:text-gray-400 mb-1" />
//                             <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
//                               {prescription.schedule.noon}
//                             </span>
//                           </div>
//                           <div
//                             className={`flex flex-col items-center p-2 min-w-[4rem] rounded-lg ${
//                               prescription.schedule.night > 0
//                                 ? 'bg-green-50 dark:bg-green-900/20'
//                                 : 'bg-gray-100 dark:bg-gray-700'
//                             }`}
//                           >
//                             <Moon
//                               className={`h-4 w-4 mb-1 ${
//                                 prescription.schedule.night > 0
//                                   ? 'text-green-600 dark:text-green-400'
//                                   : 'text-gray-500 dark:text-gray-400'
//                               }`}
//                             />
//                             <span
//                               className={`text-xs font-bold ${
//                                 prescription.schedule.night > 0
//                                   ? 'text-green-700 dark:text-green-300'
//                                   : 'text-gray-600 dark:text-gray-300'
//                               }`}
//                             >
//                               {prescription.schedule.night}
//                             </span>
//                           </div>
//                         </div>
//                         <p className="text-xs font-medium text-gray-500">
//                           {prescription.schedule.instruction}
//                         </p>
//                       </div>

//                       {/* Doctor & Actions */}
//                       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 lg:w-1/3">
//                         <div className="flex items-center gap-3 w-full sm:w-auto">
//                           <div className="relative h-10 w-10 shrink-0">
//                             <Image
//                               src={prescription.doctor.image}
//                               alt={prescription.doctor.name}
//                               fill
//                               className="rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
//                             />
//                           </div>
//                           <div>
//                             <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                               {prescription.doctor.name}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               {prescription.doctor.specialty} • {prescription.doctor.date}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
//                           <Button variant="ghost" size="icon" className="h-9 w-9">
//                             <Download className="h-4 w-4" />
//                           </Button>
//                           <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md">
//                             <ShoppingCart className="h-4 w-4 mr-2" />
//                             Order
//                           </Button>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Progress Bar */}
//                     <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-4 text-xs">
//                       <span className="text-gray-500 whitespace-nowrap">
//                         Day {prescription.progress.current} of {prescription.progress.total}
//                       </span>
//                       <Progress value={prescription.progress.percentage} className="h-1.5" />
//                       <span className="text-gray-900 dark:text-white font-medium whitespace-nowrap">
//                         {prescription.progress.dosesLeft} doses left
//                       </span>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </section>

//           {/* Past Prescriptions */}
//           <section>
//             <div className="flex items-center justify-between mb-6">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Past Prescriptions
//               </h2>
//               <Button variant="link" className="text-green-600 dark:text-green-400 gap-1">
//                 View all history
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>

//             <Card className="border-0 shadow-sm overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm text-left">
//                   <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
//                     <tr>
//                       <th className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">
//                         Medication
//                       </th>
//                       <th className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">
//                         Prescribed By
//                       </th>
//                       <th className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">
//                         Date
//                       </th>
//                       <th className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300">
//                         Status
//                       </th>
//                       <th className="px-6 py-4 font-medium text-gray-600 dark:text-gray-300 text-right">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
//                     {pastPrescriptions.map((prescription) => (
//                       <tr
//                         key={prescription.id}
//                         className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
//                       >
//                         <td className="px-6 py-4">
//                           <p className="font-semibold text-gray-900 dark:text-white">
//                             {prescription.name}
//                           </p>
//                           <p className="text-xs text-gray-500">{prescription.description}</p>
//                         </td>
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-2">
//                             {prescription.doctor.image ? (
//                               <div className="relative h-6 w-6">
//                                 <Image
//                                   src={prescription.doctor.image}
//                                   alt={prescription.doctor.name}
//                                   fill
//                                   className="rounded-full object-cover"
//                                 />
//                               </div>
//                             ) : (
//                               <div
//                                 className={`h-6 w-6 rounded-full bg-${prescription.doctor.color}-100 dark:bg-${prescription.doctor.color}-900/30 flex items-center justify-center text-xs font-bold text-${prescription.doctor.color}-600 dark:text-${prescription.doctor.color}-400`}
//                               >
//                                 {prescription.doctor.initials}
//                               </div>
//                             )}
//                             <span className="text-gray-700 dark:text-gray-300">
//                               {prescription.doctor.name}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
//                           {prescription.date}
//                         </td>
//                         <td className="px-6 py-4">
//                           <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800">
//                             {prescription.status}
//                           </Badge>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           {prescription.action === 'Reorder' ? (
//                             <Button
//                               variant="link"
//                               className="text-green-600 dark:text-green-400 p-0 h-auto"
//                             >
//                               Reorder
//                             </Button>
//                           ) : (
//                             <Button variant="ghost" size="icon" className="h-8 w-8">
//                               <Download className="h-4 w-4" />
//                             </Button>
//                           )}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
//                 <Button variant="link" className="text-gray-500 hover:text-green-600">
//                   Load More History
//                 </Button>
//               </div>
//             </Card>
//           </section>

//           {/* Quick Stats */}
//           <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
//             {[
//               {
//                 title: 'Active Prescriptions',
//                 value: '2',
//                 subtext: 'Refills available',
//                 icon: Pill,
//               },
//               {
//                 title: 'Next Refill Due',
//                 value: 'Nov 12',
//                 subtext: 'Amoxicillin',
//                 icon: Calendar,
//               },
//               {
//                 title: 'Total Completed',
//                 value: '8',
//                 subtext: 'Last 6 months',
//                 icon: Activity,
//               },
//             ].map((stat, idx) => {
//               const Icon = stat.icon;
//               return (
//                 <Card key={idx} className="border-0 shadow-sm">
//                   <CardContent className="p-5 flex items-start gap-4">
//                     <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/20">
//                       <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
//                       <p className="text-2xl font-bold text-gray-900 dark:text-white">
//                         {stat.value}
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                         {stat.subtext}
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </div>

//           {/* Disclaimer */}
//           <footer className="mt-12 text-center">
//             <p className="text-xs text-gray-400 max-w-2xl mx-auto">
//               Disclaimer: This digital prescription record is for information management purposes.
//               Always consult the official printed prescription or your doctor for precise medical
//               advice. In case of emergency, contact local emergency services immediately.
//             </p>
//           </footer>
//         </main>
//       </div>
//     </div>
//   );
// }
// app/patient/prescriptions/page.tsx

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Sidebar from "@/components/patient/Sidebar";
// import Header from "@/components/patient/Header";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";

// import {
//   Pill,
//   Calendar,
//   Clock,
//   Download,
//   ShoppingCart,
//   CheckCircle,
//   Circle,
//   AlertCircle,
//   ChevronDown,
//   ChevronUp,
//   Sun,
//   Sunset,
//   Moon,
//   Menu,
//   X,
// } from "lucide-react";

// // Types (same as before)
// interface ActivePrescription {
//   id: number;
//   name: string;
//   dosage: string;
//   type: string;
//   status: "Active" | "Discontinued" | "Completed";
//   icon: "medication" | "pill";
//   iconBg: "green" | "blue" | "purple";
//   schedule: {
//     morning: number;
//     noon: number;
//     night: number;
//     instruction: string;
//   };
//   progress: {
//     current: number;
//     total: number;
//     dosesLeft: number;
//     percentage: number;
//   };
//   doctor: {
//     name: string;
//     specialty: string;
//     date: string;
//     image: string;
//   };
// }

// interface PastPrescription {
//   id: number;
//   name: string;
//   description: string;
//   doctor: {
//     name: string;
//     initials?: string;
//     image?: string;
//     color?: string;
//   };
//   date: string;
//   status: string;
//   action: "Reorder" | "download";
// }

// const activePrescriptions: ActivePrescription[] = [
//   {
//     id: 1,
//     name: "Amoxicillin",
//     dosage: "500mg Capsule",
//     type: "Antibiotic",
//     status: "Active",
//     icon: "medication",
//     iconBg: "green",
//     schedule: {
//       morning: 1,
//       noon: 0,
//       night: 1,
//       instruction: "After Food",
//     },
//     progress: {
//       current: 3,
//       total: 5,
//       dosesLeft: 4,
//       percentage: 60,
//     },
//     doctor: {
//       name: "Dr. Sarah Jenkins",
//       specialty: "Cardiologist",
//       date: "Oct 24",
//       image:
//         "https://lh3.googleusercontent.com/aida-public/AB6AXuCRVN6DI6TlqUN_Tm6EOUAGXa7K_XpA39hZXJ8VMG8dYS852O25TUwP9gS0ZBurktpNxB5jNRzU6sjVlI5np5vY3smZt3Bm0hiHSUKWCFVNBvsti4kcIXzoo404JgETYNZm3jFz9RqwIaYXc1EkR04OvSl--qmecfn1joCssmvae0nEbwYlCXOUqjK0bzhqCUi3T7it_0alksyOHHXTp8ir3aGJwhE6rY9nxOiBrBC_8NPzNDN4YTDfcXq8lASjlkdRkdLouNQsjPw",
//     },
//   },
//   {
//     id: 2,
//     name: "Lisinopril",
//     dosage: "10mg Tablet",
//     type: "Blood Pressure",
//     status: "Active",
//     icon: "pill",
//     iconBg: "blue",
//     schedule: {
//       morning: 1,
//       noon: 0,
//       night: 0,
//       instruction: "Before Breakfast",
//     },
//     progress: {
//       current: 12,
//       total: 30,
//       dosesLeft: 18,
//       percentage: 40,
//     },
//     doctor: {
//       name: "Dr. Michael Chen",
//       specialty: "General",
//       date: "Oct 20",
//       image:
//         "https://lh3.googleusercontent.com/aida-public/AB6AXuDkxmrXCsoX3dc9t33QWhQ6-Saf4rn3YElsSBw3TWWE4fFu_IVx3tj3BWpRa06H_quhqjTHzYmeiEJdJVfXnk_il9yYQ5DTZfXmYA25gbar0yoqUXbLvpRe4-B4e4G6Wsc-OVVcb2mXG2ysLrizf37wHuKbd9yde3PfcOUCAvzJdK4E57FPCzQlYDDwJ4KUaQFPu_buSjXSjqE5_x89qoL9n1O9idHmyaQx53BPwYWPZVDQ2DaYivMogX2lPHdA2PL1DzweZFsH43c",
//     },
//   },
// ];

// const pastPrescriptions: PastPrescription[] = [
//   {
//     id: 1,
//     name: "Ibuprofen 400mg",
//     description: "Pain relief",
//     doctor: {
//       name: "Dr. J. Doe",
//       initials: "JD",
//       color: "purple",
//     },
//     date: "Sep 12, 2023",
//     status: "Completed",
//     action: "Reorder",
//   },
//   {
//     id: 2,
//     name: "Azithromycin 250mg",
//     description: "Antibiotic",
//     doctor: {
//       name: "Dr. S. Jenkins",
//       image:
//         "https://lh3.googleusercontent.com/aida-public/AB6AXuAGTe54p5D2af--MQHWnAodeRJ5QlJ3mEWPJcPMqvs4TSI2MQDx5hzYFeLoW0EbofmrjfFJJc7W13ZrljXz6raSgWw4rtNNBhbzkReWxVYAJ_fTlTQzyrIiBUUTb88YGrU3aGiPnncr1uFADj9gVkHOZyH44TKzEMd-ZngWp4VVk9NYkuG9h15WKaBMILaI52B0Yo7QQcDMomELoMxkDdh4pX1LwAzlMmGREG-EcGtjUMiROmTiJ5aKvbdJ1ElMcpURhoC-7BgGsR4",
//     },
//     date: "Aug 28, 2023",
//     status: "Completed",
//     action: "download",
//   },
// ];

// // Helper to render status icon
// const StatusIcon = ({ status }: { status: string }) => {
//   switch (status) {
//     case "Active":
//       return (
//         <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
//       );
//     case "Completed":
//       return (
//         <CheckCircle className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
//       );
//     default:
//       return <Circle className="h-5 w-5 text-gray-300 dark:text-gray-600 flex-shrink-0" />;
//   }
// };

// export default function PrescriptionsPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [expandedId, setExpandedId] = useState<number | null>(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Combine active and past into a single timeline (active first, then past)
//   const timeline = [
//     ...activePrescriptions.map((p) => ({ ...p, type: "active" })),
//     ...pastPrescriptions.map((p) => ({ ...p, type: "past" })),
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Mobile Menu Button - Improved with X icon when open */}
//  <button
//   className="lg:hidden fixed bottom-6 right-6 z-50 p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
//   onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//   aria-label="Toggle menu"
// >
//   {isSidebarOpen ? (
//     <X className="w-5 h-5" />
//   ) : (
//     <Menu className="w-5 h-5" />
//   )}
// </button>

//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

//       {/* Backdrop overlay - Improved with higher z-index and blur */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       <div className="flex-1 flex flex-col w-full lg:ml-0">
//         <Header
//           searchQuery={searchQuery}
//           onSearchChange={setSearchQuery}
//           searchPlaceholder="Search prescriptions..."
//           nextAppointmentTime="Today, 2:00 PM"
//           notificationCount={1}
//         />

//         <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
//           {/* Header with Mobile Background */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8
//                         bg-green-600 md:bg-transparent
//                         p-6 md:p-0
//                         rounded-2xl md:rounded-none
//                         shadow-lg md:shadow-none">
//             <div>
//               <h1 className="text-2xl font-bold text-white md:text-gray-900 dark:md:text-white mb-1">
//                 Prescription Timeline
//               </h1>
//               <p className="text-green-100 md:text-gray-500 dark:md:text-gray-400 text-sm">
//                 Chronological view of your medication history.
//               </p>
//             </div>
//           </div>

//           {/* Timeline - Mobile Optimized */}
//           <div className="relative">
//             {/* Vertical line - Hidden on very small screens? No, keep it but adjust */}
//             <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

//             <div className="space-y-4 sm:space-y-6">
//               {timeline.map((item) => {
//                 const isActive = item.type === "active";
//                 const isExpanded = expandedId === item.id;

//                 return (
//                   <div key={item.id} className="relative pl-10 sm:pl-14">
//                     {/* Timeline dot - Adjusted for mobile */}
//                     <div
//                       className={`absolute left-2 sm:left-4 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 ${
//                         isActive
//                           ? "bg-green-600 border-green-200 dark:border-green-900"
//                           : "bg-gray-400 border-gray-200 dark:border-gray-700"
//                       }`}
//                     />

//                     {/* Content card - Full width on mobile */}
//                     <div
//                       className={`bg-white dark:bg-gray-800 rounded-lg border ${
//                         isActive
//                           ? "border-green-200 dark:border-green-900 shadow-sm"
//                           : "border-gray-200 dark:border-gray-700"
//                       } p-4 sm:p-5 hover:shadow-md transition-shadow w-full`}
//                     >
//                       {/* Header row - Stack on mobile if needed */}
//                       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//                         <div className="flex items-start gap-3">
//                           <StatusIcon status={item.status} />
//                           <div className="min-w-0 flex-1">
//                             <h3 className="font-semibold text-gray-900 dark:text-white break-words">
//                               {item.name}
//                             </h3>
//                             <p className="text-sm text-gray-500 dark:text-gray-400 break-words">
//                               {isActive ? item.dosage : item.description}
//                             </p>
//                           </div>
//                         </div>
//                         <Badge
//                           className={`self-start sm:self-auto ${
//                             isActive
//                               ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
//                               : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
//                           }`}
//                         >
//                           {item.status}
//                         </Badge>
//                       </div>

//                       {/* Expandable details */}
//                       <div className="mt-4">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="p-0 h-auto text-gray-500 hover:text-green-600"
//                           onClick={() =>
//                             setExpandedId(isExpanded ? null : item.id)
//                           }
//                         >
//                           {isExpanded ? (
//                             <>
//                               Show less <ChevronUp className="ml-1 h-4 w-4" />
//                             </>
//                           ) : (
//                             <>
//                               Show details{" "}
//                               <ChevronDown className="ml-1 h-4 w-4" />
//                             </>
//                           )}
//                         </Button>

//                         {isExpanded && (
//                           <div className="mt-4 space-y-4">
//                             {isActive ? (
//                               // Active prescription details - Stack on mobile
//                               <>
//                                 <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">
//                                   {/* Schedule - Stack on mobile */}
//                                   <div className="w-full">
//                                     <p className="text-xs text-gray-500 mb-1">
//                                       Schedule
//                                     </p>
//                                     <div className="flex flex-wrap items-center gap-2">
//                                       <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">
//                                         <Sun className="h-3 w-3 text-green-600 flex-shrink-0" />
//                                         <span className="text-sm font-medium">
//                                           {item.schedule.morning}
//                                         </span>
//                                       </div>
//                                       <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
//                                         <Sunset className="h-3 w-3 text-gray-500 flex-shrink-0" />
//                                         <span className="text-sm font-medium">
//                                           {item.schedule.noon}
//                                         </span>
//                                       </div>
//                                       <div
//                                         className={`flex items-center gap-1 px-2 py-1 rounded ${
//                                           item.schedule.night > 0
//                                             ? "bg-green-50 dark:bg-green-900/20"
//                                             : "bg-gray-100 dark:bg-gray-700"
//                                         }`}
//                                       >
//                                         <Moon
//                                           className={`h-3 w-3 flex-shrink-0 ${
//                                             item.schedule.night > 0
//                                               ? "text-green-600"
//                                               : "text-gray-500"
//                                           }`}
//                                         />
//                                         <span className="text-sm font-medium">
//                                           {item.schedule.night}
//                                         </span>
//                                       </div>
//                                     </div>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                       {item.schedule.instruction}
//                                     </p>
//                                   </div>

//                                   {/* Progress - Stack on mobile */}
//                                   <div className="w-full">
//                                     <p className="text-xs text-gray-500 mb-1">
//                                       Progress
//                                     </p>
//                                     <div className="flex flex-col xs:flex-row xs:items-center gap-2">
//                                       <span className="text-xs text-gray-500 whitespace-nowrap">
//                                         Day {item.progress.current}/
//                                         {item.progress.total}
//                                       </span>
//                                       <Progress
//                                         value={item.progress.percentage}
//                                         className="h-1.5 w-full xs:flex-1"
//                                       />
//                                       <span className="text-xs font-medium whitespace-nowrap">
//                                         {item.progress.dosesLeft} left
//                                       </span>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 {/* Doctor info and actions - Stack on mobile */}
//                                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-2 gap-3">
//                                   <div className="flex items-center gap-2 min-w-0">
//                                     <div className="relative h-6 w-6 flex-shrink-0">
//                                       <Image
//                                         src={item.doctor.image}
//                                         alt={item.doctor.name}
//                                         fill
//                                         className="rounded-full object-cover"
//                                       />
//                                     </div>
//                                     <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
//                                       {item.doctor.name} • {item.doctor.date}
//                                     </span>
//                                   </div>
//                                   <div className="flex gap-2">
//                                     <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
//                                       <Download className="h-4 w-4 mr-1" />
//                                       PDF
//                                     </Button>
//                                     <Button
//                                       size="sm"
//                                       className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
//                                     >
//                                       <ShoppingCart className="h-4 w-4 mr-1" />
//                                       Refill
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </>
//                             ) : (
//                               // Past prescription details - Stack on mobile
//                               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                                 <div className="flex items-center gap-2 min-w-0">
//                                   {item.doctor.image ? (
//                                     <div className="relative h-6 w-6 flex-shrink-0">
//                                       <Image
//                                         src={item.doctor.image}
//                                         alt={item.doctor.name}
//                                         fill
//                                         className="rounded-full object-cover"
//                                       />
//                                     </div>
//                                   ) : (
//                                     <div
//                                       className={`h-6 w-6 rounded-full bg-${item.doctor.color}-100 dark:bg-${item.doctor.color}-900/30 flex items-center justify-center text-xs font-bold text-${item.doctor.color}-600 flex-shrink-0`}
//                                     >
//                                       {item.doctor.initials}
//                                     </div>
//                                   )}
//                                   <span className="text-sm text-gray-600 dark:text-gray-300 truncate">
//                                     {item.doctor.name} • {item.date}
//                                   </span>
//                                 </div>
//                                 <div>
//                                   {item.action === "Reorder" ? (
//                                     <Button
//                                       variant="link"
//                                       className="text-green-600 p-0 h-auto"
//                                     >
//                                       Reorder
//                                     </Button>
//                                   ) : (
//                                     <Button
//                                       variant="ghost"
//                                       size="icon"
//                                       className="h-8 w-8"
//                                     >
//                                       <Download className="h-4 w-4" />
//                                     </Button>
//                                   )}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Footer Disclaimer */}
//           <footer className="mt-12 text-center px-4">
//             <p className="text-xs text-gray-400 max-w-2xl mx-auto">
//               Disclaimer: This digital prescription record is for information
//               management purposes. Always consult the official printed
//               prescription or your doctor for precise medical advice. In case of
//               emergency, contact local emergency services immediately.
//             </p>
//           </footer>
//         </main>
//       </div>
//     </div>
//   );
// }

// app/patient/prescriptions/page.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/patient/Sidebar";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Pill,
  Calendar,
  Download,
  ShoppingCart,
  CheckCircle,
  Circle,
  Sun,
  Sunset,
  Moon,
  Menu,
  X,
  User,
  FileText,
} from "lucide-react";

// Types
interface ActivePrescription {
  id: number;
  name: string;
  dosage: string;
  type: string;
  status: "Active" | "Discontinued" | "Completed";
  icon: "medication" | "pill";
  iconBg: "green" | "blue" | "purple";
  schedule: {
    morning: number;
    noon: number;
    night: number;
    instruction: string;
  };
  progress: {
    current: number;
    total: number;
    dosesLeft: number;
    percentage: number;
  };
  doctor: {
    name: string;
    specialty: string;
    date: string;
    image: string;
  };
}

interface PastPrescription {
  id: number;
  name: string;
  description: string;
  doctor: {
    name: string;
    initials?: string;
    image?: string;
    color?: string;
  };
  date: string;
  status: string;
  action: "Reorder" | "download";
}

const activePrescriptions: ActivePrescription[] = [
  {
    id: 1,
    name: "Amoxicillin",
    dosage: "500mg Capsule",
    type: "Antibiotic",
    status: "Active",
    icon: "medication",
    iconBg: "green",
    schedule: {
      morning: 1,
      noon: 0,
      night: 1,
      instruction: "After Food",
    },
    progress: {
      current: 3,
      total: 5,
      dosesLeft: 4,
      percentage: 60,
    },
    doctor: {
      name: "Dr. Sarah Jenkins",
      specialty: "Cardiologist",
      date: "Oct 24",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCRVN6DI6TlqUN_Tm6EOUAGXa7K_XpA39hZXJ8VMG8dYS852O25TUwP9gS0ZBurktpNxB5jNRzU6sjVlI5np5vY3smZt3Bm0hiHSUKWCFVNBvsti4kcIXzoo404JgETYNZm3jFz9RqwIaYXc1EkR04OvSl--qmecfn1joCssmvae0nEbwYlCXOUqjK0bzhqCUi3T7it_0alksyOHHXTp8ir3aGJwhE6rY9nxOiBrBC_8NPzNDN4YTDfcXq8lASjlkdRkdLouNQsjPw",
    },
  },
  {
    id: 2,
    name: "Lisinopril",
    dosage: "10mg Tablet",
    type: "Blood Pressure",
    status: "Active",
    icon: "pill",
    iconBg: "blue",
    schedule: {
      morning: 1,
      noon: 0,
      night: 0,
      instruction: "Before Breakfast",
    },
    progress: {
      current: 12,
      total: 30,
      dosesLeft: 18,
      percentage: 40,
    },
    doctor: {
      name: "Dr. Michael Chen",
      specialty: "General",
      date: "Oct 20",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDkxmrXCsoX3dc9t33QWhQ6-Saf4rn3YElsSBw3TWWE4fFu_IVx3tj3BWpRa06H_quhqjTHzYmeiEJdJVfXnk_il9yYQ5DTZfXmYA25gbar0yoqUXbLvpRe4-B4e4G6Wsc-OVVcb2mXG2ysLrizf37wHuKbd9yde3PfcOUCAvzJdK4E57FPCzQlYDDwJ4KUaQFPu_buSjXSjqE5_x89qoL9n1O9idHmyaQx53BPwYWPZVDQ2DaYivMogX2lPHdA2PL1DzweZFsH43c",
    },
  },
];

const pastPrescriptions: PastPrescription[] = [
  {
    id: 1,
    name: "Ibuprofen 400mg",
    description: "Pain relief",
    doctor: {
      name: "Dr. J. Doe",
      initials: "JD",
      color: "purple",
    },
    date: "Sep 12, 2023",
    status: "Completed",
    action: "Reorder",
  },
  {
    id: 2,
    name: "Azithromycin 250mg",
    description: "Antibiotic",
    doctor: {
      name: "Dr. S. Jenkins",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAGTe54p5D2af--MQHWnAodeRJ5QlJ3mEWPJcPMqvs4TSI2MQDx5hzYFeLoW0EbofmrjfFJJc7W13ZrljXz6raSgWw4rtNNBhbzkReWxVYAJ_fTlTQzyrIiBUUTb88YGrU3aGiPnncr1uFADj9gVkHOZyH44TKzEMd-ZngWp4VVk9NYkuG9h15WKaBMILaI52B0Yo7QQcDMomELoMxkDdh4pX1LwAzlMmGREG-EcGtjUMiROmTiJ5aKvbdJ1ElMcpURhoC-7BgGsR4",
    },
    date: "Aug 28, 2023",
    status: "Completed",
    action: "download",
  },
];

// Helper to render status icon
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "Active":
      return (
        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
      );
    case "Completed":
      return (
        <CheckCircle className="h-4 w-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
      );
    default:
      return (
        <Circle className="h-4 w-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
      );
  }
};

export default function PrescriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Menu Button - Smaller */}
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

      <div className="flex-1 flex flex-col w-full lg:ml-0">
        <main className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 py-4 lg:py-6">
          {/* Header with Mobile Background - Smaller padding */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                My Prescriptions
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-0.5">
                Manage your active medications and prescription history.
              </p>
            </div>
          </div>

          {/* Tabs - Smaller */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-sm grid-cols-2 mb-4">
              <TabsTrigger value="active" className="text-xs md:text-sm py-1.5">
                Active
              </TabsTrigger>
              <TabsTrigger value="past" className="text-xs md:text-sm py-1.5">
                Past
              </TabsTrigger>
            </TabsList>

            {/* Active Prescriptions Tab - Smaller cards */}
            <TabsContent value="active" className="space-y-3">
              {activePrescriptions.map((prescription) => (
                <Card
                  key={prescription.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 md:p-5">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      {/* Left Column */}
                      <div className="flex-1 space-y-3">
                        {/* Medicine Header - Smaller */}
                        <div className="flex items-start gap-3">
                          <div
                            className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
                              prescription.iconBg === "green"
                                ? "bg-green-50 dark:bg-green-900/20"
                                : prescription.iconBg === "blue"
                                  ? "bg-blue-50 dark:bg-blue-900/20"
                                  : "bg-purple-50 dark:bg-purple-900/20"
                            }`}
                          >
                            <Pill
                              className={`h-5 w-5 ${
                                prescription.iconBg === "green"
                                  ? "text-green-600 dark:text-green-400"
                                  : prescription.iconBg === "blue"
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-purple-600 dark:text-purple-400"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
                                {prescription.name}
                              </h3>
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs px-2 py-0">
                                {prescription.status}
                              </Badge>
                            </div>
                            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                              {prescription.dosage} • {prescription.type}
                            </p>
                          </div>
                        </div>

                        {/* Schedule Cards - Smaller */}
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-0.5">
                              <Sun className="h-3 w-3 text-green-600 dark:text-green-400" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                Morn
                              </span>
                            </div>
                            <p className="text-base font-bold text-green-700 dark:text-green-300">
                              {prescription.schedule.morning}
                            </p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2">
                            <div className="flex items-center gap-1 mb-0.5">
                              <Sunset className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                Noon
                              </span>
                            </div>
                            <p className="text-base font-bold text-gray-700 dark:text-gray-300">
                              {prescription.schedule.noon}
                            </p>
                          </div>
                          <div
                            className={`rounded-lg p-2 ${
                              prescription.schedule.night > 0
                                ? "bg-green-50 dark:bg-green-900/20"
                                : "bg-gray-50 dark:bg-gray-800/50"
                            }`}
                          >
                            <div className="flex items-center gap-1 mb-0.5">
                              <Moon
                                className={`h-3 w-3 ${
                                  prescription.schedule.night > 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              />
                              <span className="text-xs text-gray-600 dark:text-gray-400">
                                Night
                              </span>
                            </div>
                            <p
                              className={`text-base font-bold ${
                                prescription.schedule.night > 0
                                  ? "text-green-700 dark:text-green-300"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {prescription.schedule.night}
                            </p>
                          </div>
                        </div>

                        {/* Instruction - Smaller */}
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                          {prescription.schedule.instruction}
                        </p>

                        {/* Progress Bar - Smaller */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400">
                              Progress
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              Day {prescription.progress.current}/
                              {prescription.progress.total}
                            </span>
                          </div>
                          <Progress
                            value={prescription.progress.percentage}
                            className="h-1.5"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {prescription.progress.dosesLeft} doses left
                          </p>
                        </div>
                      </div>

                      {/* Right Column - Smaller */}
                      <div className="lg:w-64 space-y-3">
                        {/* Doctor Card - Smaller */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                          <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                            Prescribed By
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="relative h-10 w-10 flex-shrink-0">
                              <Image
                                src={prescription.doctor.image}
                                alt={prescription.doctor.name}
                                fill
                                className="rounded-full object-cover ring-2 ring-white dark:ring-gray-700"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {prescription.doctor.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {prescription.doctor.specialty}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <Calendar className="h-3 w-3" />
                            <span>{prescription.doctor.date}</span>
                          </div>
                        </div>

                        {/* Action Buttons - Smaller */}
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 h-8 text-xs"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 h-8 text-xs bg-green-600 hover:bg-green-700"
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Refill
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Past Prescriptions Tab - Smaller */}
            <TabsContent value="past" className="space-y-2">
              {pastPrescriptions.map((prescription) => (
                <Card
                  key={prescription.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {prescription.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {prescription.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0"
                            >
                              {prescription.status}
                            </Badge>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {prescription.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-11 sm:ml-0">
                        {prescription.action === "Reorder" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Reorder
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Doctor info - Smaller */}
                    <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                        <User className="h-3 w-3" />
                        <span>{prescription.doctor.name}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>

          {/* Footer Disclaimer - Smaller */}
          <footer className="mt-8 text-center">
            <p className="text-xs text-gray-400 max-w-2xl mx-auto px-2">
              Disclaimer: This digital prescription record is for information
              management purposes. Always consult your doctor for medical
              advice.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
