import { LayoutDashboard, Database, Package, FileText, Wallet, ShoppingCart, BarChart3, LogOut, ChevronDown } from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Database, label: "Master Data", hasSubmenu: true },
  { icon: Package, label: "Manajemen Stok", hasSubmenu: true },
  { icon: FileText, label: "Surat Jalan & Invoice", hasSubmenu: true },
  { icon: Wallet, label: "Keuangan" },
  { icon: ShoppingCart, label: "POS Kasir", active: true },
  { icon: BarChart3, label: "Laporan" },
];

const POSSidebar = () => {
  return (
    <aside className="pos-sidebar-bg flex flex-col h-screen w-60 fixed left-0 top-0 z-30">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground font-bold text-xs">
          CB
        </div>
        <div>
          <div className="text-sidebar-foreground font-bold text-sm leading-tight">Central Buah</div>
          <div className="text-sidebar-foreground/60 text-xs">Sutomo</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
              item.active
                ? "pos-sidebar-active-bg text-sidebar-foreground font-semibold rounded-lg mx-2 w-[calc(100%-16px)]"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent"
            }`}
          >
            <item.icon size={18} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.hasSubmenu && <ChevronDown size={14} className="opacity-60" />}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <button className="flex items-center gap-3 px-5 py-4 text-sidebar-foreground/70 hover:text-sidebar-foreground text-sm border-t border-sidebar-border transition-colors">
        <LogOut size={18} />
        <span>Keluar</span>
      </button>
    </aside>
  );
};

export default POSSidebar;
