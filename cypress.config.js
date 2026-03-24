/**
 * Cypress E2E configuration for Popup Button block tests.
 *
 * Requires a running WordPress site with the plugin active. Copy cypress.env.json.example
 * to cypress.env.json and set baseUrl, WP_USER, WP_PASSWORD for your site.
 *
 * WP_PATH: /wp for Bedrock (default), "" for standard WordPress at docroot.
 *
 * webgains-corporate (Docker on port 8080): create a test user once from that repo root:
 *   docker compose exec -T php vendor/bin/wp user create cypress_test cypress_test@example.com --user_pass=cypress_test --role=administrator --path=web/wp
 * Or override with CYPRESS_WP_USER / CYPRESS_WP_PASSWORD when running npm run cypress:run.
 */

const { defineConfig } = require('cypress');

let baseUrl = process.env.CYPRESS_BASE_URL || 'http://localhost:8080';
let wpPath = process.env.CYPRESS_WP_PATH ?? '/wp'; // Bedrock: /wp. Standard WP: ''
let envOverrides = {};
try {
  const env = require('./cypress.env.json');
  if (env.baseUrl) baseUrl = env.baseUrl;
  if (env.WP_PATH !== undefined) wpPath = env.WP_PATH;
  if (env.WP_USER) envOverrides.WP_USER = env.WP_USER;
  if (env.WP_PASSWORD) envOverrides.WP_PASSWORD = env.WP_PASSWORD;
} catch (e) {
  /* cypress.env.json optional */
}

module.exports = defineConfig({
  e2e: {
    baseUrl,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
  },
  env: {
    // Defaults match cypress.env.json.example (webgains-corporate Docker: create user via WP-CLI once).
    WP_USER: process.env.CYPRESS_WP_USER || envOverrides.WP_USER || 'cypress_test',
    WP_PASSWORD: process.env.CYPRESS_WP_PASSWORD || envOverrides.WP_PASSWORD || 'cypress_test',
    WP_PATH: wpPath,
  },
});
