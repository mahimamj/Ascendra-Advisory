"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Building2, SearchCode, Cpu, ShieldCheck, HelpCircle, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FlowStep {
  id: number;
  label: string;
  sub: string;
  description: string;
  details: string[];
  icon: any;
}

const FLOW_STEPS: FlowStep[] = [
  {
    id: 1,
    label: "Business Intake",
    sub: "Data Aggregation",
    icon: Building2,
    description: "Your operational cash flows, turnovers, and growth objectives are digitized into our secure credit portal.",
    details: ["Instant ledger & bank state analysis", "Data ingestion under bank-grade encryption", "Sector-specific financial mapping"]
  },
  {
    id: 2,
    label: "Funding Analysis",
    sub: "Proprietary Scoring",
    icon: SearchCode,
    description: "Our proprietary credit evaluation engine checks interest limits, coverage ratios, and scheme availabilities.",
    details: ["Instant credit score diagnostics", "Debt service coverage ratio (DSCR) scan", "Government subsidy screening"]
  },
  {
    id: 3,
    label: "Financial Structuring",
    sub: "Risk Optimization",
    icon: Cpu,
    description: "We structure the debt to match your trade timelines, adjusting tranches, moratoriums, and security covenants.",
    details: ["Repayment matching seasonal revenues", "Collateral optimization (CGTMSE paths)", "Weighted average interest rate reduction"]
  },
  {
    id: 4,
    label: "Lender Network",
    sub: "Consortium Matching",
    icon: HelpCircle, // Will use custom visual
    description: "Ascendra coordinates with 50+ institutional partners—combining public banks, private credit, and venture funds.",
    details: ["Multi-lender term sheet auctions", "Parallel processing to avoid delays", "Consortium credit allocation"]
  },
  {
    id: 5,
    label: "Sanction & Approval",
    sub: "Underwriting Closure",
    icon: ShieldCheck,
    description: "Final credit sanction letters are issued with optimized credit rates, clean covenants, and maximum disbursement caps.",
    details: ["Standardized credit validation", "Minimized pre-disbursement documentation", "Fast-tracked legal vetting"]
  },
  {
    id: 6,
    label: "Accelerated Growth",
    sub: "Capital Deployment",
    icon: TrendingUp,
    description: "Funds are released directly into your cash cycle, fueling raw buying, exports, startup runway, or asset setups.",
    details: ["Capital dispatched to operations", "Structured post-funding reviews", "Subsidies claims initiation"]
  }
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeStep, setActiveStep] = useState(1);
  const [autoCycle, setAutoCycle] = useState(true);

  // Background light trails canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      fadeSpeed: number;
    }

    const particles: Particle[] = [];
    const spawnParticle = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedY: -(Math.random() * 0.4 + 0.1),
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      fadeSpeed: Math.random() * 0.003 + 0.001,
    });

    for (let i = 0; i < 60; i++) {
      particles.push(spawnParticle());
    }

    // Light trails ribbons
    interface TrailPoint {
      x: number;
      y: number;
      angle: number;
      speed: number;
      color: string;
      width: number;
    }

    const trails: TrailPoint[] = [
      { x: 0, y: height * 0.3, angle: 0.1, speed: 1.2, color: "rgba(212, 175, 55, 0.08)", width: 4 },
      { x: 0, y: height * 0.5, angle: -0.05, speed: 0.9, color: "rgba(232, 200, 106, 0.05)", width: 6 },
      { x: 0, y: height * 0.7, angle: 0.15, speed: 1.5, color: "rgba(212, 175, 55, 0.06)", width: 3 },
    ];

    const animate = () => {
      // Clear slightly to create motion blur trails
      ctx.fillStyle = "rgba(4, 26, 58, 0.25)";
      ctx.fillRect(0, 0, width, height);

      // Draw light trails (ribbons)
      trails.forEach((trail) => {
        ctx.beginPath();
        ctx.strokeStyle = trail.color;
        ctx.lineWidth = trail.width;
        ctx.lineCap = "round";

        ctx.moveTo(trail.x, trail.y);
        
        // Advance trails
        trail.x += trail.speed;
        trail.y += Math.sin(trail.x * 0.005 + trail.angle) * 1.2;

        ctx.lineTo(trail.x, trail.y);
        ctx.stroke();

        // Loop trails back
        if (trail.x > width + 100) {
          trail.x = -50;
          trail.y = Math.random() * height;
        }
      });

      // Draw particles
      particles.forEach((p, idx) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(232, 200, 106, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Update physics
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha -= p.fadeSpeed;

        if (p.alpha <= 0 || p.y < 0) {
          particles[idx] = spawnParticle();
          particles[idx].y = height + 10;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Cycle ecosystem flow step
  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 6 ? 1 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [autoCycle]);

  return (
    <section className="relative min-h-screen pt-28 flex items-center overflow-hidden">
      {/* Background canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none z-0" />
      
      {/* Radial overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-navy-dark/40 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
        {/* Left Headline Area */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-premium/5 border border-gold-premium/30 w-fit"
          >
            <Sparkles className="w-4 h-4 text-gold-champagne animate-pulse" />
            <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gold-champagne">
              Enterprise Debt & Capital Structuring
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight"
          >
            Capital That <br />
            <span className="text-gold-gradient">Accelerates Growth.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-silver-soft/80 text-base md:text-lg leading-relaxed max-w-xl"
          >
            Structured financing solutions designed to help businesses optimize cash flow, unlock expansion opportunities, and scale with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <a
              href="#calculator"
              className="glow-btn px-7 py-3.5 rounded bg-gold-gradient text-navy-dark font-bold text-sm uppercase tracking-wider shadow-gold-glow flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Get Funding Assessment
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 rounded bg-navy-royal/35 border border-gold-premium/35 text-white font-bold text-sm uppercase tracking-wider hover:bg-navy-royal/60 hover:border-gold-champagne transition-all"
            >
              Speak with an Advisor
            </a>
          </motion.div>
        </div>

        {/* Right Interactive Ecosystem Visual */}
        <div className="lg:col-span-6 w-full flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-semibold text-white tracking-wide text-lg">
                Interactive Credit Pathway
              </h3>
              <button
                onClick={() => setAutoCycle(!autoCycle)}
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded transition-colors ${
                  autoCycle
                    ? "bg-gold-premium/15 text-gold-champagne border border-gold-premium/20"
                    : "bg-white/5 text-silver-soft/50 border border-white/10"
                }`}
              >
                {autoCycle ? "Auto-play: On" : "Auto-play: Off"}
              </button>
            </div>

            {/* Path Nodes Grid */}
            <div className="relative grid grid-cols-3 gap-y-8 gap-x-4 mb-6">
              {/* Connecting lines overlay */}
              <div className="absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-gold-premium/10 pointer-events-none z-0 hidden sm:block" />
              <div className="absolute top-[108px] left-[15%] right-[15%] h-[1px] bg-gold-premium/10 pointer-events-none z-0 hidden sm:block" />

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
                    className="flex flex-col items-center text-center relative z-10 group focus:outline-none"
                  >
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-500 ${
                        isActive
                          ? "bg-gold-gradient border-gold-champagne text-navy-dark shadow-gold-intense scale-110"
                          : "bg-navy-dark/95 border-gold-premium/20 text-gold-premium group-hover:border-gold-champagne group-hover:scale-105"
                      }`}
                    >
                      <IconComponent className={`w-6 h-6 ${isActive ? "stroke-[2]" : "stroke-[1.5]"}`} />
                    </div>
                    <span
                      className={`text-[11px] font-semibold tracking-wide mt-2 transition-colors duration-300 ${
                        isActive ? "text-gold-champagne font-bold" : "text-silver-soft/60 group-hover:text-silver-soft"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="text-[9px] font-mono text-silver-soft/40 tracking-wider">
                      0{step.id}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Details Panel */}
            <div className="border-t border-gold-premium/15 pt-5 min-h-[140px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col gap-3"
                >
                  <div>
                    <span className="text-[10px] font-mono font-semibold text-gold-champagne uppercase tracking-widest">
                      Step 0{activeStep} - {FLOW_STEPS[activeStep - 1].sub}
                    </span>
                    <h4 className="font-display font-semibold text-white text-base mt-0.5">
                      {FLOW_STEPS[activeStep - 1].label}
                    </h4>
                  </div>
                  <p className="text-silver-soft/75 text-xs md:text-sm leading-relaxed">
                    {FLOW_STEPS[activeStep - 1].description}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                    {FLOW_STEPS[activeStep - 1].details.map((detail, index) => (
                      <li key={index} className="text-[11px] text-gold-champagne/80 flex items-start gap-1.5">
                        <span className="text-gold-premium font-bold mt-0.5">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
