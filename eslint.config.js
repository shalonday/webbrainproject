import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import stylistic from '@stylistic/eslint-plugin'
import { defineConfig } from "eslint/config";


export default defineConfig([
  pluginReact.configs.flat.recommended,
  { files: ["**/*.{js,mjs,cjs,jsx}"], languageOptions: { globals: globals.browser }, plugins: { js }, extends: ["js/recommended"], rules: {'@stylistic/indent': ['error', 4],} },
]);
