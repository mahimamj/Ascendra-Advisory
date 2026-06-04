"use client";

import React, { useState } from "react";
import { CASE_STUDIES, CaseStudy } from "@/lib/supabase";
import { ChevronLeft, ChevronRight, Award, Quote, Sparkles } from "lucide-react";
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
    <section id="cases" className="py-24 bg-navy-dark relative overflow-hidden border-t border-gold-premium/10">
      {/* Background aesthetics */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-navy-royal/35 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-premium/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full">
            Proven Scale Records
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white">
            Client Success Cases
          </h2>
          <div className="h-[3px] w-16 bg-gold-premium rounded" />
          <p className="text-silver-soft/75 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
            Real corporate outcomes. Discover how structured capital placements and in-house diagnostics unlocked capacity bottlenecks.
          </p>
        </div>

        {/* Carousel Block */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-6 md:p-10 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-gold-premium/20 relative"
            >
              {/* Giant Quote icon watermark */}
              <Quote className="absolute right-10 bottom-6 w-32 h-32 text-gold-premium/[0.03] stroke-[1] pointer-events-none" />

              {/* Left Column: Big metrics & company badge */}
              <div className="md:col-span-5 flex flex-col gap-6 items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-gold-premium/15 pb-6 md:pb-0 md:pr-8">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-gold-champagne uppercase font-bold px-2 py-0.5 rounded bg-gold-premium/10 border border-gold-premium/20 w-fit">
                    {currentCase.industry} Industry Case
                  </span>
                  <h3 className="font-display font-bold text-white text-2xl mt-3">
                    {currentCase.companyName}
                  </h3>
                </div>

                <div className="flex flex-col items-center md:items-start">
                  <span className="text-[10px] font-mono font-bold text-silver-soft/50 uppercase tracking-widest block mb-1">
                    Structured Amount
                  </span>
                  <div className="text-3xl md:text-4xl font-display font-black text-white text-gold-gradient">
                    {currentCase.fundingAmount}
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-start">
                  <span className="text-[10px] font-mono font-bold text-emerald-400/90 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    Growth Accomplished
                  </span>
                  <div className="text-3xl md:text-4xl font-display font-black text-emerald-400">
                    {currentCase.growth}
                  </div>
                </div>
              </div>

              {/* Right Column: Case narratives */}
              <div className="md:col-span-7 flex flex-col gap-5 text-left justify-center">
                {/* Challenge */}
                <div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    Capital Blockage Challenge
                  </span>
                  <p className="text-silver-soft/85 text-xs md:text-sm leading-relaxed">
                    {currentCase.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <span className="text-xs font-bold text-white uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-premium" />
                    Ascendra Structuring Pathway
                  </span>
                  <p className="text-silver-soft/90 text-xs md:text-sm leading-relaxed">
                    {currentCase.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-navy-royal/50 border border-gold-premium/20 flex items-center justify-center text-gold-champagne hover:bg-gold-gradient hover:text-navy-dark hover:shadow-gold-glow transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Slider Dots indicators */}
            <div className="flex gap-2">
              {CASE_STUDIES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === dotIdx ? "w-6 bg-gold-premium" : "w-1.5 bg-silver-soft/20"
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-navy-royal/50 border border-gold-premium/20 flex items-center justify-center text-gold-champagne hover:bg-gold-gradient hover:text-navy-dark hover:shadow-gold-glow transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
