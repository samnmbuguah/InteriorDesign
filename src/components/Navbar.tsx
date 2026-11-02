"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { soundscape } from "@/utils/soundscape";
import {
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Volume2,
  VolumeX,
  BookOpen,
  Palette,
  Sun,
  Moon,
  Wrench,
} from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenLookbook: () => void;
}

export default function Navbar({ onOpenBooking, onOpenLookbook }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme (light by default)
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const nextState = soundscape.toggle();
    setIsAudioActive(nextState);
  };

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#FAF8F5]/90 dark:bg-[#090A0B]/85 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80 shadow-md dark:shadow-2xl"
            : "py-6 bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/50 to-transparent dark:from-[#090A0B]/90 dark:via-[#090A0B]/50 dark:to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo / Atelier Monogram */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-amber-600/40 dark:border-amber-500/40 bg-stone-100 dark:bg-stone-900/80 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-serif text-lg text-amber-700 dark:text-amber-300 font-semibold tracking-wider">
                A
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.2em] font-medium text-stone-900 dark:text-stone-100 uppercase group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors">
                AURA & NOIR
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-stone-500 dark:text-stone-400 font-sans">
                Joinery · Gypsum · Renovation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-[12px] tracking-widest uppercase font-medium text-stone-700 dark:text-stone-300">
            <a
              href="#services"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors py-1 flex items-center gap-1.5"
            >
              <Wrench className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>7 Services</span>
            </a>
            <a
              href="#portfolio"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors py-1"
            >
              Portfolio (37)
            </a>
            <a
              href="#3d-lab"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors py-1 flex items-center gap-1.5 text-amber-700 dark:text-amber-200/90"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              3D Spatial Lab
            </a>
            <a
              href="#moodboard"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors py-1 flex items-center gap-1"
            >
              <Palette className="w-3.5 h-3.5 text-stone-400" />
              Moodboard
            </a>
            <a
              href="#estimator"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors py-1"
            >
              Estimator
            </a>
            <button
              onClick={onOpenLookbook}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors py-1 flex items-center gap-1 text-stone-700 dark:text-stone-300"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400/80" />
              Lookbook
            </button>
          </nav>

          {/* Right Controls: Theme Switcher, Audio, Consultation CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle (Light / Dark) */}
            <button
              onClick={toggleTheme}
              title={isDarkMode ? "Switch to Light Mode (Alabaster)" : "Switch to Dark Mode (Obsidian)"}
              className="p-2.5 rounded-full border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 transition shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
            </button>

            {/* Ambient Soundscape Button */}
            <button
              onClick={handleAudioToggle}
              title={isAudioActive ? "Mute Studio Ambient Audio" : "Play Studio Ambient Atmosphere"}
              className={`p-2.5 rounded-full border backdrop-blur-md transition-all flex items-center gap-2 ${
                isAudioActive
                  ? "bg-amber-400/20 border-amber-500 text-amber-700 dark:text-amber-300 shadow-md"
                  : "bg-white dark:bg-stone-900/80 border-stone-300 dark:border-stone-800 text-stone-700 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
              }`}
            >
              {isAudioActive ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
                  <span className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 bg-amber-600 dark:bg-amber-400 h-2 animate-bounce" />
                    <span className="w-0.5 bg-amber-600 dark:bg-amber-400 h-3 animate-bounce [animation-delay:0.15s]" />
                    <span className="w-0.5 bg-amber-600 dark:bg-amber-400 h-1.5 animate-bounce [animation-delay:0.3s]" />
                  </span>
                </>
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Consultation CTA */}
            <button
              onClick={onOpenBooking}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 dark:bg-gradient-to-r dark:from-amber-500/20 dark:via-amber-400/20 dark:to-amber-600/20 dark:hover:from-amber-500 dark:hover:to-amber-400 border border-stone-800 dark:border-amber-500/40 dark:text-stone-100 dark:hover:text-stone-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-800 dark:text-stone-300 hover:text-black dark:hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAF8F5]/98 dark:bg-[#090A0B]/98 backdrop-blur-2xl flex flex-col justify-center px-8 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-4 text-base font-serif text-stone-900 dark:text-stone-200 tracking-wider">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between"
            >
              <span>Our 7 Specialized Services</span>
              <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between"
            >
              <span>Portfolio (37 Client Works)</span>
              <ArrowUpRight className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </a>
            <a
              href="#3d-lab"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between text-amber-700 dark:text-amber-300"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 3D Spatial Room Lab
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#moodboard"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between"
            >
              <span>Virtual Moodboard Builder</span>
              <Palette className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5"
            >
              Interactive Cost Estimator
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLookbook();
              }}
              className="text-left hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between text-stone-900 dark:text-stone-300"
            >
              <span>2026 Atelier Lookbook (PDF)</span>
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </button>

            {/* Mobile Theme & Audio Bar */}
            <div className="py-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-sans">
                Appearance & Audio
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                >
                  {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
                </button>
                <button
                  onClick={handleAudioToggle}
                  className={`p-2 rounded-full border ${
                    isAudioActive
                      ? "bg-amber-400 text-stone-950 border-amber-300 font-semibold"
                      : "bg-white dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300"
                  }`}
                >
                  {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3 font-sans">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Request Free Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
