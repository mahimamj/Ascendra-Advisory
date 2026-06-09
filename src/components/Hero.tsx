"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Building2, SearchCode, Cpu, ShieldCheck, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "@/components/OptimizedImage";

interface FlowStep {
  id: number;
  label: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FLOW_STEPS: FlowStep[] = [
  { id: 1, label: "Assess", tagline: "Map your cash flow & credit profile", icon: Building2 },
  { id: 2, label: "Structure", tagline: "Design debt that fits your cycle", icon: SearchCode },
  { id: 3, label: "Match", tagline: "Auction across 50+ lenders", icon: Cpu },
  { id: 4, label: "Sanction", tagline: "Close terms & documentation", icon: ShieldCheck },
  { id: 5, label: "Deploy", tagline: "Funds released to operations", icon: TrendingUp },
];

export default function Hero() {
  const [activeStep, setActiveStep] = useState(1);
  const [autoCycle, setAutoCycle] = useState(true);

  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 5 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [autoCycle]);

  const current = FLOW_STEPS[activeStep - 1];

  return (
    <section className="relative min-h-screen pt-28 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <OptimizedImage
          src="/images/primary_hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/75 to-navy-dark/35 mix-blend-multiply" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-navy-dark/40 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 py-16">
        <div className="lg:col-span-6 flex flex-col gap-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-premium/5 border border-gold-premium/30 w-fit"
          >
            <Sparkles className="w-4 h-4 text-gold-champagne animate-pulse" />
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gold-champagne">
              Business Financing Advisory
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight"
          >
            Get funded. <br />
            <span className="text-gold-gradient">Scale faster.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-silver-soft/75 text-lg md:text-xl leading-snug max-w-md"
          >
            Structured debt from ₹50L to ₹250Cr+ — matched across 50+ lenders in weeks, not months.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#calculator"
              className="glow-btn px-8 py-4 rounded bg-gold-gradient text-navy-dark font-bold text-sm uppercase tracking-wider shadow-gold-glow flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Check Eligibility
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap gap-6 pt-2 border-t border-gold-premium/10"
          >
            {[
              { stat: "₹500Cr+", label: "Funded" },
              { stat: "1,000+", label: "Businesses" },
              { stat: "95%", label: "Sanction rate" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-xl font-display font-bold text-gold-gradient">{item.stat}</div>
                <div className="text-[10px] uppercase tracking-widest text-silver-soft/50">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-6 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display font-semibold text-white text-lg">How it works</h3>
              <button
                onClick={() => setAutoCycle(!autoCycle)}
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded transition-colors ${
                  autoCycle
                    ? "bg-gold-premium/15 text-gold-champagne border border-gold-premium/20"
                    : "bg-white/5 text-silver-soft/50 border border-white/10"
                }`}
              >
                {autoCycle ? "Auto" : "Manual"}
              </button>
            </div>

            <div className="relative flex justify-between items-start mb-8">
              <div className="absolute top-7 left-[10%] right-[10%] h-px bg-gold-premium/15 pointer-events-none" />
              <motion.div
                className="absolute top-7 left-[10%] h-px bg-gold-gradient pointer-events-none origin-left"
                style={{ width: "80%" }}
                initial={false}
                animate={{
                  scaleX: Math.max(0.08, (activeStep - 1) / (FLOW_STEPS.length - 1)),
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
              {FLOW_STEPS.map((step) => {
                const IconComponent = step.icon;
                const isActive = activeStep === step.id;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStep(step.id);
                      setAutoCycle(false);
                    }}
                    className="flex flex-col items-center text-center relative z-10 group focus:outline-none flex-1"
                  >
                    <motion.div
                      layout
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-14 h-14 rounded-full flex items-center justify-center border ${
                        isActive
                          ? "bg-gold-gradient border-gold-champagne text-navy-dark shadow-gold-intense"
                          : "bg-navy-dark/95 border-gold-premium/20 text-gold-premium group-hover:border-gold-champagne"
                      }`}
                      animate={{ scale: isActive ? 1.08 : 1 }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.div>
                    <span
                      className={`text-[11px] font-semibold mt-2 transition-colors duration-300 ${
                        isActive ? "text-gold-champagne" : "text-silver-soft/50"
                      }`}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-gold-premium/15 pt-6 min-h-[72px] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-[10px] font-mono text-gold-champagne uppercase tracking-widest">
                    Step {activeStep} of 5
                  </span>
                  <p className="font-display font-semibold text-white text-lg mt-1">{current.label}</p>
                  <p className="text-silver-soft/70 text-sm mt-1">{current.tagline}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
