import {router} from "@inertiajs/react"
import {X, Plus, Trash2} from "lucide-react"
import {useState} from "react"
import {FormInput, FormTextarea} from "@/components/admin"
import {Button} from "@/components/ui/button"
import { notify } from "@/lib/notify"
import {store, update} from "@/routes/stok/stok-opname"

interface Props {
    onClose: () => void
    warehouses: any[]
    items: any[]
    opname?: any
    users?: any[]
    roleName: any
    authUser: any
}

type OpnameItem = {
    item_id: number | ''
    system_stock: number
    physical_stock: number | ''
    difference: number
}

export default function Form({onClose, warehouses, items, opname, users, roleName, authUser} : Props) {

    const [form, setForm] = useState({
        date: opname?.date.substring(0,10) || '',
        warehouse_id: opname?.warehouse_id || '',
        user_id: roleName === 'spv_gudang'
        ? authUser.id
        : opname?.user_id || '',
        note: opname?.note || ''
    })

    const [rows, setRows] = useState<OpnameItem[]>(
        opname?.items || [
                {
                    item_id: '',
                    system_stock: 0,
                    physical_stock: '',
                    difference: 0
                }
            ]
    )

    const addRow = () => {
        setRows([
            ...rows, {
                item_id: '',
                system_stock: 0,
                physical_stock: '',
                difference: 0
            }
        ])
    }

    const removeRow = (index
    : number) => {
        const updated = [...rows]
        updated.splice(index, 1)
        setRows(updated)
    }

    const updateRow = (
        index: number,
        key: keyof OpnameItem,
        value: any
    ) => {

        const updated = [...rows]

        updated[index][key] = value

        if (key === 'physical_stock') {
            updated[index].difference =
                value - updated[index].system_stock
        }

        setRows(updated)
    }

    const sendRequest = (updateItemsValue: boolean) => {

        const payload = new FormData()

        payload.append('date', form.date)
        payload.append('warehouse_id', String(form.warehouse_id ?? ''))
        payload.append('user_id', form.user_id ?? '')
        payload.append('note', form.note ?? '')
        payload.append('updateItems', updateItemsValue ? '1' : '0')

        rows.forEach((row, index) => {
            payload.append(`items[${index}][item_id]`, String(row.item_id))
            payload.append(`items[${index}][system_stock]`, String(row.system_stock))
            payload.append(
                `items[${index}][physical_stock]`,
                String(row.physical_stock ?? 0)
            )
            payload.append(`items[${index}][difference]`, String(row.difference))
        })

        if (opname) {

            payload.append('_method', 'PUT')

            router.post(update(opname.id), payload, {
                forceFormData: true,
                onSuccess: () => {
                    notify.success(`Stock opname berhasil diperbarui`)
                    onClose()
                },
                onError: (errors: Record<string, string>) => {
                    notify.error(Object.values(errors).join('\n'))
                },
            })

        } else {

            router.post(store(), payload, {
                forceFormData: true,
                onSuccess: () => {
                    notify.success(`Stock opname berhasil ditambahkan`)
                    onClose()
                },
                onError: (errors: Record<string, string>) => {
                    notify.error(Object.values(errors).join('\n'))
                },
            })

        }

    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.date) {
            notify.error("Tanggal harus diisi")
            return
        }

        if (!form.user_id) {
            notify.error("Field Dicek Oleh harus diisi")
            return
        }

        if(rows.some(r => !r.item_id)){
            notify.error("Semua item harus dipilih")
            return
        }

        if(rows.some(r => r.physical_stock === '')){
            notify.error("Physical stock harus diisi")
            return
        }

        const hasDifference = rows.some(r => r.difference !== 0)

        if (hasDifference) {

            const diffCount = rows.filter(r => r.difference !== 0).length

            notify.confirm({
                message: `${diffCount} item memiliki selisih stok. Perbarui stok item?`,
                confirmText: "Ya",
                cancelText: "Tidak",
                onConfirm: () => sendRequest(true),
                onCancel: () => sendRequest(false)
            })

        } else {

            sendRequest(false)

        }
    }

    const filteredWarehouses =
        roleName === 'spv_gudang'
            ? warehouses
            : warehouses.filter(w => w.user_id == form.user_id)

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2"
            onClick={onClose}>

            <div
                className="bg-background rounded-lg w-full max-w-4xl p-6"
                onClick={(e) => e.stopPropagation()}>

                <div className="flex justify-between mb-4">

                    <h2 className="font-semibold text-lg">
                        {
                            opname
                                ? 'Edit Stock Opname'
                                : 'Tambah Stock Opname'
                        }
                    </h2>

                    <X className="cursor-pointer" onClick={onClose}/>

                </div>

                <form onSubmit={submit} className="space-y-4">

                    <div className="grid grid-cols-2 gap-4">

                        <FormInput
                            label="Tanggal"
                            type="date"
                            value={form.date}
                            onChange={(e) => setForm({
                                ...form,
                                date: e.target.value
                            })}
                            required
                            />

                        {
                            roleName !== 'spv_gudang' && (

                                <div>
                                    <label className="text-sm">Dicek Oleh</label>

                                    <select
                                        className="w-full border rounded-md p-2"
                                        value={form.user_id}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                user_id: e.target.value,
                                                warehouse_id: '' // reset gudang
                                            })
                                        }
                                    >

                                        <option value="">Pilih Penanggungjawab</option>

                                        {users?.map(u => (
                                            <option key={u.id} value={u.id}>
                                                {u.name}
                                            </option>
                                        ))}

                                    </select>

                                </div>

                            )
                        }

                        <div>
                            <label className="text-sm">Gudang</label>

                            <select
                                disabled={roleName !== 'spv_gudang' && !form.user_id}
                                className="w-full border rounded-md p-2"
                                value={form.warehouse_id}
                                onChange={(e) => setForm({
                                    ...form,
                                    warehouse_id: e.target.value
                                })}
                            >

                                <option value="">Pilih Gudang</option>

                                {filteredWarehouses.map(w => (
                                    <option key={w.id} value={w.id}>
                                        {w.name}
                                    </option>
                                ))}

                            </select>

                        </div>

                    </div>

                    <FormTextarea
                        label="Catatan"
                        value={form.note}
                        onChange={(e) => setForm({
                            ...form,
                            note: e.target.value
                        })}
                        required
                        />

                    <div className="border rounded-lg p-3">

                        <div className="flex justify-between mb-2">

                            <div className="font-medium text-sm">
                                Item Opname
                            </div>

                            <Button type="button" size="sm" onClick={addRow}>

                                <Plus className="size-4"/>
                                Tambah Item

                            </Button>

                        </div>

                        <table className="w-full text-sm">

                            <thead className="text-muted-foreground">

                                <tr>
                                    <th className="text-left">Item</th>
                                    <th>System</th>
                                    <th>Physical</th>
                                    <th>Diff</th>
                                    <th></th>
                                </tr>

                            </thead>

                            <tbody>

                                {
                                    rows.map((row, i) => {

                                        return (

                                            <tr key={i} className="border-t">

                                                <td>

                                                    <select
                                                        className="w-full p-2 border rounded-md"
                                                        value={row.item_id}
                                                        onChange={(e) => {

                                                            const id = e.target.value

                                                            const item = items.find(i => i.id == id)

                                                            updateRow(i, 'item_id', id)

                                                            if (item) {
                                                                updateRow(i, 'system_stock', item.stock)
                                                            }

                                                        }}>

                                                        <option value="">Pilih Item</option>

                                                        {
                                                            items.map(it => (<option key={it.id} value={it.id}>
                                                                {it.name}
                                                            </option>))
                                                        }

                                                    </select>

                                                </td>

                                                <td className="text-center">
                                                    {row.system_stock}
                                                </td>

                                                <td>

                                                    <input
                                                        type="number"
                                                        placeholder="0"
                                                        value={row.physical_stock ?? ''}
                                                        className="w-full border rounded-md p-1"
                                                        onChange={(e) =>
                                                            updateRow(
                                                                i,
                                                                'physical_stock',
                                                                e.target.value === '' ? '' : Number(e.target.value)
                                                            )
                                                        }
                                                    />

                                                </td>

                                                <td className="text-center">

                                                    {row.difference}

                                                </td>

                                                <td>

                                                    <button type="button" onClick={() => removeRow(i)}>

                                                        <Trash2 className="size-4 text-red-500"/>

                                                    </button>

                                                </td>

                                            </tr>

                                        )

                                    })
                                }

                            </tbody>

                        </table>

                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">

                        <Button variant="secondary" type="button" onClick={onClose}>
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