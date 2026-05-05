import { NextRequest, NextResponse } from 'next/server';
import { adminCookieName, verifySessionToken } from '../../../../lib/auth';
import { ensureSchema } from '../../../../lib/reservations';
import { query } from '../../../../lib/db';

function guard(req: NextRequest) {
  const token = req.cookies.get(adminCookieName)?.value || '';
  return verifySessionToken(token);
}

export async function GET(req: NextRequest) {
  if (!guard(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await ensureSchema();
  const rows = await query('SELECT * FROM reservations ORDER BY reservation_date DESC, reservation_time DESC, created_at DESC LIMIT 500');
  return NextResponse.json({ reservations: rows });
}

export async function PATCH(req: NextRequest) {
  if (!guard(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id, status } = await req.json();
  await query('UPDATE reservations SET status=$1, updated_at=NOW() WHERE id=$2', [status, id]);
  return NextResponse.json({ ok: true });
}
