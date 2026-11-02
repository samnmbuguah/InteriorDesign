"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ProjectLightbox from "@/components/ProjectLightbox";
import { useBooking } from "@/context/BookingContext";
import { PROJECTS, MAIN_SERVICES, STATS, TESTIMONIALS, CONTACT_INFO, WORKSHOP_REELS, Project } from "@/data/projects";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Phone,
  MessageSquare,
  Wrench,
  Calculator,
  FolderKanban,
  Play,
  Layers,
  Star,
  Quote,
} from "lucide-react";

export default function HomePage() {
  const { openBooking, openLookbook } = useBooking();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Top 4 Curator's Highlights
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black transition-colors duration-300">
      <CustomCursor />
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-600/30 dark:border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs tracking-widest uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Interior & Master Joinery Atelier</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight text-stone-900 dark:text-stone-100">
              Sculpting Wood, Light & Gypsum into{" "}
              <span className="italic font-light text-amber-700 dark:text-amber-300">
                Timeless Sanctuaries
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 font-sans leading-relaxed max-w-xl">
              Nairobi’s premier studio for floating wooden staircases, sculptural gypsum drop ceilings, hardwood parquet flooring, culinary cabinetry, and turnkey home renovations.
            </p>

            {/* CTAs & Direct Workshop Line */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/services"
                className="px-8 py-4 rounded-full bg-stone-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:via-amber-400 dark:to-amber-500 dark:text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-stone-900/10 dark:shadow-amber-500/20 hover:brightness-105 transition"
              >
                <span>Explore 7 Core Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/portfolio"
                className="px-8 py-4 rounded-full bg-white dark:bg-stone-900/80 border border-stone-300 dark:border-stone-700/80 hover:border-amber-500 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <FolderKanban className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Portfolio (54 Works)</span>
              </Link>
            </div>

            {/* Direct Line Badge */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-sans text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-1.5 font-medium text-stone-800 dark:text-stone-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Direct Atelier Workshop:
              </span>
              <a
                href={CONTACT_INFO.telLink}
                className="font-semibold text-amber-700 dark:text-amber-400 hover:underline"
              >
                {CONTACT_INFO.phoneDisplay}
              </a>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <a
                href={CONTACT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                WhatsApp Available
              </a>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-stone-200 dark:border-stone-800/80">
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

          {/* Hero Featured Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-stone-900/40 p-3 shadow-xl dark:shadow-2xl group">
              <div className="relative h-[440px] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-950">
                <img
                  src="/portfolio/project-19.jpg"
                  alt="AURA & NOIR Floating Hardwood Staircase"
                  className="w-full h-full object-cover transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                <div className="absolute top-4 left-4 backdrop-blur-md bg-stone-950/75 border border-white/10 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-wider text-amber-300 font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Hardwood Staircase & Balustrades
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-300 block">
                      Master Craft 01
                    </span>
                    <h3 className="font-serif text-xl text-white font-medium">
                      Floating Hardwood Staircases
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedProject(PROJECTS[18])}
                    className="p-3 rounded-full bg-amber-400 text-stone-950 hover:scale-110 transition shadow-lg"
                    title="Inspect Project"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 7 SPECIALIZED DISCIPLINES AT A GLANCE */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-2">
              <Wrench className="w-3.5 h-3.5" />
              Expertise & Turnkey Fabrication
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              Our 7 Specialized Disciplines
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-xl font-sans">
              Precision carpentry, architectural gypsum plastering, and turnkey home renovations delivered by in-house master artisans.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 transition"
          >
            <span>View Full Specifications & Timelines</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MAIN_SERVICES.map((s) => (
            <div
              key={s.id}
              className="group p-5 rounded-2xl bg-white dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800/80 hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-950 mb-4">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full backdrop-blur-md bg-stone-950/70 text-[10px] font-mono text-amber-300">
                    {s.number}
                  </div>
                </div>
                <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 font-sans leading-relaxed line-clamp-2">
                  {s.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  {s.typicalTimeline}
                </span>
                <Link
                  href="/services"
                  className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. 3D SPATIAL LAB & COST ESTIMATOR PROMOS */}
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
                Test custom wooden staircases, gypsum ceiling drop wells, and culinary island finishes in full real-time 3D. Features 3 environments, lighting moods, and a 30-second guided tour.
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

      {/* 4. CURATOR’S HIGHLIGHTS (4 SELECTED PROJECTS) */}
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
              A curated preview from our 54 realized projects across Nairobi, Karen, Muthaiga, and Westlands.
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
          {featuredProjects.map((p) => (
            <div
              key={p.id}
              data-cursor="explore"
              onClick={() => setSelectedProject(p)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800/80 bg-white dark:bg-[#0C0D10] hover:border-amber-500/50 transition-all duration-300 shadow-sm"
            >
              <div className="relative h-60 w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full backdrop-blur-md bg-stone-950/75 text-[9px] font-mono text-amber-300">
                  {p.number}
                </div>
              </div>
              <div className="p-4">
                <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-medium block">
                  {p.categoryLabel}
                </span>
                <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-200 transition-colors mt-0.5 line-clamp-1">
                  {p.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 mt-2 pt-2 border-t border-stone-100 dark:border-stone-800/60 font-mono">
                  <span>{p.location}</span>
                  <span>{p.completionTime}</span>
                </div>
              </div>
            </div>
          ))}
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
              Experience the craftsmanship firsthand. Watch our 4 on-site walkthrough videos capturing floating staircase installation, gypsum cove skimming, and turnkey kitchen reveals.
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
              className="px-6 py-3.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:border-amber-500 transition shadow-sm"
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
