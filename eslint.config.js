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
import stylistic from '@stylistic/eslint-plugin'
// eslint-disable-next-line import/no-unresolved
import { defineConfig } from "eslint/config";
import importPlugin from 'eslint-plugin-import'
import pluginReact from "eslint-plugin-react";
import globals from "globals";

const numIndentSpaces = 4;

export default defineConfig([
    pluginReact.configs.flat.all,
    pluginReact.configs.flat['jsx-runtime'], // Remove 'React must be in scope' errors in files that use jsx
    { 
        extends: ["js/all"], 
        files: ["**/*.{js,mjs,cjs,jsx}"], 
        languageOptions: { globals: globals.browser }, 
        plugins: { '@stylistic': stylistic, import: importPlugin, js },
        rules: {
            ...importPlugin.flatConfigs.recommended.rules,
            "@stylistic/indent": ["error", numIndentSpaces],
            "func-style": ["warn", "declaration"],
            "id-length": ["error", {
                "exceptions": ["e", "i", "j", "k"]
            }],
            "import/order": [
                'error',
                {
                    alphabetize: { caseInsensitive: true, order: 'asc',  },
                    'newlines-between': 'never'
                }
            ],
            "init-declarations": "off",
            "no-empty-function": ["error", {"allow": ["arrowFunctions"]}],
            "no-inline-comments": "off",
            "no-magic-numbers": ["error", {
                "ignore": [0, 1],
                "ignoreArrayIndexes": true,
            }],
            "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
            "no-ternary": "off",
            "no-underscore-dangle": "off", // Turn off because D3 uses dangling underscores in their object properties
            "one-var": ["warn", {"initialized": "never", "uninitialized": "always", }],
            "react/jsx-newline": ["warn", { "allowMultilines": false, "prevent": true,  }],
            "react/jsx-no-literals": "off",
            "react/no-multi-comp": "off",
            "sort-imports": "off", // Turn off this core rule, prioritizing rules from eslint-plugin-import instead, to prevent conflicts
        },
        settings: {
            'import/extensions': ['.js', '.jsx'],
            'import/resolver': {
                node: {
                    extensions: ['.js', '.jsx', '.json'],
                },
            },
        },
    },
]);