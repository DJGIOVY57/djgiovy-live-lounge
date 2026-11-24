import { CalendarDays, Clock, ExternalLink, Radio } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useNow } from "@/hooks/use-now";
import {
  countdownParts,
  formatDay,
  formatTime,
  nextSegment,
  relativeDayLabel,
  upcomingSegments,
  type ScheduleSegment,
} from "@/lib/schedule";
import { CREATOR } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function Digit({ value, label }: { value: number | null; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[2ch] rounded-xl border border-primary/30 bg-background/60 px-2 py-2 font-display text-3xl font-bold tabular-nums text-gradient-primary shadow-glow sm:px-3 sm:text-5xl">
        {value === null ? "--" : String(value).padStart(2, "0")}
      </span>
      <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function Countdown({
  segments,
  live,
  now,
}: {
  segments: ScheduleSegment[];
  live: boolean;
  now: number | null;
}) {
  const next = now !== null ? nextSegment(segments, now) : null;

  if (live || next?.status === "ongoing") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="relative flex size-4">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary-glow opacity-70" />
          <span className="relative inline-flex size-4 rounded-full bg-primary-glow" />
        </span>
        <p className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          {live ? "Sono in live adesso!" : "La live dovrebbe essere iniziata"}
        </p>
        <Button asChild variant="glow" size="xl">
          <a href={CREATOR.links.twitch} target="_blank" rel="noopener noreferrer">
            <Radio /> Entra in live
          </a>
        </Button>
      </div>
    );
  }

  const parts = next ? countdownParts(Date.parse(next.segment.startAt), now ?? 0) : null;
  return (
    <div className="text-center">
      {next && (
        <p className="mb-5 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{next.segment.title}</span>
          {" · "}
          <span className="capitalize">{formatDay(next.segment.startAt)}</span> alle{" "}
          {formatTime(next.segment.startAt)}
        </p>
      )}
      <div className="flex items-start justify-center gap-2 sm:gap-4">
        <Digit value={parts?.days ?? null} label="giorni" />
        <Digit value={parts?.hours ?? null} label="ore" />
        <Digit value={parts?.minutes ?? null} label="min" />
        <Digit value={parts?.seconds ?? null} label="sec" />
      </div>
    </div>
  );
}

/**
 * Next live countdown + upcoming schedule, read from the channel's Twitch schedule
 * (updates automatically when the creator edits it on Twitch). Times in Italian time.
 */
export function ScheduleSection({
  segments,
  checkedAt,
  live,
}: {
  segments: ScheduleSegment[];
  checkedAt: string;
  live: boolean;
}) {
  const now = useNow();
  // Before hydration, use the server's fetch time so both renders match.
  const ref = now ?? Date.parse(checkedAt);
  const upcoming = upcomingSegments(segments, ref).slice(0, 7);
  const hasSchedule = upcoming.length > 0;

  return (
    <section id="programmazione" aria-labelledby="schedule-title" className="px-5">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Programmazione
          </p>
          <h2
            id="schedule-title"
            className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl"
          >
            Prossime live
          </h2>
        </div>

        <div className={cn("grid gap-5", hasSchedule && "lg:grid-cols-[1.1fr_1fr]")}>
          <div className="surface-card flex flex-col justify-center p-6 sm:p-8">
            <p className="mb-5 flex items-center justify-center gap-2 font-display text-sm font-bold uppercase tracking-[0.18em] text-primary">
              <Clock className="size-4" /> Countdown
            </p>
            {hasSchedule || live ? (
              <Countdown segments={segments} live={live} now={now} />
            ) : (
              <p className="text-center text-muted-foreground">
                Nessuna live in programma al momento: segui il canale per ricevere la notifica.
              </p>
            )}
          </div>

          {hasSchedule && (
            <div className="surface-card p-4 sm:p-6">
              <ul className="divide-y divide-border">
                {upcoming.map((s) => {
                  const rel = now !== null ? relativeDayLabel(s.startAt, now) : null;
                  return (
                    <li
                      key={s.startAt}
                      className={cn(
                        "flex items-center gap-4 rounded-xl px-3 py-3",
                        rel === "Oggi" && "bg-primary/10",
                      )}
                    >
                      <CalendarDays className="size-5 shrink-0 text-primary" />
                      <div className="min-w-0 flex-1">
                        <p className="flex items-center gap-2 text-sm font-semibold capitalize text-foreground">
                          {formatDay(s.startAt)}
                          {rel && (
                            <span
                              className={cn(
                                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider normal-case",
                                rel === "Oggi"
                                  ? "bg-gradient-primary text-primary-foreground shadow-glow"
                                  : "border border-primary/40 text-primary",
                              )}
                            >
                              {rel}
                            </span>
                          )}
                        </p>
                        <p className="truncate text-sm text-muted-foreground">
                          {s.title}
                          {s.category ? ` · ${s.category}` : ""}
                        </p>
                      </div>
                      <span className="font-display text-sm font-bold tabular-nums text-foreground">
                        {formatTime(s.startAt)}–{formatTime(s.endAt)}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-3 flex items-center justify-between gap-3 px-3 text-xs text-muted-foreground">
                <span>Orari in ora italiana</span>
                <a
                  href={CREATOR.links.twitchSchedule}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                >
                  Calendario completo <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
