# Satori Popup Button

A WordPress block that adds a button or link which opens a popup modal with customizable content. Built for Bedrock + Sage.

## Features

- **Per-page popups** – Each block instance has its own popup; no global modal
- **Trigger options** – Button or link, with custom text, alignment, and border radius
- **Color settings** – Text, background, hover text, and hover background via theme palette or custom hex
- **Popup content** – InnerBlocks with Cover block (color/image backgrounds), heading, paragraph, image, buttons
- **Popup sizes** – Small, medium, large, full width
- **Tailwind styling** – All styles via Tailwind utilities; no raw CSS
- **Accessibility** – ARIA attributes, focus management, Escape to close, backdrop click to close

## Requirements

- WordPress 6.0+
- PHP 8.0+
- Bedrock-compatible setup
- Block editor (Gutenberg)

## Installation

1. Place the plugin in `web/app/plugins/satori-popup/`
2. Activate via WP Admin → Plugins
3. Run `npm install && npm run build` inside the plugin directory
4. Add the **Popup Button** block from the design category in the block inserter

## Development

```bash
cd web/app/plugins/satori-popup
npm install
npm run build
```

- `npm run build` – Compiles block JS and Tailwind CSS
- `npm run start` – Watches for changes during development

## Structure

```
satori-popup/
├── assets/
│   └── js/
│       └── popup.js       # Frontend open/close + hover styles
├── build/
│   ├── index.js           # Compiled block (edit/save)
│   ├── style-index.css    # Compiled Tailwind styles
│   └── ...
├── includes/
│   ├── class-assets.php   # Asset hooks (block assets via block.json)
│   ├── class-autoloader.php
│   ├── class-block.php    # Block registration
│   └── class-plugin.php   # Plugin bootstrap
├── src/
│   ├── constants.js       # ALLOWED_BLOCKS, TEMPLATE, sizes, aligns
│   ├── edit.js            # Block editor UI
│   ├── index.js           # Block registration + Cover filter
│   ├── popup.css          # Tailwind source
│   └── save.js            # Frontend markup + deprecated
├── block.json
├── package.json
├── satori-popup.php       # Plugin entry
└── tailwind.config.js
```

## Block Attributes

| Attribute            | Type   | Default   | Description                    |
|----------------------|--------|-----------|--------------------------------|
| `uniqueId`           | string | `""`      | Instance ID for popup targeting |
| `triggerType`        | string | `"button"`| `button` or `link`             |
| `buttonText`         | string | `""`      | Trigger label                  |
| `textColor`          | string | `#ffffff` | Trigger text color             |
| `backgroundColor`    | string | `#000000` | Trigger background             |
| `hoverTextColor`     | string | `#000000` | Hover text color               |
| `hoverBackgroundColor`| string| `#ffffff` | Hover background               |
| `popupSize`          | string | `"medium"`| `small` / `medium` / `large` / `full` |
| `buttonAlign`        | string | `"left"`  | Trigger alignment               |
| `buttonBorderRadius` | string | `"md"`    | Border radius preset            |

## Styling

All styles use Tailwind. The block uses theme color palette when available; custom hex is supported via the color dropdown. Cover block background and image are configured in the Cover block settings.

## License

GPL-2.0-or-later

## Author

Stephen Mason – [satori.digital](https://satori.digital)
