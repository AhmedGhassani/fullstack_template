import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PROJECT_NAME: z.string(),
  APP_DOMAIN: z.string(),
  API_DB_URL: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid / Missing environment variables:', env.error.format());
  process.exit(1);
}

export const { PROJECT_NAME, APP_DOMAIN, API_DB_URL } = env.data;
