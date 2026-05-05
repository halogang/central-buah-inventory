import { useMemo, useState } from "react";
import { router } from "@inertiajs/react";
import { X, Trash2 } from "lucide-react";
import { formatCurrency } from "@/helpers/format";
import { update } from "@/routes/pos";
import type { PosData, PosItem } from "@/types/pos";

export default function PosEditModal({
    data,
    onClose,
    onSuccess,
}: {
    data: PosData;
    onClose: () => void;
    onSuccess?: () => void;
}) {
    const [items, setItems] = useState<PosItem[]>(
        data.pos_items.map((item) => ({
            ...item,
            quantity: Number(item.quantity),
            price: Number(item.price),
            total: Number(item.total),
        }))
    );
    const [paymentMethod, setPaymentMethod] = useState(data.payment_method);
    const [type, setType] = useState(data.type);
    const [charge, setCharge] = useState<number>(data.charge ?? 0);
    const [chargeInput, setChargeInput] = useState(
        data.charge ? data.charge.toLocaleString("id-ID") : ""
    );
    const [paidAmount, setPaidAmount] = useState<number>(
        data.payment_method === "Tunai" ? data.paid_amount ?? 0 : data.total
    );
    const [cashInput, setCashInput] = useState(
        data.payment_method === "Tunai" && data.paid_amount
            ? data.paid_amount.toLocaleString("id-ID")
            : ""
    );
    const [error, setError] = useState("");

    const subtotal = useMemo(
        () => items.reduce((sum, item) => sum + item.total, 0),
        [items]
    );

    const total = useMemo(() => subtotal + (charge || 0), [subtotal, charge]);
    const changeAmount = useMemo(() => {
        if (paymentMethod !== "Tunai") {
            return 0;
        }
        return Math.max(0, Number(paidAmount) - total);
    }, [paymentMethod, paidAmount, total]);

    const handleChargeChange = (value: string) => {
        const raw = value.replace(/\D/g, "");

        if (!raw) {
            setCharge(0);
            setChargeInput("");
            return;
        }

        const numberValue = Number(raw);
        setCharge(numberValue);
        setChargeInput(numberValue.toLocaleString("id-ID"));
    };

    const handleCashChange = (value: string) => {
        const raw = value.replace(/\D/g, "");

        if (!raw) {
            setPaidAmount(0);
            setCashInput("");
            return;
        }

        const numberValue = Number(raw);
        setPaidAmount(numberValue);
        setCashInput(numberValue.toLocaleString("id-ID"));
    };

    const updateItem = (id: number, changes: Partial<PosItem>) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.id !== id) return item;
                const updated = { ...item, ...changes };
                updated.total = Number(updated.quantity) * Number(updated.price);
                return updated;
            })
        );
    };

    const handleRemoveItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleUpdate = () => {
        if (items.length === 0) {
            setError("Minimal harus ada satu item pada transaksi.");
            return;
        }

        if (paymentMethod === "Tunai" && Number(paidAmount) < total) {
            setError("Jumlah bayar harus sama atau lebih besar dari total.");
            return;
        }

        const payload = {
            date: data.created_at.slice(0, 10),
            subtotal,
            discount: data.discount ?? 0,
            tax: data.tax ?? 0,
            total,
            payment_method: paymentMethod,
            paid_amount: paymentMethod === "Tunai" ? paidAmount : total,
            change_amount: paymentMethod === "Tunai" ? changeAmount : 0,
            type,
            charge: charge || 0,
            items: items.map((item) => ({
                item_id: item.item_id,
                item_name: item.item_name,
                unit: item.unit,
                quantity: item.quantity,
                base_price: item.base_price,
                price: item.price,
                total: item.total,
            })),
        };

        router.put(update(data.id), payload, {
            onSuccess: () => {
                onSuccess?.();
            },
            onError: (errors) => {
                console.error(errors);
                setError("Terjadi kesalahan saat memperbarui transaksi.");
            },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-background shadow-xl">
                <div className="flex items-center justify-between border-b border-muted/50 px-5 py-4">
                    <div>
                        <div className="text-lg font-semibold">Edit Transaksi POS</div>
                        <div className="text-sm text-muted-foreground">{data.pos_number}</div>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 hover:bg-muted/50">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-4 p-5 max-h-[85vh] overflow-y-auto">
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">Metode Pembayaran</label>
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                            >
                                <option value="Tunai">Tunai</option>
                                <option value="Transfer">Transfer</option>
                                <option value="QRIS">QRIS</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">Tipe Transaksi</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                            >
                                <option value="self-buying">Ambil Sendiri</option>
                                <option value="delivery">Diantar</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                            <label className="text-xs font-semibold uppercase text-muted-foreground">Biaya Tambahan</label>
                            <input
                                type="text"
                                value={chargeInput}
                                onChange={(e) => handleChargeChange(e.target.value)}
                                placeholder="0"
                                className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                            />
                        </div>
                        {paymentMethod === "Tunai" ? (
                            <div>
                                <label className="text-xs font-semibold uppercase text-muted-foreground">Jumlah Bayar</label>
                                <input
                                    type="text"
                                    value={cashInput}
                                    onChange={(e) => handleCashChange(e.target.value)}
                                    placeholder="0"
                                    className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
                                />
                            </div>
                        ) : (
                            <div className="rounded-xl border border-border bg-muted/20 p-3 text-sm">
                                <div className="text-muted-foreground">Bayar non-tunai</div>
                                <div className="mt-1 font-semibold">{formatCurrency(total)}</div>
                            </div>
                        )}
                    </div>

                    <div className="rounded-2xl border border-border overflow-hidden">
                        <div className="bg-muted/50 px-4 py-3 text-sm font-semibold uppercase">Item POS</div>
                        <div className="divide-y divide-border">
                            {items.map((item) => (
                                <div key={item.id} className="grid gap-3 px-4 py-4 sm:grid-cols-[1.5fr_1fr_1fr_1fr_auto] items-center">
                                    <div>
                                        <div className="font-medium">{item.item_name}</div>
                                        <div className="text-xs text-muted-foreground">{item.unit}</div>
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase text-muted-foreground">Qty</label>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            min={1}
                                            onChange={(e) => updateItem(item.id, { quantity: Number(e.target.value) })}
                                            className="mt-1 w-full rounded-xl border border-border bg-background px-2 py-2 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase text-muted-foreground">Harga</label>
                                        <input
                                            type="number"
                                            value={item.price}
                                            min={0}
                                            onChange={(e) => updateItem(item.id, { price: Number(e.target.value) })}
                                            className="mt-1 w-full rounded-xl border border-border bg-background px-2 py-2 text-sm"
                                        />
                                    </div>
                                    <div className="text-right text-sm font-semibold">
                                        {formatCurrency(item.total)}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="self-start rounded-xl border border-border px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                                    >
                                        <Trash2 className="inline h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3 rounded-2xl border border-border bg-muted/20 p-4 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Biaya Tambahan</span>
                            <span>{formatCurrency(charge)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-foreground">
                            <span>Total</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                        {paymentMethod === "Tunai" && (
                            <div className="flex justify-between">
                                <span>Kembalian</span>
                                <span>{formatCurrency(changeAmount)}</span>
                            </div>
                        )}
                    </div>

                    {error && <div className="rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
