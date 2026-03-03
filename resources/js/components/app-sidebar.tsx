import { Link } from '@inertiajs/react';
import { LayoutGrid, Package, Warehouse, Wallet, ShoppingCart, ChartColumn } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { SidebarDropdown, SidebarDropdownProvider } from '@/components/sidebar-dropdown';
import { NavMain } from '@/components/nav-main';
import { useCan } from '@/utils/permissions';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const can = useCan();

    const dashboardMenu: NavItem[] = can('Dashboard')
        ? [
              {
                  title: 'Dashboard',
                  href: dashboard(),
                  icon: LayoutGrid,
              },
          ]
        : [];

    const masterItems: Array<{ permission: string; label: string; href: string }> = [
        { permission: 'Master Data', label: 'Barang', href: '/master/items' },
        { permission: 'Gudang', label: 'Gudang', href: '/master/warehouses' },
        { permission: 'Master Data', label: 'Kategori', href: '/master/categories' },
        { permission: 'Master Data', label: 'Supplier', href: '/master/suppliers' },
        { permission: 'Master Data', label: 'Pelanggan', href: '/master/customers' },
        { permission: 'Pengguna & Role', label: 'Pengguna & Role', href: '/master/users' },
        { permission: 'Master Data', label: 'Metode Pembayaran', href: '/master/payment-methods' },
    ];

    const masterLinks: { label: string; href: string }[] = masterItems
        .filter((item) => can(item.permission))
        .map(({ label, href }) => ({ label, href }));

    const showMasterDropdown = can('Master Data') || can('Gudang') || can('Pengguna & Role');

    const stockLinks = [
        { label: 'Stok Realtime', href: '#' },
        { label: 'Barang Masuk', href: '#' },
        { label: 'Barang Keluar', href: '#' },
    ];

    const invoiceLinks = [
        { label: 'Surat Jalan', href: '#' },
        { label: 'Invoice', href: '#' },
    ];

    const navItems: NavItem[] = [
        {
            title: 'Keuangan',
            href: '#',
            icon: Wallet,
        },
        {
            title: 'POS Kasir',
            href: '#',
            icon: ShoppingCart,
        },
        {
            title: 'Laporan',
            href: '#',
            icon: ChartColumn,
        },
    ];


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={dashboardMenu} />
                <SidebarDropdownProvider>
                    {showMasterDropdown && (
                        <SidebarDropdown
                            sectionKey="master"
                            title="Master Data"
                            icon={Package}
                            items={masterLinks}
                        />
                    )}
                    <SidebarDropdown
                        sectionKey="stock"
                        title="Manajemen Stok"
                        icon={Warehouse}
                        items={stockLinks}
                    />
                    <SidebarDropdown
                        sectionKey="invoice"
                        title="Surat Jalan & Invoice"
                        icon={Package}
                        items={invoiceLinks}
                    />
                </SidebarDropdownProvider>
                <NavMain items={navItems} />
            </SidebarContent>
        </Sidebar>
    );
}
