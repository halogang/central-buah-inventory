import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/helpers/format"
import { CreditCard, Eye, Printer, X } from "lucide-react"
import { useState } from "react"
import Payment from "./Payment"


interface Props {
    data: any
    onClose: () => void
}

export default function Show({data, onClose}: Props) {
    const [openPayment, setOpenPayment] = useState(false)

    const openPayModal = () => {
        setOpenPayment(true)
    }

    return (
        <>
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

            <div
                className="bg-white w-full max-w-6xl rounded-xl shadow-xl overflow-y-hidden max-h-[90vh] flex flex-col">

                {/* HEADER */}

                <div className="flex items-center justify-between p-4 border-b shrink-0">
                    <h2 className="font-semibold text-lg">
                        {data.invoiceNumber}
                    </h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 cursor-pointer"/>
                    </button>
                </div>

                <div className="grid grid-cols-2 p-4 gap-4">
                    <div>
                        <p className="text-muted-foreground text-xs font-light">TANGGAL</p>
                        <p className="text-sm font-semibold">{data.date}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-light mb-1">STATUS</p>
                        <p className="text-sm font-semibold">
                            <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                    data.status === 'unpaid' ?
                                    `bg-red-500/10 text-red-500`
                                    : data.status === 'partial' ?
                                    `bg-orange-500/10 text-orange-500`
                                    : `bg-primary/10 text-primary`
                                }`}
                            >
                                {
                                    data.status === 'unpaid' ?
                                    'Belum Lunas'
                                    : data.status === 'partial' ?
                                    'Sebagian'
                                    : 'Lunas'
                                }
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-light">REF SURAT JALAN</p>
                        <p className="text-sm font-semibold text-primary">{data.deliveryOrder}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-light">PELANGGAN</p>
                        <p className="text-sm font-semibold">{data.type === 'in' ? data.supplier : data.customer}</p>
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

                                    {data.invoiceItems.map((item: any) => {
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
                            <p className="text-lg font-semibold text-primary">{formatCurrency(data.total)}</p>
                        </div>

                </div>

                <div className="flex gap-2 p-4">

                    {/* {delivery.status === "draft" && ( */}

                        <Button
                            variant="secondary"
                            className="w-full cursor-pointer"
                            // onClick={() => openEdit(delivery)}
                        >
                            <Printer className="size-4" />
                            Cetak PDF
                        </Button>

                    {/* )} */}

                    <Button
                        variant="default"
                        className="w-full cursor-pointer"
                        onClick={() => openPayModal()}
                    >
                        <CreditCard className="size-4" />
                        Input Pembayaran
                    </Button>

                </div>
            </div>
        </div>

        {openPayment && (<Payment onClose={() => setOpenPayment(false)}/>)}
        </>
    )
}