import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart({
      srcDirectory: "./client/src",
      server: { entry: "server" },
      router: { entry: "router" },
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
  ],
});