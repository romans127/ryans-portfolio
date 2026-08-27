"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Node,
} from "@xyflow/react";
import { Maximize2, Minimize2 } from "lucide-react";
import "@xyflow/react/dist/style.css";
import PlatformFlowNode from "@/components/diagrams/PlatformFlowNode";
import type { FlowChartDef } from "@/lib/platform-diagram-content";
import { getLenis } from "@/lib/smooth-scroll";

type FlowDiagramProps = {
  title: string;
  caption?: string;
  chart: FlowChartDef;
  height?: number;
};

function FitViewOnChange({ fitViewKey }: { fitViewKey: string }) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      fitView({ padding: 0.18, duration: 350 });
    }, 60);
    return () => window.clearTimeout(timer);
  }, [fitView, fitViewKey]);

  return null;
}

function FlowDiagramFrame({
  title,
  caption,
  chart,
  height = 320,
}: FlowDiagramProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [fullscreen, setFullscreen] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const figureRef = useRef<HTMLElement>(null);

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
  const nodeTypes = useMemo(() => ({ platform: PlatformFlowNode }), []);

  useEffect(() => {
    setNodes(visibleNodes);
    setEdges(visibleEdges);
  }, [visibleNodes, visibleEdges, setNodes, setEdges]);

  useEffect(() => {
    if (!fullscreen) return;

    getLenis()?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [fullscreen]);

  const toggleFullscreen = useCallback(() => {
    setFullscreen((current) => {
      if (!current && figureRef.current) {
        setSpacerHeight(figureRef.current.offsetHeight);
      }
      return !current;
    });
  }, []);

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

  const hasExpandable = Object.keys(chart.expansions ?? {}).length > 0;
  const fitViewKey = `${fullscreen}-${[...expandedIds].sort().join(",")}`;

  const hint = hasExpandable
    ? "Drag nodes to explore · click + to expand"
    : "Drag nodes to explore the flow";

  return (
    <>
      {fullscreen ? (
        <div aria-hidden className="w-full" style={{ height: spacerHeight }} />
      ) : null}

      <figure
        ref={figureRef}
        className={
          fullscreen
            ? "platform-flow-fullscreen panel fixed inset-0 z-[90] flex flex-col overflow-hidden rounded-none border-0"
            : "panel overflow-hidden rounded-2xl"
        }
      >
        <figcaption className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
          <div className="min-w-0 space-y-1">
            <p className="kicker">{title}</p>
            {caption ? (
              <p className="text-xs leading-relaxed text-stone">{caption}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] text-stone transition-colors hover:border-signal/30 hover:text-cream"
            aria-label={fullscreen ? "Exit full screen" : "Open full screen"}
            aria-pressed={fullscreen}
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            <span>{fullscreen ? "Exit" : "Full screen"}</span>
          </button>
        </figcaption>

        <div
          className={`platform-flow ${fullscreen ? "platform-flow--fullscreen" : ""}`}
          style={fullscreen ? undefined : { height }}
          data-lenis-prevent
        >
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
            minZoom={0.35}
            maxZoom={fullscreen ? 2 : 1.4}
          >
            <FitViewOnChange fitViewKey={fitViewKey} />
            <Background
              variant={BackgroundVariant.Dots}
              gap={18}
              size={1}
              color="#1e2c47"
            />
          </ReactFlow>
        </div>

        <p className="border-t border-line px-5 py-2 font-mono text-[10px] text-dim md:px-6">
          {fullscreen ? `${hint} · Esc to exit` : hint}
        </p>
      </figure>
    </>
  );
}

export default function FlowDiagram(props: FlowDiagramProps) {
  return (
    <ReactFlowProvider>
      <FlowDiagramFrame {...props} />
    </ReactFlowProvider>
  );
}
