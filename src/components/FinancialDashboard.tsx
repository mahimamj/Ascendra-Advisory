"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowUpRight, Activity } from "lucide-react";

const BARS = [42, 58, 48, 72, 65, 88, 78, 95];
const INSIGHTS = [
  { label: "Sanction Rate", value: "94.2%", trend: "+2.1%" },
  { label: "Avg. Disbursal", value: "18 days", trend: "Fast-track" },
  { label: "Active Mandates", value: "₹127 Cr", trend: "Live" },
];

export default function FinancialDashboard() {
  return (
    <div className="relative w-full">
      <div className="absolute -inset-4 bg-gold-premium/5 rounded-3xl blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="glass-panel-strong rounded-2xl p-5 md:p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-gold-premium/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-mono text-gray-subtle uppercase tracking-widest">Capital Overview</span>
            <p className="text-white font-semibold text-sm mt-0.5">Funding Pipeline</p>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-gold" />
            <span className="text-[10px] font-mono text-emerald-400">Live</span>
          </div>
        </div>

        {/* Main metric */}
        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-widest text-gray-subtle">Capital Deployed (YTD)</span>
          <div className="flex items-end gap-3 mt-1">
            <motion.span
              className="text-3xl md:text-4xl font-bold text-white tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ₹<span className="text-gold-gradient">482</span> Cr
            </motion.span>
            <span className="flex items-center gap-0.5 text-emerald-400 text-xs font-semibold mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              +24.8%
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="glass-panel rounded-xl p-4 mb-4">
          <div className="flex items-end justify-between gap-1.5 h-28">
            {BARS.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-gold-muted/30 to-gold-premium/80 origin-bottom"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[9px] font-mono text-gray-subtle uppercase">
            <span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span>
          </div>
        </div>

        {/* Insight cards */}
        <div className="grid grid-cols-3 gap-2">
          {INSIGHTS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="glass-panel rounded-lg p-3"
            >
              <span className="text-[9px] text-gray-subtle uppercase tracking-wider block">{item.label}</span>
              <span className="text-white font-semibold text-sm mt-1 block">{item.value}</span>
              <span className="text-[9px] text-gold-champagne mt-0.5 block">{item.trend}</span>
            </motion.div>
          ))}
        </div>

        {/* Floating card */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-2 md:-right-4 top-1/3 glass-panel rounded-xl px-3 py-2.5 flex items-center gap-2"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          <Activity className="w-4 h-4 text-gold-premium" />
          <div>
            <span className="text-[9px] text-gray-subtle block">New Mandate</span>
            <span className="text-white text-xs font-semibold">₹18.5 Cr</span>
          </div>
          <ArrowUpRight className="w-3 h-3 text-emerald-400" />
        </motion.div>
      </motion.div>
    </div>
  );
}
