import { Head, router, usePage } from "@inertiajs/react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { notify } from "@/lib/notify";
import { destroy } from "@/routes/master/units";
import type { BreadcrumbItem } from '@/types';
import Form from "./components/Form";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Keranjang',
        href: '/master/carts',
    },
];

interface Unit {
    id: number;
    unit_code: string;
    description: string;
}

interface Cart {
    id: number;
    name: string;
    unit?: Unit;
    weight: number;
}

export default function Index() {
    const { carts } = usePage<{
        carts: Cart[];
        errors?: Record<string, string>;
    }>().props;
    const [showForm, setShowForm] = useState(false);
    const [editCart, setEditCart] = useState<Cart | null>(null);
    const [search, setSearch] = useState('');

    const openCreate = () => {
        setEditCart(null);
        setShowForm(true);
    };
    const openEdit = (cart: Cart) => {
        setEditCart(cart);
        setShowForm(true);
    }

    const confirmDelete = (cart: Cart) => {
        notify.confirmDelete({
            message: `Hapus ${cart.name}?`,
            onConfirm: () => performDelete(cart),
        })
    }
    const performDelete = (cart: Cart) => {
        const loading = notify.loading("Mennghapus kategori...")

        router.delete(destroy(cart.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success(`${cart.name} berhasil dihapus`)
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error(`Gagal menghapus ${cart.name}`)
            },
        })
    }

    const filtered = carts.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className="p-4">
                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Keranjang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={openCreate} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="rounded-xl border bg-background overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left p-3">Nama</th>
                                <th className="text-left p-3">Kode Unit</th>
                                <th className="text-left p-3">Berat</th>
                                <th className="text-left p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((cart) => (
                                <tr
                                    key={cart.id}
                                    className="border-t hover:bg-muted/30 transition"
                                >
                                    <td className="p-3">
                                        {cart.name}
                                    </td>
                                    <td className="p-3">
                                        {cart.unit?.unit_code}
                                    </td>
                                    <td className="p-3">
                                        {cart.weight}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                            onClick={() => openEdit(cart)}
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                            onClick={() => confirmDelete(cart)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showForm && (
                    <Form 
                        cart={editCart}
                        onClose={()=>setShowForm(false)}
                    />
                )}
            </div>
        </AppLayout>
    )
}