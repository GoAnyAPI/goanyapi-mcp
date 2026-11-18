import assert from 'node:assert/strict';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { bingSerpCatalog } from '../src/bing-serp-catalog.js';
import { clearCatalogCache } from '../src/catalog.js';
import { createMcpServer } from '../src/server.js';

test('Bing tools/list 完整发布新契约，市场和令牌调用不注入互斥默认值', async () => {
  const originalFetch = globalThis.fetch;
  const calls: URL[] = [];
  clearCatalogCache();
  globalThis.fetch = async (url: any) => {
    const target = new URL(String(url));
    if (target.pathname === '/api/v1/mcp/catalog') return Response.json({ code: 'ok', data: { schemaVersion: 1, apis: [bingSerpCatalog] } });
    calls.push(target);
    return Response.json({ code: 'ok', data: { endpoint: 'bing-serp', result: { format: 'json', content: { results: [] } } } });
  };
  const server = await createMcpServer({ baseUrl: 'https://api.goanyapi.com', accessToken: 'test-token', internalSecret: 'test-internal' });
  const client = new Client({ name: 'bing-test', version: '1.0.0' });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  try {
    await server.connect(serverTransport); await client.connect(clientTransport);
    const { tools } = await client.listTools();
    assert.equal(tools.length, 1);
    assert.equal(tools[0]!.name, 'goanyapi_bing_serp');
    assert.deepEqual(tools[0]!.inputSchema, bingSerpCatalog.inputSchema);
    assert.equal(tools[0]!.annotations?.readOnlyHint, true);
    assert.doesNotMatch(JSON.stringify(tools), /prismcrawl|brightdata|brd_browser|setLang/);
    const args = { query: 'coffee', mkt: 'fr-FR', device: 'tablet', coordinates: { latitude: 0, longitude: 0 }, next_page_token: 'opaque', zero_trace: true, no_cache: false };
    const response = await client.callTool({ name: 'goanyapi_bing_serp', arguments: args });
    assert.notEqual(response.isError, true);
    assert.equal(calls.length, 1);
    const params = calls[0]!.searchParams;
    assert.equal(params.has('cc'), false); assert.equal(params.has('first'), false); assert.equal(params.has('setlang'), false);
    assert.deepEqual(JSON.parse(params.get('coordinates')!), args.coordinates);
    assert.equal(params.get('next_page_token'), 'opaque'); assert.equal(params.get('no_cache'), 'false');
    assert.equal(params.get('query'), 'coffee'); assert.equal(params.has('q'), false);
  } finally {
    await client.close(); await server.close(); globalThis.fetch = originalFetch; clearCatalogCache();
  }
});
