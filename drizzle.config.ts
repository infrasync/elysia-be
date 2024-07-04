
import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';
import { DATABASE_PREFIX } from '@/lib/constant';

export default defineConfig({
  schema: './src/db/schemas/*.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  tablesFilter: [`${DATABASE_PREFIX}_*`],
});
