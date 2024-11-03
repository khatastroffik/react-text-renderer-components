/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "./test-reports/coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "node_modules",
    "dist",
    "test-reports",
    "storybook-static",
    "package.json",
    "package-lock.json",
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    // ["json-summary", {file: "coverage.json"}],
    ["lcov", {file: "coverage.info"}],
    // ["cobertura", {file: "coverage.xml"}],
    "text-summary"
  ],

  // An object that configures minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    }
  },

  // Use this configuration option to add custom reporters to Jest
  reporters: [
    'summary',
    [
      'github-actions', {
        silent: false
      }
    ],
    [
      "jest-html-reporters", {
        "publicPath": "./test-reports/jest",
        "filename": "index.html",
        "openReport": false,
        "pageTitle": "Test Report - @khatastroffik/react-text-renderer-components",
        "expand": true,
        // "inlineSource": true
        // "logoImgPath": "....."
      }
    ]
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
  verbose: false,

  // Whether to use watchman for file crawling
  watchman: false,
};

export default config;
