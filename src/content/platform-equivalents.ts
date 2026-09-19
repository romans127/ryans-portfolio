const intro = `
Every data platform conversation I have eventually arrives at the same question, phrased six different ways: "we're on Snowflake, can you do this on Databricks?" or "our client is all-in on Azure, does your experience transfer?" The honest answer is that the vendor surface changes and the engineering decisions do not. But "it all maps" is a useless thing to say out loud unless you can draw the map.

So here is the map. Ten functional categories, six platforms, a diagram per category showing all six flows on the same spine, and a table underneath naming the actual products. I verified every product name against current vendor documentation in September 2026, because this is the most name-unstable corner of infrastructure I work in — roughly a third of what I would have written from memory was renamed, absorbed, or deprecated in the last eighteen months.

## How to read this

Each section is built on a four-stage spine. The stages differ by function, but within a section every platform gets the same four stages in the same order, so you can read across lanes and compare like for like. The diagram shows the flow; the table names the products; the analysis afterward covers the part that actually matters — where the approaches genuinely differ rather than merely differ in branding.

Color is consistent across every diagram in this article: Databricks red, Snowflake blue, dbt orange, GCP indigo, AWS amber, Azure cyan.

A note on dbt Cloud before we start. It is in this comparison because people put it in the comparison, but it is not a peer of the other five. dbt is a transformation and orchestration layer that runs on top of a warehouse or lakehouse. For roughly half of these categories the correct answer for dbt is "not in scope, it relies on the host platform," and I say so rather than inventing a product. Where dbt genuinely leads — version-controlled modeling, testing as code, cross-project contracts — it leads clearly.

\`\`\`mermaid title="The ten functions, and how this article is sequenced" caption="A linear spine from ingestion through serving, with quality and governance as cross-cutting concerns that attach to every stage rather than occupying one."
flowchart LR
  A["1 · Batch &<br/>file ingestion"] --> B["2 · Streaming<br/>ingestion"]
  B --> C["3 · Change<br/>data capture"]
  C --> D["4 · Transformation<br/>& modeling"]
  D --> E["5 · Orchestration<br/>& scheduling"]
  E --> F["6 · Storage &<br/>table format"]
  F --> G["9 · BI &<br/>SQL serving"]
  G --> H["10 · ML &<br/>model serving"]
  I["7 · Quality<br/>& testing"] -.-> D
  I -.-> F
  J["8 · Governance,<br/>catalog, lineage"] -.-> F
  J -.-> G

  classDef ingest fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef proc fill:#131022,stroke:#9b8cff,color:#e0daff,stroke-width:1px
  classDef store fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef trust fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef serve fill:#101d14,stroke:#5fd68a,color:#d3f5de,stroke-width:1px
  class A,B,C ingest
  class D,E proc
  class F store
  class I,J trust
  class G,H serve
\`\`\`
`;

const batchIngestion = `
## 1. Batch and file ingestion

The oldest problem in the stack: files arrive in object storage, and you need them in a queryable table without reprocessing yesterday's files every time. The interesting engineering question is not "how do I read Parquet," it is "how do I know what is new," and that is where the six platforms diverge more than you would expect.

\`\`\`mermaid title="Batch and file ingestion — six platforms on one spine" caption="Stage 2 is the one that matters. Everything else is plumbing; how a platform discovers new files determines its cost and latency floor."
flowchart LR

  subgraph AZ["Azure"]
    direction LR
    z1["ADLS Gen2 or<br/>OneLake shortcut"] --> z2["Data Factory trigger<br/>or no-copy shortcut"]
    z2 --> z3["Copy job or<br/>Dataflow Gen2"]
    z3 --> z4["OneLake<br/>Delta table"]
  end

  subgraph AWS["AWS"]
    direction LR
    a1["S3 landing<br/>prefix"] --> a2["Glue crawler or<br/>EventBridge event"]
    a2 --> a3["Glue ETL job<br/>or Data Firehose"]
    a3 --> a4["S3 Tables<br/>managed Iceberg"]
  end

  subgraph GCP["Google Cloud"]
    direction LR
    g1["Cloud Storage<br/>bucket"] --> g2["Storage trigger or<br/>Transfer Service schedule"]
    g2 --> g3["BigQuery batch<br/>load job"]
    g3 --> g4["BigQuery native<br/>or Iceberg table"]
  end

  subgraph DBT["dbt Cloud"]
    direction LR
    t1["Not in scope"] --> t2["Host platform<br/>lands the files"]
    t2 --> t3["dbt reads what<br/>already landed"]
    t3 --> t4["Modeled source"]
  end

  subgraph SNO["Snowflake"]
    direction LR
    n1["External stage<br/>on S3 / ADLS / GCS"] --> n2["Cloud event<br/>notification"]
    n2 --> n3["Snowpipe micro-batch<br/>or COPY INTO bulk"]
    n3 --> n4["Native or<br/>Iceberg table"]
  end

  subgraph DBX["Databricks"]
    direction LR
    b1["ADLS / S3 / GCS<br/>Unity Catalog volume"] --> b2["Auto Loader<br/>cloudFiles notifications"]
    b2 --> b3["Streaming read<br/>with RocksDB state"]
    b3 --> b4["Bronze Delta table"]
  end

  subgraph SPINE["Stage spine"]
    direction LR
    s1["1 · Files land in<br/>object storage"] --> s2["2 · New-file<br/>discovery"]
    s2 --> s3["3 · Load<br/>mechanism"]
    s3 --> s4["4 · Managed<br/>table"]
  end

  classDef spine fill:#101722,stroke:#8a99b8,color:#c8d3e6,stroke-width:1px,stroke-dasharray:4 3
  classDef dbx fill:#1d1012,stroke:#ff5c47,color:#ffd7d0,stroke-width:1px
  classDef sno fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef dbt fill:#1d1410,stroke:#ff8a5c,color:#ffe2d2,stroke-width:1px
  classDef gcp fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef aws fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef az fill:#0d1826,stroke:#4db8ff,color:#d4ecff,stroke-width:1px
  class s1,s2,s3,s4 spine
  class b1,b2,b3,b4 dbx
  class n1,n2,n3,n4 sno
  class t1,t2,t3,t4 dbt
  class g1,g2,g3,g4 gcp
  class a1,a2,a3,a4 aws
  class z1,z2,z3,z4 az
\`\`\`

| Platform | New-file discovery | Load mechanism | Managed table | Notable alternative |
|---|---|---|---|---|
| **Databricks** | Auto Loader \`cloudFiles\`, notification or directory listing | Structured Streaming read with checkpointed state | Bronze Delta table | Lakeflow Connect managed connectors |
| **Snowflake** | Cloud event notification on an external stage | Snowpipe micro-batch, or \`COPY INTO\` for bulk | Native or Snowflake-managed Iceberg | Openflow, managed Apache NiFi |
| **dbt Cloud** | Not in scope — relies on host platform | Not in scope | Not in scope | Reads sources the host already landed |
| **GCP** | Storage trigger, or Data Transfer Service schedule | BigQuery batch load job | BigQuery native or Iceberg table | Storage Write API in batch mode |
| **AWS** | Glue crawler, or EventBridge notification | Glue ETL job, or Amazon Data Firehose | S3 Tables managed Iceberg buckets | Zero-ETL for SaaS sources, lands Iceberg directly |
| **Azure** | Data Factory trigger, or OneLake shortcut with no copy | Copy job, or Dataflow Gen2 | OneLake Delta table | Shortcuts virtualize instead of ingesting |

**What actually differs**

Auto Loader is not a batch loader wearing a batch loader's clothes — it is a streaming primitive. Under the hood it maintains checkpointed state about which files it has seen, which means file ingestion and stream ingestion share one code path on Databricks. That is a real architectural advantage and it is the thing I miss most on other platforms: you write the pipeline once and change a trigger setting to move between hourly batch and continuous.

Snowpipe sits in a different place. It is genuinely micro-batch, triggered by cloud events, and Snowflake is explicit that it is complementary to rather than replaced by Snowpipe Streaming — files versus rows are separate paths with separate cost profiles.

The two answers that break the frame entirely are worth calling out. AWS zero-ETL for SaaS sources lands data as Iceberg tables in the SageMaker Lakehouse with no user-authored pipeline at all; there is nothing to write. And OneLake shortcuts do not ingest anything — they virtualize a path in ADLS, S3, or GCS so Fabric queries it in place. When someone asks me to compare ingestion tooling and one candidate's answer is "don't ingest," that is a design conversation, not a feature comparison.
`;

const streaming = `
## 2. Streaming ingestion and event streaming

Two distinct jobs get collapsed into the word "streaming": the durable message bus that accepts events, and the compute engine that processes them in flight. Keeping them separate is the fastest way to see what each platform actually sells you.

\`\`\`mermaid title="Streaming ingestion — bus and compute engine separated" caption="Stage 2 is the durable log; stage 3 is the processing engine. Databricks is the notable lane with no first-party answer at stage 2."
flowchart LR

  subgraph AZ["Azure"]
    direction LR
    z1["Apps, devices,<br/>service events"] --> z2["Event Hubs, or<br/>Fabric Eventstream"]
    z2 --> z3["Real-Time Intelligence<br/>KQL processing"]
    z3 --> z4["Eventhouse<br/>or OneLake"]
  end

  subgraph AWS["AWS"]
    direction LR
    a1["Apps, devices,<br/>service events"] --> a2["Kinesis Data Streams<br/>or Amazon MSK"]
    a2 --> a3["Managed Service<br/>for Apache Flink"]
    a3 --> a4["Iceberg table<br/>or Redshift"]
  end

  subgraph GCP["Google Cloud"]
    direction LR
    g1["Apps, devices,<br/>service events"] --> g2["Pub/Sub"]
    g2 --> g3["Dataflow on Beam, or<br/>BigQuery continuous queries"]
    g3 --> g4["BigQuery streaming<br/>table"]
  end

  subgraph DBT["dbt Cloud"]
    direction LR
    t1["Not in scope"] --> t2["Host platform<br/>owns the bus"]
    t2 --> t3["dbt models run<br/>after landing"]
    t3 --> t4["Micro-batch<br/>incremental model"]
  end

  subgraph SNO["Snowflake"]
    direction LR
    n1["Apps, devices,<br/>service events"] --> n2["Snowflake Datastream<br/>managed Kafka"]
    n2 --> n3["Snowpipe Streaming<br/>plus Dynamic Tables"]
    n3 --> n4["Native or<br/>Iceberg table"]
  end

  subgraph DBX["Databricks"]
    direction LR
    b1["Apps, devices,<br/>service events"] --> b2["No first-party bus<br/>bring Kafka or Kinesis"]
    b2 --> b3["Structured Streaming<br/>Spark Real-Time Mode"]
    b3 --> b4["Streaming Delta table"]
  end

  subgraph SPINE["Stage spine"]
    direction LR
    s1["1 · Event<br/>producers"] --> s2["2 · Durable<br/>message bus"]
    s2 --> s3["3 · Stream<br/>compute"]
    s3 --> s4["4 · Serving<br/>table"]
  end

  classDef spine fill:#101722,stroke:#8a99b8,color:#c8d3e6,stroke-width:1px,stroke-dasharray:4 3
  classDef dbx fill:#1d1012,stroke:#ff5c47,color:#ffd7d0,stroke-width:1px
  classDef sno fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef dbt fill:#1d1410,stroke:#ff8a5c,color:#ffe2d2,stroke-width:1px
  classDef gcp fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef aws fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef az fill:#0d1826,stroke:#4db8ff,color:#d4ecff,stroke-width:1px
  class s1,s2,s3,s4 spine
  class b1,b2,b3,b4 dbx
  class n1,n2,n3,n4 sno
  class t1,t2,t3,t4 dbt
  class g1,g2,g3,g4 gcp
  class a1,a2,a3,a4 aws
  class z1,z2,z3,z4 az
\`\`\`

| Platform | Durable message bus | Stream compute | Serving table | Notable alternative |
|---|---|---|---|---|
| **Databricks** | None first-party — bring Kafka, Kinesis, Pub/Sub, or Event Hubs | Structured Streaming on Spark; Spark Real-Time Mode for sub-second | Streaming Delta table | Auto Loader for file-arrival streams |
| **Snowflake** | Snowflake Datastream, managed Kafka, private preview | Snowpipe Streaming for row ingestion; Dynamic Tables for SQL-native processing | Native or managed Iceberg v2/v3 | Kafka connector into Snowpipe Streaming |
| **dbt Cloud** | Not in scope — relies on host platform | Not in scope | Micro-batch incremental models | Frequent incremental runs approximate streaming |
| **GCP** | Pub/Sub | Dataflow on Apache Beam; BigQuery continuous queries in SQL | BigQuery streaming table | Storage Write API direct |
| **AWS** | Kinesis Data Streams, or Amazon MSK for Kafka | Managed Service for Apache Flink | Iceberg table, or Redshift | Amazon Data Firehose for delivery without processing |
| **Azure** | Event Hubs, Kafka-compatible; or Fabric Eventstream | Real-Time Intelligence with KQL | Eventhouse, or OneLake | Stream Analytics, but Microsoft steers new work to Fabric |

**What actually differs**

Databricks has no managed message bus. That is not a criticism — it is a deliberate scope boundary, and it means every serious Databricks streaming architecture has a Kafka or Kinesis dependency sitting outside the platform. Snowflake just closed that gap with Datastream, its own managed Kafka, which is still in private preview and worth watching because it changes the shape of Snowflake streaming reference architectures.

Careful with that name: Snowflake Datastream is a managed Kafka service, and Google Cloud Datastream is a CDC service. Same word, different category, two vendors. I have watched this cause genuine confusion in architecture reviews.

BigQuery continuous queries are the most genuinely novel thing in this section. It is plain SQL running continuously inside the warehouse, no separate stream-processing cluster to size or babysit, with output to BigQuery, Pub/Sub, Bigtable, or Spanner. Stateful joins and windows are still in preview, so it does not replace Flink for complex event processing, but for enrichment-and-route workloads it removes an entire tier from the diagram.

Two deprecations to keep off your slides. Kinesis Data Analytics for SQL reached end of life in January 2026, so Flink is the AWS answer now. And Azure is mid-pivot: Stream Analytics still runs, but Microsoft's documentation steers new workloads to Fabric Eventstream, and the Power BI output connector retires in October 2027. I would not start a new Stream Analytics project today.
`;

const cdc = `
## 3. Change data capture

This is the category where I see the most expensive mistakes, because CDC looks like a connector-selection problem and is actually a correctness problem. Reading a write-ahead log is the easy part. Landing an ordered change stream and collapsing it into a correct current-state table without losing late or out-of-order events is the part that takes the engineering.

\`\`\`mermaid title="Change data capture — three genuinely different philosophies" caption="Read stage 2 across lanes. Log-based replication, extension-based decoding, and share-based zero-ETL are not the same architecture wearing different names."
flowchart LR

  subgraph AZ["Azure"]
    direction LR
    z1["Azure SQL, Cosmos DB,<br/>Oracle, SAP"] --> z2["Fabric Mirroring<br/>managed replica"]
    z2 --> z3["OneLake Delta<br/>mirrored table"]
    z3 --> z4["Query the replica<br/>directly, no merge"]
  end

  subgraph AWS["AWS"]
    direction LR
    a1["Aurora, RDS,<br/>DynamoDB, Oracle"] --> a2["DMS log-based, or<br/>zero-ETL integration"]
    a2 --> a3["Iceberg staging, or<br/>replicated target"]
    a3 --> a4["MERGE in Glue, or<br/>no merge if zero-ETL"]
  end

  subgraph GCP["Google Cloud"]
    direction LR
    g1["Oracle, MySQL,<br/>Postgres, SQL Server"] --> g2["Datastream<br/>log-based CDC"]
    g2 --> g3["BigQuery append-only<br/>staging, or GCS"]
    g3 --> g4["MERGE in Dataform<br/>or scheduled SQL"]
  end

  subgraph DBT["dbt Cloud"]
    direction LR
    t1["Not in scope"] --> t2["Host platform<br/>captures changes"]
    t2 --> t3["dbt reads the<br/>landed change table"]
    t3 --> t4["dbt snapshots build<br/>SCD 2 history"]
  end

  subgraph SNO["Snowflake"]
    direction LR
    n1["Postgres,<br/>MySQL"] --> n2["Openflow CDC, or logical<br/>replication via pg_lake"]
    n2 --> n3["Iceberg change log<br/>queryable as changes view"]
    n3 --> n4["MERGE, or Dynamic<br/>Table on the change feed"]
  end

  subgraph DBX["Databricks"]
    direction LR
    b1["Postgres, MySQL,<br/>SQL Server, Oracle"] --> b2["Lakeflow Connect<br/>log-based connector"]
    b2 --> b3["Bronze Delta<br/>append-only changes"]
    b3 --> b4["AUTO CDC into<br/>SCD type 1 or 2 Silver"]
  end

  subgraph SPINE["Stage spine"]
    direction LR
    s1["1 · Operational<br/>database"] --> s2["2 · Change<br/>capture"]
    s2 --> s3["3 · Raw change<br/>log landing"]
    s3 --> s4["4 · Merged<br/>current state"]
  end

  classDef spine fill:#101722,stroke:#8a99b8,color:#c8d3e6,stroke-width:1px,stroke-dasharray:4 3
  classDef dbx fill:#1d1012,stroke:#ff5c47,color:#ffd7d0,stroke-width:1px
  classDef sno fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef dbt fill:#1d1410,stroke:#ff8a5c,color:#ffe2d2,stroke-width:1px
  classDef gcp fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef aws fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef az fill:#0d1826,stroke:#4db8ff,color:#d4ecff,stroke-width:1px
  class s1,s2,s3,s4 spine
  class b1,b2,b3,b4 dbx
  class n1,n2,n3,n4 sno
  class t1,t2,t3,t4 dbt
  class g1,g2,g3,g4 gcp
  class a1,a2,a3,a4 aws
  class z1,z2,z3,z4 az
\`\`\`

| Platform | Change capture | Raw landing | Merged current state | Notable alternative |
|---|---|---|---|---|
| **Databricks** | Lakeflow Connect managed database connectors, log-based | Bronze Delta, append-only | \`AUTO CDC\` into SCD type 1 or 2 | Debezium or Fivetran into Kafka or Auto Loader |
| **Snowflake** | Openflow CDC connectors; Snowflake Postgres mirroring via logical replication | Iceberg change log, exposed as \`$changes\` and \`$live\` views | \`MERGE\`, or a Dynamic Table over the change feed | Snowpipe Streaming for Kafka-delivered CDC |
| **dbt Cloud** | Not in scope — relies on host platform | Not in scope | dbt snapshots build SCD 2 from landed data | Only diffs data that already arrived |
| **GCP** | Datastream, log-based, broad source coverage | BigQuery append-only staging, or GCS | \`MERGE\` in Dataform or scheduled SQL | Custom Dataflow CDC pipeline |
| **AWS** | DMS for broad and proprietary sources; zero-ETL for intra-AWS | Iceberg staging, or a maintained replica | \`MERGE\` in Glue, or nothing if zero-ETL | Debezium on MSK for unsupported sources |
| **Azure** | Fabric Mirroring, managed near-real-time replica | OneLake Delta mirrored table | Query the replica directly | Mirrored Database Change Feed into Eventstream |

**What actually differs**

There are three distinct philosophies hiding in that table, and choosing between them is the actual architecture decision.

**Log-based replication services** — Datastream, DMS, Lakeflow Connect — read the database's write-ahead log and hand you an ordered change stream. You own the merge. This gives you the most control and the most work: you decide SCD strategy, late-arrival handling, and deletion semantics.

**Extension-based decoding** is Snowflake's newer and more interesting answer. Snowflake Postgres, from the Crunchy Data acquisition, uses a Postgres publication and a logical decoding slot, with \`pg_lake\` writing the change log out as open Iceberg tables. The change feed itself is queryable through \`$changes\`, and \`$live\` gives you a roughly thirty-second-latency current view. The change log being an open table rather than a proprietary internal structure is a meaningful difference.

**Share-based zero-ETL** — AWS zero-ETL integrations and Fabric Mirroring — removes the pipeline entirely. Data appears as managed tables, maintained by the vendor, and there is no merge step because you are querying a replica. Cheapest to operate, least control. When your source is Aurora and your target is Redshift, writing a CDC pipeline in 2026 is doing unpaid work.

Two corrections for anyone carrying a 2024 mental model. Snowflake Streams are **not** a source-CDC tool; they track changes on tables already inside Snowflake, and calling them "Snowflake's CDC answer" conflates two very different things. And DMS is not deprecated — only DMS Fleet Advisor was retired, in May 2026. AWS's own guidance splits the use case deliberately: DMS for migrations and external or proprietary sources, zero-ETL for continuous intra-AWS replication.

The outlier worth noting: Fabric Mirroring is the only one of these that mirrors **from competitors**, pulling Snowflake and BigQuery tables into OneLake. That is a competitive strategy expressed as a product feature.
`;

const transformation = `
## 4. Transformation and modeling

The whole industry converged on the same idea here, from different directions, and mostly stopped arguing about it: you declare the table that should exist and how fresh it should be, and the platform figures out when to run what.

\`\`\`mermaid title="Transformation and modeling — the declarative convergence" caption="Stage 2 is where the philosophies split: declare desired state and freshness, or author an explicit dependency graph."
flowchart LR

  subgraph AZ["Azure"]
    direction LR
    z1["OneLake Delta<br/>tables"] --> z2["Fabric notebooks, T-SQL,<br/>or Dataflow Gen2"]
    z2 --> z3["Fabric Spark or<br/>Warehouse engine"]
    z3 --> z4["Gold lakehouse<br/>or warehouse"]
  end

  subgraph AWS["AWS"]
    direction LR
    a1["S3 Tables<br/>Iceberg"] --> a2["Glue Visual ETL, or<br/>Iceberg materialized views"]
    a2 --> a3["Glue Spark, EMR,<br/>or Athena"]
    a3 --> a4["Curated Iceberg<br/>with query rewrite"]
  end

  subgraph GCP["Google Cloud"]
    direction LR
    g1["BigQuery raw<br/>datasets"] --> g2["Dataform SQLX<br/>definitions"]
    g2 --> g3["BigQuery pipelines<br/>in-warehouse compute"]
    g3 --> g4["Curated BigQuery<br/>datasets"]
  end

  subgraph DBT["dbt Cloud"]
    direction LR
    t1["Any host<br/>warehouse"] --> t2["SQL and Python models<br/>with explicit ref DAG"]
    t2 --> t3["dbt v2 engine<br/>state-aware runs"]
    t3 --> t4["Marts, contracts,<br/>versioned models"]
  end

  subgraph SNO["Snowflake"]
    direction LR
    n1["Landed native or<br/>Iceberg tables"] --> n2["Dynamic Tables with<br/>a freshness target"]
    n2 --> n3["Virtual warehouse<br/>auto incremental or full"]
    n3 --> n4["Curated native<br/>tables"]
  end

  subgraph DBX["Databricks"]
    direction LR
    b1["Bronze Delta<br/>tables"] --> b2["Lakeflow pipelines<br/>SQL or Python declarative"]
    b2 --> b3["Spark Declarative<br/>Pipelines with Photon"]
    b3 --> b4["Silver and gold<br/>Delta tables"]
  end

  subgraph SPINE["Stage spine"]
    direction LR
    s1["1 · Raw and<br/>bronze tables"] --> s2["2 · Model<br/>definition"]
    s2 --> s3["3 · Execution<br/>engine"]
    s3 --> s4["4 · Curated<br/>marts"]
  end

  classDef spine fill:#101722,stroke:#8a99b8,color:#c8d3e6,stroke-width:1px,stroke-dasharray:4 3
  classDef dbx fill:#1d1012,stroke:#ff5c47,color:#ffd7d0,stroke-width:1px
  classDef sno fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef dbt fill:#1d1410,stroke:#ff8a5c,color:#ffe2d2,stroke-width:1px
  classDef gcp fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef aws fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef az fill:#0d1826,stroke:#4db8ff,color:#d4ecff,stroke-width:1px
  class s1,s2,s3,s4 spine
  class b1,b2,b3,b4 dbx
  class n1,n2,n3,n4 sno
  class t1,t2,t3,t4 dbt
  class g1,g2,g3,g4 gcp
  class a1,a2,a3,a4 aws
  class z1,z2,z3,z4 az
\`\`\`

| Platform | Model definition | Execution engine | Curated output | Notable alternative |
|---|---|---|---|---|
| **Databricks** | Lakeflow pipelines, formerly Delta Live Tables | Spark Declarative Pipelines, Spark 4.1 | Silver and gold Delta tables | Notebooks driven by Lakeflow Jobs; dbt on Databricks |
| **Snowflake** | Dynamic Tables, driven by a freshness target | Virtual warehouse, auto-selects incremental or full refresh | Curated native tables | Snowpark DataFrames; Streams and Tasks for imperative |
| **dbt Cloud** | SQL and Python models with an explicit \`ref()\` DAG | dbt v2 engine, state-aware runs | Marts with contracts and model versions | dbt Canvas for low-code modeling |
| **GCP** | Dataform SQLX | BigQuery pipelines, in-warehouse | Curated BigQuery datasets | Dataflow for custom; stored procedures |
| **AWS** | Glue Visual ETL, or Iceberg materialized views | Glue Spark, EMR, or Athena | Curated Iceberg with automatic query rewrite | dbt on Redshift or Athena |
| **Azure** | Fabric notebooks, T-SQL, or Dataflow Gen2 | Fabric Spark or Warehouse engine | Gold lakehouse or warehouse | dbt against Fabric Warehouse |

**What actually differs**

Lakeflow pipelines, Dynamic Tables, BigQuery pipelines, and Glue's Iceberg materialized views all ask the same question — what should exist, and how fresh — instead of the older question of when to run what. dbt is the deliberate holdout, and its explicit \`ref()\` DAG with state-aware runs remains the best answer when you want transformation logic to live in version control and behave identically across warehouses.

Two implementation details worth knowing. Dynamic Tables decide for themselves whether to refresh incrementally or fully, based on whether your query is incrementalizable — which is convenient until a query change silently flips you to full refresh and your credit burn triples. And Glue's Iceberg materialized views use Iceberg row-level change tracking for incremental refresh plus automatic query rewrite, meaning the engine silently redirects user queries to the materialized view. That is a genuinely different model from every other option here.

On naming: Delta Live Tables is now Lakeflow pipelines, and \`import dlt\` became \`from pyspark import pipelines as dp\`, though no migration is required. On the dbt side, the Fusion engine is now just called dbt at version 2, and what was dbt Core is now dbt OSS under Apache 2.0. Two distributions on a shared foundation, with Mesh and Catalog gated to the commercial binary.
`;

const orchestration = `
## 5. Orchestration and scheduling

The clean split in this category is philosophical: two vendors sell you managed open-source Airflow, two sell you a proprietary task DAG and expect you to bring Airflow anyway for anything cross-system.

\`\`\`mermaid title="Orchestration and scheduling — managed Airflow versus proprietary task graphs" caption="Stage 3 determines your portability. A proprietary task graph is faster to adopt and harder to leave."
flowchart LR

  subgraph AZ["Azure"]
    direction LR
    z1["Schedule, event,<br/>or tumbling window"] --> z2["Fabric Data Factory<br/>pipelines"]
    z2 --> z3["Activity graph, or<br/>Fabric Airflow job"]
    z3 --> z4["Fabric monitoring<br/>hub"]
  end

  subgraph AWS["AWS"]
    direction LR
    a1["EventBridge rule<br/>or cron"] --> a2["Amazon MWAA, or<br/>Step Functions"]
    a2 --> a3["Airflow DAG, or<br/>state machine"]
    a3 --> a4["Airflow UI and<br/>CloudWatch"]
  end

  subgraph GCP["Google Cloud"]
    direction LR
    g1["Cron, Pub/Sub,<br/>or sensor"] --> g2["Managed Service<br/>for Apache Airflow"]
    g2 --> g3["Airflow DAG,<br/>any operator"]
    g3 --> g4["Airflow UI and<br/>Cloud Logging"]
  end

  subgraph DBT["dbt Cloud"]
    direction LR
    t1["Cron, webhook,<br/>or pull request"] --> t2["dbt Orchestrator"]
    t2 --> t3["Model DAG within<br/>the dbt project"]
    t3 --> t4["Run history and<br/>metadata API"]
  end

  subgraph SNO["Snowflake"]
    direction LR
    n1["Cron, or stream<br/>has data"] --> n2["Task scheduler"]
    n2 --> n3["Task graph of SQL<br/>and stored procedures"]
    n3 --> n4["Task history<br/>views"]
  end

  subgraph DBX["Databricks"]
    direction LR
    b1["Cron, file arrival,<br/>or table update"] --> b2["Lakeflow Jobs<br/>serverless"]
    b2 --> b3["Task DAG with<br/>if-else and for-each"]
    b3 --> b4["System tables<br/>and job runs UI"]
  end

  subgraph SPINE["Stage spine"]
    direction LR
    s1["1 · Trigger"] --> s2["2 · Scheduler"]
    s2 --> s3["3 · Task<br/>graph"]
    s3 --> s4["4 · Run history<br/>and alerting"]
  end

  classDef spine fill:#101722,stroke:#8a99b8,color:#c8d3e6,stroke-width:1px,stroke-dasharray:4 3
  classDef dbx fill:#1d1012,stroke:#ff5c47,color:#ffd7d0,stroke-width:1px
  classDef sno fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef dbt fill:#1d1410,stroke:#ff8a5c,color:#ffe2d2,stroke-width:1px
  classDef gcp fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef aws fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef az fill:#0d1826,stroke:#4db8ff,color:#d4ecff,stroke-width:1px
  class s1,s2,s3,s4 spine
  class b1,b2,b3,b4 dbx
  class n1,n2,n3,n4 sno
  class t1,t2,t3,t4 dbt
  class g1,g2,g3,g4 gcp
  class a1,a2,a3,a4 aws
  class z1,z2,z3,z4 az
\`\`\`

| Platform | Scheduler | Task graph | Run history | Notable alternative |
|---|---|---|---|---|
| **Databricks** | Lakeflow Jobs, formerly Databricks Workflows, serverless | Task DAG with if-else and for-each control flow | System tables plus job runs UI | External Airflow triggering Jobs via REST API |
| **Snowflake** | Task scheduler, cron or stream-has-data | Task graph of SQL and stored procedures, warehouse-scoped | Task history views | Openflow DAG view for ingestion flows |
| **dbt Cloud** | dbt Orchestrator — dbt jobs and CI only | Model DAG inside the dbt project | Run history plus metadata API | Not a general-purpose orchestrator |
| **GCP** | Managed Service for Apache Airflow, formerly Cloud Composer | Airflow DAG, any operator | Airflow UI plus Cloud Logging | BigQuery pipelines have built-in scheduling |
| **AWS** | Amazon MWAA, or Step Functions for service orchestration | Airflow DAG, or state machine | Airflow UI plus CloudWatch | Glue workflows and triggers |
| **Azure** | Fabric Data Factory pipelines | Activity graph, or Fabric Airflow job | Fabric monitoring hub | Azure Data Factory classic, still separate from Fabric |

**What actually differs**

Snowflake Tasks are warehouse-scoped. They run SQL and stored procedures inside Snowflake, and the moment your pipeline needs to call an external API, kick off a container, or coordinate with a system outside the warehouse, you need Airflow, Dagster, or Prefect. The same is broadly true of Lakeflow Jobs, though Jobs has stretched further — you can now create Lakeflow Connect ingestion pipelines directly in the Jobs UI, which quietly dissolves the boundary between orchestrator and ingestion tool.

dbt's scheduler, now branded Orchestrator, is frequently mistaken for a general-purpose orchestrator. It is not, and trying to make it one is a well-trodden path to regret. It schedules dbt work and runs CI.

One date worth flagging if you are on Google Cloud: Cloud Composer is now Managed Service for Apache Airflow, and Managed Airflow Gen 1 environments plus Airflow 2.0.x reached end of life on September 15, 2026. If you have not migrated, that is already behind you.
`;

const storage = `
## 6. Storage and table format

This is the category that changed most since 2024, and the one where the industry's direction is now unmistakable. Catalog and format have become inseparable, and Iceberg REST is the interface everybody agreed to speak.

\`\`\`mermaid title="Storage and table format — the Iceberg REST convergence" caption="Stage 3 is the story of 2026. Four different vendors' metastores now expose the same Iceberg REST catalog interface."
flowchart LR

  subgraph AZ["Azure"]
    direction LR
    z1["OneLake over<br/>ADLS Gen2"] --> z2["Delta-Parquet<br/>as the native format"]
    z2 --> z3["OneLake catalog<br/>plus Purview"]
    z3 --> z4["V-Order plus<br/>auto compaction"]
  end

  subgraph AWS["AWS"]
    direction LR
    a1["S3, or S3 Tables<br/>buckets"] --> a2["Apache Iceberg<br/>as the default"]
    a2 --> a3["Glue Data Catalog<br/>plus Lake Formation"]
    a3 --> a4["S3 Tables automatic<br/>compaction"]
  end

  subgraph GCP["Google Cloud"]
    direction LR
    g1["Cloud Storage"] --> g2["BigQuery columnar, or<br/>Iceberg on GCS"]
    g2 --> g3["Lakehouse metastore<br/>Iceberg REST catalog"]
    g3 --> g4["Partitioning, clustering,<br/>auto reclustering"]
  end

  subgraph DBT["dbt Cloud"]
    direction LR
    t1["Not in scope"] --> t2["Materializations map to<br/>host table types"]
    t2 --> t3["dbt Catalog syncs<br/>to host catalog"]
    t3 --> t4["Host platform<br/>optimizes"]
  end

  subgraph SNO["Snowflake"]
    direction LR
    n1["Snowflake-managed<br/>or your bucket"] --> n2["Micro-partitions, or<br/>Iceberg tables"]
    n2 --> n3["Horizon Catalog<br/>built on Apache Polaris"]
    n3 --> n4["Automatic clustering plus<br/>search optimization"]
  end

  subgraph DBX["Databricks"]
    direction LR
    b1["S3, ADLS,<br/>or GCS"] --> b2["Delta Lake with UniForm<br/>Iceberg read compatibility"]
    b2 --> b3["Unity Catalog<br/>three-level namespace"]
    b3 --> b4["Liquid Clustering plus<br/>predictive optimization"]
  end

  subgraph SPINE["Stage spine"]
    direction LR
    s1["1 · Object<br/>storage"] --> s2["2 · Table<br/>format"]
    s2 --> s3["3 · Metastore<br/>and catalog"]
    s3 --> s4["4 · Layout<br/>optimization"]
  end

  classDef spine fill:#101722,stroke:#8a99b8,color:#c8d3e6,stroke-width:1px,stroke-dasharray:4 3
  classDef dbx fill:#1d1012,stroke:#ff5c47,color:#ffd7d0,stroke-width:1px
  classDef sno fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef dbt fill:#1d1410,stroke:#ff8a5c,color:#ffe2d2,stroke-width:1px
  classDef gcp fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef aws fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef az fill:#0d1826,stroke:#4db8ff,color:#d4ecff,stroke-width:1px
  class s1,s2,s3,s4 spine
  class b1,b2,b3,b4 dbx
  class n1,n2,n3,n4 sno
  class t1,t2,t3,t4 dbt
  class g1,g2,g3,g4 gcp
  class a1,a2,a3,a4 aws
  class z1,z2,z3,z4 az
\`\`\`

| Platform | Table format | Metastore and catalog | Layout optimization | Notable alternative |
|---|---|---|---|---|
| **Databricks** | Delta Lake, with UniForm for Iceberg and Hudi read compatibility | Unity Catalog, three-level namespace | Liquid Clustering plus predictive optimization | External Iceberg via UniForm |
| **Snowflake** | Native micro-partitions, or Iceberg tables | Horizon Catalog, built on Apache Polaris | Automatic clustering plus search optimization | Snowflake Open Catalog for externally managed Iceberg |
| **dbt Cloud** | Not in scope — materializations map to host table types | dbt Catalog syncs outward to the host catalog | Host platform optimizes | — |
| **GCP** | BigQuery columnar, or Iceberg on GCS under Google Cloud Lakehouse | Lakehouse metastore, Iceberg REST, GA with credential vending | Partitioning, clustering, automatic reclustering | BigLake, the former name, still appears in older docs |
| **AWS** | Apache Iceberg as the platform default | Glue Data Catalog plus Lake Formation permissions | S3 Tables automatic compaction; Glue optimizers | Plain S3 and Parquet with a Glue crawler |
| **Azure** | Delta-Parquet, native across lakehouse, warehouse, and mirroring | OneLake catalog plus Microsoft Purview | V-Order plus automatic compaction | Iceberg interop via table-format virtualization |

**What actually differs**

The format alignment now sorts cleanly. Databricks and Fabric both standardized on Delta Lake. AWS went all-in on Iceberg — S3 Tables, Glue materialized views, and zero-ETL all land Iceberg, making it the default rather than an option. Snowflake straddles proprietary micro-partitions and first-class Iceberg. GCP straddles BigQuery-native and Iceberg via what is now called Google Cloud Lakehouse.

Liquid Clustering deserves more attention than it gets, because it is a genuine divergence rather than a rebrand. Databricks' position is that you should stop thinking about partition columns at all — no Hive-style partitioning, no \`ZORDER\`, just declare clustering keys and let the platform manage file layout. BigQuery and Snowflake still expose partition and cluster concepts as things you reason about. Having tuned partition strategies by hand for years, I find the Databricks position correct and slightly uncomfortable, in that order.

The naming churn here is severe. BigLake is now Google Cloud Lakehouse and the BigLake metastore is the Lakehouse metastore. If you are reading a tutorial that says BigLake, it is not wrong, just old.
`;

const quality = `
## 7. Data quality, testing, and observability

There are exactly two philosophies in this category, most mature organizations run one of each, and knowing which one you are looking at tells you where bad data will end up.

\`\`\`mermaid title="Data quality — assertion-at-write versus scan-after-land" caption="Stage 3 is the fork. Enforce at write time and bad rows never land; scan after landing and you detect rather than prevent."
flowchart LR

  subgraph AZ["Azure"]
    direction LR
    z1["OneLake<br/>tables"] --> z2["Purview data<br/>quality rules"]
    z2 --> z3["Scheduled scan<br/>and scoring"]
    z3 --> z4["Purview Unified Catalog<br/>plus monitoring hub"]
  end

  subgraph AWS["AWS"]
    direction LR
    a1["Glue<br/>dataframe"] --> a2["Glue Data Quality<br/>DQDL rules"]
    a2 --> a3["Deequ evaluation<br/>in the job"]
    a3 --> a4["CloudWatch plus<br/>SageMaker Catalog"]
  end

  subgraph GCP["Google Cloud"]
    direction LR
    g1["BigQuery<br/>tables"] --> g2["Knowledge Catalog<br/>DataScan rules"]
    g2 --> g3["Scheduled scan<br/>after landing"]
    g3 --> g4["Catalog quality tab<br/>plus data insights"]
  end

  subgraph DBT["dbt Cloud"]
    direction LR
    t1["Model<br/>outputs"] --> t2["Tests, unit tests,<br/>and v2 checks in git"]
    t2 --> t3["Fail the run,<br/>block the merge"]
    t3 --> t4["dbt Insights plus<br/>source freshness"]
  end

  subgraph SNO["Snowflake"]
    direction LR
    n1["Landed<br/>tables"] --> n2["Data metric functions"]
    n2 --> n3["Scheduled measurement<br/>after landing"]
    n3 --> n4["Horizon quality<br/>monitoring plus Trail"]
  end

  subgraph DBX["Databricks"]
    direction LR
    b1["Pipeline<br/>dataflow"] --> b2["Lakeflow pipeline<br/>expectations"]
    b2 --> b3["Warn, drop, or fail<br/>at write time"]
    b3 --> b4["Lakehouse Monitoring<br/>plus event logs"]
  end

  subgraph SPINE["Stage spine"]
    direction LR
    s1["1 · Incoming<br/>data"] --> s2["2 · Rule<br/>definition"]
    s2 --> s3["3 · Enforcement<br/>point"]
    s3 --> s4["4 · Quality signal<br/>and observability"]
  end

  classDef spine fill:#101722,stroke:#8a99b8,color:#c8d3e6,stroke-width:1px,stroke-dasharray:4 3
  classDef dbx fill:#1d1012,stroke:#ff5c47,color:#ffd7d0,stroke-width:1px
  classDef sno fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef dbt fill:#1d1410,stroke:#ff8a5c,color:#ffe2d2,stroke-width:1px
  classDef gcp fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef aws fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef az fill:#0d1826,stroke:#4db8ff,color:#d4ecff,stroke-width:1px
  class s1,s2,s3,s4 spine
  class b1,b2,b3,b4 dbx
  class n1,n2,n3,n4 sno
  class t1,t2,t3,t4 dbt
  class g1,g2,g3,g4 gcp
  class a1,a2,a3,a4 aws
  class z1,z2,z3,z4 az
\`\`\`

| Platform | Rule definition | Enforcement point | Observability surface | Philosophy |
|---|---|---|---|---|
| **Databricks** | Lakeflow pipeline expectations, formerly DLT expectations | Warn, drop, or fail the pipeline at write time | Lakehouse Monitoring plus pipeline event logs | Assert at write |
| **Snowflake** | Data metric functions | Scheduled measurement after landing | Horizon Catalog quality monitoring plus Snowflake Trail | Scan after land |
| **dbt Cloud** | Tests, unit tests, and v2 \`checks\`, all in version control | Fail the run and block the merge | dbt Insights plus source freshness | Assert in CI |
| **GCP** | Knowledge Catalog DataScan rules, formerly Dataplex | Scheduled scan after landing | Catalog quality tab plus BigQuery data insights | Scan after land |
| **AWS** | Glue Data Quality DQDL rules | Deequ evaluation inside the Glue job | CloudWatch plus SageMaker Catalog | Assert at write |
| **Azure** | Microsoft Purview data quality rules | Scheduled scan and scoring | Purview Unified Catalog plus Fabric monitoring hub | Scan after land |

**What actually differs**

**In-pipeline assertions** — Lakeflow expectations, dbt tests, Glue Data Quality, Dataform assertions — evaluate at write time and can fail or quarantine bad rows before they land. **Scanner-based monitoring** — Knowledge Catalog DataScans, Snowflake data metric functions, Purview — measures quality on data that has already landed. The first prevents; the second detects. Most teams that care about this run both, with assertions on the critical path and scanners for broad coverage.

dbt is the only option here whose quality layer is version-controlled code by default, and that matters more than it sounds: a test that lives in a UI is a test nobody reviews. The v2 \`checks\` feature, which runs arbitrary queries against the Parquet-based dbt Information Schema, is new since 2024 and worth a look if your last dbt exposure predates it.

The honest gap: none of these six matches a dedicated observability tool like Monte Carlo or Metaplane for cross-system anomaly detection and incident routing. Every first-party offering is strongest inside its own platform boundary, which is precisely where multi-platform data quality problems are not.
`;

const governance = `
## 8. Governance, catalog, and lineage

The catalog wars are over and they ended in an unusual place: everybody won the interoperability argument, so the competition moved to governance depth.

\`\`\`mermaid title="Governance and catalog — open APIs, divergent depth" caption="Stage 3 converged on Iceberg REST across four vendors. Stage 4, sharing, is where the strategies still diverge sharply."
flowchart LR

  subgraph AZ["Azure"]
    direction LR
    z1["Microsoft Entra ID"] --> z2["Purview policies,<br/>DLP, and sensitivity"]
    z2 --> z3["Purview Unified Catalog<br/>plus OneLake catalog"]
    z3 --> z4["OneLake sharing<br/>and shortcuts"]
  end

  subgraph AWS["AWS"]
    direction LR
    a1["IAM and<br/>Identity Center"] --> a2["Lake Formation<br/>fine-grained permissions"]
    a2 --> a3["Glue Data Catalog plus<br/>SageMaker Catalog"]
    a3 --> a4["Cross-account shares<br/>plus Data Exchange"]
  end

  subgraph GCP["Google Cloud"]
    direction LR
    g1["Cloud IAM<br/>identities"] --> g2["IAM plus policy tags<br/>for column ACLs"]
    g2 --> g3["Knowledge Catalog<br/>formerly Dataplex"]
    g3 --> g4["Analytics Hub<br/>listings"]
  end

  subgraph DBT["dbt Cloud"]
    direction LR
    t1["SSO to the<br/>dbt platform"] --> t2["Project groups<br/>and model access"]
    t2 --> t3["dbt Catalog plus Mesh<br/>project-scoped lineage"]
    t3 --> t4["Not in scope<br/>host platform shares"]
  end

  subgraph SNO["Snowflake"]
    direction LR
    n1["SCIM and<br/>federated SSO"] --> n2["RBAC plus masking<br/>and row access policies"]
    n2 --> n3["Horizon Catalog<br/>on Apache Polaris"]
    n3 --> n4["Zero-copy sharing<br/>plus Marketplace"]
  end

  subgraph DBX["Databricks"]
    direction LR
    b1["SCIM from Entra,<br/>Okta, or Google"] --> b2["Unity Catalog grants<br/>row and column security"]
    b2 --> b3["Unity Catalog<br/>column-level lineage"]
    b3 --> b4["OpenSharing<br/>formerly Delta Sharing"]
  end

  subgraph SPINE["Stage spine"]
    direction LR
    s1["1 · Identity<br/>provider"] --> s2["2 · Policy<br/>engine"]
    s2 --> s3["3 · Catalog<br/>and lineage"]
    s3 --> s4["4 · External<br/>sharing"]
  end

  classDef spine fill:#101722,stroke:#8a99b8,color:#c8d3e6,stroke-width:1px,stroke-dasharray:4 3
  classDef dbx fill:#1d1012,stroke:#ff5c47,color:#ffd7d0,stroke-width:1px
  classDef sno fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef dbt fill:#1d1410,stroke:#ff8a5c,color:#ffe2d2,stroke-width:1px
  classDef gcp fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef aws fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef az fill:#0d1826,stroke:#4db8ff,color:#d4ecff,stroke-width:1px
  class s1,s2,s3,s4 spine
  class b1,b2,b3,b4 dbx
  class n1,n2,n3,n4 sno
  class t1,t2,t3,t4 dbt
  class g1,g2,g3,g4 gcp
  class a1,a2,a3,a4 aws
  class z1,z2,z3,z4 az
\`\`\`

| Platform | Policy engine | Catalog and lineage | External sharing | Notable addition |
|---|---|---|---|---|
| **Databricks** | Unity Catalog grants, row and column security | Unity Catalog, column-level lineage | OpenSharing, formerly Delta Sharing, now a Linux Foundation project | Unity AI Gateway governs model, agent, and MCP calls |
| **Snowflake** | RBAC plus masking and row access policies | Horizon Catalog on Apache Polaris, Iceberg REST and Scan APIs | Zero-copy sharing, now extended to Delta and Iceberg | Horizon Context layer |
| **dbt Cloud** | Project groups and model access modifiers | dbt Catalog, formerly dbt Explorer, plus dbt Mesh | Not in scope — relies on host platform | Model contracts and versions |
| **GCP** | Cloud IAM plus policy tags for column ACLs | Knowledge Catalog, formerly Dataplex Universal Catalog | Analytics Hub listings | API and IAM names unchanged through the rename |
| **AWS** | Lake Formation fine-grained permissions | Glue Data Catalog for technical, SageMaker Catalog for business | Cross-account shares plus AWS Data Exchange | Iceberg REST endpoint on Glue |
| **Azure** | Purview policies, DLP, sensitivity labels | Purview Unified Catalog plus in-Fabric OneLake catalog | OneLake sharing and cross-tenant shortcuts | Purview extends to AI governance |

**What actually differs**

Unity Catalog, Horizon, the Lakehouse metastore, and Glue all expose Iceberg REST catalog endpoints now. Table-level lock-in as a strategy is finished, so the differentiation moved to governance depth: how granular the masking, how complete the column-level lineage, how well it handles AI assets.

On that last point, Databricks has moved furthest past data. Unity AI Gateway governs runtime AI interactions — model calls, agent tool invocations, MCP service access, spend caps — and there is no direct analog on the other five yet. If you are building agentic systems on a governed platform, that gap is going to matter to your security review.

Sharing is where strategies genuinely diverge. Databricks open-sourced and broadened Delta Sharing into OpenSharing under the Linux Foundation, adding AI assets and Iceberg REST interop. Snowflake kept sharing zero-copy and in-platform but extended it to Delta and Iceberg tables. Fabric virtualizes with shortcuts instead of sharing at all. Three different bets about whether data leaves your platform.

One category error to avoid: dbt Catalog and dbt Mesh govern the transformation project — contracts, versions, groups — and sync outward to host catalogs. They are not an enterprise catalog, and positioning them as a Purview or Unity Catalog replacement will not survive contact with a compliance team. Also worth knowing that Google's own documentation is internally inconsistent here, with some pages saying Dataplex Universal Catalog became Knowledge Catalog and others saying Dataplex Catalog became BigQuery universal catalog. You will see both.
`;

const serving = `
## 9. BI serving and SQL compute

Most of the 2024-era arguments in this category have gone stale. Everyone converged on serverless auto-scaling SQL compute, and the interesting differences moved to the pricing model and the semantic layer.

\`\`\`mermaid title="BI serving and SQL compute — from curated table to consumer" caption="Stage 3, the semantic layer, is where the current competition actually is. Stage 2 has largely converged on serverless."
flowchart LR

  subgraph AZ["Azure"]
    direction LR
    z1["OneLake Delta<br/>table"] --> z2["Fabric Warehouse, or<br/>SQL analytics endpoint"]
    z2 --> z3["DirectLake semantic<br/>model, no import"]
    z3 --> z4["Power BI plus<br/>Copilot"]
  end

  subgraph AWS["AWS"]
    direction LR
    a1["Iceberg or<br/>Redshift table"] --> a2["Redshift Serverless,<br/>or Athena"]
    a2 --> a3["Quick topics and<br/>datasets"]
    a3 --> a4["Amazon Quick<br/>formerly QuickSight"]
  end

  subgraph GCP["Google Cloud"]
    direction LR
    g1["Curated BigQuery<br/>dataset"] --> g2["BigQuery slots or<br/>on-demand per byte"]
    g2 --> g3["LookML semantic<br/>model"]
    g3 --> g4["Looker plus conversational<br/>analytics agent"]
  end

  subgraph DBT["dbt Cloud"]
    direction LR
    t1["dbt mart<br/>model"] --> t2["Not in scope<br/>host compute runs it"]
    t2 --> t3["dbt Semantic Layer<br/>governed metrics"]
    t3 --> t4["Any BI tool via<br/>JDBC or GraphQL"]
  end

  subgraph SNO["Snowflake"]
    direction LR
    n1["Curated native<br/>table"] --> n2["Virtual warehouse<br/>per-second billing"]
    n2 --> n3["Semantic views for<br/>Cortex Analyst"]
    n3 --> n4["Snowflake CoWork<br/>plus external BI"]
  end

  subgraph DBX["Databricks"]
    direction LR
    b1["Gold Delta<br/>table"] --> b2["Databricks SQL serverless<br/>Photon engine"]
    b2 --> b3["Metric views plus<br/>Unity Catalog semantics"]
    b3 --> b4["AI/BI Dashboards<br/>and Genie"]
  end

  subgraph SPINE["Stage spine"]
    direction LR
    s1["1 · Curated<br/>table"] --> s2["2 · SQL<br/>compute"]
    s2 --> s3["3 · Semantic<br/>layer"]
    s3 --> s4["4 · Consumer<br/>surface"]
  end

  classDef spine fill:#101722,stroke:#8a99b8,color:#c8d3e6,stroke-width:1px,stroke-dasharray:4 3
  classDef dbx fill:#1d1012,stroke:#ff5c47,color:#ffd7d0,stroke-width:1px
  classDef sno fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef dbt fill:#1d1410,stroke:#ff8a5c,color:#ffe2d2,stroke-width:1px
  classDef gcp fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef aws fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef az fill:#0d1826,stroke:#4db8ff,color:#d4ecff,stroke-width:1px
  class s1,s2,s3,s4 spine
  class b1,b2,b3,b4 dbx
  class n1,n2,n3,n4 sno
  class t1,t2,t3,t4 dbt
  class g1,g2,g3,g4 gcp
  class a1,a2,a3,a4 aws
  class z1,z2,z3,z4 az
\`\`\`

| Platform | SQL compute | Pricing unit | Semantic layer | Consumer surface |
|---|---|---|---|---|
| **Databricks** | Databricks SQL serverless warehouses, Photon engine | DBUs | Metric views plus Unity Catalog semantics | AI/BI Dashboards and Genie |
| **Snowflake** | Virtual warehouses, multi-cluster, per-second, auto-suspend | Credits | Semantic views consumed by Cortex Analyst | Snowflake CoWork, formerly Snowflake Intelligence |
| **dbt Cloud** | Not in scope — the host warehouse executes | Host platform | dbt Semantic Layer, governed metric definitions | Any BI tool over JDBC or GraphQL |
| **GCP** | BigQuery, slot reservations or on-demand | Slots, or bytes scanned | LookML semantic model | Looker, Looker Studio, conversational analytics agent |
| **AWS** | Redshift Serverless or provisioned RA3; Athena for serverless Trino | RPUs, or bytes scanned | Quick topics and datasets | Amazon Quick, formerly QuickSight |
| **Azure** | Fabric Data Warehouse, or Lakehouse SQL analytics endpoint | Capacity units | DirectLake semantic model | Power BI plus Copilot |

**What actually differs**

DirectLake is the architecturally distinct option. Power BI reads Delta files in OneLake directly into the semantic model — no import step, no scheduled refresh, and for most BI workloads no separate warehouse serving tier at all. If your organization lives in Power BI, that removes a whole class of refresh-window engineering that the other five still require.

BigQuery remains the only pure disaggregated model where you can pay per byte scanned with zero capacity planning. Everyone else sells capacity in some unit — DBUs, credits, capacity units, RPUs. That difference shows up in how teams behave: capacity models create an incentive to consolidate workloads onto a warehouse that is already running, and per-byte models create an incentive to prune columns. Both distort design, in opposite directions.

The stale argument worth retiring: Snowflake's instant elasticity versus Databricks' cluster startup time. Both run serverless auto-scaling SQL compute now, and if that comparison is still in your evaluation deck it is doing no work.

Finally, brace for the renames, because every vendor renamed its conversational BI surface in 2026. Genie on Databricks, CoWork on Snowflake — formerly Snowflake Intelligence, with Cortex Code now called CoCo — conversational analytics on GCP, Amazon Quick where you knew QuickSight, and Copilot in Power BI.
`;

const ml = `
## 10. ML, features, and model serving

The pattern to watch here is lakehouse-OLTP convergence. Serving features at single-digit-millisecond latency is an operational database problem, and two vendors just went and bought operational databases to solve it.

\`\`\`mermaid title="ML and model serving — offline training to online inference" caption="Stage 4 is the interesting one. Low-latency feature serving pushed two lakehouse vendors into acquiring Postgres companies."
flowchart LR

  subgraph AZ["Azure"]
    direction LR
    z1["Azure ML<br/>feature store"] --> z2["Azure ML SDK v2<br/>plus Fabric Data Science"]
    z2 --> z3["Azure ML<br/>model registry"]
    z3 --> z4["Managed endpoints,<br/>AI Foundry for genAI"]
  end

  subgraph AWS["AWS"]
    direction LR
    a1["SageMaker AI<br/>Feature Store"] --> a2["SageMaker training,<br/>managed MLflow"]
    a2 --> a3["SageMaker AI<br/>Model Registry"]
    a3 --> a4["SageMaker endpoints,<br/>Bedrock for LLMs"]
  end

  subgraph GCP["Google Cloud"]
    direction LR
    g1["Feature Store on Gemini<br/>Enterprise Agent Platform"] --> g2["Vertex Experiments<br/>and Pipelines"]
    g2 --> g3["Model Registry"]
    g3 --> g4["Online endpoints, or<br/>BigQuery ML in-warehouse"]
  end

  subgraph DBT["dbt Cloud"]
    direction LR
    t1["Feature tables<br/>as dbt models"] --> t2["Not in scope"]
    t2 --> t3["Not in scope"]
    t3 --> t4["Not in scope"]
  end

  subgraph SNO["Snowflake"]
    direction LR
    n1["Snowflake<br/>Feature Store"] --> n2["Snowpark training,<br/>MLflow 3 tracking"]
    n2 --> n3["Snowflake ML<br/>Model Registry"]
    n3 --> n4["Warehouse CPU, or<br/>SPCS GPU with vLLM"]
  end

  subgraph DBX["Databricks"]
    direction LR
    b1["Feature Store in<br/>Unity Catalog"] --> b2["MLflow 3<br/>experiments"]
    b2 --> b3["Model Registry in<br/>Unity Catalog"]
    b3 --> b4["Model Serving with<br/>Lakebase online store"]
  end

  subgraph SPINE["Stage spine"]
    direction LR
    s1["1 · Feature<br/>source"] --> s2["2 · Train and<br/>track"]
    s2 --> s3["3 · Model<br/>registry"]
    s3 --> s4["4 · Online<br/>serving"]
  end

  classDef spine fill:#101722,stroke:#8a99b8,color:#c8d3e6,stroke-width:1px,stroke-dasharray:4 3
  classDef dbx fill:#1d1012,stroke:#ff5c47,color:#ffd7d0,stroke-width:1px
  classDef sno fill:#0c1a22,stroke:#29b5e8,color:#cfeeff,stroke-width:1px
  classDef dbt fill:#1d1410,stroke:#ff8a5c,color:#ffe2d2,stroke-width:1px
  classDef gcp fill:#101728,stroke:#7aa7ff,color:#d9e4ff,stroke-width:1px
  classDef aws fill:#1d1710,stroke:#ffb02e,color:#ffeccd,stroke-width:1px
  classDef az fill:#0d1826,stroke:#4db8ff,color:#d4ecff,stroke-width:1px
  class s1,s2,s3,s4 spine
  class b1,b2,b3,b4 dbx
  class n1,n2,n3,n4 sno
  class t1,t2,t3,t4 dbt
  class g1,g2,g3,g4 gcp
  class a1,a2,a3,a4 aws
  class z1,z2,z3,z4 az
\`\`\`

| Platform | Feature store | Experiment tracking | Model registry | Online serving |
|---|---|---|---|---|
| **Databricks** | Feature Store in Unity Catalog; Feature Views in preview | MLflow 3 | Model Registry in Unity Catalog | Model Serving backed by Lakebase, managed Postgres, GA February 2026 |
| **Snowflake** | Snowflake Feature Store | Snowpark training with MLflow 3 tracking | Snowflake ML Model Registry | Warehouse CPU, or Snowpark Container Services with GPU and vLLM |
| **dbt Cloud** | Feature tables can be dbt models | Not in scope | Not in scope | Not in scope |
| **GCP** | Feature Store on Gemini Enterprise Agent Platform | Vertex Experiments and Pipelines | Model Registry | Online endpoints, or BigQuery ML in-warehouse |
| **AWS** | SageMaker AI Feature Store, online and offline groups | SageMaker training with managed MLflow | SageMaker AI Model Registry | SageMaker endpoints; Bedrock for foundation models |
| **Azure** | Azure ML feature store; Fabric has none first-party | Azure ML SDK v2, plus Fabric Data Science | Azure ML model registry | Managed endpoints; AI Foundry for generative AI |

**What actually differs**

Databricks' answer to online feature serving is now a managed Postgres. Lakebase, from the Neon acquisition, went GA in February 2026 with serverless Postgres 16 and 17, scale-to-zero, and database branching, and it backs Online Feature Stores — Model Serving looks features up automatically at inference time. Snowflake's parallel move is Snowflake Postgres from the Crunchy Data acquisition. Two lakehouse vendors independently concluded that the way to serve features fast is to own an OLTP engine, which tells you something about where this architecture is heading.

Snowflake quietly deprecated its own modeling library. \`snowflake.ml.modeling\` now emits a deprecation warning; the guidance is to train with native scikit-learn, XGBoost, or LightGBM and log to the Model Registry. Its differentiation is deployment target choice — warehouse CPU versus container GPU with vLLM — not training frameworks.

GCP has the deepest rename of anything in this article, and it is a genuine trap. Vertex AI's ML sub-services now document under the Gemini Enterprise Agent Platform, and the legacy Vertex AI Feature Store's optimized online serving is deprecated. Anyone citing "Vertex AI Feature Store" in 2026 is citing a deprecated product.

On AWS, "SageMaker" alone is now ambiguous and you should stop using it unqualified. There are three: **SageMaker AI** for classic ML, **SageMaker Unified Studio** for the data and AI development environment, and **SageMaker Lakehouse** for Iceberg storage unification. And on Databricks, treat Mosaic AI as legacy-but-still-referenced branding — 2026 platform materials list components by name rather than under that umbrella.
`;

const cheatSheet = `
## The rename cheat sheet

I keep coming back to this table more than any other part of this article. If you learned this stack in 2024, this is your delta.

| What you called it in 2024 | What it is called now | Vendor |
|---|---|---|
| Delta Live Tables, DLT | Lakeflow pipelines | Databricks |
| Databricks Workflows | Lakeflow Jobs | Databricks |
| Ingestion had no umbrella name | Lakeflow Connect | Databricks |
| Delta Sharing | OpenSharing, a Linux Foundation project | Databricks |
| — | Lakebase, managed serverless Postgres, GA February 2026 | Databricks |
| — | Unity AI Gateway | Databricks |
| Snowflake Intelligence | Snowflake CoWork | Snowflake |
| Cortex Code | Snowflake CoCo | Snowflake |
| — | Snowflake Datastream, managed Kafka, private preview | Snowflake |
| — | Snowflake Postgres, via the Crunchy Data acquisition | Snowflake |
| dbt Fusion engine | dbt, version 2 | dbt |
| dbt Core | dbt OSS, Apache 2.0 | dbt |
| dbt Explorer | dbt Catalog | dbt |
| dbt Visual Editor | dbt Canvas | dbt |
| dbt Cloud IDE | dbt Studio | dbt |
| Dataplex Universal Catalog | Knowledge Catalog | GCP |
| BigLake, BigLake metastore | Google Cloud Lakehouse, Lakehouse metastore | GCP |
| Cloud Composer | Managed Service for Apache Airflow | GCP |
| Vertex AI ML surfaces | Gemini Enterprise Agent Platform | GCP |
| Kinesis Data Firehose | Amazon Data Firehose | AWS |
| Kinesis Data Analytics for SQL | Ended January 2026 — use Managed Service for Apache Flink | AWS |
| SageMaker, as an umbrella | SageMaker AI, Unified Studio, and Lakehouse | AWS |
| QuickSight | Amazon Quick | AWS |
| Azure Synapse Data Explorer | Retired October 2025 — use Fabric Eventhouse | Azure |
| Azure Stream Analytics | Winding down — Fabric Eventstream is the path | Azure |
| Azure Synapse Analytics | Supported, maintenance mode; Fabric is the stated path | Azure |

## How I actually use this

The reason I build maps like this is not to win comparison arguments. It is that the map tells you which decisions are portable and which are not.

Look back across the ten sections and notice where the diagrams are nearly identical lane to lane: orchestration, transformation, batch ingestion, BI serving. In those categories the engineering is genuinely transferable, the vendor choice is mostly a cost and ergonomics question, and someone who has built it well on one platform will build it well on another inside a month.

Then notice where the lanes diverge structurally rather than cosmetically. CDC, where three incompatible philosophies produce three different correctness models. Storage layout, where Liquid Clustering and explicit partitioning ask you to think differently. Online feature serving, where the answer is now an OLTP database. Sharing, where the strategies encode genuinely different bets about whether your data leaves the platform. Those are the places where platform choice constrains architecture, and those are the places worth spending your evaluation time.

Everything else on that list is a rename waiting to happen.
`;

export const platformEquivalentsContent = [
  intro,
  batchIngestion,
  streaming,
  cdc,
  transformation,
  orchestration,
  storage,
  quality,
  governance,
  serving,
  ml,
  cheatSheet,
].join("\n");
