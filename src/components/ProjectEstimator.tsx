"use client";

import React, { useState, useMemo } from "react";
import { Calculator, Clock, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

interface EstimatorProps {
  onBookWithEstimate?: (details: string) => void;
}

type Currency = "USD" | "KES" | "GBP" | "EUR";

const SPACE_TYPES = [
  { id: "penthouse", label: "Penthouse / High-Rise", baseRate: 1.15, typicalWeeks: 12 },
  { id: "villa", label: "Standalone Luxury Villa", baseRate: 1.25, typicalWeeks: 16 },
  { id: "living", label: "Living & Dining Salon", baseRate: 1.0, typicalWeeks: 8 },
  { id: "master", label: "Master Suite & Dressing Room", baseRate: 0.95, typicalWeeks: 6 },
  { id: "office", label: "Executive Office / Lounge", baseRate: 1.05, typicalWeeks: 9 },
];

const FINISH_TIERS = [
  {
    id: "contemporary",
    name: "Modern Contemporary Craft",
    usdPerSqFt: 35,
    desc: "Refined architectural lines, premium acoustic wall treatments, bespoke imported lighting, and designer modular furnishings.",
  },
  {
    id: "luxury",
    name: "Luxury Architectural Atelier",
    usdPerSqFt: 65,
    desc: "Custom tongue-and-groove millwork, Italian bookmatched marble surfaces, drop ceiling cove lighting, and tailored upholstery.",
  },
  {
    id: "haute",
    name: "Haute Couture Monolith",
    usdPerSqFt: 110,
    desc: "Complete structural reconfiguration, museum-grade Dali lighting, rare Roman travertine, invisible frameless portals, and curated art.",
  },
];

const CURRENCY_CONFIG: Record<Currency, { symbol: string; label: string; rateFromUsd: number; suffix?: string }> = {
  USD: { symbol: "$", label: "USD ($)", rateFromUsd: 1.0 },
  KES: { symbol: "KSh ", label: "KES (KSh)", rateFromUsd: 130.0 },
  GBP: { symbol: "£", label: "GBP (£)", rateFromUsd: 0.78 },
  EUR: { symbol: "€", label: "EUR (€)", rateFromUsd: 0.92 },
};

export default function ProjectEstimator({ onBookWithEstimate }: EstimatorProps) {
  const [selectedSpace, setSelectedSpace] = useState<string>("penthouse");
  const [sqFt, setSqFt] = useState<number>(2400);
  const [selectedTier, setSelectedTier] = useState<string>("luxury");
  const [includeJoinery, setIncludeJoinery] = useState<boolean>(true);
  const [includeLighting, setIncludeLighting] = useState<boolean>(true);
  const [includeStone, setIncludeStone] = useState<boolean>(true);
  const [currency, setCurrency] = useState<Currency>("USD");

  const calculation = useMemo(() => {
    const space = SPACE_TYPES.find((s) => s.id === selectedSpace) || SPACE_TYPES[0];
    const tier = FINISH_TIERS.find((t) => t.id === selectedTier) || FINISH_TIERS[1];
    const curr = CURRENCY_CONFIG[currency];

    let addOnMultiplier = 1.0;
    if (includeJoinery) addOnMultiplier += 0.12;
    if (includeLighting) addOnMultiplier += 0.08;
    if (includeStone) addOnMultiplier += 0.15;

    const baseCostUsd = sqFt * tier.usdPerSqFt * space.baseRate * addOnMultiplier;
    const minUsd = baseCostUsd * 0.9;
    const maxUsd = baseCostUsd * 1.15;

    const minConverted = minUsd * curr.rateFromUsd;
    const maxConverted = maxUsd * curr.rateFromUsd;

    const estimatedWeeks = Math.max(
      4,
      Math.round(space.typicalWeeks * Math.pow(sqFt / 2000, 0.4))
    );

    return {
      minVal: currency === "KES" ? Math.round(minConverted / 50000) * 50000 : Math.round(minConverted / 500) * 500,
      maxVal: currency === "KES" ? Math.round(maxConverted / 50000) * 50000 : Math.round(maxConverted / 500) * 500,
      symbol: curr.symbol,
      ratePerSqFt: Math.round(tier.usdPerSqFt * curr.rateFromUsd),
      weeks: estimatedWeeks,
      spaceLabel: space.label,
      tierName: tier.name,
    };
  }, [selectedSpace, sqFt, selectedTier, includeJoinery, includeLighting, includeStone, currency]);

  const handleProceed = () => {
    const summary = `${calculation.spaceLabel} (${sqFt.toLocaleString()} sq ft) · ${
      calculation.tierName
    } · Est: ${calculation.symbol}${calculation.minVal.toLocaleString()} - ${calculation.symbol}${calculation.maxVal.toLocaleString()} (${calculation.weeks} weeks)`;
    if (onBookWithEstimate) onBookWithEstimate(summary);
  };

  return (
    <section id="estimator" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="rounded-3xl border border-stone-800 bg-[#0C0D10] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Transparent Investment Architecture
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-stone-100 font-normal leading-tight">
            Interactive Project Cost & Scope Estimator
          </h2>
          <p className="text-sm text-stone-400 mt-2 font-sans">
            Configure your property dimensions and desired level of craft to receive an instant, transparent ballpark investment estimate and bespoke timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Space Type */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-3">
                1. Select Property / Space Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SPACE_TYPES.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedSpace(st.id)}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      selectedSpace === st.id
                        ? "bg-amber-500/15 border-amber-400 text-stone-100 shadow-md shadow-amber-500/10 font-medium"
                        : "bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Square Footage Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-stone-300 font-medium">
                  2. Approximate Floor Area (Square Feet)
                </label>
                <span className="font-mono text-base font-semibold text-amber-300">
                  {sqFt.toLocaleString()} sq ft
                </span>
              </div>
              <input
                type="range"
                min={600}
                max={8000}
                step={100}
                value={sqFt}
                onChange={(e) => setSqFt(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-stone-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                <span>600 sq ft</span>
                <span>2,500 sq ft</span>
                <span>5,000 sq ft</span>
                <span>8,000+ sq ft</span>
              </div>
            </div>

            {/* 3. Finish Tier */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-3">
                3. Desired Finish Tier & Materiality
              </label>
              <div className="space-y-3">
                {FINISH_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedTier === tier.id
                        ? "bg-stone-900/90 border-amber-400/80 shadow-lg shadow-amber-950/20"
                        : "bg-stone-900/40 border-stone-800 hover:border-stone-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base text-stone-100 font-medium">
                        {tier.name}
                      </span>
                      <span className="text-[11px] font-mono text-amber-300">
                        ~{calculation.symbol}{Math.round(tier.usdPerSqFt * CURRENCY_CONFIG[currency].rateFromUsd).toLocaleString()}/sq ft
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed font-sans">
                      {tier.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Add-on Architectural Inclusions */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-300 font-medium mb-3">
                4. Bespoke Inclusions
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  onClick={() => setIncludeJoinery(!includeJoinery)}
                  className={`p-3 rounded-2xl border text-xs text-left transition flex items-center gap-2 ${
                    includeJoinery
                      ? "bg-amber-400/10 border-amber-400 text-stone-100"
                      : "bg-stone-900/60 border-stone-800 text-stone-400"
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      includeJoinery ? "text-amber-400" : "text-stone-700"
                    }`}
                  />
                  <span>Custom Fluted Millwork</span>
                </button>
                <button
                  onClick={() => setIncludeLighting(!includeLighting)}
                  className={`p-3 rounded-2xl border text-xs text-left transition flex items-center gap-2 ${
                    includeLighting
                      ? "bg-amber-400/10 border-amber-400 text-stone-100"
                      : "bg-stone-900/60 border-stone-800 text-stone-400"
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      includeLighting ? "text-amber-400" : "text-stone-700"
                    }`}
                  />
                  <span>Architectural LED Coves</span>
                </button>
                <button
                  onClick={() => setIncludeStone(!includeStone)}
                  className={`p-3 rounded-2xl border text-xs text-left transition flex items-center gap-2 ${
                    includeStone
                      ? "bg-amber-400/10 border-amber-400 text-stone-100"
                      : "bg-stone-900/60 border-stone-800 text-stone-400"
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 ${
                      includeStone ? "text-amber-400" : "text-stone-700"
                    }`}
                  />
                  <span>Bookmatched Stone</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Estimate Summary Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 rounded-3xl bg-[#121317] border border-amber-500/30 shadow-2xl relative">
            <div>
              {/* Multi-Currency Switcher (USD, KES, GBP, EUR) */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-800">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
                  Currency Selector
                </span>
                <div className="flex rounded-full bg-stone-900 p-1 border border-stone-700">
                  {(["USD", "KES", "GBP", "EUR"] as Currency[]).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => setCurrency(cur)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-medium transition ${
                        currency === cur
                          ? "bg-amber-400 text-stone-950 shadow font-semibold"
                          : "text-stone-400 hover:text-stone-200"
                      }`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Price Range */}
              <div className="py-8">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                  Estimated Investment Range
                </span>
                <div className="font-serif text-3xl sm:text-4xl text-stone-100 tracking-tight">
                  {currency === "KES" ? (
                    <>
                      KSh {(calculation.minVal / 1000000).toFixed(2)}M{" "}
                      <span className="text-stone-500 text-2xl font-light">–</span>{" "}
                      KSh {(calculation.maxVal / 1000000).toFixed(2)}M
                    </>
                  ) : (
                    <>
                      {calculation.symbol}{calculation.minVal.toLocaleString()}{" "}
                      <span className="text-stone-500 text-2xl font-light">–</span>{" "}
                      {calculation.symbol}{calculation.maxVal.toLocaleString()}
                    </>
                  )}
                </div>
                <p className="text-[11px] text-stone-400 mt-2 font-sans">
                  Includes full interior architecture, 3D pre-visualization, procurement, installation & white-glove styling.
                </p>
              </div>

              {/* Scope Breakdown */}
              <div className="space-y-3 py-4 border-t border-stone-800 text-xs">
                <div className="flex items-center justify-between text-stone-300">
                  <span className="flex items-center gap-1.5 text-stone-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Turnaround Timeline
                  </span>
                  <span className="font-mono font-semibold text-stone-100">
                    {calculation.weeks} Weeks (Approx.)
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-300">
                  <span className="text-stone-400">Space Type</span>
                  <span className="font-medium text-stone-100">{calculation.spaceLabel}</span>
                </div>
                <div className="flex items-center justify-between text-stone-300">
                  <span className="text-stone-400">Total Area</span>
                  <span className="font-mono font-medium text-stone-100">
                    {sqFt.toLocaleString()} sq ft
                  </span>
                </div>
                <div className="flex items-center justify-between text-stone-300">
                  <span className="text-stone-400">Finish Level</span>
                  <span className="font-medium text-amber-300">{calculation.tierName}</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-[11px] text-amber-200/90 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Guaranteed fixed-bid pricing following physical site survey. No hidden procurement markups.
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-6 mt-6 border-t border-stone-800">
              <button
                onClick={handleProceed}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 hover:brightness-105 transition"
              >
                <span>Book Consultation for this Spec</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
