import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "dist/**/*",
      ".husky/**/*",
      ".parcel-cache/**/*",
      "src/**/*.{js,jsx}",
      "test-reports/**/*",
      "node_modules/**/*",
      ".git/**/*",
      "storybook-static/**/*"
    ]
  },
  {
    settings: { react: { "version": "detect" } }
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest
      },
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
        ecmaFeatures: {
          jsx: true,
        },
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
