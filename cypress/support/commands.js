/**
 * Custom Cypress commands for WordPress block editor and Popup block tests.
 *
 * Set WP_USER and WP_PASSWORD in cypress.env.json (or CYPRESS_WP_USER / CYPRESS_WP_PASSWORD env vars)
 * if your WordPress uses different credentials than admin/password.
 */

/**
 * WordPress core URL prefix. Bedrock: `/wp`. Standard install at site root: `""` (set WP_PATH to "").
 * Important: use `??` / explicit `""` check — `|| '/wp'` breaks empty string.
 */
function wpCorePrefix() {
  const p = Cypress.env('WP_PATH');
  if (p === '') return '';
  return String(p ?? '/wp').replace(/\/$/, '');
}

/**
 * Logs in to WordPress admin via UI (visit, type, submit). Request-based login
 * does not persist cookies correctly with Cypress session.
 */
Cypress.Commands.add('login', (username, password) => {
  const user = username ?? Cypress.env('WP_USER') ?? 'cypress_test';
  const pass = password ?? Cypress.env('WP_PASSWORD') ?? 'cypress_test';
  const core = wpCorePrefix();

  cy.session(
    [core, user, pass],
    () => {
      const loginPath = core ? `${core}/wp-login.php` : '/wp-login.php';
      cy.visit(loginPath);
      cy.get('#user_login').clear().type(user);
      cy.get('#user_pass').clear().type(pass);
      cy.get('#wp-submit').click();
      cy.url({ timeout: 15000 }).should((url) => {
        if (url.includes('/wp-admin')) return;
        const wpErr = Cypress.$('#login_error').text().trim();
        throw new Error(
          wpErr
            ? `WordPress login failed: ${wpErr}`
            : 'Login did not redirect to wp-admin. Set WP_USER and WP_PASSWORD in cypress.env.json (copy cypress.env.json.example) or create user cypress_test from webgains-corporate: docker compose exec -T php vendor/bin/wp user create cypress_test cypress_test@example.com --user_pass=cypress_test --role=administrator --path=web/wp'
        );
      });
    },
    { cacheAcrossSpecs: true }
  );
});

/**
 * Visits wp-admin (optional sub-path, e.g. post-new.php).
 */
Cypress.Commands.add('visitWpAdmin', (subPath = '') => {
  const core = wpCorePrefix();
  const base = core ? `${core}/wp-admin` : '/wp-admin';
  const path = subPath.replace(/^\//, '');
  cy.visit(path ? `${base}/${path}` : `${base}/`);
});

/**
 * Visits the block editor new post page. Uses WP_PATH from config (default /wp for Bedrock).
 */
Cypress.Commands.add('visitEditor', () => {
  const core = wpCorePrefix();
  const path = core ? `${core}/wp-admin/post-new.php` : '/wp-admin/post-new.php';
  cy.visit(path);
  cy.url().should('not.include', 'wp-login');
});

/**
 * Closes the block editor welcome modal or template modal if present.
 */
Cypress.Commands.add('closeWelcomeModal', () => {
  cy.get('body', { timeout: 5000 }).then(($body) => {
    const $skip = $body.find('button').filter((i, el) => /skip|start blank|create blank/i.test(el.textContent || ''));
    if ($skip.length) cy.wrap($skip.first()).click({ force: true });
    const $close = $body.find('[aria-label="Close"]');
    if ($close.length) cy.get('[aria-label="Close"]').first().click({ force: true });
  });
  cy.wait(500);
});

/**
 * Dismisses overlays / focus traps so the block inserter is clickable (WP 6.4+ skeleton often covers the toolbar in Cypress).
 */
Cypress.Commands.add('dismissEditorChrome', () => {
  cy.get('body').type('{esc}{esc}', { delay: 0 });
  cy.wait(300);
});

/**
 * Waits for the block editor to be ready. Supports iframed (WP 6.3+) and non-iframed editor.
 */
Cypress.Commands.add('ensureEditorReady', () => {
  cy.get(
    'iframe[name="editor-canvas"], .edit-post-visual-editor, .editor-styles-wrapper, .block-editor-block-list__layout, [data-type="core/post-content"]',
    { timeout: 20000 }
  ).should('exist');
});

/**
 * Returns the editor canvas (iframe body if iframed, else document body). Block content lives here.
 */
Cypress.Commands.add('getEditorCanvas', () => {
  return cy.get('body').then(($body) => {
    const $iframe = $body.find('iframe[name="editor-canvas"]');
    if ($iframe.length) {
      const doc = $iframe.contents();
      return cy.wrap(doc.find('body'));
    }
    return cy.get('body');
  });
});

/**
 * Inserts a block by name.
 */
Cypress.Commands.add('insertBlock', (blockName, searchTerm = 'Popup Button') => {
  cy.dismissEditorChrome();
  cy.get('.block-editor-inserter__toggle, button[aria-label="Add block"]', { timeout: 15000 })
    .first()
    .scrollIntoView()
    .click({ force: true });
  cy.get('.block-editor-inserter__panel, .block-editor-inserter__popover', { timeout: 15000 })
    .first()
    .within(() => {
      cy.get(
        '.block-editor-inserter__search input, input[type="search"], input[role="combobox"], input[aria-autocomplete="list"]'
      )
        .first()
        .clear({ force: true })
        .type(searchTerm, { force: true });
    });
  cy.get('.block-editor-inserter__panel, .block-editor-inserter__popover', { timeout: 15000 })
    .first()
    .within(() => {
      cy.contains(searchTerm).first().click({ force: true });
    });
  cy.getEditorCanvas().find(`[data-type="${blockName}"]`, { timeout: 15000 }).first().click({ force: true });
});

/**
 * Opens the right settings sidebar and switches to the Block tab so InspectorControls (Trigger, etc.) are visible.
 * Only clicks the Settings toggle when the sidebar is closed — a second click would toggle it off and unmount
 * the block inspector, so refocusPopupBlock() + openBlockInspector() must be idempotent.
 */
Cypress.Commands.add('openBlockInspector', () => {
  cy.get('button[aria-label="Settings"]', { timeout: 15000 })
    .first()
    .then(($btn) => {
      const expanded = $btn.attr('aria-expanded');
      const sidebarVisible =
        expanded === 'true' ||
        Cypress.$('.interface-complementary-area:visible').length > 0 ||
        Cypress.$('.edit-post-sidebar:visible').length > 0;
      if (!sidebarVisible) {
        cy.wrap($btn).click({ force: true });
      }
    });
  cy.get('.block-editor-block-inspector', { timeout: 15000 }).should('exist');
  cy.get('body').then(($body) => {
    const $tabs = $body.find('.edit-post-sidebar__panel-tabs [role="tab"]');
    if (!$tabs.length) return;
    const $blockTab = $tabs.filter((i, el) => /^block$/i.test((el.textContent || '').trim()));
    if ($blockTab.length) {
      cy.wrap($blockTab.first()).click({ force: true });
    }
  });
});

/**
 * Finds a TextControl in the block inspector by its visible label (avoids brittle placeholder selectors).
 */
Cypress.Commands.add('inspectorTextInputByLabel', (label) => {
  cy.get('.block-editor-block-inspector', { timeout: 15000 })
    .contains('label', new RegExp(`^${escapeRegex(label)}$`, 'i'))
    .closest('.components-base-control')
    .find('input')
    .first()
    .scrollIntoView();
});

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Re-selects the Popup block so the block inspector is mounted again (React often drops it after clear).
 */
Cypress.Commands.add('refocusPopupBlock', () => {
  cy.getEditorCanvas().find('[data-type="satori-digital/popup-button"]').first().click({ force: true });
  cy.openBlockInspector();
});

/**
 * Types into a TextControl in the block inspector (force: sidebar chrome often covers fixed inputs).
 * Clear and type are separate commands — React re-renders after clear and detaches chained subjects.
 */
Cypress.Commands.add('typeInspectorTextByLabel', (label, text) => {
  cy.refocusPopupBlock();
  const labelRe = new RegExp(`^${escapeRegex(label)}$`, 'i');
  const input = () =>
    cy.get('.block-editor-block-inspector', { timeout: 15000 }).contains('label', labelRe).closest('.components-base-control').find('input').first();
  input().clear({ force: true });
  cy.wait(300);
  cy.refocusPopupBlock();
  input().type(text, { force: true, delay: 0 });
});

/**
 * Sets a SelectControl in the block inspector by label (native select in current WP).
 */
Cypress.Commands.add('inspectorSelectByLabel', (label, value) => {
  cy.refocusPopupBlock();
  cy.get('.block-editor-block-inspector', { timeout: 15000 })
    .contains('label', new RegExp(`^${escapeRegex(label)}$`, 'i'))
    .closest('.components-base-control')
    .find('select')
    .first()
    .select(value, { force: true });
});

/**
 * Publishes the current post from the block editor (handles pre-publish panel variations).
 */
Cypress.Commands.add('publishPostFromEditor', () => {
  cy.get('.editor-post-publish-panel__toggle', { timeout: 15000 }).click({ force: true });
  cy.get('.editor-post-publish-panel', { timeout: 15000 }).within(() => {
    cy.contains('button', /^Publish$/).click({ force: true });
  });
  cy.get(
    '.post-publish-panel__postpublish-post-address a, .editor-post-publish-panel__postpublish-link a, .components-snackbar a[href]',
    { timeout: 20000 }
  )
    .first()
    .should('be.visible');
});
