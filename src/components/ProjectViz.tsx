import type { ProjectViz as ProjectVizSpec } from "@/lib/site";
import FlowDiagram from "@/components/diagrams/FlowDiagram";
import { getFlowChart } from "@/lib/platform-diagram-content";

const tierStyles = {
  hot: "border-signal/40 bg-signal/10",
  warm: "border-copper/40 bg-copper/10",
  cold: "border-line bg-raised/80",
  frozen: "border-dim/40 bg-panel/90",
};

function ReactFlowDiagram({
  title,
  caption,
  chartId,
  height = 300,
}: Extract<ProjectVizSpec, { type: "reactflow" }>) {
  const flow = getFlowChart(chartId);
  if (!flow) return null;

  return (
    <FlowDiagram
      title={title}
      caption={caption}
      chart={flow}
      height={height}
    />
  );
}

function BarChart({
  title,
  caption,
  items,
}: Extract<ProjectVizSpec, { type: "bars" }>) {
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <figure className="panel rounded-2xl p-5 md:p-6">
      <figcaption className="kicker">{title}</figcaption>
      {caption ? <p className="mt-2 text-xs text-stone">{caption}</p> : null}
      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="text-xs text-stone">{item.label}</span>
              <span className="font-mono text-xs text-cream">
                {item.value}
                {item.unit ? ` ${item.unit}` : ""}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-raised">
              <div
                className="h-full rounded-full bg-gradient-to-r from-signal/70 to-signal"
                style={{ width: `${(item.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

function TierDiagram({
  title,
  tiers,
}: Extract<ProjectVizSpec, { type: "tiers" }>) {
  return (
    <figure className="panel rounded-2xl p-5 md:p-6">
      <figcaption className="kicker mb-4">{title}</figcaption>
      <div className="grid gap-3 md:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl border p-4 ${tierStyles[tier.tone]}`}
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-dim">
              {tier.subtitle}
            </p>
            <p className="display mt-1 text-xl text-cream">{tier.name}</p>
            <p className="mt-2 text-xs leading-relaxed text-stone">{tier.description}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}

function CompareChart({
  title,
  caption,
  before,
  after,
}: Extract<ProjectVizSpec, { type: "compare" }>) {
  return (
    <figure className="panel rounded-2xl p-5 md:p-6">
      <figcaption className="kicker">{title}</figcaption>
      {caption ? <p className="mt-2 text-xs text-stone">{caption}</p> : null}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-line bg-raised/40 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-dim">Before</p>
          <p className="mt-2 text-sm leading-relaxed text-stone">{before}</p>
        </div>
        <div className="rounded-xl border border-signal/30 bg-signal/10 p-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-signal">After</p>
          <p className="mt-2 text-sm leading-relaxed text-cream">{after}</p>
        </div>
      </div>
    </figure>
  );
}

export default function ProjectViz({ spec }: { spec: ProjectVizSpec }) {
  switch (spec.type) {
    case "reactflow":
      return <ReactFlowDiagram {...spec} />;
    case "bars":
      return <BarChart {...spec} />;
    case "tiers":
      return <TierDiagram {...spec} />;
    case "compare":
      return <CompareChart {...spec} />;
    default: {
      const _exhaustive: never = spec;
      return _exhaustive;
    }
  }
}
