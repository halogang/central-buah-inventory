import { Head, usePage, router } from '@inertiajs/react';
import { Eye, Edit3, Trash2, Plus, X, TriangleAlert } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import {
    FormInput,
    FormSelect,
} from '@/components/admin';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { store, update, destroy } from '@/routes/master/items';
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
    id: number;
    name: string;
}

interface Warehouse {
    id: number;
    name: string;
}

interface Item {
    id: number;
    icon?: string;
    name: string;
    category?: Category;
    unit: string;
    warehouse?: Warehouse;
    purchase_price: number;
    selling_price: number;
    stock: number;
    min_stock: number;
    bad_stock: number;
    created_at: string;
}

type ItemForm = {
    icon: string;
    name: string;
    category_id: string;
    unit: string;
    warehouse_id: string;
    purchase_price: string;
    selling_price: string;
    stock: string;
    min_stock: string;
    bad_stock: number;
};

export default function Items() {
    const { items, categories = [], warehouses = [] } = usePage<{
        items: Item[];
        categories: Category[];
        warehouses: Warehouse[];
        errors?: Record<string, string>;
    }>().props;
    const errors = usePage<{ errors?: Record<string, string> }>().props.errors || {};
    const [showCreate, setShowCreate] = useState(false);
    const [editItem, setEditItem] = useState<Item | null>(null);
    const [search, setSearch] = useState('');

    // form state for create/update
    const emptyForm: ItemForm = {
        icon: '',
        name: '',
        category_id: '',
        unit: 'kg',
        warehouse_id: '',
        purchase_price: '',
        selling_price: '',
        stock: '',
        min_stock: '',
        bad_stock: 0,
    };
    const [form, setForm] = useState(emptyForm);

    // helpers to open/close modal and sync form state
    const openForm = (item?: Item) => {
        if (item) {
            setEditItem(item);
            setForm({
                icon: item.icon || '',
                name: item.name,
                category_id: String(item.category?.id || ''),
                unit: item.unit,
                warehouse_id: String(item.warehouse?.id || ''),
                purchase_price: String(item.purchase_price ?? ''),
                selling_price: String(item.selling_price ?? ''),
                stock: String(item.stock ?? ''),
                min_stock: String(item.min_stock ?? ''),
                bad_stock: item.bad_stock ?? 0,
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

    const emojis = ['🥭','🍎','🍉','🍌','🍊','🍇','🍍','🍓','🥝','🥑','🍈','🍑','🍒','🫐','🍋','🥥','🍐','🍏'];
    const units = ['kg','sisir','biji','pack'];

    // deletion confirmation toast
    const [deleteItem, setDeleteItem] = useState<Item | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const filtered = items.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...form,
            purchase_price: Number(form.purchase_price),
            selling_price: Number(form.selling_price),
            stock: Number(form.stock),
            min_stock: Number(form.min_stock),
            bad_stock: Number(form.bad_stock),
        };

        if (editItem) {
            router.put(update(editItem.id), payload, {
                onSuccess: () => {
                    setShowCreate(false);
                    setEditItem(null);
                },
            });
        } else {
            router.post(store(), payload, {
                onSuccess: () => setShowCreate(false),
            });
        }
    };

    const confirmDelete = (item: Item) => {
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
                        <h1 className="text-red-400 text-xl font-semibold">{items.reduce((total, item) => total + Number(item.bad_stock || 0), 0)}</h1>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Barang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={() => openForm()} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((i) => (
                        <div
                            key={i.id}
                            className="flex flex-col gap-4 rounded-xl border border-sidebar-border/70 bg-background px-4 pt-4 pb-6 shadow-sm dark:border-sidebar-border"
                        >
                            <div className="flex items-start gap-3">
                                <div className="text-4xl text-center p-3 bg-muted-foreground/20 rounded-2xl">{i.icon}</div>
                                <div>
                                    <div className="font-semibold text-sm">
                                        {i.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground flex flex-col">
                                        <p className='text-primary'>{i.category?.name}</p>
                                        <p>Satuan: {i.unit}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 justify-between">
                                <div className='w-full text-center px-2 py-3 bg-chart-4/4 dark:bg-chart-3/3 rounded-lg text-xs'>
                                    <div className="text-md text-muted-foreground">Harga Beli</div>
                                    <div className="text-sm font-semibold">{formatCurrency(i.purchase_price)}</div>
                                </div>
                                <div className='w-full text-center px-2 py-3 bg-chart-4/4 dark:bg-chart-3/3 rounded-lg text-xs'>
                                    <div className="text-md text-muted-foreground">Harga Jual</div>
                                    <div className="text-sm font-semibold text-chart-4 dark:text-chart-3">{formatCurrency(i.selling_price)}</div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center gap-3 text-xs">
                                    <div className={
                                        `px-2 py-1 rounded-full font-medium ${i.stock < i.min_stock
                                            ? 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400'
                                            : 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400'
                                        }`
                                    }>
                                        Stok: <span>{i.stock}</span>
                                    </div>
                                    {i.bad_stock > 0 && (
                                        <div className="flex items-center gap-1 rounded-full px-2 py-1
                                                bg-yellow-100 text-yellow-700
                                                dark:bg-yellow-500/15 dark:text-yellow-400">
                                                
                                                <TriangleAlert className="h-3 w-3" />
                                                <span className="font-medium">{i.bad_stock}</span>
                                            </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                    <button
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onClick={() => openForm(i)}
                                    >
                                        <Edit3 className="h-4 w-4" />
                                    </button>
                                    <button
                                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                                        onClick={() => confirmDelete(i)}
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {(showCreate || editItem) && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate__animated animate__fadeIn p-1"
                        onClick={() => closeForm()}
                    >
                        <div className="bg-background rounded-lg py-6 w-full max-w-4xl shadow-lg animate__animated animate__zoomIn"
                             onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-cent border-b border-sidebar-border pb-2 px-6 mb-2">
                                <h2 className="text-lg font-semibold">
                                    {editItem ? `Edit ${editItem.name}` : 'Tambah Barang'}
                                </h2>
                                <X className="h-5 w-5 cursor-pointer" onClick={closeForm} />
                            </div>
                            <form onSubmit={submitForm} className="space-y-4 px-6">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Pilih emoji buah</label>
                                    <div className="flex flex-wrap gap-2">
                                        {emojis.map((emo) => (
                                            <button
                                                key={emo}
                                                type="button"
                                                onClick={() => setForm((f) => ({ ...f, icon: emo }))}
                                                className={`w-12 h-12 p-2 text-xl rounded-xl cursor-pointer ${form.icon === emo ? 'bg-primary/20 border-2 border-primary' : 'bg-muted hover:bg-muted/75   '}`}
                                            >
                                                {emo}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        label="Nama Barang"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        error={errors.name}
                                        required
                                        placeholder="Nama barang..."
                                    />
                                    <FormSelect
                                        label="Kategori"
                                        value={form.category_id}
                                        onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                                        options={categories.map(c => ({ value: String(c.id), label: c.name }))}
                                        error={errors.category_id}
                                        required
                                    />
                                    <FormSelect
                                        label="Satuan"
                                        value={form.unit}
                                        onChange={(e) => setForm({ ...form, unit: e.target.value })}
                                        options={units.map(u => ({ value: u, label: u }))}
                                        error={errors.unit}
                                        required
                                    />
                                    <FormSelect
                                        label="Gudang"
                                        value={form.warehouse_id}
                                        onChange={(e) => setForm({ ...form, warehouse_id: e.target.value })}
                                        options={warehouses.map(w => ({ value: String(w.id), label: w.name }))}
                                        error={errors.warehouse_id}
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <FormInput
                                        label="Harga Beli"
                                        type="number"
                                        value={form.purchase_price}
                                        onChange={(e) => setForm({ ...form, purchase_price: e.target.value })}
                                        error={errors.purchase_price}
                                        required
                                        placeholder="0"
                                    />
                                    <FormInput
                                        label="Harga Jual"
                                        type="number"
                                        value={form.selling_price}
                                        onChange={(e) => setForm({ ...form, selling_price: e.target.value })}
                                        error={errors.selling_price}
                                        required
                                        placeholder="0"
                                    />
                                    <FormInput
                                        label="Stok"
                                        type="number"
                                        value={form.stock}
                                        onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                        error={errors.stock}
                                        required
                                        placeholder="0"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormInput
                                        label="Min Stok"
                                        type="number"
                                        value={form.min_stock}
                                        onChange={(e) => setForm({ ...form, min_stock: e.target.value })}
                                        error={errors.min_stock}
                                        required
                                        placeholder="0"
                                    />
                                    <FormInput
                                        label="Bad Stok"
                                        type="number"
                                        value={form.bad_stock}
                                        onChange={(e) => setForm({ ...form, bad_stock: Number(e.target.value) })}
                                        error={errors.bad_stock}
                                        required
                                        placeholder="0"
                                    />
                                </div>

                                <div className="flex justify-end gap-2 mt-4">
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

                {/* delete toast */}
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
