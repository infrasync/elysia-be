import { t, Static } from "elysia";


export const PostSchema = t.Object({
  id: t.String(),
  title: t.String(),
  excerpt: t.String(),
  status: t.String(),
  createdAt: t.String(),
  user: t.Object({
    email: t.String(),
  }),
})

const MetaSchema = t.Object({
  page: t.Number(),
  size: t.Number(),
  total: t.Number(),
})

export const PostsSchema = t.Object({
  meta: MetaSchema,
  data: t.Array(
    PostSchema
  ),
});

export type Posts = Static<typeof PostsSchema>;
