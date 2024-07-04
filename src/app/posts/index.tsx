import { createElysia } from '@/utils/elysia';
import { html } from "@elysiajs/html";
// import { createNoteSchema, updateNoteSchema } from '@/db/schemas/notes.schema';
import { env } from '@/env';
import {
  getPosts,
  createPost,
  deletePost,
} from "./controller";

import { GlobalQuerys, DeleteQuery } from "@/types/queries";
import { PostBody } from "@/types/body"

export const routes = createElysia({
  prefix: "/posts",
})
  .get("/", getPosts, {
    query: GlobalQuerys,
  })
  // .get("/:id/edit", updateNoteFormUI)
  .post("/", createPost, {
    body: PostBody,
  })
  .delete("/:id", deletePost, {
    params: DeleteQuery,
  })
// .patch("/:id", updateNote, {
//   body: updateNoteSchema,
// })
