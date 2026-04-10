import { router } from "@inertiajs/react";
import { X, Truck, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DeliveryOrder} from "@/data/deliveryOrders";
import { calcTotalWeight, calcTotalAmount, getStatusLabel } from "@/data/deliveryOrders";
import { formatRupiah } from "@/data/products";
import { notify } from "@/lib/notify";
import { index } from "@/routes/delivery-schedules";
import { destroy } from "@/routes/surat-jalan";

interface Props {
  order: DeliveryOrder;
  onClose: () => void;
  onEdit: () => void;
}

const DeliveryDetailModal = ({ order, onClose, onEdit }: Props) => {
  // const [confirmDelete, setConfirmDelete] = useState(false);

  const confirmDelete = (order: DeliveryOrder) => {
    notify.confirmDelete({
      message: `Hapus ${order.do_number}?`,
      onConfirm: () => performDelete(order)
    })
  }

  const performDelete = (order: DeliveryOrder) => {
    const loading = notify.loading("Menghapus surat jalan...")

    router.delete(destroy(Number(order.id)), {
      onSuccess: () => {
        onClose()
        router.get(index())
        notify.dismiss(loading)
        notify.success(`Surat Jalan ${order.do_number} berhasil dihapus`)
      },
      onError: () => {
        notify.dismiss(loading)
        notify.error(`Gagal menghapus ${order.do_number}`)
      },
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            {order.type === "in" ? <Package size={20} className="text-emerald-600" /> : <Truck size={20} className="text-blue-600" />}
            <h2 className="text-lg font-bold text-foreground">Detail Delivery Order</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">DO Number</span>
              <p className="font-semibold text-foreground">{order.do_number}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Tanggal</span>
              <p className="font-semibold text-foreground">{order.date}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Type</span>
              <Badge className={order.type === "in" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : "bg-blue-100 text-blue-800 hover:bg-blue-100"}>
                {order.type === "in" ? "IN - Pembelian" : "OUT - Pengiriman"}
              </Badge>
            </div>
            <div>
              <span className="text-muted-foreground">Status</span>
              <Badge variant={order.status === "done" ? "default" : "secondary"}>
                {getStatusLabel(order.status)}
              </Badge>
            </div>
            <div>
              <span className="text-muted-foreground">{order.type === "in" ? "Supplier" : "Customer"}</span>
              <p className="font-semibold text-foreground">{order.type === "in" ? order.supplier_name : order.customer_name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Pengirim</span>
              <p className="font-semibold text-foreground">{order.sender_name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Penerima</span>
              <p className="font-semibold text-foreground">{order.receiver_name}</p>
            </div>
            {order.note && (
              <div className="col-span-2">
                <span className="text-muted-foreground">Catatan</span>
                <p className="text-foreground">{order.note}</p>
              </div>
            )}
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold text-sm text-foreground mb-2">Items</h3>
            <div className="rounded-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left px-3 py-2 text-muted-foreground font-medium">Nama Buah</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-medium">Keranjang</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-medium">Qty (kg)</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-medium">Harga</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-3 py-2 text-foreground">{item.name}</td>
                      <td className="px-3 py-2">
                        <div className="flex flex-col gap-1 justify-end">
                            <span>{item.cart?.name ?? 'kosong'}</span>
                            <div className="flex flex-col items-start text-xs text-muted-foreground">
                                <span>jumlah: {item.cart_qty ?? 'kosong'}</span>
                                <span>berat/keranjang: {item.cart_weight ?? 'kosong'}</span>
                            </div>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-right tabular-nums">{item.quantity}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{formatRupiah(item.price)}</td>
                      <td className="px-3 py-2 text-right font-semibold tabular-nums">{formatRupiah(item.quantity * item.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-between text-sm pt-2 border-t border-border">
            <span className="text-muted-foreground">Total Berat</span>
            <span className="font-bold text-foreground">{calcTotalWeight(order.items)} kg</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Amount</span>
            <span className="font-bold text-foreground text-base">{formatRupiah(calcTotalAmount(order.items))}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 p-5 border-t border-border">
          <Button variant="destructive" size="sm" onClick={() => confirmDelete(order)}>Delete</Button>
          <div className="flex-1" />
          <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
          <Button size="sm" onClick={onEdit}>Edit</Button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailModal;
