import { ArrowUpRight, Code2, Globe, Mail, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/site";

type ContactMethod = {
  label: string;
  value: string;
  href: string;
  description: string;
  featured: boolean;
  icon: LucideIcon;
  accent: "signal" | "copper";
};

const contactMethods: ContactMethod[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    description: "The fastest way to reach me about a role or a build.",
    featured: true,
    icon: Mail,
    accent: "signal",
  },
  {
    label: "LinkedIn",
    value: "ryan-watts-3551413b",
    href: profile.linkedin,
    description: "Roles, consulting, and longer threads.",
    featured: false,
    icon: Globe,
    accent: "copper",
  },
  {
    label: "GitHub",
    value: profile.githubHandle,
    href: profile.github,
    description: "The MCP proxy and other public work.",
    featured: false,
    icon: Code2,
    accent: "signal",
  },
];

const engagements = [
  {
    title: "Director / principal AI + data seat",
    description:
      "Teams that need a warehouse, agents, and someone who will take the IC ticket.",
    tags: ["Leadership", "Warehouse", "Agents"],
  },
  {
    title: "Strategic consulting",
    description:
      "Short or longer advisory on AI adoption, MCP, and data platform design.",
    tags: ["MCP", "Advisory", "Platform design"],
  },
  {
    title: "Technical due diligence",
    description: "AI and data-engineering reviews for investors and acquirers.",
    tags: ["Due diligence", "AI", "Data engineering"],
  },
  {
    title: "Speaking & writing",
    description:
      "Talks and notes on agents, MCP, and warehouses that GTM actually uses.",
    tags: ["Speaking", "Writing", "GTM"],
  },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-16">
      <Reveal className="max-w-2xl space-y-3">
        <p className="kicker">Contact</p>
        <h1 className="display text-4xl text-cream md:text-6xl">Get in touch</h1>
        <p className="text-sm leading-relaxed text-stone">
          Open to the next ambitious data and AI seat. If the work needs a
          warehouse, agents, and a leader who still ships, write me.
        </p>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <Reveal>
            <p className="kicker">Direct lines</p>
          </Reveal>
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const iconTone =
              method.accent === "copper"
                ? "text-copper/10 group-hover:text-copper/15"
                : "text-signal/10 group-hover:text-signal/15";

            return (
            <Reveal key={method.label} delayMs={index * 60}>
              <a
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={
                  method.featured
                    ? "panel panel-featured card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 md:p-8"
                    : "panel card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
                }
              >
                <Icon
                  aria-hidden
                  size={112}
                  strokeWidth={1}
                  className={`pointer-events-none absolute -bottom-7 -right-7 ${iconTone}`}
                />
                <div className="relative z-10 flex flex-wrap items-center gap-2">
                  {method.featured ? (
                    <span className="skill-tag border-signal/60 bg-signal/15 text-signal">
                      Fastest reply
                    </span>
                  ) : null}
                  <span className="skill-tag">{method.label}</span>
                </div>
                <h2 className="display relative z-10 mt-4 text-2xl text-cream md:text-3xl">
                  {method.value}
                </h2>
                <p className="relative z-10 mt-3 flex-1 text-sm leading-relaxed text-stone">
                  {method.description}
                </p>
                <p className="relative z-10 mt-4 inline-flex items-center gap-2 text-sm text-signal">
                  {method.label === "Email" ? "Send email" : "Open profile"}{" "}
                  <ArrowUpRight size={14} />
                </p>
              </a>
            </Reveal>
            );
          })}
        </div>

        <div className="space-y-4">
          <Reveal>
            <p className="kicker">Open to</p>
          </Reveal>
          {engagements.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 50}>
              <article className="panel card-hover flex h-full flex-col rounded-2xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-copper">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="skill-tag">Engagement</span>
                </div>
                <h3 className="display mt-2 text-2xl text-cream">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">
                  {item.description}
                </p>
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
      </div>
    </div>
  );
}
