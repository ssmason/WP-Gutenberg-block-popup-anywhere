/**
 * Custom Cypress commands for WordPress block editor and Popup block tests.
 */

/**
 * Logs in to WordPress admin.
 *
 * @param {string} username - WP admin username.
 * @param {string} password - WP admin password.
 */
Cypress.Commands.add('login', (username = 'admin', password = 'password') => {
  cy.session(
    [username, password],
    () => {
      cy.visit('/wp-login.php');
      cy.get('#user_login').type(username);
      cy.get('#user_pass').type(password);
      cy.get('#wp-submit').click();
      cy.url().should('include', '/wp-admin/');
    },
    { cacheAcrossSpecs: true }
  );
});

/**
 * Closes the block editor welcome modal or template modal if present.
 */
Cypress.Commands.add('closeWelcomeModal', () => {
  cy.get('body').then(($body) => {
    const $close = $body.find('[aria-label="Close"]');
    if ($close.length) {
      cy.get('[aria-label="Close"]').first().click();
    }
  });
});

/**
 * Inserts a block by name in the block editor.
 *
 * @param {string} blockName - Block name (e.g. 'satori-digital/popup-button').
 * @param {string} searchTerm - Optional search term for inserter (e.g. 'Popup Button').
 */
Cypress.Commands.add('insertBlock', (blockName, searchTerm = 'Popup Button') => {
  cy.get('[aria-label="Add block"], .editor-inserter__toggle, .block-editor-inserter__toggle')
    .first()
    .click();
  cy.get('[role="searchbox"], .components-search-control__input')
    .clear()
    .type(searchTerm);
  cy.get(`[data-type="${blockName}"]`).first().click();
});
