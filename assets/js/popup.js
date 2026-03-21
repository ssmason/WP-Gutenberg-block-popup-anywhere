/**
 * Frontend popup behaviour – open/close modals, hover styles, focus trap.
 *
 * Data attribute contract (save.js → this script):
 * - [data-popup-trigger] id: which popup to open
 * - [data-popup-overlay] id: overlay container
 * - [data-popup-modal] id: dialog element (focus target)
 * - [data-popup-close] id: close button
 * - [data-hover-text], [data-hover-bg]: CSS custom properties for hover
 *
 * @package SatoriPopup
 * @author  Stephen Mason <stephen@satori.digital>
 */

(function () {
    'use strict';

    const SELECTOR_TRIGGER = '[data-popup-trigger]';
    const SELECTOR_OVERLAY = '[data-popup-overlay]';
    const SELECTOR_CLOSE = '[data-popup-close]';
    const FOCUSABLE =
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const CLASS_OPEN = 'satori-popup-open';
    const CLASS_BODY_OPEN = 'satori-popup-body-open';

    /**
     * Gets focusable elements within a container.
     *
     * @param {Element} container DOM element.
     * @return {Element[]}
     */
    function getFocusable(container) {
        return Array.prototype.filter.call(
            container.querySelectorAll(FOCUSABLE),
            function (el) {
                return el.offsetParent !== null;
            }
        );
    }

    /**
     * Sets up focus trap for an open overlay.
     *
     * @param {Element} overlay Overlay element.
     * @return {Function} Cleanup function.
     */
    function setupFocusTrap(overlay) {
        function handleKeyDown(e) {
            if (e.key !== 'Tab') {
                return;
            }
            const focusable = getFocusable(overlay);
            if (focusable.length === 0) {
                return;
            }
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown, true);

        return function () {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    }

    /**
     * Opens a popup by ID.
     *
     * @param {string} id Unique popup identifier.
     * @return {void}
     */
    function openPopup(id) {
        const overlay = document.querySelector(
            `${SELECTOR_OVERLAY}[data-popup-overlay="${id}"]`
        );
        if (overlay) {
            overlay.classList.add(CLASS_OPEN);
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add(CLASS_BODY_OPEN);

            const modal = overlay.querySelector('[data-popup-modal]');
            if (modal) {
                modal.setAttribute('tabindex', '-1');
                modal.focus();
            }

            const focusable = getFocusable(overlay);
            if (focusable.length > 0) {
                overlay._satoriFocusTrapCleanup = setupFocusTrap(overlay);
            }
        }
    }

    /**
     * Closes a popup by ID.
     *
     * @param {string} id Unique popup identifier.
     * @return {void}
     */
    function closePopup(id) {
        const overlay = document.querySelector(
            `${SELECTOR_OVERLAY}[data-popup-overlay="${id}"]`
        );
        if (overlay) {
            if (overlay._satoriFocusTrapCleanup) {
                overlay._satoriFocusTrapCleanup();
                overlay._satoriFocusTrapCleanup = null;
            }
            overlay.classList.remove(CLASS_OPEN);
            overlay.setAttribute('aria-hidden', 'true');

            const openCount = document.querySelectorAll(
                `${SELECTOR_OVERLAY}.${CLASS_OPEN}`
            ).length;
            if (openCount === 0) {
                document.body.classList.remove(CLASS_BODY_OPEN);
            }
        }
    }

    /**
     * Binds hover styles from data attributes to triggers.
     *
     * @return {void}
     */
    function bindHoverStyles() {
        const triggers = document.querySelectorAll(SELECTOR_TRIGGER);
        triggers.forEach(function (trigger) {
            const hoverText = trigger.getAttribute('data-hover-text');
            const hoverBg = trigger.getAttribute('data-hover-bg');

            if (hoverText || hoverBg) {
                trigger.style.setProperty('--satori-hover-color', hoverText || '');
                trigger.style.setProperty('--satori-hover-bg', hoverBg || '');
            }
        });
    }

    /**
     * Binds click handlers for triggers, close buttons, and overlay backdrop.
     *
     * @return {void}
     */
    function bindEvents() {
        document.addEventListener('click', function (e) {
            const trigger = e.target.closest(SELECTOR_TRIGGER);
            if (trigger) {
                e.preventDefault();
                const id = trigger.getAttribute('data-popup-trigger');
                if (id) {
                    openPopup(id);
                }
                return;
            }

            const closeBtn = e.target.closest(SELECTOR_CLOSE);
            if (closeBtn) {
                e.preventDefault();
                const id = closeBtn.getAttribute('data-popup-close');
                if (id) {
                    closePopup(id);
                }
                return;
            }

            const overlay = e.target.closest(SELECTOR_OVERLAY);
            if (overlay && e.target === overlay) {
                const id = overlay.getAttribute('data-popup-overlay');
                if (id) {
                    closePopup(id);
                }
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const openOverlays = document.querySelectorAll(
                    `${SELECTOR_OVERLAY}.${CLASS_OPEN}`
                );
                openOverlays.forEach(function (ov) {
                    closePopup(ov.getAttribute('data-popup-overlay') || '');
                });
            }
        });
    }

    /**
     * Initialises popup behaviour.
     *
     * @return {void}
     */
    function init() {
        bindHoverStyles();
        bindEvents();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
