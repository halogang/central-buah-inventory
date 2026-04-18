import { FileText, FileSpreadsheet } from "lucide-react";
import { index } from "@/routes/laporan";
import { route } from "ziggy-js";

export function ExportButtons({
  activeTab,
  month,
  year,
}: {
  activeTab: string;
  month: number;
  year: number;
}) {
  const handleExport = (type: "pdf" | "excel") => {

    const params = new URLSearchParams({
      month: String(month === 0 ? "all" : month),
      year: String(year === 0 ? "all" : year),
      tab: activeTab,
      export: type,
    });

    window.location.href = `${index().url}?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto justify-start">
      <button
        onClick={() => handleExport("pdf")}
        className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors"
      >
        <FileText className="h-3.5 w-3.5" />
        PDF
      </button>

      <button
        onClick={() => handleExport("excel")}
        className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
      >
        <FileSpreadsheet className="h-3.5 w-3.5" />
        Excel
      </button>
    </div>
  );
}