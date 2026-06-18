import type { BookingInput } from "@/lib/bookingSchema";
import { siteConfig } from "@/lib/siteConfig";

export async function generateBookingPdf(data: BookingInput): Promise<Buffer> {
  const pdfmake = await import("pdfmake");
  const vfs = await import("pdfmake/build/vfs_fonts");

  pdfmake.default.vfs = vfs.default;

  pdfmake.default.fonts = {
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Medium.ttf",
      italics: "Roboto-Italic.ttf",
      bolditalics: "Roboto-MediumItalic.ttf",
    },
  };

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const ref = now.getTime().toString(36).toUpperCase();

  const fieldRow = (label: string, value: string) => [
    { text: label, fontSize: 9, color: "#6b6b66", width: 120, margin: [0, 3, 0, 3] },
    { text: value, fontSize: 10, bold: true, color: "#1a1a1a", width: "*", margin: [0, 3, 0, 3] },
  ];

  const separator = () => ({
    canvas: [{ type: "line", x1: 0, y1: 0, x2: 495, y2: 0, lineWidth: 1, lineColor: "#c8a24b" }],
    margin: [0, 0, 0, 6],
  });

  const sectionTitle = (text: string) => ({
    text,
    fontSize: 11,
    bold: true,
    color: "#a8842f",
    margin: [0, 8, 0, 2],
  });

  const docDefinition: any = {
    defaultStyle: { font: "Roboto" },
    pageSize: "A4",
    pageMargins: [50, 50, 50, 80],
    content: [
      {
        text: [
          { text: "Indlulamithi ", fontSize: 22, bold: true, color: "#c8a24b" },
          { text: "Safaris & Tours", fontSize: 22, color: "#a8842f" },
        ],
        margin: [0, 0, 0, 4],
      },
      {
        stack: [
          { text: siteConfig.address, fontSize: 9, color: "#6b6b66" },
          { text: siteConfig.email, fontSize: 9, color: "#6b6b66" },
          { text: siteConfig.phoneDisplay, fontSize: 9, color: "#6b6b66" },
        ],
        margin: [0, 0, 0, 8],
      },
      separator(),
      { text: "Booking Enquiry", fontSize: 18, bold: true, color: "#1a1a1a", margin: [0, 0, 0, 4] },
      { text: `Received: ${dateStr}`, fontSize: 9, color: "#6b6b66", margin: [0, 0, 0, 2] },
      { text: `Reference: ${ref}`, fontSize: 9, color: "#6b6b66", margin: [0, 0, 0, 10] },

      sectionTitle("Customer Details"),
      separator(),
      {
        table: { widths: [120, "*"], body: [fieldRow("Full Name", data.name), fieldRow("Email", data.email), ...(data.phone ? [fieldRow("Phone", data.phone)] : [])] },
        layout: "noBorders",
        margin: [0, 0, 0, 6],
      },

      sectionTitle("Booking Details"),
      separator(),
      {
        table: {
          widths: [120, "*"],
          body: [
            fieldRow("Tour / Interest", data.tour || "To be discussed"),
            fieldRow("Preferred Dates", data.dates || "Flexible"),
            fieldRow("Guests", data.guests || "—"),
          ],
        },
        layout: "noBorders",
        margin: [0, 0, 0, 6],
      },

      ...(data.message
        ? [
            sectionTitle("Message"),
            separator(),
            { text: data.message, fontSize: 10, color: "#1a1a1a", margin: [0, 0, 0, 8] },
          ]
        : []),
    ],
    footer: (currentPage: number, pageCount: number) => ({
      stack: [
        {
          canvas: [{ type: "line", x1: 50, y1: 0, x2: 545, y2: 0, lineWidth: 1, lineColor: "#c8a24b" }],
          margin: [0, 0, 0, 4],
        },
        { text: siteConfig.name, fontSize: 8, color: "#6b6b66", alignment: "center" },
        { text: `${siteConfig.address} · ${siteConfig.email} · ${siteConfig.phoneDisplay}`, fontSize: 8, color: "#6b6b66", alignment: "center" },
        { text: `Page ${currentPage} of ${pageCount}`, fontSize: 8, color: "#6b6b66", alignment: "center", margin: [0, 4, 0, 0] },
      ],
      margin: [50, 0, 50, 20],
    }),
  };

  const pdfDoc = pdfmake.default.createPdf(docDefinition);

  return new Promise<Buffer>((resolve, reject) => {
    pdfDoc.getBuffer((buffer: Buffer) => {
      if (buffer) resolve(buffer);
      else reject(new Error("PDF generation returned empty buffer"));
    });
  });
}
