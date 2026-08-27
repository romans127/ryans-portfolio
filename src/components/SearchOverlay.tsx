"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { searchPortfolio, type SearchResult } from "@/lib/search";
import { getLenis } from "@/lib/smooth-scroll";
import { debugLog } from "@/lib/debug-log";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const CATEGORY_STYLES: Record<SearchResult["category"], string> = {
  Project: "text-signal",
  Writing: "text-copper",
  Experience: "text-emerald-400",
};

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchPortfolio(query), [query]);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => {
        setQuery("");
        inputRef.current?.focus();
      }, 50);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    // #region agent log
    debugLog(
      "SearchOverlay.tsx:open",
      "Lenis stop on search open",
      { open: true, lenisStopped: getLenis()?.isStopped ?? null },
      "H2",
      "post-fix",
    );
    // #endregion

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
      // #region agent log
      debugLog(
        "SearchOverlay.tsx:cleanup",
        "Lenis start on search close",
        { open: false, lenisStopped: getLenis()?.isStopped ?? null },
        "H2",
        "post-fix",
      );
      // #endregion
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/80 px-4 pt-24 backdrop-blur-sm md:pt-32"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search portfolio"
    >
      <div
        className="panel w-full max-w-xl overflow-hidden rounded-2xl shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search size={18} className="shrink-0 text-dim" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search projects, writing, experience…"
            className="w-full bg-transparent text-sm text-cream placeholder:text-dim focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 text-dim transition-colors hover:text-cream"
            aria-label="Close search"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto" data-lenis-prevent>
          {query.trim() === "" ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-stone">
                Try “dbt”, “MCP”, “PrizePicks”, or “agentic”
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-stone">No results for “{query}”</p>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {results.map((result) => (
                <li key={result.id}>
                  <Link
                    href={result.href}
                    onClick={onClose}
                    className="group flex items-start gap-4 px-5 py-4 transition-colors hover:bg-raised/50"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[10px] uppercase tracking-wider ${CATEGORY_STYLES[result.category]}`}
                        >
                          {result.category}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-cream group-hover:text-signal">
                        {result.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-stone">
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="mt-1 shrink-0 text-dim transition-transform group-hover:translate-x-1 group-hover:text-signal"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-line px-5 py-2">
          <p className="font-mono text-[10px] text-dim">
            Press <kbd className="rounded border border-line px-1">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
