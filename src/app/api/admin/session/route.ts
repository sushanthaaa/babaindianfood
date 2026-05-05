import { NextRequest, NextResponse } from 'next/server';
import { adminCookieName, verifySessionToken } from '../../../../lib/auth';
export async function GET(req: NextRequest) {
  const token = req.cookies.get(adminCookieName)?.value || '';
  return NextResponse.json({ authenticated: verifySessionToken(token) });
}
