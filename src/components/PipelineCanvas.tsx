"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type NodeId =
  | "sources"
  | "warehouse"
  | "dbt"
  | "bi"
  | "reverse"
  | "agents"
  | "mcp"
  | "apis";

type PipelineNode = {
  id: NodeId;
  label: string;
  x: number;
  y: number;
  tone: "signal" | "copper";
  href: string;
  destination: string;
  external?: boolean;
};

const nodes: PipelineNode[] = [
  {
    id: "sources",
    label: "Sources",
    x: 48,
    y: 42,
    tone: "copper",
    href: "/projects/cork-threat-detection",
    destination: "Cork threat-detection pipelines",
  },
  {
    id: "warehouse",
    label: "Warehouse",
    x: 210,
    y: 42,
    tone: "signal",
    href: "/projects/vitable-warehouse",
    destination: "Vitable GTM warehouse",
  },
  {
    id: "dbt",
    label: "dbt models",
    x: 380,
    y: 42,
    tone: "signal",
    href: "/projects/vitable-warehouse",
    destination: "HubSpot renewal & expansion models",
  },
  {
    id: "bi",
    label: "Lightdash",
    x: 550,
    y: 28,
    tone: "copper",
    href: "/projects/vitable-warehouse",
    destination: "Self-serve BI for Finance & Ops",
  },
  {
    id: "reverse",
    label: "Hightouch",
    x: 550,
    y: 92,
    tone: "copper",
    href: "/projects/vitable-warehouse",
    destination: "Reverse ETL into HubSpot",
  },
  {
    id: "agents",
    label: "Agents",
    x: 210,
    y: 148,
    tone: "copper",
    href: "/projects/dvx-agents",
    destination: "DVx agent + MCP stack",
  },
  {
    id: "mcp",
    label: "MCP / Go",
    x: 380,
    y: 148,
    tone: "signal",
    href: "/projects/mcp-openapi-proxy",
    destination: "MCP OpenAPI Proxy case study",
  },
  {
    id: "apis",
    label: "Live APIs",
    x: 550,
    y: 148,
    tone: "copper",
    href: "https://github.com/romans127/mcp-openapi-proxy-go",
    destination: "Open-source Go repo",
    external: true,
  },
];

const edges: { from: NodeId; to: NodeId }[] = [
  { from: "sources", to: "warehouse" },
  { from: "warehouse", to: "dbt" },
  { from: "dbt", to: "bi" },
  { from: "dbt", to: "reverse" },
  { from: "warehouse", to: "agents" },
  { from: "dbt", to: "agents" },
  { from: "agents", to: "mcp" },
  { from: "mcp", to: "apis" },
];

function center(id: NodeId) {
  const node = nodes.find((item) => item.id === id);
  if (!node) return { x: 0, y: 0 };
  return { x: node.x + 52, y: node.y + 16 };
}

export default function PipelineCanvas() {
  const router = useRouter();
  const [active, setActive] = useState<NodeId | null>("mcp");

  const activeNode = nodes.find((node) => node.id === active) ?? nodes[6];

  function navigate(node: PipelineNode) {
    if (node.external) {
      window.open(node.href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(node.href);
  }

  function handleNodeKeyDown(
    event: React.KeyboardEvent,
    node: PipelineNode,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(node);
    }
  }

  return (
    <div className="panel relative overflow-hidden rounded-2xl p-4 md:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="kicker">Control plane</p>
          <p className="mt-1 text-sm text-stone">
            Warehouse truth in, agent tools out. Click a node to navigate.
          </p>
        </div>
        <span className="hidden items-center gap-2 font-mono text-[11px] text-dim sm:flex">
          <span className="live-dot inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          live schematic
        </span>
      </div>

      <svg
        viewBox="0 0 660 196"
        className="hidden h-auto w-full md:block"
        role="navigation"
        aria-label="Interactive pipeline navigation from sources through warehouse, dbt, BI, reverse ETL, agents, MCP, and live APIs"
      >
        {edges.map((edge) => {
          const a = center(edge.from);
          const b = center(edge.to);
          const lit = active === edge.from || active === edge.to;
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={lit ? "flow-edge" : undefined}
              stroke={lit ? "#4cc9f0" : "#1e2c47"}
              strokeWidth={lit ? 1.6 : 1}
            />
          );
        })}
        {nodes.map((node) => {
          const lit = active === node.id;
          const fill = lit
            ? node.tone === "signal"
              ? "#4cc9f018"
              : "#f0b25c18"
            : "#0a1220";
          const stroke = lit
            ? node.tone === "signal"
              ? "#4cc9f0"
              : "#f0b25c"
            : "#1e2c47";
          return (
            <g
              key={node.id}
              role="link"
              tabIndex={0}
              aria-label={`${node.label}: ${node.destination}${node.external ? " (opens in new tab)" : ""}`}
              className="cursor-pointer outline-none focus-visible:[&_rect]:stroke-[#4cc9f0] focus-visible:[&_rect]:stroke-[2px]"
              onMouseEnter={() => setActive(node.id)}
              onFocus={() => setActive(node.id)}
              onClick={() => navigate(node)}
              onKeyDown={(event) => handleNodeKeyDown(event, node)}
            >
              <rect
                x={node.x}
                y={node.y}
                width={104}
                height={32}
                rx={8}
                fill={fill}
                stroke={stroke}
                className="transition-[fill,stroke] duration-200"
              />
              <text
                x={node.x + 52}
                y={node.y + 21}
                textAnchor="middle"
                fill={lit ? "#e9eef8" : "#a2b0ca"}
                fontSize="11"
                fontFamily="IBM Plex Mono, ui-monospace, monospace"
                className="pointer-events-none select-none"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="grid grid-cols-2 gap-2 md:hidden">
        {nodes.map((node) => {
          const lit = active === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onMouseEnter={() => setActive(node.id)}
              onFocus={() => setActive(node.id)}
              onClick={() => navigate(node)}
              className={`rounded-lg border px-3 py-2 text-left font-mono text-[11px] transition-colors ${
                lit
                  ? "border-signal/50 bg-signal/10 text-cream"
                  : "border-line bg-panel text-stone hover:border-signal/30"
              }`}
            >
              {node.label}
            </button>
          );
        })}
      </div>

      <div
        className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3"
        aria-live="polite"
      >
        <p className="min-w-0 truncate text-xs text-stone">
          <span className="font-mono text-signal">{activeNode.label}</span>
          <span className="text-dim"> → </span>
          {activeNode.destination}
        </p>
        <button
          type="button"
          onClick={() => navigate(activeNode)}
          className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] text-signal transition-colors hover:text-cream"
        >
          Open
          <ArrowUpRight size={12} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
