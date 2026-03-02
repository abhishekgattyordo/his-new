"use client";

import {
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  ChevronDown,
  LogOut,
  Settings,
  Bell,
  Heart,
  Stethoscope,
  Users,
  Calendar,
  FileText,
  ClipboardList,
  Activity,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  email: string;
  role: "admin" | "doctor" | "patient" | string;
  name: string;
}

// ========== ROLE‑BASED NAVIGATION CONFIG ==========
const roleNavConfig = {
  // Common items for all logged‑in users (or public)
  common: [
    { href: "/consult", label: "Consult" },
    { href: "/appointments", label: "Find Doctors" },
    { href: "/clinics", label: "Clinic Visits" },
    { href: "/health-records", label: "Health Records" },
  ],

  // Admin‑only items
  admin: [{ href: "/doctorstaffmanagement", label: "Staff Management" }],

  // Doctor‑only items (adjust paths to match your app)
  doctor: [
    { href: "/doctor/dashboard", label: "Dashboard", icon: Activity },
    { href: "/doctor/appointments", label: "Appointments", icon: Calendar },
    { href: "/doctor/patients", label: "My Patients", icon: Users },
    { href: "/doctor/schedule", label: "Schedule", icon: ClipboardList },
    { href: "/doctor/records", label: "Medical Records", icon: FileText },
  ],

  // Patient‑only items (if you need extra beyond "common")
  patient: [],
};

// Role‑specific dashboard home
const roleHomePage = {
  admin: "/healthcaredashboard",
  doctor: "/doctor/dashboard",
  patient: "/patient/dashboard",
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
        }
      }
    };
    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleLogout = () => {
    const role = user?.role;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);

    // Redirect based on role (or always to home)
    router.push("/");
  };

  const isLoggedIn = !!user;
  const currentRole = (user?.role as keyof typeof roleNavConfig) || "patient";

  // Combine common + role‑specific nav items
  const navItems = [
    ...roleNavConfig.common,
    ...(roleNavConfig[currentRole] || []),
  ];

  // Dynamic home link based on role
  const homeHref = isLoggedIn
    ? roleHomePage[currentRole as keyof typeof roleHomePage] || "/"
    : "/";

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo – dynamic home link */}
          <Link href={homeHref} className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-r from-green-600 to-green-400 rounded-xl flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Ordo HIS
              </span>
              <p className="text-xs text-gray-500 -mt-1">
                Healthcare Information System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation – role‑based */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth/User Buttons (unchanged) */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <button className="p-2 text-gray-600 hover:text-green-600 relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="relative">
                  <button
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <span className="text-gray-700 font-medium">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-medium text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        href="/patient/dashboard"
                        className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User size={16} />
                        <span>Dashboard</span>
                      </Link>

                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          className="flex items-center space-x-2 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                          onClick={handleLogout}
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="flex items-center space-x-2 px-4 py-2 text-green-600 hover:text-green-800 font-medium transition-colors">
                    <LogIn size={18} />
                    <span>Login</span>
                  </button>
                </Link>
                <Link href="/register">
                  <button className="flex items-center space-x-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <UserPlus size={18} />
                    <span>Sign Up</span>
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu – role‑based */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <div className="flex flex-col space-y-4">
              {isLoggedIn && (
                <div className="flex items-center space-x-3 px-2 py-3 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">View Profile</p>
                  </div>
                </div>
              )}

              {/* Mobile nav items – dynamically rendered */}
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 font-medium py-2 px-2 rounded-lg hover:bg-green-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4 space-y-3 border-t border-gray-100">
                {isLoggedIn ? (
                  <>
                    <Link href="/profile">
                      <button
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User size={18} />
                        <span>My Profile</span>
                      </button>
                    </Link>
                    <Link href="/appointments">
                      <button
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Heart size={18} />
                        <span>Appointments</span>
                      </button>
                    </Link>
                    <button
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <button
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn size={18} />
                        <span>Login</span>
                      </button>
                    </Link>
                    <Link href="/register">
                      <button
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all mt-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <UserPlus size={18} />
                        <span>Sign Up Free</span>
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
