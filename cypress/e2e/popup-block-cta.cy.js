/**
 * Popup Button block – CTA (Call-to-Action) tests.
 *
 * Verifies the trigger element as a CTA: button vs link, text, click behaviour.
 */

const BLOCK_NAME = 'satori-digital/popup-button';

describe('Popup Button block – CTA', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/wp-admin/post-new.php');
    cy.closeWelcomeModal();
    cy.get('.edit-post-visual-editor, .editor-styles-wrapper').should('be.visible');
    cy.insertBlock(BLOCK_NAME);
    cy.get(`[data-type="${BLOCK_NAME}"]`).first().click();
  });

  describe('Trigger as button', () => {
    it('default trigger is a button element', () => {
      cy.get('.satori-popup-trigger').invoke('prop', 'tagName').should('eq', 'BUTTON');
    });

    it('button has type=button', () => {
      cy.get('.satori-popup-trigger').filter('button').should('have.attr', 'type', 'button');
    });

    it('custom CTA text displays on button', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.get('input[placeholder*="Learn more"], input[placeholder*="Open"]').first().clear().type('Book now');
      cy.get('.satori-popup-trigger').should('contain.text', 'Book now');
    });
  });

  describe('Trigger as link', () => {
    it('trigger renders as link when Type is set to link', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.contains('Type').parents('.components-base-control').find('select').select('link');
      cy.get('.satori-popup-trigger').invoke('prop', 'tagName').should('eq', 'A');
    });

    it('link has role=button for accessibility', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.contains('Type').parents('.components-base-control').find('select').select('link');
      cy.get('.satori-popup-trigger').should('have.attr', 'role', 'button');
    });

    it('link CTA text displays correctly', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.contains('Type').parents('.components-base-control').find('select').select('link');
      cy.get('input[placeholder*="Learn more"], input[placeholder*="Open"]').first().clear().type('Learn more');
      cy.get('.satori-popup-trigger').should('contain.text', 'Learn more');
    });
  });

  describe('CTA click opens popup (frontend)', () => {
    it('button CTA opens popup on click', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.get('input[placeholder*="Learn more"], input[placeholder*="Open"]').first().clear().type('Get started');
      cy.get('.editor-post-publish-button, .editor-post-publish-panel__toggle').first().click();
      cy.get('.editor-post-publish-panel__confirm-button').click();
      cy.get('.post-publish-panel__postpublish-post-address a, .editor-post-publish-panel__postpublish-link a')
        .invoke('attr', 'href')
        .then((url) => cy.visit(url));

      cy.contains('Get started').click();
      cy.get('.satori-popup-overlay.satori-popup-open').should('be.visible');
    });

    it('link CTA opens popup on click', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.contains('Type').parents('.components-base-control').find('select').select('link');
      cy.get('input[placeholder*="Learn more"], input[placeholder*="Open"]').first().clear().type('Read more');
      cy.get('.editor-post-publish-button, .editor-post-publish-panel__toggle').first().click();
      cy.get('.editor-post-publish-panel__confirm-button').click();
      cy.get('.post-publish-panel__postpublish-post-address a, .editor-post-publish-panel__postpublish-link a')
        .invoke('attr', 'href')
        .then((url) => cy.visit(url));

      cy.contains('Read more').click();
      cy.get('.satori-popup-overlay.satori-popup-open').should('be.visible');
    });
  });

  describe('CTA visibility and styling', () => {
    it('trigger has cursor pointer', () => {
      cy.get('.satori-popup-trigger').should('have.css', 'cursor', 'pointer');
    });

    it('trigger is visible in editor', () => {
      cy.get('.satori-popup-trigger').should('be.visible');
    });
  });
});
