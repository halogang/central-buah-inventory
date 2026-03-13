import {Head, router, usePage} from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout'
import { index } from '@/routes/stok/stok-opname';
import type { BreadcrumbItem } from "@/types";

export default function Show() {

    const {opname} = usePage().props as any

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Stok Opname',
            href: '/stok/stok-opname',
        },
        {
            title: opname.opname_number,
            href: "/stok/stok-opname/" + opname.id,
        },
    ];

    function formatDate(date : string) {

        return new Date(date)
            .toLocaleDateString('id-ID')
            .replace(/\//g, '-')

    }

    return (

        <AppLayout breadcrumbs={breadcrumbs}>

            <Head title="Detail Stock Opname"/>

            <div className="p-4 space-y-4">

                <button
                    className="flex items-center gap-2 p-1 rounded cursor-pointer text-muted-foreground"
                    onClick={() => router.get(index())}
                >
                    <ArrowLeft className="h-4 w-4" />
                    <h1 className="text-lg">Kembali</h1>
                </button>

                <div className="rounded-xl border p-4">

                    <div className="text-lg font-semibold">
                        {opname.opname_number}
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Tanggal : {formatDate(opname.date)}
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Gudang : {
                            opname.warehouse
                                ?.name
                        }
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Dicek oleh : {opname.user?.name}
                    </div>

                </div>

                {/* <div className="rounded-xl border p-4">

                    <table className="w-full text-sm">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left">Item</th>
                                <th>System</th>
                                <th>Physical</th>
                                <th>Difference</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                opname
                                    .items
                                    .map((i : any) => (

                                        <tr key={i.id} className="border-b">

                                            <td>{
                                                    i.item
                                                        ?.name
                                                }</td>

                                            <td className="text-center">
                                                {i.system_stock}
                                            </td>

                                            <td className="text-center">
                                                {i.physical_stock}
                                            </td>

                                            <td
                                                className={`text-center font-medium ${
                                                i.difference < 0
                                                    ? 'text-red-500'
                                                    : i.difference > 0
                                                        ? 'text-green-500'
                                                        : ''}`}>

                                                {i.difference}

                                            </td>

                                        </tr>

                                    ))
                            }

                        </tbody>

                    </table>

                </div> */}

                <div className="rounded-xl border bg-background overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left p-3">Item</th>
                                <th className="text-center p-3">Stok Sistem</th>
                                <th className="text-center p-3">Stok Fisik</th>
                                <th className="text-right p-3">Difference</th>
                            </tr>
                        </thead>

                        <tbody>
                            {opname.items.map((i: any) => (
                                <tr
                                    key={i.id}
                                    className="border-t hover:bg-muted/30 transition"
                                >
                                    <td className="p-3">
                                        <div className="flex flex-col font-bold">
                                            <p>{i.item?.name || "-"}</p>
                                            <p className='text-[12px] text-muted-foreground font-light'>{i.item?.category?.name || ""}</p>
                                        </div>
                                    </td>

                                    <td className="p-3 text-center font-bold">{i.system_stock} <span className="text-muted-foreground font-light text-xs">{i.item?.unit}</span></td>
                                    <td className="p-3 text-center font-bold">{i.physical_stock} <span className="text-muted-foreground font-light text-xs">{i.item?.unit}</span></td>

                                    <td className={`p-3 text-right font-bold ${
                                        i.difference < 0
                                            ? 'text-red-500'
                                            : i.difference > 0
                                                ? 'text-green-500'
                                                : ''}`}>
                                        {i.difference > 0
                                            ? '+' + i.difference
                                            : i.difference
                                        }
                                        <span className="text-muted-foreground font-light text-xs"> {i.item?.unit}</span>                                 
                                    </td>
                                </tr>
                            ))}

                            {opname.items.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center p-6 text-muted-foreground"
                                    >
                                        Tidak ada barang yang diperiksa
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

        </AppLayout>

    )
}