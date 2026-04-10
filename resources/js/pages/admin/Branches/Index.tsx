import { Head, router, usePage } from "@inertiajs/react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { usePagination } from "@/hooks/use-pagination";
import AppLayout from "@/layouts/app-layout";
import { notify } from "@/lib/notify";
import { destroy } from "@/routes/master/branches";
import type { BreadcrumbItem } from '@/types';
import Form from "./components/Form";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Keranjang',
        href: '/master/branches',
    },
];

interface Branch {
    id: number;
    name: string;
    contact: string;
    address: string;
}

export default function Index() {
    const { branches } = usePage<{
        branches: Branch[];
        errors?: Record<string, string>;
    }>().props;
    const [showForm, setShowForm] = useState(false);
    const [editBranch, setEditBranch] = useState<Branch | null>(null);
    const [search, setSearch] = useState('');

    const openCreate = () => {
        setEditBranch(null);
        setShowForm(true);
    };
    const openEdit = (branch: Branch) => {
        setEditBranch(branch);
        setShowForm(true);
    }

    const confirmDelete = (branch: Branch) => {
        notify.confirmDelete({
            message: `Hapus ${branch.name}?`,
            onConfirm: () => performDelete(branch),
        })
    }
    const performDelete = (branch: Branch) => {
        const loading = notify.loading("Menghapus cabang...")

        router.delete(destroy(branch.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success(`${branch.name} berhasil dihapus`)
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error(`Gagal menghapus ${branch.name}`)
            },
        })
    }

    const filtered = branches.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
    );

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filtered, 10);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cabang" >
                <meta name="robots" content="noindex" />
            </Head>
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
                                <th className="text-left p-3">Kontak</th>
                                <th className="text-left p-3">Alamat</th>
                                <th className="text-left p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((branch) => (
                                <tr
                                    key={branch.id}
                                    className="border-t hover:bg-muted/30 transition"
                                >
                                    <td className="p-3">
                                        {branch.name}
                                    </td>
                                    <td className="p-3">
                                        {branch.contact}
                                    </td>
                                    <td className="p-3">
                                        {branch.address}
                                    </td>
                                    <td className="p-3 text-center">
                                        <button
                                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                            onClick={() => openEdit(branch)}
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                            onClick={() => confirmDelete(branch)}
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
                        branch={editBranch}
                        onClose={()=>setShowForm(false)}
                    />
                )}
            </div>
        </AppLayout>
    )
}