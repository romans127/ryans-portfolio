import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MetricCards from "@/components/MetricCards";
import Reveal from "@/components/Reveal";
import Timeline from "@/components/Timeline";
import { metrics, roles } from "@/lib/site";

const timeline = roles.map((role) => ({
  year: role.year,
  role: role.role,
  company: role.company,
  type: role.type,
  location: role.location,
  tags: role.tags,
  summary: role.summary,
  highlight: Boolean(role.highlight),
  engagements: role.engagements,
}));

export default function Experience() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
      <Reveal className="space-y-3">
        <p className="kicker">Work</p>
        <h1 className="display text-4xl text-cream md:text-6xl">
          Seventeen years, still in the models.
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-stone">
          Sixteen years under Kingdom Code: consulting (PrizePicks, LTK) and
          platforms I still run — Kingdom Keys, Righteous Reviews, Stats Hub.
          Founding Director of Data at Vitable, Head of AI at DVx, staff and
          principal seats at Cork and MANTL. Simpleview through June 2020.
        </p>
      </Reveal>

      <MetricCards metrics={metrics} columns={4} />

      <Timeline items={timeline} />

      <Reveal>
        <div className="panel space-y-3 rounded-2xl p-6">
          <p className="text-sm font-medium text-cream">Open to the next seat</p>
          <p className="text-sm leading-relaxed text-stone">
            Principal or director-level AI and data roles, plus short advisory
            work when the warehouse or the agents need someone who still writes
            the Terraform.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm text-signal">
            Get in touch <ArrowUpRight size={14} />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
