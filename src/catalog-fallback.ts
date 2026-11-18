import {socialApiCatalog} from './social-api-catalog.js';
import {tiktokSyncCatalog} from './tiktok-sync-catalog.js';
import { tiktokCommentsCatalog } from './tiktok-comments-catalog.js';
import { domainAgeCatalog } from './domain-age-catalog.js';
import { googleAiOverviewCatalog } from './google-ai-overview-catalog.js';
import { googleAiModeCatalog } from './google-ai-mode-catalog.js';
import { geminiScraperCatalog } from './gemini-scraper-catalog.js';
import { chatgptScraperCatalog } from './chatgpt-scraper-catalog.js';
import { chatgptPluginDirectoryCatalog } from './chatgpt-plugin-directory-catalog.js';
import { googleScholarCatalog } from './google-scholar-catalog.js';
import { bingSerpCatalog } from './bing-serp-catalog.js';
import { googleSerpCatalog } from './google-serp-catalog.js';
/**
 * Machine-readable public GoAnyAPI catalog.
 * Contains public contracts only; credentials and internal configuration are excluded.
 */

export type JsonSchema = {
  minItems?: number;
  maxItems?: number;
  type: 'object' | 'string' | 'integer' | 'number' | 'boolean' | 'array';
  title?: string;
  description?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  enum?: Array<string | number | boolean>;
  items?: JsonSchema;
  default?: string | number | boolean;
  additionalProperties?: boolean;
  minimum?: number;
  maximum?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  examples?: unknown[];
  oneOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  not?: JsonSchema;
};

export type PublicApiId =
  | 'instagram-post'
  | 'instagram-profile'
  | 'instagram-highlights'
  | 'instagram-reels'
  | 'instagram-hashtag'
  | 'twitter-tweet'
  | 'twitter-profile'
  | 'twitter-trending'
  | 'twitter-trending-search'
  | 'twitter-trends'
  | 'tiktok-video-detail'
  | 'tiktok-user-profile'
  | 'tiktok-user-posts'
  | 'tiktok-hashtag-detail'
  | 'tiktok-hashtag-posts'
  | 'tiktok-explore'
  | 'tiktok-feed'
  | 'tiktok-comments-submit'
  | 'tiktok-comments-task'
  | 'tiktok-comments-resume'
  | 'domain-age'
  | 'google-ai-overview'
  | 'google-ai-mode'
  | 'gemini-scraper-submit'
  | 'gemini-scraper-task'
  | 'chatgpt-scraper-submit'
  | 'chatgpt-scraper-task'
  | 'chatgpt-plugin-directory-categories'
  | 'chatgpt-plugin-directory-developers'
  | 'chatgpt-plugin-directory-plugins'
  | 'chatgpt-plugin-directory-developer-plugins'
  | 'traffic'
  | 'dr'
  | 'backlink'
  | 'keyword-difficulty'
  | 'keyword-generator'
  | 'google-autocomplete'
  | 'bing-autocomplete'
  | 'top10-serp'
  | 'serp-stable'
  | 'serp-standard'
  | 'serp'
  | 'bing-serp'
  | 'google-scholar'
  | 'google-intitle'
  | 'google-site-search'
  | 'adsense'
  | 'transparency'
  | 'ads-statistics'
  | 'activity-credits'
  | 'credits-balance'
  | 'chrome-reviews-create'
  | 'chrome-reviews-read'
  | 'chrome-web-store-reviews';

export interface PublicApiDefinition {
  readonly id: PublicApiId;
  readonly method: 'GET' | 'POST';
  readonly path: `/api/v1/${string}`;
  readonly inputSchema: JsonSchema;
  readonly mcpName: `goanyapi_${string}`;
  readonly description: string;
  readonly readOnly: boolean;
  readonly docsPath?: `/docs/${string}`;
}

const stringSchema = (description?: string): JsonSchema => ({
  type: 'string',
  ...(description ? { description } : {}),
});

const objectSchema = (
  properties: Record<string, JsonSchema>,
  required: string[] = []
): JsonSchema => ({
  type: 'object',
  properties,
  ...(required.length > 0 ? { required } : {}),
  additionalProperties: false,
});

const domainSchema = stringSchema('Domain name, for example example.com');
const keywordSchema = stringSchema('Search keyword');
const countrySchema = stringSchema('Two-letter country code, for example us');


const chromeDefinitions: readonly PublicApiDefinition[] = [
  { id: 'chrome-web-store-reviews', method: 'GET', path: '/api/v1/chrome-web-store-reviews', mcpName: 'goanyapi_chrome_web_store_reviews', readOnly: true, docsPath: '/docs/chrome-web-store-reviews-api', description: 'Fetch Chrome Web Store reviews with cursor pagination. Non-empty responses cost 1 credit; empty responses are free.', inputSchema: objectSchema({ extensionId: { type: 'string', minLength: 32, maxLength: 2048, description: 'A 32-character extension ID or Chrome Web Store detail/reviews URL.' }, cursor: { type: 'string', maxLength: 4096, description: 'Opaque UTF-8 cursor returned by the previous response.' } }, ['extensionId']) },
];

const definitions: readonly PublicApiDefinition[] = [
  ...socialApiCatalog,
  ...tiktokSyncCatalog,
  ...tiktokCommentsCatalog,
  ...domainAgeCatalog,
  ...googleAiOverviewCatalog,
  ...googleAiModeCatalog,
  ...geminiScraperCatalog,
  ...chatgptScraperCatalog,
  ...chatgptPluginDirectoryCatalog,
  googleScholarCatalog,
  ...chromeDefinitions,
  {
    id: 'traffic',
    method: 'GET',
    path: '/api/v1/traffic',
    inputSchema: objectSchema(
      {
        domain: domainSchema,
        month: {
          type: 'integer',
          enum: [3, 6, 12],
          default: 3,
          description: 'Traffic history range in months',
        },
      },
      ['domain']
    ),
    mcpName: 'goanyapi_traffic',
    description: 'Query website traffic, ranking, and traffic sources for a domain.',
    readOnly: true,
    docsPath: '/docs/traffic-api',
  },
  {
    id: 'dr',
    method: 'GET',
    path: '/api/v1/dr',
    inputSchema: objectSchema({ domain: domainSchema }, ['domain']),
    mcpName: 'goanyapi_domain_rating',
    description: 'Query the domain rating for a domain.',
    readOnly: true,
    docsPath: '/docs/dr-api',
  },
  {
    id: 'backlink',
    method: 'GET',
    path: '/api/v1/backlink',
    inputSchema: objectSchema({ domain: domainSchema }, ['domain']),
    mcpName: 'goanyapi_backlinks',
    description: 'Query backlink data for a domain.',
    readOnly: true,
    docsPath: '/docs/backlink-api',
  },
  {
    id: 'keyword-difficulty',
    method: 'GET',
    path: '/api/v1/keyword-difficulty',
    inputSchema: objectSchema(
      { keyword: keywordSchema, country: countrySchema },
      ['keyword']
    ),
    mcpName: 'goanyapi_keyword_difficulty',
    description: 'Query keyword difficulty and related search metrics.',
    readOnly: true,
    docsPath: '/docs/keyword-difficulty-api',
  },
  {
    id: 'keyword-generator',
    method: 'GET',
    path: '/api/v1/keyword-generator',
    inputSchema: objectSchema(
      { keyword: keywordSchema, country: countrySchema },
      ['keyword']
    ),
    mcpName: 'goanyapi_keyword_generator',
    description: 'Generate related keyword ideas for a keyword.',
    readOnly: true,
    docsPath: '/docs/keyword-generator-api',
  },
  {
    id: 'google-autocomplete',
    method: 'GET',
    path: '/api/v1/google-autocomplete',
    inputSchema: objectSchema(
      {
        q: keywordSchema,
        domain: stringSchema('Optional Google country domain'),
        hl: stringSchema('Optional language code'),
      },
      ['q']
    ),
    mcpName: 'goanyapi_google_autocomplete',
    description: 'Get Google autocomplete suggestions for a query.',
    readOnly: true,
    docsPath: '/docs/google-autocomplete-api',
  },
  {
    id: 'bing-autocomplete',
    method: 'GET',
    path: '/api/v1/bing-autocomplete',
    inputSchema: objectSchema(
      {
        q: keywordSchema,
        mkt: stringSchema('Optional market such as en-US'),
      },
      ['q']
    ),
    mcpName: 'goanyapi_bing_autocomplete',
    description: 'Get Bing autocomplete suggestions for a query.',
    readOnly: true,
    docsPath: '/docs/bing-autocomplete-api',
  },
  {
    id: 'top10-serp',
    method: 'GET',
    path: '/api/v1/top10-serp',
    inputSchema: objectSchema(
      { keyword: keywordSchema, country: countrySchema },
      ['keyword']
    ),
    mcpName: 'goanyapi_top10_serp',
    description: 'Query the top search results for a keyword.',
    readOnly: true,
    docsPath: '/docs/top10-serp-api',
  },
  ...JSON.parse(JSON.stringify(googleSerpCatalog)) as PublicApiDefinition[],
  JSON.parse(JSON.stringify(bingSerpCatalog)) as PublicApiDefinition,
  {
    id: 'google-intitle',
    method: 'GET',
    path: '/api/v1/google-intitle',
    inputSchema: objectSchema(
      {
        intitle: keywordSchema,
        qdr: stringSchema('Optional date range filter'),
        gl: countrySchema,
        hl: stringSchema('Optional two-letter language code'),
        device: stringSchema('Optional desktop, mobile, or platform device'),
        browser: stringSchema('Optional chrome, safari, or firefox browser'),
        safe: stringSchema('Optional safe-search mode'),
      },
      ['intitle']
    ),
    mcpName: 'goanyapi_google_intitle',
    description: 'Find Google results whose titles contain the requested text.',
    readOnly: true,
    docsPath: '/docs/google-intitle-api',
  },
  {
    id: 'google-site-search',
    method: 'GET',
    path: '/api/v1/google-site-search',
    inputSchema: objectSchema(
      {
        site: domainSchema,
        qdr: stringSchema('Optional date range filter'),
        gl: countrySchema,
        hl: stringSchema('Optional two-letter language code'),
        device: stringSchema('Optional desktop, mobile, or platform device'),
        browser: stringSchema('Optional chrome, safari, or firefox browser'),
        safe: stringSchema('Optional safe-search mode'),
      },
      ['site']
    ),
    mcpName: 'goanyapi_google_site_search',
    description: 'Search Google results limited to a specified website.',
    readOnly: true,
    docsPath: '/docs/google-site-search-api',
  },
  {
    id: 'adsense',
    method: 'GET',
    path: '/api/v1/adsense',
    inputSchema: objectSchema(
      { domain: domainSchema, pubId: stringSchema('AdSense publisher ID') },
      []
    ),
    mcpName: 'goanyapi_adsense',
    description: 'Query AdSense information by domain or publisher ID.',
    readOnly: true,
    docsPath: '/docs/adsense-api',
  },
  {
    id: 'transparency',
    method: 'GET',
    path: '/api/v1/transparency',
    inputSchema: objectSchema(
      {
        keyword: keywordSchema,
        domain: domainSchema,
        creativeIds: stringSchema('Comma-separated creative IDs'),
      },
      []
    ),
    mcpName: 'goanyapi_ads_transparency',
    description: 'Query advertising transparency data by keyword, domain, or creative IDs.',
    readOnly: true,
    docsPath: '/docs/transparency-api',
  },
  {
    id: 'ads-statistics',
    method: 'GET',
    path: '/api/v1/ads-statistics',
    inputSchema: objectSchema(
      {
        action: stringSchema(
          'Statistics action, for example advertiserSearch, domainSearch, advertiserStatistics, or domainStatistics'
        ),
        keyword: keywordSchema,
        advertiserId: stringSchema('Advertiser ID'),
        hostId: stringSchema('Domain host ID'),
        title: stringSchema(),
        startDay: stringSchema('Start date, YYYY-MM-DD or YYYYMMDD'),
        endDay: stringSchema('End date, YYYY-MM-DD or YYYYMMDD'),
        page: { type: 'integer', description: 'Zero-based result page' },
        size: { type: 'integer', description: 'Results per page' },
      },
      ['action']
    ),
    mcpName: 'goanyapi_ads_statistics',
    description: 'Query advertising statistics using a supported statistics action.',
    readOnly: true,
    docsPath: '/docs/ads-statistics-api',
  },
  {
    id: 'activity-credits',
    method: 'GET',
    path: '/api/v1/activity-credits',
    inputSchema: objectSchema({}, []),
    mcpName: 'goanyapi_activity_credits',
    description: 'Query the authenticated account credit activity.',
    readOnly: true,
  },
  {
    id: 'credits-balance',
    method: 'GET',
    path: '/api/v1/credits/balance',
    inputSchema: objectSchema({}, []),
    mcpName: 'goanyapi_credits_balance',
    description: 'Query the authenticated account credit balance.',
    readOnly: true,
    docsPath: '/docs/credit-balance-api',
  },
] as const;

export const apiCatalog = definitions;

const definitionById = new Map<PublicApiId, PublicApiDefinition>(
  definitions.map((definition) => [definition.id, definition])
);

export function getApiDefinition(id: PublicApiId): PublicApiDefinition {
  const definition = definitionById.get(id);
  if (!definition) throw new Error(`Unknown public API: ${id}`);
  return definition;
}

export function getPublicApiPaths(): readonly string[] {
  return definitions.map((definition) => definition.path);
}
