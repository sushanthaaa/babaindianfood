import { NextRequest, NextResponse } from 'next/server';
import { adminCookieName, createSessionToken, isValidAdminPassword } from '../../../../lib/auth';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (email !== process.env.ADMIN_EMAIL || !isValidAdminPassword(password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const token = createSessionToken(email);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookieName, token, { httpOnly: true, sameSite: 'lax', secure: true, path: '/', maxAge: 60 * 60 * 24 * 7 });
  return res;
}
