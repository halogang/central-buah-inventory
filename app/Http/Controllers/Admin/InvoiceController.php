<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\PaymentMethod;
use App\Models\WebsiteInfo;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $invoices = Invoice::with([
            'items.item',
            'payments'
        ])
        ->latest()
        ->get()
        ->map(function ($invoice) {

            return [

                'id' => $invoice->id,
                'invoiceNumber' => $invoice->invoice_number,
                'date' => $invoice->date,

                'total' => $invoice->total,
                'paid' => $invoice->paid,
                'remaining' => $invoice->remaining,

                'status' => $invoice->status,
                'type' => $invoice->type,

                'itemsCount' => $invoice->items->count(),
                'invoiceItems' => $invoice->items,
                'payments' => $invoice->payments, 

                'deliveryOrder' => $invoice->deliveryOrder?->do_number,

                'customer' => $invoice->deliveryOrder?->customer?->name,
                'supplier' => $invoice->deliveryOrder?->supplier?->name,

            ];

        });

        $summary = [

            'totalIn' => Invoice::where('type', 'in')->sum('total'),
            'remainingIn' => Invoice::where('type', 'in')->sum('remaining'),
            'paidIn' => Invoice::where('type', 'in')->sum('paid'),

            'totalOut' => Invoice::where('type', 'out')->sum('total'),
            'remainingOut' => Invoice::where('type', 'out')->sum('remaining'),
            'paidOut' => Invoice::where('type', 'out')->sum('paid'),

        ];

        $paymentMethods = PaymentMethod::where('status', 'active')->get();

        return Inertia::render('admin/Invoice/Index', [
            'invoices' => $invoices,
            'summary' => $summary,
            'paymentMethods' => $paymentMethods
        ]);
    }

    public function print(Invoice $invoice)
    {

        $invoice = Invoice::with([
            'deliveryOrder',
            'customer',
            'supplier',
            'items',
            'payments'
        ])->findOrFail($invoice->id);
        $websiteInfo = WebsiteInfo::first();

        $pdf = Pdf::loadView('pdf.invoice', [
            'invoice' => $invoice,
            'websiteInfo' => $websiteInfo
        ])->setPaper('A4', 'portrait');

        $fileName = str_replace('/', '-', $invoice->invoice_number);

        return $pdf->stream($fileName.'.pdf');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
