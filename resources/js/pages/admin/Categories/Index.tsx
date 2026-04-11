import { Head, router, usePage } from '@inertiajs/react';
import { Plus, SquarePen, Tag, Trash2, Wallet } from 'lucide-react';
import { useState } from 'react';
import Pagination from '@/components/Pagination';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import { usePagination } from '@/hooks/use-pagination';
import AppLayout from '@/layouts/app-layout';
import { notify } from '@/lib/notify';
import { destroy } from '@/routes/master/categories';
import type { BreadcrumbItem } from '@/types';
import Form from './components/Form';
import { useCan } from '@/utils/permissions';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Kategori',
        href: '/categories',
    },
];

interface Category {
    id: number;
    name: string;
    description?: string;
    type: string;
    icon: string;
    image: string;
    image_url: string;
    thumbnail_url: string;
    created_at: string;
}

export default function Index() {
    const can = useCan();

    const { categories } = usePage<{ categories: Category[] }>().props;

    const [showForm, setShowForm] = useState(false);
    const [editCat, setEditCat] = useState<Category | null>(null);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<'barang' | 'pengeluaran'>(
        'barang'
    );

    const openCreate = () => {
        setEditCat(null);
        setShowForm(true);
    };
    const openEdit = (category: Category) => {
        setEditCat(category);
        setShowForm(true);
    }

    const confirmDelete = (category: Category) => {
        notify.confirmDelete({
            message: `Hapus ${category.name}?`,
            onConfirm: () => performDelete(category),
        })
    }
    const performDelete = (category: Category) => {
        const loading = notify.loading("Menghapus kategori...")

        router.delete(destroy(category.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success(`${category.name} berhasil dihapus`)
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error(`Gagal menghapus ${category.name}`)
            },
        })
    }

    const filtered = categories
        .filter((c) => c.type === activeTab)
        .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filtered, 6);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kategori" >
                <meta name="robots" content="noindex" />
            </Head>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4 gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('barang')}
                        className={`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                            activeTab === 'barang'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                        <Tag className="size-4" />
                        Kategori Barang
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('pengeluaran')}
                        className={`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                            activeTab === 'pengeluaran'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                    >
                        <Wallet className="size-4" />
                        Kategori Pengeluaran
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
                    <SearchInput
                        placeholder="Cari Kategori..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {can('kategori.create') && (
                        <Button onClick={openCreate} size="lg" className='w-full sm:w-fit cursor-pointer'>
                            <Plus />
                            Tambah
                        </Button>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    {paginatedData.map((cat) => (
                        <div
                            key={cat.id}
                            className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border flex items-center justify-between gap-4"
                            onClick={() => setEditCat(cat)}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`rounded-xl overflow-hidden flex items-center justify-center ${
                                        cat.type === "barang" && cat.image
                                            ? "p-0"
                                            : cat.type === "barang"
                                            ? "bg-primary/10 text-primary p-3 text-3xl"
                                            : "bg-chart-4/20 text-chart-4 dark:bg-chart-3/20 dark:text-chart-3 p-3 text-xl"
                                    }`}
                                >
                                    {cat.type === "barang" ? (
                                        cat.image ? (
                                            <img
                                                src={cat.thumbnail_url}
                                                alt={cat.name}
                                                className="w-12 h-12 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <Tag className="size-5" />
                                        )
                                    ) : (
                                        cat.icon ?? <Wallet className="size-5" />
                                    )}
                                </div>
                                <div>
                                    <div className="font-semibold text-md">
                                        {cat.name}
                                    </div>
                                    {cat.description && (
                                        <div className="text-[12px] text-muted-foreground">
                                            {cat.description}
                                        </div>
                                    )}
                                </div>  
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                                {can('kategori.update') && (
                                    <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800'>
                                        <SquarePen className="size-4 cursor-pointer" onClick={() => openEdit(cat)} />
                                    </div>
                                )}
                                {can('kategori.delete') && (
                                    <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800'>
                                        <Trash2 className="size-4 cursor-pointer hover:bg-gray-100" 
                                            onClick={() => confirmDelete(cat)}
                                        />
                                    </div>
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
                        category={editCat}
                        onClose={()=>setShowForm(false)}
                        activeTab={activeTab}
                    />
                )}
            </div>
        </AppLayout>
    );
}
