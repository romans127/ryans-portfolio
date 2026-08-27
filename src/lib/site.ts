export const profile = {
  name: "Ryan Watts",
  initials: "RW",
  location: "Arizona",
  email: "ryandwatts@gmail.com",
  github: "https://github.com/romans127",
  githubHandle: "romans127",
  linkedin: "https://www.linkedin.com/in/ryan-watts-3551413b",
  currentRole: "Director of Data",
  currentCompany: "Vitable Health",
  previousRole: "Head of Artificial Intelligence",
  previousCompany: "DVx Ventures",
  title: "Principal AI & Data Engineer",
  eyebrow: "Warehouse · Agents · MCP",
  headline: "I build the layer agents stand on.",
  lede: "Seventeen years of warehouse and cloud work, then Head of AI at DVx, then founding Director of Data at Vitable. I still write the dbt and Terraform myself, and I still take the IC ticket when a team is blocked.",
  summary: [
    "Python and SQL are where I spend most days in the warehouse, with Go when a pipeline or an MCP server needs it and Postgres or BigQuery on the modeling side.",
    "Prefect and Airflow run the jobs. Kubernetes or Docker depending on the need. Agentic workflows sit on the same dbt model foundation.",
    "I build specialized agents and skills, plus custom MCP servers in Go. That same hands-on work is how I lead people through roadblocks or scale teams from 0 to full divisions.",
  ],
};

export type Metric = {
  label: string;
  value: string;
};

export const metrics: Metric[] = [
  { label: "Years in the stack", value: "17" },
  { label: "Portfolio companies advised", value: "12" },
  { label: "Industries shipped in", value: "10" },
  { label: "Lines of code", value: "6M+" },
];

export const craft = [
  {
    id: "agents",
    kicker: "01",
    title: "Agent systems that survive production",
    body: "Specialized agents and skills on a real warehouse foundation. Memory structures that cut early hallucination. Bounded tools, not unbounded demos.",
    tags: ["Agentic AI", "Skills", "RAG", "LangChain"],
  },
  {
    id: "mcp",
    kicker: "02",
    title: "MCP servers in Go",
    body: "Custom MCP so agents call live APIs. Shared HTTP client, pooled connections, spec parsed once at startup. I wrote the open-source OpenAPI proxy that way.",
    tags: ["MCP", "Go", "OpenAPI"],
  },
  {
    id: "warehouse",
    kicker: "03",
    title: "Warehouses GTM actually uses",
    body: "dbt models for renewal and expansion. Reverse ETL back into HubSpot. Finance and Ops query the same layer. Self-serve BI that left Metabase for Lightdash.",
    tags: ["dbt", "BigQuery", "Hightouch", "Lightdash"],
  },
  {
    id: "pipelines",
    kicker: "04",
    title: "Realtime pipelines and migrations",
    body: "Postgres to BigQuery in realtime. AWS-to-GCP moves I led myself. Threat detection streams. Terraform for IAM, Glue, S3, and the path to ship.",
    tags: ["Prefect", "Airflow", "Terraform", "Kubernetes"],
  },
];

export type Role = {
  role: string;
  company: string;
  location: string;
  period: string;
  year: string;
  type: "Full-time" | "Consulting";
  summary: string;
  bullets: string[];
  tags: string[];
  highlight?: boolean;
  engagements?: { client: string; period: string; detail: string }[];
};

export const roles: Role[] = [
  {
    role: "Principal AI + Data Engineering Consultant",
    company: "Kingdom Code",
    location: "Tucson · Remote",
    period: "January 2010 to Present",
    year: "2010–Present",
    type: "Consulting",
    highlight: true,
    summary:
      "The through-line across every seat on this page. Sixteen years of consulting under Kingdom Code — PrizePicks, LTK, and teams that needed a principal who ships — plus platforms I built: Kingdom Keys, Righteous Reviews, and Stats Hub.",
    bullets: [
      "Built and operate Kingdom Keys, Righteous Reviews, and Stats Hub under The Kingdom Code Project LLC — education, family discernment, and youth baseball platforms still in production.",
      "PrizePicks: original architect of the Sports Gaming data models in dbt; helped grow the data engineering team from zero to eight dbt-centered engineers. Full-time 2022 to 2024, back on retainer since 2025.",
      "PrizePicks: finance backup and retention pipelines for GDPR across terabyte-scale transactions — archival cold storage with governed access and row-level PII controls in the warehouse.",
      "LTK (RewardStyle): Staff Data/AI Engineer 2023 to 2024, then consulting. Braze marketing-data pipelines on Airflow and load-strategy redesigns that cleared duplicate records downstream.",
    ],
    tags: ["Advisory", "Platforms", "dbt", "AI adoption", "Data platforms"],
    engagements: [
      {
        client: "Kingdom Keys",
        period: "2024–Present · platform",
        detail:
          "Typing and writing platform for ages 6–14 — space-themed missions, Mission Control for parents and teachers, and a Writing Portal beta. Live at kingdomkeys.xyz.",
      },
      {
        client: "Righteous Reviews",
        period: "2025–Present · platform",
        detail:
          "Family movie and TV library with structured, morally vetted reviews — not critic scores. Guidance chips (Great for families / With guidance / Not recommended) help parents decide before play. Live at righteous.reviews.",
      },
      {
        client: "Stats Hub",
        period: "2025–Present · platform",
        detail:
          "Centralized youth baseball hub for player development — stats, evaluations, situational teaching, and team management in one place. Live at stats.maketheplay.faith.",
      },
      {
        client: "PrizePicks",
        period: "2022–2024 full-time · 2025–Present consulting",
        detail:
          "Started as the original architect of their Sports Gaming data models in dbt, then joined full-time as Staff Data Engineer. Built finance backup and retention pipelines for GDPR across terabyte-scale transactions — archival cold storage with governed access, row-level PII controls in the warehouse. Helped grow and onboard the data engineering team from zero to eight dbt-centered engineers. Back on retainer since 2025.",
      },
      {
        client: "LTK (RewardStyle)",
        period: "2023–2024 · consulting since",
        detail:
          "Staff Data/AI Engineer for the creator-commerce platform, then continued as a consultant. Braze marketing-data pipelines orchestrated on Airflow, including duplicate-record remediation that moved fragile incremental loads to reliable full-overwrite strategies.",
      },
    ],
  },
  {
    role: "Director of Data",
    company: "Vitable Health",
    location: "Remote",
    period: "January 2026 to Present",
    year: "2026–Present",
    type: "Full-time",
    highlight: true,
    summary:
      "Hired as the first Director of Data and built the warehouse from scratch. HubSpot renewal and expansion in dbt became the GTM layer Revenue, CS, and Finance actually query.",
    bullets: [
      "Hired as the first Director of Data and built the warehouse from scratch.",
      "Modeled HubSpot renewal and expansion in dbt. The warehouse became the GTM layer Revenue and CS actually used, and Finance queried the same models.",
      "Pushed warehouse dates and signals back into HubSpot with Hightouch. Built lead scoring for the top-of-funnel team.",
      "Ran warehouse jobs on Prefect. Self-serve BI left Metabase. Finance and Ops now query Lightdash.",
    ],
    tags: ["dbt", "Prefect", "Hightouch", "Lightdash", "HubSpot"],
  },
  {
    role: "Head of Artificial Intelligence",
    company: "DVx Ventures",
    location: "Remote",
    period: "June 2024 to February 2026",
    year: "2024–2026",
    type: "Full-time",
    summary:
      "The role started at Cork. After the warehouse and first AI product shipped, they promoted me into Head of AI. I consulted data and AI across 12 portfolio companies and stayed in Terraform and Go the whole time.",
    bullets: [
      "This role started at Cork. After the warehouse and first AI product shipped, they promoted me into Head of AI.",
      "Consulted data and AI work across 12 DVx portfolio companies.",
      "Designed agent systems and specialized skills teams used on real tasks, including a memory structure that cut early LLM hallucination.",
      "Built custom MCP servers so those agents could call live APIs, including a high-performance OpenAPI proxy in Go.",
      "Stayed hands-on in Terraform and Golang the whole time.",
    ],
    tags: ["Agentic AI", "MCP", "Go", "Terraform", "Leadership"],
  },
  {
    role: "Staff Data Engineer",
    company: "Cork",
    location: "Remote",
    period: "September 2023 to May 2025",
    year: "2023–2025",
    type: "Full-time",
    summary:
      "First staff data engineer. Stood up the warehouse and lake on GCP and AWS, then realtime pipelines for AI threat detection and risk scoring on an MSP cybersecurity warranty product.",
    bullets: [
      "First staff data engineer. Stood up the warehouse and lake on GCP and AWS.",
      "Built realtime pipelines for AI threat detection and risk scoring on an MSP cybersecurity warranty product.",
      "Ingested telemetry plus public and private sources into the analytical store.",
      "Set data standards with engineering so production quality was not a side project.",
    ],
    tags: ["GCP", "AWS", "Realtime", "Cybersecurity"],
  },
  {
    role: "Principal Data Engineer",
    company: "MANTL",
    location: "Tucson",
    period: "June 2020 to September 2023",
    year: "2020–2023",
    type: "Full-time",
    summary:
      "Streamed transactional Postgres into BigQuery in realtime, built the embedded Looker product sold to banks and credit unions, and owned multi-tenant data architecture across AWS and GCP.",
    bullets: [
      "Streamed transactional Postgres data into BigQuery in realtime on GCP.",
      "Built the embedded Looker product sold to bank and credit union clients.",
      "Owned data architecture for the multi-tenant online account opening platform across AWS and GCP.",
      "Moved into this seat after a year as Staff DevOps / SRE, including the AWS-to-GCP migration.",
    ],
    tags: ["BigQuery", "Postgres", "Looker", "Streaming"],
  },
  {
    role: "Staff DevOps / SRE",
    company: "MANTL",
    location: "Tucson",
    period: "June 2019 to June 2020",
    year: "2019–2020",
    type: "Full-time",
    summary:
      "Owned production AWS and GCP for a multi-tenant fintech SaaS and led the AWS-to-GCP migration before taking the Principal Data Engineer role.",
    bullets: [
      "Owned production AWS and GCP for a multi-tenant fintech SaaS.",
      "Led the AWS-to-GCP migration before taking the Principal Data Engineer role.",
      "Put AWS IAM, networking, compute, Glue, and S3 in Terraform. Ran CI/CD so product and data teams could ship.",
    ],
    tags: ["AWS", "GCP", "Terraform", "CI/CD"],
  },
  {
    role: "Senior Data Engineer II",
    company: "Simpleview",
    location: "Tucson",
    period: "June 2013 to June 2020",
    year: "2013–2020",
    type: "Full-time",
    summary:
      "Ran multi-department data work while the company left an on-prem data center and moved onto Google Cloud. Shipped Kubernetes microservices other divisions ran from a shared core.",
    bullets: [
      "Ran multi-department data work while the company left an on-prem data center and moved onto Google Cloud.",
      "Shipped data-engineering microservices on Kubernetes that other divisions ran out of a shared core.",
    ],
    tags: ["Google Cloud", "Kubernetes", "Microservices"],
  },
  {
    role: "Asset Protection Analytics Manager",
    company: "Walmart",
    location: "Flagstaff",
    period: "October 2010 to December 2012",
    year: "2010–2012",
    type: "Full-time",
    summary:
      "Oversaw analytics for asset protection, reported organized retail crime trends to the market office, and ran the division Tableau rollout.",
    bullets: [
      "Oversaw analytics for asset protection and reported organized retail crime trends to the market office.",
      "Ran the division Tableau rollout and market-wide BI.",
    ],
    tags: ["Tableau", "Analytics", "Retail"],
  },
];

export const consultingSeats: Role[] = [
  {
    role: "Staff Data Engineer, then retainer",
    company: "PrizePicks",
    location: "Remote",
    period: "2022–2024 full-time · 2025 to Present consulting",
    year: "2022–Present",
    type: "Consulting",
    summary:
      "Original architect of the Sports Gaming dbt model layer, then Staff Data Engineer — finance backup and GDPR retention pipelines across terabyte-scale transactions. Back on retainer since 2025.",
    bullets: [
      "Designed the founding dbt model layer for daily-fantasy analytics on BigQuery before the first hire.",
      "Built finance backup and GDPR retention pipelines with governed cold storage and row-level PII controls in the warehouse.",
      "Helped grow and onboard the data engineering team from zero to eight dbt-centered engineers; on retainer since 2025.",
    ],
    tags: ["dbt", "BigQuery", "GDPR", "Team building"],
  },
  {
    role: "Staff Data/AI Engineer, then consultant",
    company: "LTK (RewardStyle)",
    location: "Remote",
    period: "2023–2024 full-time · consulting since",
    year: "2023–Present",
    type: "Consulting",
    summary:
      "Staff Data/AI Engineer for the creator-commerce platform, then continued as a consultant — Braze marketing pipelines on Airflow and load-strategy redesigns that cleared duplicate records downstream.",
    bullets: [
      "Rebuilt trust in marketing tag tables — traced lineage upstream, then moved fragile incremental loads to reliable full-overwrite strategies.",
      "Migrated billing CDC pipelines to Airflow on a bronze/silver/gold medallion architecture on S3.",
      "Shipped the refunds orchestration path into Redshift with custom SQL and primary-key data-quality gates.",
    ],
    tags: ["Braze", "Airflow", "Medallion", "Redshift"],
  },
];

export type ProjectViz =
  | {
      type: "reactflow";
      title: string;
      caption?: string;
      chartId: string;
      height?: number;
    }
  | {
      type: "bars";
      title: string;
      caption?: string;
      items: { label: string; value: number; unit?: string }[];
    }
  | {
      type: "tiers";
      title: string;
      tiers: {
        name: string;
        subtitle: string;
        description: string;
        tone: "hot" | "warm" | "cold" | "frozen";
      }[];
    }
  | {
      type: "compare";
      title: string;
      caption?: string;
      before: string;
      after: string;
    };

export type PlatformHeroVariant = "kingdom-keys" | "righteous-reviews" | "stats-hub";

export type PlatformDiagramSpec = {
  id: string;
  kind: "reactflow" | "mermaid";
  title: string;
  caption?: string;
};

export type PlatformDetail = {
  hero: PlatformHeroVariant;
  role: string;
  highlights: { title: string; body: string }[];
  stack: string[];
  diagrams: PlatformDiagramSpec[];
};

export type Project = {
  slug: string;
  title: string;
  kind: "Open source" | "Solution" | "Platform";
  year: string;
  company?: string;
  oneLiner: string;
  problem: string;
  approach: string;
  solution: { title: string; body: string }[];
  tags: string[];
  href?: string;
  repo?: string;
  featured?: boolean;
  platformDetail?: PlatformDetail;
  visualizations?: ProjectViz[];
};

export const projects: Project[] = [
  {
    slug: "mcp-openapi-proxy",
    title: "MCP OpenAPI Proxy",
    kind: "Open source",
    year: "2025",
    featured: true,
    oneLiner:
      "A Go MCP server that turns an OpenAPI spec into tools an agent can actually call.",
    problem:
      "Agents need live APIs, not screenshots of docs. Most OpenAPI-to-tool bridges are slow, parse the spec on every request, or hide auth behind a single happy path.",
    approach:
      "Write the proxy in Go. Share one HTTP client. Pool connections. Parse the spec once at startup. Expose every operation as a named tool with Bearer, API key, custom headers, and SSL options.",
    solution: [
      {
        title: "Spec-driven tool generation",
        body: "OpenAPI 3 specs parsed once at startup — $ref resolution and path-parameter handling included — so every operation becomes a named tool.",
      },
      {
        title: "Agent-legible tool names",
        body: "Names encode method and path (api_GET_users vs api_POST_admin_posts), with include/exclude regex filters and a 40-character cap for Cursor's combined tool limit.",
      },
      {
        title: "One fast HTTP core",
        body: "A single shared Go HTTP client with connection pooling keeps tool calls cheap under agent load.",
      },
      {
        title: "Crawler fallback",
        body: "When no spec exists, an optional crawler infers an OpenAPI 3.0.3 spec from the live API.",
      },
    ],
    tags: ["Go", "MCP", "OpenAPI", "Agents"],
    href: "https://github.com/romans127/mcp-openapi-proxy-go",
    repo: "romans127/mcp-openapi-proxy-go",
    visualizations: [
      {
        type: "reactflow",
        title: "Request path",
        caption: "From spec to live API call — parse once, then serve named tools to the agent.",
        chartId: "mcp-request-path",
        height: 480,
      },
    ],
  },
  {
    slug: "kingdom-keys",
    title: "Kingdom Keys",
    kind: "Platform",
    year: "2024–Present",
    company: "Kingdom Code",
    featured: true,
    oneLiner:
      "Space-themed typing and writing for ages 6–14 — kids explore planet missions while parents and teachers follow real progress in one place.",
    problem:
      "Kids quit joyless typing drills, and arcade-style games do not give adults a clear picture of whether anyone is learning. Families and classrooms needed practice kids would stick with — and progress adults could actually see.",
    approach:
      "Wrap typing practice in a space adventure kids want to finish, then give parents and teachers a shared dashboard for speed, accuracy, and assignments. Add a Writing Portal so school papers live beside the typing journey — coached, not ghost-written.",
    solution: [
      {
        title: "Missions kids actually finish",
        body: "Planet missions and mini-games keyed to grade level, with gems, streaks, and achievements that reward consistency.",
      },
      {
        title: "A world, not a worksheet",
        body: "Explorer identities and robot companions make practice feel like play.",
      },
      {
        title: "Mission Control",
        body: "Parents and teachers share one view — per-student WPM, accuracy, lesson completion, and class-wide progress.",
      },
      {
        title: "Writing Portal",
        body: "Essays and assignments on the same account, with a writing coach that keeps the student's voice.",
      },
      {
        title: "Homeschool & classroom modes",
        body: "Built for families and schools alike, including Arizona ESA / ClassWallet-friendly positioning.",
      },
    ],
    tags: ["Next.js", "Typing", "EdTech", "Homeschool", "Writing"],
    href: "https://www.kingdomkeys.xyz",
    platformDetail: {
      hero: "kingdom-keys",
      role: "Founder · product",
      highlights: [
        {
          title: "Adventure-first typing",
          body: "Kids pick an explorer and companion, then work through grade-level planet missions. Gems, achievements, and streaks reward showing up — not just raw speed.",
        },
        {
          title: "Mission Control for adults",
          body: "Parents and teachers see WPM, accuracy, and lesson completion without asking kids to decode a spreadsheet. Classroom mode supports assignments across a whole group.",
        },
        {
          title: "Writing Portal beta",
          body: "Essays and school assignments share the same account as typing progress. A writing coach helps with structure and clarity while the student's voice stays central.",
        },
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind"],
      diagrams: [
        {
          id: "kk-learner-journey",
          kind: "reactflow",
          title: "Learner journey",
          caption:
            "From explorer identity through missions and writing — progress lands in Mission Control for adults.",
        },
        {
          id: "kk-product-pillars",
          kind: "mermaid",
          title: "Three parts of the product",
          caption:
            "Typing adventures and writing feed the same dashboard parents and teachers already use.",
        },
      ],
    },
  },
  {
    slug: "righteous-reviews",
    title: "Righteous Reviews",
    kind: "Platform",
    year: "2025–Present",
    company: "Kingdom Code",
    oneLiner:
      "Structured movie and TV reviews for families — morally vetted content with a consistent values anchor, not critic scores or star ratings.",
    problem:
      "Parents needed a fast way to vet entertainment before kids hit play. Critic scores measure taste, not fit for your household. Existing guides mix opinion with facts and rarely give a clear yes / caution / no signal.",
    approach:
      "A searchable public library where every title gets the same structured review — content flags, theme notes, and a scannable guidance chip (Great for families, With guidance, Not recommended). Families decide from facts, not hype.",
    solution: [
      {
        title: "Searchable library",
        body: "Genre filters, curated carousels, and family-picks collections.",
      },
      {
        title: "Structured title pages",
        body: "Violence, language, themes, and worldview notes in a fixed layout every time.",
      },
      {
        title: "Guidance chips",
        body: "Three chips replace star ratings — one glance before anyone presses play.",
      },
      {
        title: "Free accounts",
        body: "Account-based platform evolved from a private family tool used for two years.",
      },
    ],
    tags: ["Family", "Reviews", "Next.js", "Content"],
    href: "https://righteous.reviews",
    platformDetail: {
      hero: "righteous-reviews",
      role: "Founder · product",
      highlights: [
        {
          title: "Structured reviews, not critics",
          body: "Every title gets the same field layout — content flags, themes, and values notes — so families compare apples to apples instead of reading critic prose.",
        },
        {
          title: "Guidance chips parents trust",
          body: "Great for families, With guidance, and Not recommended give a fast decision layer before anyone hits play. No numeric score pretending to be objective.",
        },
        {
          title: "Morally vetted at scale",
          body: "Reviews stay consistent and searchable as the library grows — built for households that want cleaner content choices with a clear values anchor.",
        },
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind"],
      diagrams: [
        {
          id: "rr-parent-flow",
          kind: "reactflow",
          title: "Family decision flow",
          caption:
            "Search → structured title page → one of three guidance outcomes. No star score.",
        },
      ],
    },
  },
  {
    slug: "stats-hub",
    title: "Stats Hub",
    kind: "Platform",
    year: "2025–Present",
    company: "Kingdom Code",
    oneLiner:
      "A centralized hub for youth baseball player development — knowledge, skills improvement, and team management in one place.",
    problem:
      "Coaches and families juggle separate tools for box scores, tryouts, practice plans, and teaching the game — none of them share context about the same player or team.",
    approach:
      "One platform where staff run the program and families follow along: stats and profiles stay tied to the same roster, development tools sit next to game data, and teaching moments do not require another subscription.",
    solution: [
      {
        title: "Public profiles",
        body: "Team and player profiles with schedules, stats, and progress families can actually follow.",
      },
      {
        title: "Staff admin",
        body: "Roster, schedule, and program settings without re-entering the same names everywhere.",
      },
      {
        title: "Evaluations & tryouts",
        body: "Structured scoring, draft boards, and player tracking across seasons.",
      },
      {
        title: "Baseball IQ & Chalk Talk",
        body: "Situational teaching on an interactive diamond.",
      },
      {
        title: "Practice library",
        body: "Plans, drills, and templates coaches can reuse week to week.",
      },
    ],
    tags: ["Next.js", "Baseball", "Evaluations", "Coaching"],
    href: "https://stats.maketheplay.faith",
    platformDetail: {
      hero: "stats-hub",
      role: "Founder · product",
      highlights: [
        {
          title: "Knowledge",
          body: "Baseball IQ scenarios and Chalk Talk turn situational teaching into something players and coaches can see — not just talk through on a whiteboard.",
        },
        {
          title: "Skills improvement",
          body: "Stats, evaluations, and progress tracking stay on the same player profile so development is visible across games and seasons.",
        },
        {
          title: "Team management",
          body: "Roster, schedule, tryouts, draft boards, and practice planning for staff — with public pages parents and players can follow.",
        },
      ],
      stack: ["Next.js", "React", "TypeScript", "Tailwind"],
      diagrams: [
        {
          id: "sh-development-pillars",
          kind: "mermaid",
          title: "Three pillars of player development",
          caption:
            "Stats Hub centers on knowledge, skills, and team management — not a pile of disconnected apps.",
        },
        {
          id: "sh-coach-family-flow",
          kind: "reactflow",
          title: "Who uses what",
          caption:
            "Staff run the program; families and players follow the same source of truth.",
        },
      ],
    },
  },
  {
    slug: "gtm-revenue-warehouse",
    title: "GTM revenue warehouse",
    kind: "Solution",
    year: "2026",
    company: "Vitable Health",
    oneLiner:
      "A greenfield warehouse built from zero into a shared revenue truth that GTM, CS, and Finance all use.",
    problem:
      "GTM, CS, and Finance were not looking at the same customer truth. BI lived in one tool, CRM dates and scores stayed trapped in another, and every team had its own spreadsheet version of reality.",
    approach:
      "Stand up a greenfield warehouse with shared models for renewal, expansion, and lead scoring. Make the warehouse the source of truth, then push clean signals back to the CRM so every team works from the same numbers.",
    solution: [
      {
        title: "Greenfield warehouse",
        body: "Built from zero by a founding data seat — no legacy migration, no shadow spreadsheet layer.",
      },
      {
        title: "Shared revenue models",
        body: "Renewal, expansion, and lead-scoring models that Revenue, CS, and Finance all query.",
      },
      {
        title: "Signals back to the CRM",
        body: "Warehouse-scored leads and dates pushed back so every team works from the same numbers.",
      },
    ],
    tags: ["dbt", "Prefect", "Hightouch", "Lightdash"],
    visualizations: [
      {
        type: "reactflow",
        title: "GTM data loop",
        caption: "CRM in, modeled in dbt, self-serve BI, and clean signals pushed back to the CRM.",
        chartId: "vitable-gtm-loop",
        height: 480,
      },
    ],
  },
  {
    slug: "daily-fantasy-dbt-warehouse",
    title: "Daily fantasy sports dbt warehouse",
    kind: "Solution",
    year: "2022–2024",
    company: "PrizePicks",
    oneLiner:
      "The original dbt model layer for a high-growth gaming product — and the ownership patterns that scaled the team from zero to eight engineers.",
    problem:
      "A high-growth daily fantasy sports operator had no analytics engineering function and no shared semantics in the warehouse. Analysts and data scientists were rebuilding the same joins on terabyte-scale transactional data.",
    approach:
      "Design the core dbt model layer for the gaming product, onboard the team to dbt Cloud, and split ownership by domain as headcount grew. Stay hands-on as architect while engineers owned vertical slices.",
    solution: [
      {
        title: "Founding dbt architecture",
        body: "Core model layer for daily-fantasy analytics on BigQuery, designed before the first hire.",
      },
      {
        title: "Team onboarding",
        body: "New hires ramped on dbt Cloud, tests, and model ownership patterns.",
      },
      {
        title: "Domain ownership at scale",
        body: "The bench scaled from 0 to 8 engineers, each owning a vertical slice of company data.",
      },
      {
        title: "Sustained velocity",
        body: "120+ analytics-repo commits in a peak month — KPI artifacts and DS enrichments shipping weekly.",
      },
    ],
    tags: ["dbt", "dbt Cloud", "BigQuery", "Team building"],
    visualizations: [
      {
        type: "reactflow",
        title: "Model layer",
        caption: "Raw transactional data through staging, marts, and semantic layers to every consumer.",
        chartId: "prizepicks-model-layer",
        height: 480,
      },
    ],
  },
  {
    slug: "compliance-data-tiers",
    title: "Compliance data tiers & GDPR pipelines",
    kind: "Solution",
    year: "2022–2024",
    company: "PrizePicks",
    oneLiner:
      "Hot, warm, cold, and frozen storage tiers for terabyte-scale gaming transactions — with finance backup and retention pipelines for GDPR.",
    problem:
      "Regulatory compliance and finance audit needed governed retention on terabyte-scale transactions. A single warehouse tier could not balance realtime access, analytics freshness, and long-term archive with row-level PII controls.",
    approach:
      "Define a four-tier lifecycle modeled on Elasticsearch data tiers plus compliance requirements. Pair tier design with finance backup and retention pipelines, governed cold storage, and warehouse row-level PII access.",
    solution: [
      {
        title: "Hot tier",
        body: "CDC, APIs, and warehouse raw for operational and near-realtime use.",
      },
      {
        title: "Warm tier",
        body: "dbt and Prefect models — the analytics-ready layer teams query daily.",
      },
      {
        title: "Cold tier",
        body: "Read-only snapshots with governed access for finance and audit.",
      },
      {
        title: "Frozen tier",
        body: "Retention and archive exports (CSV, Parquet, BigQuery) for compliance holds.",
      },
      {
        title: "GDPR pipelines",
        body: "Finance backup and retention pipelines with row-level PII controls in the warehouse.",
      },
    ],
    tags: ["GDPR", "BigQuery", "GCS", "Compliance", "PII"],
    visualizations: [
      {
        type: "reactflow",
        title: "Lifecycle flow",
        caption:
          "Streaming sources through hot, warm, cold, and frozen tiers — governed reads for finance, retention exports for GDPR.",
        chartId: "prizepicks-data-lifecycle",
        height: 480,
      },
      {
        type: "tiers",
        title: "Data lifecycle",
        tiers: [
          {
            name: "Hot",
            subtitle: "Operational",
            description: "CDC streams, APIs, warehouse raw — seconds to minutes fresh.",
            tone: "hot",
          },
          {
            name: "Warm",
            subtitle: "Analytics",
            description: "dbt and Prefect models — the layer analysts and DS query daily.",
            tone: "warm",
          },
          {
            name: "Cold",
            subtitle: "Governed read",
            description: "Read-only snapshots with access controls for finance and audit.",
            tone: "cold",
          },
          {
            name: "Frozen",
            subtitle: "Retention",
            description: "Archive exports for compliance holds and long-term retention policy.",
            tone: "frozen",
          },
        ],
      },
      {
        type: "compare",
        title: "Access model",
        caption: "Why tiers beat a single warehouse for regulated gaming data.",
        before:
          "One BigQuery dataset with mixed PII, operational tables, and ad-hoc analyst copies — hard to audit and expensive to retain.",
        after:
          "Tiered storage with row-level PII controls, governed cold access, and frozen exports that finance and compliance can point to.",
      },
    ],
  },
  {
    slug: "postgres-bigquery-replication",
    title: "Postgres → BigQuery realtime replication",
    kind: "Solution",
    year: "2023",
    company: "PrizePicks",
    oneLiner:
      "Dataproc Spark and Prefect on GKE for continuous Postgres-to-BigQuery sync — users, payments, and gameplay configuration at production scale.",
    problem:
      "Analytics needed near-realtime copies of core Postgres tables while backfills had to stay reliable. Streaming state needed backup before destructive changes.",
    approach:
      "Build PySpark jobs on Dataproc for batch backfill and incremental reads, orchestrate continuous merge loops on Prefect with tiered GKE work queues. Evaluate Databricks for dedup at scale — recommend native Spark on Dataproc for cost and control.",
    solution: [
      {
        title: "Parameterized Spark jobs",
        body: "Postgres read, BigQuery merge, and a continuous realtime loop on Dataproc.",
      },
      {
        title: "Tiered orchestration",
        body: "Prefect sub-flows per table with GKE work pools from 2GB to 16GB by job profile.",
      },
      {
        title: "Schema alignment",
        body: "Ingestion, Spark jobs, and dbt tests kept in sync on core tables.",
      },
      {
        title: "Payment file ingest",
        body: "A Go Cloud Function to parse, clean, and stage payment files for warehouse load.",
      },
      {
        title: "Safe state management",
        body: "Documented state-backup requirements before destructive replication changes.",
      },
    ],
    tags: ["Dataproc", "Spark", "Prefect", "GKE", "BigQuery", "Go"],
    visualizations: [
      {
        type: "reactflow",
        title: "Replication architecture",
        caption: "Postgres prod → Spark backfill and incremental → Prefect merge loops → BigQuery.",
        chartId: "prizepicks-replication",
        height: 480,
      },
    ],
  },
  {
    slug: "marketing-tag-deduplication",
    title: "Marketing tag data deduplication",
    kind: "Solution",
    year: "2024",
    company: "LTK (RewardStyle)",
    oneLiner:
      "Rebuilt trust in marketing tag tables — traced lineage upstream, then fixed the load strategy that compounded duplicates downstream.",
    problem:
      "Tag-based tables were heavily inflated with duplicates from historical data modeling. Incremental loads kept compounding bad rows until marketing analytics on campaign and canvas tags was untrustworthy.",
    approach:
      "Trace lineage from upstream tables to find where duplicates entered, then change the Airflow-orchestrated downstream loads from incremental merge to full overwrite so row counts stay reliable for every consuming team.",
    solution: [
      {
        title: "Lineage first",
        body: "Traced upstream sources through Airflow-orchestrated loads to isolate where duplicates compounded.",
      },
      {
        title: "Full overwrite downstream",
        body: "Tag tables switched from incremental merge to full overwrite, matching upstream refresh semantics.",
      },
      {
        title: "Documented load behavior",
        body: "Upstream vs downstream semantics written down so the fix held for every consuming team.",
      },
      {
        title: "Trust restored",
        body: "Reliable row counts for marketing and customer-success analytics.",
      },
    ],
    tags: ["Braze", "Airflow", "Data quality"],
    visualizations: [
      {
        type: "reactflow",
        title: "Marketing data pipeline",
        caption: "Full-overwrite upstream; Airflow downstream with full overwrite on tag tables.",
        chartId: "ltk-braze-pipeline",
        height: 480,
      },
      {
        type: "compare",
        title: "Load strategy",
        caption: "Why incremental downstream kept inflating duplicates.",
        before:
          "Incremental merges on tag tables compounded duplicate rows even when upstream tables only had a handful of bad records.",
        after:
          "Full overwrite downstream aligned with upstream full-refresh semantics — reliable row counts for marketing and CS analytics.",
      },
    ],
  },
  {
    slug: "billing-medallion-migration",
    title: "Billing medallion architecture & orchestration migration",
    kind: "Solution",
    year: "2024",
    company: "LTK (RewardStyle)",
    oneLiner:
      "Bronze/silver/gold billing pipelines on S3, change-data-capture services migrated to Airflow, and a reliable refunds path into Redshift.",
    problem:
      "A legacy orchestrator was being retired while billing and refunds data needed a medallion architecture. Change-data-capture tables behaved differently across environments, and new payment and refund tables needed merges, data-quality checks, and warehouse loads.",
    approach:
      "Migrate billing CDC pipelines to Airflow with custom SQL and primary-key tests. Deploy bronze-to-silver dedup for change-data-capture operations, then ship the refunds orchestration path to production.",
    solution: [
      {
        title: "Airflow cutover",
        body: "Legacy orchestrator retired; billing CDC pipelines moved to Airflow with prod-safe table references.",
      },
      {
        title: "Medallion on S3",
        body: "Bronze, silver, and gold buckets with Athena merges and Glue jobs.",
      },
      {
        title: "Refunds path to prod",
        body: "Refunds orchestration deployed and the Redshift load path validated.",
      },
      {
        title: "Data-quality gates",
        body: "Custom SQL and primary-key tests for the new Airflow patterns.",
      },
      {
        title: "Environment parity",
        body: "CDC behavior reconciled so dev and prod pipelines matched.",
      },
    ],
    tags: ["Airflow", "MWAA", "Athena", "Glue", "Redshift", "Medallion"],
    visualizations: [
      {
        type: "reactflow",
        title: "Medallion billing path",
        caption: "CDC microservices through bronze, silver dedup, and gold into Redshift.",
        chartId: "ltk-billing-medallion",
        height: 480,
      },
    ],
  },
  {
    slug: "agent-mcp-stack",
    title: "Agent + MCP stack",
    kind: "Solution",
    year: "2024–2026",
    company: "DVx Ventures",
    oneLiner:
      "Specialized agents with skills, structured memory, and custom MCP servers — all standing on a dbt foundation.",
    problem:
      "Teams want agents that do real work, but early LLM setups drift and hallucinate, and the tools agents need are missing or bolted on as an afterthought.",
    approach:
      "Design specialized skills and a memory structure that cut early hallucination. Build MCP servers so agents call live APIs. Stay in Terraform and Go instead of handing the last mile off.",
    solution: [
      {
        title: "Skills & memory structure",
        body: "Specialized skills and a memory layout that cut early hallucination and drift.",
      },
      {
        title: "Custom MCP servers",
        body: "Agents call live APIs through purpose-built MCP servers — including the OpenAPI proxy later released as open source.",
      },
      {
        title: "Hands-on to the last mile",
        body: "Terraform and Go in production, plus IC tickets when a team is blocked.",
      },
    ],
    tags: ["Agents", "MCP", "Go", "Terraform"],
    visualizations: [
      {
        type: "reactflow",
        title: "Agent stack",
        caption:
          "A dbt foundation, skills, and memory feed the agent runtime; MCP servers turn live APIs into tools.",
        chartId: "dvx-agent-stack",
        height: 480,
      },
    ],
  },
  {
    slug: "realtime-threat-detection",
    title: "Realtime threat-detection pipelines",
    kind: "Solution",
    year: "2023–2025",
    company: "Cork",
    oneLiner:
      "A multi-cloud warehouse and lake with realtime threat and risk scoring for an MSP warranty product.",
    problem:
      "An MSP cybersecurity product needed realtime threat and risk signals. There was no warehouse, no lake, and no data standards.",
    approach:
      "Stand up multi-cloud warehouse and lake. Stream telemetry plus public and private sources. Treat production quality as an engineering contract, not a later cleanup.",
    solution: [
      {
        title: "Realtime risk scoring",
        body: "Streaming pipelines for AI threat detection and risk scoring.",
      },
      {
        title: "Mixed-source ingest",
        body: "Telemetry plus public and private OSINT into one analytical store.",
      },
      {
        title: "Quality as a contract",
        body: "Data standards shared with engineering so quality was not a side project.",
      },
    ],
    tags: ["GCP", "AWS", "Realtime", "Cybersecurity"],
    visualizations: [
      {
        type: "reactflow",
        title: "Threat pipeline",
        caption: "Telemetry and OSINT through realtime ingest to scoring for MSP warranty risk.",
        chartId: "cork-threat-pipeline",
        height: 480,
      },
    ],
  },
  {
    slug: "streaming-embedded-analytics",
    title: "Streaming warehouse + embedded analytics product",
    kind: "Solution",
    year: "2019–2023",
    company: "MANTL",
    oneLiner:
      "AWS-to-GCP migration, realtime Postgres-to-BigQuery streaming, and an embedded Looker product sold to banks.",
    problem:
      "A multi-tenant fintech needed a real data product, not a warehouse nobody opened. The company also had to leave AWS for GCP without stalling shipping.",
    approach:
      "Migrate clouds without stalling shipping, then stream transactional Postgres into BigQuery and ship an embedded Looker offering as a real data product.",
    solution: [
      {
        title: "Cloud migration",
        body: "AWS to GCP with Terraform for IAM, networking, compute, Glue, and S3 — CI/CD so product and data teams kept shipping.",
      },
      {
        title: "Realtime replication",
        body: "Transactional Postgres streamed into BigQuery.",
      },
      {
        title: "Embedded analytics product",
        body: "A Looker embedded offering sold to bank and credit union clients.",
      },
    ],
    tags: ["BigQuery", "Looker", "Terraform", "AWS→GCP"],
    visualizations: [
      {
        type: "reactflow",
        title: "Bank data product",
        caption: "Postgres OLTP streamed to BigQuery, modeled in dbt, embedded Looker sold to banks.",
        chartId: "mantl-bank-data-product",
        height: 480,
      },
    ],
  },
];

export const skillGroups = [
  {
    category: "Languages",
    skills: ["Python", "SQL", "Go", "Terraform", "Rust", "Node", "Vue", "React.js"],
  },
  {
    category: "Warehouse & modeling",
    skills: [
      "dbt",
      "Postgres",
      "SQL Server",
      "BigQuery",
      "Redshift",
      "Athena",
      "AWS Glue",
      "MindsDB",
      "Spark SQL",
      "MongoDB",
      "SQLite",
      "Dagster",
      "Kestra",
    ],
  },
  {
    category: "Orchestration & reverse ETL",
    skills: [
      "Prefect",
      "Airflow",
      "Hightouch",
      "CI/CD",
      "dltHub",
      "Meltano",
      "Temporal",
      "Kafka",
      "ksqlDB",
    ],
  },
  {
    category: "Agents & AI",
    skills: [
      "Agentic AI",
      "Specialized skills",
      "MCP servers",
      "RAG",
      "Embeddings",
      "LangChain",
    ],
  },
  {
    category: "Cloud",
    skills: [
      "IAM",
      "S3",
      "Kinesis",
      "RDS",
      "GCP DataStream",
      "Kubernetes",
      "Docker",
    ],
  },
  {
    category: "BI",
    skills: ["Looker", "Lightdash", "PowerBI", "Metabase", "Data Apps"],
  },
];

export const education = [
  {
    school: "Western Governors University",
    degree: "BS in Data Analytics",
    period: "2013 to present",
    note: "Senior year in-progress",
    noteHelp:
      "5 courses remaining. On-the-job experience and hands-on work delayed completion.",
  },
  {
    school: "Udacity",
    degree: "Data Analytics",
    period: "2018",
    note: null as string | null,
    noteHelp: undefined as string | undefined,
  },
  {
    school: "Northern Arizona University",
    degree: "BS in Software Engineering",
    period: "2009",
    note: "Transferred",
    noteHelp: undefined as string | undefined,
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProject(): Project {
  return projects.find((project) => project.featured) ?? projects[0];
}
