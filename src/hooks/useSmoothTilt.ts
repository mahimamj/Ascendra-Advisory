"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface TiltState {
  rx: number;
  ry: number;
  lift: number;
}

export function useSmoothTilt(maxTilt = 6, smoothing = 0.1) {
  const [tilt, setTilt] = useState<TiltState>({ rx: 0, ry: 0, lift: 0 });
  const target = useRef({ rx: 0, ry: 0 });
  const current = useRef({ rx: 0, ry: 0 });
  const hovering = useRef(false);
  const rafId = useRef<number | null>(null);

  const animate = useCallback(() => {
    current.current.rx += (target.current.rx - current.current.rx) * smoothing;
    current.current.ry += (target.current.ry - current.current.ry) * smoothing;

    const nearTarget =
      Math.abs(target.current.rx - current.current.rx) < 0.02 &&
      Math.abs(target.current.ry - current.current.ry) < 0.02;

    if (nearTarget) {
      current.current.rx = target.current.rx;
      current.current.ry = target.current.ry;
    }

    const isSettled =
      !hovering.current &&
      Math.abs(current.current.rx) < 0.02 &&
      Math.abs(current.current.ry) < 0.02;

    if (isSettled) {
      current.current = { rx: 0, ry: 0 };
      target.current = { rx: 0, ry: 0 };
      setTilt({ rx: 0, ry: 0, lift: 0 });
      rafId.current = null;
      return;
    }

    setTilt({
      rx: current.current.rx,
      ry: current.current.ry,
      lift: hovering.current ? 1 : 0,
    });

    rafId.current = requestAnimationFrame(animate);
  }, [smoothing]);

  const startAnimation = useCallback(() => {
    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      target.current = {
        rx: -y * maxTilt * 2,
        ry: x * maxTilt * 2,
      };
      hovering.current = true;
      startAnimation();
    },
    [maxTilt, startAnimation]
  );

  const handleMouseLeave = useCallback(() => {
    target.current = { rx: 0, ry: 0 };
    hovering.current = false;
    startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const getTransform = (liftPx = 3) =>
    `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-${tilt.lift * liftPx}px)`;

  return { tilt, handleMouseMove, handleMouseLeave, getTransform };
}
