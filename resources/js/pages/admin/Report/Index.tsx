import { Head, router, usePage } from "@inertiajs/react";
import {DollarSign, Package, ShoppingCart, Receipt, TrendingDown} from "lucide-react";
import {useState} from "react";
import {ExportButtons} from "@/components/report/ExportButtons";
import {FilterBar} from "@/components/report/FilterBar";
import AppLayout from "@/layouts/app-layout";
import {TabKeuangan} from "./components/KeuanganTab";
import {TabLabaRugi} from "./components/LabaRugiTab";
import {TabPengeluaran} from "./components/PengeluaranTab";
import {TabPenjualan} from "./components/PenjualanTab";
import {TabStok} from "./components/StokTab";
import { index } from "@/routes/laporan";

const TABS = [
    {
        id: "keuangan",
        label: "Keuangan",
        icon: DollarSign
    }, {
        id: "stok",
        label: "Stok",
        icon: Package
    }, {
        id: "penjualan",
        label: "Penjualan",
        icon: ShoppingCart
    }, {
        id: "pengeluaran",
        label: "Pengeluaran",
        icon: Receipt
    }, {
        id: "laba-rugi",
        label: "Laba Rugi",
        icon: TrendingDown
    }
];

type PageProps = {
  keuangan: any;
  stok: {
    summary: any;
    table: any[];
    chart: any[];
    };
  penjualan: any;
  pengeluaran: any;
  labaRugi: any;
  filters: {
    month: number;
    year: number;
  };
};

export default function LaporanPage() {
    const { props } = usePage<PageProps>();

    const { keuangan, stok, penjualan, pengeluaran, labaRugi, filters } = props;

    const [activeTab, setActiveTab] = useState("keuangan");
    const [month, setMonth] = useState<number>(filters.month);
    const [year, setYear] = useState<number>(filters.year);

    const handleFilterChange = (newMonth: number, newYear: number) => {
        
        setMonth(newMonth);
        setYear(newYear);

        const monthToSend = newMonth === -1 ? 'all' : newMonth;
        const yearToSend = newYear === 0 ? 'all' : newYear;

        router.get(index(), {
            month: monthToSend,
            year: yearToSend,
        }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Laporan">
                <meta name="robots" content="noindex" />
            </Head>
            <div className="p-4 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-semibold text-foreground">Laporan</h1>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-1">
                    {
                        TABS.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-100 ${
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                                    <tab.icon className="h-3.5 w-3.5"/> {tab.label}
                                </button>
                            );
                        })
                    }
                </div>

                {/* Filters & Export */}
                <div className="flex items-center justify-between">
                    <FilterBar
                        month={month}
                        year={year}
                        onMonthChange={(m) => handleFilterChange(m, year)}
                        onYearChange={(y) => handleFilterChange(month, y)}/>
                    <ExportButtons/>
                </div>

                {/* Tab Content */}
                {activeTab === "keuangan" && <TabKeuangan data={keuangan}/>}
                {activeTab === "stok" && <TabStok data={stok}/>}
                {activeTab === "penjualan" && <TabPenjualan data={penjualan}/>}
                {activeTab === "pengeluaran" && <TabPengeluaran data={pengeluaran}/>}
                {activeTab === "laba-rugi" && <TabLabaRugi data={labaRugi}/>}
            </div>
        </AppLayout>
    );
}
