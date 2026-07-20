import { GitBranch, ExternalLink, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const contactMethods = [
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: "linkedin.com/in/ryandwatts",
    href: "https://linkedin.com/in/ryandwatts",
    description: "Best for project inquiries, roles, and consulting engagements.",
  },
  {
    icon: GitBranch,
    label: "GitHub",
    value: "github.com/romans127",
    href: "https://github.com/romans127",
    description: "Open-source work and technical projects.",
  },
];

const engagements = [
  {
    title: "Principal AI/Data Engineering Role",
    description:
      "Seeking leadership opportunities at companies building ambitious AI and data systems.",
  },
  {
    title: "Strategic Consulting",
    description:
      "Short or long-term advisory engagements on AI strategy, data architecture, or infrastructure modernization.",
  },
  {
    title: "Technical Due Diligence",
    description:
      "Reviewing AI/data engineering capabilities for investors and acquirers.",
  },
  {
    title: "Speaking & Writing",
    description:
      "Technical talks and articles on AI architecture, data engineering, and building reliable production systems.",
  },
];

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      <Reveal className="space-y-3">
        <p className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
          Contact
        </p>
        <h1 className="text-3xl font-bold text-[#e8edf5]">Get in touch</h1>
        <p className="text-[#8b98ac] text-sm max-w-xl leading-relaxed">
          I&apos;m open to principal-level AI/Data engineering roles, strategic
          consulting, and technical advisory work. If you&apos;re building something
          ambitious, let&apos;s talk.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Reveal>
            <h2 className="text-sm font-semibold text-[#e8edf5]">
              Contact Methods
            </h2>
          </Reveal>
          <div className="space-y-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <Reveal key={method.label} delayMs={index * 70}>
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="p-5 rounded-lg border border-[#1e2d3d] bg-[#0f1520]/90 backdrop-blur-sm space-y-1.5 card-hover">
                      <div className="flex items-center gap-2">
                        <Icon size={14} className="text-[#38bdf8]" />
                        <span className="text-xs font-mono text-[#4a5568] uppercase tracking-wider">
                          {method.label}
                        </span>
                        <ArrowUpRight
                          size={12}
                          className="text-[#4a5568] ml-auto transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#38bdf8]"
                        />
                      </div>
                      <p className="text-sm font-medium text-[#e8edf5]">
                        {method.value}
                      </p>
                      <p className="text-xs text-[#8b98ac]">{method.description}</p>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <Reveal>
            <h2 className="text-sm font-semibold text-[#e8edf5]">Open to</h2>
          </Reveal>
          <div className="space-y-3">
            {engagements.map((eng, index) => (
              <Reveal key={eng.title} delayMs={index * 60}>
                <div className="p-5 rounded-lg border border-[#1e2d3d] bg-[#0f1520]/90 backdrop-blur-sm space-y-1.5 card-hover">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                    <p className="text-sm font-medium text-[#e8edf5]">
                      {eng.title}
                    </p>
                  </div>
                  <p className="text-xs text-[#8b98ac] leading-relaxed pl-3.5">
                    {eng.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <Reveal>
        <div className="p-8 rounded-lg border border-[#38bdf820] bg-gradient-to-br from-[#0f1520] to-[#0a0e14] text-center space-y-4">
          <h2 className="text-xl font-bold text-[#e8edf5]">
            Ready to build something?
          </h2>
          <p className="text-sm text-[#8b98ac] max-w-md mx-auto leading-relaxed">
            The best way to reach me is LinkedIn. I respond to every serious
            inquiry, typically within 24 hours.
          </p>
          <a
            href="https://linkedin.com/in/ryandwatts"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#38bdf8] text-[#0a0e14] rounded text-sm font-semibold hover:bg-[#7dd3fc] transition-colors"
          >
            <ExternalLink size={16} />
            Connect on LinkedIn
          </a>
        </div>
      </Reveal>
    </div>
  );
}
