import { Package, Plus, Trash2, Image } from "lucide-react"
import { FormInput } from "@/components/admin"
import { formatCurrency } from "@/helpers/format"

export default function DeliveryItemsSection({
    form,
    selectingItem,
    searchItem,
    filteredItems,
    setSelectingItem,
    setSearchItem,
    selectItem,
    updateItem,
    removeItem,
    totalAmount,
    getNetQty,
    getItemTotal
}: any) {

    return (

        <div className="p-4 border rounded-lg flex flex-col gap-2">

            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center mb-2">
                    <Package className="size-5 text-primary"/>
                    <span className="font-bold text-sm">Daftar Barang</span>
                </div>
            </div>

            {form.items.map((item: any, index: number) => (

                <div
                    key={index}
                    className="flex flex-col gap-2 border rounded-lg p-3"
                >

                    <div className="flex justify-between items-center">

                        <div className="flex gap-1 items-center">

                            {item.image ?

                                <img
                                    src={item.image_url}
                                    className="w-8 h-8 object-cover rounded"
                                />

                            :

                                <div className="p-2 text-muted-foreground rounded-md">
                                    <Image />
                                </div>

                            }

                            <div className="flex flex-col">
                                <p className="text-sm font-bold">
                                    {item.name ?? "Pisang Cavendish"}
                                </p>

                                <p className="text-xs font-light">
                                    {item.unit?.unit_code ?? "kg"}
                                </p>
                            </div>

                        </div>

                        <button
                            type="button"
                            onClick={() => removeItem(index)}
                        >
                            <Trash2 className="size-4 text-muted-foreground hover:text-red-500 cursor-pointer" />
                        </button>

                    </div>

                    <div className="grid grid-cols-3 gap-2 items-end">

                        <FormInput
                            label="Jumlah"
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                                updateItem(index, "quantity", e.target.value)
                            }
                        />

                        <FormInput
                            label="Bad Stock"
                            type="number"
                            value={item.bad_stock}
                            onChange={(e) =>
                                updateItem(index, "bad_stock", e.target.value)
                            }
                        />

                        <FormInput
                            label={`Harga${item.unit?.unit_code ? '/' + item.unit.unit_code : '/kg'}`}
                            type="number"
                            value={item.price}
                            onChange={(e) =>
                                updateItem(index, "price", e.target.value)
                            }
                        />

                    </div>

                    <div className="border-t border-dashed border-muted-foreground/25 pt-2 flex justify-between">

                        <span className="text-xs font-light text-muted-foreground">
                            Net: {getNetQty(item)}
                        </span>

                        <span className="text-xs font-light text-orange-500">
                            {formatCurrency(getItemTotal(item))}
                        </span>

                    </div>

                </div>

            ))}

            {!selectingItem && (

                <button
                    type="button"
                    onClick={() => setSelectingItem(true)}
                    className="p-4 border-2 rounded-lg border-dashed border-primary/50 hover:border-primary hover:bg-primary/5 transition-all text-primary flex gap-2 w-full items-center justify-center cursor-pointer"
                >
                    <Plus className="size-5"/>
                    <span className="text-sm">Tambah Barang</span>
                </button>

            )}

            {selectingItem && (

                <div className="border rounded-lg p-3 flex flex-col gap-2">

                    <input
                        type="text"
                        placeholder="Cari barang..."
                        value={searchItem}
                        onChange={(e)=>setSearchItem(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                    />

                    <div className="max-h-60 overflow-y-auto flex flex-col gap-1">

                        {filteredItems.map((item:any)=>(
                            <button
                                key={item.id}
                                type="button"
                                onClick={()=>selectItem(item)}
                                className="flex gap-2 items-center p-2 rounded hover:bg-muted"
                            >

                                {item.image ?

                                    <img
                                        src={item.image_url}
                                        className="w-8 h-8 object-cover rounded"
                                    />

                                :

                                    <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                                        <Image className="size-4"/>
                                    </div>

                                }

                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-medium">{item.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {item.unit?.unit_code}
                                    </span>
                                </div>

                            </button>
                        ))}

                    </div>

                </div>

            )}

            {form.items.length !== 0 && (

                <div className="p-4 rounded-lg bg-primary/10 flex items-center justify-between">
                    <span className="text-sm">Total</span>
                    <span className="text-md font-extrabold text-primary">
                        {formatCurrency(totalAmount)}
                    </span>
                </div>

            )}

        </div>

    )
}