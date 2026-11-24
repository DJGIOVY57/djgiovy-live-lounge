import { useState } from "react";
import { ArrowUpRight, Check, Copy, Heart, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { COMMUNITY, CREATOR } from "@/lib/site-config";

export function CommunityExtras() {
  const [copied, setCopied] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function copyCommand(command: string) {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(command);
      setError("");
    } catch {
      setError("Copia non disponibile: puoi selezionare il comando e copiarlo.");
    }
  }

  return (
    <section id="lounge-community" aria-labelledby="extras-title" className="px-5">
      <div className="mx-auto max-w-5xl">
        <h2 id="extras-title" className="text-center font-display text-3xl font-bold sm:text-4xl">Ci vediamo in chat</h2>
        {COMMUNITY.commands.length > 0 && (
          <div className="mt-8 border-y border-border py-6">
            <h3 className="flex items-center gap-2 text-xl font-semibold"><MessageSquare className="size-5 text-primary" /> Comandi Twitch</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {COMMUNITY.commands.map(({ command, description }) => (
                <div key={command} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="min-w-0"><code className="text-primary">{command}</code><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
                  <Button variant="ghost" size="icon" aria-label={`Copia ${command}`} title={`Copia ${command}`} onClick={() => copyCommand(command)}>{copied === command ? <Check /> : <Copy />}</Button>
                </div>
              ))}
            </div>
            <p role="status" className="mt-2 text-sm text-primary">{error || (copied ? `${copied} copiato` : "")}</p>
          </div>
        )}
        <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
          <div>
            <h3 className="mb-3 font-display text-xl font-semibold">Domande frequenti</h3>
            <Accordion type="single" collapsible>
              {COMMUNITY.faqs.map(({ question, answer, href, linkLabel }, index) => (
                <AccordionItem key={question} value={`faq-${index}`}>
                  <AccordionTrigger className="gap-4 py-5 text-base hover:text-primary hover:no-underline">{question}</AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    <p>{answer}</p>
                    {href && <Button asChild variant="link" className="mt-2 h-auto whitespace-normal px-0"><a href={href} target="_blank" rel="noopener noreferrer">{linkLabel}<ArrowUpRight /></a></Button>}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="flex flex-col items-start border-t border-primary/25 pt-6 md:border-t-0 md:border-l md:pl-10 md:pt-0">
            <Heart className="mb-4 size-7 text-primary" />
            <h3 className="font-display text-2xl font-bold">Supporta il canale</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Ogni presenza in chat fa la differenza. Se vuoi fare un passo in più, puoi abbonarti su Twitch.</p>
            <Button asChild variant="glow" size="lg" className="mt-6"><a href={CREATOR.links.twitchSubscribe} target="_blank" rel="noopener noreferrer">Abbonati su Twitch <ArrowUpRight /></a></Button>
          </div>
        </div>
      </div>
    </section>
  );
}