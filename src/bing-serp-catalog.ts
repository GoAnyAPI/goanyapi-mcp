// 由 GoAnyAPI 公开契约生成；修改参数后同步更新并验证 tools/list。
export const bingSerpCatalog = {
  "id": "bing-serp",
  "method": "GET",
  "path": "/api/v1/bing-serp",
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
        "description": "Search query; at most 8192 UTF-8 bytes.",
        "maxLength": 8192,
        "examples": [
          "coffee shops"
        ]
      },
      "cc": {
        "type": "string",
        "minLength": 1,
        "description": "Result country, case-insensitive; defaults to us when mkt is absent. Mutually exclusive with mkt.",
        "enum": [
          "ar",
          "AR",
          "Ar",
          "aR",
          "au",
          "AU",
          "Au",
          "aU",
          "at",
          "AT",
          "At",
          "aT",
          "be",
          "BE",
          "Be",
          "bE",
          "br",
          "BR",
          "Br",
          "bR",
          "ca",
          "CA",
          "Ca",
          "cA",
          "cl",
          "CL",
          "Cl",
          "cL",
          "dk",
          "DK",
          "Dk",
          "dK",
          "fi",
          "FI",
          "Fi",
          "fI",
          "fr",
          "FR",
          "Fr",
          "fR",
          "de",
          "DE",
          "De",
          "dE",
          "hk",
          "HK",
          "Hk",
          "hK",
          "in",
          "IN",
          "In",
          "iN",
          "id",
          "ID",
          "Id",
          "iD",
          "it",
          "IT",
          "It",
          "iT",
          "jp",
          "JP",
          "Jp",
          "jP",
          "kr",
          "KR",
          "Kr",
          "kR",
          "my",
          "MY",
          "My",
          "mY",
          "mx",
          "MX",
          "Mx",
          "mX",
          "nl",
          "NL",
          "Nl",
          "nL",
          "nz",
          "NZ",
          "Nz",
          "nZ",
          "no",
          "NO",
          "No",
          "nO",
          "cn",
          "CN",
          "Cn",
          "cN",
          "pl",
          "PL",
          "Pl",
          "pL",
          "pt",
          "PT",
          "Pt",
          "pT",
          "ph",
          "PH",
          "Ph",
          "pH",
          "ru",
          "RU",
          "Ru",
          "rU",
          "sa",
          "SA",
          "Sa",
          "sA",
          "za",
          "ZA",
          "Za",
          "zA",
          "es",
          "ES",
          "Es",
          "eS",
          "se",
          "SE",
          "Se",
          "sE",
          "ch",
          "CH",
          "Ch",
          "cH",
          "tw",
          "TW",
          "Tw",
          "tW",
          "tr",
          "TR",
          "Tr",
          "tR",
          "gb",
          "GB",
          "Gb",
          "gB",
          "us",
          "US",
          "Us",
          "uS",
          "vn",
          "VN",
          "Vn",
          "vN"
        ],
        "default": "us"
      },
      "mkt": {
        "type": "string",
        "minLength": 1,
        "description": "Result market, such as fr-FR; case-insensitive and mutually exclusive with cc.",
        "pattern": "^[A-Za-z]{2}-[A-Za-z]{2}$",
        "examples": [
          "fr-FR"
        ]
      },
      "setlang": {
        "type": "string",
        "minLength": 1,
        "description": "Interface-language hint, not a result-language filter; Bing may fall back to English.",
        "default": "en-US",
        "examples": [
          "en-US"
        ]
      },
      "device": {
        "type": "string",
        "minLength": 1,
        "description": "Device context.",
        "enum": [
          "desktop",
          "mobile",
          "tablet"
        ]
      },
      "next_page_token": {
        "type": "string",
        "minLength": 1,
        "description": "Opaque token from result.next_page_token. Expires after one hour; resend the same query and search controls. Restart without token if expired or rejected."
      },
      "location": {
        "type": "string",
        "minLength": 1,
        "description": "Search origin, a place name or supported country code; at most 512 UTF-8 bytes, no control characters. Mutually exclusive with coordinates.",
        "maxLength": 512,
        "pattern": "^[^\\x00-\\x1f\\x7f]+$",
        "examples": [
          "Austin, Texas"
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
        ],
        "description": "Location bias, not a geographic boundary. Mutually exclusive with location. In GET requests serialize this object as JSON."
      },
      "safe": {
        "type": "string",
        "minLength": 1,
        "description": "Safe search: active enables strict filtering; off requests unfiltered results.",
        "enum": [
          "active",
          "off"
        ]
      },
      "tbs": {
        "type": "string",
        "minLength": 1,
        "description": "Time range: qdr:d/w/m/y with optional positive amount up to 10000, or cdr:1,cd_min:M/D/YYYY,cd_max:M/D/YYYY. No hour ranges. Mutually exclusive with filters.",
        "pattern": "^(?:qdr:[dwmy](?:[1-9][0-9]{0,3}|10000)?|cdr:1,cd_min:(?:[1-9]|1[0-2])/(?:[1-9]|[12][0-9]|3[01])/[0-9]{4},cd_max:(?:[1-9]|1[0-2])/(?:[1-9]|[12][0-9]|3[01])/[0-9]{4})$",
        "examples": [
          "qdr:w"
        ]
      },
      "filters": {
        "type": "string",
        "minLength": 1,
        "description": "Native Bing URL filters; at most 4096 UTF-8 bytes, no control characters. Mutually exclusive with tbs; preserve exactly when paginating.",
        "maxLength": 4096,
        "pattern": "^[^\\x00-\\x1f\\x7f]+$"
      },
      "first": {
        "type": "integer",
        "minimum": 1,
        "maximum": 9007199254740991,
        "default": 1,
        "description": "One-based page position, default 1. Values above 1 require the preceding next_page_token and must match it; when using a token, first may be omitted."
      },
      "sp": {
        "type": "integer",
        "enum": [
          -1
        ],
        "description": "Best-effort Bing spelling hint; only -1 is supported."
      },
      "color_scheme": {
        "type": "string",
        "minLength": 1,
        "description": "Search-page presentation; does not change ranking.",
        "enum": [
          "light",
          "dark"
        ]
      },
      "output": {
        "type": "string",
        "minLength": 1,
        "description": "Content format; html contains Brotli-compressed Base64 source HTML, md contains Markdown. The JSON response envelope is retained.",
        "enum": [
          "json",
          "html",
          "md"
        ],
        "default": "json"
      },
      "html": {
        "type": "boolean",
        "default": false,
        "description": "Return encoded source HTML; alias for output=html. Incompatible with json_restrictor."
      },
      "json_restrictor": {
        "type": "string",
        "minLength": 1,
        "description": "Select content fields using comma-separated paths, indices, [start:end], [] and .{a,b}; at most 128 selections and 16 levels. Example: results[0:3].{title,url,snippet},has_next_page. Incompatible with HTML output.",
        "examples": [
          "results[0:3].{title,url,snippet},has_next_page"
        ]
      },
      "zero_trace": {
        "type": "boolean",
        "default": false,
        "description": "Do not archive search acquisition artifacts. GoAnyAPI request history and billing records remain unchanged; this is not a request-history deletion option."
      },
      "no_cache": {
        "type": "boolean",
        "default": false,
        "description": "Compatibility flag; either value fetches fresh results and normal success billing applies."
      }
    },
    "not": {
      "type": "object",
      "anyOf": [
        {
          "type": "object",
          "required": [
            "cc",
            "mkt"
          ]
        },
        {
          "type": "object",
          "required": [
            "location",
            "coordinates"
          ]
        },
        {
          "type": "object",
          "required": [
            "tbs",
            "filters"
          ]
        },
        {
          "type": "object",
          "required": [
            "first"
          ],
          "properties": {
            "first": {
              "type": "integer",
              "minimum": 2
            }
          },
          "not": {
            "type": "object",
            "required": [
              "next_page_token"
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "json_restrictor",
            "html"
          ],
          "properties": {
            "html": {
              "type": "boolean",
              "enum": [
                true
              ]
            }
          }
        },
        {
          "type": "object",
          "required": [
            "json_restrictor",
            "output"
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
    }
  },
  "mcpName": "goanyapi_bing_serp",
  "description": "Search Bing using query, market, location and device controls. Return native results and SERP features, Markdown or encoded HTML. Continue using result.next_page_token with unchanged search controls; tokens expire after one hour. Valid empty results are billed; failures are not billed. Coordinates must be JSON-serialized in GET URLs.",
  "readOnly": true,
  "docsPath": "/docs/bing-serp-api"
} as const;
