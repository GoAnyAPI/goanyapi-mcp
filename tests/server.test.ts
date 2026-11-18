import assert from 'node:assert/strict';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { clearCatalogCache, fallbackCatalog } from '../src/catalog.js';
import { createMcpServer } from '../src/server.js';

test('publishes public API tools with catalog annotations', async () => {
  const originalFetch = globalThis.fetch;
  clearCatalogCache();
  const definition = {
    ...fallbackCatalog[0]!,
    inputSchema: {
      type: 'object',
      properties: { year: { type: 'integer', minimum: 1000, maximum: 2026 }, month: { type: 'integer', minimum: 1, maximum: 12 } },
      oneOf: [{ required: ['year'], not: { required: ['month'] } }, { required: ['year', 'month'] }],
    },
  };
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        code: 'ok',
        message: 'ok',
        data: { schemaVersion: 1, apis: [definition] },
      }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );

  const server = await createMcpServer({
    baseUrl: 'https://api.goanyapi.com',
    accessToken: 'test-access-token',
    internalSecret: 'test-internal-secret',
  });
  const client = new Client({ name: 'test-client', version: '1.0.0' });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  try {
    await server.connect(serverTransport);
    await client.connect(clientTransport);

    const { tools } = await client.listTools();
    assert.equal(tools.length, 1);
    assert.deepEqual(tools[0]?.inputSchema, definition.inputSchema);
    assert.deepEqual(tools[0]?.annotations, {
      readOnlyHint: fallbackCatalog[0]?.readOnly,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    });
  } finally {
    await client.close();
    await server.close();
    globalThis.fetch = originalFetch;
    clearCatalogCache();
  }
});
