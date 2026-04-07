import { useState, useMemo, useCallback } from "react";
import CalendarView from "./components/CalendarView";
import DeliveryDetailModal from "./components/DeliveryDetailModal";
import DeliveryFormModal from "./components/DeliveryFormModal";
import {
  DeliveryOrder,
  DeliveryType,
  initialDeliveryOrders,
} from "@/data/deliveryOrders";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BreadcrumbItem } from "@/types/navigation";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Jadwal Surat Jalan',
        href: '/delivery-schedules',
    },
];

const DeliverySchedule = () => {
  const [orders, setOrders] = useState<DeliveryOrder[]>(initialDeliveryOrders);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const [selectedOrder, setSelectedOrder] = useState<DeliveryOrder | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState<DeliveryOrder | null>(null);
  const [createDate, setCreateDate] = useState<string>("");
  const [filterType, setFilterType] = useState<DeliveryType | "all">("all");

  const filteredOrders = useMemo(
    () => filterType === "all" ? orders : orders.filter((o) => o.type === filterType),
    [orders, filterType]
  );

  const goToday = () => setCurrentDate(new Date(2026, 2, 1));
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

  const handleDelete = useCallback(() => {
    if (selectedOrder) {
      setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
      setShowDetail(false);
      setSelectedOrder(null);
    }
  }, [selectedOrder]);

  const handleSave = useCallback((order: DeliveryOrder) => {
    setOrders((prev) => {
      const idx = prev.findIndex((o) => o.id === order.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = order;
        return next;
      }
      return [...prev, order];
    });
    setShowForm(false);
    setEditingOrder(null);
  }, []);

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
          onDelete={handleDelete}
          />
      )}

      {showForm && (
          <DeliveryFormModal
          order={editingOrder}
          defaultDate={createDate}
          onClose={() => { setShowForm(false); setEditingOrder(null); }}
          onSave={handleSave}
          />
      )}
    </AppLayout>
  );
};

export default DeliverySchedule;
