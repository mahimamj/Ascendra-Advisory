"use client";

import React, { useState } from "react";
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
  // 3D Card Tilt State
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightX, setSpotlightX] = useState(0);
  const [spotlightY, setSpotlightY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSpotlightX(x);
    setSpotlightY(y);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 10; // Max rotation degrees
    
    const rx = ((centerY - y) / centerY) * maxTilt;
    const ry = ((x - centerX) / centerX) * maxTilt;
    
    setRotateX(rx);
    setRotateY(ry);
    setHoveredCardId(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
    setRotateX(0);
    setRotateY(0);
  };

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
            const isHovered = hoveredCardId === cert.id;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseMove={(e) => handleMouseMove(e, cert.id)}
                onMouseLeave={handleMouseLeave}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between hover:border-gold-premium/45 transition-all duration-300 h-full shadow-lg relative group overflow-hidden cursor-default"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isHovered 
                    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`
                    : `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`,
                  boxShadow: isHovered
                    ? "0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.15)"
                    : "0 10px 30px -15px rgba(0, 0, 0, 0.5), 0 0 0px rgba(0, 0, 0, 0)",
                  transition: isHovered 
                    ? "transform 0.05s ease-out, box-shadow 0.2s ease"
                    : "transform 0.5s ease-out, box-shadow 0.5s ease"
                }}
              >
                {/* Dynamic 3D spotlight highlight */}
                {isHovered && (
                  <div 
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-100 z-10"
                    style={{
                      background: `radial-gradient(circle 120px at ${spotlightX}px ${spotlightY}px, rgba(232, 200, 106, 0.08), transparent)`
                    }}
                  />
                )}

                {/* Accent glow on top right */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gold-premium/5 group-hover:bg-gold-premium/15 rounded-full blur-xl transition-colors" />

                <div style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
                  <div 
                    className="w-10 h-10 rounded-lg bg-navy-royal/60 border border-gold-premium/15 flex items-center justify-center text-gold-champagne mb-5 group-hover:scale-105 transition-transform duration-300"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <IconComponent className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  <span 
                    className="text-[10px] font-mono tracking-widest text-silver-soft/50 uppercase font-semibold block mb-1"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    {cert.title}
                  </span>

                  <h3 
                    className="font-display font-semibold text-white text-base mb-3 group-hover:text-gold-champagne transition-colors"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {cert.badge}
                  </h3>

                  <p 
                    className="text-silver-soft/75 text-xs leading-relaxed mb-4"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    {cert.description}
                  </p>
                </div>

                <div 
                  className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-400 mt-auto pt-3 border-t border-gold-premium/5"
                  style={{ transform: "translateZ(15px)" }}
                >
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
