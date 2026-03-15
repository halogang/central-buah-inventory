import { FileText, FileSpreadsheet } from "lucide-react";

export function ExportButtons() {
  return (
    <div className="flex items-center gap-2">
      <button className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-medium text-destructive hover:bg-destructive/10 transition-colors">
        <FileText className="h-3.5 w-3.5" />
        PDF
      </button>
      <button className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
        <FileSpreadsheet className="h-3.5 w-3.5" />
        Excel
      </button>
    </div>
  );
}
