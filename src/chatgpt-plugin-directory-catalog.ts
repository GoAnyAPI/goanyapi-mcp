// 由 go-any-api-vinext/scripts/sync-chatgpt-plugin-mcp.ts 生成，请从主站公开契约同步。
import type { PublicApiDefinition } from './catalog-fallback.js';
export const chatgptPluginDirectoryCatalog = [
  {
    "id": "chatgpt-plugin-directory-categories",
    "path": "/api/v1/chatgpt-plugin-directory/categories",
    "mcpName": "goanyapi_chatgpt_plugin_directory_categories",
    "description": "List ChatGPT plugin categories with code and name. Free authenticated request. Use a returned code as category in goanyapi_chatgpt_plugin_directory_plugins.",
    "method": "GET",
    "readOnly": true,
    "docsPath": "/docs/chatgpt-plugin-directory-api",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "properties": {},
      "required": [],
      "examples": [
        {}
      ]
    }
  },
  {
    "id": "chatgpt-plugin-directory-developers",
    "path": "/api/v1/chatgpt-plugin-directory/developers",
    "mcpName": "goanyapi_chatgpt_plugin_directory_developers",
    "description": "List ChatGPT plugin developers and pluginCount. Use a returned developer in goanyapi_chatgpt_plugin_directory_developer_plugins. Zero-based page (default 0), fixed 10 records per page. Follow hasNext with the same filter. Each successful nonempty request is billed separately; empty results and failures are free.",
    "method": "GET",
    "readOnly": true,
    "docsPath": "/docs/chatgpt-plugin-directory-api",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "page": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "default": 0,
          "description": "Zero-based page, default 0. Fixed 10 records per page. If hasNext is true, increment page and keep the same filter."
        }
      },
      "required": [],
      "examples": [
        {
          "page": 0
        }
      ]
    }
  },
  {
    "id": "chatgpt-plugin-directory-plugins",
    "path": "/api/v1/chatgpt-plugin-directory/plugins",
    "mcpName": "goanyapi_chatgpt_plugin_directory_plugins",
    "description": "List ChatGPT plugins in a category. Get category codes from goanyapi_chatgpt_plugin_directory_categories; productivity is a representative example. Zero-based page (default 0), fixed 10 records per page. Follow hasNext with the same filter. Each successful nonempty request is billed separately; empty results and failures are free.",
    "method": "GET",
    "readOnly": true,
    "docsPath": "/docs/chatgpt-plugin-directory-api",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "category": {
          "type": "string",
          "minLength": 1,
          "maxLength": 512,
          "pattern": "\\S",
          "description": "Category code returned by the categories tool, for example productivity. Preserve the returned value."
        },
        "page": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "default": 0,
          "description": "Zero-based page, default 0. Fixed 10 records per page. If hasNext is true, increment page and keep the same filter."
        }
      },
      "required": [
        "category"
      ],
      "examples": [
        {
          "category": "productivity",
          "page": 0
        }
      ]
    }
  },
  {
    "id": "chatgpt-plugin-directory-developer-plugins",
    "path": "/api/v1/chatgpt-plugin-directory/developer/plugins",
    "mcpName": "goanyapi_chatgpt_plugin_directory_developer_plugins",
    "description": "List ChatGPT plugins by exact developer name. Get names from goanyapi_chatgpt_plugin_directory_developers; OpenAI is a representative example. Preserve spaces and case. Zero-based page (default 0), fixed 10 records per page. Follow hasNext with the same filter. Each successful nonempty request is billed separately; empty results and failures are free.",
    "method": "GET",
    "readOnly": true,
    "docsPath": "/docs/chatgpt-plugin-directory-api",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "developer": {
          "type": "string",
          "minLength": 1,
          "maxLength": 512,
          "pattern": "\\S",
          "description": "Exact developer name returned by the developers tool, for example OpenAI. Preserve spaces and case."
        },
        "page": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "default": 0,
          "description": "Zero-based page, default 0. Fixed 10 records per page. If hasNext is true, increment page and keep the same filter."
        }
      },
      "required": [
        "developer"
      ],
      "examples": [
        {
          "developer": "OpenAI",
          "page": 0
        }
      ]
    }
  }
] as const satisfies readonly PublicApiDefinition[];
