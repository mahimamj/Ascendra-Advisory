"use client";

import React from "react";
import { Linkedin, MessageSquare, ShieldCheck, Landmark, Award } from "lucide-react";
import Logo from "@/components/Logo";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "ISO 27001" },
  { icon: Landmark, label: "RBI Compliant" },
  { icon: Award, label: "MSME Partner" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/5 pt-16 pb-10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/5">
          <div className="lg:col-span-1">
            <a href="#" className="inline-block mb-5" aria-label="Ascendra Advisory home">
              <Logo idPrefix="footer" />
            </a>
            <p className="text-gray-subtle text-sm leading-relaxed max-w-xs">
              Institutional debt structuring for ambitious Indian enterprises.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://linkedin.com" className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-gray-muted hover:text-gold-champagne hover:border-gold-premium/30 transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="https://wa.me/919582876556" className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-gray-muted hover:text-gold-champagne hover:border-gold-premium/30 transition-colors"><MessageSquare className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Solutions</h4>
            <div className="flex flex-col gap-2.5">
              {["Working Capital", "Business Loans", "Project Finance", "Government Schemes"].map((s) => (
                <a key={s} href="#solutions" className="text-gray-subtle text-sm hover:text-gold-champagne transition-colors">{s}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <div className="flex flex-col gap-2.5 text-sm text-gray-subtle">
              <span>+91 958-287-6556</span>
              <span>structuring@ascendraadvisory.ai</span>
              <span className="text-xs leading-relaxed">Level 8, Naman Centre, BKC, Mumbai 400051</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Trust & Compliance</h4>
            <div className="flex flex-col gap-3">
              {TRUST_BADGES.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.label} className="flex items-center gap-2.5 text-sm text-gray-muted">
                    <Icon className="w-4 h-4 text-gold-premium/70" />
                    {b.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-subtle">
          <p>© {new Date().getFullYear()} Ascendra Advisory. Independent debt arranger — approvals subject to partner bank underwriting.</p>
          <p className="text-gold-premium/60">Created by Mahima Joshi · Team Social Tusk</p>
        </div>
      </div>
    </footer>
  );
}
