import { DeliveryOrder, calcTotalWeight, calcTotalAmount, getStatusLabel } from "@/data/deliveryOrders";
import { formatRupiah } from "@/data/products";
import { X, Truck, Package, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Props {
  order: DeliveryOrder;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const DeliveryDetailModal = ({ order, onClose, onEdit, onDelete }: Props) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

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
                    <th className="text-right px-3 py-2 text-muted-foreground font-medium">Qty (kg)</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-medium">Harga</th>
                    <th className="text-right px-3 py-2 text-muted-foreground font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-3 py-2 text-foreground">{item.name}</td>
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
          {confirmDelete ? (
            <div className="flex-1 flex items-center gap-2">
              <AlertTriangle size={16} className="text-destructive shrink-0" />
              <span className="text-sm text-destructive">Yakin ingin menghapus?</span>
              <Button variant="destructive" size="sm" onClick={onDelete}>Ya, Hapus</Button>
              <Button variant="outline" size="sm" onClick={() => setConfirmDelete(false)}>Batal</Button>
            </div>
          ) : (
            <>
              <Button variant="destructive" size="sm" onClick={() => setConfirmDelete(true)}>Delete</Button>
              <div className="flex-1" />
              <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
              <Button size="sm" onClick={onEdit}>Edit</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetailModal;
