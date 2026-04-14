import {X} from "lucide-react";

interface PosItem {
    id: number;
    item_name: string;
    quantity: number;
    price: number;
    total: number;
    unit: string;
}

interface Pos {
    id: number;
    pos_number: string;
    payment_method: string;
    total: number;
    discount?: number;
    charge?: number;
    subtotal?: number;
    paid_amount: number;
    change_amount: number;
    created_at: string;
    type: string;
    pos_items: PosItem[];
}

export default function PosDetailModal({data, onClose} : {
    data: Pos;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* overlay */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose}/> {/* modal */}
            <div
                className="relative bg-background w-full max-w-lg rounded-xl shadow-lg p-5">

                {/* header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Detail Transaksi</h2>
                    <button onClick={onClose}>
                        <X className="size-5"/>
                    </button>
                </div>

                {/* info */}
                <div className="text-sm grid grid-cols-2 mb-4">
                    <div>
                        <span className="text-xs">No POS:</span>
                        <div className="font-bold">{data.pos_number}</div>
                    </div>
                    <div>
                        <span className="text-xs">Tanggal:</span>
                        <div className="font-bold">{new Date(data.created_at).toLocaleString("id-ID")}</div>
                    </div>
                    <div>
                        <span className="text-xs">Metode:</span>
                        <div className="font-bold">{data.payment_method}</div>
                    </div>
                    <div>
                        <span className="text-xs">Type:</span>
                        <div
                            className="w-fit px-2 py-1 text-xs rounded bg-primary/10 text-primary capitalize">
                            {data.type}
                        </div>
                    </div>
                </div>

                {/* items */}
                <div className="border rounded-lg overflow-hidden mb-4">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="p-2 text-left">Item</th>
                                <th className="p-2 text-center">Qty</th>
                                <th className="p-2 text-right">Harga</th>
                                <th className="p-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data
                                    .pos_items
                                    .map((item) => (
                                        <tr key={item.id} className="border-t">
                                            <td className="p-2">{item.item_name}</td>
                                            <td className="p-2 text-center">{item.quantity}
                                                {item.unit}</td>
                                            <td className="p-2 text-right">
                                                Rp {
                                                    item
                                                        .price
                                                        .toLocaleString("id-ID")
                                                }
                                            </td>
                                            <td className="p-2 text-right">
                                                Rp {
                                                    item
                                                        .total
                                                        .toLocaleString("id-ID")
                                                }
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* summary */}
                <div className="text-sm space-y-2 border-t pt-3">

                    {/* Subtotal */}
                    {
                        data.subtotal && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span>Rp {Number(data.subtotal).toLocaleString("id-ID")}</span>
                            </div>
                        )
                    }

                    {/* Discount */}
                    {
                        data.discount && (
                            <div className="flex justify-between text-red-500">
                                <span>Diskon</span>
                                <span>- Rp {Number(data.discount).toLocaleString("id-ID")}</span>
                            </div>
                        )
                    }

                    {/* Charge */}
                    {
                        data.charge && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Biaya Tambahan</span>
                                <span>Rp {Number(data.charge).toLocaleString("id-ID")}</span>
                            </div>
                        )
                    }

                    {/* Divider */}
                    <div className="border-t my-2"/> {/* Total */}
                    <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span>Rp {
                                data
                                    .total
                                    .toLocaleString("id-ID")
                            }</span>
                    </div>

                    {/* Payment */}
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Bayar</span>
                        <span>Rp {
                                data
                                    .paid_amount
                                    .toLocaleString("id-ID")
                            }</span>
                    </div>

                    {/* Change */}
                    <div className="flex justify-between font-semibold">
                        <span>Kembalian</span>
                        <span className="text-green-600">
                            Rp {
                                data
                                    .change_amount
                                    .toLocaleString("id-ID")
                            }
                        </span>
                    </div>

                </div>

            </div>
        </div>
    );
}