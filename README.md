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

上面的写法只对当前 PowerShell 窗口生效。若希望 Windows 用户环境变量持久生效，可以使用：

```powershell
[Environment]::SetEnvironmentVariable("GOANYAPI_API_KEY", "你的 GoAnyAPI API Key", "User")
```

设置持久环境变量后，需要重新打开终端并重启 Codex、Claude Code 或 Cursor，已经运行的客户端不会自动读取新的环境变量。

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

#### 通过对话配置

也可以让支持终端和配置文件操作的 AI 客户端通过对话完成接入。例如，在 Codex 中发送：

```text
请帮我接入 GoAnyAPI MCP。
服务地址：https://mcp.goanyapi.com/mcp
认证方式：从环境变量 GOANYAPI_API_KEY 读取 Bearer Token。
请把配置写入 Codex 的用户级 MCP 配置，验证 goanyapi 已启用，并且不要把真实 API Key 写入配置文件。
```

如果 AI 客户端具备终端操作权限，也可以通过对话设置 API Key 环境变量。例如：

```text
请将我提供的 GoAnyAPI API Key 设置为当前 Windows 用户的持久环境变量 GOANYAPI_API_KEY。
请不要在回复中回显 API Key，也不要把它写入项目文件、MCP 配置文件或 Git 仓库。
设置完成后，仅验证环境变量已存在，然后帮我检查 goanyapi MCP 配置。
```

API Key 应通过客户端的安全输入或本机密钥管理器提供，不要直接粘贴到公开对话中。对话式配置需要用户授权终端和环境变量操作；设置完成后重新打开终端并重启客户端，再发送自然语言请求即可。

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

### Windows 沙箱阻止网络请求

如果手动测试时看到类似下面的错误：

```text
curl: (7) Failed to connect to mcp.goanyapi.com port 443
```

这通常表示当前终端或 AI 客户端的沙箱禁止出站网络访问，不代表 MCP 地址或 API Key 配置错误。先重启客户端，让客户端的 MCP 管理器重新加载配置；如果仍然失败，请检查代理、防火墙或企业网络是否允许访问：

```text
mcp.goanyapi.com:443
```

不要为了测试而关闭全部沙箱限制。可以使用客户端提供的网络白名单或受控网络权限，仅允许访问所需域名。

### PowerShell 弹出网页脚本安全提示

Windows PowerShell 5.1 使用 `Invoke-WebRequest` 请求 MCP 时，可能弹出提示，要求确认网页脚本执行。这是 PowerShell 网页解析器的提示，不是 GoAnyAPI 的 MCP 错误。手动测试时可以使用：

```powershell
Invoke-WebRequest -UseBasicParsing ...
```

或者改用 `Invoke-RestMethod` / `curl.exe`，避免使用网页脚本解析器。MCP 返回 JSON 时，推荐使用 `Invoke-RestMethod`。

### 如何确认 Codex 已加载 MCP

在终端执行：

```bash
codex mcp get goanyapi
codex mcp list
```

确认服务显示为 `enabled`，传输类型为 `streamable_http`，并且 Bearer Token 环境变量为 `GOANYAPI_API_KEY`。如果是在设置环境变量后才启动客户端，必须完全退出并重新打开客户端。
