import { products } from "./products";

export type DeliveryType = "in" | "out";
export type DeliveryStatus = "draft" | "sent" | "done";

export interface DeliveryItem {
  item_id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface DeliveryOrder {
  id: string;
  do_number: string;
  date: string; // YYYY-MM-DD
  type: DeliveryType;
  supplier_name?: string;
  customer_name?: string;
  sender_name: string;
  receiver_name: string;
  note: string;
  status: DeliveryStatus;
  items: DeliveryItem[];
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

export const calcTotalWeight = (items: DeliveryItem[]) =>
  items.reduce((s, i) => s + i.quantity, 0);

export const calcTotalAmount = (items: DeliveryItem[]) =>
  items.reduce((s, i) => s + i.quantity * i.price, 0);

export const fruitOptions = products.map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
}));

// Mock data
export const initialDeliveryOrders: DeliveryOrder[] = [
  {
    id: "do-1",
    do_number: "DO-2026-001",
    date: "2026-03-02",
    type: "in",
    supplier_name: "PT Segar Nusantara",
    sender_name: "Budi Santoso",
    receiver_name: "Andi Wijaya",
    note: "Pengiriman minggu pertama",
    status: "done",
    items: [
      { item_id: "1", name: "Mangga Harum Manis", quantity: 50, price: 22000 },
      { item_id: "3", name: "Semangka Merah", quantity: 100, price: 8000 },
    ],
  },
  {
    id: "do-2",
    do_number: "DO-2026-002",
    date: "2026-03-05",
    type: "out",
    customer_name: "Supermarket Maju Jaya",
    sender_name: "Andi Wijaya",
    receiver_name: "Siti Rahayu",
    note: "Kirim pagi sebelum jam 8",
    status: "sent",
    items: [
      { item_id: "2", name: "Apel Fuji Import", quantity: 30, price: 55000 },
      { item_id: "5", name: "Jeruk Mandarin", quantity: 20, price: 45000 },
    ],
  },
  {
    id: "do-3",
    do_number: "DO-2026-003",
    date: "2026-03-10",
    type: "in",
    supplier_name: "CV Buah Segar",
    sender_name: "Rudi Hartono",
    receiver_name: "Andi Wijaya",
    note: "",
    status: "draft",
    items: [
      { item_id: "6", name: "Anggur Red Globe", quantity: 25, price: 60000 },
    ],
  },
  {
    id: "do-4",
    do_number: "DO-2026-004",
    date: "2026-03-15",
    type: "out",
    customer_name: "Toko Buah Berkah",
    sender_name: "Andi Wijaya",
    receiver_name: "Dedi Kurniawan",
    note: "Antar ke gudang belakang",
    status: "done",
    items: [
      { item_id: "4", name: "Pisang Cavendish", quantity: 20, price: 20000 },
      { item_id: "7", name: "Nanas Madu", quantity: 40, price: 15000 },
      { item_id: "8", name: "Pepaya California", quantity: 30, price: 12000 },
    ],
  },
  {
    id: "do-5",
    do_number: "DO-2026-005",
    date: "2026-03-22",
    type: "in",
    supplier_name: "PT Segar Nusantara",
    sender_name: "Budi Santoso",
    receiver_name: "Andi Wijaya",
    note: "Stok minggu ke-4",
    status: "draft",
    items: [
      { item_id: "1", name: "Mangga Harum Manis", quantity: 60, price: 23000 },
      { item_id: "2", name: "Apel Fuji Import", quantity: 40, price: 50000 },
    ],
  },
  {
    id: "do-6",
    do_number: "DO-2026-006",
    date: "2026-03-28",
    type: "out",
    customer_name: "Hotel Grand Mutiara",
    sender_name: "Andi Wijaya",
    receiver_name: "Lisa Permata",
    note: "Pesanan khusus event",
    status: "sent",
    items: [
      { item_id: "6", name: "Anggur Red Globe", quantity: 15, price: 65000 },
      { item_id: "1", name: "Mangga Harum Manis", quantity: 30, price: 25000 },
    ],
  },
  {
    id: "do-7",
    do_number: "DO-2026-007",
    date: "2026-03-30",
    type: "in",
    supplier_name: "CV Buah Segar",
    sender_name: "Rudi Hartono",
    receiver_name: "Andi Wijaya",
    note: "Restock akhir bulan",
    status: "draft",
    items: [
      { item_id: "3", name: "Semangka Merah", quantity: 80, price: 9000 },
      { item_id: "8", name: "Pepaya California", quantity: 50, price: 11000 },
    ],
  },
];
