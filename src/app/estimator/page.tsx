"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ProjectEstimator from "@/components/ProjectEstimator";
import MaterialLibrary from "@/components/MaterialLibrary";
import MoodboardBuilder from "@/components/MoodboardBuilder";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { Calculator, Palette, Sparkles, Layers, SlidersHorizontal } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

export default function EstimatorPage() {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<"estimator" | "moodboard" | "materials" | "beforeAfter">("estimator");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black transition-colors duration-300">
      <CustomCursor />
      <Navbar />

      <section className="pt-32 pb-10 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Project Planning & Specification Suite
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              Interactive Cost Calculator & Finishes
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-2xl font-sans">
              Estimate renovation investments across KES, USD, GBP, and EUR based on your exact square footage, joinery complexity, and material tiers. Explore curated architectural finishes and craft custom moodboards.
            </p>
          </div>

          {/* Sub-navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 self-start md:self-end overflow-x-auto">
            <button
              onClick={() => setActiveTab("estimator")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === "estimator"
                  ? "bg-white dark:bg-stone-800 text-amber-700 dark:text-amber-300 shadow"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              Cost Estimator
            </button>
            <button
              onClick={() => setActiveTab("moodboard")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === "moodboard"
                  ? "bg-white dark:bg-stone-800 text-amber-700 dark:text-amber-300 shadow"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              Moodboard Builder
            </button>
            <button
              onClick={() => setActiveTab("materials")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === "materials"
                  ? "bg-white dark:bg-stone-800 text-amber-700 dark:text-amber-300 shadow"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              Finishes Library
            </button>
            <button
              onClick={() => setActiveTab("beforeAfter")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === "beforeAfter"
                  ? "bg-white dark:bg-stone-800 text-amber-700 dark:text-amber-300 shadow"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
              }`}
            >
              Transformations
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === "estimator" && (
          <div className="animate-in fade-in duration-300">
            <ProjectEstimator onBookWithEstimate={(details) => openBooking(details)} />
          </div>
        )}

        {activeTab === "moodboard" && (
          <div className="animate-in fade-in duration-300">
            <MoodboardBuilder onAttachMoodboard={(summary) => openBooking(`Custom Moodboard: ${summary}`)} />
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
