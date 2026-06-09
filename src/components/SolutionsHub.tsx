"use client";

import React, { useState } from "react";
import { FINANCING_SOLUTIONS, FinancingCategory } from "@/lib/supabase";
import { Shield, FileSpreadsheet, TrendingUp, Cpu, Compass, Award, ArrowRight, X, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldAlert: Shield,
  FileSpreadsheet: FileSpreadsheet,
  TrendingUp: TrendingUp,
  Cpu: Cpu,
  Compass: Compass,
  Award: Award,
};

export default function SolutionsHub() {
  const [active, setActive] = useState<FinancingCategory | null>(null);

  return (
    <section id="solutions" className="section-pad bg-navy-mid/30 border-t border-white/5">
      <div className="section-container">
        <SectionHeader
          eyebrow="Solutions"
          title="Financing for every growth stage"
          subtitle="From ₹50 Lakhs to ₹250+ Crores — structured across institutional lenders."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {FINANCING_SOLUTIONS.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon] || HelpCircle;
            return (
              <ScrollReveal key={cat.id} delay={i * 0.05}>
                <button
                  onClick={() => setActive(cat)}
                  className="w-full text-left glass-panel rounded-xl p-6 md:p-7 h-full card-hover group flex flex-col"
                >
                  <div className="w-11 h-11 rounded-lg bg-gold-premium/10 border border-gold-premium/20 flex items-center justify-center text-gold-premium mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{cat.title}</h3>
                  <p className="text-gray-muted text-sm leading-relaxed mb-5 flex-1">{cat.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-gold-champagne font-semibold text-sm">{cat.fundingRange}</span>
                    <span className="text-gray-subtle text-xs flex items-center gap-1 group-hover:text-gold-champagne transition-colors">
                      Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} className="absolute inset-0 bg-navy-dark/90 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="glass-panel-strong rounded-2xl p-6 md:p-8 max-w-lg w-full relative z-10"
            >
              <button onClick={() => setActive(null)} className="absolute top-4 right-4 text-gray-subtle hover:text-white p-1" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
              <span className="section-eyebrow text-[10px]">{active.fundingRange}</span>
              <h3 className="text-white font-bold text-2xl mt-2">{active.title}</h3>
              <p className="text-gray-muted text-sm mt-3">{active.description}</p>
              <ul className="mt-5 space-y-2">
                {active.items.slice(0, 4).map((item) => (
                  <li key={item.code} className="text-sm text-silver-soft flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-premium" />
                    {item.name}
                  </li>
                ))}
              </ul>
              <a href="#contact" onClick={() => setActive(null)} className="btn-primary block text-center mt-6 py-3 text-sm">
                Book a Consultation
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
