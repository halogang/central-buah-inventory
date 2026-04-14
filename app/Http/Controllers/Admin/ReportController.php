<?php

// namespace App\Http\Controllers\Admin;

// use App\Http\Controllers\Controller;
// use App\Models\Invoice;
// use App\Models\InvoiceItem;
// use App\Models\Item;
// use App\Models\PettyCashTransaction;
// use App\Models\Pos;
// use App\Models\PosItem;
// use Carbon\Carbon;
// use Illuminate\Http\Request;
// use Inertia\Inertia;

// class ReportController extends Controller
// {

//     private function dateFilter($query, $start, $end)
//     {
//         return $start && $end
//             ? $query->whereBetween('date', [$start, $end])
//             : $query;
//     }
//     /**
//      * Display a listing of the resource.
//      */
//     public function index(Request $request)
//     {

//         $month = $request->month;
//         $year = $request->year;

//         $start = ($month && $year)
//             ? Carbon::create($year, $month)->startOfMonth()
//             : null;

//         $end = ($month && $year)
//             ? Carbon::create($year, $month)->endOfMonth()
//             : null;

//         return Inertia::render('admin/Report/Index', [
//             'filters' => [
//                 'month' => $month,
//                 'year' => $year,
//             ],
            
//             'keuangan' => $this->getKeuanganData($start, $end, $year, $month),
//             'stok' => $this->getStokData(),
//             'penjualan' => $this->getPenjualanData($start, $end),
//             'pengeluaran' => $this->getPengeluaranData($start, $end),
//             'labaRugi' => $this->getLabaRugiData($start, $end, $year),
//         ]);
//     }

//     private function getKeuanganData($start, $end, $year, $month)
//     {
//         // $invoiceOut = $this->dateFilter(Invoice::where('type', 'out'), $start, $end)->sum('total');
//         // $pos = $this->dateFilter(Pos::query(), $start, $end)->sum('total');
//         $pettyIncome = $this->dateFilter(PettyCashTransaction::where('type', 'income'), $start, $end)->sum('amount');

//         // $invoiceIn = $this->dateFilter(Invoice::where('type', 'in'), $start, $end)->sum('total');
//         $pettyExpense = $this->dateFilter(PettyCashTransaction::where('type', 'expense'), $start, $end)->sum('amount');

//         // CASHFLOW (12 bulan tetap)
//         $year = $year ?? now()->year;

//         ['start' => $start, 'end' => $end, 'groupBy' => $groupBy] = $this->getDateRange($month, $year);

//         $cashflow = $this->generateCashflow($start, $end, $groupBy);

//         // PETTY CASH
//         $pettyCash = $this->dateFilter(PettyCashTransaction::query(), $start, $end)
//             ->latest()
//             ->get()
//             ->map(fn ($i) => [
//                 'tanggal' => $i->date,
//                 'keterangan' => $i->description,
//                 'jenis' => $i->type === 'income' ? 'Modal' : 'Pengeluaran',
//                 'jumlah' => $i->type === 'income' ? $i->amount : -$i->amount,
//             ]);

//         // DAILY CASH
//         $daily = collect();

//         foreach ($this->dateFilter(PettyCashTransaction::query(), $start, $end)->get() as $p) {
//             $daily->push([
//                 'tanggal' => $p->date,
//                 'modal' => $p->type === 'income' ? $p->amount : null,
//                 'pendapatan' => null,
//                 'pengeluaran' => $p->type === 'expense' ? $p->amount : null,
//             ]);
//         }

//         foreach ($this->dateFilter(Invoice::query(), $start, $end)->get() as $inv) {
//             $daily->push([
//                 'tanggal' => $inv->date,
//                 'modal' => null,
//                 'pendapatan' => $inv->type === 'out' ? $inv->total : null,
//                 'pengeluaran' => $inv->type === 'in' ? $inv->total : null,
//             ]);
//         }

//         foreach ($this->dateFilter(Pos::query(), $start, $end)->get() as $p) {
//             $daily->push([
//                 'tanggal' => $p->date,
//                 'modal' => null,
//                 'pendapatan' => $p->total,
//                 'pengeluaran' => null,
//             ]);
//         }

//         $daily = $daily->sortBy('tanggal')->values();

//         $saldo = 0;
//         $daily = $daily->map(function ($item) use (&$saldo) {
//             $saldo += ($item['modal'] ?? 0);
//             $saldo += ($item['pendapatan'] ?? 0);
//             $saldo -= ($item['pengeluaran'] ?? 0);

//             return [...$item, 'saldo' => $saldo];
//         });

//         return [
//             'summary' => [
//                 'income' => $pettyIncome,
//                 'expense' => $pettyExpense,
//                 'net' => $pettyIncome - $pettyExpense,
//             ],
//             'cashflow' => $cashflow,
//             'pettyCash' => $pettyCash,
//             'dailyCash' => $daily,
//         ];
//     }

//     private function getStokData()
//     {
//         $items = Item::all();

//         // Summary
//         $totalSku = $items->count();
//         $lowStockItems = $items->filter(fn ($i) => $i->stock <= $i->min_stock);
//         $lowStock = $lowStockItems->count();
//         $totalStock = $items->sum('stock');
//         $stockValue = $items->sum(fn ($i) => $i->stock * $i->purchase_price);

//         // Table
//         $table = $items->map(function ($item) {
//             return [
//                 'barang' => $item->name,
//                 'stok' => $item->stock,
//                 'masuk' => 0,   // nanti bisa ambil dari DO IN
//                 'keluar' => 0,  // nanti dari DO OUT / POS
//                 'sisa' => $item->stock,
//                 'status' => $item->stock <= $item->min_stock ? 'Rendah' : 'Aman',
//             ];
//         });

//         // Chart (sementara simple)
//         $chart = $items->take(6)->map(fn ($i) => [
//             'name' => $i->name,
//             'masuk' => rand(50, 200),
//             'keluar' => rand(30, 180),
//         ]);

//         return [
//             'summary' => [
//                 'totalSku' => $totalSku,
//                 'lowStock' => $lowStock,
//                 'totalStock' => $totalStock,
//                 'stockValue' => $stockValue,
//             ],
//             'table' => $table,
//             'chart' => $chart,
//         ];
//     }

//     private function getPenjualanData($start, $end)
//     {
//         $invoice = InvoiceItem::whereHas('invoice', function ($q) use ($start, $end) {
//             $q->where('type', 'out');
//             if ($start && $end) $q->whereBetween('date', [$start, $end]);
//         })->with('item')->get();

//         $pos = PosItem::whereHas('pos', function ($q) use ($start, $end) {
//             if ($start && $end) $q->whereBetween('date', [$start, $end]);
//         })->get();

//         $merged = collect();

//         foreach ($invoice as $i) {
//             $merged->push([
//                 'name' => $i->item->name,
//                 'qty' => $i->quantity,
//                 'revenue' => $i->total,
//             ]);
//         }

//         foreach ($pos as $p) {
//             $merged->push([
//                 'name' => $p->item_name,
//                 'qty' => $p->quantity,
//                 'revenue' => $p->total,
//             ]);
//         }

//         $grouped = $merged->groupBy('name')->map(fn ($items) => [
//             'produk' => $items->first()['name'],
//             'terjual' => $items->sum('qty'),
//             'revenue' => $items->sum('revenue'),
//         ])->values();

//         $totalRevenue = $grouped->sum('revenue');

//         $table = $grouped->map(fn ($item) => [
//             ...$item,
//             'persen' => $totalRevenue > 0 ? round(($item['revenue'] / $totalRevenue) * 100, 1) : 0,
//         ]);

//         $badStock = Item::sum('bad_stock');

//         $totalOrder = Invoice::where('type', 'out')->count() + Pos::count();

//         $avgOrder = $totalOrder > 0 ? $totalRevenue / $totalOrder : 0;

//         return [
//             'summary' => [
//                 'totalTerjual' => $grouped->sum('terjual'),
//                 'revenue' => $totalRevenue,
//                 'badStock' => $badStock,
//                 'avgOrder' => $avgOrder,
//             ],
//             'chart' => $grouped->map(fn ($i) => [
//                 'name' => $i['produk'],
//                 'value' => $i['terjual'],
//             ]),
//             'table' => $table,
//         ];
//     }

//     private function getPengeluaranData($start, $end)
//     {
//         $stok = $this->dateFilter(Invoice::where('type', 'in'), $start, $end)->sum('total');

//         $petty = $this->dateFilter(
//             PettyCashTransaction::where('type', 'expense'),
//             $start,
//             $end
//         )->get();

//         $grouped = $petty->groupBy('expense_category')
//             ->map(fn ($items) => $items->sum('amount'));

//         $totalOps = $grouped->sum();
//         $total = $stok + $totalOps;

//         $breakdown = collect([
//             ['category' => 'Pembelian Stok', 'amount' => $stok],
//         ])->merge(
//             $grouped->map(fn ($v, $k) => [
//                 'category' => $k ?? 'Lainnya',
//                 'amount' => $v
//             ])
//         )->map(fn ($item) => [
//             ...$item,
//             'persen' => $total > 0 ? round(($item['amount'] / $total) * 100, 1) : 0,
//         ]);

//         return [
//             'summary' => [
//                 'total' => $total,
//                 'stok' => $stok,
//                 'operasional' => $totalOps,
//             ],
//             'breakdown' => $breakdown->values(),
//         ];
//     }

//     private function getLabaRugiData($start = null, $end = null, $year = null)
//     {
//         $year = $year ?? now()->year;
//         $month = now()->month;

//         /*
//         |--------------------------------------------------------------------------
//         | DATA PER BULAN (UNTUK CHART & TABLE)
//         |--------------------------------------------------------------------------
//         */
//         $months = collect(range(1, $month))->map(function ($m) use ($year) {
//             $startMonth = Carbon::create($year, $m)->startOfMonth();
//             $endMonth = Carbon::create($year, $m)->endOfMonth();

//             $pendapatan =
//                 Invoice::where('type', 'out')->whereBetween('date', [$startMonth, $endMonth])->sum('total')
//                 + Pos::whereBetween('date', [$startMonth, $endMonth])->sum('total');

//             $hpp = Invoice::where('type', 'in')
//                 ->whereBetween('date', [$startMonth, $endMonth])
//                 ->sum('total');

//             $beban = PettyCashTransaction::where('type', 'expense')
//                 ->whereBetween('date', [$startMonth, $endMonth])
//                 ->sum('amount');

//             $laba = $pendapatan - $hpp - $beban;

//             return [
//                 'month_number' => $m,
//                 'bulan' => Carbon::create($year, $m)->format('M Y'), // ✅ FIX YEAR
//                 'name' => Carbon::create($year, $m)->format('M'),   // ✅ untuk chart
//                 'pendapatan' => $pendapatan,
//                 'hpp' => $hpp,
//                 'bebanOps' => $beban,
//                 'labaBersih' => $laba,
//                 'margin' => $pendapatan > 0
//                     ? round(($laba / $pendapatan) * 100, 1)
//                     : 0,
//             ];
//         });

//         /*
//         |--------------------------------------------------------------------------
//         | SUMMARY (TOTAL / FILTERED)
//         |--------------------------------------------------------------------------
//         */

//         if ($start && $end) {
//             // ✅ kalau filter aktif (per bulan)
//             $pendapatan =
//                 Invoice::where('type', 'out')->whereBetween('date', [$start, $end])->sum('total')
//                 + Pos::whereBetween('date', [$start, $end])->sum('total');

//             $hpp = Invoice::where('type', 'in')->whereBetween('date', [$start, $end])->sum('total');

//             $beban = PettyCashTransaction::where('type', 'expense')->whereBetween('date', [$start, $end])->sum('amount');
//         } else {
//             // ✅ TANPA FILTER → TOTAL SEMUA DATA
//             $pendapatan =
//                 Invoice::where('type', 'out')->sum('total')
//                 + Pos::sum('total');

//             $hpp = Invoice::where('type', 'in')->sum('total');

//             $beban = PettyCashTransaction::where('type', 'expense')->sum('amount');
//         }

//         $laba = $pendapatan - $hpp - $beban;

//         return [
//             'summary' => [
//                 'pendapatan' => $pendapatan,
//                 'hpp' => $hpp,
//                 'bebanOps' => $beban,
//                 'labaBersih' => $laba,
//                 'margin' => $pendapatan > 0
//                     ? round(($laba / $pendapatan) * 100, 1)
//                     : 0,
//             ],
//             'chart' => $months, // ✅ sudah ada name
//             'table' => $months->sortByDesc('month_number')->values(),
//         ];
//     }

//     private function getDateRange($month, $year)
//     {
//         if ($month && $year) {
//             return [
//                 'start' => Carbon::create($year, $month)->startOfMonth(),
//                 'end' => Carbon::create($year, $month)->endOfMonth(),
//                 'groupBy' => 'day',
//             ];
//         }

//         if ($year) {
//             return [
//                 'start' => Carbon::create($year)->startOfYear(),
//                 'end' => Carbon::create($year)->endOfYear(),
//                 'groupBy' => 'month',
//             ];
//         }

//         return [
//             'start' => null,
//             'end' => null,
//             'groupBy' => 'month',
//         ];
//     }

//     private function generateCashflow($start, $end, $groupBy)
//     {
//         $data = [];

//         if ($groupBy === 'month') {
//             foreach (range(1, 12) as $m) {
//                 $startMonth = Carbon::create($start->year, $m)->startOfMonth();
//                 $endMonth = Carbon::create($start->year, $m)->endOfMonth();

//                 $data[] = [
//                     'name' => Carbon::create()->month($m)->format('M'),
//                     'pendapatan' => PettyCashTransaction::where('type', 'income')
//                         ->whereBetween('date', [$startMonth, $endMonth])
//                         ->sum('amount'),
//                     'pengeluaran' => PettyCashTransaction::where('type', 'expense')
//                         ->whereBetween('date', [$startMonth, $endMonth])
//                         ->sum('amount'),
//                 ];
//             }
//         }

//         if ($groupBy === 'day') {
//             $current = $start->copy();

//             while ($current <= $end) {
//                 $data[] = [
//                     'name' => $current->format('d'),
//                     'pendapatan' => PettyCashTransaction::where('type', 'income')
//                         ->whereDate('date', $current)
//                         ->sum('amount'),
//                     'pengeluaran' => PettyCashTransaction::where('type', 'expense')
//                         ->whereDate('date', $current)
//                         ->sum('amount'),
//                 ];

//                 $current->addDay();
//             }
//         }

//         return collect($data);
//     }
// }


// <?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Item;
use App\Models\PettyCashTransaction;
use App\Models\Pos;
use App\Models\PosItem;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
        // ✅ Normalize filter dari frontend
        $month = $request->month != -1 ? $request->month : null;
        $year  = $request->year != 0 ? $request->year : now()->year;

        ['start' => $start, 'end' => $end, 'groupBy' => $groupBy]
            = $this->getDateRange($month, $year);

        return Inertia::render('admin/Report/Index', [
            'filters' => [
                'month' => $month,
                'year' => $year,
            ],

            'keuangan' => $this->getKeuanganData($start, $end, $groupBy),
            'stok' => $this->getStokData(),
            'penjualan' => $this->getPenjualanData($start, $end),
            'pengeluaran' => $this->getPengeluaranData($start, $end),
            'labaRugi' => $this->getLabaRugiData($start, $end, $groupBy),
        ]);
    }

    /*
    |--------------------------------------------------------------------------
    | DATE HELPER (CORE FILTER)
    |--------------------------------------------------------------------------
    */
    private function getDateRange($month, $year)
    {
        if ($month && $year) {
            return [
                'start' => Carbon::create($year, $month)->startOfMonth(),
                'end' => Carbon::create($year, $month)->endOfMonth(),
                'groupBy' => 'day',
            ];
        }

        if ($year) {
            return [
                'start' => Carbon::create($year)->startOfYear(),
                'end' => Carbon::create($year)->endOfYear(),
                'groupBy' => 'month',
            ];
        }

        return [
            'start' => null,
            'end' => null,
            'groupBy' => 'month',
        ];
    }

    private function dateFilter($query, $start, $end)
    {
        return ($start && $end)
            ? $query->whereBetween('date', [$start, $end])
            : $query;
    }

    /*
    |--------------------------------------------------------------------------
    | KEUANGAN
    |--------------------------------------------------------------------------
    */
    private function getKeuanganData($start, $end, $groupBy)
    {
        // ✅ SUMMARY (FULL CASHFLOW)
        $income =
            $this->dateFilter(Invoice::where('type', 'out'), $start, $end)->sum('total') +
            $this->dateFilter(Pos::query(), $start, $end)->sum('total') +
            $this->dateFilter(PettyCashTransaction::where('type', 'income'), $start, $end)->sum('amount');

        $expense =
            $this->dateFilter(Invoice::where('type', 'in'), $start, $end)->sum('total') +
            $this->dateFilter(PettyCashTransaction::where('type', 'expense'), $start, $end)->sum('amount');

        // ✅ CASHFLOW (DYNAMIC)
        $cashflow = $this->generateCashflow($start, $end, $groupBy);

        // ✅ PETTY CASH TABLE
        $pettyCash = $this->dateFilter(PettyCashTransaction::query(), $start, $end)
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
                $this->dateFilter(PettyCashTransaction::query(), $start, $end)->get()->map(fn ($p) => [
                    'tanggal' => $p->date,
                    'modal' => $p->type === 'income' ? $p->amount : 0,
                    'pendapatan' => 0,
                    'pengeluaran' => $p->type === 'expense' ? $p->amount : 0,
                ])
            )
            ->merge(
                $this->dateFilter(Invoice::query(), $start, $end)->get()->map(fn ($i) => [
                    'tanggal' => $i->date,
                    'modal' => 0,
                    'pendapatan' => $i->type === 'out' ? $i->total : 0,
                    'pengeluaran' => $i->type === 'in' ? $i->total : 0,
                ])
            )
            ->merge(
                $this->dateFilter(Pos::query(), $start, $end)->get()->map(fn ($p) => [
                    'tanggal' => $p->date,
                    'modal' => 0,
                    'pendapatan' => $p->total,
                    'pengeluaran' => 0,
                ])
            )
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

    private function generateCashflow($start, $end, $groupBy)
    {
        if (!$start || !$end) return collect([]);

        $data = [];

        if ($groupBy === 'month') {
            foreach (range(1, 12) as $m) {
                $s = Carbon::create($start->year, $m)->startOfMonth();
                $e = Carbon::create($start->year, $m)->endOfMonth();

                $data[] = $this->calculateCash($s, $e, Carbon::create()->month($m)->format('M'));
            }
        }

        if ($groupBy === 'day') {
            $current = $start->copy();

            while ($current <= $end) {
                $data[] = $this->calculateCash($current, $current, $current->format('d'));
                $current->addDay();
            }
        }

        return collect($data);
    }

    private function calculateCash($start, $end, $label)
    {
        return [
            'name' => $label,
            'pendapatan' =>
                Invoice::where('type', 'out')->whereBetween('date', [$start, $end])->sum('total') +
                Pos::whereBetween('date', [$start, $end])->sum('total') +
                PettyCashTransaction::where('type', 'income')->whereBetween('date', [$start, $end])->sum('amount'),

            'pengeluaran' =>
                Invoice::where('type', 'in')->whereBetween('date', [$start, $end])->sum('total') +
                PettyCashTransaction::where('type', 'expense')->whereBetween('date', [$start, $end])->sum('amount'),
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | STOK
    |--------------------------------------------------------------------------
    */
    private function getStokData()
    {
        $items = Item::all();

        return [
            'summary' => [
                'totalSku' => $items->count(),
                'lowStock' => $items->where('stock', '<=', 'min_stock')->count(),
                'totalStock' => $items->sum('stock'),
                'stockValue' => $items->sum(fn ($i) => $i->stock * $i->purchase_price),
            ],
            'table' => $items->map(fn ($i) => [
                'barang' => $i->name,
                'stok' => $i->stock,
                'masuk' => 0,
                'keluar' => 0,
                'sisa' => $i->stock,
                'status' => $i->stock <= $i->min_stock ? 'Rendah' : 'Aman',
            ]),
            'chart' => $items->take(6)->map(fn ($i) => [
                'name' => $i->name,
                'masuk' => rand(50, 200),
                'keluar' => rand(30, 180),
            ]),
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | PENJUALAN
    |--------------------------------------------------------------------------
    */
    private function getPenjualanData($start, $end)
    {
        $invoice = InvoiceItem::whereHas('invoice', function ($q) use ($start, $end) {
            $q->where('type', 'out');
            if ($start && $end) $q->whereBetween('date', [$start, $end]);
        })->with('item')->get();

        $pos = PosItem::whereHas('pos', function ($q) use ($start, $end) {
            if ($start && $end) $q->whereBetween('date', [$start, $end]);
        })->get();

        $merged = collect();

        foreach ($invoice as $i) {
            $merged->push([
                'name' => $i->item->name,
                'qty' => $i->quantity,
                'revenue' => $i->total,
            ]);
        }

        foreach ($pos as $p) {
            $merged->push([
                'name' => $p->item_name,
                'qty' => $p->quantity,
                'revenue' => $p->total,
            ]);
        }

        $grouped = $merged->groupBy('name')->map(fn ($items) => [
            'produk' => $items->first()['name'],
            'terjual' => $items->sum('qty'),
            'revenue' => $items->sum('revenue'),
        ])->values();

        $totalRevenue = $grouped->sum('revenue');

        $totalOrder =
            Invoice::where('type', 'out')->count() +
            Pos::count();

        return [
            'summary' => [
                'totalTerjual' => $grouped->sum('terjual'),
                'revenue' => $totalRevenue,
                'badStock' => Item::sum('bad_stock'),
                'avgOrder' => $totalOrder > 0 ? $totalRevenue / $totalOrder : 0,
            ],
            'chart' => $grouped->map(fn ($i) => [
                'name' => $i['produk'],
                'value' => $i['terjual'],
            ]),
            'table' => $grouped->map(fn ($i) => [
                ...$i,
                'persen' => $totalRevenue > 0
                    ? round(($i['revenue'] / $totalRevenue) * 100, 1)
                    : 0,
            ]),
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | PENGELUARAN
    |--------------------------------------------------------------------------
    */
    private function getPengeluaranData($start, $end)
    {
        $stok = $this->dateFilter(Invoice::where('type', 'in'), $start, $end)->sum('total');

        $petty = $this->dateFilter(
            PettyCashTransaction::where('type', 'expense'),
            $start,
            $end
        )->get();

        $grouped = $petty->groupBy('expense_category')
            ->map(fn ($items) => $items->sum('amount'));

        $totalOps = $grouped->sum();
        $total = $stok + $totalOps;

        return [
            'summary' => [
                'total' => $total,
                'stok' => $stok,
                'operasional' => $totalOps,
            ],
            'breakdown' => collect([
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
            ])->values(),
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | LABA RUGI
    |--------------------------------------------------------------------------
    */
    private function getLabaRugiData($start, $end, $groupBy)
    {
        if (!$start || !$end) return [];

        $chart = $this->generateLabaRugiChart($start, $end, $groupBy);

        $pendapatan =
            Invoice::where('type', 'out')->whereBetween('date', [$start, $end])->sum('total') +
            Pos::whereBetween('date', [$start, $end])->sum('total');

        $hpp = Invoice::where('type', 'in')->whereBetween('date', [$start, $end])->sum('total');

        $beban = PettyCashTransaction::where('type', 'expense')
            ->whereBetween('date', [$start, $end])
            ->sum('amount');

        $laba = $pendapatan - $hpp - $beban;

        return [
            'summary' => [
                'pendapatan' => $pendapatan,
                'hpp' => $hpp,
                'bebanOps' => $beban,
                'labaBersih' => $laba,
                'margin' => $pendapatan > 0
                    ? round(($laba / $pendapatan) * 100, 1)
                    : 0,
            ],
            'chart' => $chart,
            'table' => $chart->sortByDesc('name')->values(),
        ];
    }

    private function generateLabaRugiChart($start, $end, $groupBy)
    {
        $data = [];

        if ($groupBy === 'month') {
            foreach (range(1, 12) as $m) {
                $s = Carbon::create($start->year, $m)->startOfMonth();
                $e = Carbon::create($start->year, $m)->endOfMonth();
                $data[] = $this->calculateLaba($s, $e, Carbon::create()->month($m)->format('M'));
            }
        }

        if ($groupBy === 'day') {
            $current = $start->copy();

            while ($current <= $end) {
                $data[] = $this->calculateLaba($current, $current, $current->format('d'));
                $current->addDay();
            }
        }

        return collect($data);
    }

    private function calculateLaba($start, $end, $label)
    {
        $pendapatan =
            Invoice::where('type', 'out')->whereBetween('date', [$start, $end])->sum('total') +
            Pos::whereBetween('date', [$start, $end])->sum('total');

        $hpp = Invoice::where('type', 'in')->whereBetween('date', [$start, $end])->sum('total');

        $beban = PettyCashTransaction::where('type', 'expense')
            ->whereBetween('date', [$start, $end])
            ->sum('amount');

        $laba = $pendapatan - $hpp - $beban;

        return [
            'name' => $label,
            'pendapatan' => $pendapatan,
            'hpp' => $hpp,
            'bebanOps' => $beban,
            'labaBersih' => $laba,
            'margin' => $pendapatan > 0 ? round(($laba / $pendapatan) * 100, 1) : 0,
        ];
    }
}