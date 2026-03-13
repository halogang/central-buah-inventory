import { CircleCheck, CreditCard, Image, Printer, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/helpers/format"
import Payment from "./Payment"


export default function Show({data, paymentMethods, onClose}: any) {
    const [invoice, setInvoice] = useState(data)
    
    const [openPayment, setOpenPayment] = useState(false)
    const [openEvidence, setOpenEvidence] = useState(false)
    const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null)

    const openPayModal = () => {
        setOpenPayment(true)
    }

    return (
        <>
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

            <div
                className="bg-white w-full max-w-6xl rounded-xl shadow-xl  overflow-y-auto max-h-[90vh] flex flex-col">

                {/* HEADER */}

                <div className="flex items-center justify-between p-4 border-b shrink-0">
                    <h2 className="font-semibold text-lg">
                        {invoice.invoiceNumber}
                    </h2>
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
                                className={`px-2 py-1 text-xs rounded-full ${
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

                                <thead className="bg-muted">

                                    <tr className="text-left">

                                        <th className="p-3">BARANG</th>
                                        <th className="p-3 text-center">QTY</th>
                                        <th className="p-3 text-right">HARGA</th>
                                        <th className="p-3 text-right">TOTAL</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {invoice.invoiceItems.map((item: any) => {
                                        return (
                                            <tr
                                                key={item.id}
                                                className="border-t"
                                            >

                                                <td className="p-3">
                                                    {item.item?.name}
                                                </td>

                                                <td className="p-3 text-center text-muted-foreground">
                                                    {item.quantity}
                                                </td>

                                                <td className="p-3 text-right text-muted-foreground">
                                                    {formatCurrency(item.price)}
                                                </td>

                                                <td className="p-3 text-right font-medium">
                                                    {formatCurrency(item.total)}
                                                </td>

                                            </tr>
                                        )
                                    })}
                                    
                                </tbody>

                            </table>

                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Total</p>
                            <p className="text-lg font-semibold text-primary">{formatCurrency(invoice.total)}</p>
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

                    {invoice.remaining > 0 && (
                        <Button
                            variant="default"
                            className="w-full cursor-pointer"
                            onClick={() => openPayModal()}
                        >
                            <CreditCard className="size-4" />
                            Input Pembayaran
                        </Button>
                    )}

                </div>
            </div>
        </div>

        {openPayment && (
            <Payment
                invoice={invoice}
                paymentMethods={paymentMethods}
                onClose={() => setOpenPayment(false)}
                onSuccess={(updatedInvoice: any) => setInvoice(updatedInvoice)}
            />
        )}
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