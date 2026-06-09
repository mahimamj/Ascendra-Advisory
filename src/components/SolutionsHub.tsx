"use client";

import React, { useState } from "react";
import { FINANCING_SOLUTIONS, FinancingCategory } from "@/lib/supabase";
import { Shield, FileSpreadsheet, TrendingUp, Cpu, Compass, Award, X, ArrowRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ICON_MAP: Record<string, any> = {
  ShieldAlert: Shield,
  FileSpreadsheet: FileSpreadsheet,
  TrendingUp: TrendingUp,
  Cpu: Cpu,
  Compass: Compass,
  Award: Award
};

export default function SolutionsHub() {
  const [activeCategory, setActiveCategory] = useState<FinancingCategory | null>(null);

  // 3D Card Tilt State
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightX, setSpotlightX] = useState(0);
  const [spotlightY, setSpotlightY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setSpotlightX(x);
    setSpotlightY(y);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 8; // Max degrees to rotate
    
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
    <section id="solutions" className="py-24 bg-navy-dark relative">
      {/* Background soft glowing spots */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-navy-royal/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold-premium/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full">
            Institutional Debt Programs
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-black text-white">
            Financing Solutions Hub
          </h2>
          <div className="h-[3px] w-16 bg-gold-premium rounded" />
          <p className="text-silver-soft/75 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
            From transactional trade finance to long-term infrastructure project funding, explore credit products structured for high-performance scale.
          </p>
        </div>

        {/* Grid of Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FINANCING_SOLUTIONS.map((cat, idx) => {
            const IconComponent = ICON_MAP[cat.icon] || HelpCircle;
            const isHovered = hoveredCardId === cat.id;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveCategory(cat)}
                onMouseMove={(e) => handleMouseMove(e, cat.id)}
                onMouseLeave={handleMouseLeave}
                className="glass-panel p-8 rounded-2xl cursor-pointer hover:border-gold-premium/40 flex flex-col justify-between group h-full shadow-lg relative overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isHovered 
                    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`
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
                      background: `radial-gradient(circle 200px at ${spotlightX}px ${spotlightY}px, rgba(232, 200, 106, 0.08), transparent)`
                    }}
                  />
                )}

                {/* Micro gold shimmer outline on hover */}
                <div className="absolute inset-0 border border-transparent group-hover:border-gold-premium/20 rounded-2xl transition-colors pointer-events-none" />
                
                <div style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
                  {cat.image && (
                    <div 
                      className="w-full h-40 rounded-xl overflow-hidden border border-gold-premium/15 mb-6 relative group-hover:border-gold-premium/30 transition-colors"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/75 via-transparent to-transparent" />
                    </div>
                  )}
                  <div 
                    className="w-12 h-12 rounded-xl bg-navy-royal/60 border border-gold-premium/20 flex items-center justify-center text-gold-champagne mb-6 group-hover:bg-gold-gradient group-hover:text-navy-dark transition-all duration-300"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <IconComponent className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 
                    className="font-display font-semibold text-white text-xl mb-3 tracking-wide"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {cat.title}
                  </h3>
                  <p 
                    className="text-silver-soft/70 text-xs md:text-sm leading-relaxed mb-6"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    {cat.description}
                  </p>
                </div>

                <div 
                  className="flex items-center gap-2 text-xs font-semibold text-gold-champagne group-hover:text-gold-premium transition-colors mt-auto"
                  style={{ transform: "translateZ(15px)" }}
                >
                  Explore {cat.items.length} Programs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Detailed Explorer */}
      <AnimatePresence>
        {activeCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCategory(null)}
              className="absolute inset-0 bg-navy-dark/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass-panel w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-10 shadow-2xl relative z-10 flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCategory(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-silver-soft/60 hover:text-white hover:bg-white/5 p-2 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Icon Header */}
              <div className="flex items-start md:items-center gap-4 pr-10">
                <div className="w-14 h-14 rounded-2xl bg-gold-premium/10 border border-gold-premium/45 flex items-center justify-center text-gold-champagne shrink-0">
                  {React.createElement(ICON_MAP[activeCategory.icon] || HelpCircle, { className: "w-7 h-7" })}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-gold-champagne uppercase font-bold">
                    Financing Solutions
                  </span>
                  <h3 className="font-display font-bold text-white text-2xl md:text-3xl mt-0.5 leading-tight">
                    {activeCategory.title}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8">
                  <p className="text-silver-soft/80 text-sm leading-relaxed">
                    {activeCategory.description}
                  </p>
                </div>
                {activeCategory.image && (
                  <div className="lg:col-span-4 rounded-xl overflow-hidden border border-gold-premium/20 shadow-lg h-32 relative">
                    <img
                      src={activeCategory.image}
                      alt={activeCategory.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
                  </div>
                )}
              </div>

              {activeCategory.whyChoose && activeCategory.whyChoose.length > 0 && (
                <div className="bg-gold-premium/5 border border-gold-premium/15 p-5 rounded-xl flex flex-col gap-3">
                  <h4 className="font-display font-semibold text-gold-champagne text-xs uppercase tracking-widest flex items-center gap-2">
                    <Award className="w-4 h-4 text-gold-premium shrink-0" />
                    Why Choose Ascendra Advisory
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeCategory.whyChoose.map((point, pi) => {
                      const parts = point.split("|");
                      if (parts.length > 1) {
                        return (
                          <li key={pi} className="text-xs flex flex-col gap-0.5">
                            <div className="flex items-start gap-2">
                              <span className="text-gold-premium font-bold mt-0.5">•</span>
                              <span className="text-white font-semibold">{parts[0].trim()}</span>
                            </div>
                            <span className="text-silver-soft/60 pl-4">{parts[1].trim()}</span>
                          </li>
                        );
                      }
                      return (
                        <li key={pi} className="text-xs text-silver-soft/90 flex items-start gap-2">
                          <span className="text-gold-premium font-bold mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Sub product List */}
              <div className="flex flex-col gap-6 mt-2">
                <h4 className="font-display font-semibold text-white border-b border-gold-premium/15 pb-2 text-base tracking-wide">
                  Available Credit Instruments
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeCategory.items.map((item) => (
                    <div
                      key={item.code}
                      className="p-5 rounded-xl bg-navy-royal/30 border border-gold-premium/10 flex flex-col justify-between overflow-hidden relative"
                    >
                      <div>
                        {item.image && (
                          <div className="w-full h-32 rounded-lg overflow-hidden border border-gold-premium/15 mb-4 relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/75 to-transparent" />
                          </div>
                        )}
                        <div className="flex justify-between items-center mb-3">
                          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-gold-premium/10 border border-gold-premium/25 text-gold-champagne rounded uppercase">
                            {item.code}
                          </span>
                        </div>
                        <h5 className="font-display font-semibold text-white text-base mb-2">
                          {item.name}
                        </h5>
                        <p className="text-silver-soft/70 text-xs leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="border-t border-gold-premium/10 pt-3">
                        <span className="text-[10px] font-bold text-white/80 block uppercase tracking-wider mb-2">
                          Program Key Parameters:
                        </span>
                        <ul className="space-y-1.5">
                          {item.features.map((f, fi) => (
                            <li key={fi} className="text-[11px] text-silver-soft/90 flex items-start gap-1.5">
                              <span className="text-gold-premium font-bold mt-0.5">•</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-navy-royal/40 border border-gold-premium/15 p-5 rounded-xl">
                <div>
                  <h5 className="font-display font-semibold text-white text-sm">
                    Ready to evaluate your credit suitability?
                  </h5>
                  <p className="text-silver-soft/60 text-xs">
                    Get an instant suitability report in under 2 minutes.
                  </p>
                </div>
                <a
                  href="#calculator"
                  onClick={() => setActiveCategory(null)}
                  className="glow-btn bg-gold-gradient text-navy-dark px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider shrink-0"
                >
                  Start Assessment
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
