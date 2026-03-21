# Architecture

## Overview

Satori Popup is a **save-based** block: the frontend markup is output by React's `save()` and stored in post content. The PHP `Block::render()` is a pass-through; it returns the saved content without server-side processing.

## Boot flow

```
plugins_loaded (priority 0)
  → Plugin::instance()->boot()
    → Block::register()   (on init, priority 20)
    → Assets::register()
```

Block assets (editorScript, editorStyle, style, viewScript) are enqueued by WordPress from block.json when the block appears on the page. No PHP asset registration is required.

## Data flow

1. **block.json** – Declares attributes, editorScript, viewScript, style.
2. **edit.js** – Renders the block editor UI; attributes are edited via InspectorControls.
3. **save.js** – Outputs HTML with data attributes (e.g. `data-popup-trigger`, `data-popup-overlay`).
4. **popup.js** – Vanilla JS on the frontend; reads data attributes to wire open/close/hover behaviour.

## Data attribute contract (save.js ↔ popup.js)

| Attribute | Element | Purpose |
|-----------|---------|---------|
| `data-popup-trigger` | Trigger button/link | ID of popup to open |
| `data-popup-overlay` | Overlay container | ID for overlay targeting |
| `data-popup-modal` | Dialog element | Focus target, role="dialog" |
| `data-popup-close` | Close button | ID to close |
| `data-hover-text` | Trigger | CSS `--satori-hover-color` |
| `data-hover-bg` | Trigger | CSS `--satori-hover-bg` |

Changing these attributes in save.js requires corresponding updates in popup.js.

## Cover block filter

`core/cover` restricts its inner blocks by default. The popup uses Cover as the content wrapper (for background colours/images), but authors need to add headings, images, buttons, etc. The `blocks.registerBlockType` filter sets `allowedBlocks: true` for Cover so any block can be nested. The filter is global by design; there is no block-context API to apply it only when Cover is inside a popup.

## Editor vs frontend

- **Editor**: Popup content is collapsible inline (see CHANGES-MODAL-EDITOR.md). No overlay; content appears below the trigger.
- **Frontend**: Overlay + modal; popup.js handles open/close, focus trap, Escape, backdrop click.

## Deprecated blocks

When structure changes, a deprecated entry is added with `migrate()` to transform old attributes. Save output must match the previous structure so existing posts render correctly. See save.js for the migration history.
