"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailing, setTrailing] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "drag" | "explore">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frameId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element cursor data
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]");
      if (cursorTarget) {
        const type = cursorTarget.getAttribute("data-cursor");
        if (type === "drag") {
          setCursorVariant("drag");
          setCursorText("DRAG");
        } else if (type === "explore") {
          setCursorVariant("explore");
          setCursorText("EXPLORE");
        } else if (type === "tour") {
          setCursorVariant("explore");
          setCursorText("TOUR");
        } else {
          setCursorVariant("hover");
          setCursorText("");
        }
      } else if (target?.closest("button, a, input, select")) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    const lerpLoop = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailing({ x: currentX, y: currentY });
      frameId = requestAnimationFrame(lerpLoop);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    frameId = requestAnimationFrame(lerpLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isExpanded = cursorVariant === "drag" || cursorVariant === "explore";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Center Small Dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-amber-400 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: isExpanded ? 0 : 0.85,
        }}
      />

      {/* Trailing Ring / Expandable Badge */}
      <div
        className={`fixed rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ease-out ${
          isExpanded
            ? "w-20 h-20 bg-amber-400 text-stone-950 font-semibold tracking-widest text-[9px] shadow-2xl scale-100"
            : cursorVariant === "hover"
            ? "w-12 h-12 border border-amber-400/80 bg-amber-400/10 scale-110"
            : "w-8 h-8 border border-amber-400/40 bg-transparent scale-100"
        }`}
        style={{
          left: `${trailing.x}px`,
          top: `${trailing.y}px`,
        }}
      >
        {cursorText && (
          <span className="animate-in fade-in zoom-in-75 duration-200">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
