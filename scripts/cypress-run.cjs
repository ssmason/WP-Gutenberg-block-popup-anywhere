#!/usr/bin/env node
/**
 * Runs Cypress with a clean cache path. Cursor may set CYPRESS_CACHE_FOLDER to a broken
 * sandbox cache; clearing it lets Cypress use its default (~/.cache/Cypress or ~/Library/Caches/Cypress).
 */
'use strict';

const { spawnSync } = require('child_process');

delete process.env.CYPRESS_CACHE_FOLDER;

const raw = process.argv.slice(2);
const skipIdx = raw.indexOf('--skip-verify');
if (skipIdx !== -1) {
  raw.splice(skipIdx, 1);
  process.env.CYPRESS_SKIP_VERIFY = 'true';
}

const sub = raw[0] || 'run';
const rest = raw.slice(1);

const r = spawnSync('npx', ['cypress', sub, ...rest], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: process.env,
});
process.exit(r.status === null ? 1 : r.status);
