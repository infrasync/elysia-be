import { Context, t, type Static } from 'elysia';
import { db } from '@/lib/db';
import { and, eq, sql, desc } from 'drizzle-orm';
import { posts } from '@/db/schemas';
import { match } from 'ts-pattern';
import { type GlobalQuerys, type DeleteQuery } from '@/types/queries';
import { PostBody } from '@/types/body';
import { generateId } from 'lucia';


export async function getPosts(ctx: Context<{
  query: GlobalQuerys;
}>) {
  const { page, size, sort, orderBy, status } = ctx.query
  const user = {
    id: 'm7xa8kd9xx40kn3qrtrgo'
  }
  const countTotalPosts = db
    .select({ count: sql<number>`count(*)` })
    .from(posts);
  const totalPostsFilteredStatus = await countTotalPosts.where(eq(posts.userId, user.id)) // No where clause if status is null (count all)

  const postsList = await db.query.posts.findMany({
    where: (table, { eq: eqFn }) =>
      status
        ? and(eqFn(table.status, status), eqFn(table.userId, user?.id || ''))
        : eqFn(table.userId, user?.id || ''),
    offset: ((Number(page)) - 1) * Number(size),
    limit: Number(size),
    orderBy: (table, { desc, asc }) =>
      match(orderBy)
        .with('createdAt', () =>
          sort === 'desc' ? desc(table.createdAt) : asc(table.createdAt),
        )
        .with('title', () =>
          sort === 'desc' ? desc(table.title) : asc(table.title),
        )
        .otherwise(() => desc(table.createdAt)),
    columns: {
      id: true,
      title: true,
      excerpt: true,
      status: true,
      createdAt: true,
    },
    with: { user: { columns: { email: true } } },
  });
  console.log('total', totalPostsFilteredStatus)
  const meta = {
    page: Number(page),
    size: Number(size),
    total: Number(totalPostsFilteredStatus[0].count),
  };

  return {
    data: postsList,
    meta,
  }
}

export async function deletePost(ctx: Context<{
  params: DeleteQuery;
}>) {
  const { id } = ctx.params;
  const [item] = await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning();
  return item;
}

export async function createPost(ctx: Context<{
  body: PostBody;
}>) {
  const id = generateId(15);
  const input = ctx.body;
  await db.insert(posts).values({
    id,
    userId: 'm7xa8kd9xx40kn3qrtrgo',
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
  });
  return {
    id,
    title: input.title,
    excerpt: input.excerpt,
    content: input.content,
  };
}
