

import { t, Static } from "elysia";

export const GlobalQuerys = t.Object({
  page: t.String({
    default: '1',
    constraint: t.String({
      pattern: '^[0-9]+$',
    }),
  }),
  size: t.String({
    default: '10',
    constraint: t.String({
      pattern: '^[0-9]+$',
    }),
  }),
  sort: t.Optional(t.Enum({
    desc: 'desc',
    asc: 'asc',
    default: 'desc',
  })),
  orderBy: t.Optional(t.Enum({
    createdAt: 'createdAt',
    title: 'title',
    default: 'createdAt',
  })),
  status: t.Optional(t.Enum(
    {
      draft: 'draft',
      published: 'published',
    },
    {
      default: null,
    }
  ))
})

export const DeleteQuery = t.Object({
  id: t.String(),
});

export type GlobalQuerys = Static<typeof GlobalQuerys>;
export type DeleteQuery = Static<typeof DeleteQuery>;
