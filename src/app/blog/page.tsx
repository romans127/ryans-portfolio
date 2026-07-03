import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

const tags = ["All", "AI Architecture", "Data Engineering", "LLMs", "Data Architecture"];

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <p className="text-xs font-mono text-[#38bdf8] uppercase tracking-widest">
          Writing
        </p>
        <h1 className="text-3xl font-bold text-[#e8edf5]">
          Thinking Out Loud
        </h1>
        <p className="text-[#8b98ac] text-sm max-w-xl leading-relaxed">
          Technical writing on AI architecture, data engineering, and building
          reliable systems in production. Written by someone who builds these
          things, not just talks about them.
        </p>
      </div>

      {/* Tag filters (static display) */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={tag}
            className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-all cursor-pointer ${
              i === 0
                ? "bg-[#38bdf8] text-[#0a0e14] border-transparent font-semibold"
                : "border-[#1e2d3d] text-[#8b98ac] hover:border-[#38bdf830] hover:text-[#38bdf8]"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="card-hover block p-6 rounded-lg border border-[#1e2d3d] bg-[#0f1520] group"
            style={{ animationDelay: `${i * 75}ms` }}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-mono text-[#38bdf8] bg-[#38bdf810] border border-[#38bdf820] px-2 py-0.5 rounded">
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#4a5568]">
                    <Clock size={11} />
                    {post.readTime} read
                  </div>
                  <span className="text-xs text-[#4a5568]">{post.date}</span>
                </div>
                <h2 className="text-base font-semibold text-[#e8edf5] group-hover:text-[#38bdf8] transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-[#8b98ac] leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <ArrowRight
                size={16}
                className="text-[#4a5568] group-hover:text-[#38bdf8] shrink-0 mt-1 transition-all group-hover:translate-x-0.5"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Newsletter prompt */}
      <div className="p-6 rounded-lg border border-[#1e2d3d] bg-[#0f1520] space-y-3">
        <p className="text-sm font-semibold text-[#e8edf5]">
          Want more writing like this?
        </p>
        <p className="text-sm text-[#8b98ac]">
          I occasionally write about AI architecture, data engineering, and
          building real systems. Reach out if you want to be notified when I
          publish.
        </p>
        <a
          href="mailto:ryandwatts@gmail.com?subject=Newsletter"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#38bdf8] text-[#0a0e14] rounded text-xs font-semibold hover:bg-[#7dd3fc] transition-colors"
        >
          Get notified
        </a>
      </div>
    </div>
  );
}
