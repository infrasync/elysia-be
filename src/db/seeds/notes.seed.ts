/* eslint-disable no-console */
import { drizzle } from 'drizzle-orm/libsql';
import Database from 'bun:sqlite';
import { createClient } from '@libsql/client';
import { env } from '@/env';
import { faker } from '@faker-js/faker';

import * as schema from '@/db/schemas';

export async function runNotesSeed() {
  const connection = createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  });
  const db = drizzle(connection, { schema, logger: true });

  console.log('⏳ Running migrations...');

  const start = Date.now();
  const data: (typeof schema.notes.$inferInsert)[] = [];

  for (let i = 0; i < 6; i++) {
    data.push({
      content: faker.internet.userName(),
    });
  }

  try {
    const end = Date.now();

    await db.insert(schema.notes).values(data);
    console.log(`✅ Notes Seeding completed in ${end - start}ms`);
  } catch (err) {
    const end = Date.now();
    console.error(`
        ❌ Notes Seeding failed in ${end - start}ms
        ${err}
        `);
  }
}
