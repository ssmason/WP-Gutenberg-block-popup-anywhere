/**
 * Popup Button block – Frontend render and behaviour tests.
 *
 * Verifies popup open/close, backdrop click, Escape key, and DOM output.
 */

const BLOCK_NAME = 'satori-digital/popup-button';

/**
 * Creates a published post with a Popup Button block and visits the frontend.
 */
function createPostAndVisitFrontend(buttonText = 'Open modal') {
  cy.login();
  cy.visit('/wp-admin/post-new.php');
  cy.closeWelcomeModal();
  cy.get('.edit-post-visual-editor, .editor-styles-wrapper').should('be.visible');

  cy.insertBlock(BLOCK_NAME);
  cy.get(`[data-type="${BLOCK_NAME}"]`).first().click();
  cy.get('.components-panel__body').contains('Trigger').click();
  cy.get('input[placeholder*="Learn more"], input[placeholder*="Open"]').first().clear().type(buttonText);

  cy.get('.editor-post-publish-button, .editor-post-publish-panel__toggle').first().click();
  cy.get('.editor-post-publish-panel__confirm-button').click();
  cy.get('.post-publish-panel__postpublish-post-address a, .editor-post-publish-panel__postpublish-link a')
    .invoke('attr', 'href')
    .then((url) => {
      cy.visit(url);
    });
}

describe('Popup Button block – Frontend render', () => {
  describe('DOM structure', () => {
    beforeEach(() => createPostAndVisitFrontend());

    it('renders trigger element with expected data attributes', () => {
      cy.get('.satori-popup-trigger').should('exist');
      cy.get('.satori-popup-trigger').should('have.attr', 'data-popup-trigger');
    });

    it('renders overlay (hidden by default)', () => {
      cy.get('.satori-popup-overlay').should('exist');
      cy.get('.satori-popup-overlay').should('not.have.class', 'satori-popup-open');
    });

    it('renders modal container', () => {
      cy.get('.satori-popup-modal').should('exist');
    });

    it('renders close button with aria-label', () => {
      cy.get('.satori-popup-close').should('exist');
      cy.get('.satori-popup-close').should('have.attr', 'aria-label');
    });
  });

  describe('Open behaviour', () => {
    beforeEach(() => createPostAndVisitFrontend());

    it('opens popup when trigger is clicked', () => {
      cy.contains('Open modal').click();
      cy.get('.satori-popup-overlay.satori-popup-open').should('be.visible');
      cy.get('.satori-popup-modal').should('be.visible');
    });

    it('overlay has role dialog', () => {
      cy.contains('Open modal').click();
      cy.get('.satori-popup-modal').should('have.attr', 'role', 'dialog');
    });
  });

  describe('Close behaviour', () => {
    beforeEach(() => createPostAndVisitFrontend());

    it('closes popup when close button is clicked', () => {
      cy.contains('Open modal').click();
      cy.get('.satori-popup-open').should('exist');
      cy.get('.satori-popup-close').click();
      cy.get('.satori-popup-overlay.satori-popup-open').should('not.exist');
    });

    it('closes popup when Escape key is pressed', () => {
      cy.contains('Open modal').click();
      cy.get('.satori-popup-open').should('exist');
      cy.get('body').type('{esc}');
      cy.get('.satori-popup-overlay.satori-popup-open').should('not.exist');
    });

    it('closes popup when backdrop is clicked', () => {
      cy.contains('Open modal').click();
      cy.get('.satori-popup-open').should('exist');
      cy.get('.satori-popup-overlay').click({ force: true });
      cy.get('.satori-popup-overlay.satori-popup-open').should('not.exist');
    });
  });
});
