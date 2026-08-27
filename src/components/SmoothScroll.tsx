"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { debugLog } from "@/lib/debug-log";
import { setActiveLenis } from "@/lib/smooth-scroll";
import { isSafariBrowser, shouldUseLenisSmoothScroll } from "@/lib/scroll-capabilities";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const prevPathnameRef = useRef(pathname);
  const lenisEnabledRef = useRef(false);

  useEffect(() => {
    const useLenis = shouldUseLenisSmoothScroll();
    lenisEnabledRef.current = useLenis;

    if (!useLenis) {
      // #region agent log
      debugLog(
        "SmoothScroll.tsx:skip",
        "Native scroll — Lenis disabled",
        {
          safari: isSafariBrowser(),
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        },
        "H7",
        "post-fix",
      );
      // #endregion
      return;
    }

    let scrollSamples = 0;
    let preventBlocks = 0;
    let preventLogged = 0;

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
      prevent: (node) => {
        const blocked = Boolean(
          node.closest("[data-lenis-prevent]") ||
            node.closest(".platform-flow") ||
            node.closest('[role="dialog"]'),
        );
        if (blocked) {
          preventBlocks += 1;
          if (preventLogged < 8) {
            preventLogged += 1;
            debugLog(
              "SmoothScroll.tsx:prevent",
              "Lenis prevent blocked wheel target",
              {
                tag: node.tagName,
                className: node.className?.toString?.().slice(0, 80) ?? "",
                preventBlocks,
              },
              "H6",
              "post-fix",
            );
          }
        }
        return blocked;
      },
    });

    lenisRef.current = instance;
    setActiveLenis(instance);

    // #region agent log
    debugLog(
      "SmoothScroll.tsx:init",
      "Lenis instance created",
      { instanceId: Date.now(), autoRaf: true, lerp: 0.085 },
      "H1",
      "post-fix",
    );

    instance.on("scroll", () => {
      scrollSamples += 1;
      if (scrollSamples % 25 !== 0) return;
      debugLog(
        "SmoothScroll.tsx:scroll",
        "Lenis scroll sample",
        {
          scroll: instance.scroll,
          velocity: instance.velocity,
          isStopped: instance.isStopped,
          isScrolling: instance.isScrolling,
          scrollSamples,
          preventBlocks,
        },
        "H4",
        "post-fix",
      );
    });
    // #endregion

    return () => {
      // #region agent log
      debugLog(
        "SmoothScroll.tsx:destroy",
        "Lenis instance destroyed",
        { scrollSamples, preventBlocks },
        "H1",
        "post-fix",
      );
      // #endregion
      instance.destroy();
      lenisRef.current = null;
      setActiveLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenisEnabledRef.current) return;
    if (prevPathnameRef.current === pathname) return;

    const fromPath = prevPathnameRef.current;
    prevPathnameRef.current = pathname;
    // #region agent log
    debugLog(
      "SmoothScroll.tsx:pathname",
      "Route change scrollTo(0)",
      { pathname, from: fromPath },
      "H3",
      "post-fix",
    );
    // #endregion
    lenisRef.current?.scrollTo(0, {
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    });
  }, [pathname]);

  return children;
}
