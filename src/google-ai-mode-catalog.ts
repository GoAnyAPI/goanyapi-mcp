// 由 go-any-api-vinext/scripts/sync-google-ai-mode-mcp.ts 生成。
import type { PublicApiDefinition } from './catalog-fallback.js';
export const googleAiModeCatalog = [
  {
    "id": "google-ai-mode",
    "method": "POST",
    "path": "/api/v1/google-ai-mode",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "query"
      ],
      "properties": {
        "query": {
          "type": "string",
          "minLength": 1,
          "maxLength": 8192,
          "description": "Question, required; at most 8192 UTF-8 bytes.",
          "examples": [
            "What is x.com"
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
        "location": {
          "type": "string",
          "minLength": 1,
          "maxLength": 512,
          "description": "Location, for example Austin, TX. Cannot be combined with uule.",
          "examples": [
            "Austin, TX"
          ]
        },
        "coordinates": {
          "type": "object",
          "additionalProperties": false,
          "required": [
            "latitude",
            "longitude"
          ],
          "properties": {
            "latitude": {
              "type": "number",
              "minimum": -90,
              "maximum": 90
            },
            "longitude": {
              "type": "number",
              "minimum": -180,
              "maximum": 180
            }
          },
          "examples": [
            {
              "latitude": 30.2672,
              "longitude": -97.7431
            }
          ]
        },
        "uule": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4096,
          "description": "Encoded Google location, starting w+ or a+ followed by Base64; mutually exclusive with location and coordinates.",
          "pattern": "^[wa]\\+[A-Za-z0-9+/_-]+=*$"
        },
        "image_url": {
          "type": "string",
          "minLength": 1,
          "maxLength": 8192,
          "description": "Public HTTPS image URL for the initial question or a follow-up.",
          "pattern": "^https://[^\\s]+$"
        },
        "continuable": {
          "type": "boolean",
          "default": false,
          "description": "Start a follow-up conversation; requires JSON output (omit output or use json; html must be false or omitted). Returned token expires 15 minutes after the first request; availability may end sooner."
        },
        "subsequent_request_token": {
          "type": "string",
          "minLength": 1,
          "maxLength": 65536,
          "description": "Opaque token returned in result.content.subsequent_request_token. Bound to your account. Requires JSON output; omit output or use json and omit html or set false. Send a new query; retain original country, language, device and location controls. May be combined with continuable. Each completed follow-up is billed separately.",
          "pattern": "^gam1\\.[A-Za-z0-9_-]+$"
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
          "description": "Select content fields: comma-separated paths, indices, half-open slices [0:3], [] and .{nested,fields}; max 128 selections and 16 levels. Missing fields omitted. Include subsequent_request_token for follow-ups. Incompatible with HTML.",
          "examples": [
            "results[].{title,text,links},subsequent_request_token"
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
      "not": {
        "type": "object",
        "anyOf": [
          {
            "type": "object",
            "required": [
              "uule"
            ],
            "anyOf": [
              {
                "type": "object",
                "required": [
                  "location"
                ]
              },
              {
                "type": "object",
                "required": [
                  "coordinates"
                ]
              }
            ]
          },
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
          },
          {
            "type": "object",
            "anyOf": [
              {
                "type": "object",
                "required": [
                  "subsequent_request_token"
                ]
              },
              {
                "type": "object",
                "required": [
                  "continuable"
                ],
                "properties": {
                  "continuable": {
                    "type": "boolean",
                    "enum": [
                      true
                    ]
                  }
                }
              }
            ],
            "oneOf": [
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
                "not": {
                  "type": "object",
                  "required": [
                    "output"
                  ]
                }
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
                      "html",
                      "md"
                    ]
                  }
                }
              }
            ]
          }
        ]
      },
      "examples": [
        {
          "query": "What is x.com"
        },
        {
          "query": "Explain solar panels",
          "country": "us",
          "language": "en",
          "continuable": true
        }
      ]
    },
    "mcpName": "goanyapi_google_ai_mode",
    "readOnly": true,
    "docsPath": "/docs/google-ai-mode-scraper-api",
    "description": "Search Google AI Mode synchronously for answers and citation links. Required query; country/language/device and location controls are optional. Read result.content.results[].text and links; title may be AI Mode and url may be empty. Set continuable=true to start a conversation, then send a new query with the returned account-bound subsequent_request_token (up to 15 minutes). Each completed request, including empty or unavailable answers and follow-ups, is billed; errors are free. JSON by default; output supports json, md or html (Brotli/Base64 source). See inputSchema for all controls and incompatibilities."
  }
] as const satisfies readonly PublicApiDefinition[];
