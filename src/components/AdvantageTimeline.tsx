"use client";

import React from "react";
import { Users, FileText, BarChart3, Clock, Milestone } from "lucide-react";
import { motion } from "framer-motion";

interface Pillar {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  bullets: string[];
}

const PILLARS: Pillar[] = [
  {
    id: 1,
    title: "Multi-Lender Access",
    subtitle: "Parallel Auction Framework",
    icon: Users,
    description: "Instead of approaching banks one by one, we list your qualified requirement to 50+ leading public, private, and private credit partners concurrently.",
    bullets: ["Combines banks, NBFCs, and alternative credit", "Drives competitive interest pricing", "Secures multiple parallel term sheets"]
  },
  {
    id: 2,
    title: "Intelligent Structuring",
    subtitle: "Cash-Flow Optimization",
    icon: FileText,
    description: "We don't fit your business into cookie-cutter loans. We modify debt parameters, tranches, and repayment grace periods to mirror physical operating timelines.",
    bullets: ["Customizes moratorium windows", "Adapts repayment to seasonal trade surges", "Minimizes personal guarantees"]
  },
  {
    id: 3,
    title: "In-House Credit Diagnostics",
    subtitle: "Pre-Underwriting Verification",
    icon: BarChart3,
    description: "Our in-house credit officers evaluate your tax logs, credit indexes, and coverage ratios (DSCR/MOB) to resolve banking flags before submitting.",
    bullets: ["Corrects cash-flow statement anomalies", "Identifies maximum eligible limits beforehand", "Achieves a 95% formal approval rate"]
  },
  {
    id: 4,
    title: "Accelerated Sanctions",
    subtitle: "Executive Escrow Processing",
    icon: Clock,
    description: "By routing deals directly to credit heads and regional underwriters, we bypass retail branches and speed up decisions from months to days.",
    bullets: ["Direct branch-free escalation pathways", "Standardized legal and property vetting support", "Sanctions in 7 to 10 banking days"]
  },
  {
    id: 5,
    title: "Growth-Oriented Funding",
    subtitle: "Scalable Credit Life-Cycles",
    icon: Milestone,
    description: "Capital is deployed to unlock manufacturing volumes or global export invoices, with ongoing structured monitoring to trigger rate reductions as you scale.",
    bullets: ["Direct post-funding draw-downs", "Automatic triggers for lower interest brackets", "Future top-up integrations"]
  }
];

export default function AdvantageTimeline() {
  return (
    <section id="advantage" className="py-24 bg-navy-dark relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-premium/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full">
            The Ascendra Edge
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white">
            Ascendra Advantage Pathway
          </h2>
          <div className="h-[3px] w-16 bg-gold-premium rounded" />
          <p className="text-silver-soft/75 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
            Our strategic debt advisory methodology bridges the gap between capital seekers and financial institutions with velocity, intelligence, and premium terms.
          </p>
        </div>

        {/* Timeline representation */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central gold line track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-premium/65 via-gold-champagne/40 to-gold-premium/10 md:-translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {PILLARS.map((pillar, idx) => {
              const IconComponent = pillar.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={pillar.id}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Glowing Node */}
                  <div className="absolute left-4 md:left-1/2 top-2 w-8 h-8 rounded-full bg-navy-dark border-[2.5px] border-gold-premium flex items-center justify-center -translate-x-1/2 z-20 shadow-gold-glow">
                    <div className="w-2.5 h-2.5 rounded-full bg-gold-champagne animate-pulse" />
                  </div>

                  {/* Left / Right Card Container */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                      className="glass-panel p-6 rounded-2xl hover:border-gold-premium/35 transition-all duration-300 relative group"
                    >
                      {/* Subtitle */}
                      <span className="text-[10px] font-mono tracking-widest text-gold-champagne uppercase font-bold">
                        0{pillar.id} - {pillar.subtitle}
                      </span>
                      
                      {/* Title */}
                      <div className={`flex items-center gap-3 mt-1.5 mb-3 justify-start ${isEven ? "md:justify-end" : ""}`}>
                        {!isEven && (
                          <div className="w-9 h-9 rounded-lg bg-navy-royal/50 border border-gold-premium/20 flex items-center justify-center text-gold-champagne">
                            <IconComponent className="w-4 h-4" />
                          </div>
                        )}
                        <h3 className="font-display font-semibold text-white text-lg tracking-wide">
                          {pillar.title}
                        </h3>
                        {isEven && (
                          <div className="w-9 h-9 rounded-lg bg-navy-royal/50 border border-gold-premium/20 flex items-center justify-center text-gold-champagne">
                            <IconComponent className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-silver-soft/85 text-xs md:text-sm leading-relaxed mb-4">
                        {pillar.description}
                      </p>

                      {/* Bullets List */}
                      <ul className={`space-y-1.5 border-t border-gold-premium/10 pt-3 flex flex-col ${
                        isEven ? "md:items-end" : "items-start"
                      }`}>
                        {pillar.bullets.map((bullet, bi) => (
                          <li key={bi} className="text-[11px] text-gold-champagne/90 flex items-start gap-1.5">
                            {!isEven && <span className="text-gold-premium">•</span>}
                            <span>{bullet}</span>
                            {isEven && <span className="text-gold-premium">•</span>}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Spacer for MD screens to align timeline */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
