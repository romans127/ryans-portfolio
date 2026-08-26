import { HelpCircle } from "lucide-react";
import { profile, skillGroups, education } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SkillExplorer from "@/components/SkillExplorer";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="panel rounded-2xl p-6 md:p-8">
            <div className="display flex h-20 w-20 items-center justify-center rounded-full border border-copper/40 bg-gradient-to-br from-copper to-signal text-3xl text-ink">
              {profile.initials}
            </div>
            <h1 className="display mt-6 text-4xl text-cream">{profile.name}</h1>
            <p className="mt-2 text-stone">
              {profile.currentRole}, {profile.currentCompany}
            </p>
            <p className="mt-1 text-sm text-dim">
              Previously {profile.previousRole} at {profile.previousCompany}
            </p>
            <p className="mt-4 font-mono text-xs text-dim">{profile.location}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-4 py-1.5 text-xs text-stone hover:border-signal/40 hover:text-signal"
              >
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-4 py-1.5 text-xs text-stone hover:border-signal/40 hover:text-signal"
              >
                LinkedIn
              </a>
              <a
                href="/contact"
                className="rounded-full bg-signal px-4 py-1.5 text-xs font-medium text-ink"
              >
                Get in touch
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <div className="space-y-5">
            <p className="kicker">About</p>
            <h2 className="display text-3xl text-cream md:text-5xl">
              Hands-on leadership. Seventeen years under it.
            </h2>
            <p className="text-base leading-relaxed text-stone">{profile.lede}</p>
            {profile.summary.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-stone">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <SkillExplorer />

      <section className="space-y-6">
        <Reveal>
          <p className="kicker">Education</p>
          <h2 className="display text-3xl text-cream">Schooling</h2>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {education.map((item, index) => (
            <Reveal key={item.school} delayMs={index * 50}>
              <div className="panel h-full rounded-2xl p-5">
                <p className="font-mono text-[11px] text-dim">{item.period}</p>
                <p className="mt-2 text-sm font-medium text-cream">{item.school}</p>
                <p className="mt-1 text-sm text-stone">{item.degree}</p>
                {item.note ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs italic text-dim">
                    <span>{item.note}</span>
                    {item.noteHelp ? (
                      <span className="group relative inline-flex">
                        <button
                          type="button"
                          className="rounded-full text-dim transition-colors hover:text-stone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/40"
                          aria-label={`About ${item.school} status`}
                        >
                          <HelpCircle size={13} aria-hidden="true" />
                        </button>
                        <span
                          role="tooltip"
                          className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2 rounded-lg border border-line bg-raised px-3 py-2 text-left text-[11px] not-italic leading-relaxed text-stone opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                        >
                          {item.noteHelp}
                        </span>
                      </span>
                    ) : null}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <p className="sr-only">
        Skills include {skillGroups.flatMap((group) => group.skills).join(", ")}.
      </p>
    </div>
  );
}
