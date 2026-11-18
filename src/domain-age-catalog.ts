// 由 go-any-api-vinext/scripts/sync-domain-age-mcp.ts 生成。
import type { PublicApiDefinition } from './catalog-fallback.js';
export const domainAgeCatalog = [
  {
    "id": "domain-age",
    "method": "GET",
    "path": "/api/v1/domain-age",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "domain"
      ],
      "properties": {
        "domain": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "description": "One domain, for example example.com. URL prefixes, paths, ports and a trailing dot are removed; subdomains are preserved. At most 2048 input characters and 253 characters after normalization.",
          "examples": [
            "example.com",
            "https://example.com/about"
          ]
        }
      },
      "examples": [
        {
          "domain": "example.com"
        }
      ]
    },
    "mcpName": "goanyapi_domain_age",
    "readOnly": true,
    "docsPath": "/docs/domain-age-api",
    "description": "Query domain registration and expiration dates and domain age synchronously. Supply one domain; URL prefixes, paths, ports and a trailing dot are removed as with Domain Rating. Subdomains are preserved. age_days is the number of complete elapsed 24-hour periods between a valid registration timestamp and as_of (UTC). Missing, invalid or future registration dates yield age_days=null and cost no credits; a valid age of zero is billable. Missing expiration does not affect billing. Dates and empty business values are preserved. This measures the current registration record, not website launch time or complete registration history. No task ID or polling is required."
  }
] as const satisfies readonly PublicApiDefinition[];
