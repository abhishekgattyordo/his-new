"use client";

import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  language: "en" | "hi";
  onToggle: () => void;
  className?: string;
}

export function LanguageToggle({ language, onToggle, className }: LanguageToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-colors",
        className
      )}
      aria-label={`Switch language to ${language === "en" ? "Hindi" : "English"}`}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language === "en" ? "English" : "हिंदी"}
      </span>
    </button>
  );
}