"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

export type CareerNodeData = {
  role: string;
  company: string;
  year: string;
  type: "Full-time" | "Consulting";
  location: string;
  highlight: boolean;
  selected: boolean;
  lane: "above" | "below";
};

function CareerNode({ data }: NodeProps) {
  const nodeData = data as CareerNodeData;
  const consulting = nodeData.type === "Consulting";
  const current = nodeData.year.includes("Present");
  const accent = consulting ? "#f0b25c" : "#4cc9f0";

  return (
    <div
      className="career-node-card flex h-[150px] w-[250px] flex-col rounded-2xl border p-4 text-left"
      style={{
        background: nodeData.selected
          ? "#0f1a2e"
          : "rgba(15, 26, 46, 0.92)",
        borderColor: nodeData.selected
          ? accent
          : nodeData.highlight
            ? `${accent}73`
            : "#1e2c47",
        boxShadow: nodeData.selected
          ? `0 0 0 1.5px ${accent}, 0 18px 50px -22px ${accent}80`
          : undefined,
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="top-in"
        style={{ opacity: 0, width: 1, height: 1 }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-in"
        style={{ opacity: 0, width: 1, height: 1 }}
      />

      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-wide text-dim">
          {nodeData.year}
        </span>
        <span
          className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
          style={{
            color: accent,
            borderColor: `${accent}55`,
            background: `${accent}14`,
          }}
        >
          {nodeData.type}
        </span>
      </div>

      <p
        className="display mt-2 text-[19px] leading-tight"
        style={{ color: consulting ? "#f0b25c" : "#e9eef8" }}
      >
        {nodeData.company}
      </p>
      <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-stone">
        {nodeData.role}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2 pt-2">
        <span className="truncate font-mono text-[9px] uppercase tracking-wider text-dim">
          {nodeData.location}
        </span>
        {current ? (
          <span
            className="live-dot h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: accent }}
            aria-hidden="true"
          />
        ) : null}
      </div>
    </div>
  );
}

export default memo(CareerNode);
