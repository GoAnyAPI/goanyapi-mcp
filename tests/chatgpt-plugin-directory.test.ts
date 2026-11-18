import assert from "node:assert/strict";
import test from "node:test";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { chatgptPluginDirectoryCatalog } from "../src/chatgpt-plugin-directory-catalog.js";
import { clearCatalogCache } from "../src/catalog.js";
import { createMcpServer } from "../src/server.js";

test("四个 ChatGPT 工具与主站契约一致，SDK tools/list 和 tools/call 可直接使用", async () => {
  // 运行时读取主站契约，避免把相邻项目编译进 MCP 的 rootDir。
  const {
    CHATGPT_PLUGIN_DIRECTORY,
    CHATGPT_PLUGIN_MODES,
    getChatgptPluginSchema,
  } = await import(
    new URL(
      "../../go-any-api-vinext/src/shared/lib/chatgpt-plugin-directory-contract.ts",
      import.meta.url,
    ).href
  );
  const originalFetch = globalThis.fetch;
  const requests: URL[] = [];
  clearCatalogCache();
  globalThis.fetch = async (input) => {
    const url = new URL(String(input));
    requests.push(url);
    if (url.pathname === "/api/v1/mcp/catalog")
      return Response.json({
        code: "ok",
        data: { schemaVersion: 1, apis: chatgptPluginDirectoryCatalog },
      });
    return Response.json({ code: "ok", data: { result: [], creditsUsed: 0 } });
  };
  const server = await createMcpServer({
    baseUrl: "https://test.invalid",
    accessToken: "test-token",
    internalSecret: "test-secret",
  });
  const client = new Client({ name: "chatgpt-plugin-test", version: "1.0.0" });
  const [clientTransport, serverTransport] =
    InMemoryTransport.createLinkedPair();
  try {
    await server.connect(serverTransport);
    await client.connect(clientTransport);
    const { tools } = await client.listTools();
    assert.equal(tools.length, 4);
    for (const mode of CHATGPT_PLUGIN_MODES) {
      const definition = CHATGPT_PLUGIN_DIRECTORY.modes[mode];
      const tool = tools.find((item) => item.name === definition.mcpName)!;
      assert.deepEqual(tool.inputSchema, getChatgptPluginSchema(mode));
      assert.equal(tool.annotations?.readOnlyHint, true);
      const result = await client.callTool({
        name: tool.name,
        arguments: definition.example,
      });
      assert.equal(result.isError, undefined);
      assert.equal(requests.at(-1)!.pathname, definition.path);
      assert.equal(requests.at(-1)!.searchParams.has("size"), false);
    }
  } finally {
    await client.close();
    await server.close();
    globalThis.fetch = originalFetch;
    clearCatalogCache();
  }
});
