import assert from 'node:assert/strict';
import test from 'node:test';
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {InMemoryTransport} from '@modelcontextprotocol/sdk/inMemory.js';
import {createMcpServer} from '../src/server.js';
import {clearCatalogCache} from '../src/catalog.js';
import {socialApiCatalog} from '../src/social-api-catalog.js';

test('10 个社交工具 tools/list 完整发布枚举与 URL 契约，tools/call 保留 POST JSON',async()=>{
  const original=globalThis.fetch,calls:{url:URL;method?:string;body:Record<string,unknown>}[]=[];
  globalThis.fetch=async(url,init)=>{
    if(String(url).endsWith('/mcp/catalog'))return Response.json({code:'ok',data:{schemaVersion:1,apis:socialApiCatalog}});
    calls.push({url:new URL(String(url)),method:init?.method,body:JSON.parse(String(init?.body))});
    return Response.json({code:'ok',message:'ok',data:{result:null,creditsUsed:1,remainingCredits:9}});
  };
  clearCatalogCache();
  const server=await createMcpServer({baseUrl:'https://example.com',accessToken:'test',internalSecret:'test'}),client=new Client({name:'social-api-test',version:'1'});
  const [ct,st]=InMemoryTransport.createLinkedPair();
  try{
    await server.connect(st);await client.connect(ct);
    const {tools}=await client.listTools();assert.equal(tools.length,socialApiCatalog.length);
    for(const api of socialApiCatalog){
      const tool=tools.find(tool=>tool.name===api.mcpName)!;
      assert.deepEqual(tool.inputSchema,api.inputSchema);assert.equal(tool.annotations?.readOnlyHint,true);
      const args=api.inputSchema.examples[0] as Record<string,unknown>;
      const result=await client.callTool({name:tool.name,arguments:args});assert.ok(!result.isError);
      const call=calls.at(-1)!;assert.equal(call.method,'POST');assert.equal(call.url.pathname,api.path);assert.equal(call.url.search,'');assert.deepEqual(call.body,api.id.startsWith('youtube-') ? {...Object.fromEntries(Object.entries(api.inputSchema.properties ?? {}).filter(([,p])=>p && typeof p === 'object' && 'default' in p).map(([name,p])=>[name,(p as any).default])),...args} : args);
    }
    const trending=tools.find(t=>t.name==='goanyapi_twitter_trending')!;
    assert.equal((trending.inputSchema.properties!.language as any).enum.length,15);
    assert.equal((trending.inputSchema.properties!.placeId as any).enum.length,69);
    assert.equal((trending.inputSchema.properties!.topicId as any).enum,undefined);
    await client.callTool({name:trending.name,arguments:{topicId:'https://x.com/i/topics/123'}});
    assert.equal(calls.at(-1)!.body.topicId,'https://x.com/i/topics/123');
  }finally{await client.close();await server.close();globalThis.fetch=original;clearCatalogCache();}
});
