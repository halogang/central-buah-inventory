export function formatNumber(value: number): string {
  try {
    return new Intl.NumberFormat("id-ID", {
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return String(value);
  }
}

export function formatCurrency(value: number): string {
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return String(value);
  }
}

export function parseNumber(value: string): number {
  return Number(value.replace(/\./g, ""));
}