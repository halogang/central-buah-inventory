import { router } from "@inertiajs/react"
import { X} from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { notify } from "@/lib/notify"

import { store, update } from "@/routes/surat-jalan"

import DeliveryEvidenceSection from "./DeliveryEvidenceSection"
import DeliveryInfoSection from "./DeliveryInfoSection"
import DeliveryItemsSection from "./DeliveryItemsSection"
import DeliverySignatureSection from "./DeliverySignatureSection"

export default function Form({
    data,
    suppliers,
    customers,
    items,
    type,
    onClose
}: any) {

    const [doNumber, setDoNumber] = useState("");
    const [selectingItem, setSelectingItem] = useState(false)
    const [searchItem, setSearchItem] = useState("")

    useEffect(() => {

        if (data) return

        fetch(`/surat-jalan/preview-number/${type}`)
            .then(res => res.json())
            .then(res => {
                setDoNumber(res.number)
                setForm((prev:any) => ({
                    ...prev,
                    do_number: res.number
                }))
            })

    }, [type])

    const filteredItems = items.filter((i:any) =>
        i.name.toLowerCase().includes(searchItem.toLowerCase())
    )

    const selectItem = (item:any) => {

        const newItem = {
            item_id: item.id,
            name: item.name,
            image: item.image,
            image_url: item.image_url,
            unit: item.unit,
            quantity: "",
            bad_stock: "",
            price: ""
        }

        setForm({
            ...form,
            items: [...form.items, newItem]
        })

        setSelectingItem(false)
        setSearchItem("")
    }

    const emptyForm = {
        do_number: "",
        supplier_id: "",
        customer_id: "",
        date: "",
        status: "draft",
        sender_name: "",
        receiver_name: "",
        sender_signature: "",
        receiver_signature: "",
        note: "",
        evidence: null,
        items: []
    }

    const [form, setForm] = useState(
        data
            ? { ...data, items: data.items ?? [] }
            : emptyForm
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

    const getNetQty = (item:any) => {
        const qty = Number(item.quantity || 0)
        const bad = Number(item.bad_stock || 0)

        return qty - bad
    }

    const getItemTotal = (item:any) => {
        const net = getNetQty(item)
        const price = Number(item.price || 0)

        return net * price
    }

    const totalAmount = (form?.items || []).reduce((sum:number, item:any) => {
        return sum + getItemTotal(item)
    }, 0)

    const submitForm = (e: React.FormEvent) => {

        e.preventDefault()
        console.log(form) // cek ini

        const payload = {
            ...form,
            type
        }

        if (data) {
            payload._method='PUT';

            router.post(update(data.id), payload, {

                forceFormData: true,
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

                forceFormData: true,
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4"
            onClick={onClose}
        >

            <div
                className="bg-background rounded-lg py-6 w-full max-w-3xl shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >


                <form
                    onSubmit={submitForm}
                    className=""
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

                    <div className="space-y-4 px-6 max-h-[70vh] overflow-y-auto">
                        <DeliveryInfoSection
                            form={form}
                            suppliers={suppliers}
                            customers={customers}
                            type={type}
                            setForm={setForm}
                        />

                        <DeliveryItemsSection
                            form={form}
                            selectingItem={selectingItem}
                            searchItem={searchItem}
                            filteredItems={filteredItems}
                            setSelectingItem={setSelectingItem}
                            setSearchItem={setSearchItem}
                            selectItem={selectItem}
                            updateItem={updateItem}
                            removeItem={removeItem}
                            totalAmount={totalAmount}
                            getNetQty={getNetQty}
                            getItemTotal={getItemTotal}
                        />

                        {form.status === 'done' && (
                            <>
                                <DeliveryEvidenceSection
                                    form={form}
                                    setForm={setForm}
                                />

                                <DeliverySignatureSection
                                    form={form}
                                    setForm={setForm}
                                    type={type}
                                />
                            </>
                        )}
                    </div>

                    {/* ACTION */}

                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-sidebar-border px-6">

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