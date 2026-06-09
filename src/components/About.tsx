"use client";

import React from "react";
import { Network, Zap, Layers, Building2, Users, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";

const FEATURES = [
  {
    icon: Network,
    title: "Multi-Lender Network",
    description: "Access 40+ institutional lenders through a single advisory relationship.",
  },
  {
    icon: Zap,
    title: "Faster Approvals",
    description: "Parallel processing cuts sanction timelines from months to weeks.",
  },
  {
    icon: Layers,
    title: "Structured Financing",
    description: "Debt engineered to match your cash cycles, not generic bank templates.",
  },
  {
    icon: Building2,
    title: "Industry Expertise",
    description: "Sector-specific structures across manufacturing, infra, agri and tech.",
  },
  {
    icon: Users,
    title: "Dedicated Advisory",
    description: "Senior structuring directors assigned to every mandate.",
  },
  {
    icon: ShieldCheck,
    title: "End-to-End Support",
    description: "From assessment and documentation through disbursement and beyond.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad bg-mesh relative">
      <div className="section-container">
        <SectionHeader
          eyebrow="Why Ascendra"
          title="Advisory built for institutional scale"
          subtitle="We structure high-ticket debt for businesses that have outgrown conventional lending."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <ScrollReveal key={f.title} delay={i * 0.06}>
                <div className="glass-panel rounded-xl p-6 md:p-7 h-full card-hover group">
                  <div className="w-11 h-11 rounded-lg bg-gold-premium/10 border border-gold-premium/20 flex items-center justify-center text-gold-premium mb-5 group-hover:bg-gold-premium/15 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-muted text-sm leading-relaxed">{f.description}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
