import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MetricCards from "@/components/MetricCards";
import PipelineCanvas from "@/components/PipelineCanvas";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { craft, getFeaturedProject, metrics, profile, roles } from "@/lib/site";

const featured = getFeaturedProject();
const recent = roles.filter((role) => role.type === "Full-time").slice(0, 3);

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl space-y-28 px-6 py-16 md:py-20">
      <section className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="animate-fade-in space-y-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-signal/25 bg-signal/10 px-3 py-1 font-mono text-[11px] text-signal">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-signal" />
              {profile.currentRole} · {profile.currentCompany}
            </span>
            <span className="font-mono text-[11px] text-dim">{profile.location}</span>
          </div>

          <div className="space-y-4">
            <p className="kicker">{profile.eyebrow}</p>
            <h1 className="display text-5xl leading-[0.95] text-cream md:text-7xl">
              {profile.headline}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-stone">{profile.lede}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-ink hover:bg-[#7aedd0]"
            >
              See the work
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-stone hover:border-copper/40 hover:text-cream"
            >
              Career
            </Link>
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-copper underline decoration-line underline-offset-4 hover:decoration-copper"
            >
              MCP OpenAPI Proxy →
            </a>
          </div>
        </div>

        <Reveal>
          <PipelineCanvas />
        </Reveal>
      </section>

      <MetricCards metrics={metrics} />

      <section className="space-y-8">
        <Reveal>
          <SectionHeading
            kicker="Practice"
            title="Pioneer in the stack, still on the ticket."
            body="Agents, warehouses, and MCP are the same job for me: a foundation people can query, and tools an agent can trust."
          />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {craft.map((item, index) => (
            <Reveal key={item.id} delayMs={index * 50}>
              <article className="panel card-hover h-full rounded-2xl p-6">
                <p className="font-mono text-[11px] text-copper">{item.kicker}</p>
                <h3 className="display mt-3 text-2xl text-cream">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{item.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <Reveal>
          <SectionHeading
            kicker="Featured project"
            title={featured.title}
            body={featured.oneLiner}
            action={
              <Link href={`/projects/${featured.slug}`} className="text-sm text-signal">
                Case study <ArrowUpRight className="inline" size={14} />
              </Link>
            }
          />
        </Reveal>
        <Reveal>
          <article className="panel overflow-hidden rounded-2xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4 p-6 md:p-8">
                <div className="flex flex-wrap gap-2">
                  <span className="skill-tag">{featured.kind}</span>
                  <span className="skill-tag">{featured.year}</span>
                </div>
                <p className="text-sm leading-relaxed text-stone">{featured.problem}</p>
                <p className="text-sm leading-relaxed text-stone">{featured.approach}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href={`/projects/${featured.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-signal px-4 py-2 text-xs font-medium text-ink"
                  >
                    Open the case
                  </Link>
                  {featured.href ? (
                    <a
                      href={featured.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-copper"
                    >
                      {featured.repo} <ArrowUpRight size={12} />
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="border-t border-line bg-raised/40 p-6 md:border-l md:border-t-0 md:p-8">
                <p className="kicker">Why Go</p>
                <ul className="mt-4 space-y-3">
                  {featured.engineering.slice(0, 3).map((line) => (
                    <li key={line} className="flex gap-3 text-sm text-stone">
                      <span className="mt-1 text-signal">▹</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </Reveal>
      </section>

      <section className="space-y-8">
        <Reveal>
          <SectionHeading
            kicker="Selected seats"
            title="From founding data to Head of AI."
            action={
              <Link href="/experience" className="text-sm text-signal">
                Full career <ArrowUpRight className="inline" size={14} />
              </Link>
            }
          />
        </Reveal>
        <div className="space-y-3">
          {recent.map((job, index) => (
            <Reveal key={`${job.company}-${job.role}`} delayMs={index * 40}>
              <Link
                href="/experience"
                className="panel card-hover block rounded-2xl p-5 md:p-6"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-2">
                    <p className="display text-2xl text-cream">{job.role}</p>
                    <p className="text-sm text-copper">
                      {job.company}
                      <span className="text-dim"> · {job.location}</span>
                    </p>
                    <p className="max-w-2xl text-sm leading-relaxed text-stone">
                      {job.summary}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-xs text-dim">{job.year}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="panel rounded-2xl p-8 text-center md:p-12">
          <p className="kicker">Now</p>
          <h2 className="display mx-auto mt-3 max-w-2xl text-3xl text-cream md:text-5xl">
            Looking for the next ambitious data and AI seat.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone">
            Principal or director-level work where the warehouse, the agents, and
            the team still need someone who will write the Terraform.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-ink"
            >
              Get in touch
            </Link>
            <Link href="/about" className="text-sm text-stone hover:text-cream">
              About Ryan →
            </Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
