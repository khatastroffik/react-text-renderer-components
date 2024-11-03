import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/components/introduction.mdx", "../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: { builder: { useSWC: true } }
  },
  core: {
    disableTelemetry: true, 
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  build: {
    test: {
      disableBlocks: false,
      disabledAddons: [],
      disableMDXEntries: false,
      disableAutoDocs: false,
      disableDocgen: false,
      disableSourcemaps: true,
      disableTreeShaking: false      
    }
  },
  staticDirs: ["../test-reports"]
};

export default config; 
