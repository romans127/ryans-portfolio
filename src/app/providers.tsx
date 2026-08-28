"use client";

import { PostHogProvider } from "posthog-js/react";
import posthog from "posthog-js";
import { useEffect } from "react";

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      return;
    }

    // Prefer /ph reverse proxy (next.config rewrites) to reduce ad-blocker drops
    const apiHost =
      process.env.NEXT_PUBLIC_POSTHOG_API_HOST ??
      process.env.NEXT_PUBLIC_POSTHOG_HOST ??
      "https://us.i.posthog.com";

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: apiHost,
      ui_host: "https://us.posthog.com",
      person_profiles: "identified_only",
      // history_change covers App Router client navigations (defaults 2026-01-30)
      capture_pageview: "history_change",
      capture_pageleave: true,
      defaults: "2026-01-30",
      loaded: (ph) => {
        ph.register({ app: "ryans-portfolio" });
        if (process.env.NODE_ENV === "development") ph.debug();
      },
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
