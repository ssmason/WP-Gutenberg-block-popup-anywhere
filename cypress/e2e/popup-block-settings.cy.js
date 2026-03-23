/**
 * Popup Button block – Inspector settings tests.
 *
 * Verifies that all sidebar panels and controls are present and functional.
 */

const BLOCK_NAME = 'satori-digital/popup-button';

describe('Popup Button block – Settings', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/wp-admin/post-new.php');
    cy.closeWelcomeModal();
    cy.get('.edit-post-visual-editor, .editor-styles-wrapper').should('be.visible');
    cy.insertBlock(BLOCK_NAME);
    cy.get(`[data-type="${BLOCK_NAME}"]`).first().click();
  });

  describe('Trigger panel', () => {
    it('shows Trigger panel with Type selector (button/link)', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.contains('Type').should('be.visible');
      cy.contains('Button', { matchCase: false }).should('be.visible');
    });

    it('shows Button/Link text input', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.contains('Button/Link text').should('be.visible');
    });

    it('shows Alignment selector', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.contains('Alignment').should('be.visible');
    });

    it('shows Border radius selector', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.contains('Border radius').should('be.visible');
    });
  });

  describe('Popup style panel', () => {
    it('shows Popup style panel with Size selector', () => {
      cy.get('.components-panel__body').contains('Popup style').click();
      cy.contains('Size').should('be.visible');
    });

    it('shows Popup corner radius selector', () => {
      cy.get('.components-panel__body').contains('Popup style').click();
      cy.contains('Popup corner radius').should('be.visible');
    });

    it('shows Popup padding selector', () => {
      cy.get('.components-panel__body').contains('Popup style').click();
      cy.contains('Popup padding').should('be.visible');
    });

    it('shows help text about Cover block settings', () => {
      cy.get('.components-panel__body').contains('Popup style').click();
      cy.contains('Background color and image').should('be.visible');
    });
  });

  describe('Colors panel', () => {
    it('shows Colors panel with text and background color controls', () => {
      cy.get('.components-panel__body').contains('Colors').click();
      cy.contains('Text color').should('be.visible');
      cy.contains('Background color').should('be.visible');
    });

    it('shows hover color controls', () => {
      cy.get('.components-panel__body').contains('Colors').click();
      cy.contains('Hover text color').should('be.visible');
      cy.contains('Hover background color').should('be.visible');
    });
  });

  describe('Setting persistence', () => {
    it('changes trigger type from button to link', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.contains('Type').parents('.components-base-control').find('select').select('link');
      cy.get('.satori-popup-trigger').invoke('prop', 'tagName').should('eq', 'A');
    });

    it('changes trigger type from link to button', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.contains('Type').parents('.components-base-control').find('select').select('link');
      cy.contains('Type').parents('.components-base-control').find('select').select('button');
      cy.get('.satori-popup-trigger').invoke('prop', 'tagName').should('eq', 'BUTTON');
    });

    it('updates button text in placeholder', () => {
      cy.get('.components-panel__body').contains('Trigger').click();
      cy.get('input[placeholder*="Learn more"], input[placeholder*="Open"]').first().type('Click here');
      cy.get('.satori-popup-trigger').should('contain.text', 'Click here');
    });
  });
});
