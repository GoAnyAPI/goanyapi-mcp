import assert from 'node:assert/strict';
import test from 'node:test';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {InMemoryTransport} from '@modelcontextprotocol/sdk/inMemory.js';
import {createMcpServer} from '../src/server.js';
import {clearCatalogCache} from '../src/catalog.js';
import {tiktokSyncCatalog} from '../src/tiktok-sync-catalog.js';
test('7 个同步 TikTok MCP 工具从 tools/list 可构造请求并保留最大分页约束',async()=>{
 const original=globalThis.fetch;const calls:{url:string;method?:string}[]=[];
 globalThis.fetch=async(url,init)=>{if(String(url).endsWith('/mcp/catalog'))return Response.json({code:'ok',data:{schemaVersion:1,apis:tiktokSyncCatalog}});calls.push({url:String(url),method:init?.method});return Response.json({code:'ok',data:{items:[]}});};clearCatalogCache();
 const server=await createMcpServer({baseUrl:'https://example.com',accessToken:'test',internalSecret:'test'});const client=new Client({name:'tiktok-sync-test',version:'1'});const [ct,st]=InMemoryTransport.createLinkedPair();
 try{await server.connect(st);await client.connect(ct);const {tools}=await client.listTools();assert.equal(tools.length,7);
  for(const definition of tiktokSyncCatalog){const tool=tools.find(t=>t.name===definition.mcpName)!;assert.deepEqual(tool.inputSchema,definition.inputSchema);assert.equal(tool.annotations?.readOnlyHint,true);const input:Record<string,string|number>={};for(const [name,field] of Object.entries(definition.inputSchema.properties??{})){if(name==='url')continue;if('enum' in field){input[name]=String(field.enum[0]);continue;}if('default' in field)input[name]=field.default as string|number;else input[name]=['item_id','challenge_id','category_type'].includes(name)?'123':name==='sec_uid'?'MS4wLjABAAAAexample':'example';}await client.callTool({name:tool.name,arguments:input});assert.equal(calls.at(-1)?.method,'GET');assert.equal(new URL(calls.at(-1)!.url).pathname,definition.path);if('url' in (definition.inputSchema.properties??{})){const url=definition.id==='tiktok-video-detail'?'https://www.tiktok.com/@example/video/123':definition.id.includes('hashtag')?'https://www.tiktok.com/tag/fyp':'https://www.tiktok.com/@example';await client.callTool({name:tool.name,arguments:{url}});assert.equal(new URL(calls.at(-1)!.url).searchParams.get('url'),url);}}
 }finally{await client.close();await server.close();globalThis.fetch=original;clearCatalogCache();}
});
