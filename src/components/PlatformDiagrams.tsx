"use client";

import FlowDiagram from "@/components/diagrams/FlowDiagram";
import MermaidBlock from "@/components/diagrams/MermaidBlock";
import { getFlowChart, getMermaidChart } from "@/lib/platform-diagram-content";
import type { PlatformDiagramSpec } from "@/lib/site";

type PlatformDiagramsProps = {
  diagrams: PlatformDiagramSpec[];
};

export default function PlatformDiagrams({ diagrams }: PlatformDiagramsProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <p className="kicker">How it works</p>
        <p className="text-sm text-stone">
          Visual maps of the product story — drag flows to explore, or scan the overview
          diagrams.
        </p>
      </div>
      <div className="space-y-6">
        {diagrams.map((diagram) => {
          if (diagram.kind === "mermaid") {
            const chart = getMermaidChart(diagram.id);
            if (!chart) return null;
            return (
              <MermaidBlock
                key={diagram.id}
                chart={chart}
                title={diagram.title}
                caption={diagram.caption}
              />
            );
          }

          const flow = getFlowChart(diagram.id);
          if (!flow) return null;
          return (
            <FlowDiagram
              key={diagram.id}
              title={diagram.title}
              caption={diagram.caption}
              chart={flow}
              height={diagram.id === "sh-coach-family-flow" ? 360 : 300}
            />
          );
        })}
      </div>
    </section>
  );
}
