"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ThreeRoomViewer from "@/components/ThreeRoomViewer";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectLightbox from "@/components/ProjectLightbox";
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
  Layers,
  Award,
  Eye,
  CheckCircle2,
  Quote,
  Star,
  Maximize2,
} from "lucide-react";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [prefilledScope, setPrefilledScope] = useState("");

  const handleOpenBooking = (scope = "") => {
    setPrefilledScope(scope);
    setIsBookingOpen(true);
  };

  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 4);

  return (
    <main className="min-h-screen bg-[#090A0B] text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black">
      {/* Sticky Luxury Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Hero Section */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Typography */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/30 text-amber-300 text-[11px] uppercase tracking-widest font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Interior Architecture & Bespoke Millwork</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.08] text-stone-100 font-normal tracking-tight">
              Sculpting Light, Space & <span className="italic text-amber-300">Materiality</span>.
            </h1>

            <p className="text-sm sm:text-base text-stone-400 max-w-xl font-sans leading-relaxed font-light">
              An award-winning interior architecture atelier crafting bespoke residential havens and executive environments across Nairobi and East Africa. Designed with quiet luxury, organic geometry, and tailored sensory comfort.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#portfolio"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:brightness-105 transition"
              >
                <span>Explore 37 Portfolio Works</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#3d-lab"
                className="px-8 py-4 rounded-full bg-stone-900/80 border border-stone-700/80 hover:border-amber-400/50 text-stone-200 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Launch 3D Spatial Lab</span>
              </a>
            </div>

            {/* Studio Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-stone-800/80">
              {STATS.map((stat, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="font-serif text-2xl sm:text-3xl font-normal text-amber-200">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-400 font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Featured Composition Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-stone-800/80 bg-stone-900/40 p-3 shadow-2xl group">
              <div className="relative h-[440px] w-full rounded-2xl overflow-hidden bg-stone-950">
                <img
                  src="/portfolio/project-31.jpg"
                  alt="AURA & NOIR Featured Living Salon"
                  className="w-full h-full object-cover transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Floating Architectural Badge */}
                <div className="absolute top-4 left-4 backdrop-blur-md bg-stone-950/70 border border-white/10 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-wider text-amber-300 font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  Karen Villa Grand Salon · 2026
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-stone-400 block">
                      Turnkey Masterpiece
                    </span>
                    <h3 className="font-serif text-xl text-stone-100 font-medium">
                      The Grand Reception Lounge
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedProject(PROJECTS[30])}
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

      {/* Interactive 3D Spatial Lab Section */}
      <section id="3d-lab" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Three.js Real-Time Experience
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-100 font-normal leading-tight">
              The 3D Spatial Room Visualizer
            </h2>
            <p className="text-sm text-stone-400 mt-2 max-w-xl font-sans">
              Interact with our virtual architectural salon in real-time 3D. Orbit 360°, inspect custom millwork joinery hotspots, customize material finishes, and simulate natural sun paths from dawn to twilight.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-stone-400 font-sans">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>WebGL 60 FPS Engine · Full 360° Freedom</span>
          </div>
        </div>

        {/* 3D Canvas Component */}
        <ThreeRoomViewer />
      </section>

      {/* Featured Works Highlights Row */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-stone-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Curator’s Selection
            </span>
          </div>
          <a
            href="#portfolio"
            className="text-xs uppercase tracking-widest text-stone-400 hover:text-amber-300 transition flex items-center gap-1"
          >
            <span>View All 37 Works</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProject(p)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-stone-800/80 bg-[#0C0D10] hover:border-amber-400/50 transition-all duration-300"
            >
              <div className="relative h-60 w-full overflow-hidden bg-stone-950">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full backdrop-blur-md bg-stone-950/70 border border-white/10 text-[9px] font-mono text-amber-300">
                  {p.number}
                </div>
              </div>
              <div className="p-4">
                <span className="text-[10px] uppercase tracking-wider text-amber-400 font-medium block">
                  {p.location}
                </span>
                <h4 className="font-serif text-base text-stone-100 group-hover:text-amber-200 transition-colors mt-0.5">
                  {p.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-stone-400 mt-2 pt-2 border-t border-stone-800/60 font-mono">
                  <span>{p.area}</span>
                  <span>{p.completionTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complete Filterable Portfolio Gallery (All 37 Client Works) */}
      <ProjectGallery
        projects={PROJECTS}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Before & After Interactive Slider */}
      <BeforeAfterSlider />

      {/* Our 4-Pillar Architectural Philosophy */}
      <section id="philosophy" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            Studio Methodology
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-100 font-normal leading-tight">
            The 4-Pillar Architectural Blueprint
          </h2>
          <p className="text-sm text-stone-400 mt-2 font-sans">
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
              className="p-8 rounded-3xl bg-[#0C0D10] border border-stone-800/80 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
            >
              <div>
                <span className="font-mono text-3xl text-amber-400/50 group-hover:text-amber-300 transition-colors block mb-6">
                  {pillar.number}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block mb-1">
                  {pillar.subtitle}
                </span>
                <h3 className="font-serif text-xl text-stone-100 font-medium mb-3">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed font-sans font-light">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800/80 flex items-center gap-2 text-[11px] text-amber-300/80 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Bespoke Milestone</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Project Estimator */}
      <ProjectEstimator
        onBookWithEstimate={(scope) => handleOpenBooking(scope)}
      />

      {/* Materiality & Finishes Library */}
      <MaterialLibrary />

      {/* Client Testimonials & Endorsements */}
      <section id="testimonials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            <Quote className="w-3.5 h-3.5" />
            Client Praise & Press
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-100 font-normal leading-tight">
            Endorsements from Discerning Homeowners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 rounded-3xl bg-[#0C0D10] border border-stone-800/80 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-amber-400/40 transition"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="font-serif text-base text-stone-200 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80">
                <h4 className="font-sans text-xs font-semibold text-stone-100 uppercase tracking-wider">
                  {t.author}
                </h4>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  {t.role} · {t.location}
                </div>
                <div className="text-[10px] text-amber-400/90 font-mono mt-1">
                  Project: {t.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dramatic Full-Bleed Call to Action Banner */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-stone-900 via-[#111216] to-stone-900 p-8 md:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block">
              Begin Your Architectural Journey
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-stone-100 font-normal leading-tight">
              Ready to Craft a Living Sanctuary?
            </h2>
            <p className="text-sm text-stone-300 font-sans font-light leading-relaxed">
              Whether you are embarking on a ground-up villa build in Karen or transforming a high-rise penthouse in Westlands, our atelier is ready to bring timeless materiality into your life.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleOpenBooking()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 hover:brightness-105 transition"
              >
                <span>Schedule Private Atelier Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/254700000000?text=Hello%20AURA%20%26%20NOIR%2C%20I%20would%20like%20to%20inquire%20about%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-900 border border-stone-700 text-stone-200 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:border-amber-400/50 transition"
              >
                <span>Direct WhatsApp Inquiry</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <ProjectLightbox
        project={selectedProject}
        projects={PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
        onBookProject={(title) => handleOpenBooking(`Inquiry on ${title}`)}
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
