import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import importPlugin from 'eslint-plugin-import'
import pluginReact from "eslint-plugin-react";
import globals from "globals";


export default defineConfig([
    { 
        extends: ["js/all"], 
        files: ["**/*.{js,mjs,cjs,jsx}"], 
        languageOptions: { globals: globals.browser }, 
        plugins: { js, import: importPlugin },
        rules: {
            ...importPlugin.flatConfigs.recommended.rules,
            "import/order": [
                'error',
                {
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    'newlines-between': 'never'
                }
            ],
            "indent": ["error", 4],
            "no-inline-comments": "off",
            "sort-imports": "off", // Turn off this core rule, prioritizing rules from eslint-plugin-import instead, to prevent conflicts
        }
    }, 
    pluginReact.configs.flat.all,
    pluginReact.configs.flat['jsx-runtime'], // Remove 'React must be in scope' errors in files that use jsx
]);
