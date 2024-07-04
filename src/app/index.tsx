import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';
import { createElysia } from '@/utils/elysia';
import { routes as postsRoutes } from './posts';
export const app = createElysia()
  // Plugins on all routes
  .use(swagger())
  // Plugins on all page routes
  .use(html())

  // Page routes
  .use(postsRoutes)
  .get('/health', (ctx) => 'ok');

export type App = typeof app;
