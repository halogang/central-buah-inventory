import { Link } from '@inertiajs/react';
import { LayoutGrid, Package, Warehouse, Wallet, ShoppingCart, ChartColumn } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { SidebarDropdown, SidebarDropdownProvider } from '@/components/sidebar-dropdown';
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
import { useCan } from '@/utils/permissions';

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

    const stockItems = [
        { permission: 'Manajemen Stok', label: 'Stok Realtime', href: '/stok/realtime' },
        { permission: 'Manajemen Stok', label: 'Stok Opname (coming soon)', href: '/stok/stok-opname' },
    ];
    const stockLinks = stockItems
        .filter((item) => can(item.permission))
        .map(({ label, href }) => ({ label, href }));

    const invoiceItems = [
        { permission: 'Surat Jalan', label: 'Surat Jalan', href: '/surat-jalan' },
        { permission: 'Invoice', label: 'Invoice (coming soon)', href: '/invoice' },
    ];
    const invoiceLinks = invoiceItems
        .filter((item) => can(item.permission))
        .map(({ label, href }) => ({ label, href }));

    const navItemsRaw = [
        { permission: 'Keuangan', title: 'Keuangan', href: '/keuangan', icon: Wallet },
        { permission: 'POS Kasir', title: 'POS Kasir', href: '/pos', icon: ShoppingCart },
        { permission: 'Laporan', title: 'Laporan', href: '/laporan', icon: ChartColumn },
    ];
    const navItems: NavItem[] = navItemsRaw
        .filter((item) => can(item.permission))
        .map(({ title, href, icon }) => ({ title, href, icon }));

    
    const showStockDropdown = stockLinks.length > 0;
    const showInvoiceDropdown = invoiceLinks.length > 0;


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
                <NavMain items={dashboardMenu} badge='' />
                <SidebarDropdownProvider>
                    {showMasterDropdown && (
                        <SidebarDropdown
                            sectionKey="master"
                            title="Master Data"
                            icon={Package}
                            items={masterLinks}
                        />
                    )}
                    {showStockDropdown && (
                        <SidebarDropdown
                            sectionKey="stock"
                            title="Manajemen Stok"
                            icon={Warehouse}
                            items={stockLinks}
                        />
                    )}

                    {showInvoiceDropdown && (
                        <SidebarDropdown
                            sectionKey="invoice"
                            title="Surat Jalan & Invoice"
                            icon={Package}
                            items={invoiceLinks}
                        />
                    )}
                </SidebarDropdownProvider>
                <NavMain items={navItems} badge='Coming Soon' />
            </SidebarContent>
        </Sidebar>
    );
}
