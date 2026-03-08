import { Head } from '@inertiajs/react';

import InvoiceCard from '@/components/dashboard/InvoiceCard';
import LowStockCard from '@/components/dashboard/LowStockCard';
import StatsCard from '@/components/dashboard/StatsCard';
import TransactionList from '@/components/dashboard/TransactionList';
import { statsData, transactions, lowStockProducts, unpaidInvoices } from "@/data/dashboard";
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';


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
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Welcome Banner */}
                <div
                    className="rounded-xl p-6 md:p-8 text-primary-foreground bg-linear-to-r from-primary to-chart-4 dark:to-chart-3"
                >
                    <h2 className="text-xl md:text-2xl font-bold">
                        Selamat Datang, Admin! 👋
                    </h2>
                    <p className="mt-1 text-sm opacity-90">
                        Berikut ringkasan aktivitas toko hari ini.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {statsData.map((stat) => (
                        <StatsCard key={stat.label} {...stat} />
                    ))}
                </div>

                {/* Main Content */}
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