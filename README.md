# GoAnyAPI MCP

独立的 GoAnyAPI MCP 适配服务。服务运行时从 GoAnyAPI Catalog 接口同步公开、只读 API 工具，并将工具调用转发到 GoAnyAPI REST API；Catalog 暂时不可用时使用内置的最后稳定版本。

运行时只使用请求中的 `Authorization: Bearer ...`，不保存 API Key，也不包含内部配置。

## 开发

```bash
pnpm install
pnpm build
pnpm test
```

## 配置

复制 `.env.example` 为本地配置文件，并设置：

- `GOANYAPI_API_BASE_URL`：GoAnyAPI REST API 地址

MCP 对浏览器请求允许所有 Origin；调用接口仍必须提供 `Authorization: Bearer ...`。

服务端点：

- `GET /health`：健康检查
- `POST /mcp`：MCP Streamable HTTP 请求
