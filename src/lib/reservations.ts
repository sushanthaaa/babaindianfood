import { query } from './db';
export async function ensureSchema() {
  await query(`CREATE TABLE IF NOT EXISTS reservations (id SERIAL PRIMARY KEY,reservation_code TEXT UNIQUE NOT NULL,branch TEXT NOT NULL,reservation_date DATE NOT NULL,reservation_time TEXT NOT NULL,party_size INT NOT NULL,customer_name TEXT NOT NULL,customer_email TEXT NOT NULL,customer_phone TEXT NOT NULL,notes TEXT DEFAULT '',status TEXT NOT NULL DEFAULT 'pending',created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());`);
  await query(`CREATE TABLE IF NOT EXISTS reservation_closures (id SERIAL PRIMARY KEY,branch TEXT NOT NULL,closed_date DATE NOT NULL,reason TEXT DEFAULT '',created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),UNIQUE(branch, closed_date));`);
}
export function buildReservationCode() {
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `BABA-${Date.now().toString().slice(-8)}-${r}`;
}
