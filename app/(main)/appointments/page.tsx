


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Separator } from "@/components/ui/separator";
// import { toast } from "sonner";
// import Link from "next/link";
// import {
//   Search,
//   Calendar,
//   Clock,
//   Star,
//   MapPin,
//   User,
//   Video,
//   Verified,
//   Hospital,
//   FileText,
//   CreditCard,
//   Settings,
//   Bell,
//   ChevronRight,
//   ChevronLeft,
//   Filter,
//   MoreVertical,
//   Shield,
//   Award,
//   Heart,
//   Zap,
//   MessageSquare,
//   Phone,
//   CheckCircle,
//   DollarSign,
//   TrendingUp,
//   Users,
//   CalendarDays,
//   Stethoscope,
//   Pill,
//   Thermometer,
//   Activity,
//   Brain,
//   Eye,
//   Bone,
//   Baby,
//   Menu,
//   X,
//   ArrowUpDown,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Header from "@/components/ui/Header";
// import Footer from "@/components/ui/Footer";

// // Types
// type ConsultationType = "in-person" | "teleconsult" | "chat" | "emergency";
// type DoctorSpecialty =
//   | "all"
//   | "cardiology"
//   | "dermatology"
//   | "general"
//   | "pediatrics"
//   | "neurology"
//   | "orthopedics"
//   | "dentistry"
//   | "ophthalmology";
// type SortOption =
//   | "recommended"
//   | "rating"
//   | "experience"
//   | "price-low"
//   | "price-high";

// interface Doctor {
//   id: string;
//   name: string;
//   specialty: string;
//   experience: number;
//   rating: number;
//   reviewCount: number;
//   isVerified: boolean;
//   isOnline: boolean;
//   isPremium: boolean;
//   languages: string[];
//   imageUrl: string;
//   nextAvailableSlots: TimeSlot[];
//   location: string;
//   consultationFee: number;
//   education: string[];
//   achievements: string[];
//   responseTime: string;
//   successRate: number;
// }

// interface TimeSlot {
//   id: string;
//   time: string;
//   date?: string;
//   status: "available" | "booked" | "selected";
//   isToday?: boolean;
//   isEmergency?: boolean;
// }

// // Mock data
// const mockDoctors: Doctor[] = [
//   {
//     id: "sarah",
//     name: "Dr. Sarah Smith",
//     specialty: "Cardiology",
//     experience: 8,
//     rating: 4.9,
//     reviewCount: 120,
//     isVerified: true,
//     isOnline: true,
//     isPremium: true,
//     languages: ["English", "Spanish", "Mandarin"],
//     imageUrl:
//       "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
//     nextAvailableSlots: [
//       { id: "1a", time: "10:01 AM", status: "available", isToday: true },
//       { id: "1b", time: "11:30 AM", status: "available", isToday: true },
//       { id: "1c", time: "02:15 PM", status: "available", isToday: true },
//       { id: "1d", time: "04:00 PM", status: "available", isToday: true },
//       { id: "1e", time: "06:00 PM", status: "available", isEmergency: true },
//     ],
//     location: "City Heart Center, Downtown",
//     consultationFee: 1500,
//     education: ["MD, Harvard Medical School", "Fellowship in Cardiology"],
//     achievements: ["Board Certified", "Top Cardiologist 2023"],
//     responseTime: "< 15 mins",
//     successRate: 98,
//   },
//   {
//     id: "john",
//     name: "Dr. John Doe",
//     specialty: "General Practice",
//     experience: 12,
//     rating: 4.7,
//     reviewCount: 85,
//     isVerified: true,
//     isOnline: false,
//     isPremium: false,
//     languages: ["English", "French"],
//     imageUrl:
//       "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
//     nextAvailableSlots: [
//       { id: "2a", time: "09:00 AM", status: "booked" },
//       { id: "2b", time: "10:45 AM", status: "available", isToday: true },
//       { id: "2c", time: "01:30 PM", status: "available", isToday: true },
//       { id: "2d", time: "Tomorrow, 11:00 AM", status: "available" },
//     ],
//     location: "Health Plus Primary Care",
//     consultationFee: 1200,
//     education: ["MD, Johns Hopkins"],
//     achievements: ["Family Medicine Specialist"],
//     responseTime: "< 30 mins",
//     successRate: 96,
//   },
//   {
//     id: "priya",
//     name: "Dr. Priya Sharma",
//     specialty: "Dermatology",
//     experience: 6,
//     rating: 4.8,
//     reviewCount: 92,
//     isVerified: true,
//     isOnline: true,
//     isPremium: true,
//     languages: ["English", "German"],
//     imageUrl:
//       "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=400&h=400&fit=crop&crop=face",
//     nextAvailableSlots: [
//       { id: "3a", time: "Tomorrow, 09:00 AM", status: "available" },
//       { id: "3b", time: "Tomorrow, 11:15 AM", status: "available" },
//       { id: "3c", time: "Tomorrow, 03:30 PM", status: "available" },
//     ],
//     location: "Skin Care Specialists Clinic",
//     consultationFee: 1800,
//     education: ["MD, Stanford Medicine", "Dermatology Board Certified"],
//     achievements: ["Cosmetic Dermatology Expert"],
//     responseTime: "< 20 mins",
//     successRate: 97,
//   },
//   {
//     id: "robert",
//     name: "Dr. Robert Kim",
//     specialty: "Neurology",
//     experience: 15,
//     rating: 4.9,
//     reviewCount: 156,
//     isVerified: true,
//     isOnline: true,
//     isPremium: true,
//     languages: ["English", "Korean", "Japanese"],
//     imageUrl:
//       "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
//     nextAvailableSlots: [
//       { id: "4a", time: "11:00 AM", status: "available", isToday: true },
//       { id: "4b", time: "02:00 PM", status: "available", isToday: true },
//       { id: "4c", time: "04:30 PM", status: "available", isToday: true },
//     ],
//     location: "Neuro Care Institute",
//     consultationFee: 2000,
//     education: ["MD, Mayo Clinic", "PhD Neuroscience"],
//     achievements: ["Neurology Research Award 2022"],
//     responseTime: "< 25 mins",
//     successRate: 99,
//   },
// ];

// const specialties = [
//   { value: "all", label: "All Specialties", icon: Stethoscope },
//   { value: "cardiology", label: "Cardiology", icon: Heart },
//   { value: "dermatology", label: "Dermatology", icon: Activity },
//   { value: "general", label: "General Practice", icon: User },
//   { value: "pediatrics", label: "Pediatrics", icon: Baby },
//   { value: "neurology", label: "Neurology", icon: Brain },
//   { value: "orthopedics", label: "Orthopedics", icon: Bone },
//   { value: "dentistry", label: "Dentistry", icon: Bone },
//   { value: "ophthalmology", label: "Ophthalmology", icon: Eye },
// ];

// const sortOptions = [
//   { value: "recommended", label: "Recommended" },
//   { value: "rating", label: "Highest Rated" },
//   { value: "experience", label: "Most Experienced" },
//   { value: "price-low", label: "Price: Low to High" },
//   { value: "price-high", label: "Price: High to Low" },
// ];

// const consultationTypes = [
//   { value: "in-person", label: "In-Person", icon: User },
//   { value: "teleconsult", label: "Video", icon: Video },
//   { value: "chat", label: "Chat", icon: MessageSquare },
//   { value: "emergency", label: "Emergency", icon: Bell },
// ];

// export default function AppointmentBookingPage() {
//   const router = useRouter();
//   const [consultationType, setConsultationType] =
//     useState<ConsultationType>("in-person");
//   const [selectedSpecialty, setSelectedSpecialty] =
//     useState<DoctorSpecialty>("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
//     null,
//   );
//   const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
//   const [loadingDoctorId, setLoadingDoctorId] = useState<string | null>(null);
//   const [sortBy, setSortBy] = useState<SortOption>("recommended");
//   const [showPremiumOnly, setShowPremiumOnly] = useState(false);
//   const [showOnlineOnly, setShowOnlineOnly] = useState(true);
//   const [selectedDate, setSelectedDate] = useState<string>(
//     new Date().toISOString().split("T")[0],
//   );
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   // State for active filter count
//   const [activeFilterCount, setActiveFilterCount] = useState(0);

//   // Calculate active filter count
//   useEffect(() => {
//     let count = 0;
//     if (selectedSpecialty !== "all") count++;
//     if (showPremiumOnly) count++;
//     if (showOnlineOnly) count++;
//     if (consultationType !== "in-person") count++;
//     if (searchQuery.trim() !== "") count++;
//     setActiveFilterCount(count);
//   }, [selectedSpecialty, showPremiumOnly, showOnlineOnly, consultationType, searchQuery]);

//   // Sort and filter doctors
//   const filteredDoctors = mockDoctors
//     .filter((doctor) => {
//       if (
//         selectedSpecialty !== "all" &&
//         doctor.specialty.toLowerCase() !== selectedSpecialty
//       ) {
//         return false;
//       }
//       if (
//         searchQuery &&
//         !doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//         !doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
//       ) {
//         return false;
//       }
//       if (showPremiumOnly && !doctor.isPremium) {
//         return false;
//       }
//       if (showOnlineOnly && !doctor.isOnline) {
//         return false;
//       }
//       return true;
//     })
//     .sort((a, b) => {
//       switch (sortBy) {
//         case "rating":
//           return b.rating - a.rating;
//         case "experience":
//           return b.experience - a.experience;
//         case "price-low":
//           return a.consultationFee - b.consultationFee;
//         case "price-high":
//           return b.consultationFee - a.consultationFee;
//         default:
//           return (
//             b.rating * 0.4 +
//             b.experience * 0.3 +
//             b.successRate * 0.3 -
//             (a.rating * 0.4 + a.experience * 0.3 + a.successRate * 0.3)
//           );
//       }
//     });

//   const handleQuickBook = async (doctor: Doctor) => {
//     const availableSlot = doctor.nextAvailableSlots.find(
//       (s) => s.status === "available",
//     );

//     if (!availableSlot) {
//       toast.error("No available slots for this doctor");
//       return;
//     }

//     setLoadingDoctorId(doctor.id);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       toast.success("Redirecting to booking page...");
//       router.push(`/booking/${doctor.id}`);
//     } catch (error) {
//       toast.error("Failed to book appointment");
//     } finally {
//       setLoadingDoctorId(null);
//     }
//   };

//   const handleBookAppointment = async (doctor: Doctor, timeSlot: TimeSlot) => {
//     if (timeSlot.status === "booked") {
//       toast.error("This time slot is already booked");
//       return;
//     }

//     setLoadingDoctorId(doctor.id);

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       toast.success("Redirecting to booking page...");
//       router.push(`/booking/${doctor.id}?time=${timeSlot.time}`);
//     } catch (error) {
//       toast.error("Failed to book appointment");
//     } finally {
//       setLoadingDoctorId(null);
//     }
//   };

//   const renderStars = (rating: number) => {
//     return (
//       <div className="flex items-center gap-0.5">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             className={cn(
//               "h-4 w-4",
//               i < Math.floor(rating)
//                 ? "fill-amber-500 text-amber-500"
//                 : "fill-gray-200 text-gray-200",
//             )}
//           />
//         ))}
//         <span className="ml-1 text-sm font-semibold text-gray-900 dark:text-white">
//           {rating}
//         </span>
//       </div>
//     );
//   };

//   const getSpecialtyIcon = (specialty: string) => {
//     const found = specialties.find((s) => s.value === specialty.toLowerCase());
//     if (found?.icon) {
//       const Icon = found.icon;
//       return <Icon className="w-5 h-5" />;
//     }
//     return <Stethoscope className="w-5 h-5" />;
//   };

//   // Mobile Filters Toggle Component
//   const MobileFiltersToggle = () => (
//     <div className="lg:hidden">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             className="h-10 gap-2"
//             onClick={() => setShowMobileFilters(!showMobileFilters)}
//           >
//             <Filter className="h-4 w-4" />
//             Filters
//             {activeFilterCount > 0 && (
//               <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-green-600 text-white">
//                 {activeFilterCount}
//               </Badge>
//             )}
//             {showMobileFilters ? (
//               <ChevronUp className="h-4 w-4 ml-1" />
//             ) : (
//               <ChevronDown className="h-4 w-4 ml-1" />
//             )}
//           </Button>
//           <Select
//             value={sortBy}
//             onValueChange={(value) => setSortBy(value as SortOption)}
//           >
//             <SelectTrigger className="h-10 w-auto gap-2">
//               <ArrowUpDown className="h-4 w-4" />
//               <span>Sort</span>
//             </SelectTrigger>
//             <SelectContent>
//               {sortOptions.map((option) => (
//                 <SelectItem key={option.value} value={option.value}>
//                   {option.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => {
//             setSelectedSpecialty("all");
//             setShowPremiumOnly(false);
//             setShowOnlineOnly(false);
//             setConsultationType("in-person");
//             setSearchQuery("");
//           }}
//         >
//           Clear All
//         </Button>
//       </div>

//       {/* Mobile Filters Content - Always visible when toggled */}
//       {showMobileFilters && (
//         <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//           {/* Search Bar for Mobile */}
//           <div className="mb-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 className="pl-10 h-10 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 placeholder:text-gray-400"
//                 placeholder="Search doctors, specialties..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* Specialty Filter */}
//           <div className="mb-4">
//             <h4 className="font-semibold text-sm mb-2 text-gray-700 dark:text-gray-300">
//               Specialty
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {specialties.map((specialty) => {
//                 const Icon = specialty.icon;
//                 return (
//                   <button
//                     key={specialty.value}
//                     onClick={() => {
//                       setSelectedSpecialty(specialty.value as DoctorSpecialty);
//                     }}
//                     className={cn(
//                       "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors border",
//                       selectedSpecialty === specialty.value
//                         ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
//                         : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:border-green-300",
//                     )}
//                   >
//                     <Icon className="w-4 h-4" />
//                     {specialty.label}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Consultation Type */}
          

//           {/* Toggles */}
//           <div className="space-y-3">
//             <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
//               <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Premium Only
//               </Label>
//               <button
//                 onClick={() => setShowPremiumOnly(!showPremiumOnly)}
//                 className={cn(
//                   "relative inline-flex h-6 w-11 items-center transition-colors",
//                   showPremiumOnly
//                     ? "bg-green-600"
//                     : "bg-gray-300 dark:bg-gray-600",
//                 )}
//               >
//                 <span
//                   className={cn(
//                     "inline-block h-4 w-4 transform bg-white transition-transform",
//                     showPremiumOnly ? "translate-x-6" : "translate-x-1",
//                   )}
//                 />
//               </button>
//             </div>

            
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
//       <Header />

//       {/* Main Content Area - Responsive */}
//       <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8">
//         {/* Main Content Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
//           {/* Filters Sidebar - Desktop */}
//           <div className="hidden lg:block lg:col-span-1">
//             <Card className="sticky top-6 border border-gray-200 dark:border-gray-700">
//               <CardContent className="p-6">
//                 <h3 className="font-bold text-xl mb-6 text-gray-900 dark:text-white">
//                   Find Doctors
//                 </h3>

//                 {/* Search Bar in Sidebar */}
//                 <div className="mb-6">
//                   <div className="relative">
//                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <Input
//                       className="pl-12 h-12 text-base bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 placeholder:text-gray-400"
//                       placeholder="Search doctors, specialties..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-6">
//                   {/* Specialty Filter */}
//                   <div>
//                     <h4 className="font-semibold text-base mb-3 text-gray-700 dark:text-gray-300">
//                       Specialty
//                     </h4>
//                     <div className="space-y-2">
//                       {specialties.map((specialty) => {
//                         const Icon = specialty.icon;
//                         return (
//                           <button
//                             key={specialty.value}
//                             onClick={() =>
//                               setSelectedSpecialty(
//                                 specialty.value as DoctorSpecialty,
//                               )
//                             }
//                             className={cn(
//                               "flex items-center gap-3 w-full p-3 text-base font-medium transition-colors",
//                               selectedSpecialty === specialty.value
//                                 ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
//                                 : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800",
//                             )}
//                           >
//                             <Icon className="w-5 h-5" />
//                             {specialty.label}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   {/* Toggles */}
                  

               
                  
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Main Results */}
//           <div className="lg:col-span-3">
//             {/* Mobile Filters - Visible when toggled */}
//             <MobileFiltersToggle />

//             {/* Desktop Sort and Clear */}
//             <div className="hidden lg:flex items-center justify-between mb-6">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   Available Doctors
//                 </h2>
//                 <p className="text-gray-500 dark:text-gray-400">
//                   {filteredDoctors.length} doctors available for{" "}
//                   {consultationType} consultation
//                 </p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <Select
//                   value={sortBy}
//                   onValueChange={(value) => setSortBy(value as SortOption)}
//                 >
//                   <SelectTrigger className="w-[180px]">
//                     <ArrowUpDown className="h-4 w-4 mr-2" />
//                     <SelectValue placeholder="Sort by" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {sortOptions.map((option) => (
//                       <SelectItem key={option.value} value={option.value}>
//                         {option.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <Button
//                   variant="ghost"
//                   onClick={() => {
//                     setSelectedSpecialty("all");
//                     setSearchQuery("");
//                     setShowPremiumOnly(false);
//                     setShowOnlineOnly(false);
//                     setConsultationType("in-person");
//                   }}
//                 >
//                   Clear All
//                 </Button>
//               </div>
//             </div>

//             {/* Doctor Cards - Responsive */}
//             <div className="space-y-6">
//               {filteredDoctors.map((doctor) => (
//                 <Card
//                   key={doctor.id}
//                   className={cn(
//                     "group border-2 transition-all border-gray-200 dark:border-gray-700",
//                     selectedDoctor?.id === doctor.id
//                       ? "border-green-500 dark:border-green-600"
//                       : "hover:border-green-300 dark:hover:border-green-700",
//                   )}
//                 >
//                   <CardContent className="p-6">
//                     <div className="flex flex-col lg:flex-row gap-6">
//                       {/* Doctor Profile Section */}
//                       <div className="flex flex-col sm:flex-row gap-4 lg:w-5/12">
//                         <div className="relative shrink-0">
//                           <Avatar className="size-24">
//                             <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
//                             <AvatarFallback className="bg-gray-100 text-gray-700 text-xl font-semibold">
//                               {doctor.name.split(" ").map((n) => n[0]).join("")}
//                             </AvatarFallback>
//                           </Avatar>
                          
//                           {doctor.isOnline && (
//                             <div className="absolute -bottom-2 -right-2 bg-green-100 text-green-700 border border-white dark:border-gray-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 text-xs font-bold flex items-center gap-1">
//                               <div className="w-1.5 h-1.5 bg-green-500 animate-pulse"></div>
//                               Online
//                             </div>
//                           )}
//                         </div>
                        
//                         <div className="flex flex-col justify-center">
//                           <div className="flex items-center gap-2 mb-1">
//                             <Link
//                               href={`/booking/${doctor.id}`}
//                               className="text-lg font-bold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors"
//                             >
//                               {doctor.name}
//                             </Link>
//                             {doctor.isVerified && (
//                               <Verified className="h-4 w-4 text-green-500" />
//                             )}
//                           </div>
                          
//                           <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-2">
//                             {doctor.specialty} • {doctor.experience} Years Exp.
//                           </p>
                          
//                           <div className="flex items-center gap-1">
//                             <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
//                             <span className="text-sm font-bold text-gray-900 dark:text-white">
//                               {doctor.rating}
//                             </span>
//                             <span className="text-xs text-gray-400 ml-1">
//                               ({doctor.reviewCount} Reviews)
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Divider */}
//                       <div className="hidden lg:block w-px bg-gray-100 dark:bg-gray-700 self-stretch"></div>

//                       {/* Booking Section */}
//                       <div className="flex flex-col gap-4 flex-1">
//                         <div className="flex items-center justify-between">
//                           <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">
//                             Next Available Slots
//                           </h4>
//                           <Link
//                             href={`/booking/${doctor.id}`}
//                             className="text-xs font-semibold text-green-600 hover:underline"
//                           >
//                             View Calendar
//                           </Link>
//                         </div>

//                         {/* Time Slots */}
//                         <div className="flex flex-wrap gap-2">
//                           {doctor.nextAvailableSlots.map((slot) => (
//                             <button
//                               key={slot.id}
//                               onClick={() => {
//                                 setSelectedTimeSlot(slot);
//                                 setSelectedDoctor(doctor);
//                               }}
//                               disabled={slot.status === "booked"}
//                               className={cn(
//                                 "px-4 py-2 text-sm font-medium transition-all",
//                                 slot.status === "booked"
//                                   ? "bg-gray-100 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600 border border-gray-200 dark:border-gray-700 cursor-not-allowed opacity-75 line-through"
//                                   : selectedTimeSlot?.id === slot.id && selectedDoctor?.id === doctor.id
//                                   ? "bg-green-600 text-white border border-transparent"
//                                   : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:border-green-600 hover:text-green-600"
//                               )}
//                             >
//                               {slot.time}
//                             </button>
//                           ))}
//                         </div>

//                         {/* Book Appointment Button */}
//                         <Button
//                           className="w-full h-10 bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-all"
//                           onClick={() => handleQuickBook(doctor)}
//                           disabled={!doctor.nextAvailableSlots.some((s) => s.status === "available") || loadingDoctorId === doctor.id}
//                         >
//                           {loadingDoctorId === doctor.id ? (
//                             <div className="flex items-center justify-center gap-2">
//                               <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin" />
//                               <span>Processing...</span>
//                             </div>
//                           ) : (
//                             "Book Appointment"
//                           )}
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {/* No Results */}
//             {filteredDoctors.length === 0 && (
//               <Card className="border border-gray-200 dark:border-gray-700">
//                 <CardContent className="py-16 text-center">
//                   <Search className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
//                   <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
//                     No doctors found
//                   </h3>
//                   <p className="text-gray-500 dark:text-gray-400 mb-6">
//                     Try adjusting your filters or search term
//                   </p>
//                   <Button
//                     variant="outline"
//                     size="lg"
//                     onClick={() => {
//                       setSelectedSpecialty("all");
//                       setSearchQuery("");
//                       setShowPremiumOnly(false);
//                       setShowOnlineOnly(false);
//                       setConsultationType("in-person");
//                     }}
//                   >
//                     Clear All Filters
//                   </Button>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Load More */}
//             {filteredDoctors.length > 0 && (
//               <div className="flex justify-center pt-10">
//                 <Button
//                   variant="outline"
//                   className="px-10 py-4 border-gray-200 dark:border-gray-700 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
//                   onClick={() => toast.info("Loading more doctors...")}
//                 >
//                   Load More Doctors
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
   
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
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

// Types
type SortOption = 'recommended' | 'rating' | 'experience' | 'price-low' | 'price-high';

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

// Mock data
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
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    profilePhoto: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
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
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    profilePhoto: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
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
    imageUrl: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=400&h=400&fit=crop&crop=face",
    profilePhoto: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=400&h=400&fit=crop&crop=face",
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
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
    profilePhoto: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face",
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredAndSortedDoctors = useMemo(() => {
    let filtered = mockDoctors.filter((doctor) => {
      const matchesSearch =
        searchQuery === '' ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        selectedSpecialty === '' || doctor.specialty === selectedSpecialty;

      const matchesOnline = !onlineOnly || doctor.isOnline;
      const matchesPremium = !premiumOnly || doctor.isPremium;

      return matchesSearch && matchesSpecialty && matchesOnline && matchesPremium;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedSpecialty, onlineOnly, premiumOnly, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSpecialty('');
    setOnlineOnly(false);
    setPremiumOnly(false);
    setSortBy('recommended');
  };

  const FiltersSection = () => (
    <div className="space-y-6">
      {/* Search Bar - Moved to sidebar */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Search</h3>
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
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Specialty</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          <button
            onClick={() => setSelectedSpecialty('')}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedSpecialty === ''
                ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 font-medium'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
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
                  ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 font-medium'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {specialty}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Filters</h3>
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
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="recommended">Recommended </option>
          <option value="rating">Highest Rated</option>
          <option value="experience">Most Experienced</option>
          <option value="price-low">Price: Low to High</option>
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

   

      {/* Mobile Filters Toggle */}
      <div className="lg:hidden px-4 sm:px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <p className="text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            {filteredAndSortedDoctors.length}
          </span> doctors found
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
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMobileFilters(false)}>
          <div
            className="absolute top-0 left-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-6 overflow-y-auto border-r border-gray-200 dark:border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
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
                </span> doctors found
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
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
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No doctors found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search criteria
                </p>
                <Button onClick={clearFilters} className="bg-green-600 hover:bg-green-700 text-white">
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAndSortedDoctors.map((doctor) => (
                  <Card key={doctor.id} className="overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-green-300 dark:hover:border-green-700 transition-colors">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative sm:w-40 h-48 sm:h-auto flex-shrink-0">
                        <Image
                          src={doctor.profilePhoto}
                          alt={doctor.name}
                          fill
                          className="object-cover"
                        />
                        {doctor.isOnline && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                            Online
                          </div>
                        )}
                        {doctor.isPremium && (
                          <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Premium
                          </div>
                        )}
                      </div>

                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                              {doctor.name}
                              {doctor.isPremium && (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              )}
                            </h3>
                            <p className="text-sm text-green-600 dark:text-green-400">{doctor.specialty}</p>
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
                          <span className="text-sm text-gray-500 dark:text-gray-400">({doctor.reviewCount})</span>
                        </div>

                        <div className="flex items-center gap-2 mb-4 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Next available:{' '}
                            <span className="font-medium text-gray-900 dark:text-white">
                              {doctor.nextAvailable}
                            </span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Consultation Fee</span>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">₹{doctor.price}</p>
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