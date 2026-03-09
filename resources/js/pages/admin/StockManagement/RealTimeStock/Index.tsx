import { Head, usePage } from "@inertiajs/react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Stok Real-Time",
        href: "/stok/realtime",
    },
];

function formatCurrency(value: number) {
    try {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(value);
    } catch {
        return String(value);
    }
}

interface Category {
    id: number;
    name: string;
}

interface Item {
    id: number;
    image: string;
    name: string;
    category?: Category;
    unit: string;
    purchase_price: number;
    selling_price: number;
    stock: number;
    min_stock: number;
    bad_stock: number;
}

export default function Index() {
    const { items } = usePage<{ items: Item[] }>().props;

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState<"all" | "safe" | "low" | "bad">("all");

    const filtered = items.filter((item) => {
        const matchesSearch = item.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const cleanStock = item.stock - item.bad_stock;

        let matchesStatus = true;

        if (statusFilter === "safe") {
            matchesStatus = item.bad_stock === 0 && cleanStock >= item.min_stock;
        }

        if (statusFilter === "bad") {
            matchesStatus = item.bad_stock > 0;
        }

        if (statusFilter === "low") {
            matchesStatus = cleanStock < item.min_stock;
        }

        return matchesSearch && matchesStatus;
    });

    const itemTotal = items.length;

    const stockTotal = items.reduce(
        (total, item) => total + Number(item.stock || 0),
        0
    );

    const stockValueTotal = items.reduce(
        (total, item) => total + item.stock * item.selling_price,
        0
    );

    const badStockValueTotal = items.reduce(
        (total, item) => total + item.bad_stock * item.selling_price,
        0
    );

    const cleanStockValueTotal = items.reduce((total, item) => {
        const cleanStock = item.stock - item.bad_stock;
        return total + cleanStock * item.selling_price;
    }, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stok Real-Time" />

            <div className="space-y-6 p-4">

                {/* SUMMARY */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">

                    <SummaryCard title="Total Item" value={itemTotal} />

                    <SummaryCard
                        title="Total Stok"
                        value={stockTotal}
                        color="text-green-500"
                    />

                    <SummaryCard
                        title="Nilai Stok"
                        value={formatCurrency(stockValueTotal)}
                    />

                    <SummaryCard
                        title="Nilai Bad Stock"
                        value={formatCurrency(badStockValueTotal)}
                        color="text-red-400"
                    />

                    <SummaryCard
                        title="Nilai Stok Bersih"
                        value={formatCurrency(cleanStockValueTotal)}
                        color="text-green-500"
                    />
                </div>

                {/* FILTER */}
                <div className="flex flex-col md:flex-row gap-3 md:items-center">

                    <SearchInput
                        placeholder="Cari Barang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="flex gap-2">
                        <FilterButton
                            active={statusFilter === "all"}
                            onClick={() => setStatusFilter("all")}
                        >
                            Semua
                        </FilterButton>

                        <FilterButton
                            active={statusFilter === "safe"}
                            onClick={() => setStatusFilter("safe")}
                        >
                            Aman
                        </FilterButton>

                        <FilterButton
                            active={statusFilter === "low"}
                            onClick={() => setStatusFilter("low")}
                        >
                            Menipis
                        </FilterButton>

                        <FilterButton
                            active={statusFilter === "bad"}
                            onClick={() => setStatusFilter("bad")}
                        >
                            Bad Stock
                        </FilterButton>
                    </div>
                </div>

                {/* DESKTOP TABLE */}
                <div className="hidden md:block rounded-xl border bg-background overflow-x-auto">

                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left p-3">Barang</th>
                                <th className="text-center p-3">Stok</th>
                                <th className="text-center p-3">Bad</th>
                                <th className="text-center p-3">Bersih</th>
                                <th className="text-right p-3">Nilai</th>
                                <th className="text-center p-3">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((i) => {

                                const cleanStock = i.stock - i.bad_stock;
                                const cleanStockValue =
                                    cleanStock * i.selling_price;

                                const { status, style } = getStatus(i);

                                return (
                                    <tr
                                        key={i.id}
                                        className="border-t hover:bg-muted/30"
                                    >
                                        <td className="p-3 flex items-center gap-3">

                                            <ItemImage item={i} />

                                            <div className="flex flex-col">
                                                <span className="font-semibold">
                                                    {i.name}
                                                </span>

                                                <span className="text-muted-foreground text-xs">
                                                    {i.category?.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="p-3 text-center">
                                            {i.stock} {i.unit}
                                        </td>

                                        <td className="p-3 text-center">
                                            {i.bad_stock}
                                        </td>

                                        <td className="p-3 text-center">
                                            {cleanStock}
                                        </td>

                                        <td className="p-3 text-right text-green-600">
                                            {formatCurrency(cleanStockValue)}
                                        </td>

                                        <td className="p-3 text-center">
                                            <StatusBadge
                                                status={status}
                                                style={style}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE CARD LIST */}
                <div className="grid gap-3 md:hidden">

                    {filtered.map((i) => {

                        const cleanStock = i.stock - i.bad_stock;
                        const cleanStockValue =
                            cleanStock * i.selling_price;

                        const { status, style } = getStatus(i);

                        return (
                            <div
                                key={i.id}
                                className="border rounded-xl p-3 bg-background shadow-sm"
                            >
                                <div className="flex items-center gap-3">

                                    <ItemImage item={i} />

                                    <div className="flex-1">
                                        <div className="font-semibold">
                                            {i.name}
                                        </div>

                                        <div className="text-xs text-muted-foreground">
                                            {i.category?.name}
                                        </div>
                                    </div>

                                    <StatusBadge status={status} style={style} />
                                </div>

                                <div className="grid grid-cols-3 gap-2 mt-3 text-sm">

                                    <Info label="Stok" value={`${i.stock} ${i.unit}`} />

                                    <Info label="Bad" value={i.bad_stock} />

                                    <Info label="Bersih" value={cleanStock} />

                                    <Info
                                        label="Nilai"
                                        value={formatCurrency(cleanStockValue)}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
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

function FilterButton({ active, children, ...props }: any) {
    return (
        <Button variant={active ? "default" : "outline"} {...props}>
            {children}
        </Button>
    );
}

function ItemImage({ item }: { item: Item }) {
    return item.image ? (
        <img
            src={item.image.startsWith("http") ? item.image : `/${item.image}`}
            className="h-12 w-16 rounded object-cover"
        />
    ) : (
        <div className="h-12 w-16 flex items-center justify-center bg-muted rounded">
            <Eye className="h-5 w-5 text-muted-foreground" />
        </div>
    );
}

function StatusBadge({ status, style }: any) {
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>
            {status}
        </span>
    );
}

function Info({ label, value, className = "" }: any) {
    return (
        <div className={`flex flex-col ${className}`}>
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
}

function getStatus(item: Item) {

    const cleanStock = item.stock - item.bad_stock;

    if (item.bad_stock > 0) {
        return {
            status: "Bad Stock",
            style: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-900/20",
        };
    }

    if (cleanStock < item.min_stock) {
        return {
            status: "Menipis",
            style:
                "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20",
        };
    }

    return {
        status: "Aman",
        style: "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-900/20",
    };
}