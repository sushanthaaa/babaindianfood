import { NextRequest, NextResponse } from 'next/server';
import { ensureSchema } from '../../../lib/reservations';
import { query } from '../../../lib/db';

const slots = ['10:30','11:00','11:30','12:00','12:30','13:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00'];

export async function GET(req: NextRequest) {
  await ensureSchema();
  const branch = req.nextUrl.searchParams.get('branch') || 'central';
  const date = req.nextUrl.searchParams.get('date');
  if (!date) return NextResponse.json({ error: 'date required' }, { status: 400 });
  const closed = await query<{ id:number }>('SELECT id FROM reservation_closures WHERE branch=$1 AND closed_date=$2', [branch, date]);
  if (closed.length > 0) return NextResponse.json({ slots: [], closed: true });
  const rows = await query<{reservation_time:string,count:string}>('SELECT reservation_time, COUNT(*)::text AS count FROM reservations WHERE branch=$1 AND reservation_date=$2 AND status IN (\'pending\',\'confirmed\') GROUP BY reservation_time', [branch, date]);
  const map = new Map(rows.map(r => [r.reservation_time, Number(r.count)]));
  const available = slots.filter(s => (map.get(s) || 0) < 6);
  return NextResponse.json({ slots: available, closed: false });
}
