import { X, Printer, Camera, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/helpers/format"

interface Props {
    data: any
    onClose: () => void
}

export default function Show({ data, onClose }: Props) {

    const getNet = (item:any) => {
        const qty = Number(item.quantity || 0)
        const bad = Number(item.bad_stock || 0)
        return qty - bad
    }

    const getTotalItemWeight = () => {
        return (data.items ?? []).reduce((sum:number, item:any) => {
            return sum + Number(item.quantity || 0)
        }, 0)
    }

    const getCartWeight = () => {
        return (data.items ?? []).reduce((sum: number, item: any) => {
            const cartQty = Number(item.cart_qty || 0)
            const cartWeight = Number(item.cart_weight || 0)

            return sum + (cartQty * cartWeight)
        }, 0)
    }
    // const totalWeight = getTotalItemWeight() + getCartWeight()
    const totalWeight = (data?.items || []).reduce((sum: number, item: any) => {
        const net = Number(getNet(item)) // ✅ pakai net
        const cartQty = Number(item.cart_qty || 0)
        const cartWeight = Number(item.cart_weight || 0)

        return sum + net + (cartQty * cartWeight)
    }, 0)

    console.log(data)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

            <div className="bg-background w-full max-w-4xl rounded-xl shadow-xl overflow-y-hidden max-h-[90vh] flex flex-col">

                {/* HEADER */}

                <div className="flex items-center justify-between px-5 py-4 border-b bg-muted/30 shrink-0">

                    <div>
                        <h2 className="font-semibold text-lg">
                            {data.do_number}
                        </h2>

                        <div className="flex items-center gap-2 mt-1">

                            <span
                                className={`
                                    text-xs px-2 py-1 rounded-full font-medium
                                    ${data.type === 'in'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-orange-100 text-orange-700'
                                    }
                                `}
                            >
                                {data.type === 'in'
                                    ? 'Surat Jalan Masuk'
                                    : 'Surat Jalan Keluar'}
                            </span>

                        </div>
                    </div>

                    <button onClick={onClose}>
                        <X className="w-5 h-5"/>
                    </button>

                </div>


                <div className="p-6 space-y-6 overflow-y-auto">

                    {/* INFO */}

                    <div className="grid grid-cols-2 gap-6">

                        <div>
                            <p className="text-xs text-muted-foreground">
                                TANGGAL
                            </p>
                            <p className="font-medium">
                                {data.date}
                            </p>

                            <div className="mt-4">

                                <p className="text-xs text-muted-foreground">
                                    SUPPLIER
                                </p>

                                <p className="font-medium">
                                    {data.supplier}
                                </p>

                            </div>

                        </div>

                        <div className="text-right">

                            <p className="text-xs text-muted-foreground">
                                STATUS
                            </p>

                            <span className="inline-block px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                                {data.status}
                            </span>

                        </div>

                    </div>


                    {/* TABLE BARANG */}

                    <div>

                        <p className="text-sm font-medium mb-2">
                            DAFTAR BARANG
                        </p>

                        <div className="rounded-lg border overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead className="bg-muted/50">

                                    <tr className="text-left text-xs uppercase text-muted-foreground">

                                        <th className="p-3">Barang</th>
                                        <th className="p-3">Keranjang</th>
                                        <th className="p-3 text-center">Qty</th>
                                        <th className="p-3 text-center">Bad</th>
                                        <th className="p-3 text-center">Net</th>
                                        <th className="p-3 text-right">Harga/Kg</th>
                                        <th className="p-3 text-right">Total</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {(data.items ?? []).map((item:any,i:number)=>{

                                        const net = getNet(item)

                                        return (

                                            <tr
                                                key={i}
                                                className="border-t hover:bg-muted/30 transition-colors"
                                            >

                                                <td className="p-3">

                                                    <div className="flex items-center gap-3">

                                                        {item.image ? (
                                                            <img
                                                                src={item.image_url}
                                                                className="w-10 h-10 rounded-md object-cover border"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
                                                                -
                                                            </div>
                                                        )}

                                                        <div className="flex flex-col">
                                                            <span className="font-medium">
                                                                {item.name}
                                                            </span>

                                                            <span className="text-xs text-muted-foreground">
                                                                {item.unit?.unit_code ?? '-'}
                                                            </span>
                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="p-3">

                                                    <div className="flex flex-col gap-1">

                                                        <span className="font-medium">
                                                            {item.cart?.name ?? '-'}
                                                        </span>

                                                        <div className="text-xs text-muted-foreground">
                                                            {item.cart_qty || 0} x {item.cart_weight || 0} kg
                                                        </div>

                                                    </div>

                                                </td>

                                                <td className="p-3 text-center">
                                                    {item.quantity}
                                                </td>

                                                <td className="p-3 text-center text-red-500 font-medium">
                                                    {item.bad_stock}
                                                </td>

                                                <td className="p-3 text-center text-green-600 font-semibold">
                                                    {net}
                                                </td>

                                                <td className="p-3 text-right">
                                                    {formatCurrency(item.unit_price || 0)}
                                                </td>

                                                <td className="p-3 text-right font-semibold text-primary">
                                                    {formatCurrency(item.price || 0)}
                                                </td>

                                            </tr>

                                        )

                                    })}

                                </tbody>

                            </table>

                        </div>

                    </div>

                    {/* INFO */}

                    <div className="rounded-xl border bg-muted/30 p-5 space-y-4">

                        <div className="flex items-center justify-between text-sm">

                            <span className="text-muted-foreground">
                                Total Barang
                            </span>

                            <span className="font-medium">
                                {formatCurrency(
                                    (data.total_amount || 0) - (data.loading_cost || 0)
                                )}
                            </span>

                        </div>

                        <div className="flex items-center justify-between text-sm">

                            <span className="text-muted-foreground">
                                Ongkos Muat / Angkut
                            </span>

                            <span className="font-medium">
                                {formatCurrency(data.loading_cost || 0)}
                            </span>

                        </div>

                        <div className="border-t pt-4 flex items-center justify-between">

                            <span className="font-semibold">
                                Grand Total
                            </span>

                            <span className="text-2xl font-extrabold text-primary">
                                {formatCurrency(data.total_amount || 0)}
                            </span>

                        </div>

                    </div>


                    {/* SIGNATURE */}

                    <div className="grid grid-cols-2 gap-4">

                        <div className="border rounded-xl p-5 flex flex-col gap-3 items-center justify-center bg-background">

                            <p className="text-xs text-muted-foreground">
                                PENGIRIM
                            </p>

                            <p className="font-medium">
                                {data.sender_name || "-"}
                            </p>

                            {data.sender_signature && (
                                <img
                                    src={data.sender_signature_url}
                                    alt="TTD Pengirim"
                                    className="h-20 mx-auto mt-2 object-contain"
                                />
                            )}

                            <p 
                                className= {
                                    `text-sm flex items-center
                                    ${data.sender_signature ? "text-green-600" : "text-red-600"}
                                `}>
                                {data.sender_signature ?
                                (
                                    <Check className="size-5"/>
                                ):(
                                    <X className="size-5"/>
                                )}
                                TTD Digital
                            </p>

                        </div>


                        <div className="border rounded-xl p-5 flex flex-col gap-3 items-center justify-center bg-background">

                            <p className="text-xs text-muted-foreground">
                                PENERIMA
                            </p>

                            <p className="font-medium">
                                {data.receiver_name || "-"}
                            </p>

                            {data.receiver_signature && (
                                <img
                                    src={data.receiver_signature_url}
                                    alt='TTD Penerima'
                                    className="h-20 mx-auto object-contain"
                                />
                            )}

                            <p 
                                className= {
                                    `text-sm flex items-center
                                    ${data.receiver_signature ? "text-green-600" : "text-red-600"}
                                `}>
                                {data.receiver_signature ?
                                (
                                    <Check className="size-5"/>
                                ):(
                                    <X className="size-5"/>
                                )}
                                TTD Digital
                            </p>

                        </div>

                    </div>


                    {/* EVIDENCE */}

                    <div className="border rounded-xl p-6">

                        <Camera className="mx-auto mb-4"/>

                        {Array.isArray(data.evidence) && data.evidence.length > 0 ? (

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                                {data.evidence.map((path: string, index: number) => (
                                    <img
                                        key={index}
                                        src={`${path}`}
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                ))}

                            </div>

                        ) : (

                            <p className="text-sm text-muted-foreground">
                                Tidak ada foto serah terima
                            </p>

                        )}

                    </div>


                    {/* ACTIONS */}

                    <div className="flex gap-4">

                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => window.open(`/surat-jalan/${data.id}/print`, "_blank")}
                        >
                            <Printer className="w-4 h-4 mr-2"/>
                            Cetak PDF
                        </Button>

                    </div>

                </div>

            </div>

        </div>
    )
}