export interface Material {
  id: string;
  cover: string;
  title: string;
  description: string;
  price: number | string;
  pdf?: string;
  pdfUrl?: string;
  isDraft?: boolean | string | number;
  publish_at?: string | Date | null;
  publishAt?: Date; // Backend is using this field name
  stripePriceId?: string;
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