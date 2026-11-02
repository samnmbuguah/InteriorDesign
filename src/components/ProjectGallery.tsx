"use client";

import React, { useState, useMemo } from "react";
import { Project, CATEGORIES } from "@/data/projects";
import { Search, LayoutGrid, Columns, MapPin, Eye, ArrowUpRight, Sparkles, ArrowLeftRight, Check } from "lucide-react";

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
        project.materials.some((m) => m.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Portfolio
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-100 font-normal leading-tight">
            Crafted Havens & Architectural Works
          </h2>
          <p className="text-sm text-stone-400 mt-2 max-w-xl font-sans">
            Explore 37 realized residential residences, penthouse salons, and bespoke millwork installations. Each space represents an intimate dialogue between client vision and refined craft.
          </p>
        </div>

        {/* Layout Switcher */}
        <div className="hidden sm:flex items-center gap-2 p-1 rounded-2xl bg-stone-900/80 border border-stone-800 self-start md:self-end">
          <button
            onClick={() => setLayoutMode("masonry")}
            className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition ${
              layoutMode === "masonry"
                ? "bg-stone-800 text-amber-300 shadow"
                : "text-stone-400 hover:text-stone-200"
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
                ? "bg-stone-800 text-amber-300 shadow"
                : "text-stone-400 hover:text-stone-200"
            }`}
            title="Uniform Grid"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar: Categories & Search */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-800/80">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? projects.length
                : projects.filter((p) => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                  isSelected
                    ? "bg-amber-400 text-stone-950 font-semibold shadow-lg shadow-amber-500/20"
                    : "bg-stone-900/60 border border-stone-800/80 text-stone-400 hover:text-stone-100 hover:border-stone-700"
                }`}
              >
                {cat.label} ({count})
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
            placeholder="Search by material, room, or location..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-stone-900/60 border border-stone-800 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-400/60 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredProjects.length === 0 ? (
        <div className="py-20 text-center rounded-3xl border border-stone-800/60 bg-stone-950/40">
          <p className="text-stone-400 text-sm">
            No projects found matching &ldquo;{searchQuery}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-amber-300 bg-amber-400/10 border border-amber-400/30 hover:bg-amber-400/20 transition"
          >
            Reset Filters
          </button>
        </div>
      ) : layoutMode === "masonry" ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredProjects.map((project) => {
            const isPinned = pinnedIds.includes(project.id);
            return (
              <div
                key={project.id}
                data-cursor="explore"
                onClick={() => onSelectProject(project)}
                className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-stone-800/80 bg-stone-900/40 hover:border-amber-400/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-amber-950/20 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full overflow-hidden bg-stone-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-auto object-cover transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Number Badge Top Left */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-950/70 border border-white/10 text-[10px] font-mono text-amber-300">
                    {project.number}
                  </div>

                  {/* Category Pill Top Right */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
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
                    <span className="px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-950/70 border border-white/10 text-[10px] uppercase tracking-wider text-stone-300">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Hover Reveal Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0B] via-[#090A0B]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                    <div className="w-full flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-amber-300 font-medium flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> View Project Dossier
                      </span>
                      <div className="w-8 h-8 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Meta */}
                <div className="p-4 bg-[#0C0D10] border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" />
                      {project.location}
                    </span>
                    <span className="font-mono">{project.area}</span>
                  </div>
                  <h3 className="font-serif text-lg text-stone-100 group-hover:text-amber-200 transition-colors">
                    {project.title}
                  </h3>

                  {/* Palette preview dots */}
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-800/60">
                    <div className="flex items-center gap-1.5">
                      {project.palette.slice(0, 4).map((p, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: p.hex }}
                          title={p.name}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400">
                      {project.scope.split("&")[0]}
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
            return (
              <div
                key={project.id}
                data-cursor="explore"
                onClick={() => onSelectProject(project)}
                className="group relative rounded-2xl overflow-hidden border border-stone-800/80 bg-stone-900/40 hover:border-amber-400/50 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-2xl flex flex-col"
              >
                <div className="relative h-64 w-full overflow-hidden bg-stone-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-950/70 border border-white/10 text-[10px] font-mono text-amber-300">
                    {project.number}
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
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
                    <span className="px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-950/70 border border-white/10 text-[10px] uppercase tracking-wider text-stone-300">
                      {project.categoryLabel}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-[#0C0D10] border-t border-stone-800/80 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {project.location}
                      </span>
                      <span className="font-mono">{project.area}</span>
                    </div>
                    <h3 className="font-serif text-lg text-stone-100 group-hover:text-amber-200 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-800/60">
                    <div className="flex items-center gap-1.5">
                      {project.palette.slice(0, 4).map((p, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: p.hex }}
                          title={p.name}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-400/80 font-medium">
                      {project.year}
                    </span>
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
