import { Head, usePage } from '@inertiajs/react';
import { MapPin, Phone, Plus, SquarePen, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Pelanggan',
        href: '/customers',
    },
];

interface Customer {
    id: number;
    name: string;
    phone?: string;
    address?: string;
    created_at: string;
}

export default function Customers() {
    const { customers } = usePage<{ customers: Customer[] }>().props;
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState<Customer | null>(null);
    const [search, setSearch] = useState('');

    const filtered = customers.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customers" />
            <div className="p-4">
                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Pelanggan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => setShowCreate(true)} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    {filtered.map((c) => (
                        <div
                            key={c.id}
                            className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border cursor-pointer flex items-center justify-between gap-4"
                            onClick={() => setEditItem(c)}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="rounded-md p-3 bg-chart-4/10 text-chart-4 dark:bg-chart-3/20 dark:text-chart-3"
                                >
                                <Users className="size-5" />
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <div className="font-semibold text-md">
                                        {c.name}
                                    </div>
                                    <div className="flex gap-2 items-center text-xs text-muted-foreground">
                                        <Phone className="size-3" />
                                        {c.phone}
                                    </div>
                                    <div className="flex gap-2 items-center text-xs text-muted-foreground">
                                        <MapPin className="size-3" />
                                        {c.address}
                                    </div>
                                </div>  
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800'>
                                    <SquarePen className="size-4 cursor-pointer" onClick={() => setEditItem(c)} />
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
                            <h2>Create customer (placeholder)</h2>
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
