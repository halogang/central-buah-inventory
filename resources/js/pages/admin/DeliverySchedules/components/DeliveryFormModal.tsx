import { X, Plus, Trash2, Image } from "lucide-react";
import { useState, useEffect } from "react";
import { FormInput, FormSelect } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DeliveryOrder, DeliveryItem, DeliveryType, Item, Cart, Supplier, Customer, User, DeliveryFormPayload } from "@/data/deliveryOrders";
import { formatRupiah } from "@/data/products";

interface Props {
  order: DeliveryFormPayload | DeliveryOrder | null;
  defaultDate: string;
  onClose: () => void;
  onSave: (order: DeliveryFormPayload) => void;
  orders: DeliveryOrder[];
  products: Item[];
  carts: Cart[];
  suppliers: Supplier[];
  customers: Customer[];
  stafAntar: User[];

}

const DeliveryFormModal = ({ order, defaultDate, onClose, onSave, orders, products, carts, suppliers, customers, stafAntar }: Props) => {
  const isEdit = !!order;

  const generateDoNumber = (
    type: DeliveryType,
    date: string,
    orders: DeliveryOrder[]
  ) => {
    const prefix = type === "in" ? "SJM" : "SJK";

    const formattedDate = date.replaceAll("-", "");

    const sameDayOrders = orders.filter(
      (o) => o.type === type && o.date === date
    );

    let nextSequence = 1;

    if (sameDayOrders.length > 0) {
      // const lastSequence = parseInt(lastNumber.slice(-3));
      const maxSequence = Math.max(
        ...sameDayOrders.map((o) => parseInt(o.do_number.slice(-3)))
      );

      nextSequence = maxSequence + 1;
    }

    const sequence = String(nextSequence).padStart(3, "0");

    return `${prefix}/${formattedDate}/${sequence}`;
  };

  const [date, setDate] = useState(order?.date || defaultDate);
  const [type, setType] = useState<DeliveryType>(order?.type || "out");
  const [doNumber, setDoNumber] = useState(
    order?.do_number || generateDoNumber(type, date, orders)
  );
  const [supplierId, setSupplierId] = useState(order?.supplier_id || "");
  const [customerId, setCustomerId] = useState(order?.customer_id || "");
  const [senderName, setSenderName] = useState(order?.sender_name || "");
  const [senderId, setSenderId] = useState(order?.sender?.id ? String(order.sender.id) : "");
  const [receiverName, setReceiverName] = useState(order?.receiver_name || "");
  const [note, setNote] = useState(order?.note || "");
  const [selectingItem, setSelectingItem] = useState(false)
  const [searchItem, setSearchItem] = useState("")

  const [items, setItems] = useState<DeliveryItem[]>(
    order?.items || []
  )

  const filteredItems = products.filter((i) => {
    const matchesSearch = i.name
      .toLowerCase()
      .includes(searchItem.toLowerCase());

    const nonSelected = !items.some(
      (selected) => selected.item_id == String(i.id)
    );

    return matchesSearch && nonSelected;
  });

  const selectItem = (item: Item) => {
    const newItem: DeliveryItem = {
      item_id: String(item.id),
      item: item,
      name: item.name,
      quantity: 0,
      bad_stock: 0,
      price: type === 'in' ? item.purchase_price : item.selling_price,
      cart_id: null,
      cart_qty: 0,
      cart_weight: 0,
    };

    setItems((prev) => [...prev, newItem]);
    setSelectingItem(false);
    setSearchItem("");
  };

  const updateItem = (
    index: number,
    field: keyof DeliveryItem,
    value: string | number | null
  ) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]:
                field === "cart_id"
                  ? value === "" ? null : Number(value)
                  : typeof item[field] === "number"
                  ? Number(value)
                  : value,
            }
          : item
      )
    );
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const getNetQty = (item: DeliveryItem) => {
    return (Number(item.quantity || 0) - Number(item.bad_stock || 0));
  };

  const getItemTotal = (item: DeliveryItem) => {
    return getNetQty(item) * Number(item.price || 0);
  };


  const totalAmount = items.reduce((sum, item) => {
    return sum + getItemTotal(item);
  }, 0);

  const totalWeight = items.reduce((sum, item) => {
    const qty = Number(item.quantity || 0);
    const cartQty = Number(item.cart_qty || 0);
    const cartWeight = Number(item.cart_weight || 0);

    return sum + qty + (cartQty * cartWeight);
  }, 0);

  const handleSubmit = () => {
    const payload = {
      id: order?.id,
      type,
      date,
      do_number: null,
      sender: null,
      status: "draft",
      supplier_id: supplierId || null,
      customer_id: customerId || null,
      sender_id: senderId || null,
      sender_name: senderName,
      receiver_name: receiverName,
      note,
      items,
    };

    onSave(payload);
  };

  useEffect(() => {
    if (!isEdit) {
      const newDo = generateDoNumber(type, date, orders);
      setDoNumber(newDo);
    }
  }, [type, date])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-xl mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            {isEdit ? "Edit Delivery Order" : "Tambah Delivery Order"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <FormInput
                    label="Tanggal"
                    type="date"
                    value={date}
                    // disabled={disabled}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
              <FormInput
                    label="Nomor Surat Jalan"
                    value={doNumber}
                    onChange={(e) => setDoNumber(e.target.value)}
                    readOnly
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Type</label>
            <div className="flex gap-2">
              {(["in", "out"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors border ${
                    type === t
                      ? t === "in"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : "bg-blue-100 text-blue-800 border-blue-300"
                      : "bg-secondary text-muted-foreground border-border hover:bg-accent/10"
                  }`}
                >
                  {t === "in" ? "IN - Pembelian" : "OUT - Pengiriman"}
                </button>
              ))}
            </div>
          </div>

          {/* Supplier / Customer */}
          <div>
            <FormSelect
                label={type === 'in' ? "Pilih Supplier" : "Pilih Customer"}
                value={type === 'in' ? supplierId : customerId}
                onChange={(e) => {
                    if (type === 'in') {
                        setSupplierId(e.target.value);
                    } else {
                        setCustomerId(e.target.value);
                    }
                }}
                options={[
                    {
                        label: type === 'in' ? 'Pilih Supplier' : 'Pilih Customer',
                        value: '',
                        // disabled: true
                    },
                    ...(type === 'in' ? suppliers.map((s: any) => ({
                        label: s.name,
                        value: s.id
                    })) : customers.map((c: any) => ({
                        label: c.name,
                        value: c.id
                    })))

                ]}
                required
            />
          </div>

          {/* Pengirim/Sender */}
          {type === 'out' && (
            <div>
              <FormSelect
                  label="Pilih Pengirim"
                  value={senderId}
                  onChange={(e) => setSenderId(e.target.value)}
                  options={[
                      {
                          label: "Pilih Pengirim",
                          value: '',
                          // disabled: true
                      },
                      ...stafAntar.map((s: any) => ({
                          label: s.name,
                          value: String(s.id)
                      }))

                  ]}
                  required
              />
            </div>
          )}

          {/* Note */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Catatan</label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Catatan opsional..." />
          </div>
          
          {/* </div>  */}
          <div className="p-4 border rounded-lg flex flex-col gap-2">

            <div className="flex justify-between items-center">
              <span className="font-bold text-sm">Daftar Barang</span>
            </div>

            {items.map((item, index) => (
              <div key={index} className="flex flex-col gap-2 border rounded-lg p-3">

                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    {item.item?.image ? (
                      <img src={item.item?.image_url} className="w-8 h-8 rounded" />
                    ) : (
                      <Image className="size-8 text-muted-foreground"/>
                    )}

                    <div>
                      <p className="text-sm font-bold">
                        {item.name || "-"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {item.item?.stock} {item.item?.unit_code}
                      </p>
                    </div>
                  </div>

                  <button onClick={() => removeItem(index)}>
                    <Trash2 className="size-4 text-red-500" />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">

                  <FormInput
                    label="Jumlah"
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                  />

                  <FormInput
                    label="Bad Stock"
                    type="number"
                    placeholder="Bad"
                    value={item.bad_stock}
                    onChange={(e) => updateItem(index, "bad_stock", Number(e.target.value))}
                  />

                  <FormInput
                    label="Harga"
                    type="number"
                    placeholder="Harga"
                    value={item.price}
                    onChange={(e) => updateItem(index, "price", Number(e.target.value))}
                  />

                  <FormSelect
                    label="Pilih Keranjang"
                    value={item.cart_id ?? ""}
                    onChange={(e) => updateItem(index, "cart_id", e.target.value)}
                    options={
                      [{
                        label: 'Pilih Keranjang',
                        value: '',
                      },
                      ...carts.map((c) => ({
                        label: c.name,
                        value: String(c.id)
                      }))]
                    }
                  />
                    {/* <option value="">Pilih keranjang</option>
                    {carts.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))} */}

                  <FormInput
                    label="Jml Keranjang" 
                    type="number"
                    placeholder="Qty Keranjang"
                    value={item.cart_qty}
                    onChange={(e) => updateItem(index, "cart_qty", e.target.value)}
                  />

                  <FormInput
                    label="Berat/Keranjang" 
                    type="number"
                    placeholder="Berat"
                    value={item.cart_weight}
                    onChange={(e) => updateItem(index, "cart_weight", e.target.value)}
                  />

                </div>

                <div className="flex justify-between text-xs">
                  <span>Net: {getNetQty(item)}</span>
                  <span className="text-orange-500">
                    Rp {getItemTotal(item).toLocaleString()}
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
              <div className="border rounded-lg">
                <div className="p-3 flex flex-col gap-2">
                  <input
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    placeholder="Cari barang..."
                    className="w-full border rounded px-2 py-1 text-sm"
                  />

                  <div className="max-h-60 overflow-y-auto flex flex-col gap-1">

                    {filteredItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => selectItem(item)}
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
                                {item.stock + " " + item.unit_code || ""}
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

            {/* <div className="bg-primary/10 p-2 flex justify-between">
              <span>Total Berat</span>
              <span>{totalWeight} {cartUnit}</span>
            </div>

            <div className="bg-primary/10 p-2 flex justify-between">
              <span>Total</span>
              <span>Rp {totalAmount.toLocaleString()}</span>
            </div> */}

          </div>

          {/* Totals */}
          <div className="bg-secondary/50 rounded-lg p-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Berat</span>
              <span className="font-bold text-foreground">{totalWeight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="font-bold text-foreground">{formatRupiah(totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-5 border-t border-border">
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryFormModal;
