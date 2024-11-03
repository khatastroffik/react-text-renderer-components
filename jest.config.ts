/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // Use this configuration option to add custom reporters to Jest
  reporters: [
    "default",
  ],

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    "<rootDir>/src"
  ],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // A map from regular expressions to paths to transformers
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  // Indicates whether each individual test should be reported during the run
  verbose: true,
};

export default config;
