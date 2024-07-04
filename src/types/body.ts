import { t, Static } from "elysia";

export const PostBody = t.Object({
  title: t.String({
    minLength: 5,
    maxLength: 100,
    description: 'Post title',
    error: 'Title must be between 5 and 100 characters long'
  }),
  excerpt: t.String(
    {
      minLength: 5,
      maxLength: 200,
      description: 'Post excerpt',
      error: 'Excerpt must be between 5 and 200 characters long'
    }
  ),
  content: t.String(
    {
      minLength: 5,
      description: 'Post content',
      error: 'Content must be at least 5 characters long'
    }
  ),
})


export type PostBody = Static<typeof PostBody>;
