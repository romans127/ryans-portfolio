import type { Edge, Node } from "@xyflow/react";
import type { Role } from "@/lib/site";

export const CAREER_CARD_WIDTH = 250;
export const CAREER_CARD_HEIGHT = 150;

const TIMELINE_START = 2010;
const TIMELINE_END = 2026;
const TICK_STEP = 2;
const PX_PER_YEAR = 130;
const SPINE_GAP = 120;
const ROW_GAP = 24;

type Lane = "above" | "below";
type Slot = { lane: Lane; row: number };

export function startYearOf(role: Role): number {
  const match = role.year.match(/\d{4}/);
  return match ? Number(match[0]) : TIMELINE_START;
}

export function roleIdOf(role: Role): string {
  return `${role.company}-${role.role}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function orderTimeline(roles: Role[], consulting: Role[]): Role[] {
  return [...roles, ...consulting].sort((a, b) => {
    const diff = startYearOf(a) - startYearOf(b);
    if (diff !== 0) return diff;
    if (a.type === b.type) return 0;
    return a.type === "Consulting" ? -1 : 1;
  });
}

export function xForYear(year: number): number {
  return (year - TIMELINE_START) * PX_PER_YEAR;
}

function yForSlot(slot: Slot): number {
  const offset = SPINE_GAP + slot.row * (CAREER_CARD_HEIGHT + ROW_GAP);
  return slot.lane === "above" ? -(offset + CAREER_CARD_HEIGHT) : offset;
}

// First entry anchors the timeline on the upper row; full-time seats alternate
// along the spine; consulting seats orbit on the outer rows.
function assignSlots(ordered: Role[]): Map<string, Slot> {
  const spans = new Map<string, [number, number][]>();
  const slots = new Map<string, Slot>();
  let fullTimeIndex = 0;
  let consultingIndex = 0;

  const fits = (lane: Lane, row: number, x0: number, x1: number) => {
    const list = spans.get(`${lane}:${row}`) ?? [];
    return list.every(([a, b]) => x1 <= a || x0 >= b);
  };

  const claim = (id: string, slot: Slot, x0: number, x1: number) => {
    const key = `${slot.lane}:${slot.row}`;
    spans.set(key, [...(spans.get(key) ?? []), [x0, x1]]);
    slots.set(id, slot);
  };

  ordered.forEach((role, index) => {
    const x = xForYear(startYearOf(role));
    const x0 = x - CAREER_CARD_WIDTH / 2;
    const x1 = x + CAREER_CARD_WIDTH / 2;
    const id = roleIdOf(role);

    if (index === 0) {
      claim(id, { lane: "above", row: 0 }, x0, x1);
      return;
    }

    const candidates: Slot[] =
      role.type === "Consulting"
        ? consultingIndex++ % 2 === 0
          ? [
              { lane: "below", row: 1 },
              { lane: "above", row: 1 },
              { lane: "below", row: 2 },
              { lane: "above", row: 2 },
            ]
          : [
              { lane: "above", row: 1 },
              { lane: "below", row: 1 },
              { lane: "above", row: 2 },
              { lane: "below", row: 2 },
            ]
        : fullTimeIndex++ % 2 === 0
          ? [
              { lane: "below", row: 0 },
              { lane: "above", row: 0 },
              { lane: "below", row: 1 },
              { lane: "above", row: 1 },
            ]
          : [
              { lane: "above", row: 0 },
              { lane: "below", row: 0 },
              { lane: "above", row: 1 },
              { lane: "below", row: 1 },
            ];

    const slot =
      candidates.find((candidate) =>
        fits(candidate.lane, candidate.row, x0, x1),
      ) ?? { lane: "below", row: 2 };
    claim(id, slot, x0, x1);
  });

  return slots;
}

function spineColor(t: number): string {
  const from = [0xf0, 0xb2, 0x5c];
  const to = [0x4c, 0xc9, 0xf0];
  const mixed = from.map((channel, i) =>
    Math.round(channel + (to[i] - channel) * t),
  );
  return `rgba(${mixed[0]}, ${mixed[1]}, ${mixed[2]}, 0.55)`;
}

export function buildCareerGraph(
  ordered: Role[],
  selectedId: string | null,
): { nodes: Node[]; edges: Edge[] } {
  const tickYears: number[] = [];
  for (let year = TIMELINE_START; year <= TIMELINE_END; year += TICK_STEP) {
    tickYears.push(year);
  }
  const tickSet = new Set(tickYears);

  const junctionYears = [
    ...new Set(
      ordered.map((role) => startYearOf(role)).filter((year) => !tickSet.has(year)),
    ),
  ];
  const spinePoints = [
    ...tickYears.map((year) => ({ year, junction: false })),
    ...junctionYears.map((year) => ({ year, junction: true })),
  ].sort((a, b) => a.year - b.year);

  const spineId = (point: { year: number; junction: boolean }) =>
    point.junction ? `junction-${point.year}` : `tick-${point.year}`;

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  for (const point of spinePoints) {
    const size = point.junction ? 8 : 14;
    nodes.push({
      id: spineId(point),
      type: "yearTick",
      position: { x: xForYear(point.year) - size / 2, y: -size / 2 },
      data: {
        label: point.junction ? undefined : String(point.year),
        now: !point.junction && point.year === TIMELINE_END,
        dotOnly: point.junction,
      },
      draggable: false,
      selectable: false,
      connectable: false,
    });
  }

  for (let i = 0; i < spinePoints.length - 1; i += 1) {
    const from = spinePoints[i];
    const to = spinePoints[i + 1];
    edges.push({
      id: `spine-${from.year}-${to.year}`,
      source: spineId(from),
      sourceHandle: "right",
      target: spineId(to),
      targetHandle: "left",
      type: "straight",
      selectable: false,
      style: {
        stroke: spineColor(i / Math.max(spinePoints.length - 2, 1)),
        strokeWidth: 2,
      },
    });
  }

  const slots = assignSlots(ordered);

  ordered.forEach((role) => {
    const roleId = roleIdOf(role);
    const slot = slots.get(roleId) ?? { lane: "below" as Lane, row: 0 };
    const startYear = startYearOf(role);
    const anchorId = tickSet.has(startYear)
      ? `tick-${startYear}`
      : `junction-${startYear}`;
    const selected = roleId === selectedId;

    nodes.push({
      id: roleId,
      type: "career",
      position: {
        x: xForYear(startYear) - CAREER_CARD_WIDTH / 2,
        y: yForSlot(slot),
      },
      data: {
        roleId,
        role: role.role,
        company: role.company,
        year: role.year,
        type: role.type,
        location: role.location,
        highlight: Boolean(role.highlight),
        lane: slot.lane,
        selected,
      },
      selected,
      draggable: false,
      connectable: false,
    });

    edges.push({
      id: `link-${roleId}`,
      source: anchorId,
      sourceHandle: slot.lane === "above" ? "top" : "bottom",
      target: roleId,
      targetHandle: slot.lane === "above" ? "bottom-in" : "top-in",
      type: "straight",
      selectable: false,
      animated: selected,
      style: {
        stroke: selected
          ? role.type === "Consulting"
            ? "#f0b25c"
            : "#4cc9f0"
          : "rgba(95, 109, 140, 0.6)",
        strokeWidth: selected ? 2 : 1.5,
      },
    });
  });

  return { nodes, edges };
}
