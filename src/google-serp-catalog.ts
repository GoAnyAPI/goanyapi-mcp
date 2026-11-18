// 从 GoAnyAPI 共享公开契约生成；价格由在线 Catalog 提供。
export const googleSerpCatalog = [
  {
    "id": "serp-stable",
    "method": "GET",
    "path": "/api/v1/serp-stable",
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
          "description": "Search query; maximum 8192 UTF-8 bytes.",
          "examples": [
            "coffee shops"
          ]
        },
        "gl": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Result country preference, e.g. us.",
          "pattern": "^[a-zA-Z]{2}$",
          "examples": [
            "us"
          ]
        },
        "hl": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Interface language, e.g. en or zh-cn.",
          "pattern": "^[a-zA-Z]{2,3}(?:-(?:[a-zA-Z]{2}|[0-9]{3}))?$",
          "examples": [
            "en",
            "zh-cn"
          ]
        },
        "start": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "description": "Zero-based result offset; use 10 for the second page."
        },
        "device": {
          "type": "string",
          "enum": [
            "desktop",
            "tablet",
            "mobile"
          ],
          "description": "Device presentation: desktop, tablet or mobile."
        },
        "safe": {
          "type": "string",
          "enum": [
            "active",
            "off"
          ],
          "description": "Safe search: active enables filtering; off disables it."
        },
        "tbs": {
          "type": "string",
          "minLength": 1,
          "maxLength": 512,
          "description": "Advanced filters, e.g. qdr:w or cdr:1,cd_min:1/1/2026,cd_max:2/1/2026."
        },
        "location": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Search origin, e.g. Austin,Texas,United States. Exclusive with uule and coordinates."
        },
        "uule": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Raw encoded location beginning w+ or a+; exclusive with location, coordinates and radius.",
          "pattern": "^[wa]\\+(?:[A-Za-z0-9+/]+|[A-Za-z0-9_-]+)={0,2}$"
        },
        "google_domain": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Google domain without protocol, e.g. google.com.",
          "pattern": "^google\\.[a-z.]+$",
          "examples": [
            "google.com",
            "google.co.uk"
          ]
        },
        "cr": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Document countries, e.g. countryUS|countryCA.",
          "pattern": "^country[A-Z]{2}(?:\\|country[A-Z]{2})*$"
        },
        "lr": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Result languages, e.g. lang_fr|lang_de.",
          "pattern": "^lang_[a-z]{2,3}(?:\\|lang_[a-z]{2,3})*$"
        },
        "filter": {
          "type": "integer",
          "enum": [
            0,
            1
          ],
          "description": "Similar-result filtering: 1 enables, 0 disables."
        },
        "nfpr": {
          "type": "integer",
          "enum": [
            0,
            1
          ],
          "description": "Spelling correction: 1 requests original spelling; 0 permits correction."
        },
        "radius": {
          "type": "integer",
          "minimum": 1,
          "maximum": 1000,
          "description": "Location bias radius in meters. Desktop: 1–199; mobile/tablet: 1–1000. Requires a location center."
        },
        "ludocid": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20,
          "description": "Google place CID as a decimal string.",
          "pattern": "^[0-9]+$"
        },
        "lsig": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "description": "Place signature returned with local results."
        },
        "kgmid": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Google entity identifier beginning with /m/ or /g/.",
          "pattern": "^/(?:m|g)/[^\\s]+$"
        },
        "si": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Search context token returned by Google."
        },
        "ibp": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Native layout selector, e.g. htl;jobs for job listings or gwp;0,7 for a place layout.",
          "examples": [
            "htl;jobs",
            "gwp;0,7"
          ]
        },
        "uds": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Native filter token returned in search filter links."
        },
        "color_scheme": {
          "type": "string",
          "enum": [
            "light",
            "dark"
          ],
          "description": "Search page presentation theme; does not select a GoAnyAPI theme."
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
          "description": "Coordinates object: latitude and longitude. In a GET URL, supply a JSON string."
        },
        "tbm": {
          "type": "string",
          "enum": [
            "nws",
            "vid",
            "isch",
            "shop",
            "lcl",
            "bks"
          ],
          "description": "Search type: nws=news, vid=videos, isch=images, shop=shopping, lcl=local, bks=books. Exclusive with udm."
        },
        "udm": {
          "type": "integer",
          "enum": [
            1,
            2,
            6,
            7,
            12,
            14,
            28,
            36,
            50
          ],
          "description": "Search tab: 1=local, 2=images, 6=forums, 7=videos, 12=news, 14=web, 28=shopping, 36=books, 50=AI mode. Exclusive with tbm. Result availability varies by market."
        },
        "pws": {
          "type": "integer",
          "enum": [
            0,
            1
          ],
          "description": "Personalization: 0 disables it; 1 permits it."
        }
      },
      "oneOf": [
        {
          "type": "object",
          "not": {
            "type": "object",
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
                  "uule"
                ]
              },
              {
                "type": "object",
                "required": [
                  "coordinates"
                ]
              }
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "location"
          ],
          "not": {
            "type": "object",
            "anyOf": [
              {
                "type": "object",
                "required": [
                  "uule"
                ]
              },
              {
                "type": "object",
                "required": [
                  "coordinates"
                ]
              }
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "uule"
          ],
          "not": {
            "type": "object",
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
              },
              {
                "type": "object",
                "required": [
                  "radius"
                ]
              }
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "coordinates"
          ],
          "not": {
            "type": "object",
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
                  "uule"
                ]
              }
            ]
          }
        }
      ],
      "not": {
        "type": "object",
        "anyOf": [
          {
            "type": "object",
            "required": [
              "radius"
            ],
            "not": {
              "type": "object",
              "anyOf": [
                {
                  "type": "object",
                  "required": [
                    "coordinates"
                  ]
                }
              ]
            }
          },
          {
            "type": "object",
            "required": [
              "radius"
            ],
            "properties": {
              "radius": {
                "type": "integer",
                "minimum": 200
              }
            },
            "anyOf": [
              {
                "type": "object",
                "not": {
                  "type": "object",
                  "anyOf": [
                    {
                      "type": "object",
                      "required": [
                        "device"
                      ]
                    }
                  ]
                }
              },
              {
                "type": "object",
                "required": [
                  "device"
                ],
                "properties": {
                  "device": {
                    "type": "string",
                    "enum": [
                      "desktop"
                    ]
                  }
                }
              }
            ]
          },
          {
            "type": "object",
            "required": [
              "tbm",
              "udm"
            ]
          },
          {
            "type": "object",
            "required": [
              "tbs"
            ],
            "properties": {
              "tbs": {
                "type": "string",
                "pattern": "(^|,)[lL][iI]\\s*:"
              }
            }
          }
        ]
      }
    },
    "mcpName": "goanyapi_google_serp_stable",
    "description": "Google SERP Stable edition. Prefer SERP Stable for more reliable, faster responses. Prefer goanyapi_google_serp_stable (/api/v1/serp-stable) instead of goanyapi_google_serp for routine searches and after a Multi-mode request fails. Rename q to query when changing to Stable; use Stable's inputSchema and response fields. Multi-mode request failures include a Stable recommendation in the message, mention lower credit usage only when current Stable pricing is lower, and provide details.recommended_endpoint, details.recommended_mcp_tool, details.docs and details.parameter_renames; details.parameter_mapping_required means other parameters must be checked against Stable's schema. Unsupported selectors require parameter adjustment. GoAnyAPI does not switch editions or retry automatically. Supports geographic targeting and native search tabs; coordinates is an object serialized as JSON in GET URLs. Valid empty results are billed; failed requests are not billed.",
    "readOnly": true,
    "docsPath": "/docs/serp-api"
  },
  {
    "id": "serp-standard",
    "method": "GET",
    "path": "/api/v1/serp-standard",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "q"
      ],
      "properties": {
        "q": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Search query; supports site:, intitle: and inurl:.",
          "examples": [
            "coffee shops"
          ]
        },
        "gl": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Result country preference, e.g. us.",
          "pattern": "^[a-zA-Z]{2}$",
          "examples": [
            "us"
          ]
        },
        "hl": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Interface language, e.g. en or zh-cn.",
          "pattern": "^[a-zA-Z]{2,3}(?:-(?:[a-zA-Z]{2}|[0-9]{3}))?$",
          "examples": [
            "en",
            "zh-cn"
          ]
        },
        "start": {
          "type": "integer",
          "minimum": 0,
          "maximum": 2147483647,
          "description": "Zero-based result offset; use 10 for the second page."
        },
        "device": {
          "type": "string",
          "enum": [
            "desktop",
            "tablet",
            "mobile"
          ],
          "description": "Device presentation: desktop, tablet or mobile."
        },
        "safe": {
          "type": "string",
          "enum": [
            "active",
            "off"
          ],
          "description": "Safe search: active enables filtering; off disables it."
        },
        "tbs": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Advanced filters, e.g. qdr:w or cdr:1,cd_min:1/1/2026,cd_max:2/1/2026."
        },
        "location": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Search origin, e.g. Austin,Texas,United States. Exclusive with uule and coordinates."
        },
        "uule": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Google-encoded location; exclusive with other location controls."
        },
        "google_domain": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Google domain without protocol, e.g. google.com.",
          "pattern": "^google\\.[a-z.]+$",
          "examples": [
            "google.com",
            "google.co.uk"
          ]
        },
        "cr": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Document countries, e.g. countryUS|countryCA.",
          "pattern": "^country[A-Z]{2}(?:\\|country[A-Z]{2})*$"
        },
        "lr": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Document languages, e.g. lang_fr|lang_de.",
          "pattern": "^lang_[a-zA-Z_-]+(?:\\|lang_[a-zA-Z_-]+)*$"
        },
        "filter": {
          "type": "integer",
          "enum": [
            0,
            1
          ],
          "description": "Similar-result filtering: 1 enables, 0 disables."
        },
        "nfpr": {
          "type": "integer",
          "enum": [
            0,
            1
          ],
          "description": "Spelling correction: 1 requests original spelling; 0 permits correction."
        },
        "radius": {
          "type": "integer",
          "minimum": 1,
          "maximum": 1000,
          "description": "Location bias radius in meters. Desktop: 1–199; mobile/tablet: 1–1000. Requires a location center."
        },
        "ludocid": {
          "type": "string",
          "minLength": 1,
          "maxLength": 20,
          "description": "Google place CID as a decimal string.",
          "pattern": "^[0-9]+$"
        },
        "lsig": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "description": "Place signature returned with local results."
        },
        "kgmid": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Google entity identifier beginning with /m/ or /g/.",
          "pattern": "^/(?:m|g)/[^\\s]+$"
        },
        "si": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Search context token returned by Google."
        },
        "ibp": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Native layout selector, e.g. htl;jobs for job listings or gwp;0,7 for a place layout.",
          "examples": [
            "htl;jobs",
            "gwp;0,7"
          ]
        },
        "uds": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Native filter token returned in search filter links."
        },
        "color_scheme": {
          "type": "string",
          "enum": [
            "light",
            "dark"
          ],
          "description": "Search page presentation theme; does not select a GoAnyAPI theme."
        },
        "lat": {
          "type": "number",
          "minimum": -90,
          "maximum": 90,
          "description": "Latitude; requires lon. Exclusive with location and uule."
        },
        "lon": {
          "type": "number",
          "minimum": -180,
          "maximum": 180,
          "description": "Longitude; requires lat."
        },
        "tbm": {
          "type": "string",
          "enum": [
            "nws",
            "vid",
            "isch",
            "lcl",
            "shop",
            "pts",
            "bks"
          ],
          "description": "Search type: nws=news, vid=videos, isch=images, lcl=local, shop=shopping, pts=patents, bks=books. Omit for web."
        },
        "as_dt": {
          "type": "string",
          "enum": [
            "i",
            "e"
          ],
          "description": "Site restriction: i includes the site; e excludes it. Used with as_sitesearch."
        },
        "as_eq": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Words to exclude."
        },
        "as_epq": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Exact phrase to match."
        },
        "as_oq": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Alternative words; any may match."
        },
        "as_qdr": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Relative date filter, e.g. d, w, m or y.",
          "pattern": "^[hdwmy][0-9]*$"
        },
        "as_sitesearch": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Site to include or exclude."
        },
        "as_filetype": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "File extension, e.g. pdf.",
          "pattern": "^[a-zA-Z0-9]+$"
        }
      },
      "oneOf": [
        {
          "type": "object",
          "not": {
            "type": "object",
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
                  "uule"
                ]
              },
              {
                "type": "object",
                "required": [
                  "lat"
                ]
              },
              {
                "type": "object",
                "required": [
                  "lon"
                ]
              }
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "location"
          ],
          "not": {
            "type": "object",
            "anyOf": [
              {
                "type": "object",
                "required": [
                  "uule"
                ]
              },
              {
                "type": "object",
                "required": [
                  "lat"
                ]
              },
              {
                "type": "object",
                "required": [
                  "lon"
                ]
              }
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "uule"
          ],
          "not": {
            "type": "object",
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
                  "lat"
                ]
              },
              {
                "type": "object",
                "required": [
                  "lon"
                ]
              },
              {
                "type": "object",
                "required": [
                  "radius"
                ]
              }
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "lat",
            "lon"
          ],
          "not": {
            "type": "object",
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
                  "uule"
                ]
              }
            ]
          }
        }
      ],
      "not": {
        "type": "object",
        "anyOf": [
          {
            "type": "object",
            "required": [
              "radius"
            ],
            "not": {
              "type": "object",
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
                    "lat"
                  ]
                }
              ]
            }
          },
          {
            "type": "object",
            "required": [
              "radius"
            ],
            "properties": {
              "radius": {
                "type": "integer",
                "minimum": 200
              }
            },
            "anyOf": [
              {
                "type": "object",
                "not": {
                  "type": "object",
                  "anyOf": [
                    {
                      "type": "object",
                      "required": [
                        "device"
                      ]
                    }
                  ]
                }
              },
              {
                "type": "object",
                "required": [
                  "device"
                ],
                "properties": {
                  "device": {
                    "type": "string",
                    "enum": [
                      "desktop"
                    ]
                  }
                }
              }
            ]
          }
        ]
      }
    },
    "mcpName": "goanyapi_google_serp_standard",
    "description": "Google SERP Standard edition. Prefer SERP Stable for more reliable, faster responses. Prefer goanyapi_google_serp_stable (/api/v1/serp-stable) instead of goanyapi_google_serp for routine searches and after a Multi-mode request fails. Rename q to query when changing to Stable; use Stable's inputSchema and response fields. Multi-mode request failures include a Stable recommendation in the message, mention lower credit usage only when current Stable pricing is lower, and provide details.recommended_endpoint, details.recommended_mcp_tool, details.docs and details.parameter_renames; details.parameter_mapping_required means other parameters must be checked against Stable's schema. Unsupported selectors require parameter adjustment. GoAnyAPI does not switch editions or retry automatically. Supports geographic targeting and advanced query controls. Valid empty results are billed; failed requests are not billed.",
    "readOnly": true,
    "docsPath": "/docs/serp-api"
  },
  {
    "id": "serp",
    "method": "GET",
    "path": "/api/v1/serp",
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "q"
      ],
      "properties": {
        "q": {
          "type": "string",
          "minLength": 1,
          "maxLength": 200,
          "description": "Search query.",
          "examples": [
            "coffee shops"
          ]
        },
        "gl": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Result country preference, e.g. us.",
          "pattern": "^[a-zA-Z]{2}$",
          "examples": [
            "us"
          ]
        },
        "hl": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Two-letter interface language, e.g. en.",
          "pattern": "^[a-zA-Z]{2}$",
          "examples": [
            "en",
            "zh-cn"
          ]
        },
        "start": {
          "type": "integer",
          "minimum": 0,
          "maximum": 990,
          "description": "Zero-based result offset; use 10 for the second page."
        },
        "device": {
          "type": "string",
          "enum": [
            "desktop",
            "mobile",
            "ios",
            "iphone",
            "ipad",
            "ios_tablet",
            "android",
            "android_tablet"
          ],
          "description": "Device presentation."
        },
        "browser": {
          "type": "string",
          "enum": [
            "chrome",
            "safari",
            "firefox"
          ],
          "description": "Browser; firefox supports desktop only."
        },
        "safe": {
          "type": "string",
          "enum": [
            "active",
            "off"
          ],
          "description": "Safe search: active enables filtering; off disables it."
        },
        "tbs": {
          "type": "string",
          "minLength": 1,
          "maxLength": 4000,
          "description": "Advanced filters, e.g. qdr:w or cdr:1,cd_min:1/1/2026,cd_max:2/1/2026."
        },
        "search_type": {
          "type": "string",
          "enum": [
            "web",
            "news",
            "videos",
            "local",
            "places",
            "shopping",
            "short_videos",
            "jobs"
          ],
          "description": "web (default): web pages; news: news; videos: videos; local: local results; places: places; shopping: products; short_videos: short videos; jobs: job listings. Only q is required. Exclusive with tbm, udm and ibp."
        },
        "tbm": {
          "type": "string",
          "enum": [
            "nws",
            "vid",
            "lcl"
          ],
          "description": "Legacy type: nws=news, vid=videos, lcl=local."
        },
        "udm": {
          "type": "string",
          "enum": [
            "1",
            "28",
            "39"
          ],
          "description": "Legacy type: 1=places, 28=shopping, 39=short videos."
        },
        "ibp": {
          "type": "string",
          "enum": [
            "htl;jobs"
          ],
          "description": "Legacy jobs selector."
        }
      },
      "oneOf": [
        {
          "type": "object",
          "not": {
            "type": "object",
            "anyOf": [
              {
                "type": "object",
                "required": [
                  "tbm"
                ]
              },
              {
                "type": "object",
                "required": [
                  "udm"
                ]
              },
              {
                "type": "object",
                "required": [
                  "ibp"
                ]
              }
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "tbm"
          ],
          "not": {
            "type": "object",
            "anyOf": [
              {
                "type": "object",
                "required": [
                  "search_type"
                ]
              },
              {
                "type": "object",
                "required": [
                  "udm"
                ]
              },
              {
                "type": "object",
                "required": [
                  "ibp"
                ]
              }
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "udm"
          ],
          "not": {
            "type": "object",
            "anyOf": [
              {
                "type": "object",
                "required": [
                  "search_type"
                ]
              },
              {
                "type": "object",
                "required": [
                  "tbm"
                ]
              },
              {
                "type": "object",
                "required": [
                  "ibp"
                ]
              }
            ]
          }
        },
        {
          "type": "object",
          "required": [
            "ibp"
          ],
          "not": {
            "type": "object",
            "anyOf": [
              {
                "type": "object",
                "required": [
                  "search_type"
                ]
              },
              {
                "type": "object",
                "required": [
                  "tbm"
                ]
              },
              {
                "type": "object",
                "required": [
                  "udm"
                ]
              }
            ]
          }
        }
      ],
      "not": {
        "type": "object",
        "required": [
          "browser",
          "device"
        ],
        "properties": {
          "browser": {
            "type": "string",
            "enum": [
              "firefox"
            ]
          },
          "device": {
            "type": "string",
            "enum": [
              "mobile",
              "ios",
              "iphone",
              "ipad",
              "ios_tablet",
              "android",
              "android_tablet"
            ]
          }
        }
      }
    },
    "mcpName": "goanyapi_google_serp",
    "description": "Google SERP Multi-mode edition. Prefer SERP Stable for more reliable, faster responses. Prefer goanyapi_google_serp_stable (/api/v1/serp-stable) instead of goanyapi_google_serp for routine searches and after a Multi-mode request fails. Rename q to query when changing to Stable; use Stable's inputSchema and response fields. Multi-mode request failures include a Stable recommendation in the message, mention lower credit usage only when current Stable pricing is lower, and provide details.recommended_endpoint, details.recommended_mcp_tool, details.docs and details.parameter_renames; details.parameter_mapping_required means other parameters must be checked against Stable's schema. Unsupported selectors require parameter adjustment. GoAnyAPI does not switch editions or retry automatically. Supports web, news, videos, local results, shopping, short videos and job listings, with browser and device controls. Valid empty results are billed; failed requests are not billed.",
    "readOnly": true,
    "docsPath": "/docs/serp-api"
  }
] as const;
