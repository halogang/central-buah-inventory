import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { SearchInput } from '@/components/search-input';
import type { BreadcrumbItem } from '@/types';
import { Plus, SquarePen, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Metode Pembayaran',
        href: '/payment-methods',
    },
];

interface PaymentMethod {
    id: number;
    name: string;
    icon?: string;
    status: string;
    created_at: string;
}

export default function PaymentMethods() {
    const { methods } = usePage<{ methods: PaymentMethod[] }>().props;
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState<PaymentMethod | null>(null);
    const [search, setSearch] = useState('');

    const filtered = methods.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payment Methods" />
            <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Total Metode Pembayaran
                        </div>
                        <h1 className="text-xl font-semibold">{filtered.length}</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Aktif
                        </div>
                        <h1 className="text-primary text-xl font-semibold">{filtered.filter(i => i.status === 'active').length}</h1>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Metode Pembayaran..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => setShowCreate(true)} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    {filtered.map((m) => (
                        <div
                            key={m.id}
                            className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border cursor-pointer flex items-center justify-between gap-4"
                            onClick={() => setEditItem(m)}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="rounded-md p-2 bg-primary/10 text-primary text-lg"
                                >
                                    {m.icon}
                                </div>
                                <div className='flex flex-col gap-0.5'>
                                    <div className="font-semibold text-md">
                                        {m.name}
                                    </div>
                                    <div className={`flex gap-2 items-center text-xs font-medium w-fit py-1 px-2 rounded-full
                                        ${m.status === 'active' ? 'bg-primary/10 text-primary' : 'text-muted-foreground bg-muted'}
                                    `}>
                                        {m.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                    </div>
                                </div>  
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800'>
                                    <SquarePen className="size-4 cursor-pointer" onClick={() => setEditItem(m)} />
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
                            <h2>Create payment method (placeholder)</h2>
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
