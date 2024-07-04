import { z } from 'zod';
import 'dotenv/config'

/**
 * Toggle environment variables
 * 'true' or '1' will evaluate to true
 * 'false' or '0' will evaluate to false
 */
const toggle = z
  .enum(['true', 'false', '0', '1'])
  .transform((v) => v === 'true' || v === '1');

const envVariables = z.object({
  DATABASE_URL: z
    .string()
    .url()
    .refine(
      (str) => !str.includes('YOUR_DATABASE_URL_HERE'),
      'You forgot to change the default URL',
    ),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  SMTP_HOST: z.string().trim().min(1),
  SMTP_PORT: z.string(),
  SMTP_USER: z.string().trim().min(1),
  SMTP_PASSWORD: z.string().trim().min(1),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().trim().min(1),
  GOOGLE_CLIENT_SECRET: z.string().trim().min(1),
  PORT: z.string().default('5173'),
});

export const env = envVariables.parse(process.env);
