import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { useState } from "react";
import { FormInput, FormTextarea } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";
import { store, update } from "@/routes/master/carts";

export default function Form({
    cart,
    onClose,
}: any) {

    const emptyForm = {
        name: '',
        cart_code: '',
        note: ''
    };

    const [form, setForm] = useState(
        cart
            ? {
                  name: cart.name ?? '',
                  cart_code: cart.cart_code ?? '',
                  note: cart.note ?? ''
              }
            : emptyForm
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            name: form.name,
            cart_code: form.cart_code,
            note: form.note,
        };

        if (cart) {
            router.put(update(cart.id), payload, {
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
                        {cart ? `Edit ${cart.name}` : "Tambah Unit"}
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
                        label="Kode Keranjang"
                        value={form.cart_code}
                        onChange={(e) =>
                            setForm({ ...form, cart_code: e.target.value })
                        }
                    />

                    <FormTextarea
                        label="Keterangan"
                        value={form.note}
                        onChange={(e) =>
                            setForm({ ...form, note: e.target.value })
                        }
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
