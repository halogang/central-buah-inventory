import { ChevronDown } from "lucide-react";

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

interface FilterBarProps {
  month: number;
  year: number;
  onMonthChange: (m: number) => void;
  onYearChange: (y: number) => void;
}

export function FilterBar({ month, year, onMonthChange, onYearChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <select
          value={month}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          className="appearance-none rounded-lg border border-border bg-card px-4 py-2 pr-8 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {MONTHS.map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
      <div className="relative">
        <select
          value={year}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="appearance-none rounded-lg border border-border bg-card px-4 py-2 pr-8 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}
