const REQUEST_TIMEOUT_MS = 45_000;

export class GoAnyApiError extends Error {
  constructor(readonly status: number, readonly body: unknown) {
    super(`GoAnyAPI request failed with status ${status}`);
  }
}

export async function callGoAnyApi(
  baseUrl: string,
  path: string,
  args: Record<string, unknown>,
  authorization: string
) {
  const url = new URL(`${baseUrl.replace(/\/$/, '')}${path}`);
  for (const [key, value] of Object.entries(args)) {
    if (value === undefined || value === null || value === '') continue;
    url.searchParams.set(key, String(value));
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { accept: 'application/json', authorization },
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
