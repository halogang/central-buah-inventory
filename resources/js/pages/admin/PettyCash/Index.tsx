import type { PageProps as InertiaPageProps } from '@inertiajs/core'
import { Head, router, usePage } from '@inertiajs/react';
import { ArrowDownRight, ArrowUpRight, Plus, Wallet, Pencil, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import Pagination from '@/components/Pagination';
import { SearchInput } from '@/components/search-input';
import { FilterBar } from '@/components/report/FilterBar';
import { formatCurrency } from '@/helpers/format';
import { usePagination } from '@/hooks/use-pagination';
import AppLayout from "@/layouts/app-layout";
import { notify } from '@/lib/notify';
import { destroy } from '@/routes/keuangan';
import type { BreadcrumbItem } from '@/types';
import Form from './components/Form';
import { useCan } from '@/utils/permissions';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Keuangan - Petty Cash',
        href: '/keuangan',
    },
];

interface Transaction {
    id: number
    date: string
    evidence: string
    amount: number
    type: "income" | "expense"
    description: string
    expense_category?: string
}

interface Category {
    id: number
    name: string
}

interface PageProps extends InertiaPageProps {
    pettyCashTransactions: Transaction[]
    categories: Category[]
    // balance: any
    isAdmin: boolean
}

export default function Index() {
    const can = useCan();
    
    const { pettyCashTransactions, categories, isAdmin } = usePage<PageProps>().props

    const [showModal, setShowModal] = useState(false)
    const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income')
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

    const [search, setSearch] = useState('')
    const [month, setMonth] = useState<number>(-1)
    const [year, setYear] = useState<number>(0)

    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")

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
        setTransactionType(transaction.type)
        setShowModal(true)
    }

    const confirmDelete = (transaction: Transaction) => {
        notify.confirmDelete({
            message: `Hapus ${transaction.type === 'income' ? 'pemasukan' : 'pengeluaran'}?`,
            onConfirm: () => performDelete(transaction),
        })
    }

    const performDelete = (transaction: Transaction) => {
        const loading = notify.loading("Menghapus transaksi...")

        router.delete(destroy(transaction.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success("Berhasil dihapus")
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error("Gagal menghapus")
            },
        })
    }

    // 🔥 FILTER
    const matchesMonthYear = (dateString: string, selectedMonth: number, selectedYear: number) => {
        const date = new Date(dateString)
        const dateMonth = date.getMonth()
        const dateYear = date.getFullYear()
        
        const monthMatch = selectedMonth === -1 || dateMonth === selectedMonth
        const yearMatch = selectedYear === 0 || dateYear === selectedYear
        
        return monthMatch && yearMatch
    }

    const filtered = pettyCashTransactions.filter((t) => {
        const matchesSearch = t.description
            .toLowerCase()
            .includes(search.toLowerCase())

        const transactionDate = new Date(t.date)

        const matchesFrom = dateFrom
            ? transactionDate >= new Date(dateFrom)
            : true

        const matchesTo = dateTo
            ? transactionDate <= new Date(dateTo)
            : true

        const matchesMonthYearFilter = matchesMonthYear(t.date, month, year)

        return matchesSearch && matchesFrom && matchesTo && matchesMonthYearFilter
    })

    // 🔥 SUMMARY DINAMIS
    const totalIncome = filtered
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0)

    const totalExpense = filtered
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0)

    const balance = totalIncome - totalExpense

    // 🔥 PAGINATION
    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filtered, 4)

    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const openPreview = (image: string) => {
        setPreviewImage(image)
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Keuangan - Petty Cash'>
                <meta name="robots" content="noindex" />
            </Head>

            <div className="p-4 sm:p-6 flex flex-col gap-6">
                {/* FILTER BAR */}
                <FilterBar
                    month={month}
                    year={year}
                    onMonthChange={setMonth}
                    onYearChange={setYear}
                />

                {/* SUMMARY */}
                <div className="rounded-2xl bg-linear-to-r from-green-700 via-green-800 to-orange-500 p-6 flex flex-col gap-4 text-white">

                    <div className="flex justify-between items-start gap-4">

                        <div>
                            <p className="text-white/70 text-sm">
                                Saldo Kas Kecil
                            </p>
                            <h1 className="text-2xl sm:text-4xl font-black">
                                {formatCurrency(balance)}
                            </h1>
                        </div>

                    </div>

                    <div className="flex gap-2">
                        <div className="flex flex-col w-full bg-white/20 rounded-lg p-2">
                            <p className="text-white/70 text-xs">
                                Total Pemasukan
                            </p>
                            <span className="text-lg font-bold">
                                {formatCurrency(totalIncome)}
                            </span>
                        </div>
                        <div className="flex flex-col w-full bg-white/20 rounded-lg p-2">
                            <p className="text-white/70 text-xs">
                                Total Pengeluaran
                            </p>
                            <span className="text-lg font-bold">
                                {formatCurrency(totalExpense)}
                            </span>
                        </div>
                    </div>

                </div>

                {/* ACTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {can('finance.create.income') && (
                        <button
                            onClick={openCreateModal}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-primary text-white"
                        >
                            <Plus className="size-4" />
                            Tambah Modal
                        </button>
                    )}

                    {can('finance.create.expense') && balance != 0 && (
                        <button
                            onClick={openCreateExpense}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium bg-orange-500 text-white"
                        >
                            <Wallet className="size-4" />
                            Catat Pengeluaran
                        </button>
                    )}
                </div>

                {/* LIST */}
                <div className="p-4 sm:p-6 rounded-xl border flex flex-col gap-4">

                    <h3 className="font-bold text-lg">
                        Riwayat Transaksi
                    </h3>

                    <div className="flex flex-col gap-3">

                        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">

                            <SearchInput
                                placeholder="Cari transaksi..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                    </div>

                    <div className="flex flex-col gap-2 max-h-100 overflow-y-auto pr-2">

                        {paginatedData.length === 0 && (
                            <div className="text-center text-muted-foreground py-6">
                                Tidak ada transaksi
                            </div>
                        )}

                        {paginatedData.map((t) => (

                            <div
                                key={t.id}
                                className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between p-3 rounded-lg border hover:bg-muted/40 transition"
                            >

                                {/* LEFT */}
                                <div className="flex gap-3 items-start">

                                    <div className={`rounded-lg p-2 w-10 h-10 flex items-center justify-center ${
                                        t.type === 'income'
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-red-500/10 text-red-500'
                                    }`}>
                                        {t.type === 'income'
                                            ? <ArrowDownRight className='size-5'/>
                                            : <ArrowUpRight className='size-5'/>
                                        }
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold">
                                            {t.description}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {t.date}
                                            {t.expense_category && (
                                                <> • {t.expense_category}</>
                                            )}
                                        </p>
                                    </div>

                                    {t.evidence && (
                                        <button
                                            onClick={() => openPreview(t.evidence)}
                                            className="cursor-pointer px-2 bg-blue-500/10 text-blue-500 border font-medium hover:bg-blue-500/0 hover:border-blue-500 rounded-md"
                                        >
                                            <span className='text-xs'>Lihat Bukti Transaksi</span>
                                        </button>
                                    )}

                                </div>

                                {/* RIGHT */}
                                <div className="flex justify-between sm:justify-end items-center gap-3">

                                    <span className={`text-sm sm:text-lg font-bold ${
                                        t.type === 'income'
                                            ? 'text-primary'
                                            : 'text-red-500'
                                    }`}>
                                        {t.type === 'income'
                                            ? '+' + formatCurrency(t.amount)
                                            : formatCurrency(t.amount)
                                        }
                                    </span>

                                    <div className="flex gap-2 items-center">
                                        {can('finance.update') && (
                                            <button onClick={() => openEdit(t)}>
                                                <Pencil className="size-4"/>
                                            </button>
                                        )}
                                        {can('finance.delete') && (
                                            <button onClick={() => confirmDelete(t)}>
                                                <Trash2 className="size-4 text-red-500"/>
                                            </button>
                                        )}
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={goTo}
                    />

                </div>

            </div>

            {previewImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                    onClick={() => setPreviewImage(null)}
                >
                    <div
                        className="bg-white rounded-lg p-4 max-w-lg w-full flex flex-col gap-1 items-end"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewImage(null)}
                            className="cursor-pointer text-gray-500 hover:text-black"
                        >
                            <X />
                        </button>

                        <img
                            src={previewImage}
                            alt="Bukti Transaksi"
                            className="w-full h-auto rounded"
                        />
                    </div>
                </div>
            )}

            {showModal && (
                <Form
                    pettyCashTransaction={selectedTransaction}
                    transactionType={transactionType}
                    categories={categories}
                    balance={balance}
                    onClose={() => setShowModal(false)}
                />
            )}

        </AppLayout>
    )
}