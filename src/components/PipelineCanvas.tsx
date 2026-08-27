"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type NodeId =
  | "sources"
  | "warehouse"
  | "dbt"
  | "bi"
  | "pipelines"
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

const NODE_W = 140;
const NODE_H = 44;
const NODE_RX = 10;
const NODE_FONT = 13;

type PipelineEdge = {
  from: NodeId;
  to: NodeId;
  label?: string;
  bend?: number;
};

const nodes: PipelineNode[] = [
  {
    id: "sources",
    label: "Sources",
    x: 24,
    y: 28,
    tone: "copper",
    href: "/projects/realtime-threat-detection",
    destination: "Streaming ingest, CDC & OSINT feeds",
  },
  {
    id: "warehouse",
    label: "Warehouse",
    x: 196,
    y: 28,
    tone: "signal",
    href: "/projects/gtm-revenue-warehouse",
    destination: "BigQuery, Postgres & lakehouse storage",
  },
  {
    id: "dbt",
    label: "Models (dbt)",
    x: 368,
    y: 28,
    tone: "signal",
    href: "/projects/gtm-revenue-warehouse",
    destination: "Semantic models, marts & governed metrics",
  },
  {
    id: "bi",
    label: "BI (Lightdash)",
    x: 540,
    y: 28,
    tone: "copper",
    href: "/projects/gtm-revenue-warehouse",
    destination: "Self-serve explores, dashboards & KPIs",
  },
  {
    id: "pipelines",
    label: "Data pipelines",
    x: 110,
    y: 118,
    tone: "copper",
    href: "/projects/billing-medallion-migration",
    destination: "Source ingest into the warehouse and reverse ETL back out",
  },
  {
    id: "agents",
    label: "Agents",
    x: 196,
    y: 220,
    tone: "copper",
    href: "/projects/agent-mcp-stack",
    destination: "Agent runtimes, skills & tool routing",
  },
  {
    id: "mcp",
    label: "MCP",
    x: 368,
    y: 220,
    tone: "signal",
    href: "/projects/mcp-openapi-proxy",
    destination: "OpenAPI specs → typed MCP tool servers",
  },
  {
    id: "apis",
    label: "Live APIs",
    x: 540,
    y: 220,
    tone: "copper",
    href: "https://github.com/romans127/mcp-openapi-proxy-go",
    destination: "Production HTTP endpoints agents call",
    external: true,
  },
];

const edges: PipelineEdge[] = [
  { from: "sources", to: "pipelines", label: "ingest" },
  { from: "pipelines", to: "warehouse", label: "load" },
  { from: "warehouse", to: "pipelines", label: "reverse ETL", bend: 46 },
  { from: "warehouse", to: "dbt" },
  { from: "dbt", to: "bi" },
  { from: "warehouse", to: "agents" },
  { from: "dbt", to: "agents" },
  { from: "agents", to: "mcp" },
  { from: "mcp", to: "apis" },
];

function center(id: NodeId) {
  const node = nodes.find((item) => item.id === id);
  if (!node) return { x: 0, y: 0 };
  return { x: node.x + NODE_W / 2, y: node.y + NODE_H / 2 };
}

function edgePath(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend = 0,
) {
  if (!bend) return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  const controlX = (from.x + to.x) / 2 + bend;
  const controlY = (from.y + to.y) / 2 + Math.abs(bend) * 0.25;
  return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
}

function edgeLabelPoint(
  from: { x: number; y: number },
  to: { x: number; y: number },
  bend = 0,
) {
  if (!bend) {
    return { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - 8 };
  }
  return {
    x: (from.x + to.x) / 2 + bend * 0.45,
    y: (from.y + to.y) / 2 + Math.abs(bend) * 0.12,
  };
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
    <div className="panel relative overflow-hidden rounded-2xl p-5 md:p-6">
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
        viewBox="0 0 704 288"
        className="hidden min-h-[320px] w-full md:block"
        role="navigation"
        aria-label="Interactive pipeline navigation: sources through data pipelines into the warehouse, reverse ETL back out, then models, BI, agents, MCP, and live APIs"
      >
        {edges.map((edge) => {
          const a = center(edge.from);
          const b = center(edge.to);
          const lit = active === edge.from || active === edge.to;
          const labelPoint = edge.label
            ? edgeLabelPoint(a, b, edge.bend)
            : null;
          return (
            <g key={`${edge.from}-${edge.to}-${edge.label ?? "edge"}`}>
              <path
                d={edgePath(a, b, edge.bend)}
                fill="none"
                className={lit ? "flow-edge" : undefined}
                stroke={lit ? "#4cc9f0" : "#1e2c47"}
                strokeWidth={lit ? 1.6 : 1}
              />
              {labelPoint ? (
                <text
                  x={labelPoint.x}
                  y={labelPoint.y}
                  textAnchor="middle"
                  fill={lit ? "#4cc9f0" : "#6b7c99"}
                  fontSize="9"
                  fontFamily="IBM Plex Mono, ui-monospace, monospace"
                  className="pointer-events-none select-none"
                >
                  {edge.label}
                </text>
              ) : null}
            </g>
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
                width={NODE_W}
                height={NODE_H}
                rx={NODE_RX}
                fill={fill}
                stroke={stroke}
                className="transition-[fill,stroke] duration-200"
              />
              <text
                x={node.x + NODE_W / 2}
                y={node.y + NODE_H / 2 + 4}
                textAnchor="middle"
                fill={lit ? "#e9eef8" : "#a2b0ca"}
                fontSize={NODE_FONT}
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
              className={`rounded-lg border px-3 py-2.5 text-left font-mono text-xs transition-colors ${
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
