"use client";

import React from "react";

interface AtelierLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "gold" | "monochrome";
}

export default function AtelierLogo({
  className = "",
  size = "md",
  showText = false,
  variant = "gold",
}: AtelierLogoProps) {
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-9 h-9 md:w-10 md:h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const iconDimension = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Precision Drill & Screw Architectural Emblem */}
      <div
        className={`relative ${iconDimension} rounded-full border border-amber-500/50 dark:border-amber-400/40 bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100/50 dark:from-stone-900 dark:via-[#0F1015] dark:to-stone-950 flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5"
        >
          <defs>
            <linearGradient id="goldDrill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="steelBlade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="glowRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Outer Precision Caliper / Workshop Ring with Notches */}
          <circle
            cx="24"
            cy="24"
            r="21.5"
            stroke="url(#glowRing)"
            strokeWidth="1.2"
            strokeDasharray="2 2.5"
            className="opacity-70 dark:opacity-90"
          />
          <circle
            cx="24"
            cy="24"
            r="19"
            stroke="url(#goldDrill)"
            strokeWidth="0.8"
            className="opacity-40"
          />

          {/* Precision Countersunk Screw Drive Head (Architectural Star / Torx Profile) */}
          <g transform="rotate(45 24 24)">
            {/* Cordless Drill Chuck / Hex Bit Collar */}
            <rect
              x="20.5"
              y="6"
              width="7"
              height="6"
              rx="1.5"
              fill="url(#steelBlade)"
              stroke="#D97706"
              strokeWidth="0.8"
            />
            {/* Chuck Teeth / Knurling Lines */}
            <line x1="22" y1="7" x2="22" y2="11" stroke="#FCD34D" strokeWidth="0.6" />
            <line x1="24" y1="7" x2="24" y2="11" stroke="#FCD34D" strokeWidth="0.6" />
            <line x1="26" y1="7" x2="26" y2="11" stroke="#FCD34D" strokeWidth="0.6" />

            {/* Drill Bit Shank & Spiral Flutes */}
            <path
              d="M21.5 12 L26.5 12 L25.5 24 L22.5 24 Z"
              fill="url(#goldDrill)"
            />
            {/* Helical Spiral Cutting Flutes */}
            <path
              d="M21.5 14 Q24 16 26.5 18"
              stroke="#FEF3C7"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M21.5 18 Q24 20 26.5 22"
              stroke="#FEF3C7"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Screw Threading Section (Tapering to Precision Point) */}
            <path
              d="M22.5 24 L25.5 24 L24.8 34 L23.2 34 Z"
              fill="url(#goldDrill)"
            />
            {/* Razor-sharp Helical Screw Threads */}
            <line x1="20" y1="26" x2="26.5" y2="25" stroke="url(#glowRing)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="20.5" y1="28.5" x2="26" y2="27.5" stroke="url(#glowRing)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="21.5" y1="31" x2="25.5" y2="30.2" stroke="url(#glowRing)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="22" y1="33.5" x2="25" y2="33" stroke="url(#glowRing)" strokeWidth="1.2" strokeLinecap="round" />

            {/* Gimlet Screw Piercing Tip */}
            <polygon
              points="23.2,34 24.8,34 24,39"
              fill="url(#goldDrill)"
            />
          </g>

          {/* Intersecting Torx Star / Screw Drive Center Accent */}
          <circle cx="24" cy="24" r="3.2" fill="#1C1917" stroke="url(#glowRing)" strokeWidth="0.8" />
          <path
            d="M24 21.5 L24 26.5 M21.5 24 L26.5 24 M22.2 22.2 L25.8 25.8 M22.2 25.8 L25.8 22.2"
            stroke="#F59E0B"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Floating Atelier Micro Sparkle Accent */}
          <circle cx="37" cy="11" r="1.5" fill="#F59E0B" className="animate-pulse" />
        </svg>

        {/* Mini Accent Dot */}
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white dark:border-stone-900 shadow-sm" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif text-base tracking-[0.2em] font-medium text-stone-900 dark:text-stone-100 uppercase group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
            AURA & NOIR
          </span>
          <span className="text-[8px] uppercase tracking-[0.26em] text-stone-500 dark:text-stone-400 font-sans">
            Joinery · Gypsum · Precision Craft
          </span>
        </div>
      )}
    </div>
  );
}
