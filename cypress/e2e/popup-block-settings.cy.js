/**
 * Popup Button block – Inspector settings tests.
 *
 * Verifies that all sidebar panels and controls are present and functional.
 */

const BLOCK_NAME = 'satori-digital/popup-button';

describe('Popup Button block – Settings', () => {
  beforeEach(() => {
    cy.login();
    cy.visitEditor();
    cy.closeWelcomeModal();
    cy.ensureEditorReady();
    cy.insertBlock(BLOCK_NAME);
    cy.openBlockInspector();
    cy.refocusPopupBlock();
  });

  describe('Trigger panel', () => {
    it('shows Trigger panel with Type selector (button/link)', () => {
      cy.get('.block-editor-block-inspector').within(() => {
        cy.contains('Type').scrollIntoView().should('exist');
        cy.contains('Button', { matchCase: false }).scrollIntoView().should('exist');
      });
    });

    it('shows Button/Link text input', () => {
      cy.get('.block-editor-block-inspector').contains('Button/Link text').scrollIntoView().should('exist');
    });

    it('shows Alignment selector', () => {
      cy.get('.block-editor-block-inspector').contains('Alignment').scrollIntoView().should('exist');
    });

    it('shows Border radius selector', () => {
      cy.get('.block-editor-block-inspector').contains('Border radius').scrollIntoView().should('exist');
    });
  });

  describe('Popup style panel', () => {
    it('shows Popup style panel with Size selector', () => {
      cy.get('.block-editor-block-inspector').contains('Size').scrollIntoView().should('exist');
    });

    it('shows Popup corner radius selector', () => {
      cy.get('.block-editor-block-inspector').contains('Popup corner radius').scrollIntoView().should('exist');
    });

    it('shows Popup padding selector', () => {
      cy.get('.block-editor-block-inspector').contains('Popup padding').scrollIntoView().should('exist');
    });

    it('shows help text about Cover block settings', () => {
      cy.get('.block-editor-block-inspector').contains('Background color and image').scrollIntoView().should('exist');
    });
  });

  describe('Colors panel', () => {
    it('shows Colors panel (text, background, hover)', () => {
      cy.refocusPopupBlock();
      cy.get('.block-editor-block-inspector').contains('Text color').scrollIntoView().should('exist');
      cy.get('.block-editor-block-inspector').contains('Background color').scrollIntoView().should('exist');
      cy.get('.block-editor-block-inspector').contains('Hover text color').scrollIntoView().should('exist');
      cy.get('.block-editor-block-inspector').contains('Hover background color').scrollIntoView().should('exist');
    });
  });

  describe('Setting persistence', () => {
    it('changes trigger type from button to link', () => {
      cy.refocusPopupBlock();
      cy.inspectorSelectByLabel('Type', 'link');
      cy.getEditorCanvas().find('a.satori-popup-trigger', { timeout: 20000 }).should('exist');
    });

    it('changes trigger type from link to button', () => {
      cy.refocusPopupBlock();
      cy.inspectorSelectByLabel('Type', 'link');
      cy.refocusPopupBlock();
      cy.inspectorSelectByLabel('Type', 'button');
      cy.getEditorCanvas().find('button.satori-popup-trigger', { timeout: 15000 }).should('exist');
    });

    it('updates button text in placeholder', () => {
      cy.refocusPopupBlock();
      cy.typeInspectorTextByLabel('Button/Link text', 'Click here');
      cy.getEditorCanvas().find('.satori-popup-trigger', { timeout: 20000 }).should('contain.text', 'Click here');
    });
  });
});
