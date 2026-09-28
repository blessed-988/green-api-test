import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import sassDts from "vite-plugin-sass-dts";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] }),
        tailwindcss(),
        svgr(),
        sassDts({ enabledMode: ["development"] }),
    ],
    resolve: {
        tsconfigPaths: true,
    },
});
