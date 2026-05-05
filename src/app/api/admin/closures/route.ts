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
  const rows = await query('SELECT * FROM reservation_closures ORDER BY closed_date DESC LIMIT 200');
  return NextResponse.json({ closures: rows });
}

export async function POST(req: NextRequest) {
  if (!guard(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { branch, date, reason } = await req.json();
  await ensureSchema();
  await query('INSERT INTO reservation_closures (branch,closed_date,reason) VALUES ($1,$2,$3) ON CONFLICT (branch,closed_date) DO UPDATE SET reason=EXCLUDED.reason', [branch, date, reason || 'Closed']);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!guard(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { branch, date } = await req.json();
  await query('DELETE FROM reservation_closures WHERE branch=$1 AND closed_date=$2', [branch, date]);
  return NextResponse.json({ ok: true });
}
