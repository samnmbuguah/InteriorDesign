"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, Compass, Sparkles, PhoneCall } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#090A0B]/85 backdrop-blur-xl border-b border-stone-800/80 shadow-2xl"
            : "py-6 bg-gradient-to-b from-[#090A0B]/90 via-[#090A0B]/50 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Atelier Monogram */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-amber-500/40 bg-stone-900/80 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-amber-400">
              <span className="font-serif text-lg text-amber-300 font-semibold tracking-wider">
                A
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.2em] font-medium text-stone-100 uppercase group-hover:text-amber-200 transition-colors">
                AURA & NOIR
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-sans">
                Interior Architecture Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-widest uppercase font-medium text-stone-300">
            <a
              href="#portfolio"
              className="hover:text-amber-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1px] after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Portfolio (37)
            </a>
            <a
              href="#3d-lab"
              className="hover:text-amber-300 transition-colors py-1 flex items-center gap-1.5 text-amber-200/90 hover:after:w-full after:w-0 after:h-[1px] after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              3D Spatial Lab
            </a>
            <a
              href="#philosophy"
              className="hover:text-amber-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1px] after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Philosophy
            </a>
            <a
              href="#estimator"
              className="hover:text-amber-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1px] after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Cost Estimator
            </a>
            <a
              href="#materials"
              className="hover:text-amber-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1px] after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Materiality
            </a>
            <a
              href="#testimonials"
              className="hover:text-amber-300 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[1px] after:bg-amber-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              Praise
            </a>
          </nav>

          {/* Consultation CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-600/20 hover:from-amber-500 hover:to-amber-400 border border-amber-500/40 text-stone-100 hover:text-stone-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg shadow-amber-950/30"
            >
              <span>Book Consultation</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#090A0B]/95 backdrop-blur-2xl flex flex-col justify-center px-8 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-6 text-xl font-serif text-stone-200 tracking-wider">
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 transition border-b border-stone-800 pb-3 flex items-center justify-between"
            >
              <span>Portfolio (37 Client Works)</span>
              <ArrowUpRight className="w-5 h-5 text-amber-400" />
            </a>
            <a
              href="#3d-lab"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 transition border-b border-stone-800 pb-3 flex items-center justify-between text-amber-300"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 3D Spatial Room Lab
              </span>
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 transition border-b border-stone-800 pb-3"
            >
              Our Design Philosophy
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 transition border-b border-stone-800 pb-3"
            >
              Interactive Cost Estimator
            </a>
            <a
              href="#materials"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 transition border-b border-stone-800 pb-3"
            >
              Materiality & Finishes
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-300 transition border-b border-stone-800 pb-3"
            >
              Client Stories & Press
            </a>

            <div className="pt-4 flex flex-col gap-3 font-sans">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-4 rounded-full bg-amber-400 text-stone-950 font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20"
              >
                <span>Book Bespoke Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
