import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import Reveal from "@/components/Reveal";
import { profile } from "@/lib/site";

export default function Blog() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-16">
      <Reveal className="space-y-3">
        <p className="kicker">Writing</p>
        <h1 className="display text-4xl text-cream md:text-6xl">
          Notes from the control plane
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-stone md:text-lg">
          Agents, warehouses, and what holds up after the demo. Written from
          seats where I still take the ticket.
        </p>
      </Reveal>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delayMs={index * 40}>
            <Link
              href={`/blog/${post.slug}`}
              className="panel card-hover group block rounded-2xl p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="skill-tag">{post.tag}</span>
                    <span className="inline-flex items-center gap-1 text-sm text-dim">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                    <span className="text-sm text-dim">{post.date}</span>
                  </div>
                  <h2 className="text-xl text-cream group-hover:text-signal md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="text-base leading-relaxed text-stone md:text-lg">{post.excerpt}</p>
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
        <div className="panel space-y-3 rounded-2xl p-6 md:p-8">
          <p className="text-base text-cream md:text-lg">Want more of this?</p>
          <p className="text-base leading-relaxed text-stone">
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
