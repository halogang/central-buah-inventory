import { Head, usePage, router } from '@inertiajs/react';
import { MapPin, Phone, Plus, SquarePen, Trash2, Users, X } from 'lucide-react';
import React, { useState } from 'react';
import {
    FormInput,
    FormTextarea,
} from '@/components/admin';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { store, update, destroy } from '@/routes/master/customers';
import type { BreadcrumbItem } from '@/types';
import { usePagination } from '@/hooks/use-pagination';
import Pagination from '@/components/Pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Pelanggan',
        href: '/master/customers',
    },
];

interface Customer {
    id: number;
    name: string;
    phone?: string;
    address?: string;
    created_at: string;
}

type CustomerForm = {
    name: string;
    phone: string;
    address: string;
};

export default function Index() {
    const { customers } = usePage<{ customers: Customer[] }>().props;
    const errors = usePage<{ errors?: Record<string, string> }>().props.errors || {};
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState<Customer | null>(null);
    const [search, setSearch] = useState('');

    const emptyForm: CustomerForm = {
        name: '',
        phone: '',
        address: '',
    };
    const [form, setForm] = useState(emptyForm);

    // helpers to open/close the create/edit modal and keep form state in sync
    const openForm = (item?: Customer) => {
        if (item) {
            setEditItem(item);
            setForm({
                name: item.name,
                phone: item.phone || '',
                address: item.address || '',
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


    const [deleteItem, setDeleteItem] = useState<Customer | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const filtered = customers.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo
    } = usePagination(filtered, 6);

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        if (editItem) {
            router.put(update(editItem.id), form, {
                onSuccess: () => {
                    closeForm();
                },
            });
        } else {
            router.post(store(), form, {
                onSuccess: () => closeForm(),
            });
        }
    };

    const confirmDelete = (item: Customer) => {
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
            <Head title="Pelanggan" >
                <meta name="robots" content="noindex" />
            </Head>
            <div className="p-4">
                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Pelanggan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => openForm()} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    {paginatedData.map((c) => (
                        <div
                            key={c.id}
                            className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border flex items-center justify-between gap-4"
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
                                <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800'
                                     onClick={() => openForm(c)}>
                                    <SquarePen className="size-4 cursor-pointer" />
                                </div>
                                <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800'
                                     onClick={() => confirmDelete(c)}>
                                    <Trash2 className="size-4 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goTo}
                />

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
                                    {editItem ? `Edit ${editItem.name}` : 'Tambah Pelanggan'}
                                </h2>
                                <X className="h-5 w-5 cursor-pointer" onClick={closeForm} />
                            </div>
                            <form onSubmit={submitForm} className="space-y-4 px-6">
                                <FormInput
                                    label="Nama Pelanggan"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    error={errors.name}
                                    required
                                    placeholder="Nama pelanggan..."
                                />
                                <FormInput
                                    label="No. Telepon"
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    error={errors.phone}
                                    placeholder="08123456789"
                                />
                                <FormTextarea
                                    label="Alamat"
                                    value={form.address}
                                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    error={errors.address}
                                    placeholder="Alamat pelanggan..."
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
