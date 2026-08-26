import assert from 'node:assert/strict';
import test from 'node:test';
import { clearCatalogCache, fallbackCatalog, loadApiCatalog } from '../src/catalog.js';

test('catalog contains only public read-only tools', () => {
  assert.equal(fallbackCatalog.length, 17);
  assert.equal(new Set(fallbackCatalog.map((item) => item.mcpName)).size, fallbackCatalog.length);
  assert.ok(fallbackCatalog.every((item) => item.readOnly));
  assert.ok(fallbackCatalog.every((item) => item.path.startsWith('/api/v1/')));
});

test('loads the catalog from the GoAnyAPI endpoint', async () => {
  const originalFetch = globalThis.fetch;
  clearCatalogCache();
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        code: 'ok',
        message: 'ok',
        data: { schemaVersion: 1, apis: [fallbackCatalog[0]] },
      }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );

  try {
    const catalog = await loadApiCatalog('https://api.goanyapi.com');
    assert.equal(catalog.length, 1);
    assert.equal(catalog[0]?.path, '/api/v1/traffic');
  } finally {
    globalThis.fetch = originalFetch;
    clearCatalogCache();
  }
});
