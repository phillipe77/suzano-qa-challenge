const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://fakestoreapi.com',
    specPattern: 'cypress/e2e/**/*.spec.js', // Alterado para focar em arquivos .spec.js
    // Configuração para execução paralela
    experimentalRunAllSpecs: true,
    // Aumentar confiabilidade em CI
    retries: {
      runMode: 1,
      openMode: 0
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'API Automation Report',
      embeddedScreenshots: true,
      inlineAssets: true
    },
  },
  env: {
    apiUrl: 'https://fakestoreapi.com',
  },
  // Configurações para performance em paralelo
  numTestsKeptInMemory: 5,
  video: false, // Desativa gravação de vídeo para testes de API
  screenshotOnRunFailure: false, // Desativa screenshots em falhas para testes de API
  defaultCommandTimeout: 10000, // Tempo limite padrão para comandos
});