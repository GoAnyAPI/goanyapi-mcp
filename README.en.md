# GoAnyAPI MCP

English | [中文](README.md)

A remote HTTP MCP server for GoAnyAPI. Clients connect through a standard OAuth 2.1 authorization code flow; users do not create, copy, or store a GoAnyAPI API key.

## Connect

MCP URL:

```text
https://mcp.goanyapi.com/mcp
```

Configure only this URL in a client that supports OAuth for remote HTTP MCP. On first connection, the client opens the GoAnyAPI sign-in and consent page, then stores the access and refresh tokens returned by the OAuth flow.

Codex example:

```toml
[mcp_servers.goanyapi]
url = 'https://mcp.goanyapi.com/mcp'
```

Claude Code can add the remote HTTP server and complete authorization through `/mcp`:

```bash
claude mcp add --transport http goanyapi https://mcp.goanyapi.com/mcp
```

The authorization is linked to the signed-in GoAnyAPI account. MCP calls consume that account's credits and no hidden API key is issued to the client. Add credits on the [GoAnyAPI pricing page](https://goanyapi.com/pricing) when needed.

An account can authorize up to 10 MCP clients. Each grant can keep up to 3 active sessions, with 15 active sessions per account overall. Users can revoke clients under GoAnyAPI Settings → MCP Authorizations; revoked access stops working immediately.

## OAuth endpoints

- Protected Resource Metadata: `/.well-known/oauth-protected-resource/mcp`
- Authorization Server Metadata: `https://goanyapi.com/.well-known/oauth-authorization-server`
- Dynamic Client Registration: `https://goanyapi.com/api/oauth/register`
- Authorization: `https://goanyapi.com/oauth/authorize`
- Token: `https://goanyapi.com/api/oauth/token`
- Revocation: `https://goanyapi.com/api/oauth/revoke`

The server supports authorization code with PKCE S256, refresh-token rotation, Resource Indicators, and Dynamic Client Registration. The supported scope is `mcp:invoke`.

## Development

```bash
pnpm install
pnpm test
pnpm type-check
pnpm dev
```

Public Worker variables are configured in `wrangler.toml`:

- `GOANYAPI_API_BASE_URL`
- `GOANYAPI_OAUTH_ISSUER`
- `GOANYAPI_MCP_RESOURCE`

Set `MCP_INTERNAL_SECRET` as a Worker secret and use the exact same secret in the GoAnyAPI application:

```bash
wrangler secret put MCP_INTERNAL_SECRET
```

The main application also requires `MCP_OAUTH_ISSUER`, `MCP_OAUTH_RESOURCE`, `MCP_OAUTH_KEY_ID`, and the ES256 private key in `MCP_OAUTH_PRIVATE_JWK`. Generate a key from the main repository with:

```bash
node scripts/generate-mcp-oauth-key.mjs
```

The OAuth database migration is `src/config/db/migrations/0012_add_mcp_oauth.sql` in the main application.

## Security

- Access tokens expire after 30 minutes. Refresh tokens expire after 30 days and rotate on use.
- The MCP Worker verifies JWT signature, issuer, audience, and scope.
- The main API verifies the JWT again, checks that the grant is active, and authenticates the MCP Worker with a shared internal secret.
- Dynamic registration allows HTTPS redirects and HTTP only for loopback callbacks with dynamic ports.
- Authorization codes are single-use, expire after 5 minutes, and require PKCE S256.

Health check: `https://mcp.goanyapi.com/health`.
