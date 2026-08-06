/**
 * Shared helpers for the contact form API routes.
 *
 * The routes previously fell back to `new Resend(process.env.RESEND_API_KEY || 're_123456789')`.
 * That fake key means a deploy with a missing env var still *looks* configured:
 * the send fails at the provider, the visitor sees a generic error, and nothing
 * in the logs says why. Better to fail loudly on the server and clearly for the
 * visitor.
 *
 * Field values also went into the email HTML unescaped.
 */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^[+\d][\d\s()/-]{5,19}$/;

/** Escape user input before it goes anywhere near an HTML email body. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Escape and convert newlines, for multi-line fields. */
export function escapeMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\n/g, '<br />');
}

export function getApiKey(routeName: string): string | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error(`[${routeName}] RESEND_API_KEY is not set`);
    return null;
  }
  return key;
}

export function serviceUnavailable() {
  return Response.json(
    { success: false, error: 'Služba je dočasne nedostupná. Skúste to prosím neskôr.' },
    { status: 503 },
  );
}

/**
 * Very light in-memory rate limit. On serverless this only applies per running
 * instance, so treat it as a speed bump rather than a real defence — if spam
 * becomes a problem, add Turnstile or hCaptcha in front of the form.
 */
const buckets = new Map<string, Map<string, number>>();

export function rateLimited(req: Request, routeName: string, windowMs = 30_000): boolean {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  let bucket = buckets.get(routeName);
  if (!bucket) {
    bucket = new Map();
    buckets.set(routeName, bucket);
  }

  const now = Date.now();
  const last = bucket.get(ip);
  if (last && now - last < windowMs) return true;

  bucket.set(ip, now);
  if (bucket.size > 500) {
    for (const [key, ts] of bucket) if (now - ts > windowMs) bucket.delete(key);
  }
  return false;
}

export function tooManyRequests() {
  return Response.json(
    { success: false, error: 'Skúste to prosím o chvíľu.' },
    { status: 429 },
  );
}
