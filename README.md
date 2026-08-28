# GoAnyAPI MCP

[English](README.en.md) | 中文

让 Codex、Claude Code（CC）、Cursor、WorkBuddy、OpenCode 和其他支持远程 HTTP MCP 的 AI 客户端直接查询 GoAnyAPI 数据。

- MCP 地址：`https://mcp.goanyapi.com/mcp`
- 使用 GoAnyAPI 账户登录授权，无需创建或复制 API Key
- MCP 查询消耗授权账户中的 GoAnyAPI 积分
- 普通用户无需下载本仓库、安装依赖或运行本地服务

## 安装 GoAnyAPI MCP

| [✨ 一句话 Prompt 自动安装](#一句话-prompt-自动安装) | [⌨️ 手动安装](#手动安装) |
| :---: | :---: |
| 把提示词发给本机 Agent，只需在浏览器确认授权 | 自己添加 MCP，并按客户端提示完成授权 |

### 一句话 Prompt 自动安装

如果不想手动执行命令或编辑配置，可以把对应客户端的提示词完整发送给该客户端中的本机 Agent。用户只需在浏览器中登录 GoAnyAPI 并确认授权；Agent 不应要求用户复制授权码、回调地址或任何配置。

> 下面的提示词要求 Agent 先检查客户端的实际版本和命令帮助。不同版本能力不一致时，应以本机真实能力为准，不得猜测不存在的命令或参数。

<details>
<summary><strong>Codex 自动安装提示词</strong></summary>

```text
请直接在当前这台电脑完成 GoAnyAPI MCP OAuth 2.1 + PKCE 接入。我只会在浏览器确认授权；不要让我再粘贴命令、JSON、authorization code 或回调地址。

目标客户端：Codex
连接名称："goanyapi"
MCP 地址："https://mcp.goanyapi.com/mcp"
OAuth scope："mcp:invoke"
运行位置：本机 Agent

请连续执行到需要重启为止：
1. 先确认当前宿主确实是 Codex，并判断它运行在 Windows 原生、WSL、macOS 还是 Linux。配置和 OAuth 必须在当前 Codex 实际运行的同一环境完成，禁止跨 Windows 用户目录和 WSL Home 写入配置。Codex 客户端与 CLI 处于同一环境时共用 MCP 配置，不要重复添加。
2. 定位当前宿主实际使用的 codex 可执行文件绝对路径并读取版本；后续所有 Codex 命令均使用该路径，不得因 PATH 变化切换到另一份安装。如果当前宿主没有可用 CLI，但提供官方 MCP 设置或宿主 API，则在同一配置域完成等价操作，不得编造命令。
3. 把连接名称、MCP 地址和 scope 作为纯数据处理。调用进程时使用参数数组，不拼接 shell 字符串，不依赖 PowerShell、CMD 或 Bash 的引号和续行语法；执行 shell 前关闭 xtrace。
4. 先使用参数数组 ["mcp","get","goanyapi"] 检查连接。仅当连接不存在时，使用参数数组 ["mcp","add","goanyapi","--url","https://mcp.goanyapi.com/mcp"] 添加。已有唯一同名连接且 URL 逐字正确时保留现有配置；URL 不一致或同名来源不唯一时停止并准确报告，不得直接覆盖。GoAnyAPI 支持动态客户端注册，不要虚构或写入固定 client_id、client_secret、认证请求头或 Token。
5. 先检查当前连接的认证状态以及是否已有正在等待的授权流程。配置、连接探测或添加操作已经触发 OAuth 时，只等待该流程。只有明确未认证或凭据失效且没有活动流程时，才使用参数数组 ["mcp","login","goanyapi","--scopes","mcp:invoke"]；本次最多发起一次 OAuth。
6. 让登录进程打开本机默认浏览器并等待我登录 GoAnyAPI、选择账号及确认授权。浏览器授权后，由当前 Codex 环境自动接收 loopback 回调；不要让我复制 authorization code、authorization URL、callback 地址或第二段提示词，也不要自行拼接授权 URL。
7. OAuth 成功后，只确认登录进程正常退出和配置已持久化；不要在旧会话再次执行 MCP 状态探测、重复登录或调用 MCP 工具，以免再次触发浏览器授权。
8. 提醒我重启当前 Codex 会话或客户端一次，然后停止。重启后再列出 goanyapi 的工具，并调用无参数、无副作用的只读工具 goanyapi_credits_balance 验证连接；重启后不得因为首次连接稍慢而重新登录。
9. 全程不得在对话、日志、命令回显或普通配置中暴露 access_token、refresh_token、authorization code、authorization URL、code_challenge、code_verifier、client_secret、Cookie 或 callback_uri。敏感输出只能静默处理，只汇报状态。
10. 到达重启点后只汇报：Codex 运行环境与版本、修改的配置位置、一次 OAuth 是否成功、已明确需要重启当前会话。不要回显任何凭据。
```

</details>

<details>
<summary><strong>Claude Code（CC）自动安装提示词</strong></summary>

```text
请直接在当前这台电脑完成 GoAnyAPI MCP OAuth 2.1 + PKCE 接入。我只会在浏览器确认授权；不要让我再粘贴命令、JSON、authorization code 或回调地址。

目标客户端：Claude Code
连接名称："goanyapi"
MCP 地址："https://mcp.goanyapi.com/mcp"
OAuth scope："mcp:invoke"
运行位置：本机 Agent

请连续执行到需要重启为止：
1. 先确认当前宿主是 Claude Code CLI 或 Claude Desktop 的 Code 页签。Claude Desktop 普通聊天窗口使用另一套连接器配置；如果当前不是 Claude Code，立即停止并准确说明，不要把配置写入错误产品。
2. 判断 Claude Code 实际运行在 Windows 原生、Git Bash、WSL、macOS 还是 Linux。配置和 OAuth 必须在当前宿主的同一环境完成，禁止跨 Windows 用户目录和 WSL Home 写入配置。
3. 定位当前宿主实际使用的 claude 可执行文件绝对路径并读取版本；后续所有 Claude Code 命令均使用该路径，不得因 PATH 变化切换到另一份安装。
4. 把连接名称、MCP 地址和 scope 作为纯数据处理。调用进程时使用参数数组，不拼接 shell 字符串，不依赖 PowerShell、CMD、Git Bash 或 WSL 的引号和续行语法；执行 shell 前关闭 xtrace。
5. 先检查 claude mcp --help、claude mcp add --help，再使用参数数组 ["mcp","list"] 检查所有可见连接。仅当连接不存在，且帮助中确认这些参数可用时，才使用参数数组 ["mcp","add","--transport","http","--scope","user","goanyapi","https://mcp.goanyapi.com/mcp"] 添加；必须保留 --scope user。已有唯一同名连接且 URL 逐字正确时不要重复添加；URL 不一致或同名来源不唯一时停止并准确报告。GoAnyAPI 支持动态客户端注册，不要虚构或写入固定 client_id、client_secret、认证请求头或 Token。
6. 检查 claude mcp login --help 和当前连接状态。只有明确未认证或凭据失效且没有活动授权流程时才开始登录；配置或探测已经触发 OAuth 时只等待现有流程。本次最多进行一次 OAuth。若当前版本真实提供 mcp login 子命令，则把 goanyapi 作为独立参数执行，并仅在帮助明确支持 scope 参数时请求 mcp:invoke；若没有 mcp login 子命令，则使用 Claude Code 当前真实存在的 /mcp 认证入口完成同一次授权，不得编造参数、重复添加连接或手工实现 DCR/PKCE。
7. 让 Claude Code 打开本机默认浏览器并等待我登录 GoAnyAPI、选择账号及确认授权。浏览器授权后，由当前 Claude Code 环境自动接收 loopback 回调；不要让我复制 authorization code、authorization URL、callback 地址或第二段提示词，也不要自行拼接授权 URL。
8. 授权成功后，只确认授权流程正常结束和配置已持久化；不要在旧会话执行 claude mcp list、/mcp Reconnect、重复登录或调用 MCP 工具。
9. 提醒我重启当前 Claude Code 会话或客户端一次，然后停止。重启后再列出 goanyapi 的工具，并调用无参数、无副作用的只读工具 goanyapi_credits_balance 验证连接；重启后不得因为首次连接稍慢而重新登录。
10. 全程不得在对话、日志、命令回显或普通配置中暴露 access_token、refresh_token、authorization code、authorization URL、code_challenge、code_verifier、client_secret、Cookie 或 callback_uri。敏感输出只能静默处理，只汇报状态。
11. 到达重启点后只汇报：Claude Code 运行环境与版本、修改的配置位置、一次 OAuth 是否成功、已明确需要重启当前会话。不要回显任何凭据。
```

</details>

<details>
<summary><strong>Cursor 自动安装提示词</strong></summary>

```text
请直接在当前 Windows 或 macOS 的 Cursor 桌面端完成 GoAnyAPI MCP 接入，并让 Cursor 根据 MCP/OAuth 元数据管理 OAuth 2.1 + PKCE；不要只给我操作说明，也不要手工配置 DCR、PKCE、client_id 或回调地址。我只会在浏览器确认授权。

目标客户端：Cursor 桌面端
连接名称："goanyapi"
MCP 地址："https://mcp.goanyapi.com/mcp"
OAuth scope："mcp:invoke"
运行位置：当前电脑上的 Cursor 桌面端

请按 Cursor 当前实际能力连续执行：
1. 先确认当前宿主确实是 Windows 或 macOS 的 Cursor 桌面端，并分别记录 Cursor 桌面进程、当前 Agent 进程和工作区所在主机。WSL、SSH、Dev Container、原生 Linux 和 Cursor Cloud Agents 不能用来证明本机桌面端已完成接入；如果三者不在同一可验证配置域，或无法从 Cursor UI 验证桌面端实际读取的来源，停止并准确报告，不要跨环境配置或伪造完成。
2. 优先使用 Cursor 的 Customize → MCP 设置入口。只有当前环境确实存在 agent 可执行文件、agent mcp --help 列出对应子命令，并且当前子命令帮助明确证明参数形状时，才使用 CLI。普通 cursor 可执行文件的 --add-mcp 不能证明完整的 project、global、nested、team 或 marketplace 来源，不能据此断言候选唯一。列出目标连接在所有来源中的 identifier、URL、启用状态和连接状态。同名候选不唯一时停止并请我选择实际作用域，不能按名称猜测。如果当前 Agent 没有操作 Cursor UI 的能力，在需要打开设置、启用连接或登录时暂停，请我本人完成后再继续；不得声称已操作。
3. 只有目标不存在时，才把下面这段 URL-only 配置合并到我确认的实际生效 mcp.json；已有唯一同名条目时，必须先确认 URL 逐字等于 "https://mcp.goanyapi.com/mcp"，并保留未知字段。URL 不一致、存在固定 auth/headers、来源为 team/marketplace 或无法确认字段含义时，停止并请我确认，不得直接覆盖。没有既有来源时才使用用户级配置：Windows 通常显示为 %USERPROFILE%\.cursor\mcp.json，macOS 通常显示为 ~/.cursor/mcp.json。路径只是位置说明，必须从 Cursor 显示的 source 解析实际绝对路径；PowerShell 使用 $env:USERPROFILE，cmd 才使用 %USERPROFILE%，不得在 Git Bash 或 WSL 中把它当可执行路径，也不得使用 sudo、管理员或其他系统用户写入。保留其他服务器，不覆盖整个文件，不写固定认证请求头、访问令牌、client_id、client_secret、scope 或回调地址：
{
  "mcpServers": {
    "goanyapi": {
      "url": "https://mcp.goanyapi.com/mcp"
    }
  }
}
4. 保存后确认 goanyapi 已启用。如果状态为 disabled，且当前 agent mcp --help 明确提供 enable 子命令，才把列表返回的唯一 identifier 作为独立参数执行一次 enable；否则在 Customize → MCP 中启用。若 Cursor 显示的生效来源不是刚修改的配置，停止并报告，不要继续授权。
5. 检查当前版本真实提供的 MCP 登录入口。只有 agent 可执行文件存在且 agent mcp --help 明确提供 login 时，才把列表返回的唯一 identifier 作为独立参数登录；否则从 Customize → MCP 对 goanyapi 执行登录。不要猜测 mcp add 参数，不要拼接 shell 字符串。让 Cursor 根据 https://mcp.goanyapi.com/mcp 返回的受保护资源元数据发现授权服务器和 mcp:invoke scope，并通过动态客户端注册管理 OAuth；不要手工写入认证参数。
6. 先检查是否已有有效 OAuth 凭据或正在等待的授权流程。已有有效连接直接复用；已有活动流程只等待当前客户端或登录进程给出成功、失败、取消等终态。如果无法观察到终态，不无限等待，停止当前 Agent 任务并报告授权仍待处理，不得自动重试。只有明确未认证且没有活动流程时才登录，本次最多进行一次 OAuth。需要浏览器登录、账号选择、2FA/CAPTCHA 或最终授权确认时，由我本人完成，Agent 等待结果。完整 authorization URL、request_id、code_challenge、code、callback、state、verifier 和 Token 不得复制到对话、命令历史或普通日志；登录命令的 stdout/stderr 只报告状态，不回显敏感值。如果登录入口没有打开系统浏览器，Windows 检查“设置 → 应用 → 默认应用”中的 HTTP/HTTPS 默认浏览器，macOS 检查“系统设置 → 桌面与程序坞 → 默认网页浏览器”；Agent 不修改系统默认浏览器，也不自行拼接授权 URL。
7. 授权成功后刷新 Cursor 的 MCP 列表；当前版本无法热加载时，提示我先保存未提交内容，再由我本人重启 Cursor 或新建会话一次。Agent 不杀进程，不因首次加载稍慢而重复添加连接或再次登录。
8. 重启或刷新后，通过 Available Tools，或在当前 CLI 明确支持时通过 list-tools，确认 goanyapi 的工具已经加载。先确认实际 MCP endpoint 逐字等于 "https://mcp.goanyapi.com/mcp"，然后只调用官方固定白名单工具 goanyapi_credits_balance 进行验证；该工具只读取当前账户积分余额，不带参数，不创建、更新、删除、发布、发送或购买任何内容。如果工具不可见、schema 与上述特征不符、权限或副作用不明确，则停止并报告，不调用其他工具；readOnlyHint=true 只能作为附加证据。
9. 全程不得主动复制、回显或持久化 access_token、refresh_token、authorization code、authorization URL、request_id、code_challenge、code_verifier、client_secret、Cookie 或 callback_uri。
10. 只有同时满足唯一 identifier 和 source 已确认、实际 URL 逐字正确、配置已保存、连接已启用、一次 OAuth 已完成、工具可见且 goanyapi_credits_balance 调用成功，才可以报告安装完成；否则必须报告未完成和具体阻塞步骤。完成后只汇报：Cursor 版本与运行环境、生效配置来源、修改的唯一配置位置、启用状态、一次 OAuth 是否成功、是否刷新或重启、只读余额查询是否成功。不要回显余额或任何凭据。
```

</details>

### 手动安装

#### 1. 在客户端中添加 GoAnyAPI MCP

##### Codex CLI

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

##### Codex 桌面端或 IDE 扩展

1. 打开 **Settings → MCP servers**。
2. 选择 **Add server**。
3. 类型选择 **Streamable HTTP**，名称填写 `goanyapi`。
4. URL 填写 `https://mcp.goanyapi.com/mcp`。
5. 保存并按提示重启客户端。
6. 在 MCP 服务列表中选择 **Authenticate** 完成登录授权。

##### Claude Code（CC）

在终端执行：

```bash
claude mcp add --transport http goanyapi https://mcp.goanyapi.com/mcp
```

然后在 Claude Code 中输入 `/mcp`，选择 `goanyapi` 并完成登录授权。

##### Cursor

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

##### WorkBuddy

1. 打开 WorkBuddy 的 MCP 设置。
2. 添加远程 MCP 服务，名称填写 `goanyapi`。
3. 连接方式选择 **Streamable HTTP**，URL 填写 `https://mcp.goanyapi.com/mcp`。
4. 保存后按提示完成浏览器登录授权。

##### OpenCode

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

##### 其他 AI 客户端

添加一个远程 **Streamable HTTP** MCP 服务，并填写：

```text
https://mcp.goanyapi.com/mcp
```

客户端必须支持远程 MCP 的浏览器 OAuth 登录。

#### 2. 登录并授权

添加 MCP 后，客户端会打开 GoAnyAPI 授权页面：

1. 如果尚未登录，请使用 GoAnyAPI 邮箱账户或页面提供的社交账号登录。
2. 确认页面中的客户端名称、权限和返回地址。
3. 点击 **Authorize / 授权**。
4. 浏览器返回本机 `localhost` 或 `127.0.0.1` 回调页后，等待页面显示授权完成。
5. 看到 `Authentication complete. You may close this window.` 后即可关闭页面。
6. Codex 终端显示 `Successfully logged in.` 即表示连接成功。

授权绑定当前登录的 GoAnyAPI 账户。客户端不会获得你的 GoAnyAPI 密码或 API Key。

#### 3. 发起第一次查询

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
