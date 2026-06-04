"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Solutions", href: "#solutions" },
    { name: "Compliance", href: "#certifications" },
    { name: "Industries", href: "#industries" },
    { name: "Advantage", href: "#advantage" },
    { name: "Eligibility Calculator", href: "#calculator" },
    { name: "Gov Schemes", href: "#schemes" },
    { name: "Case Studies", href: "#cases" },
    { name: "Insights", href: "#insights" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-navy-dark/75 backdrop-blur-md border-b border-gold-premium/15 py-4 shadow-lg"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo Brand Area */}
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
                <linearGradient id="headerSilverGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7A8795" />
                  <stop offset="25%" stopColor="#E6ECF4" />
                  <stop offset="50%" stopColor="#9FB0C3" />
                  <stop offset="75%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#8E9DAE" />
                </linearGradient>
                {/* 3D Shiny Metallic Gold Gradient */}
                <linearGradient id="headerGoldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
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
                fill="url(#headerSilverGrad)"
              />
              
              {/* Gold Right Leg: tall diagonal block meeting left leg at peak */}
              <polygon
                points="52,12 62,12 78,75 68,75"
                fill="url(#headerGoldGrad)"
              />

              {/* Gold Swooping Arrow crossing the frame */}
              <path
                d="M 8,75 Q 35,62 70,34 L 66,28 L 84,30 L 80,48 L 76,42 Q 38,68 8,75 Z"
                fill="url(#headerGoldGrad)"
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide text-silver-soft/85 hover:text-gold-champagne transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold-premium hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Call-to-action button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="glow-btn px-6 py-2.5 rounded bg-transparent border border-gold-premium text-gold-champagne text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-gold-premium hover:text-navy-dark flex items-center gap-1.5 shadow-gold-glow"
            >
              Book Strategy Session
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white hover:text-gold-champagne transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[73px] left-0 w-full bg-navy-dark/95 backdrop-blur-xl border-b border-gold-premium/20 z-40 py-8 px-6 flex flex-col gap-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold tracking-wide text-silver-soft/90 hover:text-gold-champagne py-2 border-b border-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded bg-gold-gradient text-navy-dark font-bold tracking-wider uppercase text-sm shadow-gold-glow flex items-center justify-center gap-2"
            >
              Book Strategy Session
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
