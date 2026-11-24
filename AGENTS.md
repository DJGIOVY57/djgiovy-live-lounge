<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Community FAQ and secret-message copy live in site-config; browser-only share/copy and avatar interactions remain client event handlers to avoid server dependencies.
- Creator info and links live only in `src/lib/site-config.ts`; components read from it so copy changes are one-file edits.
- External status data (Twitch live/avatar/followers/title/category, Discord counts) is fetched in the `getChannelStatus` server function, never from the browser — avoids CORS and keeps future API keys server-side.
- Mount the live notification only during a live session; dismissal is component-local so a subsequent live can show it again without persistent visitor tracking.
- The Home share cover uses a CDN asset pointer configured in site-config, with absolute image tags only in the leaf head and a 1200×630 compressed rendition for messaging previews.
- Twitch clips and schedule come from the `getTwitchExtras` server function (Twitch public web endpoint, no key); it returns empty lists on failure so sections hide instead of breaking. Both sections are currently unmounted from the index route (kept for future re-enable). Schedule/countdown/clip-title logic stays pure in `src/lib/schedule.ts` (tested), with times shown in Europe/Rome so SSR and browser match.
- Live-indicator logic stays pure in `src/lib/live-status.ts` (covered by tests); the test toggle only shows in dev or with `?test` in the URL.
- Router uses `setupRouterSsrQueryIntegration` so loader-fetched query data is dehydrated to the client — without it the client refetches and SSR/hydration mismatch.
- Side scroll dock (`ScrollDock`) and scroll-reveal (`ScrollReveal`) are mounted once in the index route; reveal classes are added by JS only so content stays visible without it, and removed after animating so hover transitions keep working.
- Release history lives newest-first in `src/lib/changelog-data.ts`; the floating badge and `/changelog` read the same current release so version labels cannot drift.
- Historical milestones live newest-first in `src/lib/timeline-data.ts` and render on `/timeline`, separate from release notes so site history never changes the current version.
- The "I migliori momenti di Twitch" project keeps its own history newest-first in `src/lib/momenti-timeline-data.ts` and renders as a second, yellow `highlight` block on `/timeline` beside the creator's emerald one, so the two stories stay visually separate and never mix with release notes.
