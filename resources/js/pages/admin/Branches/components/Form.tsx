import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { useState } from "react";
import { FormInput, FormTextarea } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";
import { store, update } from "@/routes/master/branches";

export default function Form({
    branch,
    onClose,
}: any) {

    const emptyForm = {
        name: '',
        contact: '',
        address: ''
    };

    const [form, setForm] = useState(
        branch
            ? {
                  name: branch.name ?? '',
                  contact: branch.contact ?? '',
                  address: branch.address ?? ''
              }
            : emptyForm
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: form.name,
            contact: form.contact,
            address: form.address,
        };

        if (branch) {
            router.put(update(branch.id), payload, {
                onSuccess: () => {
                    notify.success(`${form.name} berhasil diperbarui`);
                    onClose();
                },
                onError: (errors: Record<string, string>) => {
                    notify.error(Object.values(errors).join('\n'));
                },
            });
        } else {
            router.post(store(), payload, {
                onSuccess: () => {
                    notify.success(`${form.name} berhasil ditambahkan`);
                    onClose();
                },
                onError: (errors: Record<string, string>) => {
                    notify.error(Object.values(errors).join('\n'));
                },
            });
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs animate__animated animate__fadeIn p-1"
            onClick={onClose}
        >
            <div
                className="bg-background rounded-lg py-6 w-full max-w-2xl shadow-lg animate__animated animate__zoomIn"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center border-b border-sidebar-border pb-2 px-6 mb-4">
                    <h2 className="text-lg font-semibold">
                        {branch ? `Edit ${branch.name}` : "Tambah Unit"}
                    </h2>
                    <X className="h-5 w-5 cursor-pointer" onClick={onClose} />
                </div>

                <form onSubmit={submitForm} className="space-y-4 px-6">

                    <FormInput
                        label="Nama"
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        required
                    />
                    
                    <FormInput
                        label="Kontak"
                        value={form.contact}
                        onChange={(e) =>
                            setForm({ ...form, contact: e.target.value })
                        }
                        required
                    />

                    <FormTextarea
                        label="Alamat"
                        value={form.address}
                        onChange={(e) =>
                            setForm({ ...form, address: e.target.value })
                        }
                        required
                    />


                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-sidebar-border">
                        <Button
                            variant="secondary"
                            type="button"
                            className="cursor-pointer"
                            onClick={onClose}
                        >
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
