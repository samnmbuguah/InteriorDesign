"use client";

import React, { useState } from "react";
import { Project } from "@/data/projects";
import { ArrowLeftRight, X, ArrowRight, Layers, MapPin, Clock } from "lucide-react";

interface ComparatorProps {
  pinnedProjects: Project[];
  onRemoveProject: (id: string) => void;
  onClearAll: () => void;
  onBookProject: (projectName: string) => void;
}

export default function ProjectComparator({
  pinnedProjects,
  onRemoveProject,
  onClearAll,
  onBookProject,
}: ComparatorProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (pinnedProjects.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Comparison Dock */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 backdrop-blur-xl bg-stone-950/90 border border-amber-500/40 rounded-full px-5 py-2.5 shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-300">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-serif text-stone-200">
            Compare ({pinnedProjects.length}/3)
          </span>
        </div>

        {/* Small Thumbnail Pills */}
        <div className="flex items-center gap-2">
          {pinnedProjects.map((p) => (
            <div key={p.id} className="relative group/pill">
              <img
                src={p.image}
                alt={p.title}
                className="w-8 h-8 rounded-full object-cover border border-amber-400/50"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveProject(p.id);
                }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-stone-900 border border-stone-700 text-stone-400 hover:text-white flex items-center justify-center text-[9px]"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-wider hover:brightness-105 transition shadow-md"
        >
          View Comparison
        </button>

        <button
          onClick={onClearAll}
          className="text-stone-400 hover:text-white text-xs underline p-1"
        >
          Clear
        </button>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 md:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-stone-800 bg-[#0C0D10] shadow-2xl p-6 md:p-10">
            <div className="flex items-center justify-between pb-6 border-b border-stone-800">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
                  Architectural Evaluation
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-stone-100">
                  Side-by-Side Spatial Comparison
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comparison Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-${pinnedProjects.length} gap-6 pt-8`}>
              {pinnedProjects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-stone-800 bg-[#121317] p-5 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="relative h-48 rounded-xl overflow-hidden bg-stone-950">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-stone-950/80 border border-white/10 text-[9px] font-mono text-amber-300">
                        {p.number}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-amber-400 block font-medium">
                        {p.categoryLabel}
                      </span>
                      <h4 className="font-serif text-lg text-stone-100 leading-tight">
                        {p.title}
                      </h4>
                      <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {p.location}
                      </p>
                    </div>

                    {/* Matrix Specs */}
                    <div className="space-y-2 py-3 border-y border-stone-800 text-xs text-stone-300">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Total Area:</span>
                        <span className="font-mono text-stone-100">{p.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Timeline:</span>
                        <span className="font-mono text-stone-100">{p.completionTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Completed:</span>
                        <span className="font-mono text-stone-100">{p.year}</span>
                      </div>
                    </div>

                    {/* Materials */}
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                        Materials
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {p.materials.map((m, i) => (
                          <span
                            key={i}
                            className="text-[9px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 font-medium"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Palette */}
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                        Color Palette
                      </span>
                      <div className="flex items-center gap-1.5">
                        {p.palette.map((c, i) => (
                          <span
                            key={i}
                            className="w-4 h-4 rounded-full border border-white/20"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onBookProject(p.title);
                    }}
                    className="w-full py-2.5 rounded-xl bg-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:brightness-105 transition"
                  >
                    <span>Consult on this Style</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
