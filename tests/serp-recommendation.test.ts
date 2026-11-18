import assert from 'node:assert/strict';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { clearCatalogCache } from '../src/catalog.js';
import { createMcpServer } from '../src/server.js';
import { googleSerpCatalog } from '../src/google-serp-catalog.js';
import { GoAnyApiError } from '../src/api-client.js';
import { toToolError } from '../src/response.js';

test('MCP lists Stable guidance and decorates Multi-mode failures without retrying', async () => {
 const original = globalThis.fetch;
 let requests = 0;
 clearCatalogCache();
 globalThis.fetch = async (input) => {
  const url = String(input);
  if (url.includes('/mcp/catalog')) return Response.json({code:'ok',data:{schemaVersion:1,apis:googleSerpCatalog.map(api=>({...api,pricing:{kind:'fixed',credits:api.id==='serp-stable'?2:5}}))}});
  requests++;
  return Response.json({code:'request_failed',message:'Request failed'}, {status:502});
 };
 const server = await createMcpServer({baseUrl:'https://api.goanyapi.com',accessToken:'test',internalSecret:'test'});
 const client = new Client({name:'test',version:'1'});
 const [ct,st] = InMemoryTransport.createLinkedPair();
 try {
  await server.connect(st); await client.connect(ct);
  const {tools} = await client.listTools();
  for (const api of googleSerpCatalog) {
   const tool = tools.find(tool=>tool.name===api.mcpName)!;
   assert.match(tool.description!, /goanyapi_google_serp_stable/);
   assert.deepEqual(tool.inputSchema,api.inputSchema);
  }
  const result = await client.callTool({name:'goanyapi_google_serp',arguments:{q:'dreck meaning',gl:'us',hl:'en'}});
  assert.equal(result.isError,true);
  assert.match(JSON.stringify(result.content), /fewer credits/);
  assert.match(JSON.stringify(result.content), /Rename q to query/);
  assert.equal((result.structuredContent as any).recommendation.recommended_endpoint,'/api/v1/serp-stable');
  assert.deepEqual((result.structuredContent as any).error,{code:'request_failed',message:'Request failed'});
  assert.equal(requests,1);
 } finally { await client.close(); await server.close(); globalThis.fetch=original; clearCatalogCache(); }
});

test('auth, parameter and credit failures keep their existing messages', () => {
 for (const status of [400,401,402,429]) {
  const result=toToolError(new GoAnyApiError(status,{code:'error'}),{apiId:'serp'});
  assert.equal('recommendation' in result.structuredContent!, false);
 }
 for (const stableCost of [5,7]) {
  const result=toToolError(new GoAnyApiError(502,{code:'request_failed'}),{apiId:'serp',stableCost,multiCost:5});
  assert.doesNotMatch(result.content[0].text,/fewer credits/);
 }
 const stable=toToolError(new GoAnyApiError(502,{}),{apiId:'serp-stable'});
 assert.equal('recommendation' in stable.structuredContent!,false);
});
