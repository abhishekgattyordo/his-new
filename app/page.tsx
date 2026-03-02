// import React from "react";
// import {
//   Check,
//   Star,
//   Phone,
//   Shield,
//   Clock,
//   Users,
//   Video,
//   MapPin,
//   Calendar,
//   MessageCircle,
//   FileText,
//   Download,
//   ChevronRight,
//   Sparkles,
//   Award,
//   ThumbsUp,
// } from "lucide-react";
// import Header from "@/components/ui/Header";
// import SpecialtiesSection from "@/components/SpecialtiesSection";
// import HealthConcernsSection from "@/components/HealthConcernsSection";
// import FAQ from "@/components/FAQ";

// export default function LandingPage() {
//   const specialties = [
//     { name: "Gynaecology", price: "₹499", icon: "🩺" },
//     { name: "Sexology", price: "₹499", icon: "❤️" },
//     { name: "General physician", price: "₹399", icon: "👨‍⚕️" },
//     { name: "Dermatology", price: "₹449", icon: "🔬" },
//     { name: "Psychiatry", price: "₹449", icon: "🧠" },
//     { name: "Stomach and digestion", price: "₹399", icon: "🤢" },
//   ];

//   const healthConcerns = [
//     { name: "Cough & Cold?", price: "₹399", icon: "🤧" },
//     { name: "Period problems?", price: "₹499", icon: "🩸" },
//     { name: "Performance issues in bed?", price: "₹499", icon: "⚡" },
//     { name: "Skin problems?", price: "₹449", icon: "🔍" },
//   ];

//   const doctors = [
//     {
//       name: "Dr. Anshuman Gupta",
//       specialty: "Cardiologist",
//       experience: "11 years",
//       consults: "13,528+",
//       type: "both",
//       video: true,
//       rating: 4.9,
//       availability: "Available Now",
//       image: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     {
//       name: "Dr. Afshan Jabeen",
//       specialty: "Gynecologist, Obstetrician",
//       experience: "6 years",
//       consults: "6,253+",
//       type: "online",
//       video: true,
//       rating: 4.8,
//       availability: "In 15 mins",
//       image: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//     {
//       name: "Dr. Vandana Parekh",
//       specialty: "Obstetrician, Gynecologist",
//       experience: "14 years",
//       consults: "36,419+",
//       type: "offline",
//       video: false,
//       rating: 4.9,
//       availability: "Tomorrow",
//       image: "https://randomuser.me/api/portraits/women/65.jpg",
//     },
//     {
//       name: "Dr. Prateeksha B S",
//       specialty: "Obstetrician, Gynecologist, Infert.",
//       experience: "7 years",
//       consults: "13,245+",
//       type: "both",
//       video: true,
//       rating: 4.7,
//       availability: "Available Now",
//       image: "https://randomuser.me/api/portraits/women/68.jpg",
//     },
//   ];

//   const stats = [
//     {
//       icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
//       value: "2,00,000+",
//       label: "Happy Users",
//       color: "text-blue-600 bg-blue-50",
//     },
//     {
//       icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
//       value: "20,000+",
//       label: "Verified Doctors",
//       color: "text-green-600 bg-green-50",
//     },
//     {
//       icon: <Sparkles className="w-5 h-5 md:w-6 md:h-6" />,
//       value: "25+",
//       label: "Specialities",
//       color: "text-purple-600 bg-purple-50",
//     },
//     {
//       icon: <Star className="w-5 h-5 md:w-6 md:h-6" />,
//       value: "4.5 / 5",
//       label: "App Rating",
//       color: "text-amber-600 bg-amber-50",
//     },
//   ];

//   const benefits = [
//     {
//       icon: <Video className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Consult Top Doctors 24x7",
//       description:
//         "Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.",
//       features: ["Video Consult", "Chat Support", "Phone Call"],
//       gradient: "from-blue-500 to-cyan-500",
//     },
//     {
//       icon: <MapPin className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "Book Clinic Visits",
//       description:
//         "Find and book appointments at nearby clinics and hospitals with verified doctors.",
//       features: ["Clinic Search", "Slot Booking", "Directions"],
//       gradient: "from-green-500 to-emerald-500",
//     },
//     {
//       icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
//       title: "100% Safe & Secure",
//       description:
//         "Be assured that your online consultation will be fully private and secured.",
//       features: ["Data Privacy", "Secure Payment", "HIPAA Compliant"],
//       gradient: "from-purple-500 to-pink-500",
//     },
//   ];

//   const howItWorks = [
//     {
//       step: "1",
//       title: "Choose Consultation Type",
//       desc: "Select online video call or in-person clinic visit",
//       icon: "📱",
//     },
//     {
//       step: "2",
//       title: "Find & Book Doctor",
//       desc: "Search from verified doctors and book your slot",
//       icon: "🔍",
//     },
//     {
//       step: "3",
//       title: "Consult & Get Treatment",
//       desc: "Have your consultation and receive prescriptions",
//       icon: "👨‍⚕️",
//     },
//     {
//       step: "4",
//       title: "Follow-up & Support",
//       desc: "Get free follow-up consultation and ongoing support",
//       icon: "📋",
//     },
//   ];

//   const features = [
//     {
//       icon: <Video className="w-6 h-6 md:w-8 md:h-8" />,
//       title: "Video Consultation",
//       desc: "HD video calls with doctors from home",
//       color: "bg-gradient-to-r from-blue-500 to-cyan-500",
//     },
//     {
//       icon: <Calendar className="w-6 h-6 md:w-8 md:h-8" />,
//       title: "Clinic Appointment",
//       desc: "Book in-person visits at nearby clinics",
//       color: "bg-gradient-to-r from-green-500 to-emerald-500",
//     },
//     {
//       icon: <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />,
//       title: "Chat with Doctor",
//       desc: "24/7 chat support with specialists",
//       color: "bg-gradient-to-r from-purple-500 to-pink-500",
//     },
//     {
//       icon: <FileText className="w-6 h-6 md:w-8 md:h-8" />,
//       title: "Digital Prescription",
//       desc: "Get prescriptions digitally delivered",
//       color: "bg-gradient-to-r from-orange-500 to-amber-500",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Header */}
//       <Header />

//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-blue-50 via-white to-pink-50">
//         <div className="px-4 py-8 md:px-8 md:py-12 lg:px-16">
//           <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
//             {/* Left Content */}
//             <div className="w-full lg:w-1/2 order-2 lg:order-1">
//               <div className="text-center lg:text-left">
//                 {/* Main Heading */}
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
//                   Skip the travel!
//                 </h1>

//                 {/* Sub Heading */}
//                 <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-blue-600 mb-3">
//                   Take Online & Offline Doctor Consultation
//                 </h2>

//                 {/* Price Section */}
//                 <div className="mb-4">
//                   <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-1">
//                     Private consultation + Audio call · Starts at just
//                   </p>
//                   <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">
//                     ₹199
//                   </p>
//                 </div>

//                 {/* Status Badges */}
//                 <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
//                   <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     +100 Doctors are online
//                   </div>

//                   <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
//                     <MapPin className="w-3 h-3" />
//                     500+ Clinics available
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Right Image */}
//             <div className="w-full lg:w-1/2 order-1 lg:order-2 mb-6 lg:mb-0">
//               <div className="relative">
//                  <img
//                     src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
//                     alt="Professional Doctor Consultation"
//                     className="w-full h-48 sm:h-64 md:h-80 lg:h-[400px] xl:h-[480px] object-cover"
//                   />
//                 <div className="absolute -top-2 -right-2 bg-white rounded-xl p-2 sm:p-3 shadow-lg">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                     <div>
//                       <div className="text-xs text-gray-500">Available</div>
//                       <div className="text-sm font-bold text-gray-800">24/7 Online</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Quick Features */}
//       <section className="pt-8 pb-0 px-4 sm:px-6 md:px-8 lg:px-16 -mt-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="group bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 sm:hover:-translate-y-2"
//             >
//               <div
//                 className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-2xl ${feature.color} flex items-center justify-center mb-3 sm:mb-4 text-white`}
//               >
//                 {feature.icon}
//               </div>

//               <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2">
//                 {feature.title}
//               </h3>

//               <p className="text-gray-600 text-xs sm:text-sm">
//                 {feature.desc}
//               </p>

//               <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
//                 <span className="text-xs sm:text-sm text-blue-600 font-medium group-hover:text-blue-700 transition-colors flex items-center gap-1">
//                   Learn more
//                   <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Specialties Section */}
//       <div className="mt-8 sm:mt-10 px-4 sm:px-6 md:px-8 lg:px-16"> 
//         <SpecialtiesSection />
//       </div>

//       {/* Health Concerns Section */}
//       <div className="px-4 sm:px-6 md:px-8 lg:px-16">
//         <HealthConcernsSection />
//       </div>

//       {/* Top Doctors Section */}
//       <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
//         <div className="text-center">
//           <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4">
//             <Award className="w-4 h-4 sm:w-5 sm:h-5" />
//             <span className="text-xs sm:text-sm font-medium">Verified & Certified</span>
//           </div>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
//             Meet Our Top Doctors
//           </h2>
//           <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
//             Expert doctors available for both online and in-person consultations
//           </p>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
//           {doctors.map((doctor, index) => (
//             <div
//               key={index}
//               className="group bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 sm:hover:-translate-y-2"
//             >
//               <div className="flex items-start gap-3 sm:gap-4 mb-4">
//                 <img
//                   src={doctor.image}
//                   alt={doctor.name}
//                   className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-start gap-2">
//                     <div className="min-w-0">
//                       <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
//                         {doctor.name}
//                       </h3>
//                       <p className="text-blue-600 font-medium text-xs sm:text-sm truncate">
//                         {doctor.specialty}
//                       </p>
//                     </div>
//                     <div
//                       className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium shrink-0 ${
//                         doctor.type === "online"
//                           ? "bg-green-50 text-green-700 border border-green-200"
//                           : doctor.type === "offline"
//                             ? "bg-blue-50 text-blue-700 border border-blue-200"
//                             : "bg-purple-50 text-purple-700 border border-purple-200"
//                       }`}
//                     >
//                       {doctor.type === "both" ? "Both" : doctor.type}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-1 sm:gap-2 mt-2">
//                     <div className="flex items-center gap-1">
//                       <Star className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 fill-current" />
//                       <span className="text-sm font-bold text-gray-900">
//                         {doctor.rating}
//                       </span>
//                     </div>
//                     <span className="text-gray-400">•</span>
//                     <span className="text-xs sm:text-sm text-green-600 font-medium truncate">
//                       {doctor.availability}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
//                 <p className="text-gray-600 flex items-center gap-2 text-xs sm:text-sm">
//                   <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
//                   <span className="truncate">{doctor.experience} experience</span>
//                 </p>
//                 <p className="text-gray-600 flex items-center gap-2 text-xs sm:text-sm">
//                   <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500 flex-shrink-0" />
//                   <span className="truncate">{doctor.consults} consults</span>
//                 </p>
//                 {doctor.video && (
//                   <p className="text-gray-600 flex items-center gap-2 text-xs sm:text-sm">
//                     <Video className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
//                     <span className="truncate">Video consultation available</span>
//                   </p>
//                 )}
//               </div>

//               <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//                 {doctor.type !== "offline" && (
//                   <button className="w-full sm:flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm hover:shadow-lg">
//                     Video Consult
//                   </button>
//                 )}
//                 {doctor.type !== "online" && (
//                   <button className="w-full sm:flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-medium py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-xs sm:text-sm hover:shadow-lg">
//                     Clinic Visit
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* How It Works & Stats */}
//       <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
//           <div>
//             <div className="mb-6 sm:mb-8">
//               <h2 className="text-2xl sm:text-3xl font-bold mb-2">How it works</h2>
//               <p className="text-gray-600 text-sm sm:text-base">
//                 Simple steps to get quality healthcare
//               </p>
//             </div>
//             <div className="space-y-4 sm:space-y-6">
//               {howItWorks.map((item) => (
//                 <div
//                   key={item.step}
//                   className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
//                 >
//                   <div className="relative flex-shrink-0">
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
//                     <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg sm:rounded-2xl flex items-center justify-center font-bold text-xl sm:text-2xl">
//                       {item.step}
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-3 sm:gap-4 mb-1 sm:mb-2">
//                       <span className="text-xl sm:text-2xl">{item.icon}</span>
//                       <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">
//                         {item.title}
//                       </h3>
//                     </div>
//                     <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <div className="mb-6 sm:mb-8">
//               <h2 className="text-2xl sm:text-3xl font-bold mb-2">Our Impact</h2>
//               <p className="text-gray-600 text-sm sm:text-base">Trusted by thousands of patients</p>
//             </div>
//             <div className="grid grid-cols-2 gap-4 sm:gap-6">
//               {stats.map((stat, index) => (
//                 <div
//                   key={index}
//                   className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 sm:hover:-translate-y-2 ${stat.color.split(" ")[1]}`}
//                 >
//                   <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
//                     <div
//                       className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${stat.color.split(" ")[1]}`}
//                     >
//                       {stat.icon}
//                     </div>
//                   </div>
//                   <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
//                     {stat.value}
//                   </div>
//                   <div className="text-gray-600 font-medium text-xs sm:text-sm">{stat.label}</div>
//                 </div>
//               ))}
//             </div>

//             {/* Trust Indicators */}
//             <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-200">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <span className="text-gray-700 font-medium text-sm sm:text-base">
//                   Trust & Safety
//                 </span>
//                 <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
//               </div>
//               <div className="grid grid-cols-3 gap-3 sm:gap-4">
//                 <div className="text-center">
//                   <div className="text-base sm:text-lg font-bold text-gray-900">100%</div>
//                   <div className="text-xs text-gray-600">Verified</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-base sm:text-lg font-bold text-gray-900">24/7</div>
//                   <div className="text-xs text-gray-600">Support</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-base sm:text-lg font-bold text-gray-900">SSL</div>
//                   <div className="text-xs text-gray-600">Secure</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Benefits Section */}
//       <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
//         <div className="text-center mb-8 sm:mb-12">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
//             Why Choose Us
//           </h2>
//           <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
//             Experience healthcare that puts you first
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
//           {benefits.map((benefit, index) => (
//             <div
//               key={index}
//               className="group relative bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 sm:hover:-translate-y-2"
//             >
//               {/* Background Gradient */}
//               <div
//                 className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-5 rounded-xl sm:rounded-2xl group-hover:opacity-10 transition-opacity`}
//               ></div>

//               <div
//                 className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r ${benefit.gradient} text-white rounded-lg sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6`}
//               >
//                 {benefit.icon}
//               </div>

//               <h3 className="relative text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
//                 {benefit.title}
//               </h3>
//               <p className="relative text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
//                 {benefit.description}
//               </p>

//               <div className="relative space-y-2 sm:space-y-3">
//                 {benefit.features.map((feature, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center gap-2 sm:gap-3 text-gray-700"
//                   >
//                     <div
//                       className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r ${benefit.gradient} flex items-center justify-center flex-shrink-0`}
//                     >
//                       <Check className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
//                     </div>
//                     <span className="text-xs sm:text-sm font-medium">{feature}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <div className="px-4 sm:px-6 md:px-8 lg:px-16">
//         <FAQ />
//       </div>

//       {/* Download App CTA */}
//       <section className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16">
//         <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
//           {/* Background Pattern */}
//           <div className="absolute inset-0 bg-grid-white/10 opacity-10"></div>
//           <div className="absolute -top-12 -right-12 sm:-top-24 sm:-right-24 w-48 h-48 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-2xl sm:blur-3xl"></div>
//           <div className="absolute -bottom-12 -left-12 sm:-bottom-24 sm:-left-24 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-2xl sm:blur-3xl"></div>

//           <div className="relative px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:px-12 lg:py-16 text-center">
//             <div className="max-w-3xl mx-auto">
//               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
//                 Download Our App Now
//               </h2>
//               <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-2">
//                 Get instant access to doctors, book appointments, and manage
//                 your health from anywhere
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
//                 <button className="group bg-white hover:bg-gray-50 text-gray-900 font-bold py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl text-base sm:text-lg transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 min-w-[10rem] sm:min-w-[12.5rem]">
//                   <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded sm:rounded-lg flex items-center justify-center">
//                     <Download className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
//                   </div>
//                   <div className="text-left">
//                     <div className="text-xs text-gray-500">Download on</div>
//                     <div className="text-sm sm:text-base md:text-lg font-bold">Apple Store</div>
//                   </div>
//                 </button>

//                 <button className="group bg-gray-900 hover:bg-black text-white font-bold py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl text-base sm:text-lg transition-all duration-300 shadow-lg sm:shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 min-w-[10rem] sm:min-w-[12.5rem]">
//                   <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded sm:rounded-lg flex items-center justify-center">
//                     <Download className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
//                   </div>
//                   <div className="text-left">
//                     <div className="text-xs text-gray-300">Get it on</div>
//                     <div className="text-sm sm:text-base md:text-lg font-bold">Google Play</div>
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
//         <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-10 md:py-12">
//           {/* Logo and Tagline */}
//           <div className="flex flex-col items-center text-center mb-8">
//             <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
//               <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded sm:rounded-lg"></div>
//               <span className="text-xl sm:text-2xl font-bold text-gray-900">
//                 #HelloDoctor
//               </span>
//             </div>
//             <p className="text-gray-600 text-sm sm:text-base max-w-xl px-4">
//               Consult verified doctors online or offline. Trusted healthcare at
//               your fingertips.
//             </p>
//           </div>

//           {/* Links Grid */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 mb-8">
//             {[
//               {
//                 title: "Services",
//                 links: [
//                   "Video Consult",
//                   "Clinic Visit",
//                   "Lab Tests",
//                   "Medicine Delivery",
//                 ],
//               },
//               {
//                 title: "Company",
//                 links: ["About Us", "Careers", "Press", "Blog"],
//               },
//               {
//                 title: "Support",
//                 links: ["Contact", "Help Center", "Privacy Policy", "Terms"],
//               },
//               {
//                 title: "Doctors",
//                 links: ["Register", "Consultations", "Resources", "Partners"],
//               },
//               {
//                 title: "Health Topics",
//                 links: [
//                   "COVID-19",
//                   "Mental Health",
//                   "Women Health",
//                   "Chronic Care",
//                 ],
//               },
//             ].map((section, idx) => (
//               <div key={idx}>
//                 <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3 sm:mb-4">
//                   {section.title}
//                 </h3>
//                 <ul className="space-y-2 sm:space-y-3">
//                   {section.links.map((link, linkIdx) => (
//                     <li key={linkIdx}>
//                       <a
//                         href="#"
//                         className="text-gray-600 hover:text-blue-600 transition-colors text-xs sm:text-sm"
//                       >
//                         {link}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* Divider */}
//           <div className="border-t border-gray-300 mb-6 sm:mb-8"></div>

//           {/* Bottom Section */}
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
//             <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
//               © 2024 Doctor Consultation Platform. All rights reserved.
//             </div>

//             <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
//               <div className="flex items-center gap-3">
//                 <span className="text-gray-500 text-xs sm:text-sm">Follow us:</span>
//                 <div className="flex gap-2 sm:gap-3">
//                   {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(
//                     (social) => (
//                       <a
//                         key={social}
//                         href="#"
//                         className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-colors text-xs"
//                       >
//                         {social.charAt(0)}
//                       </a>
//                     ),
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-2">
//               <span className="text-red-500">❤️</span>
//               Made with love for better healthcare
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


// app/page.tsx


'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Video,
  Calendar,
  Activity,
  FlaskConical,
  Pill,
  Search,
  Clock,
  FileText,
  Shield,
  DollarSign,
  Lock,
  Zap,
  Star,
  CheckCircle2,
} from 'lucide-react';
import Header from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';



// Mock Data (move to separate file later)
const mockDoctors = [
  {
    id: 'sarah',
    name: 'Dr. Sarah Smith',
    specialty: 'Senior Cardiologist',
    rating: 4.9,
    reviewCount: 128,
    profilePhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isOnline: true,
  },
  {
    id: 'john',
    name: 'Dr. John Doe',
    specialty: 'Dermatologist',
    rating: 4.7,
    reviewCount: 95,
    profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    isOnline: false,
  },
  {
    id: 'robert',
    name: 'Dr. Robert Kim',
    specialty: 'Dermatologist',
    rating: 4.7,
    reviewCount: 95,
    profilePhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=face',
    isOnline: true,
  },
  {
    id: 'emily',
    name: 'Dr. Emily Chen',
    specialty: 'Neurologist',
    rating: 4.8,
    reviewCount: 112,
    profilePhoto: 'https://images.unsplash.com/photo-1594824434340-d2d9d2fc5b4c?w=400&h=400&fit=crop&crop=face',
    isOnline: true,
  },
];

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    feedback: 'Excellent service! The doctors are very professional and caring.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 5,
    feedback: 'Very convenient platform. Saved me so much time.',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    rating: 4,
    feedback: 'Great experience overall. Highly recommended.',
  },
];

export default function LandingPage() {
  const featuredDoctors = mockDoctors.slice(0, 4);

  const services = [
    {
      icon: Video,
      title: 'Online Consultation',
      description: 'Connect with doctors via video call from anywhere',
    },
    {
      icon: Calendar,
      title: 'Book Appointments',
      description: 'Schedule in-hospital visits with ease',
    },
    {
      icon: Activity,
      title: 'Emergency Care',
      description: '24/7 emergency medical assistance',
    },
    {
      icon: FlaskConical,
      title: 'Lab Tests',
      description: 'Book lab tests and get reports online',
    },
    {
      icon: Pill,
      title: 'Pharmacy',
      description: 'Order medicines with prescription',
    },
  ];

  const steps = [
    {
      icon: Search,
      title: 'Search Doctor',
      description: 'Find by specialty or name',
    },
    {
      icon: Calendar,
      title: 'Choose Slot',
      description: 'Select date and time',
    },
    {
      icon: FileText,
      title: 'Consult',
      description: 'Get expert advice',
    },
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: 'Verified Doctors',
      description: 'All doctors are certified and experienced',
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      description: 'Quality healthcare at reasonable rates',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your data is protected and confidential',
    },
    {
      icon: Zap,
      title: 'Fast Booking',
      description: 'Book appointments in seconds',
    },
  ];

  return (
    <div className="min-h-screen">
    <Header/>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Trusted by 50,000+ Patients
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Consult Trusted Doctors{' '}
                <span className="text-green-600">Anytime, Anywhere</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                Online & in-hospital consultations with verified specialists. Get expert medical
                advice from the comfort of your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/doctors">
                  <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    Find Doctor
                  </Button>
                </Link>
                <Link href="/doctors">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-green-600 text-green-600 hover:bg-green-50">
                    Consult Online
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Certified Doctors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">Secure Consultations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-600">24/7 Support</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative h-[500px] w-full">
              <Image
                src="https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Healthcare professionals"
                fill
                className="rounded-2xl shadow-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare services designed for your convenience
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border border-gray-200">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book your appointment in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="p-8 text-center h-full border border-gray-200">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-xl text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Doctors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our highly qualified and experienced medical professionals
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
                <div className="relative h-48 w-full">
                  <Image
                    src={doctor.profilePhoto}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                    {doctor.isOnline && (
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-sm text-green-600 mb-2">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                    <span className="text-sm text-gray-500">({doctor.reviewCount})</span>
                  </div>
                  <Link href={`/booking/${doctor.id}`}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">Book Now</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/doctors">
              <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
                View All Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Choose Us</h2>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              We're committed to providing the best healthcare experience
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-green-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Patient Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear what our patients have to say
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow border border-gray-200">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.feedback}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Book your appointment with our experienced doctors today
          </p>
          <Link href="/doctors">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Find Your Doctor Now
            </Button>
          </Link>
        </div>
      </section>
      <Footer/>
    </div>
  );
}