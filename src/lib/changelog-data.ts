/** Newest first. Record actual shipped changes, never planned features. */
export const RELEASES = [
  {
    version: "2.0",
    stage: "ALPHA",
    date: "2026-11-23",
    title: "La Lounge prende forma",
    groups: [
      {
        label: "Novità",
        items: [
          "Pagina Changelog con note di rilascio, accessibile dal badge ALPHA e dal footer.",
          "Navigazione laterale con frecce e indicatore di avanzamento della pagina.",
          "Playlist Spotify e collegamenti ai social e alla community Discord.",
        ],
      },
      {
        label: "Design & UI",
        items: [
          "Tema scuro con accenti verde smeraldo ed effetti neon.",
          "Comparsa progressiva delle card durante lo scorrimento.",
          "Puntatore personalizzato su computer, con contrasto sui pulsanti pieni.",
        ],
      },
      {
        label: "Migliorie & fix",
        items: [
          "Stato live e numero di follower Twitch aggiornati automaticamente, insieme ai contatori Discord.",
        ],
      },
    ],
  },
] as const;

export const CURRENT_RELEASE = RELEASES[0];
