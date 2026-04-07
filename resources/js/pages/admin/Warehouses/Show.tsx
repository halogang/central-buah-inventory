import { Head, router } from "@inertiajs/react";
import { ArrowLeft, MapPin, TriangleAlert, User2Icon } from "lucide-react";
import { useState } from "react";
import { SearchInput } from "@/components/search-input";
import { formatNumber } from "@/helpers/format";
import AppLayout from "@/layouts/app-layout";
import { index } from "@/routes/master/warehouses";
import type { BreadcrumbItem } from "@/types";

interface Category {
    id: number;
    name: string;
    description?: string;
}

interface Unit {
    id: number;
    unit_code: string;
    description?: string;
}

interface User {
    id: number;
    name: string;
}


interface Warehouse {
    id: number;
    name: string;
    address: string;
    capacity: number;
    user_id?: number | null;
    user?: User | null;
    status: string;
}

interface Item {
    id: number;
    image?: string;
    image_url?: string;
    name: string;
    unit?: Unit;
    warehouse?: Warehouse;
    category?: Category;
    purchase_price: number;
    selling_price: number;
    stock: number;
    min_stock: number;
    bad_stock: number;
}

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

export default function Show({
    items,
    warehouse,
}: {
    category: Category;
    items: Item[];
    warehouse: Warehouse;
    units: Unit[];
}) {
    const [search, setSearch] = useState('');

    const filteredItems = items.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalStock = items.reduce(
        (total, item) => total + Number(item.stock || 0),
        0
    );

    const totalBadStock = items.reduce(
        (total, item) => total + Number(item.bad_stock || 0),
        0
    );

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Master Gudang',
            href: '/master/items',
        },
        {
            title: warehouse.name,
            href: "/master/" + warehouse.id,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={warehouse.name} >
                <meta name="robots" content="noindex" />
            </Head>

            <div className="p-4 space-y-4">
                {/* Back button */}
                <button
                    className="flex items-center gap-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => router.get(index())}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <h1 className="text-xl font-semibold">Kembali</h1>
                </button>

                {/* Category Header */}
                <div className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm flex flex-col gap-2">
                    <div className="text-lg font-semibold flex items-center gap-2">
                        <p>{warehouse.name}</p>
                        <span className={warehouse.status === 'active'
                                    ? 'w-fit rounded-full px-2 py-1 text-xs font-bold bg-primary/10 text-primary'
                                    : 'w-fit rounded-full px-2 py-1 text-xs font-bold bg-muted text-muted-foreground'}
                        >{warehouse.status === 'active'
                            ? 'Aktif'
                            : 'Nonaktif'
                        }</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <User2Icon className="size-4"/>
                            {warehouse.user?.name ?? 'gaada'}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="size-4"/>
                            {warehouse.address}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl border bg-background p-4 text-center">
                        <div className="text-xs text-muted-foreground">
                            Total Barang
                        </div>
                        <h1 className="text-xl font-semibold">{formatNumber(items.length)}</h1>
                    </div>

                    <div className="rounded-xl border bg-background p-4 text-center">
                        <div className="text-xs text-muted-foreground">
                            Total Stok Barang
                        </div>
                        <h1 className="text-primary text-xl font-semibold">
                            {formatNumber(totalStock)}
                        </h1>
                    </div>

                    <div className="rounded-xl border bg-background p-4 text-center">
                        <div className="text-xs text-muted-foreground">
                            Total Bad Stock
                        </div>
                        <h1 className="text-red-500 text-xl font-semibold">
                            {formatNumber(totalBadStock)}
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Barang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-background overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left p-3">Barang</th>
                                <th className="text-left p-3">Gudang</th>
                                <th className="text-left p-3">Unit</th>
                                <th className="text-right p-3">Harga Beli</th>
                                <th className="text-right p-3">Harga Jual</th>
                                <th className="text-center p-3">Min Stok</th>
                                <th className="text-center p-3">Stok</th>
                                <th className="text-center p-3">Bad</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredItems.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-muted/30 transition"
                                >
                                   <td className="p-3 flex items-center gap-2">
                                        <span className="text-lg">
                                            {item.image ? (
                                                <img
                                                    src={item.image_url}
                                                    alt={item.image}
                                                    className="w-8 h-8 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-xs">
                                                    ?
                                                </div>
                                            )}
                                        </span>
                                        {item.name}
                                    </td>

                                    <td className="p-3">
                                        {item.warehouse?.name || "-"}
                                    </td>

                                    <td className="p-3">{item.unit?.unit_code}</td>

                                    <td className="p-3 text-right">
                                        {formatCurrency(item.purchase_price)}
                                    </td>

                                    <td className="p-3 text-right text-green-600 dark:text-green-400">
                                        {formatCurrency(item.selling_price)}
                                    </td>

                                    <td className="p-3 text-center">
                                        <span
                                            className="px-2 py-1 rounded-full text-xs font-medium text-yellow-700 dark:text-yellow-500"
                                        >
                                            {item.min_stock}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium
                                            ${
                                                item.stock < item.min_stock
                                                    ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                                                    : "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                                            }`}
                                        >
                                            {item.stock}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center gap-1 text-yellow-500">
                                            <TriangleAlert className="h-3 w-3" />
                                            {item.bad_stock}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredItems.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center p-6 text-muted-foreground"
                                    >
                                        Tidak ada barang dalam kategori ini
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}