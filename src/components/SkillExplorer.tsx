"use client";

import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import { skillGroups } from "@/lib/site";

const filters = ["All", ...skillGroups.map((group) => group.category)] as const;

export default function SkillExplorer() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? skillGroups
        : skillGroups.filter((group) => group.category === active),
    [active],
  );

  return (
    <section className="space-y-6">
      <Reveal className="space-y-2">
        <p className="kicker">Stack</p>
        <h2 className="display text-3xl text-cream">What I reach for</h2>
      </Reveal>

      <Reveal delayMs={40}>
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter skills by category"
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
                className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-all ${
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
      </Reveal>

      <div
        className={`grid gap-4 ${
          visible.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {visible.map((group, index) => (
          <Reveal key={group.category} delayMs={index * 40}>
            <div className="panel card-hover h-full space-y-3 rounded-2xl p-5">
              <p className="font-mono text-[11px] uppercase tracking-wider text-stone">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
