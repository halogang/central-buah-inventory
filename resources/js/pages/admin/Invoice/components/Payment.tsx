import { FormImageUpload, FormInput } from "@/components/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreditCard, X } from "lucide-react"


interface Props {
    onClose: () => void
}

export default function Show({onClose}: Props) {

    const paymentMethod = [
        {
            'icon': '💵',
            'name': 'Tunai'
        },
        {
            'icon': '🏦',
            'name': 'Transfer Bank BCA'
        },
        {
            'icon': '🏦',
            'name': 'Transfer Bank Mandiri'
        },
        {
            'icon': '📱',
            'name': 'QRIS'
        },
    ]

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

            <div
                className="bg-white w-full max-w-6xl rounded-xl shadow-xl overflow-y-hidden max-h-[90vh] flex flex-col">

                {/* HEADER */}

                <div className="flex items-center justify-between p-4 border-b shrink-0">
                    <h2 className="font-semibold text-lg">
                        INV/20260220/001
                    </h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 cursor-pointer"/>
                    </button>
                </div>

                <div className="p-4 flex flex-col gap-2 overflow-y-auto">
                    <div className="">
                        <div className="rounded-lg bg-primary/10 p-3">
                            <p className="text-[10px] text-muted-foreground">SISA TAGIHAN</p>
                            <span className="text-xl text-primary font-bold">Rp. 1.000.000</span>
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="pay" className="text-xs font-semibold text-muted-foreground">Jumlah Bayar</label>
                        <div className="relative">
                            <Input
                                id="pay"
                                type="number"
                                name="pay"
                                placeholder="1.000.000"
                                autoComplete="pay"
                                autoFocus
                                className="pl-10 h-11"
                            />
                            <button
                                className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm'>
                                Rp.
                            </button>
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="pay" className="text-xs font-semibold text-muted-foreground">Metode Pembayaran</label>
                        <div className="grid grid-cols-2 gap-2">
                        {paymentMethod.map((method, index) => (
                            <button
                            key={index}
                            className="flex items-center gap-2 border rounded-lg p-3 hover:bg-primary/10 transition"
                            >
                            <span className="text-lg">{method.icon}</span>
                            <span className="text-sm font-medium">{method.name}</span>
                            </button>
                        ))}
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="note" className="text-xs font-semibold text-muted-foreground">Keterangan (opsional)</label>
                        <Input
                            id="note"
                            type="text"
                            name="note"
                            placeholder="Catatan pembayaran"
                            autoComplete="note"
                            autoFocus
                            className="h-11"
                        />
                    </div>

                    <div className="">
                        <label htmlFor="evidence" className="text-xs font-semibold text-muted-foreground">Bukti Pembayaran</label>
                        <FormImageUpload
                            label=""
                            title="Tap untuk foto/upload"
                            icon="camera"
                            subtitle=""
                            preview={''}
                            onChange={() => 'test' }
                            hint="maksimal 2MB"
                        />
                    </div>

                    <div className="flex gap-2 p-4">

                        {/* {delivery.status === "draft" && ( */}

                            <Button
                                variant="secondary"
                                className="w-full cursor-pointer"
                                // onClick={() => openEdit(delivery)}
                            >
                                Kembali
                            </Button>

                        {/* )} */}

                        <Button
                            variant="default"
                            className="w-full cursor-pointer"
                            // onClick={() => openPayModal()}
                        >
                            Simpan Pembayaran
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}