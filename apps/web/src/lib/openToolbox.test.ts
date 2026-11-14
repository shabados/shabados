// Run: bun run test
import assert from 'node:assert/strict';
import { test } from 'node:test';
import openToolbox from './openToolbox';

const closed = {
  controls: false,
  collections: false,
  journey: false,
  search: false,
};

test('nothing open: Esc has nothing to close', () => {
  assert.equal(openToolbox(closed), null);
});

for (const key of ['controls', 'collections', 'journey'] as const) {
  test(`Esc closes ${key} when it is open`, () => {
    assert.equal(openToolbox({ ...closed, [key]: true }), key);
  });
}

test('search is not closed by Esc', () => {
  assert.equal(openToolbox({ ...closed, search: true }), null);
});
