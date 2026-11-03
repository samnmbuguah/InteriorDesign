"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ProjectLightbox from "@/components/ProjectLightbox";
import PrecisionToolsSection from "@/components/PrecisionToolsSection";
import { useBooking } from "@/context/BookingContext";
import { soundscape } from "@/utils/soundscape";
import {
  PROJECTS,
  MAIN_SERVICES,
  STATS,
  TESTIMONIALS,
  CONTACT_INFO,
  Project,
} from "@/data/projects";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Phone,
  MessageSquare,
  Wrench,
  Calculator,
  FolderKanban,
  Play,
  Layers,
  Star,
  Quote,
  Heart,
  Maximize2,
  Clock,
  ArrowUp,
} from "lucide-react";

// Featured Hero Showcase Slides
const HERO_SLIDES = [
  {
    serviceId: "staircases",
    title: "Sculptural Hardwood Staircases",
    subtitle: "Floating Cantilevered Treads & Hand-Turned Balustrades",
    location: "Karen, Nairobi",
    species: "Solid African Mahogany & Teak",
    timeline: "3 – 6 Weeks",
    image: "/portfolio/project-07.jpg",
    projectId: "proj-07",
    tag: "Master Joinery 01",
  },
  {
    serviceId: "gypsum",
    title: "Architectural Gypsum & Ambient Coves",
    subtitle: "Illuminated Multi-Tier Honeycomb Drop Bulkheads",
    location: "Kitisuru, Nairobi",
    species: "Moisture-Resistant Acoustic Plasterboard & 2700K LED",
    timeline: "2 – 4 Weeks",
    image: "/portfolio/project-29.jpg",
    projectId: "proj-29",
    tag: "Light Architecture 02",
  },
  {
    serviceId: "flooring",
    title: "Mahogany Herringbone Parquet",
    subtitle: "Solid Tongue-and-Groove Hardwood Woodblocks",
    location: "Runda Estate, Nairobi",
    species: "Solid African Mahogany & Polyurethane Matte",
    timeline: "2 – 5 Weeks",
    image: "/portfolio/project-14.jpg",
    projectId: "proj-14",
    tag: "Artisan Flooring 03",
  },
  {
    serviceId: "cabinetry",
    title: "Bespoke Culinary Cabinetry & Dressing Suites",
    subtitle: "Push-Touch Push Drawers & Calacatta Quartz Countertops",
    location: "Lavington, Nairobi",
    species: "Moisture-Resistant MDF & Soft-Close German Hardware",
    timeline: "3 – 6 Weeks",
    image: "/portfolio/project-27.jpg",
    projectId: "proj-27",
    tag: "Custom Joinery 04",
  },
  {
    serviceId: "renovation",
    title: "Turnkey Villa Roofing & Makeovers",
    subtitle: "Multi-Pitch Charcoal Asphalt Shingles & Timber Trusses",
    location: "Muthaiga, Nairobi",
    species: "Treated Green Structural Battens & Waterproof Shingles",
    timeline: "4 – 12 Weeks",
    image: "/portfolio/project-54.jpg",
    projectId: "proj-54",
    tag: "Turnkey Renovation 07",
  },
];

export default function HomePage() {
  const { openBooking, openLookbook } = useBooking();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [isHeroAutoPlaying, setIsHeroAutoPlaying] = useState(true);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Auto-advance hero slides every 5.5 seconds unless hovered
  useEffect(() => {
    if (!isHeroAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isHeroAutoPlaying]);

  // Monitor scroll for floating quick dock
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentHero = HERO_SLIDES[activeHeroIndex];

  const handleSelectHeroSlide = (index: number) => {
    soundscape.playClick();
    setActiveHeroIndex(index);
    setIsHeroAutoPlaying(false);
  };

  const togglePin = (projId: string, projTitle: string) => {
    soundscape.playClick();
    if (pinnedIds.includes(projId)) {
      setPinnedIds(pinnedIds.filter((id) => id !== projId));
      showToast(`Removed "${projTitle}" from Lookbook`);
    } else {
      setPinnedIds([...pinnedIds, projId]);
      showToast(`Added "${projTitle}" to Lookbook!`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const scrollToTop = () => {
    soundscape.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Top 4 Curator's Highlights
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black transition-colors duration-300">
      <CustomCursor />
      <Navbar />

      {/* Reactive Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-stone-900 text-stone-100 dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 dark:text-stone-950" />
          <span>{toastMessage}</span>
          <button
            onClick={openLookbook}
            className="ml-2 underline font-bold hover:opacity-80"
          >
            View
          </button>
        </div>
      )}

      {/* 1. CINEMATIC HERO SECTION WITH REACTIVE MULTI-IMAGE STAGE */}
      <section className="relative pt-32 pb-16 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Atelier Manifesto & Direct CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-600/30 dark:border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs tracking-widest uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Interior & Master Joinery Atelier</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-6xl font-normal leading-[1.08] tracking-tight text-stone-900 dark:text-stone-100">
              Sculpting Wood, Light & Gypsum into{" "}
              <span className="italic font-light text-amber-700 dark:text-amber-300">
                Living Sanctuaries
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-200 font-sans leading-relaxed max-w-xl font-normal">
              Nairobi’s premier atelier for cantilevered wooden staircases, sculptural gypsum drop ceilings, hardwood parquet flooring, culinary cabinetry, and turnkey home renovations.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Link
                href="/services"
                className="px-7 py-3.5 rounded-full bg-stone-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:via-amber-400 dark:to-amber-500 dark:text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10 hover:brightness-105 transition"
              >
                <span>Explore What We Do</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/portfolio"
                className="px-7 py-3.5 rounded-full bg-white dark:bg-stone-900/80 border border-stone-300 dark:border-stone-700 hover:border-amber-500 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <FolderKanban className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Portfolio (54 Works)</span>
              </Link>
            </div>

            {/* Direct Line Hotline */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-sans text-stone-700 dark:text-stone-300">
              <span className="flex items-center gap-1.5 font-medium text-stone-900 dark:text-stone-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Workshop Direct:
              </span>
              <a
                href={CONTACT_INFO.telLink}
                className="font-semibold text-amber-700 dark:text-amber-400 hover:underline font-mono"
              >
                {CONTACT_INFO.phoneDisplay}
              </a>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <a
                href={CONTACT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                WhatsApp Atelier
              </a>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-stone-200 dark:border-stone-800/80">
              {STATS.map((stat, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-amber-200">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: REACTIVE MULTI-IMAGE ARCHITECTURAL STAGE */}
          <div
            className="lg:col-span-6 relative"
            onMouseEnter={() => setIsHeroAutoPlaying(false)}
            onMouseLeave={() => setIsHeroAutoPlaying(true)}
          >
            <div className="relative rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900/60 p-3 shadow-2xl group">
              {/* Main Dynamic Image Display */}
              <div className="relative h-[400px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-950">
                <img
                  key={currentHero.image}
                  src={currentHero.image}
                  alt={currentHero.title}
                  className="w-full h-full object-cover transition-all duration-700 animate-in fade-in zoom-in-95 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-black/30" />

                {/* Top Badge: Discipline & Location */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="backdrop-blur-md bg-stone-950/80 border border-white/10 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-wider text-amber-300 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{currentHero.tag}</span>
                    <span className="text-stone-400">·</span>
                    <span>{currentHero.location}</span>
                  </div>

                  {/* Pin to Lookbook Trigger */}
                  <button
                    onClick={() => togglePin(currentHero.projectId, currentHero.title)}
                    className="p-2.5 rounded-full backdrop-blur-md bg-stone-950/75 border border-white/10 text-white hover:text-amber-400 hover:scale-110 transition shadow-lg"
                    title="Pin this design to Lookbook"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        pinnedIds.includes(currentHero.projectId)
                          ? "fill-amber-400 text-amber-400"
                          : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Bottom Overlay: Title, Specs & Dedicated Page Action */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl backdrop-blur-md bg-stone-950/85 border border-white/10 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-0.5">
                        {currentHero.species}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-white font-medium leading-snug">
                        {currentHero.title}
                      </h3>
                      <p className="text-xs text-stone-300 font-sans mt-1 line-clamp-1">
                        {currentHero.subtitle}
                      </p>
                    </div>

                    <Link
                      href={`/services/${currentHero.serviceId}`}
                      className="p-3 rounded-full bg-amber-400 text-stone-950 hover:bg-amber-300 hover:scale-110 transition shadow-lg shrink-0"
                      title="Open Dedicated Service Page"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      Handover: {currentHero.timeline}
                    </span>
                    <Link
                      href={`/services/${currentHero.serviceId}`}
                      className="text-amber-300 hover:underline flex items-center gap-1 uppercase tracking-wider font-sans font-semibold text-[10px]"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Reactive Interactive Discipline Switcher Tabs */}
              <div className="grid grid-cols-5 gap-2 mt-3 pt-2 border-t border-stone-200/80 dark:border-stone-800">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = activeHeroIndex === idx;
                  return (
                    <button
                      key={slide.serviceId}
                      onClick={() => handleSelectHeroSlide(idx)}
                      className={`p-1.5 rounded-xl text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                        isActive
                          ? "bg-amber-500/15 border border-amber-500/50 shadow-sm"
                          : "hover:bg-stone-100 dark:hover:bg-stone-800/60 border border-transparent"
                      }`}
                    >
                      <div className="relative h-11 w-full rounded-lg overflow-hidden bg-stone-200 dark:bg-stone-800 mb-1">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 border-2 border-amber-500 rounded-lg" />
                        )}
                      </div>
                      <span className="font-mono text-[9px] text-stone-600 dark:text-stone-400 line-clamp-1 block leading-tight font-medium">
                        0{idx + 1} {slide.serviceId}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHAT WE DO (7 CORE SERVICES, EACH WITH ITS OWN PAGE!) */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-2">
              <Wrench className="w-3.5 h-3.5" />
              Turnkey Fabrication & In-House Joinery
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              What We Do · 7 Core Services
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-xl font-sans">
              Every service is executed by our dedicated master joiners and plaster artisans. Select any craft to inspect the dedicated dossier, materials, and price estimator.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition"
          >
            <span>View All Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MAIN_SERVICES.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.id}`}
              className="group p-5 rounded-3xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 hover:border-amber-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-950 mb-4">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-950/75 text-[10px] font-mono text-amber-300">
                    Service {s.number}
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 p-2 rounded-full backdrop-blur-md bg-stone-950/75 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                </div>

                <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 font-sans leading-relaxed line-clamp-2">
                  {s.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] uppercase text-stone-500 dark:text-stone-400">
                  {s.typicalTimeline}
                </span>
                <span className="text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Dossier</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. THE MASTER FASTENER & DRILL RIG: PRECISION DRILLS & SCREWS SHOWCASE */}
      <PrecisionToolsSection />

      {/* 4. 3D SPATIAL LAB & COST ESTIMATOR PROMOS */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 3D Lab Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 via-stone-50 to-white dark:from-amber-950/20 dark:via-stone-900/60 dark:to-stone-950 border border-amber-200/80 dark:border-amber-900/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-800 dark:text-amber-300 text-[10px] uppercase tracking-widest font-semibold mb-3">
                <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                WebGL 60 FPS Engine
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-stone-900 dark:text-stone-100">
                Interactive 3D Spatial Room Visualizer
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2.5 font-sans leading-relaxed">
                Test custom wooden staircases, gypsum ceiling drop wells, and culinary island finishes in full real-time 3D. Features 3 environments, lighting moods, and camera controls.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-sans">Living Salon · Master Suite · Kitchen</span>
              <Link
                href="/3d-lab"
                className="px-5 py-2.5 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition shadow"
              >
                <span>Launch 3D Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Cost Estimator Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[10px] uppercase tracking-widest font-semibold mb-3">
                <Calculator className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                Multi-Currency Calculator
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl text-stone-900 dark:text-stone-100">
                Interactive Project Cost Estimator
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2.5 font-sans leading-relaxed">
                Calculate itemized budgets for wooden flooring, bespoke cabinetry, gypsum ceilings, and full home roofing renovations in KES, USD, GBP, or EUR with exact square footage inputs.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-sans">Includes Finishes & Moodboards</span>
              <Link
                href="/estimator"
                className="px-5 py-2.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:border-amber-500 transition shadow-sm"
              >
                <span>Calculate Cost</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATOR’S HIGHLIGHTS (4 SELECTED PROJECTS WITH PINNING) */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-2">
              <FolderKanban className="w-3.5 h-3.5" />
              Curator’s Spotlight
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              Featured Client Transformations
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-xl font-sans">
              A curated preview from our 54 realized projects across Karen, Runda, Muthaiga, and Westlands.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition"
          >
            <span>Explore All 54 Projects & Video Reels</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((p) => {
            const isPinned = pinnedIds.includes(p.id);
            return (
              <div
                key={p.id}
                className="group rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-[#0C0D10] hover:border-amber-500/50 transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div className="relative h-64 w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-950/75 text-[9px] font-mono text-amber-300">
                    {p.number} · {p.location}
                  </div>

                  <button
                    onClick={() => togglePin(p.id, p.title)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md bg-stone-950/75 text-white hover:text-amber-400 hover:scale-110 transition shadow-lg"
                    title="Pin to Lookbook"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isPinned ? "fill-amber-400 text-amber-400" : ""
                      }`}
                    />
                  </button>

                  <button
                    onClick={() => {
                      soundscape.playClick();
                      setSelectedProject(p);
                    }}
                    className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    title="Inspect Full Image"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-medium block">
                      {p.categoryLabel}
                    </span>
                    <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors mt-0.5 line-clamp-1">
                      {p.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 mt-3 pt-2.5 border-t border-stone-100 dark:border-stone-800/60 font-mono">
                    <span>{p.location}</span>
                    <button
                      onClick={() => {
                        soundscape.playClick();
                        setSelectedProject(p);
                      }}
                      className="text-amber-700 dark:text-amber-400 font-semibold hover:underline"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. ON-SITE VIDEO REELS TEASER */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white dark:bg-stone-900/80 border border-stone-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] uppercase tracking-widest font-semibold mb-2">
              <Play className="w-3 h-3 text-amber-400" />
              Live Workshop & Site Footage
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-100">
              Watch Our Master Artisans at Work
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-2 font-sans leading-relaxed">
              Experience the craftsmanship firsthand. Watch our 4 on-site walkthrough videos capturing floating staircase installation, gypsum cove skimming, and turnkey villa reveals.
            </p>
          </div>

          <Link
            href="/portfolio"
            className="px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg shrink-0 transition"
          >
            <span>Watch 4 On-Site Video Reels</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800/80">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-2">
            <Quote className="w-3.5 h-3.5" />
            Client Testimonials
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
            Client Voices of Enduring Craft
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 rounded-3xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-serif text-base text-stone-800 dark:text-stone-200 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 dark:border-stone-800 mt-6">
                <span className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100 block">
                  {t.author}
                </span>
                <span className="text-[11px] text-stone-500 dark:text-stone-400 font-sans block">
                  {t.role} · {t.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. DIRECT WORKSHOP BANNER */}
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-stone-100 dark:bg-stone-900/60 border border-stone-300 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold block mb-1">
              Ready to Transform Your Living Sanctuary?
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
              Schedule a Free Workshop Consultation
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 font-sans">
              Call our head of joinery directly at <strong className="text-stone-900 dark:text-stone-100">{CONTACT_INFO.phoneDisplay}</strong> or request a comprehensive quotation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={CONTACT_INFO.telLink}
              className="px-6 py-3.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:border-amber-500 transition shadow-sm font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Call: {CONTACT_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => openBooking()}
              className="px-6 py-3.5 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold uppercase tracking-widest hover:brightness-105 transition shadow-lg"
            >
              Request Free Quote
            </button>
          </div>
        </div>
      </section>

      {/* 8. REACTIVE FLOATING QUICK ATELIER DOCK */}
      {showScrollTop && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-full backdrop-blur-2xl bg-white/90 dark:bg-stone-900/90 border border-stone-200/90 dark:border-stone-800/90 shadow-[0_10px_35px_rgba(0,0,0,0.15)] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            onClick={() => openBooking()}
            className="px-4 py-2 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition shadow-sm"
          >
            <span>Book Survey</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          <a
            href={CONTACT_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </a>

          {pinnedIds.length > 0 && (
            <button
              onClick={openLookbook}
              className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold flex items-center gap-1"
            >
              <Heart className="w-3 h-3 fill-amber-500" />
              <span>{pinnedIds.length} Pinned</span>
            </button>
          )}

          <button
            onClick={scrollToTop}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 transition"
            title="Scroll to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Lightbox when clicking a featured project */}
      {selectedProject && (
        <ProjectLightbox
          project={selectedProject}
          projects={PROJECTS}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
        />
      )}

      <Footer />
    </main>
  );
}
