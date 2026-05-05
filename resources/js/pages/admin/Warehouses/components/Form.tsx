import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { useState } from "react";
import {
    FormInput,
    FormTextarea,
    FormSwitch,
    FormSelect,
} from "@/components/admin";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";
import { store, update } from "@/routes/master/warehouses";

export default function Form({
    warehouse,
    onClose,
    users,
    branches,
}: any) {

    const emptyForm = {
        name: '',
        address: '',
        user_id: '',
        branch_id: '',
        status: 'active',
    };

    const [form, setForm] = useState(
        warehouse ? {
            name: warehouse.name,
            address: warehouse.address || '',
            user_id: String(warehouse.user_id ?? ''),
            branch_id: String(warehouse.branch?.id ?? ''),
            status: warehouse.status,
        } : emptyForm
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: form.name,
            address: form.address,
            user_id: form.user_id || null,
            branch_id: form.branch_id || null,
            status: form.status,
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
                    <FormSelect
                        label="PIC Gudang"
                        value={form.user_id}
                        onChange={(e) =>
                            setForm({ ...form, user_id: e.target.value })
                        }
                        options={[
                            { value: '', label: 'Pilih PIC' },
                            ...users.map((u: any) => ({
                                value: String(u.id),
                                label: u.name,
                            })),
                        ]}
                    />
                    <FormSelect
                        label="Cabang"
                        value={form.branch_id}
                        onChange={(e) =>
                            setForm({ ...form, branch_id: e.target.value })
                        }
                        options={[
                            { value: '', label: 'Pilih Cabang' },
                            ...branches.map((b: any) => ({
                                value: String(b.id),
                                label: b.name,
                            })),
                        ]}
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

