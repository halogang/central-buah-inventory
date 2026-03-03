import { Head, usePage } from '@inertiajs/react';
import { Plus, SquarePen, Tag, Trash2, Wallet } from 'lucide-react';
import { useState } from 'react';
import { SearchInput } from '@/components/search-input';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

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
    created_at: string;
}

export default function Categories() {
    const { categories } = usePage<{ categories: Category[] }>().props;

    const [showCreate, setShowCreate] = useState(false);
    const [editCat, setEditCat] = useState<Category | null>(null);
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<'barang' | 'pengeluaran'>(
        'barang'
    );

    const filtered = categories
        .filter((c) => c.type === activeTab)
        .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="p-4">
                <div className="flex justify-between items-center mb-4 gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('barang')}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
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
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
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
                    <Button onClick={() => setShowCreate(true)} size="lg" className='w-full sm:w-fit'>
                        <Plus />
                        Tambah
                    </Button>
                </div>

                <div className="flex flex-col gap-4">
                    {filtered.map((cat) => (
                        <div
                            key={cat.id}
                            className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border cursor-pointer flex items-center justify-between gap-4"
                            onClick={() => setEditCat(cat)}
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className={`rounded-md p-3 ${
                                        cat.type === 'barang'
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-chart-4/20 text-chart-4 dark:bg-chart-3/20 dark:text-chart-3'
                                    }`}
                                >
                                    {cat.type === 'barang' ? (
                                        <Tag className="size-5" />
                                    ) : (
                                        <Wallet className="size-5" />
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
                                <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800'>
                                    <SquarePen className="size-4 cursor-pointer" onClick={() => setEditCat(cat)} />
                                </div>
                                <div className='p-2 rounded-xl hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-800'>
                                    <Trash2 className="size-4 cursor-pointer hover:bg-gray-100" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {showCreate && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Create category (placeholder)</h2>
                            <button onClick={() => setShowCreate(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {editCat && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>Edit {editCat.name} (placeholder)</h2>
                            <button onClick={() => setEditCat(null)}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
