import { Head, usePage, router } from '@inertiajs/react';
import { Plus, SquarePen, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import {
    FormInput,
    FormCheckbox,
} from '@/components/admin';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { store, update, destroy } from '@/routes/master/payment-methods';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Metode Pembayaran',
        href: '/master/payment-methods',
    },
];

interface PaymentMethod {
    id: number;
    name: string;
    icon?: string;
    status: string;
    created_at: string;
}

type PaymentMethodForm = {
    name: string;
    icon: string;
    status: boolean;
};

export default function Index() {
    const { methods } = usePage<{ methods: PaymentMethod[] }>().props;
    const errors = usePage<{ errors?: Record<string, string> }>().props.errors || {};
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState<PaymentMethod | null>(null);
    const [search, setSearch] = useState('');

    const emptyForm: PaymentMethodForm = {
        name: '',
        icon: '',
        status: true,
    };
    const [form, setForm] = useState(emptyForm);

    const openForm = (item?: PaymentMethod) => {
        if (item) {
            setEditItem(item);
            setForm({
                name: item.name,
                icon: item.icon || '',
                status: item.status === 'active',
            });
        } else {
            setEditItem(null);
            setForm(emptyForm);
        }
        setShowCreate(true);
    };

    const closeForm = () => {
        setShowCreate(false);
        setEditItem(null);
        setForm(emptyForm);
    };

    const emojis = ['💵', '🏦', '📱', '💳', '🪙', '💰'];

    const [deleteItem, setDeleteItem] = useState<PaymentMethod | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const filtered = methods.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name: form.name,
            icon: form.icon,
            status: form.status ? 'active' : 'inactive',
        };
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

    const confirmDelete = (item: PaymentMethod) => {
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
                    <Button onClick={() => openForm()} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    {filtered.map((m) => (
                        <div
                            key={m.id}
                            className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border cursor-pointer flex items-center justify-between gap-4"
                            onClick={() => openForm(m)}
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
                                <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800'
                                     onClick={() => openForm(m)}>
                                    <SquarePen className="size-4 cursor-pointer" />
                                </div>
                                <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800'
                                     onClick={() => confirmDelete(m)}>
                                    <Trash2 className="size-4 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {(showCreate || editItem) && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate__animated animate__fadeIn p-1"
                        onClick={() => {
                            setShowCreate(false);
                            setEditItem(null);
                        }}
                    >
                        <div className="bg-background rounded-lg py-6 w-full max-w-2xl shadow-lg animate__animated animate__zoomIn"
                             onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center border-b border-sidebar-border pb-2 px-6 mb-4">
                                <h2 className="text-lg font-semibold">
                                    {editItem ? `Edit ${editItem.name}` : 'Tambah Metode Pembayaran'}
                                </h2>
                                <X className="h-5 w-5 cursor-pointer" onClick={closeForm} />
                            </div>
                            <form onSubmit={submitForm} className="space-y-4 px-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Pilih ikon</label>
                                    <div className="flex flex-wrap gap-2">
                                        {emojis.map((emo) => (
                                            <button
                                                key={emo}
                                                type="button"
                                                onClick={() => setForm((f) => ({ ...f, icon: emo }))}
                                                className={`w-12 h-12 p-2 text-xl rounded-xl cursor-pointer ${form.icon === emo ? 'bg-primary/20 border-2 border-primary' : 'bg-muted hover:bg-muted/75'}`}
                                            >
                                                {emo}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <FormInput
                                    label="Nama Metode Pembayaran"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    error={errors.name}
                                    required
                                    placeholder="Nama metode pembayaran..."
                                />
                                <FormCheckbox
                                    label="Aktif"
                                    checked={form.status}
                                    onChange={(e) => setForm({ ...form, status: e.target.checked })}
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
