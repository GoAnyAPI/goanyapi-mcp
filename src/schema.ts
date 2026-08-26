import { z } from 'zod';
import type { JsonSchema } from './catalog-fallback.js';

function literalSchema(value: string | number | boolean) {
  return z.literal(value as never);
}

export function jsonSchemaToZod(schema: JsonSchema): z.ZodTypeAny {
  if (schema.enum && schema.enum.length > 0) {
    return schema.enum.length === 1
      ? literalSchema(schema.enum[0])
      : z.union(schema.enum.map(literalSchema) as unknown as [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]]);
  }

  switch (schema.type) {
    case 'string':
      return z.string().describe(schema.description || '');
    case 'integer':
      return z.number().int().describe(schema.description || '');
    case 'number':
      return z.number().describe(schema.description || '');
    case 'boolean':
      return z.boolean().describe(schema.description || '');
    case 'array':
      return z.array(schema.items ? jsonSchemaToZod(schema.items) : z.unknown());
    case 'object': {
      const shape: Record<string, z.ZodTypeAny> = {};
      for (const [key, property] of Object.entries(schema.properties || {})) {
        const value = jsonSchemaToZod(property);
        shape[key] = schema.required?.includes(key) ? value : value.optional();
      }
      return z.object(shape).strict();
    }
  }
}

export function jsonSchemaToZodShape(schema: JsonSchema) {
  const object = jsonSchemaToZod(schema);
  if (!(object instanceof z.ZodObject)) {
    throw new Error('MCP tool input schema must be an object');
  }
  return object.shape;
}
