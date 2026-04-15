import {useState} from "react";
import {SearchInput} from "@/components/search-input";
import {usePagination} from "@/hooks/use-pagination";
import Pagination from "@/components/Pagination";
import PosDetailModal from "./PosDetailModal";
import { formatCurrency } from "@/helpers/format";

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
    paid_amount: number;
    change_amount: number;
    created_at: string;
    type: string;
    pos_items: PosItem[];
}

export default function PosHistory({data} : {
    data: Pos[]
}) {
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState < Pos | null > (null);

    const filtered = data.filter(
        (p) => p.pos_number.toLowerCase().includes(search.toLowerCase())
    );

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
                        <button onClick={() => setSelected(p)} key={p.id} className="border rounded-xl p-3 bg-background shadow-sm">

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

                        </button>
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
                />
            )}

        </div>
        
    );
    
}