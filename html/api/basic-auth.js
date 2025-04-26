// api/basic-auth.js  (Edge Function)
export const config = { runtime: 'edge' };   // tell Vercel to run at the edge

const user = process.env.BASIC_USER;   // set in Vercel env-vars
const pass = process.env.BASIC_PASS;

export default async (request) => {
  const auth = request.headers.get('authorization') || '';
  const [, encoded = ''] = auth.split(' ');
  const [u, p] = atob(encoded).split(':');

  // allow if credentials match
  if (u === user && p === pass) {
    // forward the original request to the static file
    const url = new URL(request.url);
    const res  = await fetch(url.origin + url.pathname, request);
    // copy through headers so CSS/JS etc. still get correct types
    const headers = new Headers(res.headers);
    return new Response(res.body, { status: res.status, headers });
  }

  // otherwise ask for user/password
  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Preview"' }
  });
};