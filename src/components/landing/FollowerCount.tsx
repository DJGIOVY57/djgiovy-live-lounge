import { Users } from "lucide-react";

/**
 * Follower counter shown on the social cards: just the number, like on Twitch.
 * `tone` matches the section accent: emerald for the creator, yellow for "I migliori momenti".
 */
export function FollowerCount({
  count,
  tone = "primary",
}: {
  count: number;
  tone?: "primary" | "highlight";
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
      <Users className={tone === "highlight" ? "size-4 text-highlight" : "size-4 text-primary"} />
      <span className="font-semibold text-foreground">{count.toLocaleString("it-IT")}</span>
    </span>
  );
}
