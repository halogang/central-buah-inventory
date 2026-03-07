import { router } from "@inertiajs/react"
import { X, Plus, Trash, FileText } from "lucide-react"
import { useEffect, useState } from "react"

import { FormInput } from "@/components/admin"
import FormSelect from "@/components/admin/FormSelect"
import { Button } from "@/components/ui/button"
import { notify } from "@/lib/notify"

import { store, update } from "@/routes/surat-jalan"

export default function Form({
    data,
    suppliers,
    items,
    type,
    onClose
}: any) {

    const [doNumber, setDoNumber] = useState("");

    useEffect(() => {
        fetch(`/surat-jalan/preview-number/${type}`)
            .then(res => res.json())
            .then(res => setDoNumber(res.number));
    }, [type]);

    const emptyForm = {
        do_number: "",
        date: "",
        supplier_id: "",
        status: "draft",
        items: [
            {
                item_id: "",
                quantity: "",
                bad_stock: "",
                price: ""
            }
        ]
    }

    const [form, setForm] = useState(
        data ? data : emptyForm
    )

    const addItem = () => {
        setForm({
            ...form,
            items: [
                ...form.items,
                {
                    item_id: "",
                    quantity: "",
                    bad_stock: "",
                    price: ""
                }
            ]
        })
    }

    const removeItem = (index: number) => {

        const updated = [...form.items]
        updated.splice(index, 1)

        setForm({
            ...form,
            items: updated
        })
    }

    const updateItem = (index: number, field: string, value: any) => {

        const updated = [...form.items]

        updated[index][field] = value

        setForm({
            ...form,
            items: updated
        })
    }

    const submitForm = (e: React.FormEvent) => {

        e.preventDefault()

        const payload = {
            ...form,
            type
        }

        if (data) {

            router.put(update(data.id), payload, {

                onSuccess: () => {
                    notify.success("Surat Jalan berhasil diperbarui")
                    onClose()
                },

                onError: (errors) => {
                    notify.error(Object.values(errors).join("\n"))
                }

            })

        } else {

            router.post(store(), payload, {

                onSuccess: () => {
                    notify.success("Surat Jalan berhasil dibuat")
                    onClose()
                },

                onError: (errors) => {
                    notify.error(Object.values(errors).join("\n"))
                }

            })

        }

    }

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-1"
            onClick={onClose}
        >

            <div
                className="bg-background rounded-lg py-6 w-full max-w-3xl shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex justify-between items-center border-b border-sidebar-border pb-2 px-6 mb-4">

                    <h2 className="text-lg font-semibold">

                        {data
                            ? `Edit ${data.do_number}`
                            : `Buat Surat Jalan ${type === "in" ? "Masuk" : "Keluar"}`
                        }

                    </h2>

                    <X className="h-5 w-5 cursor-pointer" onClick={onClose} />

                </div>

                <form
                    onSubmit={submitForm}
                    className="space-y-4 px-6 max-h-[80vh] overflow-y-auto"
                >

                    {/* NOMOR SJ */}
                    <FormInput
                        label=""
                        value={doNumber}
                        onChange={(e) =>
                            setForm({ ...form, do_number: e.target.value })
                        }
                        hidden
                    />
                    <div className="p-2 flex items-center gap-2 bg-primary/10 text-primary rounded-lg">
                        <FileText className="size-5 text-light" />
                        <div className="flex flex-col">
                            <span className="text-muted-foreground font-light text-[10px]">NOMOR SURAT JALAN</span>
                            <span className="font-semibold text-sm">{doNumber}</span>
                        </div>
                    </div>

                    {/* DATE */}
                    <FormInput
                        label="Tanggal"
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                        }
                        required
                    />

                    {/* SUPPLIER */}
                    <FormSelect
                        label="Supplier"
                        value={form.supplier_id}
                        onChange={(e) =>
                            setForm({ ...form, supplier_id: e.target.value })
                        }
                        options={suppliers.map((s: any) => ({
                            label: s.name,
                            value: s.id
                        }))}
                    />

                    {/* STATUS */}
                    <FormSelect
                        label="Status"
                        value={form.status}
                        onChange={(e) =>
                            setForm({ ...form, status: e.target.value })
                        }
                        options={[
                            { label: "Draft", value: "draft" },
                            { label: "Sent", value: "sent" },
                            { label: "Done", value: "done" }
                        ]}
                    />

                    {/* ITEMS */}

                    <div className="space-y-3 pt-2">

                        <div className="flex justify-between items-center">

                            <h3 className="font-semibold">
                                Daftar Barang
                            </h3>

                            <Button
                                type="button"
                                size="sm"
                                onClick={addItem}
                            >
                                <Plus className="size-4" />
                                Tambah
                            </Button>

                        </div>

                        {form.items.map((item: any, index: number) => (

                            <div
                                key={index}
                                className="grid grid-cols-12 gap-2 items-end border rounded-lg p-3"
                            >

                                {/* ITEM */}
                                <div className="col-span-5">

                                    <FormSelect
                                        label="Barang"
                                        value={item.item_id}
                                        onChange={(e) =>
                                            updateItem(index, "item_id", e.target.value)
                                        }
                                        options={items.map((i: any) => ({
                                            label: i.name,
                                            value: i.id
                                        }))}
                                    />

                                </div>

                                {/* QTY */}
                                <div className="col-span-3">

                                    <FormInput
                                        label="Qty"
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateItem(index, "quantity", e.target.value)
                                        }
                                    />

                                </div>

                                {/* BAD STOCK */}
                                <div className="col-span-3">

                                    <FormInput
                                        label="Bad Stock"
                                        type="number"
                                        value={item.bad_stock}
                                        onChange={(e) =>
                                            updateItem(index, "bad_stock", e.target.value)
                                        }
                                    />

                                </div>

                                {/* PRICE */}
                                <div className="col-span-3">

                                    <FormInput
                                        label="Price"
                                        type="number"
                                        value={item.price}
                                        onChange={(e) =>
                                            updateItem(index, "price", e.target.value)
                                        }
                                    />

                                </div>

                                {/* DELETE */}
                                <div className="col-span-1">

                                    <Button
                                        type="button"
                                        size="icon"
                                        variant="destructive"
                                        onClick={() => removeItem(index)}
                                    >
                                        <Trash className="size-4" />
                                    </Button>

                                </div>

                            </div>

                        ))}

                    </div>

                    {/* ACTION */}

                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-sidebar-border">

                        <Button
                            variant="secondary"
                            type="button"
                            onClick={onClose}
                        >
                            Batal
                        </Button>

                        <Button type="submit">
                            Simpan
                        </Button>

                    </div>

                </form>

            </div>

        </div>

    )

}