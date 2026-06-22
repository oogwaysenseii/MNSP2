import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    const body = await req.json();

    try {
        await resend.emails.send({
            from: 'MNSP <noreply@contact.mnsp.sk>',
            to: 'info@mnsp.sk',
            subject: `Nový dopyt - ${body.name}`,
            html: `
        <h2>Nový dopyt z webu</h2>

        <p><strong>Meno:</strong> ${body.name}</p>
        <p><strong>Telefón:</strong> ${body.phone}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Typ projektu:</strong> ${body.projectType}</p>

        <p><strong>Správa:</strong></p>
        <p>${body.message}</p>
      `,
        });

        return Response.json({ success: true });
    } catch (error) {
        return Response.json(
            { success: false },
            { status: 500 }
        );
    }
}