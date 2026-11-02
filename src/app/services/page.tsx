"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ServicesSection from "@/components/ServicesSection";
import { useBooking } from "@/context/BookingContext";
import { Wrench, Phone, MessageSquare, ArrowRight, ShieldCheck, Clock, Award, Hammer } from "lucide-react";
import { CONTACT_INFO } from "@/data/projects";

export default function ServicesPage() {
  const { openBooking } = useBooking();

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black transition-colors duration-300">
      <CustomCursor />
      <Navbar />

      {/* Services Header */}
      <section className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto border-b border-stone-200 dark:border-stone-800/80">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-3">
              <Wrench className="w-4 h-4" />
              Specialized Disciplines & Joinery Atelier
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              Our 7 Core Master Crafts
            </h1>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-3 font-sans leading-relaxed">
              From cantilevered floating wooden staircases and precision gypsum acoustic drop ceilings, to bespoke culinary cabinetry, hardwood parquet flooring, and complete turnkey home renovations in Nairobi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CONTACT_INFO.telLink}
              className="px-5 py-3 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:border-amber-500 transition shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Call: {CONTACT_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => openBooking("General Consultation for 7 Core Services")}
              className="px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold uppercase tracking-widest hover:brightness-105 transition shadow-lg flex items-center gap-2"
            >
              <span>Request Custom Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">10-Year Warranty</h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">On all structural hardwood joinery</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Hammer className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">In-House Workshop</h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">CNC milling & master joiners</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">Guaranteed Timelines</h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Exact milestone handovers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100">Turnkey Handover</h4>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">From 3D plans to finishing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 7 Services Component */}
      <ServicesSection onSelectService={(serviceTitle) => openBooking(`Quotation for ${serviceTitle}`)} />

      {/* Workshop Direct Contact Banner */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold block mb-1">
              Have an Architectural Drawing or Custom Dimensions?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
              Speak Directly with Our Head of Workshop
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 font-sans">
              Send us your floor plan or schedule a free site survey in Nairobi. We provide itemized quotes with material samples within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={CONTACT_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: {CONTACT_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => openBooking("Site Survey & Quote Request")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold uppercase tracking-widest hover:brightness-105 transition shadow-lg"
            >
              Book Site Survey
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
