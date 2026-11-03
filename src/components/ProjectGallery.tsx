"use client";

import React, { useState, useMemo } from "react";
import { Project, CATEGORIES, WORKSHOP_REELS, VideoReel } from "@/data/projects";
import {
  Search,
  LayoutGrid,
  Columns,
  MapPin,
  Eye,
  ArrowUpRight,
  Sparkles,
  ArrowLeftRight,
  Check,
  Video,
  Play,
  MessageSquare,
  Wrench,
  Layers,
  Hammer,
} from "lucide-react";

interface ProjectGalleryProps {
  projects: Project[];
  onSelectProject: (p: Project) => void;
  pinnedIds?: string[];
  onTogglePin?: (p: Project) => void;
}

export default function ProjectGallery({
  projects,
  onSelectProject,
  pinnedIds = [],
  onTogglePin,
}: ProjectGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [layoutMode, setLayoutMode] = useState<"masonry" | "grid">("masonry");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(q) ||
        project.subtitle.toLowerCase().includes(q) ||
        project.location.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.craftStage.toLowerCase().includes(q) ||
        project.materials.some((m) => m.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

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
    <section id="portfolio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Portfolio & Job-Site Archive
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
            Crafted Havens & Realized Works ({projects.length})
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-xl font-sans">
            Every photo showcases authentic, real-world craftsmanship: from solid hardwood staircases and precision gypsum bulkheads, to custom bedroom wardrobes, herringbone parquet floors, TV media walls, and residential roofing in Nairobi.
          </p>
        </div>

        {/* Layout Switcher */}
        <div className="hidden sm:flex items-center gap-2 p-1 rounded-2xl bg-stone-100 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 self-start md:self-end">
          <button
            onClick={() => setLayoutMode("masonry")}
            className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition ${
              layoutMode === "masonry"
                ? "bg-white dark:bg-stone-800 text-amber-700 dark:text-amber-300 shadow"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            }`}
            title="Editorial Masonry"
          >
            <Columns className="w-4 h-4" />
            <span>Editorial</span>
          </button>
          <button
            onClick={() => setLayoutMode("grid")}
            className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition ${
              layoutMode === "grid"
                ? "bg-white dark:bg-stone-800 text-amber-700 dark:text-amber-300 shadow"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            }`}
            title="Uniform Grid"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar: Categories & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200 dark:border-stone-800/80">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? projects.length
                : cat.id === "reels"
                ? WORKSHOP_REELS.length
                : projects.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                  isSelected
                    ? "bg-amber-400 text-stone-950 font-semibold shadow-md shadow-amber-500/20"
                    : "bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800/80 text-stone-700 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:border-amber-400/40"
                }`}
              >
                {cat.id === "reels" && <Video className="w-3.5 h-3.5 inline mr-1 text-amber-600 dark:text-amber-400" />}
                {cat.label.replace(/\(\d+\)/, "")} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by craft, material, room, or location..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 transition shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* SPECIAL VIEW: On-Site Video Reels */}
      {selectedCategory === "reels" ? (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/60 dark:border-amber-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold block mb-1">
                Authentic Workshop & Site Footage
              </span>
              <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100">
                Behind-the-Scenes: Our Artisans in Action
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 max-w-2xl font-sans">
                Real walkthrough videos recorded on active job-sites across Nairobi. Watch our carpenters on-site fit hardwood stair treads, test illuminated honeycomb gypsum ceilings, and inspect complete villa roofing overhauls.
              </p>
            </div>
            <a
              href="tel:+254728541775"
              className="px-5 py-2.5 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold uppercase tracking-wider shrink-0 hover:scale-105 transition shadow-sm"
            >
              Call Master Joiner: 0728 541 775
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WORKSHOP_REELS.map((reel) => (
              <div
                key={reel.id}
                className="group rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 shadow-lg flex flex-col justify-between"
              >
                <div className="relative aspect-[9/16] bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={reel.videoSrc}
                    poster={reel.posterSrc}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-950/70 border border-white/10 text-[10px] font-mono text-amber-300 pointer-events-none">
                    {reel.duration}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-950/70 border border-white/10 text-[10px] uppercase tracking-wider text-stone-300 pointer-events-none">
                    {reel.categoryLabel}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold block mb-1">
                      {reel.subtitle}
                    </span>
                    <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 font-medium leading-snug">
                      {reel.title}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 font-sans leading-relaxed">
                      {reel.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-3xl border border-stone-200 dark:border-stone-800/60 bg-stone-50 dark:bg-stone-950/40">
          <p className="text-stone-600 dark:text-stone-400 text-sm">
            No projects found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : layoutMode === "masonry" ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredProjects.map((project) => {
            const isPinned = pinnedIds.includes(project.id);
            const whatsappText = encodeURIComponent(
              `Hello Elite Interiors, I would like to inquire about Project #${project.number}: ${project.title} (${project.categoryLabel}). Can you provide a quotation?`
            );

            return (
              <div
                key={project.id}
                data-cursor="explore"
                onClick={() => onSelectProject(project)}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900/40 hover:border-amber-500/60 transition-all duration-500 cursor-pointer shadow-md dark:shadow-lg hover:shadow-2xl flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Number Badge Top Left */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-950/75 border border-white/10 text-[10px] font-mono text-amber-300">
                    #{project.number}
                  </div>

                  {/* Stage & Compare Top Right */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {/* Craft Stage Badge */}
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold border backdrop-blur-md ${getCraftBadgeColor(
                        project.craftStage
                      )}`}
                    >
                      {project.craftStage}
                    </span>

                    {onTogglePin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTogglePin(project);
                        }}
                        title={isPinned ? "Remove from comparison" : "Add to side-by-side compare"}
                        className={`p-1.5 rounded-full backdrop-blur-md transition ${
                          isPinned
                            ? "bg-amber-400 text-stone-950 shadow"
                            : "bg-stone-950/70 border border-white/10 text-stone-300 hover:text-white"
                        }`}
                      >
                        {isPinned ? <Check className="w-3 h-3 stroke-[3]" /> : <ArrowLeftRight className="w-3 h-3" />}
                      </button>
                    )}
                  </div>

                  {/* Hover Reveal Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0B] via-[#090A0B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <div className="w-full flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-amber-300 font-medium flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> View Craft Dossier
                      </span>
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/254728541775?text=${whatsappText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          title="Instant Quote on WhatsApp"
                          className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Meta */}
                <div className="p-4 bg-white dark:bg-[#0C0D10] border-t border-stone-200 dark:border-stone-800/80">
                  <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                    <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px]">
                      {project.categoryLabel}
                    </span>
                    <span className="flex items-center gap-1 text-[10px]">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {project.location}
                    </span>
                  </div>
                  <h3 className="font-serif text-base sm:text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1 font-sans">
                    {project.subtitle}
                  </p>

                  {/* Materials & Scope Preview */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/60 text-[10px]">
                    <div className="flex items-center gap-1 text-stone-600 dark:text-stone-400 truncate max-w-[190px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="truncate">{project.materials.slice(0, 2).join(", ")}</span>
                    </div>
                    <span className="font-mono text-stone-400 dark:text-stone-500">
                      {project.completionTime}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isPinned = pinnedIds.includes(project.id);
            const whatsappText = encodeURIComponent(
              `Hello Elite Interiors, I would like to inquire about Project #${project.number}: ${project.title} (${project.categoryLabel}). Can you provide a quotation?`
            );

            return (
              <div
                key={project.id}
                data-cursor="explore"
                onClick={() => onSelectProject(project)}
                className="group relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900/40 hover:border-amber-500/60 transition-all duration-500 cursor-pointer shadow-md dark:shadow-lg hover:shadow-2xl flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-950/75 border border-white/10 text-[10px] font-mono text-amber-300">
                    #{project.number}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-semibold border backdrop-blur-md ${getCraftBadgeColor(
                        project.craftStage
                      )}`}
                    >
                      {project.craftStage}
                    </span>
                    {onTogglePin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTogglePin(project);
                        }}
                        className={`p-1.5 rounded-full backdrop-blur-md transition ${
                          isPinned
                            ? "bg-amber-400 text-stone-950 shadow"
                            : "bg-stone-950/70 border border-white/10 text-stone-300 hover:text-white"
                        }`}
                      >
                        {isPinned ? <Check className="w-3 h-3 stroke-[3]" /> : <ArrowLeftRight className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-[#0C0D10] border-t border-stone-200 dark:border-stone-800/80 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                      <span className="font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[10px]">
                        {project.categoryLabel}
                      </span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        {project.location}
                      </span>
                    </div>
                    <h3 className="font-serif text-base sm:text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1 font-sans">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/60 text-[10px]">
                    <div className="flex items-center gap-1 text-stone-600 dark:text-stone-400 truncate max-w-[190px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="truncate">{project.materials.slice(0, 2).join(", ")}</span>
                    </div>
                    <a
                      href={`https://wa.me/254728541775?text=${whatsappText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Quote</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
