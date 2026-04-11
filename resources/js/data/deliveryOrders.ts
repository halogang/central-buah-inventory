import { products } from "./products";

export type DeliveryType = "in" | "out";
export type DeliveryStatus = "draft" | "sent" | "done";

export interface DeliveryFormPayload {
  id?: string;
  type: DeliveryType;
  date: string;
  do_number: string | null;
  sender: User | null;
  status: DeliveryStatus | string | null;

  supplier_id: string | null;
  customer_id: string | null;
  sender_id: string | null;

  sender_name: string;
  receiver_name: string;
  note: string;

  items: DeliveryItem[];

  meta?: {
    isAutoFlow?: boolean;
  };
}

export interface DeliveryItem {
  item_id: string;
  item?: Item;
  name: string;
  quantity: number;
  bad_stock: number;
  cart_id: number | null;
  cart?: Cart | null;
  cart_qty: number;
  cart_weight: number;
  price: number;
}

export interface DeliveryOrder {
  id: string;
  do_number: string;
  date: string; // YYYY-MM-DD
  type: DeliveryType;
  supplier_name?: string;
  customer_name?: string;
  supplier_id?: string;
  supplier: Supplier | null;
  customer: Customer | null;
  customer_id?: string;
  sender: User | null;
  sender_id?: string;
  sender_name: string;
  receiver_name: string;
  note: string;
  status: DeliveryStatus;
  items: DeliveryItem[];
}

export interface Item {
  id: number;
  name: string;
  selling_price: number;
  purchase_price: number;
  stock: number;
  unit_code: string;
  image: string;
  image_url: string;
  unit: Unit
}

export interface Customer {
  id: number;
  name: string;
}

export interface Supplier {
  id: number;
  name: string;
}

export interface Cart {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}

export interface Unit {
  id: number;
  unit_code: string;
}

export const getEventColor = (type: DeliveryType) =>
  type === "in" ? "emerald" : "blue";

export const getStatusColor = (status: DeliveryStatus) => {
  switch (status) {
    case "draft": return "gray";
    case "sent": return "amber";
    case "done": return "emerald";
  }
};

export const getStatusLabel = (status: DeliveryStatus) => {
  switch (status) {
    case "draft": return "Draft";
    case "sent": return "Dikirim";
    case "done": return "Selesai";
  }
};

// export const calcTotalWeight = (items: DeliveryItem[]) =>
//   items.reduce((s, i) => s + i.quantity, 0);
export const calcTotalWeight = (items: DeliveryItem[]) =>
  items.reduce((sum, item) => {
    const qty = Number(item.quantity || 0);
    const cartQty = Number(item.cart_qty || 0);
    const cartWeight = Number(item.cart_weight || 0);

    return sum + qty + (cartQty * cartWeight);
  }, 0); 

export const calcTotalAmount = (items: DeliveryItem[]) =>
  items.reduce((s, i) => s + i.quantity * i.price, 0);

export const fruitOptions = products.map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
}));