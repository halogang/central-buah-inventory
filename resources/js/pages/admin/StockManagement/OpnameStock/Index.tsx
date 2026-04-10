import { Head, usePage, router, Link } from '@inertiajs/react'
import { ClipboardList, Eye, Plus, SquarePen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import { SearchInput } from '@/components/search-input'
import { Button } from '@/components/ui/button'
import { usePagination } from '@/hooks/use-pagination'
import AppLayout from '@/layouts/app-layout'
import { notify } from '@/lib/notify'
import { destroy, show } from '@/routes/stok/stok-opname'
import Form from './components/Form'

interface Opname {
    id:number
    opname_number:string
    date:string
    user?:User
    note?:string
    warehouse?: Warehouse
    items_count:number
}

interface User {
    id: number
    name: string
}

interface Warehouse {
    id:number
    name:string
}

interface Item {
    id:number
    name:string
    stock:number
}

function formatDate(date:string){

    return new Date(date).toLocaleDateString(
        'id-ID',
        {
            day:'2-digit',
            month:'2-digit',
            year:'numeric'
        }
    )
}

export default function StockOpnames(){

    const { opnames, warehouses, items, users, roleName, authUser } = usePage<{
        opnames:Opname[]
        warehouses:Warehouse[]
        items:Item[]
        users:User[]
        roleName: string
        authUser: string
    }>().props

    const [search,setSearch] = useState('')
    const [showForm,setShowForm] = useState(false)
    const [editItem,setEditItem] = useState<Opname | null>(null)

    const filtered = opnames.filter((o) => {
        const keyword = search.toLowerCase()

        return (
            o.opname_number.toLowerCase().includes(keyword) ||
            o.user?.name.toLowerCase().includes(keyword) ||
            o.warehouse?.name?.toLowerCase().includes(keyword)
        )
    })

    const {
        currentPage,
        totalPages,
        paginatedData,
        goTo,
    } = usePagination(filtered, 6)

    const openForm = (op?:Opname)=>{
        setEditItem(op || null)
        setShowForm(true)
    }

    const closeForm = ()=>{
        setShowForm(false)
        setEditItem(null)
    }

    const confirmDelete = (opname: Opname) => {
        notify.confirmDelete({
            message: `Hapus ${opname.opname_number}?`,
            onConfirm: () => deleteData(opname),
        })
    }

    const deleteData = (opname: Opname) => {
    
        const loading = notify.loading("Menghapus opname...")

        router.delete(destroy(opname.id), {
            onSuccess: () => {
                notify.dismiss(loading)
                notify.success(`${opname.opname_number} berhasil dihapus`)
            },
            onError: () => {
                notify.dismiss(loading)
                notify.error(`Gagal menghapus ${opname.opname_number}`)
            },
        })
    }

    return (
        <AppLayout breadcrumbs={[
            {title:'Stock Opname',href:'/inventory/stock-opnames'}
        ]}>

        <Head title="Stock Opname" >
            <meta name="robots" content="noindex" />
        </Head>

        <div className="p-4">

            <div className="flex gap-2 mb-4">

                <SearchInput
                    placeholder="Cari nomor opname..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

                <Button onClick={()=>openForm()}>
                    <Plus/>
                    Tambah
                </Button>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {paginatedData.map(op=>(
                    <div
                        key={op.id}
                        className="rounded-xl border border-sidebar-border/70 bg-background p-4 shadow-sm"
                    >

                        <div className="flex gap-3 mb-3">

                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <ClipboardList className="size-6"/>
                            </div>

                            <div>

                                <div className="font-semibold text-sm">
                                    {op.opname_number}
                                </div>

                                <div className="text-xs text-muted-foreground">
                                    {formatDate(op.date)}
                                </div>

                            </div>

                        </div>

                        <div className="text-xs text-muted-foreground mb-3">
                            Gudang : {op.warehouse?.name ?? '-'}
                        </div>

                        <div className="text-xs text-muted-foreground mb-3">
                            Dicek oleh : {op.user?.name}
                        </div>

                        <div className="text-xs text-muted-foreground">
                            Total Item : {op.items_count}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">

                            <Link href={show(op.id)}>
                                <Eye className="size-4 text-muted-foreground hover:text-primary"/>
                            </Link>
                            <button onClick={()=>openForm(op)}>
                                <SquarePen className="size-4 text-muted-foreground hover:text-primary"/>
                            </button>

                            <button onClick={()=>confirmDelete(op)}>
                                <Trash2 className="size-4 text-muted-foreground hover:text-red-600"/>
                            </button>

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

        {showForm && (
            <Form
                onClose={closeForm}
                warehouses={warehouses}
                users={users}
                items={items}
                opname={editItem}
                roleName={roleName}
                authUser={authUser}
            />
        )}

        </AppLayout>
    )
}