import 'server-only';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
});
