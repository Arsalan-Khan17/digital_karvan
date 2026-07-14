import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f5318a",
    icons: [
      { src: "/icon.png", sizes: "144x144", type: "image/png" },
      { src: "/icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
    ],
  };
}
