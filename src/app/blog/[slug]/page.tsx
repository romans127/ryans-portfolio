import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getPost, getAllPosts } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const paragraphs = post.content
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 space-y-12">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-[#8b98ac] hover:text-[#38bdf8] transition-colors"
      >
        <ArrowLeft size={14} /> All posts
      </Link>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#38bdf8] bg-[#38bdf810] border border-[#38bdf820] px-2.5 py-1 rounded">
            <Tag size={10} />
            {post.tag}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-[#4a5568]">
            <Clock size={11} />
            {post.readTime} read
          </div>
          <span className="text-xs text-[#4a5568]">{post.date}</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#e8edf5] leading-tight">
          {post.title}
        </h1>
        <p className="text-[#8b98ac] leading-relaxed">{post.excerpt}</p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-2 border-t border-[#1e2d3d]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#818cf8] flex items-center justify-center text-xs font-bold text-[#0a0e14]">
            RW
          </div>
          <div>
            <p className="text-xs font-medium text-[#e8edf5]">Ryan Watts</p>
            <p className="text-xs text-[#4a5568]">
              Principal AI & Data Engineer
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="space-y-4">
        {paragraphs.map((line, i) => {
          if (line.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="text-lg font-bold text-[#e8edf5] mt-8 mb-2"
              >
                {line.replace("## ", "")}
              </h2>
            );
          }
          if (line.startsWith("**") && line.endsWith("**")) {
            return (
              <p key={i} className="font-semibold text-[#e8edf5] text-sm">
                {line.replace(/\*\*/g, "")}
              </p>
            );
          }
          if (line.startsWith("- ")) {
            return (
              <div key={i} className="flex gap-3 text-sm text-[#8b98ac]">
                <span className="text-[#38bdf8] shrink-0 mt-0.5">·</span>
                <span
                  className="leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: line
                      .replace("- ", "")
                      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-[#e8edf5]">$1</strong>'),
                  }}
                />
              </div>
            );
          }
          return (
            <p
              key={i}
              className="text-sm text-[#8b98ac] leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: line.replace(
                  /\*\*([^*]+)\*\*/g,
                  '<strong class="text-[#e8edf5]">$1</strong>'
                ),
              }}
            />
          );
        })}
      </article>

      {/* Author card */}
      <div className="p-6 rounded-lg border border-[#1e2d3d] bg-[#0f1520] flex gap-4 items-start">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#818cf8] flex items-center justify-center text-sm font-bold text-[#0a0e14] shrink-0">
          RW
        </div>
        <div className="space-y-1.5">
          <p className="font-semibold text-[#e8edf5] text-sm">Ryan Watts</p>
          <p className="text-xs text-[#8b98ac] leading-relaxed">
            Principal AI & Data Engineer with 15+ years building enterprise
            systems. Head of AI at DVx Ventures, Staff Data Engineer at Cork,
            and independent consultant.
          </p>
          <div className="flex gap-3 pt-1">
            <a
              href="https://linkedin.com/in/ryandwatts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/romans127"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#38bdf8] hover:text-[#7dd3fc] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-[#8b98ac] uppercase tracking-widest">
            More writing
          </h3>
          <div className="space-y-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card-hover block p-4 rounded-lg border border-[#1e2d3d] bg-[#0f1520] group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-[#38bdf8]">
                      {p.tag}
                    </span>
                    <p className="text-sm font-medium text-[#e8edf5] group-hover:text-[#38bdf8] transition-colors">
                      {p.title}
                    </p>
                  </div>
                  <ArrowLeft
                    size={14}
                    className="text-[#4a5568] group-hover:text-[#38bdf8] rotate-180 shrink-0 mt-0.5 transition-colors"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
