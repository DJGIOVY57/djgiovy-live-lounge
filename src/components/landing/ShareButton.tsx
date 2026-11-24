import { useHydrated } from "@tanstack/react-router";
import { Check, Copy, Download, QrCode, Share2 } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CREATOR } from "@/lib/site-config";

/** Reads a theme color so the QR (drawn on a canvas) follows the design tokens. */
function themeColor(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/**
 * "Condividi" button: a dialog with a scannable QR code of the site (handy at live events),
 * plus copy link, native share (phones) and QR download.
 */
export function ShareButton() {
  const hydrated = useHydrated();
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const url = hydrated ? `${window.location.origin}/` : "";
  const canShare = hydrated && typeof navigator.share === "function";

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const share = () =>
    navigator.share({ title: CREATOR.name, text: `Tutti i link di ${CREATOR.name}`, url }).catch(() => {});

  const download = () => {
    const canvas = wrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${CREATOR.handle.toLowerCase()}-qr.png`;
    a.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="surface" size="lg" className="rounded-full">
          <QrCode /> Condividi
        </Button>
      </DialogTrigger>
      <DialogContent className="surface-card max-w-sm border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Condividi il sito</DialogTitle>
          <DialogDescription>Inquadra il codice col telefono per aprire tutti i link.</DialogDescription>
        </DialogHeader>

        <div ref={wrapRef} className="mx-auto rounded-2xl bg-foreground p-4 shadow-glow">
          {url ? (
            <QRCodeCanvas
              value={url}
              size={512}
              level="H"
              marginSize={0}
              fgColor={themeColor("--background", "#090D0B")}
              bgColor={themeColor("--foreground", "#F3F4F6")}
              imageSettings={{ src: "/apple-touch-icon.png", height: 104, width: 104, excavate: true }}
              style={{ width: 224, height: 224 }}
            />
          ) : (
            <div className="size-56" />
          )}
        </div>

        <p className="truncate text-center text-sm text-muted-foreground">{url}</p>

        <div className="grid gap-2 sm:grid-cols-2">
          <Button variant="glow" onClick={copy}>
            {copied ? <Check /> : <Copy />} {copied ? "Copiato!" : "Copia link"}
          </Button>
          {canShare ? (
            <Button variant="surface" onClick={share}>
              <Share2 /> Condividi
            </Button>
          ) : (
            <Button variant="surface" onClick={download}>
              <Download /> Scarica QR
            </Button>
          )}
        </div>
        {canShare && (
          <Button variant="ghost" size="sm" onClick={download} className="mx-auto">
            <Download /> Scarica QR
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
