import { NextRequest, NextResponse } from 'next/server';
import { ensureSchema, buildReservationCode } from '../../../lib/reservations';
import { query } from '../../../lib/db';

export async function POST(req: NextRequest) {
  await ensureSchema();
  const body = await req.json();
  const { branch, date, time, partySize, name, email, phone, notes } = body;
  if (!branch || !date || !time || !partySize || !name || !email || !phone) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const closed = await query('SELECT id FROM reservation_closures WHERE branch=$1 AND closed_date=$2', [branch, date]);
  if (closed.length > 0) return NextResponse.json({ error: 'Reservations are closed for this day.' }, { status: 409 });
  const code = buildReservationCode();
  await query('INSERT INTO reservations (reservation_code,branch,reservation_date,reservation_time,party_size,customer_name,customer_email,customer_phone,notes,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [code, branch, date, time, Number(partySize), name, email, phone, notes || '', 'pending']);

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESERVATION_FROM_EMAIL || 'Baba Reservations <onboarding@resend.dev>' ;
  const owner = process.env.OWNER_EMAIL || 'sushanthp48@gmail.com';
  if (resendKey) {
    const subject = `New Reservation Request ${code}`;
    const html = `<p>Reservation code: <b>${code}</b></p><p>Branch: ${branch}</p><p>Date: ${date} ${time}</p><p>Guests: ${partySize}</p><p>Name: ${name}</p><p>Phone: ${phone}</p><p>Notes: ${notes || '-'}</p>`;
    await fetch('https://api.resend.com/emails', { method: 'POST', headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [owner], subject, html }) });
    await fetch('https://api.resend.com/emails', { method: 'POST', headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to: [email], subject: `Reservation Request Received ${code}`, html: `<p>Thank you ${name}. We received your reservation request for ${date} ${time}. Your code is <b>${code}</b>.</p><p>Status: Pending confirmation.</p>` }) });
  }

  return NextResponse.json({ ok: true, reservationCode: code, status: 'pending' });
}
