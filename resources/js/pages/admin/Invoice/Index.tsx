import {Head} from "@inertiajs/react";
import {
    ArrowDownLeft,
    ArrowUpRight,
    CircleAlert,
    CircleCheck,
    CreditCard,
    DollarSign,
    Eye,
    Printer
} from "lucide-react";
import {useState} from "react";
import Pagination from "@/components/Pagination"
import {SearchInput} from "@/components/search-input";
import {Button} from "@/components/ui/button";
import {formatCurrency} from "@/helpers/format";
import { usePagination } from "@/hooks/use-pagination"
import AppLayout from "@/layouts/app-layout";
import type {BreadcrumbItem} from '@/types';
import Payment from "./components/Payment";
import Show from "./components/Show";
import { useCan } from "@/utils/permissions";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoice',
        href: '/invoice'
    }
];

interface Item {
    id: number
    name: string
}

interface PaymentMethod {
    id: number
    name: string
    icon: string
}

interface InvoiceItem {
    id: number
    item?: Item
    quantity: number
    price: number
    total: number
}

interface InvoicePayment {
    id: number
    amount: number
    paymentMethod?: PaymentMethod
    note: string
    evidence?: string
    date: string
}

interface Invoice {
    id: number 
    invoiceNumber: string 
    date: string 
    total: number 
    paid: number 
    remaining: number 
    status: string 
    itemsCount: number 
    invoiceItems?: InvoiceItem[] 
    payments?: InvoicePayment[]
    deliveryOrder: string 
    supplier: string 
    customer: string 
    type: "in" | "out"
}

interface Summary {
    totalIn: number 
    remainingIn: number 
    paidIn: number 
    totalOut: number 
    remainingOut: number 
    paidOut: number
}

interface Props {
    invoices: Invoice[]
    summary: Summary
    paymentMethods: PaymentMethod[]
}

export default function Index({invoices, summary, paymentMethods} : Props) {
    const can = useCan();
    
    const [activeTab, setActiveTab] = useState < "in" | "out" > ("in");
    const [search, setSearch] = useState("")

    const [openPayment, setOpenPayment] = useState(false)

    const [openShow, setOpenShow] = useState(false)
    const [selected, setSelected] = useState(null)

    const openDetail = (data : any) => {
        setSelected(data)
        setOpenShow(true)
    }

    const openPayModal = (data: any) => {
        setSelected(data)
        setOpenPayment(true)
    }

    const filteredInvoices = invoices
        .filter((invoice) => invoice.type === activeTab)
        .filter((invoice) =>
            invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
            invoice.customer.toLowerCase().includes(search.toLowerCase())
    )

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filteredInvoices, 6)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoice" >
                <meta name="robots" content="noindex" />
            </Head>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4 gap-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('in')}
                        className={`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-medium transition-colors ${
                        activeTab === 'in'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                        <ArrowDownLeft className="size-4"/>
                        Invoice Masuk
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('out')}
                        className={`w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-medium transition-colors ${
                        activeTab === 'out'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                        <ArrowUpRight className="size-4"/>
                        Invoice Keluar
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div
                        className='flex flex-col gap-1 items-center justify-center rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border'>
                        <DollarSign className="text-primary size-5"/>
                        <div className="text-[11px] text-muted-foreground">
                            Nominal Tagihan
                        </div>
                        <h1 className="text-lg font-semibold">{
                                activeTab === 'in'
                                    ? (formatCurrency(summary.totalIn ?? '0'))
                                    : (formatCurrency(summary.totalOut ?? '0'))
                            }</h1>
                    </div>
                    <div
                        className='flex flex-col gap-1 items-center justify-center rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border'>
                        <CircleAlert className="text-red-500 size-5"/>
                        <div className=" text-[11px] text-muted-foreground">
                            Sisa Tagihan
                        </div>
                        <h1 className="text-red-400 text-lg font-semibold">{
                                activeTab === 'in'
                                    ? (formatCurrency(summary.remainingIn ?? '0'))
                                    : (formatCurrency(summary.remainingOut ?? '0'))
                            }</h1>
                    </div>
                    <div
                        className='flex flex-col gap-1 items-center justify-center rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm dark:border-sidebar-border'>
                        <CircleCheck className="text-primary size-5"/>
                        <div className="text-[11px] text-muted-foreground">
                            Tagihan Lunas
                        </div>
                        <h1 className="text-green-500 text-lg font-semibold">{
                                activeTab === 'in'
                                    ? (formatCurrency(summary.paidIn ?? '0'))
                                    : (formatCurrency(summary.paidOut ?? '0'))
                            }</h1>
                    </div>
                </div>

                <div className="flex gap-2 item-center mb-4">
                    <span
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                        Semua
                    </span>
                    <span
                        className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium">
                        Belum Lunas
                    </span>
                    <span
                        className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium">
                        Sebagian
                    </span>
                    <span
                        className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium">
                        Lunas
                    </span>
                </div>

                <div className="mb-4">
                    <SearchInput placeholder="Cari Invoice..." value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-2">

                    {
                        paginatedData.map((invoice) => {

                            const progress = (invoice.paid / invoice.total) * 100

                            return (

                                <div key={invoice.id} className="rounded-lg p-3 flex flex-col gap-2 border">

                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-sm font-bold">{invoice.invoiceNumber}</h3>

                                            <p className="text-xs font-light text-muted-foreground">
                                                {invoice.date}
                                                • Ref: {invoice.deliveryOrder}
                                            </p>

                                        </div>

                                        <span
                                            className={`px-2 py-1 text-[10px] rounded-full font-medium
                                            ${
                                            invoice.status === "paid"
                                                ? "text-green-500 bg-green-500/10"
                                                : invoice.status === "partial"
                                                    ? "text-yellow-500 bg-yellow-500/10"
                                                    : "text-red-500 bg-red-500/10"}
                                            `}>

                                            {
                                                invoice.status === "paid"
                                                    ? "Lunas"
                                                    : invoice.status === "partial"
                                                        ? "Sebagian"
                                                        : "Belum Lunas"
                                            }

                                        </span>

                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium">{invoice.type === 'in' ? invoice.supplier : invoice.customer}</h3>
                                        <p className="text-xs font-light text-muted-foreground">
                                            {invoice.itemsCount}
                                            item
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-1 border-b border-muted-foreground/30 pb-2">

                                        <div className="flex items-start justify-between">
                                            <p className="text-xs font-light text-muted-foreground">
                                                Terbayar: {formatCurrency(invoice.paid)}
                                            </p>

                                            <p className="text-xs font-medium">
                                                {formatCurrency(invoice.total)}
                                            </p>
                                        </div>

                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div
                                                className="bg-primary h-2 rounded-full"
                                                style={{
                                                    width: `${progress}%`
                                                }}></div>
                                        </div>

                                        <p className="text-xs font-medium text-red-500">
                                            Sisa: {formatCurrency(invoice.remaining)}
                                        </p>

                                    </div>

                                    <div className="flex gap-2">

                                        <Button onClick={() => openDetail(invoice)} variant="secondary" className="w-full">
                                            <Eye className="size-4"/>
                                            Detail
                                        </Button>

                                        <Button 
                                            variant="secondary" 
                                            className="w-full"
                                            onClick={() => window.open(`/invoice/${invoice.id}/print`, "_blank")}
                                        >
                                            <Printer className="size-4"/>
                                            Cetak
                                        </Button>

                                        {invoice.remaining > 0 && can('invoice_payment') && (
                                            <Button variant="default" className="w-full" onClick={() => openPayModal(invoice)}>
                                                <CreditCard className="size-4"/>
                                                Bayar
                                            </Button>
                                        )}

                                    </div>

                                </div>

                            )

                        })
                    }

                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goTo}
                />
            </div>

            {openShow && (
                <Show 
                    paymentMethods={paymentMethods} 
                    data={selected} 
                    onClose={() => setOpenShow(false)}
                />
            )}

            {openPayment && (
                <Payment 
                    invoice={selected} 
                    paymentMethods={paymentMethods}
                    onClose={() => setOpenPayment(false)}
                />
            )}

        </AppLayout>
    )
}