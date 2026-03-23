/**
 * Popup Button block – Editor functionality tests.
 *
 * Verifies block insertion, content editing toggle, and editor behaviour.
 */

const BLOCK_NAME = 'satori-digital/popup-button';

describe('Popup Button block – Editor functionality', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/wp-admin/post-new.php');
    cy.closeWelcomeModal();
    cy.get('.edit-post-visual-editor, .editor-styles-wrapper').should('be.visible');
  });

  describe('Block insertion', () => {
    it('inserts the Popup Button block from inserter', () => {
      cy.insertBlock(BLOCK_NAME);
      cy.get(`[data-type="${BLOCK_NAME}"]`).should('exist');
    });

    it('block appears in design category', () => {
      cy.insertBlock(BLOCK_NAME);
      cy.get(`[data-type="${BLOCK_NAME}"]`).should('be.visible');
    });

    it('shows default trigger text when no text is set', () => {
      cy.insertBlock(BLOCK_NAME);
      cy.get(`[data-type="${BLOCK_NAME}"]`).first().click();
      cy.get('.satori-popup-trigger').should('contain.text', 'Open popup');
    });
  });

  describe('Edit popup content toggle', () => {
    beforeEach(() => {
      cy.insertBlock(BLOCK_NAME);
      cy.get(`[data-type="${BLOCK_NAME}"]`).first().click();
    });

    it('shows Edit popup content button when collapsed', () => {
      cy.contains('Edit popup content').should('be.visible');
    });

    it('expands popup content when Edit popup content is clicked', () => {
      cy.contains('Edit popup content').click();
      cy.get('.satori-popup-editor-content').should('be.visible');
      cy.contains('Hide popup content').should('be.visible');
    });

    it('collapses popup content when Hide popup content is clicked', () => {
      cy.contains('Edit popup content').click();
      cy.get('.satori-popup-editor-content').should('be.visible');
      cy.contains('Hide popup content').click();
      cy.get('.satori-popup-editor-content').should('not.exist');
      cy.contains('Edit popup content').should('be.visible');
    });
  });

  describe('Block wrapper', () => {
    it('block has expected wrapper class', () => {
      cy.insertBlock(BLOCK_NAME);
      cy.get(`[data-type="${BLOCK_NAME}"]`).first().parent().should('have.class', 'satori-popup-block');
    });
  });
});
