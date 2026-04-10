import { Package, Plus, Trash2, Image } from "lucide-react"
import { useState } from "react";
import { FormInput, FormSelect } from "@/components/admin"
import { formatCurrency, formatNumber } from "@/helpers/format"

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
    totalWeight,
    cartUnit,
    getNetQty,
    getItemTotal,
    carts,
    disabled,
}: any) {
    const [errors, setErrors] = useState({});

    const handleNumberInput = (index, field, value, max) => {
        const num = Number(value);

        if (num > max) {
            setErrors((prev) => ({
                ...prev,
                [`${field}-${index}`]: `Maksimal ${max}`,
            }));
            return;
        }

        setErrors((prev) => ({
            ...prev,
            [`${field}-${index}`]: null,
        }));

        updateItem(index, field, num);
    };

    return (

        <div className="p-4 border rounded-lg flex flex-col gap-2">

            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center mb-2">
                    <Package className="size-5 text-primary"/>
                    <span className="font-bold text-sm">Daftar Barang</span>
                </div>
            </div>

            {form.items.map((item: any, index: number) => {
                return (
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

                                    <div className="flex items-center gap-1">
                                        <p className="text-xs font-light">
                                            {item.stock ?? "stok"} {item.unit?.unit_code ?? "kg"}
                                        </p>
                                        <p className="text-xs font-light">
                                            
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={() => removeItem(index)}
                                >
                                    <Trash2 className="size-4 text-muted-foreground hover:text-red-500 cursor-pointer" />
                                </button>
                            )}

                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-end">

                            <FormInput
                                label="Jumlah"
                                type="number"
                                disabled={disabled}
                                max={item.stock ?? ''}
                                value={item.quantity}
                                onChange={(e) =>
                                    handleNumberInput(index, "quantity", e.target.value, item.stock)
                                }
                            />
                            

                            <FormInput
                                label="Bad Stock"
                                type="number"
                                disabled={disabled}
                                max={item.stock ?? ''}
                                value={item.bad_stock}
                                onChange={(e) =>
                                    handleNumberInput(index, "bad_stock", e.target.value, item.stock)
                                }
                            />

                            <FormInput
                                label={`Harga${item.unit?.unit_code ? '/' + item.unit.unit_code : '/-'}`}
                                type="number"
                                disabled={disabled}
                                value={item.price}
                                onChange={(e) =>
                                    updateItem(index, "price", e.target.value)
                                }
                            />

                            <FormSelect
                                label="Keranjang"
                                disabled={disabled}
                                value={item.cart_id}
                                onChange={(e) =>
                                    updateItem(index, "cart_id", e.target.value)
                                }
                                options={
                                    [{
                                        label: 'Pilih Keranjang',
                                        value: '',
                                        disabled: true
                                    },
                                    ...carts.map((s: any) => ({
                                        label: s.name,
                                        value: s.id
                                    }))]
                                }
                                required
                            />
                            <FormInput
                                label="Jumlah"
                                type="number"
                                disabled={disabled}
                                value={item.cart_qty}
                            onChange={(e) =>
                                    updateItem(index, "cart_qty", e.target.value)
                                }
                            />

                            <FormInput
                                label="Berat/Keranjang"
                                type="number"
                                disabled={disabled}
                                value={item.cart_weight}
                                onChange={(e) =>
                                    updateItem(index, "cart_weight", e.target.value)
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

                )
            }
            )}

            {!selectingItem && !disabled && (

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

                <div className="border rounded-lg">

                    <div className="p-3 flex flex-col gap-2">
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
                                            {item.stock + " " + item.unit?.unit_code}
                                        </span>
                                    </div>

                                </button>
                            ))}

                        </div>
                    </div>
                    
                    <button onClick={() => setSelectingItem(false)}
                        className="border-t p-2 text-center cursor-pointer hover:bg-accent w-full font-medium text-sm text-muted-foreground">
                        Tutup
                    </button>
                </div>

            )}

            <div className="p-4 rounded-lg bg-primary/10 flex items-center justify-between">
                <span className="text-sm">Total Berat</span>
                <span className="text-md font-extrabold text-primary">
                    {formatNumber(totalWeight)} {cartUnit ?? '-'}
                </span>
            </div>
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