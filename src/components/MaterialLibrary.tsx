"use client";

import React, { useState } from "react";
import { Sparkles, Layers, ShieldCheck, ArrowUpRight } from "lucide-react";

interface Material {
  id: string;
  name: string;
  subtitle: string;
  origin: string;
  finish: string;
  sensory: string;
  colorHex: string;
  accentHex: string;
  pairedProjects: string[];
  description: string;
}

const MATERIALS: Material[] = [
  {
    id: "travertine",
    name: "Roman Travertine Romano",
    subtitle: "Pitted & Honed Natural Limestone Monoliths",
    origin: "Tivoli, Italy & Sourced Quarry Reserves",
    finish: "Cross-cut satin honed with soft organic voids",
    sensory: "Chalky tactile warmth, velvety stone texture under bare touch",
    colorHex: "#D8CBB7",
    accentHex: "#8C5B3B",
    pairedProjects: ["05", "21", "24"],
    description:
      "A stone etched with millennia of architectural history. We use monolithic slabs with unfilled veins for fireplace hearths, dramatic powder room basins, and sculptural coffee tables.",
  },
  {
    id: "calacatta",
    name: "Calacatta Viola & Statuario",
    subtitle: "High-Contrast Dramatic Brecciated Marble",
    origin: "Carrara / Apuan Alps, Tuscany",
    finish: "Bookmatched honed or satin polished, stain-impregnated",
    sensory: "Silky, cooling mineral density with deep wine-toned veining",
    colorHex: "#F2EFE9",
    accentHex: "#5B242B",
    pairedProjects: ["02", "07", "11", "29"],
    description:
      "Sculptural art in its purest geological form. Each kitchen waterfall island and living console slab is hand-selected in Italy, ensuring each fissure and mineral flow forms a bespoke portrait.",
  },
  {
    id: "oak",
    name: "Smoked Rift European Oak",
    subtitle: "Architectural Millwork & Fluted Acoustic Paneling",
    origin: "Sustainable French / German Forestry",
    finish: "Fumed ammonia-smoked with matte botanical wax",
    sensory: "Deep grain relief, acoustic quietness, rich honey-amber undertones",
    colorHex: "#5A3D24",
    accentHex: "#D4AF37",
    pairedProjects: ["01", "08", "14", "31", "37"],
    description:
      "Our signature millwork material. Acoustic tongue-and-groove louvers and ceiling drops calibrate spatial reverberation while wrapping living volumes in cocoon-like visual security.",
  },
  {
    id: "brass",
    name: "Brushed Champagne Brass & Gunmetal",
    subtitle: "Hand-Burnished Architectural Metalwork",
    origin: "Precision Atelier Foundry Sourcing",
    finish: "Micro-brushed hairline satin with protective micro-crystalline wax",
    sensory: "Weighty, crisp metallic precision that catches golden hour light",
    colorHex: "#D4AF37",
    accentHex: "#222428",
    pairedProjects: ["01", "03", "12", "19", "25"],
    description:
      "Used as subtle jewelry for space: floating table legs, recessed ceiling shadow reveals, kitchen gantries, and custom pendant fixtures that gracefully patinate over generations.",
  },
  {
    id: "boucle",
    name: "Belgian Bouclé & Raw Linen",
    subtitle: "High-Tactility Textile Upholstery",
    origin: "Ghent, Belgium & Milanese Weaving Mills",
    finish: "Curled wool boucle with Crypton stain protection",
    sensory: "Cloud-like plush warmth, nubby textured dimension, zero synthetic shine",
    colorHex: "#DED8CB",
    accentHex: "#8A705A",
    pairedProjects: ["01", "06", "10", "26", "36"],
    description:
      "Upholstered seating requires sensory intimacy. Our bouclé blends natural virgin wool and organic cotton fibers, creating sculptural curvilinear seating that invites endless lounging.",
  },
];

export default function MaterialLibrary() {
  const [activeMaterial, setActiveMaterial] = useState<Material>(MATERIALS[0]);

  return (
    <section id="materials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            Tactile Materiality
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-100 font-normal leading-tight">
            The Atelier Finishes Library
          </h2>
          <p className="text-sm text-stone-400 mt-2 max-w-xl font-sans">
            Luxury interior design is measured by how surfaces feel under fingertips and respond to natural equatorial sunlight. We exclusively source raw, enduring geological and organic materials.
          </p>
        </div>
      </div>

      {/* Material Swatch Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {MATERIALS.map((mat) => {
          const isSelected = activeMaterial.id === mat.id;
          return (
            <button
              key={mat.id}
              onClick={() => setActiveMaterial(mat)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between h-32 ${
                isSelected
                  ? "bg-stone-900 border-amber-400/90 shadow-xl shadow-amber-950/20"
                  : "bg-stone-950/60 border-stone-800 hover:border-stone-700"
              }`}
            >
              {/* Swatch Color Accent Circle */}
              <div className="flex items-center justify-between">
                <span
                  className="w-7 h-7 rounded-xl border border-white/20 shadow-md"
                  style={{ backgroundColor: mat.colorHex }}
                />
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                )}
              </div>

              <div>
                <span className="block font-serif text-sm text-stone-200 leading-tight">
                  {mat.name.split(" ")[0]}
                </span>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block mt-0.5 truncate">
                  {mat.origin.split(",")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Material Deep-Dive Card */}
      <div className="p-8 md:p-12 rounded-3xl bg-[#0C0D10] border border-stone-800 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-medium mb-1">
                <span>Provenance: {activeMaterial.origin}</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-stone-100">
                {activeMaterial.name}
              </h3>
              <p className="text-xs text-stone-400 mt-1">{activeMaterial.subtitle}</p>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed font-sans">
              {activeMaterial.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800">
                <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                  Surface Honing
                </span>
                <span className="text-xs text-stone-200 font-medium">
                  {activeMaterial.finish}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-stone-900/60 border border-stone-800">
                <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1">
                  Tactile Sensory
                </span>
                <span className="text-xs text-stone-200 font-medium">
                  {activeMaterial.sensory}
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Swatch Display */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-900/40 border border-stone-800 text-center">
            <div
              className="w-48 h-48 rounded-full shadow-2xl border-4 border-stone-800/80 mb-4 transition-transform hover:scale-105 duration-500 relative flex items-center justify-center"
              style={{ backgroundColor: activeMaterial.colorHex }}
            >
              <div
                className="w-24 h-24 rounded-full border border-black/20 shadow-inner"
                style={{ backgroundColor: activeMaterial.accentHex }}
              />
            </div>

            <span className="font-serif text-lg text-stone-200">
              {activeMaterial.name}
            </span>
            <span className="text-xs text-stone-400 mt-1">
              Paired in Portfolio Projects:{" "}
              {activeMaterial.pairedProjects.map((p) => `#${p}`).join(", ")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
