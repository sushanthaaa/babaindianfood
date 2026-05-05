import crypto from 'node:crypto';
export const adminCookieName = 'baba_admin_session';
const getSecret = () => process.env.SESSION_SECRET || 'dev-secret-change-me';
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}
export function isValidAdminPassword(password: string): boolean {
  const expectedHash = process.env.ADMIN_PASSWORD_HASH || '';
  const incomingHash = hashPassword(password);
  if (!expectedHash) return false;
  return expectedHash === incomingHash;
}
export function createSessionToken(email: string): string {
  const payload = `${email}|${Date.now()}`;
  const sig = crypto.createHmac('sha256', getSecret()).update(payload).digest('hex');
  return Buffer.from(`${payload}|${sig}`).toString('base64url');
}
export function verifySessionToken(token: string): boolean {
  try {
    const [email, ts, sig] = Buffer.from(token, 'base64url').toString('utf8').split('|');
    const expected = crypto.createHmac('sha256', getSecret()).update(`${email}|${ts}`).digest('hex');
    return expected === sig && Date.now() - Number(ts) < 1000 * 60 * 60 * 24 * 7;
  } catch {
    return false;
  }
}
