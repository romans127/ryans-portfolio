import Link from "next/link";
import { GitBranch, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e2d3d]/80 bg-[#0a0e14]/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-[#e8edf5]">Ryan Watts</p>
          <p className="text-xs text-[#8b98ac] mt-1">
            Principal AI & Data Engineer
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://linkedin.com/in/ryandwatts"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4a5568] hover:text-[#38bdf8] transition-colors"
            aria-label="LinkedIn"
          >
            <ExternalLink size={18} />
          </a>
          <a
            href="https://github.com/romans127"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#4a5568] hover:text-[#38bdf8] transition-colors"
            aria-label="GitHub"
          >
            <GitBranch size={18} />
          </a>
          <Link
            href="/contact"
            className="text-xs font-mono text-[#4a5568] hover:text-[#38bdf8] transition-colors"
          >
            Contact
          </Link>
        </div>

        <p className="text-xs text-[#4a5568]">
          © {new Date().getFullYear()} Ryan Watts. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
