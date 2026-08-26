import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/posts";
import { profile } from "@/lib/site";

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

  const related = getAllPosts().filter((item) => item.slug !== slug).slice(0, 2);
  const paragraphs = post.content
    .trim()
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <div className="mx-auto max-w-3xl space-y-12 px-6 py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-stone hover:text-signal">
        <ArrowLeft size={14} /> All notes
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="skill-tag">{post.tag}</span>
          <span className="inline-flex items-center gap-1 text-xs text-dim">
            <Clock size={11} />
            {post.readTime}
          </span>
          <span className="text-xs text-dim">{post.date}</span>
        </div>
        <h1 className="display text-3xl text-cream md:text-5xl">{post.title}</h1>
        <p className="leading-relaxed text-stone">{post.excerpt}</p>
        <div className="flex items-center gap-3 border-t border-line pt-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-copper to-signal text-[10px] font-medium text-ink">
            {profile.initials}
          </div>
          <div>
            <p className="text-xs text-cream">{profile.name}</p>
            <p className="text-xs text-dim">
              {profile.currentRole}, {profile.currentCompany}
            </p>
          </div>
        </div>
      </header>

      <article className="space-y-4">
        {paragraphs.map((line, index) => {
          if (line.startsWith("## ")) {
            return (
              <h2 key={index} className="display mt-8 text-2xl text-cream">
                {line.replace("## ", "")}
              </h2>
            );
          }
          if (line.startsWith("**") && line.endsWith("**")) {
            return (
              <p key={index} className="text-sm font-medium text-cream">
                {line.replace(/\*\*/g, "")}
              </p>
            );
          }
          if (line.startsWith("- ")) {
            return (
              <div key={index} className="flex gap-3 text-sm text-stone">
                <span className="text-signal">▹</span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: line
                      .replace("- ", "")
                      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-cream">$1</strong>'),
                  }}
                />
              </div>
            );
          }
          return (
            <p
              key={index}
              className="text-sm leading-relaxed text-stone"
              dangerouslySetInnerHTML={{
                __html: line.replace(
                  /\*\*([^*]+)\*\*/g,
                  '<strong class="text-cream">$1</strong>',
                ),
              }}
            />
          );
        })}
      </article>

      <div className="panel flex items-start gap-4 rounded-2xl p-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-copper to-signal text-sm text-ink">
          {profile.initials}
        </div>
        <div className="space-y-1.5">
          <p className="text-sm text-cream">{profile.name}</p>
          <p className="text-xs leading-relaxed text-stone">{profile.lede}</p>
          <div className="flex gap-3 pt-1">
            <a href={profile.linkedin} className="text-xs text-signal" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} className="text-xs text-signal" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <div className="space-y-3">
          <p className="kicker">More writing</p>
          {related.map((item) => (
            <Link
              key={item.slug}
              href={`/blog/${item.slug}`}
              className="panel card-hover block rounded-2xl p-4"
            >
              <span className="font-mono text-[11px] text-copper">{item.tag}</span>
              <p className="mt-1 text-sm text-cream">{item.title}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
