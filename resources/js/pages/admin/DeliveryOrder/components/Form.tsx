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

type DeliveryItem = {
    item_id: number
    name: string
    image?: string
    image_url?: string
    unit?: any
    quantity: number | string
    bad_stock?: number | string
    price?: number | string
    cart_id?: number | string
    cart_weight?: number | string
    cart_qty?: number | string
}

type DeliveryForm = {
    do_number: string
    supplier_id: string | number | null
    customer_id: string | number | null
    sender_id: string | number | null
    date: string
    status: string
    sender_name: string
    receiver_name: string
    sender_signature: string
    receiver_signature: string
    note: string | null

    evidence: {
        existing: string[]
        new: File[]
        deleted: string[]
    }

    items: DeliveryItem[]
}

export default function Form({
    data,
    isStaffAntar,
    suppliers,
    customers,
    items,
    type,
    carts,
    stafAntar,
    onClose
}: any) {
    
    const [selectingItem, setSelectingItem] = useState(false)
    const [searchItem, setSearchItem] = useState("")

    const emptyForm = {
        do_number: "",
        supplier_id: "",
        customer_id: "",
        sender_id: "",
        date: "",
        status: "draft",
        sender_name: "",
        receiver_name: "",
        sender_signature: "",
        receiver_signature: "",
        note: "",
        evidence: {
            existing: [],
            new: [],
            deleted: [],
        },
        items: []
    }

    const [form, setForm] = useState<DeliveryForm>(
        data
            ? { 
                ...data, 
                items: data.items ?? [],
                evidence: {
                    existing: Array.isArray(data.evidence)
                        ? data.evidence
                        : data.evidence
                            ? [data.evidence]
                            : [],
                    new: [],
                    deleted: []
                }
            }
            : emptyForm
    )

    useEffect(() => {

        if (data) return

        fetch(`/surat-jalan/preview-number/${type}`)
            .then(res => res.json())
            .then(res => {
                setForm((prev:any) => ({
                    ...prev,
                    do_number: res.number
                }))
            })

    }, [type, data])

    const filteredItems = items.filter((i:any) => {
        const matchesSearch = i.name
            .toLowerCase()
            .includes(searchItem.toLowerCase());
        
        const nonSelected = !form.items.some(
            (selected:any) => selected.item_id === i.id
        );

        return matchesSearch && nonSelected;
    })

    const selectItem = (item:any) => {

        const newItem = {
            item_id: item.id,
            name: item.name,
            image: item.image,
            image_url: item.image_url,
            unit: item.unit,
            stock: item.stock,
            quantity: "",
            bad_stock: "",
            price: type === 'in' ? item.purchase_price : item.selling_price,
            cart_id: "",
            cart_weight: "",
            cart_qty: ""
        }

        setForm({
            ...form,
            items: [...form.items, newItem]
        })

        setSelectingItem(false)
        setSearchItem("")
    }

    const removeItem = (index: number) => {

        const updated = [...form.items]
        updated.splice(index, 1)

        setForm({
            ...form,
            items: updated
        })
    }

    const updateItem = <K extends keyof DeliveryItem>(
        index: number,
        field: K,
        value: DeliveryItem[K]
    ) => {

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

    const totalWeight = (form?.items || []).reduce((sum: number, item: any) => {
        const qty = Number(item.quantity || 0)
        const cartQty = Number(item.cart_qty || 0)
        const cartWeight = Number(item.cart_weight || 0)

        return sum + qty + (cartQty * cartWeight)
    }, 0)

    const cartUnit = form.items[0]?.unit?.unit_code || '-'

    const submitForm = (e: React.FormEvent) => {

        e.preventDefault()
        console.log(form) // cek ini

        const payload = new FormData();

        (Object.keys(form) as (keyof DeliveryForm)[]).forEach((key) => {

            if (key === 'evidence') {

                //existing
                form.evidence.existing.forEach((path: string) => {
                    payload.append('existing_evidence[]', path)
                })

                //deleted
                form.evidence.deleted.forEach((path: string) => {
                    payload.append('deleted_evidence[]', path)
                })

                //new files
                form.evidence.new.forEach((file: File) => {
                    payload.append('evidence[]', file)
                })

            } else if (key === 'items') {

                form.items.forEach((item: DeliveryItem, index: number) => {
                    (Object.keys(item) as (keyof DeliveryItem)[]).forEach((key) => {
                        payload.append(`items[${index}][${key}]`, String(item[key] ?? ''))
                    })
                })

            } else {

                payload.append(key, String(form[key] ?? ''))
            }
        })

        payload.append('type', type)

        if (data) {
            payload.append('_method', 'PUT');

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
                            stafAntar={stafAntar}
                            type={type}
                            disabled={isStaffAntar}
                            setForm={setForm}
                        />

                        <DeliveryItemsSection
                            form={form}
                            setForm={setForm}
                            selectingItem={selectingItem}
                            searchItem={searchItem}
                            filteredItems={filteredItems}
                            carts={carts}
                            setSelectingItem={setSelectingItem}
                            setSearchItem={setSearchItem}
                            selectItem={selectItem}
                            updateItem={updateItem}
                            removeItem={removeItem}
                            totalAmount={totalAmount}
                            totalWeight={totalWeight}
                            cartUnit={cartUnit}
                            getNetQty={getNetQty}
                            getItemTotal={getItemTotal}
                            disabled={isStaffAntar}
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