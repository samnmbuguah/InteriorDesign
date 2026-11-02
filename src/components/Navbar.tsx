"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useBooking } from "@/context/BookingContext";
import { soundscape } from "@/utils/soundscape";
import { MAIN_SERVICES, CONTACT_INFO } from "@/data/projects";
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
  ChevronDown,
  MessageSquare,
  Layers,
  Hammer,
  DoorClosed,
  Home,
  Tv,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

interface NavbarProps {
  onOpenBooking?: () => void;
  onOpenLookbook?: () => void;
}

export default function Navbar({ onOpenBooking, onOpenLookbook }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const bookingCtx = useBooking();
  const pathname = usePathname();

  const handleBooking = (scope?: string) => {
    if (onOpenBooking) onOpenBooking();
    else bookingCtx.openBooking(scope);
  };

  const handleLookbook = () => {
    if (onOpenLookbook) onOpenLookbook();
    else bookingCtx.openLookbook();
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesAccordion, setMobileServicesAccordion] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleAudioToggle = () => {
    const nextState = soundscape.toggle();
    setIsAudioActive(nextState);
  };

  const handleMouseEnterServices = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  // Map service icon based on id
  const getServiceIcon = (id: string) => {
    switch (id) {
      case "staircases":
        return Layers;
      case "gypsum":
        return Sparkles;
      case "flooring":
        return Layers;
      case "cabinetry":
        return Hammer;
      case "tv_stands":
        return Tv;
      case "doors":
        return DoorClosed;
      case "renovation":
        return Home;
      default:
        return Wrench;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          isScrolled ? "pt-2 md:pt-3" : "pt-0"
        }`}
      >
        {/* 1. TOP AMBIENT TICKER (Collapses smoothly on scroll) */}
        <div
          className={`transition-all duration-300 border-b overflow-hidden ${
            isScrolled
              ? "max-h-0 opacity-0 border-transparent pointer-events-none"
              : "max-h-10 opacity-100 bg-[#FAF8F5]/90 dark:bg-[#090A0B]/90 backdrop-blur-md border-stone-200/60 dark:border-stone-800/60"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-[11px] font-sans text-stone-600 dark:text-stone-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-medium text-stone-800 dark:text-stone-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Workshop Direct:
              </span>
              <a
                href={CONTACT_INFO.telLink}
                className="font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                {CONTACT_INFO.phoneDisplay}
              </a>
              <span className="hidden md:inline text-stone-300 dark:text-stone-700">·</span>
              <span className="hidden md:inline">Nairobi, Karen, Runda & East Africa Wide</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-stone-500 dark:text-stone-400">
                ✦ Complimentary On-Site Survey & Laser Measurements
              </span>
              <a
                href={CONTACT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp Atelier</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. FLOATING ARCHITECTURAL ISLAND */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-300 rounded-2xl md:rounded-full px-4 sm:px-6 py-2.5 md:py-3 flex items-center justify-between border ${
              isScrolled
                ? "bg-[#FAF8F5]/90 dark:bg-[#0C0D10]/90 backdrop-blur-2xl border-stone-200/90 dark:border-stone-800/90 shadow-[0_10px_35px_rgba(0,0,0,0.07)] dark:shadow-[0_14px_45px_rgba(0,0,0,0.5)]"
                : "bg-white/80 dark:bg-[#0E0F13]/80 backdrop-blur-xl border-stone-200/70 dark:border-stone-800/70 shadow-sm"
            }`}
          >
            {/* Atelier Brand Monogram & Seal */}
            <Link href="/" className="group flex items-center gap-3 shrink-0">
              <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full border border-amber-500/50 dark:border-amber-400/40 bg-gradient-to-br from-amber-50 to-stone-100 dark:from-stone-900 dark:to-stone-950 flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
                <span className="font-serif text-base md:text-lg text-amber-700 dark:text-amber-300 font-semibold tracking-wider">
                  A
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-500 border border-white dark:border-stone-900" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-base md:text-lg tracking-[0.22em] font-medium text-stone-900 dark:text-stone-100 uppercase group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  AURA & NOIR
                </span>
                <span className="hidden sm:block text-[8px] md:text-[9px] uppercase tracking-[0.28em] text-stone-500 dark:text-stone-400 font-sans">
                  Joinery · Gypsum · Renovation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[12px] tracking-wider uppercase font-medium">
              {/* Services Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterServices}
                onMouseLeave={handleMouseLeaveServices}
                ref={dropdownRef}
              >
                <Link
                  href="/services"
                  className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                    pathname === "/services"
                      ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/30"
                      : "text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/60"
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesDropdownOpen ? "rotate-180 text-amber-600" : "text-stone-400"
                    }`}
                  />
                </Link>

                {/* ARCHITECTURAL SERVICES MEGA-MENU */}
                {servicesDropdownOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] rounded-3xl bg-[#FAF8F5]/98 dark:bg-[#0C0D11]/98 backdrop-blur-2xl border border-stone-200 dark:border-stone-800 shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.6)] p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseEnter={handleMouseEnterServices}
                    onMouseLeave={handleMouseLeaveServices}
                  >
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200 dark:border-stone-800/80">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1.5">
                          <Wrench className="w-3 h-3" />
                          7 In-House Workshop Disciplines
                        </span>
                        <h4 className="font-serif text-lg text-stone-900 dark:text-stone-100 font-normal">
                          Specialized Architectural Joinery & Turnkey Craft
                        </h4>
                      </div>
                      <Link
                        href="/services"
                        className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1 uppercase tracking-wider"
                      >
                        <span>Full Dossier</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* 7 Services Grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {MAIN_SERVICES.map((srv) => {
                        const IconComponent = getServiceIcon(srv.id);
                        return (
                          <Link
                            key={srv.id}
                            href={`/services#services`}
                            onClick={() => setServicesDropdownOpen(false)}
                            className="group/item p-2.5 rounded-2xl hover:bg-white dark:hover:bg-stone-900/90 border border-transparent hover:border-amber-400/30 transition-all flex items-start gap-3"
                          >
                            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 group-hover/item:bg-amber-500 group-hover/item:text-stone-950 flex items-center justify-center shrink-0 transition-colors">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
                                  {srv.number}
                                </span>
                                <h5 className="font-medium text-xs text-stone-900 dark:text-stone-100 group-hover/item:text-amber-700 dark:group-hover/item:text-amber-300 transition-colors truncate">
                                  {srv.title}
                                </h5>
                              </div>
                              <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5 normal-case font-sans">
                                {srv.shortDesc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}

                      {/* Fast Quote Card inside Mega Menu */}
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 dark:from-amber-500/20 dark:to-stone-900/80 border border-amber-500/30 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest text-amber-700 dark:text-amber-300 font-semibold block">
                            Direct Workshop Quote
                          </span>
                          <p className="text-[10px] text-stone-600 dark:text-stone-300 font-sans mt-0.5 normal-case">
                            Complimentary site survey & 3D joinery rendering across Nairobi.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setServicesDropdownOpen(false);
                            handleBooking("Custom Joinery & Renovation Inquiry");
                          }}
                          className="mt-2 py-1.5 px-3 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 hover:brightness-105 transition"
                        >
                          <span>Request Quote</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Portfolio Link with Counter Badge */}
              <Link
                href="/portfolio"
                className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                  pathname === "/portfolio"
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/30"
                    : "text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/60"
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Portfolio</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-semibold">
                  54
                </span>
              </Link>

              {/* 3D Lab Link */}
              <Link
                href="/3d-lab"
                className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                  pathname === "/3d-lab"
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/30"
                    : "text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/60"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                <span>3D Lab</span>
              </Link>

              {/* Cost Estimator Link */}
              <Link
                href="/estimator"
                className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 ${
                  pathname === "/estimator"
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/30"
                    : "text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/60"
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Estimator</span>
              </Link>

              {/* Lookbook Button */}
              <button
                onClick={handleLookbook}
                className="px-3.5 py-2 rounded-full transition-all flex items-center gap-1.5 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-100 dark:hover:bg-stone-800/60"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Lookbook</span>
              </button>
            </nav>

            {/* Right Action Suite: Direct Line, WhatsApp, Theme, Audio, CTA */}
            <div className="flex items-center gap-2">
              {/* Direct Workshop Call Badge (Visible on md and up) */}
              <a
                href={CONTACT_INFO.telLink}
                className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:border-amber-500/60 hover:text-amber-700 dark:hover:text-amber-300 transition shadow-sm"
                title={`Call Atelier Workshop: ${CONTACT_INFO.phoneDisplay}`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span className="font-mono tracking-normal">{CONTACT_INFO.phoneDisplay}</span>
              </a>

              {/* WhatsApp Quick Pill (Visible on sm and up) */}
              <a
                href={CONTACT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center justify-center p-2.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition shadow-sm"
                title="Chat with Workshop on WhatsApp"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              {/* Ambient Soundscape Button (Desktop) */}
              <button
                onClick={handleAudioToggle}
                title={isAudioActive ? "Mute Studio Ambient Atmosphere" : "Play Studio Ambient Atmosphere"}
                className={`hidden sm:flex p-2.5 rounded-full border backdrop-blur-md transition-all items-center gap-1.5 ${
                  isAudioActive
                    ? "bg-amber-400/20 border-amber-500 text-amber-700 dark:text-amber-300 shadow-sm"
                    : "bg-white/70 dark:bg-stone-900/70 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                }`}
                aria-label="Toggle Soundscape"
              >
                {isAudioActive ? (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
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

              {/* Theme Toggle Button (Light / Dark) */}
              <button
                onClick={toggleTheme}
                title={isDark ? "Switch to Light Mode (Warm Alabaster)" : "Switch to Dark Mode (Obsidian)"}
                className="p-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 hover:scale-105 active:scale-95 transition-all shadow-sm"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-stone-800" />
                )}
              </button>

              {/* Primary Quote CTA Button */}
              <button
                onClick={() => handleBooking()}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 dark:bg-amber-400 dark:text-stone-950 dark:hover:bg-amber-300 border border-stone-900 dark:border-amber-400 text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <span>Request Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Direct Call Button (<sm only) */}
              <a
                href={CONTACT_INFO.telLink}
                className="sm:hidden p-2.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                title="Call Workshop: 0728 541 775"
                aria-label="Call Workshop"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Mobile Menu Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 text-stone-800 dark:text-stone-200 hover:text-black dark:hover:text-white transition"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. MOBILE ARCHITECTURAL DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-in fade-in duration-200 font-sans">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Panel from Right */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#FAF8F5] dark:bg-[#0C0D11] text-stone-900 dark:text-stone-100 border-l border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between overflow-y-auto z-50 shadow-2xl">
            {/* Drawer Top Bar */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-amber-500/50 bg-stone-100 dark:bg-stone-900 flex items-center justify-center">
                    <span className="font-serif text-base text-amber-700 dark:text-amber-300 font-semibold">
                      A
                    </span>
                  </div>
                  <div>
                    <span className="font-serif text-base tracking-[0.2em] font-medium block">
                      AURA & NOIR
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.25em] text-stone-500 block">
                      Nairobi Joinery Atelier
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300"
                    aria-label="Toggle Theme"
                  >
                    {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-800" />}
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Contact Action Bar */}
              <div className="grid grid-cols-2 gap-2.5 my-4">
                <a
                  href={CONTACT_INFO.telLink}
                  className="py-2.5 px-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-center justify-center gap-2 text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call 0728 541775</span>
                </a>
                <a
                  href={CONTACT_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-400 flex items-center justify-center gap-2 text-xs font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Main Navigation Links */}
              <nav className="space-y-1 pt-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-between text-sm font-medium transition ${
                    pathname === "/"
                      ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
                  }`}
                >
                  <span>Atelier Overview</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </Link>

                {/* Services Accordion */}
                <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-900/60">
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-semibold flex items-center gap-2 text-stone-900 dark:text-stone-100"
                    >
                      <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>7 Specialized Services</span>
                    </Link>
                    <button
                      onClick={() => setMobileServicesAccordion(!mobileServicesAccordion)}
                      className="p-1 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-200"
                      aria-label="Expand Services"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileServicesAccordion ? "rotate-180 text-amber-600" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {mobileServicesAccordion && (
                    <div className="p-2 space-y-1 bg-white dark:bg-[#0A0B0E] border-t border-stone-200 dark:border-stone-800">
                      {MAIN_SERVICES.map((srv) => (
                        <Link
                          key={srv.id}
                          href="/services#services"
                          onClick={() => setMobileMenuOpen(false)}
                          className="py-2 px-3 rounded-lg flex items-center justify-between text-xs text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-300 hover:bg-stone-50 dark:hover:bg-stone-900"
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-mono text-amber-600 text-[10px]">{srv.number}</span>
                            <span>{srv.title}</span>
                          </span>
                          <ArrowRight className="w-3 h-3 text-stone-400" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/portfolio"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-between text-sm font-medium transition ${
                    pathname === "/portfolio"
                      ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FolderKanban className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Portfolio (54 Works & Reels)</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-semibold">
                    54
                  </span>
                </Link>

                <Link
                  href="/3d-lab"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-between text-sm font-medium transition ${
                    pathname === "/3d-lab"
                      ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
                    <span>3D Spatial Room Lab</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                    Three.js
                  </span>
                </Link>

                <Link
                  href="/estimator"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-between text-sm font-medium transition ${
                    pathname === "/estimator"
                      ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Cost Estimator & Finishes</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLookbook();
                  }}
                  className="w-full py-3 px-4 rounded-xl flex items-center justify-between text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 transition text-left"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>2026 Lookbook (PDF Monograph)</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-500 font-mono">
                    View
                  </span>
                </button>
              </nav>
            </div>

            {/* Drawer Bottom Action Block */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>Studio Ambient Audio</span>
                <button
                  onClick={handleAudioToggle}
                  className={`px-3 py-1.5 rounded-full border text-xs flex items-center gap-1.5 ${
                    isAudioActive
                      ? "bg-amber-400 text-stone-950 border-amber-400 font-semibold"
                      : "bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700"
                  }`}
                >
                  {isAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isAudioActive ? "Atmosphere Playing" : "Muted"}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBooking();
                }}
                className="w-full py-3.5 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-semibold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-xl hover:brightness-105 active:scale-95 transition"
              >
                <span>Request Quotation & Site Visit</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-stone-500 font-sans">
                Nairobi, Kenya · quotes@interiordesign.akilinova.co.ke
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
