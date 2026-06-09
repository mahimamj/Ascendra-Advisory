"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

const NAV = [
  { name: "Why Us", href: "#about" },
  { name: "Solutions", href: "#solutions" },
  { name: "Industries", href: "#industries" },
  { name: "Process", href: "#journey" },
  { name: "Outcomes", href: "#testimonials" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled ? "bg-navy-dark/90 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="section-container flex justify-between items-center">
          <a href="#" aria-label="Ascendra Advisory home">
            <Logo idPrefix="header" showTagline={false} />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((l) => (
              <a key={l.name} href={l.href} className="text-sm text-gray-muted hover:text-white transition-colors">
                {l.name}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden lg:inline-flex btn-primary px-5 py-2.5 text-xs items-center gap-1.5">
            Book Consultation <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button onClick={() => setOpen(!open)} className="lg:hidden text-white" aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-[68px] left-0 w-full bg-navy-dark/98 backdrop-blur-xl border-b border-white/5 z-40 py-6 px-6 lg:hidden"
          >
            {NAV.map((l) => (
              <a key={l.name} href={l.href} onClick={() => setOpen(false)} className="block py-3 text-white font-medium border-b border-white/5">{l.name}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary block text-center mt-4 py-3 text-sm">Book Consultation</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
