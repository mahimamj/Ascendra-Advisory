"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeader({ eyebrow, title, subtitle, align = "center" }: SectionHeaderProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <ScrollReveal className={`flex flex-col gap-4 mb-14 md:mb-20 max-w-3xl ${align === "center" ? "mx-auto" : ""} ${alignClass}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <h2 className="font-sans text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.12] tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-muted text-base md:text-lg leading-relaxed max-w-2xl">{subtitle}</p>
      )}
    </ScrollReveal>
  );
}
