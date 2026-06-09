"use client";

import React from "react";
import { Shield, Users, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const values = [
    {
      title: "Trusted Partnership",
      description: "We work directly alongside your executive team to construct long-term, scalable financial routes.",
      icon: Users,
    },
    {
      title: "Intelligent Structuring",
      description: "Custom cash-flow and moratorium mappings aligned to your business's physical trade timelines.",
      icon: Shield,
    },
    {
      title: "Multi-Lender Auditing",
      description: "Simultaneous term-sheet access to 50+ banking, public debt, and private credit institutions.",
      icon: Award,
    },
    {
      title: "Capital Acceleration",
      description: "Debt structured to scale manufacturing lines, raw materials, logistics, and venture runway.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="about" className="py-24 bg-navy-dark relative border-t border-gold-premium/15 overflow-hidden">
      {/* Background decorative glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-navy-royal/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-premium/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Card */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden border border-gold-premium/25 shadow-2xl relative group bg-navy-royal/30 p-2.5"
            >
              <div className="rounded-xl overflow-hidden relative aspect-[4/3] lg:aspect-[3/4]">
                <img
                  src="/images/about_advisory.png"
                  alt="Trusted Financial Partner advising SME business owners"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Copy & Core Values */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full w-fit">
                Trusted Financial Partner
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-white leading-tight">
                Empowering Enterprises <br />
                <span className="text-gold-gradient">With Financial Integrity</span>
              </h2>
              <div className="h-[3px] w-16 bg-gold-premium rounded mt-1" />
            </div>

            <p className="text-silver-soft/85 text-sm leading-relaxed max-w-xl">
              At Ascendra Advisory, we bridge the gap between scaling companies and financial institutions. By combining expert cash-flow analysis with a multi-lender network, we structure debt packages that avoid equity dilution and fuel real operational momentum.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-navy-royal border border-gold-premium/15 flex items-center justify-center text-gold-champagne shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-white text-sm tracking-wide">
                        {v.title}
                      </h4>
                      <p className="text-silver-soft/60 text-xs mt-1 leading-relaxed">
                        {v.description}
                      </p>
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
