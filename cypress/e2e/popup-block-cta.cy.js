/**
 * Popup Button block – CTA (Call-to-Action) tests.
 *
 * Verifies the trigger element as a CTA: button vs link, text, click behaviour.
 */

const BLOCK_NAME = 'satori-digital/popup-button';

describe('Popup Button block – CTA', () => {
  beforeEach(() => {
    cy.login();
    cy.visitEditor();
    cy.closeWelcomeModal();
    cy.ensureEditorReady();
    cy.insertBlock(BLOCK_NAME);
    cy.openBlockInspector();
  });

  describe('Trigger as button', () => {
    it('default trigger is a button element', () => {
      cy.getEditorCanvas().find('.satori-popup-trigger').invoke('prop', 'tagName').should('eq', 'BUTTON');
    });

    it('button has type=button', () => {
      cy.getEditorCanvas().find('.satori-popup-trigger').filter('button').should('have.attr', 'type', 'button');
    });

    it('custom CTA text displays on button', () => {
      cy.typeInspectorTextByLabel('Button/Link text', 'Book now');
      cy.getEditorCanvas().find('.satori-popup-trigger').should('contain.text', 'Book now');
    });
  });

  describe('Trigger as link', () => {
    it('sets link type, custom text, and role=button on anchor', () => {
      cy.typeInspectorTextByLabel('Button/Link text', 'Learn more');
      cy.inspectorSelectByLabel('Type', 'link');
      cy.getEditorCanvas()
        .find('a.satori-popup-trigger', { timeout: 20000 })
        .should('have.attr', 'role', 'button')
        .and('contain.text', 'Learn more');
    });
  });

  describe('CTA click opens popup (frontend)', () => {
    it('button CTA opens popup on click', () => {
      cy.typeInspectorTextByLabel('Button/Link text', 'Get started');
      cy.publishPostFromEditor();
      cy.get(
        '.post-publish-panel__postpublish-post-address a, .editor-post-publish-panel__postpublish-link a, .components-snackbar a[href]'
      )
        .first()
        .invoke('attr', 'href')
        .then((url) => cy.visit(url));

      cy.get('.satori-popup-trigger').first().click();
      cy.get('.satori-popup-overlay.satori-popup-open').should('be.visible');
    });

    it('link CTA opens popup on click', () => {
      cy.typeInspectorTextByLabel('Button/Link text', 'Read more');
      cy.inspectorSelectByLabel('Type', 'link');
      cy.publishPostFromEditor();
      cy.get(
        '.post-publish-panel__postpublish-post-address a, .editor-post-publish-panel__postpublish-link a, .components-snackbar a[href]'
      )
        .first()
        .invoke('attr', 'href')
        .then((url) => cy.visit(url));

      cy.get('.satori-popup-trigger').first().click();
      cy.get('.satori-popup-overlay.satori-popup-open').should('be.visible');
    });
  });

  describe('CTA visibility and styling', () => {
    it('trigger has cursor pointer', () => {
      cy.getEditorCanvas().find('.satori-popup-trigger').should('have.css', 'cursor', 'pointer');
    });

    it('trigger is visible in editor', () => {
      cy.getEditorCanvas().find('.satori-popup-trigger').should('be.visible');
    });
  });
});
