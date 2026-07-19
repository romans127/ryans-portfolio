import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Database,
  Shield,
  TrendingUp,
  Code2,
  Cloud,
  Brain,
} from "lucide-react";

const metrics = [
  { label: "Years of Experience", value: "15+", icon: TrendingUp },
  { label: "Enterprise Systems Built", value: "30+", icon: Database },
  { label: "Cloud Platforms", value: "3", icon: Cloud },
  { label: "AI Systems Deployed", value: "∞", icon: Brain },
];

const expertise = [
  {
    icon: Brain,
    title: "Agentic AI Systems",
    description:
      "Designing and deploying framework-driven AI architectures that enable autonomous decision-making, adaptability, and automation at scale.",
    tags: ["LangChain", "Pydantic", "LLMs", "Reinforcement Learning"],
  },
  {
    icon: Database,
    title: "Data Engineering",
    description:
      "Building enterprise-grade data infrastructure including multi-cloud warehouses, real-time streaming pipelines, and AI-powered analytics platforms.",
    tags: ["BigQuery", "Redshift", "Airflow", "Kafka"],
  },
  {
    icon: Shield,
    title: "Cybersecurity Intelligence",
    description:
      "Architecting world-class threat detection systems using advanced ML/AI techniques and real-time data processing at petabyte scale.",
    tags: ["Threat Detection", "ML Classification", "Real-time Pipelines"],
  },
  {
    icon: Cpu,
    title: "Platform Architecture",
    description:
      "Designing scalable, cloud-native systems across AWS, GCP, and Azure — from infrastructure to production AI workloads.",
    tags: ["Kubernetes", "Docker", "GCP", "AWS", "Azure"],
  },
];

const recentWork = [
  {
    company: "DVx Ventures",
    role: "Head of Artificial Intelligence",
    period: "Jun 2024 – Feb 2026",
    summary:
      "Led architecture of cutting-edge agentic AI solutions driving operational excellence across portfolio companies.",
    tags: ["Agentic AI", "Strategy", "Leadership"],
  },
  {
    company: "Cork",
    role: "Staff Data Engineer",
    period: "Sep 2023 – May 2025",
    summary:
      "Architected the world's first real-time AI-powered threat-detection platform with automated risk signal generation.",
    tags: ["Cybersecurity", "GCP", "AWS", "Real-time"],
  },
  {
    company: "MANTL",
    role: "Principal Data Engineer",
    period: "Jun 2019 – Sep 2023",
    summary:
      "Head of Data Architecture — built transactional streaming pipelines and an embedded Looker BI SaaS offering.",
    tags: ["BigQuery", "Looker", "Postgres", "Streaming"],
  },
];

const posts = [
  {
    slug: "agentic-ai-architecture-patterns",
    title: "Agentic AI Architecture Patterns for the Enterprise",
    excerpt:
      "How I think about designing autonomous AI systems that are actually reliable in production — not just impressive in demos.",
    date: "Jun 2025",
    readTime: "8 min",
    tag: "AI Architecture",
  },
  {
    slug: "real-time-threat-detection-data-engineering",
    title: "Building a Real-Time Threat Detection Platform from Zero",
    excerpt:
      "The engineering decisions behind Cork's AI-powered cybersecurity intelligence platform, and what I'd do differently.",
    date: "Mar 2025",
    readTime: "12 min",
    tag: "Data Engineering",
  },
  {
    slug: "llm-production-data-pipelines",
    title: "LLMs in Production Data Pipelines: What Actually Works",
    excerpt:
      "After integrating LLMs into data pipelines across multiple companies, here's the unfiltered truth about what holds up.",
    date: "Jan 2025",
    readTime: "10 min",
    tag: "LLMs",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">
      {/* Hero */}
      <section className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38bdf810] border border-[#38bdf820] text-xs font-mono text-[#38bdf8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
            Available for opportunities
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#e8edf5] leading-tight">
          Ryan Watts
          <span className="block text-2xl md:text-3xl lg:text-4xl font-light text-[#8b98ac] mt-2">
            Principal AI & Data Engineer
          </span>
        </h1>

        <p className="text-lg text-[#8b98ac] max-w-2xl leading-relaxed">
          Visionary AI leader with 15+ years architecting transformative systems
          — from agentic AI platforms to petabyte-scale data infrastructure and
          real-time cybersecurity intelligence.
        </p>

        <p className="text-sm font-mono text-[#4a5568]">
          Greater Tucson Area · Currently:{" "}
          <span className="text-[#38bdf8]">
            Independent AI & Data Engineering Consulting
          </span>
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#38bdf8] text-[#0a0e14] rounded text-sm font-semibold hover:bg-[#7dd3fc] transition-colors"
          >
            View Full Profile
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/experience"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#1e2d3d] text-[#8b98ac] rounded text-sm hover:border-[#38bdf830] hover:text-[#e8edf5] transition-all"
          >
            Career Timeline
          </Link>
          <Link
            href="/contact"
            className="text-sm text-[#8b98ac] hover:text-[#38bdf8] transition-colors underline underline-offset-4 decoration-[#1e2d3d] hover:decoration-[#38bdf8]"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Metrics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="p-5 rounded-lg border border-[#1e2d3d] bg-[#0f1520] text-center space-y-2"
            >
              <Icon size={18} className="text-[#38bdf8] mx-auto opacity-70" />
              <div className="text-2xl font-bold font-mono text-[#e8edf5]">
                {metric.value}
              </div>
              <div className="text-xs text-[#4a5568]">{metric.label}</div>
            </div>
          );
        })}
      </section>

      {/* Core Expertise */}
      <section className="space-y-8">
        <div className="space-y-1">
          <p className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
            Core Expertise
          </p>
          <h2 className="text-2xl font-bold text-[#e8edf5]">
            What I build
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {expertise.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="card-hover p-6 rounded-lg border border-[#1e2d3d] bg-[#0f1520] space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-[#38bdf810] border border-[#38bdf820]">
                    <Icon size={16} className="text-[#38bdf8]" />
                  </div>
                  <h3 className="font-semibold text-[#e8edf5]">{item.title}</h3>
                </div>
                <p className="text-sm text-[#8b98ac] leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Work */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
              Career
            </p>
            <h2 className="text-2xl font-bold text-[#e8edf5]">Recent Work</h2>
          </div>
          <Link
            href="/experience"
            className="text-sm text-[#8b98ac] hover:text-[#38bdf8] transition-colors flex items-center gap-1"
          >
            Full timeline <ArrowRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentWork.map((job) => (
            <div
              key={job.company}
              className="card-hover p-5 rounded-lg border border-[#1e2d3d] bg-[#0f1520] flex flex-col md:flex-row md:items-start gap-4"
            >
              <div className="md:w-40 shrink-0">
                <p className="text-xs font-mono text-[#4a5568]">{job.period}</p>
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="font-semibold text-[#e8edf5] text-sm">
                    {job.role}
                  </p>
                  <p className="text-xs text-[#38bdf8]">{job.company}</p>
                </div>
                <p className="text-sm text-[#8b98ac] leading-relaxed">
                  {job.summary}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Grid */}
      <section className="space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
            Technical Stack
          </p>
          <h2 className="text-2xl font-bold text-[#e8edf5]">Skills</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
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
          ].map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="p-5 rounded-lg border border-[#1e2d3d] bg-[#0f1520] space-y-3"
              >
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
            );
          })}
        </div>
      </section>

      {/* Recent Writing */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
              Thinking Out Loud
            </p>
            <h2 className="text-2xl font-bold text-[#e8edf5]">
              Recent Writing
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-sm text-[#8b98ac] hover:text-[#38bdf8] transition-colors flex items-center gap-1"
          >
            All posts <ArrowRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-hover block p-5 rounded-lg border border-[#1e2d3d] bg-[#0f1520] group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#38bdf8] bg-[#38bdf810] px-2 py-0.5 rounded">
                      {post.tag}
                    </span>
                    <span className="text-xs text-[#4a5568]">
                      {post.date} · {post.readTime} read
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#e8edf5] group-hover:text-[#38bdf8] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#8b98ac] leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="text-[#4a5568] group-hover:text-[#38bdf8] shrink-0 mt-1 transition-colors"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="p-8 rounded-lg border border-[#38bdf820] bg-gradient-to-br from-[#0f1520] to-[#0a0e14] text-center space-y-4">
        <p className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
          Let&apos;s Work Together
        </p>
        <h2 className="text-2xl font-bold text-[#e8edf5]">
          Building something ambitious?
        </h2>
        <p className="text-[#8b98ac] max-w-xl mx-auto text-sm leading-relaxed">
          I help organizations navigate AI adoption, architect scalable data
          infrastructure, and ship intelligent systems that actually work in
          production.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#38bdf8] text-[#0a0e14] rounded text-sm font-semibold hover:bg-[#7dd3fc] transition-colors"
          >
            Get in touch
          </Link>
          <Link
            href="/about"
            className="text-sm text-[#8b98ac] hover:text-[#38bdf8] transition-colors"
          >
            Learn more about me →
          </Link>
        </div>
      </section>
    </div>
  );
}
