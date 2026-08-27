import fs from "node:fs";
import { icons } from "@iconify-json/simple-icons";
import * as si from "simple-icons";

const hexOverrides = {
  dbt: "FF694B",
  microsoftsqlserver: "CC2927",
  amazonredshift: "8C4FFF",
  amazonwebservices: "232F3E",
  amazons3: "569A31",
  amazonrds: "527FFF",
  amazoniam: "DD344C",
  Hightouch: "FF5722",
  Lightdash: "7262FF",
  powerbi: "F2C811",
  "Data Apps": "4CC9F0",
  siTemporal: "FFFFFF",
  siApachekafka: "FFFFFF",
  dlthub: "5B8CFF",
  MindsDB: "2EC5B8",
  Dagster: "7A5CFF",
  Kestra: "4E9BFF",
  ksqlDB: "4A90D9",
  Meltano: "2BB3A3",
};

const skillMap = {
  Python: { type: "simple", export: "siPython" },
  SQL: { type: "simple", export: "siPostgresql" },
  Go: { type: "simple", export: "siGo" },
  Terraform: { type: "simple", export: "siTerraform" },
  Rust: { type: "simple", export: "siRust" },
  Node: { type: "simple", export: "siNodedotjs" },
  Vue: { type: "simple", export: "siVuedotjs" },
  "React.js": { type: "simple", export: "siReact" },
  dbt: { type: "iconify", slug: "dbt" },
  Postgres: { type: "simple", export: "siPostgresql" },
  "SQL Server": { type: "iconify", slug: "microsoftsqlserver" },
  BigQuery: { type: "simple", export: "siGooglebigquery" },
  Redshift: { type: "iconify", slug: "amazonredshift" },
  Athena: { type: "iconify", slug: "amazonwebservices" },
  Prefect: { type: "simple", export: "siPrefect" },
  Airflow: { type: "simple", export: "siApacheairflow" },
  Hightouch: {
    type: "custom",
    body: '<path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>',
  },
  "CI/CD": { type: "simple", export: "siGithubactions" },
  MindsDB: {
    type: "custom",
    body: '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="10" cy="6" rx="7" ry="2.6"/><path d="M3 6v12c0 1.4 3.1 2.6 7 2.6c1.2 0 2.3-.1 3.2-.4"/><path d="M3 12c0 1.4 3.1 2.6 7 2.6c.8 0 1.6 0 2.3-.1"/></g><path fill="currentColor" d="M18.5 11l1.2 3.1l3.1 1.2l-3.1 1.2l-1.2 3.1l-1.2-3.1l-3.1-1.2l3.1-1.2l1.2-3.1z"/>',
  },
  "Spark SQL": { type: "simple", export: "siApachespark" },
  MongoDB: { type: "simple", export: "siMongodb" },
  SQLite: { type: "simple", export: "siSqlite" },
  Dagster: {
    type: "custom",
    body: '<path fill="currentColor" d="M12 2l8 4.5l-8 4.5l-8-4.5L12 2z"/><path fill="currentColor" opacity=".75" d="M4 11.2l8 4.5l8-4.5l1.5.9l-9.5 5.1L2.5 12l1.5-.8z"/><path fill="currentColor" opacity=".5" d="M4 16.2l8 4.5l8-4.5l1.5.9l-9.5 5.1L2.5 17l1.5-.8z"/>',
  },
  Kestra: {
    type: "custom",
    body: '<g fill="currentColor"><circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M7.2 11l9.3-4.2l.6 1.4l-9.3 4.2l-.6-1.4z"/><path d="M7.2 13l9.3 4.2l.6-1.4l-9.3-4.2l-.6 1.4z"/></g>',
  },
  dltHub: { type: "iconify", slug: "dlthub" },
  Meltano: {
    type: "custom",
    body: '<path fill="currentColor" d="M12 2.5s6.5 7.1 6.5 11.5a6.5 6.5 0 1 1-13 0C5.5 9.6 12 2.5 12 2.5z"/>',
  },
  Temporal: { type: "simple", export: "siTemporal" },
  Kafka: { type: "simple", export: "siApachekafka" },
  ksqlDB: {
    type: "custom",
    body: '<g fill="currentColor"><rect x="3.5" y="9" width="2.6" height="6" rx="1.3"/><rect x="8.7" y="5" width="2.6" height="14" rx="1.3"/><rect x="13.9" y="8" width="2.6" height="8" rx="1.3"/><rect x="19.1" y="10.5" width="2.6" height="3" rx="1.3"/></g>',
  },
  "AWS Glue": { type: "iconify", slug: "amazonwebservices" },
  IAM: { type: "iconify", slug: "amazoniam" },
  S3: { type: "iconify", slug: "amazons3" },
  Kinesis: { type: "iconify", slug: "amazonwebservices" },
  RDS: { type: "iconify", slug: "amazonrds" },
  "GCP DataStream": { type: "simple", export: "siGooglecloud" },
  Kubernetes: { type: "simple", export: "siKubernetes" },
  Docker: { type: "simple", export: "siDocker" },
  Looker: { type: "simple", export: "siLooker" },
  Lightdash: {
    type: "custom",
    body: '<path fill="currentColor" d="M3 3v18h18v-2H5V3H3zm4 12h2V9H7v6zm4 4h2V5h-2v14zm4-6h2v6h-2v-6z"/>',
  },
  PowerBI: { type: "iconify", slug: "powerbi" },
  Metabase: { type: "simple", export: "siMetabase" },
  "Data Apps": {
    type: "custom",
    body: '<path fill="currentColor" d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm1 4v11h14V8H5zm2 8v-4h2v4H7zm4 0v-6h2v6h-2zm4 0v-3h2v3h-2z"/>',
  },
};

const simpleExports = new Set();
const entries = [];

for (const [skill, cfg] of Object.entries(skillMap)) {
  if (cfg.type === "simple") {
    simpleExports.add(cfg.export);
    const icon = si[cfg.export];
    if (!icon) throw new Error(`Missing ${cfg.export}`);
    entries.push({
      skill,
      kind: "simple",
      export: cfg.export,
      hex: hexOverrides[cfg.export] || hexOverrides[skill] || icon.hex,
    });
  } else if (cfg.type === "iconify") {
    const body = icons.icons[cfg.slug]?.body;
    if (!body) throw new Error(`Missing iconify ${cfg.slug}`);
    entries.push({
      skill,
      kind: "body",
      hex: hexOverrides[skill] || hexOverrides[cfg.slug] || "888888",
      body,
    });
  } else {
    entries.push({ skill, kind: "body", hex: hexOverrides[skill], body: cfg.body });
  }
}

const importLine = `import {\n  ${[...simpleExports].sort().join(",\n  ")},\n} from "simple-icons/icons";\n`;

let out = `// Generated by scripts/extract-skill-icons.mjs — do not edit bodies by hand.\n\n`;
out += importLine;
out += `\nexport type SkillIconData = {\n  title: string;\n  hex: string;\n  path?: string;\n  body?: string;\n};\n\n`;
out += `const simpleIcon = (icon: { title: string; hex: string; path: string }, title?: string, hex?: string): SkillIconData => ({\n  title: title ?? icon.title,\n  hex: hex ?? icon.hex,\n  path: icon.path,\n});\n\n`;
out += `const skillIcons: Record<string, SkillIconData> = {\n`;

for (const e of entries) {
  if (e.kind === "simple") {
    out += `  ${JSON.stringify(e.skill)}: simpleIcon(${e.export}, ${JSON.stringify(e.skill)}, ${JSON.stringify(e.hex)}),\n`;
  } else {
    const escaped = e.body.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");
    out += `  ${JSON.stringify(e.skill)}: { title: ${JSON.stringify(e.skill)}, hex: ${JSON.stringify(e.hex)}, body: \`${escaped}\` },\n`;
  }
}

out += `};\n\n`;
out += `const ICON_CATEGORIES = new Set([\n`;
out += `  "Languages",\n  "Warehouse & modeling",\n  "Orchestration & reverse ETL",\n  "Cloud",\n  "BI",\n]);\n\n`;
out += `export function getSkillIcon(skill: string): SkillIconData | undefined {\n  return skillIcons[skill];\n}\n\n`;
out += `export function categoryUsesSkillIcons(category: string): boolean {\n  return ICON_CATEGORIES.has(category);\n}\n`;

fs.writeFileSync("src/lib/skill-icons.ts", out);
console.log(`Wrote src/lib/skill-icons.ts (${out.length} bytes)`);
