import { z } from 'zod';

// Define the schema for environment variables
export const envSchema = z.object({
  VITE_API_URL: z.string().url(),
});

// Validate the environment variables
const env = envSchema.safeParse(import.meta.env);

if (!env.success) {
  console.error('Missing environment variables:');
  console.error(envSchema.keyof().options.join(', '));
  process.exit(1);
}

// Export validated variables
export const { VITE_API_URL } = env.data;
