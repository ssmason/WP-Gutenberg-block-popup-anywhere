# Editor Popup Content UI – Changelog

**Date:** 2025-03-19  
**Feature:** Collapsible popup content in the editor (block inserter works).

## Current Implementation (Collapsible Inline)

The popup content (Cover + InnerBlocks) is **collapsible** – collapsed by default, expanded when the user clicks "Edit popup content". Content stays **inline** in the editor canvas so the block inserter (+) positions correctly.

### 1. `src/edit.js`

- State: `isContentExpanded` (replaces `isModalOpen`)
- Button toggles: "Edit popup content" / "Hide popup content"
- When expanded: inline `satori-popup-editor-overlay` with modal structure + InnerBlocks
- No Modal component (Modal caused block inserter to appear below/below usable area)

### 2. `src/popup.css`

- `.satori-popup-editor-overlay`: static, visible, mt-4, transparent background
- `.satori-popup-editor-overlay .satori-popup-modal`: max-h-none, shadow-none

---

## How to Revert

To restore the original inline popup content in the editor:

1. **edit.js**: Remove `Modal` import, `isModalOpen` state, the "Edit popup content" button, and the conditional `Modal`. Restore the original `satori-popup-overlay` div with its full structure (overlay > modal > close button > content > InnerBlocks).

2. **popup.css**: Restore the original `.satori-popup-editor .satori-popup-trigger-wrap` rules (`justify-start`/`center`/`right` instead of `items-*`), remove `flex-col gap-2`. Restore `.satori-popup-editor .satori-popup-overlay` and `.satori-popup-editor .satori-popup-overlay .satori-popup-modal` styles. Remove `.satori-popup-editor-modal .satori-popup-editor-modal-inner`.

3. Run `npm run build` in the plugin directory.
