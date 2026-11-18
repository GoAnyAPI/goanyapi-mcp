import assert from 'node:assert/strict';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { googleAiModeCatalog } from '../src/google-ai-mode-catalog.js';
import { clearCatalogCache, fallbackCatalog } from '../src/catalog.js';
import { createMcpServer } from '../src/server.js';

test('AI Mode tools/list 保留完整契约；POST 参数不注入互斥默认值', async () => {
 const original=globalThis.fetch;const calls: {url:URL;body:any;method:string}[]=[];clearCatalogCache();
 globalThis.fetch=async(input:any,init:any)=>{
  const url=new URL(String(input));
  if(url.pathname==='/api/v1/mcp/catalog')return Response.json({code:'ok',data:{schemaVersion:1,apis:googleAiModeCatalog}});
  calls.push({url,body:JSON.parse(init.body),method:init.method});
  return Response.json({code:'ok',data:{endpoint:'google-ai-mode',result:{format:'json',content:{results:[]}}}});
 };
 const server=await createMcpServer({baseUrl:'https://api2.goanyapi.com',accessToken:'test',internalSecret:'test'});
 const client=new Client({name:'ai-mode-test',version:'1.0.0'});const [ct,st]=InMemoryTransport.createLinkedPair();
 try {
  await server.connect(st);await client.connect(ct);
  const {tools}=await client.listTools();assert.equal(tools.length,1);assert.equal(tools[0]!.name,'goanyapi_google_ai_mode');assert.equal(tools[0]!.annotations?.readOnlyHint,true);assert.deepEqual(tools[0]!.inputSchema,googleAiModeCatalog[0]!.inputSchema);
  assert.doesNotMatch(JSON.stringify(tools),/prismcrawl|site_data_|x-api-key/);
  assert.ok(fallbackCatalog.some(v=>v.id==='google-ai-mode'));
  for(const args of [{query:'What is x.com'},{query:'image question',html:true},{query:'x',coordinates:{latitude:0,longitude:0},zero_trace:true},{query:'follow-up',subsequent_request_token:'gam1.test'}]){
   const result=await client.callTool({name:'goanyapi_google_ai_mode',arguments:args});assert.notEqual(result.isError,true);
   const call=calls.at(-1)!;assert.equal(call.method,'POST');assert.equal(call.url.pathname,'/api/v1/google-ai-mode');assert.equal(call.url.search,'');assert.deepEqual(call.body,args);
  }
 } finally {await client.close();await server.close();globalThis.fetch=original;clearCatalogCache();}
});
