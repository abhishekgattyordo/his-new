// components/FAQ.tsx
'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is online doctor consultation?',
      answer: 'Online doctor consultation or online medical consultation is a method to connect patients and doctors virtually. It is a convenient and easy way to get online doctor advice using doctor apps or telemedicine apps or platforms, and the internet.'
    },
    {
      question: 'How do I start online consultation with doctors on MediConnect?',
      answer: 'Starting an online doctor consultation is very simple on MediConnect. Follow these 4 simple steps:\n• Choose your health concern\n• Connect with a doctor within 2 minutes\n• Ask your queries to the doctor via audio or video call\n• Get a valid online doctor prescription and a 3-day free follow-up consultation'
    },
    {
      question: 'Are your online doctors qualified?',
      answer: 'We follow a strict verification process for every doctor providing online medical services on MediConnect. Our team manually verifies necessary documents, registrations, and certifications for every doctor. All doctors are licensed medical practitioners with valid qualifications.'
    },
    {
      question: 'Is online doctor consultation safe and secure?',
      answer: 'The privacy of our patients is critical to us, and thus, we are compliant with industry standards like ISO 27001. Rest assured that your online consultation with a doctor is completely safe and secured with 256-bit encryption. All conversations are confidential.'
    },
    {
      question: 'What happens if I don\'t get a response from a doctor?',
      answer: 'In the unlikely event that an online doctor does not respond within the promised time, you will be entitled to a 100% refund. Our support team is available 24/7 to assist you in such cases.'
    },
    {
      question: 'Can I do a free online doctor consultation?',
      answer: 'We offer free health check-ups during special health awareness campaigns. Check our promotions page for current offers. You can also ask free health questions on our mobile app which will be answered by doctors within 24-48 hours.'
    },
    {
      question: 'Can I get a prescription online?',
      answer: 'Yes, qualified doctors can provide digital prescriptions for medications that don\'t require physical examination. These prescriptions are valid and can be used at any pharmacy. However, certain controlled substances and medications require in-person consultation.'
    },
    {
      question: 'What medical issues can I consult for online?',
      answer: 'You can consult for common health issues like cold, fever, skin problems, mental health concerns, chronic disease management, minor injuries, and follow-up consultations. For emergencies and serious conditions, we recommend visiting a hospital immediately.'
    },
    {
      question: 'How do video consultations work?',
      answer: 'Video consultations work similar to a video call. After booking, you\'ll receive a link to join the consultation at the scheduled time. You can talk to the doctor face-to-face, show symptoms if needed, and get immediate medical advice.'
    },
    {
      question: 'Can I consult with specialists?',
      answer: 'Yes, we have specialists across 25+ medical fields including cardiology, dermatology, psychiatry, gynecology, pediatrics, and more. You can choose the specialist based on your health concern and book an appointment.'
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Get answers to common questions about online and offline consultations
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              {faqs.slice(0, 5).map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200">
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50/30 transition-colors"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span className="font-bold text-gray-900 text-lg pr-8 flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              {faqs.slice(5, 10).map((faq, index) => (
                <div key={index + 5} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200">
                  <button
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-blue-50/30 transition-colors"
                    onClick={() => setOpenIndex(openIndex === index + 5 ? null : index + 5)}
                  >
                    <span className="font-bold text-gray-900 text-lg pr-8 flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 6}
                      </span>
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0">
                      {openIndex === index + 5 ? (
                        <ChevronUp className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </button>
                  
                  {openIndex === index + 5 && (
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                        </div>
                        <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

     
      </div>
    </section>
  );
}