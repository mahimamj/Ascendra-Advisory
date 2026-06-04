"use client";

import React, { useState } from "react";
import { GOVERNMENT_SCHEMES, GovernmentScheme } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldAlert, Sparkles, Scale, Landmark } from "lucide-react";

const CATEGORIES = [
  "All Programs",
  "CGTMSE",
  "Agri Schemes",
  "MSME Schemes",
  "MSME Subsidies",
  "Textile Subsidies",
  "Warehouse Subsidies"
];

export default function SchemeExplorer() {
  const [activeCategory, setActiveCategory] = useState("All Programs");

  const filteredSchemes = GOVERNMENT_SCHEMES.filter((scheme) => {
    if (activeCategory === "All Programs") return true;
    return scheme.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <section id="schemes" className="py-24 bg-navy-dark relative border-t border-gold-premium/10">
      {/* Background glowing gradients */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-navy-royal/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-80 h-80 bg-gold-premium/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full w-fit">
              Sovereign Credit Allocations
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-white">
              Government Scheme Explorer
            </h2>
            <div className="h-[3px] w-16 bg-gold-premium rounded mt-1" />
          </div>
          <p className="text-silver-soft/75 text-sm md:text-base max-w-md leading-relaxed">
            Unlock financial assistance, tech subsidies, and collateral guarantee allocations backed by federal and state initiatives.
          </p>
        </div>

        {/* Filter Categories Horizontal Scrollbar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin scrollbar-thumb-gold scrollbar-track-navy select-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gold-gradient text-navy-dark shadow-gold-glow scale-105"
                  : "bg-navy-royal/35 text-silver-soft border border-gold-premium/15 hover:border-gold-champagne"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Schemes Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredSchemes.map((scheme) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={scheme.id}
                className="glass-panel p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:border-gold-premium/35 transition-all duration-300 relative group h-full shadow-lg"
              >
                {/* Visual node top-right */}
                <div className="absolute top-6 right-6 text-gold-premium/20 group-hover:text-gold-premium/50 transition-colors">
                  <Landmark className="w-6 h-6 stroke-[1.5]" />
                </div>

                <div>
                  {/* Category tag */}
                  <span className="text-[9px] font-mono tracking-widest text-gold-champagne uppercase font-bold px-2 py-0.5 rounded bg-gold-premium/10 border border-gold-premium/20 w-fit block mb-4">
                    {scheme.category}
                  </span>

                  {/* Name */}
                  <h3 className="font-display font-semibold text-white text-lg tracking-wide mb-3 leading-snug group-hover:text-gold-champagne transition-colors">
                    {scheme.name}
                  </h3>

                  {/* Overview */}
                  <p className="text-silver-soft/75 text-xs leading-relaxed mb-6">
                    {scheme.description}
                  </p>
                </div>

                {/* Sub details parameters */}
                <div className="border-t border-gold-premium/10 pt-4 flex flex-col gap-4 mt-auto">
                  {/* Benefits */}
                  <div>
                    <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                      Financial Benefits
                    </span>
                    <p className="text-silver-soft/90 text-[11px] leading-relaxed">
                      {scheme.benefits}
                    </p>
                  </div>

                  {/* Eligibility */}
                  <div>
                    <span className="text-[9px] font-mono font-bold text-gold-premium uppercase tracking-widest block mb-1">
                      Eligibility Scope
                    </span>
                    <p className="text-silver-soft/90 text-[11px] leading-relaxed">
                      {scheme.eligibility}
                    </p>
                  </div>
                </div>

                {/* Apply handle inside cards */}
                <div className="mt-6 pt-4 border-t border-gold-premium/5 flex items-center justify-between text-[11px] font-semibold text-gold-champagne group-hover:text-gold-premium transition-colors">
                  <span>Inquire Under This Scheme</span>
                  <div className="w-5 h-5 rounded-full bg-navy-royal/60 flex items-center justify-center group-hover:bg-gold-gradient group-hover:text-navy-dark transition-colors">
                    →
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
