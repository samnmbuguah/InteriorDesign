"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  X,
  Sparkles,
  MapPin,
  Mail,
  User,
  Phone,
  CheckCircle2,
  Send,
  MessageSquare,
} from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledScope?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  prefilledScope = "",
}: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Karen, Nairobi",
    projectType: "Wooden Staircases",
    budget: "$25,000 – $50,000 (KES 3.2M – 6.5M)",
    notes: "",
  });

  const [reservationId, setReservationId] = useState<string>("AN-2026-7842");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefilledScope) {
      setFormData((prev) => ({
        ...prev,
        projectType: prefilledScope.includes("Staircase")
          ? "Wooden Staircases"
          : prefilledScope.includes("Gypsum")
          ? "Gypsum Designing & Installation"
          : prefilledScope.includes("Flooring")
          ? "Wooden Flooring"
          : prefilledScope.includes("Kitchen") || prefilledScope.includes("Wardrobe")
          ? "Kitchen Cabinets & Wardrobes"
          : prefilledScope.includes("TV") || prefilledScope.includes("Media")
          ? "TV Stands & Media Walls"
          : prefilledScope.includes("Door")
          ? "Door & Frame Fitting"
          : prefilledScope.includes("Roof") || prefilledScope.includes("Renovation")
          ? "Roofing & Home Renovation"
          : prev.projectType,
        notes: `Inquiry Scope: ${prefilledScope}`,
      }));
    }
  }, [prefilledScope]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.reservationId) {
        setReservationId(data.reservationId);
      }
    } catch {
      setReservationId(`AN-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#FFFFFF", "#C5A880", "#222428"],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello AURA & NOIR, I would like to request a quotation for ${formData.projectType} in ${formData.location}. (Ref: ${reservationId}).`
    );
    window.open(`https://wa.me/254728541775?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0C0D10] shadow-2xl p-6 md:p-10 text-stone-900 dark:text-stone-100">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold block mb-1">
                Consultation Request Received
              </span>
              <h3 className="font-serif text-3xl">
                Thank You, {formData.name || "Valued Client"}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 mt-2 max-w-md mx-auto font-sans leading-relaxed">
                Our master joiner and project director will review your project parameters for {formData.projectType} in {formData.location} and contact you within 24 hours.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 max-w-md mx-auto text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">Reference:</span>
                <span className="font-mono text-amber-600 dark:text-amber-300 font-semibold">{reservationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">Craft / Service:</span>
                <span className="font-medium">{formData.projectType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 dark:text-stone-400">Location:</span>
                <span>{formData.location}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={openWhatsApp}
                className="py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </button>
              <button
                onClick={handleReset}
                className="py-3 px-6 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-wider font-medium transition"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Artisan Joinery & Renovation
              </div>
              <h3 className="font-serif text-2xl md:text-3xl">
                Request a Project Quotation / Site Visit
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-sans">
                Tell us about your home improvement or custom carpentry requirements for a comprehensive breakdown and physical site inspection.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Samuel Karanja"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. samuel@example.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +254 712 345 678"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium mb-1.5">
                    Project Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 appearance-none"
                    >
                      <option value="Karen, Nairobi">Karen, Nairobi</option>
                      <option value="Kitisuru, Nairobi">Kitisuru, Nairobi</option>
                      <option value="Muthaiga, Nairobi">Muthaiga, Nairobi</option>
                      <option value="Runda, Nairobi">Runda, Nairobi</option>
                      <option value="Westlands, Nairobi">Westlands, Nairobi</option>
                      <option value="Lavington, Nairobi">Lavington, Nairobi</option>
                      <option value="Kilimani / Kileleshwa">Kilimani / Kileleshwa</option>
                      <option value="Rosslyn / Gigiri">Rosslyn / Gigiri</option>
                      <option value="Mombasa / Diani Coast">Mombasa / Diani Coast</option>
                      <option value="Naivasha / Upcountry">Naivasha / Upcountry</option>
                      <option value="Other Locations">Other Locations</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Exact 7 Main Services Dropdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium mb-1.5">
                    Main Service Needed
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 appearance-none"
                  >
                    <option value="Wooden Staircases">01. Wooden Staircase</option>
                    <option value="Gypsum Designing & Installation">02. Gypsum Designing & Installation</option>
                    <option value="Wooden Flooring">03. Wooden Flooring (Parquet / Chevron)</option>
                    <option value="Kitchen Cabinets & Wardrobes">04. Kitchen Cabinets & Wardrobes</option>
                    <option value="TV Stands & Media Walls">05. TV Stands & Media Walls</option>
                    <option value="Door & Frame Fitting">06. Door & Frame Fitting</option>
                    <option value="Roofing & Home Renovation">07. Roofing & Home Renovation</option>
                    <option value="Multiple Services / Turnkey Remodel">Full Turnkey House Renovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium mb-1.5">
                    Estimated Budget Bracket
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500 appearance-none"
                  >
                    <option value="KES 250,000 – 750,000">KES 250,000 – 750,000 (Standard Craft)</option>
                    <option value="KES 750,000 – 2,000,000">KES 750,000 – 2,000,000 (Premium Hardwood/Gypsum)</option>
                    <option value="KES 2,000,000 – 6,000,000">KES 2,000,000 – 6,000,000 (Full Kitchen & Wardrobes)</option>
                    <option value="KES 6,000,000+ (Full Home)">KES 6,000,000+ (Turnkey Renovation & Roofing)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-600 dark:text-stone-400 font-medium mb-1.5">
                  Dimensions, Wood Type, or Project Details
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specify measurements, room dimensions, wood preference (Mvule, Oak, Teak, Mahogany), or gypsum ceiling ideas..."
                  className="w-full p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-stone-900 text-white dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-400 dark:text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:brightness-105 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Quotation Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 text-center border-t border-stone-200 dark:border-stone-800">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Prefer direct assistance? Call or WhatsApp our workshop manager directly at:
                </p>
                <div className="mt-1 flex items-center justify-center gap-3">
                  <a
                    href="tel:+254728541775"
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    📞 0728 541 775
                  </a>
                  <span className="text-stone-400">·</span>
                  <a
                    href="https://wa.me/254728541775?text=Hello%20AURA%20%26%20NOIR%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
