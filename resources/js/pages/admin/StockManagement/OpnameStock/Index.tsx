import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stok Opname',
        href: '/stok/stok-opname',
    }
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                test
            </div>
        </AppLayout>
    )
}