"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { MessageSquare, Search, Layers, CheckCircle, Banknote } from "lucide-react";

const STEPS = [
  { id: 1, label: "Consultation", desc: "Understand your capital requirements and growth objectives.", icon: MessageSquare },
  { id: 2, label: "Assessment", desc: "Evaluate credit profile, cash flows and lender fit.", icon: Search },
  { id: 3, label: "Structuring", desc: "Design optimal debt terms across our lender network.", icon: Layers },
  { id: 4, label: "Approval", desc: "Coordinate sanction and documentation with institutions.", icon: CheckCircle },
  { id: 5, label: "Disbursement", desc: "Capital released and deployed into your operations.", icon: Banknote },
];

export default function FundingJourney() {
  const [active, setActive] = useState(1);

  return (
    <section id="journey" className="section-pad border-t border-white/5">
      <div className="section-container">
        <SectionHeader
          eyebrow="The Process"
          title="Your funding journey"
          subtitle="A structured path from first conversation to capital deployment."
        />

        {/* Desktop timeline */}
        <div className="hidden lg:block">
          <div className="relative flex justify-between items-start mb-10">
            <div className="absolute top-6 left-[5%] right-[5%] h-px bg-white/10" />
            <motion.div
              className="absolute top-6 left-[5%] h-px bg-gold-premium origin-left"
              style={{ width: "90%" }}
              initial={false}
              animate={{ scaleX: Math.max(0.05, (active - 1) / (STEPS.length - 1)) }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = active === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActive(step.id)}
                  className="flex flex-col items-center relative z-10 flex-1 focus:outline-none group"
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-400 ${
                      isActive
                        ? "bg-gold-gradient border-gold-champagne text-navy-dark shadow-gold-glow"
                        : "bg-navy-mid border-white/10 text-gray-muted group-hover:border-gold-premium/30"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-semibold mt-3 transition-colors ${isActive ? "text-gold-champagne" : "text-gray-subtle"}`}>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="glass-panel rounded-xl p-8 max-w-2xl mx-auto text-center"
          >
            <h3 className="text-white font-semibold text-xl">{STEPS[active - 1].label}</h3>
            <p className="text-gray-muted mt-2">{STEPS[active - 1].desc}</p>
          </motion.div>
        </div>

        {/* Mobile stacked */}
        <div className="lg:hidden space-y-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.id} delay={i * 0.05}>
                <div className="glass-panel rounded-xl p-5 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-gold-premium/10 border border-gold-premium/20 flex items-center justify-center text-gold-premium shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gold-premium uppercase">Step {step.id}</span>
                    <h3 className="text-white font-semibold">{step.label}</h3>
                    <p className="text-gray-muted text-sm mt-1">{step.desc}</p>
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