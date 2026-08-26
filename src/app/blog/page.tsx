import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/site";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
      <Reveal className="space-y-3">
        <p className="kicker">Writing</p>
        <h1 className="display text-4xl text-cream md:text-6xl">
          Notes from the control plane
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-stone">
          Agents, warehouses, and what holds up after the demo. Written from
          seats where I still take the ticket.
        </p>
      </Reveal>

      <div className="space-y-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delayMs={index * 40}>
            <Link
              href={`/blog/${post.slug}`}
              className="panel card-hover group block rounded-2xl p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="skill-tag">{post.tag}</span>
                    <span className="inline-flex items-center gap-1 text-xs text-dim">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                    <span className="text-xs text-dim">{post.date}</span>
                  </div>
                  <h2 className="text-lg text-cream group-hover:text-signal">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-stone">{post.excerpt}</p>
                </div>
                <ArrowRight
                  size={16}
                  className="mt-1 shrink-0 text-dim group-hover:translate-x-0.5 group-hover:text-signal"
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="panel space-y-3 rounded-2xl p-6">
          <p className="text-sm text-cream">Want more of this?</p>
          <p className="text-sm text-stone">
            Reach out if you want a note when I publish. I do not run a list.
          </p>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm text-signal"
          >
            LinkedIn
          </a>
        </div>
      </Reveal>
    </div>
  );
}
