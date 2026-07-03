import { Mail, Phone, MapPin, GitBranch, ExternalLink, ArrowUpRight } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "ryandwatts@gmail.com",
    href: "mailto:ryandwatts@gmail.com",
    description: "Best for project inquiries and consulting engagements.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "520-849-0082",
    href: "tel:5208490082",
    description: "Available for calls by appointment.",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Greater Tucson Area, AZ",
    href: null,
    description: "Open to remote work globally.",
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
      {/* Header */}
      <div className="space-y-3">
        <p className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
          Contact
        </p>
        <h1 className="text-3xl font-bold text-[#e8edf5]">Get in touch</h1>
        <p className="text-[#8b98ac] text-sm max-w-xl leading-relaxed">
          I&apos;m open to principal-level AI/Data engineering roles, strategic
          consulting, and technical advisory work. If you&apos;re building something
          ambitious, let&apos;s talk.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact methods */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[#e8edf5]">
            Contact Methods
          </h2>
          <div className="space-y-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const content = (
                <div className="p-5 rounded-lg border border-[#1e2d3d] bg-[#0f1520] space-y-1.5 card-hover">
                  <div className="flex items-center gap-2">
                    <Icon size={14} className="text-[#38bdf8]" />
                    <span className="text-xs font-mono text-[#4a5568] uppercase tracking-wider">
                      {method.label}
                    </span>
                    {method.href && (
                      <ArrowUpRight
                        size={12}
                        className="text-[#4a5568] ml-auto"
                      />
                    )}
                  </div>
                  <p className="text-sm font-medium text-[#e8edf5]">
                    {method.value}
                  </p>
                  <p className="text-xs text-[#8b98ac]">{method.description}</p>
                </div>
              );

              return method.href ? (
                <a key={method.label} href={method.href}>
                  {content}
                </a>
              ) : (
                <div key={method.label}>{content}</div>
              );
            })}
          </div>

          {/* Social */}
          <div className="flex gap-3 pt-2">
            <a
              href="https://github.com/romans127"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-3 rounded-lg border border-[#1e2d3d] bg-[#0f1520] flex items-center justify-center gap-2 text-xs text-[#8b98ac] hover:border-[#38bdf830] hover:text-[#38bdf8] transition-all card-hover"
            >
              <GitBranch size={14} /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/ryandwatts"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 p-3 rounded-lg border border-[#1e2d3d] bg-[#0f1520] flex items-center justify-center gap-2 text-xs text-[#8b98ac] hover:border-[#38bdf830] hover:text-[#38bdf8] transition-all card-hover"
            >
              <ExternalLink size={14} /> LinkedIn
            </a>
          </div>
        </div>

        {/* Engagement types */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-[#e8edf5]">
            Open to
          </h2>
          <div className="space-y-3">
            {engagements.map((eng) => (
              <div
                key={eng.title}
                className="p-5 rounded-lg border border-[#1e2d3d] bg-[#0f1520] space-y-1.5"
              >
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
            ))}
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="p-8 rounded-lg border border-[#38bdf820] bg-gradient-to-br from-[#0f1520] to-[#0a0e14] text-center space-y-4">
        <h2 className="text-xl font-bold text-[#e8edf5]">
          Ready to build something?
        </h2>
        <p className="text-sm text-[#8b98ac] max-w-md mx-auto leading-relaxed">
          The best way to reach me is email. I respond to every serious
          inquiry, typically within 24 hours.
        </p>
        <a
          href="mailto:ryandwatts@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#38bdf8] text-[#0a0e14] rounded text-sm font-semibold hover:bg-[#7dd3fc] transition-colors"
        >
          <Mail size={16} />
          ryandwatts@gmail.com
        </a>
      </div>
    </div>
  );
}
