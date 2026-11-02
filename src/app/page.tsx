"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import ServicesSection from "@/components/ServicesSection";
import ThreeRoomViewer from "@/components/ThreeRoomViewer";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectLightbox from "@/components/ProjectLightbox";
import ProjectComparator from "@/components/ProjectComparator";
import MoodboardBuilder from "@/components/MoodboardBuilder";
import LookbookModal from "@/components/LookbookModal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProjectEstimator from "@/components/ProjectEstimator";
import MaterialLibrary from "@/components/MaterialLibrary";
import ConsultationModal from "@/components/ConsultationModal";
import Footer from "@/components/Footer";
import { PROJECTS, STATS, TESTIMONIALS, Project } from "@/data/projects";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Award,
  CheckCircle2,
  Quote,
  Star,
  BookOpen,
  Wrench,
} from "lucide-react";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pinnedProjects, setPinnedProjects] = useState<Project[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [prefilledScope, setPrefilledScope] = useState("");

  const handleOpenBooking = (scope = "") => {
    setPrefilledScope(scope);
    setIsBookingOpen(true);
  };

  const handleTogglePin = (p: Project) => {
    if (pinnedProjects.some((item) => item.id === p.id)) {
      setPinnedProjects(pinnedProjects.filter((item) => item.id !== p.id));
    } else {
      if (pinnedProjects.length < 3) {
        setPinnedProjects([...pinnedProjects, p]);
      }
    }
  };

  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black transition-colors duration-300">
      {/* Luxury Custom Magnetic Cursor */}
      <CustomCursor />

      {/* Sticky Luxury Navbar with Ambient Soundscape & Theme Switcher */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenLookbook={() => setIsLookbookOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Ambient Warm Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-400/10 dark:bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Typography */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] uppercase tracking-widest font-medium shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Artisan Joinery, Gypsum & Home Renovation</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-stone-900 dark:text-stone-100 font-normal tracking-tight">
              Master Carpentry, Gypsum Ceilings & <span className="italic text-amber-600 dark:text-amber-300">Turnkey Renovation</span>.
            </h1>

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 max-w-xl font-sans leading-relaxed font-light">
              We specialize in custom **wooden staircases**, **gypsum designing and installation**, **wooden flooring**, **kitchen cabinets & wardrobes**, **TV stands & media walls**, **door & frame fitting**, and **roofing & home renovations** across Nairobi and East Africa.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#services"
                className="px-8 py-4 rounded-full bg-stone-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:via-amber-400 dark:to-amber-500 dark:text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-stone-900/10 dark:shadow-amber-500/20 hover:brightness-105 transition"
              >
                <span>Explore 7 Core Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#portfolio"
                className="px-8 py-4 rounded-full bg-white dark:bg-stone-900/80 border border-stone-300 dark:border-stone-700/80 hover:border-amber-500 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition shadow-sm"
              >
                <span>View 54 Client Works & Reels</span>
              </a>
            </div>

            {/* Direct Line Badge */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-sans text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-1.5 font-medium text-stone-800 dark:text-stone-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Direct Atelier Workshop:
              </span>
              <a href="tel:+254728541775" className="font-semibold text-amber-700 dark:text-amber-400 hover:underline">
                0728 541 775
              </a>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <a
                href="https://wa.me/254728541775?text=Hello%20AURA%20%26%20NOIR%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Studio Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-stone-200 dark:border-stone-800/80">
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

          {/* Hero Featured Composition Card */}
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

      {/* Dedicated Services Section (The Client's 7 Main Disciplines) */}
      <ServicesSection
        onSelectService={(serviceTitle) => handleOpenBooking(`Quotation for ${serviceTitle}`)}
      />

      {/* Interactive 3D Spatial Lab Section (Multi-Room + 30s Guided Tour) */}
      <section id="3d-lab" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Three.js Real-Time Experience
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
              The 3D Spatial Room Visualizer
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-xl font-sans">
              Interact with custom joinery, gypsum ceilings, and island cabinetry in real-time 3D. Switch rooms, test lighting moods, orbit 360°, and take a 30-second guided architectural tour.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-stone-500 font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>WebGL 60 FPS Engine · 3 Rooms · 360° Freedom</span>
          </div>
        </div>

        <ThreeRoomViewer />
      </section>

      {/* Featured Works Highlights Row */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-stone-200 dark:border-stone-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold">
              Curator’s Selection
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLookbookOpen(true)}
              className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-300 hover:text-amber-800 transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Download Monograph (PDF)</span>
            </button>
            <a
              href="#portfolio"
              className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-300 transition flex items-center gap-1"
            >
              <span>View All 54 Works & Reels</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
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
                <span className="text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-medium block">
                  {p.categoryLabel}
                </span>
                <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-200 transition-colors mt-0.5">
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

      {/* Complete Filterable Portfolio Gallery (54 Client Works & Reels) */}
      <ProjectGallery
        projects={PROJECTS}
        onSelectProject={(p) => setSelectedProject(p)}
        pinnedIds={pinnedProjects.map((p) => p.id)}
        onTogglePin={handleTogglePin}
      />

      {/* Before & After Interactive Slider */}
      <BeforeAfterSlider />

      {/* Interactive Virtual Moodboard Builder */}
      <MoodboardBuilder
        onAttachMoodboard={(summary) => handleOpenBooking(summary)}
      />

      {/* Our 4-Pillar Architectural Philosophy */}
      <section id="philosophy" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            Studio Methodology
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
            The 4-Pillar Architectural Blueprint
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 font-sans">
            A methodical bespoke journey designed to eliminate guesswork and deliver flawless turnkey execution from structural conception to the final placed art monograph.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              number: "01",
              title: "Spatial Audit & Discovery",
              subtitle: "Site Analysis & Vision Mapping",
              desc: "We analyze structural sightlines, daylight ingress patterns, acoustics, and daily family rituals to sculpt an optimized architectural masterplan.",
            },
            {
              number: "02",
              title: "3D Pre-Visualization",
              subtitle: "Virtual Reality & Renderings",
              desc: "Photorealistic 3D visualization and real-time lighting simulations allow you to step inside your future sanctuary before any hammer is lifted.",
            },
            {
              number: "03",
              title: "Bespoke Joinery & Sourcing",
              subtitle: "Quarry & Foundry Fabrication",
              desc: "Direct sourcing of Italian Calacatta marble, German hardware, and handcrafted African hardwood tambour panels crafted in our private atelier.",
            },
            {
              number: "04",
              title: "White-Glove Turnkey Handover",
              subtitle: "Zero-Stress Flawless Execution",
              desc: "Complete project management, MEP integration, acoustic tuning, art hanging, scent design, and turnkey handover ready for immediate living.",
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-[#0C0D10] border border-stone-200 dark:border-stone-800/80 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm dark:shadow-xl"
            >
              <div>
                <span className="font-mono text-3xl text-amber-600/40 dark:text-amber-400/50 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors block mb-6">
                  {pillar.number}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 block mb-1">
                  {pillar.subtitle}
                </span>
                <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100 font-medium mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-sans font-light">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-2 text-[11px] text-amber-700 dark:text-amber-300/80 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Bespoke Milestone</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Multi-Currency Project Estimator */}
      <ProjectEstimator
        onBookWithEstimate={(scope) => handleOpenBooking(scope)}
      />

      {/* Materiality & Finishes Library */}
      <MaterialLibrary />

      {/* Client Testimonials & Endorsements */}
      <section id="testimonials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-2">
            <Quote className="w-3.5 h-3.5" />
            Client Praise & Press
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
            Endorsements from Discerning Homeowners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl bg-white dark:bg-[#0C0D10] border border-stone-200 dark:border-stone-800/80 flex flex-col justify-between shadow-sm dark:shadow-xl relative overflow-hidden group hover:border-amber-500/40 transition"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="font-serif text-base text-stone-700 dark:text-stone-200 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80">
                <h4 className="font-sans text-xs font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                  {t.author}
                </h4>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  {t.role} · {t.location}
                </div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400/90 font-mono mt-1">
                  Project: {t.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-stone-200 dark:border-amber-500/30 bg-stone-900 text-white p-8 md:p-16 text-center shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
              Start Your Carpentry or Renovation Project
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight">
              Ready to Upgrade Your Living Space?
            </h2>
            <p className="text-sm text-stone-300 font-sans font-light leading-relaxed">
              From floating wooden staircases and custom gypsum ceilings to full kitchen cabinetry, door fitting, and roofing—our workshop team is ready to deliver flawless craftsmanship.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:brightness-105 transition"
              >
                <span>Request Project Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsLookbookOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-800 border border-stone-700 text-stone-200 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-amber-400/50 transition"
              >
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>View Lookbook (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal with 2D Blueprint */}
      <ProjectLightbox
        project={selectedProject}
        projects={PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
        onBookProject={(title) => handleOpenBooking(`Inquiry on ${title}`)}
      />

      {/* Side-by-Side Project Comparator */}
      <ProjectComparator
        pinnedProjects={pinnedProjects}
        onRemoveProject={(id) => setPinnedProjects(pinnedProjects.filter((p) => p.id !== id))}
        onClearAll={() => setPinnedProjects([])}
        onBookProject={(title) => handleOpenBooking(`Comparison inquiry on ${title}`)}
      />

      {/* 2026 Atelier Monograph Lookbook Modal */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        onOpenBooking={() => handleOpenBooking("Lookbook Package Inquiry")}
      />

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefilledScope={prefilledScope}
      />

      {/* Studio Footer */}
      <Footer />
    </main>
  );
}
