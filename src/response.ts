import { GoAnyApiError } from './api-client.js';

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

export function toToolError(error: unknown) {
  if (error instanceof GoAnyApiError) {
    const messages: Record<number, string> = {
      400: 'Invalid API parameters.',
      401: 'The API key is invalid or missing.',
      402: 'Insufficient credits for this request.',
      429: 'Too many requests. Please try again later.',
    };
    return {
      isError: true,
      content: [{ type: 'text' as const, text: messages[error.status] || 'GoAnyAPI request failed.' }],
      structuredContent: { status: error.status, error: asStructuredContent(error.body) },
    };
  }

  return {
    isError: true,
    content: [{ type: 'text' as const, text: error instanceof Error ? error.message : 'Tool execution failed.' }],
  };
}
