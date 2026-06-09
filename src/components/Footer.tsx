"use client";

import React, { useState } from "react";
import { Linkedin, Twitter, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // Simulate API registration
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-navy-dark border-t border-gold-premium/20 pt-16 pb-12 relative overflow-hidden">
      {/* Background radial gold glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-premium/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-navy-royal/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gold-premium/10">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <a href="#" className="flex items-center gap-3.5 group select-none">
              {/* Logo Symbol (Stylized A) */}
              <svg
                viewBox="0 0 100 80"
                className="w-12 h-10 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* 3D Shiny Metallic Chrome Gradient */}
                  <linearGradient id="footerSilverGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7A8795" />
                    <stop offset="25%" stopColor="#E6ECF4" />
                    <stop offset="50%" stopColor="#9FB0C3" />
                    <stop offset="75%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#8E9DAE" />
                  </linearGradient>
                  {/* 3D Shiny Metallic Gold Gradient */}
                  <linearGradient id="footerGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8A6B0E" />
                    <stop offset="25%" stopColor="#F9E08F" />
                    <stop offset="50%" stopColor="#C29A1F" />
                    <stop offset="75%" stopColor="#FDF0C4" />
                    <stop offset="100%" stopColor="#A07E15" />
                  </linearGradient>
                </defs>

                {/* Silver Left Leg: tall diagonal block */}
                <polygon
                  points="12,75 42,12 52,12 22,75"
                  fill="url(#footerSilverGrad)"
                />
                
                {/* Gold Right Leg: tall diagonal block meeting left leg at peak */}
                <polygon
                  points="52,12 62,12 78,75 68,75"
                  fill="url(#footerGoldGrad)"
                />

                {/* Gold Swooping Arrow crossing the frame */}
                <path
                  d="M 8,75 Q 35,62 70,34 L 66,28 L 84,30 L 80,48 L 76,42 Q 38,68 8,75 Z"
                  fill="url(#footerGoldGrad)"
                />
              </svg>

              {/* Vertical Divider */}
              <div className="h-8 w-[1px] bg-gold-premium/30 shrink-0" />

              {/* Logo Text */}
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold tracking-[0.16em] text-xl text-white leading-none">
                  ASCENDRA
                </span>
                <div className="flex items-center gap-1 mt-1">
                  <div className="h-[1px] w-2 bg-gold-premium/50" />
                  <span className="text-[9px] font-sans tracking-[0.32em] text-gold-champagne font-bold uppercase leading-none">
                    ADVISORY
                  </span>
                  <div className="h-[1px] w-2 bg-gold-premium/50" />
                </div>
                <span className="text-[7px] font-sans tracking-[0.18em] text-silver-soft/45 font-semibold uppercase mt-1 leading-none">
                  FINANCING | TECH | AUTOMATION
                </span>
              </div>
            </a>
            <p className="text-silver-soft/65 text-sm max-w-xs leading-snug">
              Structured debt advisory for growing businesses.
            </p>
            <div className="flex items-center gap-3.5 mt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-navy-royal/40 border border-gold-premium/15 flex items-center justify-center text-silver-soft hover:text-gold-champagne hover:border-gold-champagne hover:shadow-gold-glow transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-navy-royal/40 border border-gold-premium/15 flex items-center justify-center text-silver-soft hover:text-gold-champagne hover:border-gold-champagne hover:shadow-gold-glow transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919582876556"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded bg-navy-royal/40 border border-gold-premium/15 flex items-center justify-center text-silver-soft hover:text-gold-champagne hover:border-gold-champagne hover:shadow-gold-glow transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold tracking-wider text-white text-sm">
              Solutions
            </h4>
            <div className="flex flex-col gap-2.5">
              <a href="#solutions" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Working Capital Financing
              </a>
              <a href="#solutions" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Business Financing
              </a>
              <a href="#solutions" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Asset & Machinery Financing
              </a>
              <a href="#solutions" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Sector-Specific Financing Solutions
              </a>
              <a href="#solutions" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Startup & Project Financing
              </a>
              <a href="#solutions" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Government-Backed Funding
              </a>
            </div>
          </div>

          {/* Column 3: Industries */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold tracking-wider text-white text-sm">
              Industries
            </h4>
            <div className="flex flex-col gap-2.5">
              <a href="#industries" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Manufacturing Units
              </a>
              <a href="#industries" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Export & Trading
              </a>
              <a href="#industries" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Textiles & Seasonal
              </a>
              <a href="#industries" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Warehousing & Cold Chains
              </a>
              <a href="#industries" className="text-silver-soft/75 hover:text-gold-champagne text-xs transition-colors">
                Tech Startups & MSMEs
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display font-semibold tracking-wider text-white text-sm">
              Market Intelligence
            </h4>
            <p className="text-silver-soft/55 text-xs">
              Scheme alerts & rate updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-navy-royal/40 border border-gold-premium/20 rounded px-3 py-2 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors pr-9"
                  required
                />
                <button
                  type="submit"
                  disabled={loading || subscribed}
                  className="absolute right-1 top-1 w-7 h-7 bg-gold-gradient rounded flex items-center justify-center text-navy-dark hover:scale-105 transition-transform"
                >
                  {subscribed ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              {subscribed && (
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  ✓ Successfully subscribed to briefing.
                </span>
              )}
            </form>
          </div>
        </div>

        {/* Legal & Regulatory Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-silver-soft/40 text-[11px] text-center md:text-left max-w-xl">
            Ascendra Advisory is an independent debt arranger. Approvals subject to partner bank underwriting.
          </p>
          <div className="flex flex-col items-center md:items-end gap-1 shrink-0">
            <p className="text-silver-soft/50 text-xs tracking-wider uppercase font-semibold text-center md:text-right">
              © {new Date().getFullYear()} ASCENDRA ADVISORY. ALL RIGHTS RESERVED.
            </p>
            <p className="text-gold-champagne/70 text-[10px] font-mono tracking-wider uppercase text-center md:text-right">
              Created by Mahima Joshi | Team Social Tusk
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
