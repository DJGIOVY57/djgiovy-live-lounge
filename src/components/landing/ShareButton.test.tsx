import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ShareButton } from "./ShareButton";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("Lounge sharing destination", () => {
  it("shares the official domain through native sharing", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { share });
    render(<ShareButton />);
    fireEvent.click(screen.getByRole("button", { name: "Condividi Lounge" }));
    await waitFor(() => expect(share).toHaveBeenCalledWith({ title: "DJGIOVY57's Lounge", url: "https://www.djgiovy57.it" }));
  });

  it("copies the same official domain when native sharing is unavailable", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<ShareButton />);
    fireEvent.click(screen.getByRole("button", { name: "Condividi Lounge" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("https://www.djgiovy57.it"));
  });

  it("offers the official domain when clipboard access fails", async () => {
    vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) } });
    render(<ShareButton />);
    fireEvent.click(screen.getByRole("button", { name: "Condividi Lounge" }));
    expect(await screen.findByRole("textbox", { name: "Link della Lounge" })).toHaveValue("https://www.djgiovy57.it");
  });
});