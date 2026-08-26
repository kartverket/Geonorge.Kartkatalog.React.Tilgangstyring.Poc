import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const useHttps = env.HTTPS === "true";

  return {
    plugins: [react(), ...(useHttps ? [basicSsl()] : [])],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    //Demper deprecation warnings fra r_map
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          silenceDeprecations: ["import", "global-builtin"],
        },
      },
    },
    server: {
      https: useHttps,
      proxy: {
        '/api': {
          target: 'https://tilgangstyring-kartkatalog-api-dev.atkv3-dev.kartverket-intern.cloud',
          changeOrigin: true
        }
      }
    },
    preview: {
      https: useHttps,
    },
  };
});
