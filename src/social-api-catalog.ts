// 从主站共享公开契约生成，不含凭证或内部配置。
import type {PublicApiDefinition} from './catalog-fallback.js';
export const socialApiCatalog=[
  {
    "id": "instagram-post",
    "method": "POST",
    "path": "/api/v1/instagram/post/detail",
    "mcpName": "goanyapi_instagram_post",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "code"
      ],
      "properties": {
        "code": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "pattern": "^(?:[A-Za-z0-9_-]{1,128}|https://(?:www\\.)?instagram\\.com/(?:instagram/)?(?:p|reel|reels)/[A-Za-z0-9_-]{1,128}/?(?:[?#][^\\s]*)?)$",
          "description": "Instagram shortcode or full https://www.instagram.com/p/<code>/ or /reel/<code>/ URL. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported.",
          "examples": [
            "https://www.instagram.com/reel/DfMyWK-hQFW/"
          ]
        }
      },
      "examples": [
        {
          "code": "https://www.instagram.com/reel/DfMyWK-hQFW/"
        }
      ]
    },
    "description": "Read public Instagram post or Reel details, media, author and engagement. Instagram shortcode or full https://www.instagram.com/p/<code>/ or /reel/<code>/ URL. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported. Synchronous query. Each successful request, including empty results, is charged at the configured rate. Failures are free. Business data is in data.result; null, empty and missing business fields are preserved. No pagination. Returns up to 20 records for X trend timelines; no cursor is accepted.",
    "docsPath": "/docs/instagram-post-api"
  },
  {
    "id": "instagram-profile",
    "method": "POST",
    "path": "/api/v1/instagram/user/profile",
    "mcpName": "goanyapi_instagram_profile",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "username"
      ],
      "properties": {
        "username": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "pattern": "^(?:@?[A-Za-z0-9._]{1,30}|https://(?:www\\.)?instagram\\.com/[A-Za-z0-9._]{1,30}(?:/(?:reels|tagged))?/?(?:[?#][^\\s]*)?)$",
          "description": "Username, @username or full Instagram profile URL, optionally ending in /reels/ or /tagged/. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported.",
          "examples": [
            "https://www.instagram.com/peggyzou89/"
          ]
        }
      },
      "examples": [
        {
          "username": "https://www.instagram.com/peggyzou89/"
        }
      ]
    },
    "description": "Read public Instagram identity, biography, avatar and available follower counts. Username, @username or full Instagram profile URL, optionally ending in /reels/ or /tagged/. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported. Synchronous query. Each successful request, including empty results, is charged at the configured rate. Failures are free. Business data is in data.result; null, empty and missing business fields are preserved. No pagination. Returns up to 20 records for X trend timelines; no cursor is accepted.",
    "docsPath": "/docs/instagram-profile-api"
  },
  {
    "id": "instagram-highlights",
    "method": "POST",
    "path": "/api/v1/instagram/user/highlights",
    "mcpName": "goanyapi_instagram_highlights",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "username"
      ],
      "properties": {
        "username": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "pattern": "^(?:@?[A-Za-z0-9._]{1,30}|https://(?:www\\.)?instagram\\.com/[A-Za-z0-9._]{1,30}(?:/(?:reels|tagged))?/?(?:[?#][^\\s]*)?)$",
          "description": "Username, @username or full Instagram profile URL, optionally ending in /reels/ or /tagged/. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported.",
          "examples": [
            "https://www.instagram.com/instagram/"
          ]
        }
      },
      "examples": [
        {
          "username": "https://www.instagram.com/instagram/"
        }
      ]
    },
    "description": "List public highlight collection IDs, names and covers; Story contents are not included. Username, @username or full Instagram profile URL, optionally ending in /reels/ or /tagged/. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported. Synchronous query. Each successful request, including empty results, is charged at the configured rate. Failures are free. Business data is in data.result; null, empty and missing business fields are preserved. No pagination. Returns up to 20 records for X trend timelines; no cursor is accepted.",
    "docsPath": "/docs/instagram-highlights-api"
  },
  {
    "id": "instagram-reels",
    "method": "POST",
    "path": "/api/v1/instagram/user/reels",
    "mcpName": "goanyapi_instagram_reels",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "username"
      ],
      "properties": {
        "username": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "pattern": "^(?:@?[A-Za-z0-9._]{1,30}|https://(?:www\\.)?instagram\\.com/[A-Za-z0-9._]{1,30}(?:/(?:reels|tagged))?/?(?:[?#][^\\s]*)?)$",
          "description": "Username, @username or full Instagram profile URL, optionally ending in /reels/ or /tagged/. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported.",
          "examples": [
            "https://www.instagram.com/peggyzou89/reels/"
          ]
        },
        "cursor": {
          "type": "string",
          "maxLength": 8192,
          "description": "Omit on the first request. Reuse data.result.next_cursor only when returned; never invent an offset. Page size is fixed at 12; do not send first, count or page_size."
        }
      },
      "examples": [
        {
          "username": "https://www.instagram.com/peggyzou89/reels/"
        }
      ]
    },
    "description": "Page through public Instagram Reels with returned cursors and available engagement data. Username, @username or full Instagram profile URL, optionally ending in /reels/ or /tagged/. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported. Synchronous query. Each successful request, including empty results, is charged at the configured rate. Failures are free. Business data is in data.result; null, empty and missing business fields are preserved. Each page is a separate request. Use the returned next cursor only when hasMore/has_more is true. Never infer a cursor.",
    "docsPath": "/docs/instagram-reels-api"
  },
  {
    "id": "instagram-hashtag",
    "method": "POST",
    "path": "/api/v1/instagram/tag/posts",
    "mcpName": "goanyapi_instagram_hashtag",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "tag"
      ],
      "properties": {
        "tag": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "pattern": "^(?:#?[^\\s/#?\\\\:]+|https://(?:www\\.)?instagram\\.com/explore/tags/[^\\s/#?\\\\:]+/?(?:[?#][^\\s]*)?)$",
          "description": "Hashtag name, #tag or full https://www.instagram.com/explore/tags/<tag>/ URL. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported.",
          "examples": [
            "https://www.instagram.com/explore/tags/chinese/"
          ]
        },
        "cursor": {
          "type": "string",
          "maxLength": 8192,
          "description": "Omit on the first request. Reuse data.result.next_cursor only when returned; never invent an offset. Page size is fixed at 12; do not send first, count or page_size."
        }
      },
      "examples": [
        {
          "tag": "https://www.instagram.com/explore/tags/chinese/"
        }
      ]
    },
    "description": "Read public Instagram hashtag posts one page at a time using the returned cursor. Hashtag name, #tag or full https://www.instagram.com/explore/tags/<tag>/ URL. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported. Synchronous query. Each successful request, including empty results, is charged at the configured rate. Failures are free. Business data is in data.result; null, empty and missing business fields are preserved. Each page is a separate request. Use the returned next cursor only when hasMore/has_more is true. Never infer a cursor.",
    "docsPath": "/docs/instagram-hashtag-api"
  },
  {
    "id": "twitter-tweet",
    "method": "POST",
    "path": "/api/v1/twitter/tweet/detail",
    "mcpName": "goanyapi_twitter_tweet",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "pattern": "^(?:[0-9]{1,32}|https://(?:(?:www\\.)?(?:x|twitter)\\.com|mobile\\.twitter\\.com)/[A-Za-z0-9_]{1,15}/status/[0-9]{1,32}/?(?:[?#][^\\s]*)?)$",
          "description": "Tweet numeric ID or full https://x.com/<user>/status/<id> / https://twitter.com/<user>/status/<id> URL. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported.",
          "examples": [
            "https://x.com/ChineseWSJ/status/2121105805487305093"
          ]
        }
      },
      "examples": [
        {
          "url": "https://x.com/ChineseWSJ/status/2121105805487305093"
        }
      ]
    },
    "description": "Read a public X post by ID or URL, including author, text, engagement and attached media. Video media preserves every returned video_variants entry with URL, content_type, bitrate, width and height; HLS or unknown dimensions may be null. Tweet numeric ID or full https://x.com/<user>/status/<id> / https://twitter.com/<user>/status/<id> URL. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported. Synchronous query. Each successful request, including empty results, is charged at the configured rate. Failures are free. Business data is in data.result; null, empty and missing business fields are preserved. No pagination. Returns up to 20 records for X trend timelines; no cursor is accepted.",
    "docsPath": "/docs/twitter-tweet-api"
  },
  {
    "id": "twitter-profile",
    "method": "POST",
    "path": "/api/v1/twitter/user/profile",
    "mcpName": "goanyapi_twitter_profile",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "screenName"
      ],
      "properties": {
        "screenName": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "pattern": "^(?:@?[A-Za-z0-9_]{1,15}|https://(?:(?:www\\.)?(?:x|twitter)\\.com|mobile\\.twitter\\.com)/[A-Za-z0-9_]{1,15}/?(?:[?#][^\\s]*)?)$",
          "description": "Username, @username or full https://x.com/<username> or https://twitter.com/<username> profile URL. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported.",
          "examples": [
            "https://x.com/ChineseWSJ"
          ]
        }
      },
      "examples": [
        {
          "screenName": "https://x.com/ChineseWSJ"
        }
      ]
    },
    "description": "Read public X / Twitter profile fields and available account statistics. Username, @username or full https://x.com/<username> or https://twitter.com/<username> profile URL. URL parsing is local and adds no separate charge. Short links and other resource types are unsupported. Synchronous query. Each successful request, including empty results, is charged at the configured rate. Failures are free. Business data is in data.result; null, empty and missing business fields are preserved. No pagination. Returns up to 20 records for X trend timelines; no cursor is accepted.",
    "docsPath": "/docs/twitter-profile-api"
  },
  {
    "id": "twitter-trending",
    "method": "POST",
    "path": "/api/v1/twitter/trending",
    "mcpName": "goanyapi_twitter_trending",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "description": "Returns up to 20 records per request. No pagination. Do not send count, page_size or cursor.",
      "additionalProperties": false,
      "required": [],
      "properties": {
        "language": {
          "type": "string",
          "enum": [
            "en",
            "ja",
            "zh",
            "ko",
            "es",
            "fr",
            "de",
            "pt",
            "ru",
            "ar",
            "hi",
            "id",
            "th",
            "tr",
            "vi"
          ],
          "default": "en",
          "description": "\"en\"=English (en); \"ja\"=日本語 (ja); \"zh\"=中文 (zh); \"ko\"=한국어 (ko); \"es\"=Español (es); \"fr\"=Français (fr); \"de\"=Deutsch (de); \"pt\"=Português (pt); \"ru\"=Русский (ru); \"ar\"=العربية (ar); \"hi\"=हिन्दी (hi); \"id\"=Bahasa Indonesia (id); \"th\"=ไทย (th); \"tr\"=Türkçe (tr); \"vi\"=Tiếng Việt (vi)"
        },
        "placeId": {
          "type": "string",
          "enum": [
            "",
            "-7608764736147602991",
            "-2938771511404889033",
            "5565096121164180265",
            "4545484598816818534",
            "3477066258611901349",
            "-6967522436594057822",
            "8700865690535483778",
            "1950197124717128353",
            "3708319748991051719",
            "5162197366559151326",
            "448449062339483107",
            "7736400604048538601",
            "-4424729568631920893",
            "5639574119361710880",
            "-4154065666575264154",
            "-4343619646806415630",
            "-1744726079396219878",
            "-882767250859714689",
            "-158432913530051802",
            "-4571337146556827642",
            "3379932461505701466",
            "-9099280338087611406",
            "-5165415742961667872",
            "-3568670787064367969",
            "2820826012199272570",
            "-5319640165985647807",
            "-1556106695608941113",
            "3376413446669583689",
            "-4063967790046936818",
            "-2995833801110313328",
            "499763682993518708",
            "-260501929978120120",
            "1706136829559624331",
            "-3241657007340602969",
            "6357909739404339665",
            "-8776409192903084900",
            "2689506185291075782",
            "-5333313881682429798",
            "-8674639883747605872",
            "793650451909123257",
            "6463355099376608651",
            "930197452956643198",
            "-1432840641003940880",
            "7250935481943878042",
            "3313135070624720100",
            "-354342964243026931",
            "-2808195226817565729",
            "-9108274811673285316",
            "-6535811615842162329",
            "-625131485298729454",
            "6274701892295617822",
            "626799985901619848",
            "2668868410128916434",
            "-2478090862324094135",
            "-4607653479203584261",
            "-1378972998044664988",
            "1674261238603557541",
            "-9029363556881223240",
            "5655432603301324742",
            "4193143159185317023",
            "-7544610135368989548",
            "6763434224275225245",
            "7506474075071901506",
            "598148624890232477",
            "4567653256866191997",
            "7212154512116281289",
            "2553902795103616732",
            "302730704137459992"
          ],
          "default": "",
          "description": "\"\"=全球; \"-7608764736147602991\"=🇺🇸 United States; \"-2938771511404889033\"=🇩🇿 Algeria; \"5565096121164180265\"=🇦🇷 Argentina; \"4545484598816818534\"=🇦🇺 Australia; \"3477066258611901349\"=🇦🇹 Austria; \"-6967522436594057822\"=🇧🇩 Bangladesh; \"8700865690535483778\"=🇧🇪 Belgium; \"1950197124717128353\"=🇧🇷 Brazil; \"3708319748991051719\"=🇨🇦 Canada; \"5162197366559151326\"=🇨🇱 Chile; \"448449062339483107\"=🇨🇴 Colombia; \"7736400604048538601\"=🇨🇿 Czech Republic; \"-4424729568631920893\"=🇩🇰 Denmark; \"5639574119361710880\"=🇪🇨 Ecuador; \"-4154065666575264154\"=🇪🇬 Egypt; \"-4343619646806415630\"=🇪🇹 Ethiopia; \"-1744726079396219878\"=🇫🇮 Finland; \"-882767250859714689\"=🇫🇷 France; \"-158432913530051802\"=🇩🇪 Germany; \"-4571337146556827642\"=🇬🇭 Ghana; \"3379932461505701466\"=🇬🇷 Greece; \"-9099280338087611406\"=🇭🇺 Hungary; \"-5165415742961667872\"=🇮🇳 India; \"-3568670787064367969\"=🇮🇩 Indonesia; \"2820826012199272570\"=🇮🇷 Iran; \"-5319640165985647807\"=🇮🇶 Iraq; \"-1556106695608941113\"=🇮🇪 Ireland; \"3376413446669583689\"=🇮🇱 Israel; \"-4063967790046936818\"=🇮🇹 Italy; \"-2995833801110313328\"=🇯🇲 Jamaica; \"499763682993518708\"=🇯🇵 Japan; \"-260501929978120120\"=🇯🇴 Jordan; \"1706136829559624331\"=🇰🇪 Kenya; \"-3241657007340602969\"=🇰🇼 Kuwait; \"6357909739404339665\"=🇱🇧 Lebanon; \"-8776409192903084900\"=🇲🇾 Malaysia; \"2689506185291075782\"=🇲🇽 Mexico; \"-5333313881682429798\"=🇲🇦 Morocco; \"-8674639883747605872\"=🇳🇱 Netherlands; \"793650451909123257\"=🇳🇿 New Zealand; \"6463355099376608651\"=🇳🇬 Nigeria; \"930197452956643198\"=🇳🇴 Norway; \"-1432840641003940880\"=🇴🇲 Oman; \"7250935481943878042\"=🇵🇰 Pakistan; \"3313135070624720100\"=🇵🇪 Peru; \"-354342964243026931\"=🇵🇭 Philippines; \"-2808195226817565729\"=🇵🇱 Poland; \"-9108274811673285316\"=🇵🇹 Portugal; \"-6535811615842162329\"=🇶🇦 Qatar; \"-625131485298729454\"=🇷🇴 Romania; \"6274701892295617822\"=🇷🇺 Russia; \"626799985901619848\"=🇸🇦 Saudi Arabia; \"2668868410128916434\"=🇸🇬 Singapore; \"-2478090862324094135\"=🇿🇦 South Africa; \"-4607653479203584261\"=🇰🇷 South Korea; \"-1378972998044664988\"=🇪🇸 Spain; \"1674261238603557541\"=🇱🇰 Sri Lanka; \"-9029363556881223240\"=🇸🇪 Sweden; \"5655432603301324742\"=🇨🇭 Switzerland; \"4193143159185317023\"=🇹🇿 Tanzania; \"-7544610135368989548\"=🇹🇭 Thailand; \"6763434224275225245\"=🇹🇳 Tunisia; \"7506474075071901506\"=🇹🇷 Turkey; \"598148624890232477\"=🇺🇦 Ukraine; \"4567653256866191997\"=🇦🇪 United Arab Emirates; \"7212154512116281289\"=🇬🇧 United Kingdom; \"2553902795103616732\"=🇻🇳 Vietnam; \"302730704137459992\"=🇻🇪 Venezuela"
        },
        "topicId": {
          "type": "string",
          "minLength": 1,
          "maxLength": 2048,
          "pattern": "^(?:[0-9]+|https://(?:www\\.)?(?:x|twitter)\\.com/i/topics/[0-9]+/?(?:[?#][^\\s]*)?)$",
          "description": "Optional topic ID or full https://x.com/i/topics/<topicId> URL. Not a region ID; not an enum."
        }
      },
      "examples": [
        {
          "language": "en"
        }
      ]
    },
    "description": "Read the public trending tweet timeline by language, region and optional topic.  Synchronous query. Each successful request, including empty results, is charged at the configured rate. Failures are free. Business data is in data.result; null, empty and missing business fields are preserved. No pagination. Returns up to 20 records for X trend timelines; no cursor is accepted.",
    "docsPath": "/docs/twitter-trending-api"
  },
  {
    "id": "twitter-trending-search",
    "method": "POST",
    "path": "/api/v1/twitter/trending/search",
    "mcpName": "goanyapi_twitter_trending_search",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "description": "Returns up to 20 records per request. No pagination. Do not send count, page_size or cursor.",
      "additionalProperties": false,
      "required": [],
      "properties": {
        "tag": {
          "type": "string",
          "maxLength": 2048,
          "description": "Optional trending tag. This endpoint returns a trending search timeline, not general keyword search."
        },
        "timeFilter": {
          "type": "string",
          "maxLength": 2048,
          "description": "Optional time filter string; passed as supplied. No enum or default is specified."
        }
      },
      "examples": [
        {}
      ]
    },
    "description": "Read a trending search timeline with optional tag and timeFilter; not general keyword search.  Synchronous query. Each successful request, including empty results, is charged at the configured rate. Failures are free. Business data is in data.result; null, empty and missing business fields are preserved. No pagination. Returns up to 20 records for X trend timelines; no cursor is accepted.",
    "docsPath": "/docs/twitter-trending-search-api"
  },
  {
    "id": "twitter-trends",
    "method": "POST",
    "path": "/api/v1/twitter/trending/labels",
    "mcpName": "goanyapi_twitter_trends",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [],
      "properties": {
        "woeid": {
          "type": "string",
          "enum": [
            "1",
            "23424740",
            "23424747",
            "23424748",
            "23424750",
            "23424753",
            "23424765",
            "23424757",
            "23424768",
            "23424775",
            "23424782",
            "23424787",
            "23424796",
            "23424800",
            "23424801",
            "23424802",
            "23424819",
            "23424829",
            "23424824",
            "23424833",
            "23424834",
            "23424848",
            "23424846",
            "23424803",
            "23424852",
            "23424853",
            "23424856",
            "23424860",
            "23424863",
            "23424868",
            "23424870",
            "23424874",
            "23424873",
            "23424901",
            "23424900",
            "23424909",
            "23424916",
            "23424908",
            "23424910",
            "23424898",
            "23424922",
            "23424924",
            "23424919",
            "23424934",
            "23424923",
            "23424925",
            "23424935",
            "23424930",
            "23424936",
            "23424938",
            "23424948",
            "23424942",
            "23424950",
            "23424954",
            "23424957",
            "23424960",
            "23424969",
            "23424976",
            "23424738",
            "23424975",
            "23424977",
            "23424982",
            "23424984",
            "1253079",
            "468739",
            "466861",
            "332471",
            "466862",
            "1099805",
            "1100661",
            "1100968",
            "1101597",
            "1103816",
            "1098081",
            "1105779",
            "551801",
            "824382",
            "825978",
            "825848",
            "834463",
            "455820",
            "455821",
            "455819",
            "455828",
            "455822",
            "455830",
            "455831",
            "455867",
            "455833",
            "455823",
            "455824",
            "455825",
            "455826",
            "455834",
            "455827",
            "8775",
            "8676",
            "3534",
            "3369",
            "3444",
            "4118",
            "9807",
            "2972",
            "349860",
            "349859",
            "349861",
            "368151",
            "368148",
            "368149",
            "368150",
            "76456",
            "375733",
            "375732",
            "1522006",
            "1521894",
            "1521643",
            "580778",
            "608105",
            "609125",
            "610264",
            "612977",
            "613858",
            "615702",
            "619163",
            "627791",
            "628886",
            "638242",
            "641142",
            "667931",
            "645458",
            "645686",
            "646099",
            "648820",
            "650272",
            "656958",
            "671072",
            "676757",
            "698064",
            "1326075",
            "1330595",
            "946738",
            "963291",
            "83123",
            "2295402",
            "2295388",
            "2295420",
            "2295407",
            "2295424",
            "20070458",
            "2295414",
            "2295408",
            "2295401",
            "2295378",
            "2295386",
            "2295377",
            "2295411",
            "2282863",
            "2295381",
            "2295412",
            "2295404",
            "2295383",
            "2295387",
            "2295405",
            "2295410",
            "1047180",
            "1030077",
            "1032539",
            "1047378",
            "1046138",
            "1047908",
            "1048059",
            "1040779",
            "1048324",
            "1044316",
            "1048536",
            "560472",
            "560743",
            "560912",
            "1967449",
            "1968222",
            "1968212",
            "711080",
            "716085",
            "718345",
            "719258",
            "719846",
            "721943",
            "725003",
            "1117034",
            "1117099",
            "1117155",
            "1117227",
            "1117502",
            "1110809",
            "1117545",
            "1117605",
            "15015372",
            "1117817",
            "1117881",
            "90036018",
            "2345896",
            "15015370",
            "1118072",
            "1116753",
            "1118108",
            "1118129",
            "1118285",
            "1118370",
            "1118550",
            "1968902",
            "1528335",
            "1528488",
            "1132444",
            "1132445",
            "1132447",
            "1132449",
            "1132466",
            "2345975",
            "1130853",
            "1132481",
            "1132496",
            "1132559",
            "1132599",
            "1132567",
            "1132578",
            "1132094",
            "854823",
            "56013645",
            "1154679",
            "1154698",
            "1141268",
            "1154726",
            "1154781",
            "56013632",
            "110978",
            "111579",
            "115958",
            "116556",
            "117994",
            "118466",
            "124162",
            "124785",
            "131068",
            "133327",
            "133475",
            "116545",
            "134047",
            "134091",
            "134395",
            "116564",
            "137612",
            "138045",
            "141272",
            "144265",
            "149361",
            "149769",
            "151582",
            "727232",
            "726874",
            "733075",
            "734047",
            "2348079",
            "1387660",
            "1393672",
            "1396439",
            "1396803",
            "1398823",
            "1404447",
            "857105",
            "862592",
            "2268284",
            "2211574",
            "2211096",
            "2211177",
            "2211269",
            "2211387",
            "418440",
            "1198785",
            "1199002",
            "1167715",
            "1199079",
            "1199136",
            "1180689",
            "1199477",
            "1187115",
            "1199682",
            "1195098",
            "1199980",
            "493417",
            "502075",
            "505120",
            "514048",
            "523920",
            "526363",
            "1997422",
            "2121040",
            "2121267",
            "2018708",
            "2028717",
            "2029043",
            "2122265",
            "2122471",
            "2122541",
            "2122641",
            "2122814",
            "2123177",
            "2123260",
            "2077746",
            "2124045",
            "2124288",
            "2124298",
            "2108210",
            "2112237",
            "56120136",
            "1939574",
            "1939873",
            "1939897",
            "1937801",
            "1939753",
            "1062617",
            "1591691",
            "1580913",
            "1582504",
            "1586614",
            "1586638",
            "1587677",
            "753692",
            "754542",
            "764814",
            "766273",
            "766356",
            "768026",
            "769293",
            "774508",
            "776688",
            "779063",
            "890869",
            "906057",
            "782538",
            "783058",
            "784794",
            "1225448",
            "2343678",
            "2343732",
            "2343733",
            "2343843",
            "2343932",
            "2343980",
            "2343999",
            "2344116",
            "2344117",
            "2344174",
            "2344210",
            "2323778",
            "918981",
            "919163",
            "922137",
            "924938",
            "924943",
            "929398",
            "939628",
            "1940330",
            "1940345",
            "1940119",
            "44544",
            "12723",
            "12903",
            "13383",
            "13911",
            "13963",
            "15127",
            "17044",
            "18114",
            "19344",
            "21125",
            "25211",
            "26042",
            "26062",
            "26734",
            "44418",
            "28218",
            "28869",
            "30079",
            "30720",
            "32185",
            "32452",
            "32566",
            "34503",
            "36240",
            "36758",
            "2352824",
            "2357024",
            "2357536",
            "2358820",
            "2359991",
            "2364559",
            "2367105",
            "2378426",
            "2379574",
            "2380358",
            "2381475",
            "2383489",
            "2383660",
            "2388929",
            "2391279",
            "2391585",
            "2397816",
            "2407517",
            "2414469",
            "2418046",
            "2423945",
            "2424766",
            "2427032",
            "2428184",
            "2428344",
            "2430683",
            "2436704",
            "2441472",
            "2442047",
            "2442327",
            "2449323",
            "2449808",
            "2450022",
            "2451822",
            "2452078",
            "2457170",
            "2458410",
            "2458833",
            "2459115",
            "2460389",
            "2464592",
            "2465512",
            "2466256",
            "2471217",
            "2471390",
            "2473224",
            "2475687",
            "2477058",
            "2478307",
            "2480894",
            "2486340",
            "2487610",
            "2487796",
            "2487889",
            "2487956",
            "2488042",
            "2490383",
            "2486982",
            "2503713",
            "2503863",
            "2508428",
            "2512636",
            "2514815",
            "395273",
            "468382",
            "395269",
            "395275",
            "395270",
            "395271",
            "468384",
            "395277",
            "395272",
            "1252351",
            "1252376",
            "1236690",
            "1236594",
            "1252431"
          ],
          "default": "1",
          "description": "Region WOEID. 1=Worldwide (1); 23424740=Algeria (23424740); 23424747=Argentina (23424747); 23424748=Australia (23424748); 23424750=Austria (23424750); 23424753=Bahrain (23424753); 23424765=Belarus (23424765); 23424757=Belgium (23424757); 23424768=Brazil (23424768); 23424775=Canada (23424775); 23424782=Chile (23424782); 23424787=Colombia (23424787); 23424796=Denmark (23424796); 23424800=Dominican Republic (23424800); 23424801=Ecuador (23424801); 23424802=Egypt (23424802); 23424819=France (23424819); 23424829=Germany (23424829); 23424824=Ghana (23424824); 23424833=Greece (23424833); 23424834=Guatemala (23424834); 23424848=India (23424848); 23424846=Indonesia (23424846); 23424803=Ireland (23424803); 23424852=Israel (23424852); 23424853=Italy (23424853); 23424856=Japan (23424856); 23424860=Jordan (23424860); 23424863=Kenya (23424863); 23424868=Korea (23424868); 23424870=Kuwait (23424870); 23424874=Latvia (23424874); 23424873=Lebanon (23424873); 23424901=Malaysia (23424901); 23424900=Mexico (23424900); 23424909=Netherlands (23424909); 23424916=New Zealand (23424916); 23424908=Nigeria (23424908); 23424910=Norway (23424910); 23424898=Oman (23424898); 23424922=Pakistan (23424922); 23424924=Panama (23424924); 23424919=Peru (23424919); 23424934=Philippines (23424934); 23424923=Poland (23424923); 23424925=Portugal (23424925); 23424935=Puerto Rico (23424935); 23424930=Qatar (23424930); 23424936=Russia (23424936); 23424938=Saudi Arabia (23424938); 23424948=Singapore (23424948); 23424942=South Africa (23424942); 23424950=Spain (23424950); 23424954=Sweden (23424954); 23424957=Switzerland (23424957); 23424960=Thailand (23424960); 23424969=Turkey (23424969); 23424976=Ukraine (23424976); 23424738=United Arab Emirates (23424738); 23424975=United Kingdom (23424975); 23424977=United States (23424977); 23424982=Venezuela (23424982); 23424984=Vietnam (23424984); 1253079=Algiers, Algeria (1253079); 468739=Buenos Aires, Argentina (468739); 466861=Córdoba, Argentina (466861); 332471=Mendoza, Argentina (332471); 466862=Rosario, Argentina (466862); 1099805=Adelaide, Australia (1099805); 1100661=Brisbane, Australia (1100661); 1100968=Canberra, Australia (1100968); 1101597=Darwin, Australia (1101597); 1103816=Melbourne, Australia (1103816); 1098081=Perth, Australia (1098081); 1105779=Sydney, Australia (1105779); 551801=Vienna, Austria (551801); 824382=Brest, Belarus (824382); 825978=Gomel, Belarus (825978); 825848=Grodno, Belarus (825848); 834463=Minsk, Belarus (834463); 455820=Belém, Brazil (455820); 455821=Belo Horizonte, Brazil (455821); 455819=Brasília, Brazil (455819); 455828=Campinas, Brazil (455828); 455822=Curitiba, Brazil (455822); 455830=Fortaleza, Brazil (455830); 455831=Goiânia, Brazil (455831); 455867=Guarulhos, Brazil (455867); 455833=Manaus, Brazil (455833); 455823=Porto Alegre, Brazil (455823); 455824=Recife, Brazil (455824); 455825=Rio de Janeiro, Brazil (455825); 455826=Salvador, Brazil (455826); 455834=São Luís, Brazil (455834); 455827=São Paulo, Brazil (455827); 8775=Calgary, Canada (8775); 8676=Edmonton, Canada (8676); 3534=Montreal, Canada (3534); 3369=Ottawa, Canada (3369); 3444=Quebec, Canada (3444); 4118=Toronto, Canada (4118); 9807=Vancouver, Canada (9807); 2972=Winnipeg, Canada (2972); 349860=Concepcion, Chile (349860); 349859=Santiago, Chile (349859); 349861=Valparaiso, Chile (349861); 368151=Barranquilla, Colombia (368151); 368148=Bogotá, Colombia (368148); 368149=Cali, Colombia (368149); 368150=Medellín, Colombia (368150); 76456=Santo Domingo, Dominican Republic (76456); 375733=Guayaquil, Ecuador (375733); 375732=Quito, Ecuador (375732); 1522006=Alexandria, Egypt (1522006); 1521894=Cairo, Egypt (1521894); 1521643=Giza, Egypt (1521643); 580778=Bordeaux, France (580778); 608105=Lille, France (608105); 609125=Lyon, France (609125); 610264=Marseille, France (610264); 612977=Montpellier, France (612977); 613858=Nantes, France (613858); 615702=Paris, France (615702); 619163=Rennes, France (619163); 627791=Strasbourg, France (627791); 628886=Toulouse, France (628886); 638242=Berlin, Germany (638242); 641142=Bremen, Germany (641142); 667931=Cologne, Germany (667931); 645458=Dortmund, Germany (645458); 645686=Dresden, Germany (645686); 646099=Dusseldorf, Germany (646099); 648820=Essen, Germany (648820); 650272=Frankfurt, Germany (650272); 656958=Hamburg, Germany (656958); 671072=Leipzig, Germany (671072); 676757=Munich, Germany (676757); 698064=Stuttgart, Germany (698064); 1326075=Accra, Ghana (1326075); 1330595=Kumasi, Ghana (1330595); 946738=Athens, Greece (946738); 963291=Thessaloniki, Greece (963291); 83123=Guatemala City, Guatemala (83123); 2295402=Ahmedabad, India (2295402); 2295388=Amritsar, India (2295388); 2295420=Bangalore, India (2295420); 2295407=Bhopal, India (2295407); 2295424=Chennai, India (2295424); 20070458=Delhi, India (20070458); 2295414=Hyderabad, India (2295414); 2295408=Indore, India (2295408); 2295401=Jaipur, India (2295401); 2295378=Kanpur, India (2295378); 2295386=Kolkata, India (2295386); 2295377=Lucknow, India (2295377); 2295411=Mumbai, India (2295411); 2282863=Nagpur, India (2282863); 2295381=Patna, India (2295381); 2295412=Pune, India (2295412); 2295404=Rajkot, India (2295404); 2295383=Ranchi, India (2295383); 2295387=Srinagar, India (2295387); 2295405=Surat, India (2295405); 2295410=Thane, India (2295410); 1047180=Bandung, Indonesia (1047180); 1030077=Bekasi, Indonesia (1030077); 1032539=Depok, Indonesia (1032539); 1047378=Jakarta, Indonesia (1047378); 1046138=Makassar, Indonesia (1046138); 1047908=Medan, Indonesia (1047908); 1048059=Palembang, Indonesia (1048059); 1040779=Pekanbaru, Indonesia (1040779); 1048324=Semarang, Indonesia (1048324); 1044316=Surabaya, Indonesia (1044316); 1048536=Tangerang, Indonesia (1048536); 560472=Cork, Ireland (560472); 560743=Dublin, Ireland (560743); 560912=Galway, Ireland (560912); 1967449=Haifa, Israel (1967449); 1968222=Jerusalem, Israel (1968222); 1968212=Tel Aviv, Israel (1968212); 711080=Bologna, Italy (711080); 716085=Genoa, Italy (716085); 718345=Milan, Italy (718345); 719258=Naples, Italy (719258); 719846=Palermo, Italy (719846); 721943=Rome, Italy (721943); 725003=Turin, Italy (725003); 1117034=Chiba, Japan (1117034); 1117099=Fukuoka, Japan (1117099); 1117155=Hamamatsu, Japan (1117155); 1117227=Hiroshima, Japan (1117227); 1117502=Kawasaki, Japan (1117502); 1110809=Kitakyushu, Japan (1110809); 1117545=Kobe, Japan (1117545); 1117605=Kumamoto, Japan (1117605); 15015372=Kyoto, Japan (15015372); 1117817=Nagoya, Japan (1117817); 1117881=Niigata, Japan (1117881); 90036018=Okayama, Japan (90036018); 2345896=Okinawa, Japan (2345896); 15015370=Osaka, Japan (15015370); 1118072=Sagamihara, Japan (1118072); 1116753=Saitama, Japan (1116753); 1118108=Sapporo, Japan (1118108); 1118129=Sendai, Japan (1118129); 1118285=Takamatsu, Japan (1118285); 1118370=Tokyo, Japan (1118370); 1118550=Yokohama, Japan (1118550); 1968902=Amman, Jordan (1968902); 1528335=Mombasa, Kenya (1528335); 1528488=Nairobi, Kenya (1528488); 1132444=Ansan, Korea (1132444); 1132445=Bucheon, Korea (1132445); 1132447=Busan, Korea (1132447); 1132449=Changwon, Korea (1132449); 1132466=Daegu, Korea (1132466); 2345975=Daejeon, Korea (2345975); 1130853=Goyang, Korea (1130853); 1132481=Gwangju, Korea (1132481); 1132496=Incheon, Korea (1132496); 1132559=Seongnam, Korea (1132559); 1132599=Seoul, Korea (1132599); 1132567=Suwon, Korea (1132567); 1132578=Ulsan, Korea (1132578); 1132094=Yongin, Korea (1132094); 854823=Riga, Latvia (854823); 56013645=Hulu Langat, Malaysia (56013645); 1154679=Ipoh, Malaysia (1154679); 1154698=Johor Bahru, Malaysia (1154698); 1141268=Kajang, Malaysia (1141268); 1154726=Klang, Malaysia (1154726); 1154781=Kuala Lumpur, Malaysia (1154781); 56013632=Petaling, Malaysia (56013632); 110978=Acapulco, Mexico (110978); 111579=Aguascalientes, Mexico (111579); 115958=Chihuahua, Mexico (115958); 116556=Ciudad Juarez, Mexico (116556); 117994=Culiacán, Mexico (117994); 118466=Ecatepec de Morelos, Mexico (118466); 124162=Guadalajara, Mexico (124162); 124785=Hermosillo, Mexico (124785); 131068=León, Mexico (131068); 133327=Mérida, Mexico (133327); 133475=Mexicali, Mexico (133475); 116545=Mexico City, Mexico (116545); 134047=Monterrey, Mexico (134047); 134091=Morelia, Mexico (134091); 134395=Naucalpan de Juárez, Mexico (134395); 116564=Nezahualcóyotl, Mexico (116564); 137612=Puebla, Mexico (137612); 138045=Querétaro, Mexico (138045); 141272=Saltillo, Mexico (141272); 144265=San Luis Potosí, Mexico (144265); 149361=Tijuana, Mexico (149361); 149769=Toluca, Mexico (149769); 151582=Zapopan, Mexico (151582); 727232=Amsterdam, Netherlands (727232); 726874=Den Haag, Netherlands (726874); 733075=Rotterdam, Netherlands (733075); 734047=Utrecht, Netherlands (734047); 2348079=Auckland, New Zealand (2348079); 1387660=Benin City, Nigeria (1387660); 1393672=Ibadan, Nigeria (1393672); 1396439=Kaduna, Nigeria (1396439); 1396803=Kano, Nigeria (1396803); 1398823=Lagos, Nigeria (1398823); 1404447=Port Harcourt, Nigeria (1404447); 857105=Bergen, Norway (857105); 862592=Oslo, Norway (862592); 2268284=Muscat, Oman (2268284); 2211574=Faisalabad, Pakistan (2211574); 2211096=Karachi, Pakistan (2211096); 2211177=Lahore, Pakistan (2211177); 2211269=Multan, Pakistan (2211269); 2211387=Rawalpindi, Pakistan (2211387); 418440=Lima, Peru (418440); 1198785=Antipolo, Philippines (1198785); 1199002=Cagayan de Oro, Philippines (1199002); 1167715=Calocan, Philippines (1167715); 1199079=Cebu City, Philippines (1199079); 1199136=Davao City, Philippines (1199136); 1180689=Makati, Philippines (1180689); 1199477=Manila, Philippines (1199477); 1187115=Pasig, Philippines (1187115); 1199682=Quezon City, Philippines (1199682); 1195098=Taguig, Philippines (1195098); 1199980=Zamboanga City, Philippines (1199980); 493417=Gdańsk, Poland (493417); 502075=Kraków, Poland (502075); 505120=Lodz, Poland (505120); 514048=Poznań, Poland (514048); 523920=Warsaw, Poland (523920); 526363=Wroclaw, Poland (526363); 1997422=Chelyabinsk, Russia (1997422); 2121040=Irkutsk, Russia (2121040); 2121267=Kazan, Russia (2121267); 2018708=Khabarovsk, Russia (2018708); 2028717=Krasnodar, Russia (2028717); 2029043=Krasnoyarsk, Russia (2029043); 2122265=Moscow, Russia (2122265); 2122471=Nizhny Novgorod, Russia (2122471); 2122541=Novosibirsk, Russia (2122541); 2122641=Omsk, Russia (2122641); 2122814=Perm, Russia (2122814); 2123177=Rostov-on-Don, Russia (2123177); 2123260=Saint Petersburg, Russia (2123260); 2077746=Samara, Russia (2077746); 2124045=Ufa, Russia (2124045); 2124288=Vladivostok, Russia (2124288); 2124298=Volgograd, Russia (2124298); 2108210=Voronezh, Russia (2108210); 2112237=Yekaterinburg, Russia (2112237); 56120136=Ahsa, Saudi Arabia (56120136); 1939574=Dammam, Saudi Arabia (1939574); 1939873=Jeddah, Saudi Arabia (1939873); 1939897=Mecca, Saudi Arabia (1939897); 1937801=Medina, Saudi Arabia (1937801); 1939753=Riyadh, Saudi Arabia (1939753); 1062617=Singapore (1062617); 1591691=Cape Town, South Africa (1591691); 1580913=Durban, South Africa (1580913); 1582504=Johannesburg, South Africa (1582504); 1586614=Port Elizabeth, South Africa (1586614); 1586638=Pretoria, South Africa (1586638); 1587677=Soweto, South Africa (1587677); 753692=Barcelona, Spain (753692); 754542=Bilbao, Spain (754542); 764814=Las Palmas, Spain (764814); 766273=Madrid, Spain (766273); 766356=Malaga, Spain (766356); 768026=Murcia, Spain (768026); 769293=Palma, Spain (769293); 774508=Seville, Spain (774508); 776688=Valencia, Spain (776688); 779063=Zaragoza, Spain (779063); 890869=Gothenburg, Sweden (890869); 906057=Stockholm, Sweden (906057); 782538=Geneva, Switzerland (782538); 783058=Lausanne, Switzerland (783058); 784794=Zurich, Switzerland (784794); 1225448=Bangkok, Thailand (1225448); 2343678=Adana, Turkey (2343678); 2343732=Ankara, Turkey (2343732); 2343733=Antalya, Turkey (2343733); 2343843=Bursa, Turkey (2343843); 2343932=Diyarbakır, Turkey (2343932); 2343980=Eskişehir, Turkey (2343980); 2343999=Gaziantep, Turkey (2343999); 2344116=Istanbul, Turkey (2344116); 2344117=Izmir, Turkey (2344117); 2344174=Kayseri, Turkey (2344174); 2344210=Konya, Turkey (2344210); 2323778=Mersin, Turkey (2323778); 918981=Dnipropetrovsk, Ukraine (918981); 919163=Donetsk, Ukraine (919163); 922137=Kharkiv, Ukraine (922137); 924938=Kyiv, Ukraine (924938); 924943=Lviv, Ukraine (924943); 929398=Odesa, Ukraine (929398); 939628=Zaporozhye, Ukraine (939628); 1940330=Abu Dhabi, United Arab Emirates (1940330); 1940345=Dubai, United Arab Emirates (1940345); 1940119=Sharjah, United Arab Emirates (1940119); 44544=Belfast, United Kingdom (44544); 12723=Birmingham, United Kingdom (12723); 12903=Blackpool, United Kingdom (12903); 13383=Bournemouth, United Kingdom (13383); 13911=Brighton, United Kingdom (13911); 13963=Bristol, United Kingdom (13963); 15127=Cardiff, United Kingdom (15127); 17044=Coventry, United Kingdom (17044); 18114=Derby, United Kingdom (18114); 19344=Edinburgh, United Kingdom (19344); 21125=Glasgow, United Kingdom (21125); 25211=Hull, United Kingdom (25211); 26042=Leeds, United Kingdom (26042); 26062=Leicester, United Kingdom (26062); 26734=Liverpool, United Kingdom (26734); 44418=London, United Kingdom (44418); 28218=Manchester, United Kingdom (28218); 28869=Middlesbrough, United Kingdom (28869); 30079=Newcastle, United Kingdom (30079); 30720=Nottingham, United Kingdom (30720); 32185=Plymouth, United Kingdom (32185); 32452=Portsmouth, United Kingdom (32452); 32566=Preston, United Kingdom (32566); 34503=Sheffield, United Kingdom (34503); 36240=Stoke-on-Trent, United Kingdom (36240); 36758=Swansea, United Kingdom (36758); 2352824=Albuquerque, United States (2352824); 2357024=Atlanta, United States (2357024); 2357536=Austin, United States (2357536); 2358820=Baltimore, United States (2358820); 2359991=Baton Rouge, United States (2359991); 2364559=Birmingham, United States (2364559); 2367105=Boston, United States (2367105); 2378426=Charlotte, United States (2378426); 2379574=Chicago, United States (2379574); 2380358=Cincinnati, United States (2380358); 2381475=Cleveland, United States (2381475); 2383489=Colorado Springs, United States (2383489); 2383660=Columbus, United States (2383660); 2388929=Dallas-Ft. Worth, United States (2388929); 2391279=Denver, United States (2391279); 2391585=Detroit, United States (2391585); 2397816=El Paso, United States (2397816); 2407517=Fresno, United States (2407517); 2414469=Greensboro, United States (2414469); 2418046=Harrisburg, United States (2418046); 2423945=Honolulu, United States (2423945); 2424766=Houston, United States (2424766); 2427032=Indianapolis, United States (2427032); 2428184=Jackson, United States (2428184); 2428344=Jacksonville, United States (2428344); 2430683=Kansas City, United States (2430683); 2436704=Las Vegas, United States (2436704); 2441472=Long Beach, United States (2441472); 2442047=Los Angeles, United States (2442047); 2442327=Louisville, United States (2442327); 2449323=Memphis, United States (2449323); 2449808=Mesa, United States (2449808); 2450022=Miami, United States (2450022); 2451822=Milwaukee, United States (2451822); 2452078=Minneapolis, United States (2452078); 2457170=Nashville, United States (2457170); 2458410=New Haven, United States (2458410); 2458833=New Orleans, United States (2458833); 2459115=New York, United States (2459115); 2460389=Norfolk, United States (2460389); 2464592=Oklahoma City, United States (2464592); 2465512=Omaha, United States (2465512); 2466256=Orlando, United States (2466256); 2471217=Philadelphia, United States (2471217); 2471390=Phoenix, United States (2471390); 2473224=Pittsburgh, United States (2473224); 2475687=Portland, United States (2475687); 2477058=Providence, United States (2477058); 2478307=Raleigh, United States (2478307); 2480894=Richmond, United States (2480894); 2486340=Sacramento, United States (2486340); 2487610=Salt Lake City, United States (2487610); 2487796=San Antonio, United States (2487796); 2487889=San Diego, United States (2487889); 2487956=San Francisco, United States (2487956); 2488042=San Jose, United States (2488042); 2490383=Seattle, United States (2490383); 2486982=St. Louis, United States (2486982); 2503713=Tallahassee, United States (2503713); 2503863=Tampa, United States (2503863); 2508428=Tucson, United States (2508428); 2512636=Virginia Beach, United States (2512636); 2514815=Washington, United States (2514815); 395273=Barcelona, Venezuela (395273); 468382=Barquisimeto, Venezuela (468382); 395269=Caracas, Venezuela (395269); 395275=Ciudad Guayana, Venezuela (395275); 395270=Maracaibo, Venezuela (395270); 395271=Maracay, Venezuela (395271); 468384=Maturín, Venezuela (468384); 395277=Turmero, Venezuela (395277); 395272=Valencia, Venezuela (395272); 1252351=Can Tho, Vietnam (1252351); 1252376=Da Nang, Vietnam (1252376); 1236690=Hai Phong, Vietnam (1236690); 1236594=Hanoi, Vietnam (1236594); 1252431=Ho Chi Minh City, Vietnam (1252431). Not interchangeable with placeId."
        }
      },
      "examples": [
        {
          "woeid": "1"
        }
      ]
    },
    "description": "Read current regional trend labels, location and observation times using a WOEID.  Synchronous query. Each successful request, including empty results, is charged at the configured rate. Failures are free. Business data is in data.result; null, empty and missing business fields are preserved. No pagination. Returns up to 20 records for X trend timelines; no cursor is accepted.",
    "docsPath": "/docs/twitter-trends-api"
  },
  {
    "id": "threads-post",
    "method": "POST",
    "path": "/api/v1/threads/post-detail",
    "mcpName": "goanyapi_threads_post",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Threads post URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.threads.com/@baby_stroller5888/post/DfpSOmeHZar"
          ],
          "pattern": "^https://(?:www\\.)?threads\\.(?:com|net)/@[A-Za-z0-9._]{1,30}/post/[A-Za-z0-9_-]+/?(?:[?#][^\\s]*)?$"
        }
      },
      "examples": [
        {
          "url": "https://www.threads.com/@baby_stroller5888/post/DfpSOmeHZar"
        }
      ]
    },
    "description": "Threads Post: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-post-api"
  },
  {
    "id": "threads-post-replies",
    "method": "POST",
    "path": "/api/v1/threads/post-replies",
    "mcpName": "goanyapi_threads_post_replies",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Threads post URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.threads.com/@baby_stroller5888/post/DfpSOmeHZar"
          ],
          "pattern": "^https://(?:www\\.)?threads\\.(?:com|net)/@[A-Za-z0-9._]{1,30}/post/[A-Za-z0-9_-]+/?(?:[?#][^\\s]*)?$"
        },
        "after": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        },
        "sortOrder": {
          "type": "string",
          "enum": [
            "TOP",
            "RECENT"
          ],
          "default": "TOP",
          "description": "Reply ordering: TOP (top replies), RECENT (recent replies).",
          "maxLength": 2048
        }
      },
      "examples": [
        {
          "url": "https://www.threads.com/@baby_stroller5888/post/DfpSOmeHZar",
          "sortOrder": "TOP"
        }
      ]
    },
    "description": "Threads Post Replies: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-post-replies-api"
  },
  {
    "id": "threads-post-thread",
    "method": "POST",
    "path": "/api/v1/threads/post-thread",
    "mcpName": "goanyapi_threads_post_thread",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Threads post URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.threads.com/@doris___me_/post/DfpVsWoEh6c"
          ],
          "pattern": "^https://(?:www\\.)?threads\\.(?:com|net)/@[A-Za-z0-9._]{1,30}/post/[A-Za-z0-9_-]+/?(?:[?#][^\\s]*)?$"
        }
      },
      "examples": [
        {
          "url": "https://www.threads.com/@doris___me_/post/DfpVsWoEh6c"
        }
      ]
    },
    "description": "Threads Post Thread: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-post-thread-api"
  },
  {
    "id": "threads-profile",
    "method": "POST",
    "path": "/api/v1/threads/user-profile",
    "mcpName": "goanyapi_threads_profile",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "username"
      ],
      "properties": {
        "username": {
          "type": "string",
          "description": "Threads username, @username or full profile URL. Prefer a URL. No prerequisite request or separate charge is required.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.threads.com/@baby_stroller5888"
          ],
          "pattern": "^(?:@?[A-Za-z0-9._]{1,30}|https://(?:www\\.)?threads\\.(?:com|net)/@[A-Za-z0-9._]{1,30}/?(?:[?#][^\\s]*)?)$"
        }
      },
      "examples": [
        {
          "username": "https://www.threads.com/@baby_stroller5888"
        }
      ]
    },
    "description": "Threads Profile: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-profile-api"
  },
  {
    "id": "threads-user-posts",
    "method": "POST",
    "path": "/api/v1/threads/user-posts",
    "mcpName": "goanyapi_threads_user_posts",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "username"
      ],
      "properties": {
        "username": {
          "type": "string",
          "description": "Threads username, @username or full profile URL. Prefer a URL. No prerequisite request or separate charge is required.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.threads.com/@baby_stroller5888"
          ],
          "pattern": "^(?:@?[A-Za-z0-9._]{1,30}|https://(?:www\\.)?threads\\.(?:com|net)/@[A-Za-z0-9._]{1,30}/?(?:[?#][^\\s]*)?)$"
        },
        "after": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        }
      },
      "examples": [
        {
          "username": "https://www.threads.com/@baby_stroller5888"
        }
      ]
    },
    "description": "Threads User Posts: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-user-posts-api"
  },
  {
    "id": "threads-user-replies",
    "method": "POST",
    "path": "/api/v1/threads/user-replies",
    "mcpName": "goanyapi_threads_user_replies",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "username"
      ],
      "properties": {
        "username": {
          "type": "string",
          "description": "Threads username, @username or full profile URL. Prefer a URL. No prerequisite request or separate charge is required.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.threads.com/@baby_stroller5888"
          ],
          "pattern": "^(?:@?[A-Za-z0-9._]{1,30}|https://(?:www\\.)?threads\\.(?:com|net)/@[A-Za-z0-9._]{1,30}/?(?:[?#][^\\s]*)?)$"
        },
        "after": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        }
      },
      "examples": [
        {
          "username": "https://www.threads.com/@baby_stroller5888"
        }
      ]
    },
    "description": "Threads User Replies: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-user-replies-api"
  },
  {
    "id": "threads-user-media",
    "method": "POST",
    "path": "/api/v1/threads/user-media",
    "mcpName": "goanyapi_threads_user_media",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "username"
      ],
      "properties": {
        "username": {
          "type": "string",
          "description": "Threads username, @username or full profile URL. Prefer a URL. No prerequisite request or separate charge is required.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.threads.com/@baby_stroller5888"
          ],
          "pattern": "^(?:@?[A-Za-z0-9._]{1,30}|https://(?:www\\.)?threads\\.(?:com|net)/@[A-Za-z0-9._]{1,30}/?(?:[?#][^\\s]*)?)$"
        },
        "after": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        }
      },
      "examples": [
        {
          "username": "https://www.threads.com/@baby_stroller5888"
        }
      ]
    },
    "description": "Threads User Media: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-user-media-api"
  },
  {
    "id": "threads-user-reposts",
    "method": "POST",
    "path": "/api/v1/threads/user-reposts",
    "mcpName": "goanyapi_threads_user_reposts",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "username"
      ],
      "properties": {
        "username": {
          "type": "string",
          "description": "Threads username, @username or full profile URL. Prefer a URL. No prerequisite request or separate charge is required.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.threads.com/@mosseri"
          ],
          "pattern": "^(?:@?[A-Za-z0-9._]{1,30}|https://(?:www\\.)?threads\\.(?:com|net)/@[A-Za-z0-9._]{1,30}/?(?:[?#][^\\s]*)?)$"
        },
        "after": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        }
      },
      "examples": [
        {
          "username": "https://www.threads.com/@mosseri"
        }
      ]
    },
    "description": "Threads User Reposts: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-user-reposts-api"
  },
  {
    "id": "threads-search-posts",
    "method": "POST",
    "path": "/api/v1/threads/search-posts",
    "mcpName": "goanyapi_threads_search_posts",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "query"
      ],
      "properties": {
        "query": {
          "type": "string",
          "description": "Search keywords.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "bitcoin"
          ]
        },
        "recent": {
          "type": "integer",
          "enum": [
            0,
            1
          ],
          "default": 0,
          "description": "Post search ordering: 0 (relevance), 1 (most recent)."
        }
      },
      "examples": [
        {
          "query": "bitcoin",
          "recent": 0
        }
      ]
    },
    "description": "Threads Post Search: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-search-posts-api"
  },
  {
    "id": "threads-search-users",
    "method": "POST",
    "path": "/api/v1/threads/search-users",
    "mcpName": "goanyapi_threads_search_users",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "query"
      ],
      "properties": {
        "query": {
          "type": "string",
          "description": "Search keywords.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "bitcoin"
          ]
        }
      },
      "examples": [
        {
          "query": "bitcoin"
        }
      ]
    },
    "description": "Threads User Search: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-search-users-api"
  },
  {
    "id": "threads-related-posts",
    "method": "POST",
    "path": "/api/v1/threads/related-posts",
    "mcpName": "goanyapi_threads_related_posts",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Threads post URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.threads.com/@baby_stroller5888/post/DfpSOmeHZar"
          ],
          "pattern": "^https://(?:www\\.)?threads\\.(?:com|net)/@[A-Za-z0-9._]{1,30}/post/[A-Za-z0-9_-]+/?(?:[?#][^\\s]*)?$"
        }
      },
      "examples": [
        {
          "url": "https://www.threads.com/@baby_stroller5888/post/DfpSOmeHZar"
        }
      ]
    },
    "description": "Threads Related Posts: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-related-posts-api"
  },
  {
    "id": "threads-validate-tag",
    "method": "POST",
    "path": "/api/v1/threads/validate-tag",
    "mcpName": "goanyapi_threads_validate_tag",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "tag_name"
      ],
      "properties": {
        "tag_name": {
          "type": "string",
          "description": "Topic name.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "bitcoin"
          ]
        }
      },
      "examples": [
        {
          "tag_name": "bitcoin"
        }
      ]
    },
    "description": "Threads Tag Validation: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-validate-tag-api"
  },
  {
    "id": "threads-search-tags",
    "method": "POST",
    "path": "/api/v1/threads/search-tags",
    "mcpName": "goanyapi_threads_search_tags",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "tag_name"
      ],
      "properties": {
        "tag_name": {
          "type": "string",
          "description": "Topic name.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "bitcoin"
          ]
        }
      },
      "examples": [
        {
          "tag_name": "bitcoin"
        }
      ]
    },
    "description": "Threads Tag Search: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/threads-search-tags-api"
  },
  {
    "id": "reddit-home-feed",
    "method": "POST",
    "path": "/api/v1/reddit/home/feed",
    "mcpName": "goanyapi_reddit_home_feed",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [],
      "properties": {
        "sort": {
          "type": "string",
          "enum": [
            "BEST",
            "NEW",
            "TOP",
            "HOT",
            "RISING"
          ],
          "default": "BEST",
          "description": "Result ordering. Values are case-sensitive.",
          "maxLength": 2048
        },
        "cursor": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        },
        "feedLength": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1000000,
          "default": 0,
          "description": "Cumulative number of records returned on earlier pages, initially 0. This is not a page size."
        }
      },
      "examples": [
        {
          "sort": "BEST",
          "feedLength": 0
        }
      ]
    },
    "description": "Reddit Home Feed: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-home-feed-api"
  },
  {
    "id": "reddit-popular-feed",
    "method": "POST",
    "path": "/api/v1/reddit/popular/feed",
    "mcpName": "goanyapi_reddit_popular_feed",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [],
      "properties": {
        "sort": {
          "type": "string",
          "enum": [
            "BEST",
            "NEW",
            "TOP",
            "HOT",
            "RISING"
          ],
          "default": "BEST",
          "description": "Result ordering. Values are case-sensitive.",
          "maxLength": 2048
        },
        "cursor": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        },
        "feedLength": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1000000,
          "default": 0,
          "description": "Cumulative number of records returned on earlier pages, initially 0. This is not a page size."
        }
      },
      "examples": [
        {
          "sort": "BEST",
          "feedLength": 0
        }
      ]
    },
    "description": "Reddit Popular Feed: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-popular-feed-api"
  },
  {
    "id": "reddit-subreddit-feed",
    "method": "POST",
    "path": "/api/v1/reddit/subreddit/feed",
    "mcpName": "goanyapi_reddit_subreddit_feed",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit subreddit URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/r/wallstreetbets/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        },
        "sort": {
          "type": "string",
          "enum": [
            "best",
            "top",
            "new",
            "hot",
            "controversial"
          ],
          "default": "best",
          "description": "Result ordering. Values are case-sensitive.",
          "maxLength": 2048
        },
        "time": {
          "type": "string",
          "enum": [
            "HOUR",
            "DAY",
            "WEEK",
            "ALL"
          ],
          "default": "DAY",
          "description": "Time window. Values are case-sensitive.",
          "maxLength": 2048
        },
        "cursor": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        },
        "feedLength": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1000000,
          "default": 0,
          "description": "Cumulative number of records returned on earlier pages, initially 0. This is not a page size."
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/r/wallstreetbets/",
          "sort": "best",
          "time": "DAY",
          "feedLength": 0
        }
      ]
    },
    "description": "Reddit Subreddit Feed: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-subreddit-feed-api"
  },
  {
    "id": "reddit-search",
    "method": "POST",
    "path": "/api/v1/reddit/search",
    "mcpName": "goanyapi_reddit_search",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "query"
      ],
      "properties": {
        "query": {
          "type": "string",
          "description": "Search keywords.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "united airlines"
          ]
        },
        "sort": {
          "type": "string",
          "enum": [
            "relevance",
            "hot",
            "top",
            "new",
            "comments"
          ],
          "default": "relevance",
          "description": "Result ordering. Values are case-sensitive.",
          "maxLength": 2048
        },
        "cursor": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        },
        "feedLength": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1000000,
          "default": 0,
          "description": "Cumulative number of records returned on earlier pages, initially 0. This is not a page size."
        }
      },
      "examples": [
        {
          "query": "united airlines",
          "sort": "relevance",
          "feedLength": 0
        }
      ]
    },
    "description": "Reddit Search: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-search-api"
  },
  {
    "id": "reddit-post",
    "method": "POST",
    "path": "/api/v1/reddit/post/detail",
    "mcpName": "goanyapi_reddit_post",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit post URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/r/wallstreetbets/comments/1xy3kap/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/r/wallstreetbets/comments/1xy3kap/"
        }
      ]
    },
    "description": "Reddit Post: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-post-api"
  },
  {
    "id": "reddit-post-comments",
    "method": "POST",
    "path": "/api/v1/reddit/post/comments",
    "mcpName": "goanyapi_reddit_post_comments",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit post URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/r/wallstreetbets/comments/1xy3kap/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        },
        "sort": {
          "type": "string",
          "enum": [
            "CONFIDENCE",
            "TOP",
            "NEW",
            "CONTROVERSIAL",
            "OLD",
            "QA"
          ],
          "default": "CONFIDENCE",
          "description": "Result ordering. Values are case-sensitive.",
          "maxLength": 2048
        },
        "cursor": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/r/wallstreetbets/comments/1xy3kap/",
          "sort": "CONFIDENCE"
        }
      ]
    },
    "description": "Reddit Post Comments: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-post-comments-api"
  },
  {
    "id": "reddit-comment-replies",
    "method": "POST",
    "path": "/api/v1/reddit/post/comment/replies",
    "mcpName": "goanyapi_reddit_comment_replies",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url",
        "commentId"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit post URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/r/wallstreetbets/comments/1xy3kap/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        },
        "commentId": {
          "type": "string",
          "description": "Comment ID (bare or t1_ prefixed). First call goanyapi_reddit_post_comments with {url: the same post URL}, or POST /api/v1/reddit/post/comments with Bearer authentication and JSON body {url}. Read data.result.comments[].id and pass one as commentId. The prerequisite query is separately billed at its configured price; empty results and failures are free.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "t1_19sqti9kye3cw"
          ],
          "pattern": "^(?:t1_)?[A-Za-z0-9]+$"
        },
        "sort": {
          "type": "string",
          "enum": [
            "CONFIDENCE",
            "TOP",
            "NEW",
            "CONTROVERSIAL",
            "OLD",
            "QA"
          ],
          "default": "CONFIDENCE",
          "description": "Result ordering. Values are case-sensitive.",
          "maxLength": 2048
        },
        "cursor": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/r/wallstreetbets/comments/1xy3kap/",
          "commentId": "t1_19sqti9kye3cw",
          "sort": "CONFIDENCE"
        }
      ]
    },
    "description": "Reddit Comment Replies: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-comment-replies-api"
  },
  {
    "id": "reddit-related-posts",
    "method": "POST",
    "path": "/api/v1/reddit/post/related",
    "mcpName": "goanyapi_reddit_related_posts",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit post URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/r/wallstreetbets/comments/1xy3kap/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/r/wallstreetbets/comments/1xy3kap/"
        }
      ]
    },
    "description": "Reddit Related Posts: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-related-posts-api"
  },
  {
    "id": "reddit-subreddit",
    "method": "POST",
    "path": "/api/v1/reddit/subreddit/info",
    "mcpName": "goanyapi_reddit_subreddit",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit subreddit URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/r/wallstreetbets/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/r/wallstreetbets/"
        }
      ]
    },
    "description": "Reddit Subreddit: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-subreddit-api"
  },
  {
    "id": "reddit-profile",
    "method": "POST",
    "path": "/api/v1/reddit/user/profile",
    "mcpName": "goanyapi_reddit_profile",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit user profile URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/user/spez/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/user/spez/"
        }
      ]
    },
    "description": "Reddit Profile: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-profile-api"
  },
  {
    "id": "reddit-user-posts",
    "method": "POST",
    "path": "/api/v1/reddit/user/posts",
    "mcpName": "goanyapi_reddit_user_posts",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit user profile URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/user/spez/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        },
        "sort": {
          "type": "string",
          "enum": [
            "new"
          ],
          "default": "new",
          "description": "Result ordering. Values are case-sensitive.",
          "maxLength": 2048
        },
        "cursor": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        },
        "feedLength": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1000000,
          "default": 0,
          "description": "Cumulative number of records returned on earlier pages, initially 0. This is not a page size."
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/user/spez/",
          "sort": "new",
          "feedLength": 0
        }
      ]
    },
    "description": "Reddit User Posts: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-user-posts-api"
  },
  {
    "id": "reddit-user-overview",
    "method": "POST",
    "path": "/api/v1/reddit/user/overview",
    "mcpName": "goanyapi_reddit_user_overview",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit user profile URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/user/spez/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        },
        "sort": {
          "type": "string",
          "enum": [
            "new"
          ],
          "default": "new",
          "description": "Result ordering. Values are case-sensitive.",
          "maxLength": 2048
        },
        "cursor": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        },
        "feedLength": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1000000,
          "default": 0,
          "description": "Cumulative number of records returned on earlier pages, initially 0. This is not a page size."
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/user/spez/",
          "sort": "new",
          "feedLength": 0
        }
      ]
    },
    "description": "Reddit User Overview: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-user-overview-api"
  },
  {
    "id": "reddit-user-comments",
    "method": "POST",
    "path": "/api/v1/reddit/user/comments",
    "mcpName": "goanyapi_reddit_user_comments",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit user profile URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/user/spez/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        },
        "sort": {
          "type": "string",
          "enum": [
            "new"
          ],
          "default": "new",
          "description": "Result ordering. Values are case-sensitive.",
          "maxLength": 2048
        },
        "cursor": {
          "type": "string",
          "description": "Omit on the first request. Use data.result.next_cursor from the previous response unchanged; never invent a cursor.",
          "maxLength": 16384
        },
        "feedLength": {
          "type": "integer",
          "minimum": 0,
          "maximum": 1000000,
          "default": 0,
          "description": "Cumulative number of records returned on earlier pages, initially 0. This is not a page size."
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/user/spez/",
          "sort": "new",
          "feedLength": 0
        }
      ]
    },
    "description": "Reddit User Comments: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-user-comments-api"
  },
  {
    "id": "reddit-user-verification",
    "method": "POST",
    "path": "/api/v1/reddit/user/verification",
    "mcpName": "goanyapi_reddit_user_verification",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "additionalProperties": false,
      "required": [
        "url"
      ],
      "properties": {
        "url": {
          "type": "string",
          "description": "Full Reddit user profile URL. Use a complete resource URL as the primary input. Only https resource links on the documented platform are accepted; unrelated hosts and resource types are rejected.",
          "maxLength": 2048,
          "minLength": 1,
          "examples": [
            "https://www.reddit.com/user/spez/"
          ],
          "pattern": "^https://(?:(?:(?:www|old|new)\\.)?reddit\\.com|redd\\.it)/[^\\s]+$"
        }
      },
      "examples": [
        {
          "url": "https://www.reddit.com/user/spez/"
        }
      ]
    },
    "description": "Reddit User Verification: query public data. Empty results and failed requests are free. Page size uses the service default and cannot be supplied. Use the documented URL, username or keyword. No first, count or limit parameter is accepted. No prerequisite request or separate charge is required. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/reddit-user-verification-api"
  },
  {
    "id": "youtube-video",
    "method": "POST",
    "path": "/api/v1/youtube/video/detail",
    "mcpName": "goanyapi_youtube_video",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube HTTPS resource URL (preferred) or resource ID. Channel URLs accept @handle, /channel/, /c/, /user/; video URLs accept watch?v=, youtu.be/, /shorts/, /embed/, /live/, /v/.",
          "minLength": 1,
          "pattern": "^(?:[A-Za-z0-9_-]{11}|https://(?:(?:www\\.|m\\.)?youtube\\.com/(?:watch\\?[^\\s]*v=[A-Za-z0-9_-]{11}[^\\s]*|(?:shorts|embed|live|v)/[A-Za-z0-9_-]{11}/?(?:[?#][^\\s]*)?)|(?:www\\.)?youtu\\.be/[A-Za-z0-9_-]{11}/?(?:[?#][^\\s]*)?))$"
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/watch?v=Y334D183ofE"
        }
      ]
    },
    "description": "YouTube Video Details. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-video-api"
  },
  {
    "id": "youtube-video-media",
    "method": "POST",
    "path": "/api/v1/youtube/video/media",
    "mcpName": "goanyapi_youtube_video_media",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube HTTPS resource URL (preferred) or resource ID. Channel URLs accept @handle, /channel/, /c/, /user/; video URLs accept watch?v=, youtu.be/, /shorts/, /embed/, /live/, /v/.",
          "minLength": 1,
          "pattern": "^(?:[A-Za-z0-9_-]{11}|https://(?:(?:www\\.|m\\.)?youtube\\.com/(?:watch\\?[^\\s]*v=[A-Za-z0-9_-]{11}[^\\s]*|(?:shorts|embed|live|v)/[A-Za-z0-9_-]{11}/?(?:[?#][^\\s]*)?)|(?:www\\.)?youtu\\.be/[A-Za-z0-9_-]{11}/?(?:[?#][^\\s]*)?))$"
        },
        "hd": {
          "type": "string",
          "enum": [
            "true",
            "false"
          ],
          "default": "false",
          "description": "HD mode: string true returns the resolutions actually available for this video, highest first, with MP4 URLs expiring in about 3 hours. String false (default) returns a 360p MP4 URL expiring in about 6 hours. Both modes include captions. HD has a separately configured total price, not an additional charge. HD availability varies by video."
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/watch?v=Y334D183ofE"
        },
        {
          "url": "https://www.youtube.com/watch?v=Y334D183ofE",
          "hd": "true"
        }
      ]
    },
    "description": "Get video media URLs and captions. Optional hd accepts the strings true or false (default false). Standard returns 360p MP4; HD returns available resolutions, highest first, with a separately configured total price. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-video-media-api"
  },
  {
    "id": "youtube-related-videos",
    "method": "POST",
    "path": "/api/v1/youtube/video/related",
    "mcpName": "goanyapi_youtube_related_videos",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube HTTPS resource URL (preferred) or resource ID. Channel URLs accept @handle, /channel/, /c/, /user/; video URLs accept watch?v=, youtu.be/, /shorts/, /embed/, /live/, /v/.",
          "minLength": 1,
          "pattern": "^(?:[A-Za-z0-9_-]{11}|https://(?:(?:www\\.|m\\.)?youtube\\.com/(?:watch\\?[^\\s]*v=[A-Za-z0-9_-]{11}[^\\s]*|(?:shorts|embed|live|v)/[A-Za-z0-9_-]{11}/?(?:[?#][^\\s]*)?)|(?:www\\.)?youtu\\.be/[A-Za-z0-9_-]{11}/?(?:[?#][^\\s]*)?))$"
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Opaque cursor. For replies, obtain data.result.items[].reply_cursor from the corresponding comments endpoint; for subsequent reply pages use data.result.next_cursor. For other lists use data.result.next_cursor. Never invent a cursor."
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/watch?v=Y334D183ofE"
        }
      ]
    },
    "description": "YouTube Related Videos. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-related-videos-api"
  },
  {
    "id": "youtube-video-search",
    "method": "POST",
    "path": "/api/v1/youtube/search/videos",
    "mcpName": "goanyapi_youtube_video_search",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "Search keywords.",
          "minLength": 1
        },
        "language": {
          "type": "string",
          "default": "en",
          "pattern": "^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$",
          "description": "Result language; defaults to en."
        },
        "country": {
          "type": "string",
          "default": "US",
          "pattern": "^[A-Z]{2}$",
          "description": "Two-letter uppercase country code; defaults to US."
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Opaque cursor. For replies, obtain data.result.items[].reply_cursor from the corresponding comments endpoint; for subsequent reply pages use data.result.next_cursor. For other lists use data.result.next_cursor. Never invent a cursor."
        },
        "order": {
          "type": "string",
          "enum": [
            "relevance",
            "date",
            "views",
            "rating"
          ],
          "default": "relevance",
          "description": "Search ordering."
        }
      },
      "required": [
        "query"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "query": "NVIDIA"
        }
      ]
    },
    "description": "YouTube Video Search. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-video-search-api"
  },
  {
    "id": "youtube-channel-search",
    "method": "POST",
    "path": "/api/v1/youtube/search/channels",
    "mcpName": "goanyapi_youtube_channel_search",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "Search keywords.",
          "minLength": 1
        },
        "language": {
          "type": "string",
          "default": "en",
          "pattern": "^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$",
          "description": "Result language; defaults to en."
        },
        "country": {
          "type": "string",
          "default": "US",
          "pattern": "^[A-Z]{2}$",
          "description": "Two-letter uppercase country code; defaults to US."
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Opaque cursor. For replies, obtain data.result.items[].reply_cursor from the corresponding comments endpoint; for subsequent reply pages use data.result.next_cursor. For other lists use data.result.next_cursor. Never invent a cursor."
        },
        "order": {
          "type": "string",
          "enum": [
            "relevance",
            "date",
            "views",
            "rating"
          ],
          "default": "relevance",
          "description": "Search ordering."
        }
      },
      "required": [
        "query"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "query": "NVIDIA"
        }
      ]
    },
    "description": "YouTube Channel Search. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-search-api"
  },
  {
    "id": "youtube-search",
    "method": "POST",
    "path": "/api/v1/youtube/search/general",
    "mcpName": "goanyapi_youtube_search",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "Search keywords.",
          "minLength": 1
        },
        "language": {
          "type": "string",
          "default": "en",
          "pattern": "^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$",
          "description": "Result language; defaults to en."
        },
        "country": {
          "type": "string",
          "default": "US",
          "pattern": "^[A-Z]{2}$",
          "description": "Two-letter uppercase country code; defaults to US."
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Opaque cursor. For replies, obtain data.result.items[].reply_cursor from the corresponding comments endpoint; for subsequent reply pages use data.result.next_cursor. For other lists use data.result.next_cursor. Never invent a cursor."
        },
        "order": {
          "type": "string",
          "enum": [
            "relevance",
            "date",
            "views",
            "rating"
          ],
          "default": "relevance",
          "description": "Search ordering."
        }
      },
      "required": [
        "query"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "query": "NVIDIA"
        }
      ]
    },
    "description": "YouTube Search. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-search-api"
  },
  {
    "id": "youtube-shorts-search",
    "method": "POST",
    "path": "/api/v1/youtube/search/shorts",
    "mcpName": "goanyapi_youtube_shorts_search",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "Search keywords.",
          "minLength": 1
        },
        "language": {
          "type": "string",
          "default": "en",
          "pattern": "^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$",
          "description": "Result language; defaults to en."
        },
        "country": {
          "type": "string",
          "default": "US",
          "pattern": "^[A-Z]{2}$",
          "description": "Two-letter uppercase country code; defaults to US."
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Opaque cursor. For replies, obtain data.result.items[].reply_cursor from the corresponding comments endpoint; for subsequent reply pages use data.result.next_cursor. For other lists use data.result.next_cursor. Never invent a cursor."
        },
        "order": {
          "type": "string",
          "enum": [
            "relevance",
            "date",
            "views",
            "rating"
          ],
          "default": "relevance",
          "description": "Search ordering."
        }
      },
      "required": [
        "query"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "query": "NVIDIA"
        }
      ]
    },
    "description": "YouTube Shorts Search. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-shorts-search-api"
  },
  {
    "id": "youtube-search-suggestions",
    "method": "POST",
    "path": "/api/v1/youtube/search/suggestions",
    "mcpName": "goanyapi_youtube_search_suggestions",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "Search keywords.",
          "minLength": 1
        },
        "language": {
          "type": "string",
          "default": "en",
          "pattern": "^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$",
          "description": "Result language; defaults to en."
        },
        "country": {
          "type": "string",
          "default": "US",
          "pattern": "^[A-Z]{2}$",
          "description": "Two-letter uppercase country code; defaults to US."
        }
      },
      "required": [
        "query"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "query": "NVIDIA"
        }
      ]
    },
    "description": "YouTube Search Suggestions. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-search-suggestions-api"
  },
  {
    "id": "youtube-channel-id-by-name",
    "method": "POST",
    "path": "/api/v1/youtube/channel/id/by-name",
    "mcpName": "goanyapi_youtube_channel_id_by_name",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "query": {
          "type": "string",
          "description": "Search keywords.",
          "minLength": 1
        },
        "language": {
          "type": "string",
          "default": "en",
          "pattern": "^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8})*$",
          "description": "Result language; defaults to en."
        },
        "country": {
          "type": "string",
          "default": "US",
          "pattern": "^[A-Z]{2}$",
          "description": "Two-letter uppercase country code; defaults to US."
        }
      },
      "required": [
        "query"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "query": "NVIDIA"
        }
      ]
    },
    "description": "YouTube Channel ID by Name. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-id-by-name-api"
  },
  {
    "id": "youtube-channel-id-by-url",
    "method": "POST",
    "path": "/api/v1/youtube/channel/id/by-url",
    "mcpName": "goanyapi_youtube_channel_id_by_url",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "YouTube Channel ID by URL. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-id-by-url-api"
  },
  {
    "id": "youtube-channel-url",
    "method": "POST",
    "path": "/api/v1/youtube/channel/url",
    "mcpName": "goanyapi_youtube_channel_url",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "YouTube Channel URL. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-url-api"
  },
  {
    "id": "youtube-channel",
    "method": "POST",
    "path": "/api/v1/youtube/channel/info",
    "mcpName": "goanyapi_youtube_channel",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "YouTube Channel. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-api"
  },
  {
    "id": "youtube-channel-description",
    "method": "POST",
    "path": "/api/v1/youtube/channel/description",
    "mcpName": "goanyapi_youtube_channel_description",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "YouTube Channel Description. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-description-api"
  },
  {
    "id": "youtube-channel-videos",
    "method": "POST",
    "path": "/api/v1/youtube/channel/videos",
    "mcpName": "goanyapi_youtube_channel_videos",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Omit initially. Pass data.result.next_cursor from this same endpoint unchanged. Stop when hasMore is false or the cursor is missing, empty or unchanged."
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "YouTube Channel Videos. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-videos-api"
  },
  {
    "id": "youtube-channel-shorts",
    "method": "POST",
    "path": "/api/v1/youtube/channel/shorts",
    "mcpName": "goanyapi_youtube_channel_shorts",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Omit initially. Pass data.result.next_cursor from this same endpoint unchanged. Stop when hasMore is false or the cursor is missing, empty or unchanged."
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "YouTube Channel Shorts. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-shorts-api"
  },
  {
    "id": "youtube-channel-posts",
    "method": "POST",
    "path": "/api/v1/youtube/channel/posts",
    "mcpName": "goanyapi_youtube_channel_posts",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Omit initially. Pass data.result.next_cursor from this same endpoint unchanged. Stop when hasMore is false or the cursor is missing, empty or unchanged."
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "YouTube Channel Posts. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-posts-api"
  },
  {
    "id": "youtube-channel-home",
    "method": "POST",
    "path": "/api/v1/youtube/channel/home",
    "mcpName": "goanyapi_youtube_channel_home",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Omit initially. Pass data.result.next_cursor from this same endpoint unchanged. Stop when hasMore is false or the cursor is missing, empty or unchanged."
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "Query public YouTube channel home. Returns items, next_cursor and hasMore. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-home-api"
  },
  {
    "id": "youtube-channel-live",
    "method": "POST",
    "path": "/api/v1/youtube/channel/live",
    "mcpName": "goanyapi_youtube_channel_live",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Omit initially. Pass data.result.next_cursor from this same endpoint unchanged. Stop when hasMore is false or the cursor is missing, empty or unchanged."
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "Query public YouTube channel live. Returns items, next_cursor and hasMore. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-live-api"
  },
  {
    "id": "youtube-channel-courses",
    "method": "POST",
    "path": "/api/v1/youtube/channel/courses",
    "mcpName": "goanyapi_youtube_channel_courses",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Omit initially. Pass data.result.next_cursor from this same endpoint unchanged. Stop when hasMore is false or the cursor is missing, empty or unchanged."
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "Query public YouTube channel courses. Returns items, next_cursor and hasMore. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-courses-api"
  },
  {
    "id": "youtube-channel-playlists",
    "method": "POST",
    "path": "/api/v1/youtube/channel/playlists",
    "mcpName": "goanyapi_youtube_channel_playlists",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Omit initially. Pass data.result.next_cursor from this same endpoint unchanged. Stop when hasMore is false or the cursor is missing, empty or unchanged."
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@daojie"
        }
      ]
    },
    "description": "Query public YouTube channel playlists. Returns items, next_cursor and hasMore. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-channel-playlists-api"
  },
  {
    "id": "youtube-post",
    "method": "POST",
    "path": "/api/v1/youtube/post/detail",
    "mcpName": "goanyapi_youtube_post",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        },
        "post_url": {
          "type": "string",
          "description": "YouTube HTTPS /post/<postId> URL or post ID. Obtain from the channel posts endpoint using the same channel URL. Each nonempty successful request is billed separately. Obtain via goanyapi_youtube_channel_posts (POST /api/v1/youtube/channel/posts), with Bearer authentication and JSON body inputs url. Read data.result.items[].id. Each nonempty successful request is billed separately. Never auto-submit the target query.",
          "minLength": 1,
          "pattern": "^(?:Ug[A-Za-z0-9_-]{8,200}|https://(?:www\\.|m\\.)?youtube\\.com/post/Ug[A-Za-z0-9_-]{8,200}/?(?:[?#][^\\s]*)?)$"
        }
      },
      "required": [
        "url",
        "post_url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@MrBeast",
          "post_url": "https://www.youtube.com/post/UgkxIkDHJ9iW7XmjtMbke3Ud7rEiV5jSHDnR"
        }
      ],
      "x-prerequisite": {
        "tool": "goanyapi_youtube_channel_posts",
        "method": "POST",
        "path": "/api/v1/youtube/channel/posts",
        "inputs": [
          "url"
        ],
        "responsePath": "data.result.items[].id",
        "targetParameter": "post_url"
      }
    },
    "description": "YouTube Community Post. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-post-api"
  },
  {
    "id": "youtube-post-comments",
    "method": "POST",
    "path": "/api/v1/youtube/post/comments",
    "mcpName": "goanyapi_youtube_post_comments",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "sort": {
          "type": "string",
          "enum": [
            "top",
            "newest"
          ],
          "default": "top",
          "description": "Comment ordering."
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Opaque cursor. For replies, obtain data.result.items[].reply_cursor from the corresponding comments endpoint; for subsequent reply pages use data.result.next_cursor. For other lists use data.result.next_cursor. Never invent a cursor."
        },
        "url": {
          "type": "string",
          "description": "YouTube channel HTTPS URL, @handle or UC-prefixed channel ID. No prerequisite lookup or separate charge.",
          "minLength": 1,
          "pattern": "^(?:@[^\\s/?#]+|UC[A-Za-z0-9_-]{22}|https://(?:www\\.|m\\.)?youtube\\.com/(?:@[^\\s/?#]+|channel/UC[A-Za-z0-9_-]{22}|(?:c|user)/[^\\s/?#]+)/?(?:[?#][^\\s]*)?)$"
        },
        "post_url": {
          "type": "string",
          "description": "YouTube HTTPS /post/<postId> URL or post ID. Obtain from the channel posts endpoint using the same channel URL. Each nonempty successful request is billed separately. Obtain via goanyapi_youtube_channel_posts (POST /api/v1/youtube/channel/posts), with Bearer authentication and JSON body inputs url. Read data.result.items[].id. Each nonempty successful request is billed separately. Never auto-submit the target query.",
          "minLength": 1,
          "pattern": "^(?:Ug[A-Za-z0-9_-]{8,200}|https://(?:www\\.|m\\.)?youtube\\.com/post/Ug[A-Za-z0-9_-]{8,200}/?(?:[?#][^\\s]*)?)$"
        }
      },
      "required": [
        "url",
        "post_url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/@MrBeast",
          "post_url": "https://www.youtube.com/post/UgkxIkDHJ9iW7XmjtMbke3Ud7rEiV5jSHDnR"
        }
      ],
      "x-prerequisite": {
        "tool": "goanyapi_youtube_channel_posts",
        "method": "POST",
        "path": "/api/v1/youtube/channel/posts",
        "inputs": [
          "url"
        ],
        "responsePath": "data.result.items[].id",
        "targetParameter": "post_url"
      }
    },
    "description": "YouTube Community Post Comments. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-post-comments-api"
  },
  {
    "id": "youtube-post-comment-replies",
    "method": "POST",
    "path": "/api/v1/youtube/post/comments/replies",
    "mcpName": "goanyapi_youtube_post_comment_replies",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Opaque cursor. For replies, obtain data.result.items[].reply_cursor from the corresponding comments endpoint; for subsequent reply pages use data.result.next_cursor. For other lists use data.result.next_cursor. Never invent a cursor. Obtain via goanyapi_youtube_post_comments (POST /api/v1/youtube/post/comments), with Bearer authentication and JSON body inputs url, post_url. Read data.result.items[].reply_cursor. Each nonempty successful request is billed separately. Never auto-submit the target query.",
          "minLength": 1
        }
      },
      "required": [
        "cursor"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "cursor": "4qmFsgLQAhIrRkVjb21tZW50X3Bvc3RfZGV0YWlsX3BhZ2Vfd2ViX3JlcGxpZXNfcGFnZRqgAkVnVndiM04wYzhvQko3SUJKRlZuYTNoSmEwUklTamxwVnpkWWJXcDBUV0pyWlROVlpEZHlSV2xXTldwVFNFUnVVdW9DQkJBQkdBR3FBNXdCR21rU0dsVm5lazFFTjAxWE5XbExiRmd3TWtGMk9FNDBRV0ZCUWtGbklnSUlBQ29ZVlVOWU5rOVJNMFJyWTNOaVdVNUZOa2c0ZFZGUmRWWkJRQUZJQ25va1ZXZHJlRWxyUkVoS09XbFhOMWh0YW5STlltdGxNMVZrTjNKRmFWWTFhbE5JUkc1U2dnRUNDQUZDTDJOdmJXMWxiblF0Y21Wd2JHbGxjeTFwZEdWdExWVm5lazFFTjAxWE5XbExiRmd3TWtGMk9FNDBRV0ZCUWtGbg%3D%3D"
        }
      ],
      "x-prerequisite": {
        "tool": "goanyapi_youtube_post_comments",
        "method": "POST",
        "path": "/api/v1/youtube/post/comments",
        "inputs": [
          "url",
          "post_url"
        ],
        "responsePath": "data.result.items[].reply_cursor",
        "targetParameter": "cursor"
      }
    },
    "description": "YouTube Community Post Comment Replies. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-post-comment-replies-api"
  },
  {
    "id": "youtube-comments",
    "method": "POST",
    "path": "/api/v1/youtube/video/comments",
    "mcpName": "goanyapi_youtube_comments",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "url": {
          "type": "string",
          "description": "YouTube HTTPS resource URL (preferred) or resource ID. Channel URLs accept @handle, /channel/, /c/, /user/; video URLs accept watch?v=, youtu.be/, /shorts/, /embed/, /live/, /v/.",
          "minLength": 1,
          "pattern": "^(?:[A-Za-z0-9_-]{11}|https://(?:(?:www\\.|m\\.)?youtube\\.com/(?:watch\\?[^\\s]*v=[A-Za-z0-9_-]{11}[^\\s]*|(?:shorts|embed|live|v)/[A-Za-z0-9_-]{11}/?(?:[?#][^\\s]*)?)|(?:www\\.)?youtu\\.be/[A-Za-z0-9_-]{11}/?(?:[?#][^\\s]*)?))$"
        },
        "sort": {
          "type": "string",
          "enum": [
            "top",
            "newest"
          ],
          "default": "top",
          "description": "Comment ordering."
        },
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Opaque cursor. For replies, obtain data.result.items[].reply_cursor from the corresponding comments endpoint; for subsequent reply pages use data.result.next_cursor. For other lists use data.result.next_cursor. Never invent a cursor."
        }
      },
      "required": [
        "url"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "url": "https://www.youtube.com/watch?v=Y334D183ofE"
        }
      ]
    },
    "description": "YouTube Video Comments. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-comments-api"
  },
  {
    "id": "youtube-comment-replies",
    "method": "POST",
    "path": "/api/v1/youtube/video/comments/replies",
    "mcpName": "goanyapi_youtube_comment_replies",
    "readOnly": true,
    "inputSchema": {
      "type": "object",
      "properties": {
        "cursor": {
          "type": "string",
          "maxLength": 16000,
          "description": "Opaque cursor. For replies, obtain data.result.items[].reply_cursor from the corresponding comments endpoint; for subsequent reply pages use data.result.next_cursor. For other lists use data.result.next_cursor. Never invent a cursor. Obtain via goanyapi_youtube_comments (POST /api/v1/youtube/video/comments), with Bearer authentication and JSON body inputs url. Read data.result.items[].reply_cursor. Each nonempty successful request is billed separately. Never auto-submit the target query.",
          "minLength": 1
        }
      },
      "required": [
        "cursor"
      ],
      "additionalProperties": false,
      "examples": [
        {
          "cursor": "Eg0SC1kzMzREMTgzb2ZFGAYygwEaUBIaVWd3QzhGLU9KSTh6al9nUVpSaDRBYUFCQWciAggAKhhVQ3BnZGR5bXhJSXpYOTE0bUY2Qm56elEyC1kzMzREMTgzb2ZFQAFICoIBAggBQi9jb21tZW50LXJlcGxpZXMtaXRlbS1VZ3dDOEYtT0pJOHpqX2dRWlJoNEFhQUJBZw%3D%3D"
        }
      ],
      "x-prerequisite": {
        "tool": "goanyapi_youtube_comments",
        "method": "POST",
        "path": "/api/v1/youtube/video/comments",
        "inputs": [
          "url"
        ],
        "responsePath": "data.result.items[].reply_cursor",
        "targetParameter": "cursor"
      }
    },
    "description": "YouTube Video Comment Replies. HTTPS resource URLs are preferred where supported. Empty results and failures are free. Prefer YouTube resource URLs. Reply cursors must come from the corresponding comments endpoint. Empty results and failures are free. Business data is in data.result. Null, empty and missing values are preserved. Each nonempty successful page is billed separately; empty results and failures are free. Use only the returned next_cursor; never invent pagination.",
    "docsPath": "/docs/youtube-comment-replies-api"
  }
] as const satisfies readonly PublicApiDefinition[];
