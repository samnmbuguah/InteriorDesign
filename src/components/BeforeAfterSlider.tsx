"use client";

import React, { useState, useRef, useCallback } from "react";
import { Sparkles, ArrowLeftRight, CheckCircle2 } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Narrative */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Turnkey Transformation
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-100 font-normal leading-tight">
            From Raw Shell to Architectural Poetry
          </h2>
          <p className="text-sm text-stone-400 leading-relaxed font-sans">
            Every sanctuary begins as an unrefined void. Through structural precision, acoustic engineering, and bespoke joinery, we transform raw residential carcasses into warm, livable works of art.
          </p>

          <div className="space-y-3 pt-2">
            {[
              "Structural Demolition & MEP Electrical Redesign",
              "Acoustic Ceiling Drops with Concealed Architectural Cove LEDs",
              "CNC Waterjet-Cut Natural Stone & Fluted Hardwood Paneling",
              "White-Glove Turnkey Furnishing & Bespoke Art Curation",
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-3 text-xs text-stone-400">
            <span className="p-2 rounded-full bg-stone-900 border border-stone-800 text-amber-300">
              <ArrowLeftRight className="w-4 h-4" />
            </span>
            <span>Drag slider horizontally to reveal spatial transformation</span>
          </div>
        </div>

        {/* Right Draggable Comparison Stage */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            onMouseDown={() => (isDragging.current = true)}
            onMouseUp={() => (isDragging.current = false)}
            onMouseLeave={() => (isDragging.current = false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[420px] md:h-[500px] rounded-3xl overflow-hidden border border-stone-800 shadow-2xl cursor-ew-resize select-none group"
          >
            {/* "After" Image (Full background) */}
            <img
              src="/portfolio/project-31.jpg"
              alt="After: Grand Salon Luxury Finish"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full backdrop-blur-md bg-stone-950/80 border border-amber-400/30 text-[10px] uppercase tracking-wider text-amber-300 font-medium">
              After: Bespoke Turnkey
            </div>

            {/* "Before" Image (Clipped overlay) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="/portfolio/project-14.jpg"
                alt="Before: Raw Architectural Shell"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125"
                style={{
                  width: containerRef.current
                    ? `${containerRef.current.clientWidth}px`
                    : "100%",
                  maxWidth: "none",
                }}
              />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full backdrop-blur-md bg-stone-950/80 border border-white/20 text-[10px] uppercase tracking-wider text-stone-300 font-medium">
                Before: Raw Frame
              </div>
            </div>

            {/* Draggable Divider Bar */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Draggable Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-stone-900 border-2 border-amber-400 flex items-center justify-center text-amber-300 shadow-xl group-hover:scale-110 transition-transform">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
