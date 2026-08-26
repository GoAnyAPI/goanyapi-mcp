/**
 * GoAnyAPI 公开 API 的机器可读目录。
 * 这里只放公开契约，不包含凭证、数据库、内部配置或服务端实现。
 */

export type JsonSchema = {
  type: 'object' | 'string' | 'integer' | 'number' | 'boolean' | 'array';
  title?: string;
  description?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  enum?: Array<string | number | boolean>;
  items?: JsonSchema;
  default?: string | number | boolean;
  additionalProperties?: boolean;
};

export type PublicApiId =
  | 'traffic'
  | 'dr'
  | 'backlink'
  | 'keyword-difficulty'
  | 'keyword-generator'
  | 'google-autocomplete'
  | 'bing-autocomplete'
  | 'top10-serp'
  | 'serp'
  | 'bing-serp'
  | 'google-intitle'
  | 'google-site-search'
  | 'adsense'
  | 'transparency'
  | 'ads-statistics'
  | 'activity-credits'
  | 'credits-balance';

export interface PublicApiDefinition {
  readonly id: PublicApiId;
  readonly method: 'GET' | 'POST';
  readonly path: `/api/v1/${string}`;
  readonly inputSchema: JsonSchema;
  readonly mcpName: `goanyapi_${string}`;
  readonly description: string;
  readonly readOnly: true;
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

const definitions: readonly PublicApiDefinition[] = [
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
  {
    id: 'serp',
    method: 'GET',
    path: '/api/v1/serp',
    inputSchema: objectSchema(
      {
        q: keywordSchema,
        gl: countrySchema,
        hl: stringSchema('Optional two-letter language code'),
        start: { type: 'integer', description: 'Result offset' },
        device: stringSchema('Optional desktop or mobile device'),
        browser: stringSchema('Optional browser name'),
        safe: stringSchema('Optional safe-search mode'),
        search_type: stringSchema('Optional search vertical'),
      },
      ['q']
    ),
    mcpName: 'goanyapi_google_serp',
    description: 'Query structured Google search results.',
    readOnly: true,
    docsPath: '/docs/serp-api',
  },
  {
    id: 'bing-serp',
    method: 'GET',
    path: '/api/v1/bing-serp',
    inputSchema: objectSchema(
      {
        q: keywordSchema,
        cc: stringSchema('Optional lowercase two-letter country code'),
        setLang: stringSchema('Optional language-country code such as en-US'),
        first: { type: 'integer', description: 'Pagination start from the previous response' },
        device: stringSchema('Optional desktop, mobile, ios, ipad, android, or tablet device'),
        brd_browser: stringSchema('Optional chrome, safari, or firefox browser'),
      },
      ['q']
    ),
    mcpName: 'goanyapi_bing_serp',
    description: 'Query structured Bing search results with pagination and localization options.',
    readOnly: true,
    docsPath: '/docs/bing-serp-api',
  },
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
