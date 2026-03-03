import { Head, usePage } from '@inertiajs/react';
import { MapPin, Phone, Plus, SquarePen, Trash2, Truck } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Supplier',
        href: '/suppliers',
    },
];

interface Supplier {
    id: number;
    name: string;
    phone?: string;
    address?: string;
    created_at: string;
}

export default function Suppliers() {
    const { suppliers } = usePage<{ suppliers: Supplier[] }>().props;
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState<Supplier | null>(null);
    const [search, setSearch] = useState('');

    const filtered = suppliers.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Suppliers" />
            <div className="p-4">
                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Supplier..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => setShowCreate(true)} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    {filtered.map((s) => (
                        <div
                            key={s.id}
                            className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border cursor-pointer flex items-center justify-between gap-4"
                            onClick={() => setEditItem(s)}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="rounded-md p-3 bg-primary/10 text-primary"
                                >
                                <Truck className="size-5" />
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <div className="font-semibold text-md">
                                        {s.name}
                                    </div>
                                    <div className="flex gap-2 items-center text-xs text-muted-foreground">
                                        <Phone className="size-3" />
                                        {s.phone}
                                    </div>
                                    <div className="flex gap-2 items-center text-xs text-muted-foreground">
                                        <MapPin className="size-3" />
                                        {s.address}
                                    </div>
                                </div>  
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800'>
                                    <SquarePen className="size-4 cursor-pointer" onClick={() => setEditItem(s)} />
                                </div>
                                <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800'>
                                    <Trash2 className="size-4 cursor-pointer hover:bg-gray-100" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showCreate && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Create supplier (placeholder)</h2>
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
