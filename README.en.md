# GoAnyAPI MCP

English | [中文](README.md)

Use GoAnyAPI data directly from Codex, Claude Code, Cursor, WorkBuddy, OpenCode, and other AI clients that support remote HTTP MCP servers.

- MCP URL: `https://mcp.goanyapi.com/mcp`
- Sign in with your GoAnyAPI account; no API key needs to be created or copied
- MCP queries consume credits from the authorized GoAnyAPI account
- Regular users do not need to clone this repository, install dependencies, or run a local server

## Install GoAnyAPI MCP

| [✨ One-prompt automatic setup](#one-prompt-automatic-setup) | [⌨️ Manual setup](#manual-setup) |
| :---: | :---: |
| Send one prompt to your local agent; only approve access in the browser | Add the MCP server yourself and follow the client's authorization flow |

### One-prompt automatic setup

If you do not want to run commands or edit configuration files yourself, send the complete prompt for your client to its local agent. You only need to sign in to GoAnyAPI and approve access in the browser. The agent must not ask you to copy an authorization code, callback URL, or configuration.

> These prompts require the agent to inspect the installed client's real version and command help first. If capabilities differ between versions, the agent must use only capabilities that actually exist on the current machine and must not invent commands or options.

<details>
<summary><strong>Codex automatic setup prompt</strong></summary>

```text
Set up GoAnyAPI MCP with OAuth 2.1 and PKCE directly on this computer. I will only confirm authorization in the browser. Do not ask me to paste commands, JSON, an authorization code, or a callback URL.

Target client: Codex
Connection name: "goanyapi"
MCP URL: "https://mcp.goanyapi.com/mcp"
OAuth scope: "mcp:invoke"
Execution location: local agent

Continue until a restart is required:
1. Confirm that the current host is Codex, then determine whether it is running natively on Windows, in WSL, on macOS, or on Linux. Complete configuration and OAuth in the same environment in which Codex is actually running. Never write across Windows user profiles or between a Windows profile and a WSL home directory. When the Codex client and CLI are in the same environment, they share MCP configuration; do not add the server twice.
2. Resolve the absolute path of the codex executable actually used by this host and read its version. Use that exact path for every subsequent Codex command; do not switch installations because PATH changes. If this host has no usable CLI but exposes an official MCP settings UI or host API, perform the equivalent operation in the same configuration domain. Do not invent a command.
3. Treat the connection name, MCP URL, and scope strictly as data. Invoke processes with argument arrays, not concatenated shell strings, and do not depend on PowerShell, CMD, or Bash quoting or line continuation. Disable shell xtrace before executing anything.
4. First inspect the connection with the argument array ["mcp","get","goanyapi"]. Only if it does not exist, add it with ["mcp","add","goanyapi","--url","https://mcp.goanyapi.com/mcp"]. Keep an existing unique connection when its URL matches exactly. If its URL differs or the name resolves to multiple sources, stop and report the conflict accurately; do not overwrite it. GoAnyAPI supports dynamic client registration, so do not invent or store a fixed client_id, client_secret, authorization header, or token.
5. Check the connection's authentication state and whether an authorization flow is already pending. If configuration, connection probing, or adding the server has already started OAuth, wait only for that flow. Only when the connection is clearly unauthenticated or its credentials are invalid and no flow is active, run ["mcp","login","goanyapi","--scopes","mcp:invoke"]. Start OAuth at most once in this task.
6. Allow the login process to open the default local browser and wait while I sign in to GoAnyAPI, choose an account, and approve access. The current Codex environment must receive the loopback callback automatically. Do not ask me to copy an authorization code, authorization URL, callback URL, or second prompt, and do not construct an authorization URL yourself.
7. After OAuth succeeds, only confirm that the login process exited normally and configuration was persisted. In the old session, do not probe MCP status again, repeat login, or invoke an MCP tool, because that could trigger another browser flow.
8. Tell me to restart the current Codex session or client once, then stop. After restart, list the goanyapi tools and verify the connection by invoking the parameterless, side-effect-free read-only tool goanyapi_credits_balance. Do not log in again merely because the first connection after restart is slow.
9. Never expose an access_token, refresh_token, authorization code, authorization URL, code_challenge, code_verifier, client_secret, Cookie, or callback_uri in the conversation, logs, command output, or ordinary configuration. Handle sensitive output silently and report status only.
10. At the restart point, report only: the Codex runtime environment and version, the configuration location changed, whether the single OAuth attempt succeeded, and an explicit statement that the current session must be restarted. Do not echo credentials.
```

</details>

<details>
<summary><strong>Claude Code automatic setup prompt</strong></summary>

```text
Set up GoAnyAPI MCP with OAuth 2.1 and PKCE directly on this computer. I will only confirm authorization in the browser. Do not ask me to paste commands, JSON, an authorization code, or a callback URL.

Target client: Claude Code
Connection name: "goanyapi"
MCP URL: "https://mcp.goanyapi.com/mcp"
OAuth scope: "mcp:invoke"
Execution location: local agent

Continue until a restart is required:
1. Confirm that the current host is Claude Code CLI or the Code tab in Claude Desktop. A normal Claude Desktop chat uses a different connector configuration. If this is not Claude Code, stop immediately and explain accurately; do not write configuration for the wrong product.
2. Determine whether Claude Code is actually running natively on Windows, in Git Bash, in WSL, on macOS, or on Linux. Complete configuration and OAuth in the same environment as the host. Never write across Windows user profiles or between a Windows profile and a WSL home directory.
3. Resolve the absolute path of the claude executable actually used by this host and read its version. Use that exact path for every subsequent Claude Code command; do not switch installations because PATH changes.
4. Treat the connection name, MCP URL, and scope strictly as data. Invoke processes with argument arrays, not concatenated shell strings, and do not depend on PowerShell, CMD, Git Bash, or WSL quoting or line continuation. Disable shell xtrace before executing anything.
5. Inspect claude mcp --help and claude mcp add --help, then use ["mcp","list"] to inspect every visible connection. Only if the connection does not exist and the help confirms these options, add it with ["mcp","add","--transport","http","--scope","user","goanyapi","https://mcp.goanyapi.com/mcp"]. Keep --scope user. Do not re-add an existing unique connection whose URL matches exactly. If its URL differs or the name resolves to multiple sources, stop and report the conflict accurately. GoAnyAPI supports dynamic client registration, so do not invent or store a fixed client_id, client_secret, authorization header, or token.
6. Inspect claude mcp login --help and the current connection state. Begin login only when authentication is clearly missing or invalid and no authorization flow is active. If configuration or probing has already started OAuth, wait only for the existing flow. Start OAuth at most once. If this version actually provides mcp login, pass goanyapi as a separate argument and request mcp:invoke only if the help explicitly supports a scope option. If mcp login does not exist, use the real /mcp authentication entry point in the current Claude Code version. Do not invent options, add the connection again, or implement DCR/PKCE manually.
7. Allow Claude Code to open the default local browser and wait while I sign in to GoAnyAPI, choose an account, and approve access. The current Claude Code environment must receive the loopback callback automatically. Do not ask me to copy an authorization code, authorization URL, callback URL, or second prompt, and do not construct an authorization URL yourself.
8. After authorization succeeds, only confirm that the flow ended normally and configuration was persisted. In the old session, do not run claude mcp list, use /mcp Reconnect, repeat login, or invoke an MCP tool.
9. Tell me to restart the current Claude Code session or client once, then stop. After restart, list the goanyapi tools and verify the connection by invoking the parameterless, side-effect-free read-only tool goanyapi_credits_balance. Do not log in again merely because the first connection after restart is slow.
10. Never expose an access_token, refresh_token, authorization code, authorization URL, code_challenge, code_verifier, client_secret, Cookie, or callback_uri in the conversation, logs, command output, or ordinary configuration. Handle sensitive output silently and report status only.
11. At the restart point, report only: the Claude Code runtime environment and version, the configuration location changed, whether the single OAuth attempt succeeded, and an explicit statement that the current session must be restarted. Do not echo credentials.
```

</details>

<details>
<summary><strong>Cursor automatic setup prompt</strong></summary>

```text
Set up GoAnyAPI MCP directly in the Cursor desktop app on this Windows or macOS computer. Let Cursor manage OAuth 2.1 and PKCE from the MCP/OAuth metadata. Do not merely give me instructions and do not manually configure DCR, PKCE, a client_id, or a callback URL. I will only confirm authorization in the browser.

Target client: Cursor desktop
Connection name: "goanyapi"
MCP URL: "https://mcp.goanyapi.com/mcp"
OAuth scope: "mcp:invoke"
Execution location: the Cursor desktop app on this computer

Proceed according to the capabilities that actually exist in the installed Cursor version:
1. Confirm that the current host is the Windows or macOS Cursor desktop app. Record the hosts for the Cursor desktop process, current Agent process, and workspace. WSL, SSH, Dev Containers, native Linux, and Cursor Cloud Agents do not prove that setup is complete in the local desktop app. If the three are not in one verifiable configuration domain, or Cursor UI cannot verify the source the desktop app actually reads, stop and report accurately. Do not configure across environments or claim success without evidence.
2. Prefer Cursor's Customize -> MCP settings. Use a CLI only if an agent executable exists, agent mcp --help lists the relevant subcommand, and that subcommand's own help proves the argument shape. The ordinary cursor executable's --add-mcp option does not prove all project, global, nested, team, or marketplace sources and cannot establish uniqueness. List the target connection's identifier, URL, enabled state, and connection state from every source. If the same name has multiple candidates, stop and ask me to select the effective scope; do not guess by name. If this Agent cannot operate Cursor UI, pause when settings, enabling, or login requires UI action and ask me to perform that action. Do not claim to have operated UI that you cannot access.
3. Only when the target does not exist, merge the following URL-only definition into the effective mcp.json that I confirmed. For an existing unique entry, first confirm that the URL exactly equals "https://mcp.goanyapi.com/mcp" and preserve unknown fields. If the URL differs, fixed auth/headers are present, the source is team/marketplace, or a field's meaning is unclear, stop and ask me before changing anything. With no existing source, use user-level configuration: Cursor usually shows %USERPROFILE%\.cursor\mcp.json on Windows and ~/.cursor/mcp.json on macOS. These are location hints only; resolve the actual absolute path from the source shown by Cursor. PowerShell uses $env:USERPROFILE while cmd uses %USERPROFILE%; do not treat either as an executable path in Git Bash or WSL. Do not use sudo, an administrator account, or another OS user. Preserve other servers and do not replace the whole file. Do not write fixed authorization headers, tokens, client_id, client_secret, scope, or callback URL:
{
  "mcpServers": {
    "goanyapi": {
      "url": "https://mcp.goanyapi.com/mcp"
    }
  }
}
4. After saving, confirm that goanyapi is enabled. If it is disabled, use an enable command only when agent mcp --help explicitly provides it, passing the unique identifier returned by list as a separate argument. Otherwise enable it in Customize -> MCP. If Cursor shows an effective source different from the file just changed, stop and report it; do not proceed to authorization.
5. Inspect the real MCP login entry point in this Cursor version. Use a CLI login only if an agent executable exists and agent mcp --help explicitly provides login; pass the unique identifier as a separate argument. Otherwise use Login for goanyapi in Customize -> MCP. Do not guess mcp add options or concatenate shell strings. Let Cursor use the protected-resource metadata returned by https://mcp.goanyapi.com/mcp to discover the authorization server and mcp:invoke scope, and let dynamic client registration manage OAuth. Do not write authentication parameters manually.
6. Check first for valid OAuth credentials or an active authorization flow. Reuse a valid connection. If a flow is already active, wait only for that client or login process to reach a success, failure, or cancellation state. If its terminal state cannot be observed, do not wait forever: stop this Agent task and report that authorization is still pending. Do not retry automatically. Only log in when authentication is clearly absent and no flow is active; start OAuth at most once. I will handle browser sign-in, account choice, 2FA/CAPTCHA, and final approval. Never copy a complete authorization URL, request_id, code_challenge, code, callback, state, verifier, or token into chat, command history, or ordinary logs. Report only status from login stdout/stderr. If login does not open the system browser, inspect the HTTP/HTTPS default browser under Settings -> Apps -> Default apps on Windows or System Settings -> Desktop & Dock -> Default web browser on macOS. Do not change the default browser or construct an authorization URL.
7. After authorization succeeds, refresh Cursor's MCP list. If this version cannot hot-reload, tell me to save uncommitted work, then have me restart Cursor or open a new session once. Do not kill Cursor processes and do not add the server or log in again merely because initial loading is slow.
8. After refresh or restart, confirm through Available Tools, or list-tools only when the current CLI explicitly supports it, that goanyapi tools are loaded. First confirm that the effective endpoint exactly equals "https://mcp.goanyapi.com/mcp". Then invoke only the official fixed allowlisted tool goanyapi_credits_balance for verification. It is parameterless and only reads the current account's credit balance; it does not create, update, delete, publish, send, or purchase anything. If the tool is missing, its schema differs from these properties, or its permissions or side effects are unclear, stop and report without invoking another tool. readOnlyHint=true is supporting evidence only.
9. Never copy, echo, or persist an access_token, refresh_token, authorization code, authorization URL, request_id, code_challenge, code_verifier, client_secret, Cookie, or callback_uri.
10. Report setup as complete only if the unique identifier and source are confirmed, the effective URL matches exactly, configuration is saved, the connection is enabled, the single OAuth flow completed, tools are visible, and goanyapi_credits_balance succeeded. Otherwise report that setup is incomplete and identify the blocking step. At completion report only: Cursor version and runtime environment, effective configuration source, the single configuration path changed, enabled state, whether the single OAuth attempt succeeded, whether Cursor was refreshed or restarted, and whether the read-only balance query succeeded. Do not echo the balance or any credential.
```

</details>

### Manual setup

#### 1. Add GoAnyAPI MCP to your client

##### Codex CLI

Run:

```bash
codex mcp add goanyapi --url https://mcp.goanyapi.com/mcp
```

Codex normally opens the browser sign-in flow automatically. If it does not, or if you need to sign in again later, run:

```bash
codex mcp login goanyapi
```

Confirm that the server was added with:

```bash
codex mcp list
```

##### Codex desktop app or IDE extension

1. Open **Settings → MCP servers**.
2. Select **Add server**.
3. Choose **Streamable HTTP** and enter `goanyapi` as the name.
4. Enter `https://mcp.goanyapi.com/mcp` as the URL.
5. Save and restart the client when prompted.
6. Select **Authenticate** for the GoAnyAPI server and complete authorization.

##### Claude Code

Run:

```bash
claude mcp add --transport http goanyapi https://mcp.goanyapi.com/mcp
```

Then enter `/mcp` in Claude Code, select `goanyapi`, and complete authorization.

##### Cursor

1. Open **Cursor Settings → Tools & MCP**.
2. Select **New MCP Server** and add:

```json
{
  "mcpServers": {
    "goanyapi": {
      "url": "https://mcp.goanyapi.com/mcp"
    }
  }
}
```

3. Save the configuration and enable `goanyapi` in the MCP list.
4. Follow the browser prompt to sign in to GoAnyAPI and authorize access.

##### WorkBuddy

1. Open the MCP settings in WorkBuddy.
2. Add a remote MCP server named `goanyapi`.
3. Choose **Streamable HTTP** and enter `https://mcp.goanyapi.com/mcp`.
4. Save, then complete browser-based sign-in and authorization.

##### OpenCode

Add the following to `opencode.json`:

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

Start OpenCode and follow the authorization prompt. To start authorization manually, run:

```bash
opencode mcp auth goanyapi
```

##### Other AI clients

Add a remote **Streamable HTTP** MCP server with this URL:

```text
https://mcp.goanyapi.com/mcp
```

The client must support browser-based OAuth for remote MCP servers.

#### 2. Sign in and authorize

After you add the server, your client opens the GoAnyAPI authorization page:

1. If necessary, sign in with your GoAnyAPI email account or one of the social sign-in options shown on the page.
2. Review the client name, requested permission, and return address.
3. Select **Authorize**.
4. Wait for the browser to return to a local `localhost` or `127.0.0.1` callback page.
5. When the page says `Authentication complete. You may close this window.`, close it.
6. In Codex, `Successfully logged in.` confirms that the connection is ready.

Authorization is linked to the GoAnyAPI account currently signed in. The client does not receive your GoAnyAPI password or API key.

#### 3. Run your first query

After authorization, ask the AI for the data you need in natural language. You do not need to remember MCP tool names. For example:

```text
Use GoAnyAPI to query the last 3 months of traffic data for x.com.
```

```text
Use GoAnyAPI to query the Domain Rating and backlink data for example.com.
```

```text
Check my remaining GoAnyAPI credits.
```

The client selects the appropriate GoAnyAPI MCP tool automatically. Depending on the client's security policy, the first call may still show an Allow or Approve confirmation.

## Credits and top-ups

MCP calls use the same GoAnyAPI credit balance as the website and API.

### Check your balance and history

- Ask the AI to check your remaining GoAnyAPI credits.
- Open [Credits](https://goanyapi.com/settings/credits) to view your balance and credit history.
- Open [Payments](https://goanyapi.com/settings/payments) to review past orders.

### Add credits manually

1. Open the [GoAnyAPI pricing and top-up page](https://goanyapi.com/pricing).
2. Sign in to the same GoAnyAPI account used for MCP authorization.
3. Select a credit pack and complete payment.
4. Continue using MCP after the credits arrive; reinstalling or reauthorizing is not required.

To replenish credits when the balance is low, configure low-balance alerts and automatic top-ups under [Balance Guard](https://goanyapi.com/settings/balance-guard).

## Manage or revoke authorization

Open [Settings → MCP Authorizations](https://goanyapi.com/settings/mcp) to see connected clients and their authorization times.

- Select **Revoke** when you no longer use a client.
- A revoked client can no longer call GoAnyAPI MCP tools.
- Adding or authorizing a client repeatedly may create multiple entries with the same name. Revoke older entries and keep the one currently in use.
- Each account can authorize up to 10 MCP clients at the same time.

## Troubleshooting

### Why does authorization return to localhost or 127.0.0.1?

Codex, Claude Code, and similar local clients use a local callback address to receive the authorization result. You can close the page after it confirms that authentication is complete.

### Why did the sign-in page not open?

If the browser is already signed in to GoAnyAPI, it may go directly to the authorization page. If the client did not open a browser, start the flow again. For Codex:

```bash
codex mcp login goanyapi
```

### Why are the tools unavailable after successful authorization?

Restart the client or open a new session, then check the MCP connection. With Codex CLI, run:

```bash
codex mcp list
```

### What should I do when credits are insufficient?

Confirm which GoAnyAPI account was used for authorization, then [add credits](https://goanyapi.com/pricing) to that same account. Reauthorization is not required after the credits arrive.

### Do I need a GoAnyAPI API key?

No. MCP uses browser-based account authorization and does not require you to paste an API key into the client.
