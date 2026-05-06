import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import sitemap from "vite-plugin-sitemap";

export default defineConfig(({ isSsrBuild }) => ({
  server: { host: "::", port: 8080, hmr: { overlay: false } },
  plugins: [
    tailwindcss(),
    react(),
    sitemap({
      hostname: "https://8kajis.lv",
      dynamicRoutes: [
        "/",
        "/veikals",
        "/sensora-telpa",
        "/grozs",
        "/par-mums",
        "/kontakti",
        "/konts",
        "/privatuma-politika",
      ],
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
            manualChunks: (id: string) => {
              if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("react-router-dom")) return "react-vendor";
              if (id.includes("framer-motion") || id.includes("lenis")) return "framer-lenis";
              if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("/zod/")) return "form";
              if (id.includes("@tanstack")) return "query";
              if (id.includes("react-i18next") || id.includes("/i18next/")) return "i18n";
              if (id.includes("zustand")) return "cart";
            },
          },
    },
  },
}));
