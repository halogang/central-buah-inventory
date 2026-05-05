export interface PosItem {
    id: number;
    item_id?: number;
    item_name: string;
    unit: string;
    quantity: number;
    base_price: number;
    price: number;
    total: number;
}

export interface PosData {
    id: number;
    pos_number: string;
    payment_method: string;
    total: number;
    paid_amount: number;
    change_amount: number;
    created_at: string;
    type: string;
    charge?: number;
    subtotal?: number;
    discount?: number;
    tax?: number;
    pos_items: PosItem[];
}
