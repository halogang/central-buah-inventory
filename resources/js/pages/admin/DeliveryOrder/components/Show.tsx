import { X, Printer, Camera, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

            <div className="bg-background w-full max-w-4xl rounded-xl shadow-xl overflow-y-hidden max-h-[90vh] flex flex-col">

                {/* HEADER */}

                <div className="flex items-center justify-between p-4 border-b shrink-0">

                    <h2 className="font-semibold text-lg">
                        {data.do_number}
                    </h2>

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

                        <div className="rounded-lg overflow-hidden border">

                            <table className="w-full text-sm">

                                <thead className="bg-muted">

                                    <tr className="text-left">

                                        <th className="p-3">BARANG</th>
                                        <th className="p-3 text-center">QTY</th>
                                        <th className="p-3 text-center">BAD</th>
                                        <th className="p-3 text-center">NET</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {(data.items ?? []).map((item:any,i:number)=>{

                                        const net = getNet(item)

                                        return (

                                            <tr
                                                key={i}
                                                className="border-t"
                                            >

                                                <td className="p-3">
                                                    {item.name}
                                                </td>

                                                <td className="p-3 text-center">
                                                    {item.quantity}
                                                </td>

                                                <td className="p-3 text-center text-red-500">
                                                    {item.bad_stock}
                                                </td>

                                                <td className="p-3 text-center text-green-600 font-medium">
                                                    {net} {item.unit}
                                                </td>

                                            </tr>

                                        )

                                    })}

                                </tbody>

                            </table>

                        </div>

                    </div>


                    {/* SIGNATURE */}

                    <div className="grid grid-cols-2 gap-4">

                        <div className="bg-muted rounded-lg p-4 flex flex-col gap-2 items-center justify-center">

                            <p className="text-xs text-muted-foreground">
                                PENGIRIM
                            </p>

                            <p className="font-medium">
                                {data.sender_name || "-"}
                            </p>

                            {data.sender_signature && (
                                <img
                                    src={data.sender_signature_url}
                                    alt={data.sender_signature_url}
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


                        <div className="bg-muted rounded-lg p-4 flex flex-col gap-2 items-center justify-center">

                            <p className="text-xs text-muted-foreground">
                                PENERIMA
                            </p>

                            <p className="font-medium">
                                {data.receiver_name || "-"}
                            </p>

                            {data.receiver_signature && (
                                <img
                                    src={data.receiver_signature_url}
                                    alt={data.receiver_signature_url}
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

                    <div className="bg-muted rounded-lg p-6 text-center">

                        <Camera className="mx-auto mb-2"/>

                        {data.evidence ? (

                            <img
                                src={data.evidence_url}
                                alt={data.evidence_url}
                                className="mx-auto max-h-48 rounded-md"
                            />

                        ) : (

                            <p className="text-sm text-muted-foreground">
                                Foto serah terima tersedia
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

                        <Button
                            variant="outline"
                            className="flex-1"
                        >
                            INV/{data.do_number}
                        </Button>

                    </div>

                </div>

            </div>

        </div>
    )
}