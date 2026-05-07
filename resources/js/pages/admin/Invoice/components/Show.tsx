import { CircleCheck, CreditCard, Image, PenBox, Printer, Trash2, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/helpers/format"
import { useCan } from "@/utils/permissions"
import { router } from "@inertiajs/react"
import { notify } from "@/lib/notify"


export default function Show({
    data,
    setOpenPayment,
    onClose,
    editingPayment,
    setEditingPayment,
    onDeletePayment = () => {}
} : any) {
    const can = useCan();

    const [invoice, setInvoice] = useState(data)
    
    const [openEvidence, setOpenEvidence] = useState(false)
    const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null)

    const handleEditPayment = (payment: any) => {
        setEditingPayment(payment)
        setOpenPayment()
    }

    // const handleDeletePayment = (payment: any) => {
    //     if (!confirm("Yakin ingin menghapus pembayaran ini?")) return

    //     router.delete(route('payments.destroy', payment.id), {
    //         onSuccess: (page) => {
    //             const updatedInvoice = page.props.invoice
    //             if (updatedInvoice) {
    //                 setInvoice(updatedInvoice)
    //             }
    //         }
    //     })
    // }

    const confirmDelete = (payment: any) => {
        notify.confirmDelete({
            message: `Hapus pembayaran ini?`,
            onConfirm: () => {
                if (typeof onDeletePayment !== "function") {
                    console.error("onDeletePayment is not a function", onDeletePayment)
                    return
                }
                onDeletePayment(payment)
            },
        })
    }
    // const performDelete = (payment: any) => {
    //     const loading = notify.loading("Menghapus pembayaran...")

    //     router.delete(destroy(payment.id), {
    //         onSuccess: () => {
    //             notify.dismiss(loading)
    //             notify.success(`Pembayaran berhasil dihapus`)
    //         },
    //         onError: () => {
    //             notify.dismiss(loading)
    //             notify.error(`Gagal menghapus pembayaran`)
    //         },
    //     })
    // }

    return (
        <>
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

            <div
                className="bg-white w-full max-w-6xl rounded-xl shadow-xl  overflow-y-auto max-h-[90vh] flex flex-col">

                {/* HEADER */}

                <div className="flex items-center justify-between px-5 py-4 border-b bg-muted/30 shrink-0">
                    <div>
                        <h2 className="font-semibold text-lg">
                            {invoice.invoiceNumber}
                        </h2>
                        <div className="flex gap-2 mt-1">

                            <span
                                className={`
                                    text-xs px-2 py-1 rounded-full font-medium
                                    ${invoice.type === 'in'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-orange-100 text-orange-700'
                                    }
                                `}
                            >
                                {invoice.type === 'in'
                                    ? 'Invoice Supplier'
                                    : 'Invoice Customer'}
                            </span>

                        </div>
                    </div>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 cursor-pointer"/>
                    </button>

                </div>

                <div className="grid grid-cols-2 p-4 gap-4">
                    <div>
                        <p className="text-muted-foreground text-xs font-light">TANGGAL</p>
                        <p className="text-sm font-semibold">{invoice.date}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-light mb-1">STATUS</p>
                        <p className="text-sm font-semibold">
                            <span
                                className={`px-3 py-1 text-xs rounded-full font-medium ${
                                    invoice.status === 'unpaid' ?
                                    `bg-red-500/10 text-red-500`
                                    : invoice.status === 'partial' ?
                                    `bg-orange-500/10 text-orange-500`
                                    : `bg-primary/10 text-primary`
                                }`}
                            >
                                {
                                    invoice.status === 'unpaid' ?
                                    'Belum Lunas'
                                    : invoice.status === 'partial' ?
                                    'Sebagian'
                                    : 'Lunas'
                                }
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-light">REF SURAT JALAN</p>
                        <p className="text-sm font-semibold text-primary">{invoice.deliveryOrder}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-light">PELANGGAN</p>
                        <p className="text-sm font-semibold">{invoice.type === 'in' ? invoice.supplier : invoice.customer}</p>
                    </div>
                </div>

                <div className="p-4 flex flex-col gap-2">

                        <p className="text-xs text-muted-foreground font-medium">
                            DAFTAR BARANG
                        </p>

                        <div className="rounded-lg overflow-hidden border">

                            <table className="w-full text-sm">

                                <thead className="bg-muted/50">

                                    <tr className="text-left text-xs uppercase text-muted-foreground">

                                        <th className="p-3">Barang</th>
                                        <th className="p-3 text-center">Qty</th>
                                        <th className="p-3 text-right">Total Item</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {invoice.invoiceItems.map((item: any) => {

                                        return (

                                            <tr
                                                key={item.id}
                                                className="border-t hover:bg-muted/30 transition-colors"
                                            >

                                                <td className="p-3">

                                                    <div className="flex flex-col">

                                                        <span className="font-medium">
                                                            {item.item?.name}
                                                        </span>

                                                        <span className="text-xs text-muted-foreground">
                                                            Qty: {item.quantity}
                                                        </span>

                                                    </div>

                                                </td>

                                                <td className="p-3 text-center">
                                                    {item.quantity}
                                                </td>

                                                <td className="p-3 text-right font-semibold text-primary">
                                                    {formatCurrency(item.total)}
                                                </td>

                                            </tr>

                                        )

                                    })}

                                </tbody>

                            </table>

                        </div>

                        <div className="rounded-xl border bg-muted/30 p-5 space-y-4 mt-3">

                            <div className="flex items-center justify-between text-sm">

                                <span className="text-muted-foreground">
                                    Subtotal Barang
                                </span>

                                <span className="font-medium">
                                    {formatCurrency(
                                        (invoice.total || 0) - (invoice.loading_cost || 0)
                                    )}
                                </span>

                            </div>

                            <div className="flex items-center justify-between text-sm">

                                <span className="text-muted-foreground">
                                    Ongkos Muat / Angkut
                                </span>

                                <span className="font-medium">
                                    {formatCurrency(invoice.loading_cost || 0)}
                                </span>

                            </div>

                            <div className="border-t pt-4 flex items-center justify-between">

                                <span className="font-semibold">
                                    Grand Total
                                </span>

                                <span className="text-2xl font-extrabold text-primary">
                                    {formatCurrency(invoice.total)}
                                </span>

                            </div>

                        </div>

                </div>

                {invoice.payments && invoice.payments.length > 0 && (
                    <div className="p-4 flex flex-col gap-2">

                        <p className="text-xs text-muted-foreground font-medium">
                            RIWAYAT PEMBAYARAN
                        </p>

                        {invoice.payments.map((payment: any) => (

                            <div
                                key={payment.id}
                                className="rounded-lg bg-muted flex justify-between items-center p-3"
                            >

                                <div className="flex flex-col gap-1">

                                    <span className="font-bold">
                                        {formatCurrency(payment.amount)}
                                    </span>

                                    <p className="text-xs text-muted-foreground">
                                        {payment.date}
                                    </p>

                                </div>

                                <div className="flex items-center gap-2">

                                    {payment.evidence && (
                                        <button
                                            onClick={() => {
                                                setSelectedEvidence(payment.evidence)
                                                setOpenEvidence(true)
                                            }}
                                            className="rounded-full px-2 py-1 text-xs bg-primary/10 text-primary flex gap-1 items-center justify-center cursor-pointer"
                                        >
                                            <Image className="size-4" />
                                            <p>Bukti</p>
                                        </button>
                                    )}

                                    <CircleCheck className="size-5 text-primary" />
                                    <button
                                        onClick={() => handleEditPayment(payment)}
                                    >
                                        <PenBox className="size-5 text-yellow-500 ml-2" />
                                    </button>
                                    <button
                                        onClick={() => confirmDelete(payment)}
                                    >
                                        <Trash2 className="size-5 text-red-500" />
                                    </button>
                                </div>

                            </div>

                        ))}

                    </div>
                )}
                <div className="px-4 pb-4 flex justify-between items-center">
                    <p className="text-md text-muted-foreground">
                        Sisa Tagihan
                    </p>
                    <p className={`text-md ${invoice.remaining <= 0 ? 'text-primary' : 'text-red-500'} font-bold`}>
                        {formatCurrency(invoice.remaining)}
                    </p>
                </div>

                <div className="flex gap-2 p-4">

                    {/* {delivery.status === "draft" && ( */}

                        <Button
                            variant="secondary"
                            className="w-full cursor-pointer"
                            onClick={() => window.open(`/invoice/${invoice.id}/print`, "_blank")}
                        >
                            <Printer className="size-4" />
                            Cetak PDF
                        </Button>

                    {/* )} */}

                    {invoice.remaining > 0 && can('invoice.payment') && (
                        <Button
                            variant="default"
                            className="w-full cursor-pointer"
                            onClick={setOpenPayment}
                        >
                            <CreditCard className="size-4" />
                            Input Pembayaran
                        </Button>
                    )}

                </div>
            </div>
        </div>

        {openEvidence && selectedEvidence && (
            <div
                className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-6"
                onClick={() => setOpenEvidence(false)}
            >
                <div
                    className="relative bg-white rounded-xl p-4 max-w-3xl w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        className="absolute right-3 top-3"
                        onClick={() => setOpenEvidence(false)}
                    >
                        <X className="size-5 cursor-pointer" />
                    </button>
                    <img
                        src={selectedEvidence}
                        className="w-full rounded-lg object-contain max-h-[80vh]"
                    />
                </div>
            </div>

        )}
        </>
    )
}