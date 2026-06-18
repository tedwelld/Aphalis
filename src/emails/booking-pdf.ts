import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import type { BookingInput } from "@/lib/bookingSchema";
import { siteConfig } from "@/lib/siteConfig";

function esc(s = ""): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function generateBookingPdf(data: BookingInput): Buffer {
  const doc = new PDFDocument({ margin: 50, size: "A4" });
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(chunk));

  const gold = "#c8a24b";
  const goldDark = "#a8842f";
  const gray = "#6b6b66";
  const black = "#1a1a1a";

  function sectionTitle(y: number, text: string): number {
    doc.fillColor(goldDark).fontSize(11).font("Helvetica-Bold").text(text, 50, y, { continued: false });
    doc.moveTo(50, y + 16).lineTo(545, y + 16).strokeColor(gold).lineWidth(1).stroke();
    return y + 24;
  }

  function field(label: string, value: string | undefined, y: number): number {
    if (!value) return y;
    doc.fillColor(gray).fontSize(10).font("Helvetica").text(label, 50, y);
    doc.fillColor(black).fontSize(11).font("Helvetica").text(value, 180, y);
    return y + 18;
  }

  // --- Logo ---
  let logoY = 50;
  try {
    const logoPath = path.join(process.cwd(), "public", "indlulamitihilogo.png");
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, logoY, { height: 32 });
      logoY += 40;
    }
  } catch {
    // fall through to text header
  }

  // --- Header ---
  doc.fillColor(gold).fontSize(24).font("Helvetica-Bold").text("Indlulamithi", 50, logoY, { continued: true });
  doc.fillColor(goldDark).fontSize(24).font("Helvetica").text(" Safaris & Tours");

  const contactY = logoY + 30;
  doc.fillColor(gray).fontSize(10).font("Helvetica").text(siteConfig.address, 50, contactY);
  doc.fillColor(gray).fontSize(10).font("Helvetica").text(siteConfig.email, 50, contactY + 14);
  doc.fillColor(gray).fontSize(10).font("Helvetica").text(siteConfig.phoneDisplay, 50, contactY + 28);

  // Gold rule
  const ruleY = contactY + 44;
  doc.moveTo(50, ruleY).lineTo(545, ruleY).strokeColor(gold).lineWidth(2).stroke();

  // --- Title ---
  const titleY = ruleY + 20;
  doc.fillColor(black).fontSize(18).font("Helvetica-Bold").text("Booking Enquiry", 50, titleY);
  doc.fillColor(gray).fontSize(10).font("Helvetica").text(`Received: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`, 50, titleY + 22);
  doc.fillColor(gray).fontSize(10).font("Helvetica").text(`Reference: ${Date.now().toString(36).toUpperCase()}`, 50, titleY + 36);

  // --- Customer Details ---
  let y = sectionTitle(titleY + 56, "Customer Details");
  y = field("Full Name", data.name, y);
  y = field("Email", data.email, y);
  y = field("Phone", data.phone || undefined, y);

  // --- Booking Details ---
  y = sectionTitle(Math.max(y + 8, titleY + 120), "Booking Details");
  y = field("Tour / Interest", data.tour || "To be discussed", y);
  y = field("Preferred Dates", data.dates || "Flexible", y);
  y = field("Guests", data.guests || "—", y);

  // --- Message ---
  if (data.message) {
    y = sectionTitle(Math.max(y + 8, titleY + 180), "Message");
    doc.fillColor(black).fontSize(11).font("Helvetica").text(data.message, 50, y, { width: 495, align: "left" });
    const textHeight = doc.heightOfString(data.message, { width: 495 });
    y += textHeight + 12;
  }

  // --- Footer ---
  const footerY = Math.max(y + 40, 700);
  doc.moveTo(50, footerY).lineTo(545, footerY).strokeColor(gold).lineWidth(1).stroke();
  doc.fillColor(gray).fontSize(8).font("Helvetica").text(siteConfig.name, 50, footerY + 10, { align: "center", width: 495 });
  doc.fillColor(gray).fontSize(8).font("Helvetica").text(`${siteConfig.address} · ${siteConfig.email} · ${siteConfig.phoneDisplay}`, 50, footerY + 24, { align: "center", width: 495 });

  doc.end();

  return Buffer.concat(chunks);
}
