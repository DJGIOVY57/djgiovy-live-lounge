import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({ useHydrated: () => false }));

import { TwitchSection } from "./TwitchSection";

function bar() {
  const el = screen.getByRole("progressbar", { name: "Traguardo follower" });
  return { el, fill: el.firstElementChild as HTMLElement };
}

// Rendered at desktop and phone widths: the bar must keep the same goal and fill.
describe.each([
  ["desktop", 1280],
  ["telefono", 390],
])("Road to follower bar (%s)", (_label, width) => {
  it("shows Road to 200 at 88% with 176 followers", () => {
    window.innerWidth = width;
    render(<TwitchSection live={false} uptime={null} followers={176} />);
    expect(screen.getByText("Road to 200 follower")).toBeTruthy();
    expect(screen.getByText("88%")).toBeTruthy();
    expect(bar().el.getAttribute("aria-valuemax")).toBe("200");
    expect(bar().fill.style.width).toBe("88%");
  });

  it("moves to Road to 500 once 200 followers are reached", () => {
    window.innerWidth = width;
    render(<TwitchSection live={false} uptime={null} followers={200} />);
    expect(screen.getByText("Road to 500 follower")).toBeTruthy();
    expect(screen.getByText("40%")).toBeTruthy();
    expect(bar().el.getAttribute("aria-valuemax")).toBe("500");
  });
});
