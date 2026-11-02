"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useBooking } from "@/context/BookingContext";
import { soundscape } from "@/utils/soundscape";
import {
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Volume2,
  VolumeX,
  BookOpen,
  Sun,
  Moon,
  Wrench,
  Phone,
  Calculator,
  FolderKanban,
} from "lucide-react";

interface NavbarProps {
  onOpenBooking?: () => void;
  onOpenLookbook?: () => void;
}

export default function Navbar({ onOpenBooking, onOpenLookbook }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const bookingCtx = useBooking();
  const pathname = usePathname();

  const handleBooking = () => {
    if (onOpenBooking) onOpenBooking();
    else bookingCtx.openBooking();
  };

  const handleLookbook = () => {
    if (onOpenLookbook) onOpenLookbook();
    else bookingCtx.openLookbook();
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const nextState = soundscape.toggle();
    setIsAudioActive(nextState);
  };

  const navLinks = [
    { href: "/services", label: "7 Services", icon: Wrench },
    { href: "/portfolio", label: "Portfolio (54)", icon: FolderKanban },
    { href: "/3d-lab", label: "3D Spatial Lab", icon: Sparkles },
    { href: "/estimator", label: "Cost Estimator", icon: Calculator },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#FAF8F5]/95 dark:bg-[#090A0B]/90 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80 shadow-sm dark:shadow-2xl"
            : "py-5 bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/60 to-transparent dark:from-[#090A0B]/95 dark:via-[#090A0B]/60 dark:to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Atelier Monogram Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-amber-600/40 dark:border-amber-500/40 bg-stone-100 dark:bg-stone-900/80 flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
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
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 flex items-center gap-1.5 ${
                    isActive
                      ? "text-amber-700 dark:text-amber-400 font-semibold border-b border-amber-500"
                      : "hover:text-amber-600 dark:hover:text-amber-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <button
              onClick={handleLookbook}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors py-1 flex items-center gap-1 text-stone-700 dark:text-stone-300"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400/80" />
              <span>Lookbook</span>
            </button>
          </nav>

          {/* Right Controls: Theme Switcher, Audio, Workshop Line, CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle Button (Light / Dark) */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode (Warm Alabaster)" : "Switch to Dark Mode (Obsidian)"}
              className="p-2.5 rounded-full border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 hover:scale-105 active:scale-95 transition-all shadow-sm"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-800" />
              )}
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

            {/* Direct Call Workshop Line */}
            <a
              href="tel:+254728541775"
              className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900/80 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:text-amber-700 dark:hover:text-amber-300 hover:border-amber-400 transition shadow-sm"
              title="Direct Workshop Line: 0728 541 775"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>0728 541 775</span>
            </a>

            {/* Consultation CTA */}
            <button
              onClick={handleBooking}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 dark:bg-gradient-to-r dark:from-amber-500/20 dark:via-amber-400/20 dark:to-amber-600/20 dark:hover:from-amber-500 dark:hover:to-amber-400 border border-stone-800 dark:border-amber-500/40 dark:text-stone-100 dark:hover:text-stone-950 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-md"
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-800" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 dark:text-stone-300 hover:text-black dark:hover:text-white rounded-lg focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FAF8F5]/98 dark:bg-[#090A0B]/98 backdrop-blur-2xl flex flex-col justify-center px-8 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-3 text-base font-serif text-stone-900 dark:text-stone-200 tracking-wider">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between"
            >
              <span>Atelier Overview</span>
              <ArrowUpRight className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between"
            >
              <span>Our 7 Specialized Services</span>
              <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </Link>
            <Link
              href="/portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between"
            >
              <span>Portfolio (54 Client Works & Reels)</span>
              <FolderKanban className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </Link>
            <Link
              href="/3d-lab"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between text-amber-700 dark:text-amber-300"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 3D Spatial Room Lab
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between"
            >
              <span>Interactive Cost Estimator</span>
              <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLookbook();
              }}
              className="text-left hover:text-amber-600 dark:hover:text-amber-300 transition border-b border-stone-200 dark:border-stone-800 pb-2.5 flex items-center justify-between text-stone-900 dark:text-stone-300"
            >
              <span>2026 Atelier Lookbook (PDF)</span>
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </button>

            {/* Mobile Audio & Theme Bar */}
            <div className="py-2 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400 font-sans">
                Studio Atmosphere
              </span>
              <div className="flex items-center gap-2">
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

            <div className="pt-2 flex flex-col gap-2.5 font-sans">
              <a
                href="tel:+254728541775"
                className="w-full py-3 rounded-full border border-stone-300 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Call Workshop: 0728 541 775</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBooking();
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
