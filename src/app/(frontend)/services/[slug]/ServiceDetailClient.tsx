"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ProjectLightbox from "@/components/ProjectLightbox";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { useBooking } from "@/context/BookingContext";
import { soundscape } from "@/utils/soundscape";
import { ServiceItem, Project, VideoReel, CONTACT_INFO } from "@/data/projects";
import {
  Sparkles,
  ShieldCheck,
  Clock,
  Phone,
  MessageSquare,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Play,
  Layers,
  Maximize2,
  Heart,
  Calculator,
  Compass,
  Award,
  ChevronDown,
  Wrench,
  Cpu,
  FileCheck2,
  Quote,
  Check,
} from "lucide-react";

interface ServiceDetailClientProps {
  service: ServiceItem;
  relatedProjects: Project[];
  relatedReels: VideoReel[];
  otherServices: ServiceItem[];
}

export default function ServiceDetailClient({
  service,
  relatedProjects,
  relatedReels,
  otherServices,
}: ServiceDetailClientProps) {
  const { openBooking, openLookbook } = useBooking();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Estimator State tailored to this specific discipline
  const [unitCount, setUnitCount] = useState<number>(service.defaultUnitCount || 15);
  const [materialTier, setMaterialTier] = useState<"standard" | "premium" | "masterpiece">("premium");
  const [addonIncluded, setAddonIncluded] = useState<boolean>(true);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const togglePin = (projId: string, projTitle: string) => {
    soundscape.playClick();
    if (pinnedIds.includes(projId)) {
      setPinnedIds(pinnedIds.filter((id) => id !== projId));
      showToast(`Removed "${projTitle}" from Lookbook`);
    } else {
      setPinnedIds([...pinnedIds, projId]);
      showToast(`Added "${projTitle}" to your Lookbook!`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleFaq = (index: number) => {
    soundscape.playClick();
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Calculate live dynamic estimate for this discipline
  const baseRate = service.baseRatePerUnit || 25000;
  const multiplier = materialTier === "standard" ? 0.85 : materialTier === "premium" ? 1.0 : 1.35;
  const addonCost = addonIncluded ? 28000 : 0;
  const estimatedCostKES = Math.round(unitCount * baseRate * multiplier + addonCost);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#18191B] dark:bg-[#090A0B] dark:text-[#F4EFE6] selection:bg-[#D4AF37] selection:text-black transition-colors duration-300 font-sans">
      <CustomCursor />
      <Navbar />

      {/* Reactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-stone-900 text-stone-100 dark:bg-amber-400 dark:text-stone-950 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400 dark:text-stone-950" />
          <span>{toastMessage}</span>
          <button
            onClick={openLookbook}
            className="ml-2 underline font-bold hover:opacity-80"
          >
            View Lookbook
          </button>
        </div>
      )}

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative pt-32 pb-16 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 mb-6">
          <Link href="/" className="hover:text-amber-600 transition">
            Atelier
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-amber-600 transition">
            Services
          </Link>
          <span>/</span>
          <span className="text-amber-700 dark:text-amber-400 font-semibold">
            {service.title}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs tracking-widest uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Discipline {service.number} of 07 · In-House Workshop Craft
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-stone-900 dark:text-stone-100 leading-[1.12]">
              {service.title}
            </h1>

            {service.tagline && (
              <p className="font-serif italic text-lg sm:text-xl text-amber-800 dark:text-amber-300/90 font-light">
                {service.tagline}
              </p>
            )}

            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed font-sans max-w-2xl font-light">
              {service.description}
            </p>

            {/* Quick Spec Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Handover: {service.typicalTimeline}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                10-Year Craft Guarantee
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Nairobi, Karen, Runda & East Africa
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
              <button
                onClick={() => openBooking(`Custom Quotation: ${service.title}`)}
                className="px-8 py-4 rounded-full bg-stone-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-400 dark:text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/10 hover:brightness-105 transition active:scale-95"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(
                  `Hello AURA & NOIR, I would like to inquire about your ${service.title} service and schedule an on-site survey.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Atelier</span>
              </a>

              <a
                href={CONTACT_INFO.telLink}
                className="px-5 py-4 rounded-full border border-stone-300 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:border-amber-500 transition shadow-sm font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Cinematic Photography Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 p-3 shadow-2xl group">
              <div className="relative h-[380px] sm:h-[460px] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-950">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />

                {/* Floating Discipline Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full backdrop-blur-md bg-stone-950/80 border border-white/10 text-[11px] font-mono text-amber-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Workshop Discipline {service.number}</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-stone-950/80 border border-white/10 text-white">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-0.5">
                    Authentic Nairobi Project Installation
                  </span>
                  <h4 className="font-serif text-lg font-normal text-stone-100">
                    {service.title}
                  </h4>
                  <p className="text-xs text-stone-300 font-sans mt-1 line-clamp-1 font-light">
                    {service.shortDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IN-DEPTH ARCHITECTURAL DOSSIER OVERVIEW */}
      {service.detailedOverview && service.detailedOverview.length > 0 && (
        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2 mb-2">
                <FileCheck2 className="w-3.5 h-3.5" />
                Architectural Standards Dossier
              </span>
              <h2 className="font-serif text-3xl text-stone-900 dark:text-stone-100 font-normal leading-tight">
                Engineering, Geometry & Precision
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-2">
                How our master joiners and site engineers execute {service.title.toLowerCase()} to European architectural tolerances.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-4 text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed font-sans font-light">
              {service.detailedOverview.map((paragraph, idx) => (
                <p key={idx} className="p-5 rounded-2xl bg-white dark:bg-[#0D0E12] border border-stone-200 dark:border-stone-800 shadow-sm">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. 5-PHASE ARCHITECTURAL WORKFLOW TIMELINE */}
      {service.workflowSteps && service.workflowSteps.length > 0 && (
        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2 mb-2">
              <Clock className="w-3.5 h-3.5" />
              Guaranteed Execution Workflow
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
              From Laser Survey to 10-Year Handover
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 font-sans">
              Our 5-phase delivery protocol ensures absolute clarity on timelines, structural quality controls, and client approvals at every milestone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {service.workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white dark:bg-[#0D0E12] border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between hover:border-amber-500/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 dark:text-amber-300">
                      Phase {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="font-serif text-base text-stone-900 dark:text-stone-100 font-medium group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 font-sans font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {step.deliverables && step.deliverables.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800/80">
                    <span className="text-[9px] uppercase tracking-widest text-amber-700 dark:text-amber-400 font-mono font-semibold block mb-1.5">
                      Deliverables:
                    </span>
                    <ul className="space-y-1">
                      {step.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="text-[11px] text-stone-600 dark:text-stone-300 flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. TECHNICAL SPECIFICATION MATRIX & DRILL PROTOCOLS */}
      {service.technicalSpecs && (
        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2 mb-2">
              <Cpu className="w-3.5 h-3.5" />
              Technical Engineering Data Sheet
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
              Hardware, Chemical & Structural Ratings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D0E12] border border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-1">
                Structural Fasteners
              </span>
              <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mb-1">
                Fastening & Anchoring Protocol
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                {service.technicalSpecs.fasteningProtocol}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D0E12] border border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-1">
                Material Chemistry
              </span>
              <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mb-1">
                Kiln Moisture & Preservation
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                {service.technicalSpecs.moistureStandard}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D0E12] border border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-1">
                Structural Engineering
              </span>
              <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mb-1">
                Load & Deflection Tolerance
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                {service.technicalSpecs.loadTolerance}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D0E12] border border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-1">
                Protective Surface
              </span>
              <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mb-1">
                Finishing Chemistry & Sealants
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                {service.technicalSpecs.finishingChemistry}
              </p>
            </div>

            {service.technicalSpecs.acousticRating && (
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0D0E12] border border-stone-200 dark:border-stone-800">
                <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-1">
                  Acoustic Dampening
                </span>
                <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mb-1">
                  Sound Isolation Rating
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                  {service.technicalSpecs.acousticRating}
                </p>
              </div>
            )}

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D0E12] border border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-1">
                Longevity & Guarantee
              </span>
              <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mb-1">
                Maintenance Lifecycle
              </h4>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                {service.technicalSpecs.maintenanceLife}
              </p>
            </div>
          </div>

          {/* Drill Rig & Fasteners Highlight Banner */}
          <div className="mt-8 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0D0E12] p-6 sm:p-8 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative">
                <div className="relative h-60 sm:h-72 w-full rounded-2xl overflow-hidden bg-stone-950">
                  <img
                    src="/portfolio/drill-fastener-workshop.jpg"
                    alt="Precision Drills and Architectural Screws"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl backdrop-blur-md bg-stone-950/80 border border-white/10 text-white">
                    <span className="text-[9px] uppercase font-mono text-amber-300 tracking-wider block">
                      Fastening Standard
                    </span>
                    <span className="text-xs font-serif text-stone-100">
                      High-Torque Driver Calibration & Torx Star Fasteners
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-amber-700 dark:text-amber-400 font-semibold block mb-1">
                    Zero-Squeak Joint Guarantee
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl text-stone-900 dark:text-stone-100 font-normal">
                    Precision Pre-Drill & High-Torque Screw Rig
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-sans leading-relaxed mt-2">
                    We discard nails and soft slotted screws. Every structural joint in this discipline is secured with calibrated brushless 18V drivers, carbide-tipped stepped pilot bits, and corrosion-resistant Torx architectural screws that eliminate squeaks, drift, and structural loosening.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                    <span className="text-[10px] font-mono text-stone-500 uppercase block">
                      Stepped Pilot Protocol
                    </span>
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-0.5 block">
                      Countersunk Pilot Holes
                    </span>
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      Prevents grain splitting in kiln-dried African hardwood.
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
                    <span className="text-[10px] font-mono text-stone-500 uppercase block">
                      Drive Geometry
                    </span>
                    <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 mt-0.5 block">
                      Deep Star Torx Bit
                    </span>
                    <span className="text-[11px] text-stone-500 mt-1 block">
                      Zero cam-out slippage with 3x higher clamping force.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. CRAFT DELIVERABLES & MATERIALS SPECIFICATIONS */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Scope of Delivery & Architectural Standards
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 mb-4">
              What We Deliver
            </h3>
            <div className="space-y-3">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#0D0E12] border border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-800 dark:text-stone-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2 mb-2">
              <Award className="w-3.5 h-3.5" />
              Master Materials & Hardware
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100 mb-4">
              Certified Workshop Materials
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.materialsUsed.map((mat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-[#0D0E12] border border-stone-200 dark:border-stone-800 flex flex-col justify-between"
                >
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                    Material Grade 0{idx + 1}
                  </span>
                  <h4 className="font-serif text-base text-stone-900 dark:text-stone-100 mt-1">
                    {mat}
                  </h4>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                    Kiln-dried, moisture tested & termite treated for Kenyan climate stability.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. REELS SECTION (If videos exist for this craft) */}
      {relatedReels.length > 0 && (
        <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2 mb-2">
              <Play className="w-3.5 h-3.5" />
              On-Site Craftsmanship Reel
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 dark:text-stone-100">
              Watch Our Master Artisans at Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedReels.map((reel) => (
              <div
                key={reel.id}
                className="rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0D0E12] p-4 shadow-lg overflow-hidden flex flex-col justify-between"
              >
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video sm:aspect-auto sm:h-72 mb-4">
                  <video
                    src={reel.videoSrc}
                    poster={reel.posterSrc}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-1">
                    <span>{reel.categoryLabel}</span>
                    <span>Duration: {reel.duration}</span>
                  </div>
                  <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 font-medium">
                    {reel.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 font-sans font-light">
                    {reel.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. DEDICATED REAL PROJECT IMAGERY GALLERY */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              Verified Nairobi Works ({relatedProjects.length} Architectural Projects)
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
              Featured {service.title} Installations
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 max-w-xl font-sans">
              Every photograph is from real residential and commercial installations crafted by our in-house joinery & finishes atelier across Karen, Runda, Muthaiga, Kitisuru, and Westlands.
            </p>
          </div>

          <button
            onClick={openLookbook}
            className="px-5 py-2.5 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center gap-2 hover:border-amber-500 transition shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Lookbook ({pinnedIds.length} Pinned)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProjects.map((proj) => {
            const isPinned = pinnedIds.includes(proj.id);
            return (
              <div
                key={proj.id}
                className="group rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0D0E12] transition-all hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-md bg-stone-950/75 border border-white/10 text-[10px] font-mono text-amber-300">
                    {proj.number} · {proj.location}
                  </div>

                  {/* Pin to Lookbook Button */}
                  <button
                    onClick={() => togglePin(proj.id, proj.title)}
                    className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md ${
                      isPinned
                        ? "bg-amber-500 text-stone-950 scale-110"
                        : "bg-stone-950/70 text-white hover:bg-stone-900 hover:text-amber-400"
                    }`}
                    title={isPinned ? "Remove from Lookbook" : "Pin to Lookbook"}
                  >
                    <Heart
                      className={`w-4 h-4 ${isPinned ? "fill-current" : ""}`}
                    />
                  </button>

                  {/* Quick Expand Button */}
                  <button
                    onClick={() => {
                      soundscape.playClick();
                      setSelectedProject(proj);
                    }}
                    className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-110"
                    title="View Full Resolution"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 uppercase tracking-widest block mb-1">
                      {proj.craftStage} · {proj.year}
                    </span>
                    <h3 className="font-serif text-lg text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 line-clamp-2 font-sans font-light">
                      {proj.subtitle || proj.description}
                    </p>
                  </div>

                  {/* Materials & Action */}
                  <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-stone-500 truncate max-w-[180px]">
                      {proj.scope}
                    </span>
                    <button
                      onClick={() => {
                        soundscape.playClick();
                        setSelectedProject(proj);
                      }}
                      className="text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. BEFORE & AFTER TRANSFORMATION SHOWCASE */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-2xl mb-10">
          <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Craftsmanship Comparison
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 dark:text-stone-100">
            From Raw On-Site Framework to Hand-Finished Elegance
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 font-sans">
            Slide horizontally to experience the precision difference between raw structural concrete/studs and our completed bespoke hardwood & gypsum installations.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 p-4 shadow-xl">
          <BeforeAfterSlider />
        </div>
      </section>

      {/* 9. REACTIVE DISCIPLINE COST & SCOPE ESTIMATOR */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2">
              <Calculator className="w-3.5 h-3.5" />
              Interactive Scope & Price Modeler
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
              Instant Workshop Estimate for {service.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-sans leading-relaxed">
              Adjust the scale in {service.unitName || "units"}, select timber/material grade, and toggle architectural options to calculate realistic turnkey investment benchmarks in Kenyan Shillings.
            </p>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-200 space-y-1">
              <p className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Includes complimentary laser measurement & 3D joinery rendering across Nairobi.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0D0E12] p-6 sm:p-8 shadow-xl">
            {/* Slider: Units/Treads/Meters */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Scope Scale: {unitCount} {service.unitName || "Units"}
                </span>
                <span className="font-mono text-amber-700 dark:text-amber-400 text-sm">
                  {unitCount} {service.unitName || "Units"}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max={service.defaultUnitCount ? Math.max(service.defaultUnitCount * 3, 50) : 60}
                value={unitCount}
                onChange={(e) => {
                  soundscape.playClick();
                  setUnitCount(Number(e.target.value));
                }}
                className="w-full accent-amber-600 dark:accent-amber-400 cursor-pointer h-2 bg-stone-200 dark:bg-stone-800 rounded-lg"
              />
            </div>

            {/* Material Grade Selection */}
            <div className="space-y-2 mb-6">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Material & Hardware Grade
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "standard", label: "Standard Hardwood / Spec" },
                  { id: "premium", label: "Selected Mahogany & Teak" },
                  { id: "masterpiece", label: "Grand Architectural Oak" },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => {
                      soundscape.playClick();
                      setMaterialTier(tier.id as any);
                    }}
                    className={`p-3 rounded-2xl border text-xs font-medium text-center transition-all ${
                      materialTier === tier.id
                        ? "bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-bold border-amber-500 shadow-md"
                        : "bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400/50"
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Treatment Add-On Option */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 mb-6">
              <div className="text-xs">
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">
                  Concealed Architectural LED Channel / Acoustic Isolation Package
                </span>
                <span className="text-[11px] text-stone-500">
                  Dimmable warm 2700K illumination & anti-vibration damping barrier
                </span>
              </div>
              <input
                type="checkbox"
                checked={addonIncluded}
                onChange={(e) => {
                  soundscape.playClick();
                  setAddonIncluded(e.target.checked);
                }}
                className="w-5 h-5 accent-amber-600 rounded cursor-pointer"
              />
            </div>

            {/* Estimated Price Display */}
            <div className="p-5 rounded-2xl bg-stone-900 text-white dark:bg-gradient-to-br dark:from-stone-900 dark:to-stone-950 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                  Estimated Turnkey Investment
                </span>
                <div className="font-serif text-2xl sm:text-3xl text-amber-200 font-semibold mt-0.5">
                  KES {estimatedCostKES.toLocaleString()}
                </div>
                <span className="text-[10px] text-stone-400 font-mono">
                  Includes workshop fabrication, site fitting & polyurethane protection
                </span>
              </div>

              <button
                onClick={() =>
                  openBooking(
                    `Quotation for ${service.title} (${unitCount} ${service.unitName}, ${materialTier} tier, Add-on: ${
                      addonIncluded ? "Yes" : "No"
                    }) - Approx KES ${estimatedCostKES.toLocaleString()}`
                  )
                }
                className="px-6 py-3 rounded-full bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>Lock In Estimate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. AUTHENTIC CLIENT TESTIMONIAL CARD */}
      {service.clientQuote && (
        <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div className="space-y-3 max-w-3xl">
              <Quote className="w-8 h-8 text-amber-600 dark:text-amber-400 opacity-60" />
              <p className="font-serif italic text-lg sm:text-2xl text-stone-900 dark:text-stone-100 leading-snug">
                &ldquo;{service.clientQuote.text}&rdquo;
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs font-mono text-amber-800 dark:text-amber-300">
                <span className="font-semibold">{service.clientQuote.client}</span>
                <span>·</span>
                <span>{service.clientQuote.location}</span>
                <span>·</span>
                <span>Completed {service.clientQuote.year}</span>
              </div>
            </div>

            <button
              onClick={() => openBooking(`Site Survey for ${service.title}`)}
              className="px-6 py-3 rounded-full bg-stone-900 text-white dark:bg-amber-400 dark:text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-105 transition shrink-0"
            >
              Book Matching Survey
            </button>
          </div>
        </section>
      )}

      {/* 11. ARCHITECTURAL FAQS ACCORDION */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
          <div className="max-w-2xl mb-10">
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold flex items-center gap-2 mb-2">
              <Compass className="w-3.5 h-3.5" />
              Frequently Asked Technical Questions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 font-normal">
              Common Inquiries for {service.title}
            </h2>
          </div>

          <div className="space-y-3 max-w-4xl">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0D0E12] overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg text-stone-900 dark:text-stone-100 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-sans font-light leading-relaxed border-t border-stone-100 dark:border-stone-800/80 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 12. EXPLORE OTHER 6 DISCIPLINES RIBBON */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold block mb-1">
              Integrated Architectural Craft
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 dark:text-stone-100 font-normal">
              Explore Our Other 6 Workshop Disciplines
            </h2>
          </div>
          <Link
            href="/services"
            className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 uppercase tracking-wider"
          >
            <span>All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {otherServices.map((srv) => (
            <Link
              key={srv.id}
              href={`/services/${srv.id}`}
              className="group p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0D0E12] hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="relative h-24 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-950 mb-2">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded backdrop-blur-md bg-stone-950/70 text-[9px] font-mono text-amber-300">
                  {srv.number}
                </span>
              </div>
              <h4 className="font-serif text-xs font-medium text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 line-clamp-1">
                {srv.title}
              </h4>
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono mt-0.5 block">
                {srv.typicalTimeline}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 13. FINAL CONSULTATION CTA BANNER */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              Complimentary Architectural Site Survey
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-stone-100 leading-tight">
              Ready to Craft Your {service.title}?
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed">
              Our lead architectural master joiner visits your residence or commercial property with precision laser measuring equipment, timber sample boards, and 3D concept plans.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => openBooking(`Consultation: ${service.title}`)}
                className="px-8 py-4 rounded-full bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest hover:bg-amber-300 transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>Book Site Survey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={CONTACT_INFO.telLink}
                className="px-6 py-4 rounded-full border border-stone-700 bg-stone-900/60 text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:border-amber-400 transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call {CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Projects */}
      {selectedProject && (
        <ProjectLightbox
          project={selectedProject}
          projects={relatedProjects}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p: Project) => setSelectedProject(p)}
          onBookProject={(scope: string) => openBooking(scope)}
        />
      )}

      <Footer />
    </main>
  );
}