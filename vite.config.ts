import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Marketing site (outworx.ai) — public pages only.
// Runs on a different port than the app (outworx_frontend on :3000) so both
// can be served simultaneously in dev.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  server: {
    host: "::",
    port: 8081,
    hmr: { overlay: false },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("jspdf")) return "jspdf";
          if (id.includes("pptxgenjs")) return "pptxgenjs";
          if (id.includes("html2canvas")) return "html2canvas";
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});
