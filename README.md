# GoAnyAPI MCP

通过 Model Context Protocol（MCP）将 GoAnyAPI 的网站数据和搜索能力接入 AI 客户端。连接后，你可以直接用自然语言查询网站流量、域名评分、外链、SERP、Autocomplete 等数据，由 AI 根据问题选择合适的工具。

## 开始使用

### 1. 获取 API Key

1. 登录 [goanyapi.com](https://goanyapi.com)。
2. 在控制台的 API Key 页面创建并复制 API Key。
3. 确保账户有可用积分。

API Key 只应保存在自己的环境变量或客户端密钥管理中，不要提交到代码仓库、截图或公开配置文件。

### 2. 设置 API Key

macOS / Linux：

```bash
export GOANYAPI_API_KEY="你的 GoAnyAPI API Key"
```

Windows PowerShell：

```powershell
$env:GOANYAPI_API_KEY="你的 GoAnyAPI API Key"
```

建议在启动 Codex、Claude Code 或 Cursor 之前设置环境变量。

### 3. MCP 服务地址

正式 MCP 服务地址：

```text
https://mcp.goanyapi.com/mcp
```

服务使用 Bearer Token 认证，客户端需要发送：

```http
Authorization: Bearer <GOANYAPI_API_KEY>
```

## 接入 AI 客户端

### Codex

在 `~/.codex/config.toml` 中加入：

```toml
[mcp_servers.goanyapi]
url = "https://mcp.goanyapi.com/mcp"
bearer_token_env_var = "GOANYAPI_API_KEY"
```

重启 Codex 后即可使用。Codex 会从 `GOANYAPI_API_KEY` 环境变量读取密钥，并自动添加认证请求头。

### Claude Code（cc）

在项目根目录创建 `.mcp.json`：

```json
{
  "mcpServers": {
    "goanyapi": {
      "type": "http",
      "url": "https://mcp.goanyapi.com/mcp",
      "headers": {
        "Authorization": "Bearer ${GOANYAPI_API_KEY}"
      }
    }
  }
}
```

启动 Claude Code 后，可以执行 `/mcp` 查看连接状态，也可以使用：

```bash
claude mcp list
```

### Cursor

将下面的配置写入项目级 `.cursor/mcp.json`，或 Cursor 的全局 MCP 配置文件：

```json
{
  "mcpServers": {
    "goanyapi": {
      "url": "https://mcp.goanyapi.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:GOANYAPI_API_KEY}"
      }
    }
  }
}
```

保存后重载 Cursor。Cursor 会从 `GOANYAPI_API_KEY` 环境变量读取密钥。

## 可以这样使用

连接成功后，直接向 AI 提出问题即可，例如：

```text
查询 github.com 的网站流量和主要流量来源。
```

```text
查询 github.com 的域名评分和外链数据。
```

```text
使用 Bing SERP API 搜索 ai image，返回广告、自然结果和分页信息。
```

```text
查询 ai image 的 Google 和 Bing Autocomplete 建议词。
```

MCP 会根据请求选择对应的 GoAnyAPI 工具。详细参数、返回字段和积分消耗，以 [GoAnyAPI 文档](https://goanyapi.com) 为准。

## 费用和数据安全

- 每次调用会按照对应 API 的规则消耗账户积分。
- API Key 代表你的 GoAnyAPI 账户权限，请勿与他人共享。
- 不要把真实 API Key 写入 Git 仓库、项目提交记录或公开截图。
- 如果不再使用某个客户端，建议删除其中的 MCP 配置并轮换 API Key。

## 常见问题

### 返回 401 或提示未授权

确认 API Key 有效，并检查客户端是否正确发送了：

```http
Authorization: Bearer <GOANYAPI_API_KEY>
```

同时确认客户端启动前已经设置 `GOANYAPI_API_KEY` 环境变量。

### 返回积分不足

请登录 [goanyapi.com](https://goanyapi.com) 查看账户余额并充值积分。

### 客户端没有显示工具

确认 MCP 地址完整填写为：

```text
https://mcp.goanyapi.com/mcp
```

然后重启或重新加载对应客户端，并检查 MCP 连接状态。

### 如何确认服务可访问

可以在浏览器或命令行访问健康检查地址：

```text
https://mcp.goanyapi.com/health
```

健康检查只用于确认服务在线，调用具体工具仍然需要有效的 API Key。
