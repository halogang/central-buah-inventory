import {useState} from "react";
import {SearchInput} from "@/components/search-input";
import {usePagination} from "@/hooks/use-pagination";
import Pagination from "@/components/Pagination";
import PosDetailModal from "./PosDetailModal";
import PosEditModal from "./PosEditModal";
import { formatCurrency } from "@/helpers/format";
import { Edit3, Trash2 } from "lucide-react";
import { router } from "@inertiajs/react";
import { destroy } from "@/routes/pos";
import { notify } from "@/lib/notify";
import type { PosData } from "@/types/pos";

export default function PosHistory({data} : {
    data: PosData[]
}) {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<PosData | null>(null);
    const [editing, setEditing] = useState<PosData | null>(null);

    const filtered = data.filter(
        (p) => p.pos_number.toLowerCase().includes(search.toLowerCase())
    );

    const confirmDelete = (pos: PosData) => {
        notify.confirmDelete({
            message: `Hapus ${pos.pos_number}?`,
            onConfirm: () => performDelete(pos),
        });
    };

    const performDelete = (pos: PosData) => {
        const loading = notify.loading("Menghapus transaksi POS...");
        router.delete(destroy(pos.id), {
            onSuccess: () => {
                notify.dismiss(loading);
                notify.success(`Transaksi ${pos.pos_number} berhasil dihapus`);
            },
            onError: () => {
                notify.dismiss(loading);
                notify.error(`Gagal menghapus ${pos.pos_number}`);
            },
        });
    };

    const {currentPage, totalPages, paginatedData, goTo} = usePagination(
        filtered,
        5
    );

    return (
        <div className="space-y-4">

            {/* SEARCH */}
            <SearchInput
                placeholder="Cari nomor POS..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}/> {/* DESKTOP TABLE */}
            <div className="hidden md:block border rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                        <tr>
                            <th className="p-3 text-left">Tanggal</th>
                            <th className="p-3 text-left">No POS</th>
                            <th className="p-3 text-left">Metode</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-right">Total</th>
                            <th className="p-3 text-right">Bayar</th>
                            <th className="p-3 text-right">Kembalian</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            paginatedData.map((p) => (
                                <tr
                                    key={p.id}
                                    onClick={() => setSelected(p)}
                                    className="border-t hover:bg-muted/30 cursor-pointer">

                                    <td className="p-3">
                                        {
                                            new Date(p.created_at).toLocaleString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })
                                        }
                                    </td>

                                    <td className="p-3 font-semibold">
                                        {p.pos_number}
                                    </td>

                                    <td className="p-3 capitalize">
                                        {p.payment_method}
                                    </td>

                                    <td className="p-3 capitalize">
                                        {p.type}
                                    </td>

                                    <td className="p-3 text-right">
                                        {formatCurrency(p.total)}
                                    </td>

                                    <td className="p-3 text-right">
                                        {formatCurrency(p.paid_amount)}
                                    </td>

                                    <td className="p-3 text-right">
                                        {formatCurrency(p.change_amount)}
                                    </td>

                                    <td className="p-3 text-right">
                                        <div className="flex justify-end gap-3 items-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditing(p);
                                                }}
                                                className="p-1 rounded hover:bg-muted/50"
                                            >
                                                <Edit3 className="w-4 h-4 text-yellow-500" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    confirmDelete(p);
                                                }}
                                                className="p-1 rounded hover:bg-muted/50"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))
                        }

                        {
                            paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="text-center p-6 text-muted-foreground">
                                        Tidak ada data POS
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARD */}
            <div className="grid gap-3 md:hidden">
                {
                    filtered.map((p) => (
                        <div
                            onClick={() => setSelected(p)}
                            key={p.id}
                            role="button"
                            tabIndex={0}
                            className="border rounded-xl p-3 bg-background shadow-sm cursor-pointer"
                        >

                            <div className="flex justify-between">
                                <div className="font-semibold">{p.pos_number}</div>
                                <div className="text-xs capitalize">{p.payment_method}</div>
                            </div>

                            <div className="text-sm mt-2 space-y-1">
                                <div>Total: {formatCurrency(p.total)}</div>
                                <div>Bayar: {formatCurrency(p.paid_amount)}</div>
                                <div>Kembalian: {formatCurrency(p.change_amount)}</div>
                                <div className="text-xs text-muted-foreground">
                                    {
                                        new Date(p.created_at).toLocaleString("id-ID", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })
                                    }
                                </div>
                            </div>

                            {/* DETAIL ITEMS */}
                            <div className="mt-2 border-t pt-2">
                                {
                                    p
                                        .pos_items
                                        .map((item) => (
                                            <div key={item.id} className="flex justify-between text-xs">
                                                <span>{item.item_name}
                                                    x{item.quantity}</span>
                                                <span>Rp {
                                                        item
                                                            .total
                                                            .toLocaleString("id-ID")
                                                    }</span>
                                            </div>
                                        ))
                                }
                            </div>

                            <div className="mt-3 flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditing(p);
                                    }}
                                    className="rounded-xl border border-border px-3 py-2 text-xs font-semibold"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        confirmDelete(p);
                                    }}
                                    className="rounded-xl border border-border px-3 py-2 text-xs font-semibold text-destructive"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goTo}/>

            {selected && (
                <PosDetailModal
                    data={selected}
                    onClose={() => setSelected(null)}
                    onEdit={(pos) => {
                        setSelected(null);
                        setEditing(pos);
                    }}
                    onDelete={confirmDelete}
                />
            )}

            {editing && (
                <PosEditModal
                    data={editing}
                    onClose={() => setEditing(null)}
                    onSuccess={() => setEditing(null)}
                />
            )}

        </div>
        
    );
    
}