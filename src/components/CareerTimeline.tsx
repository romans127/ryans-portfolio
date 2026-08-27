"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Edge,
  type Node,
  type ReactFlowInstance,
} from "@xyflow/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, Minimize2, X } from "lucide-react";
import "@xyflow/react/dist/style.css";
import CareerNode from "@/components/diagrams/CareerNode";
import YearTickNode from "@/components/diagrams/YearTickNode";
import {
  buildCareerGraph,
  CAREER_CARD_HEIGHT,
  CAREER_CARD_WIDTH,
  orderTimeline,
  roleIdOf,
  startYearOf,
  xForYear,
} from "@/lib/career-timeline";
import { getLenis } from "@/lib/smooth-scroll";
import type { Role } from "@/lib/site";

type CareerTimelineProps = {
  roles: Role[];
  consulting: Role[];
};

function CameraRig({
  selectedId,
  fullscreen,
}: {
  selectedId: string | null;
  fullscreen: boolean;
}) {
  const { getNodes, setCenter, fitView } = useReactFlow();
  const previousRef = useRef<string | null>(null);

  useEffect(() => {
    const previous = previousRef.current;
    previousRef.current = selectedId;

    if (selectedId) {
      const node = getNodes().find((candidate) => candidate.id === selectedId);
      if (!node) return;
      const mobile = window.innerWidth < 768;
      const zoom = fullscreen ? (mobile ? 1 : 1.1) : mobile ? 0.85 : 1;
      const centerX =
        node.position.x + CAREER_CARD_WIDTH / 2 + (mobile ? 0 : 230 / zoom);
      const centerY =
        node.position.y +
        CAREER_CARD_HEIGHT / 2 +
        (mobile ? -150 : 0);
      const timer = window.setTimeout(() => {
        setCenter(centerX, centerY, { zoom, duration: 450 });
      }, 30);
      return () => window.clearTimeout(timer);
    }

    if (previous && window.innerWidth >= 768) {
      const timer = window.setTimeout(() => {
        fitView({ padding: fullscreen ? 0.1 : 0.14, duration: 450 });
      }, 30);
      return () => window.clearTimeout(timer);
    }
  }, [selectedId, fullscreen, getNodes, setCenter, fitView]);

  return null;
}

function FitViewOnChange({
  fitViewKey,
  fullscreen,
  selectedId,
}: {
  fitViewKey: string;
  fullscreen: boolean;
  selectedId: string | null;
}) {
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (selectedId) return;
    const timer = window.setTimeout(() => {
      fitView({ padding: fullscreen ? 0.1 : 0.12, duration: 400 });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [fitView, fitViewKey, fullscreen, selectedId]);

  return null;
}

function CareerTimelineFrame({ roles, consulting }: CareerTimelineProps) {
  const ordered = useMemo(() => orderTimeline(roles, consulting), [roles, consulting]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [engaged, setEngaged] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [spacerHeight, setSpacerHeight] = useState(0);
  const figureRef = useRef<HTMLElement>(null);
  const interactive = engaged || fullscreen;

  const graph = useMemo(
    () => buildCareerGraph(ordered, selectedId),
    [ordered, selectedId],
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(graph.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(graph.edges);

  useEffect(() => {
    setNodes(graph.nodes);
    setEdges(graph.edges);
  }, [graph, setNodes, setEdges]);

  const nodeTypes = useMemo(
    () => ({ career: CareerNode, yearTick: YearTickNode }),
    [],
  );

  const selectedRole = selectedId
    ? (ordered.find((role) => roleIdOf(role) === selectedId) ?? null)
    : null;
  const selectedIndex = selectedRole ? ordered.indexOf(selectedRole) : -1;

  const step = useCallback(
    (direction: 1 | -1) => {
      setSelectedId((current) => {
        if (!current) return current;
        const index = ordered.findIndex((role) => roleIdOf(role) === current);
        const next = ordered[index + direction];
        return next ? roleIdOf(next) : current;
      });
    },
    [ordered],
  );

  const engage = useCallback(() => setEngaged(true), []);

  const onNodeClick = useCallback(
    (_: unknown, node: Node) => {
      engage();
      if (node.type === "career") setSelectedId(node.id);
    },
    [engage],
  );

  const onPaneClick = useCallback(() => {
    if (!interactive) {
      engage();
      return;
    }
    setSelectedId(null);
  }, [engage, interactive]);

  const onSelectionChange = useCallback(
    ({ nodes: selected }: { nodes: Node[]; edges: Edge[] }) => {
      if (!interactive) return;
      const career = selected.find((node) => node.type === "career");
      if (career) setSelectedId(career.id);
    },
    [interactive],
  );

  const onInit = useCallback(
    (instance: ReactFlowInstance) => {
      if (window.innerWidth < 768) {
        const latest = ordered[ordered.length - 1];
        instance.setCenter(xForYear(startYearOf(latest)), 40, { zoom: 0.72 });
      } else {
        instance.fitView({ padding: 0.12 });
      }
    },
    [ordered],
  );

  useEffect(() => {
    if (!fullscreen) return;

    getLenis()?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [fullscreen]);

  const toggleFullscreen = useCallback(() => {
    setFullscreen((current) => {
      if (!current) {
        setEngaged(true);
        if (figureRef.current) {
          setSpacerHeight(figureRef.current.offsetHeight);
        }
      }
      return !current;
    });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedId) {
          setSelectedId(null);
          return;
        }
        if (fullscreen) {
          setFullscreen(false);
          return;
        }
        if (engaged) {
          setEngaged(false);
        }
        return;
      }
      if (!selectedId) return;
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, fullscreen, engaged, step]);

  const fitViewKey = `${fullscreen}-${selectedId ?? "none"}`;
  const idleHint = "Scroll to continue · click the timeline to explore";
  const activeHint =
    "Drag to pan · pinch or +/− to zoom · click a seat for the story · Esc to close";
  const hint = interactive ? activeHint : idleHint;

  const figure = (
    <figure
      ref={figureRef}
      className={
        fullscreen
          ? "career-flow-fullscreen panel fixed inset-0 z-[90] flex h-dvh w-screen flex-col overflow-hidden rounded-none border-0"
          : "panel-featured overflow-hidden rounded-2xl"
      }
    >
        <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3.5 md:px-6">
          <p className="kicker">My Journey</p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-wider text-dim">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                Full-time seat
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                Consulting
              </span>
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
          </div>
        </figcaption>

        <div
          className={`career-flow relative ${interactive ? "career-flow--active" : "career-flow--idle"} ${fullscreen ? "career-flow--fullscreen" : "h-[540px] md:h-[600px]"}`}
          {...(interactive ? { "data-lenis-prevent": true } : {})}
          onPointerDown={() => {
            if (!interactive) engage();
          }}
        >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onSelectionChange={onSelectionChange}
          onInit={onInit}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={interactive}
          zoomOnScroll={false}
          zoomOnPinch={interactive}
          zoomOnDoubleClick={false}
          panOnScroll={false}
          panOnDrag={interactive}
          minZoom={0.25}
          maxZoom={fullscreen ? 2 : 1.6}
        >
          <CameraRig selectedId={selectedId} fullscreen={fullscreen} />
          <FitViewOnChange
            fitViewKey={fitViewKey}
            fullscreen={fullscreen}
            selectedId={selectedId}
          />
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#1e2c47"
          />
          <Controls position="top-left" showInteractive={false} />
          <MiniMap
            pannable
            zoomable
            position="bottom-left"
            bgColor="#0a1220"
            maskColor="rgba(5, 9, 18, 0.72)"
            nodeColor={(node: Node) =>
              node.type === "career"
                ? node.data.type === "Consulting"
                  ? "#f0b25c"
                  : "#4cc9f0"
                : "#1e2c47"
            }
            className="max-md:hidden"
          />
        </ReactFlow>

        {!interactive ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-panel/90 via-panel/35 to-transparent pb-5 pt-16"
          >
            <p className="rounded-full border border-line/80 bg-raised/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-dim backdrop-blur-sm">
              Click to explore
            </p>
          </div>
        ) : null}

        <aside
          role="dialog"
          aria-label={
            selectedRole
              ? `${selectedRole.role} at ${selectedRole.company}`
              : "Role details"
          }
          data-lenis-prevent
          className={`absolute z-20 flex flex-col overflow-hidden rounded-2xl border bg-panel/95 backdrop-blur-md transition-all duration-300 ease-out max-md:inset-x-3 max-md:bottom-3 max-md:top-auto max-md:max-h-[65%] md:bottom-4 md:right-4 md:top-4 md:w-[400px] ${
            selectedRole
              ? "translate-x-0 translate-y-0 border-signal/40 opacity-100"
              : "pointer-events-none border-line opacity-0 max-md:translate-y-6 md:translate-x-6"
          }`}
        >
          {selectedRole ? (
            <>
              <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                    {selectedRole.period}
                  </p>
                  <h3 className="display mt-1.5 text-xl leading-tight text-cream">
                    {selectedRole.role}
                  </h3>
                  <p className="mt-1 text-sm text-copper">
                    {selectedRole.company}
                    <span className="text-dim"> · {selectedRole.location}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-stone transition-colors hover:border-signal/40 hover:text-cream"
                  aria-label="Close role details"
                >
                  <X size={13} />
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                <span
                  className={`inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                    selectedRole.type === "Consulting"
                      ? "border-copper/40 bg-copper/10 text-copper"
                      : "border-signal/40 bg-signal/10 text-signal"
                  }`}
                >
                  {selectedRole.type}
                </span>

                <p className="text-sm leading-relaxed text-stone">
                  {selectedRole.summary}
                </p>

                <ul className="space-y-2.5">
                  {selectedRole.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2.5 text-sm text-stone">
                      <span className="mt-0.5 shrink-0 text-signal">▹</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {selectedRole.engagements &&
                selectedRole.engagements.length > 0 ? (
                  <div className="space-y-3 border-t border-line pt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                      Client engagements
                    </p>
                    {selectedRole.engagements.map((engagement) => (
                      <div
                        key={engagement.client}
                        className="rounded-xl border border-line bg-raised/60 p-3.5"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="text-sm font-medium text-copper">
                            {engagement.client}
                          </p>
                          <p className="font-mono text-[10px] text-dim">
                            {engagement.period}
                          </p>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-stone">
                          {engagement.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-1.5">
                  {selectedRole.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    disabled={selectedIndex <= 0}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] text-stone transition-colors hover:border-signal/30 hover:text-cream disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft size={12} />
                    Earlier
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    disabled={selectedIndex >= ordered.length - 1}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[10px] text-stone transition-colors hover:border-signal/30 hover:text-cream disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Later
                    <ArrowRight size={12} />
                  </button>
                </div>
                <Link
                  href="/experience"
                  className="inline-flex shrink-0 items-center gap-1 text-xs text-signal hover:text-cream"
                >
                  Full career <ArrowUpRight size={12} />
                </Link>
              </div>
            </>
          ) : null}
        </aside>
      </div>

      <p className="border-t border-line px-5 py-2 font-mono text-[10px] text-dim md:px-6">
        {fullscreen ? `${hint} · Esc to exit` : hint}
      </p>
    </figure>
  );

  return (
    <>
      {fullscreen ? (
        <div aria-hidden className="w-full" style={{ height: spacerHeight }} />
      ) : null}

      {fullscreen && typeof document !== "undefined"
        ? createPortal(figure, document.body)
        : !fullscreen
          ? figure
          : null}
    </>
  );
}

export default function CareerTimeline(props: CareerTimelineProps) {
  return (
    <ReactFlowProvider>
      <CareerTimelineFrame {...props} />
    </ReactFlowProvider>
  );
}
