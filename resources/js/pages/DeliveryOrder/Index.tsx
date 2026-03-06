import { Head } from "@inertiajs/react";
import { ArrowDownToLine, ArrowUpToLine, Dot, Eye, Package, Plus, Printer, Truck } from "lucide-react";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Surat Jalan',
        href: '/surat-jalan',
    }
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Surat Jalan" />
            <div className="space-y-6 p-4">
                <div className="flex justify-between items-center mb-4 gap-2">
                    <button
                        type="button"
                        // onClick={() => setActiveTab('barang')}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors bg-primary text-primary-foreground`}
                    >
                        <ArrowDownToLine className="size-4" />
                        SJ Masuk
                    </button>
                    <button
                        type="button"
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors bg-muted text-muted-foreground hover:bg-muted/80`}
                    >
                        <ArrowUpToLine className="size-4" />
                        SJ Keluar
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Total
                        </div>
                        <h1 className="text-xl font-semibold">12</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Proses
                        </div>
                        <h1 className="text-yellow-600 dark:text-yellow-700 text-xl font-semibold">8</h1>
                    </div>
                    <div className='rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border text-center'>
                        <div className="text-xs text-muted-foreground">
                            Selesai
                        </div>
                        <h1 className="text-xl font-semibold">4</h1>
                    </div>
                </div>

                <div className="flex gap-2 items-center mb-4">
                    <SearchInput
                        placeholder="Cari Surat Jalan..."
                        value=''
                        // onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button className="w-fit">
                        <Plus />
                        Buat
                    </Button>
                </div>

                {/* Data */}
                <div className="grid grid-cols-1 gap-3">
                    <div className="rounded-xl border bg-background overflow-x-auto font-semibold">
                        <div
                            // key={w.id}
                            className="flex flex-col gap-2 rounded-xl border border-sidebar-border/70 bg-background px-4 pt-4 pb-6 shadow-sm dark:border-sidebar-border"
                        >
                            <div className="flex justify-between items-start">
                                <div className="">
                                    <p className="text-sm">
                                        SJM/20260220/001
                                    </p>
                                    <p className="text-xs font-normal">2026-02-20</p>
                                </div>
                                <span className="text-xs font-light px-2 py-1 rounded-full bg-primary/10 text-primary">
                                    Selesai
                                </span>
                            </div>
                            <div className="flex gap-2 text-sm items-center text-muted-foreground/75">
                                <Truck className="size-4" />
                                PT Segar Abadi
                            </div>
                            <div className="flex gap-2 text-sm items-center text-muted-foreground/75">
                                <Package className="size-4" />
                                <div className="flex items-center font-medium">
                                    <p className="-mr-1">2 Item</p><Dot/><p className="-ml-1">80 Total</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 justify-between">
                                <button className="w-full bg-muted flex gap-2 items-center justify-center p-2 rounded-lg font-medium">
                                    <Eye className="size-4 text-muted-foreground hover:text-primary" />
                                    Detail
                                </button>
                                <button className="w-full bg-muted flex gap-2 items-center justify-center p-2 rounded-lg font-medium">
                                    <Printer className="size-4 text-muted-foreground hover:text-red-600" />
                                    Cetak
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-background overflow-x-auto font-semibold">
                        <div
                            // key={w.id}
                            className="flex flex-col gap-2 rounded-xl border border-sidebar-border/70 bg-background px-4 pt-4 pb-6 shadow-sm dark:border-sidebar-border"
                        >
                            <div className="">
                                <p className="text-sm">
                                    SJM/20260220/001
                                </p>
                                <p className="text-xs font-normal">2026-02-20</p>
                            </div>
                            <div className="flex gap-2 text-sm items-center text-muted-foreground/75">
                                <Truck className="size-4" />
                                PT Segar Abadi
                            </div>
                            <div className="flex gap-2 text-sm items-center text-muted-foreground/75">
                                <Package className="size-4" />
                                <div className="flex items-center font-medium">
                                    <p className="-mr-1">2 Item</p><Dot/><p className="-ml-1">80 Total</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 justify-between">
                                <button className="w-full bg-muted flex gap-2 items-center justify-center p-2 rounded-lg font-medium">
                                    <Eye className="size-4 text-muted-foreground hover:text-primary" />
                                    Detail
                                </button>
                                <button className="w-full bg-muted flex gap-2 items-center justify-center p-2 rounded-lg font-medium">
                                    <Printer className="size-4 text-muted-foreground hover:text-red-600" />
                                    Cetak
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-background overflow-x-auto font-semibold">
                        <div
                            // key={w.id}
                            className="flex flex-col gap-2 rounded-xl border border-sidebar-border/70 bg-background px-4 pt-4 pb-6 shadow-sm dark:border-sidebar-border"
                        >
                            <div className="">
                                <p className="text-sm">
                                    SJM/20260220/001
                                </p>
                                <p className="text-xs font-normal">2026-02-20</p>
                            </div>
                            <div className="flex gap-2 text-sm items-center text-muted-foreground/75">
                                <Truck className="size-4" />
                                PT Segar Abadi
                            </div>
                            <div className="flex gap-2 text-sm items-center text-muted-foreground/75">
                                <Package className="size-4" />
                                <div className="flex items-center font-medium">
                                    <p className="-mr-1">2 Item</p><Dot/><p className="-ml-1">80 Total</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 justify-between">
                                <button className="w-full bg-muted flex gap-2 items-center justify-center p-2 rounded-lg font-medium">
                                    <Eye className="size-4 text-muted-foreground hover:text-primary" />
                                    Detail
                                </button>
                                <button className="w-full bg-muted flex gap-2 items-center justify-center p-2 rounded-lg font-medium">
                                    <Printer className="size-4 text-muted-foreground hover:text-red-600" />
                                    Cetak
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}