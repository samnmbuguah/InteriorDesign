"use client";

import React, { useState } from "react";
import { PROJECTS, Project } from "@/data/projects";
import { Sparkles, Palette, Layers, Check, ArrowRight, RotateCcw, Heart } from "lucide-react";

interface MoodboardProps {
  onAttachMoodboard?: (summary: string) => void;
}

const MATERIAL_SWATCHES = [
  { id: "travertine", name: "Roman Travertine", hex: "#D8CBB7", texture: "Pitted Satin Stone" },
  { id: "calacatta", name: "Calacatta Viola", hex: "#F2EFE9", texture: "Brecciated Marble" },
  { id: "oak", name: "Smoked Rift Oak", hex: "#5A3D24", texture: "Fumed Grain Wood" },
  { id: "brass", name: "Champagne Brass", hex: "#D4AF37", texture: "Brushed Satin Metal" },
  { id: "boucle", name: "Crema Bouclé", hex: "#DED8CB", texture: "Nubby Wool Textile" },
  { id: "terracotta", name: "Terracotta Velvet", hex: "#A84F32", texture: "Rich Mineral Velvet" },
  { id: "nero", name: "Nero Marquina", hex: "#1A1917", texture: "Veined Black Marble" },
  { id: "tambour", name: "Walnut Tambour", hex: "#462E1F", texture: "Acoustic Fluted Louvers" },
];

const ACCENT_COLORS = [
  { name: "Obsidian", hex: "#121316" },
  { name: "Warm Greige", hex: "#A39F99" },
  { name: "Olive Slate", hex: "#5C5F57" },
  { name: "Amber Ochre", hex: "#C79D58" },
  { name: "Deep Burgundy", hex: "#5B242B" },
  { name: "Pure Sand", hex: "#FAF7F2" },
];

export default function MoodboardBuilder({ onAttachMoodboard }: MoodboardProps) {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(["calacatta", "oak", "brass"]);
  const [selectedColor, setSelectedColor] = useState<string>("#121316");
  const [pinnedProjects, setPinnedProjects] = useState<string[]>(["proj-01", "proj-31"]);
  const [spaceType, setSpaceType] = useState<string>("Executive Living Haven");

  const toggleMaterial = (id: string) => {
    if (selectedMaterials.includes(id)) {
      if (selectedMaterials.length > 1) {
        setSelectedMaterials(selectedMaterials.filter((m) => m !== id));
      }
    } else {
      if (selectedMaterials.length < 4) {
        setSelectedMaterials([...selectedMaterials, id]);
      }
    }
  };

  const toggleProject = (id: string) => {
    if (pinnedProjects.includes(id)) {
      if (pinnedProjects.length > 1) {
        setPinnedProjects(pinnedProjects.filter((p) => p !== id));
      }
    } else {
      if (pinnedProjects.length < 3) {
        setPinnedProjects([...pinnedProjects, id]);
      }
    }
  };

  const resetBoard = () => {
    setSelectedMaterials(["calacatta", "oak", "brass"]);
    setSelectedColor("#121316");
    setPinnedProjects(["proj-01", "proj-31"]);
    setSpaceType("Executive Living Haven");
  };

  const handleAttach = () => {
    const matNames = selectedMaterials
      .map((id) => MATERIAL_SWATCHES.find((m) => m.id === id)?.name)
      .join(", ");
    const summary = `Custom Moodboard: ${spaceType} · Finishes: [${matNames}] · Accent Tone: ${selectedColor} · Pinned Inspo: [${pinnedProjects.join(", ")}]`;
    if (onAttachMoodboard) onAttachMoodboard(summary);
  };

  const pinnedProjectObjects = PROJECTS.filter((p) => pinnedProjects.includes(p.id));

  return (
    <section id="moodboard" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="rounded-3xl border border-stone-800 bg-[#0C0D10] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              <Palette className="w-3.5 h-3.5" />
              Interactive Design Studio
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-100 font-normal leading-tight">
              Curate Your Virtual Spatial Moodboard
            </h2>
            <p className="text-sm text-stone-400 mt-2 max-w-xl font-sans">
              Combine bespoke materials, stone slabs, accent palettes, and client project inspirations. Build a cohesive architectural vision board to guide your consultation.
            </p>
          </div>

          <button
            onClick={resetBoard}
            className="self-start lg:self-end flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 p-2 rounded-xl border border-stone-800 bg-stone-900/60 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Palette</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Space Vision */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2.5">
                1. Target Spatial Environment
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Executive Living Haven",
                  "Elysian Master Chamber",
                  "Gourmet Culinary Atelier",
                  "Penthouse Skyline Salon",
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSpaceType(type)}
                    className={`p-3 rounded-2xl border text-xs text-left transition-all ${
                      spaceType === type
                        ? "bg-amber-400/15 border-amber-400 text-stone-100 font-medium shadow-md shadow-amber-500/10"
                        : "bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tactile Materials (Select up to 4) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                  2. Select Architectural Materials (Pick 2 to 4)
                </label>
                <span className="text-[10px] text-amber-300 font-mono">
                  {selectedMaterials.length}/4 Selected
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {MATERIAL_SWATCHES.map((mat) => {
                  const isSelected = selectedMaterials.includes(mat.id);
                  return (
                    <button
                      key={mat.id}
                      onClick={() => toggleMaterial(mat.id)}
                      className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-24 ${
                        isSelected
                          ? "bg-stone-900 border-amber-400/80 shadow-md shadow-amber-950/20"
                          : "bg-stone-900/40 border-stone-800 hover:border-stone-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="w-5 h-5 rounded-lg border border-white/20 shadow-sm"
                          style={{ backgroundColor: mat.hex }}
                        />
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <div>
                        <span className="block text-xs font-serif text-stone-200 leading-tight">
                          {mat.name}
                        </span>
                        <span className="text-[9px] text-stone-400 block truncate">
                          {mat.texture}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Base Color Tone */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-2.5">
                3. Primary Architectural Color Anchor
              </label>
              <div className="flex items-center gap-3">
                {ACCENT_COLORS.map((c) => {
                  const isSelected = selectedColor === c.hex;
                  return (
                    <button
                      key={c.hex}
                      onClick={() => setSelectedColor(c.hex)}
                      className={`w-9 h-9 rounded-full border-2 transition-transform relative flex items-center justify-center ${
                        isSelected
                          ? "border-amber-400 scale-110 shadow-lg shadow-amber-500/20"
                          : "border-stone-800 hover:border-stone-600"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Select Project Inspirations (Pick up to 3) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                  4. Pin Project Inspirations (Pick 1 to 3)
                </label>
                <span className="text-[10px] text-amber-300 font-mono">
                  {pinnedProjects.length}/3 Pinned
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {PROJECTS.slice(0, 12).map((p) => {
                  const isPinned = pinnedProjects.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => toggleProject(p.id)}
                      className={`relative h-16 rounded-xl overflow-hidden border cursor-pointer group transition-all ${
                        isPinned
                          ? "border-amber-400 ring-2 ring-amber-400/40 scale-105"
                          : "border-stone-800 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                      {isPinned && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: The Live Curated Moodboard Canvas */}
          <div className="lg:col-span-6 flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-[#121317] border border-amber-500/30 shadow-2xl relative">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
                    Atelier Board Preview
                  </span>
                  <h3 className="font-serif text-xl text-stone-100">{spaceType}</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-stone-900 border border-stone-700 text-[10px] uppercase tracking-wider text-stone-300 font-mono">
                  Cohesion: 98%
                </div>
              </div>

              {/* Dynamic Collage Grid */}
              <div className="py-6 space-y-4">
                {/* Images Collage */}
                <div className="grid grid-cols-2 gap-3 h-52 sm:h-60">
                  {pinnedProjectObjects.map((proj, idx) => (
                    <div
                      key={proj.id}
                      className={`relative rounded-2xl overflow-hidden border border-stone-800 ${
                        idx === 0 && pinnedProjectObjects.length === 1 ? "col-span-2" : ""
                      }`}
                    >
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 right-2 backdrop-blur-md bg-stone-950/80 px-2.5 py-1 rounded-lg border border-white/10 text-[9px] uppercase tracking-wider text-stone-300 truncate">
                        {proj.title}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tactile Material Strip */}
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-stone-400 font-medium block mb-2">
                    Selected Material Textures
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {selectedMaterials.map((id) => {
                      const mat = MATERIAL_SWATCHES.find((m) => m.id === id);
                      if (!mat) return null;
                      return (
                        <div
                          key={id}
                          className="p-2.5 rounded-xl border border-stone-800 flex items-center gap-2"
                          style={{ backgroundColor: `${mat.hex}18` }}
                        >
                          <span
                            className="w-4 h-4 rounded-md border border-white/20 shrink-0"
                            style={{ backgroundColor: mat.hex }}
                          />
                          <span className="text-[10px] font-medium text-stone-200 truncate">
                            {mat.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dominant Hue Bar */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-900/60 border border-stone-800">
                  <span
                    className="w-5 h-5 rounded-full border border-white/20 shrink-0 shadow"
                    style={{ backgroundColor: selectedColor }}
                  />
                  <div className="text-[11px] text-stone-300">
                    <span className="text-stone-400">Anchor Atmosphere:</span>{" "}
                    <span className="font-mono text-amber-300">{selectedColor}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-6 border-t border-stone-800">
              <button
                onClick={handleAttach}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:brightness-105 transition"
              >
                <span>Attach Moodboard to Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
