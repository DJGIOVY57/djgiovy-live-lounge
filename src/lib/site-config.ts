import loungeCover from "@/assets/lounge-cover.jpg.asset.json";

export const SITE = {
  title: "DJGIOVY57's Lounge",
  url: "https://djgiovy-live-lounge.lovable.app",
  description: "Il punto d'incontro di DJGIOVY57: live su Twitch, playlist Spotify, video su YouTube, community Discord e aggiornamenti su X, Instagram e TikTok. Più il progetto I migliori momenti di Twitch.",
  shareImage: `https://djgiovy-live-lounge.lovable.app${loungeCover.url}`,
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
  },
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

