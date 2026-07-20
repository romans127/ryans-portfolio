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
                  ? "bg-[#38bdf814] border-[#38bdf840] text-[#38bdf8]"
                  : "bg-transparent border-[#1e2d3d] text-[#8b98ac] hover:border-[#38bdf830] hover:text-[#e8edf5]"
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
                        ? "bg-[#38bdf8] border-[#38bdf8] shadow-[0_0_0_4px_#38bdf814]"
                        : "bg-[#0a0e14] border-[#38bdf840]"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((current) => (current === key ? null : key))
                    }
                    className={`w-full text-left p-5 md:p-6 rounded-lg border bg-[#0f1520]/90 backdrop-blur-sm space-y-3 card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38bdf840] ${
                      item.highlight || isOpen
                        ? "border-[#38bdf830]"
                        : "border-[#1e2d3d]"
                    }`}
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-[#e8edf5]">
                            {item.role}
                          </h3>
                          <span className="text-xs px-1.5 py-0.5 rounded bg-[#38bdf810] text-[#38bdf8] font-mono">
                            {item.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-sm text-[#38bdf8]">{item.company}</p>
                          <span className="text-[#4a5568]">·</span>
                          <p className="text-xs text-[#4a5568]">{item.location}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#4a5568] shrink-0">
                        {item.year}
                      </span>
                    </div>

                    <p
                      className={`text-sm text-[#8b98ac] leading-relaxed transition-all ${
                        isOpen ? "line-clamp-none" : "line-clamp-2"
                      }`}
                    >
                      {item.summary}
                    </p>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span key={tag} className="skill-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-[11px] font-mono text-[#4a5568] shrink-0">
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
