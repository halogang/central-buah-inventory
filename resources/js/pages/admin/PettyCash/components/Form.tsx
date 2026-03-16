import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { useState } from "react";
import { FormInput, FormSelect } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";
import { store, update } from "@/routes/keuangan";

interface Props {
    pettyCash?: any
    transactionType: 'income' | 'expense'
    onClose: () => void
}

export default function Form({
    pettyCash,
    transactionType,
    onClose,
}: Props) {

    const categories = [
        {
            name: 'Operasional'
        },
        {
            name: 'Utilitas'
        },
        {
            name: 'Transportasi'
        },
        {
            name: 'Gaji'
        },
        {
            name: 'Lainnya'
        },
    ]

    const emptyForm = {
        date: '',
        amount: '',
        description: '',
        expense_category: '',
    };

    const [form, setForm] = useState(
        pettyCash ? {
            date: pettyCash.date,
            amount: pettyCash.amount,
            description: pettyCash.description,
            expense_category: pettyCash.expense_category,
        } : emptyForm
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...form,
            type: transactionType,
            amount: Number(form.amount),
        };

        if (pettyCash) {
            router.put(update(pettyCash.id), payload, {
                onSuccess: () => {
                    notify.success(`${form.description} berhasil diperbarui`)
                    onClose()
                },
                onError: (errors) => {
                    notify.error(Object.values(errors).join('\n'))
                }
            })
        } else {
            router.post(store(), payload, {
                onSuccess: () => {
                    notify.success(`${form.description} berhasil ditambahkan`)
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
                        {pettyCash ? `Edit ${pettyCash.description}` : (transactionType === 'income' ? 'Tambah Modal' : 'Catat Pengeluaran')}
                    </h2>
                    <X className="h-5 w-5 cursor-pointer" onClick={onClose} />
                </div>
                <form onSubmit={submitForm} className="space-y-4 px-6">
                    <FormInput
                        label="Tanggal"
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                        }
                        required
                    />
                    <FormInput
                        label="Jumlah"
                        type="number"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        required
                        placeholder="0"
                    />
                    {
                        transactionType === 'expense' && (
                            <FormSelect
                                label="Kategori"
                                value={form.expense_category}
                                onChange={(e) =>
                                    setForm({ ...form, expense_category: e.target.value })
                                }
                                options={[
                                    {
                                        label: 'Pilih Kategori',
                                        value: '',
                                    },
                                    ...categories.map((s: any) => ({
                                        label: s.name,
                                        value: s.name
                                    }))
                                ]}
                                required
                            />
                        )
                    }
                    <FormInput
                        required
                        label="Deskripsi"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder={`Contoh: ${transactionType === 'income' ? 'Tambah Modal Harian' : 'Beli kantong plastik'}`}
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

