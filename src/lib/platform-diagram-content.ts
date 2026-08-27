import type { Edge, Node } from "@xyflow/react";

const flowNode = (
  id: string,
  label: string,
  x: number,
  y: number,
  tone: "signal" | "copper" | "neutral" = "neutral",
  expandable = false,
): Node => ({
  id,
  type: "platform",
  position: { x, y },
  data: { label, tone, expandable },
});

const flowEdge = (source: string, target: string, label?: string): Edge => ({
  id: `${source}-${target}`,
  source,
  target,
  label,
  animated: true,
  style: { stroke: "#4cc9f0aa", strokeWidth: 1.5 },
  labelStyle: { fill: "#e9eef8", fontSize: 11, fontWeight: 600, fontFamily: "var(--font-mono)" },
  labelBgStyle: { fill: "#0b1424", fillOpacity: 0.95 },
  labelBgPadding: [6, 3] as [number, number],
  labelBgBorderRadius: 4,
});

export type FlowChartDef = {
  nodes: Node[];
  edges: Edge[];
  expansions?: Record<string, { nodes: Node[]; edges: Edge[] }>;
};

export const MERMAID_CHARTS: Record<string, string> = {
  "kk-product-pillars": `flowchart TB
    KK["Kingdom Keys"]
    Typing["Typing adventures<br/>Missions · games · streaks"]
    Control["Mission Control<br/>Parents · teachers"]
    Writing["Writing Portal<br/>Essays · assignments"]
    KK --> Typing
    KK --> Control
    KK --> Writing
    Typing --> Control
    Writing --> Control`,

  "rr-review-structure": `flowchart LR
    Search["Search library"]
    Title["Title page"]
    Flags["Content flags<br/>violence · language · themes"]
    Values["Values notes"]
    Chip["Guidance chip"]
    Search --> Title --> Flags --> Values --> Chip
    Chip --> Great["Great for families"]
    Chip --> Guide["With guidance"]
    Chip --> No["Not recommended"]`,

  "sh-development-pillars": `flowchart TB
    Hub["Stats Hub<br/>Player development"]
    Knowledge["Knowledge<br/>Baseball IQ · Chalk Talk"]
    Skills["Skills<br/>Stats · evaluations · progress"]
    Team["Team management<br/>Roster · schedule · practice"]
    Hub --> Knowledge
    Hub --> Skills
    Hub --> Team`,
};

export const FLOW_CHARTS: Record<string, FlowChartDef> = {
  "kk-learner-journey": {
    nodes: [
      flowNode("identity", "Pick explorer<br/>& robot companion", 0, 100, "copper"),
      flowNode("missions", "Planet missions", 260, 0, "signal"),
      flowNode("writing", "Writing Portal", 260, 200, "signal"),
      flowNode("gems", "Cosmic gems", 520, 0, "neutral"),
      flowNode("streaks", "Streaks &<br/>consistency", 520, 100, "neutral"),
      flowNode("control", "Mission Control", 520, 200, "copper"),
      flowNode("parent", "Parent view", 780, 100, "neutral"),
      flowNode("teacher", "Teacher view", 780, 200, "neutral"),
    ],
    edges: [
      flowEdge("identity", "missions", "play"),
      flowEdge("identity", "writing", "write"),
      flowEdge("missions", "gems", "complete"),
      flowEdge("missions", "streaks", "daily"),
      flowEdge("missions", "control", "live stats"),
      flowEdge("writing", "control", "progress"),
      flowEdge("control", "parent", "shares"),
      flowEdge("control", "teacher", "assigns"),
    ],
  },

  "rr-parent-flow": {
    nodes: [
      flowNode("search", "Family searches<br/>library", 0, 100, "copper"),
      flowNode("title", "Title page", 260, 100, "neutral"),
      flowNode("chip", "Guidance chip", 520, 100, "signal"),
      flowNode("great", "Great for<br/>families", 780, 0, "signal"),
      flowNode("guide", "With<br/>guidance", 780, 100, "copper"),
      flowNode("no", "Not<br/>recommended", 780, 200, "neutral"),
    ],
    edges: [
      flowEdge("search", "title"),
      flowEdge("title", "chip"),
      flowEdge("chip", "great"),
      flowEdge("chip", "guide"),
      flowEdge("chip", "no"),
    ],
  },

  "sh-coach-family-flow": {
    nodes: [
      flowNode("coach", "Coaches & staff", 0, 120, "copper"),
      flowNode("hub", "Stats Hub", 260, 120, "signal"),
      flowNode("family", "Parents & players", 520, 20, "neutral"),
      flowNode("knowledge", "Knowledge", 520, 120, "signal"),
      flowNode("skills", "Skills", 520, 220, "copper"),
      flowNode("practice", "Practice library", 780, 120, "neutral"),
      flowNode("games", "Game day", 780, 20, "neutral"),
    ],
    edges: [
      flowEdge("coach", "hub", "runs"),
      flowEdge("hub", "family", "publishes"),
      flowEdge("hub", "knowledge"),
      flowEdge("hub", "skills"),
      flowEdge("coach", "practice", "plans"),
      flowEdge("practice", "hub"),
      flowEdge("hub", "games", "supports"),
    ],
  },

  "mcp-request-path": {
    nodes: [
      flowNode("spec", "OpenAPI spec", 0, 80, "copper"),
      flowNode("proxy", "Go MCP proxy", 260, 80, "signal"),
      flowNode("tools", "Named tools", 520, 80, "signal"),
      flowNode("api", "Live API", 780, 80, "copper"),
      flowNode("agent", "Agent runtime", 520, 200, "neutral"),
    ],
    edges: [
      flowEdge("spec", "proxy"),
      flowEdge("proxy", "tools", "generates"),
      flowEdge("tools", "api", "calls"),
      flowEdge("tools", "agent", "exposes"),
    ],
  },

  "vitable-gtm-loop": {
    nodes: [
      flowNode("hs", "HubSpot", 0, 80, "copper"),
      flowNode("dbt", "dbt models", 260, 80, "signal"),
      flowNode("ld", "Lightdash", 520, 80, "signal"),
      flowNode("pipes", "Reverse ETL", 780, 80, "copper"),
      flowNode("rev", "Revenue team", 520, 200, "neutral"),
      flowNode("cs", "CS team", 780, 200, "neutral"),
    ],
    edges: [
      flowEdge("hs", "dbt", "sync"),
      flowEdge("dbt", "ld", "serve"),
      flowEdge("ld", "pipes", "ETL"),
      flowEdge("ld", "rev", "forecast"),
      flowEdge("ld", "cs", "health"),
    ],
  },

  "dvx-agent-stack": {
    nodes: [
      flowNode("dbt", "dbt foundation", 0, 100, "signal"),
      flowNode("skills", "Skills library", 260, 0, "copper", true),
      flowNode("memory", "Memory structure", 260, 200, "copper", true),
      flowNode("agents", "Agent runtime", 520, 100, "signal"),
      flowNode("mcp", "MCP servers", 780, 100, "copper"),
      flowNode("apis", "Live APIs", 1040, 100, "neutral"),
    ],
    edges: [
      flowEdge("dbt", "agents", "trusted context"),
      flowEdge("skills", "agents", "specialize"),
      flowEdge("memory", "agents", "recall"),
      flowEdge("agents", "mcp", "tool calls"),
      flowEdge("mcp", "apis", "live calls"),
    ],
    expansions: {
      skills: {
        nodes: [
          flowNode("sk-scope", "Repo scope<br/>Stack & boundaries", 60, -180, "neutral"),
          flowNode("sk-engineer", "Engineer skill<br/>Default feature work", 260, -220, "neutral"),
          flowNode("sk-database", "Database skill<br/>SQL safety · approvals", 460, -220, "neutral"),
          flowNode("sk-domain", "Domain skill<br/>Compliance rules", 660, -180, "neutral"),
        ],
        edges: [
          flowEdge("skills", "sk-scope", "per repo"),
          flowEdge("skills", "sk-engineer", "per repo"),
          flowEdge("skills", "sk-database", "per repo"),
          flowEdge("skills", "sk-domain", "per repo"),
          flowEdge("sk-engineer", "agents", "load on task"),
          flowEdge("sk-database", "agents", "load on task"),
          flowEdge("sk-domain", "agents", "load on task"),
        ],
      },
      memory: {
        nodes: [
          flowNode("mem-working", "Working memory<br/>Session scratchpad", 60, 340, "neutral"),
          flowNode("mem-raw", "Raw inputs<br/>Notes · transcripts", 260, 380, "neutral"),
          flowNode("mem-processed", "Processed<br/>Summaries · actions", 460, 380, "neutral"),
          flowNode("mem-index", "Index & tags<br/>Priority-weighted recall", 660, 340, "neutral"),
          flowNode("mem-review", "Spaced review<br/>1d · 7d · 30d", 460, 480, "neutral"),
        ],
        edges: [
          flowEdge("memory", "mem-working", "session"),
          flowEdge("mem-working", "mem-raw", "promote"),
          flowEdge("mem-raw", "mem-processed", "summarize"),
          flowEdge("mem-processed", "mem-index", "tag & rank"),
          flowEdge("mem-index", "mem-review", "reinforce"),
          flowEdge("mem-index", "agents", "recall"),
        ],
      },
    },
  },

  "prizepicks-data-lifecycle": {
    nodes: [
      flowNode("cdc", "CDC & APIs", 0, 100, "copper"),
      flowNode("hot", "Hot tier", 260, 100, "signal"),
      flowNode("warm", "Warm tier<br/>dbt + Prefect", 520, 100, "signal"),
      flowNode("cold", "Cold tier<br/>snapshots", 780, 100, "copper"),
      flowNode("frozen", "Frozen tier<br/>retention exports", 1040, 100, "neutral"),
      flowNode("finance", "Finance & audit", 780, 220, "neutral"),
      flowNode("gdpr", "GDPR holds", 1040, 220, "neutral"),
    ],
    edges: [
      flowEdge("cdc", "hot", "stream"),
      flowEdge("hot", "warm", "model"),
      flowEdge("warm", "cold", "snapshot"),
      flowEdge("cold", "frozen", "export"),
      flowEdge("cold", "finance", "governed read"),
      flowEdge("frozen", "gdpr", "retention"),
    ],
  },

  "prizepicks-model-layer": {
    nodes: [
      flowNode("tx", "Transactional BQ", 0, 100, "copper"),
      flowNode("stg", "Staging models", 260, 100, "signal"),
      flowNode("marts", "Core marts", 520, 100, "signal"),
      flowNode("users", "Users", 780, 0, "neutral"),
      flowNode("contests", "Contests", 780, 100, "neutral"),
      flowNode("entries", "Entries", 780, 200, "neutral"),
      flowNode("sem", "Semantic layer", 1040, 100, "signal"),
      flowNode("ds", "Data science", 1300, 0, "copper"),
      flowNode("kpi", "KPI artifacts", 1300, 100, "copper"),
      flowNode("bi", "BI & reporting", 1300, 200, "neutral"),
    ],
    edges: [
      flowEdge("tx", "stg", "ingest"),
      flowEdge("stg", "marts", "model"),
      flowEdge("marts", "users", "contains"),
      flowEdge("marts", "contests", "contains"),
      flowEdge("marts", "entries", "contains"),
      flowEdge("users", "sem", "feeds"),
      flowEdge("contests", "sem", "feeds"),
      flowEdge("entries", "sem", "feeds"),
      flowEdge("sem", "ds", "features"),
      flowEdge("sem", "kpi", "publish"),
      flowEdge("sem", "bi", "serve"),
    ],
  },

  "prizepicks-replication": {
    nodes: [
      flowNode("pg", "Postgres prod", 0, 100, "copper"),
      flowNode("users", "Users", 260, 0, "neutral"),
      flowNode("payments", "Payments", 260, 100, "neutral"),
      flowNode("filters", "Gameplay config", 260, 200, "neutral"),
      flowNode("spark", "Dataproc Spark", 520, 100, "signal"),
      flowNode("prefect", "Prefect on GKE", 780, 100, "signal"),
      flowNode("bq", "BigQuery", 1040, 100, "copper"),
      flowNode("dbt", "dbt models", 1300, 100, "neutral"),
      flowNode("bi", "BI & DS", 1300, 200, "neutral"),
    ],
    edges: [
      flowEdge("pg", "users", "contains"),
      flowEdge("pg", "payments", "contains"),
      flowEdge("pg", "filters", "contains"),
      flowEdge("users", "spark", "read"),
      flowEdge("payments", "spark", "read"),
      flowEdge("filters", "spark", "read"),
      flowEdge("spark", "prefect", "orchestrate"),
      flowEdge("prefect", "bq", "merge"),
      flowEdge("bq", "dbt", "model"),
      flowEdge("dbt", "bi", "serve"),
    ],
  },

  "ltk-braze-pipeline": {
    nodes: [
      flowNode("braze", "Braze API", 0, 100, "copper"),
      flowNode("canvas", "Canvas data", 260, 0, "neutral"),
      flowNode("campaigns", "Campaign data", 260, 200, "neutral"),
      flowNode("upstream", "Upstream tables", 520, 100, "signal"),
      flowNode("airflow", "Airflow DAGs", 780, 100, "signal"),
      flowNode("cs", "Tag tables", 1040, 100, "copper"),
      flowNode("marketing", "Marketing analytics", 1300, 100, "neutral"),
      flowNode("success", "Customer success", 1300, 200, "neutral"),
    ],
    edges: [
      flowEdge("braze", "canvas", "extract"),
      flowEdge("braze", "campaigns", "extract"),
      flowEdge("canvas", "upstream", "load"),
      flowEdge("campaigns", "upstream", "load"),
      flowEdge("upstream", "airflow", "transform"),
      flowEdge("airflow", "cs", "full overwrite"),
      flowEdge("cs", "marketing", "trust"),
      flowEdge("cs", "success", "segment"),
    ],
  },

  "ltk-billing-medallion": {
    nodes: [
      flowNode("cdc", "CDC services", 0, 100, "copper"),
      flowNode("billing", "Billing events", 260, 0, "neutral"),
      flowNode("permissions", "Account events", 260, 200, "neutral"),
      flowNode("bronze", "Bronze S3", 520, 100, "signal"),
      flowNode("silver", "Silver dedup", 780, 100, "signal"),
      flowNode("gold", "Gold + Redshift", 1040, 100, "copper"),
      flowNode("finance", "Finance", 1300, 100, "neutral"),
      flowNode("ops", "Operations", 1300, 200, "neutral"),
    ],
    edges: [
      flowEdge("cdc", "billing", "captures"),
      flowEdge("cdc", "permissions", "captures"),
      flowEdge("billing", "bronze", "land"),
      flowEdge("permissions", "bronze", "land"),
      flowEdge("bronze", "silver", "dedup"),
      flowEdge("silver", "gold", "curate"),
      flowEdge("gold", "finance", "report"),
      flowEdge("gold", "ops", "track"),
    ],
  },

  "cork-threat-pipeline": {
    nodes: [
      flowNode("tel", "Telemetry + OSINT", 0, 100, "copper"),
      flowNode("public", "Public feeds", 260, 0, "neutral"),
      flowNode("private", "Private sources", 260, 200, "neutral"),
      flowNode("stream", "Realtime ingest", 520, 100, "signal"),
      flowNode("lake", "Warehouse & lake", 780, 100, "signal"),
      flowNode("score", "Risk scoring", 1040, 100, "copper"),
      flowNode("alerts", "Alerting", 1300, 100, "neutral"),
      flowNode("dashboard", "Dashboards", 1300, 200, "neutral"),
    ],
    edges: [
      flowEdge("tel", "public", "includes"),
      flowEdge("tel", "private", "includes"),
      flowEdge("public", "stream", "ingest"),
      flowEdge("private", "stream", "ingest"),
      flowEdge("stream", "lake", "persist"),
      flowEdge("lake", "score", "score"),
      flowEdge("score", "alerts", "notify"),
      flowEdge("score", "dashboard", "review"),
    ],
  },

  "mantl-bank-data-product": {
    nodes: [
      flowNode("pg", "Postgres OLTP", 0, 100, "copper"),
      flowNode("accounts", "Accounts", 260, 0, "neutral"),
      flowNode("transactions", "Transactions", 260, 200, "neutral"),
      flowNode("stream", "Realtime to BQ", 520, 100, "signal"),
      flowNode("dbt", "dbt models", 780, 100, "signal"),
      flowNode("looker", "Embedded Looker", 1040, 100, "copper"),
      flowNode("banks", "Bank clients", 1300, 100, "neutral"),
      flowNode("internal", "Internal teams", 1300, 200, "neutral"),
    ],
    edges: [
      flowEdge("pg", "accounts", "contains"),
      flowEdge("pg", "transactions", "contains"),
      flowEdge("accounts", "stream", "replicate"),
      flowEdge("transactions", "stream", "replicate"),
      flowEdge("stream", "dbt", "model"),
      flowEdge("dbt", "looker", "embed"),
      flowEdge("looker", "banks", "sell"),
      flowEdge("looker", "internal", "inform"),
    ],
  },
};

export function getMermaidChart(id: string): string | undefined {
  return MERMAID_CHARTS[id];
}

export function getFlowChart(id: string): FlowChartDef | undefined {
  return FLOW_CHARTS[id];
}
