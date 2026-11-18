import assert from 'node:assert/strict';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { googleScholarCatalog } from '../src/google-scholar-catalog.js';
import { clearCatalogCache, fallbackCatalog } from '../src/catalog.js';
import { createMcpServer } from '../src/server.js';

test('Scholar tools/list 保留完整 Schema，三种查询模式不注入互斥默认值', async () => {
 const fetch=globalThis.fetch; const calls: URL[]=[];clearCatalogCache();
 globalThis.fetch=async(input:any)=>{
  const url=new URL(String(input));
  if(url.pathname==='/api/v1/mcp/catalog')return Response.json({code:'ok',data:{schemaVersion:1,apis:[googleScholarCatalog]}});
  calls.push(url);return Response.json({code:'ok',data:{endpoint:'google-scholar',result:{format:'json',content:{results:[]}}}});
 };
 const server=await createMcpServer({baseUrl:'https://goanyapi.com',accessToken:'test',internalSecret:'test'});
 const client=new Client({name:'scholar-test',version:'1.0.0'});
 const [ct,st]=InMemoryTransport.createLinkedPair();
 try {
  await server.connect(st);await client.connect(ct);
  const {tools}=await client.listTools();assert.equal(tools.length,1);assert.deepEqual(tools[0]!.inputSchema,googleScholarCatalog.inputSchema);assert.equal(tools[0]!.annotations?.readOnlyHint,true);
  assert.doesNotMatch(JSON.stringify(tools),/prismcrawl|site_data_/i);
  assert.ok(fallbackCatalog.some(v=>v.id==='google-scholar'));
  for(const args of [{query:'machine learning'}, {cites:'123',query:'review',start:10}, {cluster:'123',start:10}]) {
   const result=await client.callTool({name:'goanyapi_google_scholar',arguments:args});assert.notEqual(result.isError,true);
   const url=calls.at(-1)!;assert.equal(url.pathname,'/api/v1/google-scholar');assert.deepEqual(Object.fromEntries(url.searchParams),Object.fromEntries(Object.entries(args).map(([k,v])=>[k,String(v)])));
  }
 } finally {await client.close();await server.close();globalThis.fetch=fetch;clearCatalogCache();}
});
