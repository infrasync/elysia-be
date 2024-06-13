import { createElysia } from '@/utils/elysia';
import { html } from "@elysiajs/html";
import { createNoteSchema, updateNoteSchema } from '@/db/schemas/notes.schema';

import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
  updateNoteFormUI,
} from "./controller";

import { CreateNoteSchema } from "@/types/entity";
export const routes = createElysia({
    prefix: "/notes",
})
  .use(html())
  .get("/", getNotes)
  .get("/:id/edit", updateNoteFormUI)
  .post("/", createNote, {
    body: createNoteSchema,
  })
  .delete("/:id", deleteNote)
  .patch("/:id", updateNote, {
    body: updateNoteSchema,
  })

  .listen(3000);

