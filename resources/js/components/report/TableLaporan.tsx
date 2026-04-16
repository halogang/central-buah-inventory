import { useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import Pagination from "../Pagination";
import { SearchInput } from "../search-input";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface Column {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableLaporanProps {
  title?: string;
  columns: Column[];
  data: Record<string, any>[];
  footer?: React.ReactNode;
}

export function TableLaporan({ title, columns, data, footer }: TableLaporanProps) {

  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const [search, setSearch] = useState('');

  const filtered = data.filter((row) =>
    columns.some((col) => {
      const value = row[col.key];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(search.toLowerCase());
    })
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;

    const valA = a[sortKey];
    const valB = b[sortKey];

    if (valA == null) return 1;
    if (valB == null) return -1;

    // number
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortDirection === 'asc'
        ? valA - valB
        : valB - valA;
    }

    // string
    return sortDirection === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const {
    currentPage,
    totalPages,
    paginatedData,
    goTo,
  } = usePagination(sorted, 10);
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
          <SearchInput
              placeholder="Cari Keranjang..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
          />
      </div>
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        {title && (
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer select-none text-muted-foreground ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}

                      {sortKey === col.key ? (
                        sortDirection === 'asc' ? (
                          <ArrowUp className="w-4 h-4" />
                        ) : (
                          <ArrowDown className="w-4 h-4" />
                        )
                      ) : (
                        <ArrowUpDown className="w-4 h-4 opacity-40" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors duration-100">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-6 py-4 ${
                        col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"
                      }`}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {footer && (
          <div className="border-t border-border">
            {footer}
          </div>
        )}
      </div>
      <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goTo}
      />
    </>
  );
}
