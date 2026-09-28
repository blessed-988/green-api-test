import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import {
  projectStructurePlugin,
  createIndependentModules,
} from "eslint-plugin-project-structure";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

function withExtensions(path) {
  return ["ts", "tsx"].map((extension) => `${path}.${extension}`);
}

const independentModules = createIndependentModules({
  modules: [
    {
      name: "Shared",
      pattern: "src/shared/**",
      allowImportsFrom: ["{shared}"],
    },
    {
      name: "Entities",
      pattern: "src/entities/*/**",
      allowImportsFrom: ["{shared}", "{family_3}/**"],
    },
    {
      name: "Features",
      pattern: "src/features/*/**",
      allowImportsFrom: ["{shared}", "{entities}", "{family_3}/**"],
    },
    {
      name: "Widgets",
      pattern: "src/widgets/*/**",
      allowImportsFrom: [
        "{shared}",
        "{entities}",
        "{features}",
        "{family_3}/**",
      ],
    },
    {
      name: "Pages",
      pattern: "src/pages/*/**",
      allowImportsFrom: [
        "{shared}",
        "{entities}",
        "{features}",
        "{widgets}",
        "{family_3}/**",
      ],
    },
    {
      name: "App",
      pattern: "src/app/**",
      allowImportsFrom: [
        "{shared}",
        "{entities}",
        "{features}",
        "{widgets}",
        "{pages}",
        "src/app/**",
      ],
    },
  ],
  reusableImportPatterns: {
    shared: ["src/shared/**"],
    entities: withExtensions("src/entities/*/index"),
    features: withExtensions("src/features/*/index"),
    widgets: withExtensions("src/widgets/*/index"),
    pages: withExtensions("src/pages/*/index"),
  },
});

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["src/**/*.{ts,tsx}", "*.{ts,js}"],
    ignores: ["**/*.module.d.scss.ts"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintPluginPrettierRecommended,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      "project-structure": projectStructurePlugin,
    },
    rules: {
      "project-structure/independent-modules": ["error", independentModules],
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
]);
