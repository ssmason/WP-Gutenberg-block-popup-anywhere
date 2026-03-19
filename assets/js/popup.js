/**
 * Frontend popup behaviour – open/close modals and hover styles.
 *
 * @package SatoriPopup
 * @author  Stephen Mason <stephen@satori.digital>
 */

(function () {
    'use strict';

    const SELECTOR_TRIGGER = '[data-popup-trigger]';
    const SELECTOR_OVERLAY = '[data-popup-overlay]';
    const SELECTOR_CLOSE = '[data-popup-close]';
    const CLASS_OPEN = 'satori-popup-open';
    const CLASS_BODY_OPEN = 'satori-popup-body-open';

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
                modal.focus();
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
                    closePopup(ov.getAttribute('data-popup-overlay'));
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
