import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = await resend.emails.send({
            from: 'MNSP <noreply@contact.mnsp.sk>',
            to: 'info@mnsp.sk',
            subject: `Nový dopyt - ${body.name}`,
            html: `
        <h2>Nový dopyt z webu</h2>
        <p><strong>Meno:</strong> ${body.name}</p>
      `,
        });

        console.log("RESEND RESULT:", result);

        return Response.json({
            success: true,
            result,
        });
    } catch (error) {
        console.error("RESEND ERROR:", error);

        return Response.json(
            {
                success: false,
                error: String(error),
            },
            { status: 500 }
        );
    }
}