import { Head, usePage, router } from '@inertiajs/react';
import { Warehouse, MapPin, SquarePen, Trash2, Plus, X, Eye } from 'lucide-react';
import React, { useState } from 'react';
import {
    FormInput,
    FormTextarea,
    FormSwitch,
    FormSelect,
} from '@/components/admin';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { store, update, destroy, show } from '@/routes/master/warehouses';
import type { BreadcrumbItem } from '@/types';

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

interface Warehouse {
    id: number;
    name: string;
    address?: string;
    user_id?: number | null;
    user?: User | null;
    status: 'active' | 'nonactive';
}

type WarehouseForm = {
    name: string;
    address: string;
    user_id: string;
    status: 'active' | 'nonactive';
};

export default function Warehouses() {
    const { warehouses, users } = usePage<{
        warehouses: Warehouse[]
        users: User[]
    }>().props
    const errors = usePage<{ errors?: Record<string, string> }>().props.errors || {};
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState<Warehouse | null>(null);
    const [search, setSearch] = useState('');

    const emptyForm: WarehouseForm = {
        name: '',
        address: '',
        user_id: '',
        status: 'active',
    }
    const [form, setForm] = useState(emptyForm);

    const openForm = (item?: Warehouse) => {
        if (item) {
            setEditItem(item)
            setForm({
                name: item.name,
                address: item.address || '',
                user_id: String(item.user_id ?? ''),
                status: item.status === 'active' ? 'active' : 'nonactive',
            })
        } else {
            setEditItem(null)
            setForm(emptyForm)
        }

        setShowCreate(true)
    }

    const closeForm = () => {
        setShowCreate(false);
        setEditItem(null);
        setForm(emptyForm);
    };


    const [deleteItem, setDeleteItem] = useState<Warehouse | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const filtered = warehouses.filter((w) =>
        w.name.toString().toLowerCase().includes(search.toLowerCase())
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name: form.name,
            address: form.address,
            user_id: form.user_id || null,
            status: form.status,
        }
        if (editItem) {
            router.put(update(editItem.id), payload, {
                onSuccess: () => {
                    closeForm();
                },
            });
        } else {
            router.post(store(), payload, {
                onSuccess: () => closeForm(),
            });
        }
    };

    const confirmDelete = (item: Warehouse) => {
        setDeleteItem(item);
        setToastMessage(`Hapus ${item.name}?`);
    };

    const performDelete = () => {
        if (deleteItem) {
            router.delete(destroy(deleteItem.id), {
                onSuccess: () => {
                    setToastMessage(null);
                    setDeleteItem(null);
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Warehouses" />
            <div className="p-4">
                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Gudang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => openForm()} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((w) => (
                        <div
                            key={w.id}
                            className="flex flex-col gap-4 rounded-xl border border-sidebar-border/70 bg-background px-4 pt-4 pb-6 shadow-sm dark:border-sidebar-border"
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
                                <button onClick={() => openForm(w)}>
                                    <SquarePen className="size-4 text-muted-foreground hover:text-primary" />
                                </button>
                                <button onClick={() => confirmDelete(w)}>
                                    <Trash2 className="size-4 text-muted-foreground hover:text-red-600" />
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                {(showCreate || editItem) && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate__animated animate__fadeIn p-1"
                        onClick={() => closeForm()}
                    >
                        <div className="bg-background rounded-lg py-6 w-full max-w-2xl shadow-lg animate__animated animate__zoomIn"
                             onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center border-b border-sidebar-border pb-2 px-6 mb-4">
                                <h2 className="text-lg font-semibold">
                                    {editItem ? `Edit ${editItem.name}` : 'Tambah Gudang'}
                                </h2>
                                <X className="h-5 w-5 cursor-pointer" onClick={closeForm} />
                            </div>
                            <form onSubmit={submitForm} className="space-y-4 px-6">
                                <FormInput
                                    label="Nama Gudang"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    error={errors.name}
                                    required
                                    placeholder="Nama gudang..."
                                />
                                <FormTextarea
                                    label="Alamat"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    error={errors.address}
                                    placeholder="Alamat gudang..."
                                />
                                <FormSelect
                                    label="PIC Gudang"
                                    value={form.user_id}
                                    onChange={(e) =>
                                        setForm({ ...form, user_id: e.target.value })
                                    }
                                    error={errors.user_id}
                                    options={[
                                        { value: '', label: 'Pilih PIC' },
                                        ...users.map((u: any) => ({
                                            value: String(u.id),
                                            label: u.name,
                                        })),
                                    ]}
                                />
                                {/* <FormStatusRadio
                                    value={form.status}
                                    onChange={(val) => setForm({ ...form, status: val })}
                                    error={errors.status}
                                /> */}
                                <FormSwitch
                                    label="Aktif"
                                    value={form.status}
                                    onChange={(val) => setForm({ ...form, status: val })}
                                    error={errors.status}
                                />

                                <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-sidebar-border">
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={closeForm}
                                    >
                                        Batal
                                    </Button>
                                    <Button type="submit">
                                        Simpan
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {toastMessage && (
                    <div className="fixed bottom-4 right-4 bg-background border border-sidebar-border/70 rounded-lg p-4 shadow-lg flex items-center gap-4">
                        <span>{toastMessage}</span>
                        <button
                            className="text-red-600 font-semibold"
                            onClick={performDelete}
                        >
                            Ya
                        </button>
                        <button
                            className="text-muted-foreground"
                            onClick={() => setToastMessage(null)}
                        >
                            Tidak
                        </button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
