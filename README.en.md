# GoAnyAPI MCP

English | [中文](README.md)

Connect GoAnyAPI website analytics and search capabilities to AI clients through the Model Context Protocol (MCP). Once connected, you can use natural language to query website traffic, domain ratings, backlinks, SERP results, autocomplete suggestions, and more. The AI client selects the appropriate tool based on your request.

## Getting Started

### 1. Get an API Key

1. Sign in at [goanyapi.com](https://goanyapi.com).
2. Create and copy an API Key from the API Key page in the console.
3. Make sure your account has available credits.

Store the API Key only in your environment variables or a client-side secret manager. Do not commit it to a repository, screenshot, or public configuration file.

### 2. Set the API Key

macOS / Linux:

```bash
export GOANYAPI_API_KEY="your GoAnyAPI API Key"
```

Windows PowerShell:

```powershell
$env:GOANYAPI_API_KEY="your GoAnyAPI API Key"
```

The command above only applies to the current PowerShell window. To persist the variable for the current Windows user, use:

```powershell
[Environment]::SetEnvironmentVariable("GOANYAPI_API_KEY", "your GoAnyAPI API Key", "User")
```

After setting a persistent environment variable, open a new terminal and restart Codex, Claude Code, or Cursor. Already-running clients do not automatically pick up new environment variables.

If an AI client has permission to operate the terminal, you can also set the environment variable through a conversation. For example:

```text
Please save the GoAnyAPI API Key I provide as the persistent environment variable GOANYAPI_API_KEY for the current Windows user.
Do not echo the API Key in your reply, and do not write it to project files, MCP configuration files, or a Git repository.
After setup, only verify that the environment variable exists, then check the goanyapi MCP configuration.
```

Provide the API Key through a secure input mechanism or a local secret manager. Do not paste it into a public conversation. Conversation-based setup requires permission to operate the terminal and environment variables.

### 3. MCP Server URL

Production MCP server:

```text
https://mcp.goanyapi.com/mcp
```

The server uses Bearer Token authentication. Clients must send:

```http
Authorization: Bearer <GOANYAPI_API_KEY>
```

## Integrate with AI Clients

### Conversation-Based Setup

If an AI client can operate the terminal and configuration files, it can configure the MCP server through a conversation. This is not limited to Codex. For example, send:

```text
Please connect GoAnyAPI MCP.
Server URL: https://mcp.goanyapi.com/mcp
Authentication: read the Bearer Token from the GOANYAPI_API_KEY environment variable.
Use the MCP configuration format for the current AI client, verify that goanyapi is enabled, and do not write the real API Key to any configuration file.
```

Conversation-based setup requires user authorization to operate the terminal and configuration files. After setup, reopen the terminal and restart the client before sending natural-language requests.

### Codex

Add the following to `~/.codex/config.toml`:

```toml
[mcp_servers.goanyapi]
url = "https://mcp.goanyapi.com/mcp"
bearer_token_env_var = "GOANYAPI_API_KEY"
```

Restart Codex after adding the configuration. Codex reads the key from `GOANYAPI_API_KEY` and automatically adds the authentication header.

### Claude Code (cc)

Create `.mcp.json` in the project root:

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

After starting Claude Code, run `/mcp` to check the connection. You can also run:

```bash
claude mcp list
```

### Cursor

Write the following to the project-level `.cursor/mcp.json` or Cursor's global MCP configuration file:

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

Reload Cursor after saving. Cursor reads the key from `GOANYAPI_API_KEY`.

## Usage Examples

Once connected, ask the AI client directly:

```text
Query website traffic and the main traffic sources for github.com.
```

```text
Query the domain rating and backlink data for github.com.
```

```text
Use the Bing SERP API to search for “ai image” and return ads, organic results, and pagination data.
```

```text
Get Google and Bing autocomplete suggestions for “ai image”.
```

The MCP server selects the appropriate GoAnyAPI tool based on the request. See the [GoAnyAPI Chinese documentation](https://goanyapi.com/zh/docs) for detailed parameters, response fields, and credit usage.

## Pricing and Data Safety

- Each call consumes account credits according to the corresponding API rules.
- The API Key represents your GoAnyAPI account permissions. Do not share it.
- Do not write the real API Key to a Git repository, commit record, or public screenshot.
- If you stop using a client, remove its MCP configuration and rotate the API Key.

## Common Issues

### 401 or Unauthorized

Confirm that the API Key is valid and that the client sends:

```http
Authorization: Bearer <GOANYAPI_API_KEY>
```

Also confirm that `GOANYAPI_API_KEY` was set before starting the client.

### Insufficient Credits

Sign in to the [GoAnyAPI pricing page](https://goanyapi.com/zh/pricing) to check your balance and purchase credits.

### The Client Does Not Show Any Tools

Confirm that the MCP URL is exactly:

```text
https://mcp.goanyapi.com/mcp
```

Then reload or restart the client and check its MCP connection status.

### Check Whether the Service Is Reachable

You can access the health-check endpoint from a browser or command line:

```text
https://mcp.goanyapi.com/health
```

The health check only confirms that the service is online. Calling tools still requires a valid API Key.

### Windows Sandbox Blocks Network Requests

If a manual test returns an error like:

```text
curl: (7) Failed to connect to mcp.goanyapi.com port 443
```

the current terminal or AI client sandbox may be blocking outbound network access. This does not necessarily mean that the MCP URL or API Key is wrong. Restart the client so its MCP manager can reload the configuration. If it still fails, check whether your proxy, firewall, or corporate network allows:

```text
mcp.goanyapi.com:443
```

Do not disable all sandbox restrictions just for testing. Use the client's network allowlist or controlled network permissions when available, and allow only the required domain.

### PowerShell Shows a Web-Script Security Prompt

Windows PowerShell 5.1 may show a prompt about running scripts when `Invoke-WebRequest` is used to call the MCP server. This is a PowerShell web parser warning, not a GoAnyAPI MCP error. For manual tests, use:

```powershell
Invoke-WebRequest -UseBasicParsing ...
```

Alternatively, use `Invoke-RestMethod` or `curl.exe` to avoid the web-script parser. `Invoke-RestMethod` is recommended for JSON MCP responses.

### Do Clients Need to Restart After Configuration Changes?

After changing an MCP configuration file or environment variable, the client must reload the configuration. Some clients support reconnecting or hot reload, but a full restart is generally recommended:

- Codex: restart Codex.
- Claude Code: start a new session and use `/mcp` to check the connection.
- Cursor: reload the window or restart Cursor.
- Other AI clients: use their Reload, Reconnect, or Restart function when available.

If the tools still do not appear, verify the MCP URL, environment variable, and authentication settings, then reload or restart the client again.
