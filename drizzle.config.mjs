import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Carga variables de entorno desde .env.local
config({ path: '.env.local' });

export default defineConfig({
  schema: './drizzle/schema.js',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL },
  verbose: true,
  strict: true,
});