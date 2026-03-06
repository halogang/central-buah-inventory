import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { useState } from "react";
import { FormInput } from "@/components/admin";
import FormTextarea from "@/components/admin/FormTextarea";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";
import { store, update } from "@/routes/master/categories";

export default function Form({
    category,
    activeTab,
    onClose,
}: any) {

    const emojis = ['🥭','🍎','🍉','🍌','🍊','🍇','🍍','🍓','🥝','🥑'];
    const types = ['barang', 'pengeluaran']

    const emptyForm = {
        name: '',
        description: '',
        type: activeTab,
        icon: '',
    };

    const [form, setForm] = useState(
        category ? {
            name: category.name,
            description: category.description,
            type: category.type,
            icon: category.icon,
        } : emptyForm
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...form,
            icon: form.icon,
            type: form.type,
        };

        if (category) {
            router.put(update(category.id), payload, {
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
                        {category ? `Edit ${category.name}` : 'Tambah Kategori'}
                    </h2>
                    <X className="h-5 w-5 cursor-pointer" onClick={onClose} />
                </div>
                <form onSubmit={submitForm} className="space-y-4 px-6">
                    <FormInput
                        label="Nama Kategori"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        placeholder="Nama gudang..."
                    />
                    <FormTextarea
                        label="Deskripsi"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Deskripsi kategori..."
                    />  
                    <div>
                        <label className="text-sm font-medium">Tipe</label>

                        <div className="flex gap-3 mt-2">
                            {types.map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setForm({ ...form, type })}
                                    className={`
                                        flex-1 py-3 rounded-xl font-semibold transition cursor-pointer
                                        ${
                                            form.type === type
                                                ? "bg-green-600 text-white"
                                                : "bg-muted text-muted-foreground hover:bg-muted/70"
                                        }
                                    `}
                                >
                                    {type === "barang" ? "Barang" : "Pengeluaran"}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* EMOJI */}
                    <div>
                        <label className="text-sm font-medium">Emoji</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {emojis.map((emo) => (
                                <button
                                    key={emo}
                                    type="button"
                                    onClick={() => setForm({...form, icon: emo})}
                                    className={`w-12 h-12 text-xl rounded-xl cursor-pointer ${
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

                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-sidebar-border">
                        <Button
                            variant="secondary"
                            type="button" className="cursor-pointer"
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
    )
}

