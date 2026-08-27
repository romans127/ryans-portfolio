"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import Reveal from "@/components/Reveal";
import SkillIcon from "@/components/SkillIcon";
import { getSkillFact } from "@/lib/skill-facts";
import { categoryUsesSkillIcons, getSkillIcon } from "@/lib/skill-icons";
import { skillGroups } from "@/lib/site";

const filters = ["All", ...skillGroups.map((group) => group.category)] as const;

type OpenState = {
  skill: string;
  top: number;
  left: number;
};

export default function SkillExplorer() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const [open, setOpen] = useState<OpenState | null>(null);

  const visible = useMemo(
    () =>
      active === "All"
        ? skillGroups
        : skillGroups.filter((group) => group.category === active),
    [active],
  );

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("[data-skill-root]") && !target.closest("[data-skill-popover]")) {
        setOpen(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    const onScroll = () => setOpen(null);

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", onScroll);
    };
  }, [open]);

  const openFact = open ? getSkillFact(open.skill) : undefined;
  const openIcon = open ? getSkillIcon(open.skill) : undefined;

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
                {group.skills.map((skill) => {
                  const icon = categoryUsesSkillIcons(group.category)
                    ? getSkillIcon(skill)
                    : undefined;

                  if (icon) {
                    const isOpen = open?.skill === skill;

                    return (
                      <span key={skill} className="relative" data-skill-root>
                        <button
                          type="button"
                          className="skill-icon-tag group/icon"
                          title={skill}
                          aria-label={skill}
                          aria-expanded={isOpen}
                          onClick={(event) => {
                            if (isOpen) {
                              setOpen(null);
                              return;
                            }
                            const rect = event.currentTarget.getBoundingClientRect();
                            setOpen({
                              skill,
                              top: rect.bottom + 8,
                              left: rect.left + rect.width / 2,
                            });
                          }}
                          style={
                            {
                              "--skill-brand": `#${icon.hex}`,
                            } as CSSProperties
                          }
                        >
                          <SkillIcon icon={icon} />
                        </button>
                      </span>
                    );
                  }

                  return (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {open && openFact && openIcon && typeof document !== "undefined"
        ? createPortal(
            <div
              className="skill-popover"
              data-skill-popover
              role="status"
              style={{ top: open.top, left: open.left }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-xs font-semibold"
                  style={{ color: `#${openIcon.hex}` }}
                >
                  {open.skill}
                </span>
                {openFact.year ? (
                  <span className="rounded-full border border-line px-1.5 py-px font-mono text-[10px] text-stone">
                    {openFact.year}
                  </span>
                ) : null}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-stone">{openFact.blurb}</p>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}
