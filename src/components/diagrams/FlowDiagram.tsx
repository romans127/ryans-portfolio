"use client";

import { useMemo } from "react";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import PlatformFlowNode from "@/components/diagrams/PlatformFlowNode";

type FlowDiagramProps = {
  title: string;
  caption?: string;
  nodes: Node[];
  edges: Edge[];
  height?: number;
};

export default function FlowDiagram({
  title,
  caption,
  nodes: initialNodes,
  edges: initialEdges,
  height = 320,
}: FlowDiagramProps) {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ platform: PlatformFlowNode }), []);
  const proOptions = useMemo(() => ({ hideAttribution: true }), []);

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
          nodesDraggable
          nodesConnectable={false}
          elementsSelectable
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.5}
          maxZoom={1.4}
          proOptions={proOptions}
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
        Drag nodes to explore the flow
      </p>
    </figure>
  );
}
