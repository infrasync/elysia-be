import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { t } from 'elysia';
import * as notesSchemas from '@/db/schemas/notes.schema';

import { env } from '@/env';

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
});
export const db = drizzle(client, {
  logger: true,
  schema: { ...notesSchemas },
});

// Useful for validating request params
export const idParamsSchema = t.Object({ id: t.Numeric() });
