# Contributing

## Development setup

```bash
cd web/app/plugins/satori-popup
npm install
npm run build
```

- `npm run build` – Compiles block JS (edit/save) and Tailwind CSS
- `npm run start` – Watch mode for development

## Code standards

- **PHP**: PSR-12, PHPCS (WPCS), Laravel Pint
- **JavaScript**: ESLint, WordPress block conventions
- **Styles**: Tailwind only; no raw CSS

## Making changes

1. Ensure the block editor loads correctly after changes
2. Verify frontend popup behaviour (open, close, Escape, backdrop click, focus trap)
3. Test with existing posts that use older block versions (deprecated)
4. Update ARCHITECTURE.md if you change the data attribute contract or boot flow

## Adding deprecated block versions

When changing save output:

1. Add a new entry to the `deprecated` array in `src/save.js`
2. Implement `migrate(attributes)` to map old attributes to the new shape
3. Reuse `renderPopupMarkup()` with appropriate `features` flags
4. Document the change in this file and in CHANGELOG.md
