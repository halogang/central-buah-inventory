import { Head, usePage, router } from '@inertiajs/react';
import { Eye, Tag } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '@/components/search-input';
import AppLayout from '@/layouts/app-layout';
import { show } from '@/routes/master/items';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Barang',
        href: '/items',
    },
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
    id: number
    name: string
    icon?: string
    image?: string
    image_url?: string
    description?: string
}

interface Unit {
    id: number;
    name: string;
    description?: string;
}

interface Item {
    id: number;
    icon?: string;
    name: string;
    category?: Category;
    unit?: Unit;
    purchase_price: number;
    selling_price: number;
    stock: number;
    min_stock: number;
    bad_stock: number;
    created_at: string;
}

export default function Index() {
    const { items, categories = [] } = usePage<{
        items: Item[];
        categories: Category[];
        errors?: Record<string, string>;
    }>().props;
    const [search, setSearch] = useState('');

    const filtered = categories.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    const allBadStockCount = items.reduce((total, item) => total + Number(item.bad_stock || 0), 0);
    const allCleanStockCount = items.reduce((total, item) => total + Number(item.stock || 0), 0) - allBadStockCount;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Total Produk
                        </div>
                        <h1 className="text-xl font-semibold">{items.length}</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className=" text-xs text-muted-foreground">
                            Bad Stock
                        </div>
                        <h1 className="text-red-400 text-xl font-semibold">{allBadStockCount}</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Stok Bersih
                        </div>
                        <h1 className="text-green-500 text-xl font-semibold">{allCleanStockCount}</h1>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Kategori Barang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* <Button onClick={() => openForm()} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button> */}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((i) =>  {

                        const stats = items.reduce((acc, item) => {
                            if (item.category?.id !== i.id) return acc;

                            acc.productCount += 1;
                            acc.purchaseTotal += Number(item.purchase_price || 0);
                            acc.sellingTotal += Number(item.selling_price || 0);
                            acc.stockCount += Number(item.stock || 0);
                            acc.badStockCount += Number(item.bad_stock || 0);

                            if (item.stock < item.min_stock) acc.lowStockCount += 1;

                            return acc;
                        }, {
                            productCount: 0,
                            purchaseTotal: 0,
                            sellingTotal: 0,
                            stockCount: 0,
                            badStockCount: 0,
                            lowStockCount: 0,
                        });

                        const avgPurchase = stats.productCount ? stats.purchaseTotal / stats.productCount : 0;
                        const avgSelling = stats.productCount ? stats.sellingTotal / stats.productCount : 0;

                        const badges = [
                            {
                                label: "Jenis Produk",
                                value: stats.productCount,
                                class: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                            },
                            {
                                label: "Stok",
                                value: stats.stockCount,
                                class: "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                            },
                            {
                                label: "Bad Stok",
                                value: stats.badStockCount,
                                class: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/15 dark:text-yellow-400"
                            },
                            {
                                label: "Stok Rendah",
                                value: stats.lowStockCount,
                                class: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                            }
                        ];

                        return (
                            <div
                                key={i.id}
                                className="flex flex-col gap-4 rounded-xl border border-sidebar-border/70 bg-background px-4 pt-4 pb-6 shadow-sm dark:border-sidebar-border hover:bg-muted/50 hover:scale-102 transition"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex items-center justify-center rounded-2xl overflow-hidden">
                                        {i.image_url ? (
                                            <img
                                                src={i.image_url}
                                                alt={i.name}
                                                className="w-14 h-14 object-cover rounded-xl"
                                            />
                                        ) : (
                                            i.icon?
                                            <div className="text-4xl text-center p-3 bg-muted-foreground/20 rounded-2xl">
                                                {i.icon}
                                            </div>
                                            :
                                            <Tag className='size-5' />
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">
                                            {i.name}
                                        </div>
                                        <div className="text-xs text-muted-foreground flex flex-col">
                                            <p>{i.description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 justify-between">
                                    <div className='w-full text-center px-2 py-3 bg-chart-4/3 dark:bg-chart-3/3 rounded-lg text-xs'>
                                        <div className="text-md text-muted-foreground">Harga Beli</div>
                                        <div className="text-sm font-semibold">{formatCurrency(avgPurchase)}</div>
                                    </div>
                                    <div className='w-full text-center px-2 py-3 bg-chart-4/3 dark:bg-chart-3/3 rounded-lg text-xs'>
                                        <div className="text-md text-muted-foreground">Harga Jual</div>
                                        <div className="text-sm font-semibold text-chart-4 dark:text-chart-3">{formatCurrency(avgSelling)}</div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mt-4">
                                    <div className="grid grid-cols-2 gap-3 text-xs">
                                        {badges.map((b, idx) => (
                                            <div className={`flex items-center gap-1 rounded-full px-2 py-1 ${b.class}`} key={idx}>
                                                {b.label}: 
                                                <span className="font-medium">{b.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                        onClick={() => router.get(show(i.id))}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
