import { Fragment } from "react";
import MermaidBlock from "@/components/diagrams/MermaidBlock";

type Block =
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "emphasis"; text: string }
  | { kind: "bullets"; items: string[] }
  | { kind: "table"; header: string[]; rows: string[][] }
  | { kind: "mermaid"; chart: string; title: string; caption?: string };

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatInline(text: string): string {
  let result = escapeHtml(text);
  result = result.replace(
    /`([^`]+)`/g,
    '<code class="rounded bg-ink/60 px-1.5 py-0.5 font-mono text-[0.85em] text-signal">$1</code>',
  );
  result = result.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-cream">$1</strong>');
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-signal underline decoration-signal/40 underline-offset-2" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  return result;
}

function isSeparatorRow(cells: string[]): boolean {
  return cells.every((cell) => /^[-:\s]+$/.test(cell));
}

function parseTableRow(line: string): string[] {
  const trimmed = line.trim();
  const stripped = trimmed.replace(/^\|/, "").replace(/\|$/, "");
  return stripped.split("|").map((cell) => cell.trim());
}

function parseBlocks(content: string): Block[] {
  const lines = content.trim().split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    const trimmed = line.trim();

    if (/^```\s*mermaid\b/.test(trimmed)) {
      const titleMatch = trimmed.match(/title="([^"]*)"/);
      const captionMatch = trimmed.match(/caption="([^"]*)"/);
      const title = titleMatch?.[1] ?? "";
      const caption = captionMatch?.[1];
      i++;
      const chartLines: string[] = [];
      while (i < lines.length && lines[i].trim() !== "```") {
        chartLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim() === "```") {
        i++;
      }
      blocks.push({ kind: "mermaid", chart: chartLines.join("\n"), title, caption });
      continue;
    }

    if (trimmed.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const parsedRows = tableLines.map(parseTableRow);
      const separatorIndex = parsedRows.findIndex(isSeparatorRow);

      let header: string[];
      let rows: string[][];

      if (separatorIndex !== -1) {
        header = parsedRows[separatorIndex - 1] ?? [];
        rows = [];
        for (let r = separatorIndex + 1; r < parsedRows.length; r++) {
          if (!isSeparatorRow(parsedRows[r])) {
            rows.push(parsedRows[r]);
          }
        }
      } else {
        header = parsedRows[0] ?? [];
        rows = parsedRows.slice(1);
      }

      blocks.push({ kind: "table", header, rows });
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ kind: "heading", level: 3, text: line.replace("### ", "") });
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ kind: "heading", level: 2, text: line.replace("## ", "") });
      i++;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].replace("- ", ""));
        i++;
      }
      blocks.push({ kind: "bullets", items });
      continue;
    }

    if (line.startsWith("**") && line.endsWith("**")) {
      blocks.push({ kind: "emphasis", text: line.replace(/\*\*/g, "") });
      i++;
      continue;
    }

    blocks.push({ kind: "paragraph", text: line });
    i++;
  }

  return blocks;
}

function renderBlock(block: Block, index: number) {
  switch (block.kind) {
    case "heading":
      if (block.level === 2) {
        return (
          <h2 key={index} className="display mt-10 text-2xl text-cream md:text-3xl">
            {block.text}
          </h2>
        );
      }
      return (
        <h3 key={index} className="display mt-8 text-xl text-cream md:text-2xl">
          {block.text}
        </h3>
      );
    case "emphasis":
      return (
        <p key={index} className="text-base font-medium text-cream md:text-lg">
          {block.text}
        </p>
      );
    case "bullets":
      return (
        <Fragment key={index}>
          {block.items.map((item, itemIndex) => (
            <div
              key={`${index}-${itemIndex}`}
              className="flex gap-3 text-base leading-relaxed text-stone md:text-lg"
            >
              <span className="mt-1 text-signal">▹</span>
              <span dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            </div>
          ))}
        </Fragment>
      );
    case "paragraph":
      return (
        <p
          key={index}
          className="text-base leading-[1.75] text-stone md:text-lg"
          dangerouslySetInnerHTML={{ __html: formatInline(block.text) }}
        />
      );
    case "table":
      return (
        <div key={index} className="my-8 overflow-x-auto panel rounded-2xl">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                {block.header.map((cell, cellIndex) => (
                  <th
                    key={cellIndex}
                    className="px-4 py-3 font-mono text-xs font-medium uppercase tracking-wide text-copper"
                    dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-line/50 last:border-0">
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-4 py-3 align-top leading-relaxed text-stone"
                      dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "mermaid":
      return (
        <div key={index} className="my-8">
          <MermaidBlock
            chart={block.chart}
            title={block.title || "Diagram"}
            caption={block.caption}
          />
        </div>
      );
    default: {
      const _exhaustive: never = block;
      return _exhaustive;
    }
  }
}

type PostBodyProps = {
  content: string;
};

export default function PostBody({ content }: PostBodyProps) {
  const blocks = parseBlocks(content);

  return (
    <article className="space-y-6">
      {blocks.map((block, index) => renderBlock(block, index))}
    </article>
  );
}
