# GoAnyAPI MCP for OpenClaw

GoAnyAPI connects OpenClaw agents to web search, SEO, website traffic, backlinks, keyword research, Google Ads transparency, and other public web data through a remote MCP server.

- Website: https://goanyapi.com
- Remote MCP endpoint: https://mcp.goanyapi.com/mcp
- Source: https://github.com/GoAnyAPI/goanyapi-mcp

The bundle declares a Streamable HTTP MCP connection. After installing and enabling it in OpenClaw, sign in to your GoAnyAPI account from the plugin's MCP account controls. Authorization uses OAuth with the `mcp:invoke` scope; do not paste an API key or token into the package configuration.

To check the connection, invoke the read-only `goanyapi_credits_balance` tool. Data queries may consume GoAnyAPI credits; current rates are shown on the corresponding product pages at https://goanyapi.com.

The remote service is operated by CHATHUB LLC. The package contains only connection metadata, documentation, and an icon; it does not run a local MCP server.
