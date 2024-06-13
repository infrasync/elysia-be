import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";

export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({
    autoIncrement: true,
  }),
  content: text("content").notNull(),
});

export const createNoteSchema = createInsertSchema(notes);
export const selectNoteSchema = createSelectSchema(notes);

export const updateNoteSchema = t.Object({
  content: t.String(),
});
