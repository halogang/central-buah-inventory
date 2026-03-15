export interface Product {
  id: string;
  name: string;
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

export const products: Product[] = [
  { id: "1", name: "Mangga Harum Manis", stock: 150, unit: "kg", price: 25000 },
  { id: "2", name: "Apel Fuji Import", stock: 80, unit: "kg", price: 55000 },
  { id: "3", name: "Semangka Merah", stock: 200, unit: "kg", price: 10000 },
  { id: "4", name: "Pisang Cavendish", stock: 45, unit: "sisir", price: 20000 },
  { id: "5", name: "Jeruk Mandarin", stock: 60, unit: "kg", price: 45000 },
  { id: "6", name: "Anggur Red Globe", stock: 35, unit: "kg", price: 65000 },
  { id: "7", name: "Nanas Madu", stock: 90, unit: "biji", price: 15000 },
  { id: "8", name: "Pepaya California", stock: 120, unit: "kg", price: 12000 },
];

export const formatRupiah = (amount: number): string => {
  return `Rp ${amount.toLocaleString("id-ID")}`;
};
