import { useEffect, useState } from "react";

/**
 * Current time, ticking every `intervalMs`. Null until hydration, so time-dependent
 * text is never rendered on the server (avoids hydration mismatches).
 */
export function useNow(intervalMs = 1000): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);
  return now;
}
