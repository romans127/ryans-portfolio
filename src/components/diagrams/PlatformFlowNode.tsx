"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

export type PlatformFlowNodeData = {
  label: string;
  tone?: "signal" | "copper" | "neutral";
  expandable?: boolean;
  expanded?: boolean;
};

type ToneStyle = {
  border: string;
  bg: string;
  borderRadius: number | string;
  borderStyle: "solid" | "dashed";
};

const TONE_STYLES: Record<NonNullable<PlatformFlowNodeData["tone"]>, ToneStyle> = {
  // Process / transform nodes — rounded boxes
  signal: { border: "#4cc9f0", bg: "#4cc9f01f", borderRadius: 12, borderStyle: "solid" },
  // Source / input nodes — stadium pills
  copper: { border: "#f0b25c", bg: "#f0b25c1f", borderRadius: 999, borderStyle: "solid" },
  // Leaf / output nodes — sharp-cornered dashed tags
  neutral: { border: "#5b6b8c", bg: "#101c33", borderRadius: 4, borderStyle: "dashed" },
};

function splitLabel(label: string): string[] {
  return label.split(/<br\s*\/?>/gi).map((line) => line.trim());
}

export default function PlatformFlowNode({ data }: NodeProps) {
  const nodeData = data as PlatformFlowNodeData;
  const tone = nodeData.tone ?? "neutral";
  const { border, bg, borderRadius, borderStyle } = TONE_STYLES[tone];
  const lines = splitLabel(nodeData.label);

  return (
    <div
      className="platform-flow-node"
      style={{
        background: bg,
        border: `1.5px ${borderStyle} ${border}`,
        borderRadius,
        color: "#e9eef8",
        fontSize: 12,
        fontWeight: 500,
        fontFamily: "var(--font-sans), Outfit, system-ui, sans-serif",
        padding: tone === "copper" ? "10px 20px" : "10px 14px",
        minWidth: 168,
        maxWidth: 200,
        textAlign: "center",
        lineHeight: 1.35,
        position: "relative",
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ opacity: 0, width: 1, height: 1 }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        style={{ opacity: 0, width: 1, height: 1 }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-in"
        style={{ opacity: 0, width: 1, height: 1 }}
      />
      {lines.map((line, index) => (
        <span key={`${line}-${index}`}>
          {index > 0 ? <br /> : null}
          {line}
        </span>
      ))}
      {nodeData.expandable ? (
        <span
          style={{
            position: "absolute",
            top: -9,
            right: -9,
            width: 20,
            height: 20,
            borderRadius: 999,
            background: "#0b1424",
            border: `1.5px solid ${border}`,
            color: "#e9eef8",
            fontSize: 12,
            fontWeight: 700,
            lineHeight: "17px",
            textAlign: "center",
            cursor: "pointer",
          }}
          aria-hidden="true"
        >
          {nodeData.expanded ? "−" : "+"}
        </span>
      ) : null}
      <Handle
        type="source"
        position={Position.Right}
        style={{ opacity: 0, width: 1, height: 1 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ opacity: 0, width: 1, height: 1 }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-out"
        style={{ opacity: 0, width: 1, height: 1 }}
      />
    </div>
  );
}
