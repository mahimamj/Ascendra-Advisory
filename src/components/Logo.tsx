import React from "react";

interface LogoProps {
  idPrefix?: string;
  showTagline?: boolean;
  className?: string;
}

export default function Logo({ idPrefix = "logo", showTagline = true, className = "" }: LogoProps) {
  const silverId = `${idPrefix}SilverGrad`;
  const goldId = `${idPrefix}GoldGrad`;

  return (
    <div className={`flex items-center gap-3.5 group select-none ${className}`}>
      <svg
        viewBox="0 0 100 80"
        className="w-11 h-9 shrink-0 drop-shadow-md group-hover:scale-105 transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={silverId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7A8795" />
            <stop offset="25%" stopColor="#E6ECF4" />
            <stop offset="50%" stopColor="#9FB0C3" />
            <stop offset="75%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#8E9DAE" />
          </linearGradient>
          <linearGradient id={goldId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A6B0E" />
            <stop offset="25%" stopColor="#F9E08F" />
            <stop offset="50%" stopColor="#C29A1F" />
            <stop offset="75%" stopColor="#FDF0C4" />
            <stop offset="100%" stopColor="#A07E15" />
          </linearGradient>
        </defs>
        <polygon points="12,75 42,12 52,12 22,75" fill={`url(#${silverId})`} />
        <polygon points="52,12 62,12 78,75 68,75" fill={`url(#${goldId})`} />
        <path
          d="M 8,75 Q 35,62 70,34 L 66,28 L 84,30 L 80,48 L 76,42 Q 38,68 8,75 Z"
          fill={`url(#${goldId})`}
        />
      </svg>

      <div className="h-8 w-px bg-gold-premium/30 shrink-0" />

      <div className="flex flex-col text-left">
        <span className="font-sans font-bold tracking-[0.16em] text-lg md:text-xl text-white leading-none">
          ASCENDRA
        </span>
        <div className="flex items-center gap-1 mt-1">
          <div className="h-px w-2 bg-gold-premium/50" />
          <span className="text-[9px] font-sans tracking-[0.32em] text-gold-champagne font-bold uppercase leading-none">
            ADVISORY
          </span>
          <div className="h-px w-2 bg-gold-premium/50" />
        </div>
        {showTagline && (
          <span className="text-[7px] font-sans tracking-[0.18em] text-gray-subtle font-semibold uppercase mt-1 leading-none hidden sm:block">
            Financing | Tech | Automation
          </span>
        )}
      </div>
    </div>
  );
}
