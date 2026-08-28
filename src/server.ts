import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
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
  const server = new McpServer({ name: 'goanyapi', version: '0.1.0' });
  const apiCatalog = await loadApiCatalog(baseUrl);

  for (const definition of apiCatalog) {
    server.registerTool(
      definition.mcpName,
      {
        description: definition.description,
        inputSchema: jsonSchemaToZodShape(definition.inputSchema),
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
              args,
              accessToken,
              internalSecret
            )
          );
        } catch (error) {
          return toToolError(error);
        }
      }
    );
  }

  return server;
}
