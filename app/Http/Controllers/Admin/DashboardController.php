<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DeliveryOrder;
use App\Models\Invoice;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index() {

        /* ======================
        SUMMARY STATS
        ====================== */

        $totalProduct = Item::count();

        $totalStock = Item::sum('stock');

        $totalPendapatan =
            Invoice::where('type', 'out')->sum('paid')
            - Invoice::where('type', 'in')->sum('paid');

        $totalStockMenipis = Item::whereColumn('stock', '<=', 'min_stock')->count();


        /* ======================
        TRANSACTIONS
        ====================== */

        $transactions = DeliveryOrder::withCount('items')
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($do) {

                $company = $do->type === 'in'
                    ? optional($do->supplier)->name
                    : optional($do->customer)->name;

                return [
                    "id" => (string) $do->id,
                    "company" => $company ?? "-",
                    "date" => $do->date->format('Y-m-d'),
                    "itemCount" => $do->items_count,
                    "amount" => (float) $do->total_amount,
                    "status" => $do->status,
                    "type" => $do->type,
                ];
            });


        /* ======================
        LOW STOCK PRODUCTS
        ====================== */

        $lowStockProducts = Item::whereColumn('stock', '<=', 'min_stock')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    "id" => (string) $item->id,
                    "name" => $item->name,
                    "emoji" => "📦",
                    "stock" => $item->stock,
                    "minStock" => $item->min_stock,
                    "unit" => optional($item->unit)->name ?? "pcs",
                ];
            });


        /* ======================
        UNPAID INVOICES
        ====================== */

        $unpaidInvoices = Invoice::where('remaining', '>', 0)
            ->where('type', 'out')
            ->latest()
            ->limit(5)
            ->get()
            ->map(function ($invoice) {

                $company = optional($invoice->customer)->name
                    ?? optional($invoice->supplier)->name;

                return [
                    "id" => (string) $invoice->id,
                    "invoiceNumber" => $invoice->invoice_number,
                    "company" => $company ?? "-",
                    "amount" => (float) $invoice->remaining,
                ];
            });


        /* ======================
        RETURN TO FRONTEND
        ====================== */

        return Inertia::render('dashboard', [
            'userName' => Auth::user()->name,

            'totalProduct' => (int) $totalProduct,
            'totalStock' => (int) $totalStock,
            'totalPendapatan' => (float) $totalPendapatan,
            'totalStockMenipis' => (int) $totalStockMenipis,

            'transactions' => $transactions ?? [],
            'lowStockProducts' => $lowStockProducts ?? [],
            'unpaidInvoices' => $unpaidInvoices ?? [],
        ]);
    }
}
