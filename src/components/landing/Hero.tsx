import { CREATOR } from "@/lib/site-config";
import { cn } from "@/lib/utils";

import { Equalizer } from "./Equalizer";
import { LiveBadge } from "./LiveBadge";
import { Particles } from "./Particles";
import { ShareButton } from "./ShareButton";

export function Hero({ live, avatarUrl }: { live: boolean; avatarUrl: string | null }) {
  return (
    <header className="relative overflow-hidden px-5 pt-20 pb-14 sm:pt-28 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden />
      <Particles />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Avatar with glowing ring — the ring pulses harder while live */}
        <div className="animate-fade-up">
          <div
            className={cn(
              "relative size-32 rounded-full p-1 sm:size-40",
              live ? "animate-ring-glow" : "shadow-glow",
            )}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`Avatar di ${CREATOR.name}`}
                width={160}
                height={160}
                className="size-full rounded-full bg-card object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center rounded-full bg-card font-display text-4xl font-bold text-gradient-primary">
                DJ
              </div>
            )}
          </div>
        </div>

        <div className="mt-7 animate-fade-up [animation-delay:120ms]">
          <LiveBadge live={live} />
        </div>

        <h1 className="mt-6 animate-fade-up font-display text-5xl font-bold text-foreground [animation-delay:200ms] sm:text-7xl">
          {CREATOR.name}
        </h1>

        <p className="mt-4 max-w-md animate-fade-up text-base leading-relaxed text-muted-foreground [animation-delay:280ms] sm:text-lg">
          {CREATOR.bio}
        </p>

        <Equalizer live={live} className="mt-8 animate-fade-up [animation-delay:340ms]" />

        <div className="mt-8 animate-fade-up [animation-delay:400ms]">
          <ShareButton />
        </div>
      </div>
    </header>
  );
}
