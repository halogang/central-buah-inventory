import { Head, router } from "@inertiajs/react"
import {
    ArrowDownToLine,
    ArrowUpToLine,
    Dot,
    Eye,
    Package,
    Plus,
    Printer,
    Truck,
    Edit3,
    Trash2,
    Check
} from "lucide-react"
import { useState } from "react"
import Pagination from "@/components/Pagination"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import { usePagination } from "@/hooks/use-pagination"
import AppLayout from "@/layouts/app-layout"
import { notify } from "@/lib/notify"
import { destroy } from "@/routes/surat-jalan"
import { FilterBar } from "@/components/report/FilterBar"

import type { BreadcrumbItem } from "@/types"

import Form from "./components/Form"
import Show from "./components/Show"
import { useCan } from "@/utils/permissions"
import { FormSelect } from "@/components/admin"


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Surat Jalan",
        href: "/surat-jalan",
    },
]

interface User {
    id: number,
    name: string,
}

interface DeliveryOrder {
    id: number
    do_number: string
    type: "in" | "out"
    date: string
    supplier: string
    customer: string
    sender_id: number | string | null
    sender_name: string
    total_weight: number
    status: "draft" | "sent" | "done"
    items_count: number
    total_quantity: number
    evidence?: string
    sender_signature?: string
    receiver_signature?: string
    evidence_url?: string
    sender_signature_url?: string
    receiver_signature_url?: string
}

interface Cart {
    id: number
    name: string
}

interface Supplier {
    id: number
    name: string
}

interface Customer {
    id: number
    name: string
    phone: string
}

interface Item {
    id: number
    name: string
    stock: number
}

interface Props {
    deliveryOrders: DeliveryOrder[]
    isStaffAntar: boolean
    suppliers: Supplier[]
    items: Item[]
    customers: Customer[]
    carts: Cart[]
    stafAntar: User[]
}

export default function Index({ deliveryOrders, isStaffAntar, suppliers, items, customers, carts, stafAntar }: Props) {
    const can = useCan();

    const [activeTab, setActiveTab] = useState<"in" | "out">(isStaffAntar ? "out" : "in")
    const [search, setSearch] = useState("")
    const [month, setMonth] = useState<number>(-1)
    const [year, setYear] = useState<number>(0)

    const [openForm, setOpenForm] = useState(false)
    const [selectedData, setSelectedData] = useState<DeliveryOrder | null>(null)
    const [newStatus, setNewStatus] = useState<string | null>(null)

    const [openShow, setOpenShow] = useState(false)
    const [selected, setSelected] = useState(null)

        

    const confirmDelete = (delivery: DeliveryOrder) => {
        notify.confirmDelete({
            message: `Hapus ${delivery.do_number}?`,
            onConfirm: () => performDelete(delivery),
        })
    }
    const performDelete = (delivery: DeliveryOrder) => {
        const loading = notify.loading("Menghapus surat jalan...")

        router.delete(destroy(delivery.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success(`surat jalan ${delivery.do_number} berhasil dihapus`)
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error(`Gagal menghapus ${delivery.do_number}`)
            },
        })
    }

    const confirmUpdateStatus = (delivery: DeliveryOrder) => {
        notify.confirm({
            message: `Ubah status ${delivery.do_number} menjadi ${
                delivery.status === "draft" ? "sent" : "done"
            }?`,
            onConfirm: () => performUpdateStatus(delivery),
            onCancel: () => { },
            confirmText: "Ya, ubah",
            cancelText: "Tidak",
        })
    }
    const performUpdateStatus = (delivery: DeliveryOrder) => {
        const loading = notify.loading("Mengubah status surat jalan...")

        const newStatus =
            delivery.status === "draft"
                ? "sent"
                : delivery.status === "sent"
                ? "done"
                : "done"

        if (newStatus !== "done") {
            router.patch(`/surat-jalan/${delivery.id}/update-status`, { status: newStatus }, {
                onSuccess: () => {
                    notify.dismiss(loading)
                    notify.success(`Status ${delivery.do_number} berhasil diubah`)
                },
                onError: () => {
                    notify.dismiss(loading)
                    notify.error(`Gagal mengubah status ${delivery.do_number}`)
                },
            })
        } else {
            notify.dismiss(loading)
            notify.info(`Lengkapi surat jalan ${delivery.do_number} untuk menyelesaikan`)
            openEdit(delivery, newStatus)
        }
    }
    

    const openDetail = (data:any)=>{
        setSelected(data)
        setOpenShow(true)
    }

    // Helper function to check if date matches selected month and year
    const matchesMonthYear = (dateString: string, selectedMonth: number, selectedYear: number) => {
        const date = new Date(dateString)
        const dateMonth = date.getMonth()
        const dateYear = date.getFullYear()
        
        const monthMatch = selectedMonth === -1 || dateMonth === selectedMonth
        const yearMatch = selectedYear === 0 || dateYear === selectedYear
        
        return monthMatch && yearMatch
    }

    // filter data
    const filteredData = deliveryOrders
    .filter((d) => d.type === activeTab)
    .filter((d) =>
        d.do_number.toLowerCase().includes(search.toLowerCase())
    )
    .filter((d) => matchesMonthYear(d.date, month, year))

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filteredData, 6)


    // stats
    const total = filteredData.length
    const proses = filteredData.filter((d) => d.status !== "done").length
    const selesai = filteredData.filter((d) => d.status === "done").length

    const openCreate = () => {
        setSelectedData(null)
        setOpenForm(true)
    }

    const openEdit = (data: DeliveryOrder, status: string | null) => {
        setSelectedData(data)
        setOpenForm(true)
        setNewStatus(status)
    }

    const statusStyle = (status: string) => {

        if (status === "done")
            return "bg-primary/10 text-primary"

        if (status === "sent")
            return "bg-yellow-500/10 text-yellow-500"

        return "bg-muted text-muted-foreground"
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Surat Jalan" >
                <meta name="robots" content="noindex" />
            </Head>

            <div className="space-y-6 p-4">

                {/* TAB */}
                <div className="flex gap-2">

                    {!isStaffAntar && (
                        <button
                            onClick={() => setActiveTab("in")}
                            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition
                            ${
                                activeTab === "in"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }`}
                        >
                            <ArrowDownToLine className="size-4" />
                            Surat Jalan Masuk
                        </button>
                    )}

                    <button
                        onClick={() => setActiveTab("out")}
                        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition
                        ${
                            activeTab === "out"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                    >
                        <ArrowUpToLine className="size-4" />
                        Surat Jalan Keluar
                    </button>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-3 gap-4">

                    <div className="rounded-xl border p-4 text-center shadow-sm">
                        <div className="text-xs text-muted-foreground">
                            Total
                        </div>
                        <h1 className="text-xl font-semibold">{total}</h1>
                    </div>

                    <div className="rounded-xl border p-4 text-center shadow-sm">
                        <div className="text-xs text-muted-foreground">
                            Proses
                        </div>
                        <h1 className="text-xl font-semibold text-yellow-600">
                            {proses}
                        </h1>
                    </div>

                    <div className="rounded-xl border p-4 text-center shadow-sm">
                        <div className="text-xs text-muted-foreground">
                            Selesai
                        </div>
                        <h1 className="text-xl font-semibold text-green-600">
                            {selesai}
                        </h1>
                    </div>

                </div>

                {/* SEARCH */}
                <div className="flex flex-col gap-2">

                    <div className="flex gap-2">
                        <SearchInput
                            placeholder="Cari Surat Jalan..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        {!isStaffAntar && can('delivery_order.create') && (
                            <Button onClick={openCreate}>
                                <Plus />
                                Buat
                            </Button>
                        )}
                    </div>

                    {/* FILTER BAR */}
                    <FilterBar
                        month={month}
                        year={year}
                        onMonthChange={setMonth}
                        onYearChange={setYear}
                    />

                </div>

                {/* DATA */}
                <div className="grid gap-3">

                    {paginatedData.map((delivery) => (

                        <div
                            key={delivery.id}
                            className="flex flex-col gap-3 rounded-xl border p-4 shadow-sm"
                        >

                            {/* HEADER */}
                            <div className="flex justify-between">
                        
                                <div className="flex items-start gap-2">
                                    <div>
                                        <p className="text-sm font-semibold">
                                            {delivery.do_number}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            {delivery.date}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-xs h-fit px-2 py-1 font-bold rounded-full flex items-center ${statusStyle(
                                            delivery.status
                                        )}`}
                                    >
                                        {delivery.status === 'draft' ? 'Draft' : delivery.status === 'sent' ? 'Dikirim' : 'Selesai'}
                                    </span>
                                </div>

                                {!isStaffAntar && can('delivery_order.delete') && (
                                    <button onClick={() => confirmDelete(delivery)}>
                                        <Trash2 className="size-4 text-muted-foreground hover:text-red-600"/>
                                    </button>
                                )}

                            </div>

                            {/* SUPPLIER */}
                            <div className="flex gap-2 text-sm text-muted-foreground">
                                <Truck className="size-4" />
                                {delivery.type === 'in' ? delivery.supplier : delivery.customer}
                            </div>

                            {/* ITEM */}
                            <div className="flex gap-2 items-center text-sm text-muted-foreground">

                                <Package className="size-4" />

                                <div className="flex items-center font-medium">
                                    <p>{delivery.items_count} Item</p>
                                    <Dot />
                                    <p>{delivery.total_quantity} Total</p>
                                </div>

                            </div>

                            {/* ACTION */}
                            <div className="flex gap-2">

                                <Button onClick={() => openDetail(delivery)}
                                    variant="secondary"
                                    className="w-full"
                                >
                                    <Eye className="size-4" />
                                    Detail
                                </Button>
                                
                                {can('delivery_order.update') && (
                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                        onClick={() => openEdit(delivery, null)}
                                    >
                                        <Edit3 className="size-4" />
                                        Edit
                                    </Button>
                                )}

                                <Button
                                    variant="secondary"
                                    className="w-full"
                                    onClick={() => window.open(`/surat-jalan/${delivery.id}/print`, "_blank")}
                                >
                                    <Printer className="size-4" />
                                    Cetak
                                </Button>

                                {delivery.status !== "done" && can('delivery_order.update') && (
                                    <Button
                                        variant="secondary"
                                        className={`w-full ${delivery.status === "sent" ? "bg-primary text-white hover:bg-green-700" : "bg-yellow-500 text-white hover:bg-yellow-600"}`}
                                        onClick={() => confirmUpdateStatus(delivery) }
                                    >
                                        {delivery.status === "draft" ? (
                                            <>
                                                <ArrowUpToLine className="size-4" />
                                                Kirim
                                            </>
                                        ) : delivery.status === "sent" ? (
                                            <>
                                                <Check className="size-4" />
                                                Selesai
                                            </>
                                        ) : (
                                            <>
                                                
                                                Draft
                                            </>
                                        )}
                                    </Button>
                                )}

                            </div>

                        </div>

                    ))}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goTo}
                    />

                    {paginatedData.length === 0 && (

                        <div className="text-center text-muted-foreground py-10">
                            Tidak ada data
                        </div>

                    )}

                </div>

            </div>

            {/* FORM MODAL */}
            {openForm && (
                <Form
                    isStaffAntar={isStaffAntar}
                    data={selectedData}
                    suppliers={suppliers}
                    items={items}
                    customers={customers}
                    stafAntar={stafAntar}
                    carts={carts}
                    newStatus={newStatus}
                    type={activeTab}
                    onClose={() => setOpenForm(false)}
                />
            )} 

            {openShow && (
                <Show
                    data={selected}
                    onClose={()=>setOpenShow(false)}
                />
            )}

        </AppLayout>
    )
}