<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Item;
use App\Models\PettyCashTransaction;
use App\Models\Pos;
use App\Models\StockMovement;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ReportController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | MAIN INDEX
    |--------------------------------------------------------------------------
    */
    public function index(Request $request)
    {

        $month = $request->month === 'all' ? null : (int) $request->month;
        $year  = $request->year === 'all' ? null : (int) $request->year;
        $category = $request->category ?? null;
        // dd($month, $year);

        try {
            ['start' => $start, 'end' => $end, 'groupBy' => $groupBy, 'monthFilter' => $monthFilter]
                = $this->getDateRange($month, $year);
        } catch (\Throwable $e) {
            dd($e->getMessage(), $e->getFile(), $e->getLine());
        }


        // dd($this->getDateRange($month, $year));

        
        try {
            return Inertia::render('admin/Report/Index', [
                'filters' => [
                    'month' => $month ?? -1,
                    'year' => $year ?? 0,
                    'category' => $category,
                ],
    
    
                'keuangan' => $this->getKeuanganData($start, $end, $groupBy, $monthFilter),
                'stok' => $this->getStokData($start, $end, $monthFilter),
                'penjualan' => $this->getPenjualanData($start, $end, $monthFilter),
                'pengeluaran' => $this->getPengeluaranData($start, $end, $monthFilter, $category),
                'labaRugi' => $this->getLabaRugiData($start, $end, $groupBy, $monthFilter),
            ]);
        } catch (\Throwable $e) {
            dd($e->getMessage(), $e->getFile(), $e->getLine());
        }
    }

    private function getDateRange($month, $year)
    {
        $monthFilter = null; // 🔥 default

        if ($month !== null && ($month < 1 || $month > 12)) {
            $month = null;
        }

        // CASE 1
        if ($month && $year) {
            return [
                'start' => Carbon::create($year, $month)->startOfMonth(),
                'end' => Carbon::create($year, $month)->endOfMonth(),
                'groupBy' => 'daily',
                'monthFilter' => null, // 🔥 wajib ada
            ];
        }

        // CASE 2
        if ($month && !$year) {
            $range = $this->getYearRangeForMonth($month);

            return [
                'start' => $range['min']->copy()->startOfYear(),
                'end' => $range['max']->copy()->endOfYear(),
                'groupBy' => 'yearly',
                'monthFilter' => $month,
            ];
        }

        // CASE 3
        if (!$month && $year) {
            return [
                'start' => Carbon::create($year)->startOfYear(),
                'end' => Carbon::create($year)->endOfYear(),
                'groupBy' => 'monthly',
                'monthFilter' => null,
            ];
        }

        // CASE 4
        $range = $this->getYearRangeForAll();

        return [
            'start' => $range['min']->copy()->startOfYear(),
            'end' => $range['max']->copy()->endOfYear(),
            'groupBy' => 'yearly',
            'monthFilter' => null,
        ];
    }

    private function getYearRangeForMonth(int $month)
    {
        $invoiceMin = Invoice::whereMonth('date', $month)->min('date');
        $invoiceMax = Invoice::whereMonth('date', $month)->max('date');

        $posMin = Pos::whereMonth('date', $month)->min('date');
        $posMax = Pos::whereMonth('date', $month)->max('date');

        $pettyMin = PettyCashTransaction::whereMonth('date', $month)->min('date');
        $pettyMax = PettyCashTransaction::whereMonth('date', $month)->max('date');

        $minDate = collect([$invoiceMin, $posMin, $pettyMin])->filter()->min();
        $maxDate = collect([$invoiceMax, $posMax, $pettyMax])->filter()->max();

        // 🔥 FIX: kalau tidak ada data sama sekali
        if (!$minDate || !$maxDate) {
            return [
                'min' => now()->subYears(2)->startOfYear(),
                'max' => now()->endOfYear(),
            ];
        }

        return [
            'min' => Carbon::parse($minDate),
            'max' => Carbon::parse($maxDate),
        ];
    }

    private function getYearRangeForAll()
    {
        $invoiceMin = Invoice::min('date');
        $invoiceMax = Invoice::max('date');

        $posMin = Pos::min('date');
        $posMax = Pos::max('date');

        $pettyMin = PettyCashTransaction::min('date');
        $pettyMax = PettyCashTransaction::max('date');

        $minDate = collect([$invoiceMin, $posMin, $pettyMin])->filter()->min();
        $maxDate = collect([$invoiceMax, $posMax, $pettyMax])->filter()->max();

        $min = $minDate ? Carbon::parse($minDate) : now()->subYears(3);
        $max = $maxDate ? Carbon::parse($maxDate) : now();

        if ($min->year === $max->year) {
            $min = $min->copy()->subYears(2);
        }

        return [
            'min' => $min,
            'max' => $max,
        ];
    }

    private function dateFilter($query, $start, $end, $month = null)
    {
        // 🔥 PRIORITAS monthFilter dulu
        if ($month) {
            return $query->whereMonth('date', $month);
        }

        if ($start && $end) {
            return $query->whereBetween('date', [$start, $end]);
        }

        return $query;
    }

    /*
    |--------------------------------------------------------------------------
    | KEUANGAN
    |--------------------------------------------------------------------------
    */
    private function getKeuanganData($start, $end, $groupBy, $monthFilter)
    {
        // dd($start, $end, $monthFilter);

        // ✅ SUMMARY (FULL CASHFLOW)
        $income =
            $this->dateFilter(PettyCashTransaction::where('type', 'income'), $start, $end, $monthFilter)->sum('amount') ?? 0;

        $expense =
            $this->dateFilter(PettyCashTransaction::where('type', 'expense'), $start, $end, $monthFilter)->sum('amount') ?? 0;

        

        // ✅ CASHFLOW (DYNAMIC)
        $cashflow = $this->generateCashflow($start, $end, $groupBy, $monthFilter);

        // ✅ PETTY CASH TABLE
        $pettyCash = $this->dateFilter(PettyCashTransaction::query(), $start, $end, $monthFilter)
            ->latest()
            ->get()
            ->map(fn ($i) => [
                'tanggal' => $i->date,
                'keterangan' => $i->description,
                'jenis' => $i->type === 'income' ? 'Modal' : 'Pengeluaran',
                'jumlah' => $i->type === 'income' ? $i->amount : -$i->amount,
            ]);

        // ✅ DAILY CASH (OPTIMIZED)
        $transactions = collect();

        $transactions = $transactions
            ->merge(
                $this->dateFilter(PettyCashTransaction::query(), $start, $end, $monthFilter)->get()->map(fn ($p) => [
                    'tanggal' => $p->date,
                    'modal' => $p->type === 'income' ? $p->amount : 0,
                    'pendapatan' => 0,
                    'pengeluaran' => $p->type === 'expense' ? $p->amount : 0,
                ])
            )
            // ->merge(
            //     $this->dateFilter(Invoice::query(), $start, $end, $monthFilter)->get()->map(fn ($i) => [
            //         'tanggal' => $i->date,
            //         'modal' => 0,
            //         'pendapatan' => $i->type === 'out' ? $i->total : 0,
            //         'pengeluaran' => $i->type === 'in' ? $i->total : 0,
            //     ])
            // )
            // ->merge(
            //     $this->dateFilter(Pos::query(), $start, $end, $monthFilter)->get()->map(fn ($p) => [
            //         'tanggal' => $p->date,
            //         'modal' => 0,
            //         'pendapatan' => $p->total,
            //         'pengeluaran' => 0,
            //     ])
            // )
            ->sortBy('tanggal')
            ->values();

        $saldo = 0;
        $dailyCash = $transactions->map(function ($item) use (&$saldo) {
            $saldo += $item['modal'] + $item['pendapatan'] - $item['pengeluaran'];
            return [...$item, 'saldo' => $saldo];
        });

        return [
            'summary' => [
                'income' => $income,
                'expense' => $expense,
                'net' => $income - $expense,
            ],
            'cashflow' => $cashflow,
            'pettyCash' => $pettyCash,
            'dailyCash' => $dailyCash,
        ];
    }

    private function generateCashflow($start, $end, $groupBy, $monthFilter)
    {
        if (!$start || !$end) {
            return collect([]);
        }
        // dd($start, $end, $groupBy, $monthFilter);

        // dd($this->calculateCash($start, $end, 'test', $monthFilter), $groupBy);
        // dd($this->generateTimeSeriesData($start, $end, $groupBy, fn ($start, $end, $label) => $this->calculateCash($start, $end, $label, $monthFilter)));

        return $this->generateTimeSeriesData($start, $end, $groupBy, fn ($start, $end, $label) => $this->calculateCash($start, $end, $label, $monthFilter));
    }

    private function generateTimeSeriesData($start, $end, $mode, $calculator)
    {
        if (!$start || !$end || $start->gt($end)) {
            return collect([]);
        }

        return $this->getTimeSeriesBuckets($start, $end, $mode)
            ->map(fn ($bucket) => $calculator($bucket['start'], $bucket['end'], $bucket['name']));
    }

    private function getTimeSeriesBuckets($start, $end, $mode)
    {
        $buckets = collect();

        if ($mode === 'yearly') {
            // 🎯 ambil tahun akhir
            $endYear = $end->year;

            $minYears = 3;
            $startYear = min($start->year, $endYear - ($minYears - 1));

            for ($year = $startYear; $year <= $endYear; $year++) {
                $date = Carbon::create($year);

                $buckets->push([
                    'name' => (string) $year,
                    'start' => $date->copy()->startOfYear(),
                    'end' => $date->copy()->endOfYear(),
                ]);
            }

            return $buckets;
        }

        // =========================
        // DEFAULT (monthly & daily)
        // =========================
        $current = $start->copy();

        if ($mode === 'monthly') {
            while ($current <= $end) {
                $buckets->push([
                    'name' => $current->format('M'),
                    'start' => $current->copy()->startOfMonth(),
                    'end' => $current->copy()->endOfMonth(),
                ]);

                $current = $current->addMonth();
            }
        }

        if ($mode === 'daily') {
            while ($current <= $end) {
                $buckets->push([
                    'name' => $current->format('d'),
                    'start' => $current->copy(),
                    'end' => $current->copy(),
                ]);

                $current = $current->addDay();
            }
        }

        return $buckets;
    }

    private function calculateCash($start, $end, $label, $monthFilter)
    {
        $queryIncome = PettyCashTransaction::where('type', 'income')
            ->whereBetween('date', [$start, $end]);

        $queryExpense = PettyCashTransaction::where('type', 'expense')
            ->whereBetween('date', [$start, $end]);

        // 🔥 hanya apply monthFilter kalau perlu
        if ($monthFilter) {
            $queryIncome->whereMonth('date', $monthFilter);
            $queryExpense->whereMonth('date', $monthFilter);
        }

        return [
            'name' => $label,
            'pendapatan' => (int) $queryIncome->sum('amount'),
            'pengeluaran' => (int) $queryExpense->sum('amount'),
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | STOK
    |--------------------------------------------------------------------------
    */
    private function getStokData($start, $end, $monthFilter)
    {
        $items = Item::all();

        $table = [];
        foreach($items as $item) {
            $movements = StockMovement::where('item_id', $item->id)->get();

            $hasMovement = $movements->isNotEmpty();

            $stok = $hasMovement
                ? optional($movements->first())->stock_before
                : $item->stock;

            $masuk = $hasMovement
                ? $movements->where('type', 'in')->sum('quantity')
                : 0;

            $keluar = $hasMovement
                ? $movements->where('type', 'out')->sum('quantity')
                : 0;

            $sisa = $item->stock;

            $table[] = [
                'barang' => $item->name,
                'stok' => $stok,
                'masuk' => $masuk,
                'keluar' => $keluar,
                'sisa' => $sisa,
                'status' => $sisa <= $item->min_stock ? 'Rendah' : 'Aman',
            ];
            
        }

        $chart = collect($table)
            ->sortByDesc(fn ($item) => $item['masuk'] + $item['keluar'])
            ->take(6)
            ->map(fn ($item) => [
                'name' => $item['barang'],
                'keluar' => $item['keluar'],
                'masuk' => $item['masuk'],
            ])
            ->values();

        return [
            'summary' => [
                'totalSku' => $items->count(),
                'lowStock' => $items->filter(fn ($item) => $item->stock <= $item->min_stock)->count(),
                'totalStock' => $items->sum('stock'),
                'badStockValue' => $items->sum(fn ($i) => $i->bad_stock * $i->purchase_price),
                'stockValue' => $items->sum(fn ($i) => ($i->stock - $i->bad_stock) * $i->purchase_price),
            ],
            'table' => $table,
            'chart' => $chart,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | PENJUALAN
    |--------------------------------------------------------------------------
    */

    private function getPenjualanData($start, $end, $monthFilter)
    {
        // =========================
        // 🔥 FILTER FUNCTION
        // =========================
        $applyDateFilter = function ($query, $column = 'date') use ($start, $end, $monthFilter) {
            if ($monthFilter) {
                $query->whereMonth($column, $monthFilter);
            } elseif ($start && $end) {
                $query->whereBetween($column, [$start, $end]);
            }
            return $query;
        };

        // =========================
        // 🔥 INVOICE (OUT)
        // =========================
        $invoiceQuery = DB::table('invoice_items as ii')
            ->join('invoices as i', 'i.id', '=', 'ii.invoice_id')
            ->leftJoin('items as it', 'it.id', '=', 'ii.item_id')
            ->leftJoin('categories as c', 'c.id', '=', 'it.category_id')
            ->where('i.type', 'out');

        $invoiceQuery = $applyDateFilter($invoiceQuery, 'i.date');

        $invoiceQuery = $invoiceQuery->selectRaw("
            ii.item_id,
            it.name as name,
            COALESCE(c.name, 'Lainnya') as category,
            SUM(ii.quantity) as qty,
            SUM(ii.total) as revenue,
            AVG(ii.total / NULLIF(ii.quantity,0)) as avg_price
        ")
        ->groupBy('ii.item_id', 'it.name', 'c.name');

        // =========================
        // 🔥 POS
        // =========================
        $posQuery = DB::table('pos_items as pi')
            ->join('pos as p', 'p.id', '=', 'pi.pos_id')
            ->leftJoin('items as it', 'it.name', '=', 'pi.item_name') // ⚠️ mapping by name
            ->leftJoin('categories as c', 'c.id', '=', 'it.category_id');

        $posQuery = $applyDateFilter($posQuery, 'p.date');

        $posQuery = $posQuery->selectRaw("
            it.id as item_id,
            pi.item_name as name,
            COALESCE(c.name, 'Lainnya') as category,
            SUM(pi.quantity) as qty,
            SUM(pi.total) as revenue,
            AVG(pi.total / NULLIF(pi.quantity,0)) as avg_price
        ")
        ->groupBy('it.id', 'pi.item_name', 'c.name');

        // =========================
        // 🔥 UNION ALL (SUPER PENTING)
        // =========================
        $sales = DB::query()
            ->fromSub(
                $invoiceQuery->unionAll($posQuery),
                'sales'
            )
            ->selectRaw("
                item_id,
                name,
                category,
                SUM(qty) as terjual,
                SUM(revenue) as revenue,
                AVG(avg_price) as avg_jual
            ")
            ->groupBy('item_id', 'name', 'category')
            ->get();

        // =========================
        // 🔥 HARGA BELI (DO)
        // =========================
        $doQuery = DB::table('delivery_order_items as doi')
            ->join('delivery_orders as d', 'd.id', '=', 'doi.delivery_order_id')
            ->where('d.type', 'in');

        $doQuery = $applyDateFilter($doQuery, 'd.date');

        $doItems = $doQuery
            ->selectRaw("
                doi.item_id,
                AVG(doi.price) as avg_beli
            ")
            ->groupBy('doi.item_id')
            ->pluck('avg_beli', 'item_id');

        // =========================
        // 🔥 FINAL MAP (RINGAN BANGET)
        // =========================
        $data = collect($sales)->map(function ($item) use ($doItems) {

            $avgBeli = $doItems[$item->item_id] ?? 0;
            $laba = $item->avg_jual - $avgBeli;

            return [
                'produk' => $item->name,
                'kategori' => $item->category,
                'avg_jual' => round($item->avg_jual),
                'avg_beli' => round($avgBeli),
                'terjual' => (int) $item->terjual,
                'revenue' => (int) $item->revenue,
                'margin' => $laba,
                'margin_percent' => $avgBeli > 0
                    ? round(($laba / $avgBeli) * 100, 1)
                    : 0,
            ];
        });

        // =========================
        // 🔥 SUMMARY
        // =========================
        $totalRevenue = $data->sum('revenue');

        $totalOrder =
            DB::table('invoices')
                ->where('type', 'out')
                ->when($start && $end, fn($q) => $q->whereBetween('date', [$start, $end]))
                ->when($monthFilter, fn($q) => $q->whereMonth('date', $monthFilter))
                ->count()
            +
            DB::table('pos')
                ->when($start && $end, fn($q) => $q->whereBetween('date', [$start, $end]))
                ->when($monthFilter, fn($q) => $q->whereMonth('date', $monthFilter))
                ->count();

        // =========================
        // 🔥 CHART PRODUK
        // =========================
        $chart = $data
            ->sortByDesc('terjual')
            ->take(10)
            ->map(fn ($i) => [
                'name' => $i['produk'],
                'value' => $i['terjual'],
            ])
            ->values();

        // =========================
        // 🔥 DONUT KATEGORI
        // =========================
        $categories = $data
            ->groupBy('kategori')
            ->map(fn ($items) => $items->sum('revenue'))
            ->map(fn ($value, $name) => [
                'name' => $name,
                'value' => $totalRevenue > 0
                    ? round(($value / $totalRevenue) * 100, 1)
                    : 0,
                'amount' => $value,
            ])
            ->sortByDesc('value')
            ->values();

        // =========================
        // 🔥 TABLE
        // =========================
        $table = $data->map(fn ($i) => [
            ...$i,
            'persen' => $totalRevenue > 0
                ? round(($i['revenue'] / $totalRevenue) * 100, 1)
                : 0,
        ]);

        return [
            'summary' => [
                'totalTerjual' => $data->sum('terjual'),
                'revenue' => $totalRevenue,
                'badStock' => DB::table('items')->sum('bad_stock'),
                'avgOrder' => $totalOrder > 0 ? $totalRevenue / $totalOrder : 0,
            ],
            'chart' => $chart,
            'categories' => $categories,
            'table' => $table,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | PENGELUARAN
    |--------------------------------------------------------------------------
    */
    private function getPengeluaranData($start, $end, $monthFilter, $category = null)
    {
        // ======================
        // 🔥 PEMBELIAN STOK
        // ======================
        $stok = $this->dateFilter(
            Invoice::where('type', 'in'),
            $start,
            $end,
            $monthFilter
        )->sum('total');

        // ======================
        // 🔥 PETTY CASH (FILTER CATEGORY)
        // ======================
        $pettyQuery = $this->dateFilter(
            PettyCashTransaction::where('type', 'expense'),
            $start,
            $end,
            $monthFilter
        );

        if ($category && $category !== 'all') {
            $pettyQuery->where('expense_category', $category);
        }

        $petty = $pettyQuery->get();

        // ======================
        // 🔥 BREAKDOWN
        // ======================
        $grouped = $petty->groupBy('expense_category')
            ->map(fn ($items) => $items->sum('amount'));

        $totalOps = $grouped->sum();
        $total = $stok + $totalOps;

        $breakdown = collect([
            ['category' => 'Pembelian Stok', 'amount' => $stok],
        ])->merge(
            $grouped->map(fn ($v, $k) => [
                'category' => $k ?? 'Lainnya',
                'amount' => $v
            ])
        )->map(fn ($item) => [
            ...$item,
            'persen' => $total > 0
                ? round(($item['amount'] / $total) * 100, 1)
                : 0,
        ])->values();

        // ======================
        // 🔥 TREND DATA (DINAMIS)
        // ======================
        $pettyTrendRaw = PettyCashTransaction::query()
            ->selectRaw('
                MONTH(date) as month,
                expense_category,
                SUM(amount) as total
            ')
            ->where('type', 'expense')
            ->when($start && $end, fn ($q) => $q->whereBetween('date', [$start, $end]))
            ->when($monthFilter, fn ($q) => $q->whereMonth('date', $monthFilter))
            ->when($category && $category !== 'all', fn ($q) => $q->where('expense_category', $category))
            ->groupBy('month', 'expense_category')
            ->get();

        $stokTrendRaw = Invoice::query()
            ->selectRaw('
                MONTH(date) as month,
                SUM(total) as total
            ')
            ->where('type', 'in')
            ->when($start && $end, fn ($q) => $q->whereBetween('date', [$start, $end]))
            ->when($monthFilter, fn ($q) => $q->whereMonth('date', $monthFilter))
            ->groupBy('month')
            ->get()
            ->keyBy('month');

        $topCategories = $pettyTrendRaw
            ->groupBy('expense_category')
            ->map(fn ($items) => $items->sum('total'))
            ->sortDesc()
            ->take(3)
            ->keys()
            ->values();

        $months = collect(range(1, 12));

        $trend = $months->map(function ($month) use ($pettyTrendRaw, $stokTrendRaw, $topCategories) {

            $label = Carbon::create()->month($month)->format('M');

            $row = [
                'name' => $label,
                'stok' => (int) ($stokTrendRaw[$month]->total ?? 0),
                'operasional' => 0,
            ];

            foreach ($topCategories as $cat) {
                $value = $pettyTrendRaw
                    ->where('month', $month)
                    ->where('expense_category', $cat)
                    ->sum('total');

                $row[$cat] = (int) $value;
                $row['operasional'] += $value;
            }

            return $row;
        });

        return [
            'summary' => [
                'total' => $total,
                'stok' => $stok,
                'operasional' => $totalOps,
            ],
            'breakdown' => $breakdown,
            'trend' => $trend, // 🔥 ini yang kamu butuh
            'categories' => $topCategories,
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | LABA RUGI
    |--------------------------------------------------------------------------
    */
    private function getLabaRugiData($start, $end, $groupBy, $monthFilter)
    {
        if (!$start || !$end) return [];

        // =========================
        // 🔥 FORMAT GROUPING SQL
        // =========================
        $format = match ($groupBy) {
            'daily' => '%Y-%m-%d',
            'monthly' => '%Y-%m',
            'yearly' => '%Y',
            default => '%Y-%m',
        };

        // =========================
        // 🔥 INVOICE OUT (PENDAPATAN)
        // =========================
        $invoiceOut = Invoice::query()
            ->selectRaw("
                DATE_FORMAT(date, '{$format}') as period,
                SUM(total) as total
            ")
            ->where('type', 'out')
            ->when($start && $end, fn ($q) => $q->whereBetween('date', [$start, $end]))
            ->when($monthFilter, fn ($q) => $q->whereMonth('date', $monthFilter))
            ->groupBy('period')
            ->pluck('total', 'period');

        // =========================
        // 🔥 POS (PENDAPATAN TAMBAHAN)
        // =========================
        $pos = Pos::query()
            ->selectRaw("
                DATE_FORMAT(date, '{$format}') as period,
                SUM(total) as total
            ")
            ->when($start && $end, fn ($q) => $q->whereBetween('date', [$start, $end]))
            ->when($monthFilter, fn ($q) => $q->whereMonth('date', $monthFilter))
            ->groupBy('period')
            ->pluck('total', 'period');

        // =========================
        // 🔥 INVOICE IN (HPP)
        // =========================
        $invoiceIn = Invoice::query()
            ->selectRaw("
                DATE_FORMAT(date, '{$format}') as period,
                SUM(total) as total
            ")
            ->where('type', 'in')
            ->when($start && $end, fn ($q) => $q->whereBetween('date', [$start, $end]))
            ->when($monthFilter, fn ($q) => $q->whereMonth('date', $monthFilter))
            ->groupBy('period')
            ->pluck('total', 'period');

        // =========================
        // 🔥 PETTY CASH (BEBAN OPS)
        // =========================
        $petty = PettyCashTransaction::query()
            ->selectRaw("
                DATE_FORMAT(date, '{$format}') as period,
                SUM(amount) as total
            ")
            ->where('type', 'expense')
            ->when($start && $end, fn ($q) => $q->whereBetween('date', [$start, $end]))
            ->when($monthFilter, fn ($q) => $q->whereMonth('date', $monthFilter))
            ->groupBy('period')
            ->pluck('total', 'period');

        // =========================
        // 🔥 GENERATE PERIOD LIST
        // =========================
        $periods = collect();
        $current = $start->copy();

        while ($current <= $end) {
            $periodKey = match ($groupBy) {
                'daily' => $current->format('Y-m-d'),
                'monthly' => $current->format('Y-m'),
                'yearly' => $current->format('Y'),
            };

            $label = match ($groupBy) {
                'daily' => $current->format('d'),
                'monthly' => $current->format('M'),
                'yearly' => $current->format('Y'),
            };

            $periods->push([
                'key' => $periodKey,
                'label' => $label,
            ]);

            $current = match ($groupBy) {
                'daily' => $current->addDay(),
                'monthly' => $current->addMonth(),
                'yearly' => $current->addYear(),
            };
        }

        // =========================
        // 🔥 BUILD FINAL DATA
        // =========================
        $chart = $periods->map(function ($p) use ($invoiceOut, $pos, $invoiceIn, $petty, $groupBy) {

            $pendapatan = (int) ($invoiceOut[$p['key']] ?? 0) + (int) ($pos[$p['key']] ?? 0);
            $hpp = (int) ($invoiceIn[$p['key']] ?? 0);
            $beban = (int) ($petty[$p['key']] ?? 0);
            $laba = $pendapatan - $hpp - $beban;

            // 🔥 dynamic label
            $tanggal = null;
            $bulan = null;

            if ($groupBy === 'daily') {
                $tanggal = Carbon::parse($p['key'])->format('d M Y'); // 16 Apr 2026
                $bulan = Carbon::parse($p['key'])->format('M');       // Apr
            }

            if ($groupBy === 'monthly') {
                $bulan = Carbon::parse($p['key'])->format('M Y');     // Apr 2026
            }

            if ($groupBy === 'yearly') {
                $bulan = $p['key']; // 2026
            }

            return [
                'name' => $p['label'], // tetap untuk chart
                'tanggal' => $tanggal,
                'bulan' => $bulan,

                'sort_date' => $p['key'],

                'pendapatan' => $pendapatan,
                'hpp' => $hpp,
                'bebanOps' => $beban,
                'labaBersih' => $laba,
                'margin' => $pendapatan > 0
                    ? round(($laba / $pendapatan) * 100, 1)
                    : 0,
            ];
        });

        // =========================
        // 🔥 SUMMARY (DARI CHART)
        // =========================
        $summary = $chart->reduce(function ($carry, $item) {
            $carry['pendapatan'] += $item['pendapatan'];
            $carry['hpp'] += $item['hpp'];
            $carry['bebanOps'] += $item['bebanOps'];
            $carry['labaBersih'] += $item['labaBersih'];
            return $carry;
        }, [
            'pendapatan' => 0,
            'hpp' => 0,
            'bebanOps' => 0,
            'labaBersih' => 0,
        ]);

        $summary['margin'] = $summary['pendapatan'] > 0
            ? round(($summary['labaBersih'] / $summary['pendapatan']) * 100, 1)
            : 0;

        return [
            'summary' => $summary,
            'chart' => $chart,
            'table' => $chart->sortBy('sort_date')->values(),
        ];
    }

    // private function generateLabaRugiChart($start, $end, $groupBy, $monthFilter)
    // {
    //     return $this->generateTimeSeriesData(
    //         $start,
    //         $end,
    //         $groupBy,
    //         fn ($start, $end, $label) => $this->calculateLaba($start, $end, $label, $monthFilter)
    //     );
    // }

    // private function calculateLaba($start, $end, $label, $monthFilter)
    // {
    //     $pendapatan =
    //         $this->dateFilter(Invoice::where('type', 'out'), $start, $end, $monthFilter)->sum('total') +
    //         $this->dateFilter(Pos::query(), $start, $end, $monthFilter)->sum('total');

    //     $hpp =
    //         $this->dateFilter(Invoice::where('type', 'in'), $start, $end, $monthFilter)->sum('total');

    //     $beban =
    //         $this->dateFilter(PettyCashTransaction::where('type', 'expense'), $start, $end, $monthFilter)->sum('amount');

    //     $laba = $pendapatan - $hpp - $beban;

    //     return [
    //         'name' => $label,
    //         'pendapatan' => $pendapatan,
    //         'hpp' => $hpp,
    //         'bebanOps' => $beban,
    //         'labaBersih' => $laba,
    //         'margin' => $pendapatan > 0 ? round(($laba / $pendapatan) * 100, 1) : 0,
    //     ];
    // }
}