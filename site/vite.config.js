import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const sitePort = Number(process.env.SITE_PORT || 3000);
const apiPort = Number(process.env.API_PORT || 3001);

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: sitePort,
    strictPort: true,
    proxy: {
      "/api": `http://localhost:${apiPort}`,
    },
  },
});
