import assert from 'node:assert/strict';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { createMcpServer } from '../src/server.js';
import { clearCatalogCache } from '../src/catalog.js';
import { tiktokCommentsCatalog } from '../src/tiktok-comments-catalog.js';
test('TikTok tools/list and submit/query/resume HTTP calls preserve public contracts',async()=>{
  const original=globalThis.fetch;const requests:any[]=[];
  globalThis.fetch=async(url,init)=>{
    if(String(url).endsWith('/mcp/catalog'))return Response.json({code:'ok',data:{schemaVersion:1,apis:tiktokCommentsCatalog}});
    requests.push({url:String(url),method:init?.method,body:init?.body?JSON.parse(String(init.body)):null});
    return Response.json({code:'ok',data:{task_id:`ttc_${'a'.repeat(32)}`,status:'queued'}});
  };
  clearCatalogCache();
  const server=await createMcpServer({baseUrl:'https://example.com',accessToken:'test',internalSecret:'test'});
  const client=new Client({name:'tiktok-test',version:'1'});const [ct,st]=InMemoryTransport.createLinkedPair();
  try{
    await server.connect(st);await client.connect(ct);
    const {tools}=await client.listTools();assert.equal(tools.length,3);
    for(const definition of tiktokCommentsCatalog){const tool=tools.find(row=>row.name===definition.mcpName)!;assert.deepEqual(tool.inputSchema,definition.inputSchema);assert.equal(tool.annotations?.readOnlyHint,definition.readOnly);}
    const id=`ttc_${'a'.repeat(32)}`;
    const sharedUrl='https://www.tiktok.com/@spidey.glow/video/7686957509826923808?is_from_webapp=1&sender_device=pc';
    const submitTool=tools.find(tool=>tool.name==='goanyapi_tiktok_comments_submit')!;
    assert.ok(new RegExp((submitTool.inputSchema.properties?.video_url as {pattern:string}).pattern).test(sharedUrl));
    await client.callTool({name:'goanyapi_tiktok_comments_submit',arguments:{video_url:sharedUrl,mode:'all',include_replies:true}});
    await client.callTool({name:'goanyapi_tiktok_comments_task',arguments:{task_id:id,result_cursor:'123',limit:40}});
    await client.callTool({name:'goanyapi_tiktok_comments_resume',arguments:{task_id:id}});
    assert.equal(requests[0].method,'POST');assert.equal(requests[0].body.video_url,sharedUrl);assert.equal(requests[0].body.mode,'all');assert.equal(requests[0].body.cursor,undefined);
    assert.ok(requests[1].url.includes(`/tasks/${id}?`));assert.equal(new URL(requests[1].url).searchParams.get('limit'),'40');
    assert.equal(requests[2].url,`https://example.com/api/v1/tiktok-comments/tasks/${id}/resume`);assert.deepEqual(requests[2].body,{});
  }finally{await client.close();await server.close();globalThis.fetch=original;clearCatalogCache();}
});
