"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ThreeRoomViewer from "@/components/ThreeRoomViewer";
import { Sparkles, ArrowRight, Layers, Camera, ShieldCheck } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { CONTACT_INFO } from "@/data/projects";

export default function ThreeLabPage() {
  const { openBooking } = useBooking();

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black transition-colors duration-300">
      <CustomCursor />
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs tracking-widest uppercase font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Three.js Real-Time Spatial Visualizer</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              Interactive 3D Architectural Lab
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 font-sans leading-relaxed">
              Interact with custom joinery, gypsum ceilings, and culinary island millwork in real-time 3D. Switch between 3 curated spaces, adjust lighting moods (Day, Dusk, Evening), swap material finishes, or launch the automated 30-second guided architectural tour.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => openBooking("3D Architectural Visualization & Design")}
              className="px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:brightness-105 transition"
            >
              <span>Commission 3D Room Render</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={CONTACT_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition shadow-sm"
            >
              WhatsApp Atelier
            </a>
          </div>
        </div>

        {/* Real Reference Photography Strips */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="relative h-28 sm:h-36 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 dark:border-stone-800">
            <img
              src="/portfolio/project-07.jpg"
              alt="Salon Reference"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/40" />
            <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
              01 Salon & Floating Staircase
            </span>
          </div>
          <div className="relative h-28 sm:h-36 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 dark:border-stone-800">
            <img
              src="/portfolio/project-29.jpg"
              alt="Master Suite Reference"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/40" />
            <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
              02 Master Suite Cove Gypsum
            </span>
          </div>
          <div className="relative h-28 sm:h-36 rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 dark:border-stone-800">
            <img
              src="/portfolio/project-27.jpg"
              alt="Kitchen Island Reference"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/40" />
            <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
              03 Culinary Island Joinery
            </span>
          </div>
        </div>

        {/* The 3D Canvas Visualizer */}
        <ThreeRoomViewer />

        {/* 3D Capabilities Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100">
              3 Architectural Environments
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-sans leading-relaxed">
              Explore the Grand Living Salon with floating staircase, the Master Bedroom Suite with cove drop ceiling, and the Culinary Island with bar joinery.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100">
              Atmospheric Lighting Moods
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-sans leading-relaxed">
              Simulate high noon daylight, warm sunset golden hour, and midnight architectural cove ambiance with dimmable recessed channels.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100">
              Real-World 1:1 Scale
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-sans leading-relaxed">
              All 3D models are built to exact architectural milling dimensions used in our Nairobi workshop for millimeter-accurate site execution.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
