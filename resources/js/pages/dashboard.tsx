import { Head } from '@inertiajs/react';

import InvoiceCard from '@/components/dashboard/InvoiceCard';
import LowStockCard from '@/components/dashboard/LowStockCard';
import StatsCard from '@/components/dashboard/StatsCard';
import TransactionList from '@/components/dashboard/TransactionList';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import type { StatCard } from "@/types/dashboard";
import { formatCurrency, formatNumber } from '@/helpers/format';
import { usePage } from "@inertiajs/react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
    },
];



/* =========================
   PAGE
========================= */

export default function Dashboard() {

    const {
        userName,
        totalProduct,
        totalStock,
        totalPendapatan,
        totalStockMenipis,
        transactions,
        lowStockProducts,
        unpaidInvoices
    } = usePage().props as any;

    const page = usePage();

    console.log("Page props:"+page.props);

    console.log({
    totalProduct,
    totalStock,
    totalPendapatan,
    totalStockMenipis
    })

    const statsData: StatCard[] = [
        { label: "Total Produk", value: formatNumber(totalProduct), trend: "+3", icon: "package", color: "success" },
        { label: "Total Stok", value: formatNumber(totalStock), trend: "+120", icon: "boxes", color: "info" },
        { label: "Pendapatan", value: formatCurrency(totalPendapatan), trend: "+18%", icon: "trending-up", color: "warning" },
        { label: "Stok Menipis", value: formatNumber(totalStockMenipis), trend: "", icon: "alert-triangle", color: "danger" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="rounded-xl p-6 md:p-8 text-primary-foreground bg-linear-to-r from-green-700/80 via-green-800 to-orange-500">
                    <h2 className="text-xl md:text-2xl font-bold">
                        Selamat Datang, {userName}! 👋
                    </h2>
                    <p className="mt-1 text-sm opacity-90">
                        Berikut ringkasan aktivitas toko hari ini.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statsData.map((stat) => (
                        <StatsCard key={stat.label} {...stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    <div className="lg:col-span-2">
                        <TransactionList transactions={transactions} />
                    </div>

                    <div className="space-y-6">
                        <LowStockCard products={lowStockProducts} />
                        <InvoiceCard invoices={unpaidInvoices} />
                    </div>

                </div>

            </div>
        </AppLayout>
    );
}