import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = await resend.emails.send({
            from: 'MNSP <noreply@form.mnsp.sk>',
            to: 'info@mnsp.sk',
            subject: `Nový dopyt - ${body.name}`,
            html: `
        <h2>Nový dopyt z webu</h2>

        <p><strong>Meno:</strong> ${body.name}</p>
        <p><strong>Telefón:</strong> ${body.phone}</p>
        <p><strong>Email:</strong> ${body.email || 'Neuvedený'}</p>
        <p><strong>Typ projektu:</strong> ${body.projectType}</p>

        <p><strong>Správa:</strong></p>
        <p>${body.message || 'Bez správy'}</p>
      `,
        });

        if (result.error) {
            console.error('Resend error:', result.error);

            return Response.json(
                {
                    success: false,
                    error: result.error,
                },
                { status: 500 }
            );
        }

        return Response.json({
            success: true,
            id: result.data?.id,
        });
    } catch (error) {
        console.error('Contact form error:', error);

        return Response.json(
            {
                success: false,
                error: 'Failed to send email',
            },
            { status: 500 }
        );
    }
}