---
name: portfolio-project-pages
description: Author or update project detail pages in this portfolio. Enforces the storytelling framework, visual conventions, IP hygiene, and slug rules. Use when adding a new project, revising an existing project page, or changing how projects are displayed.
---

# Portfolio project pages

Project pages live in `src/lib/site.ts` (`projects` array) and render via `src/app/projects/[slug]/page.tsx`. Diagram content lives in `src/lib/platform-diagram-content.ts`.

## URL slugs

- **Never include company names in slugs.** The project is the focus, not the employer.
- Slug format: lowercase, hyphenated, describes the solution or domain.
  - ✅ `gtm-revenue-warehouse`, `marketing-tag-deduplication`, `realtime-threat-detection`
  - ❌ `vitable-warehouse`, `ltk-braze-marketing-data`, `cork-threat-detection`
- Company attribution belongs in the `company` field, rendered as a copper pill tag on the page and in `ProjectsGrid` cards.

## Storytelling framework

Every project page follows this structure:

1. **Hero header** (optional, unique per project) — see below.
2. **Title + one-liner** — describe the solution, not the employer.
3. **Problem** — the pain or gap that existed. High level, no company internals.
4. **Approach** — what you designed or implemented to solve it.
5. **Architecture diagram** — React Flow or Mermaid showing the story visually.
6. **Solution highlights** — 3–5 high-level recap cards after the diagram.
7. **Tags** — technologies and domains.

### Title and one-liner

- Lead with the solution or outcome.
- Example: "Marketing tag data deduplication" not "LTK Braze marketing data".
- One-liner should answer: what did you build, and what changed because of it?

### Problem

- Describe the problem space, not the company.
- Allowed: "A high-growth daily fantasy sports operator had no analytics engineering function…"
- Not allowed: "PrizePicks had no analytics engineering function…" (unless the company is public knowledge and central to the story, e.g. your own platforms).

### Approach

- Focus on your design decisions and implementation.
- Mention common third-party tools when relevant (dbt, Airflow, BigQuery, Braze, Looker).
- Do not name employer-internal systems, squad names, or proprietary table/column names.

### Solution highlights

- Recap the high-level points after the diagram.
- Each highlight: a short title + one sentence.
- Focus on what was built and the outcome, not "I did X at company Y."

## IP hygiene

**Allowed:**
- Common third-party tools: dbt, Airflow, BigQuery, Postgres, Spark, Braze, Looker, Lightdash, HubSpot, Prefect, Terraform, Kubernetes, etc.
- Generic architecture terms: medallion, CDC, reverse ETL, semantic layer, staging, marts.
- Publicly known facts about your own platforms (Kingdom Keys, Righteous Reviews, Stats Hub).

**Not allowed:**
- Employer-internal system names (e.g. "Rosetta", "BP Billing", "Foundations squad").
- Specific internal table names, column names, or Jira ticket workflows.
- Prescriptive operational details that reveal internal processes (e.g. "UTC 4 AM DMS sensor retuning").
- Exact metrics that could be tied to company financials or user counts unless they are clearly inflated/rounded for storytelling.

**Rule of thumb:** If a former colleague would recognize it as internal documentation, rewrite it at a higher level.

## Hero headers

Hero headers are unique, hand-built React components rendered at the top of a project page.

- They are **not** tied to `kind === "Platform"`. Any project can have one if explicitly requested.
- Current examples: `KingdomKeysHero`, `RighteousReviewsHero`, `StatsHubHero` in `src/components/PlatformHero.tsx`.
- Each hero is visually distinct and themed to the project (space, family reviews, baseball diamond).
- To add a hero to a non-platform project, extend `PlatformHeroVariant` in `src/lib/site.ts` and add a case in `PlatformHero.tsx`.

## Architecture diagrams

Diagrams are the core visual story. Use React Flow for flows/processes; Mermaid for simple hierarchies.

### React Flow conventions

- Define nodes/edges in `src/lib/platform-diagram-content.ts` under `FLOW_CHARTS`.
- Use `flowNode(id, label, x, y, tone)` and `flowEdge(source, target, label)`.
- **Tones encode shape and meaning:**
  - `copper` — source/input nodes (stadium pill shape)
  - `signal` — process/transform nodes (rounded box)
  - `neutral` — leaf/output nodes (sharp-cornered dashed tag)
- Node labels support `<br/>` for line breaks (rendered by `PlatformFlowNode`).
- Edge labels sit on dark pills for readability.
- Include child nodes to show hierarchy (e.g. "Core marts" → "Users", "Contests", "Entries").
- Space nodes generously; default height is 480px.

### Mermaid conventions

- Define in `MERMAID_CHARTS` in the same file.
- Use `<br/>` for line breaks, not `\n`.
- Keep Mermaid for simple pillar/overview diagrams; use React Flow for anything with a story or flow.

## File map

| File | Purpose |
|------|---------|
| `src/lib/site.ts` | Project metadata, slugs, problem/approach/solution, tags, viz specs |
| `src/lib/platform-diagram-content.ts` | Mermaid markdown + React Flow node/edge definitions |
| `src/components/PlatformHero.tsx` | Unique hero components |
| `src/components/PlatformDiagrams.tsx` | Diagram orchestration on platform pages |
| `src/components/ProjectViz.tsx` | Visualization switcher for solution pages |
| `src/components/diagrams/FlowDiagram.tsx` | React Flow wrapper |
| `src/components/diagrams/PlatformFlowNode.tsx` | Custom node with tone shapes and multiline labels |
| `src/app/projects/[slug]/page.tsx` | Project detail page layout |
| `src/components/ProjectsGrid.tsx` | Projects index grid and filters |

## Checklist for a new project

- [ ] Slug has no company name
- [ ] `company` field set (renders as copper pill)
- [ ] Title and one-liner describe the solution
- [ ] Problem is high-level, no company internals
- [ ] Approach describes your design decisions
- [ ] Diagram tells the story with nodes/edges and child nodes where relevant
- [ ] Solution highlights recap the outcome
- [ ] Tags list relevant technologies
- [ ] `bun run lint && bun run build` passes
