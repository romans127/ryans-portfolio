import Link from "next/link";
import { profile } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-line/80 bg-ink/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium text-cream">{profile.name}</p>
          <p className="mt-1 text-xs text-stone">{profile.title}</p>
        </div>

        <div className="flex items-center gap-5 text-xs text-dim">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-signal"
          >
            LinkedIn
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-signal"
          >
            GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-signal">
            Email
          </a>
          <Link href="/contact" className="hover:text-signal">
            Contact
          </Link>
        </div>

        <p className="text-xs text-dim">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
