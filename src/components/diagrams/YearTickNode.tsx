"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

export type YearTickNodeData = {
  label?: string;
  now?: boolean;
  dotOnly?: boolean;
};

const hiddenHandle = { opacity: 0, width: 1, height: 1 } as const;

function YearTickNode({ data }: NodeProps) {
  const nodeData = data as YearTickNodeData;
  const size = nodeData.dotOnly ? 8 : 14;

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div
        className={nodeData.now ? "live-dot h-full w-full rounded-full" : "h-full w-full rounded-full"}
        style={{
          background: nodeData.now ? "#4cc9f0" : nodeData.dotOnly ? "#5f6d8c" : "#050912",
          border: nodeData.dotOnly
            ? "none"
            : `2px solid ${nodeData.now ? "#4cc9f0" : "rgba(76, 201, 240, 0.55)"}`,
          boxShadow: nodeData.now ? "0 0 12px 2px rgba(76, 201, 240, 0.45)" : undefined,
        }}
      />
      {nodeData.label ? (
        <span
          className="absolute font-mono text-[10px] tracking-wide text-dim"
          style={{ left: 16, top: 12 }}
        >
          {nodeData.label}
        </span>
      ) : null}
      {nodeData.now ? (
        <span
          className="absolute font-mono text-[9px] uppercase tracking-[0.18em] text-signal"
          style={{ left: 16, bottom: 14 }}
        >
          Now
        </span>
      ) : null}

      <Handle type="target" position={Position.Left} id="left" style={hiddenHandle} />
      <Handle type="source" position={Position.Right} id="right" style={hiddenHandle} />
      <Handle type="source" position={Position.Top} id="top" style={hiddenHandle} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={hiddenHandle} />
    </div>
  );
}

export default memo(YearTickNode);
