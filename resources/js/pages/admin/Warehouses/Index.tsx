import { Head, usePage, router } from '@inertiajs/react';
import { Warehouse, MapPin, SquarePen, Trash2, Plus, Eye } from 'lucide-react';
import React, { useState } from 'react';
import Pagination from '@/components/Pagination';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/use-pagination';
import AppLayout from '@/layouts/app-layout';
import { store, update, destroy, show } from '@/routes/master/warehouses';
import type { BreadcrumbItem } from '@/types';
import { useCan } from '@/utils/permissions';
import { notify } from '@/lib/notify';
import Form from './components/Form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Gudang',
        href: '/master/warehouses',
    },
];

interface User {
    id: number;
    name: string;
}

interface Branch {
    id: number;
    name: string;
}

interface Warehouse {
    id: number;
    name: string;
    address?: string;
    user_id?: number | null;
    user?: User | null;
    branch?: Branch | null;
    status: 'active' | 'nonactive';
}


export default function Warehouses() {
    const can = useCan();

    const { warehouses, users, branches } = usePage<{
        warehouses: Warehouse[]
        users: User[]
        branches: Branch[]
    }>().props
    const errors = usePage<{ errors?: Record<string, string> }>().props.errors || {};
    const [showForm, setShowForm] = useState(false);
    const [editWarehouse, setEditWarehouse] = useState<Warehouse | null>(null);
    const [search, setSearch] = useState('');

    const openForm = (item?: Warehouse) => {
        setEditWarehouse(item || null);
        setShowForm(true);
    }

    const closeForm = () => {
        setShowForm(false);
        setEditWarehouse(null);
    };


    const [deleteItem, setDeleteItem] = useState<Warehouse | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const filtered = warehouses.filter((w) =>
        w.name.toString().toLowerCase().includes(search.toLowerCase())
    );

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filtered, 6);

    const confirmDelete = (item: Warehouse) => {
        notify.confirmDelete({
            message: `Hapus ${item.name}?`,
            onConfirm: () => performDelete(item),
        });
    };

    const performDelete = (item: Warehouse) => {
        router.delete(destroy(item.id), {
            onSuccess: () => {
                notify.success(`${item.name} berhasil dihapus`);
            },
            onError: () => {
                notify.error(`Gagal menghapus ${item.name}`);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gudang" >
                <meta name="robots" content="noindex" />
            </Head>
            <div className="p-4">
                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Gudang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {can('gudang.create') && (
                        <Button onClick={() => openForm()} size="lg" className='w-full sm:w-fit'>
                            <Plus />
                            Tambah
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paginatedData.map((w) => (
                        <div
                            key={w.id}
                            className="flex flex-col gap-4 rounded-xl border border-sidebar-border/70 bg-background px-4 pt-4 pb-6 shadow-sm dark:border-sidebar-border"
                        >
                            <div className="flex items-start justify-between">
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

                                <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-bold text-primary dark:bg-muted dark:text-muted-foreground">
                                    {w.branch? w.branch.name : ''}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-between">
                                <div className="w-full text-center px-2 py-3 bg-chart-4/4 dark:bg-chart-3/3 rounded-lg text-xs">
                                    <div className="text-md text-muted-foreground">
                                        PIC
                                    </div>

                                    <div className="text-sm font-semibold">
                                        {w.user?.name ?? '-'}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 justify-end">
                                <button onClick={() => router.get(show(w))}>
                                    <Eye className="size-4 text-muted-foreground hover:text-primary" />
                                </button>
                                {can('gudang.update') && (
                                    <button onClick={() => openForm(w)}>
                                        <SquarePen className="size-4 text-muted-foreground hover:text-primary" />
                                    </button>
                                )}
                                {can('gudang.delete') && (
                                    <button onClick={() => confirmDelete(w)}>
                                        <Trash2 className="size-4 text-muted-foreground hover:text-red-600" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goTo}
                />

                {showForm && (
                    <Form 
                        warehouse={editWarehouse}
                        onClose={closeForm}
                        users={users}
                        branches={branches}
                    />
                )}
            </div>
        </AppLayout>
    );
}
