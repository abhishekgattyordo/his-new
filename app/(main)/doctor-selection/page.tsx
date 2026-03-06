// // app/doctor-selection/page.tsx
// "use client";

// import { useState, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import Header from "@/components/ui/Header";
// import { Footer } from "@/components/ui/Footer";
// import {
//   Search,
//   ArrowRight,
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   Brain,
//   User,
//   Stethoscope,
//   Activity,
//   Heart,
//   Thermometer,
//   Pill,
//   FlaskConical,
//   Zap,
//   AlertCircle,
//   Loader2,
//   Sparkles,
// } from "lucide-react";

// // Types
// interface Symptom {
//   id: string;
//   name: string;
//   category: string;
// }

// interface Doctor {
//   id: string;
//   name: string;
//   specialty: string;
//   rating: number;
//   reviewCount: number;
//   experience: string;
//   image: string;
//   fee: string;
//   availability: string;
//   isOnline: boolean;
//   hospital: string;
// }

// // Mock data for specialties
// const specialties = [
//   {
//     id: 1,
//     name: "Cardiology",
//     icon: Heart,
//     color: "bg-red-50",
//     textColor: "text-red-600",
//     image: "/specialties/cardiology.svg",
//     description: "Heart & vascular health",
//     doctorCount: 24,
//   },
//   {
//     id: 2,
//     name: "Neurology",
//     icon: Brain,
//     color: "bg-purple-50",
//     textColor: "text-purple-600",
//     image: "/specialties/neurology.svg",
//     description: "Brain & nervous system",
//     doctorCount: 18,
//   },
//   {
//     id: 3,
//     name: "Orthopedics",
//     icon: Activity,
//     color: "bg-blue-50",
//     textColor: "text-blue-600",
//     image: "/specialties/orthopedics.svg",
//     description: "Bones & joints",
//     doctorCount: 22,
//   },
//   {
//     id: 4,
//     name: "Dermatology",
//     icon: Pill,
//     color: "bg-green-50",
//     textColor: "text-green-600",
//     image: "/specialties/dermatology.svg",
//     description: "Skin & hair",
//     doctorCount: 16,
//   },
//   {
//     id: 5,
//     name: "Pediatrics",
//     icon: Stethoscope,
//     color: "bg-yellow-50",
//     textColor: "text-yellow-600",
//     image: "/specialties/pediatrics.svg",
//     description: "Child healthcare",
//     doctorCount: 20,
//   },
//   {
//     id: 6,
//     name: "Gynecology",
//     icon: User,
//     color: "bg-pink-50",
//     textColor: "text-pink-600",
//     image: "/specialties/gynecology.svg",
//     description: "Women's health",
//     doctorCount: 15,
//   },
//   {
//     id: 7,
//     name: "Gastroenterology",
//     icon: Activity,
//     color: "bg-orange-50",
//     textColor: "text-orange-600",
//     image: "/specialties/gastro.svg",
//     description: "Digestive system",
//     doctorCount: 14,
//   },
//   {
//     id: 8,
//     name: "Pulmonology",
//     icon: Thermometer,
//     color: "bg-cyan-50",
//     textColor: "text-cyan-600",
//     image: "/specialties/pulmonology.svg",
//     description: "Respiratory health",
//     doctorCount: 12,
//   },
// ];

// // Mock symptoms for AI checker
// const commonSymptoms: Symptom[] = [
//   { id: "1", name: "Fever", category: "General" },
//   { id: "2", name: "Headache", category: "Neurology" },
//   { id: "3", name: "Cough", category: "Respiratory" },
//   { id: "4", name: "Chest Pain", category: "Cardiology" },
//   { id: "5", name: "Joint Pain", category: "Orthopedics" },
//   { id: "6", name: "Skin Rash", category: "Dermatology" },
//   { id: "7", name: "Nausea", category: "Gastroenterology" },
//   { id: "8", name: "Fatigue", category: "General" },
//   { id: "9", name: "Shortness of Breath", category: "Respiratory" },
//   { id: "10", name: "Abdominal Pain", category: "Gastroenterology" },
//   { id: "11", name: "Dizziness", category: "Neurology" },
//   { id: "12", name: "Sore Throat", category: "General" },
// ];

// // Mock doctors for results
// const recommendedDoctors: Doctor[] = [
//   {
//     id: "1",
//     name: "Dr. Sarah Jenkins",
//     specialty: "Cardiology",
//     rating: 4.9,
//     reviewCount: 128,
//     experience: "15 years",
//     image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop",
//     fee: "₹800",
//     availability: "Today, 2:00 PM",
//     isOnline: true,
//     hospital: "City Heart Institute",
//   },
//   {
//     id: "2",
//     name: "Dr. Michael Chen",
//     specialty: "Neurology",
//     rating: 4.8,
//     reviewCount: 95,
//     experience: "12 years",
//     image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop",
//     fee: "₹900",
//     availability: "Tomorrow, 10:00 AM",
//     isOnline: true,
//     hospital: "Neuro Care Center",
//   },
//   {
//     id: "3",
//     name: "Dr. Priya Sharma",
//     specialty: "Dermatology",
//     rating: 4.7,
//     reviewCount: 82,
//     experience: "8 years",
//     image: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=150&h=150&fit=crop",
//     fee: "₹700",
//     availability: "Today, 4:30 PM",
//     isOnline: false,
//     hospital: "Skin Care Clinic",
//   },
// ];

// export default function DoctorSelectionPage() {
//   const router = useRouter();
//   const [activeOption, setActiveOption] = useState<"options" | "ai" | "specialties" | "results">("options");
//   const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
//   const [symptomSearch, setSymptomSearch] = useState("");
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const [aiResults, setAiResults] = useState<Doctor[]>([]);
  
//   // For specialties carousel
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const filteredSymptoms = commonSymptoms.filter(s => 
//     s.name.toLowerCase().includes(symptomSearch.toLowerCase())
//   );

//   const handleSymptomToggle = (symptomName: string) => {
//     setSelectedSymptoms(prev => 
//       prev.includes(symptomName)
//         ? prev.filter(s => s !== symptomName)
//         : [...prev, symptomName]
//     );
//   };

//   const handleAnalyzeSymptoms = () => {
//     if (selectedSymptoms.length === 0) return;
    
//     setIsAnalyzing(true);
    
//     // Simulate AI analysis
//     setTimeout(() => {
//       setAiResults(recommendedDoctors);
//       setIsAnalyzing(false);
//       setActiveOption("results");
//     }, 2000);
//   };

//   const handleSpecialtyClick = (specialtyName: string) => {
//     router.push(`/doctors?specialty=${specialtyName.toLowerCase()}`);
//   };

//   const handleNext = () => {
//     if (scrollContainerRef.current) {
//       const container = scrollContainerRef.current;
//       const cardWidth = container.querySelector('.specialty-card')?.clientWidth || 0;
//       const gap = 20;
//       const scrollAmount = (cardWidth + gap) * 4;
      
//       container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//       setCurrentIndex(prev => Math.min(prev + 1, Math.ceil(specialties.length / 4) - 1));
//     }
//   };

//   const handlePrev = () => {
//     if (scrollContainerRef.current) {
//       const container = scrollContainerRef.current;
//       const cardWidth = container.querySelector('.specialty-card')?.clientWidth || 0;
//       const gap = 20;
//       const scrollAmount = (cardWidth + gap) * 4;
      
//       container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
//       setCurrentIndex(prev => Math.max(prev - 1, 0));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       <Header />
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      

//         {/* Page Title */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
//             How would you like to find a doctor?
//           </h1>
//           <p className="text-lg text-gray-600 dark:text-gray-400">
//             Choose your preferred way to connect with the right specialist
//           </p>
//         </div>

//         {/* Option 1: Main Selection Cards */}
//         {activeOption === "options" && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//             {/* Option 1: Direct Search */}
//             <Card className="p-6 hover:border-green-300 transition-all cursor-pointer group"
//               onClick={() => router.push("/appointments")}
//             >
//               <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                 <Search className="w-8 h-8 text-green-600" />
//               </div>
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                 Find Doctor Directly
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 mb-4">
//                 Search by name, specialty, or condition. View profiles, ratings, and availability.
//               </p>
//               <div className="flex items-center text-green-600 font-medium">
//                 <span>Browse all doctors</span>
//                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </div>
//             </Card>

//             {/* Option 2: AI Symptom Checker */}
//             <Card className="p-6 hover:border-purple-300 transition-all cursor-pointer group"
//               onClick={() => setActiveOption("ai")}
//             >
//               <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                 <Brain className="w-8 h-8 text-purple-600" />
//               </div>
//               <div className="flex items-center gap-2 mb-2">
//                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                   AI Symptom Checker
//                 </h2>
//                 <Badge className="bg-purple-100 text-purple-600 border-purple-200">Powered by AI</Badge>
//               </div>
//               <p className="text-gray-600 dark:text-gray-400 mb-4">
//                 Tell us your symptoms and our AI will recommend the best specialist for you.
//               </p>
//               <div className="flex items-center text-purple-600 font-medium">
//                 <span>Check symptoms</span>
//                 <Sparkles className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
//               </div>
//             </Card>

//             {/* Option 3: Browse by Specialty */}
//             <Card className="p-6 hover:border-blue-300 transition-all cursor-pointer group"
//               onClick={() => setActiveOption("specialties")}
//             >
//               <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
//                 <Stethoscope className="w-8 h-8 text-blue-600" />
//               </div>
//               <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                 Browse by Specialty
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 mb-4">
//                 Explore doctors by medical specialty. Choose from 25+ specializations.
//               </p>
//               <div className="flex items-center text-blue-600 font-medium">
//                 <span>View all specialties</span>
//                 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
//               </div>
//             </Card>
//           </div>
//         )}

//         {/* Option 2: AI Symptom Checker Interface */}
//         {activeOption === "ai" && (
//           <div className="space-y-8">
//             <button
//               onClick={() => setActiveOption("options")}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               <span>Back to options</span>
//             </button>

//             <Card className="p-6 border-purple-200 dark:border-purple-900">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center">
//                   <Brain className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                     AI Symptom Checker
//                   </h2>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Select your symptoms and let AI recommend the right specialist
//                   </p>
//                 </div>
//               </div>

//               {/* Symptom Search */}
//               <div className="mb-6">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <Input
//                     placeholder="Search symptoms..."
//                     value={symptomSearch}
//                     onChange={(e) => setSymptomSearch(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>

//               {/* Selected Symptoms */}
//               {selectedSymptoms.length > 0 && (
//                 <div className="mb-6">
//                   <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                     Selected Symptoms ({selectedSymptoms.length})
//                   </p>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedSymptoms.map((symptom) => (
//                       <Badge
//                         key={symptom}
//                         className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 flex items-center gap-1 py-1.5"
//                       >
//                         {symptom}
//                         <button
//                           onClick={() => handleSymptomToggle(symptom)}
//                           className="ml-1 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full w-4 h-4 inline-flex items-center justify-center"
//                         >
//                           ×
//                         </button>
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Symptoms Grid */}
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
//                 {filteredSymptoms.map((symptom) => (
//                   <button
//                     key={symptom.id}
//                     onClick={() => handleSymptomToggle(symptom.name)}
//                     className={`p-3 rounded-lg border text-sm transition-all ${
//                       selectedSymptoms.includes(symptom.name)
//                         ? "bg-purple-50 border-purple-300 text-purple-700 dark:bg-purple-900/20 dark:border-purple-700"
//                         : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300"
//                     }`}
//                   >
//                     {symptom.name}
//                   </button>
//                 ))}
//               </div>

//               {/* Analyze Button */}
//               <Button
//                 onClick={handleAnalyzeSymptoms}
//                 disabled={selectedSymptoms.length === 0 || isAnalyzing}
//                 className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
//               >
//                 {isAnalyzing ? (
//                   <>
//                     <Loader2 className="w-5 h-5 mr-2 animate-spin" />
//                     Analyzing symptoms...
//                   </>
//                 ) : (
//                   <>
//                     <Brain className="w-5 h-5 mr-2" />
//                     Analyze Symptoms
//                   </>
//                 )}
//               </Button>

//               {/* Disclaimer */}
//               <p className="text-xs text-gray-500 mt-4">
//                 <AlertCircle className="w-3 h-3 inline mr-1" />
//                 This is for preliminary guidance only. Always consult with a qualified healthcare provider.
//               </p>
//             </Card>
//           </div>
//         )}

//         {/* Option 3: Specialties Carousel */}
//         {activeOption === "specialties" && (
//           <div className="space-y-8">
//             <button
//               onClick={() => setActiveOption("options")}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               <span>Back to options</span>
//             </button>

//             <div className="mb-8">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                 Browse by Specialty
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Choose from 25+ medical specialties
//               </p>
//             </div>

//             {/* Specialties Carousel */}
//             <div className="relative">
//               <button
//                 onClick={handlePrev}
//                 disabled={currentIndex === 0}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-0 disabled:cursor-not-allowed border border-gray-200"
//               >
//                 <ChevronLeft className="w-5 h-5 text-gray-700" />
//               </button>

//               <button
//                 onClick={handleNext}
//                 disabled={currentIndex >= Math.ceil(specialties.length / 4) - 1}
//                 className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-0 disabled:cursor-not-allowed border border-gray-200"
//               >
//                 <ChevronRight className="w-5 h-5 text-gray-700" />
//               </button>

//               <div
//                 ref={scrollContainerRef}
//                 className="flex overflow-x-auto scrollbar-hide gap-6 pb-4"
//                 style={{ scrollBehavior: 'smooth' }}
//               >
//                 {specialties.map((specialty) => {
//                   const Icon = specialty.icon;
//                   return (
//                     <div
//                       key={specialty.id}
//                       className="specialty-card flex-shrink-0 w-64 cursor-pointer group"
//                       onClick={() => handleSpecialtyClick(specialty.name)}
//                     >
//                       <Card className="p-6 hover:border-green-300 transition-all h-full">
//                         <div className={`${specialty.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
//                           <Icon className={`w-8 h-8 ${specialty.textColor}`} />
//                         </div>
//                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
//                           {specialty.name}
//                         </h3>
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
//                           {specialty.description}
//                         </p>
//                         <div className="flex items-center justify-between">
//                           <span className="text-xs text-gray-500">
//                             {specialty.doctorCount} doctors
//                           </span>
//                           <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
//                             View
//                             <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
//                           </div>
//                         </div>
//                       </Card>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Pagination Indicators */}
//               <div className="flex justify-center items-center gap-2 mt-6">
//                 {Array.from({ length: Math.ceil(specialties.length / 4) }).map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => {
//                       if (scrollContainerRef.current) {
//                         const container = scrollContainerRef.current;
//                         const cardWidth = container.querySelector('.specialty-card')?.clientWidth || 0;
//                         const gap = 24;
//                         const scrollAmount = (cardWidth + gap) * 4 * index;
//                         container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
//                         setCurrentIndex(index);
//                       }
//                     }}
//                     className={`h-2 rounded-full transition-all ${
//                       currentIndex === index
//                         ? 'w-6 bg-green-600'
//                         : 'w-2 bg-gray-300 hover:bg-gray-400'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* View All Link */}
//             <div className="text-center mt-8">
//               <Link
//                 href="/doctors"
//                 className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
//               >
//                 View all specialties
//                 <ArrowRight className="w-4 h-4" />
//               </Link>
//             </div>
//           </div>
//         )}

//         {/* Results from AI Analysis */}
//         {activeOption === "results" && (
//           <div className="space-y-8">
//             <button
//               onClick={() => {
//                 setActiveOption("ai");
//                 setSelectedSymptoms([]);
//                 setAiResults([]);
//               }}
//               className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
//             >
//               <ChevronLeft className="w-4 h-4" />
//               <span>Back to symptom checker</span>
//             </button>

//             <div className="mb-6">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center">
//                   <Brain className="w-6 h-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                     Recommended Doctors
//                   </h2>
//                   <p className="text-gray-600 dark:text-gray-400">
//                     Based on your symptoms: {selectedSymptoms.join(", ")}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {aiResults.map((doctor) => (
//                   <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
//                     <div className="relative h-48 w-full">
//                       <Image
//                         src={doctor.image}
//                         alt={doctor.name}
//                         fill
//                         className="object-cover"
//                       />
//                       {doctor.isOnline && (
//                         <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
//                           <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
//                           Online
//                         </div>
//                       )}
//                     </div>
//                     <div className="p-5">
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
//                       </div>
//                       <p className="text-sm text-green-600 mb-2">{doctor.specialty}</p>
//                       <div className="flex items-center gap-1 mb-2">
//                         <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
//                         <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
//                         <span className="text-sm text-gray-500">({doctor.reviewCount})</span>
//                       </div>
//                       <p className="text-xs text-gray-500 mb-3">{doctor.hospital}</p>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <span className="text-sm text-gray-500">Fee</span>
//                           <p className="text-lg font-bold text-gray-900">{doctor.fee}</p>
//                         </div>
//                         <Link href={`/booking/${doctor.id}`}>
//                           <Button className="bg-green-600 hover:bg-green-700">Book Now</Button>
//                         </Link>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// }




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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await doctorsApi.getDoctors();
        console.log("API Response:", res.data);

        const formattedDoctors = (res.data || []).map((doc: any) => ({
          id: doc.id.toString(),
          name: `Dr. ${doc.firstName} ${doc.lastName}`,
          specialty: doc.specialty,
          experience: doc.experience,
          rating: 4.5,
          reviewCount: 20,
          isVerified: true,
          isOnline: true,
          isPremium: false,
          profilePhoto: `http://localhost:3000${doc.avatar}`,
          imageUrl: `http://localhost:3000${doc.avatar}`,
          nextAvailableSlots: [{ time: "10:00 AM" }],
          consultationFee: 1000,
          price: 1000,
          nextAvailable: "Today",
        }));

        console.log("Formatted Doctors:", formattedDoctors);

        setDoctors(formattedDoctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const filteredAndSortedDoctors = useMemo(() => {
  console.log("---- Filtering Doctors ----");
  console.log("All Doctors:", doctors);
  console.log("Search Query:", searchQuery);
  console.log("Selected Specialty:", selectedSpecialty);
  console.log("Online Only:", onlineOnly);
  console.log("Premium Only:", premiumOnly);
  console.log("Sort By:", sortBy);

  const filtered = doctors.filter((doctor) => {
    console.log("Checking doctor:", doctor);

    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    console.log("matchesSearch:", matchesSearch);

    const matchesSpecialty =
      selectedSpecialty === "" ||
      doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase();

    console.log("matchesSpecialty:", matchesSpecialty);

    const matchesOnline = !onlineOnly || doctor.isOnline;
    console.log("matchesOnline:", matchesOnline);

    const matchesPremium = !premiumOnly || doctor.isPremium;
    console.log("matchesPremium:", matchesPremium);

    const result =
      matchesSearch && matchesSpecialty && matchesOnline && matchesPremium;

    console.log("Final Filter Result:", result);

    return result;
  });

  console.log("Filtered Doctors:", filtered);

  filtered.sort((a, b) => {
    console.log("Sorting doctors:", a.name, b.name);

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

  console.log("Final Sorted Doctors:", filtered);

  return filtered;
}, [
  doctors,
  searchQuery,
  selectedSpecialty,
  onlineOnly,
  premiumOnly,
  sortBy,
]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("");
    setOnlineOnly(false);
    setPremiumOnly(false);
    setSortBy("recommended");
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
                      <div className="relative sm:w-40 h-48 sm:h-auto flex-shrink-0">
                       <Image
  src={doctor.profilePhoto}
  alt={doctor.name}
  fill
  unoptimized={true}
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
                            ({doctor.reviewCount})
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
