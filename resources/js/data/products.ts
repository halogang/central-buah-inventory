export interface Product {
  id: string;
  name: string;
  image?: string;
  thumbnail_url?: string;
  stock: number;
  unit: string;
  price: number;
}

export interface CartItem {
  product: Product;
  qty: number;
  customPrice: number | null;
}

export type PaymentMethod = "tunai" | "transfer" | "qris";

export const formatRupiah = (amount: number): string => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};
