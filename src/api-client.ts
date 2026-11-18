const REQUEST_TIMEOUT_MS = 45_000;

export class GoAnyApiError extends Error {
  constructor(readonly status: number, readonly body: unknown) {
    super(`GoAnyAPI request failed with status ${status}`);
  }
}

export async function callGoAnyApi(
  baseUrl: string,
  path: string,
  method: 'GET' | 'POST',
  args: Record<string, unknown>,
  accessToken: string,
  internalSecret: string
) {
  const pathArguments = new Set<string>();
  const resolvedPath = path.replace(/\{([A-Za-z][A-Za-z0-9_]*)\}/g, (_match, key) => {
    const value = args[key];
    if (value === undefined || value === null || value === '') throw new Error(`Missing path parameter: ${key}`);
    pathArguments.add(key);
    return encodeURIComponent(String(value));
  });
  const url = new URL(`${baseUrl.replace(/\/$/, '')}${resolvedPath}`);
  const payload: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(args)) {
    if (value === undefined || value === null || value === '' || pathArguments.has(key)) continue;
    if (method === 'POST') payload[key] = value; else url.searchParams.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  }

  const controller = new AbortController();
  const timeoutMs = resolvedPath === '/api/v1/taaft-just-released-api/realtime'
    ? 250_000
    : /^\/api\/v1\/(?:instagram|twitter)\//.test(resolvedPath) ? 75_000
    : /^\/api\/v1\/(?:google-ai-overview|google-ai-mode|google-scholar|bing-serp|serp(?:-stable|-standard)?)$/.test(resolvedPath) ? 95_000 : REQUEST_TIMEOUT_MS;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method,
      headers: {
        accept: 'application/json',
        ...(method === 'POST' ? { 'content-type': 'application/json' } : {}),
        authorization: `Bearer ${accessToken}`,
        'x-goanyapi-mcp-secret': internalSecret,
      },
      ...(method === 'POST' ? { body: JSON.stringify(payload) } : {}),
      signal: controller.signal,
    });
    const text = await response.text();
    let body: unknown = text;
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      // 保留非 JSON 错误正文。
    }
    if (!response.ok) throw new GoAnyApiError(response.status, body);
    return body;
  } finally {
    clearTimeout(timeout);
  }
}
