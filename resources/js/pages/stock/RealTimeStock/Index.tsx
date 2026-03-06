import { Head, usePage } from "@inertiajs/react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stok Real-Time',
        href: '/stok/realtime',
    }
];

function formatCurrency(value: number) {
    try {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(value);
    } catch {
        // ignore formatting errors, fallback to raw number
        return String(value);
    }
}

interface Category {
    id: number;
    name: string;
    description?: string;
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
    created_at: string;
}

export default function Index() {
    const { items } = usePage<{
        items: Item[];
        errors?: Record<string, string>;
    }>().props;
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'safe' | 'low' | 'bad'>('all');

    const filtered = items.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());

        const cleanStock = item.stock - item.bad_stock;

        let matchesStatus = true;

        if (statusFilter === 'safe') {
            matchesStatus = item.bad_stock === 0 && cleanStock >= item.min_stock;
        }

        if (statusFilter === 'bad') {
            matchesStatus = item.bad_stock > 0;
        }

        if (statusFilter === 'low') {
            matchesStatus = cleanStock < item.min_stock;
        }

        return matchesSearch && matchesStatus;
    });

    const itemTotal = items.length;
    const stockTotal = items.reduce((total, item) => total + Number(item.stock || 0), 0);

    const stockValueTotal = items.reduce(
        (total, item) => total + (item.stock * item.selling_price),
        0
    );

    const badStockValueTotal = items.reduce(
        (total, item) => total + (item.bad_stock * item.selling_price),
        0
    );

    const cleanStockValueTotal = items.reduce(
        (total, item) => {
            const cleanStock = item.stock - item.bad_stock;
            return total + (cleanStock * item.selling_price);
        },
        0
    );
     

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stok Real-Time" />
            <div className="space-y-6 p-4">
                <div className="grid grid-cols-5 gap-4 mb-4">
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Total Item
                        </div>
                        <h1 className="text-lg font-semibold">{itemTotal}</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Total Stok
                        </div>
                        <h1 className="text-green-500 text-lg font-semibold">{stockTotal}</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Nilai Stok
                        </div>
                        <h1 className="text-lg font-semibold">{formatCurrency(stockValueTotal)}</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className=" text-xs text-muted-foreground">
                            Nilai Bad Stock
                        </div>
                        <h1 className="text-red-400 text-lg font-semibold">{formatCurrency(badStockValueTotal)}</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Nilai Stok Bersih
                        </div>
                        <h1 className="text-green-500 text-lg font-semibold">{formatCurrency(cleanStockValueTotal)}</h1>
                    </div>
                </div>

                <div className="flex gap-2 items-center mb-4">
                    <SearchInput
                        placeholder="Cari Barang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                        variant={statusFilter === 'all' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('all')}
                    >
                        Semua
                    </Button>

                    <Button
                        variant={statusFilter === 'safe' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('safe')}
                    >
                        Aman
                    </Button>

                    <Button
                        variant={statusFilter === 'low' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('low')}
                    >
                        Menipis
                    </Button>

                    <Button
                        variant={statusFilter === 'bad' ? 'default' : 'outline'}
                        onClick={() => setStatusFilter('bad')}
                    >
                        Bad Stock
                    </Button>
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-background overflow-x-auto font-semibold">
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
                                const cleanStockValue = cleanStock * i.selling_price;

                                let status = "Aman";
                                let statusStyle = "text-green-700 dark:text-green-400 bg-green-100";

                                if (i.bad_stock > 0) {
                                    status = "Bad Stock";
                                    statusStyle = "text-red-700 dark:text-red-400 bg-red-100";
                                }

                                if (cleanStock < i.bad_stock) {
                                    status = "Menipis";
                                    statusStyle = "text-yellow-700 dark:text-yellow-400 bg-yellow-100";
                                }

                                return (
                                    <tr
                                        key={i.id}
                                        className="border-t hover:bg-muted/30 transition"
                                    >
                                        <td className="p-3 flex items-center gap-2">
                                            {i.image ? (
                                                <img
                                                    src={i.image.startsWith('http') ? i.image : `/${i.image}`}
                                                    alt={i.name}
                                                    className="h-12 w-20 rounded object-cover"
                                                    />
                                            ) : (
                                                <div className="flex h-12 w-20 items-center justify-center rounded bg-gray-200 dark:bg-gray-600">
                                                    <Eye className="h-5 w-5 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                {i.name}
                                                <span className="text-muted-foreground font-normal">{i.category?.name}</span>
                                            </div>
                                        </td>

                                        <td className="p-3 text-center">
                                            {i.stock} <span className="text-muted-foreground font-normal">{i.unit}</span>
                                        </td>

                                        <td className="p-3 text-center">
                                            {i.bad_stock}
                                        </td>

                                        <td className="p-3 text-center">
                                            {cleanStock}
                                        </td>

                                        <td className="p-3 text-right text-green-600 dark:text-green-400">
                                            {formatCurrency(cleanStockValue)}
                                        </td>

                                        <td className="p-3 text-center">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle}`}
                                            >
                                                {status}
                                            </span>
                                        </td>
                                    </tr>
                                )
                            })}

                            {/* {filteredItems.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center p-6 text-muted-foreground"
                                    >
                                        Tidak ada barang dalam kategori ini
                                    </td>
                                </tr>
                            )} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    )
}