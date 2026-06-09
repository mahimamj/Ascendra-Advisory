"use client";

import React, { useState } from "react";
import { INDUSTRIES_DATA } from "@/lib/supabase";
import { Factory, Ship, Warehouse, Scissors, Store, Rocket, Sprout, Network, HelpCircle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  factory: Factory,
  ship: Ship,
  warehouse: Warehouse,
  scissors: Scissors,
  store: Store,
  rocket: Rocket,
  sprout: Sprout,
  network: Network,
};

export default function IndustryShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="industries" className="py-28 bg-transparent relative border-t border-gold-premium/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full w-fit">
              Industries
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white">
              Built for your sector
            </h2>
          </div>
          <p className="text-silver-soft/65 text-sm max-w-xs">
            Debt shaped to your payment cycles and seasonality.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {INDUSTRIES_DATA.map((ind, idx) => {
            const IconComp = ICON_MAP[ind.image] || HelpCircle;
            const isHovered = hoveredId === ind.id;

            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative h-[260px] rounded-2xl cursor-pointer overflow-hidden border border-gold-premium/10 bg-navy-royal/20 group"
              >
                <div
                  className={`absolute inset-0 p-5 flex flex-col justify-between transition-all duration-400 z-10 ${
                    isHovered ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-navy-dark/90 border border-gold-premium/15 flex items-center justify-center text-gold-champagne">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white text-base leading-tight">{ind.name}</h3>
                    <p className="text-[10px] text-gold-premium/70 flex items-center gap-1 mt-2">
                      View details <ArrowUpRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 p-5 bg-gradient-to-b from-navy-royal to-navy-dark flex flex-col justify-between transition-all duration-400 z-20 ${
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <h3 className="font-display font-semibold text-gold-champagne text-sm">{ind.name}</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-[9px] font-mono text-rose-400/90 uppercase tracking-widest">Challenge</span>
                      <p className="text-silver-soft/80 text-[11px] mt-0.5 leading-snug">{ind.challenge}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-gold-champagne uppercase tracking-widest">Solution</span>
                      <p className="text-silver-soft/85 text-[11px] mt-0.5 leading-snug">{ind.solution}</p>
                    </div>
                  </div>
                  <div className="border-t border-gold-premium/15 pt-3">
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Impact</span>
                    <p className="text-white font-semibold text-sm mt-0.5">{ind.growthPotential}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
