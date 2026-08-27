"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import type { Project } from "@/lib/site";

const filters = [
  { id: "all", label: "All" },
  { id: "open-source", label: "Open source" },
  { id: "platforms", label: "Platforms" },
  { id: "shipped", label: "Solutions" },
] as const;

type FilterId = (typeof filters)[number]["id"];

type ProjectsGridProps = {
  projects: Project[];
};

function projectMatchesFilter(project: Project, filter: FilterId) {
  switch (filter) {
    case "all":
      return true;
    case "open-source":
      return project.kind === "Open source";
    case "platforms":
      return project.kind === "Platform";
    case "shipped":
      return project.kind === "Solution";
    default: {
      const _exhaustive: never = filter;
      return _exhaustive;
    }
  }
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [active, setActive] = useState<FilterId>("all");

  const visible = useMemo(
    () => projects.filter((project) => projectMatchesFilter(project, active)),
    [active, projects],
  );

  const featured = visible.filter((project) => project.featured);
  const rest = visible.filter((project) => !project.featured);

  return (
    <div className="space-y-10">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects by type"
      >
        {filters.map((filter) => {
          const selected = active === filter.id;
          const count = projects.filter((project) =>
            projectMatchesFilter(project, filter.id),
          ).length;
          return (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(filter.id)}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-all ${
                selected
                  ? "border-signal/40 bg-signal/10 text-signal"
                  : "border-line text-stone hover:border-signal/30 hover:text-cream"
              }`}
            >
              {filter.label}
              <span className="ml-1.5 text-dim">({count})</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="panel rounded-2xl p-8 text-center">
          <p className="text-sm text-stone">No projects in this filter yet.</p>
        </div>
      ) : (
        <>
          {featured.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {featured.map((project) => (
                <Reveal key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="panel panel-featured card-hover relative flex h-full flex-col overflow-hidden rounded-2xl p-6 md:p-8"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="skill-tag border-signal/60 bg-signal/15 text-signal">Featured</span>
                      <span className="skill-tag">{project.kind}</span>
                      <span className="skill-tag">{project.year}</span>
                      {project.company ? (
                        <span className="skill-tag text-copper">{project.company}</span>
                      ) : null}
                    </div>
                    <h2 className="display mt-4 text-2xl text-cream md:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">
                      {project.oneLiner}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm text-signal">
                      Case study <ArrowUpRight size={14} />
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : null}

          {rest.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {rest.map((project, index) => (
                <Reveal key={project.slug} delayMs={index * 40}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="panel card-hover flex h-full flex-col rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] text-copper">{project.year}</span>
                      <span className="skill-tag">{project.kind}</span>
                    </div>
                    {project.company ? (
                      <p className="mt-3 font-mono text-[11px] text-dim">{project.company}</p>
                    ) : null}
                    <h3 className="display mt-2 text-2xl text-cream">{project.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">
                      {project.oneLiner}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span key={tag} className="skill-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
