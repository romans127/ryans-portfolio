import type { Edge, Node } from "@xyflow/react";

export type FlowEdgeRoute = "horizontal" | "vertical-down" | "vertical-up";

export type ExpansionGrid = {
  col: number;
  row: number;
};

export type FlowExpansionDef = {
  direction: "below" | "above";
  layout: Record<string, ExpansionGrid>;
  nodes: Node[];
  edges: Edge[];
};

const EDGE_HANDLES: Record<
  FlowEdgeRoute,
  { sourceHandle?: string; targetHandle?: string }
> = {
  horizontal: {},
  "vertical-down": { sourceHandle: "bottom", targetHandle: "top" },
  "vertical-up": { sourceHandle: "top-out", targetHandle: "bottom-in" },
};

export const EXPANSION_GRID_X = 260;
export const EXPANSION_GRID_Y = 160;
const EXPANSION_ORIGIN = 140;

export function flowEdge(
  source: string,
  target: string,
  label?: string,
  route: FlowEdgeRoute = "horizontal",
): Edge {
  const handles = EDGE_HANDLES[route];

  return {
    id: `${source}-${target}-${label ?? "edge"}`,
    source,
    target,
    sourceHandle: handles.sourceHandle,
    targetHandle: handles.targetHandle,
    type: "smoothstep",
    label,
    animated: true,
    style: { stroke: "#4cc9f0aa", strokeWidth: 1.5 },
    labelStyle: {
      fill: "#e9eef8",
      fontSize: 11,
      fontWeight: 600,
      fontFamily: "var(--font-mono)",
    },
    labelBgStyle: { fill: "#0b1424", fillOpacity: 0.95 },
    labelBgPadding: [6, 3] as [number, number],
    labelBgBorderRadius: 4,
  };
}

export function layoutExpansionNodes(
  parent: Node,
  expansion: FlowExpansionDef,
): Node[] {
  return expansion.nodes.map((node) => {
    const grid = expansion.layout[node.id];
    if (!grid) return node;

    const x = parent.position.x + grid.col * EXPANSION_GRID_X;
    const y =
      expansion.direction === "below"
        ? parent.position.y + EXPANSION_ORIGIN + grid.row * EXPANSION_GRID_Y
        : parent.position.y - EXPANSION_ORIGIN - grid.row * EXPANSION_GRID_Y;

    return { ...node, position: { x, y } };
  });
}

export function shouldHideBaseEdge(
  edge: Edge,
  expandedIds: Set<string>,
): boolean {
  if (expandedIds.has("memory") && edge.source === "memory" && edge.target === "agents") {
    return true;
  }
  if (expandedIds.has("skills") && edge.source === "skills" && edge.target === "agents") {
    return true;
  }
  return false;
}
