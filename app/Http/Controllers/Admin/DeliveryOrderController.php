<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\WebsiteInfo;
use App\Models\Cart;
use App\Models\DeliveryOrder;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Item;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Services\SignatureService;
use App\Services\DeliveryOrderService;

class DeliveryOrderController extends Controller
{
    private $evidenceUploadPath = '../../public_html/images/delivery-orders';
    private $evidenceSavePath = '/images/delivery-orders';

    private function validateRequest($request)
    {
        return $request->validate([
            'type' => 'required|in:in,out',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'customer_id' => 'nullable|exists:customers,id',
            'status' => 'required|in:draft,sent,done',

            'sender_name' => 'nullable|string|max:255',
            'receiver_name' => 'nullable|string|max:255',

            'note' => 'nullable|string',

            'sender_signature' => 'nullable|string',
            'receiver_signature' => 'nullable|string',

            'items.*.item_id' => 'required|exists:items,id',
            'items.*.quantity' => 'required|numeric|min:0',
            'items.*.bad_stock' => 'nullable|numeric|min:0',
            'items.*.price' => 'nullable|numeric|min:0',

            'items.*.cart_id' => 'nullable|exists:carts,id',
            'items.*.cart_qty' => 'nullable|numeric',
            'items.*.cart_weight' => 'nullable|numeric',
        ]);
    }

    public function index()
    {
        $deliveryOrders = DeliveryOrder::with([
            'supplier',
            'customer',
            'items.item',
            'items.cart',
        ])
        ->latest()
        ->get()
        ->map(function ($do) {

            return [
                'id' => $do->id,
                'do_number' => $do->do_number,
                'type' => $do->type,
                'date' => $do->date->format('Y-m-d'),

                'supplier_id' => $do->supplier_id,
                'supplier' => $do->supplier?->name,

                'customer_id' => $do->customer_id,
                'customer' => $do->customer?->name,

                'status' => $do->status,

                'sender_name' => $do->sender_name,
                'receiver_name' => $do->receiver_name,

                'sender_signature' => $do->sender_signature,
                'receiver_signature' => $do->receiver_signature,
                'evidence' => $do->evidence,

                'sender_signature_url' => $do->sender_signature_url,
                'receiver_signature_url' => $do->receiver_signature_url,
                'evidence_url' => $do->evidence_url,

                'notes' => $do->notes,

                'items_count' => $do->items->count(),
                'total_quantity' => $do->items->sum('quantity'),

                // 🔥 items untuk edit
                'items' => $do->items->map(function ($item) {

                    return [
                        'item_id' => $item->item_id,
                        'name' => $item->item?->name,
                        'cart' => $item->cart,
                        'cart_id' => $item->cart_id,
                        'cart_weight' => $item->cart_weight,
                        'cart_qty' => $item->cart_qty,
                        'image' => $item->item?->image,
                        'image_url' => $item->item?->image,
                        'unit' => $item->item?->unit?->unit_code,

                        'quantity' => $item->quantity,
                        'bad_stock' => $item->bad_stock,
                        'price' => $item->price,
                    ];

                }),

                //cart
                'cart_id' => $do->cart_id,
                'cart_name' => $do->cart?->name,
                'cart_qty' => $do->cart_qty,
                'cart_weight' => $do->cart_weight,
                'total_weight' => $do->items->sum('quantity') + ($do->cart_weight * $do->cart_qty),
            ];

        });

        return Inertia::render('admin/DeliveryOrder/Index', [
            'deliveryOrders' => $deliveryOrders,
            'suppliers' => Supplier::select('id','name')->get(),
            'items' => Item::with('unit')->get(),
            'customers' => Customer::select('id','name','phone')->get(),
            'carts' => Cart::select('id','name')->get(),
        ]);
    }

    public function store(Request $request, SignatureService $signatureService, DeliveryOrderService $service)
    {
        $validated = $this->validateRequest($request);

        DB::transaction(function () use ($validated, $signatureService, $service) {

            $doNumber = $this->generateDoNumber($validated['type']);
            $user = Auth::user();

            if ($validated['type'] === 'in') {
                $validated['receiver_name'] = $user->name;
                $validated['receiver_signature'] = $user->signature ?? null;

                if ($validated['sender_signature'] && str_contains($validated['sender_signature'], 'base64')) {

                    $validated['sender_signature'] =
                        $validated['sender_signature'] = $signatureService->saveBase64(
                            $validated['sender_signature'],
                        );
                }
            } else {
                $validated['sender_name'] = $user->name;
                $validated['sender_signature'] = $user->signature ?? null;

                if ($validated['receiver_signature'] && str_contains($validated['receiver_signature'], 'base64')) {
    
                    $validated['receiver_signature'] =
                        $validated['receiver_signature'] = $signatureService->saveBase64(
                            $validated['receiver_signature'],
                        );
                }
            }

            $deliveryOrder = DeliveryOrder::create([
                ...$validated,
                'do_number' => $doNumber,
                'date' => now(),
            ]);

            [$totalAmount, $totalWeight] = $service->handleItems($deliveryOrder, $validated['items']);

            if ($validated['status'] === 'done') {
                $service->updateStock($deliveryOrder, $validated['items']);
            }

            // update total amount
            $deliveryOrder->update([
                'total_amount' => $totalAmount,
                'total_weight' => $totalWeight
            ]);

            // auto create invoice
            $isInvoiceCreated = Invoice::where('delivery_order_id', $deliveryOrder->id)->exists();

            if ($validated['status'] === 'done' && !$isInvoiceCreated) {
                $this->createInvoice($deliveryOrder);
            }

        });

        return back()->with('success', 'Surat jalan berhasil dibuat');
    }

    public function update(
        Request $request,
        DeliveryOrder $deliveryOrder,
        SignatureService $signatureService,
        DeliveryOrderService $service
    ) {
        $validated = $this->validateRequest($request);

        $user = Auth::user();

        // 🔥 Set default sender/receiver
        if ($validated['type'] === 'in') {
            $validated['receiver_name'] = $user->name;
            $validated['receiver_signature'] = $user->signature ?? null;
        } else {
            $validated['sender_name'] = $user->name;
            $validated['sender_signature'] = $user->signature ?? null;
        }

        DB::transaction(function () use (
            $request,
            &$validated,
            $deliveryOrder,
            $signatureService,
            $service
        ) {

            /**
             * 1️⃣ Rollback stock jika sebelumnya DONE
             */
            if ($deliveryOrder->status === 'done') {
                $service->rollbackStock($deliveryOrder);
            }

            /**
             * 2️⃣ Handle evidence upload
             */
            if ($request->hasFile('evidence')) {

                if ($deliveryOrder->evidence && File::exists(public_path($deliveryOrder->evidence))) {
                    File::delete(public_path($deliveryOrder->evidence));
                }

                $file = $request->file('evidence');
                $filename = time().'_'.$file->getClientOriginalName();

                $destination = public_path($this->evidenceUploadPath);

                if (!File::exists($destination)) {
                    File::makeDirectory($destination, 0755, true);
                }

                $file->move($destination, $filename);

                $validated['evidence'] = $this->evidenceSavePath.'/'.$filename;
            }

            /**
             * 3️⃣ Handle signature (pakai service kamu 🔥)
             */
            $validated['sender_signature'] = $signatureService->saveBase64(
                $validated['sender_signature'] ?? null,
                $deliveryOrder->sender_signature
            );

            $validated['receiver_signature'] = $signatureService->saveBase64(
                $validated['receiver_signature'] ?? null,
                $deliveryOrder->receiver_signature
            );

            /**
             * 4️⃣ Update Delivery Order
             */
            $deliveryOrder->update([
                'supplier_id' => $validated['supplier_id'] ?? null,
                'customer_id' => $validated['customer_id'] ?? null,
                'type' => $validated['type'],
                'status' => $validated['status'],

                'sender_name' => $validated['sender_name'] ?? null,
                'receiver_name' => $validated['receiver_name'] ?? null,

                'sender_signature' => $validated['sender_signature'],
                'receiver_signature' => $validated['receiver_signature'],

                'evidence' => $validated['evidence'] ?? $deliveryOrder->evidence,

                'notes' => $validated['notes'] ?? null,
            ]);

            /**
             * 5️⃣ Reset items
             */
            $deliveryOrder->items()->delete();

            /**
             * 6️⃣ Insert items + hitung total
             */
            [$totalAmount, $totalWeight] =
                $service->handleItems($deliveryOrder, $validated['items']);

            /**
             * 7️⃣ Update stock jika DONE
             */
            if ($validated['status'] === 'done') {
                $service->updateStock($deliveryOrder, $validated['items']);
            }

            /**
             * 8️⃣ Update total
             */
            $deliveryOrder->update([
                'total_amount' => $totalAmount,
                'total_weight' => $totalWeight
            ]);

            /**
             * 9️⃣ Handle invoice
             */
            $invoice = Invoice::where('delivery_order_id', $deliveryOrder->id);

            if ($validated['status'] === 'done') {
                if (!$invoice->exists()) {
                    $this->createInvoice($deliveryOrder);
                }
            } else {
                // kalau turun dari DONE → hapus invoice
                $invoice->delete();
            }

        });

        return back()->with('success', 'Surat jalan berhasil diperbarui');
    }

    private function generateInvoiceNumber()
    {

        $date = now()->format('Ymd');

        $last = Invoice::whereDate('created_at', now())
            ->orderByDesc('id')
            ->value('invoice_number');

        if ($last) {
            $seq = (int) substr($last, -3) + 1;
        } else {
            $seq = 1;
        }

        $seq = str_pad($seq,3,'0',STR_PAD_LEFT);

        return "INV/{$date}/{$seq}";
    }

    private function createInvoice($deliveryOrder)
    {

        $exists = Invoice::where('delivery_order_id',$deliveryOrder->id)->exists();

        if ($exists) return;

        $number = $this->generateInvoiceNumber();

        $invoice = Invoice::create([

            'delivery_order_id' => $deliveryOrder->id,
            'invoice_number' => $number,
            'date' => now(),

            'customer_id' => $deliveryOrder->customer_id,
            'supplier_id' => $deliveryOrder->supplier_id,

            'type' => $deliveryOrder->type

        ]);

        $total = 0;

        foreach ($deliveryOrder->items as $item) {

            $lineTotal = $item->quantity * $item->price;

            InvoiceItem::create([

                'invoice_id' => $invoice->id,
                'item_id' => $item->item_id,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'total' => $lineTotal

            ]);

            $total += $lineTotal;
        }

        $invoice->update([
            'total' => $total,
            'remaining' => $total
        ]);

    }

    public function previewNumber($type)
    {

        $prefix = $type === 'in' ? 'SJM' : 'SJK';
        $date = now()->format('Ymd');

        $count = DeliveryOrder::where('type', $type)
            ->whereDate('created_at', now()->toDateString())
            ->count() + 1;

        $sequence = str_pad($count, 3, '0', STR_PAD_LEFT);

        return response()->json([
            'number' => "{$prefix}/{$date}/{$sequence}"
        ]);

    }

    private function generateDoNumber($type)
    {

        $prefix = $type === 'in' ? 'SJM' : 'SJK';
        $date = now()->format('Ymd');

        $lastNumber = DeliveryOrder::where('type', $type)
            ->whereDate('created_at', now()->toDateString())
            ->lockForUpdate()
            ->orderByDesc('id')
            ->value('do_number');

        if ($lastNumber) {
            $lastSequence = (int) substr($lastNumber, -3);
            $nextSequence = $lastSequence + 1;
        } else {
            $nextSequence = 1;
        }

        $sequence = str_pad($nextSequence, 3, '0', STR_PAD_LEFT);

        return "{$prefix}/{$date}/{$sequence}";
    }

    public function destroy(DeliveryOrder $surat_jalan)
    {
        $deliveryOrder = $surat_jalan;

        DB::transaction(function () use ($deliveryOrder) {

            /**
             * 1️⃣ Rollback stock jika DO sebelumnya DONE
             */
            if ($deliveryOrder->status === 'done') {

                foreach ($deliveryOrder->items as $item) {

                    $cleanQty = $item->quantity - $item->bad_stock;

                    $product = Item::find($item->item_id);

                    if ($deliveryOrder->type === 'in') {

                        $product->decrement('stock', $cleanQty);

                        if ($item->bad_stock > 0) {
                            $product->decrement('bad_stock', $item->bad_stock);
                        }

                    } else {

                        $product->increment('stock', $cleanQty);

                    }

                }

            }

            /**
             * 2️⃣ Hapus file evidence
             */
            if ($deliveryOrder->evidence && File::exists(public_path($deliveryOrder->evidence))) {
                File::delete(public_path($deliveryOrder->evidence));
            }

            /**
             * 3️⃣ Hapus signature
             */
            if ($deliveryOrder->sender_signature && File::exists(public_path($deliveryOrder->sender_signature))) {
                File::delete(public_path($deliveryOrder->sender_signature));
            }

            if ($deliveryOrder->receiver_signature && File::exists(public_path($deliveryOrder->receiver_signature))) {
                File::delete(public_path($deliveryOrder->receiver_signature));
            }

            /**
             * 4️⃣ Hapus items
             */
            $deliveryOrder->items()->delete();

            /**
             * 5️⃣ Hapus delivery order
             */
            $deliveryOrder->delete();

        });

        return back()->with('success', 'Surat jalan berhasil dihapus');
    }


    //export pdf
    public function print(DeliveryOrder $surat_jalan)
    {

        $deliveryOrder = DeliveryOrder::with([
            'supplier',
            'customer',
            'items.item.unit',
            'items.cart',
        ])->findOrFail($surat_jalan->id);
        $websiteInfo = WebsiteInfo::first();

        $pdf = Pdf::loadView('pdf.delivery-order', [
            'deliveryOrder' => $deliveryOrder,
            'websiteInfo' => $websiteInfo
        ])->setPaper('A4', 'portrait');

        $fileName = str_replace('/', '-', $deliveryOrder->do_number);

        return $pdf->stream($fileName.'.pdf');
    }
}