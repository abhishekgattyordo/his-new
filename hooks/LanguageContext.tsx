// "use client";

// import { useState, useEffect, createContext, useContext } from "react";

// type Language = "en" | "hi";

// interface LanguageContextType {
//   language: Language;
//   setLanguage: (lang: Language) => void;
//   t: (key: string) => string;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// // Translation dictionary
// const translations: Record<string, Record<Language, string>> = {
//   appName: {
//     en: "HealthCare+",
//     hi: "हेल्थकेयर+",
//   },
//   login: {
//     en: "Login",
//     hi: "लॉगिन",
//   },
//   register: {
//     en: "Register",
//     hi: "रजिस्टर",
//   },
//   logout: {
//     en: "Logout",
//     hi: "लॉगआउट",
//   },
//   save: {
//     en: "Save",
//     hi: "सहेजें",
//   },
//   cancel: {
//     en: "Cancel",
//     hi: "रद्द करें",
//   },
//   next: {
//     en: "Next",
//     hi: "आगे",
//   },
//   previous: {
//     en: "Previous",
//     hi: "पिछला",
//   },
//   submit: {
//     en: "Submit",
//     hi: "जमा करें",
//   },
//   // Add more translations as needed
// };

// export function LanguageProvider({ children }: { children: React.ReactNode }) {
//   const [language, setLanguageState] = useState<Language>("en");

//   // Initialize from localStorage
//   useEffect(() => {
//     const savedLanguage = localStorage.getItem("language") as Language;
//     if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
//       setLanguageState(savedLanguage);
//     }
//   }, []);

//   const setLanguage = (lang: Language) => {
//     setLanguageState(lang);
//     localStorage.setItem("language", lang);
//   };

//   const t = (key: string): string => {
//     return translations[key]?.[language] || key;
//   };

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage, t }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export function useLanguage() {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error("useLanguage must be used within a LanguageProvider");
//   }
//   return context;
// }


// LanguageContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from "react";


export type Language = "en" | "hi";

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<string, Record<Language, string>> = {
  appName: { en: "HealthCare+", hi: "हेल्थकेयर+" },
  login: { en: "Login", hi: "लॉगिन" },
  register: { en: "Register", hi: "रजिस्टर" },
  logout: { en: "Logout", hi: "लॉगआउट" },
  save: { en: "Save", hi: "सहेजें" },
  cancel: { en: "Cancel", hi: "रद्द करें" },
  next: { en: "Next", hi: "आगे" },
  previous: { en: "Previous", hi: "पिछला" },
  submit: { en: "Submit", hi: "जमा करें" },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") localStorage.setItem("language", lang);
  };

  const t = (key: string): string => translations[key]?.[language] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
