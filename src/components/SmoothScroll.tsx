"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { setActiveLenis } from "@/lib/smooth-scroll";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    const instance = new Lenis({
      autoRaf: true,
      anchors: {
        offset: 80,
      },
      lerp: 0.085,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      allowNestedScroll: true,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
      prevent: (node) =>
        Boolean(
          node.closest("[data-lenis-prevent]") ||
            node.closest(".platform-flow") ||
            node.closest('[role="dialog"]'),
        ),
    });

    lenisRef.current = instance;
    setActiveLenis(instance);

    return () => {
      instance.destroy();
      lenisRef.current = null;
      setActiveLenis(null);
    };
  }, []);

  useEffect(() => {
    if (prevPathnameRef.current === pathname) return;

    prevPathnameRef.current = pathname;
    lenisRef.current?.scrollTo(0, {
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });
  }, [pathname]);

  return children;
}
