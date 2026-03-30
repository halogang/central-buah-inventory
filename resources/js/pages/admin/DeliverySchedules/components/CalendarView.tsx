import { useMemo } from "react";
import { DeliveryOrder, calcTotalWeight } from "@/data/deliveryOrders";

interface Props {
  currentDate: Date;
  orders: DeliveryOrder[];
  onEventClick: (order: DeliveryOrder) => void;
  onDateClick: (dateStr: string) => void;
}

const DAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

const statusDot: Record<string, string> = {
  draft: "bg-gray-400",
  sent: "bg-amber-400",
  done: "bg-emerald-700",
};

const CalendarView = ({ currentDate, orders, onEventClick, onDateClick }: Props) => {
  const cells = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    // Monday = 0
    let startDow = firstDay.getDay() - 1;
    if (startDow < 0) startDow = 6;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const totalCells = Math.ceil((startDow + daysInMonth) / 7) * 7;
    const result: { day: number | null; dateStr: string }[] = [];

    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - startDow + 1;
      if (dayNum < 1 || dayNum > daysInMonth) {
        result.push({ day: null, dateStr: "" });
      } else {
        const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
        result.push({ day: dayNum, dateStr: ds });
      }
    }
    return result;
  }, [currentDate]);

  const ordersByDate = useMemo(() => {
    const map: Record<string, DeliveryOrder[]> = {};
    orders.forEach((o) => {
      if (!map[o.date]) map[o.date] = [];
      map[o.date].push(o);
    });
    return map;
  }, [orders]);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-secondary">
        {DAYS.map((d) => (
          <div key={d} className="py-2.5 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7">
        {cells.map((cell, i) => {
          const events = cell.dateStr ? ordersByDate[cell.dateStr] || [] : [];
          const isToday = cell.dateStr === todayStr;
          const maxShow = 2;

          return (
            <div
              key={i}
              onClick={() => cell.day && onDateClick(cell.dateStr)}
              className={`min-h-27.5 border-t border-r border-border p-1.5 cursor-pointer transition-colors hover:bg-accent/5 ${
                !cell.day ? "bg-muted/30" : ""
              } ${i % 7 === 0 ? "border-l-0" : ""}`}
            >
              {cell.day && (
                <>
                  <div className={`text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                  }`}>
                    {cell.day}
                  </div>
                  <div className="space-y-1">
                    {events.slice(0, maxShow).map((ev) => (
                      <button
                        key={ev.id}
                        onClick={(e) => { e.stopPropagation(); onEventClick(ev); }}
                        className={`w-full text-left rounded-md px-1.5 py-1 text-[10px] leading-tight transition-opacity hover:opacity-80 ${
                          ev.type === "in"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${statusDot[ev.status]}`} />
                          <span className="font-semibold truncate">
                            {ev.type === "in" ? "IN" : "OUT"}
                          </span>
                        </div>
                        <div className="truncate">
                          {ev.type === "in" ? ev.supplier_name : ev.customer_name}
                        </div>
                        <div className="text-[9px] opacity-70">{calcTotalWeight(ev.items)} kg</div>
                      </button>
                    ))}
                    {events.length > maxShow && (
                      <div className="text-[10px] text-muted-foreground font-medium pl-1">
                        +{events.length - maxShow} lainnya
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
