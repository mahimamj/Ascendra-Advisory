"use client";

import React, { useState } from "react";
import { TESTIMONIALS } from "@/lib/supabase";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="section-pad bg-navy-mid/30 border-t border-white/5">
      <div className="section-container">
        <SectionHeader
          eyebrow="Client Outcomes"
          title="Trusted by growth-stage enterprises"
          subtitle="Real mandates. Measurable results."
        />

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel-strong rounded-2xl p-8 md:p-12 relative"
            >
              <Quote className="absolute top-8 right-8 w-16 h-16 text-gold-premium/8" />
              <p className="text-white text-lg md:text-xl leading-relaxed font-light max-w-3xl">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-10 pt-8 border-t border-white/8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-premium/30 to-navy-light border border-gold-premium/25 flex items-center justify-center text-gold-champagne font-bold text-lg">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t.author}</p>
                    <p className="text-gray-subtle text-sm">{t.role}, {t.company}</p>
                    <span className="text-[10px] uppercase tracking-widest text-gold-premium/80 mt-1 inline-block">{t.category}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-gray-subtle block">Structured</span>
                  <span className="text-2xl font-bold text-gold-gradient">{t.fundingAmount}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => setIndex((i) => (i === 0 ? TESTIMONIALS.length - 1 : i - 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-muted hover:border-gold-premium/30 hover:text-gold-champagne transition-colors" aria-label="Previous">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} className={`h-1 rounded-full transition-all ${i === index ? "w-8 bg-gold-premium" : "w-1.5 bg-white/15"}`} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={() => setIndex((i) => (i === TESTIMONIALS.length - 1 ? 0 : i + 1))} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-muted hover:border-gold-premium/30 hover:text-gold-champagne transition-colors" aria-label="Next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
