import type { BreadcrumbItem } from '@/types';
import AppLayout from "@/layouts/app-layout";
import { Head, router, usePage } from '@inertiajs/react';
import { formatCurrency } from '@/helpers/format';
import { ArrowDownRight, ArrowUpRight, Plus, Wallet, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { PageProps as InertiaPageProps } from '@inertiajs/core'
import Form from './components/Form';
import { destroy } from '@/routes/keuangan';
import { notify } from '@/lib/notify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Keuangan - Petty Cash',
        href: '/keuangan',
    },
];

interface Transaction {
    id: number
    date: string
    amount: number
    type: "income" | "expense"
    description: string
    expense_category?: string
}

interface PageProps extends InertiaPageProps {
    pettyCashTransactions: Transaction[]
    balance: any
}

export default function Index() {
    
    const { pettyCashTransactions, balance } = usePage<PageProps>().props


    const [showModal, setShowModal] = useState(false)
    const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income')
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

    const openCreateModal = () => {
        setSelectedTransaction(null)
        setTransactionType('income')
        setShowModal(true)
    }

    const openCreateExpense = () => {
        setSelectedTransaction(null)
        setTransactionType('expense')
        setShowModal(true)
    }

    const openEdit = (transaction: Transaction) => {
        setSelectedTransaction(transaction)
        setTransactionType(transaction.type === 'income' ? 'income' : 'expense')
        setShowModal(true)
    }

    const confirmDelete = (transaction: Transaction) => {
        notify.confirmDelete({
            message: `Hapus ${transaction.type === 'income' ? 'pemasukan' : 'pengeluaran'}?`,
            onConfirm: () => performDelete(transaction),
        })
    }
    const performDelete = (transaction: Transaction) => {
        const loading = notify.loading("Menghapus keranjang...")

        router.delete(destroy(transaction.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success(`${transaction.type === 'income' ? 'pemasukan' : 'pengeluaran'} berhasil dihapus`)
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error(`Gagal menghapus ${transaction.type === 'income' ? 'pemasukan' : 'pengeluaran'}`)
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Keuangan - Petty Cash'/>

            <div className="p-4 sm:p-6 flex flex-col gap-6">

                <div className="rounded-2xl bg-linear-to-r from-green-700/80 via-green-800 to-orange-500 p-6 flex flex-col gap-4">
                    <div>
                        <p className="text-primary-foreground/70 text-md font-medium">
                            Saldo Kas Kecil
                        </p>
                        <h1 className="text-4xl font-black text-primary-foreground">
                            {formatCurrency(balance)}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2">
                    <button
                        onClick={openCreateModal}
                        className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-primary text-primary-foreground"
                    >
                        <Plus className="size-4" />
                        Tambah Modal
                    </button>

                    <button
                        onClick={openCreateExpense}
                        className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-orange-500 text-primary-foreground hover:bg-orange-500/80"
                    >
                        <Wallet className="size-4" />
                        Catat Pengeluaran
                    </button>
                </div>

                <div className="p-6 rounded-xl border flex flex-col gap-4">
                    <h3 className="font-bold text-lg">
                        Riwayat Transaksi
                    </h3>

                    <div className="grid grid-cols-1 gap-2 max-h-100 overflow-y-auto">

                        {pettyCashTransactions.map((pettyCashTransaction) => (

                            <div
                                key={pettyCashTransaction.id}
                                className="flex items-start sm:items-center gap-3 p-3 rounded-lg border hover:bg-muted/40 transition"
                            >

                                <div className={`rounded-lg p-2 w-10 h-10 flex items-center justify-center ${pettyCashTransaction.type === 'income'
                                        ? 'bg-primary/10 text-primary'
                                        : 'bg-red-500/10 text-red-500'
                                    }`}>

                                    {pettyCashTransaction.type === 'income'
                                        ? <ArrowDownRight className='size-6'/>
                                        : <ArrowUpRight className='size-6'/>
                                    }

                                </div>

                                <div className="flex justify-between w-full items-center">

                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold">
                                            {pettyCashTransaction.description}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {pettyCashTransaction.date}
                                            {pettyCashTransaction.expense_category && (
                                                <> • {pettyCashTransaction.expense_category}</>
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">

                                        <span className={`text-lg font-bold ${pettyCashTransaction.type === 'income'
                                                ? 'text-primary'
                                                : 'text-red-500'
                                            }`}>

                                            {pettyCashTransaction.type === 'income'
                                                ? '+' + formatCurrency(pettyCashTransaction.amount)
                                                : formatCurrency(pettyCashTransaction.amount)
                                            }

                                        </span>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => openEdit(pettyCashTransaction)}
                                                className="p-2 hover:bg-muted rounded-lg"
                                            >
                                                <Pencil className="size-4"/>
                                            </button>

                                            <button
                                                onClick={() => confirmDelete(pettyCashTransaction)}
                                                className="p-2 hover:bg-muted rounded-lg"
                                            >
                                                <Trash2 className="size-4"/>
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

            {showModal && (
                <Form
                    pettyCashTransaction={selectedTransaction}
                    transactionType={transactionType}
                    onClose={() => setShowModal(false)}
                />
            )}

        </AppLayout>
    )
}