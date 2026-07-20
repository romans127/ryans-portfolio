"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: string;
  className?: string;
};

function parseTarget(value: string): {
  numeric: number | null;
  suffix: string;
  prefix: string;
} {
  if (value === "∞") {
    return { numeric: null, suffix: "∞", prefix: "" };
  }

  const match = value.match(/^(\D*)(\d+)(.*)$/);
  if (!match) {
    return { numeric: null, suffix: value, prefix: "" };
  }

  return {
    prefix: match[1] ?? "",
    numeric: Number(match[2]),
    suffix: match[3] ?? "",
  };
}

export default function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { numeric, suffix, prefix } = parseTarget(value);
  const [display, setDisplay] = useState(
    numeric === null ? value : `${prefix}0${suffix}`,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || numeric === null) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let started = false;
    const duration = 900;

    const animate = (timestamp: number) => {
      if (!started) {
        started = true;
        frame = timestamp;
      }
      const progress = Math.min((timestamp - frame) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(numeric * eased);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [numeric, prefix, suffix, value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
