import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { useState } from "react";
import { FormInput } from "@/components/admin";
import FormTextarea from "@/components/admin/FormTextarea";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";
import { store, update } from "@/routes/master/units";

export default function Form({
    unit,
    onClose,
}: any) {

    const emptyForm = {
        unit_code: '',
        description: '',
    };

    const [form, setForm] = useState(
        unit
            ? {
                  unit_code: unit.unit_code ?? '',
                  description: unit.description ?? '',
              }
            : emptyForm
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            unit_code: form.unit_code,
            description: form.description,
        };

        if (unit) {
            router.put(update(unit.id), payload, {
                onSuccess: () => {
                    notify.success(`${form.unit_code} berhasil diperbarui`);
                    onClose();
                },
                onError: (errors: Record<string, string>) => {
                    notify.error(Object.values(errors).join('\n'));
                },
            });
        } else {
            router.post(store(), payload, {
                onSuccess: () => {
                    notify.success(`${form.unit_code} berhasil ditambahkan`);
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
                        {unit ? `Edit ${unit.unit_code}` : "Tambah Unit"}
                    </h2>
                    <X className="h-5 w-5 cursor-pointer" onClick={onClose} />
                </div>

                <form onSubmit={submitForm} className="space-y-4 px-6">

                    <FormInput
                        label="Kode Unit"
                        value={form.unit_code}
                        onChange={(e) =>
                            setForm({ ...form, unit_code: e.target.value })
                        }
                        required
                        placeholder="Contoh: kg, pcs, box..."
                    />

                    <FormTextarea
                        label="Deskripsi"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        placeholder="Deskripsi unit..."
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
