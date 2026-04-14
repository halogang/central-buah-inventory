import { router } from "@inertiajs/react";
import { X } from "lucide-react";
import { useState } from "react";
import { FormImageUpload, FormInput, FormSelect } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { notify } from "@/lib/notify";
import { store, update } from "@/routes/keuangan";
import { formatCurrency } from "@/helpers/format";

interface Category {
    id: number
    name: string
}

interface Props {
    pettyCashTransaction?: any
    transactionType: 'income' | 'expense'
    categories?: Category[]
    onClose: () => void
    balance?: number
}

export default function Form({
    pettyCashTransaction,
    transactionType,
    categories,
    onClose,
    balance
}: Props) {


    const emptyForm = {
        evidence: null as File | null,
        date: '',
        type: transactionType,
        amount: '',
        description: '',
        expense_category: '',
    };

    const [preview, setPreview] = useState<string | undefined>(
        pettyCashTransaction?.evidence ? pettyCashTransaction.evidence : undefined
    )

    const [amountError, setAmountError] = useState<string | null>(null);

    const [form, setForm] = useState(
        pettyCashTransaction ? {
            evidence: null as File | null,
            date: pettyCashTransaction.date,
            type: transactionType,
            amount: pettyCashTransaction.amount,
            description: pettyCashTransaction.description,
            expense_category: pettyCashTransaction.expense_category,
        } : emptyForm
    );

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();

        if (amountError) {
            notify.error('Periksa jumlah terlebih dahulu');
            return;
        }

        const payload = new FormData();

        payload.append('date', form.date);
        payload.append('amount', String(form.amount));
        payload.append('type', transactionType);
        payload.append('description', String(form.description));
        payload.append('expense_category', String(form.expense_category));

        if (form.evidence) {
            payload.append('evidence', form.evidence);
        }

        if (pettyCashTransaction) {
            payload.append('_method', 'PUT');

            router.post(update(pettyCashTransaction.id), payload, {
                forceFormData: true,
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
                forceFormData: true,
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
                        {pettyCashTransaction ? `Edit ${pettyCashTransaction.description}` : (transactionType === 'income' ? 'Tambah Modal' : 'Catat Pengeluaran')}
                    </h2>
                    <X className="h-5 w-5 cursor-pointer" onClick={onClose} />
                </div>
                <form onSubmit={submitForm} className="space-y-4 px-6">
                    {
                        transactionType === 'expense' && (
                            <div className="bg-primary/10 border border-primary text-primary rounded-lg px-4 py-2">
                                <p className="font-regular text-xs">Saldo Tersedia:</p>
                                <p className="font-bold text-lg">{formatCurrency(balance)}</p>
                            </div>
                        )
                    }

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
                        min={0}
                        onChange={(e) => {
                            const value = e.target.value;
                            const numericValue = Number(value);

                            setForm({ ...form, amount: numericValue });
                            
                            if (transactionType === 'expense' && balance !== undefined) {
                                if (numericValue > balance) {
                                    setAmountError('Jumlah tidak boleh melebihi saldo tersedia');
                                } else if (numericValue <= 0) {
                                    setAmountError('Jumlah harus lebih dari 0');
                                } else {
                                    setAmountError(null);
                                }
                            } else {
                                setAmountError(null);
                            }
                        }}
                        required
                        placeholder="0"
                    />
                    {amountError && (
                        <p className="text-xs text-destructive -mt-2">{amountError}</p>
                    )}
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
                                    ...(categories || []).map((s: Category) => ({
                                        label: s.name,
                                        value: s.name
                                    })),
                                    {
                                        label: 'Lainnya',
                                        value: 'Lainnya',
                                    }
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

                    <FormImageUpload 
                        label="Bukti Transaksi"
                        preview={preview}
                        onChange={(file) => {
                            setForm({ ...form, evidence: file });

                            if (file) {
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                        hint="maksimal 2MB"
                    />

                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-sidebar-border">
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={onClose}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={amountError !== null || (transactionType === 'expense' && balance !== undefined && form.amount > balance)}>
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

