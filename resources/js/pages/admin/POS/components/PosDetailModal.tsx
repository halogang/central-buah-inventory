import {formatCurrency, formatDecimal} from "@/helpers/format";
import {Printer, X} from "lucide-react";
import type { PosData } from "@/types/pos";

export default function PosDetailModal({data, onClose, onEdit, onDelete} : {
    data: PosData;
    onClose: () => void;
    onEdit?: (data: PosData) => void;
    onDelete?: (data: PosData) => void;
}) {
    const printReceipt = (pos : PosData) => {
        const receiptWindow = window.open("", "_blank", "width=400,height=600");
        if (!receiptWindow) 
            return;
        
        const itemsHtml = pos.pos_items
            .map((item) => {
                const linePrice =
                    item.price * item.quantity;

                const itemDiscount =
                    item.discount ?? 0;

                const finalPrice =
                    Math.max(
                        item.price - itemDiscount,
                        0
                    );

                const finalLine =
                    finalPrice * item.quantity;

                return `
                <div class="item">
                    <div>
                        ${item.item_name} x${formatDecimal(item.quantity)}
                    </div>
                    <div>
                        ${formatCurrency(linePrice)}
                    </div>
                </div>

                ${
                    itemDiscount > 0
                    ? `
                    <div class="sub-item discount">
                        <div>diskon item</div>
                        <div>- ${formatCurrency(itemDiscount)}</div>
                    </div>
                    `
                    : ""
                }

                <div class="sub-item final">
                    <div>subtotal</div>
                    <div>${formatCurrency(finalLine)}</div>
                </div>
                `;
            })
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

                    .sub-item {
                        display:flex;
                        justify-content:space-between;
                        font-size:30px;
                        margin:4px 0 4px 30px;
                    }

                    .final {
                        font-weight:bold;
                    }
                </style>
            </head>

            <body>
                <div class="container">
                    <div class="center">
                        <div class="logo">
                            <img src="/small_logo.jpg" />
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

                    ${
                    Number(pos.discount) > 0
                        ? `
                        <div class="item">
                        <div>Diskon Global</div>
                        <div>- ${formatCurrency(pos.discount)}</div>
                        </div>
                    `
                        : ""
                    }

                    ${
                    Number(pos.tax) > 0
                        ? `
                        <div class="item">
                        <div>Pajak</div>
                        <div>${formatCurrency(pos.tax)}</div>
                        </div>
                    `
                        : ""
                    }

                    ${
                    pos.type === "delivery"
                        ? `
                        <div class="item">
                        <div>Biaya Antar</div>
                        <div>${formatCurrency(pos.charge)}</div>
                        </div>
                    `
                        : ""
                    }

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
                className="relative bg-background w-full max-w-lg rounded-xl shadow-lg p-5 max-h-screen overflow-y-auto">

                {/* header */}
                <div className="flex justify-between items-center mb-4 gap-2">
                    <div>
                        <h2 className="text-lg font-semibold">Detail Transaksi</h2>
                        <div className="text-sm text-muted-foreground">{data.pos_number}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(data)}
                                className="rounded-xl border border-border px-3 py-2 text-xs font-semibold hover:bg-muted/50"
                            >
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(data)}
                                className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10"
                            >
                                Hapus
                            </button>
                        )}
                        <button onClick={onClose}>
                            <X className="size-5"/>
                        </button>
                    </div>
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
                <div className="border rounded-lg overflow-hidden mb-4 max-h-[40vh] overflow-y-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="p-2 text-left">Item</th>
                                <th className="p-2 text-center">Qty</th>
                                <th className="p-2 text-right">Harga</th>
                                <th className="p-2 text-right">Diskon</th>
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
                                            <td className="p-2 text-center">{formatDecimal(item.quantity)}
                                                {item.unit}</td>
                                            <td className="p-2 text-right">
                                                {formatCurrency(item.price)}
                                            </td>
                                            <td className="p-2 text-right text-red-500">
                                                {formatCurrency(
                                                    item.discount ?? 0
                                                )}
                                            </td>
                                            <td className="p-2 text-right">
                                                {formatCurrency(item.total)}
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>

                {/* summary */}
                <div className="text-sm space-y-2 border-t pt-3">

                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatCurrency(data.subtotal)}</span>
                    </div>

                    {Number(data.discount) > 0 && (
                        <div className="flex justify-between text-red-500">
                        <span>Diskon Global</span>
                        <span>- {formatCurrency(data.discount)}</span>
                        </div>
                    )}

                    {Number(data.tax) > 0 && (
                        <div className="flex justify-between">
                        <span>Pajak</span>
                        <span>{formatCurrency(data.tax)}</span>
                        </div>
                    )}

                    {data.type === "delivery" && (
                        <div className="flex justify-between">
                        <span>Biaya Antar</span>
                        <span>{formatCurrency(data.charge)}</span>
                        </div>
                    )}

                    <div className="border-t my-2"/>

                    <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span>{formatCurrency(data.total)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Bayar</span>
                        <span>{formatCurrency(data.paid_amount)}</span>
                    </div>

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