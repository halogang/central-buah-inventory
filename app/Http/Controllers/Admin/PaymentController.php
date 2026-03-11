<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function store(Request $request)
    {

        $validated = $request->validate([

            'invoice_id' => 'required|exists:invoices,id',
            'amount' => 'required|numeric|min:1',
            'method' => 'required|string',
            'note' => 'nullable|string'

        ]);

        DB::transaction(function () use ($validated, $request) {

            $invoice = Invoice::find($validated['invoice_id']);

            if ($request->hasFile('evidence')) {

                $validated['evidence'] = $request
                    ->file('evidence')
                    ->store('payments','public');

            }

            $validated['date'] = now();

            Payment::create($validated);

            $paid = $invoice->payments()->sum('amount');
            $remaining = $invoice->total - $paid;

            $status = 'unpaid';

            if ($remaining <= 0) {
                $status = 'paid';
            } elseif ($paid > 0) {
                $status = 'partial';
            }

            $invoice->update([
                'paid' => $paid,
                'remaining' => $remaining,
                'status' => $status
            ]);

        });

        return back()->with('success','Pembayaran berhasil');
    }
}
