import assert from 'node:assert/strict';
import test from 'node:test';
import { z } from 'zod';
import { jsonSchemaToZodShape } from '../src/schema.js';
import { clearCatalogCache, loadApiCatalog } from '../src/catalog.js';

test('TAAFT tools preserves numeric constraints and defaults', () => {
 const shape = jsonSchemaToZodShape({ type: 'object', properties: { page: { type: 'integer', minimum: 0, maximum: Number.MAX_SAFE_INTEGER, default: 0 } }, additionalProperties: false });
 const schema = z.object(shape);
 assert.deepEqual(schema.parse({}), { page: 0 });
 assert.deepEqual(schema.parse({page: 1}), { page: 1 });
 for (const page of [-1, 0.5, Number.MAX_SAFE_INTEGER + 1, '0']) assert.equal(schema.safeParse({page}).success, false);
});

test('Catalog accepts the exact TAAFT tools API path', async () => {
 const originalFetch = globalThis.fetch;
 clearCatalogCache();
 globalThis.fetch = async () => Response.json({ code: 'ok', data: { schemaVersion: 1, apis: [{ id: 'taaft-tools-api', method: 'GET', path: '/api/taaft-tools', mcpName: 'goanyapi_taaft_tools_api', description: 'Browse tools by zero-based page.', readOnly: true, inputSchema: {type: 'object', properties: {page: {type: 'integer', minimum: 0, default: 0}}} }] } });
 try {
  const catalog = await loadApiCatalog('https://taaft-tools.test');
  assert.equal(catalog.length, 1);
  assert.equal(catalog[0].mcpName, 'goanyapi_taaft_tools_api');
 } finally { globalThis.fetch = originalFetch; clearCatalogCache(); }
});
