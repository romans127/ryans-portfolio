import { posts } from "@/lib/posts";
import { projects, roles } from "@/lib/site";

export type SearchResult = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: "Project" | "Writing" | "Experience";
  tags: string[];
};

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function scoreResult(result: SearchResult, query: string): number {
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(result.title);
  const description = normalize(result.description);
  const tags = result.tags.map(normalize).join(" ");
  const haystack = `${title} ${description} ${tags}`;

  let score = 0;
  const terms = q.split(/\s+/).filter(Boolean);

  for (const term of terms) {
    if (title.includes(term)) score += 10;
    if (tags.includes(term)) score += 5;
    if (description.includes(term)) score += 3;
    if (haystack.includes(term)) score += 1;
  }

  return score;
}

export function searchPortfolio(query: string): SearchResult[] {
  const q = query.trim();
  if (!q) return [];

  const results: SearchResult[] = [
    ...projects.map((project) => ({
      id: `project-${project.slug}`,
      title: project.title,
      description: project.oneLiner,
      href: `/projects/${project.slug}`,
      category: "Project" as const,
      tags: [...project.tags, project.kind, project.company ?? ""],
    })),
    ...posts.map((post) => ({
      id: `post-${post.slug}`,
      title: post.title,
      description: post.excerpt,
      href: `/blog/${post.slug}`,
      category: "Writing" as const,
      tags: [post.tag],
    })),
    ...roles.map((role) => ({
      id: `role-${role.company}-${role.period}`,
      title: `${role.role} at ${role.company}`,
      description: role.summary,
      href: "/experience",
      category: "Experience" as const,
      tags: [...role.tags, role.company, role.location],
    })),
  ];

  return results
    .map((result) => ({ result, score: scoreResult(result, q) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ result }) => result);
}
