"use client";

import React from "react";
import { useSmoothTilt } from "@/hooks/useSmoothTilt";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  lift?: number;
  onClick?: () => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onHoverEnd?: () => void;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  lift = 3,
  onClick,
  onMouseMove,
  onHoverEnd,
}: TiltCardProps) {
  const { handleMouseMove, handleMouseLeave, getTransform } = useSmoothTilt(maxTilt);

  return (
    <div
      onClick={onClick}
      onMouseMove={(e) => {
        handleMouseMove(e);
        onMouseMove?.(e);
      }}
      onMouseLeave={() => {
        handleMouseLeave();
        onHoverEnd?.();
      }}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transform: getTransform(lift),
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
