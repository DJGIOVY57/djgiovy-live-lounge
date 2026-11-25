import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Heart } from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { COMMUNITY, CREATOR, ECOSYSTEM } from "@/lib/site-config";

import { DiscordIcon, TikTokIcon } from "./BrandIcons";

/** FAQ + support block, followed by the side-by-side presentation of the two projects. */
export function CommunityExtras() {
  return (
    <div className="space-y-16 px-5 sm:space-y-20">
      <section id="lounge-community" aria-labelledby="extras-title" className="mx-auto max-w-5xl">
        <h2 id="extras-title" className="text-center font-display text-3xl font-bold sm:text-4xl">Ci vediamo in chat</h2>
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
      </section>

      <section aria-labelledby="projects-title" className="mx-auto max-w-5xl">
        <header className="mb-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Due progetti · Un unico founder</p>
          <h2 id="projects-title" className="font-display text-2xl font-bold text-foreground sm:text-3xl">I due progetti</h2>
        </header>
        <div className="grid overflow-hidden rounded-2xl border border-border md:grid-cols-2">
          {ECOSYSTEM.projects.map((project) => {
            const Icon = project.highlight ? TikTokIcon : DiscordIcon;
            return (
              <article key={project.to} data-cursor-highlight={project.highlight || undefined} className={`flex min-w-0 flex-col p-6 sm:p-8 ${project.highlight ? "border-t border-border bg-highlight-radial md:border-l md:border-t-0" : "bg-primary-radial"}`}>
                <div className="mb-6 flex items-center gap-3">
                  <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 ${project.highlight ? "bg-highlight/15 text-highlight ring-highlight/30 shadow-glow-highlight" : "bg-primary/15 text-primary ring-primary/30 shadow-glow"}`}>
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <p className={`text-sm font-semibold ${project.highlight ? "text-highlight" : "text-primary"}`}>
                    Dal <time dateTime={project.founded}>{project.foundedLabel.toLowerCase()}</time>
                  </p>
                </div>
                <h3 className={`font-display text-2xl font-bold leading-tight ${project.highlight ? "text-gradient-highlight" : "text-gradient-primary"}`}>{project.name}</h3>
                <p className="mb-7 mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                <Button asChild variant={project.highlight ? "glow-highlight" : "glow"} className="mt-auto w-full sm:w-fit">
                  <Link to={project.to}>Scopri il progetto <ArrowRight aria-hidden="true" /></Link>
                </Button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
