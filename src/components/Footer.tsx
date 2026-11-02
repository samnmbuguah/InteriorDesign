"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, MapPin, Mail, Phone, Globe, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#070809] border-t border-stone-800/80 pt-20 pb-12 text-stone-400">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800/80">
          {/* Brand Dossier */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-amber-500/40 bg-stone-900 flex items-center justify-center">
                <span className="font-serif text-base text-amber-300 font-semibold">A</span>
              </div>
              <span className="font-serif text-xl tracking-[0.2em] font-medium text-stone-100 uppercase">
                AURA & NOIR
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-sans max-w-sm">
              An architectural interior design atelier devoted to quiet luxury, organic geometry, and tailored sensory comfort. Crafting timeless sanctuaries across East Africa and beyond.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-400/50 hover:text-amber-300 flex items-center justify-center text-stone-400 transition"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-400/50 hover:text-amber-300 flex items-center justify-center text-stone-400 transition"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://akilinova.co.ke"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-amber-400/50 hover:text-amber-300 flex items-center justify-center text-stone-400 transition"
                aria-label="Network"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <span className="block text-[11px] uppercase tracking-widest text-stone-200 font-semibold">
              Explore
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#portfolio" className="hover:text-amber-300 transition">
                  Portfolio (37 Works)
                </a>
              </li>
              <li>
                <a href="#3d-lab" className="hover:text-amber-300 transition flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> 3D Spatial Lab
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-amber-300 transition">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#estimator" className="hover:text-amber-300 transition">
                  Cost Estimator
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-amber-300 transition">
                  Finishes Library
                </a>
              </li>
            </ul>
          </div>

          {/* Studio Coordinates */}
          <div className="lg:col-span-3 space-y-3">
            <span className="block text-[11px] uppercase tracking-widest text-stone-200 font-semibold">
              Atelier Coordinates
            </span>
            <div className="space-y-2 text-xs text-stone-400 font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>The Pavilion, Riverside Drive, Westlands, Nairobi, Kenya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>+254 (0) 700 892 411</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>atelier@interiordesign.akilinova.co.ke</span>
              </div>
            </div>
          </div>

          {/* Accreditations */}
          <div className="lg:col-span-2 space-y-3">
            <span className="block text-[11px] uppercase tracking-widest text-stone-200 font-semibold">
              Accreditation
            </span>
            <div className="text-xs text-stone-400 space-y-1.5 font-sans">
              <p>AAK Registered Practice</p>
              <p>IDA Global Nominee 2025</p>
              <p>Architectural Digest Feature</p>
              <p>Bespoke Guild of Artisans</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400 font-sans">
          <p>© 2026 AURA & NOIR Atelier. All rights reserved. Subdomain: interiordesign.akilinova.co.ke</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-amber-300 transition group p-1"
          >
            <span>Back to Summit</span>
            <div className="w-6 h-6 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center group-hover:border-amber-400">
              <ArrowUp className="w-3 h-3 text-stone-400 group-hover:text-amber-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
