import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { SITE } from "@/lib/site-config";

export function ShareButton() {
  const [status, setStatus] = useState("");
  const [manual, setManual] = useState(false);
  const [busy, setBusy] = useState(false);

  async function share() {
    setBusy(true);
    setStatus("");
    try {
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ title: SITE.title, url: SITE.url });
          setStatus("Condivisione completata");
          return;
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") return;
        }
      }
      try {
        await navigator.clipboard.writeText(SITE.url);
        setStatus("Link copiato negli appunti!");
      } catch {
        setManual(true);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative">
      <Button variant="surface" size="lg" onClick={share} disabled={busy}>
        {status ? <Check /> : <Share2 />} Condividi Lounge
      </Button>
      <p role="status" className="absolute top-full mt-2 w-full text-center text-xs text-primary">{status}</p>
      <Dialog open={manual} onOpenChange={setManual}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-lg">
          <DialogTitle>Condividi Lounge</DialogTitle>
          <DialogDescription>Il link della Lounge</DialogDescription>
          <input aria-label="Link della Lounge" value={SITE.url} readOnly onFocus={(event) => event.currentTarget.select()} className="w-full rounded-md border border-input bg-card p-3 text-sm text-foreground" />
        </DialogContent>
      </Dialog>
    </div>
  );
}