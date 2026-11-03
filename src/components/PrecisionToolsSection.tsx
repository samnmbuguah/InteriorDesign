"use client";

import React, { useState } from "react";
import { soundscape } from "@/utils/soundscape";
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  Layers,
  Compass,
} from "lucide-react";

interface ToolItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  image: string;
  shortDesc: string;
  specs: { label: string; value: string }[];
  whyItMatters: string;
  disciplinesUsed: string[];
}

const PRECISION_TOOLS: ToolItem[] = [
  {
    id: "drill-driver",
    name: "Brushless High-Torque Cordless Driver",
    category: "Primary Assembly Rig",
    badge: "18V Brushless · 0–2,100 RPM",
    image: "/portfolio/drill-fastener-workshop.jpg",
    shortDesc:
      "Our lead joiners use calibrated brushless impact drivers with electronic micro-clutches that eliminate grain tear-out and prevent over-torquing in dense African hardwoods.",
    specs: [
      { label: "Clutch Presets", value: "24 Electronic Settings" },
      { label: "Max Torque", value: "85 Nm Precision Output" },
      { label: "Collet Type", value: "1/4\" Quick-Release Hex" },
      { label: "Run-out Tolerance", value: "< 0.05 mm True Axial" },
    ],
    whyItMatters:
      "Dense African Mahogany and Mvule split easily under brute force. Micro-clutch control ensures every screw drives flush without fracturing the timber fibers.",
    disciplinesUsed: ["Staircases", "Cabinetry", "Parquet Subflooring", "Door Fitting"],
  },
  {
    id: "torx-screws",
    name: "Architectural Heavy-Duty Torx Screws",
    category: "Structural Fasteners",
    badge: "Grade 8 Carbon Steel · Zinc Flake Coat",
    image: "/portfolio/drill-tools-flatlay.jpg",
    shortDesc:
      "We replace obsolete slotted and phillips screws with deep T20/T25 star-drive Torx fasteners that deliver 300% greater contact surface and zero cam-out slipping.",
    specs: [
      { label: "Drive Geometry", value: "T25 Star Torx Drive" },
      { label: "Thread Design", value: "Serrated Cutting Threads" },
      { label: "Coating", value: "Ruspert 1,000-Hr Salt Spray" },
      { label: "Tensile Strength", value: "1,200 N/mm² Yield" },
    ],
    whyItMatters:
      "Guarantees that stair treads and kitchen cabinetry never loosen or develop annoying creaks over decades of tropical humidity fluctuations.",
    disciplinesUsed: ["Cantilevered Staircases", "Timber Trusses", "TV Media Walls"],
  },
  {
    id: "countersink-bits",
    name: "Carbide Spiral Flute Countersink Bits",
    category: "Precision Drilling",
    badge: "Industrial Carbide · Adjustable Stop",
    image: "/portfolio/project-31.jpg",
    shortDesc:
      "Dual-flute high-speed steel bits with hardened carbide tips that pre-drill pilot holes and countersinks in a single stroke, paired with a non-marring brass depth stop.",
    specs: [
      { label: "Tip Material", value: "Micro-Grain Tungsten Carbide" },
      { label: "Countersink Angle", value: "82° Flush Architectural" },
      { label: "Depth Stop Collar", value: "Non-Marring Delrin Bearing" },
      { label: "Plug Match", value: "Exact 10mm & 12mm Timber Plugs" },
    ],
    whyItMatters:
      "Allows screws to be counter-bored and concealed behind grain-matched mahogany plugs for an invisible, screw-free aesthetic on visible joinery surfaces.",
    disciplinesUsed: ["Solid Wood Stair Treads", "Hardwood Doors", "Media Consoles"],
  },
  {
    id: "pocket-hole-rig",
    name: "Precision Pocket-Hole & Face Frame Rig",
    category: "Cabinet Joinery",
    badge: "Hardened Steel Guides · 15° Pitch",
    image: "/portfolio/project-27.jpg",
    shortDesc:
      "Self-clamping pocket hole jigs paired with stepped drill bits that create ultra-strong internal 15-degree angled structural joints hidden inside cabinet carcasses.",
    specs: [
      { label: "Drill Angle", value: "15° Precision Structural Angle" },
      { label: "Bit Profile", value: "Stepped Pilot Tip & Reamer" },
      { label: "Screw Shank", value: "Square-Drive Self-Tapping" },
      { label: "Joint Strength", value: "Up to 500 kg Shear Load" },
    ],
    whyItMatters:
      "Eliminates clumsy visible exterior screws on wardrobe panels and kitchen islands, leaving spotless, flawless cabinetry surfaces.",
    disciplinesUsed: ["Kitchen Cabinets", "Walk-In Closets", "Vanity Units"],
  },
];

export default function PrecisionToolsSection() {
  const [activeToolId, setActiveToolId] = useState<string>("drill-driver");

  const currentTool =
    PRECISION_TOOLS.find((t) => t.id === activeToolId) || PRECISION_TOOLS[0];

  const handleSelectTool = (id: string) => {
    soundscape.playClick();
    setActiveToolId(id);
  };

  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-2">
            <Zap className="w-3.5 h-3.5" />
            The Master Fastener & Drill Rig
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
            Precision Drills & Screws: The Core of Enduring Craft
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-2xl font-sans font-light">
            Behind every silent stair tread, flawless drop ceiling, and seamless cabinet run is our relentless standard of drilling and structural fastening. Here is how we engineer joints that never loosen.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Calibrated to 0.05mm Alignment</span>
        </div>
      </div>

      {/* Interactive Tool Switcher Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {PRECISION_TOOLS.map((tool) => {
          const isActive = tool.id === activeToolId;
          return (
            <button
              key={tool.id}
              onClick={() => handleSelectTool(tool.id)}
              className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                isActive
                  ? "bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-bold border-amber-500 shadow-xl"
                  : "bg-white dark:bg-stone-900/60 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400/50 hover:bg-stone-50"
              }`}
            >
              <div>
                <span className="text-[10px] uppercase tracking-wider block opacity-75 font-mono mb-1">
                  {tool.category}
                </span>
                <h4 className="font-serif text-sm sm:text-base leading-snug">
                  {tool.name}
                </h4>
              </div>
              <span className="text-[10px] font-mono mt-3 opacity-90 block">
                {tool.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tool Deep Dive Stage */}
      <div className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0D0E12] p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Macro Tool Imagery Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-stone-950 shadow-lg group">
              <img
                src={currentTool.image}
                alt={currentTool.name}
                onError={(e) => {
                  // Fallback if generated image is still processing
                  (e.target as HTMLImageElement).src = "/portfolio/project-31.jpg";
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

              {/* Floating Badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md bg-stone-950/80 border border-white/10 text-[10px] font-mono text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{currentTool.badge}</span>
              </div>

              {/* Overlay Drill / Screw Motif */}
              <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl backdrop-blur-md bg-stone-950/85 border border-white/10 text-white">
                <span className="text-[10px] uppercase font-mono text-amber-400 tracking-wider block">
                  Atelier Workshop Standard
                </span>
                <h5 className="font-serif text-base text-stone-100">
                  {currentTool.name}
                </h5>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Deliverables & Joinery Science */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold block mb-1">
                {currentTool.category}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
                {currentTool.name}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 font-sans font-light leading-relaxed mt-2">
                {currentTool.shortDesc}
              </p>
            </div>

            {/* Spec Matrix */}
            <div>
              <span className="text-xs uppercase tracking-wider text-stone-700 dark:text-stone-400 font-semibold block mb-3 font-mono">
                Technical Specifications & Tolerances
              </span>
              <div className="grid grid-cols-2 gap-3">
                {currentTool.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800"
                  >
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-mono">
                      {spec.label}
                    </span>
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-0.5 block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why It Matters Callout */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 mb-1 font-mono">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Why This Eliminates Creaks & Structural Failure
              </span>
              <p className="text-xs text-stone-700 dark:text-stone-300 font-sans leading-relaxed">
                {currentTool.whyItMatters}
              </p>
            </div>

            {/* Applied Disciplines */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-xs text-stone-500 font-mono">Standard in:</span>
              {currentTool.disciplinesUsed.map((disc, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px] font-mono border border-stone-200 dark:border-stone-700"
                >
                  {disc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

