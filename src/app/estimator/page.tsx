"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ProjectEstimator from "@/components/ProjectEstimator";
import MaterialLibrary from "@/components/MaterialLibrary";
import MoodboardBuilder from "@/components/MoodboardBuilder";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import {
  Calculator,
  ArrowRight,
} from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { CONTACT_INFO } from "@/data/projects";

export default function EstimatorPage() {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<
    "estimator" | "moodboard" | "materials" | "beforeAfter"
  >("estimator");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black transition-colors duration-300">
      <CustomCursor />
      <Navbar />

      {/* 1. ENTICING HERO SECTION WITH FINISHES & IMAGERY PREVIEW */}
      <section className="pt-32 pb-8 px-6 md:px-12 max-w-7xl mx-auto border-b border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs tracking-widest uppercase font-semibold">
              <Calculator className="w-3.5 h-3.5" />
              <span>Architectural Budget & Specification Suite</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              Interactive Cost Calculator & Finishes Atelier
            </h1>

            <p className="text-sm text-stone-600 dark:text-stone-300 font-sans leading-relaxed max-w-xl font-light">
              Calculate turnkey joinery, gypsum, parquet, and renovation budgets in KES, USD, GBP, or EUR based on exact dimensions. Pair with certified African hardwood veneers, marble accents, and custom moodboards.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openBooking("Comprehensive Renovation Estimation")}
                className="px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold uppercase tracking-wider hover:brightness-105 transition shadow-lg flex items-center gap-2"
              >
                <span>Request Formal Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(
                  "Hello AURA & NOIR Atelier, I am reviewing the Cost Estimator and would like to schedule a site survey."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition shadow-sm"
              >
                WhatsApp Atelier
              </a>
            </div>
          </div>

          {/* Right: Architectural Material Swatch Hero Collage */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-3 gap-2.5 p-3 rounded-3xl bg-white dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 shadow-xl">
              <div className="relative h-32 rounded-xl overflow-hidden bg-stone-900">
                <img
                  src="/portfolio/project-14.jpg"
                  alt="Herringbone Parquet"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded backdrop-blur-md bg-stone-950/80 text-[8px] font-mono text-amber-300">
                  Parquet
                </span>
              </div>
              <div className="relative h-32 rounded-xl overflow-hidden bg-stone-900">
                <img
                  src="/portfolio/project-27.jpg"
                  alt="Culinary Joinery"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded backdrop-blur-md bg-stone-950/80 text-[8px] font-mono text-amber-300">
                  Cabinetry
                </span>
              </div>
              <div className="relative h-32 rounded-xl overflow-hidden bg-stone-900">
                <img
                  src="/portfolio/project-29.jpg"
                  alt="Gypsum Light Well"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded backdrop-blur-md bg-stone-950/80 text-[8px] font-mono text-amber-300">
                  Gypsum
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex items-center gap-2 pt-4 pb-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("estimator")}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition shrink-0 ${
              activeTab === "estimator"
                ? "bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 shadow-md"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-900 dark:text-stone-300"
            }`}
          >
            Cost Estimator
          </button>
          <button
            onClick={() => setActiveTab("moodboard")}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition shrink-0 ${
              activeTab === "moodboard"
                ? "bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 shadow-md"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-900 dark:text-stone-300"
            }`}
          >
            Moodboard Builder
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition shrink-0 ${
              activeTab === "materials"
                ? "bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 shadow-md"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-900 dark:text-stone-300"
            }`}
          >
            Finishes Library
          </button>
          <button
            onClick={() => setActiveTab("beforeAfter")}
            className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition shrink-0 ${
              activeTab === "beforeAfter"
                ? "bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 shadow-md"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-900 dark:text-stone-300"
            }`}
          >
            Transformations
          </button>
        </div>
      </section>

      {/* 2. TAB CONTENT DISPLAY */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        {activeTab === "estimator" && (
          <div className="animate-in fade-in duration-300">
            <ProjectEstimator onBookWithEstimate={(details) => openBooking(details)} />
          </div>
        )}

        {activeTab === "moodboard" && (
          <div className="animate-in fade-in duration-300">
            <MoodboardBuilder
              onAttachMoodboard={(summary) => openBooking(`Custom Moodboard: ${summary}`)}
            />
          </div>
        )}

        {activeTab === "materials" && (
          <div className="animate-in fade-in duration-300">
            <MaterialLibrary />
          </div>
        )}

        {activeTab === "beforeAfter" && (
          <div className="animate-in fade-in duration-300">
            <BeforeAfterSlider />
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
