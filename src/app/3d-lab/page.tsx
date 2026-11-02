"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ThreeRoomViewer from "@/components/ThreeRoomViewer";
import { Sparkles, ArrowRight, Eye, Layers, Compass } from "lucide-react";
import { useBooking } from "@/context/BookingContext";

export default function ThreeLabPage() {
  const { openBooking } = useBooking();

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black transition-colors duration-300">
      <CustomCursor />
      <Navbar />

      <section className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Three.js Real-Time Spatial Visualizer
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              Interactive 3D Architectural Lab
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-2xl font-sans">
              Interact with custom joinery, gypsum ceilings, and culinary island millwork in real-time 3D. Switch between 3 curated spaces, adjust lighting moods (Day, Dusk, Evening), swap material finishes, or launch the automated 30-second guided architectural tour.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openBooking("3D Architectural Visualization & Design")}
              className="px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:brightness-105 transition"
            >
              <span>Commission 3D Room Render</span>
              <ArrowRight className="w-4 h-4" />
            </button>
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
            <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100">3 Architectural Environments</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-sans leading-relaxed">
              Explore the Grand Living Salon with floating staircase, the Master Bedroom Suite with cove drop ceiling, and the Culinary Island with bar joinery.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100">Dynamic Atmospheric Moods</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-sans leading-relaxed">
              Experience the spaces bathed in 5500K bright morning sunlight, 3200K warm golden hour dusk, or 2400K intimate evening cove glow.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100">30s Guided Tour & 360° Orbit</h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-sans leading-relaxed">
              Full orbit controls allow you to drag to rotate, pinch to zoom, and pan across spatial details at 60 frames per second.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
