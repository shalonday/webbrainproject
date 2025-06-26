import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginReact from "eslint-plugin-react";
import globals from "globals";


export default defineConfig([
  { 
    extends: ["js/all"], 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    languageOptions: { globals: globals.browser }, 
    plugins: { js },
    rules: {
      "no-inline-comments": "off"
    }
  }, 
  pluginReact.configs.flat.all,
  pluginReact.configs.flat['jsx-runtime'], // Remove 'React must be in scope' errors in files that use jsx
]);
