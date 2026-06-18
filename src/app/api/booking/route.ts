import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/bookingSchema";
import { internalLeadEmail, guestConfirmationEmail } from "@/emails/templates";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  if (!process.env.SMTP_HOST) {
    console.error("Booking email not sent: SMTP_HOST is not set in .env.local");
    return NextResponse.json(
      { ok: false, error: "Email is not configured yet. Please use WhatsApp for now." },
      { status: 503 },
    );
  }

  const inbox = process.env.BOOKING_INBOX;
  if (!inbox) {
    console.error("Booking email not sent: BOOKING_INBOX is not set in .env.local");
    return NextResponse.json(
      { ok: false, error: "Email is not configured yet. Please use WhatsApp for now." },
      { status: 503 },
    );
  }

  const lead = internalLeadEmail(data);
  const guest = guestConfirmationEmail(data);

  try {
    await Promise.all([
      sendMail({
        to: inbox,
        replyTo: data.email,
        subject: lead.subject,
        html: lead.html,
        text: lead.text,
      }),
      sendMail({
        to: data.email,
        subject: guest.subject,
        html: guest.html,
        text: guest.text,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again or contact us on WhatsApp." },
      { status: 500 },
    );
  }
}
