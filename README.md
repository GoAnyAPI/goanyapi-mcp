# GoAnyAPI MCP

[English](README.en.md) | 中文

GoAnyAPI 的远程 HTTP MCP 服务。客户端通过标准 OAuth 2.1 授权码流程连接，不需要创建、复制或保存 GoAnyAPI API Key。

## 用户接入

MCP 地址：

```text
https://mcp.goanyapi.com/mcp
```

在支持远程 HTTP MCP OAuth 的客户端中只配置上面的 URL。首次连接时，客户端会打开 GoAnyAPI 登录与授权页；用户使用现有邮箱或社交账号登录并同意授权后，客户端自动保存短期访问令牌和刷新令牌。

Codex 配置示例：

```toml
[mcp_servers.goanyapi]
url = 'https://mcp.goanyapi.com/mcp'
```

Claude Code 可添加远程 HTTP MCP，然后通过 `/mcp` 完成登录授权：

```bash
claude mcp add --transport http goanyapi https://mcp.goanyapi.com/mcp
```

OAuth 授权绑定的是 GoAnyAPI 登录账户。MCP 调用直接消耗该账户的积分，不会创建或向客户端下发隐藏 API Key。积分不足时，请在 [GoAnyAPI 价格页](https://goanyapi.com/zh/pricing) 充值。

每个账户最多同时授权 10 个 MCP 客户端；每个授权最多保留 3 个活跃会话，单个账户最多 15 个活跃会话。用户可以在 GoAnyAPI 的“设置 → MCP 授权”中撤销客户端，撤销后其访问会立即失效。

## OAuth 端点

- Protected Resource Metadata：`/.well-known/oauth-protected-resource/mcp`
- Authorization Server Metadata：`https://goanyapi.com/.well-known/oauth-authorization-server`
- 动态客户端注册：`https://goanyapi.com/api/oauth/register`
- 授权：`https://goanyapi.com/oauth/authorize`
- Token：`https://goanyapi.com/api/oauth/token`
- Revocation：`https://goanyapi.com/api/oauth/revoke`

当前支持授权码 + PKCE S256、刷新令牌轮换、Resource Indicators 和动态客户端注册。权限范围为 `mcp:invoke`。

## 开发

```bash
pnpm install
pnpm test
pnpm type-check
pnpm dev
```

Worker 的公开变量在 `wrangler.toml` 中配置：

- `GOANYAPI_API_BASE_URL`
- `GOANYAPI_OAUTH_ISSUER`
- `GOANYAPI_MCP_RESOURCE`

`MCP_INTERNAL_SECRET` 必须作为 Worker secret 配置，并与 GoAnyAPI 主应用中的同名 secret 完全一致：

```bash
wrangler secret put MCP_INTERNAL_SECRET
```

主应用还需要配置 `MCP_OAUTH_ISSUER`、`MCP_OAUTH_RESOURCE`、`MCP_OAUTH_KEY_ID` 和 ES256 私钥 `MCP_OAUTH_PRIVATE_JWK`。可在主项目运行：

```bash
node scripts/generate-mcp-oauth-key.mjs
```

OAuth 数据库迁移为主项目的 `src/config/db/migrations/0012_add_mcp_oauth.sql`。

## 安全说明

- 访问令牌有效期 30 分钟，刷新令牌有效期 30 天并在每次使用后轮换。
- MCP Worker 验证 JWT 的签名、签发者、受众和权限范围。
- 主 API 再次验证 JWT、有效授权记录以及 MCP Worker 的内部密钥。
- 动态注册只允许 HTTPS 回调；本机 loopback 回调允许 HTTP 和动态端口。
- 授权码为一次性、5 分钟有效，并强制 PKCE S256。

健康检查：`https://mcp.goanyapi.com/health`。
