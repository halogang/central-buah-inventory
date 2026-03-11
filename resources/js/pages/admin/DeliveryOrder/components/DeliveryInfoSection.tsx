import { Truck } from "lucide-react"
import FormSelect from "@/components/admin/FormSelect"
import { FormInput } from "@/components/admin"

export default function DeliveryInfoSection({
    form,
    suppliers,
    customers,
    type,
    setForm
}: any) {

    return (

        <div className="p-4 border rounded-lg flex flex-col gap-2">

            <div className="flex gap-2 items-center mb-2">
                <Truck className="size-5 text-primary"/>
                <span className="font-bold text-sm">Info Pengiriman</span>
            </div>

            <FormInput
                label="Tanggal"
                type="date"
                value={form.date}
                onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                }
                required
            />

            {type === 'in' ?
                <FormSelect
                    label="Supplier"
                    value={form.supplier_id}
                    onChange={(e) =>
                        setForm({ ...form, supplier_id: e.target.value })
                    }
                    options={[
                        {
                            label: 'Pilih Supplier',
                            value: '',
                            disabled: true
                        },
                        ...suppliers.map((s: any) => ({
                            label: s.name,
                            value: s.id
                        }))
                    ]}
                    required
                />
                :
                <FormSelect
                    label="Pelangggan"
                    value={form.customer_id}
                    onChange={(e) =>
                        setForm({ ...form, customer_id: e.target.value })
                    }
                    options={
                        [{
                            label: 'Pilih Pelanggan',
                            value: '',
                            disabled: true
                        },
                        ...customers.map((s: any) => ({
                            label: s.name,
                            value: s.id
                        }))]
                    }
                    required
                />
            }

            <FormSelect
                label="Status"
                value={form.status}
                onChange={(e) =>
                    setForm({ ...form, status: e.target.value })
                }
                options={[
                    { label: "Draft", value: "draft" },
                    { label: "Dikirim", value: "sent" },
                    { label: "Selesai", value: "done" }
                ]}
                required
            />

        </div>

    )
}