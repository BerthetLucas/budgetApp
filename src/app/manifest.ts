import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "My Financial App",
    short_name: "Budget",
    description: "Gérez votre budget et vos finances personnelles",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F5F7EE",
    theme_color: "#6D28D9",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
