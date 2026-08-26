import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import PlatformDiagrams from "@/components/PlatformDiagrams";
import PlatformHero from "@/components/PlatformHero";
import ProjectViz from "@/components/ProjectViz";
import { getProject, profile, projects } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.oneLiner,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const platform = project.platformDetail;
  const isPlatform = project.kind === "Platform" && platform;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-stone hover:text-signal"
      >
        <ArrowLeft size={14} /> All projects
      </Link>

      {isPlatform ? <PlatformHero variant={platform.hero} title={project.title} /> : null}

      <header className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="skill-tag">{project.kind}</span>
          <span className="skill-tag">{project.year}</span>
          {project.company ? (
            <span className="skill-tag text-copper">{project.company}</span>
          ) : null}
          {platform ? <span className="skill-tag text-signal">{platform.role}</span> : null}
        </div>
        {!isPlatform ? (
          <h1 className="display text-4xl text-cream md:text-6xl">{project.title}</h1>
        ) : null}
        <p className="text-lg leading-relaxed text-stone">{project.oneLiner}</p>
        <div className="flex flex-wrap gap-4">
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 text-sm font-medium text-ink hover:bg-[#7aedd0]"
            >
              Visit live site
              <ExternalLink size={14} />
            </a>
          ) : null}
          {project.repo && !project.href?.includes(project.repo) ? (
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-copper"
            >
              {project.repo} <ArrowUpRight size={14} />
            </a>
          ) : null}
        </div>
      </header>

      {platform ? (
        <section className="grid gap-4 md:grid-cols-3">
          {platform.highlights.map((item) => (
            <article key={item.title} className="panel rounded-2xl p-5">
              <h2 className="text-sm font-medium text-cream">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone">{item.body}</p>
            </article>
          ))}
        </section>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <section className="panel space-y-3 rounded-2xl p-6">
          <p className="kicker">Problem</p>
          <p className="text-sm leading-relaxed text-stone">{project.problem}</p>
        </section>
        <section className="panel space-y-3 rounded-2xl p-6">
          <p className="kicker">Approach</p>
          <p className="text-sm leading-relaxed text-stone">{project.approach}</p>
        </section>
      </div>

      {platform ? <PlatformDiagrams diagrams={platform.diagrams} /> : null}

      {!isPlatform && project.visualizations && project.visualizations.length > 0 ? (
        <section className="space-y-4">
          <p className="kicker">Architecture</p>
          <div className="space-y-4">
            {project.visualizations.map((viz, index) => (
              <ProjectViz key={`${project.slug}-viz-${index}`} spec={viz} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <p className="kicker">{isPlatform ? "Features" : "Engineering"}</p>
        <ul className="space-y-3">
          {project.engineering.map((line) => (
            <li key={line} className="panel flex gap-3 rounded-2xl p-4 text-sm text-stone">
              <span className="text-signal">▹</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      {platform ? (
        <section className="panel rounded-2xl p-6">
          <p className="kicker mb-3">Stack</p>
          <div className="flex flex-wrap gap-2">
            {platform.stack.map((item) => (
              <span key={item} className="skill-tag">
                {item}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {!isPlatform ? (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="skill-tag">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
