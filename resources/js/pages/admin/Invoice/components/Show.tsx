import { Button } from "@/components/ui/button"
import { CreditCard, Eye, Printer, X } from "lucide-react"


interface Props {
    data: any
    onClose: () => void
}

export default function Show({data, onClose}: Props) {
    return (
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
                        <p className="text-sm font-semibold">03-03-2026</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-light">REF SURAT JALAN</p>
                        <p className="text-sm font-semibold text-primary">SJK/20260220/001</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-light">STATUS</p>
                        <p className="text-sm font-semibold">03-03-2026</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground text-xs font-light">PELANGGAN</p>
                        <p className="text-sm font-semibold">03-03-2026</p>
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

                                    <tr
                                        // key={i}
                                        className="border-t"
                                    >

                                        <td className="p-3">
                                            Apel Fuji Import
                                        </td>

                                        <td className="p-3 text-center text-muted-foreground">
                                            20 kg
                                        </td>

                                        <td className="p-3 text-right text-muted-foreground">
                                            Rp. 50.000
                                        </td>

                                        <td className="p-3 text-right font-medium">
                                            Rp. 1.000.000
                                        </td>

                                    </tr>
                                </tbody>

                            </table>

                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Total</p>
                            <p className="text-lg font-semibold text-primary">Rp. 1.000.000</p>
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
                        // onClick={() => openPayModal()}
                    >
                        <CreditCard className="size-4" />
                        Input Pembayaran
                    </Button>

                </div>
            </div>
        </div>
    )
}