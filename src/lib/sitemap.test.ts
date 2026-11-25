import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { SITE } from "@/lib/site-config";
import { sitemapStaticPaths, sitemapXML } from "./sitemap";

describe("Lounge sitemap", () => {
  it("includes exactly the five public pages, not the sitemap itself", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(sitemapStaticPaths(router)).toEqual(["/", "/changelog", "/gaming-hub", "/momenti", "/timeline"]);
  });

  it("uses the official domain and omits unsupported modification dates", () => {
    const xml = sitemapXML(SITE.url, [
      { path: "/" },
      { path: "/changelog" },
      { path: "/momenti" },
      { path: "/timeline" },
    ]);
    const document = new DOMParser().parseFromString(xml, "application/xml");
    expect(Array.from(document.querySelectorAll("loc"), (node) => node.textContent)).toEqual([
      "https://www.djgiovy57.it/",
      "https://www.djgiovy57.it/changelog",
      "https://www.djgiovy57.it/momenti",
      "https://www.djgiovy57.it/timeline",
    ]);
    expect(document.querySelector("lastmod")).toBeNull();
  });

  it("rejects off-site paths", () => {
    expect(() => sitemapXML(SITE.url, [{ path: "//other.example/page" }])).toThrow("Invalid sitemap path");
  });
});