import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { COMMUNITY, CREATOR } from "@/lib/site-config";
import { advanceSecretTap } from "@/lib/community-interactions";
import { cn } from "@/lib/utils";

import { LiveBadge } from "./LiveBadge";
import { ShareButton } from "./ShareButton";

export function Hero({ live, avatarUrl }: { live: boolean; avatarUrl: string | null }) {
  const taps = useRef({ count: 0, at: 0 });
  const [secretOpen, setSecretOpen] = useState(false);

  function tapAvatar() {
    const result = advanceSecretTap(taps.current, Date.now());
    taps.current = result;
    if (result.unlocked) setSecretOpen(true);
  }

  return (
    <header className="relative overflow-hidden px-5 pt-20 pb-14 sm:pt-28 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-grid" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        {/* Avatar with glowing ring — the ring pulses harder while live */}
        <div className="animate-fade-up">
          <Button
            variant="ghost"
            aria-label={`Avatar di ${CREATOR.name}`}
            onClick={tapAvatar}
            className={cn(
              "relative size-32 shrink-0 rounded-full p-1 hover:bg-transparent sm:size-40",
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
                <div className="flex size-full items-center justify-center rounded-full bg-card font-display text-base font-bold text-gradient-primary">
                {CREATOR.name}
              </div>
            )}
          </Button>
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
        <div className="mt-7 pb-5"><ShareButton /></div>
      </div>
      <Dialog open={secretOpen} onOpenChange={setSecretOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] border-primary/50 shadow-glow sm:max-w-lg">
          <Sparkles aria-hidden className="mx-auto size-12 text-primary motion-safe:animate-pulse" />
          <DialogTitle className="text-center text-2xl text-primary">{COMMUNITY.secretTitle}</DialogTitle>
          <DialogDescription className="text-center text-base leading-relaxed">{COMMUNITY.secretMessage}</DialogDescription>
          <Button variant="surface" onClick={() => setSecretOpen(false)}>💚 Sempre qui</Button>
        </DialogContent>
      </Dialog>
    </header>
  );
}
