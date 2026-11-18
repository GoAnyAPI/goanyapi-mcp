// 由 go-any-api-vinext/scripts/sync-google-ai-overview-mcp.ts 生成。
import type { PublicApiDefinition } from './catalog-fallback.js';
export const googleAiOverviewCatalog = [
  {
    "id": "google-ai-overview",
    "method": "POST",
    "path": "/api/v1/google-ai-overview",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "query": {
          "type": "string",
          "minLength": 1,
          "maxLength": 8192,
          "description": "Search query, at most 8192 UTF-8 bytes. Required when page_token is absent; the token retains its original query.",
          "examples": [
            "how do solar panels work"
          ]
        },
        "country": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2,
          "description": "Two-letter country code, for example us or gb; omit for the search default.",
          "pattern": "^[a-zA-Z]{2}$",
          "examples": [
            "us"
          ]
        },
        "language": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20,
          "description": "Language code, for example en or zh-CN; omit for the search default.",
          "pattern": "^[A-Za-z]{2,3}(?:-[A-Za-z]{2,4})?$",
          "examples": [
            "en"
          ]
        },
        "device": {
          "type": "string",
          "minLength": 1,
          "maxLength": 8192,
          "description": "Device: desktop, mobile or tablet.",
          "enum": [
            "desktop",
            "mobile",
            "tablet"
          ]
        },
        "page_token": {
          "type": "string",
          "minLength": 1,
          "maxLength": 65536,
          "description": "Opaque ai_overview.page_token from a compatible Google search response. Use within one minute; retains original query, locale and device. Not an AI Mode conversation token."
        },
        "output": {
          "type": "string",
          "minLength": 1,
          "maxLength": 8192,
          "description": "Response format: json (default), md (Markdown), html (Brotli-compressed Base64 source). HTML is incompatible with json_restrictor.",
          "enum": [
            "json",
            "md",
            "html"
          ],
          "default": "json"
        },
        "html": {
          "type": "boolean",
          "default": false,
          "description": "Alias for output=html. Cannot be combined with output=json/md or json_restrictor."
        },
        "json_restrictor": {
          "type": "string",
          "minLength": 1,
          "maxLength": 8192,
          "description": "Select content fields using paths, indices, slices [0:3], [] and .{nested,fields}; up to 128 selections and 16 levels. Missing fields omitted. Incompatible with HTML.",
          "examples": [
            "results[].{title,text,links},search_parameters.feature_available"
          ]
        },
        "zero_trace": {
          "type": "boolean",
          "default": false,
          "description": "Do not retain query or response artifacts. Billing and operational metadata are still retained. Default false."
        },
        "no_cache": {
          "type": "boolean",
          "default": false,
          "description": "Compatibility option; requests always fetch live results for either value. Normal billing applies."
        }
      },
      "anyOf": [
        {
          "type": "object",
          "required": [
            "query"
          ]
        },
        {
          "type": "object",
          "required": [
            "page_token"
          ]
        }
      ],
      "not": {
        "type": "object",
        "anyOf": [
          {
            "type": "object",
            "required": [
              "html"
            ],
            "properties": {
              "html": {
                "type": "boolean",
                "enum": [
                  true
                ]
              }
            },
            "anyOf": [
              {
                "type": "object",
                "required": [
                  "json_restrictor"
                ]
              },
              {
                "type": "object",
                "required": [
                  "output"
                ],
                "properties": {
                  "output": {
                    "type": "string",
                    "enum": [
                      "json",
                      "md"
                    ]
                  }
                }
              }
            ]
          },
          {
            "type": "object",
            "required": [
              "output",
              "json_restrictor"
            ],
            "properties": {
              "output": {
                "type": "string",
                "enum": [
                  "html"
                ]
              }
            }
          }
        ]
      },
      "examples": [
        {
          "query": "how do solar panels work"
        },
        {
          "query": "how do solar panels work",
          "country": "us",
          "language": "en",
          "device": "desktop"
        }
      ]
    },
    "mcpName": "goanyapi_google_ai_overview",
    "readOnly": true,
    "docsPath": "/docs/google-ai-overview-api",
    "description": "Retrieve Google AI Overview synchronously. Supply query directly, or a short-lived ai_overview.page_token from a compatible Google search response. At least one is required. Page tokens retain their original query, locale and device and must be used within one minute. country/language/device are optional for query searches. Read result.content.results[].text and links and search_parameters.feature_available. A valid search without an overview returns feature_available=false; empty business fields and missing URLs are valid. Each completed request, including unavailable overviews, is billed; errors are free. JSON by default; output supports json, md or html (Brotli/Base64 source). See inputSchema for all controls and incompatibilities."
  }
] as const satisfies readonly PublicApiDefinition[];
