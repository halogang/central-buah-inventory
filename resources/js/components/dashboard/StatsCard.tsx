import { Package, Boxes, TrendingUp, AlertTriangle, ArrowUpRight } from "lucide-react";
import type { StatCard } from "@/types/dashboard";

const iconMap = {
  package: Package,
  boxes: Boxes,
  "trending-up": TrendingUp,
  "alert-triangle": AlertTriangle,
};

const colorMap = {
  success: { bg: "bg-primary/10", text: "text-primary", trend: "text-primary" },
  info: { bg: "bg-blue-500/10", text: "text-blue-500", trend: "text-primary" },
  warning: { bg: "bg-orange-500/10", text: "text-orange-500", trend: "text-primary" },
  danger: { bg: "bg-red-500/10", text: "text-red-500", trend: "text-red-500" },
};

const StatsCard = ({ label, value, trend, icon, color }: StatCard) => {
  const Icon = iconMap[icon as keyof typeof iconMap];
  const colors = colorMap[color];

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${colors.bg}`}>
          <Icon size={20} className={colors.text} />
        </div>
        {trend && (
          <span className={`flex items-center gap-0.5 text-xs font-medium ${colors.trend}`}>
            <ArrowUpRight size={14} />
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
};

export default StatsCard;
