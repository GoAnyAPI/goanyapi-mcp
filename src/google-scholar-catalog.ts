import type { PublicApiDefinition } from './catalog-fallback.js';

// 从 GoAnyAPI 共享公开契约生成；数据库价格由在线 Catalog 提供。
export const googleScholarCatalog = {
  "id": "google-scholar",
  "method": "GET",
  "path": "/api/v1/google-scholar",
  "inputSchema": {
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "query": {
        "type": "string",
        "minLength": 1,
        "maxLength": 8192,
        "description": "Search text, at most 8192 UTF-8 bytes. Required unless cites or cluster is supplied; optional with cites, forbidden with cluster.",
        "examples": [
          "machine learning"
        ]
      },
      "language": {
        "type": "string",
        "minLength": 1,
        "maxLength": 20,
        "description": "Interface language code, for example en or zh-CN; omit to use the search default.",
        "pattern": "^[A-Za-z]{2,3}(?:-[A-Za-z]{2,4})?$",
        "examples": [
          "en"
        ]
      },
      "page": {
        "type": "integer",
        "minimum": 1,
        "maximum": 100,
        "description": "One-based page number (GoAnyAPI range 1–100), default 1 when start is absent; mutually exclusive with start.",
        "default": 1,
        "examples": [
          1
        ]
      },
      "cites": {
        "type": "string",
        "minLength": 1,
        "maxLength": 1024,
        "description": "Comma-separated decimal Scholar article IDs from cited_by_url. Find citing articles; query optionally narrows them. Mutually exclusive with cluster.",
        "pattern": "^[0-9]+(?:,[0-9]+)*$",
        "examples": [
          "1234567890123456789"
        ]
      },
      "cluster": {
        "type": "string",
        "minLength": 1,
        "maxLength": 100,
        "description": "Decimal Scholar cluster ID from versions_url. Find article versions; mutually exclusive with query and cites.",
        "pattern": "^[0-9]+$",
        "examples": [
          "1234567890123456789"
        ]
      },
      "as_ylo": {
        "type": "integer",
        "minimum": 1,
        "maximum": 9999,
        "description": "Inclusive publication year lower bound; must not exceed as_yhi."
      },
      "as_yhi": {
        "type": "integer",
        "minimum": 1,
        "maximum": 9999,
        "description": "Inclusive publication year upper bound; must not be below as_ylo."
      },
      "scisbd": {
        "type": "integer",
        "minimum": 0,
        "maximum": 2,
        "description": "Sort: 0 relevance, 1 recent abstracts, 2 recent articles; default 0.",
        "enum": [
          0,
          1,
          2
        ],
        "default": 0
      },
      "filter": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1,
        "description": "Similar/omitted result filtering: 1 enabled, 0 disabled; omit to keep the search default.",
        "enum": [
          0,
          1
        ]
      },
      "as_vis": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1,
        "description": "Citation-only records: 1 exclude, 0 include; omit to keep the search default.",
        "enum": [
          0,
          1
        ]
      },
      "as_rr": {
        "type": "integer",
        "minimum": 0,
        "maximum": 1,
        "description": "Review articles: 1 only reviews, 0 all article types; omit to keep the search default.",
        "enum": [
          0,
          1
        ]
      },
      "start": {
        "type": "integer",
        "minimum": 0,
        "maximum": 990,
        "description": "Zero-based result offset, mutually exclusive with page."
      },
      "num": {
        "type": "integer",
        "minimum": 1,
        "maximum": 20,
        "description": "Requested page size, default 10; actual result count may be smaller.",
        "default": 10
      },
      "lr": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256,
        "description": "Result language restriction: lang_<code>, alternatives joined by |, e.g. lang_fr|lang_de.",
        "pattern": "^lang_[A-Za-z-]+(?:\\|lang_[A-Za-z-]+)*$",
        "examples": [
          "lang_fr|lang_de"
        ]
      },
      "as_sdt": {
        "type": "string",
        "minLength": 1,
        "maxLength": 256,
        "description": "Native article/patent filter or comma-separated court codes, for example 4,33,192.",
        "pattern": "^[0-9]+(?:,[0-9]+)*$",
        "examples": [
          "0",
          "7",
          "4,33,192"
        ]
      },
      "device": {
        "type": "string",
        "minLength": 1,
        "maxLength": 8192,
        "description": "Device context: desktop, mobile, tablet; omit to keep the search default.",
        "enum": [
          "desktop",
          "mobile",
          "tablet"
        ]
      },
      "safe": {
        "type": "string",
        "minLength": 1,
        "maxLength": 8192,
        "description": "Safe search: active enables filtering; off requests unfiltered results.",
        "enum": [
          "active",
          "off"
        ]
      }
    },
    "oneOf": [
      {
        "type": "object",
        "required": [
          "query"
        ],
        "not": {
          "type": "object",
          "anyOf": [
            {
              "type": "object",
              "required": [
                "cites"
              ]
            },
            {
              "type": "object",
              "required": [
                "cluster"
              ]
            }
          ]
        }
      },
      {
        "type": "object",
        "required": [
          "cites"
        ],
        "not": {
          "type": "object",
          "required": [
            "cluster"
          ]
        }
      },
      {
        "type": "object",
        "required": [
          "cluster"
        ],
        "not": {
          "type": "object",
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
                "cites"
              ]
            }
          ]
        }
      }
    ],
    "not": {
      "type": "object",
      "required": [
        "page",
        "start"
      ]
    },
    "examples": [
      {
        "query": "machine learning"
      },
      {
        "cites": "1234567890123456789",
        "query": "review"
      },
      {
        "cluster": "1234567890123456789"
      }
    ]
  },
  "mcpName": "goanyapi_google_scholar",
  "description": "Search Google Scholar articles with query, find citing articles with cites (optionally narrowed by query), or find article versions with cluster. cluster cannot be combined with query or cites. Page starts at 1; page and start are mutually exclusive. scisbd: 0 relevance, 1 recent abstracts, 2 recent articles. Year bounds are inclusive and as_ylo must not exceed as_yhi. JSON results preserve missing and empty fields. Nonempty successful pages are billed independently; empty results and failures are not billed. Read decimal cites IDs from cited_by_url and cluster IDs from versions_url; result.id is not a substitute. Author profiles and citation-format export are outside this tool.",
  "readOnly": true,
  "docsPath": "/docs/google-scholar-api"
} as const satisfies PublicApiDefinition;
