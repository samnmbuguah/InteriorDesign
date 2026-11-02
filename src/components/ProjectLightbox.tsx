"use client";

import React, { useEffect, useState } from "react";
import { Project } from "@/data/projects";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Minimize2,
  Clock,
  Layers,
  ArrowRight,
  Check,
  Copy,
  Compass,
  Image as ImageIcon,
} from "lucide-react";

interface ProjectLightboxProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  onBookProject: (projectName: string) => void;
}

export default function ProjectLightbox({
  project,
  projects,
  onClose,
  onSelectProject,
  onBookProject,
}: ProjectLightboxProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [viewMode, setViewMode] = useState<"photo" | "blueprint">("photo");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const handlePrev = () => {
    setIsZoomed(false);
    onSelectProject(prevProject);
  };

  const handleNext = () => {
    setIsZoomed(false);
    onSelectProject(nextProject);
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 md:p-8 animate-in fade-in duration-200">
      {/* Top Controls Bar */}
      <div className="absolute top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
            Project {currentIndex + 1} of {projects.length}
          </span>
          <span className="hidden sm:inline text-xs text-stone-400">
            {project.categoryLabel}
          </span>
        </div>

        {/* View Mode Switcher (Photo vs Blueprint CAD) */}
        <div className="flex items-center gap-2">
          <div className="flex p-1 rounded-full bg-stone-900 border border-stone-700">
            <button
              onClick={() => setViewMode("photo")}
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium flex items-center gap-1.5 transition ${
                viewMode === "photo"
                  ? "bg-amber-400 text-stone-950 font-semibold shadow"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <ImageIcon className="w-3 h-3" />
              <span>Photograph</span>
            </button>
            <button
              onClick={() => setViewMode("blueprint")}
              className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-medium flex items-center gap-1.5 transition ${
                viewMode === "blueprint"
                  ? "bg-amber-400 text-stone-950 font-semibold shadow"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <Compass className="w-3 h-3" />
              <span>2D Blueprint</span>
            </button>
          </div>

          <button
            onClick={() => setIsZoomed(!isZoomed)}
            title={isZoomed ? "Original View" : "Zoom View"}
            className="p-2.5 rounded-full bg-stone-900/80 border border-stone-700 hover:border-amber-400/50 text-stone-300 hover:text-white transition"
          >
            {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            title="Close Lightbox"
            className="p-2.5 rounded-full bg-stone-900/80 border border-stone-700 hover:border-red-400/50 text-stone-300 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Lightbox Body */}
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-3xl border border-stone-800 bg-[#0C0D10] shadow-2xl flex flex-col lg:flex-row mt-12 md:mt-0">
        {/* Left: Canvas Area */}
        <div className="relative flex-1 bg-black/90 flex items-center justify-center overflow-hidden min-h-[350px] lg:min-h-[620px] select-none">
          {viewMode === "photo" ? (
            <div
              className={`relative w-full h-full flex items-center justify-center p-4 transition-transform duration-300 ${
                isZoomed ? "scale-125 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={project.image}
                alt={project.title}
                className="max-h-[55vh] lg:max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
          ) : (
            /* Blueprint CAD Diagram SVG */
            <div className="w-full h-full p-8 flex flex-col items-center justify-center bg-[#091118] relative overflow-hidden">
              {/* CAD Grid Background */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#38bdf8 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <svg
                viewBox="0 0 600 400"
                className="w-full max-w-lg h-auto text-sky-400 stroke-current fill-none stroke-[1.5]"
              >
                {/* Outer Room Bounds */}
                <rect x="50" y="40" width="500" height="320" rx="4" strokeWidth="2.5" />
                {/* Windows */}
                <line x1="200" y1="40" x2="400" y2="40" strokeWidth="6" stroke="#0284c7" />
                <text x="270" y="32" fill="#38bdf8" fontSize="10" fontFamily="monospace" stroke="none">
                  GLAZING (6.2M)
                </text>

                {/* Slat Wall partition */}
                <line x1="120" y1="120" x2="120" y2="280" strokeDasharray="4 4" stroke="#d4af37" />
                <text x="65" y="200" fill="#d4af37" fontSize="9" fontFamily="monospace" stroke="none" transform="rotate(-90 65,200)">
                  ACOUSTIC SLATS
                </text>

                {/* Sectional Footprint */}
                <rect x="220" y="140" width="220" height="110" rx="8" stroke="#cbd5e1" strokeWidth="1.5" />
                <rect x="250" y="170" width="160" height="50" rx="4" stroke="#d4af37" strokeWidth="1" strokeDasharray="2 2" />
                <text x="290" y="200" fill="#f8fafc" fontSize="11" fontFamily="sans-serif" stroke="none">
                  {project.categoryLabel.toUpperCase()}
                </text>

                {/* Dimension Arrows */}
                <line x1="50" y1="380" x2="550" y2="380" stroke="#64748b" />
                <line x1="50" y1="375" x2="50" y2="385" stroke="#64748b" />
                <line x1="550" y1="375" x2="550" y2="385" stroke="#64748b" />
                <text x="260" y="394" fill="#94a3b8" fontSize="10" fontFamily="monospace" stroke="none">
                  SCALE 1:50 · {project.area}
                </text>
              </svg>

              <div className="absolute bottom-4 left-6 flex items-center gap-3 text-[11px] font-mono text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>ARCHITECTURAL SCHEMATIC · CAD SPEC {project.number}</span>
              </div>
            </div>
          )}

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous Project"
            className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 border border-stone-700/80 hover:border-amber-400 hover:bg-stone-800 text-stone-200 transition shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Project"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-stone-900/80 border border-stone-700/80 hover:border-amber-400 hover:bg-stone-800 text-stone-200 transition shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Architectural Dossier Panel */}
        <div className="w-full lg:w-[440px] p-6 lg:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-stone-800/80 bg-[#0E0F12]">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-400 font-semibold mb-1">
                <span>{project.categoryLabel}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  {project.location}
                </span>
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl text-stone-100 leading-tight">
                {project.title}
              </h3>
              <p className="text-xs text-stone-400 mt-1 font-sans">
                {project.subtitle}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-800/80 text-center">
              <div className="p-2 rounded-xl bg-stone-900/50">
                <span className="block text-[10px] uppercase tracking-wider text-stone-400">Area</span>
                <span className="font-serif text-sm font-semibold text-stone-200">{project.area}</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-900/50">
                <span className="block text-[10px] uppercase tracking-wider text-stone-400">Timeline</span>
                <span className="font-serif text-sm font-semibold text-stone-200">{project.completionTime}</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-900/50">
                <span className="block text-[10px] uppercase tracking-wider text-stone-400">Year</span>
                <span className="font-serif text-sm font-semibold text-stone-200">{project.year}</span>
              </div>
            </div>

            {/* Narrative */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                Design Narrative
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-2">
                Craft Highlights
              </h4>
              <div className="space-y-1.5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Palette */}
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-2">
                <span>Material Palette</span>
                <span className="text-[10px] text-amber-400/80">Click hex to copy</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {project.palette.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => copyToClipboard(c.hex)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-stone-900/70 border border-stone-800 hover:border-amber-400/40 transition group text-left"
                  >
                    <span
                      className="w-5 h-5 rounded-lg border border-white/20 shrink-0 shadow-sm"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-stone-200 truncate">{c.name}</div>
                      <div className="text-[9px] font-mono text-stone-400 flex items-center justify-between">
                        <span>{c.hex}</span>
                        {copiedHex === c.hex ? (
                          <Check className="w-2.5 h-2.5 text-green-400" />
                        ) : (
                          <Copy className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-stone-400" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                Primary Materials
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.materials.map((m, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2.5 py-1 rounded-md bg-stone-800/80 border border-stone-700/60 text-stone-300 font-medium"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="pt-6 mt-6 border-t border-stone-800">
            <button
              onClick={() => {
                onClose();
                onBookProject(project.title);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:brightness-105 transition"
            >
              <span>Consult on Similar Space</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
