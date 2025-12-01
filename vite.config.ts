import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { ghPages } from "vite-plugin-gh-pages";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),ghPages()],
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src"),
  //   },
  // },
  //base: '/cep-parallel-search-site/',
  base: '/cep-parallel-search-site',
  server: {
    //allowedHosts: ['geral-realcap.akql5f.easypanel.host','realcap.com.br'],
    // this ensures that the browser opens upon server start
    open: false,
    // this sets a default port to 3000
    port: 3001
  },
  preview: {
    // this ensures that the browser opens upon preview start
    open: false,
    // this sets a default port to 3000
    port: 3001
  }
});
