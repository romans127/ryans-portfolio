"use client";

import { useMemo, useState } from "react";
import { Brain, Cloud, Code2, Database, Shield, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

type SkillGroup = {
  category: string;
  icon: LucideIcon;
  skills: string[];
};

const groups: SkillGroup[] = [
  {
    category: "AI & ML",
    icon: Brain,
    skills: [
      "Agentic AI",
      "LangChain",
      "Pydantic",
      "Machine Learning",
      "Reinforcement Learning",
      "LLMs",
    ],
  },
  {
    category: "Data Engineering",
    icon: Database,
    skills: [
      "Apache Airflow",
      "Prefect",
      "Dagster",
      "Streaming / Batch",
      "Real-time Pipelines",
      "Data Warehousing",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      "Amazon Web Services",
      "Google Cloud Platform",
      "Microsoft Azure",
      "Kubernetes",
      "Docker",
      "Terraform",
    ],
  },
  {
    category: "Languages",
    icon: Code2,
    skills: ["Python", "SQL", "Go"],
  },
  {
    category: "Data Platforms",
    icon: Database,
    skills: [
      "GCP BigQuery",
      "AWS Redshift",
      "AWS Athena",
      "GCP DataStream",
      "AWS Glue",
      "Looker",
    ],
  },
  {
    category: "Security & Compliance",
    icon: Shield,
    skills: [
      "Threat Detection",
      "Risk Classification",
      "Microsoft Graph API",
      "Compliance Automation",
    ],
  },
];

const filters = ["All", ...groups.map((group) => group.category)] as const;

export default function SkillExplorer() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");

  const visible = useMemo(
    () =>
      active === "All"
        ? groups
        : groups.filter((group) => group.category === active),
    [active],
  );

  return (
    <section className="space-y-6">
      <Reveal className="space-y-1">
        <p className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
          Technical Stack
        </p>
        <h2 className="text-2xl font-bold text-[#e8edf5]">Skills</h2>
      </Reveal>

      <Reveal delayMs={60}>
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
      </Reveal>

      <div
        className={`grid gap-4 ${
          visible.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {visible.map((group, index) => {
          const Icon = group.icon;
          return (
            <Reveal key={group.category} delayMs={index * 50}>
              <div className="h-full p-5 rounded-lg border border-[#1e2d3d] bg-[#0f1520]/90 backdrop-blur-sm space-y-3 card-hover">
                <div className="flex items-center gap-2">
                  <Icon size={14} className="text-[#38bdf8]" />
                  <p className="text-xs font-mono text-[#8b98ac] uppercase tracking-wider">
                    {group.category}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
