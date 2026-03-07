import { Head } from "@inertiajs/react";
import { Camera, FileText, Package, PackageOpen, Save } from "lucide-react";
import { FormInput, FormSelect } from "@/components/admin";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Barang Keluar',
        href: '/stok/keluar',
    }
];

const pelanggan = [
    {
        id: 1,
        name: 'pelanggan A',
    },
    {
        id: 2,
        name: 'pelanggan B',
    }
]

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Barang Masuk" />

            <div className="p-4 space-y-6 mx-auto min-w-2xl pb-28">

                {/* Tanggal & Supplier */}
                <div className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center text-sm font-bold">
                            <PackageOpen className="size-4 text-yellow-600 dark:text-yellow-700" />
                            Info Pengiriman
                        </div>

                        <FormInput
                            label="Tanggal"
                            type="date"
                            value=""
                            placeholder="Pilih tanggal"
                            required
                        />

                        <FormSelect
                            label="Pelanggan"
                            value=""
                            options={pelanggan.map((c: any) => ({
                                value: String(c.id),
                                label: c.name
                            }))}
                            placeholder="Pilih Pelanggan"
                        />
                    </div>
                </div>


                {/* Daftar Barang */}
                <div className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm">
                    <div className="flex justify-between items-center text-sm font-bold">
                        <div className="flex gap-2 items-center mb-3">
                            <Package className="size-4 text-yellow-600 dark:text-yellow-700" />
                            Daftar Barang
                        </div>
                        <div>
                            0 item
                        </div>
                    </div>
                    <button className="w-full border-2 border-dashed rounded-lg py-3 text-green-600 border-green-300 hover:bg-green-50 flex items-center justify-center gap-2">
                        + Tambah Barang
                    </button>
                </div>


                {/* Foto Barang */}
                <div className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm">
                    <div className="flex gap-2 items-center text-sm font-bold mb-3">
                        <Camera className="size-4 text-yellow-600 dark:text-yellow-700" />
                        Foto Barang
                    </div>

                    <div className="border-2 border-dashed rounded-lg h-40 flex items-center justify-center text-gray-400">
                        Tap untuk foto / upload
                    </div>
                </div>


                {/* Penerima */}
                <div className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm space-y-4">

                    <FormInput
                        label="Nama Penerima"
                        placeholder="Nama penerima barang..."
                        value=""
                    />

                    <div>
                        <label className="text-sm font-medium">
                            Tanda Tangan Pengirim
                        </label>

                        <div className="mt-2 border-2 border-dashed rounded-lg h-32 flex items-center justify-center text-gray-400">
                            Tanda tangan di sini
                        </div>
                    </div>

                </div>


                {/* Button */}
                <div className="flex gap-3 font-bold">
                    <Button
                        variant="outline"
                        className="flex-1 py-6"
                    >
                        <FileText />
                        Cetak PDF
                    </Button>

                    <Button
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-6"
                    >
                        <Save />
                        Simpan
                    </Button>
                </div>

            </div>
        </AppLayout>
    )
}