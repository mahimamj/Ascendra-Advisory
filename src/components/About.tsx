"use client";

import React from "react";
import { Shield, Users, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/OptimizedImage";

const VALUES = [
  { title: "50+ Lender Network", description: "Parallel term-sheet access", icon: Users },
  { title: "Cash-Flow Structuring", description: "Debt aligned to your cycles", icon: Shield },
  { title: "No Equity Dilution", description: "Growth capital, not ownership", icon: Award },
  { title: "Fast Sanctions", description: "Weeks, not quarters", icon: TrendingUp },
];

export default function About() {
  return (
    <section id="about" className="py-28 bg-transparent relative border-t border-gold-premium/15 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-navy-royal/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden border border-gold-premium/25 shadow-2xl bg-navy-royal/30 p-2.5"
            >
              <div className="rounded-xl overflow-hidden aspect-[4/3] lg:aspect-[3/4] relative">
                <OptimizedImage
                  src="/images/about_advisory.webp"
                  alt="Ascendra Advisory team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full w-fit">
                Why Ascendra
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-white leading-tight">
                Debt structuring <span className="text-gold-gradient">that works</span>
              </h2>
              <p className="text-silver-soft/75 text-lg max-w-lg leading-snug">
                We connect growing businesses with the right lenders — structured, fast, and without diluting equity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VALUES.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div
                    key={idx}
                    className="glass-panel p-5 rounded-xl flex gap-4 items-start"
                  >
                    <div className="w-10 h-10 rounded-lg bg-navy-royal border border-gold-premium/15 flex items-center justify-center text-gold-champagne shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-white text-sm">{v.title}</h4>
                      <p className="text-silver-soft/55 text-xs mt-1">{v.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
