import { Head } from "@inertiajs/react"
import {
    ArrowDownToLine,
    ArrowUpToLine,
    Dot,
    Eye,
    Package,
    Plus,
    Printer,
    Truck,
    Edit3
} from "lucide-react"
import { useState, useMemo } from "react"

import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"

import Form from "./components/Form"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Surat Jalan",
        href: "/surat-jalan",
    },
]

interface DeliveryOrder {
    id: number
    do_number: string
    type: "in" | "out"
    date: string
    supplier: string
    status: "draft" | "sent" | "done"
    items_count: number
    total_quantity: number
}

interface Supplier {
    id: number
    name: string
}

interface Item {
    id: number
    name: string
}

interface Props {
    deliveryOrders: DeliveryOrder[]
    suppliers: Supplier[]
    items: Item[]
}

export default function Index({ deliveryOrders, suppliers, items }: Props) {

    const [activeTab, setActiveTab] = useState<"in" | "out">("in")
    const [search, setSearch] = useState("")

    const [openForm, setOpenForm] = useState(false)
    const [selectedData, setSelectedData] = useState<DeliveryOrder | null>(null)

    // filter data
    const filteredData = useMemo(() => {
        return deliveryOrders
            .filter((d) => d.type === activeTab)
            .filter((d) =>
                d.do_number.toLowerCase().includes(search.toLowerCase())
            )
    }, [deliveryOrders, activeTab, search])

    // stats
    const total = filteredData.length
    const proses = filteredData.filter((d) => d.status !== "done").length
    const selesai = filteredData.filter((d) => d.status === "done").length

    const openCreate = () => {
        setSelectedData(null)
        setOpenForm(true)
    }

    const openEdit = (data: DeliveryOrder) => {
        setSelectedData(data)
        setOpenForm(true)
    }

    const statusStyle = (status: string) => {

        if (status === "done")
            return "bg-green-500/10 text-green-600"

        if (status === "sent")
            return "bg-yellow-500/10 text-yellow-600"

        return "bg-muted text-muted-foreground"
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Surat Jalan" />

            <div className="space-y-6 p-4">

                {/* TAB */}
                <div className="flex gap-2">

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
                        SJ Masuk
                    </button>

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
                        SJ Keluar
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
                <div className="flex gap-2">

                    <SearchInput
                        placeholder="Cari Surat Jalan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <Button onClick={openCreate}>
                        <Plus />
                        Buat
                    </Button>

                </div>

                {/* DATA */}
                <div className="grid gap-3">

                    {filteredData.map((delivery) => (

                        <div
                            key={delivery.id}
                            className="flex flex-col gap-3 rounded-xl border p-4 shadow-sm"
                        >

                            {/* HEADER */}
                            <div className="flex justify-between">

                                <div>
                                    <p className="text-sm font-semibold">
                                        {delivery.do_number}
                                    </p>

                                    <p className="text-xs text-muted-foreground">
                                        {delivery.date}
                                    </p>
                                </div>

                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${statusStyle(
                                        delivery.status
                                    )}`}
                                >
                                    {delivery.status}
                                </span>

                            </div>

                            {/* SUPPLIER */}
                            <div className="flex gap-2 text-sm text-muted-foreground">
                                <Truck className="size-4" />
                                {delivery.supplier}
                            </div>

                            {/* ITEM */}
                            <div className="flex gap-2 text-sm text-muted-foreground">

                                <Package className="size-4" />

                                <div className="flex items-center font-medium">
                                    <p>{delivery.items_count} Item</p>
                                    <Dot />
                                    <p>{delivery.total_quantity} Total</p>
                                </div>

                            </div>

                            {/* ACTION */}
                            <div className="flex gap-2">

                                <Button
                                    variant="secondary"
                                    className="w-full"
                                >
                                    <Eye className="size-4" />
                                    Detail
                                </Button>

                                {delivery.status === "draft" && (

                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                        onClick={() => openEdit(delivery)}
                                    >
                                        <Edit3 className="size-4" />
                                        Edit
                                    </Button>

                                )}

                                <Button
                                    variant="secondary"
                                    className="w-full"
                                >
                                    <Printer className="size-4" />
                                    Cetak
                                </Button>

                            </div>

                        </div>

                    ))}

                    {filteredData.length === 0 && (

                        <div className="text-center text-muted-foreground py-10">
                            Tidak ada data
                        </div>

                    )}

                </div>

            </div>

            {/* FORM MODAL */}
            {openForm && (
                <Form
                    data={selectedData}
                    suppliers={suppliers}
                    items={items}
                    type={activeTab}
                    onClose={() => setOpenForm(false)}
                />
            )} 

        </AppLayout>
    )
}