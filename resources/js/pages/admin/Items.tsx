import { Head, usePage } from '@inertiajs/react';
import { Eye, Edit3, Trash2, AlertCircle, Plus } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
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

interface Item {
    id: number;
    icon?: string;
    name: string;
    category?: { name: string };
    unit: string;
    warehouse?: { name: string };
    purchase_price: number;
    selling_price: number;
    stock: number;
    min_stock: number;
    bad_stock: number;
    created_at: string;
}

export default function Items() {
    const { items } = usePage<{ items: Item[] }>().props;
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState<Item | null>(null);
    const [search, setSearch] = useState('');

    const filtered = items.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Total Item
                        </div>
                        <h1 className="text-xl font-semibold">{items.length}</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Stok Rendah
                        </div>
                        <h1 className="text-red-500 text-xl font-semibold">{items.filter(i => i.stock < i.min_stock).length}</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className=" text-xs text-muted-foreground">
                            Bad Stock
                        </div>
                        <h1 className="text-red-400 text-xl font-semibold">{items.filter(i => i.bad_stock > 0).length}</h1>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Barang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => setShowCreate(true)} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((i) => (
                        <div
                            key={i.id}
                            className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border"
                        >
                            <div className="flex items-start gap-3">
                                <div className="text-2xl">{i.icon}</div>
                                <div>
                                    <div className="font-semibold text-sm">
                                        {i.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {i.category?.name} • {i.unit}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <div>
                                    <div className="text-xs text-muted-foreground">Harga Beli</div>
                                    <div className="font-medium">{formatCurrency(i.purchase_price)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground">Harga Jual</div>
                                    <div className="font-medium">{formatCurrency(i.selling_price)}</div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <div>Stok: <span className="font-medium">{i.stock}</span></div>
                                    <div className="flex items-center gap-1 text-red-600">
                                        <AlertCircle className="h-4 w-4" />
                                        <span className="font-medium">{i.bad_stock}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <Edit3 className="h-4 w-4" />
                                    </button>
                                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showCreate && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Create item (placeholder)</h2>
                            <button onClick={() => setShowCreate(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {editItem && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Edit {editItem.name} (placeholder)</h2>
                            <button onClick={() => setEditItem(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
