import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingSchema } from "@/lib/bookingSchema";
import { internalLeadEmail, guestConfirmationEmail } from "@/emails/templates";

/**
 * Email booking flow. Validates the enquiry, then sends TWO emails via Resend:
 *  1. Internal lead -> BOOKING_INBOX (replyTo = guest, so staff can reply directly)
 *  2. Branded auto-reply -> the guest
 *
 * Required env: RESEND_API_KEY, EMAIL_FROM, BOOKING_INBOX
 */
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

  // Honeypot: if the hidden field is filled, silently accept (don't tip off bots).
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const inbox = process.env.BOOKING_INBOX;

  if (!apiKey || !from || !inbox) {
    console.error("Booking email not sent: missing RESEND_API_KEY / EMAIL_FROM / BOOKING_INBOX");
    return NextResponse.json(
      { ok: false, error: "Booking email is not configured yet. Please use WhatsApp for now." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const lead = internalLeadEmail(data);
  const guest = guestConfirmationEmail(data);

  try {
    const [leadRes, guestRes] = await Promise.all([
      resend.emails.send({
        from,
        to: inbox,
        replyTo: data.email,
        subject: lead.subject,
        html: lead.html,
        text: lead.text,
      }),
      resend.emails.send({
        from,
        to: data.email,
        subject: guest.subject,
        html: guest.html,
        text: guest.text,
      }),
    ]);

    if (leadRes.error || guestRes.error) {
      console.error("Resend error:", leadRes.error, guestRes.error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your enquiry. Please try WhatsApp or email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again or contact us on WhatsApp." },
      { status: 500 },
    );
  }
}
