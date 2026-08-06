import { Resend } from 'resend';
import {
  EMAIL_RE,
  PHONE_RE,
  escapeHtml,
  escapeMultiline,
  getApiKey,
  serviceUnavailable,
  rateLimited,
  tooManyRequests,
} from '@/src/lib/contactApi';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const apiKey = getApiKey('blog-contact');
  if (!apiKey) return serviceUnavailable();

  try {
    const body = await req.json();
    const phone = String(body.phone ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();
    const pageName = String(body.pageName ?? 'Blog').trim();
    const honeypot = String(body.company ?? '').trim();

    // Bots fill hidden fields; humans never see this one.
    if (honeypot) {
      return Response.json({ success: true });
    }

    if (!phone && !email) {
      return Response.json(
        { success: false, error: 'Zadajte telefón alebo e-mail.' },
        { status: 400 },
      );
    }
    if (email && !EMAIL_RE.test(email)) {
      return Response.json(
        { success: false, error: 'E-mail nemá správny tvar.' },
        { status: 400 },
      );
    }
    if (phone && !PHONE_RE.test(phone)) {
      return Response.json(
        { success: false, error: 'Telefónne číslo nemá správny tvar.' },
        { status: 400 },
      );
    }
    if (message.length > 5000) {
      return Response.json(
        { success: false, error: 'Správa je príliš dlhá.' },
        { status: 400 },
      );
    }

    if (rateLimited(req, 'blog-contact')) return tooManyRequests();

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: 'MNSP <noreply@form.mnsp.sk>',
      to: 'info@mnsp.sk',
      replyTo: email || undefined,
      subject: `Dopyt z blogu — ${pageName}`,
      html: `
        <h2>Nový dopyt z blogu</h2>
        <p><strong>Stránka:</strong> ${escapeHtml(pageName)}</p>
        <p><strong>Telefón:</strong> ${escapeHtml(phone) || 'Neuvedený'}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email) || 'Neuvedený'}</p>
        <p><strong>Správa:</strong></p>
        <p>${escapeMultiline(message) || '<em>Bez správy</em>'}</p>
      `,
    });

    if (result.error) {
      console.error('[blog-contact] resend error', result.error);
      return Response.json(
        { success: false, error: 'Správu sa nepodarilo odoslať.' },
        { status: 502 },
      );
    }

    return Response.json({ success: true, id: result.data?.id });
  } catch (err) {
    console.error('[blog-contact]', err);
    return Response.json(
      { success: false, error: 'Nastala chyba. Skúste to znova.' },
      { status: 500 },
    );
  }
}
