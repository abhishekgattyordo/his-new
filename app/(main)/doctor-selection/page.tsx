

"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Search,
  SlidersHorizontal,
  Star,
  Calendar,
  CheckCircle2,
  X,
  UserX,
  Video,
  User,
  Stethoscope,
  Heart,
  Activity,
  Brain,
  Bone,
  Baby,
  Eye,
  ArrowUpDown,
  MapPin,
  Clock,
  Verified,
} from "lucide-react";
import Header from "@/components/ui/Header";
import { doctorsApi } from "@/lib/api/doctors";

// Types
type SortOption =
  | "recommended"
  | "rating"
  | "experience"
  | "price-low"
  | "price-high";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isOnline: boolean;
  isPremium: boolean;
  imageUrl: string;
  nextAvailableSlots: { time: string }[];
  consultationFee: number;
  price: number;
  profilePhoto: string;
  nextAvailable: string;
}

// Default placeholder image
const DEFAULT_AVATAR = "https://via.placeholder.com/400x400?text=Doctor";

// Mock data with valid image URLs
const mockDoctors: Doctor[] = [
  {
    id: "sarah",
    name: "Dr. Sarah Smith",
    specialty: "Cardiology",
    experience: 8,
    rating: 4.9,
    reviewCount: 120,
    isVerified: true,
    isOnline: true,
    isPremium: true,
    imageUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    profilePhoto:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    nextAvailableSlots: [{ time: "10:00 AM" }, { time: "2:00 PM" }],
    consultationFee: 1500,
    price: 1500,
    nextAvailable: "Today, 2:00 PM",
  },
  {
    id: "john",
    name: "Dr. John Doe",
    specialty: "General Practice",
    experience: 12,
    rating: 4.7,
    reviewCount: 85,
    isVerified: true,
    isOnline: false,
    isPremium: false,
    imageUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    profilePhoto:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    nextAvailableSlots: [{ time: "11:00 AM" }, { time: "3:00 PM" }],
    consultationFee: 1200,
    price: 1200,
    nextAvailable: "Tomorrow, 11:00 AM",
  },
  {
    id: "priya",
    name: "Dr. Priya Sharma",
    specialty: "Dermatology",
    experience: 6,
    rating: 4.8,
    reviewCount: 92,
    isVerified: true,
    isOnline: true,
    isPremium: true,
    imageUrl:
      "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=400&h=400&fit=crop&crop=face",
    profilePhoto:
      "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=400&h=400&fit=crop&crop=face",
    nextAvailableSlots: [{ time: "9:00 AM" }, { time: "1:00 PM" }],
    consultationFee: 1800,
    price: 1800,
    nextAvailable: "Tomorrow, 9:00 AM",
  },
  {
    id: "robert",
    name: "Dr. Robert Kim",
    specialty: "Neurology",
    experience: 15,
    rating: 4.9,
    reviewCount: 156,
    isVerified: true,
    isOnline: true,
    isPremium: true,
    imageUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    profilePhoto:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    nextAvailableSlots: [{ time: "11:00 AM" }, { time: "4:00 PM" }],
    consultationFee: 2000,
    price: 2000,
    nextAvailable: "Today, 4:00 PM",
  },
];

const specialties = [
  "Cardiology",
  "Dermatology",
  "General Practice",
  "Pediatrics",
  "Neurology",
  "Orthopedics",
  "Dentistry",
  "Ophthalmology",
];

export default function AppointmentBookingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const res = await doctorsApi.getDoctors();
        console.log("API Response:", res.data);

        let formattedDoctors: Doctor[] = [];
        
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          formattedDoctors = res.data.map((doc: any) => {
            // Validate and construct proper image URL
            let profilePhoto = DEFAULT_AVATAR;
            if (doc.avatar) {
              // Check if avatar is already a full URL
              if (doc.avatar.startsWith('http')) {
                profilePhoto = doc.avatar;
              } else {
                // Remove leading slash if present to avoid double slashes
                const avatarPath = doc.avatar.startsWith('/') ? doc.avatar : `/${doc.avatar}`;
                profilePhoto = `https://his-final.vercel.app/${avatarPath}`;
              }
            }

            return {
              id: doc.id?.toString() || Math.random().toString(),
              name: `Dr. ${doc.firstName || ''} ${doc.lastName || ''}`.trim(),
              specialty: doc.specialty || 'General Practice',
              experience: doc.experience || 5,
              rating: 4.5,
              reviewCount: 20,
              isVerified: true,
              isOnline: true,
              isPremium: false,
              profilePhoto: profilePhoto,
              imageUrl: profilePhoto,
              nextAvailableSlots: [{ time: "10:00 AM" }],
              consultationFee: doc.fee || 1000,
              price: doc.fee || 1000,
              nextAvailable: "Today",
            };
          });
        }

        setDoctors(formattedDoctors.length > 0 ? formattedDoctors : mockDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to load doctors. Showing sample data.");
        setDoctors(mockDoctors);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredAndSortedDoctors = useMemo(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesSearch =
        searchQuery === "" ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === "" ||
        doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();

      const matchesOnline = !onlineOnly || doctor.isOnline;
      const matchesPremium = !premiumOnly || doctor.isPremium;

      return matchesSearch && matchesSpecialty && matchesOnline && matchesPremium;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "experience":
          return b.experience - a.experience;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [doctors, searchQuery, selectedSpecialty, onlineOnly, premiumOnly, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("");
    setOnlineOnly(false);
    setPremiumOnly(false);
    setSortBy("recommended");
  };

  const handleImageError = (doctorId: string) => {
    setImageErrors(prev => ({ ...prev, [doctorId]: true }));
  };

  const FiltersSection = () => (
    <div className="space-y-6">
      {/* Search Bar - Moved to sidebar */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Search
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search doctors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Specialty
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          <button
            onClick={() => setSelectedSpecialty("")}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedSpecialty === ""
                ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 font-medium"
                : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            All Specialties
          </button>
          {specialties.map((specialty) => (
            <button
              key={specialty}
              onClick={() => setSelectedSpecialty(specialty)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedSpecialty === specialty
                  ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 font-medium"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Filters
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={onlineOnly}
              onChange={(e) => setOnlineOnly(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Online Doctors Only
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={premiumOnly}
              onChange={(e) => setPremiumOnly(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-500" />
              Premium Doctors Only
            </span>
          </label>
        </div>
      </div>

      {/* Sort Options in Sidebar for Mobile */}
      <div className="lg:hidden">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="recommended">Recommended </option>
          <option value="rating">Highest Rated</option>
          <option value="experience">Most Experienced</option>
          <option value="price-low">Price: Low to High </option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
      >
        Clear All Filters
      </Button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading doctors...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Mobile Filters Toggle */}
      <div className="lg:hidden px-4 sm:px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            {filteredAndSortedDoctors.length}
          </span>{" "}
          doctors found
        </p>
        <Button
          onClick={() => setShowMobileFilters(true)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Mobile Filters Sidebar */}
      {showMobileFilters && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowMobileFilters(false)}
        >
          <div
            className="absolute top-0 left-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-6 overflow-y-auto border-r border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Filters
              </h2>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <FiltersSection />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar - Now includes search */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <Card className="p-6 sticky top-24 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <FiltersSection />
            </Card>
          </aside>

          {/* Doctor Results */}
          <div className="flex-1">
            {/* Sort Bar for Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {filteredAndSortedDoctors.length}
                </span>{" "}
                doctors found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="experience">Most Experienced</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredAndSortedDoctors.length === 0 ? (
              <Card className="p-12 text-center border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <UserX className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No doctors found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAndSortedDoctors.map((doctor) => (
                  <Card
                    key={doctor.id}
                    className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-green-300 dark:hover:border-green-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative sm:w-40 h-48 sm:h-auto flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                        {!imageErrors[doctor.id] ? (
                          <Image
                            src={doctor.profilePhoto || DEFAULT_AVATAR}
                            alt={doctor.name}
                            fill
                            sizes="(max-width: 640px) 160px, 160px"
                            className="object-cover"
                            unoptimized={true}
                            onError={() => handleImageError(doctor.id)}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        {doctor.isOnline && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                            Online
                          </div>
                        )}
                        {doctor.isPremium && (
                          <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                            Premium
                          </div>
                        )}
                      </div>

                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                              {doctor.name}
                              {doctor.isVerified && (
                                <Verified className="w-5 h-5 text-green-600" />
                              )}
                            </h3>
                            <p className="text-sm text-green-600 dark:text-green-400">
                              {doctor.specialty}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {doctor.experience} years experience
                        </p>

                        <div className="flex items-center gap-1 mb-4">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {doctor.rating}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            ({doctor.reviewCount} reviews)
                          </span>
                        </div>

                        <div className="flex items-center gap-2 mb-4 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Next available:{" "}
                            <span className="font-medium text-gray-900 dark:text-white">
                              {doctor.nextAvailable}
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Consultation Fee
                            </span>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              ₹{doctor.price}
                            </p>
                          </div>
                          <Link href={`/booking/${doctor.id}`}>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              Book Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Sidebar from "@/components/patient/Sidebar";
// import { useRouter } from "next/navigation";
// import { Menu, X } from "lucide-react";

// // Define types for appointments from API
// interface Appointment {
//   id: string;
//   date: string;
//   time: string;
//   type: string;
//   status: string;
//   notes: string;
//   doctor_id: string;
//   doctor_name: string;
//   doctor_specialty: string;
//   doctor_image: string;
//   fee: number;
// }

// export default function HomePage() {
//   const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "canceled">("upcoming");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState("All Types");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [userName, setUserName] = useState("Patient");
//   const router = useRouter();
  

//   // Fetch appointments on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user") || "null");
        
//         if (!user || !user.id) {
//           router.push("/login");
//           return;
//         }
        
//         setUserName(user.name || "Patient");
        
//         // Use patient_id if available, otherwise fallback to id
//         const patientId = user.patient_id || String(user.id);
//         await fetchAppointments(patientId);
//       } catch (error) {
//         console.error("Error in useEffect:", error);
//       }
//     };
    
//     fetchData();
//   }, [router]);

//   const fetchAppointments = async (patientId: string) => {
//     try {
//       setLoading(true);
      
//       const res = await fetch(`/api/appointments/patient/${patientId}`);
      
//       if (!res.ok) {
//         console.error("API error:", res.status, res.statusText);
//         return;
//       }
      
//       const data = await res.json();
      
//       if (data.success) {
//         setAppointments(data.data);
//       } else {
//         console.log("Failed to fetch appointments:", data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper to parse date
//   const parseDate = (dateStr: string) => new Date(dateStr);

//   // Filter appointments based on activeTab
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const upcoming = appointments.filter(apt => {
//     const aptDate = parseDate(apt.date);
//     return apt.status === "BOOKED" && aptDate >= today;
//   });

//   const past = appointments.filter(apt => {
//     const aptDate = parseDate(apt.date);
//     return apt.status === "COMPLETED" || aptDate < today;
//   });

//   const canceled = appointments.filter(apt => apt.status === "CANCELLED");

//   // Further filter by consultation type
//   const filterByType = (list: Appointment[]) => {
//     if (filterType === "All Types") return list;
//     return list.filter(apt => apt.type === filterType.toLowerCase());
//   };

//   const displayedAppointments = (() => {
//     switch (activeTab) {
//       case "upcoming": return filterByType(upcoming);
//       case "past": return filterByType(past);
//       case "canceled": return filterByType(canceled);
//       default: return [];
//     }
//   })();

//   // Format date for display
//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr);
//     return {
//       day: date.getDate().toString(),
//       month: date.toLocaleDateString('en-US', { month: 'short' }),
//       time: new Date(dateStr + 'T' + appointments.find(a => a.date === dateStr)?.time).toLocaleTimeString('en-US', { 
//         hour: '2-digit', 
//         minute: '2-digit' 
//       }),
//       full: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
//     };
//   };

//   // Get status color
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "BOOKED": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
//       case "COMPLETED": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
//       case "CANCELLED": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
//       default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
//     }
//   };

//   const getStatusText = (status: string) => {
//     switch (status) {
//       case "BOOKED": return "Confirmed";
//       case "COMPLETED": return "Completed";
//       case "CANCELLED": return "Cancelled";
//       default: return status;
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-display antialiased">
//       {/* Tailwind CSS Configuration */}
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/icon?family=Material+Icons");
//         @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");
//         @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

//         :root {
//           --font-inter: "Inter", sans-serif;
//         }

//         body {
//           font-family: var(--font-inter);
//         }
//       `}</style>

//       {/* Sidebar Toggle Button */}
//       <button
//         className="lg:hidden fixed bottom-20 right-6 z-50 p-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
//         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         aria-label="Toggle menu"
//       >
//         {isSidebarOpen ? (
//           <X className="w-5 h-5" />
//         ) : (
//           <Menu className="w-5 h-5" />
//         )}
//       </button>

//       {/* Sidebar Component */}
//       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

//       {/* Sidebar Overlay */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col h-screen overflow-hidden">
//         <div className="flex-1 overflow-y-auto p-6 md:p-8">
//           {/* Page Header */}
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
//                 Welcome, <span className="text-green-600">{userName}</span> 👋
//               </h1>
//               <p className="text-gray-500 dark:text-gray-400 text-sm">
//                 Here's a quick look at your upcoming and past appointments.
//               </p>
//             </div>
//             <Link href="/doctor-selection">
//               <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
//                 <span className="material-icons text-lg">add</span>
//                 Book New Appointment
//               </button>
//             </Link>
//           </div>

//           {/* Service Category Cards */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
//             {[
//               {
//                 name: "Doctor Consultation",
//                 icon: "local_hospital",
//                 path: "/appointments",
//               },
//               {
//                 name: "Medical Records",
//                 icon: "folder",
//                 path: "/patient/medical-records",
//               },
//               {
//                 name: "History",
//                 icon: "history",
//                 path: "/patient/admission-summary",
//               },
//               { name: "Diagnostics", icon: "biotech", path: "/diagnostics" },
//             ].map((service) => (
//               <div
//                 key={service.name}
//                 onClick={() => router.push(service.path)}
//                 className="group bg-white dark:bg-gray-800 rounded-xl p-4 border border-green-200 dark:border-green-900 shadow-sm hover:shadow-md hover:border-green-400 dark:hover:border-green-700 transition-all cursor-pointer flex flex-col items-center text-center"
//               >
//                 <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
//                   <span className="material-icons text-green-600 dark:text-green-400 text-2xl">
//                     {service.icon}
//                   </span>
//                 </div>
//                 <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
//                   {service.name}
//                 </h3>
//               </div>
//             ))}
//           </div>

//           {/* Tabs & Filters */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-green-200 dark:border-green-900 pb-4 mb-8 gap-4">
//             <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-xl border border-green-200 dark:border-green-900">
//               <button
//                 onClick={() => setActiveTab("upcoming")}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   activeTab === "upcoming"
//                     ? "bg-green-600 text-white shadow-sm"
//                     : "text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
//                 }`}
//               >
//                 Upcoming ({upcoming.length})
//               </button>
//               <button
//                 onClick={() => setActiveTab("past")}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   activeTab === "past"
//                     ? "bg-green-600 text-white shadow-sm"
//                     : "text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
//                 }`}
//               >
//                 Past ({past.length})
//               </button>
//               <button
//                 onClick={() => setActiveTab("canceled")}
//                 className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   activeTab === "canceled"
//                     ? "bg-green-600 text-white shadow-sm"
//                     : "text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
//                 }`}
//               >
//                 Canceled ({canceled.length})
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
//                 <option>teleconsultation</option>
//                 <option>in-person</option>
//               </select>
//             </div>
//           </div>

//           {/* Loading State */}
//           {loading && (
//             <div className="text-center py-12">
//               <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
//               <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your appointments...</p>
//             </div>
//           )}

//           {/* No Appointments Message */}
//           {!loading && displayedAppointments.length === 0 && (
//             <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
//               <span className="material-icons text-5xl text-gray-400 mb-3">event_busy</span>
//               <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
//                 No {activeTab} appointments
//               </h3>
//               <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
//                 {activeTab === "upcoming" 
//                   ? "You don't have any upcoming appointments."
//                   : activeTab === "past"
//                   ? "No past appointments found."
//                   : "No canceled appointments."}
//               </p>
//               {activeTab === "upcoming" && (
//                 <Link href="/doctor-selection">
//                   <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium">
//                     Book an Appointment
//                   </button>
//                 </Link>
//               )}
//             </div>
//           )}

//           {/* Appointments Grid */}
//           {!loading && displayedAppointments.length > 0 && (
//             <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
//               {displayedAppointments.map((apt) => {
//                 const formattedDate = formatDate(apt.date);
                
//                 return (
//                   <div
//                     key={apt.id}
//                     className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-green-200 dark:border-green-900 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
//                   >
//                     <div className="absolute top-0 right-0 p-3">
//                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
//                         {getStatusText(apt.status)}
//                       </span>
//                     </div>

//                     <div className="flex items-start gap-4 mb-4">
//                       <div className="relative">
//                         {apt.doctor_image ? (
//                           <div className="relative w-16 h-16">
//                             <Image
//                               src={apt.doctor_image}
//                               alt={apt.doctor_name}
//                               fill
//                               className="rounded-xl object-cover shadow-sm"
//                               onError={(e) => {
//                                 (e.target as HTMLImageElement).src = "https://via.placeholder.com/64";
//                               }}
//                             />
//                           </div>
//                         ) : (
//                           <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
//                             <span className="material-icons text-3xl">medical_services</span>
//                           </div>
//                         )}
//                       </div>

//                       <div className="pt-1">
//                         <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">
//                           {apt.doctor_name}
//                         </h3>
//                         <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                           {apt.doctor_specialty}
//                         </p>
//                         <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
//                           <span className="material-icons text-sm">
//                             {apt.type === "teleconsultation" ? "videocam" : "location_on"}
//                           </span>
//                           {apt.type === "teleconsultation" ? "Video Consultation" : "In-Person Visit"}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 dark:bg-black/20 rounded-xl p-3 mb-4 flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="p-2 bg-white dark:bg-white/5 rounded-lg text-center min-w-[3rem] border border-gray-100 dark:border-white/5">
//                           <span className="block text-xs text-gray-400 uppercase font-bold">
//                             {formattedDate.month}
//                           </span>
//                           <span className="block text-sm font-bold text-gray-800 dark:text-gray-200">
//                             {formattedDate.day}
//                           </span>
//                         </div>
//                         <div>
//                           <p className="text-sm font-semibold text-gray-900 dark:text-white">
//                             {apt.time}
//                           </p>
//                           <p className="text-xs text-gray-500">
//                             {apt.notes || "Consultation"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex gap-3">
//                       {apt.type === "teleconsultation" && apt.status === "BOOKED" && (
//                         <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
//                           <span className="material-icons text-lg">videocam</span>
//                           Join Teleconsult
//                         </button>
//                       )}
//                       {apt.type === "in-person" && apt.status === "BOOKED" && (
//                         <>
//                           <button className="flex-1 bg-white dark:bg-gray-800 border border-green-600 text-green-700 dark:text-green-400 font-bold py-2.5 px-4 rounded-lg text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors flex items-center justify-center gap-2">
//                             <span className="material-icons text-lg">map</span>
//                             View Directions
//                           </button>
//                           <button
//                             className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors"
//                             title="Reschedule"
//                           >
//                             <span className="material-icons">edit_calendar</span>
//                           </button>
//                         </>
//                       )}
//                       {(apt.status === "COMPLETED" || apt.status === "CANCELLED") && (
//                         <Link href={`/ehr/${apt.doctor_id}`} className="flex-1">
//                           <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold py-2.5 px-4 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
//                             {apt.status === "COMPLETED" ? "View Summary" : "View Details"}
//                           </button>
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Past Appointments Table View */}
//           {!loading && past.length > 0 && activeTab === "past" && (
//             <div className="mb-6">
//               <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
//                 Recent History
//               </h2>

//               <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full text-left text-sm">
//                     <thead className="bg-gray-50 dark:bg-black/20 text-gray-500 dark:text-gray-400 border-b border-green-200 dark:border-green-900">
//                       <tr>
//                         <th className="px-6 py-4 font-medium">Doctor / Facility</th>
//                         <th className="px-6 py-4 font-medium">Date</th>
//                         <th className="px-6 py-4 font-medium">Type</th>
//                         <th className="px-6 py-4 font-medium">Status</th>
//                         <th className="px-6 py-4 font-medium text-right">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
//                       {past.slice(0, 3).map((apt) => {
//                         const formattedDate = formatDate(apt.date);
//                         return (
//                           <tr key={apt.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
//                             <td className="px-6 py-4">
//                               <div className="flex items-center gap-3">
//                                 {apt.doctor_image ? (
//                                   <div className="relative w-10 h-10">
//                                     <Image
//                                       src={apt.doctor_image}
//                                       alt={apt.doctor_name}
//                                       fill
//                                       className="rounded-full object-cover"
//                                       onError={(e) => {
//                                         (e.target as HTMLImageElement).src = "https://via.placeholder.com/40";
//                                       }}
//                                     />
//                                   </div>
//                                 ) : (
//                                   <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500">
//                                     <span className="material-icons text-xl">medication</span>
//                                   </div>
//                                 )}
//                                 <div>
//                                   <p className="font-medium text-gray-900 dark:text-white">
//                                     {apt.doctor_name}
//                                   </p>
//                                   <p className="text-xs text-gray-500 dark:text-gray-400">
//                                     {apt.doctor_specialty}
//                                   </p>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
//                               {formattedDate.full}
//                             </td>
//                             <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
//                               {apt.type === "teleconsultation" ? "Teleconsult" : "In-Person"}
//                             </td>
//                             <td className="px-6 py-4">
//                               <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(apt.status)}`}>
//                                 {getStatusText(apt.status)}
//                               </span>
//                             </td>
//                             <td className="px-6 py-4 text-right">
//                               <Link
//                                 href={`/ehr/${apt.doctor_id}`}
//                                 className="text-green-700 dark:text-green-400 hover:underline text-sm font-medium"
//                               >
//                                 View Summary
//                               </Link>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//                 {past.length > 3 && (
//                   <div className="bg-gray-50 dark:bg-black/20 px-6 py-3 border-t border-green-200 dark:border-green-900 text-center">
//                     <button className="text-sm font-medium text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors">
//                       View All Past Appointments
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }