import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput, FormSelect } from "@/components/admin";
import { router } from "@inertiajs/react";
import { store, update } from "@/routes/master/items";
import { useState } from "react";
import { notify } from "@/lib/notify";

export default function ItemForm({
    item,
    category,
    categories,
    warehouses,
    onClose,
}: any) {

    const emojis = ['🥭','🍎','🍉','🍌','🍊','🍇','🍍','🍓','🥝','🥑'];

    const emptyForm = {
        icon: '',
        name: '',
        category_id: String(category.id),
        unit: 'kg',
        warehouse_id: '',
        purchase_price: '',
        selling_price: '',
        stock: '',
        min_stock: '',
        bad_stock: 0,
    };

    const [form, setForm] = useState(
        item ? {
            icon: item.icon || '',
            name: item.name,
            category_id: String(item.category?.id || ''),
            unit: item.unit,
            warehouse_id: String(item.warehouse?.id || ''),
            purchase_price: String(item.purchase_price ?? ''),
            selling_price: String(item.selling_price ?? ''),
            stock: String(item.stock ?? ''),
            min_stock: String(item.min_stock ?? ''),
            bad_stock: item.bad_stock ?? 0,
        } : emptyForm
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...form,
            purchase_price: Number(form.purchase_price),
            selling_price: Number(form.selling_price),
            stock: Number(form.stock),
            min_stock: Number(form.min_stock),
            bad_stock: Number(form.bad_stock),
        };

        if (item) {
            router.put(update(item.id), payload, {
                onSuccess: () => {
                    notify.success(`${form.name} berhasil diperbarui`)
                    onClose()
                },
                onError: () => {
                    notify.error(`Gagal memperbarui ${form.name}`)
                },
            })
        } else {
            router.post(store(), payload, {
                onSuccess: () => {
                    notify.success(`${form.name} berhasil ditambahkan`)
                    onClose()
                },
                onError: () => {
                    notify.error(`Gagal menambahkan ${form.name}`)
                },
            })
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs"
            onClick={onClose}
        >
            <div
                className="bg-background rounded-lg py-6 w-full max-w-4xl shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between border-b pb-2 px-6 mb-2">
                    <h2 className="text-lg font-semibold">
                        {item ? `Edit ${item.name}` : "Tambah Barang"}
                    </h2>
                    <X className="h-5 w-5 cursor-pointer" onClick={onClose} />
                </div>

                <form onSubmit={submitForm} className="space-y-4 px-6">

                    {/* EMOJI */}
                    <div>
                        <label className="text-sm font-medium">Emoji</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {emojis.map((emo) => (
                                <button
                                    key={emo}
                                    type="button"
                                    onClick={() => setForm({...form, icon: emo})}
                                    className={`w-12 h-12 text-xl rounded-xl ${
                                        form.icon === emo
                                            ? "bg-primary/20 border border-primary"
                                            : "bg-muted"
                                    }`}
                                >
                                    {emo}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FORM GRID */}
                    <div className="grid grid-cols-2 gap-4">

                        <FormInput
                            label="Nama Barang"
                            value={form.name}
                            onChange={(e)=>setForm({...form,name:e.target.value})}
                            required
                        />

                        <FormSelect
                            label="Kategori"
                            value={form.category_id}
                            onChange={(e)=>setForm({...form,category_id:e.target.value})}
                            options={categories.map((c:any)=>({
                                value:String(c.id),
                                label:c.name
                            }))}
                        />

                        <FormSelect
                            label="Gudang"
                            value={form.warehouse_id}
                            onChange={(e)=>setForm({...form,warehouse_id:e.target.value})}
                            options={warehouses.map((w:any)=>({
                                value:String(w.id),
                                label:w.name
                            }))}
                        />

                    </div>

                    <div className="grid grid-cols-3 gap-4">

                        <FormInput
                            label="Harga Beli"
                            type="number"
                            value={form.purchase_price}
                            onChange={(e)=>setForm({...form,purchase_price:e.target.value})}
                        />

                        <FormInput
                            label="Harga Jual"
                            type="number"
                            value={form.selling_price}
                            onChange={(e)=>setForm({...form,selling_price:e.target.value})}
                        />

                        <FormInput
                            label="Stok"
                            type="number"
                            value={form.stock}
                            onChange={(e)=>setForm({...form,stock:e.target.value})}
                        />

                        <FormInput
                            label="Min Stok"
                            type="number"
                            value={form.min_stock}
                            onChange={(e)=>setForm({...form,min_stock:e.target.value})}
                        />

                        <FormInput
                            label="Bad Stok"
                            type="number"
                            value={form.bad_stock}
                            onChange={(e)=>setForm({...form,bad_stock:e.target.value})}
                        />

                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" type="button" onClick={onClose} className="cursor-pointer">
                            Batal
                        </Button>
                        <Button type="submit" className="cursor-pointer">
                            Simpan
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    );
}