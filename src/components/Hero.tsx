"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import FinancialDashboard from "@/components/FinancialDashboard";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-mesh pt-28 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-navy-light/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-premium/4 rounded-full blur-[100px]" />
      </div>

      <div className="section-container w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div className="flex flex-col gap-8 max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-premium/20 bg-gold-premium/5 w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold-premium" />
              <span className="section-eyebrow text-[10px]">Institutional Advisory</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight"
            >
              Capital Solutions Built for{" "}
              <span className="text-gold-gradient">Ambitious Businesses.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="text-gray-muted text-lg leading-relaxed"
            >
              Structured financing for MSMEs, startups, manufacturers, infrastructure projects and growth-focused enterprises.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#contact" className="btn-primary glow-btn px-7 py-3.5 text-sm flex items-center gap-2">
                Book a Consultation
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#solutions" className="btn-secondary px-7 py-3.5 text-sm">
                Explore Solutions
              </a>
            </motion.div>
          </div>

          {/* Right — Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.3 }}
          >
            <FinancialDashboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
