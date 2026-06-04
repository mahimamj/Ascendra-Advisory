"use client";

import React, { useState } from "react";
import { dbService, Lead, Appointment } from "@/lib/supabase";
import { MessageSquare, Phone, Calendar, Clock, Lock, Sparkles, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import confetti from "canvas-confetti";

const TIME_SLOTS = [
  "10:00 AM - 10:45 AM",
  "11:30 AM - 12:15 PM",
  "02:00 PM - 02:45 PM",
  "03:30 PM - 04:15 PM",
  "05:00 PM - 05:45 PM"
];

const NEXT_DAYS = [
  { name: "Mon", date: "June 8" },
  { name: "Tue", date: "June 9" },
  { name: "Wed", date: "June 10" },
  { name: "Thu", date: "June 11" },
  { name: "Fri", date: "June 12" }
];

export default function LeadCaptureForm() {
  // Form states
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("manufacturing");
  const [turnover, setTurnover] = useState("5-25");
  const [fundingRequirement, setFundingRequirement] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fundingObjective, setFundingObjective] = useState("");

  // Appointment scheduling states
  const [selectedDay, setSelectedDay] = useState("June 8");
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM - 10:45 AM");

  // Interaction status states
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [registeredLeadId, setRegisteredLeadId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !phone || !email) return;

    setSubmitting(true);

    const leadData: Lead = {
      name,
      company,
      industry,
      turnover,
      fundingRequirement,
      phone,
      email,
      fundingObjective
    };

    const appointmentData: Appointment = {
      name,
      email,
      phone,
      company,
      date: selectedDay,
      timeSlot: selectedSlot,
      notes: fundingObjective
    };

    // Parallel insert in localStorage mock DB
    const [leadRes, apptRes] = await Promise.all([
      dbService.submitLead(leadData),
      dbService.submitAppointment(appointmentData)
    ]);

    setSubmitting(false);

    if (leadRes.success && apptRes.success) {
      setSubmitted(true);
      setRegisteredLeadId(leadRes.data?.id || "lead_mock_1");

      // Celebrate with premium confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#E8C86A", "#041A3A", "#FFFFFF"]
      });
    }
  };

  const getWhatsAppLink = () => {
    const message = `Hi Ascendra Advisory, I've just submitted our strategy consultation intake form for ${company}.
Details:
- Industry: ${industry}
- Funding Required: ${fundingRequirement || "Not Specified"}
- Turnovers: ${turnover} Cr approx.
- Scheduled Slot: ${selectedDay} at ${selectedSlot}.
Please assign a Credit Structuring Director to call me.`;
    return `https://wa.me/912268428888?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="contact" className="py-24 bg-navy-dark relative border-t border-gold-premium/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(7,40,92,0.15)_0%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct info & Certifications */}
          <div className="lg:col-span-5 flex flex-col gap-8 text-left">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-champagne px-3 py-1 bg-gold-premium/5 border border-gold-premium/20 rounded-full w-fit">
                Intake Terminal
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-white leading-tight">
                Schedule Your Funding Strategy Session
              </h2>
              <div className="h-[3px] w-16 bg-gold-premium rounded mt-1" />
            </div>

            <p className="text-silver-soft/75 text-sm md:text-base leading-relaxed">
              Connect directly with an in-house credit structuring advisor. We review your turnover profiles, optimize parameters, and map credit guarantees before approaching bank committees.
            </p>

            {/* Direct Contact Blocks */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4 bg-navy-royal/35 border border-gold-premium/10 p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gold-premium/10 border border-gold-premium/25 flex items-center justify-center text-gold-champagne">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-silver-soft/50 uppercase tracking-widest block">
                    Underwriting Office Line
                  </span>
                  <span className="text-white font-semibold text-sm">
                    +91-22-6842-8888
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-navy-royal/35 border border-gold-premium/10 p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-gold-premium/10 border border-gold-premium/25 flex items-center justify-center text-gold-champagne">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-silver-soft/50 uppercase tracking-widest block">
                    Advisory Inbox
                  </span>
                  <span className="text-white font-semibold text-sm">
                    structuring@ascendraadvisory.com
                  </span>
                </div>
              </div>
            </div>

            {/* Privacy note */}
            <div className="flex items-start gap-3 text-silver-soft/50 border-t border-gold-premium/10 pt-6 mt-4">
              <Lock className="w-5 h-5 text-gold-premium/50 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-semibold text-silver-soft/70">Data Confidentiality Protocol:</span> All uploaded statements, turnovers, and company assets are stored in encrypted client instances. Financial records are never submitted to banks without your signed term-sheet authorization.
              </div>
            </div>
          </div>

          {/* Right Column: Intake Terminal Form */}
          <div className="lg:col-span-7 w-full">
            <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
              
              {/* Success View */}
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
                      Intake Complete – ID: {registeredLeadId}
                    </span>
                    <h3 className="font-display font-bold text-white text-2xl mt-2">
                      Strategy Session Registered
                    </h3>
                    <p className="text-silver-soft/85 text-xs md:text-sm mt-3 max-w-md mx-auto leading-relaxed">
                      Your business profile and selected slot ({selectedDay} at {selectedSlot}) have been locked into our system. A Structuring Director will call you shortly.
                    </p>
                  </div>

                  {/* Immediate WhatsApp Action */}
                  <div className="mt-4 p-5 bg-navy-royal/40 border border-gold-premium/15 rounded-xl w-full flex flex-col items-center gap-4">
                    <div>
                      <h4 className="font-display font-semibold text-white text-sm">
                        Prefer Instant Dispatch?
                      </h4>
                      <p className="text-silver-soft/60 text-xs mt-1">
                        Connect with our active desk on WhatsApp to share spreadsheets or ask fast questions.
                      </p>
                    </div>
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="glow-btn bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded font-bold text-xs uppercase tracking-widest flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 fill-white" />
                      Chat with Advisor via WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                /* Main Form View */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-silver-soft/80">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-4 py-2.5 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors"
                        required
                      />
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-silver-soft/80">
                        Company Registered Name *
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Acme Corporates Pvt Ltd"
                        className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-4 py-2.5 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Industry */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-silver-soft/80">
                        Industry Sector *
                      </label>
                      <select
                        id="form-industry"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-champagne transition-colors"
                      >
                        <option value="manufacturing">Manufacturing</option>
                        <option value="export">Export & Trade</option>
                        <option value="warehousing">Warehousing</option>
                        <option value="textiles">Textiles</option>
                        <option value="trading">Wholesale & Trade</option>
                        <option value="startups">Tech Startups</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="msmes">MSMEs</option>
                      </select>
                    </div>

                    {/* Turnover */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-silver-soft/80">
                        Annual Turnover *
                      </label>
                      <select
                        id="form-turnover"
                        value={turnover}
                        onChange={(e) => setTurnover(e.target.value)}
                        className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold-champagne transition-colors"
                      >
                        <option value="under-5">Under ₹5 Crores</option>
                        <option value="5-25">₹5 – ₹25 Crores</option>
                        <option value="25-100">₹25 – ₹100 Crores</option>
                        <option value="above-100">Above ₹100 Crores</option>
                      </select>
                    </div>

                    {/* Funding Requirement */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-silver-soft/80">
                        Requirement Amount *
                      </label>
                      <input
                        type="text"
                        id="form-requirement"
                        value={fundingRequirement}
                        onChange={(e) => setFundingRequirement(e.target.value)}
                        placeholder="e.g. ₹5 Crore"
                        className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-4 py-2.5 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-silver-soft/80 flex justify-between">
                        <span>Contact Phone *</span>
                        {phone.length > 0 && phone.length < 10 && (
                          <span className="text-[9px] text-amber-400 lowercase normal-case">incomplete number</span>
                        )}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-4 py-2.5 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-silver-soft/80">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-4 py-2.5 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Objective */}
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-silver-soft/80">
                      Funding Objectives & Structuring Requests
                    </label>
                    <textarea
                      id="form-objective"
                      value={fundingObjective}
                      onChange={(e) => setFundingObjective(e.target.value)}
                      placeholder="Outline any challenges with current interest rates, collateral caps, or timeline blocks..."
                      rows={3}
                      className="w-full bg-navy-dark/95 border border-gold-premium/20 rounded px-4 py-2.5 text-xs text-white placeholder-silver-soft/40 focus:outline-none focus:border-gold-champagne transition-colors resize-none"
                    />
                  </div>

                  {/* Interactive Calendar Slots widget */}
                  <div className="flex flex-col gap-3 border-t border-gold-premium/15 pt-4 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-silver-soft/85 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold-premium" />
                      Select Advisory Slot
                    </span>

                    {/* Days selectors */}
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {NEXT_DAYS.map((day) => (
                        <button
                          type="button"
                          key={day.date}
                          onClick={() => setSelectedDay(day.date)}
                          className={`px-3 py-2 rounded text-[10px] font-bold uppercase border transition-colors shrink-0 ${
                            selectedDay === day.date
                              ? "bg-gold-gradient text-navy-dark border-gold-champagne shadow-gold-glow"
                              : "bg-navy-dark/50 border-gold-premium/10 text-silver-soft/70 hover:border-gold-premium/30"
                          }`}
                        >
                          <span className="block font-normal text-[9px] lowercase leading-none mb-1 opacity-70">
                            {day.name}
                          </span>
                          {day.date}
                        </button>
                      ))}
                    </div>

                    {/* Time Slots selectors */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-2.5 py-2.5 rounded text-[10px] font-medium border text-center transition-colors ${
                            selectedSlot === slot
                              ? "bg-gold-premium/15 text-gold-champagne border-gold-premium/45 font-bold"
                              : "bg-navy-dark/45 border-gold-premium/10 text-silver-soft/60 hover:border-gold-premium/20"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full glow-btn bg-gold-gradient text-navy-dark py-4 rounded font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-gold-glow active:scale-98 transition-transform mt-3 cursor-pointer"
                  >
                    {submitting ? "Processing intake..." : "Schedule My Funding Strategy Session"}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-silver-soft/40">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-premium/50" />
                    Secure SSL Enforced Intake. Powered by Ascendra Secure Client Portal.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
