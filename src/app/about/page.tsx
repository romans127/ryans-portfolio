import {
  MapPin,
  GitBranch,
  ExternalLink,
  Brain,
  Database,
  Shield,
  Cloud,
  Code2,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

const skills = [
  {
    category: "AI & Machine Learning",
    icon: Brain,
    items: [
      "Agentic AI",
      "LangChain",
      "Pydantic AI",
      "Machine Learning",
      "Reinforcement Learning",
      "Large Language Models",
      "Artificial Intelligence",
      "Data Science",
    ],
  },
  {
    category: "Data Engineering",
    icon: Database,
    items: [
      "Apache Airflow",
      "Prefect",
      "Dagster",
      "Streaming Pipelines",
      "Batch Processing",
      "Real-time Data",
      "Data Warehousing",
      "Data Lake Architecture",
    ],
  },
  {
    category: "Cloud Platforms",
    icon: Cloud,
    items: [
      "Amazon Web Services",
      "Google Cloud Platform",
      "Microsoft Azure",
      "AWS Glue",
      "GCP DataStream",
      "AWS Redshift",
      "AWS Athena",
      "GCP BigQuery",
      "GCP Cloud SQL",
    ],
  },
  {
    category: "Infrastructure",
    icon: Code2,
    items: ["Kubernetes", "Docker", "Docker Compose", "DevOps", "DataOps"],
  },
  {
    category: "Languages",
    icon: Code2,
    items: ["Python", "SQL", "Go"],
  },
  {
    category: "Security & Compliance",
    icon: Shield,
    items: [
      "Cybersecurity Intelligence",
      "Threat Detection",
      "Risk Classification",
      "Microsoft Graph API",
      "Compliance Automation",
    ],
  },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      {/* Profile Header — LinkedIn-style */}
      <section className="relative">
        {/* Cover bar */}
        <div className="h-24 md:h-32 rounded-t-lg bg-gradient-to-r from-[#0f1f35] via-[#123047] to-[#0a1929] border border-[#1e2d3d] border-b-0" />

        {/* Profile card */}
        <div className="border border-[#1e2d3d] border-t-0 rounded-b-lg bg-[#0f1520]/95 backdrop-blur-sm px-6 md:px-8 pb-8">
          {/* Avatar placeholder */}
          <div className="relative -mt-12 mb-4">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-[#0a0e14] bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center text-2xl md:text-3xl font-bold text-[#0a0e14] shadow-[0_0_40px_-12px_#38bdf888]">
              RW
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#e8edf5]">
                Ryan Watts
              </h1>
              <p className="text-base text-[#8b98ac] mt-1">
                Principal AI & Data Engineer · Head of Artificial Intelligence
              </p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#4a5568]">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-[#38bdf8]" />
                Greater Tucson Area
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://github.com/romans127"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#1e2d3d] rounded text-xs text-[#8b98ac] hover:border-[#38bdf830] hover:text-[#38bdf8] transition-all"
              >
                <GitBranch size={13} /> GitHub
              </a>
              <a
                href="https://linkedin.com/in/ryandwatts"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#1e2d3d] rounded text-xs text-[#8b98ac] hover:border-[#38bdf830] hover:text-[#38bdf8] transition-all"
              >
                <ExternalLink size={13} /> LinkedIn
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#38bdf8] text-[#0a0e14] rounded text-xs font-semibold hover:bg-[#7dd3fc] transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="p-6 md:p-8 rounded-lg border border-[#1e2d3d] bg-[#0f1520] space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-[#38bdf8]" />
          <h2 className="font-semibold text-[#e8edf5]">About</h2>
        </div>
        <div className="space-y-4 text-sm text-[#8b98ac] leading-relaxed">
          <p>
            Visionary AI leader and Principal Data Engineer with{" "}
            <span className="text-[#e8edf5]">15+ years of experience</span>{" "}
            architecting transformative AI solutions that drive business
            innovation and operational excellence. Currently serving as Head of
            Artificial Intelligence at DVx Ventures, where I lead the
            development of cutting-edge agentic AI systems that exceed industry
            standards and unlock new business capabilities across domains.
          </p>
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            {[
              {
                title: "AI Architecture & Strategy",
                body: "Design and deploy framework-driven AI architectures enabling autonomous decision-making, adaptability, and automation at scale.",
              },
              {
                title: "Data Engineering Excellence",
                body: "Build enterprise-grade data infrastructure including multi-cloud data warehouses, real-time pipelines, and AI-powered analytics platforms.",
              },
              {
                title: "Cybersecurity Intelligence",
                body: "Architect world-class threat detection systems using advanced ML/AI techniques and real-time data processing.",
              },
              {
                title: "Strategic Leadership",
                body: "Lead cross-functional engineering teams, drive AI adoption initiatives, and deliver scalable solutions that power business transformation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-md bg-[#1a2332] border border-[#1e2d3d] space-y-1"
              >
                <p className="text-xs font-semibold text-[#38bdf8]">
                  {item.title}
                </p>
                <p className="text-xs text-[#8b98ac] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-[#38bdf8]" />
          <h2 className="font-semibold text-[#e8edf5]">Experience</h2>
        </div>
        <div className="space-y-px">
          {[
            {
              role: "Head of Artificial Intelligence",
              company: "DVx Ventures",
              location: "Remote",
              period: "June 2024 – February 2026",
              bullets: [
                "Led the architecture and design of cutting-edge agentic AI solutions, driving operational excellence and ensuring strategic alignment with market needs.",
                "Pioneered next-generation AI technologies that exceed industry standards, delivering innovative, scalable systems that are both effective and future-ready.",
                "Built intelligent, adaptive solutions that enhance business performance and unlock new capabilities across domains.",
                "Drove strategic AI initiatives and ensured alignment with business objectives and market demands.",
              ],
            },
            {
              role: "Principal AI + Data Engineering Consultant",
              company: "Independent",
              location: "Tucson, Arizona Area",
              period: "Jan 2010 – Present",
              bullets: [
                "Provide expert guidance on designing, building, and scaling AI initiatives with cost-efficient, scalable, high-performing solutions.",
                "Lead organizations to navigate AI adoption, infrastructure optimization, and model deployment.",
                "Modernize data infrastructure to improve scalability, reliability, and performance.",
                "Work across DevOps and DataOps domains, including data platform design, system configurations, and security/compliance considerations.",
              ],
            },
            {
              role: "Staff Data Engineer",
              company: "Cork",
              location: "Remote, United States",
              period: "Sept 2023 – May 2025",
              bullets: [
                "Led data engineering initiatives for a cybersecurity startup focusing on the MSP market, building foundational data infrastructure from the ground up.",
                "Architected and engineered multi-cloud data warehouse and data lake solutions using GCP and AWS, enabling scalable cybersecurity intelligence platforms.",
                "Designed and implemented real-time data pipelines powering AI-powered threat detection and risk assessment services.",
                "Developed and deployed risk signal classification systems using Microsoft Graph API integration for comprehensive security monitoring.",
                "Architected the world's first real-time AI-powered threat-detection platform with automated risk signal generation and compliance event convergence.",
              ],
            },
            {
              role: "Principal Data Engineer (Head of Data Architecture)",
              company: "MANTL",
              location: "Tucson, Arizona",
              period: "Jun 2019 – Sept 2023",
              bullets: [
                "Served as Head of Data Architecture, spearheading pivotal functions integral to the company's data-driven approach.",
                "Architected MANTL's transactional data pipeline streaming realtime data from Postgres to BigQuery.",
                "Architected MANTL's embedded Looker BI solution, a SaaS offering to clients.",
                "Led data architecture strategy and implementation for an omnichannel online account opening platform.",
              ],
            },
            {
              role: "Senior Data Engineer II",
              company: "Simpleview",
              location: "Tucson, Arizona",
              period: "Jun 2013 – Jun 2019",
              bullets: [
                "Senior Data Engineer; oversaw multi-department data initiatives from data center to Google Cloud.",
                "Delegated centralized microservices for data engineering with Kubernetes to divisions across the company.",
              ],
            },
            {
              role: "Asset Protection Analytics Manager",
              company: "Walmart",
              location: "Flagstaff, Arizona",
              period: "Oct 2010 – Dec 2012",
              bullets: [
                "Oversaw analytics in the asset protection department; led data-driven initiatives.",
                "Implemented Tableau-based, market-wide BI solutions.",
                "Reported on trends and analysis of organized retail crime.",
              ],
            },
          ].map((job, i) => (
            <div
              key={job.company + job.role}
              className={`p-6 md:p-8 border border-[#1e2d3d] bg-[#0f1520] space-y-4 ${
                i === 0 ? "rounded-t-lg" : ""
              } ${
                i === 5 ? "rounded-b-lg" : "border-b-0"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1">
                <div>
                  <h3 className="font-semibold text-[#e8edf5]">{job.role}</h3>
                  <p className="text-sm text-[#38bdf8]">{job.company}</p>
                  <p className="text-xs text-[#4a5568] mt-0.5">
                    {job.location}
                  </p>
                </div>
                <span className="text-xs font-mono text-[#4a5568] shrink-0">
                  {job.period}
                </span>
              </div>
              <ul className="space-y-2">
                {job.bullets.map((bullet, bi) => (
                  <li key={bi} className="flex gap-3 text-sm text-[#8b98ac]">
                    <span className="text-[#38bdf8] shrink-0 mt-0.5">·</span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Code2 size={16} className="text-[#38bdf8]" />
          <h2 className="font-semibold text-[#e8edf5]">Skills</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.category}
                className="p-5 rounded-lg border border-[#1e2d3d] bg-[#0f1520] space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Icon size={13} className="text-[#38bdf8]" />
                  <p className="text-xs font-mono text-[#8b98ac] uppercase tracking-wider">
                    {group.category}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-[#38bdf8]" />
          <h2 className="font-semibold text-[#e8edf5]">Education</h2>
        </div>
        <div className="space-y-px">
          {[
            {
              school: "Udacity",
              degree: "Data Analytics",
              period: "2018",
              note: null,
            },
            {
              school: "Western Governors University",
              degree: "Bachelor of Science, Data Analytics",
              period: "2013 – Present",
              note: "Senior year — in progress",
            },
            {
              school: "Northern Arizona University",
              degree: "Bachelor of Science, Software Engineering",
              period: "2009",
              note: "Transferred to WGU during 3rd year",
            },
          ].map((edu, i) => (
            <div
              key={edu.school}
              className={`p-5 border border-[#1e2d3d] bg-[#0f1520] flex flex-col md:flex-row md:items-center md:justify-between gap-2 ${
                i === 0 ? "rounded-t-lg" : ""
              } ${i === 2 ? "rounded-b-lg" : "border-b-0"}`}
            >
              <div>
                <p className="font-medium text-[#e8edf5] text-sm">
                  {edu.school}
                </p>
                <p className="text-xs text-[#8b98ac]">{edu.degree}</p>
                {edu.note && (
                  <p className="text-xs text-[#4a5568] mt-0.5 italic">
                    {edu.note}
                  </p>
                )}
              </div>
              <span className="text-xs font-mono text-[#4a5568]">
                {edu.period}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
