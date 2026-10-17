"use client";

import { useEffect, useRef } from "react";

/* Lightweight canvas sakura petals drifting across the hero.
   - Renders nothing when the user prefers reduced motion.
   - Petals are simple ellipses; no images needed, so it stays fast. */

type Petal = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  sway: number;
  swaySpeed: number;
  phase: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
};

const PETAL_COUNT = 26;

export default function SakuraParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip animation entirely for reduced-motion users.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const makePetal = (fromTop: boolean): Petal => ({
      x: rand(0, width),
      y: fromTop ? rand(-40, -10) : rand(0, height),
      size: rand(5, 11),
      speedY: rand(0.4, 1.2),
      sway: rand(15, 45),
      swaySpeed: rand(0.008, 0.02),
      phase: rand(0, Math.PI * 2),
      rotation: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.02, 0.02),
      alpha: rand(0.35, 0.8),
    });

    let petals: Petal[] = Array.from({ length: PETAL_COUNT }, () =>
      makePetal(false)
    );

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of petals) {
        p.y += p.speedY;
        p.phase += p.swaySpeed;
        p.rotation += p.rotSpeed;
        p.x += Math.sin(p.phase) * 0.4;

        // Recycle petals that fall below the viewport.
        if (p.y > height + 30) Object.assign(p, makePetal(true));

        ctx.save();
        ctx.translate(p.x + Math.sin(p.phase) * p.sway * 0.15, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        // Petal shape: soft pink ellipse, slightly pointed.
        ctx.fillStyle = "#f9a8d4";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.62, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = p.alpha * 0.5;
        ctx.fillStyle = "#ff9ebb";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.55, p.size * 0.34, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // Pause when the tab is hidden to save battery.
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      petals = [];
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
