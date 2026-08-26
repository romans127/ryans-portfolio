"use client";

import { useEffect, useId, useRef, useState } from "react";

type MermaidBlockProps = {
  chart: string;
  title: string;
  caption?: string;
};

export default function MermaidBlock({ chart, title, caption }: MermaidBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reactId = useId().replace(/:/g, "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      const container = containerRef.current;
      if (!container) return;

      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "strict",
          themeVariables: {
            primaryColor: "#0f1a2e",
            primaryTextColor: "#e9eef8",
            primaryBorderColor: "#4cc9f0",
            lineColor: "#4cc9f088",
            secondaryColor: "#0a1220",
            tertiaryColor: "#081122",
            background: "#0a1220",
            mainBkg: "#0f1a2e",
            secondBkg: "#0a1220",
            border1: "#1e2c47",
            border2: "#4cc9f044",
            arrowheadColor: "#4cc9f0",
            fontFamily: "Outfit, system-ui, sans-serif",
          },
          flowchart: { htmlLabels: true, curve: "basis" },
          sequence: { actorMargin: 48, messageMargin: 40 },
        });

        const { svg } = await mermaid.render(`mermaid-${reactId}`, chart);
        if (!cancelled) {
          container.innerHTML = svg;
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Diagram failed to render");
        }
      }
    }

    void render();
    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  return (
    <figure className="panel overflow-hidden rounded-2xl">
      <figcaption className="border-b border-line px-5 py-4 md:px-6">
        <p className="kicker">{title}</p>
        {caption ? <p className="mt-1 text-xs leading-relaxed text-stone">{caption}</p> : null}
      </figcaption>
      <div className="overflow-x-auto p-4 md:p-6">
        {error ? (
          <p className="text-sm text-stone">{error}</p>
        ) : (
          <div
            ref={containerRef}
            className="mermaid-shell flex min-h-[220px] items-center justify-center [&_svg]:max-w-none"
          />
        )}
      </div>
    </figure>
  );
}
