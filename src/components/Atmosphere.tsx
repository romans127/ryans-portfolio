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

const pulseStars: PulseStar[] = (() => {
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
})();

export default function Atmosphere() {
  return (
    <div className="site-atmosphere" aria-hidden="true">
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
