"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Link from "next/link";
import {
  Search,
  Bell,
  Globe,
  Verified,
  Calendar,
  CalendarDays,
  Clock,
  Pill,
  Video,
  FileText,
  Activity,
  Download,
  ArrowRight,
  Home,
  Folder,
  CreditCard,
  Settings,
  User,
  Heart,
  TrendingUp,
  
  Stethoscope,
  MapPin,
  Phone,
  MessageSquare,
  HelpCircle,
  Shield,
  Users,
  Award
} from "lucide-react";
import Header from "@/components/ui/Header";


// Types
type AppointmentStatus = "confirmed" | "pending" | "cancelled";
type HealthMetricStatus = "normal" | "warning" | "critical";
type HealthGoalStatus = "active" | "completed" | "inactive";

interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  hospital: string;
  date: string;
  time: string;
  type: "teleconsult" | "in-person";
  status: AppointmentStatus;
  notes?: string;
}

interface Prescription {
  id: string;
  medicationName: string;
  dosage: string;
  doctorName: string;
  issuedDate: string;
  fileUrl?: string;
}

interface HealthMetric {
  id: string;
  type: string;
  value: string;
  unit: string;
  status: HealthMetricStatus;
  lastUpdated: string;
  trend?: "up" | "down" | "stable";
}

interface HealthGoal {
  id: string;
  title: string;
  current: number;
  target: number;
  unit: string;
  status: HealthGoalStatus;
}

// Mock Data
const upcomingAppointments: Appointment[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Jenkins",
    doctorSpecialty: "Cardiology",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    hospital: "City General Hospital",
    date: "Oct 24, 2024",
    time: "10:30 AM",
    type: "teleconsult",
    status: "confirmed",
    notes: "Join 5 mins before schedule"
  },
  {
    id: "2",
    doctorName: "Dr. Robert Chen",
    doctorSpecialty: "Endocrinology",
    doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    hospital: "Metro Medical Center",
    date: "Oct 28, 2024",
    time: "02:00 PM",
    type: "in-person",
    status: "confirmed",
    notes: "Fasting required for 12 hours"
  }
];

const recentPrescriptions: Prescription[] = [
  {
    id: "1",
    medicationName: "Amoxicillin",
    dosage: "500mg",
    doctorName: "Dr. Sarah Jenkins",
    issuedDate: "Oct 12, 2024",
    fileUrl: "#"
  },
  {
    id: "2",
    medicationName: "Lisinopril",
    dosage: "10mg",
    doctorName: "Dr. Robert Chen",
    issuedDate: "Sep 28, 2024",
    fileUrl: "#"
  },
  {
    id: "3",
    medicationName: "Metformin",
    dosage: "850mg",
    doctorName: "Dr. Robert Chen",
    issuedDate: "Sep 15, 2024",
    fileUrl: "#"
  }
];

const healthMetrics: HealthMetric[] = [
  {
    id: "1",
    type: "Blood Pressure",
    value: "120/80",
    unit: "mmHg",
    status: "normal",
    lastUpdated: "Today, 9:00 AM",
    trend: "stable"
  },
  {
    id: "2",
    type: "Heart Rate",
    value: "72",
    unit: "bpm",
    status: "normal",
    lastUpdated: "2 hours ago",
    trend: "stable"
  },
  {
    id: "3",
    type: "Blood Glucose",
    value: "98",
    unit: "mg/dL",
    status: "normal",
    lastUpdated: "Yesterday",
    trend: "down"
  },
  {
    id: "4",
    type: "Weight",
    value: "68.5",
    unit: "kg",
    status: "normal",
    lastUpdated: "3 days ago",
    trend: "down"
  }
];

const healthGoals: HealthGoal[] = [
  {
    id: "1",
    title: "Daily Steps",
    current: 7432,
    target: 10000,
    unit: "steps",
    status: "active"
  },
  {
    id: "2",
    title: "Water Intake",
    current: 1.8,
    target: 2.5,
    unit: "liters",
    status: "active"
  },
  {
    id: "3",
    title: "Sleep",
    current: 6.5,
    target: 8,
    unit: "hours",
    status: "active"
  }
];

const navigationItems = [
  { icon: Home, label: "Home", href: "/dashboard", active: true },
  { icon: Calendar, label: "Appointments", href: "/appointments" },
  { icon: Folder, label: "Medical Records", href: "/records" },
  { icon: CreditCard, label: "Billing", href: "/billing" },
  { icon: Settings, label: "Settings", href: "/settings" }
];

const patientData = {
  name: "John Doe",
  abhaId: "12-3456-7890",
  profileCompletion: 85,
  lastLogin: "Today, 10:00 AM",
  location: "San Francisco, CA",
  bloodType: "O+",
  age: 42,
  primaryDoctor: "Dr. Sarah Jenkins"
};

export default function PatientDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for dark mode preference
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  const handleJoinConsultation = (appointmentId: string) => {
    toast.success("Joining teleconsultation...");
    // In real app, would redirect to video call
    window.open("https://meet.example.com/consult", "_blank");
  };

  const handleDownloadPrescription = (prescriptionId: string) => {
    toast.info("Downloading prescription...");
    // In real app, would download the PDF
  };

  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "pending": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "cancelled": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
      case "confirmed": return "✓";
      case "pending": return "⏱";
      case "cancelled": return "✗";
      default: return "•";
    }
  };

  const getMetricStatusColor = (status: HealthMetricStatus) => {
    switch (status) {
      case "normal": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "warning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Top Navigation */}
      <Header/>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header & Profile Progress */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Profile Info */}
            <div className="flex gap-6 items-center flex-1">
              <Avatar className="w-28 h-28 rounded-2xl border-4 border-white dark:border-gray-800 shadow-lg">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
                  alt={patientData.name}
                />
                <AvatarFallback className="text-3xl font-bold bg-blue-100 text-blue-600">
                  JD
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back, {patientData.name.split(' ')[0]}!
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <Verified className="w-5 h-5 text-blue-500" />
                  <p className="text-gray-600 dark:text-gray-400">
                    ABHA ID: {patientData.abhaId}
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Last login: {patientData.lastLogin} from {patientData.location}
                </p>
              </div>
            </div>

            {/* Profile Completion */}
           
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.label}
                  variant={item.active ? "default" : "ghost"}
                  className={`flex-1 justify-center gap-2 ${item.active ? '' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
                  onClick={() => router.push(item.href)}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Appointments & Prescriptions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Appointments */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Upcoming Appointments
                  </h3>
                </div>
                <Button 
                  variant="link" 
                  className="text-blue-600 dark:text-blue-400"
                  onClick={() => router.push("/appointments")}
                >
                  View All
                </Button>
              </div>

              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="border-gray-200 dark:border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex gap-4">
                          <Avatar className="w-16 h-16 rounded-xl">
                            <AvatarImage src={appointment.doctorImage} alt={appointment.doctorName} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {appointment.doctorName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                              {appointment.doctorName}
                            </h4>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              {appointment.doctorSpecialty} • {appointment.hospital}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                <Calendar className="w-4 h-4" />
                                {appointment.date}
                              </span>
                              <span className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                <Clock className="w-4 h-4" />
                                {appointment.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          {appointment.type === "teleconsult" ? (
                            <Button
                              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2"
                              onClick={() => handleJoinConsultation(appointment.id)}
                            >
                            
                              Join Teleconsult
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              className="px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2"
                            >
                              <MapPin className="w-5 h-5" />
                              View Location
                            </Button>
                          )}
                          <Button
                            variant="link"
                            className="text-gray-500 dark:text-gray-400 text-sm font-medium py-1"
                          >
                            Reschedule Appointment
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusIcon(appointment.status)} {appointment.status}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">
                          {appointment.notes}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Recent Prescriptions */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                 
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    Recent Prescriptions
                  </h3>
                </div>
                <Button 
                  variant="link" 
                  className="text-blue-600 dark:text-blue-400"
                  onClick={() => router.push("/prescriptions")}
                >
                  View All
                </Button>
              </div>

              <Card className="border-gray-200 dark:border-gray-800">
                <CardContent className="p-0 divide-y divide-gray-100 dark:divide-gray-800">
                  {recentPrescriptions.map((prescription) => (
                    <div 
                      key={prescription.id}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {prescription.medicationName} ({prescription.dosage})
                          </h4>
                          <p className="text-xs text-gray-500">
                            {prescription.doctorName} • Issued {prescription.issuedDate}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                        onClick={() => handleDownloadPrescription(prescription.id)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Right Column - Health Metrics */}
          <div className="space-y-8">
            {/* Health Metrics */}
            <section>
              <div className="flex items-center gap-2 mb-4">
               
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Health Metrics
                </h3>
              </div>

              <div className="space-y-4">
                {healthMetrics.map((metric) => (
                  <Card key={metric.id} className="border-gray-200 dark:border-gray-800">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {metric.type}
                          </p>
                          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {metric.value} <span className="text-sm font-medium text-gray-400">{metric.unit}</span>
                          </h4>
                        </div>
                        <Badge className={getMetricStatusColor(metric.status)}>
                          {metric.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Last updated: {metric.lastUpdated}</span>
                        {metric.trend && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className={`w-4 h-4 ${
                              metric.trend === 'up' ? 'text-red-500' :
                              metric.trend === 'down' ? 'text-green-500' : 'text-blue-500'
                            }`} />
                            <span className="capitalize">{metric.trend}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Daily Health Goal */}
                <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                
                      <h4 className="font-bold">Daily Health Goal</h4>
                    </div>
                    
                    <div className="space-y-4">
                      {healthGoals.map((goal) => {
                        const progress = calculateProgress(goal.current, goal.target);
                        return (
                          <div key={goal.id} className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                              <span>{goal.title}</span>
                              <span>{goal.current} / {goal.target} {goal.unit}</span>
                            </div>
                            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-white h-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 bg-white/10 hover:bg-white/20 border-white/30 text-white"
                      onClick={() => router.push("/health/goals")}
                    >
                      Track More Goals
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Quick Stats */}
            <section>
              <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">5</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Prescriptions</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">12</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Records</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>

        {/* Emergency & Help Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Emergency Contact */}
          <Card className="border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                  <Phone className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Emergency Contact</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Available 24/7</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Emergency Hotline</div>
                      <div className="text-sm text-gray-500">24/7 medical emergency</div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white">911</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Poison Control</div>
                      <div className="text-sm text-gray-500">24/7 poison emergency</div>
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white">1-800-222-1222</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Need Help? */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">Need Help?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">We're here to support you</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start h-12" onClick={() => router.push("/support/chat")}>
                  <MessageSquare className="w-4 h-4 mr-3" />
                  Chat with Support
                </Button>
                <Button variant="outline" className="w-full justify-start h-12" onClick={() => router.push("/faq")}>
                  <HelpCircle className="w-4 h-4 mr-3" />
                  FAQ & Help Center
                </Button>
                <Button variant="outline" className="w-full justify-start h-12" onClick={() => router.push("/feedback")}>
                  <MessageSquare className="w-4 h-4 mr-3" />
                  Send Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
            <p>© 2024 HealthConnect. All health records are encrypted and HIPAA compliant.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}