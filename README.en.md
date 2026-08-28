# GoAnyAPI MCP

English | [中文](README.md)

Use GoAnyAPI data directly from Codex, Claude Code, Cursor, WorkBuddy, OpenCode, and other AI clients that support remote HTTP MCP servers.

- MCP URL: `https://mcp.goanyapi.com/mcp`
- Sign in with your GoAnyAPI account; no API key needs to be created or copied
- MCP queries consume credits from the authorized GoAnyAPI account
- Regular users do not need to clone this repository, install dependencies, or run a local server

## Quick start

### 1. Add GoAnyAPI MCP to your client

#### Codex CLI

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

#### Codex desktop app or IDE extension

1. Open **Settings → MCP servers**.
2. Select **Add server**.
3. Choose **Streamable HTTP** and enter `goanyapi` as the name.
4. Enter `https://mcp.goanyapi.com/mcp` as the URL.
5. Save and restart the client when prompted.
6. Select **Authenticate** for the GoAnyAPI server and complete authorization.

#### Claude Code

Run:

```bash
claude mcp add --transport http goanyapi https://mcp.goanyapi.com/mcp
```

Then enter `/mcp` in Claude Code, select `goanyapi`, and complete authorization.

#### Cursor

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

#### WorkBuddy

1. Open the MCP settings in WorkBuddy.
2. Add a remote MCP server named `goanyapi`.
3. Choose **Streamable HTTP** and enter `https://mcp.goanyapi.com/mcp`.
4. Save, then complete browser-based sign-in and authorization.

#### OpenCode

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

#### Other AI clients

Add a remote **Streamable HTTP** MCP server with this URL:

```text
https://mcp.goanyapi.com/mcp
```

The client must support browser-based OAuth for remote MCP servers.

### 2. Sign in and authorize

After you add the server, your client opens the GoAnyAPI authorization page:

1. If necessary, sign in with your GoAnyAPI email account or one of the social sign-in options shown on the page.
2. Review the client name, requested permission, and return address.
3. Select **Authorize**.
4. Wait for the browser to return to a local `localhost` or `127.0.0.1` callback page.
5. When the page says `Authentication complete. You may close this window.`, close it.
6. In Codex, `Successfully logged in.` confirms that the connection is ready.

Authorization is linked to the GoAnyAPI account currently signed in. The client does not receive your GoAnyAPI password or API key.

### 3. Run your first query

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
