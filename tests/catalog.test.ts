import assert from 'node:assert/strict';
import test from 'node:test';
import { clearCatalogCache, fallbackCatalog, loadApiCatalog } from '../src/catalog.js';

test('catalog contains public tools with accurate annotations', () => {
  assert.ok(fallbackCatalog.some(item => item.mcpName === 'goanyapi_domain_age'));
  assert.equal(new Set(fallbackCatalog.map((item) => item.mcpName)).size, fallbackCatalog.length);
  assert.ok(fallbackCatalog.some(item => item.method === 'POST' && !item.readOnly));
  assert.ok(fallbackCatalog.every(item => item.method === 'GET' || item.method === 'POST'));
  assert.ok(fallbackCatalog.every((item) => item.path.startsWith('/api/v1/') || String(item.path) === '/api/taaft-tools'));
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
    assert.equal(catalog[0]?.path, fallbackCatalog[0]?.path);
  } finally {
    globalThis.fetch = originalFetch;
    clearCatalogCache();
  }
});
