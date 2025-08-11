export interface Material {
  cover: string;
  title: string;
  description: string;
  pdf?: {
    data: ArrayBuffer | Uint8Array;
  };
  pdfUrl?: string;
  [key: string]: any;
}