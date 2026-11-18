import assert from 'node:assert/strict';
import test from 'node:test';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {InMemoryTransport} from '@modelcontextprotocol/sdk/inMemory.js';
import {domainAgeCatalog} from '../src/domain-age-catalog.js';
import {clearCatalogCache,fallbackCatalog} from '../src/catalog.js';
import {createMcpServer} from '../src/server.js';

test('Domain Age tools/list 暴露完整 GET 契约，调用仅发送 domain 参数',async()=>{
 const original=globalThis.fetch;const calls:Array<{url:URL;method:string}>=[];clearCatalogCache();
 globalThis.fetch=async(input:any,init:any)=>{
  const url=new URL(String(input));
  if(url.pathname==='/api/v1/mcp/catalog')return Response.json({code:'ok',data:{schemaVersion:1,apis:domainAgeCatalog}});
  calls.push({url,method:init.method});assert.equal(init.body,undefined);assert.ok(init.signal);
  return Response.json({code:'ok',data:{endpoint:'domain-age',domain:'example.com',registration:null,age_days:null,costCredits:0}});
 };
 const server=await createMcpServer({baseUrl:'https://api2.goanyapi.com',accessToken:'test',internalSecret:'test'});
 const client=new Client({name:'domain-age-test',version:'1.0.0'});const [ct,st]=InMemoryTransport.createLinkedPair();
 try {
  await server.connect(st);await client.connect(ct);
  const {tools}=await client.listTools();assert.equal(tools.length,1);assert.equal(tools[0]!.name,'goanyapi_domain_age');assert.equal(tools[0]!.annotations?.readOnlyHint,true);assert.deepEqual(tools[0]!.inputSchema,domainAgeCatalog[0]!.inputSchema);
  assert.ok(fallbackCatalog.some(v=>v.id==='domain-age'));assert.doesNotMatch(JSON.stringify(tools),/password|clientId|sitedata\.dev|site_data_/);
  for(const domain of ['example.com','https://sub.example.com/about']){
   const result=await client.callTool({name:'goanyapi_domain_age',arguments:{domain}});assert.notEqual(result.isError,true);
   const call=calls.at(-1)!;assert.equal(call.method,'GET');assert.equal(call.url.pathname,'/api/v1/domain-age');assert.deepEqual([...call.url.searchParams], [['domain',domain]]);
  }
 }finally{await client.close();await server.close();globalThis.fetch=original;clearCatalogCache();}
});
