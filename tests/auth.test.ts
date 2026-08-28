import assert from 'node:assert/strict';
import test from 'node:test';

import {
  bearerChallenge,
  extractBearerToken,
  protectedResourceMetadata,
} from '../src/auth.js';
import worker from '../src/index.js';

const env = {
  GOANYAPI_OAUTH_ISSUER: 'https://goanyapi.com/',
  GOANYAPI_MCP_RESOURCE: 'https://mcp.goanyapi.com/mcp',
};

test('publishes MCP protected resource metadata', () => {
  const metadata = protectedResourceMetadata(
    new Request('https://mcp.goanyapi.com/.well-known/oauth-protected-resource/mcp'),
    env
  );
  assert.deepEqual(metadata, {
    resource: 'https://mcp.goanyapi.com/mcp',
    authorization_servers: ['https://goanyapi.com'],
    bearer_methods_supported: ['header'],
    scopes_supported: ['mcp:invoke'],
  });
});

test('creates an OAuth discovery challenge for unauthenticated clients', () => {
  const request = new Request('https://mcp.goanyapi.com/mcp');
  const quote = String.fromCharCode(34);
  assert.equal(
    bearerChallenge(request, env),
    `Bearer resource_metadata=${quote}https://mcp.goanyapi.com/.well-known/oauth-protected-resource/mcp${quote}, scope=${quote}mcp:invoke${quote}`
  );
});

test('extracts bearer tokens case-insensitively', () => {
  const request = new Request('https://mcp.goanyapi.com/mcp', {
    headers: { authorization: 'bearer test-token' },
  });
  assert.equal(extractBearerToken(request), 'test-token');
});

test('serves discovery metadata and challenges unauthenticated MCP requests', async () => {
  const metadataResponse = await worker.fetch(
    new Request('https://mcp.goanyapi.com/.well-known/oauth-protected-resource/mcp'),
    env
  );
  assert.equal(metadataResponse.status, 200);
  assert.equal((await metadataResponse.json() as { resource: string }).resource, env.GOANYAPI_MCP_RESOURCE);

  const response = await worker.fetch(
    new Request('https://mcp.goanyapi.com/mcp'),
    { ...env, MCP_INTERNAL_SECRET: 'test-internal-secret' }
  );
  assert.equal(response.status, 401);
  assert.match(response.headers.get('www-authenticate') || '', /resource_metadata=/);
});
