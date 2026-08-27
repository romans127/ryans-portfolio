export type SkillFact = {
  year?: string;
  blurb: string;
};

const skillFacts: Record<string, SkillFact> = {
  // Languages
  Python: {
    year: "1991",
    blurb: "The primary language of data scientists and data engineers.",
  },
  SQL: {
    year: "1974",
    blurb: "Born at IBM; still the universal language of data.",
  },
  Go: {
    year: "2009",
    blurb: "Google's language for fast, concurrent backend systems.",
  },
  Terraform: {
    year: "2014",
    blurb: "HashiCorp's infrastructure-as-code standard.",
  },
  Rust: {
    year: "2010",
    blurb: "Memory-safe systems language; Stack Overflow's most-loved for years.",
  },
  Node: {
    year: "2009",
    blurb: "JavaScript on the server, powered by the V8 engine.",
  },
  Vue: {
    year: "2014",
    blurb: "Evan You's progressive framework — approachable and incrementally adoptable.",
  },
  "React.js": {
    year: "2013",
    blurb: "Meta's component model; the dominant way to build web UIs.",
  },

  // Warehouse & modeling
  dbt: {
    year: "2016",
    blurb: "Made SQL transformation a software engineering discipline.",
  },
  Postgres: {
    year: "1996",
    blurb: "The world's most advanced open-source relational database.",
  },
  "SQL Server": {
    year: "1989",
    blurb: "Microsoft's enterprise workhorse for transactional and analytical workloads.",
  },
  BigQuery: {
    year: "2011",
    blurb: "Google's serverless warehouse — petabyte scale with zero ops.",
  },
  Redshift: {
    year: "2012",
    blurb: "AWS's columnar warehouse that kicked off the cloud DW era.",
  },
  Athena: {
    year: "2016",
    blurb: "Serverless SQL directly over S3 data lakes.",
  },
  MindsDB: {
    year: "2017",
    blurb: "ML models as virtual tables — query predictions with plain SQL.",
  },
  "Spark SQL": {
    year: "2014",
    blurb: "Distributed SQL on Spark; the big-data workhorse.",
  },
  MongoDB: {
    year: "2009",
    blurb: "The document database for JSON-shaped, semi-structured data.",
  },
  SQLite: {
    year: "2000",
    blurb: "Embedded and serverless — the most deployed database engine on Earth.",
  },
  Dagster: {
    year: "2018",
    blurb: "Asset-centric orchestration; data assets as first-class citizens.",
  },
  Kestra: {
    year: "2019",
    blurb: "Declarative YAML orchestration, event-driven by default.",
  },

  // Orchestration & reverse ETL
  Prefect: {
    year: "2018",
    blurb: "Python-native orchestration — workflows as plain functions.",
  },
  Airflow: {
    year: "2014",
    blurb: "Born at Airbnb; the de facto standard for DAG-based pipelines.",
  },
  Hightouch: {
    year: "2019",
    blurb: "Pioneered reverse ETL — syncing warehouse data back to SaaS tools.",
  },
  "CI/CD": {
    blurb: "Automated build, test, and deploy on every merge.",
  },
  dltHub: {
    year: "2022",
    blurb: "dlt: Python-native data loading — pipelines as plain functions.",
  },
  Meltano: {
    year: "2018",
    blurb: "Open-source ELT built on Singer taps and targets; started at GitLab.",
  },
  Temporal: {
    year: "2019",
    blurb: "Durable execution for workflows, from the team behind Uber's Cadence.",
  },
  Kafka: {
    year: "2011",
    blurb: "Born at LinkedIn; the backbone of event streaming.",
  },
  ksqlDB: {
    year: "2019",
    blurb: "Streaming SQL over Kafka topics, from Confluent.",
  },

  // Cloud
  "AWS Glue": {
    year: "2017",
    blurb: "Serverless Spark ETL and data catalog on AWS.",
  },
  IAM: {
    year: "2011",
    blurb: "The identity and access backbone of every AWS account.",
  },
  S3: {
    year: "2006",
    blurb: "The first AWS service — object storage that launched the cloud era.",
  },
  Kinesis: {
    year: "2013",
    blurb: "Real-time streaming data ingestion on AWS.",
  },
  RDS: {
    year: "2009",
    blurb: "Managed relational databases — backups, patching, and failover handled.",
  },
  "GCP DataStream": {
    year: "2021",
    blurb: "Serverless change data capture into BigQuery.",
  },
  Kubernetes: {
    year: "2014",
    blurb: "Google's container orchestrator, now the industry standard.",
  },
  Docker: {
    year: "2013",
    blurb: "Made containers mainstream — build once, run anywhere.",
  },

  // BI
  Looker: {
    year: "2012",
    blurb: "Modeled BI via LookML; acquired by Google in 2020.",
  },
  Lightdash: {
    year: "2020",
    blurb: "Open-source, dbt-native BI — metrics defined next to the models.",
  },
  PowerBI: {
    year: "2015",
    blurb: "Microsoft's BI platform; the enterprise analytics default.",
  },
  Metabase: {
    year: "2015",
    blurb: "Open-source BI — self-serve questions without writing SQL.",
  },
  "Data Apps": {
    blurb: "Interactive data products and internal tools built on the warehouse.",
  },
};

export function getSkillFact(skill: string): SkillFact | undefined {
  return skillFacts[skill];
}
