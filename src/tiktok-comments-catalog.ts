// 由 go-any-api-vinext/scripts/sync-tiktok-comments-mcp.ts 生成。
import type { PublicApiDefinition } from './catalog-fallback.js';
export const tiktokCommentsCatalog = [
  {
    "id": "tiktok-comments-submit",
    "method": "POST",
    "path": "/api/v1/tiktok-comments/tasks",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "video_url"
      ],
      "properties": {
        "video_url": {
          "type": "string",
          "pattern": "^https://(www\\.)?tiktok\\.com/@[^/?#\\s\\\\]+/video/[0-9]+/?(?:\\?[^#\\s]*)?(?:#[^\\s]*)?$",
          "description": "Full HTTPS TikTok video URL, such as https://www.tiktok.com/@spidey.glow/video/7686957509826923808?is_from_webapp=1&sender_device=pc. Query parameters, fragments and a trailing slash are removed before collection. Short links are not supported."
        },
        "mode": {
          "type": "string",
          "enum": [
            "page",
            "all"
          ],
          "default": "page",
          "description": "page collects one main-comment page; all automatically collects every available page."
        },
        "cursor": {
          "type": "string",
          "pattern": "^[0-9]+$",
          "description": "Main-comment cursor, allowed only in page mode. Omit for the first page; use collection.next_cursor for subsequent pages."
        },
        "include_replies": {
          "type": "boolean",
          "default": false,
          "description": "Collect all available replies to the selected main comments. Main comments and replies both count toward billing."
        }
      },
      "oneOf": [
        {
          "type": "object",
          "properties": {
            "mode": {
              "type": "string",
              "enum": [
                "page"
              ]
            }
          }
        },
        {
          "type": "object",
          "required": [
            "mode"
          ],
          "properties": {
            "mode": {
              "type": "string",
              "enum": [
                "all"
              ]
            }
          },
          "not": {
            "type": "object",
            "required": [
              "cursor"
            ]
          }
        }
      ]
    },
    "mcpName": "goanyapi_tiktok_comments_submit",
    "readOnly": false,
    "docsPath": "/docs/tiktok-comment-api",
    "description": "Create a TikTok comment collection task. Provide a full video URL; short links are unsupported. mode=page collects one main-comment page of up to 40 records; mode=all automatically follows all available pages. include_replies collects all available replies to selected comments, in batches of 40. Returns task_id immediately; query the task every 5 seconds. Saved unique comments and replies are billed together per 100 records rounded up, progressively as saved. Empty results are free. Insufficient balance stops collection with partial status; paid results remain available. Queries are free, results retained 30 days. Each submission creates a new task."
  },
  {
    "id": "tiktok-comments-task",
    "method": "GET",
    "path": "/api/v1/tiktok-comments/tasks/{task_id}",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "task_id"
      ],
      "properties": {
        "task_id": {
          "type": "string",
          "pattern": "^ttc_[a-f0-9]{32}$",
          "description": "Task ID returned by the submit tool, belonging to the current account."
        },
        "result_cursor": {
          "type": "string",
          "pattern": "^[0-9]+$",
          "description": "Use results.next_cursor to read the next saved result page; omit for the first page."
        },
        "limit": {
          "type": "integer",
          "minimum": 1,
          "maximum": 100,
          "default": 100,
          "description": "Saved records per response; does not affect collection or charges."
        }
      }
    },
    "mcpName": "goanyapi_tiktok_comments_task",
    "readOnly": true,
    "docsPath": "/docs/tiktok-comment-api",
    "description": "Query your task and saved comments for free. Poll every 5 seconds while queued/running. succeeded means selected scope completed; partial/failed stopped early, inspect collection.stop_reason. Use results.next_cursor for saved result pagination; collection.next_cursor is separately used to submit the next main-comment page. Counts and billing report saved records. Replies include parent_comment_id. Results expire after 30 days."
  },
  {
    "id": "tiktok-comments-resume",
    "method": "POST",
    "path": "/api/v1/tiktok-comments/tasks/{task_id}/resume",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "task_id"
      ],
      "properties": {
        "task_id": {
          "type": "string",
          "pattern": "^ttc_[a-f0-9]{32}$",
          "description": "Your unexpired partial or failed task ID."
        }
      }
    },
    "mcpName": "goanyapi_tiktok_comments_resume",
    "readOnly": false,
    "docsPath": "/docs/tiktok-comment-api",
    "description": "Resume your stopped partial/failed TikTok comment task from its saved checkpoint after adding credits or resolving a temporary failure. Resuming itself is free; newly saved records continue the original task billing counters and rate without charging existing records again. Query the same task ID for progress."
  }
] as const satisfies readonly PublicApiDefinition[];
