"use client";

import React, { useEffect, useState } from "react";
import { Project } from "@/data/projects";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Clock,
  Layers,
  ArrowRight,
  Check,
  Copy,
  Compass,
  Image as ImageIcon,
  MessageSquare,
  Phone,
  ShieldCheck,
  Hammer,
} from "lucide-react";

interface ProjectLightboxProps {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (p: Project) => void;
  onBookProject?: (projectName: string) => void;
}

export default function ProjectLightbox({
  project,
  projects,
  onClose,
  onSelectProject,
  onBookProject,
}: ProjectLightboxProps) {
  const [zoomLevel, setZoomLevel] = useState<1 | 1.5 | 2>(1);
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const handlePrev = () => {
    setZoomLevel(1);
    onSelectProject(prevProject);
  };

  const handleNext = () => {
    setZoomLevel(1);
    onSelectProject(nextProject);
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const whatsappText = encodeURIComponent(
    `Hello AURA & NOIR, I am inquiring about Project #${project.number}: "${project.title}" (${project.categoryLabel}) located in ${project.location}. Can you provide an estimate and discuss site survey?`
  );

  const getCraftBadgeColor = (stage: string) => {
    switch (stage) {
      case "Completed Work":
        return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
      case "On-Site Installation":
        return "bg-amber-500/15 text-amber-800 dark:text-amber-400 border-amber-500/30";
      case "Workshop Milling":
        return "bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-500/30";
      default:
        return "bg-stone-500/15 text-stone-700 dark:text-stone-300 border-stone-500/30";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-2xl p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-stone-900/80 border border-stone-700/80">
            Work #{project.number} of {projects.length}
          </span>
          <span
            className={`hidden sm:inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border backdrop-blur-md ${getCraftBadgeColor(
              project.craftStage
            )}`}
          >
            {project.craftStage}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {/* Zoom Toggle */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-stone-900/80 border border-stone-700/80">
            <button
              onClick={() => setZoomLevel((prev) => (prev === 2 ? 1.5 : 1))}
              disabled={zoomLevel === 1}
              className="p-1.5 rounded-full text-stone-300 hover:text-white disabled:opacity-30 transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-amber-400 px-1">{zoomLevel}x</span>
            <button
              onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.5 : 2))}
              disabled={zoomLevel === 2}
              className="p-1.5 rounded-full text-stone-300 hover:text-white disabled:opacity-30 transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoomLevel > 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 rounded-full text-amber-400 hover:text-white transition"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-stone-900/80 border border-stone-700/80">
            <button
              onClick={() => setViewMode("photo")}
              className={`p-1.5 rounded-full text-xs transition ${
                viewMode === "photo"
                  ? "bg-amber-400 text-stone-950 font-semibold"
                  : "text-stone-400 hover:text-white"
              }`}
              title="Real Photo"
            >
              <ImageIcon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("blueprint")}
              className={`p-1.5 rounded-full text-xs transition ${
                viewMode === "blueprint"
                  ? "bg-sky-400 text-stone-950 font-semibold"
                  : "text-stone-400 hover:text-white"
              }`}
              title="Architectural Schematic"
            >
              <Compass className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            title="Close Lightbox (Esc)"
            className="p-2 rounded-full bg-stone-900/80 border border-stone-700 hover:border-red-400 text-stone-300 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Lightbox Body */}
      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-3xl border border-stone-200 dark:border-stone-800 bg-[#FAF8F5] dark:bg-[#0C0D10] shadow-2xl flex flex-col lg:flex-row mt-12 md:mt-0">
        {/* Left: Image Canvas Area */}
        <div className="relative flex-1 bg-stone-950 flex items-center justify-center overflow-hidden min-h-[340px] lg:min-h-[620px] select-none">
          {viewMode === "photo" ? (
            <div
              className={`relative w-full h-full flex items-center justify-center p-4 overflow-auto transition-transform duration-300 ${
                zoomLevel === 1.5 ? "scale-150 cursor-zoom-out" : zoomLevel === 2 ? "scale-200 cursor-zoom-out" : "cursor-zoom-in"
              }`}
              onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
            >
              <img
                src={project.image}
                alt={project.title}
                className="max-h-[50vh] lg:max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
          ) : (
            /* Blueprint CAD Diagram SVG */
            <div className="w-full h-full p-8 flex flex-col items-center justify-center bg-[#091118] relative overflow-hidden">
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
                <rect x="50" y="40" width="500" height="320" rx="4" strokeWidth="2.5" />
                <line x1="200" y1="40" x2="400" y2="40" strokeWidth="6" stroke="#0284c7" />
                <text x="270" y="32" fill="#38bdf8" fontSize="10" fontFamily="monospace" stroke="none">
                  GLAZING (6.2M)
                </text>
                <line x1="120" y1="120" x2="120" y2="280" strokeDasharray="4 4" stroke="#d4af37" />
                <text x="65" y="200" fill="#d4af37" fontSize="9" fontFamily="monospace" stroke="none" transform="rotate(-90 65,200)">
                  JOINERY BULKHEAD
                </text>
                <rect x="220" y="140" width="220" height="110" rx="8" stroke="#cbd5e1" strokeWidth="1.5" />
                <rect x="250" y="170" width="160" height="50" rx="4" stroke="#d4af37" strokeWidth="1" strokeDasharray="2 2" />
                <text x="290" y="200" fill="#f8fafc" fontSize="11" fontFamily="sans-serif" stroke="none">
                  {project.categoryLabel.toUpperCase()}
                </text>
                <line x1="50" y1="380" x2="550" y2="380" stroke="#64748b" />
                <line x1="50" y1="375" x2="50" y2="385" stroke="#64748b" />
                <line x1="550" y1="375" x2="550" y2="385" stroke="#64748b" />
                <text x="260" y="394" fill="#94a3b8" fontSize="10" fontFamily="monospace" stroke="none">
                  SPECIFICATION #{project.number} · {project.area}
                </text>
              </svg>

              <div className="absolute bottom-4 left-6 flex items-center gap-3 text-[11px] font-mono text-sky-400">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>ARCHITECTURAL JOINERY CAD · SPEC {project.number}</span>
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
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-stone-900/80 border border-stone-700/80 hover:border-amber-400 hover:bg-stone-800 text-stone-200 transition shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next Project"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-stone-900/80 border border-stone-700/80 hover:border-amber-400 hover:bg-stone-800 text-stone-200 transition shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Architectural Dossier Panel */}
        <div className="w-full lg:w-[440px] p-6 lg:p-8 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-stone-200 dark:border-stone-800/80 bg-white dark:bg-[#0E0F12] text-stone-900 dark:text-stone-100">
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-1">
                <span>{project.categoryLabel}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-600 dark:text-amber-500" />
                  {project.location}
                </span>
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl text-stone-900 dark:text-stone-100 leading-tight">
                {project.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-sans">
                {project.subtitle}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-stone-200 dark:border-stone-800/80 text-center">
              <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-900/50">
                <span className="block text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400">Scale</span>
                <span className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-200">{project.area}</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-900/50">
                <span className="block text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400">Duration</span>
                <span className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-200">{project.completionTime}</span>
              </div>
              <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-900/50">
                <span className="block text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400">Craft Stage</span>
                <span className="font-serif text-xs font-semibold text-amber-700 dark:text-amber-400 truncate block">
                  {project.craftStage}
                </span>
              </div>
            </div>

            {/* Technical Craft Narrative */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-1.5 flex items-center gap-1">
                <Hammer className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Craft & Installation Details</span>
              </h4>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-2">
                Technical Highlights
              </h4>
              <div className="space-y-1.5">
                {project.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials Used */}
            <div>
              <h4 className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-1.5">
                Primary Materials & Hardware
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.materials.map((m, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 text-stone-800 dark:text-stone-300 font-medium"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Palette */}
            <div>
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold mb-2">
                <span>Material Tone Palette</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400">Click hex to copy</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {project.palette.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => copyToClipboard(c.hex)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 hover:border-amber-400/40 transition group text-left"
                  >
                    <span
                      className="w-5 h-5 rounded-lg border border-black/10 dark:border-white/20 shrink-0 shadow-sm"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-stone-800 dark:text-stone-200 truncate">{c.name}</div>
                      <div className="text-[9px] font-mono text-stone-500 dark:text-stone-400 flex items-center justify-between">
                        <span>{c.hex}</span>
                        {copiedHex === c.hex ? (
                          <Check className="w-2.5 h-2.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 text-stone-400" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Dual Action CTAs */}
          <div className="pt-5 mt-5 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/254728541775?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire via WhatsApp (0728 541 775)</span>
            </a>

            <button
              onClick={() => {
                onClose();
                if (onBookProject) onBookProject(`Project #${project.number}: ${project.title}`);
              }}
              className="w-full py-3 px-4 rounded-xl bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-95 transition"
            >
              <span>Request Free Site Survey & Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
