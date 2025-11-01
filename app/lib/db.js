// Conexión a PostgreSQL con Drizzle (Node-Postgres)
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Usa variables de entorno cargadas por Next (.env.local)
const connectionString = process.env.DATABASE_URL;

// Configuración SSL opcional según el proveedor
// Establece PGSSL=true en entorno si tu DB requiere SSL con certificado no verificado
const ssl = process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false;

export const pool = new Pool({ connectionString, ssl });
export const db = drizzle(pool);

// Helper para cerrar el pool en tareas puntuales (e.g., scripts)
export async function closePool() {
  await pool.end();
}