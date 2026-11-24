// Generated from GoAnyAPI shared public contract.
import type {PublicApiDefinition} from './catalog-fallback.js';
export const tiktokSyncCatalog=[
  {
    "id": "tiktok-video-detail",
    "method": "GET",
    "path": "/api/v1/tiktok/video-detail",
    "mcpName": "goanyapi_tiktok_video_detail",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [],
      "oneOf": [
        {
          "type": "object",
          "required": [
            "url"
          ],
          "not": {
            "type": "object",
            "required": [
              "item_id"
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "item_id"
          ],
          "not": {
            "type": "object",
            "required": [
              "url"
            ]
          }
        }
      ],
      "properties": {
        "item_id": {
          "type": "string",
          "pattern": "^[0-9]+$",
          "description": "Video ID. Example: 7686957509826923808."
        },
        "url": {
          "type": "string",
          "pattern": "^https://(www\\.)?tiktok\\.com/@[A-Za-z0-9._]+/video/[0-9]+/?(?:\\?[^#\\s]*)?(?:#[^\\s]*)?$",
          "description": "Full TikTok video URL. Example: https://www.tiktok.com/@spidey.glow/video/7686957509826923808. Supply either url or item_id, never both. Sharing parameters and fragments are removed. Short links are unsupported. URL resolution adds no separate credit charge."
        }
      }
    },
    "description": "TikTok Video Detail API Supply either url or item_id, never both; resource URL resolution adds no separate charge.. Synchronous public data query. Empty results and failures are free. Returns video details in data.item with optional music, hashtags, caption annotations, media formats, engagement counts and public attachments in data.item.anchors.",
    "docsPath": "/docs/tiktok-video-detail-api"
  },
  {
    "id": "tiktok-user-profile",
    "method": "GET",
    "path": "/api/v1/tiktok/user-profile",
    "mcpName": "goanyapi_tiktok_user_profile",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [],
      "oneOf": [
        {
          "type": "object",
          "required": [
            "url"
          ],
          "not": {
            "type": "object",
            "required": [
              "username"
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "username"
          ],
          "not": {
            "type": "object",
            "required": [
              "url"
            ]
          }
        }
      ],
      "properties": {
        "username": {
          "type": "string",
          "pattern": "^[A-Za-z0-9._]+$",
          "description": "Username. Example: spidey.glow. Supply the username without @."
        },
        "url": {
          "type": "string",
          "pattern": "^https://(www\\.)?tiktok\\.com/@[A-Za-z0-9._]+/?(?:\\?[^#\\s]*)?(?:#[^\\s]*)?$",
          "description": "Full TikTok profile URL. Example: https://www.tiktok.com/@spidey.glow. Supply either url or username, never both. Sharing parameters and fragments are removed. Short links are unsupported. URL resolution adds no separate credit charge."
        }
      }
    },
    "description": "TikTok User Profile API Supply either url or username, never both; resource URL resolution adds no separate charge.. Synchronous public data query. Empty results and failures are free. Each page is billed separately. Use the returned nextCursor only; it may be null even when hasMore is true.",
    "docsPath": "/docs/tiktok-user-profile-api"
  },
  {
    "id": "tiktok-user-posts",
    "method": "GET",
    "path": "/api/v1/tiktok/user-posts",
    "mcpName": "goanyapi_tiktok_user_posts",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [],
      "oneOf": [
        {
          "type": "object",
          "required": [
            "url"
          ],
          "not": {
            "type": "object",
            "required": [
              "username"
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "username"
          ],
          "not": {
            "type": "object",
            "required": [
              "url"
            ]
          }
        }
      ],
      "properties": {
        "username": {
          "type": "string",
          "pattern": "^[A-Za-z0-9._]+$",
          "description": "Username. Example: spidey.glow. Supply the username without @."
        },
        "url": {
          "type": "string",
          "pattern": "^https://(www\\.)?tiktok\\.com/@[A-Za-z0-9._]+/?(?:\\?[^#\\s]*)?(?:#[^\\s]*)?$",
          "description": "Full TikTok profile URL. Example: https://www.tiktok.com/@spidey.glow. Supply either url or username, never both. Sharing parameters and fragments are removed. Short links are unsupported. URL resolution adds no separate credit charge."
        },
        "cursor": {
          "type": "string",
          "pattern": "^[0-9]+$",
          "default": "0",
          "description": "Collection cursor. Use nextCursor only when returned; never infer an offset."
        },
        "count": {
          "type": "integer",
          "minimum": 15,
          "maximum": 15,
          "default": 15,
          "description": "Fixed page size 15; actual returned records may be fewer."
        }
      }
    },
    "description": "TikTok User Posts API Supply a resource URL or username; no ID lookup is required. Internal identifier handling adds no separate charge; only the final non-empty posts result is billed once. sec_uid and challenge_id are unsupported. Supply either url or username, never both; resource URL resolution adds no separate charge.. Synchronous public data query. Empty results and failures are free. Each page is billed separately. Use the returned nextCursor only; it may be null even when hasMore is true.",
    "docsPath": "/docs/tiktok-user-posts-api"
  },
  {
    "id": "tiktok-hashtag-detail",
    "method": "GET",
    "path": "/api/v1/tiktok/hashtag-detail",
    "mcpName": "goanyapi_tiktok_hashtag_detail",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [],
      "oneOf": [
        {
          "type": "object",
          "required": [
            "url"
          ],
          "not": {
            "type": "object",
            "required": [
              "challenge_name"
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "challenge_name"
          ],
          "not": {
            "type": "object",
            "required": [
              "url"
            ]
          }
        }
      ],
      "properties": {
        "challenge_name": {
          "type": "string",
          "pattern": "^[^#\\s]+$",
          "description": "Hashtag name. Example: fyp. Supply the hashtag name without #."
        },
        "url": {
          "type": "string",
          "pattern": "^https://(www\\.)?tiktok\\.com/tag/[^/?#\\s\\\\]+/?(?:\\?[^#\\s]*)?(?:#[^\\s]*)?$",
          "description": "Full TikTok hashtag URL. Example: https://www.tiktok.com/tag/fyp. Supply either url or challenge_name, never both. Sharing parameters and fragments are removed. Short links are unsupported. URL resolution adds no separate credit charge."
        }
      }
    },
    "description": "TikTok Hashtag Detail API Supply either url or challenge_name, never both; resource URL resolution adds no separate charge.. Synchronous public data query. Empty results and failures are free. Each page is billed separately. Use the returned nextCursor only; it may be null even when hasMore is true.",
    "docsPath": "/docs/tiktok-hashtag-detail-api"
  },
  {
    "id": "tiktok-hashtag-posts",
    "method": "GET",
    "path": "/api/v1/tiktok/hashtag-posts",
    "mcpName": "goanyapi_tiktok_hashtag_posts",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [],
      "oneOf": [
        {
          "type": "object",
          "required": [
            "url"
          ],
          "not": {
            "type": "object",
            "required": [
              "challenge_name"
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "challenge_name"
          ],
          "not": {
            "type": "object",
            "required": [
              "url"
            ]
          }
        }
      ],
      "properties": {
        "challenge_name": {
          "type": "string",
          "pattern": "^[^#\\s]+$",
          "description": "Hashtag name. Example: fyp. Supply the hashtag name without #."
        },
        "url": {
          "type": "string",
          "pattern": "^https://(www\\.)?tiktok\\.com/tag/[^/?#\\s\\\\]+/?(?:\\?[^#\\s]*)?(?:#[^\\s]*)?$",
          "description": "Full TikTok hashtag URL. Example: https://www.tiktok.com/tag/fyp. Supply either url or challenge_name, never both. Sharing parameters and fragments are removed. Short links are unsupported. URL resolution adds no separate credit charge."
        },
        "cursor": {
          "type": "string",
          "pattern": "^[0-9]+$",
          "default": "0",
          "description": "Collection cursor. Use nextCursor only when returned; never infer an offset."
        },
        "count": {
          "type": "integer",
          "minimum": 20,
          "maximum": 20,
          "default": 20,
          "description": "Fixed page size 20; actual returned records may be fewer."
        }
      }
    },
    "description": "TikTok Hashtag Posts API Supply a resource URL or challenge_name; no ID lookup is required. Internal identifier handling adds no separate charge; only the final non-empty posts result is billed once. sec_uid and challenge_id are unsupported. Supply either url or challenge_name, never both; resource URL resolution adds no separate charge.. Synchronous public data query. Empty results and failures are free. Each page is billed separately. Use the returned nextCursor only; it may be null even when hasMore is true.",
    "docsPath": "/docs/tiktok-hashtag-posts-api"
  },
  {
    "id": "tiktok-explore",
    "method": "GET",
    "path": "/api/v1/tiktok/explore",
    "mcpName": "goanyapi_tiktok_explore",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "category_type"
      ],
      "properties": {
        "category_type": {
          "type": "string",
          "pattern": "^[0-9]+$",
          "description": "Explore category ID. 120=All; 119=Singing & Dancing; 104=Comedy; 112=Sports; 100=Anime & Comics; 107=Relationship; 101=Shows; 105=Daily Life; 102=Beauty Care; 103=Games; 109=Outfit; 108=Drama; 117=Fitness & Health; 116=Education; 118=Technology; 113=Animals; 106=Family; 110=Lipsync; 114=Society; 115=Cars; 111=Food.",
          "enum": [
            "120",
            "119",
            "104",
            "112",
            "100",
            "107",
            "101",
            "105",
            "102",
            "103",
            "109",
            "108",
            "117",
            "116",
            "118",
            "113",
            "106",
            "110",
            "114",
            "115",
            "111"
          ]
        }
      }
    },
    "description": "TikTok Explore API. Synchronous public data query. Empty results and failures are free. Each request asks for 20 records and returns one batch. Repeat the same request to fetch another batch; records can overlap. Non-empty successes are billed separately.",
    "docsPath": "/docs/tiktok-explore-api"
  },
  {
    "id": "tiktok-feed",
    "method": "GET",
    "path": "/api/v1/tiktok/feed",
    "mcpName": "goanyapi_tiktok_feed",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [],
      "properties": {}
    },
    "description": "TikTok Feed API. Synchronous public data query. Empty results and failures are free. Each request asks for 20 records and returns one batch. Repeat the same request to fetch another batch; records can overlap. Non-empty successes are billed separately.",
    "docsPath": "/docs/tiktok-feed-api"
  }
] as const satisfies readonly PublicApiDefinition[];
