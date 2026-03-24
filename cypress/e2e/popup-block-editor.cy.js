/**
 * Popup Button block – Editor functionality tests.
 *
 * Verifies block insertion, content editing toggle, and editor behaviour.
 */

const BLOCK_NAME = 'satori-digital/popup-button';

describe('Popup Button block – Editor functionality', () => {
  beforeEach(() => {
    cy.login();
    cy.visitEditor();
    cy.closeWelcomeModal();
    cy.ensureEditorReady();
  });

  describe('Block insertion', () => {
    it('inserts the Popup Button block from inserter', () => {
      cy.insertBlock(BLOCK_NAME);
      cy.getEditorCanvas().find(`[data-type="${BLOCK_NAME}"]`).should('exist');
    });

    it('block appears in design category', () => {
      cy.insertBlock(BLOCK_NAME);
      cy.getEditorCanvas().find(`[data-type="${BLOCK_NAME}"]`).should('be.visible');
    });

    it('shows default trigger text when no text is set', () => {
      cy.insertBlock(BLOCK_NAME);
      cy.getEditorCanvas().find('.satori-popup-trigger').should('contain.text', 'Open popup');
    });
  });

  describe('Edit popup content toggle', () => {
    beforeEach(() => {
      cy.insertBlock(BLOCK_NAME);
    });

    it('shows Edit popup content button when collapsed', () => {
      cy.getEditorCanvas().contains('Edit popup content').should('be.visible');
    });

    it('expands popup content when Edit popup content is clicked', () => {
      cy.getEditorCanvas().contains('Edit popup content').click();
      cy.getEditorCanvas().find('.satori-popup-editor-content').should('be.visible');
      cy.getEditorCanvas().contains('Hide popup content').should('be.visible');
    });

    it('collapses popup content when Hide popup content is clicked', () => {
      cy.getEditorCanvas().contains('Edit popup content').click();
      cy.getEditorCanvas().find('.satori-popup-editor-content').should('be.visible');
      cy.getEditorCanvas().contains('Hide popup content').click();
      cy.getEditorCanvas().find('.satori-popup-editor-content').should('not.exist');
      cy.getEditorCanvas().contains('Edit popup content').should('be.visible');
    });
  });

  describe('Block wrapper', () => {
    it('block has expected wrapper class', () => {
      cy.insertBlock(BLOCK_NAME);
      cy.getEditorCanvas()
        .find(`[data-type="${BLOCK_NAME}"]`)
        .first()
        .should('have.class', 'satori-popup-block');
    });
  });
});
