/**
 * Cypress E2E configuration for Popup Button block tests.
 *
 * Requires a running WordPress site. Set CYPRESS_BASE_URL or update baseUrl.
 *
 * @example
 *   CYPRESS_BASE_URL=https://webgains.local npm run cypress:run
 */

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:8000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
