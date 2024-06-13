
import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';

export default defineConfig({
  schema: './src/db/schemas/*.ts',
  out: './src/db/migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
  // tablesFilter: [`${DATABASE_PREFIX}_*`],
});


