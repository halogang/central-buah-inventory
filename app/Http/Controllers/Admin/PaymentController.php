<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class PaymentController extends Controller
{
    private $uploadPath = '../../public_html/images/payment';
    private $savePath = '/images/payment';

    public function store(Request $request)
    {

        $validated = $request->validate([
            'invoice_id' => 'required|exists:invoices,id',
            'payment_method_id' => 'required|exists:payment_methods,id',
            'amount' => 'required|numeric|min:1',
            'note' => 'nullable|string',
            'evidence' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $invoice = Invoice::find($validated['invoice_id']);

        DB::transaction(function () use ($validated, $request, $invoice) {


            if ($request->hasFile('evidence')) {

                $validated['evidence'] = $request
                    ->file('evidence')
                    ->store('payments','public');

                $evidence = $request->file('evidence');

                $filename = time().'_'.$evidence->getClientOriginalName();

                $destination = public_path($this->uploadPath);

                // buat folder jika belum ada
                if (!File::exists($destination)) {
                    File::makeDirectory($destination, 0755, true);
                }

                $evidence->move($destination, $filename);

                $validated['evidence'] = $this->savePath.'/'.$filename;

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

        return back()->with(['success' => 'Pembayaran berhasil', 'invoice' => $invoice->fresh(['payments'])]);
    }
}
