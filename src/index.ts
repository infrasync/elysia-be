import staticPlugin from '@elysiajs/static';
import { app } from './app';
import { env } from '@/env';
import { createElysia } from './utils/elysia';
import { fixCtxRequest } from './utils/fixCtxRequest';
import { Logestic } from 'logestic';

const server = createElysia()
  .derive((ctx) => fixCtxRequest(ctx.request))
  .use(Logestic.preset('fancy'))
  // Plugins that aren't compatible with the edge
  .use(staticPlugin())

  // Routes
  .use(app);

server.listen({ port: env.PORT }, ({ hostname, port }) => {
  const url = env.NODE_ENV === 'production' ? 'https' : 'http';

  console.log(`🦊 Elysia is running at ${url}://${hostname}:${port}`);
});
