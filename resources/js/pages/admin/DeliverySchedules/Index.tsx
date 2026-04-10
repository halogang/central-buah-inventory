import { Head, router } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import type {
  DeliveryOrder,
  DeliveryType,
  Item,
  Cart,
  Supplier,
  Customer,
  User,
  DeliveryFormPayload,
} from "@/data/deliveryOrders";
import AppLayout from "@/layouts/app-layout";
import { notify } from "@/lib/notify";
import { index } from "@/routes/delivery-schedules";
import { store, update } from "@/routes/surat-jalan";
import type { BreadcrumbItem } from "@/types/navigation";
import CalendarView from "./components/CalendarView";
import DeliveryDetailModal from "./components/DeliveryDetailModal";
import DeliveryFormModal from "./components/DeliveryFormModal";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jadwal Surat Jalan',
        href: '/delivery-schedules',
    },
];

interface Props {
  deliveryOrders: DeliveryOrder[];
  items: Item[];
  carts: Cart[];
  suppliers: Supplier[];
  customers: Customer[];
  stafAntar: User[];
}

const DeliverySchedule = ({ deliveryOrders, items, carts, suppliers, customers, stafAntar }: Props) => {
  const [orders, setOrders] = useState<DeliveryOrder[]>(deliveryOrders);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<DeliveryOrder | null>(null);
  const [createDate, setCreateDate] = useState<string>("");
  const [filterType, setFilterType] = useState<DeliveryType | "all">("all");
  const [autoFlowData, setAutoFlowData] = useState<DeliveryFormPayload | null>(null);

  const order = autoFlowData ?? editingOrder;

  const filteredOrders = useMemo(
    () => filterType === "all" ? orders : orders.filter((o) => o.type === filterType),
    [orders, filterType]
  );


  const goToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };
  const goPrev = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goNext = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const monthLabel = currentDate.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

  const handleEventClick = useCallback((order: DeliveryOrder) => {
    setSelectedOrder(order);
    setShowDetail(true);
  }, []);

  const handleDateClick = useCallback((dateStr: string) => {
    setCreateDate(dateStr);
    setEditingOrder(null);
    setShowForm(true);
  }, []);

  const handleEdit = useCallback(() => {
    if (selectedOrder) {
      setEditingOrder(selectedOrder);
      setShowDetail(false);
      setShowForm(true);
    }
  }, [selectedOrder]);

  const handleSave = (form: DeliveryFormPayload) => {

    const payload = new FormData();

    payload.append("type", form.type);
    payload.append("date", form.date);
    payload.append("status", form.status || "");

    payload.append("sender_name", form.sender_name || "");
    payload.append("receiver_name", form.receiver_name || "");
    payload.append("receiver_signature", "");
    payload.append("sender_signature", "");
    payload.append("note", form.note || "");

    if (form.type === "in") {
      payload.append("supplier_id", form.supplier_id || "");
    } else {
      payload.append("customer_id", form.customer_id || "");
      payload.append("sender_id", form.sender_id || "");
    }

    form.items.forEach((item, index) => {
      payload.append(`items[${index}][item_id]`, item.item_id);
      payload.append(`items[${index}][quantity]`, String(item.quantity || 0));
      payload.append(`items[${index}][bad_stock]`, String(item.bad_stock || 0));
      payload.append(`items[${index}][price]`, String(item.price || 0));
      payload.append(`items[${index}][cart_id]`, item.cart_id ? String(item.cart_id) : "");
      payload.append(`items[${index}][cart_qty]`, String(item.cart_qty || 0));
      payload.append(`items[${index}][cart_weight]`, String(item.cart_weight || 0));
    });

    const isEdit = !!form.id;

    const handleSuccess = () => {

      // ✅ AUTO FLOW
      if (!isEdit && form.type === "out" && !form.meta?.isAutoFlow) {

        const outDate = new Date(form.date);
        const today = new Date();

        const diffDays = Math.abs(
          (today.getTime() - outDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        let newDate;

        if (diffDays < 7) {
          newDate = today;
        } else {
          newDate = new Date(outDate);
          newDate.setDate(outDate.getDate() - 7);
        }

        // 🔥 penting: trigger remount modal
        setShowForm(false);

        setTimeout(() => {
          setAutoFlowData({
            ...form,
            id: undefined,
            type: "in",
            date: newDate.toISOString().split("T")[0],
            supplier_id: null,
            customer_id: null,
            meta: { isAutoFlow: true }
          });

          setShowForm(true);
        }, 50);

        notify.success("Silakan lengkapi Surat Jalan Masuk");
        return;
      }

      // ✅ FINAL SUCCESS
      notify.success(
        form.meta?.isAutoFlow
          ? "Surat Jalan masuk & keluar berhasil dibuat"
          : isEdit
          ? "Surat Jalan berhasil diperbarui"
          : "Surat Jalan berhasil disimpan"
      );

      setTimeout(() => {
        router.get(index());
      }, 1500);
    };

    const handleError = (errors: any) => {
      notify.error(Object.values(errors).join("\n"));
    };

    if (isEdit) {
      router.put(update(Number(form.id!)), payload, {
        forceFormData: true,
        onSuccess: handleSuccess,
        onError: handleError,
      });
    } else {
      router.post(store(), payload, {
        forceFormData: true,
        onSuccess: handleSuccess,
        onError: handleError,
      });
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Jadwal Surat Jalan" >
        <meta name="robots" content="noindex" />
      </Head>

      <div className="flex-1 flex flex-col bg-background overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-foreground">Jadwal Surat Jalan</h1>
              <div className="flex items-center gap-2">
              {/* Filter */}
              <div className="flex items-center gap-1 bg-secondary rounded-lg p-1 text-sm">
                  {(["all", "in", "out"] as const).map((t) => (
                  <button
                      key={t}
                      onClick={() => setFilterType(t)}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                      filterType === t
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                      {t === "all" ? "Semua" : t === "in" ? "Pembelian" : "Pengiriman"}
                  </button>
                  ))}
              </div>
              </div>
          </div>

          <div className="flex items-center justify-between">
              {/* Legend */}
              <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  Pembelian (IN)
              </span>
              <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  Pengiriman (OUT)
              </span>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToday}>
                  Hari Ini
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goPrev}>
                  <ChevronLeft size={16} />
              </Button>
              <span className="text-sm font-semibold min-w-35 text-center capitalize">
                  {monthLabel}
              </span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goNext}>
                  <ChevronRight size={16} />
              </Button>
              </div>
          </div>
          </div>

          {/* Calendar */}
          <div className="flex-1 overflow-auto p-6">
          <CalendarView
              currentDate={currentDate}
              orders={filteredOrders}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
          />
          </div>
      </div>

      {/* Modals */}
      {showDetail && selectedOrder && (
          <DeliveryDetailModal
          order={selectedOrder}
          onClose={() => setShowDetail(false)}
          onEdit={handleEdit}
          // onDelete={handleDelete}
          />
      )}

      {showForm && (
          <DeliveryFormModal
            key={
              order?.id ??
              `${order?.date ?? "no-date"}-${order?.type ?? "no-type"}`
            }
            order={autoFlowData ?? editingOrder}
            products={items}
            carts={carts}
            suppliers={suppliers}
            customers={customers}
            stafAntar={stafAntar}
            defaultDate={createDate}
            orders={deliveryOrders}
            onClose={() => {
              setShowForm(false);
              setEditingOrder(null);
              setAutoFlowData(null);
            }}
            onSave={handleSave}
          />
      )}
    </AppLayout>
  );
};

export default DeliverySchedule;
