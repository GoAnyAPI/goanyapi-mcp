import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import {
  authenticateMcpRequest,
  bearerChallenge,
  protectedResourceMetadata,
} from './auth.js';
import { createMcpServer } from './server.js';

export interface Env {
  GOANYAPI_API_BASE_URL?: string;
  GOANYAPI_OAUTH_ISSUER?: string;
  GOANYAPI_MCP_RESOURCE?: string;
  MCP_INTERNAL_SECRET?: string;
}

function corsHeaders(request: Request) {
  const origin = request.headers.get('origin');
  const headers = new Headers({
    'Access-Control-Allow-Headers':
      'Authorization, Content-Type, Accept, MCP-Protocol-Version, Last-Event-ID',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Expose-Headers': 'Mcp-Session-Id, WWW-Authenticate',
    Vary: 'Origin',
  });
  if (origin) headers.set('Access-Control-Allow-Origin', origin);
  return headers;
}

async function handleMcp(request: Request, env: Env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(request) });
  }

  if (!env.MCP_INTERNAL_SECRET) {
    return Response.json(
      { error: 'server_error', error_description: 'MCP gateway authentication is not configured' },
      { status: 503, headers: corsHeaders(request) }
    );
  }

  let authentication;
  try {
    authentication = await authenticateMcpRequest(request, env);
  } catch (error) {
    console.warn('mcp bearer authentication failed', error);
    const headers = corsHeaders(request);
    headers.set('WWW-Authenticate', bearerChallenge(request, env, 'invalid_token'));
    return Response.json(
      { error: 'invalid_token', error_description: 'The access token is invalid or expired' },
      { status: 401, headers }
    );
  }
  if (!authentication) {
    const headers = corsHeaders(request);
    headers.set('WWW-Authenticate', bearerChallenge(request, env));
    return Response.json(
      { error: 'unauthorized', error_description: 'OAuth authorization is required' },
      { status: 401, headers }
    );
  }

  const server = await createMcpServer({
    baseUrl: env.GOANYAPI_API_BASE_URL || 'https://api.goanyapi.com',
    accessToken: authentication.token,
    internalSecret: env.MCP_INTERNAL_SECRET,
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
      return Response.json({ ok: true, oauthConfigured: Boolean(env.MCP_INTERNAL_SECRET) });
    }
    if (
      url.pathname === '/.well-known/oauth-protected-resource' ||
      url.pathname === '/.well-known/oauth-protected-resource/mcp'
    ) {
      return Response.json(protectedResourceMetadata(request, env), {
        headers: { 'cache-control': 'public, max-age=300' },
      });
    }
    if (url.pathname !== '/mcp') {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }
    return handleMcp(request, env);
  },
};
