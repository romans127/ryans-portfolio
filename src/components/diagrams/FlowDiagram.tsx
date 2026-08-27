"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import PlatformFlowNode from "@/components/diagrams/PlatformFlowNode";
import type { FlowChartDef } from "@/lib/platform-diagram-content";

type FlowDiagramProps = {
  title: string;
  caption?: string;
  chart: FlowChartDef;
  height?: number;
};

export default function FlowDiagram({
  title,
  caption,
  chart,
  height = 320,
}: FlowDiagramProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const visibleNodes = useMemo(() => {
    const expansionNodes = Object.entries(chart.expansions ?? {})
      .filter(([id]) => expandedIds.has(id))
      .flatMap(([, expansion]) => expansion.nodes);
    return [...chart.nodes, ...expansionNodes].map((node) => ({
      ...node,
      data: {
        ...node.data,
        expanded: expandedIds.has(node.id),
      },
    }));
  }, [chart, expandedIds]);

  const visibleEdges = useMemo(() => {
    const expansionEdges = Object.entries(chart.expansions ?? {})
      .filter(([id]) => expandedIds.has(id))
      .flatMap(([, expansion]) => expansion.edges);
    return [...chart.edges, ...expansionEdges];
  }, [chart, expandedIds]);

  const [nodes, setNodes, onNodesChange] = useNodesState(visibleNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(visibleEdges);

  useEffect(() => {
    setNodes(visibleNodes);
    setEdges(visibleEdges);
  }, [visibleNodes, visibleEdges, setNodes, setEdges]);

  const onNodeClick = useCallback(
    (_event: { target: EventTarget }, node: Node) => {
      if (!chart.expansions?.[node.id]) return;
      setExpandedIds((prev) => {
        const next = new Set(prev);
        if (next.has(node.id)) {
          next.delete(node.id);
        } else {
          next.add(node.id);
        }
        return next;
      });
    },
    [chart],
  );

  const nodeTypes = useMemo(() => ({ platform: PlatformFlowNode }), []);
  const hasExpandable = Object.keys(chart.expansions ?? {}).length > 0;

  return (
    <figure className="panel overflow-hidden rounded-2xl">
      <figcaption className="border-b border-line px-5 py-4 md:px-6">
        <p className="kicker">{title}</p>
        {caption ? <p className="mt-1 text-xs leading-relaxed text-stone">{caption}</p> : null}
      </figcaption>
      <div className="platform-flow" style={{ height }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.4}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={18}
            size={1}
            color="#1e2c47"
          />
        </ReactFlow>
      </div>
      <p className="border-t border-line px-5 py-2 font-mono text-[10px] text-dim md:px-6">
        {hasExpandable
          ? "Drag nodes to explore · click + to expand"
          : "Drag nodes to explore the flow"}
      </p>
    </figure>
  );
}
