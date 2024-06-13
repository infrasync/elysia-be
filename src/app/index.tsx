import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';
import { createElysia } from '@/utils/elysia';
import { routes as notesRoutes } from './notes';

export const app = createElysia()
  // Plugins on all routes
  .use(swagger())
  // Plugins on all page routes
  .use(html())

  // Page routes
  .use(notesRoutes)
  .get('/health', (ctx) => 'ok');

export type App = typeof app;
