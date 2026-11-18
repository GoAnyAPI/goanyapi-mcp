import type { JsonSchema } from './catalog-fallback.js';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { callGoAnyApi } from './api-client.js';
import { loadApiCatalog } from './catalog.js';
import { toToolError, toToolResult } from './response.js';
import { jsonSchemaToZodShape } from './schema.js';

export async function createMcpServer({
  baseUrl,
  accessToken,
  internalSecret,
}: {
  baseUrl: string;
  accessToken: string;
  internalSecret: string;
}) {
  const server = new McpServer({ name: 'goanyapi', version: '0.1.5' });
  const apiCatalog = await loadApiCatalog(baseUrl);

  for (const definition of apiCatalog) {
    server.registerTool(
      definition.mcpName,
      {
        description: definition.description,
        inputSchema: jsonSchemaToZodShape((definition.id === 'google-ai-overview' || definition.id === 'google-ai-mode' || definition.id === 'bing-serp' || definition.id === 'google-scholar') ? withoutDefaults(definition.inputSchema) : definition.inputSchema),
        annotations: {
          readOnlyHint: definition.readOnly,
          destructiveHint: false,
          idempotentHint: false,
          openWorldHint: true,
        },
      },
      async (args: Record<string, unknown>, _extra: unknown) => {
        try {
          return toToolResult(
            await callGoAnyApi(
              baseUrl,
              definition.path,
              definition.method,
              args,
              accessToken,
              internalSecret
            )
          );
        } catch (error) {
          return toToolError(error, { apiId: definition.id, stableCost: configuredCost(apiCatalog.find(api => api.id === 'serp-stable')), multiCost: configuredCost(definition) });
        }
      }
    );
  }

  // 保留 Catalog 的完整约束；Zod shape 转换会丢失 oneOf 等跨字段规则。
  server.server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: apiCatalog.map((definition) => ({
      name: definition.mcpName,
      description: definition.description,
      inputSchema: definition.inputSchema as typeof definition.inputSchema & { type: 'object' },
      annotations: {
        readOnlyHint: definition.readOnly,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
      },
    })),
  }));
  return server;
}

// 默认值仅用于自描述；不能在市场互斥和令牌分页请求中注入 cc / first。
function withoutDefaults(schema: JsonSchema): JsonSchema {
  const { default: _default, ...rest } = schema;
  return { ...rest, ...(schema.properties ? { properties: Object.fromEntries(Object.entries(schema.properties).map(([key, value]) => [key, withoutDefaults(value)])) } : {}) };
}

function configuredCost(value: unknown): number | undefined {
  const pricing = (value as { pricing?: { kind?: unknown; credits?: unknown } } | undefined)?.pricing;
  return pricing?.kind === 'fixed' && typeof pricing.credits === 'number' && Number.isSafeInteger(pricing.credits) && pricing.credits >= 0 ? pricing.credits : undefined;
}
