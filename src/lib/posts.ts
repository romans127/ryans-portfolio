export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "agentic-ai-architecture-patterns",
    title: "Agentic AI Architecture Patterns for the Enterprise",
    excerpt:
      "How I think about designing autonomous AI systems that are actually reliable in production — not just impressive in demos.",
    date: "June 12, 2025",
    readTime: "8 min",
    tag: "AI Architecture",
    content: `
Agentic AI is everywhere right now. Every startup is claiming their product is "agentic" and every enterprise is asking how to build one. After spending the last two years building these systems in production — most recently as Head of AI at DVx Ventures — I have strong opinions.

## The core problem with most agentic systems

Most demo-grade agentic systems are brittle. They work beautifully in a controlled environment and fall apart the moment real-world messiness enters the picture: ambiguous inputs, API rate limits, partial failures, or context windows that drift over long-running tasks.

The core mistake is treating agentic AI as a prompt engineering problem rather than a systems architecture problem.

## Pattern 1: Bounded agency over unbounded autonomy

The first pattern I reach for is **bounded agency** — defining the exact scope of what an agent can and cannot do before it touches production.

This means:
- Explicit tool inventories with typed schemas (Pydantic is non-negotiable here)
- Hard limits on recursion depth and API call budgets
- Deterministic fallback paths for every uncertain state

Unbounded agents that can "do anything" are a liability. Bounded agents with clear contracts are assets.

## Pattern 2: Event-sourced agent state

Stateful agents need durable, queryable state. I've moved away from in-memory state for anything beyond simple Q&A workflows. 

My preferred pattern: treat every agent action as an event that gets appended to an immutable log. This gives you:
- Full replay capability for debugging
- Auditability (critical for enterprise compliance)
- Resume-from-failure for long-running workflows

Kafka or a lightweight event store like EventStoreDB works well here. For simpler cases, even Postgres with an append-only events table does the job.

## Pattern 3: Structured outputs as the contract layer

LLMs are probabilistic. Your downstream systems are deterministic. The bridge between them is **structured output validation**.

I use Pydantic AI or LangChain's output parsers with retry logic. Every agent output gets validated against a schema before it touches any downstream system. Failed validations trigger retry with the validation error injected back into the prompt — this self-correction loop catches ~85% of output failures.

## Pattern 4: Human-in-the-loop checkpoints

For high-stakes actions (sending emails, modifying records, financial operations), I build explicit human-in-the-loop checkpoints. The agent pauses, surfaces its proposed action with reasoning, and requires approval before proceeding.

This isn't a limitation — it's a feature. Enterprise stakeholders are far more comfortable deploying AI systems that they can audit and intervene in. Start with more checkpoints than you think you need and remove them as trust is established.

## The stack I reach for

- **LangChain** or **LangGraph** for orchestration
- **Pydantic AI** for output validation and tool schemas
- **Kafka** or **Redis Streams** for durable agent state
- **Postgres** for human-in-the-loop approval queues
- **Kubernetes** for deploying agent workers that scale independently

The goal is always the same: AI that's reliable enough to trust with real business processes. That's a higher bar than most teams realize.
    `,
  },
  {
    slug: "real-time-threat-detection-data-engineering",
    title: "Building a Real-Time Threat Detection Platform from Zero",
    excerpt:
      "The engineering decisions behind Cork's AI-powered cybersecurity intelligence platform, and what I'd do differently.",
    date: "March 3, 2025",
    readTime: "12 min",
    tag: "Data Engineering",
    content: `
When I joined Cork as Staff Data Engineer in 2023, the mission was clear: build a real-time threat detection platform for MSPs (managed service providers) from scratch. No existing data infrastructure. No data team. Just a greenfield problem with high stakes.

Eighteen months later, we had what I'd call the world's first real-time AI-powered threat detection platform with automated risk signal generation and compliance event convergence. Here's what I learned.

## The architectural constraints

Cybersecurity data is uniquely challenging:

1. **Volume**: MSPs manage thousands of endpoints across dozens of clients. The event volume is massive.
2. **Latency requirements**: A threat detected in 5 minutes is worth 100x a threat detected in an hour.
3. **Accuracy demands**: False positives destroy trust faster than missed detections. The bar is high.
4. **Multi-tenancy**: Every client's data must be strictly isolated while analytics run across the full fleet.

These constraints ruled out most standard data warehouse patterns and pushed us toward a streaming-first architecture.

## The stack decision

After evaluating several options, we landed on:

- **GCP Pub/Sub** for event ingestion (low latency, fully managed, excellent at MSP-scale volumes)
- **Dataflow** for streaming transformations
- **BigQuery** as the analytical layer (surprisingly capable for near-real-time with streaming inserts)
- **Cloud Functions** for risk signal generation
- **Microsoft Graph API** for identity and device event enrichment

The Microsoft Graph API integration was particularly important. MSPs live in Microsoft's ecosystem, so events from Entra ID, Defender, and Intune were primary signal sources.

## The risk classification system

The core IP was the risk signal classification system. We needed to:

1. Ingest raw security events
2. Enrich them with device/user context from Graph API
3. Apply ML classification to score risk
4. Generate actionable risk signals for MSP analysts
5. Route high-confidence signals to automated response workflows

The classification model was a gradient boosted ensemble trained on labeled threat data. But the more interesting engineering problem was the feature engineering pipeline — extracting meaningful features from heterogeneous event streams in real time.

## What I'd do differently

Three things I'd change with hindsight:

**1. Start with a more opinionated schema.** We evolved our event schema too organically, which created technical debt that cost weeks to unwind. Define a strict canonical event format early, even if it feels premature.

**2. Invest earlier in observability.** We were debugging live production pipelines with inadequate tooling for the first three months. Datadog for metrics, structured JSON logs from day one, and distributed tracing would have saved enormous time.

**3. Use DuckDB for local development.** BigQuery is great in production but slow and expensive for local iteration. DuckDB now handles most of our local development and testing, and the SQL compatibility is excellent.

The platform ultimately processed tens of millions of security events per day with sub-second threat signal generation. That's the kind of impact that makes complex engineering challenges worth it.
    `,
  },
  {
    slug: "llm-production-data-pipelines",
    title: "LLMs in Production Data Pipelines: What Actually Works",
    excerpt:
      "After integrating LLMs into data pipelines across multiple companies, here's the unfiltered truth about what holds up.",
    date: "January 14, 2025",
    readTime: "10 min",
    tag: "LLMs",
    content: `
There's a gap between LLM demos and LLM production systems that almost no one talks about honestly. I've integrated LLMs into production data pipelines at multiple companies now, and I want to share what actually works — and what the hype glosses over.

## Where LLMs genuinely add value in data pipelines

**1. Unstructured → structured transformation**

The strongest production use case I've found: transforming unstructured text (emails, PDFs, free-form notes, API responses) into structured records. LLMs are remarkably good at this when you use structured output schemas.

At MANTL, we used this pattern to parse and normalize account application text from diverse banking partners. What would have been hundreds of brittle regex rules became a reliable extraction pipeline with ~96% accuracy on first pass.

**2. Data quality classification**

LLMs can classify data quality issues in ways that rule-based systems struggle with. Ambiguous addresses, conflicting records, plausible-but-wrong values — LLMs catch these with nuance that's hard to encode in rules.

**3. Schema inference and documentation**

Point an LLM at a SQL table or API response and ask it to document the schema with field-level descriptions. It's not perfect, but it dramatically accelerates the documentation work that data engineers typically skip.

## Where LLMs fail in pipelines

**1. Consistency under volume**

At small scale, LLM outputs feel consistent. At 10,000 records per hour, you'll discover the edge cases: records that trigger different reasoning paths, temperature drift, subtle instruction following failures. Robust validation and retry logic is not optional.

**2. Cost at scale**

GPT-4 at $0.03/1k tokens sounds cheap until you're processing 5M records/day. Run the math before committing to an architecture. For high-volume pipelines, fine-tuned smaller models almost always beat frontier models on cost/performance ratio.

**3. Debugging**

When a traditional pipeline fails, you get a stack trace. When an LLM pipeline fails, you get... a plausible but wrong output. Building observability into LLM pipelines — logging inputs, outputs, token counts, and model versions — is essential and often underbuilt.

## The pattern I use

For every LLM node in a pipeline:

1. **Input validation** — sanitize and type-check before sending to the model
2. **Structured output schemas** — Pydantic models, always
3. **Retry with error feedback** — inject validation failures back into the prompt
4. **Fallback** — deterministic fallback for high-failure-rate inputs
5. **Sampling audit** — randomly sample 1-5% of outputs for human review

This adds overhead, but it's what separates a proof of concept from something you can run in production and sleep soundly about.

## The tools that actually help

- **Pydantic AI** — the cleanest structured output experience I've used
- **LangSmith** — essential for LLM pipeline observability
- **Prefect** or **Dagster** — for retry orchestration and pipeline observability
- **Instructor** — if you're not on Pydantic AI, this is the next best thing

The bottom line: LLMs in data pipelines are genuinely useful, but they need to be treated as probabilistic components in a deterministic system. Design accordingly.
    `,
  },
  {
    slug: "multi-cloud-data-warehouse-strategy",
    title: "Multi-Cloud Data Warehouse Strategy: When and Why",
    excerpt:
      "A pragmatic take on when multi-cloud data architecture makes sense — and when it's just complexity for its own sake.",
    date: "November 7, 2024",
    readTime: "7 min",
    tag: "Data Architecture",
    content: `
Multi-cloud gets thrown around as a best practice without enough honest discussion of the costs. After architecting multi-cloud data systems at Cork and advising several companies on the decision, here's my pragmatic take.

## When multi-cloud makes genuine sense

**Regulatory requirements**: Some industries and geographies require data residency in specific clouds. If your clients are split between AWS and Azure environments (common in cybersecurity MSP work), a multi-cloud architecture may be necessary.

**Avoiding lock-in for critical infrastructure**: If your primary compute and your primary data store are both on the same cloud, a regional outage becomes a complete outage. For genuinely critical systems, spreading across clouds provides real resilience.

**Following your clients/data sources**: At Cork, our telemetry came from Microsoft's ecosystem (Graph API, Azure AD) but our team had deeper GCP expertise. A hybrid approach made sense because that's where the data lived.

## When multi-cloud is just complexity

**"Vendor lock-in" anxiety without substance**: The switching cost between BigQuery and Redshift is real, but it's almost always lower than the ongoing operational complexity of running both. Pick the better tool for your use case.

**Cost optimization theater**: Running workloads across clouds to get marginal price advantages is almost never worth the networking costs, engineering overhead, and operational complexity.

## The hybrid pattern that actually works

The pattern I've seen work well: a primary cloud for compute and orchestration, with a secondary cloud for specific managed services where they're genuinely superior.

At Cork: GCP as primary (Pub/Sub, Dataflow, BigQuery, Cloud Functions) + AWS for specific security tooling that had better native integrations. Clear boundaries, minimal data transfer between clouds, no cross-cloud orchestration dependencies.

The key rule: don't let data freely flow between clouds. Define clear boundaries where data lives and process it there. Cross-cloud data transfer is expensive and introduces latency that compounds.

## The decision framework

Ask these questions before committing to multi-cloud:

1. Is it required by your clients, regulations, or data sources?
2. Does a specific service on another cloud genuinely justify the complexity overhead?
3. Do you have the operational maturity to run and debug multi-cloud pipelines?
4. Have you modeled the actual networking costs?

If you can answer yes to 1 or 2 and yes to 3 and 4, multi-cloud might be right. Otherwise, build a great single-cloud architecture first.
    `,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): Post[] {
  return posts;
}
