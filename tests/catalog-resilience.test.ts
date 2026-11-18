import assert from 'node:assert/strict';
import test from 'node:test';
import {clearCatalogCache, fallbackCatalog, loadApiCatalog} from '../src/catalog.js';

test('Catalog 支持 POST 与路径参数，刷新失败保留有效契约，恢复后更新', async () => {
  const originalFetch = globalThis.fetch;
  const originalWarn = console.warn;
  const warnings: unknown[][] = [];
  clearCatalogCache();
  const definition = {...fallbackCatalog[0]!, method:'POST' as const, readOnly:false, path:'/api/v1/tasks/{jobId}'};
  let apis: unknown[] = [definition];
  globalThis.fetch = async () => Response.json({code:'ok',data:{schemaVersion:1,apis}});
  console.warn = (...args: unknown[]) => { warnings.push(args); };
  try {
    const first = await loadApiCatalog('https://catalog.test', 0);
    assert.equal(first[0]?.path, definition.path);
    assert.equal(first[0]?.method, 'POST');
    apis = [definition, {...definition, path:'/api/v1/tasks/{bad'}];
    assert.equal(await loadApiCatalog('https://catalog.test', 0), first);
    assert.equal((warnings[0]?.[1] as {source:string}).source, 'last-known-good');
    apis = [{...definition, description:'updated'}];
    assert.equal((await loadApiCatalog('https://catalog.test', 0))[0]?.description, 'updated');
    clearCatalogCache();
    apis = [definition, definition];
    assert.equal(await loadApiCatalog('https://catalog.test', 0), fallbackCatalog);
    assert.equal((warnings.at(-1)?.[1] as {source:string}).source, 'bundled-fallback');
    clearCatalogCache();
    apis = [{...definition,path:'/api/v1/../private'}];
    assert.equal(await loadApiCatalog('https://catalog.test', 0), fallbackCatalog);
  } finally {
    globalThis.fetch = originalFetch;
    console.warn = originalWarn;
    clearCatalogCache();
  }
});
