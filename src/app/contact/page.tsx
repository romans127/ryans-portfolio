import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/site";

const contactMethods = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    description: "The fastest way to reach me about a role or a build.",
  },
  {
    label: "LinkedIn",
    value: "ryan-watts-3551413b",
    href: profile.linkedin,
    description: "Roles, consulting, and longer threads.",
  },
  {
    label: "GitHub",
    value: profile.githubHandle,
    href: profile.github,
    description: "The MCP proxy and other public work.",
  },
];

const engagements = [
  {
    title: "Director / principal AI + data seat",
    description:
      "Teams that need a warehouse, agents, and someone who will take the IC ticket.",
  },
  {
    title: "Strategic consulting",
    description:
      "Short or longer advisory on AI adoption, MCP, and data platform design.",
  },
  {
    title: "Technical due diligence",
    description: "AI and data-engineering reviews for investors and acquirers.",
  },
  {
    title: "Speaking & writing",
    description:
      "Talks and notes on agents, MCP, and warehouses that GTM actually uses.",
  },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <Reveal className="max-w-2xl space-y-3">
        <p className="kicker">Contact</p>
        <h1 className="display text-4xl text-cream md:text-6xl">Get in touch</h1>
        <p className="text-sm leading-relaxed text-stone">
          Open to the next ambitious data and AI seat. If the work needs a
          warehouse, agents, and a leader who still ships, write me.
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          {contactMethods.map((method, index) => (
            <Reveal key={method.label} delayMs={index * 60}>
              <a href={method.href} target={method.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="panel card-hover block rounded-2xl p-5">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-dim">
                    {method.label}
                  </p>
                  <ArrowUpRight size={14} className="text-dim" />
                </div>
                <p className="mt-2 text-sm text-cream">{method.value}</p>
                <p className="mt-1 text-xs text-stone">{method.description}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="space-y-3">
          {engagements.map((item, index) => (
            <Reveal key={item.title} delayMs={index * 50}>
              <div className="panel rounded-2xl p-5">
                <p className="text-sm text-cream">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-stone">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
