<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\DeliveryOrderItem;
use App\Models\Invoice;
use App\Models\Item;
use App\Models\PettyCashTransaction;
use App\Models\Pos;
use App\Models\StockMovement;
use App\Models\WebsiteInfo;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Exports\ReportExport;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | MAIN INDEX
    |--------------------------------------------------------------------------
    */
    public function index(Request $request)
    {

        $month = $request->month;
        $year = $request->year;

        // 🔥 NORMALISASI
        $month = ($month === 'all' || $month == 0) ? null : (int) $month;
        $year = ($year === 'all' || $year == 0) ? null : (int) $year;

        $category = $request->category ?? null;
        
        try {
            ['start' => $start, 'end' => $end, 'groupBy' => $groupBy, 'monthFilter' => $monthFilter]
                = $this->getDateRange($month, $year);
        } catch (\Throwable $e) {
            dd($e->getMessage(), $e->getFile(), $e->getLine());
        }

        $export = $request->export;
        $tab = $request->tab;


        if ($export) {

            return $this->handleExport(
                $export,
                $tab,
                $start,
                $end,
                $groupBy,
                $request,
                $monthFilter,
                $category
            );
        }

        
        try {
            return Inertia::render('admin/Report/Index', [
                'filters' => [
                    'month' => $month ?? 0,
                    'year' => $year ?? 0,
                    'category' => $category,
                ],
    
    
                'keuangan' => $this->getKeuanganData($start, $end, $groupBy, $monthFilter),
                'stok' => $this->getStokData($start, $end, $monthFilter),
                'penjualan' => $this->getPenjualanData($start, $end, $monthFilter),
                'pengeluaran' => $this->getPengeluaranData($start, $end, $monthFilter, $groupBy, $category),
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
            ->leftJoin('items as it', 'it.id', '=', 'sales.item_id')
            ->selectRaw("
                sales.item_id,
                it.purchase_price as purchase_price,
                sales.name as name,
                sales.category as category,
                SUM(sales.qty) as terjual,
                SUM(sales.revenue) as revenue,
                AVG(sales.avg_price) as avg_jual
            ")
            ->groupBy('sales.item_id', 'sales.name', 'sales.category', 'it.purchase_price')
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
            $isEstimated = false;

            if (!$avgBeli || $avgBeli == 0) {
                $avgBeli = $item->purchase_price ?? 0;
                $isEstimated = true;
            }

            $totalJual = $item->revenue;
            $totalBeli = $avgBeli * $item->terjual;


            $laba = $totalJual - $totalBeli;

            return [
                'produk' => $item->name,
                'kategori' => $item->category,

                'avg_jual' => round($item->avg_jual),
                'avg_beli' => round($avgBeli),

                'terjual' => (int) $item->terjual,
                'revenue' => (int) $totalJual,

                'laba' => (int) $laba,

                'margin_percent' => $totalBeli > 0
                    ? round(($laba / $totalBeli) * 100, 1)
                    : 0,

                // 🔥 tambahan penting
                'is_estimated' => $isEstimated,
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
            'persen' => $i['margin_percent'],
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
    private function getPengeluaranData($start, $end, $monthFilter, $groupBy, $category = null)
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
                DATE(date) as full_date,
                MONTH(date) as month,
                expense_category,
                SUM(amount) as total
            ')
            ->where('type', 'expense')
            ->when($start && $end, fn ($q) => $q->whereBetween('date', [$start, $end]))
            ->when($monthFilter, fn ($q) => $q->whereMonth('date', $monthFilter))
            ->when($category && $category !== 'all', fn ($q) => $q->where('expense_category', $category))
            ->groupBy('full_date', 'month', 'expense_category')
            ->get();

        $stokTrendRaw = Invoice::query()
            ->selectRaw('
                DATE(date) as full_date,
                MONTH(date) as month,
                SUM(total) as total
            ')
            ->where('type', 'in')
            ->when($start && $end, fn ($q) => $q->whereBetween('date', [$start, $end]))
            ->when($monthFilter, fn ($q) => $q->whereMonth('date', $monthFilter))
            ->groupBy('full_date', 'month')
            ->get();

        $topCategories = $pettyTrendRaw
            ->groupBy('expense_category')
            ->map(fn ($items) => $items->sum('total'))
            ->sortDesc()
            ->take(3)
            ->keys()
            ->values();

        $allCategories = Category::where('type', 'pengeluaran')
            ->pluck('name');

        $periods = collect();
            $current = $start->copy();

            while ($current <= $end) {

                $key = match ($groupBy) {
                    'daily' => $current->format('Y-m-d'),
                    'monthly' => $current->format('Y-m'),
                    'yearly' => $current->format('Y'),
                };

                $label = match ($groupBy) {
                    'daily' => $current->format('d'),   // 🔥 tanggal
                    'monthly' => $current->format('M'), // 🔥 bulan
                    'yearly' => $current->format('Y'),
                };

                $periods->push([
                    'key' => $key,
                    'label' => $label,
                    'month' => $current->month, // tetap simpan untuk mapping SQL
                ]);

                $current = match ($groupBy) {
                    'daily' => $current->addDay(),
                    'monthly' => $current->addMonth(),
                    'yearly' => $current->addYear(),
                };
            }

        $trend = $periods->map(function ($p) use ($pettyTrendRaw, $stokTrendRaw, $allCategories, $groupBy) {

            $row = [
                'name' => $p['label'],
                'stok' => 0,
                'operasional' => 0,
            ];

            // 🔥 STOK
            if ($groupBy === 'monthly') {
                $row['stok'] = (int) ($stokTrendRaw->firstWhere('month', $p['month'])->total ?? 0);
            }

            // 🔥 PETTY
            foreach ($allCategories as $cat) {

                $value = $pettyTrendRaw
                    ->filter(function ($item) use ($p, $groupBy) {
                        return match ($groupBy) {
                            'daily' => $item->full_date === $p['key'],
                            'monthly' => $item->month == $p['month'],
                            'yearly' => Carbon::parse($item->full_date)->format('Y') === $p['key'],
                        };
                    })
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
            'categories' => $allCategories,
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

        $format = match ($groupBy) {
            'daily' => '%Y-%m-%d',
            'monthly' => '%Y-%m',
            'yearly' => '%Y',
            default => '%Y-%m',
        };

        // =========================
        // 🔥 PENDAPATAN (INVOICE OUT)
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
        // 🔥 POS
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
        // 🔥 HPP (FIXED)
        // =========================
        $hpp = DeliveryOrderItem::query()
            ->selectRaw("
                DATE_FORMAT(delivery_orders.date, '{$format}') as period,
                SUM((delivery_order_items.quantity - delivery_order_items.bad_stock) * items.purchase_price) as total
            ")
            ->join('delivery_orders', 'delivery_orders.id', '=', 'delivery_order_items.delivery_order_id')
            ->join('items', 'items.id', '=', 'delivery_order_items.item_id')
            ->where('delivery_orders.type', 'out')
            ->where('delivery_orders.status', 'done')
            ->when($start && $end, fn ($q) => $q->whereBetween('delivery_orders.date', [$start, $end]))
            ->when($monthFilter, fn ($q) => $q->whereMonth('delivery_orders.date', $monthFilter))
            ->groupBy('period')
            ->pluck('total', 'period');

        // =========================
        // 🔥 BEBAN
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
        // 🔥 PERIOD LOOP
        // =========================
        $periods = collect();
        $current = $start->copy();

        while ($current <= $end) {
            $key = match ($groupBy) {
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
                'key' => $key,
                'label' => $label,
            ]);

            $current = match ($groupBy) {
                'daily' => $current->addDay(),
                'monthly' => $current->addMonth(),
                'yearly' => $current->addYear(),
            };
        }

        // =========================
        // 🔥 FINAL DATA
        // =========================
        $chart = $periods->map(function ($p) use ($invoiceOut, $pos, $hpp, $petty, $groupBy) {

            $pendapatan = (int) ($invoiceOut[$p['key']] ?? 0) + (int) ($pos[$p['key']] ?? 0);
            $hppVal = (int) ($hpp[$p['key']] ?? 0);
            $beban = (int) ($petty[$p['key']] ?? 0);
            $laba = $pendapatan - $hppVal - $beban;

            return [
                'name' => $p['label'],
                'tanggal' => $groupBy === 'daily' ? $p['key'] : null,
                'bulan' => $groupBy !== 'daily' ? $p['label'] : null,
                'sort_date' => $p['key'],
                'pendapatan' => $pendapatan,
                'hpp' => $hppVal,
                'bebanOps' => $beban,
                'labaBersih' => $laba,
                'margin' => $pendapatan > 0
                    ? round(($laba / $pendapatan) * 100, 1)
                    : 0,
            ];
        });

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

    public function handleExport($type, $tab, $start, $end, $groupBy, $request, $monthFilter, $category = null)
    {
        $websiteInfo = WebsiteInfo::first();
        $company = [
            'name' => $websiteInfo->nama_usaha,
            'address' => $websiteInfo->alamat,
            'phone' => $websiteInfo->kontak,
        ];
        // $data = $this->getDataByTab($tab, $start, $end, $groupBy, $request);
        $data = match ($tab) {
            'keuangan' => $this->getKeuanganData($start, $end, $groupBy, $monthFilter),
            'stok' => $this->getStokData($start, $end, $request->month),
            'penjualan' => $this->getPenjualanData($start, $end, $monthFilter),
            'pengeluaran' => $this->getPengeluaranData($start, $end, $monthFilter, $groupBy, $category),
            'laba-rugi' => $this->getLabaRugiData($start, $end, $groupBy, $monthFilter),
            default => abort(404),
        };

        if ($type === 'pdf') {
            return $this->exportPdf($tab, $data, $request, $company);
        }

        if ($type === 'excel') {
            return $this->exportExcel($tab, $data, $request, $company);
        }
    }

    private function formatPeriod($month, $year)
    {
        $months = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember',
        ];

        $month = ($month === 'all' || $month == 0) ? null : (int) $month;
        $year  = ($year === 'all' || $year == 0) ? null : (int) $year;

        if ($month && $year) {
            return "{$months[$month]} {$year}";
        }

        if ($month && !$year) {
            return "{$months[$month]} (Semua Tahun)";
        }

        if (!$month && $year) {
            return "Tahun {$year}";
        }

        return "Semua Periode";
    }

    private function formatPeriodForFile($month, $year)
    {
        $months = [
            1 => 'januari',
            2 => 'februari',
            3 => 'maret',
            4 => 'april',
            5 => 'mei',
            6 => 'juni',
            7 => 'juli',
            8 => 'agustus',
            9 => 'september',
            10 => 'oktober',
            11 => 'november',
            12 => 'desember',
        ];

        $month = ($month === 'all' || $month == 0) ? null : (int) $month;
        $year = ($year === 'all' || $year == 0) ? null : (int) $year;

        if ($month && $year) {
            return "{$months[$month]}-{$year}";
        }

        if ($month && !$year) {
            return "{$months[$month]}-semua-tahun";
        }

        if (!$month && $year) {
            return "tahun-{$year}";
        }

        return "semua-periode";
    }
    
    private function exportPdf($tab, $data, $request, $company)
    {
        $view = "pdf.reports.$tab"; // contoh: exports.penjualan

        $filters = [
            'period' => $this->formatPeriod($request->month, $request->year),
        ];

        $title = match ($tab) {
            'keuangan' => 'Laporan Keuangan - ' .$filters['period'],
            'stok' => 'Laporan Stok - ' .$filters['period'],
            'penjualan' => 'Laporan Penjualan - ' .$filters['period'],
            'pengeluaran' => 'Laporan Pengeluaran - ' .$filters['period'],
            'laba-rugi' => 'Laporan Laba Rugi - ' .$filters['period'],
        };

        $periodFile = $this->formatPeriodForFile($request->month, $request->year);

        $pdf = Pdf::loadView($view, [
            'data' => $data,
            'tab' => $tab,
            'title' => $title,
            'filters' => $filters,
            'company' => $company
        ]);

        return $pdf->download("laporan-{$tab}-{$periodFile}.pdf");
    }

    private function exportExcel($tab, $data, $request, $company)
    {
        $filters = [
            'period' => $this->formatPeriod($request->month, $request->year),
        ];

        $periodFile = $this->formatPeriodForFile($request->month, $request->year);

        return Excel::download(
            new ReportExport($tab, $data, $filters, $company),
            "laporan-{$tab}-{$periodFile}.xlsx"
        );
    }
}