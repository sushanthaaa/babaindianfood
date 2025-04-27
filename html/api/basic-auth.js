// html/api/basic-auth.js
export const config = { runtime: 'edge' };        // run at the Edge

const USER = process.env.BASIC_USER ?? '';
const PASS = process.env.BASIC_PASS ?? '';

export default async function handler(request) {
  /* ────────────────────────────────────────────────────────── */
  /* 1.  Read HTTP Basic-Auth header                           */
  /* ────────────────────────────────────────────────────────── */
  const auth  = request.headers.get('authorization') || '';
  const [, b64 = ''] = auth.split(' ');
  const [u, p] = atob(b64).split(':');

  /* ────────────────────────────────────────────────────────── */
  /* 2.  Grant access if credentials match                     */
  /* ────────────────────────────────────────────────────────── */
  if (u === USER && p === PASS) {
    /* build absolute URL to the original static asset */
    const url = new URL(request.url);

    /* forward the request, ADD the x-internal flag so the
       rewrite rule in vercel.json skips this second pass     */
    const proxied = await fetch(url.pathname, {
      headers: { 'x-internal': '1' }      //  ← loop-breaker
    });

    /* copy status & headers so CSS / fonts keep correct types */
    const headers = new Headers(proxied.headers);
    return new Response(proxied.body, { status: proxied.status, headers });
  }

  /* ────────────────────────────────────────────────────────── */
  /* 3.  Otherwise ask for user/password                       */
  /* ────────────────────────────────────────────────────────── */
  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Preview"' }
  });
}