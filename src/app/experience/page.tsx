import { ArrowUpRight } from "lucide-react";

const timeline = [
  {
    year: "2024–2026",
    role: "Head of Artificial Intelligence",
    company: "DVx Ventures",
    type: "Full-time",
    location: "Remote",
    tags: ["Agentic AI", "Strategy", "Leadership", "Architecture"],
    summary:
      "Led the architecture and design of cutting-edge agentic AI solutions across DVx's portfolio. Pioneered next-generation AI technologies, delivering innovative, scalable systems that are future-ready and operationally excellent.",
    highlight: true,
  },
  {
    year: "2023–2025",
    role: "Staff Data Engineer",
    company: "Cork",
    type: "Full-time",
    location: "Remote",
    tags: ["GCP", "AWS", "Cybersecurity", "AI", "Real-time"],
    summary:
      "Built foundational data infrastructure for a cybersecurity startup from zero. Architected multi-cloud data warehouse and lake solutions. Designed what became the world's first real-time AI-powered threat-detection platform with automated risk signal generation.",
    highlight: false,
  },
  {
    year: "2019–2023",
    role: "Principal Data Engineer",
    company: "MANTL",
    type: "Full-time",
    location: "Tucson, AZ",
    tags: ["BigQuery", "Postgres", "Looker", "Streaming", "SaaS"],
    summary:
      "Served as Head of Data Architecture. Architected MANTL's transactional streaming pipeline from Postgres to BigQuery and the embedded Looker BI SaaS offering. Led data strategy for an omnichannel account-opening platform.",
    highlight: false,
  },
  {
    year: "2013–2019",
    role: "Senior Data Engineer II",
    company: "Simpleview",
    type: "Full-time",
    location: "Tucson, AZ",
    tags: ["Google Cloud", "Kubernetes", "Microservices", "Data Center"],
    summary:
      "Oversaw multi-department data initiatives spanning on-prem data centers through Google Cloud migration. Designed and delegated centralized microservices for data engineering across company divisions.",
    highlight: false,
  },
  {
    year: "2010–Present",
    role: "Principal AI + Data Engineering Consultant",
    company: "Independent",
    type: "Consulting",
    location: "Tucson, AZ",
    tags: ["AI Adoption", "Data Strategy", "Infrastructure", "Advisory"],
    summary:
      "15+ year consulting practice advising organizations on AI strategy, data infrastructure modernization, and scalable platform design. Work across DevOps, DataOps, cloud architecture, and security/compliance domains.",
    highlight: false,
  },
  {
    year: "2010–2012",
    role: "Asset Protection Analytics Manager",
    company: "Walmart",
    type: "Full-time",
    location: "Flagstaff, AZ",
    tags: ["Tableau", "Analytics", "BI", "Retail"],
    summary:
      "Oversaw analytics for the asset protection department. Implemented Tableau-based market-wide BI solutions and led data-driven initiatives to track and report on organized retail crime trends.",
    highlight: false,
  },
];

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
          Career
        </p>
        <h1 className="text-3xl font-bold text-[#e8edf5]">Experience</h1>
        <p className="text-[#8b98ac] text-sm max-w-xl leading-relaxed">
          15+ years building enterprise AI systems, data infrastructure, and
          cybersecurity intelligence platforms across startups and enterprises.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Years Active", value: "15+" },
          { label: "Companies", value: "6+" },
          { label: "Consulting Clients", value: "20+" },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 rounded-lg border border-[#1e2d3d] bg-[#0f1520] text-center"
          >
            <div className="text-xl font-mono font-bold text-[#e8edf5]">
              {s.value}
            </div>
            <div className="text-xs text-[#4a5568] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-6">
        <div className="timeline-line" />
        <div className="space-y-8">
          {timeline.map((item, i) => (
            <div key={i} className="relative animate-fade-in">
              {/* Timeline dot */}
              <div
                className={`absolute -left-[25px] top-1.5 w-2.5 h-2.5 rounded-full border-2 ${
                  item.highlight
                    ? "bg-[#38bdf8] border-[#38bdf8]"
                    : "bg-[#0a0e14] border-[#38bdf840]"
                }`}
              />

              <div
                className={`p-5 md:p-6 rounded-lg border bg-[#0f1520] space-y-3 card-hover ${
                  item.highlight
                    ? "border-[#38bdf820]"
                    : "border-[#1e2d3d]"
                }`}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-[#e8edf5]">
                        {item.role}
                      </h3>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[#38bdf810] text-[#38bdf8] font-mono">
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-sm text-[#38bdf8]">{item.company}</p>
                      <span className="text-[#4a5568]">·</span>
                      <p className="text-xs text-[#4a5568]">{item.location}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#4a5568] shrink-0">
                    {item.year}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-sm text-[#8b98ac] leading-relaxed">
                  {item.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Currently consulting */}
      <div className="p-6 rounded-lg border border-[#38bdf820] bg-gradient-to-r from-[#0f1520] to-[#0a0e14] space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
          <p className="text-sm font-semibold text-[#e8edf5]">
            Open to opportunities
          </p>
        </div>
        <p className="text-sm text-[#8b98ac] leading-relaxed">
          I&apos;m available for Principal-level AI/Data engineering roles and
          strategic consulting engagements. If you&apos;re building something ambitious
          that needs deep AI and data expertise, let&apos;s talk.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
        >
          Get in touch <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}
