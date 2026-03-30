import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { useState } from "react";
import { FormInput } from "@/components/admin";
import FormSwitch from "@/components/admin/FormSwitch";
import FormTextarea from "@/components/admin/FormTextarea";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";
import { store, update } from "@/routes/master/warehouses";

export default function Form({
    warehouse,
    onClose,
}: any) {

    const emptyForm = {
        name: '',
        address: '',
        capacity: '',
        branch: '',
        pic: '',
        status: 'active',
    };

    const [form, setForm] = useState(
        warehouse ? {
            name: warehouse.name,
            address: warehouse.address,
            branch: warehouse.branch,
            capacity: String(warehouse.capacity),
            pic: warehouse.pic,
            status: warehouse.status,
        } : emptyForm
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...form,
            capacity: Number(form.capacity),
        };

        if (warehouse) {
            router.put(update(warehouse.id), payload, {
                onSuccess: () => {
                    notify.success(`${form.name} berhasil diperbarui`)
                    onClose()
                },
                onError: (errors) => {
                    notify.error(Object.values(errors).join('\n'))
                }
            })
        } else {
            router.post(store(), payload, {
                onSuccess: () => {
                    notify.success(`${form.name} berhasil ditambahkan`)
                    onClose()
                },
                onError: (errors) => {
                    notify.error(Object.values(errors).join('\n'))
                }
            })
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate__animated animate__fadeIn p-1"
            onClick={onClose}
        >
            <div className="bg-background rounded-lg py-6 w-full max-w-2xl shadow-lg animate__animated animate__zoomIn"
                    onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b border-sidebar-border pb-2 px-6 mb-4">
                    <h2 className="text-lg font-semibold">
                        {warehouse ? `Edit ${warehouse.name}` : 'Tambah Gudang'}
                    </h2>
                    <X className="h-5 w-5 cursor-pointer" onClick={onClose} />
                </div>
                <form onSubmit={submitForm} className="space-y-4 px-6">
                    <FormInput
                        label="Nama Gudang"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        placeholder="Nama gudang..."
                    />
                    <FormTextarea
                        label="Alamat"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Alamat gudang..."
                    />
                    <FormInput
                        label="Kapasitas (unit)"
                        type="number"
                        value={form.capacity}
                        onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                        required
                        placeholder="0"
                    />
                    <FormInput
                        label="PIC (Penanggung Jawab)"
                        value={form.pic}
                        onChange={(e) => setForm({ ...form, pic: e.target.value })}
                        placeholder="Nama PIC..."
                    />
                    <FormSwitch
                        label="Aktif"
                        value={form.status}
                        onChange={(val) => setForm({ ...form, status: val })}
                    />

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

