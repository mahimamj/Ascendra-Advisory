"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      alpha: number;
      type: "rupee" | "coin" | "arrow" | "star" | "bubble";
      rotation: number;
      rotationSpeed: number;
    }

    const particles: Particle[] = [];

    const spawnParticle = (startFar = false): Particle => {
      const types: Particle["type"][] = ["rupee", "coin", "arrow", "star", "bubble"];
      return {
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: startFar ? Math.random() * 900 + 100 : 1000,
        size: Math.random() * 1.8 + 1,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15 - 0.12,
        speedZ: -(Math.random() * 0.8 + 0.4),
        alpha: Math.random() * 0.3 + 0.12,
        type: types[Math.floor(Math.random() * types.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.004,
      };
    };

    for (let i = 0; i < 70; i++) {
      particles.push(spawnParticle(true));
    }

    interface Trail {
      x: number;
      baseY: number;
      phase: number;
      speed: number;
      color: string;
      width: number;
    }

    const trails: Trail[] = [
      { x: -100, baseY: 0.2, phase: 0, speed: 0.6, color: "rgba(212, 175, 55, 0.04)", width: 3 },
      { x: -100, baseY: 0.55, phase: 1.5, speed: 0.5, color: "rgba(232, 200, 106, 0.03)", width: 4 },
      { x: -100, baseY: 0.82, phase: 3, speed: 0.7, color: "rgba(212, 175, 55, 0.025)", width: 2 },
    ];

    const animate = () => {
      frame++;
      ctx.fillStyle = "rgba(15, 44, 89, 0.12)";
      ctx.fillRect(0, 0, width, height);

      trails.forEach((trail) => {
        trail.phase += 0.008;
        trail.x += trail.speed;
        const y = height * trail.baseY + Math.sin(trail.phase) * 18;

        ctx.beginPath();
        ctx.strokeStyle = trail.color;
        ctx.lineWidth = trail.width;
        ctx.lineCap = "round";
        ctx.moveTo(trail.x - trail.speed * 3, y - Math.sin(trail.phase - 0.02) * 18);
        ctx.lineTo(trail.x, y);
        ctx.stroke();

        if (trail.x > width + 120) {
          trail.x = -120;
          trail.phase = Math.random() * Math.PI * 2;
        }
      });

      if (frame % 3 === 0) {
        particles.sort((a, b) => b.z - a.z);
      }

      particles.forEach((p, idx) => {
        p.z += p.speedZ;
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.z <= 20 || p.z > 1050) {
          particles[idx] = spawnParticle(false);
          return;
        }

        const fov = 350;
        const scale = fov / (fov + p.z);
        const projX = width / 2 + p.x * scale;
        const projY = height / 2 + p.y * scale;
        const projSize = p.size * scale * 32;
        const projAlpha = Math.min(p.alpha, scale * 2);

        if (projX < -80 || projX > width + 80 || projY < -80 || projY > height + 80) {
          return;
        }

        ctx.save();
        ctx.translate(projX, projY);
        ctx.rotate(p.rotation);

        if (p.type === "rupee") {
          ctx.fillStyle = `rgba(232, 200, 106, ${projAlpha * 0.5})`;
          ctx.font = `bold ${Math.max(14, projSize)}px sans-serif`;
          ctx.fillText("₹", -projSize / 3, projSize / 3);
        } else if (p.type === "coin") {
          ctx.beginPath();
          ctx.arc(0, 0, projSize / 1.8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(212, 175, 55, ${projAlpha * 0.55})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.fillStyle = `rgba(212, 175, 55, ${projAlpha * 0.6})`;
          ctx.font = `bold ${Math.max(9, projSize * 0.7)}px sans-serif`;
          ctx.fillText("₹", -projSize / 4, projSize / 4);
        } else if (p.type === "arrow") {
          ctx.fillStyle = `rgba(34, 197, 94, ${projAlpha * 0.4})`;
          ctx.font = `bold ${Math.max(14, projSize)}px sans-serif`;
          ctx.fillText("↑", -projSize / 3, projSize / 3);
        } else if (p.type === "bubble") {
          ctx.beginPath();
          ctx.arc(0, 0, projSize / 1.6, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(-projSize / 8, -projSize / 8, 0, 0, 0, projSize / 1.6);
          grad.addColorStop(0, `rgba(255, 255, 255, ${projAlpha * 0.15})`);
          grad.addColorStop(1, `rgba(212, 175, 55, ${projAlpha * 0.15})`);
          ctx.fillStyle = grad;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, projSize / 5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 200, 106, ${projAlpha * 0.5})`;
          ctx.fill();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen object-cover pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
