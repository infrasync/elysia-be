/* eslint-disable no-console */
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from "drizzle-orm/postgres-js/migrator";
import Database from 'bun:sqlite';
import { createClient } from '@libsql/client';
import { env } from '@/env';
import postgres from 'postgres';


import * as schema from '@/db/schemas';

export async function runMigrate() {
  const connection = postgres(env.DATABASE_URL, {
    max_lifetime: 10, // Remove this line if you're deploying to Docker / VPS
    // idle_timeout: 20, // Uncomment this line if you're deploying to Docker / VPS
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
