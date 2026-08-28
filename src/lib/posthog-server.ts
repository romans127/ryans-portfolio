import { PostHog } from "posthog-node";

/**
 * Server-side PostHog client for API routes and server actions.
 * Prefer POSTHOG_API_KEY; falls back to NEXT_PUBLIC_POSTHOG_KEY.
 * Always call shutdown() when done to flush events in serverless.
 */
export function getPostHogClient() {
  const apiKey =
    process.env.POSTHOG_API_KEY ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host =
    process.env.POSTHOG_HOST ??
    process.env.NEXT_PUBLIC_POSTHOG_HOST ??
    "https://us.i.posthog.com";

  if (!apiKey) {
    return null;
  }

  return new PostHog(apiKey, {
    host,
    flushAt: 1,
    flushInterval: 0,
  });
}
