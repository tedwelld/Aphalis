declare module "pdfmake" {
  interface PdfMake {
    vfs: Record<string, string>;
    fonts: Record<string, { normal: string; bold: string; italics: string; bolditalics: string }>;
    createPdf(docDefinition: any): {
      getBuffer(callback: (buffer: Buffer) => void): void;
    };
  }
  const pdfmake: PdfMake;
  export default pdfmake;
}

declare module "pdfmake/build/vfs_fonts" {
  const vfs: Record<string, string>;
  export default vfs;
}
