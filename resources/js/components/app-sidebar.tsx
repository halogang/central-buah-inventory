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

    const dashboardMenu: NavItem[] = can('dashboard.view')
        ? [
              {
                  title: 'Dashboard',
                  href: dashboard(),
                  icon: LayoutGrid,
              },
          ]
        : [];

    const masterItems = [
        { permission: 'info_website.index', label: 'Info Website', href: '/master/website-info' },
        { permission: 'barang.index', label: 'Barang', href: '/master/items' },
        { permission: 'unit.index', label: 'Unit', href: '/master/units' },
        { permission: 'branch.index', label: 'Cabang', href: '/master/branches' },
        { permission: 'keranjang.index', label: 'Keranjang', href: '/master/carts' },
        { permission: 'gudang.index', label: 'Gudang', href: '/master/warehouses' },
        { permission: 'kategori.index', label: 'Kategori', href: '/master/categories' },
        { permission: 'supplier.index', label: 'Supplier', href: '/master/suppliers' },
        { permission: 'pelanggan.index', label: 'Pelanggan', href: '/master/customers' },
        { permission: 'user.index', label: 'Pengguna', href: '/master/users' },
        { permission: 'payment_method.index', label: 'Metode Pembayaran', href: '/master/payment-methods' },
    ];
    const masterLinks: { label: string; href: string }[] = masterItems
        .filter((item) => can(item.permission))
        .map(({ label, href }) => ({ label, href }));
    const showMasterDropdown = masterLinks.length > 0;

    const stockItems = [
        { permission: 'stock_realtime.index', label: 'Stok Realtime', href: '/stok/realtime' },
        { permission: 'stock_opname.index', label: 'Stok Opname', href: '/stok/stok-opname' },
        { permission: 'stock_movement.index', label: 'Stok Movement', href: '/stok/movement' },
    ];
    const stockLinks = stockItems
        .filter((item) => can(item.permission))
        .map(({ label, href }) => ({ label, href }));   

    const invoiceItems = [
        { permission: 'delivery_schedule.index', label: 'Jadwal Surat Jalan', href: '/delivery-schedules' },
        { permission: 'delivery_order.index', label: 'Surat Jalan', href: '/surat-jalan' },
        { permission: 'invoice.index', label: 'Invoice', href: '/invoice' },
    ];
    const invoiceLinks = invoiceItems
        .filter((item) => can(item.permission))
        .map(({ label, href }) => ({ label, href }));

    const navItemsRaw = [
        { permission: 'finance.index', title: 'Keuangan', href: '/keuangan', icon: Wallet },
        { permission: 'pos.index', title: 'POS Kasir', href: '/pos', icon: ShoppingCart },
        { permission: 'report.index', title: 'Laporan', href: '/laporan', icon: ChartColumn },
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
                <NavMain items={navItems} badge='' />
            </SidebarContent>
        </Sidebar>
    );
}
