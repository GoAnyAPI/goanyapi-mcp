import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import { createMcpServer } from './server.js';

export interface Env {
  GOANYAPI_API_BASE_URL?: string;
}

function corsHeaders(request: Request) {
  const origin = request.headers.get('origin');
  const headers = new Headers({
    'Access-Control-Allow-Headers':
      'Authorization, Content-Type, Accept, MCP-Protocol-Version, Last-Event-ID',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Expose-Headers': 'Mcp-Session-Id',
    Vary: 'Origin',
  });
  if (origin) headers.set('Access-Control-Allow-Origin', origin);
  return headers;
}

async function handleMcp(request: Request, env: Env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(request) });
  }

  const authorization = request.headers.get('authorization') || '';
  const server = await createMcpServer({
    baseUrl: env.GOANYAPI_API_BASE_URL || 'https://api.goanyapi.com',
    authorization,
  });
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  await server.connect(transport);
  const response = await transport.handleRequest(request);
  const headers = new Headers(response.headers);
  corsHeaders(request).forEach((value, key) => headers.set(key, value));
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/health') {
      return Response.json({ ok: true });
    }
    if (url.pathname !== '/mcp') {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    return handleMcp(request, env);
  },
};
