import { useState, useMemo } from "react";
import { DeliveryOrder, DeliveryItem, DeliveryType, DeliveryStatus, fruitOptions, calcTotalWeight, calcTotalAmount } from "@/data/deliveryOrders";
import { formatRupiah } from "@/data/products";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  order: DeliveryOrder | null;
  defaultDate: string;
  onClose: () => void;
  onSave: (order: DeliveryOrder) => void;
}

const DeliveryFormModal = ({ order, defaultDate, onClose, onSave }: Props) => {
  const isEdit = !!order;

  const [date, setDate] = useState(order?.date || defaultDate);
  const [type, setType] = useState<DeliveryType>(order?.type || "in");
  const [doNumber, setDoNumber] = useState(order?.do_number || `DO-${Date.now().toString(36).toUpperCase()}`);
  const [supplierName, setSupplierName] = useState(order?.supplier_name || "");
  const [customerName, setCustomerName] = useState(order?.customer_name || "");
  const [senderName, setSenderName] = useState(order?.sender_name || "");
  const [receiverName, setReceiverName] = useState(order?.receiver_name || "");
  const [note, setNote] = useState(order?.note || "");
  const [status, setStatus] = useState<DeliveryStatus>(order?.status || "draft");
  const [items, setItems] = useState<DeliveryItem[]>(
    order?.items || [{ item_id: "", name: "", quantity: 0, price: 0 }]
  );

  const totalWeight = useMemo(() => calcTotalWeight(items), [items]);
  const totalAmount = useMemo(() => calcTotalAmount(items), [items]);

  const updateItem = (idx: number, field: keyof DeliveryItem, value: string | number) => {
    setItems((prev) => prev.map((it, i) => {
      if (i !== idx) return it;
      if (field === "item_id") {
        const fruit = fruitOptions.find((f) => f.id === value);
        return { ...it, item_id: value as string, name: fruit?.name || "", price: fruit?.price || 0 };
      }
      return { ...it, [field]: value };
    }));
  };

  const addItem = () => setItems((prev) => [...prev, { item_id: "", name: "", quantity: 0, price: 0 }]);
  const removeItem = (idx: number) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = () => {
    const result: DeliveryOrder = {
      id: order?.id || `do-${Date.now()}`,
      do_number: doNumber,
      date,
      type,
      supplier_name: type === "in" ? supplierName : undefined,
      customer_name: type === "out" ? customerName : undefined,
      sender_name: senderName,
      receiver_name: receiverName,
      note,
      status,
      items: items.filter((it) => it.item_id && it.quantity > 0),
    };
    onSave(result);
  };

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
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Tanggal</label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">DO Number</label>
              <Input value={doNumber} onChange={(e) => setDoNumber(e.target.value)} />
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
            <label className="text-xs font-medium text-muted-foreground mb-1 block">
              {type === "in" ? "Nama Supplier" : "Nama Customer"}
            </label>
            <Input
              value={type === "in" ? supplierName : customerName}
              onChange={(e) => type === "in" ? setSupplierName(e.target.value) : setCustomerName(e.target.value)}
              placeholder={type === "in" ? "Nama supplier..." : "Nama customer..."}
            />
          </div>

          {/* Sender / Receiver */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Pengirim</label>
              <Input value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Nama pengirim" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Penerima</label>
              <Input value={receiverName} onChange={(e) => setReceiverName(e.target.value)} placeholder="Nama penerima" />
            </div>
          </div>

          {/* Status (edit only) */}
          {isEdit && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Status</label>
              <div className="flex gap-2">
                {(["draft", "sent", "done"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      status === s
                        ? s === "draft" ? "bg-gray-100 text-gray-800 border-gray-300"
                        : s === "sent" ? "bg-amber-100 text-amber-800 border-amber-300"
                        : "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : "bg-secondary text-muted-foreground border-border"
                    }`}
                  >
                    {s === "draft" ? "Draft" : s === "sent" ? "Dikirim" : "Selesai"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Note */}
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Catatan</label>
            <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Catatan opsional..." />
          </div>

          {/* Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-muted-foreground">Items</label>
              <Button variant="outline" size="sm" onClick={addItem} className="h-7 text-xs">
                <Plus size={14} /> Tambah
              </Button>
            </div>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2">
                  <select
                    value={item.item_id}
                    onChange={(e) => updateItem(idx, "item_id", e.target.value)}
                    className="flex-1 bg-background border border-input rounded-md px-2 py-1.5 text-sm"
                  >
                    <option value="">Pilih buah...</option>
                    {fruitOptions.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                  <Input
                    type="number"
                    value={item.quantity || ""}
                    onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                    placeholder="Qty"
                    className="w-20 text-center"
                  />
                  <Input
                    type="number"
                    value={item.price || ""}
                    onChange={(e) => updateItem(idx, "price", Number(e.target.value))}
                    placeholder="Harga"
                    className="w-28"
                  />
                  {items.length > 1 && (
                    <button onClick={() => removeItem(idx)} className="text-destructive hover:text-destructive/80 p-1">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
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
