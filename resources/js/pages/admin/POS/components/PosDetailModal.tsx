import {formatCurrency} from "@/helpers/format";
import {Printer, X} from "lucide-react";

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
    const printReceipt = (pos : Pos) => {
        const receiptWindow = window.open("", "_blank", "width=400,height=600");
        if (!receiptWindow) 
            return;
        
        const itemsHtml = pos
            .pos_items
            .map(
                (item) => `
                <div class="item">
                    <div>${item.item_name} x${item.quantity}</div>
                    <div>${item.total.toLocaleString("id-ID")}</div>
                </div>
            `
            )
            .join("");

        receiptWindow
            .document
            .write(
                `
        <html>
            <head>
                <title>Struk</title>
                <style>
                    @media print {
                        @page {
                            size: A4;
                            margin: 0;
                        }

                        body {
                            margin: 0;
                            padding: 0;
                        }
                    }

                    body {
                        font-family: monospace;
                        background: white;
                    }

                    .container {
                        padding: 50px 30px;
                        margin: 0 auto;   /* 🔥 center di A4 */
                    }

                    .center {
                        text-align: center;
                    }

                    .logo img {
                        width: 132px; /* 🔥 BESARKAN LOGO */
                    }

                    .title {
                        font-size: 50px;
                        font-weight: bold;
                    }

                    .subtitle {
                        font-size: 44px;
                    }

                    .divider {
                        border-top: 2px dashed #000;
                        margin: 10px 0;
                    }

                    .item {
                        display: flex;
                        justify-content: space-between;
                        font-size: 38px; /* 🔥 NAIKKAN */
                        margin: 6px 0;
                    }

                    .total {
                        font-weight: bold;
                        font-size: 40px;
                    }

                    .meta {
                        font-size: 38px;
                        margin-top: 20px;
                        display: flex;
                        justify-content: space-between;
                    }
                </style>
            </head>

            <body>
                <div class="container">
                    <div class="center">
                        <div class="logo">
                            <img src="/logo.png" />
                        </div>
                        <div class="title">Central Buah</div>
                        <div class="subtitle">POS Kasir</div>
                    </div>

                    <div class="meta">
                        <div>${new Date(pos.created_at).toLocaleString("id-ID")}</div>
                        <div>${pos.pos_number}</div>
                    </div>

                    <div class="divider"></div>

                    ${itemsHtml}

                    <div class="divider"></div>
                    <div class="item">
                        <div>biaya tambahan</div>
                        <div>${formatCurrency(pos.charge)}</div>
                    </div>
                    <div class="divider"></div>

                    <div class="item total">
                        <div>Total</div>
                        <div>${formatCurrency(pos.total)}</div>
                    </div>

                    <div class="item">
                        <div>${pos.payment_method}</div>
                        <div>${formatCurrency(pos.paid_amount)}</div>
                    </div>

                    <div class="item">
                        <div>Kembali</div>
                        <div>${formatCurrency(pos.change_amount)}</div>
                    </div>

                    <div class="divider"></div>

                    <div class="center" style="font-size: 38px">
                        Terima Kasih 🙏
                    </div>
                </div>
            </body>
        </html>
        `
            );

        receiptWindow
            .document
            .close();
        receiptWindow.focus();
        receiptWindow.print();
    };
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
                        <div className="font-bold">
                            {
                                new Date(data.created_at).toLocaleString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })
                            }
                        </div>
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
                                <span>{formatCurrency(data.subtotal)}</span>
                            </div>
                        )
                    }

                    {/* Discount */}
                    {
                        data.discount && (
                            <div className="flex justify-between text-red-500">
                                <span>Diskon</span>
                                <span>{formatCurrency(data.discount)}</span>
                            </div>
                        )
                    }

                    {/* Charge */}
                    {
                        <div className="flex justify-between">
                                <span className="text-muted-foreground">Biaya Tambahan</span>
                                <span>{formatCurrency(data.charge)}</span>
                            </div>
                    }

                    {/* Divider */}
                    <div className="border-t my-2"/> {/* Total */}
                    <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span>{formatCurrency(data.total)}</span>
                    </div>

                    {/* Payment */}
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Bayar</span>
                        <span>{formatCurrency(data.paid_amount)}</span>
                    </div>

                    {/* Change */}
                    <div className="flex justify-between font-semibold">
                        <span>Kembalian</span>
                        <span className="text-green-600">
                            {formatCurrency(data.change_amount)}
                        </span>
                    </div>

                </div>
                <button
                    onClick={() => printReceipt(data)}
                    className="mt-6 w-full h-11 rounded-xl bg-accent text-accent-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer">
                    <Printer size={15}/>
                    Cetak Struk
                </button>

            </div>
        </div>
    );
}