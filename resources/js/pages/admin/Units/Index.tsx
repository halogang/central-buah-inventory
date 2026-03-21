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
import { usePagination } from "@/hooks/use-pagination";
import Pagination from "@/components/Pagination";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Unit',
        href: '/master/units',
    },
];

interface Unit {
    id: number;
    unit_code: string;
    description: string;
}

export default function Index() {
    const { units } = usePage<{
        units: Unit[];
        errors?: Record<string, string>;
    }>().props;
    const [showForm, setShowForm] = useState(false);
    const [editUnit, setEditUnit] = useState<Unit | null>(null);
    const [search, setSearch] = useState('');

    const openCreate = () => {
        setEditUnit(null);
        setShowForm(true);
    };
    const openEdit = (unit: Unit) => {
        setEditUnit(unit);
        setShowForm(true);
    }

    const confirmDelete = (unit: Unit) => {
        notify.confirmDelete({
            message: `Hapus ${unit.unit_code}?`,
            onConfirm: () => performDelete(unit),
        })
    }
    const performDelete = (unit: Unit) => {
        const loading = notify.loading("Menghapus kategori...")

        router.delete(destroy(unit.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success(`${unit.unit_code} berhasil dihapus`)
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error(`Gagal menghapus ${unit.unit_code}`)
            },
        })
    }

    const filtered = units.filter((i) =>
        i.unit_code.toLowerCase().includes(search.toLowerCase())
    );

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filtered, 10);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Items" />
            <div className="p-4">
                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Unit..."
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
                                <th className="text-left p-3">Kode Unit</th>
                                <th className="text-left p-3">Deskripsi</th>
                                <th className="text-left p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((unit) => (
                                <tr
                                    key={unit.id}
                                    className="border-t hover:bg-muted/30 transition"
                                >
                                    <td className="p-3">
                                        {unit.unit_code}
                                    </td>
                                    <td className="p-3">
                                        {unit.description}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                            onClick={() => openEdit(unit)}
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                            onClick={() => confirmDelete(unit)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
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
                        unit={editUnit}
                        onClose={()=>setShowForm(false)}
                    />
                )}
            </div>
        </AppLayout>
    )
}