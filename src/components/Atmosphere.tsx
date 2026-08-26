"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type PulseStar = {
  left: number;
  top: number;
  size: number;
  cyan: boolean;
  dur: number;
  delay: number;
  min: number;
  max: number;
};

export default function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null);

  const pulseStars = useMemo<PulseStar[]>(() => {
    const rand = mulberry32(20260826);
    return Array.from({ length: 22 }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: 1 + rand() * 1.8,
      cyan: rand() > 0.72,
      dur: 3.5 + rand() * 5,
      delay: -rand() * 9,
      min: 0.15 + rand() * 0.2,
      max: 0.65 + rand() * 0.3,
    }));
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = 0;

    const onMove = (event: PointerEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.045;
      currentY += (targetY - currentY) * 0.045;
      root.style.setProperty("--mx", currentX.toFixed(4));
      root.style.setProperty("--my", currentY.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="site-atmosphere" aria-hidden="true" ref={ref}>
      <div className="site-atmosphere__base" />
      <div className="site-atmosphere__parallax site-atmosphere__parallax--near">
        <div className="site-atmosphere__wash" />
      </div>
      <div className="site-atmosphere__parallax site-atmosphere__parallax--mid">
        <div className="site-atmosphere__stars site-atmosphere__stars--a" />
        <div className="site-atmosphere__stars site-atmosphere__stars--b" />
        {pulseStars.map((star, index) => (
          <span
            key={index}
            className="site-atmosphere__pulse-star"
            style={
              {
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
                color: star.cyan ? "#4cc9f0" : "#ffffff",
                "--dur": `${star.dur}s`,
                "--delay": `${star.delay}s`,
                "--min": star.min,
                "--max": star.max,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="site-atmosphere__parallax site-atmosphere__parallax--far">
        <div className="site-atmosphere__schematic" />
      </div>
      <div className="site-atmosphere__grain" />
      <div className="site-atmosphere__vignette" />
    </div>
  );
}
