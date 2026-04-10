import type { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  subtitleColor?: "success" | "destructive" | "muted";
  icon: LucideIcon;
  iconBgColor?: string;
}

const subtitleColors = {
  success: "text-success",
  destructive: "text-destructive",
  muted: "text-muted-foreground",
};

export function SummaryCard({
  title,
  value,
  subtitle,
  subtitleColor = "muted",
  icon: Icon,
  iconBgColor,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between min-h-25">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-card-foreground">{value}</p>
          {subtitle && (
            <p className={`text-xs font-medium ${subtitleColors[subtitleColor]}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: iconBgColor || "hsl(var(--primary) / 0.1)" }}
        >
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
