import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = await resend.emails.send({
            from: 'MNSP <noreply@form.mnsp.sk>',
            to: 'info@mnsp.sk',
            subject: `Rýchly dopyt - ${body.pageName}`,
            html: `
        <h2>Nový rýchly dopyt</h2>

        <p><strong>Stránka:</strong> ${body.pageName}</p>
        <p><strong>Telefón:</strong> ${body.phone}</p>
        <p><strong>Email:</strong> ${body.email || 'Neuvedený'}</p>
      `,
        });

        if (result.error) {
            return Response.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        return Response.json({
            success: true,
            id: result.data?.id,
        });
    } catch {
        return Response.json(
            { success: false },
            { status: 500 }
        );
    }
}