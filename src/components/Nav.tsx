"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e2d3d] bg-[#0a0e14]/90 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-mono text-xs text-[#38bdf8] opacity-60 group-hover:opacity-100 transition-opacity">
            {">"}
          </span>
          <span className="font-semibold text-sm text-[#e8edf5] tracking-tight">
            Ryan Watts
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-sm ${
                pathname === link.href
                  ? "text-[#e8edf5]"
                  : "text-[#8b98ac] hover:text-[#e8edf5]"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span
                  className="absolute bottom-[-2px] left-0 right-0 h-[1px] bg-[#38bdf8]"
                  style={{ transform: "scaleX(1)" }}
                />
              )}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:ryandwatts@gmail.com"
          className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded text-xs font-medium border border-[#38bdf830] text-[#38bdf8] hover:bg-[#38bdf810] transition-all"
        >
          Get in touch
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#8b98ac] hover:text-[#e8edf5]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-[#1e2d3d] bg-[#0a0e14] px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm ${
                pathname === link.href
                  ? "text-[#38bdf8]"
                  : "text-[#8b98ac]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="mailto:ryandwatts@gmail.com"
            className="text-sm text-[#38bdf8] border-t border-[#1e2d3d] pt-4"
          >
            ryandwatts@gmail.com
          </a>
        </div>
      )}
    </header>
  );
}
