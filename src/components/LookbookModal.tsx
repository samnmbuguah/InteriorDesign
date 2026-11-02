"use client";

import React from "react";
import { X, Download, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { PROJECTS } from "@/data/projects";

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export default function LookbookModal({ isOpen, onClose, onOpenBooking }: LookbookModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/90 backdrop-blur-2xl p-4 md:p-8 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#0C0D10] text-stone-900 dark:text-stone-100 shadow-2xl p-6 md:p-10 transition-colors duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition shadow-sm"
          aria-label="Close Lookbook"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lookbook Cover Header */}
        <div className="text-center pb-8 border-b border-stone-200 dark:border-stone-800 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-600/30 dark:border-amber-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            2026 Atelier Monograph
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal">
            AURA & NOIR · The Architectural Lookbook
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400 max-w-lg mx-auto font-sans leading-relaxed">
            An editorial compendium of 54 realized residential sanctuaries, material provenance, and spatial architectural standards across Nairobi and East Africa.
          </p>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg hover:brightness-105 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download / Print Monograph (PDF)</span>
            </button>
          </div>
        </div>

        {/* Selected Spreads Preview */}
        <div className="py-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
              Featured Monograph Spreads
            </h3>
            <span className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">
              Curated Spreads 01 – 04 of 54
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121317] shadow-sm space-y-3"
              >
                <div className="relative h-44 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-950">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-stone-950/80 text-[9px] font-mono text-amber-300">
                    Spread {p.number}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-medium">
                    {p.location} · {p.categoryLabel}
                  </span>
                  <h4 className="font-serif text-base text-stone-900 dark:text-stone-100">{p.title}</h4>
                  <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Standards & Inclusions */}
          <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-stone-900/40 border border-amber-200/60 dark:border-stone-800 space-y-3">
            <h4 className="font-serif text-lg text-stone-900 dark:text-stone-200">
              Studio Turnkey Delivery Standards
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-stone-700 dark:text-stone-300 font-sans">
              {[
                "100% In-House Solid Hardwood Joinery & Staircase Fabrication",
                "Precision Multi-Tier Gypsum Drop Ceilings with Cove LED Channels",
                "Kiln-Dried Solid Mahogany Herringbone Parquet Flooring",
                "Custom Built-In Kitchen Cabinetry & Bedroom Wardrobe Suites",
                "Solid Hardwood Double Entrance Doors, Architraves & Jamb Fitting",
                "Turnkey Villa Roofing Overhaul & Shingle Tile Installation",
                "Complimentary Laser On-Site Survey Across Nairobi",
                "12-Month In-House Structural & Craft Guarantee",
              ].map((std, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>{std}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-stone-500 dark:text-stone-400 font-sans">
            For private commissions, request an in-person physical monograph presentation.
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-400 dark:text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:brightness-105 transition"
          >
            <span>Book Private Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
