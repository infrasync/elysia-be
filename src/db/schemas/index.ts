import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  pgTableCreator,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

import { DATABASE_PREFIX as prefix } from '@/lib/constant';

export const pgTable = pgTableCreator((name) => `${prefix}_${name}`);

export const refreshToken = pgTable(
  'refresh_token', {
  id: varchar('id', { length: 21 }).primaryKey(),
  hashedToken: varchar('hashed_token', { length: 255 }).unique().notNull(),
  userId: varchar('user_id', { length: 21 }).notNull(),
  revoked: boolean('revoked').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
},
  (t) => ({
    userIdx: index('refresh_token_user_idx').on(t.userId),
  }),
)


export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 21 }).primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    emailVerified: boolean('email_verified').default(false).notNull(),
    hashedPassword: varchar('hashed_password', { length: 255 }),
    photo: varchar('photo', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
      () => new Date(),
    ),
    googleId: varchar('google_id', { length: 255 }).unique(),
    refreshTokenId: varchar('refresh_token_id', { length: 21 }).unique(),
  },
  (t) => ({
    emailIdx: index('user_email_idx').on(t.email),
    googleIdx: index('user_google_idx').on(t.googleId),
    refreshTokenIdx: index('user_refresh_token_idx').on(t.refreshTokenId),
  }),
);


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const sessions = pgTable(
  'sessions',
  {
    id: varchar('id', { length: 255 }).primaryKey(),
    userId: varchar('user_id', { length: 21 }).notNull(),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
  },
  (t) => ({
    userIdx: index('session_user_idx').on(t.userId),
  }),
);

export const emailVerificationCodes = pgTable(
  'email_verification_codes',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 21 }).unique().notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    code: varchar('code', { length: 8 }).notNull(),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
  },
  (t) => ({
    userIdx: index('verification_code_user_idx').on(t.userId),
    emailIdx: index('verification_code_email_idx').on(t.email),
  }),
);

export const passwordResetTokens = pgTable(
  'password_reset_tokens',
  {
    id: varchar('id', { length: 40 }).primaryKey(),
    userId: varchar('user_id', { length: 21 }).notNull(),
    expiresAt: timestamp('expires_at', {
      withTimezone: true,
      mode: 'date',
    }).notNull(),
  },
  (t) => ({
    userIdx: index('password_token_user_idx').on(t.userId),
  }),
);

export const posts = pgTable(
  'posts',
  {
    id: varchar('id', { length: 15 }).primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    excerpt: varchar('excerpt', { length: 255 }).notNull(),
    content: text('content').notNull(),
    status: varchar('status', { length: 10, enum: ['draft', 'published'] })
      .default('draft')
      .notNull(),
    tags: varchar('tags', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).$onUpdate(
      () => new Date(),
    ),
  },
  (t) => ({
    userIdx: index('post_user_idx').on(t.userId),
    createdAtIdx: index('post_created_at_idx').on(t.createdAt),
  }),
);

export const postRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

export const userRelations = relations(users, ({ one }) => ({
  refreshToken: one(refreshToken, {
    fields: [users.refreshTokenId],
    references: [refreshToken.id],
  }),
}));

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
