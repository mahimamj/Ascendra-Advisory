"use client";

import React, { useState } from "react";
import { CASE_STUDIES } from "@/lib/supabase";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CaseStudies() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === CASE_STUDIES.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? CASE_STUDIES.length - 1 : prev - 1));
  };

  const currentCase = CASE_STUDIES[activeIndex];

  return (
    <section id="cases" className="py-28 bg-transparent relative overflow-hidden border-t border-gold-premium/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center flex flex-col items-center gap-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full">
            Results
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white">
            Real outcomes
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="glass-panel p-8 md:p-10 rounded-2xl"
            >
              <div className="flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-gold-champagne uppercase tracking-widest">{currentCase.industry}</span>
                    <h3 className="font-display font-bold text-white text-xl mt-1">{currentCase.companyName}</h3>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-silver-soft/45 block">Funded</span>
                      <span className="text-2xl font-display font-bold text-gold-gradient">{currentCase.fundingAmount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-silver-soft/45 block">Growth</span>
                      <span className="text-2xl font-display font-bold text-emerald-400">{currentCase.growth}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-navy-royal/30 border border-gold-premium/10 rounded-xl p-4">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">Challenge</span>
                    <p className="text-silver-soft/85 text-sm mt-2 leading-snug">{currentCase.challenge}</p>
                  </div>
                  <div className="bg-navy-royal/30 border border-gold-premium/10 rounded-xl p-4">
                    <span className="text-[10px] font-bold text-gold-champagne uppercase tracking-wider">Solution</span>
                    <p className="text-silver-soft/85 text-sm mt-2 leading-snug">{currentCase.solution}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-navy-royal/50 border border-gold-premium/20 flex items-center justify-center text-gold-champagne hover:bg-gold-gradient hover:text-navy-dark transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {CASE_STUDIES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIndex === dotIdx ? "w-6 bg-gold-premium" : "w-1.5 bg-silver-soft/20"
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-navy-royal/50 border border-gold-premium/20 flex items-center justify-center text-gold-champagne hover:bg-gold-gradient hover:text-navy-dark transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
