"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Award, Compass, Calculator, Info } from "lucide-react";
import { useSmoothTilt } from "@/hooks/useSmoothTilt";

export default function EligibilityTool() {
  // Inputs state
  const [industry, setIndustry] = useState("manufacturing");
  const [turnover, setTurnover] = useState(15); // in Crores
  const [requirement, setRequirement] = useState(3); // in Crores
  const [businessAge, setBusinessAge] = useState("3-5"); // years
  const [loanPurpose, setLoanPurpose] = useState("expansion");

  // Output states
  const [score, setScore] = useState(720);
  const [confidence, setConfidence] = useState("High"); // High, Medium, Low
  const [confidenceColor, setConfidenceColor] = useState("text-emerald-400");
  const [confidenceBg, setConfidenceBg] = useState("bg-emerald-400/10 border-emerald-400/20");
  const [fundingMin, setFundingMin] = useState(2.1);
  const [fundingMax, setFundingMax] = useState(3.3);
  const [recommendedProducts, setRecommendedProducts] = useState<string[]>([]);

  const { handleMouseMove, handleMouseLeave, getTransform } = useSmoothTilt(5, 0.08);

  // Scoring engine logic
  useEffect(() => {
    let baseScore = 650;

    // 1. Business Age scoring
    if (businessAge === "under-1") baseScore -= 120;
    else if (businessAge === "1-3") baseScore += 20;
    else if (businessAge === "3-5") baseScore += 80;
    else if (businessAge === "above-5") baseScore += 140;

    // 2. Debt-to-Revenue Ratio scoring
    const ratio = requirement / turnover;
    if (ratio > 0.6) {
      baseScore -= 100;
    } else if (ratio > 0.4) {
      baseScore -= 40;
    } else if (ratio < 0.2) {
      baseScore += 90;
    } else {
      baseScore += 30;
    }

    // 3. Industry weighting
    if (industry === "startups") {
      baseScore -= 30; // higher inherent risk for traditional lenders
    } else if (industry === "manufacturing" || industry === "export") {
      baseScore += 50; // banks favor asset-backed & export invoicing
    }

    // Clip score
    const finalScore = Math.max(300, Math.min(900, baseScore));
    setScore(finalScore);

    // Confidence Level
    if (finalScore >= 750) {
      setConfidence("Excellent");
      setConfidenceColor("text-emerald-400");
      setConfidenceBg("bg-emerald-500/10 border-emerald-500/20");
    } else if (finalScore >= 620) {
      setConfidence("Good / Moderate");
      setConfidenceColor("text-amber-400");
      setConfidenceBg("bg-amber-500/10 border-amber-500/20");
    } else {
      setConfidence("Sub-optimal");
      setConfidenceColor("text-rose-400");
      setConfidenceBg("bg-rose-500/10 border-rose-500/20");
    }

    // Potential Funding Range calculation
    let ratioMultiplier = 0.8;
    if (finalScore >= 750) ratioMultiplier = 1.1;
    else if (finalScore >= 620) ratioMultiplier = 0.9;
    else ratioMultiplier = 0.6;

    const calculatedMax = Math.min(requirement * 1.35, turnover * ratioMultiplier);
    const calculatedMin = calculatedMax * 0.7;
    
    setFundingMin(parseFloat(calculatedMin.toFixed(1)));
    setFundingMax(parseFloat(calculatedMax.toFixed(1)));

    // Product recommendations
    const products: string[] = [];
    if (industry === "startups") {
      products.push("Startup Venture Debt (SVD)", "Founder Runway Funding");
    } else if (industry === "export") {
      products.push("Packing Credit & LC Discounting", "Export Bill Purchase (EBP)");
    } else if (industry === "warehousing") {
      products.push("WDRA Warehouse Receipt Finance", "Warehouse Project Credit line");
    } else {
      // General MSME/Manufacturing
      if (finalScore >= 700 && requirement <= 5) {
        products.push("CGTMSE Collateral-Free Cover (up to ₹5Cr)");
      }
      products.push("Working Capital CC/OD Line", "Machinery & Equipment Capital Loan");
    }
    
    setRecommendedProducts(products);
  }, [industry, turnover, requirement, businessAge, loanPurpose]);

  const handleApplyNow = () => {
    // Fill values into form and scroll
    const contactForm = document.getElementById("contact");
    if (contactForm) {
      // Set values on elements if they exist or simulate filling
      const indInput = document.getElementById("form-industry") as HTMLSelectElement;
      const turnInput = document.getElementById("form-turnover") as HTMLSelectElement;
      const reqInput = document.getElementById("form-requirement") as HTMLInputElement;
      const objInput = document.getElementById("form-objective") as HTMLTextAreaElement;

      if (indInput) indInput.value = industry;
      if (turnInput) turnInput.value = turnover <= 5 ? "under-5" : turnover <= 25 ? "5-25" : "above-25";
      if (reqInput) reqInput.value = `₹${requirement} Crore`;
      if (objInput) objInput.value = `Pre-assessed Eligibility Score: ${score}/900. Purpose: ${loanPurpose}. Requesting structuring assessment.`;
      
      contactForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="py-24 bg-transparent border-t border-gold-premium/10 relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-navy-royal/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-premium/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full">
            Eligibility Check
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-black text-white">
            Know your funding range
          </h2>
          <p className="text-silver-soft/65 text-sm max-w-md">
            Instant credit score & debt capacity — no paperwork, no CIBIL impact.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Inputs Column */}
          <div className="lg:col-span-6 glass-panel p-6 md:p-8 rounded-2xl flex flex-col gap-6">
            <h3 className="font-display font-semibold text-white text-lg border-b border-gold-premium/15 pb-3 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-gold-champagne" />
              Your profile
            </h3>

            {/* Industry selection */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-silver-soft/85 flex items-center gap-1.5">
                Industry Sector
                <span title="Sector determines underwriting parameters" className="cursor-help"><Info className="w-3.5 h-3.5 text-silver-soft/40" /></span>
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-champagne transition-colors"
              >
                <option value="manufacturing">Manufacturing & Engineering</option>
                <option value="export">Export & International Trade</option>
                <option value="warehousing">Warehousing & Cold Storage</option>
                <option value="textiles">Textiles & Apparels</option>
                <option value="trading">Wholesale & Trading Distribution</option>
                <option value="startups">Venture-Backed Technology Startups</option>
                <option value="agriculture">Agriculture & Primary Processing</option>
                <option value="msmes">MSMEs / Service Providers</option>
              </select>
            </div>

            {/* Sliders turnover & requirement */}
            <div className="flex flex-col gap-5">
              {/* Turnover slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-silver-soft/85">
                  <span>Annual Turnover</span>
                  <span className="text-gold-champagne font-mono font-semibold text-sm">₹{turnover} Crore</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="150"
                  value={turnover}
                  onChange={(e) => setTurnover(Number(e.target.value))}
                  className="w-full h-1 bg-navy-royal rounded-lg appearance-none cursor-pointer accent-gold-premium"
                />
                <div className="flex justify-between text-[10px] text-silver-soft/40 font-mono">
                  <span>₹1 Cr</span>
                  <span>₹75 Cr</span>
                  <span>₹150 Cr+</span>
                </div>
              </div>

              {/* Requirement slider */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-silver-soft/85">
                  <span>Funding Requirement</span>
                  <span className="text-gold-champagne font-mono font-semibold text-sm">₹{requirement} Crore</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="50"
                  step="0.5"
                  value={requirement}
                  onChange={(e) => setRequirement(Number(e.target.value))}
                  className="w-full h-1 bg-navy-royal rounded-lg appearance-none cursor-pointer accent-gold-premium"
                />
                <div className="flex justify-between text-[10px] text-silver-soft/40 font-mono">
                  <span>₹50 Lakhs</span>
                  <span>₹25 Cr</span>
                  <span>₹50 Cr+</span>
                </div>
              </div>
            </div>

            {/* Age & Purpose Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-silver-soft/85">
                  Business Vintage
                </label>
                <select
                  value={businessAge}
                  onChange={(e) => setBusinessAge(e.target.value)}
                  className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-champagne transition-colors"
                >
                  <option value="under-1">Under 1 Year (Early Stage)</option>
                  <option value="1-3">1 to 3 Years</option>
                  <option value="3-5">3 to 5 Years</option>
                  <option value="above-5">Above 5 Years (Established)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-silver-soft/85">
                  Funding Purpose
                </label>
                <select
                  value={loanPurpose}
                  onChange={(e) => setLoanPurpose(e.target.value)}
                  className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-champagne transition-colors"
                >
                  <option value="expansion">Corporate Expansion / CAPEX</option>
                  <option value="working-capital">Cash Flow / Inventory Setup</option>
                  <option value="machinery">Machinery purchase</option>
                  <option value="export">Pre-shipment/Export order cycle</option>
                  <option value="refinance">Refinancing existing high-cost debt</option>
                </select>
              </div>
            </div>
          </div>

          {/* Outputs / Live Dashboard Column */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="lg:col-span-6 glass-panel p-6 md:p-8 rounded-2xl flex flex-col justify-between border-gold-premium/30 bg-gradient-to-br from-navy-royal/40 to-navy-dark relative overflow-hidden shadow-2xl"
            style={{
              transformStyle: "preserve-3d",
              transform: getTransform(2),
              willChange: "transform",
            }}
          >
            
            {/* Live indicator circle glow */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-gold-premium/10 rounded-full blur-3xl pointer-events-none" />

            {/* Floating 3D perspective rings — tilt on wrapper, spin on child */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 z-0">
              <div className="orbit-tilt-a absolute">
                <div className="orbit-spin-slow w-64 h-64 rounded-full border border-gold-premium border-dashed" />
              </div>
              <div className="orbit-tilt-b absolute">
                <div className="orbit-spin-reverse w-52 h-52 rounded-full border border-gold-champagne/45" />
              </div>
            </div>

            <div className="relative z-10" style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}>
              <h3 
                className="font-display font-semibold text-white text-lg border-b border-gold-premium/15 pb-3 flex items-center gap-2"
                style={{ transform: "translateZ(15px)" }}
              >
                <Compass className="w-5 h-5 text-gold-premium" />
                Your assessment
              </h3>

              {/* Score radial/linear representation */}
              <div className="py-6 flex flex-col items-center justify-center border-b border-gold-premium/10 mb-6" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                <span className="text-[10px] font-mono tracking-widest text-silver-soft/50 uppercase font-bold mb-1">
                  Credit Score
                </span>
                
                {/* Score Big Display */}
                <div className="relative flex items-center justify-center" style={{ transform: "translateZ(30px)" }}>
                  <div className="text-5xl md:text-6xl font-display font-black text-white tracking-tight flex items-baseline">
                    {score}
                    <span className="text-xs font-mono text-silver-soft/40 ml-1 font-normal">/900</span>
                  </div>
                </div>

                {/* Score Status Badge */}
                <div className={`mt-3 px-3 py-1 rounded-full text-xs font-semibold border ${confidenceBg} ${confidenceColor}`} style={{ transform: "translateZ(25px)" }}>
                  {confidence}
                </div>

                {/* 3D-like Suitability Bar */}
                <div 
                  className="w-full max-w-xs h-3 bg-navy-dark/95 border border-gold-premium/20 rounded-full relative overflow-hidden mt-6 shadow-inner"
                  style={{ transform: "translateZ(25px)" }}
                >
                  <div 
                    className="h-full bg-gold-gradient transition-all duration-1000 ease-out relative rounded-full"
                    style={{ width: `${((score - 300) / 600) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-transparent" />
                  </div>
                </div>
              </div>

              {/* Funding Range & Recommendations */}
              <div className="space-y-4" style={{ transform: "translateZ(15px)", transformStyle: "preserve-3d" }}>
                <div 
                  className="flex justify-between items-center bg-navy-dark/45 border border-gold-premium/10 p-4 rounded-xl"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <div>
                    <span className="text-[9px] font-mono font-bold text-silver-soft/50 uppercase tracking-widest block">
                      Debt Capacity
                    </span>
                    <span className="text-white font-semibold text-base">
                      ₹{fundingMin} Cr – ₹{fundingMax} Cr
                    </span>
                  </div>
                  <Award className="w-8 h-8 text-gold-premium/40 animate-pulse" />
                </div>

                <div style={{ transform: "translateZ(10px)" }}>
                  <span className="text-[9px] font-mono font-bold text-silver-soft/50 uppercase tracking-widest block mb-2">
                    Recommended Products
                  </span>
                  <div className="flex flex-col gap-2">
                    {recommendedProducts.map((p, pi) => (
                      <div key={pi} className="flex items-center gap-2 text-xs text-silver-soft/90 bg-navy-royal/30 p-2.5 rounded border border-gold-premium/5 hover:border-gold-premium/30 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-premium shrink-0" />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-8 pt-5 border-t border-gold-premium/15 relative z-10" style={{ transform: "translateZ(20px)" }}>
              <button
                onClick={handleApplyNow}
                className="w-full glow-btn bg-gold-gradient text-navy-dark py-3.5 rounded font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-glow active:scale-95 transition-transform"
              >
                Book Advisory Session
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
              <p className="text-center text-[10px] text-silver-soft/40 mt-3">
                Pre-fills your profile. No CIBIL impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
