/* eslint-disable no-console */
import { drizzle } from "drizzle-orm/libsql";
import { migrate } from 'drizzle-orm/libsql/migrator';
import Database from 'bun:sqlite';
import { createClient } from '@libsql/client';
import { env } from '@/env';


import * as schema from '@/db/schemas';

export async function runMigrate() {
  const connection = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  });
  const db = drizzle(connection, { schema, logger: true });

  console.log('⏳ Running migrations...');

  const start = Date.now();

  await migrate(db, { migrationsFolder: './src/db/migrations' });


  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
}

runMigrate().catch((err) => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});
