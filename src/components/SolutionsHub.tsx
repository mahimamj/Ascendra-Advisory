"use client";

import React, { useState } from "react";
import { FINANCING_SOLUTIONS, FinancingCategory } from "@/lib/supabase";
import { Shield, FileSpreadsheet, TrendingUp, Cpu, Compass, Award, X, ArrowRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import OptimizedImage from "@/components/OptimizedImage";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldAlert: Shield,
  FileSpreadsheet: FileSpreadsheet,
  TrendingUp: TrendingUp,
  Cpu: Cpu,
  Compass: Compass,
  Award: Award,
};

export default function SolutionsHub() {
  const [activeCategory, setActiveCategory] = useState<FinancingCategory | null>(null);
  const [spotlight, setSpotlight] = useState<{ id: string; x: number; y: number } | null>(null);

  return (
    <section id="solutions" className="py-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full w-fit">
              Financing
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">
              Capital for every stage
            </h2>
          </div>
          <p className="text-silver-soft/65 text-sm max-w-sm">
            From working capital to project finance — structured for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FINANCING_SOLUTIONS.map((cat, idx) => {
            const IconComponent = ICON_MAP[cat.icon] || HelpCircle;
            const isHovered = spotlight?.id === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <TiltCard
                  maxTilt={5}
                  lift={4}
                  onClick={() => setActiveCategory(cat)}
                  onHoverEnd={() => setSpotlight(null)}
                  className="glass-panel p-6 rounded-2xl cursor-pointer hover:border-gold-premium/40 flex flex-col gap-5 group h-full relative overflow-hidden"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setSpotlight({
                      id: cat.id,
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }}
                >
                {isHovered && (
                  <div
                    className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle 200px at ${spotlight.x}px ${spotlight.y}px, rgba(232, 200, 106, 0.08), transparent)`,
                    }}
                  />
                )}
                {cat.image && (
                  <div className="w-full h-32 rounded-xl overflow-hidden border border-gold-premium/15 relative">
                    <OptimizedImage
                      src={cat.image}
                      alt={cat.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="w-11 h-11 rounded-xl bg-navy-royal/60 border border-gold-premium/20 flex items-center justify-center text-gold-champagne group-hover:bg-gold-gradient group-hover:text-navy-dark transition-all">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-lg">{cat.title}</h3>
                  <p className="text-silver-soft/60 text-xs mt-2 leading-relaxed">{cat.description}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gold-champagne mt-auto">
                  {cat.items.length} programs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCategory(null)}
              className="absolute inset-0 bg-navy-dark/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 flex flex-col gap-6"
            >
              <button
                onClick={() => setActiveCategory(null)}
                className="absolute top-4 right-4 text-silver-soft/60 hover:text-white p-2 rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 pr-10">
                <div className="w-12 h-12 rounded-xl bg-gold-premium/10 border border-gold-premium/45 flex items-center justify-center text-gold-champagne shrink-0">
                  {React.createElement(ICON_MAP[activeCategory.icon] || HelpCircle, { className: "w-6 h-6" })}
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-2xl">{activeCategory.title}</h3>
                  <p className="text-silver-soft/65 text-sm mt-1">{activeCategory.description}</p>
                </div>
              </div>

              {activeCategory.whyChoose && activeCategory.whyChoose.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {activeCategory.whyChoose.map((point, pi) => (
                    <li
                      key={pi}
                      className="text-xs text-gold-champagne bg-gold-premium/5 border border-gold-premium/15 px-3 py-1.5 rounded-full"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeCategory.items.map((item) => (
                  <div
                    key={item.code}
                    className="p-4 rounded-xl bg-navy-royal/30 border border-gold-premium/10"
                  >
                    <span className="text-[10px] font-mono font-bold text-gold-champagne uppercase">{item.code}</span>
                    <h5 className="font-display font-semibold text-white text-sm mt-1">{item.name}</h5>
                    <p className="text-silver-soft/60 text-xs mt-1">{item.description}</p>
                    <ul className="mt-3 space-y-1">
                      {item.features.map((f, fi) => (
                        <li key={fi} className="text-[11px] text-silver-soft/80 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-gold-premium shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center gap-4 bg-navy-royal/40 border border-gold-premium/15 p-4 rounded-xl">
                <p className="text-white text-sm font-semibold">Check your eligibility in 2 minutes</p>
                <a
                  href="#calculator"
                  onClick={() => setActiveCategory(null)}
                  className="glow-btn bg-gold-gradient text-navy-dark px-5 py-2.5 rounded font-bold text-xs uppercase tracking-wider shrink-0"
                >
                  Start Now
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
