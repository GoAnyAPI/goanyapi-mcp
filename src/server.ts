import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { callGoAnyApi } from './api-client.js';
import { loadApiCatalog } from './catalog.js';
import { toToolError, toToolResult } from './response.js';
import { jsonSchemaToZodShape } from './schema.js';

export async function createMcpServer({
  baseUrl,
  authorization,
}: {
  baseUrl: string;
  authorization: string;
}) {
  const server = new McpServer({ name: 'goanyapi', version: '0.1.0' });
  const apiCatalog = await loadApiCatalog(baseUrl);

  for (const definition of apiCatalog) {
    server.registerTool(
      definition.mcpName,
      {
        description: definition.description,
        inputSchema: jsonSchemaToZodShape(definition.inputSchema),
      },
      async (args: Record<string, unknown>, _extra: unknown) => {
        if (!authorization) return toToolError(new Error('Authorization is required.'));
        try {
          return toToolResult(
            await callGoAnyApi(baseUrl, definition.path, args, authorization)
          );
        } catch (error) {
          return toToolError(error);
        }
      }
    );
  }

  return server;
}
