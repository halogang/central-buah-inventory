import { Head, router } from "@inertiajs/react";
import { ArrowLeft, Edit3, Plus, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/use-pagination";
import AppLayout from "@/layouts/app-layout";
import { notify } from "@/lib/notify";
import { destroy, index } from "@/routes/master/items";
import type { BreadcrumbItem } from "@/types";
import Form from "./components/Form";
import { useCan } from "@/utils/permissions";

interface Category {
    id: number;
    name: string;
    description?: string;
}

interface Unit {
    id: number;
    unit_code: string;
    description?: string;
}

interface Branch {
    id: number;
    name: string;
}

interface Warehouse {
    id: number;
    name: string;
    branch?: Branch;
}

interface Item {
    id: number;
    image?: string;
    image_url?: string;
    thumbnail_url?: string;
    name: string;
    unit?: Unit;
    warehouse?: Warehouse;
    category?: Category;
    purchase_price: number;
    selling_price: number;
    stock: number;
    min_stock: number;
    bad_stock: number;
}

function formatCurrency(value: number) {
    try {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(value);
    } catch {
        return String(value);
    }
}

export default function Show({
    category,
    items,
    categories,
    warehouses,
    units
}: {
    category: Category;
    items: Item[];
    categories: Category[];
    warehouses: Warehouse[];
    units: Unit[];
}) {
    const can = useCan();

    const [showForm, setShowForm] = useState(false);
    const [editItem, setEditItem] = useState<Item | null>(null);
    const [search, setSearch] = useState('');

    const openCreate = () => {
        setEditItem(null);
        setShowForm(true);
    };
    
    const openEdit = (item: Item) => {
        setEditItem(item);
        setShowForm(true);
    }

    const confirmDelete = (item: Item) => {
        notify.confirmDelete({
            message: `Hapus ${item.name}?`,
            onConfirm: () => performDelete(item),
        })
    }

    const performDelete = (item: Item) => {

        const loading = notify.loading("Menghapus barang...")

        router.delete(destroy(item.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success(`${item.name} berhasil dihapus`)
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error(`Gagal menghapus ${item.name}`)
            },
        })
    }

    const filteredItems = items.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filteredItems, 10);

    const totalBadStock = items.reduce(
        (total, item) => total + Number(item.bad_stock || 0),
        0
    );

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Master Barang',
            href: '/master/items',
        },
        {
            title: category.name,
            href: "/master/items/" + category.id,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={category.name} >
                <meta name="robots" content="noindex" />
            </Head>

            <div className="p-4 space-y-4">
                {/* Back button */}
                <button
                    className="flex items-center gap-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => router.get(index())}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <h1 className="text-xl font-semibold">Kembali</h1>
                </button>

                {/* Category Header */}
                <div className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm">
                    <h1 className="text-lg font-semibold">{category.name}</h1>
                    <p className="text-sm text-muted-foreground">
                        {category.description}
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-xl border bg-background p-4 text-center">
                        <div className="text-xs text-muted-foreground">
                            Total Item
                        </div>
                        <h1 className="text-xl font-semibold">{items.length}</h1>
                    </div>

                    <div className="rounded-xl border bg-background p-4 text-center">
                        <div className="text-xs text-muted-foreground">
                            Bad Stock
                        </div>
                        <h1 className="text-red-400 text-xl font-semibold">
                            {totalBadStock}
                        </h1>
                    </div>

                    <div className="rounded-xl border bg-background p-4 text-center">
                        <div className="text-xs text-muted-foreground">
                            Stok Rendah
                        </div>
                        <h1 className="text-red-500 text-xl font-semibold">
                            {items.filter((i) => i.stock < i.min_stock).length}
                        </h1>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Barang..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {can('barang.create') && (
                        <Button onClick={openCreate} size="lg" className='w-full sm:w-fit cursor-pointer'>
                            <Plus />
                            Tambah
                        </Button>
                    )}
                </div>

                {/* Table */}
                <div className="rounded-xl border bg-background overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left p-3">Barang</th>
                                <th className="text-left p-3">Gudang</th>
                                <th className="text-left p-3">Unit</th>
                                <th className="text-right p-3">Harga Beli</th>
                                <th className="text-right p-3">Harga Jual</th>
                                <th className="text-center p-3">Min Stok</th>
                                <th className="text-center p-3">Stok</th>
                                <th className="text-center p-3">Bad</th>
                                <th className="text-center p-3"></th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-t hover:bg-muted/30 transition"
                                >
                                   <td className="p-3 flex items-center gap-2">
                                        <span className="text-lg">
                                            {item.image ? (
                                                <img
                                                    src={item.thumbnail_url}
                                                    alt={item.image}
                                                    className="w-8 h-8 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-xs">
                                                    ?
                                                </div>
                                            )}
                                        </span>
                                        {item.name}
                                    </td>

                                    <td className="p-3">
                                        <div className="flex flex-col gap-1">
                                            <span>{item.warehouse?.name || "-"}</span>
                                            <span className="text-xs text-muted-foreground">Cabang {item.warehouse?.branch?.name || "-"}</span>
                                        </div>
                                    </td>

                                    <td className="p-3">{item.unit?.unit_code}</td>

                                    <td className="p-3 text-right">
                                        {formatCurrency(item.purchase_price)}
                                    </td>

                                    <td className="p-3 text-right text-green-600 dark:text-green-400">
                                        {formatCurrency(item.selling_price)}
                                    </td>

                                    <td className="p-3 text-center">
                                        <span
                                            className="px-2 py-1 rounded-full text-xs font-medium text-yellow-700 dark:text-yellow-500"
                                        >
                                            {item.min_stock}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium
                                            ${
                                                item.stock < item.min_stock
                                                    ? "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400"
                                                    : "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                                            }`}
                                        >
                                            {item.stock}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center">
                                        <div className="flex items-center justify-center gap-1 text-yellow-500">
                                            <TriangleAlert className="h-3 w-3" />
                                            {item.bad_stock}
                                        </div>
                                    </td>

                                    <td className="p-3 text-center">
                                        {can('barang.update') && (
                                            <button
                                                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                                onClick={() => openEdit(item)}
                                            >
                                                <Edit3 className="h-4 w-4" />
                                            </button>
                                        )}
                                        {can('barang.delete') && (
                                            <button
                                                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                                onClick={() => confirmDelete(item)}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-600" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}

                            {paginatedData.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="text-center p-6 text-muted-foreground"
                                    >
                                        Tidak ada barang dalam kategori ini
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goTo}
                />

                {showForm && (
                    <Form
                        item={editItem}
                        category={category}
                        categories={categories}
                        warehouses={warehouses}
                        units={units}
                        onClose={()=>setShowForm(false)}
                    />
                )}
            </div>
        </AppLayout>
    );
}