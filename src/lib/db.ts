import { Pool } from 'pg';
const connectionString = process.env.DATABASE_URL;
export const pool = new Pool({ connectionString });
export async function query<T = any>(text: string, params: any[] = []): Promise<T[]> {
  const result = await pool.query(text, params);
  return result.rows as T[];
}
