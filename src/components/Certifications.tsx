"use client";

import React from "react";
import { ShieldCheck, Landmark, ShieldAlert, Award, FileCheck, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface CertCard {
  id: number;
  title: string;
  badge: string;
  description: string;
  icon: any;
}

const CERTS: CertCard[] = [
  {
    id: 1,
    title: "Information Security",
    badge: "ISO/IEC 27001 Certified",
    description: "Establishes bank-grade confidentiality, integrity, and safety protocols for all uploaded corporate balance sheets and credit profiles.",
    icon: ShieldCheck
  },
  {
    id: 2,
    title: "Institutional Lending",
    badge: "RBI Co-Lending Compliant",
    description: "Operates in strict alignment with the co-lending mandates of the Reserve Bank of India, linking public banks with private credit.",
    icon: Landmark
  },
  {
    id: 3,
    title: "Post-Harvest Financing",
    badge: "WDRA Accredited Brokerage",
    description: "Authorized to coordinate pre-sanction audits and execute debt placements against Negotiable Warehouse Receipts (eNWR) nationwide.",
    icon: FileCheck
  },
  {
    id: 4,
    title: "Sovereign Subsidies",
    badge: "MSME Scheme Partner",
    description: "Officially registered advisory network for facilitating collateral-free CGTMSE guarantees and Technology Upgradation Subsidies.",
    icon: Award
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-navy-dark border-t border-gold-premium/15 relative overflow-hidden">
      {/* Background glowing highlights */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-navy-royal/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gold-premium/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full">
            Trust & Compliance Seals
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white">
            Institutional Certifications
          </h2>
          <div className="h-[3px] w-16 bg-gold-premium rounded" />
          <p className="text-silver-soft/75 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
            Ascendra Advisory operates under the highest global security and regulatory benchmarks to ensure your enterprise transactions are secure and compliant.
          </p>
        </div>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CERTS.map((cert, idx) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-gold-premium/35 hover:-translate-y-1 transition-all duration-300 h-full shadow-lg relative group overflow-hidden"
              >
                {/* Accent glow on top right */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gold-premium/5 group-hover:bg-gold-premium/15 rounded-full blur-xl transition-colors" />

                <div>
                  <div className="w-10 h-10 rounded-lg bg-navy-royal/60 border border-gold-premium/15 flex items-center justify-center text-gold-champagne mb-5 group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  
                  <span className="text-[10px] font-mono tracking-widest text-silver-soft/50 uppercase font-semibold block mb-1">
                    {cert.title}
                  </span>
                  
                  <h3 className="font-display font-semibold text-white text-base mb-3 group-hover:text-gold-champagne transition-colors">
                    {cert.badge}
                  </h3>
                  
                  <p className="text-silver-soft/75 text-xs leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 mt-auto pt-3 border-t border-gold-premium/5">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  Active Compliance Audit
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
