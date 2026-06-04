"use client";

import React, { useState, useEffect } from "react";
import { X, Mail, Send, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { dbService, Lead } from "@/lib/supabase";
import confetti from "canvas-confetti";

export default function GmailFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [requirement, setRequirement] = useState("");

  // Trigger modal after 3 seconds
  useEffect(() => {
    // Check if they already filled it or dismissed it in this session to prevent annoying loops
    const dismissed = sessionStorage.getItem("ascendra_modal_dismissed");
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem("ascendra_modal_dismissed", "true");
  };

  const handleGmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !email || !phone) return;

    // Record lead in local DB
    const leadData: Lead = {
      name,
      company,
      industry: "Not Specified (Modal Intake)",
      turnover: "Not Specified",
      fundingRequirement: requirement,
      phone,
      email,
      fundingObjective: "Submitted via Instant Gmail Intake Modal."
    };
    await dbService.submitLead(leadData);

    // Compile prefilled email contents
    const subject = `Corporate Funding Intake - ${company}`;
    const body = `Dear Ascendra Advisory,

We would like to request an intake assessment for corporate financing.
Here are our company details:

- Contact Name: ${name}
- Company: ${company}
- Corporate Email: ${email}
- Contact Phone: ${phone}
- Estimated Funding Required: ${requirement || "To be discussed"}

Please assign a Credit Structuring Director to review our files.

Sincerely,
${name}
${company}`;

    // Direct Gmail Compose URL (opens a web browser Gmail window)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=structuring@ascendraadvisory.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Fallback standard mailto link
    const mailtoUrl = `mailto:structuring@ascendraadvisory.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Proactively launch Gmail compose tab
    const newWindow = window.open(gmailUrl, "_blank");
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      // If popup blocker intervened, fallback to mailto redirect
      window.location.href = mailtoUrl;
    }

    // Celebrate & close
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#D4AF37", "#E8C86A", "#FFFFFF"]
    });

    handleDismiss();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Dark transparent backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-navy-dark/80 backdrop-blur-sm"
          />

          {/* Form Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="glass-panel w-full max-w-md rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 border-gold-premium/30 bg-gradient-to-b from-navy-royal/60 to-navy-dark text-left"
          >
            {/* Dismiss cross */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-silver-soft/40 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
              aria-label="Dismiss form"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="flex flex-col gap-1 mb-5">
              <span className="text-[9px] font-mono tracking-widest text-gold-champagne uppercase font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-gold-premium animate-pulse" />
                Instant Advisory channel
              </span>
              <h3 className="font-display font-bold text-white text-lg leading-tight">
                Corporate Intake Terminal
              </h3>
              <p className="text-silver-soft/60 text-xs mt-1">
                Submit details below to open a pre-filled dispatch via Gmail.
              </p>
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleGmailSubmit} className="flex flex-col gap-4">
              {/* Contact Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-silver-soft/80">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Robert Shaw"
                  className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-3.5 py-2 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors"
                  required
                />
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-silver-soft/80">
                  Company Name *
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Zenith Logistix Pvt Ltd"
                  className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-3.5 py-2 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-silver-soft/80">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-3.5 py-2 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-silver-soft/80">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-3.5 py-2 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Funding Amount */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-silver-soft/80">
                  Estimated Funding Required
                </label>
                <input
                  type="text"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="e.g. ₹10 Crore"
                  className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-3.5 py-2 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors"
                />
              </div>

              {/* Submit via Gmail Button */}
              <button
                type="submit"
                className="w-full glow-btn bg-gold-gradient text-navy-dark py-3 rounded font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-glow active:scale-98 transition-all mt-2 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                Submit via Gmail
                <Send className="w-3 h-3" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] text-silver-soft/30 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-premium/50" />
                Intake is logged & securely prefilled.
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
