/* 
Copyright 2023, 2025 Salvador Pio Alonday

This file is part of The Web Brain Project

The Web Brain Project is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software Foundation,
either version 3 of the License, or (at your option) any later version.

The Web Brain Project is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with The Web
Brain Project. If not, see <https://www.gnu.org/licenses/>.
*/

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
        plugins: { import: importPlugin, js,  },
        rules: {
            ...importPlugin.flatConfigs.recommended.rules,
            ...pluginReact.configs.flat.all,
            "func-style": ["warn", "declaration"],
            "import/order": [
                'error',
                {
                    alphabetize: { order: 'asc', caseInsensitive: true },
                    'newlines-between': 'never'
                }
            ],
            "indent": ["error", 4],
            "no-inline-comments": "off",
            "react/jsx-newline": ["warn", { "allowMultilines": false, "prevent": true,  }],
            "react/no-multi-comp": "off",
            "sort-imports": "off", // Turn off this core rule, prioritizing rules from eslint-plugin-import instead, to prevent conflicts
        }
    },
    pluginReact.configs.flat['jsx-runtime'], // Remove 'React must be in scope' errors in files that use jsx
]);
