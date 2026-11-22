# Djgiovy Live Lounge

Agisci come un Senior Frontend Developer e UI/UX Designer. Crea una landing page moderna, reattiva (mobile-first) e ad alte prestazioni per un content creator e streamer.

### 1. Design e Stile Visivo
- **Tema:** Dark mode profonda e moderna.
- **Palette colori:** Sfondo principale nero antracite (`#090D0B` o `#0A0A0A`), card e superfici secondarie in grigio-verde molto scuro (`#121A16`) con bordi sottili semitrasparenti, testo principale bianco/grigio chiarissimo (`#F3F4F6`), testo secondario grigio (`#9CA3AF`), e colore d'accento principale verde smeraldo/neon (`#10B981` o `#22C55E`) con effetti glow (bagliore) discreti sugli elementi interattivi e al passaggio del mouse.
- **Tipografia:** Usa un font moderno e pulito (es. Inter o Plus Jakarta Sans) per i testi e un font leggermente più geometrico o tech (es. Space Grotesk o Outfit) per i titoli.

### 2. Struttura della Pagina (Single Page)
1. **Hero Section (Intestazione):**
  - Avatar circolare centrato con un bordo luminoso verde.
  - Nome/Nickname: **[DJGIOVY57]**
  - Breve bio di 1-2 righe: **[DA INSERIRE SUCCESSIVAMENTE]**
  - **Indicatore Stato Live (Dinamico/Simulato):** Un badge ben visibile vicino all'avatar o al nome. Se il canale è in live, mostra un pallino verde pulsante con scritto "LIVE ORA SU TWITCH" cliccabile; se offline, mostra "OFFLINE" in grigio. *(Nota tecnica: predisponi lo script JS con una variabile o una chiamata fetch strutturata per collegare facilmente le API di Twitch, includendo intanto un toggle o uno stato simulato ben stilizzato per testare entrambi gli stati).*

2. **Sezione Twitch (In Evidenza):**
- Una card principale dedicata a Twitch (`[https://www.twitch.tv/djgiovy57]`).
  - Integra l'embed ufficiale del player di Twitch (ricordati di impostare il parametro `parent` dinamico tramite JavaScript usando `window.location.hostname` così funziona su qualsiasi dominio).
  - Un pulsante principale (CTA) verde brillante per iscriversi/seguire il canale.

3. **Sezione Community & Social (Griglia a 2 colonne su desktop, 1 su mobile):**
- **Card Discord:** Dedicata al server Discord (`[https://discord.gg/yXrD3hq5Pv]`). Deve includere l'icona di Discord, una breve descrizione della community (es. "Entra nel server per giocare insieme, ricevere notifiche e partecipare agli eventi") e un pulsante d'azione in stile Discord/verde. *(Opzionale: aggiungi un widget o un contatore membri simulato/collegabile via API widget Discord).*
  - **Card X (Twitter):** Dedicata al profilo X/Twitter (`[https://twitter.com/DJGIOVY57]`). Deve includere l'icona di X, l'handle `@[DJGIOVY57]`, una breve descrizione (es. "Aggiornamenti quotidiani, clip e novità") e un pulsante per seguire.

4. **Footer:**
- Minimalista, con copyright e link rapidi alle tre piattaforme.

### 3. Requisiti Tecnici
- Usa HTML5 semantico, Tailwind CSS (via CDN se in un singolo file) e JavaScript vanilla pulito e ben commentato.
- Aggiungi micro-interazioni fluide (hover scale sulle card, transizioni morbide sui pulsanti).
- Assicurati che l'interfaccia sia perfettamente leggibile e bilanciata sia su smartphone che su monitor desktop.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://djgiovy-live-lounge.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4a1c3c08-198a-52ad-8639-d9bbf0f3884e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
