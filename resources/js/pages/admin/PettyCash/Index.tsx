import type { BreadcrumbItem } from '@/types';
import AppLayout from "@/layouts/app-layout";
import { Head, usePage } from '@inertiajs/react';
import { formatCurrency } from '@/helpers/format';
import { ArrowDownRight, ArrowUpRight, Plus, Wallet } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Keuangan - Petty Cash',
        href: '/keuangan',
    },
];

interface ExpenseCategory {
    id: number
    name: string
    status: string
}

interface Transaction {
    id: number
    date: string
    amount: number
    type: "income" | "expense"
    description: string
    expenseCategory?: ExpenseCategory
}

export default function Index() {
    const { trans } = usePage<{ categories: Transaction[] }>().props;

    const categories: ExpenseCategory[] = [
        { id: 1, name: "Operasional", status: "active" },
        { id: 2, name: "Utilitas", status: "active" },
        { id: 3, name: "Transportasi", status: "active" },
        { id: 4, name: "Gaji", status: "active" },
        { id: 5, name: "Lainnya", status: "active" },
    ]

    const transactions: Transaction[] = [
        {
            id: 1,
            date: "2026-02-01",
            amount: 10000000,
            type: "income",
            description: "Tambah modal awal"
        },
        {
            id: 2,
            date: "2026-02-02",
            amount: 250000,
            type: "expense",
            description: "Beli kantong plastik",
            expenseCategory: categories[0]
        },
        {
            id: 3,
            date: "2026-02-03",
            amount: 500000,
            type: "expense",
            description: "Bayar listrik",
            expenseCategory: categories[1]
        },
        {
            id: 4,
            date: "2026-02-04",
            amount: 150000,
            type: "expense",
            description: "Ongkos kirim barang",
            expenseCategory: categories[2]
        },
        {
            id: 5,
            date: "2026-02-05",
            amount: 2000000,
            type: "expense",
            description: "Gaji karyawan harian",
            expenseCategory: categories[3]
        },
        {
            id: 6,
            date: "2026-02-06",
            amount: 3000000,
            type: "income",
            description: "Tambah modal mingguan"
        },
        {
            id: 7,
            date: "2026-02-07",
            amount: 120000,
            type: "expense",
            description: "Beli alat kebersihan",
            expenseCategory: categories[0]
        },
        {
            id: 8,
            date: "2026-02-08",
            amount: 75000,
            type: "expense",
            description: "Parkir dan bensin",
            expenseCategory: categories[2]
        }
    ]

    const [createModal, setCreateModal] = useState(false)
    const [createExpense, setCreateExpense] = useState(false)

    const [editTrans, setEditTrans] = useState<Transaction | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Keuangan - Petty Cash'/>
            <div className="p-4 flex flex-col gap-6">
                <div className="rounded-2xl bg-linear-to-r from-green-700/80 via-green-800 to-orange-500 p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-primary-foreground/70 text-md font-medium">
                            Saldo Kas Kecil
                        </p>
                        <h1 className="text-4xl font-black text-primary-foreground">
                            {formatCurrency(5000000)}
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col gap-1 bg-primary-foreground/10 p-3 rounded-lg">
                            <p className='text-sm text-primary-foreground/70 font-medium'>Total Modal Masuk</p>
                            <p className='text-2xl text-primary-foreground font-black'>{formatCurrency(12000000)}</p>
                        </div>
                        <div className="flex flex-col gap-1 bg-primary-foreground/10 p-3 rounded-lg">
                            <p className='text-sm text-primary-foreground/70 font-medium'>Total Modal Masuk</p>
                            <p className='text-2xl text-primary-foreground font-black'>{formatCurrency(1000000)}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2">
                    <button
                        type="button"
                        // onClick={() => setActiveTab('barang')}
                        className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors bg-primary text-primary-foreground"
                    >
                        <Plus className="size-4" />
                        Tambah Modal
                    </button>
                    <button
                        type="button"
                        // onClick={() => setActiveTab('pengeluaran')}
                        className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors bg-orange-500 text-primary-foreground hover:bg-orange-500/80"
                    >
                        <Wallet className="size-4" />
                        Catat Pengeluaran
                    </button>
                </div>

                <div className="p-6 rounded-xl border flex flex-col gap-4">
                    <h3 className="font-bold text-lg">
                        Riwayat Transaksi
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {
                            transactions.map((transaction) => (
                                transactionCard({ transaction })
                            ))
                        }
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

function transactionCard({transaction} : any) {
    return (
        <div key={transaction.id} className="flex justify-between items-center p-3 rounded-lg border">
            <div className="flex gap-2 items-start">
                <div className={`rounded-lg p-2 w-12 h-12 flex items-center justify-center ${transaction.type === 'income' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
                    {
                        transaction.type === 'income' ?
                        (
                            <ArrowDownRight className='size-6'/>
                        ):(
                            <ArrowUpRight className='size-6'/>
                        )
                    }
                </div>
                <div className="flex flex-col gap-0">
                    <p className="text-md font-bold">
                        {transaction.description}
                    </p>
                    <p className="text-sm font-light text-muted-foreground">
                        {transaction.date}
                    </p>
                </div>
            </div>
            <span className={`
                    text-lg font-bold
                    ${transaction.type  === 'income' ? 'text-primary' : 'text-red-500'}
                `}>
                {
                    transaction.type === 'income' ?
                    (
                        '+' + formatCurrency(transaction.amount)
                    ):(
                        formatCurrency(transaction.amount)
                    )
                }
            </span>
        </div>
    )
}