export interface Material {
  id: string;
  cover: string;
  title: string;
  description: string;
  price: number | string;
  pdf?: {
    data: ArrayBuffer | Uint8Array;
  };
  pdfUrl?: string;
  [key: string]: any;
}

export interface CartItem {
  id: string;
  material: Material;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (material: Material) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}