"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useBooking } from "@/context/BookingContext";
import { soundscape } from "@/utils/soundscape";
import { MAIN_SERVICES, CONTACT_INFO } from "@/data/projects";
import AtelierLogo from "@/components/AtelierLogo";
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
  ArrowRight,
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
  const [mobileServicesAccordion, setMobileServicesAccordion] = useState(true);
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

  // Click outside to close services dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    }, 320);
  };

  const isServiceActive = pathname.startsWith("/services");

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          isScrolled ? "pt-2 md:pt-2.5" : "pt-0"
        }`}
      >
        {/* 1. TOP AMBIENT TICKER (Gracefully collapses on scroll) */}
        <div
          className={`transition-all duration-300 border-b overflow-hidden ${
            isScrolled
              ? "max-h-0 opacity-0 border-transparent pointer-events-none"
              : "max-h-10 opacity-100 bg-[#FAF8F5]/95 dark:bg-[#090A0B]/95 backdrop-blur-md border-stone-200/60 dark:border-stone-800/60"
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
                className="font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 font-mono"
              >
                <Phone className="w-3 h-3" />
                {CONTACT_INFO.phoneDisplay}
              </a>
              <span className="hidden md:inline text-stone-300 dark:text-stone-700">·</span>
              <span className="hidden md:inline">Karen, Runda, Muthaiga & East Africa Wide</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-stone-500 dark:text-stone-400">
                ✦ Complimentary On-Site Laser Survey
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

        {/* 2. FLOATING ARCHITECTURAL BAR (UNCLUTTERED, SPACIOUS & REFINED) */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-300 rounded-2xl md:rounded-full px-4 sm:px-6 py-2 md:py-2.5 flex items-center justify-between border ${
              isScrolled
                ? "bg-[#FAF8F5]/92 dark:bg-[#0C0D10]/92 backdrop-blur-2xl border-stone-200/90 dark:border-stone-800/90 shadow-[0_10px_35px_rgba(0,0,0,0.06)] dark:shadow-[0_14px_45px_rgba(0,0,0,0.5)]"
                : "bg-white/85 dark:bg-[#0E0F13]/85 backdrop-blur-xl border-stone-200/70 dark:border-stone-800/70 shadow-sm"
            }`}
          >
            {/* Atelier Brand Emblem with Precision Drill & Screw Motif */}
            <Link href="/" className="group flex items-center gap-2.5 shrink-0" title="ELITE INTERIORS Atelier">
              <AtelierLogo size="md" showText={false} />
              <div className="flex flex-col">
                <span className="font-serif text-sm md:text-base tracking-[0.2em] font-medium text-stone-900 dark:text-stone-100 uppercase group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  ELITE INTERIORS
                </span>
                <span className="hidden xl:block text-[8px] uppercase tracking-[0.26em] text-stone-500 dark:text-stone-400 font-sans">
                  Precision Joinery & Craft
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Spacious & Clean) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[11px] xl:text-[12px] tracking-wider uppercase font-medium">
              {/* Services Visual Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnterServices}
                onMouseLeave={handleMouseLeaveServices}
                ref={dropdownRef}
              >
                <button
                  type="button"
                  onClick={() => {
                    soundscape.playClick();
                    setServicesDropdownOpen((prev) => !prev);
                  }}
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                    isServiceActive || servicesDropdownOpen
                      ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold border border-amber-500/30"
                      : "text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-stone-100/80 dark:hover:bg-stone-800/50"
                  }`}
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                >
                  <Wrench className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Services</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      servicesDropdownOpen ? "rotate-180 text-amber-600" : "text-stone-400"
                    }`}
                  />
                </button>

                {/* ARCHITECTURAL SERVICES MEGA-MENU WITH INVISIBLE HOVER BRIDGE & 7 DEDICATED PAGES */}
                {servicesDropdownOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={handleMouseEnterServices}
                    onMouseLeave={handleMouseLeaveServices}
                  >
                    <div className="w-[800px] rounded-3xl bg-[#FAF8F5]/98 dark:bg-[#0B0C10]/98 backdrop-blur-2xl border border-stone-200 dark:border-stone-800 shadow-[0_25px_60px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.7)] p-5">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-stone-200 dark:border-stone-800">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1.5">
                            <Wrench className="w-3 h-3" />
                            7 In-House Workshop Disciplines
                          </span>
                          <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 font-normal">
                            Dedicated Architectural Pages & Dossiers
                          </h4>
                        </div>
                        <Link
                          href="/services"
                          onClick={() => setServicesDropdownOpen(false)}
                          className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1 uppercase tracking-wider"
                        >
                          <span>All 7 Disciplines Overview</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      {/* Services Grid with Real Photo Thumbnails */}
                      <div className="grid grid-cols-12 gap-4">
                        {/* Left: 7 Services with Thumbnails */}
                        <div className="col-span-8 grid grid-cols-2 gap-2">
                          {MAIN_SERVICES.map((srv) => (
                            <Link
                              key={srv.id}
                              href={`/services/${srv.id}`}
                              prefetch={true}
                              onClick={() => {
                                soundscape.playClick();
                                setServicesDropdownOpen(false);
                              }}
                              className="group/item p-2.5 rounded-2xl hover:bg-white dark:hover:bg-stone-900 border border-transparent hover:border-amber-400/40 transition-all flex items-center gap-2.5 relative z-20 cursor-pointer shadow-none hover:shadow-md"
                            >
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-950 shrink-0 border border-stone-200/80 dark:border-stone-800">
                                <img
                                  src={srv.image}
                                  alt={srv.title}
                                  className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-300"
                                />
                                <span className="absolute bottom-0 right-0 px-1 py-0.2 bg-stone-950/85 text-[8px] font-mono text-amber-300">
                                  {srv.number}
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium text-xs text-stone-900 dark:text-stone-100 group-hover/item:text-amber-700 dark:group-hover/item:text-amber-300 transition-colors truncate">
                                    {srv.title}
                                  </h5>
                                  <ArrowRight className="w-3 h-3 text-stone-300 dark:text-stone-600 group-hover/item:text-amber-600 group-hover/item:translate-x-0.5 transition-all shrink-0 ml-1" />
                                </div>
                                <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5 normal-case font-sans">
                                  {srv.shortDesc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>

                        {/* Right: Featured Survey Card */}
                        <div className="col-span-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 dark:from-amber-500/20 dark:to-stone-900/80 border border-amber-500/30 p-3.5 flex flex-col justify-between">
                          <div>
                            <div className="relative h-24 rounded-xl overflow-hidden mb-2.5 bg-stone-900">
                              <img
                                src="/portfolio/project-31.jpg"
                                alt="Master Joinery"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-stone-950/40" />
                              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded backdrop-blur-md bg-stone-950/80 text-[9px] font-mono text-amber-300">
                                Nairobi Workshop
                              </span>
                            </div>
                            <span className="text-[9px] uppercase tracking-widest text-amber-700 dark:text-amber-300 font-semibold block">
                              Direct Workshop Survey
                            </span>
                            <p className="text-[10px] text-stone-600 dark:text-stone-300 font-sans mt-0.5 normal-case leading-relaxed font-light">
                              Complimentary laser survey & 3D CAD modeling across Nairobi.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              soundscape.playClick();
                              setServicesDropdownOpen(false);
                              handleBooking("Complimentary Site Survey & Laser Measurement");
                            }}
                            className="mt-3 py-2 px-3 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-[10px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1 hover:brightness-105 transition cursor-pointer"
                          >
                            <span>Book Free Survey</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Portfolio Link with Counter Badge */}
              <Link
                href="/portfolio"
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  pathname === "/portfolio"
                    ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold border border-amber-500/30"
                    : "text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-stone-100/80 dark:hover:bg-stone-800/50"
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
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  pathname === "/3d-lab"
                    ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold border border-amber-500/30"
                    : "text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-stone-100/80 dark:hover:bg-stone-800/50"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                <span>3D Lab</span>
              </Link>

              {/* Cost Estimator Link */}
              <Link
                href="/estimator"
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  pathname === "/estimator"
                    ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold border border-amber-500/30"
                    : "text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-stone-100/80 dark:hover:bg-stone-800/50"
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Estimator</span>
              </Link>

              {/* Lookbook Button */}
              <button
                onClick={handleLookbook}
                className="px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-300 hover:bg-stone-100/80 dark:hover:bg-stone-800/50"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Lookbook</span>
              </button>
            </nav>

            {/* Right Action Suite (Clean, Spacious, No Squeezing!) */}
            <div className="flex items-center gap-2">
              {/* Optional Phone Button on ultra-wide screens only so intermediate laptop screens are never crowded */}
              <a
                href={CONTACT_INFO.telLink}
                className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:border-amber-500/60 transition shadow-sm font-mono"
                title={`Call Atelier: ${CONTACT_INFO.phoneDisplay}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <Phone className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>

              {/* Ambient Soundscape Toggle */}
              <button
                onClick={handleAudioToggle}
                title={isAudioActive ? "Mute Studio Ambient Atmosphere" : "Play Studio Ambient Atmosphere"}
                className={`hidden sm:flex p-2 rounded-full border backdrop-blur-md transition-all items-center justify-center ${
                  isAudioActive
                    ? "bg-amber-400/20 border-amber-500 text-amber-700 dark:text-amber-300 shadow-sm"
                    : "bg-white/70 dark:bg-stone-900/70 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                }`}
                aria-label="Toggle Soundscape"
              >
                {isAudioActive ? (
                  <Volume2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Theme Toggle (Light / Dark) */}
              <button
                onClick={toggleTheme}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className="p-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-300 transition-all shadow-sm"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-stone-800" />
                )}
              </button>

              {/* Primary Consultation CTA Button */}
              <button
                onClick={() => handleBooking()}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-stone-900 text-white hover:bg-stone-800 dark:bg-amber-400 dark:text-stone-950 dark:hover:bg-amber-300 text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              >
                <span>Request Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Phone Quick Trigger (<sm only) */}
              <a
                href={CONTACT_INFO.telLink}
                className="sm:hidden p-2 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                title="Call Workshop"
                aria-label="Call Workshop"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 text-stone-800 dark:text-stone-200 hover:text-black dark:hover:text-white transition"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. MOBILE ARCHITECTURAL SLIDE-IN DRAWER WITH HIGH-RES DISCIPLINE THUMBNAILS */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200 font-sans">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Body */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm sm:max-w-md bg-[#FAF8F5] dark:bg-[#0C0D11] text-stone-900 dark:text-stone-100 border-l border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between overflow-y-auto z-50 shadow-2xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5">
                  <AtelierLogo size="sm" showText={false} />
                  <div>
                    <span className="font-serif text-sm tracking-[0.2em] font-medium block">
                      ELITE INTERIORS
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.25em] text-stone-500 block">
                      Precision Workshop Atelier
                    </span>
                  </div>
                </Link>

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

              {/* Direct Calling & WhatsApp Bar */}
              <div className="grid grid-cols-2 gap-2 my-4">
                <a
                  href={CONTACT_INFO.telLink}
                  className="py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 flex items-center justify-center gap-1.5 text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Atelier</span>
                </a>
                <a
                  href={CONTACT_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-400 flex items-center justify-center gap-1.5 text-xs font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1 pt-1">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-xs font-medium uppercase tracking-wider transition ${
                    pathname === "/"
                      ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
                  }`}
                >
                  <span>Atelier Overview</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </Link>

                {/* Services Accordion with 7 Dedicated Service Pages */}
                <div className="rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden my-2 shadow-sm">
                  <button
                    type="button"
                    onClick={() => {
                      soundscape.playClick();
                      setMobileServicesAccordion(!mobileServicesAccordion);
                    }}
                    className="w-full flex items-center justify-between p-3 bg-stone-100 dark:bg-stone-900 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                        7 Workshop Disciplines
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-amber-700 dark:text-amber-400 font-mono font-medium">
                      <span>{mobileServicesAccordion ? "Hide" : "Show (7)"}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobileServicesAccordion ? "rotate-180 text-amber-600" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {mobileServicesAccordion && (
                    <div className="p-2 space-y-1.5 bg-white dark:bg-[#0A0B0E] border-t border-stone-200 dark:border-stone-800">
                      {/* Overview Link */}
                      <Link
                        href="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className="p-2.5 rounded-xl flex items-center justify-between bg-amber-500/10 text-amber-800 dark:text-amber-300 font-semibold text-xs border border-amber-500/20"
                      >
                        <span className="flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5" />
                          <span>All Disciplines Overview</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {/* 7 Dedicated Discipline Pages */}
                      {MAIN_SERVICES.map((srv) => (
                        <Link
                          key={srv.id}
                          href={`/services/${srv.id}`}
                          prefetch={true}
                          onClick={() => {
                            soundscape.playClick();
                            setMobileMenuOpen(false);
                          }}
                          className="p-2.5 rounded-xl flex items-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-900 transition border border-transparent hover:border-amber-400/30"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-200 dark:bg-stone-800 shrink-0 border border-stone-200 dark:border-stone-700">
                            <img
                              src={srv.image}
                              alt={srv.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[9px] text-amber-600 dark:text-amber-400 font-semibold">
                                {srv.number}
                              </span>
                              <h5 className="text-xs font-medium text-stone-900 dark:text-stone-100 truncate">
                                {srv.title}
                              </h5>
                            </div>
                            <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate font-sans font-light">
                              {srv.typicalTimeline} · View Details
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/portfolio"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-xs font-medium uppercase tracking-wider transition ${
                    pathname === "/portfolio"
                      ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FolderKanban className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Portfolio Works</span>
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono font-semibold">
                    54
                  </span>
                </Link>

                <Link
                  href="/3d-lab"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-xs font-medium uppercase tracking-wider transition ${
                    pathname === "/3d-lab"
                      ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                    <span>3D Spatial Lab</span>
                  </span>
                  <span className="text-[8px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-semibold">
                    Interactive
                  </span>
                </Link>

                <Link
                  href="/estimator"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-xs font-medium uppercase tracking-wider transition ${
                    pathname === "/estimator"
                      ? "bg-amber-500/15 text-amber-800 dark:text-amber-300 font-semibold"
                      : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Calculator className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Cost Estimator</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLookbook();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl flex items-center justify-between text-xs font-medium uppercase tracking-wider text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 transition text-left"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Atelier Lookbook</span>
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-500 font-mono">
                    View
                  </span>
                </button>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
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

              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span>Ambient Soundscape</span>
                <button
                  onClick={handleAudioToggle}
                  className="underline font-semibold text-amber-700 dark:text-amber-400"
                >
                  {isAudioActive ? "Mute" : "Play Soundscape"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
