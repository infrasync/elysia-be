import staticPlugin from '@elysiajs/static';
import { app } from './app';
import { env } from '@/env';
import { createElysia } from './utils/elysia';
import { fixCtxRequest } from './utils/fixCtxRequest';
import { Logestic } from 'logestic';
import { cors } from '@elysiajs/cors'

const server = createElysia({
  prefix: '/api/v1',
})
  .derive((ctx) => fixCtxRequest(ctx.request))
  .use(cors())
  .use(Logestic.preset('fancy'))
  // Plugins that aren't compatible with the edge
  .use(staticPlugin())

  // Routes
  .use(app);

server.listen({ port: env.PORT }, ({ hostname, port }: {
  hostname: string;
  port: string | number;
}) => {
  const url = env.NODE_ENV === 'production' ? 'https' : 'http';

  console.log(`🦊 Elysia is running at ${url}://${hostname}:${port}`);
});
