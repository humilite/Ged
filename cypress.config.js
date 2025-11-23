const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'e2e/cypress/integration/**/*.spec.js',
    supportFile: 'e2e/cypress/support/commands.js',
    viewportWidth: 900,
    viewportHeight: 600,
    retries: {
      runMode: 2,
      openMode: 0,
    },
  },
});
