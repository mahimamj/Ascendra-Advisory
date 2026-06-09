"use client";

import React from "react";
import { INDUSTRIES_DATA } from "@/lib/supabase";
import { Factory, Warehouse, Scissors, Rocket, Sprout, Building2 } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";
import OptimizedImage from "@/components/OptimizedImage";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  factory: Factory,
  warehouse: Warehouse,
  scissors: Scissors,
  rocket: Rocket,
  sprout: Sprout,
  building: Building2,
};

export default function IndustryShowcase() {
  return (
    <section id="industries" className="section-pad border-t border-white/5">
      <div className="section-container">
        <SectionHeader
          eyebrow="Industries"
          title="Sector expertise at institutional scale"
          subtitle="Deep structuring knowledge across India's highest-growth sectors."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {INDUSTRIES_DATA.map((ind, i) => {
            const Icon = ICON_MAP[ind.image] || Factory;
            return (
              <ScrollReveal key={ind.id} delay={i * 0.06}>
                <div className="group relative h-[280px] md:h-[320px] rounded-xl overflow-hidden card-hover cursor-default">
                  <OptimizedImage
                    src={ind.coverImage}
                    alt={ind.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/50 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="w-10 h-10 rounded-lg bg-gold-premium/15 border border-gold-premium/25 flex items-center justify-center text-gold-premium mb-4 backdrop-blur-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-semibold text-xl">{ind.name}</h3>
                    <p className="text-gray-muted text-sm mt-1.5 max-w-xs">{ind.tagline}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
