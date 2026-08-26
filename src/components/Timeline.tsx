"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";

type TimelineItem = {
  year: string;
  role: string;
  company: string;
  type: string;
  location: string;
  tags: string[];
  summary: string;
  highlight: boolean;
  engagements?: { client: string; period: string; detail: string }[];
};

type TimelineProps = {
  items: TimelineItem[];
};

const filters = ["All", "Full-time", "Consulting"] as const;

export default function Timeline({ items }: TimelineProps) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [expanded, setExpanded] = useState<string | null>(() => {
    const highlighted = items.find((item) => item.highlight);
    return highlighted ? `${highlighted.company}-${highlighted.year}` : null;
  });

  const visible = useMemo(
    () =>
      active === "All" ? items : items.filter((item) => item.type === active),
    [active, items],
  );

  return (
    <div className="space-y-6">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter experience by engagement type"
      >
        {filters.map((filter) => {
          const selected = active === filter;
          return (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(filter)}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all border ${
                selected
                  ? "border-signal/40 bg-signal/10 text-signal"
                  : "border-line text-stone hover:border-signal/30 hover:text-cream"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <div className="relative pl-6">
        <div className="timeline-line" />
        <div className="space-y-6">
          {visible.map((item, index) => {
            const key = `${item.company}-${item.year}`;
            const isOpen = expanded === key;

            return (
              <Reveal key={key} delayMs={index * 40}>
                <div className="relative">
                  <div
                    className={`absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full border-2 transition-colors ${
                      item.highlight || isOpen
                        ? "border-signal bg-signal shadow-[0_0_0_4px_#4cc9f014]"
                        : "border-signal/40 bg-ink"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((current) => (current === key ? null : key))
                    }
                    className={`card-hover w-full space-y-3 rounded-2xl border bg-panel/90 p-5 text-left backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/40 md:p-6 ${
                      item.highlight || isOpen ? "border-signal/30" : "border-line"
                    }`}
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-medium text-cream">{item.role}</h3>
                          <span className="rounded bg-signal/10 px-1.5 py-0.5 font-mono text-xs text-signal">
                            {item.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-sm text-copper">{item.company}</p>
                          <span className="text-dim">·</span>
                          <p className="text-xs text-dim">{item.location}</p>
                        </div>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-dim">
                        {item.year}
                      </span>
                    </div>

                    <p
                      className={`text-sm leading-relaxed text-stone transition-all ${
                        isOpen ? "line-clamp-none" : "line-clamp-2"
                      }`}
                    >
                      {item.summary}
                    </p>

                    {isOpen && item.engagements && item.engagements.length > 0 && (
                      <div className="space-y-3 border-t border-line pt-4">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-dim">
                          Client engagements
                        </p>
                        {item.engagements.map((engagement) => (
                          <div
                            key={engagement.client}
                            className="rounded-xl border border-line bg-raised/60 p-4"
                          >
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <p className="text-sm font-medium text-copper">
                                {engagement.client}
                              </p>
                              <p className="font-mono text-[11px] text-dim">
                                {engagement.period}
                              </p>
                            </div>
                            <p className="mt-2 text-sm leading-relaxed text-stone">
                              {engagement.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span key={tag} className="skill-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="shrink-0 font-mono text-[11px] text-dim">
                        {isOpen ? "Collapse" : "Expand"}
                      </span>
                    </div>
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
