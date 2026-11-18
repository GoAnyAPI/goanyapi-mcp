import { GoAnyApiError } from './api-client.js';
import { googleSerpCatalog } from './google-serp-catalog.js';

function asStructuredContent(value: unknown): Record<string, unknown> {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return { data: value };
}

export function toToolResult(value: unknown) {
  return {
    content: [{ type: 'text' as const, text: JSON.stringify(value) }],
    structuredContent: asStructuredContent(value),
  };
}

export function toToolError(error: unknown, context?: { apiId: string; stableCost?: number; multiCost?: number }) {
  if (error instanceof GoAnyApiError) {
    const stable = googleSerpCatalog.find(api => api.id === 'serp-stable')!;
    const body = asStructuredContent(error.body);
    const recommend = context?.apiId === 'serp' && (error.status === 502 || error.status === 504 || (error.status >= 500 && body.code === 'request_failed'));
    let recommendation = `Google SERP request failed. Use ${stable.mcpName} (${stable.path}) for more reliable, faster responses. Rename q to query and follow Stable's inputSchema and response fields; adjust unsupported selectors. No automatic retry was performed.`;
    if (Number.isSafeInteger(context?.stableCost) && Number.isSafeInteger(context?.multiCost) && context!.stableCost! >= 0 && context!.stableCost! < context!.multiCost!) {
      recommendation += ` Stable costs ${context!.stableCost} credits per request versus Multi-mode ${context!.multiCost}; Stable uses fewer credits.`;
    }
    const messages: Record<number, string> = {
      400: 'Invalid API parameters.',
      401: 'The API key is invalid or missing.',
      402: 'Insufficient credits for this request.',
      429: 'Too many requests. Please try again later.',
    };
    return {
      isError: true,
      content: [{ type: 'text' as const, text: (recommend ? recommendation : undefined) || messages[error.status] || 'GoAnyAPI request failed.' }],
      structuredContent: { status: error.status, error: body, ...(recommend ? { recommendation: { recommended_mcp_tool: stable.mcpName, recommended_endpoint: stable.path, docs: stable.docsPath, parameter_renames: { q: 'query' }, parameter_mapping_required: true } } : {}) },
    };
  }

  return {
    isError: true,
    content: [{ type: 'text' as const, text: error instanceof Error ? error.message : 'Tool execution failed.' }],
  };
}
