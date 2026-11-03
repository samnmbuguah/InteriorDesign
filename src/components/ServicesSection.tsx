"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MAIN_SERVICES, ServiceItem } from "@/data/projects";
import {
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(MAIN_SERVICES[0].id);

  const currentService = MAIN_SERVICES.find((s) => s.id === activeTab) || MAIN_SERVICES[0];

  return (
    <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-2">
            <Wrench className="w-3.5 h-3.5" />
            Core Master Crafts & Services
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
            Specialized Joinery, Gypsum & Home Renovation
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-2xl font-sans">
            From precision floating wooden staircases and sculptural gypsum ceilings to bespoke kitchen cabinets, parquet flooring, custom TV walls, and turnkey roofing renovations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>What We Do · 7 Core Services</span>
        </div>
      </div>

      {/* Services Navigation Tabs (Desktop & Mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-stone-200 dark:border-stone-800">
        {MAIN_SERVICES.map((srv) => {
          const isActive = activeTab === srv.id;
          return (
            <button
              key={srv.id}
              onClick={() => setActiveTab(srv.id)}
              className={`whitespace-nowrap px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-stone-900 text-stone-100 dark:bg-amber-400 dark:text-stone-950 font-semibold shadow-md"
                  : "bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 dark:bg-stone-900/60 dark:text-stone-400 dark:hover:text-stone-100"
              }`}
            >
              <span className="font-mono text-[10px] opacity-70">{srv.number}</span>
              <span>{srv.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Service Showcase Card */}
      <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0C0D10] p-6 sm:p-10 shadow-xl shadow-stone-900/5 dark:shadow-2xl relative overflow-hidden transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Imagery & Work Spec */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-950 shadow-lg">
              <img
                src={currentService.image}
                alt={currentService.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md bg-stone-950/75 text-[10px] font-mono text-amber-300">
                Service {currentService.number} / 07
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full backdrop-blur-md bg-stone-950/75 text-[10px] text-stone-200 flex items-center gap-1.5 font-mono">
                <Clock className="w-3 h-3 text-amber-400" />
                {currentService.typicalTimeline}
              </div>
            </div>
          </div>

          {/* Right: Technical Deliverables & Scope */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold block mb-1">
                What We Do · Specialized Service
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-stone-900 dark:text-stone-100 leading-tight">
                {currentService.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2 leading-relaxed font-sans font-light">
                {currentService.description}
              </p>
            </div>

            {/* Inclusions Checkmarks */}
            <div>
              <span className="block text-xs uppercase tracking-wider text-stone-700 dark:text-stone-400 font-medium mb-3">
                Key Craft Deliverables & Standards
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentService.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials Used */}
            <div>
              <span className="block text-xs uppercase tracking-wider text-stone-700 dark:text-stone-400 font-medium mb-2">
                Primary Materials & Hardware
              </span>
              <div className="flex flex-wrap gap-2">
                {currentService.materialsUsed.map((m, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-3 py-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href={`/services/${currentService.id}`}
                className="px-6 py-3.5 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-105 transition shadow-lg"
              >
                <span>Explore Dedicated {currentService.title} Page</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => onSelectService(currentService.title)}
                className="px-5 py-3.5 rounded-full border border-stone-300 dark:border-stone-700 hover:border-amber-500 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-wider font-semibold transition"
              >
                <span>Request Quotation</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of All 7 Services Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {MAIN_SERVICES.map((s) => (
          <div
            key={s.id}
            className={`p-6 rounded-2xl border transition-all flex flex-col justify-between group ${
              activeTab === s.id
                ? "bg-stone-900 text-white dark:bg-stone-900/90 dark:border-amber-400/80 shadow-lg"
                : "bg-white dark:bg-[#0C0D10] border-stone-200 dark:border-stone-800 hover:border-amber-400/40 text-stone-900 dark:text-stone-100 shadow-sm"
            }`}
          >
            <div onClick={() => setActiveTab(s.id)} className="cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-sm text-amber-500 font-semibold">
                  {s.number}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  {s.typicalTimeline}
                </span>
              </div>
              <div className="relative h-32 rounded-xl overflow-hidden mb-3 bg-stone-100 dark:bg-stone-900">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h4 className="font-serif text-lg font-medium mb-1.5 group-hover:text-amber-500 transition-colors">
                {s.title}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                {s.shortDesc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
              <button
                onClick={() => setActiveTab(s.id)}
                className="text-xs text-stone-500 hover:text-amber-500 transition font-mono uppercase tracking-wider"
              >
                Quick Preview
              </button>
              <Link
                href={`/services/${s.id}`}
                className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>Dedicated Page</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
