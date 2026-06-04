"use client";

import React, { useState } from "react";
import { INDUSTRIES_DATA, IndustryData } from "@/lib/supabase";
import { Factory, Ship, Warehouse, Scissors, Store, Rocket, Sprout, Network, HelpCircle, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ICON_MAP: Record<string, any> = {
  factory: Factory,
  ship: Ship,
  warehouse: Warehouse,
  scissors: Scissors,
  store: Store,
  rocket: Rocket,
  sprout: Sprout,
  network: Network
};

export default function IndustryShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="industries" className="py-24 bg-navy-dark relative border-t border-gold-premium/10">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy-royal/5 to-navy-dark pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full w-fit">
              Sector Specializations
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white">
              Tailored Industry Solutions
            </h2>
            <div className="h-[3px] w-16 bg-gold-premium rounded mt-1" />
          </div>
          <p className="text-silver-soft/70 text-sm md:text-base max-w-md leading-relaxed">
            Different sectors operate on distinct payment, seasonal, and raw material cycles. We design custom debt lines matching your physical supply workflows.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES_DATA.map((ind, idx) => {
            const IconComp = ICON_MAP[ind.image] || HelpCircle;
            const isHovered = hoveredId === ind.id;

            return (
              <div
                key={ind.id}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative h-[320px] rounded-2xl cursor-pointer overflow-hidden transition-all duration-500 shadow-lg group bg-navy-royal/20 border border-gold-premium/10"
              >
                {/* Visual Glassmorphic Border */}
                <div className="absolute inset-0 border border-transparent group-hover:border-gold-premium/30 rounded-2xl transition-colors duration-500 pointer-events-none z-30" />

                {/* Normal / Default State (Slide Up/Down or Fade) */}
                <div
                  className={`absolute inset-0 p-6 flex flex-col justify-between transition-all duration-500 z-10 ${
                    isHovered ? "opacity-0 scale-95 translate-y-4 pointer-events-none" : "opacity-100 scale-100 translate-y-0"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-navy-dark/90 border border-gold-premium/15 flex items-center justify-center text-gold-champagne group-hover:scale-110 transition-all duration-300">
                    <IconComp className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  
                  <div>
                    <h3 className="font-display font-semibold text-white text-lg tracking-wide mb-2 leading-tight group-hover:text-gold-champagne transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-[11px] font-mono text-gold-premium/75 flex items-center gap-1">
                      Explore Challenge & Solution
                      <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </p>
                  </div>
                </div>

                {/* Hover / Detail State */}
                <div
                  className={`absolute inset-0 p-6 bg-gradient-to-b from-navy-royal to-navy-dark/95 flex flex-col justify-between transition-all duration-500 z-20 ${
                    isHovered ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-105 -translate-y-4 pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col gap-3.5">
                    {/* Challenge Block */}
                    <div>
                      <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-widest block mb-1">
                        Sector Challenge
                      </span>
                      <p className="text-silver-soft/85 text-[11px] leading-relaxed">
                        {ind.challenge}
                      </p>
                    </div>

                    {/* Solution Block */}
                    <div>
                      <span className="text-[9px] font-mono font-bold text-gold-champagne uppercase tracking-widest block mb-1">
                        Structured Solution
                      </span>
                      <p className="text-silver-soft/90 text-[11px] leading-relaxed">
                        {ind.solution}
                      </p>
                    </div>
                  </div>

                  {/* Growth stats */}
                  <div className="border-t border-gold-premium/15 pt-3 mt-auto">
                    <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                      Growth Impact
                    </span>
                    <p className="text-white font-semibold text-xs leading-normal mt-0.5">
                      {ind.growthPotential}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
