"use client";

import React, { useState } from "react";
import { dbService, Lead, Appointment } from "@/lib/supabase";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import confetti from "canvas-confetti";
import ScrollReveal from "@/components/ScrollReveal";

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"];
const NEXT_DAYS = ["June 10", "June 11", "June 12", "June 13", "June 14"];

export default function LeadCaptureForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fundingRequirement, setFundingRequirement] = useState("");
  const [selectedDay, setSelectedDay] = useState(NEXT_DAYS[0]);
  const [selectedSlot, setSelectedSlot] = useState(TIME_SLOTS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !phone || !email) return;
    setSubmitting(true);

    const lead: Lead = { name, company, industry: "general", turnover: "5-25", fundingRequirement, phone, email, fundingObjective: "" };
    const appt: Appointment = { name, email, phone, company, date: selectedDay, timeSlot: selectedSlot };

    const [leadRes, apptRes] = await Promise.all([dbService.submitLead(lead), dbService.submitAppointment(appt)]);
    setSubmitting(false);

    if (leadRes.success && apptRes.success) {
      setSubmitted(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.65 }, colors: ["#D4A63C", "#071A35", "#FFFFFF"] });
    }
  };

  return (
    <section id="contact" className="section-pad border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-premium/3 to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <ScrollReveal>
            <span className="section-eyebrow">Get Started</span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-tight mt-4">
              Let&apos;s Structure Your Next Growth Phase.
            </h2>
            <p className="text-gray-muted text-lg mt-5 leading-relaxed max-w-md">
              Connect with our advisory team and discover financing solutions tailored to your business goals.
            </p>
            <a href="#contact" className="btn-primary inline-flex items-center gap-2 mt-8 px-7 py-3.5 text-sm glow-btn lg:hidden">
              Schedule Consultation <ArrowRight className="w-4 h-4" />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="glass-panel-strong rounded-2xl p-6 md:p-8">
              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-white font-bold text-xl">Consultation Scheduled</h3>
                  <p className="text-gray-muted text-sm mt-2">{selectedDay} at {selectedSlot}. We&apos;ll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name *" required className="w-full bg-navy-dark/80 border border-white/8 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-gray-subtle focus:outline-none focus:border-gold-premium/40 transition-colors" />
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company *" required className="w-full bg-navy-dark/80 border border-white/8 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-gray-subtle focus:outline-none focus:border-gold-premium/40 transition-colors" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone *" required className="w-full bg-navy-dark/80 border border-white/8 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-gray-subtle focus:outline-none focus:border-gold-premium/40 transition-colors" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email *" required className="w-full bg-navy-dark/80 border border-white/8 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-gray-subtle focus:outline-none focus:border-gold-premium/40 transition-colors" />
                  </div>
                  <input type="text" value={fundingRequirement} onChange={(e) => setFundingRequirement(e.target.value)} placeholder="Funding requirement (e.g. ₹5 Cr)" className="w-full bg-navy-dark/80 border border-white/8 rounded-md px-4 py-2.5 text-sm text-white placeholder:text-gray-subtle focus:outline-none focus:border-gold-premium/40 transition-colors" />

                  <div className="flex gap-2 flex-wrap">
                    {NEXT_DAYS.map((d) => (
                      <button key={d} type="button" onClick={() => setSelectedDay(d)} className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${selectedDay === d ? "bg-gold-premium/15 border-gold-premium/40 text-gold-champagne" : "border-white/10 text-gray-subtle"}`}>{d}</button>
                    ))}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {TIME_SLOTS.map((s) => (
                      <button key={s} type="button" onClick={() => setSelectedSlot(s)} className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${selectedSlot === s ? "bg-gold-premium/15 border-gold-premium/40 text-gold-champagne" : "border-white/10 text-gray-subtle"}`}>{s}</button>
                    ))}
                  </div>

                  <button type="submit" disabled={submitting} className="btn-primary w-full py-3.5 text-sm glow-btn mt-2">
                    {submitting ? "Scheduling..." : "Schedule Consultation"}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-[10px] text-gray-subtle">
                    <ShieldCheck className="w-3 h-3" /> Encrypted & confidential
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

    </section>
  );
}
