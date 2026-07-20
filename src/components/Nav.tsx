"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e2d3d]/80 bg-[#0a0e14]/75 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-xs text-[#38bdf8] opacity-60 group-hover:opacity-100 transition-opacity">
            {">"}
          </span>
          <span className="font-semibold text-sm text-[#e8edf5] tracking-tight">
            Ryan Watts
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active}
                className={`nav-link text-sm ${
                  active ? "text-[#e8edf5]" : "text-[#8b98ac] hover:text-[#e8edf5]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded text-xs font-medium border border-[#38bdf830] text-[#38bdf8] hover:bg-[#38bdf810] hover:border-[#38bdf860] transition-all"
        >
          Get in touch
        </Link>

        <button
          className="md:hidden text-[#8b98ac] hover:text-[#e8edf5] transition-colors"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="md:hidden mobile-drawer border-t border-[#1e2d3d]" data-open={open}>
        <div className="bg-[#0a0e14]/95 px-6 py-4 flex flex-col gap-4">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  active ? "text-[#38bdf8]" : "text-[#8b98ac]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="text-sm text-[#38bdf8] border-t border-[#1e2d3d] pt-4"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}
