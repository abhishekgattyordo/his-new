// 'use client';

// import { useState } from 'react';
// import { usePathname } from 'next/navigation';

// interface HeaderProps {
//   /** Search query state – bind from parent */
//   searchQuery?: string;
//   /** Setter for search query – bind from parent */
//   onSearchChange?: (value: string) => void;
//   /** Optional custom placeholder for search input */
//   searchPlaceholder?: string;
//   /** Show/hide search bar (default: true) */
//   showSearch?: boolean;
//   /** Next appointment text – shown on desktop */
//   nextAppointment?: string;
//   /** Next appointment time – shown on desktop */
//   nextAppointmentTime?: string;
//   /** Number of unread notifications (badge) */
//   notificationCount?: number;
// }

// export default function Header({
//   searchQuery = '',
//   onSearchChange,
//   showSearch = true,
//   nextAppointment = 'Next Appointment',
//   nextAppointmentTime = 'Today, 2:00 PM',
//   notificationCount = 1,
// }: HeaderProps) {
//   const pathname = usePathname();

//   // Local state if no external handler is provided
//   const [localSearch, setLocalSearch] = useState('');

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     if (onSearchChange) {
//       onSearchChange(value);
//     } else {
//       setLocalSearch(value);
//     }
//   };

//   const displaySearchValue = onSearchChange ? searchQuery : localSearch;

//   return (
//     <header className="h-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-green-200 dark:border-green-900 px-6 flex items-center justify-between sticky top-0 z-40">
//       {/* Search Bar */}
//       {showSearch && (
//         <div className="flex-1 max-w-md hidden md:block">
//           <div className="relative group">
//             <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
//               search
//             </span>
//             <input
//               type="text"
//               value={displaySearchValue}
//               onChange={handleSearchChange}
//               className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-black/20 border border-transparent focus:border-green-500/50 focus:bg-white dark:focus:bg-black/40 focus:ring-0 rounded-lg text-sm transition-all outline-none"
             
//             />
//           </div>
//         </div>
//       )}

//       {/* Right Actions */}
//       <div className="flex items-center gap-4 ml-auto">
//         {/* Notifications */}
//         <button className="relative p-2 text-gray-500 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20">
//           <span className="material-icons">notifications</span>
//           {notificationCount > 0 && (
//             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
//           )}
//         </button>

//         {/* Divider */}
//         <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

//         {/* Next Appointment Info */}
//         <div className="text-right hidden sm:block">
//           <p className="text-xs text-gray-500">{nextAppointment}</p>
//           <p className="text-sm font-medium text-green-700 dark:text-green-400">
//             {nextAppointmentTime}
//           </p>
//         </div>
//       </div>
//     </header>
//   );
// }


import React from 'react'

const Header = () => {
  return (
    <div>
      
    </div>
  )
}

export default Header
