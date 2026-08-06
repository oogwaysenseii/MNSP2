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
  const apiKey = getApiKey('contact');
  if (!apiKey) return serviceUnavailable();

  try {
    const body = await req.json();

    // Bots fill hidden fields; humans never see this one.
    if (String(body.company ?? '').trim()) {
      return Response.json({ success: true });
    }

    const name = String(body.name ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();
    const projectType = String(body.projectType ?? '').trim();

    if (!name) {
      return Response.json(
        { success: false, error: 'Zadajte prosím vaše meno.' },
        { status: 400 },
      );
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

    if (rateLimited(req, 'contact')) return tooManyRequests();

    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: 'MNSP <noreply@form.mnsp.sk>',
      to: 'info@mnsp.sk',
      replyTo: email || undefined,
      subject: `Nový dopyt - ${escapeHtml(name)}`,
      html: `
        <h2>Nový dopyt - MNSP</h2>
        <p><strong>Meno:</strong> ${escapeHtml(name)}</p>
        <p><strong>Telefón:</strong> ${escapeHtml(phone) || 'Neuvedený'}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email) || 'Neuvedený'}</p>
        <p><strong>Typ projektu:</strong> ${escapeHtml(projectType) || 'Neuvedený'}</p>
        <p><strong>Správa:</strong></p>
        <p>${escapeMultiline(message) || '<em>Bez správy</em>'}</p>
      `,
    });

    if (result.error) {
      console.error('[contact] resend error', result.error);
      return Response.json(
        { success: false, error: 'Správu sa nepodarilo odoslať.' },
        { status: 502 },
      );
    }

    return Response.json({ success: true, id: result.data?.id });
  } catch (err) {
    console.error('[contact]', err);
    return Response.json(
      { success: false, error: 'Nastala chyba. Skúste to znova.' },
      { status: 500 },
    );
  }
}
