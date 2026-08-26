"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import SearchOverlay from "@/components/SearchOverlay";
import { navLinks, profile } from "@/lib/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-copper/40 bg-copper/10 font-mono text-[10px] text-copper">
              {profile.initials}
            </span>
            <span className="text-sm font-medium tracking-tight text-cream">
              {profile.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={active}
                  className={`nav-link ${active ? "text-cream" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-stone transition-colors hover:border-signal/30 hover:text-cream"
              aria-label="Search portfolio"
            >
              <Search size={14} />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden rounded border border-line px-1 font-mono text-[10px] text-dim lg:inline">
                ⌘K
              </kbd>
            </button>
            <Link
              href="/contact"
              className="rounded-full border border-signal/30 px-4 py-1.5 text-xs text-signal transition-colors hover:bg-signal/10"
            >
              Get in touch
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-stone transition-colors hover:text-cream"
              aria-label="Search portfolio"
            >
              <Search size={20} />
            </button>
            <button
              className="text-stone transition-colors hover:text-cream"
              onClick={() => setOpen((value) => !value)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className="mobile-drawer border-t border-line md:hidden" data-open={open}>
          <div className="flex flex-col gap-4 bg-ink/95 px-6 py-4">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm ${active ? "text-signal" : "text-stone"}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/contact" className="border-t border-line pt-4 text-sm text-signal">
              Get in touch
            </Link>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
