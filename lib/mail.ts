import { Resend } from "resend";
import nodemailer from "nodemailer"
const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA code: ${token}</p>`,
    });
};

export const sendEmailVerifictionToken = async (
    email: string,
    token: string
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;
    console.log({ confirmLink, email });
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    });
};

export const sendEmailResetPasswordToken = async (
    email: string,
    token: string
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;
    console.log({ resetLink, email });
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "reset password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });
};

export const sendEmailTicketCreate = async (ticketId: string, ticketname: string, email: string) => {

    console.log(process.env.RESEND_API_KEY, domain)
    const ticketRoute = `${domain}/private/tickets/${ticketId}/detail`;
    try {
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: `tiket ${ticketname} harus segera dikerjakan `,
            html: `<p>Klik <a href="${ticketRoute}">disini</a> untuk menuju ke halaman tiket.</p>`,
        });
    } catch (error) {
        console.log(error)
    }

}

export interface SendMailTestParams {
    email: string;
    ticketName: string;
    ticketId: string | number;
}


export const sendMailtest = async ({ email, ticketName, ticketId }: SendMailTestParams) => {
    const ticketRoute = `${domain}/private/tickets/${ticketId}/detail`;

    const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
        ignoreTLS: true,
    });

    await transporter.sendMail({
        from: '"Helpdesk System" <no-reply@example.com>',
        to: email,
        subject: `Ticket Harus Segera diselesaikan : ${ticketName}`,
        text: `Tiket "${ticketName}" (ID: ${ticketId}) telah dikirim.`,
        html: `<p>Klik <a href="${ticketRoute}">disini</a> untuk menuju ke halaman tiket.</p>`,
    });
};
