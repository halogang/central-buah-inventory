import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/search-input';
import { Warehouse, MapPin, SquarePen, Trash2, Plus } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

// helper to add thousands separators
function formatNumber(value: number | string) {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) return String(value);
    return new Intl.NumberFormat('id-ID').format(num);
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Gudang',
        href: '/warehouses',
    },
];

interface Warehouse {
    id: number;
    name: string;
    address?: string;
    capacity: number;
    pic?: string;
    status: string;
    created_at: string;
}

export default function Warehouses() {
    const { warehouses } = usePage<{ warehouses: Warehouse[] }>().props;
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState<Warehouse | null>(null);
    const [search, setSearch] = useState('');

    const filtered = warehouses.filter((w) =>
        w.name.toString().toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Gudang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => setShowCreate(true)} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((w) => (
                        <div
                            key={w.id}
                            className="flex flex-col gap-4 rounded-xl border border-sidebar-border/70 bg-background px-4 pt-4 pb-6 shadow-sm dark:border-sidebar-border cursor-pointer"
                            onClick={() => setEditItem(w)}
                        >
                            <div className="flex items-start gap-3">
                                <div className={
                                    w.status === 'active'
                                        ? 'rounded-xl p-3 bg-primary/10 text-primary'
                                        : 'rounded-xl p-3 bg-muted text-muted-foreground'
                                }>
                                    <Warehouse className="size-6 shrink-0" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <div className="flex items-center gap-2">
                                        <div className="font-semibold text-sm">
                                            {w.name}
                                        </div>
                                        {w.status === 'active' ? (
                                            ''
                                        ) : (
                                            <div className="rounded-full bg-muted px-2 py-1 text-[10px] font-bold text-muted-foreground dark:bg-muted dark:text-muted-foreground">
                                                Nonaktif
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <MapPin className="size-3 shrink-0" />
                                        {w.address}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-between">
                                <div className="w-full text-center px-2 py-3 bg-chart-4/4 dark:bg-chart-3/3 rounded-lg text-xs">
                                    <div className="text-md text-muted-foreground">
                                        Kapasitas
                                    </div>
                                    <div className="text-sm font-semibold">{formatNumber(w.capacity)} unit</div>
                                </div>
                                <div className="w-full text-center px-2 py-3 bg-chart-4/4 dark:bg-chart-3/3 rounded-lg text-xs">
                                    <div className="text-md text-muted-foreground">
                                        PIC
                                    </div>
                                    <div className="text-sm font-semibold">{w.pic}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 justify-end">
                                <button onClick={() => setEditItem(w)}>
                                    <SquarePen className="size-4 text-muted-foreground hover:text-primary" />
                                </button>
                                <button>
                                    <Trash2 className="size-4 text-muted-foreground hover:text-red-600" />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                {showCreate && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Create warehouse (placeholder)</h2>
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
