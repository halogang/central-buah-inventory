import { Head, usePage } from "@inertiajs/react";
import { ArrowDown, ArrowUp, Repeat } from "lucide-react";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import { SearchInput } from "@/components/search-input";
import { usePagination } from "@/hooks/use-pagination";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Stock Movement",
        href: "/stok/movement",
    },
];

interface User {
    id: number;
    name: string;
}

interface Warehouse {
    id: number;
    name: string;
}

interface Item {
    id: number;
    name: string;
}

interface StockMovement {
    id: number;
    type: "in" | "out" | "adjustment";
    quantity: number;
    bad_stock: number;
    stock_before: number;
    stock_after: number;
    reference_type: string;
    reference_id: number;
    note: string;
    created_at: string;

    item: Item;
    warehouse?: Warehouse;
    user?: User;
}

export default function Index() {

    const { stockMovements } = usePage<{ stockMovements: StockMovement[] }>().props;

    const [search, setSearch] = useState("");

    const filtered = stockMovements.filter((m) =>
        m.item?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filtered, 6)

    const totalIn = stockMovements
        .filter((m) => m.type === "in")
        .reduce((sum, m) => sum + Number(m.quantity), 0);

    const totalOut = stockMovements
        .filter((m) => m.type === "out")
        .reduce((sum, m) => sum + Number(m.quantity), 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stock Movement" >
                <meta name="robots" content="noindex" />
            </Head>

            <div className="space-y-6 p-4">

                {/* SUMMARY */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                    <SummaryCard
                        title="Total Movement"
                        value={stockMovements.length}
                    />

                    <SummaryCard
                        title="Total Stock Masuk"
                        value={totalIn}
                        color="text-green-500"
                    />

                    <SummaryCard
                        title="Total Stock Keluar"
                        value={totalOut}
                        color="text-red-400"
                    />

                </div>

                {/* SEARCH */}
                <SearchInput
                    placeholder="Cari Barang..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {/* DESKTOP TABLE */}
                <div className="hidden md:block rounded-xl border bg-background overflow-x-auto">

                    <table className="w-full text-sm">

                        <thead className="bg-muted/50">
                            <tr>
                                <th className="p-3 text-left">Tanggal</th>
                                <th className="p-3 text-left">Barang</th>
                                <th className="p-3 text-left">Gudang</th>
                                <th className="p-3 text-center">Type</th>
                                <th className="p-3 text-center">Qty</th>
                                <th className="p-3 text-center">Before</th>
                                <th className="p-3 text-center">After</th>
                                <th className="p-3 text-left">Referensi</th>
                                <th className="p-3 text-left">User</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.map((m) => {

                                const { label, style, icon } = getMovementType(m.type);

                                return (
                                    <tr key={m.id} className="border-t hover:bg-muted/30">

                                        <td className="p-3">
                                            {new Date(m.created_at).toLocaleDateString("id-ID")}
                                        </td>

                                        <td className="p-3 font-semibold">
                                            {m.item?.name}
                                        </td>

                                        <td className="p-3">
                                            {m.warehouse?.name}
                                        </td>

                                        <td className="p-3 text-center">
                                            <span className={`flex items-center justify-center gap-1 text-xs font-medium ${style}`}>
                                                {icon}
                                                {label}
                                            </span>
                                        </td>

                                        <td className="p-3 text-center font-semibold">
                                            {m.quantity}
                                        </td>

                                        <td className="p-3 text-center">
                                            {m.stock_before}
                                        </td>

                                        <td className="p-3 text-center">
                                            {m.stock_after}
                                        </td>

                                        <td className="p-3 text-xs text-muted-foreground">
                                            {m.reference_type} #{m.reference_id}
                                        </td>

                                        <td className="p-3 text-xs">
                                            {m.user?.name}
                                        </td>

                                    </tr>
                                );
                            })}

                            {paginatedData.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="text-center p-6 text-muted-foreground"
                                    >
                                        Tidak ada pergerakan barang
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

                {/* MOBILE CARD */}
                <div className="grid gap-3 md:hidden">

                    {filtered.map((m) => {

                        const { label, style, icon } = getMovementType(m.type);

                        return (
                            <div key={m.id} className="border rounded-xl p-3 bg-background shadow-sm">

                                <div className="flex justify-between">

                                    <div className="font-semibold">
                                        {m.item?.name}
                                    </div>

                                    <span className={`text-xs font-medium ${style}`}>
                                        {icon} {label}
                                    </span>

                                </div>

                                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">

                                    <Info label="Qty" value={m.quantity} />

                                    <Info label="Gudang" value={m.warehouse?.name} />

                                    <Info label="Before" value={m.stock_before} />

                                    <Info label="After" value={m.stock_after} />

                                    <Info label="User" value={m.user?.name} />

                                    <Info
                                        label="Tanggal"
                                        value={new Date(m.created_at).toLocaleDateString("id-ID")}
                                    />

                                </div>

                            </div>
                        );
                    })}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goTo}
                />

            </div>
        </AppLayout>
    );
}

/* COMPONENTS */

function SummaryCard({ title, value, color = "" }: any) {
    return (
        <div className="rounded-xl border bg-background p-4 text-center shadow-sm">
            <div className="text-xs text-muted-foreground">{title}</div>
            <h1 className={`text-lg font-semibold ${color}`}>{value}</h1>
        </div>
    );
}

function Info({ label, value }: any) {
    return (
        <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}

function getMovementType(type: string) {

    if (type === "in") {
        return {
            label: "Masuk",
            icon: <ArrowDown size={14} />,
            style: "text-green-600",
        };
    }

    if (type === "out") {
        return {
            label: "Keluar",
            icon: <ArrowUp size={14} />,
            style: "text-red-500",
        };
    }

    return {
        label: "Adjustment",
        icon: <Repeat size={14} />,
        style: "text-yellow-500",
    };
}