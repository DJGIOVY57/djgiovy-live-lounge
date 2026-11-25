import loungeCover from "@/assets/lounge-cover.jpg.asset.json";

export const SITE = {
  title: "DJGIOVY57's Lounge",
  url: "https://www.djgiovy57.it",
  description: "Il punto d'incontro di DJGIOVY57: live su Twitch, playlist Spotify, video su YouTube, community Discord e aggiornamenti su X, Instagram e TikTok. Più il progetto I migliori momenti di Twitch.",
  shareImage: `https://www.djgiovy57.it${loungeCover.url}`,
} as const;

/**
 * Single source of truth for the creator's public info.
 * Edit names, bio and links here — every section reads from this object.
 */
export const CREATOR = {
  name: "DJGIOVY57",
  handle: "DJGIOVY57",
  // TODO: bio definitiva da inserire (1–2 righe).
  bio: "Streamer Affiliato di Twitch e content creator",
  twitchChannel: "djgiovy57",
  discordInviteCode: "yXrD3hq5Pv",
  spotifyPlaylistId: "1vVSr9M4dADCIm5a8B0xYl",
  links: {
    twitch: "https://www.twitch.tv/djgiovy57",
    discord: "https://discord.gg/yXrD3hq5Pv",
    x: "https://twitter.com/DJGIOVY57",
    youtube: "https://www.youtube.com/channel/UCYm0aSvi4ca31-PHtWyzdCg?sub_confirmation=1",
    spotify: "https://open.spotify.com/playlist/1vVSr9M4dADCIm5a8B0xYl",
    instagram: "https://www.instagram.com/djgiovy57",
    tiktok: "https://www.tiktok.com/@djgiovy57",
    twitchClips: "https://www.twitch.tv/djgiovy57/clips?filter=clips&range=all",
    twitchSchedule: "https://www.twitch.tv/djgiovy57/schedule",
    twitchSubscribe: "https://www.twitch.tv/subs/djgiovy57",
  },
} as const;

export const COMMUNITY: {
  faqs: { question: string; answer: string; href?: string; linkLabel?: string }[];
} = {
  faqs: [
    {
      question: "Dove posso seguire le dirette?",
      answer: "Le dirette sono su Twitch. Quando sono online, trovi il player e l’avviso live anche qui nella Lounge.",
      href: CREATOR.links.twitch,
      linkLabel: "Vai al canale Twitch",
    },
    {
      question: "Come posso supportare il canale?",
      answer: "Puoi abbonarti su Twitch oppure esserci in live, partecipare alla chat e condividere il canale: anche la tua presenza conta.",
      href: CREATOR.links.twitchSubscribe,
      linkLabel: "Abbonati su Twitch",
    },
    {
      question: "Dove posso incontrare la community?",
      answer: "Sul server Discord della community: ci ritroviamo anche fuori dalle dirette.",
      href: CREATOR.links.discord,
      linkLabel: "Entra nel Gaming Hub",
    },
    {
      question: "Cos’è I migliori momenti di Twitch?",
      answer: "È il progetto di cui sono founder, dedicato ai momenti di Twitch. La pagina principale è su TikTok, con profili anche su Instagram, YouTube e Twitter.",
      href: "https://www.tiktok.com/@imigliorimomentiditwitch",
      linkLabel: "Scopri il progetto su TikTok",
    },
  ],
};

/**
 * Gaming Hub: the Discord server founded by the creator.
 * Dedicated voice rooms per game, plus the "and many more" hint.
 */
export const DISCORD = {
  name: "GAMING HUB",
  role: "Founder",
  games: ["GTA", "FIFA", "Fortnite", "Minecraft", "Rainbow Six Siege"],
  gamesTail: "e tanti altri",
} as const;

/** "I migliori momenti di Twitch" — separate project founded by the creator (yellow accent). */
export const MOMENTI = {
  name: "I migliori momenti di Twitch",
  handle: "imigliorimomentiditwitch",
  xHandle: "MOMENTIDITWITCH",
  links: {
    tiktok: "https://www.tiktok.com/@imigliorimomentiditwitch",
    instagram: "https://instagram.com/imigliorimomentiditwitch",
    youtube: "https://www.youtube.com/channel/UCt8e66zPggfsQrDPxPpBJUg?sub_confirmation=1",
    x: "https://twitter.com/MOMENTIDITWITCH",
  },
} as const;

/** Stable ecosystem facts: the "Qualche info" tiles and the "I due progetti" comparison both read from here. */
export const ECOSYSTEM = {
  startYear: 2021,
  platforms: ["Twitch", "YouTube", "Discord", "TikTok", "Spotify", "Instagram", "Twitter/X"],
  projects: [
    {
      name: DISCORD.name,
      founded: "2021-11",
      foundedLabel: "Novembre 2021",
      description: "Un posto dove incontrarsi, trovare compagni di squadra e giocare insieme.",
      to: "/gaming-hub",
      highlight: false,
    },
    {
      name: MOMENTI.name,
      founded: "2022-03",
      foundedLabel: "Marzo 2022",
      description: "Le clip più belle nate in live, raccolte e condivise con la community.",
      to: "/momenti",
      highlight: true,
    },
  ],
} as const;

