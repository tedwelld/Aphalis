import nodemailer from "nodemailer";

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing ${name} in .env.local`);
  return v;
}

export function createTransporter() {
  return nodemailer.createTransport({
    host: requireEnv("SMTP_HOST"),
    port: Number(process.env.SMTP_PORT ?? "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: requireEnv("SMTP_USER"),
      pass: requireEnv("SMTP_PASS"),
    },
  });
}

export type SendMailOptions = {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text: string;
  attachments?: { filename: string; content: Buffer }[];
};

export async function sendMail({ to, replyTo, subject, html, text, attachments }: SendMailOptions) {
  const transporter = createTransporter();
  const from = process.env.EMAIL_FROM ?? "bookings@indlulamithisafaris.com";

  await transporter.verify();
  console.log("[mail] SMTP connection verified");

  const info = await transporter.sendMail({
    from: `"Indlulamithi Safaris & Tours" <${from}>`,
    to,
    replyTo,
    subject,
    html,
    text,
    attachments,
  });

  console.log("[mail] Sent:", info.messageId);
  return info;
}
