import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PROJECT_NAME: z.string(),
  APP_DOMAIN: z.string(),
  API_DB_URL: z.string(),
  API_JWT_ACCESS_SECRET: z.string(),
  API_JWT_REFRESH_SECRET: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid / Missing environment variables:', env.error.format());
  process.exit(1);
}

export const {
  PROJECT_NAME,
  APP_DOMAIN,
  API_DB_URL,
  API_JWT_ACCESS_SECRET,
  API_JWT_REFRESH_SECRET,
} = env.data;
