export function debugLog(
  location: string,
  message: string,
  data: Record<string, unknown>,
  hypothesisId: string,
  runId = "pre-fix",
) {
  // #region agent log
  fetch("http://127.0.0.1:7548/ingest/e9ae99ae-b5f2-4983-9ed2-bb168052d8f6", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "0e71b5",
    },
    body: JSON.stringify({
      sessionId: "0e71b5",
      runId,
      hypothesisId,
      location,
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}
