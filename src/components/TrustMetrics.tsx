"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MetricItem {
  id: number;
  label: string;
  value: number;
  prefix?: string;
  suffix: string;
  duration: number; // in ms
}

const METRICS: MetricItem[] = [
  { id: 1, label: "Capital Deployed", value: 500, prefix: "₹", suffix: "Cr+", duration: 1800 },
  { id: 2, label: "Businesses Funded", value: 1000, suffix: "+", duration: 2000 },
  { id: 3, label: "Lender Partners", value: 50, suffix: "+", duration: 1500 },
  { id: 4, label: "Sanction Rate", value: 95, suffix: "%", duration: 1600 }
];

export default function TrustMetrics() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect(); // Count only once
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-20 bg-navy-dark relative overflow-hidden">
      {/* Background soft border grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {METRICS.map((metric) => (
            <div key={metric.id} className="flex flex-col items-center text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-gold-gradient mb-2 drop-shadow-md">
                {metric.prefix}
                <Counter target={metric.value} duration={metric.duration} trigger={hasStarted} />
                {metric.suffix}
              </div>
              <div className="h-[2px] w-8 bg-gold-premium/45 mb-3" />
              <p className="text-silver-soft/80 text-xs md:text-sm font-medium tracking-wider uppercase">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface CounterProps {
  target: number;
  duration: number;
  trigger: boolean;
}

function Counter({ target, duration, trigger }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let start = 0;
    const end = target;
    const totalSteps = 60;
    const stepDuration = duration / totalSteps;
    const increment = Math.ceil(end / totalSteps);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [trigger, target, duration]);

  return <span>{count.toLocaleString()}</span>;
}
