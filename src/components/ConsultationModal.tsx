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
    projectType: "Full Residence Architecture",
    budget: "$50,000 – $100,000",
    notes: "",
  });

  const [reservationId, setReservationId] = useState<string>("AN-2026-7842");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (prefilledScope) {
      setFormData((prev) => ({
        ...prev,
        notes: `Selected Scope: ${prefilledScope}`,
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
      // Fallback ID if network fails
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
      `Hello AURA & NOIR Atelier, I have submitted consultation dossier ${reservationId} for my property in ${formData.location}. Scope: ${formData.projectType}.`
    );
    window.open(`https://wa.me/254700892411?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border border-stone-800 bg-[#0C0D10] shadow-2xl p-6 md:p-10">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-white hover:border-stone-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-amber-400/10 border-2 border-amber-400 text-amber-300 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                Consultation Dossier Confirmed
              </span>
              <h3 className="font-serif text-3xl text-stone-100">
                Welcome to AURA & NOIR, {formData.name || "Valued Client"}
              </h3>
              <p className="text-sm text-stone-300 mt-2 max-w-md mx-auto font-sans leading-relaxed">
                Our Principal Interior Architect will review your space parameters in {formData.location} and contact you within 24 hours to schedule your preliminary spatial vision walk.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/70 border border-stone-800 max-w-md mx-auto text-left text-xs space-y-1.5 text-stone-300">
              <div className="flex justify-between">
                <span className="text-stone-400">Reference:</span>
                <span className="font-mono text-amber-300">{reservationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Project Type:</span>
                <span>{formData.projectType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Location:</span>
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
                className="py-3 px-6 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs uppercase tracking-wider font-medium transition"
              >
                Close & Return
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Private Spatial Discovery
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-stone-100">
                Book a Bespoke Interior Consultation
              </h3>
              <p className="text-xs text-stone-400 mt-1 font-sans">
                Meet with our studio architects for a comprehensive spatial audit, 3D pre-visualization discussion, and tailored materials presentation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
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
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
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
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
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
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                    Property Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-400 appearance-none"
                    >
                      <option value="Karen, Nairobi">Karen, Nairobi</option>
                      <option value="Kitisuru, Nairobi">Kitisuru, Nairobi</option>
                      <option value="Muthaiga, Nairobi">Muthaiga, Nairobi</option>
                      <option value="Runda, Nairobi">Runda, Nairobi</option>
                      <option value="Westlands, Nairobi">Westlands, Nairobi</option>
                      <option value="Lavington, Nairobi">Lavington, Nairobi</option>
                      <option value="Kilimani / Kileleshwa">Kilimani / Kileleshwa</option>
                      <option value="Mombasa / Diani Coast">Mombasa / Diani Coast</option>
                      <option value="International / Other">International / Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                    Project Scope
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-400 appearance-none"
                  >
                    <option value="Full Residence Architecture">Full Residence Architecture</option>
                    <option value="Penthouse Turnkey Overhaul">Penthouse Turnkey Overhaul</option>
                    <option value="Living & Dining Salon Transformation">Living & Dining Salon</option>
                    <option value="Master Bedroom Suite & Dressing">Master Suite & Dressing</option>
                    <option value="Gourmet Kitchen Remodel">Gourmet Kitchen Remodel</option>
                    <option value="Commercial / Executive Lounge">Commercial / Executive Lounge</option>
                    <option value="Bespoke Millwork & Lighting">Bespoke Millwork & Lighting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                    Estimated Investment Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 focus:outline-none focus:border-amber-400 appearance-none"
                  >
                    <option value="$25,000 – $50,000 (KES 3.2M – 6.5M)">$25,000 – $50,000 (KES 3.2M – 6.5M)</option>
                    <option value="$50,000 – $100,000 (KES 6.5M – 13M)">$50,000 – $100,000 (KES 6.5M – 13M)</option>
                    <option value="$100,000 – $250,000 (KES 13M – 32M)">$100,000 – $250,000 (KES 13M – 32M)</option>
                    <option value="$250,000+ (Haute Monolith)">$250,000+ (Haute Monolith)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-stone-400 font-medium mb-1.5">
                  Project Notes or Architectural Wishes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your space, key architectural aspirations, or specific materials..."
                  className="w-full p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:brightness-105 transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Submit Consultation Dossier</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
