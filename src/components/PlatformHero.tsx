"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { PlatformHeroVariant } from "@/lib/site";

type PlatformHeroProps = {
  variant: PlatformHeroVariant;
  title: string;
};

const TYPING_CHARS = "asdf jkl; the quick brown fox".split("");

function usePointerParallax() {
  const ref = useRef<HTMLDivElement>(null);

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
      const rect = root.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      root.style.setProperty("--hx", String(currentX));
      root.style.setProperty("--hy", String(currentY));
      raf = requestAnimationFrame(tick);
    };

    root.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      root.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}

function KingdomKeysHero({ title }: { title: string }) {
  const ref = usePointerParallax();
  const [wpm, setWpm] = useState(42);
  const floats = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        char: TYPING_CHARS[i % TYPING_CHARS.length],
        left: 8 + (i * 11) % 84,
        delay: i * 0.7,
        dur: 4 + (i % 3),
      })),
    [],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setWpm((value) => {
        const next = value + Math.floor(Math.random() * 5) - 2;
        return Math.min(78, Math.max(38, next));
      });
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className="platform-hero platform-hero--space relative h-56 overflow-hidden rounded-2xl border border-signal/20 md:h-72"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#0a1220] to-[#050912]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          transform: "translate(calc(var(--hx, 0) * 12px), calc(var(--hy, 0) * 8px))",
        }}
      >
        {[0, 1, 2].map((orbit) => (
          <div
            key={orbit}
            className="platform-orbit absolute left-1/2 top-1/2"
            style={
              {
                "--orbit-r": `${48 + orbit * 36}px`,
                animationDuration: `${14 + orbit * 6}s`,
                animationDelay: `${-orbit * 3}s`,
              } as CSSProperties
            }
          >
            <span
              className={`block h-3 w-3 rounded-full shadow-lg md:h-4 md:w-4 ${
                orbit === 0
                  ? "bg-signal shadow-signal/40"
                  : orbit === 1
                    ? "bg-copper shadow-copper/40"
                    : "bg-violet-400 shadow-violet-400/30"
              }`}
            />
          </div>
        ))}
      </div>
      {floats.map((item, index) => (
        <span
          key={`${item.char}-${index}`}
          className="platform-type-float absolute font-mono text-sm text-signal/70"
          style={{
            left: `${item.left}%`,
            bottom: "12%",
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.dur}s`,
          }}
        >
          {item.char}
        </span>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-signal/80">
            Live · Mission Control
          </p>
          <p className="display mt-1 text-2xl text-cream md:text-3xl">{title}</p>
        </div>
        <div className="rounded-xl border border-signal/30 bg-signal/10 px-3 py-2 text-right backdrop-blur-sm">
          <p className="font-mono text-[10px] uppercase tracking-wider text-dim">WPM</p>
          <p className="display text-2xl text-signal">{wpm}</p>
        </div>
      </div>
    </div>
  );
}

const GUIDANCE_CHIPS = [
  { label: "Great for families", tone: "good" as const },
  { label: "With guidance", tone: "warn" as const },
  { label: "Not recommended", tone: "no" as const },
];

function RighteousReviewsHero({ title }: { title: string }) {
  const ref = usePointerParallax();
  const [chipIndex, setChipIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setChipIndex((value) => (value + 1) % GUIDANCE_CHIPS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const chip = GUIDANCE_CHIPS[chipIndex];

  return (
    <div
      ref={ref}
      className="platform-hero platform-hero--reviews relative h-56 overflow-hidden rounded-2xl border border-amber-200/20 md:h-72"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f5] via-[#f3ebe0] to-[#e8dfd0]" />
      <div className="platform-beam absolute -left-1/4 top-0 h-full w-2/3 bg-gradient-to-r from-amber-300/40 via-amber-100/20 to-transparent" />
      <div
        className="absolute right-6 top-6 h-28 w-20 rounded-md border-2 border-stone-300/80 bg-gradient-to-b from-stone-200 to-stone-300 shadow-lg md:h-36 md:w-24"
        style={{
          transform: "translate(calc(var(--hx, 0) * -6px), calc(var(--hy, 0) * -4px)) rotate(-2deg)",
        }}
      >
        <div className="mx-auto mt-3 h-1.5 w-8 rounded-full bg-stone-400/60" />
        <div className="mt-4 space-y-1.5 px-2">
          <div className="h-1 rounded bg-stone-400/50" />
          <div className="h-1 w-4/5 rounded bg-stone-400/40" />
          <div className="h-1 w-3/5 rounded bg-stone-400/30" />
        </div>
      </div>
      <div
        className="absolute left-5 top-1/2 md:left-8"
        style={{
          transform: `translate(calc(var(--hx, 0) * 8px), calc(-50% + var(--hy, 0) * 6px))`,
        }}
      >
        {GUIDANCE_CHIPS.map((item, index) => (
          <span
            key={item.label}
            className={`mb-2 block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all duration-500 md:text-[11px] ${
              index === chipIndex
                ? item.tone === "good"
                  ? "scale-105 bg-emerald-600/90 text-white shadow-md"
                  : item.tone === "warn"
                    ? "scale-105 bg-amber-500/90 text-white shadow-md"
                    : "scale-105 bg-rose-600/90 text-white shadow-md"
                : `scale-95 opacity-40 ${
                    item.tone === "good"
                      ? "bg-emerald-100 text-emerald-800"
                      : item.tone === "warn"
                        ? "bg-amber-100 text-amber-900"
                        : "bg-rose-100 text-rose-900"
                  }`
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#e8dfd0] to-transparent p-5 md:p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-amber-900/60">
          Family reviews · {chip.label}
        </p>
        <p className="display mt-1 text-2xl text-stone-900 md:text-3xl">{title}</p>
      </div>
    </div>
  );
}

function StatsHubHero({ title }: { title: string }) {
  const ref = usePointerParallax();
  const [inning, setInning] = useState(1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setInning((value) => (value >= 9 ? 1 : value + 1));
    }, 3500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className="platform-hero platform-hero--stats relative h-56 overflow-hidden rounded-2xl border border-emerald-500/25 md:h-72"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#081122]" />
      <div className="platform-stats-grid absolute inset-0 opacity-25" />
      <div
        className="absolute inset-x-[8%] top-[12%] h-[58%] rounded-[40%] bg-gradient-to-b from-emerald-900/50 via-emerald-950/30 to-transparent md:top-[10%] md:h-[62%]"
        style={{
          transform: "translate(calc(var(--hx, 0) * 4px), calc(var(--hy, 0) * 3px))",
        }}
      />
      <svg
        viewBox="0 0 200 200"
        className="pointer-events-none absolute left-1/2 top-[42%] h-40 w-40 md:top-[40%] md:h-52 md:w-52"
        style={{
          transform: `translate(calc(-50% + var(--hx, 0) * 8px), calc(-50% + var(--hy, 0) * 6px))`,
        }}
      >
        <path
          d="M100 20 L180 100 L100 180 L20 100 Z"
          fill="#0f3d2e"
          fillOpacity="0.55"
          stroke="#34d399"
          strokeWidth="2"
          strokeOpacity="0.75"
        />
        <path
          d="M100 55 L145 100 L100 145 L55 100 Z"
          fill="none"
          stroke="#34d399"
          strokeWidth="1.25"
          strokeOpacity="0.5"
        />
        <circle cx="100" cy="100" r="3.5" fill="#34d399" fillOpacity="0.9" />
        <path
          className="platform-chalk-line"
          d="M100 100 Q128 88 148 76"
          fill="none"
          stroke="#f0b25c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle className="platform-chalk-dot" cx="100" cy="100" r="4.5" fill="#f0b25c" />
      </svg>
      <div className="absolute left-4 top-4 z-10 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 backdrop-blur-sm">
        <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-300/80">
          Inning {inning}
        </p>
        <p className="font-mono text-xs text-cream">Runner on 2nd · 1 out</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink via-ink/85 to-transparent p-5 pt-12 md:p-6 md:pt-14">
        <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-400/80">
          Player development hub
        </p>
        <p className="display mt-1 text-2xl text-cream md:text-3xl">{title}</p>
      </div>
    </div>
  );
}

export default function PlatformHero({ variant, title }: PlatformHeroProps) {
  switch (variant) {
    case "kingdom-keys":
      return <KingdomKeysHero title={title} />;
    case "righteous-reviews":
      return <RighteousReviewsHero title={title} />;
    case "stats-hub":
      return <StatsHubHero title={title} />;
    default: {
      const _exhaustive: never = variant;
      return _exhaustive;
    }
  }
}
