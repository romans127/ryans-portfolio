import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import type { Metric } from "@/lib/site";

type MetricCardsProps = {
  metrics: Metric[];
  columns?: 2 | 3 | 4;
};

export default function MetricCards({ metrics, columns = 4 }: MetricCardsProps) {
  const gridClass =
    columns === 3
      ? "grid-cols-1 sm:grid-cols-3"
      : columns === 2
        ? "grid-cols-2"
        : "grid-cols-2 md:grid-cols-4";

  return (
    <section className={`grid gap-3 ${gridClass}`}>
      {metrics.map((metric, index) => (
        <Reveal key={metric.label} delayMs={index * 60}>
          <div className="panel card-hover flex min-h-[108px] flex-col justify-between rounded-2xl p-5">
            <div className="display text-4xl leading-none text-cream">
              <CountUp value={metric.value} />
            </div>
            <p className="mt-3 min-h-[2.5rem] font-mono text-[11px] uppercase leading-snug tracking-wider text-dim">
              {metric.label}
            </p>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
