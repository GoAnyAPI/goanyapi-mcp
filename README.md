# GoAnyAPI MCP

[English](README.en.md) | 中文

让 Codex、Claude Code（CC）、Cursor、WorkBuddy、OpenCode 和其他支持远程 HTTP MCP 的 AI 客户端直接查询 GoAnyAPI 数据。

- MCP 地址：`https://mcp.goanyapi.com/mcp`
- 使用 GoAnyAPI 账户登录授权，无需创建或复制 API Key
- MCP 查询消耗授权账户中的 GoAnyAPI 积分
- 普通用户无需下载本仓库、安装依赖或运行本地服务

## 快速开始

### 1. 在客户端中添加 GoAnyAPI MCP

#### Codex CLI

在终端执行：

```bash
codex mcp add goanyapi --url https://mcp.goanyapi.com/mcp
```

Codex 通常会自动打开浏览器开始登录。如果没有自动打开，或之后需要重新登录，请执行：

```bash
codex mcp login goanyapi
```

可使用下面的命令确认服务已经添加：

```bash
codex mcp list
```

#### Codex 桌面端或 IDE 扩展

1. 打开 **Settings → MCP servers**。
2. 选择 **Add server**。
3. 类型选择 **Streamable HTTP**，名称填写 `goanyapi`。
4. URL 填写 `https://mcp.goanyapi.com/mcp`。
5. 保存并按提示重启客户端。
6. 在 MCP 服务列表中选择 **Authenticate** 完成登录授权。

#### Claude Code（CC）

在终端执行：

```bash
claude mcp add --transport http goanyapi https://mcp.goanyapi.com/mcp
```

然后在 Claude Code 中输入 `/mcp`，选择 `goanyapi` 并完成登录授权。

#### Cursor

1. 打开 **Cursor Settings → Tools & MCP**。
2. 选择 **New MCP Server**，添加下面的配置：

```json
{
  "mcpServers": {
    "goanyapi": {
      "url": "https://mcp.goanyapi.com/mcp"
    }
  }
}
```

3. 保存配置，在 MCP 列表中启用 `goanyapi`。
4. 按提示打开浏览器，登录 GoAnyAPI 并授权。

#### WorkBuddy

1. 打开 WorkBuddy 的 MCP 设置。
2. 添加远程 MCP 服务，名称填写 `goanyapi`。
3. 连接方式选择 **Streamable HTTP**，URL 填写 `https://mcp.goanyapi.com/mcp`。
4. 保存后按提示完成浏览器登录授权。

#### OpenCode

在 `opencode.json` 中添加：

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "goanyapi": {
      "type": "remote",
      "url": "https://mcp.goanyapi.com/mcp",
      "enabled": true
    }
  }
}
```

启动 OpenCode 后按提示完成授权；如果需要手动发起登录，可执行：

```bash
opencode mcp auth goanyapi
```

#### 其他 AI 客户端

添加一个远程 **Streamable HTTP** MCP 服务，并填写：

```text
https://mcp.goanyapi.com/mcp
```

客户端必须支持远程 MCP 的浏览器 OAuth 登录。

### 2. 登录并授权

添加 MCP 后，客户端会打开 GoAnyAPI 授权页面：

1. 如果尚未登录，请使用 GoAnyAPI 邮箱账户或页面提供的社交账号登录。
2. 确认页面中的客户端名称、权限和返回地址。
3. 点击 **Authorize / 授权**。
4. 浏览器返回本机 `localhost` 或 `127.0.0.1` 回调页后，等待页面显示授权完成。
5. 看到 `Authentication complete. You may close this window.` 后即可关闭页面。
6. Codex 终端显示 `Successfully logged in.` 即表示连接成功。

授权绑定当前登录的 GoAnyAPI 账户。客户端不会获得你的 GoAnyAPI 密码或 API Key。

### 3. 发起第一次查询

授权完成后，直接用自然语言告诉 AI 需要查询什么，不必记住 MCP 工具名称。例如：

```text
通过 GoAnyAPI 查询 x.com 最近 3 个月的流量信息
```

```text
通过 GoAnyAPI 查询 example.com 的 Domain Rating 和外链数据
```

```text
查询我的 GoAnyAPI 剩余积分
```

客户端会自动选择合适的 GoAnyAPI MCP 工具。根据客户端的安全策略，首次调用时可能仍会显示 Allow / Approve 确认。

## 积分与充值

MCP 调用使用授权账户中的 GoAnyAPI 积分，与网站和 API 使用同一份余额。

### 查看余额和记录

- 直接让 AI“查询我的 GoAnyAPI 剩余积分”。
- 打开 [积分记录](https://goanyapi.com/zh/settings/credits) 查看当前余额和变动明细。
- 打开 [支付记录](https://goanyapi.com/zh/settings/payments) 查看历史订单。

### 手动充值

1. 打开 [GoAnyAPI 价格与充值页面](https://goanyapi.com/zh/pricing)。
2. 登录与 MCP 授权相同的 GoAnyAPI 账户。
3. 选择需要的积分套餐并完成支付。
4. 积分到账后可继续使用 MCP，无需重新安装或重新授权。

如果希望在余额较低时自动补充积分，可在 [余额守护](https://goanyapi.com/zh/settings/balance-guard) 中配置低余额提醒和自动充值。

## 管理和撤销授权

打开 [设置 → MCP 授权](https://goanyapi.com/zh/settings/mcp) 可以查看所有已连接的客户端及授权时间。

- 不再使用某个客户端时，点击 **撤销**。
- 撤销后，该客户端将不能继续使用 GoAnyAPI MCP。
- 重复添加或多次授权可能产生多条同名客户端记录，可以撤销旧记录，只保留当前正在使用的一条。
- 每个账户最多同时授权 10 个 MCP 客户端。

## 常见问题

### 为什么授权后会跳到 localhost 或 127.0.0.1？

这是 Codex、Claude Code 等本地客户端接收授权结果的回调地址，属于正常流程。页面提示认证完成后即可关闭。

### 为什么没有打开登录页面？

浏览器中已经登录 GoAnyAPI 时，可能会直接进入授权确认页。如果客户端没有自动打开浏览器，请重新执行登录命令，例如：

```bash
codex mcp login goanyapi
```

### 授权成功后为什么看不到工具？

先重启客户端或重新打开会话，然后检查 MCP 连接状态。Codex CLI 可以执行：

```bash
codex mcp list
```

### 提示积分不足怎么办？

请确认 MCP 授权使用的是哪个 GoAnyAPI 账户，然后为同一账户[充值积分](https://goanyapi.com/zh/pricing)。充值到账后无需重新授权。

### 需要创建 GoAnyAPI API Key 吗？

不需要。MCP 使用浏览器登录授权，不会要求你把 API Key 粘贴到客户端。
