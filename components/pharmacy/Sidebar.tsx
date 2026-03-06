
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Pill,
  Package,
  ShoppingCart,
  ClipboardList,
  Building2,
  BookOpen,
  AlertTriangle,
  ArrowLeftRight,
  Menu,
  X,
  User,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
   Receipt,  
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Navigation items with routes
  const navItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      href: '/pharmacy/dashboard',
      color: 'from-blue-500 to-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      icon: Pill,
      label: 'Medicines',
      href: '/pharmacy/medicines',
      badge: 2,
      color: 'from-green-500 to-green-700',
      iconColor: 'text-green-600'
    },
    {
      icon: ShoppingCart,
      label: 'Purchase Entry',
      href: '/pharmacy/purchase',
      color: 'from-purple-500 to-purple-700',
      iconColor: 'text-purple-600'
    },
    {
      icon: Package,
      label: 'Current Stock',
      href: '/pharmacy/stock',
      badge: 5,
      color: 'from-amber-500 to-amber-700',
      iconColor: 'text-amber-600'
    },
    {
      icon: Receipt,
      label: 'Billing',
      href: '/pharmacy/billingpage',
      color: 'from-teal-500 to-teal-700',
      iconColor: 'text-teal-600'
    },
    {
      icon: ClipboardList,
      label: 'OP Dispense',
      href: '/pharmacy/op-dispense',
      color: 'from-emerald-500 to-emerald-700',
      iconColor: 'text-emerald-600'
    },
    {
      icon: Building2,
      label: 'IP Issue',
      href: '/pharmacy/ip-issue',
      color: 'from-indigo-500 to-indigo-700',
      iconColor: 'text-indigo-600'
    },
    {
      icon: BookOpen,
      label: 'Ledger',
      href: '/pharmacy/ledger',
      color: 'from-cyan-500 to-cyan-700',
      iconColor: 'text-cyan-600'
    },
    {
      icon: AlertTriangle,
      label: 'Expiry Report',
      href: '/pharmacy/expiry-report',
      badge: 3,
      color: 'from-red-500 to-red-700',
      iconColor: 'text-red-600'
    },
    {
      icon: ArrowLeftRight,
      label: 'Stock Adjustment',
      href: '/pharmacy/stock-adjustment',
      color: 'from-orange-500 to-orange-700',
      iconColor: 'text-orange-600'
    },
  ];

  // const quickAccessItems = [
  //   {
  //     icon: Pill,
  //     label: 'Quick Dispense',
  //     href: '/pharmacy/quick-dispense',
  //     iconBg: 'bg-green-50 dark:bg-green-900/30',
  //     iconColor: 'text-green-600 dark:text-green-400'
  //   }
   
  // ];

  // Function to handle link click (for mobile)
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // Check if a link is active
  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <aside
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 fixed lg:sticky top-0 z-40 ${
        isCollapsed ? 'w-24' : 'w-80'  // Increased from w-20 to w-24 (96px) and w-64 to w-72 (288px)
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
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} border-b border-gray-100 dark:border-gray-800 relative`}>
        {!isCollapsed ? (
          <Link 
            href="/pharmacy/dashboard" 
            className="flex items-center gap-3"
            onClick={handleLinkClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Pill className="text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">PharmaCare</h1>
              <p className="text-[16px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">
                Pharmacy Management
              </p>
            </div>
          </Link>
        ) : (
          <Link 
            href="/pharmacy/dashboard" 
            className="flex items-center justify-center"
            onClick={handleLinkClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Pill className="text-xl" />
            </div>
          </Link>
        )}
        
        {/* Collapse Button - Only visible on desktop */}
        <button
          onClick={toggleCollapse}
          className={`hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            isCollapsed ? 'absolute -right-3.5 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm' : ''
          }`}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="text-gray-600 dark:text-gray-300 text-base" />
          ) : (
            <ChevronLeft className="text-gray-600 dark:text-gray-300 text-base" />
          )}
        </button>
      </div>

      {/* Navigation - Fixed height with scrollable content */}
      <div className="flex-1 flex flex-col min-h-0">
        <nav className="flex-1 overflow-y-auto px-3 py-6">
          {/* Main Navigation */}
          <div className="mb-6">
            {!isCollapsed && (
              <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-3">
                Main Menu
              </p>
            )}
            <div className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={`flex items-center ${
                      isCollapsed ? 'justify-center' : 'justify-between gap-3'
                    } px-3 py-2.5 rounded-lg transition-all group relative ${
                      active
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-800/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/30 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <div className={`flex items-center ${isCollapsed ? '' : 'gap-3'}`}>
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                        active 
                          ? 'bg-green-600 text-white' 
                          : `bg-gradient-to-br ${item.color} text-white`
                      }`}>
                        <item.icon className="text-base" />
                      </div>
                      {!isCollapsed && (
                        <span className="text-sm font-medium">{item.label}</span>
                      )}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span className={`text-[12px] font-bold px-1.5 py-0.5 rounded-full ${
                        active 
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                    
                    {/* Show badge as dot when collapsed */}
                    {isCollapsed && item.badge && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Access */}
          {/* {!isCollapsed && (
            <div className="pt-4">
              <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-3">
                Quick Actions
              </p>
              <div className="space-y-1">
                {quickAccessItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} group-hover:scale-105 transition-transform`}>
                      <item.icon className="text-base" />
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )} */}
          
       
          {/* {isCollapsed && (
            <div className="pt-4 space-y-1">
              {quickAccessItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center justify-center px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group relative"
                  title={item.label}
                >
                  <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor} group-hover:scale-105 transition-transform`}>
                    <item.icon className="text-base" />
                  </div>
                </Link>
              ))}
            </div>
          )} */}
        </nav>

        {/* User Profile Section - Fixed at bottom */}
        <div className="mt-auto border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="p-4">
            <Link 
              href="/pharmacy/profile" 
              className={`flex items-center ${
                isCollapsed ? 'justify-center' : 'gap-3'
              } p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group`}
              onClick={handleLinkClick}
              title={isCollapsed ? "Pharmacist - Pharmacy Admin" : ""}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white font-semibold text-sm">
                PH
              </div>
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">Pharmacist</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">Pharmacy Admin</p>
                  </div>
                </>
              )}
            </Link>
            {!isCollapsed && (
              <div className="mt-3 px-2">
                <p className="text-[8px] text-gray-400 dark:text-gray-500">Pharmacy v1.0.0</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}