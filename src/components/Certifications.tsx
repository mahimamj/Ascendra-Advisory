"use client";

import React, { useState } from "react";
import { ShieldCheck, Landmark, FileCheck, Award, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "@/components/TiltCard";

interface CertCard {
  id: number;
  title: string;
  badge: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CERTS: CertCard[] = [
  {
    id: 1,
    title: "Security",
    badge: "ISO 27001",
    description: "Bank-grade encryption for all financial data.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Lending",
    badge: "RBI Co-Lending",
    description: "Compliant with Reserve Bank of India mandates.",
    icon: Landmark,
  },
  {
    id: 3,
    title: "Warehousing",
    badge: "WDRA Accredited",
    description: "eNWR-backed warehouse receipt financing.",
    icon: FileCheck,
  },
  {
    id: 4,
    title: "Subsidies",
    badge: "MSME Partner",
    description: "CGTMSE & government scheme facilitation.",
    icon: Award,
  },
];

export default function Certifications() {
  const [spotlight, setSpotlight] = useState<{ id: number; x: number; y: number } | null>(null);

  return (
    <section id="certifications" className="py-28 bg-transparent border-t border-gold-premium/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center flex flex-col items-center gap-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full">
            Trust & Compliance
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white">
            Regulated. Certified. Secure.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {CERTS.map((cert, idx) => {
            const IconComponent = cert.icon;
            const isHovered = spotlight?.id === cert.id;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <TiltCard
                  maxTilt={5}
                  lift={3}
                  className="glass-panel p-6 rounded-2xl flex flex-col gap-4 h-full relative overflow-hidden"
                  onHoverEnd={() => setSpotlight(null)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setSpotlight({
                      id: cert.id,
                      x: e.clientX - rect.left,
                      y: e.clientY - rect.top,
                    });
                  }}
                >
                  {isHovered && (
                    <div
                      className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle 120px at ${spotlight.x}px ${spotlight.y}px, rgba(232, 200, 106, 0.08), transparent)`,
                      }}
                    />
                  )}
                  <div className="w-10 h-10 rounded-lg bg-navy-royal/60 border border-gold-premium/15 flex items-center justify-center text-gold-champagne">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-silver-soft/45 uppercase tracking-widest">{cert.title}</span>
                    <h3 className="font-display font-semibold text-white text-lg mt-1">{cert.badge}</h3>
                    <p className="text-silver-soft/65 text-xs mt-2 leading-relaxed">{cert.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 mt-auto pt-3 border-t border-gold-premium/5">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
