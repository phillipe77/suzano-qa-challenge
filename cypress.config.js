const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    reportPageTitle: 'API Automation Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true,
    saveAllAttempts: false,
    html: true,
    json: true,
    jsonFolder: '.jsons'
  },

  e2e: {
    baseUrl: 'https://fakestoreapi.com',
    specPattern: 'cypress/e2e/**/*.spec.js',
    experimentalRunAllSpecs: true,

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },

    retries: {
      runMode: 1,
      openMode: 0,
    },
  },

  env: {
    apiUrl: 'https://fakestoreapi.com',
  },

  numTestsKeptInMemory: 5,
  video: false,
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 10000,
});