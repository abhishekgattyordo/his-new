"use client";
import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Star } from 'lucide-react';

export default function SpecialtiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const specialties = [
    {
      id: 1,
      name: 'Gynaecology',
      price: '₹499',
      image: '/patient/gynaecologist.svg',
      alt: 'Gynaecology consultation',
      link: '/consult/direct/new_consultation?id=16',
      color: 'bg-pink-50',
      textColor: 'text-pink-600',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Sexology',
      price: '₹499',
      image: '/patient/top-speciality-sexology.svg',
      alt: 'Sexology consultation',
      link: '/consult/direct/new_consultation?id=14',
      color: 'bg-red-50',
      textColor: 'text-red-600',
      rating: 4.7
    },
    {
      id: 3,
      name: 'General physician',
      price: '₹399',
      image: '/patient/top-speciality-gp.svg',
      alt: 'General physician consultation',
      link: '/consult/direct/new_consultation?id=22',
      color: 'bg-blue-50',
      textColor: 'text-blue-600',
      rating: 4.9
    },
    {
      id: 4,
      name: 'Dermatology',
      price: '₹449',
      image: '/patient/dermatologist.svg',
      alt: 'Dermatology consultation',
      link: '/consult/direct/new_consultation?id=5',
      color: 'bg-purple-50',
      textColor: 'text-purple-600',
      rating: 4.8
    },
    {
      id: 5,
      name: 'Psychiatry',
      price: '₹499',
      image: '/patient/top-speciality-psychiatric.svg',
      alt: 'Psychiatry consultation',
      link: '/consult/direct/new_consultation?id=2',
      color: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      rating: 4.6
    },
    {
      id: 6,
      name: 'Stomach and digestion',
      price: '₹399',
      image: '/patient/top-speciality-stomach.svg',
      alt: 'Gastroenterology consultation',
      link: '/consult/direct/new_consultation?id=10',
      color: 'bg-green-50',
      textColor: 'text-green-600',
      rating: 4.7
    },
    {
      id: 7,
      name: 'Pediatrics',
      price: '₹499',
      image: '/patient/top-speciality-pediatric.svg',
      alt: 'Pediatrics consultation',
      link: '/consult/direct/new_consultation?id=17',
      color: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      rating: 4.9
    },
    {
      id: 8,
      name: 'Urology',
      price: '₹499',
      image: '/patient/top-speciality-kidney.svg',
      alt: 'Urology consultation',
      link: '/consult/direct/new_consultation?id=9',
      color: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      rating: 4.7
    },
  ];

  const handleNext = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.specialty-card')?.clientWidth || 0;
      const gap = 20;
      const scrollAmount = (cardWidth + gap) * 4;
      
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setCurrentIndex(prev => Math.min(prev + 1, Math.ceil(specialties.length / 4) - 1));
    }
  };

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector('.specialty-card')?.clientWidth || 0;
      const gap = 20;
      const scrollAmount = (cardWidth + gap) * 4;
      
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setCurrentIndex(prev => Math.max(prev - 1, 0));
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.querySelector('.specialty-card')?.clientWidth || 0;
      const gap = 20;
      const newIndex = Math.round(scrollLeft / ((cardWidth + gap) * 4));
      setCurrentIndex(Math.min(newIndex, Math.ceil(specialties.length / 4) - 1));
    }
  };

  return (
    <section className="py-0">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          25+ Specialities
        </h2>
        <p className="text-gray-600">
          Consult with top doctors across specialties
        </p>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-0 disabled:cursor-not-allowed border border-gray-200`}
          aria-label="Previous specialties"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex >= Math.ceil(specialties.length / 4) - 1}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition disabled:opacity-0 disabled:cursor-not-allowed border border-gray-200`}
          aria-label="Next specialties"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>

        {/* Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide w-full pb-4 gap-4"
          onScroll={handleScroll}
        >
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              className="specialty-card flex-shrink-0 w-56"
            >
              <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full overflow-hidden group">
                {/* Image Section */}
                <div className="relative h-36 bg-gray-50 overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-sm">
                      <img
                        src={specialty.image}
                        alt={specialty.alt}
                        className="w-full h-full object-contain p-2 bg-white"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-4">
                  {/* Specialty Name and Rating */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className={`${specialty.color} ${specialty.textColor} px-3 py-1 rounded-full text-xs font-medium inline-block mb-1`}>
                        {specialty.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium text-gray-700">{specialty.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <p className="text-green-600 font-bold text-xl">{specialty.price}</p>
                    <p className="text-xs text-gray-500">Starting price</p>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={specialty.link}
                    className="block w-full"
                  >
                     <a
                  href={specialty.link}
                  className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Consult now
                  <ArrowRight className="w-3 h-3" />
                </a>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(specialties.length / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const container = scrollContainerRef.current;
                  const cardWidth = container.querySelector('.specialty-card')?.clientWidth || 0;
                  const gap = 20;
                  const scrollAmount = (cardWidth + gap) * 4 * index;
                  container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                  setCurrentIndex(index);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* View All Link */}
      <div className="mt-8">
        <a
          href="/consult/specialties"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
        >
          View all 25+ specialities
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}