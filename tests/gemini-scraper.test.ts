import assert from 'node:assert/strict';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createMcpServer } from '../src/server.js';
import { clearCatalogCache } from '../src/catalog.js';
import { geminiScraperCatalog } from '../src/gemini-scraper-catalog.js';
import { callGoAnyApi } from '../src/api-client.js';

test('Gemini tools/list is self describing and both tools call the correct HTTP paths', async () => {
  const originalFetch = globalThis.fetch;
  const requests: { url: string; method: string; body?: any }[] = [];
  globalThis.fetch = async (url, init) => {
    if (String(url).endsWith('/mcp/catalog')) return Response.json({code:'ok',message:'ok',data:{schemaVersion:1,apis:geminiScraperCatalog}});
    requests.push({url:String(url),method:init?.method || 'GET',body:init?.body ? JSON.parse(String(init.body)) : undefined});
    return Response.json({code:'ok',message:'ok',data:{task_id:`gms_${'a'.repeat(64)}`,status:'running'}});
  };
  clearCatalogCache();
  const server=await createMcpServer({baseUrl:'https://example.com',accessToken:'test-token',internalSecret:'test-secret'});
  const client=new Client({name:'gemini-test',version:'1'});
  const [ct,st]=InMemoryTransport.createLinkedPair();
  try {
    await server.connect(st);await client.connect(ct);
    const {tools}=await client.listTools();assert.equal(tools.length,2);
    for(const definition of geminiScraperCatalog){const tool=tools.find(t=>t.name===definition.mcpName)!;assert.deepEqual(tool.inputSchema,definition.inputSchema);assert.equal(tool.annotations?.readOnlyHint,definition.readOnly);}
    await client.callTool({name:'goanyapi_gemini_scraper_submit',arguments:{inputs:[{prompt:'Compare tools',country:'US'}],idempotency_key:'batch_test_001'}});
    await client.callTool({name:'goanyapi_gemini_scraper_task',arguments:{task_id:`gms_${'a'.repeat(64)}`}});
    assert.equal(requests[0]?.method,'POST');assert.equal(requests[0]?.body.inputs[0].prompt,'Compare tools');
    assert.equal(requests[1]?.url,`https://example.com/api/v1/gemini-scraper/tasks/gms_${'a'.repeat(64)}`);assert.equal(requests[1]?.method,'GET');
  } finally { await client.close();await server.close();globalThis.fetch=originalFetch;clearCatalogCache(); }
});

test('任务提交与查询均为快速请求，保留默认超时', async () => {
  const originalFetch = globalThis.fetch;
  const originalTimer = globalThis.setTimeout;
  const delays: number[] = [];
  globalThis.fetch = async () => Response.json({ code: 'ok', data: { status: 'succeeded' } });
  globalThis.setTimeout = ((callback: (...args: any[]) => void, delay?: number, ...args: any[]) => {
    delays.push(Number(delay));
    return originalTimer(callback, delay, ...args);
  }) as typeof setTimeout;
  try {
    await callGoAnyApi('https://example.com', '/api/v1/gemini-scraper/tasks', 'POST', { inputs: [{ prompt: 'test' }], idempotency_key: 'test_sync_wait' }, 'test-token', 'test-secret');
    await callGoAnyApi('https://example.com', '/api/v1/gemini-scraper/tasks/{task_id}', 'GET', { task_id: `gms_${'a'.repeat(64)}` }, 'test-token', 'test-secret');
    assert.deepEqual(delays, [45_000, 45_000]);
  } finally { globalThis.fetch = originalFetch; globalThis.setTimeout = originalTimer; }
});
