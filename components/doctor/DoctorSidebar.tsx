// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import {
//   Calendar,
//   LayoutDashboard,
//   Users,
//   CreditCard,
//   ChevronLeft,
//   ChevronRight,
//   User,
//   Plus,
//   Menu,
//   X,
//   Bell,
//   Search,
//   Settings,
//   LogOut,
//   Home,
//   Activity,
//   FileText,
//   Pill,
//   DollarSign,
//   Clock,
// } from 'lucide-react';

// interface DoctorSidebarProps {
//   collapsed: boolean;
//   activeSection: string;
//   navItems: any[];
//   doctorName: string;
//   doctorSpecialty: string;
//   doctorInitials: string;
//   isMobileOpen: boolean;
//   onToggle: () => void;
//   onMobileClose: () => void;
//    isOpen: boolean;
//   onClose: () => void;
// }

// export default function DoctorSidebar({ isOpen, onClose }: DoctorSidebarProps) {
//   const pathname = usePathname();
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleCollapse = () => {
//     setIsCollapsed(!isCollapsed);
//   };

//   // Navigation items for doctor
//   const navItems = [
//     {
//       icon: LayoutDashboard,
//       label: 'Dashboard',
//       href: '/doctor/dashboard',
//       color: 'from-emerald-500 to-emerald-700',
//       iconColor: 'text-emerald-600',
//     },
//     {
//       icon: Calendar,
//       label: 'Schedule',
//       href: '/doctor/schedule',
//       badge: '12',
//       color: 'from-blue-500 to-blue-700',
//       iconColor: 'text-blue-600',
//     },
    
//     {
//       icon: Users,
//       label: 'Patients',
//       href: '/doctor/patients',
//       badge: '5',
//       color: 'from-purple-500 to-purple-700',
//       iconColor: 'text-purple-600',
//     },
//     {
//       icon: CreditCard,
//       label: 'Billing',
//       href: '/doctor/billing',
//       badge: '3',
//       color: 'from-amber-500 to-amber-700',
//       iconColor: 'text-amber-600',
//     },
//   ];

//   const quickAccessItems = [
//     {
//       icon: User,
//       label: 'New Appointment',
//       href: '/doctor/appointments/new',
//       iconBg: 'bg-blue-50 dark:bg-blue-900/30',
//       iconColor: 'text-blue-600 dark:text-blue-400',
//     },
//     {
//       icon: FileText,
//       label: 'Medical Records',
//       href: '/doctor/records',
//       iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
//       iconColor: 'text-emerald-600 dark:text-emerald-400',
//     },
//   ];

//   const handleLinkClick = () => {
//     if (window.innerWidth < 1024) {
//       onClose();
//     }
//   };

//   const isActive = (href: string) => {
//     return pathname === href || pathname.startsWith(href + '/');
//   };

//   return (
//     <aside
//       className={`${
//         isOpen ? 'translate-x-0' : '-translate-x-full'
//       } lg:translate-x-0 fixed lg:sticky top-0 z-40 ${
//         isCollapsed ? 'w-20' : 'w-80'
//       } flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col transition-all duration-300 ease-out shadow-xl lg:shadow-none h-screen`}
//     >
//       {/* Close button for mobile */}
//       <button
//         className="lg:hidden absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//         onClick={onClose}
//       >
//         <X className="w-5 h-5" />
//       </button>

//       {/* Logo Section */}
//       <div
//         className={`p-6 flex items-center ${
//           isCollapsed ? 'justify-center' : 'justify-between'
//         } border-b border-gray-100 dark:border-gray-800 relative`}
//       >
//         {!isCollapsed ? (
//           <Link
//             href="/doctor/dashboard"
//             className="flex items-center gap-4"
//             onClick={handleLinkClick}
//           >
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white shadow-lg">
//               <Activity className="w-6 h-6" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold tracking-tight">HealthSync</h1>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">
//                 Doctor Portal
//               </p>
//             </div>
//           </Link>
//         ) : (
//           <Link
//             href="/doctor/dashboard"
//             className="flex items-center justify-center"
//             onClick={handleLinkClick}
//           >
//             <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white shadow-lg">
//               <Activity className="w-6 h-6" />
//             </div>
//           </Link>
//         )}

//         {/* Collapse Button */}
//         <button
//           onClick={toggleCollapse}
//           className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
//             isCollapsed
//               ? 'absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm'
//               : ''
//           }`}
//           title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
//         >
//           {isCollapsed ? (
//             <ChevronRight className="text-gray-600 dark:text-gray-300 w-4 h-4" />
//           ) : (
//             <ChevronLeft className="text-gray-600 dark:text-gray-300 w-4 h-4" />
//           )}
//         </button>
//       </div>

//       {/* Navigation */}
//       <div className="flex-1 flex flex-col min-h-0">
//         <nav className="flex-1 overflow-y-auto px-4 py-8">
//           {/* Main Navigation */}
//           <div className="mb-6">
//             {!isCollapsed && (
//               <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-4 mb-3">
//                 Main Navigation
//               </p>
//             )}
//             <div className="space-y-2">
//               {navItems.map((item) => {
//                 const active = isActive(item.href);
//                 return (
//                   <Link
//                     key={item.label}
//                     href={item.href}
//                     onClick={handleLinkClick}
//                     className={`flex items-center ${
//                       isCollapsed ? 'justify-center' : 'justify-between gap-4'
//                     } px-4 py-3 rounded-xl transition-all group relative ${
//                       active
//                         ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30 shadow-sm'
//                         : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
//                     }`}
//                     title={isCollapsed ? item.label : ''}
//                   >
//                     <div className={`flex items-center ${isCollapsed ? '' : 'gap-4'}`}>
//                       <div
//                         className={`w-8 h-8 flex items-center justify-center rounded-lg ${
//                           active
//                             ? 'bg-blue-500 text-white'
//                             : `bg-gradient-to-br ${item.color} text-white`
//                         }`}
//                       >
//                         <item.icon className="w-4 h-4" />
//                       </div>
//                       {!isCollapsed && (
//                         <span className="text-sm font-medium">{item.label}</span>
//                       )}
//                     </div>
//                     {!isCollapsed && item.badge && (
//                       <span
//                         className={`text-xs font-bold px-2 py-1 rounded-full ${
//                           active
//                             ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
//                             : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
//                         }`}
//                       >
//                         {item.badge}
//                       </span>
//                     )}
//                     {isCollapsed && item.badge && (
//                       <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
//                     )}
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Quick Access */}
//           {!isCollapsed && (
//             <div className="pt-8">
//               <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-4 mb-3">
//                 Quick Access
//               </p>
//               <div className="space-y-2">
//                 {quickAccessItems.map((item) => (
//                   <Link
//                     key={item.label}
//                     href={item.href}
//                     onClick={handleLinkClick}
//                     className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
//                   >
//                     <div
//                       className={`w-8 h-8 flex items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} group-hover:scale-105 transition-transform`}
//                     >
//                       <item.icon className="w-4 h-4" />
//                     </div>
//                     <span className="text-sm font-medium">{item.label}</span>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Quick Access Icons Only (when collapsed) */}
//           {isCollapsed && (
//             <div className="pt-8 space-y-2">
//               {quickAccessItems.map((item) => (
//                 <Link
//                   key={item.label}
//                   href={item.href}
//                   onClick={handleLinkClick}
//                   className="flex items-center justify-center px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group relative"
//                   title={item.label}
//                 >
//                   <div
//                     className={`w-8 h-8 flex items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} group-hover:scale-105 transition-transform`}
//                   >
//                     <item.icon className="w-4 h-4" />
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </nav>

//         {/* User Profile Section */}
//         <div className="mt-auto border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
//           <div className="p-4">
//             <Link
//               href="/doctor/profile"
//               className={`flex items-center ${
//                 isCollapsed ? 'justify-center' : 'gap-3'
//               } p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group`}
//               onClick={handleLinkClick}
//               title={isCollapsed ? 'Dr. Sarah Bennett - Cardiologist' : ''}
//             >
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm">
//                 SB
//               </div>
//               {!isCollapsed && (
//                 <>
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold truncate">Dr. Sarah Bennett</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Cardiologist</p>
//                   </div>
//                   <div className="p-1 rounded-lg bg-white dark:bg-gray-700 group-hover:bg-gray-100 dark:group-hover:bg-gray-600">
//                     <Settings className="w-3 h-3 text-gray-400" />
//                   </div>
//                 </>
//               )}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }


'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calendar,
  LayoutDashboard,
  Users,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  User,
  Plus,
  Menu,
  X,
  Bell,
  Search,
  Settings,
  LogOut,
  Home,
  Activity,
  FileText,
  Pill,
  DollarSign,
  Clock,
} from 'lucide-react';

// ✅ Updated interface – only includes the props actually used
interface DoctorSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DoctorSidebar({ isOpen, onClose }: DoctorSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation items for doctor
  const navItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/doctor/dashboard',
      color: 'from-emerald-500 to-emerald-700',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Calendar,
      label: 'Schedule',
      href: '/doctor/schedule',
      badge: '12',
      color: 'from-blue-500 to-blue-700',
      iconColor: 'text-blue-600',
    },
    {
      icon: Users,
      label: 'Patients',
      href: '/doctor/patients',
      badge: '5',
      color: 'from-purple-500 to-purple-700',
      iconColor: 'text-purple-600',
    },
    {
      icon: CreditCard,
      label: 'Billing',
      href: '/doctor/billing',
      badge: '3',
      color: 'from-amber-500 to-amber-700',
      iconColor: 'text-amber-600',
    },
  ];

  const quickAccessItems = [
    {
      icon: User,
      label: 'New Appointment',
      href: '/doctor/patients/new',
      iconBg: 'bg-blue-50 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    }
  
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:sticky top-0 z-40 ${
        isCollapsed ? 'w-20' : 'w-80'
      } flex-shrink-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col transition-all duration-300 ease-out shadow-xl lg:shadow-none h-screen`}
    >
      {/* Close button for mobile */}
      <button
        className="lg:hidden absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>

      {/* Logo Section */}
      <div
        className={`p-6 flex items-center ${
          isCollapsed ? 'justify-center' : 'justify-between'
        } border-b border-gray-100 dark:border-gray-800 relative`}
      >
        {!isCollapsed ? (
          <Link
            href="/doctor/dashboard"
            className="flex items-center gap-4"
            onClick={handleLinkClick}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">HealthSync</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">
                Doctor Portal
              </p>
            </div>
          </Link>
        ) : (
          <Link
            href="/doctor/dashboard"
            className="flex items-center justify-center"
            onClick={handleLinkClick}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Activity className="w-6 h-6" />
            </div>
          </Link>
        )}

        {/* Collapse Button */}
        <button
          onClick={toggleCollapse}
          className={`hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            isCollapsed
              ? 'absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm'
              : ''
          }`}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="text-gray-600 dark:text-gray-300 w-4 h-4" />
          ) : (
            <ChevronLeft className="text-gray-600 dark:text-gray-300 w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col min-h-0">
        <nav className="flex-1 overflow-y-auto px-4 py-8">
          {/* Main Navigation */}
          <div className="mb-6">
            {!isCollapsed && (
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-4 mb-3">
                Main Navigation
              </p>
            )}
            <div className="space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center ${
                      isCollapsed ? 'justify-center' : 'justify-between gap-4'
                    } px-4 py-3 rounded-xl transition-all group relative ${
                      active
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800/30 shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className={`flex items-center ${isCollapsed ? '' : 'gap-4'}`}>
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                          active
                            ? 'bg-blue-500 text-white'
                            : `bg-gradient-to-br ${item.color} text-white`
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      {!isCollapsed && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          active
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isCollapsed && item.badge && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Access */}
          {!isCollapsed && (
            <div className="pt-8">
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-4 mb-3">
                Quick Access
              </p>
              <div className="space-y-2">
                {quickAccessItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} group-hover:scale-105 transition-transform`}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quick Access Icons Only (when collapsed) */}
          {isCollapsed && (
            <div className="pt-8 space-y-2">
              {quickAccessItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-center px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group relative"
                  title={item.label}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} group-hover:scale-105 transition-transform`}
                  >
                    <item.icon className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* User Profile Section */}
        <div className="mt-auto border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="p-4">
            <Link
              href="/doctor/profile"
              className={`flex items-center ${
                isCollapsed ? 'justify-center' : 'gap-3'
              } p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group`}
              onClick={handleLinkClick}
              title={isCollapsed ? 'Dr. Sarah Bennett - Cardiologist' : ''}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm">
                SB
              </div>
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">Dr. Sarah Bennett</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Cardiologist</p>
                  </div>
                  <div className="p-1 rounded-lg bg-white dark:bg-gray-700 group-hover:bg-gray-100 dark:group-hover:bg-gray-600">
                    <Settings className="w-3 h-3 text-gray-400" />
                  </div>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}