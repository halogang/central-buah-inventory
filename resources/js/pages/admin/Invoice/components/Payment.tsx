import { router } from "@inertiajs/react"
import { X } from "lucide-react"
import { useState } from "react"
import { FormImageUpload } from "@/components/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatCurrency, formatNumber } from "@/helpers/format"
import { notify } from "@/lib/notify"
import { store, update } from "@/routes/transactions/payments"

export default function Payment({ invoice, paymentMethods, onClose, onSuccess, editingPayment }: any) {

    const isEditing = !!editingPayment

    const emptyForm = {
        invoice_id: '',
        amount: null,
        payment_method_id: "",
        note: "",
        evidence: null as File | null,
        evidence_url: null as File | null,
    };

    const [form, setForm] = useState(
        invoice && editingPayment ? {
            invoice_id: invoice.id,
            amount: editingPayment.amount.toString(),
            payment_method_id: editingPayment.payment_method_id.toString(),
            note: editingPayment.note || "",
            evidence: null as File | null, // 🔥 penting
            evidence_url: editingPayment.evidence_url, // simpan url lama
        } : emptyForm
    )

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault()

        const route = isEditing ? update(editingPayment.id) : store()

        router.post(route, isEditing ? {
            ...form,
            _method: 'put'
        } : form, {
            forceFormData: true,
            onSuccess: (page) => {

                notify.success(isEditing ? "Pembayaran berhasil diupdate" : "Pembayaran berhasil")

                const updatedInvoice = page.props.invoice

                if (updatedInvoice) {
                    onSuccess(updatedInvoice)
                }

                onClose()
            },
            onError: (errors) => {
                notify.error(Object.values(errors).join("\n"))
            }
        })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6">

            <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl overflow-y-hidden max-h-[90vh] flex flex-col">

                {/* HEADER */}
                <div className="flex items-center justify-between p-4 border-b shrink-0">
                    <h2 className="font-semibold text-lg">
                        {isEditing ? 'Edit Pembayaran Test' : 'Input Pembayaran'} - {invoice.invoiceNumber}
                    </h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 cursor-pointer" />
                    </button>
                </div>

                <form
                    onSubmit={submitForm}
                    className="p-4 flex flex-col gap-4 overflow-y-auto"
                >

                    {/* SISA TAGIHAN */}
                    <div className="rounded-lg bg-primary/10 p-3">
                        <p className="text-[10px] text-muted-foreground">
                            SISA TAGIHAN
                        </p>
                        <span className="text-xl text-primary font-bold">
                            {formatCurrency(invoice.remaining)}
                        </span>
                    </div>

                    {/* AMOUNT */}
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground">
                            Jumlah Bayar
                        </label>

                        <div className="relative">
                            <Input
                                type="number"
                                value={form.amount}
                                onChange={(e) =>
                                    setForm({ ...form, amount: e.target.value })
                                }
                                placeholder={formatNumber(invoice.remaining)}
                                className="pl-10 h-11"
                                required
                            />

                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                Rp.
                            </span>
                        </div>
                    </div>

                    {/* PAYMENT METHOD */}
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground">
                            Metode Pembayaran
                        </label>

                        <div className="grid grid-cols-2 gap-2 mt-2">

                            {paymentMethods.map((method: any) => (

                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() =>
                                        setForm({
                                            ...form,
                                            payment_method_id: method.id
                                        })
                                    }
                                    className={`
                                        flex items-center gap-2 border rounded-lg p-3 transition cursor-pointer
                                        ${String(form.payment_method_id) === String(method.id)
                                            ? "bg-primary/10 border-primary"
                                            : "hover:bg-primary/10"}
                                    `}
                                >
                                    <span className="text-lg">
                                        {method.icon}
                                    </span>

                                    <span className="text-sm font-medium">
                                        {method.name}
                                    </span>

                                </button>

                            ))}

                        </div>
                    </div>

                    {/* NOTE */}
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground">
                            Keterangan (opsional)
                        </label>

                        <Input
                            type="text"
                            value={form.note}
                            onChange={(e) =>
                                setForm({ ...form, note: e.target.value })
                            }
                            placeholder="Catatan pembayaran"
                            className="h-11"
                        />
                    </div>

                    {/* EVIDENCE */}
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground">
                            Bukti Pembayaran
                        </label>

                        <FormImageUpload
                            label=""
                            title="Tap untuk upload"
                            icon="camera"
                            preview={
                                form.evidence
                                    ? URL.createObjectURL(form.evidence) // 🔥 preview file baru
                                    : form.evidence_url // fallback ke lama
                            }
                            onChange={(file) =>
                                setForm({ 
                                    ...form, 
                                    evidence: file,
                                    evidence_url: null // 🔥 reset url lama biar gak bentrok
                                })
                            }
                            hint="maksimal 2MB"
                        />
                    </div>

                    {/* BUTTON */}
                    <div className="flex gap-2 pt-4">

                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full cursor-pointer"
                            onClick={onClose}
                        >
                            Kembali
                        </Button>

                        <Button
                            type="submit"
                            className="w-full cursor-pointer"
                        >
                            {isEditing ? 'Update Pembayaran' : 'Simpan Pembayaran'}
                        </Button>

                    </div>

                </form>

            </div>

        </div>
    )
}