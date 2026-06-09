"use client";

import React, { useEffect, useRef, useState } from "react";

interface MetricItem {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  duration: number;
}

const METRICS: MetricItem[] = [
  { value: 500, prefix: "₹", suffix: "Cr+", label: "Funding Facilitated", duration: 2000 },
  { value: 500, suffix: "+", label: "Businesses Supported", duration: 1800 },
  { value: 40, suffix: "+", label: "Lending Partners", duration: 1500 },
  { value: 20, suffix: "+", label: "Industries Served", duration: 1400 },
];

export default function TrustMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-white/5 bg-navy-mid/50">
      <div className="section-container py-14 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {METRICS.map((m) => (
            <div key={m.label} className="text-center lg:text-left">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {m.prefix}
                <Counter target={m.value} duration={m.duration} trigger={started} />
                {m.suffix}
              </div>
              <p className="text-gray-subtle text-xs md:text-sm mt-2 uppercase tracking-widest font-medium">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ target, duration, trigger }: { target: number; duration: number; trigger: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const steps = 50;
    const inc = target / steps;
    const interval = setInterval(() => {
      start += inc;
      if (start >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(start));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [trigger, target, duration]);

  return <span>{count.toLocaleString()}</span>;
}
