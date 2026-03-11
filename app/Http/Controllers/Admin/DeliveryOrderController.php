<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\DeliveryOrder;
use App\Models\DeliveryOrderItem;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Item;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class DeliveryOrderController extends Controller
{
    private $evidenceUploadPath = '../../public_html/images/delivery-orders';
    private $evidenceSavePath = '/images/delivery-orders';  

    private $signatureUploadPath = '../../public_html/images/signatures';
    private $signatureSavePath = '/images/signatures';

    public function index()
    {
        $deliveryOrders = DeliveryOrder::with([
            'supplier',
            'customer',
            'items.item'
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

                'sender_signature' => $do->sender_signature
                    ? asset('storage/'.$do->sender_signature)
                    : null,

                'receiver_signature' => $do->receiver_signature
                    ? asset('storage/'.$do->receiver_signature)
                    : null,

                'notes' => $do->notes,

                'evidence' => $do->evidence
                    ? asset('storage/'.$do->evidence)
                    : null,

                'items_count' => $do->items->count(),
                'total_quantity' => $do->items->sum('quantity'),

                // 🔥 items untuk edit
                'items' => $do->items->map(function ($item) {

                    return [
                        'item_id' => $item->item_id,
                        'name' => $item->item?->name,
                        'image' => $item->item?->image,
                        'image_url' => $item->item?->image
                            ? asset('storage/'.$item->item->image)
                            : null,
                        'unit' => $item->item?->unit?->unit_code,

                        'quantity' => $item->quantity,
                        'bad_stock' => $item->bad_stock,
                        'price' => $item->price,
                    ];

                }),
            ];

        });

        return Inertia::render('admin/DeliveryOrder/Index', [
            'deliveryOrders' => $deliveryOrders,
            'suppliers' => Supplier::select('id','name')->get(),
            'items' => Item::select('id','name','image')->get(),
            'customers' => Customer::select('id','name','phone')->get(),
        ]);
    }


    public function store(Request $request)
    {
        // dd($request->all());

        $validated = $request->validate([

            'type' => 'required|in:in,out',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'customer_id' => 'nullable|exists:customers,id',
            'status' => 'required|in:draft,sent,done',

            'sender_name' => 'nullable|string|max:255',
            'receiver_name' => 'nullable|string|max:255',

            'note' => 'nullable|string',

            'sender_signature' => 'nullable|string',
            'receiver_signature' => 'nullable|string',

            'items' => 'nullable|array',

            'items.*.item_id' => 'nullable|exists:items,id',
            'items.*.quantity' => 'nullable|numeric|min:0',
            'items.*.bad_stock' => 'nullable|numeric|min:0',
            'items.*.price' => 'nullable|numeric|min:0',

        ]);

        // upload evidence
        if ($request->hasFile('evidence')) {
            $file = $request->file('evidence');
            $filename = time().'_'.$file->getClientOriginalName();
            $destination = public_path($this->evidenceUploadPath);
            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }
            $file->move($destination, $filename);
            $validated['evidence'] = $this->evidenceSavePath.'/'.$filename;
        }

        // save signatures
        if ($request->sender_signature) {
            $validated['sender_signature'] =
                $this->saveSignature($request->sender_signature);
        }

        if ($request->receiver_signature) {
            $validated['receiver_signature'] =
                $this->saveSignature($request->receiver_signature);
        }


        DB::transaction(function () use ($validated) {

            $doNumber = $this->generateDoNumber($validated['type']);

            $deliveryOrder = DeliveryOrder::create([

                'do_number' => $doNumber,
                'date' => now(),

                'supplier_id' => $validated['supplier_id'] ?? null,
                'customer_id' => $validated['customer_id'] ?? null,

                'type' => $validated['type'],
                'status' => $validated['status'],

                'sender_name' => $validated['sender_name'] ?? null,
                'receiver_name' => $validated['receiver_name'] ?? null,

                'sender_signature' => $validated['sender_signature'] ?? null,
                'receiver_signature' => $validated['receiver_signature'] ?? null,

                'evidence' => $validated['evidence'] ?? null,

                'note' => $validated['note'] ?? null,
            ]);

            //auto create invoice
            $isInvoiceCreated = Invoice::where('delivery_order_id', $deliveryOrder->id)->exists();
            if ($deliveryOrder->status === 'done' && !$isInvoiceCreated) {
                $this->createInvoice($deliveryOrder);
            }


            foreach ($validated['items'] as $item) {

                $badStock = $item['bad_stock'] ?? 0;
                $cleanQty = $item['quantity'] - $badStock;

                DeliveryOrderItem::create([
                    'delivery_order_id' => $deliveryOrder->id,
                    'item_id' => $item['item_id'],
                    'quantity' => $item['quantity'],
                    'bad_stock' => $badStock,
                    'price' => $item['price'] ?? 0,
                ]);


                if ($deliveryOrder->status === 'done') {

                    $product = Item::find($item['item_id']);

                    if ($deliveryOrder->type === 'in') {

                        $product->increment('stock', $cleanQty);

                        if ($badStock > 0) {
                            $product->increment('bad_stock', $badStock);
                        }

                    } else {

                        $product->decrement('stock', $cleanQty);

                    }

                }

            }

        });

        return back()->with('success', 'Surat jalan berhasil dibuat');
    }

    public function update(Request $request, DeliveryOrder $surat_jalan)
    {
        $deliveryOrder = $surat_jalan;
        

        $validated = $request->validate([

            'type' => 'required|in:in,out',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'customer_id' => 'nullable|exists:customers,id',
            'status' => 'required|in:draft,sent,done',

            'sender_name' => 'nullable|string|max:255',
            'receiver_name' => 'nullable|string|max:255',

            'notes' => 'nullable|string',

            'sender_signature' => 'nullable|string',
            'receiver_signature' => 'nullable|string',

            'items' => 'required|array|min:1',

            'items.*.item_id' => 'required|exists:items,id',
            'items.*.quantity' => 'required|numeric|min:0',
            'items.*.bad_stock' => 'nullable|numeric|min:0',
            'items.*.price' => 'nullable|numeric|min:0',

        ]);
        // dd($validated);

        DB::transaction(function () use ($request, $validated, $deliveryOrder) {

            /**
             * 1️⃣ Rollback stock lama jika DO sebelumnya DONE
             */
            if ($deliveryOrder->status === 'done') {

                foreach ($deliveryOrder->items as $oldItem) {

                    $cleanQty = $oldItem->quantity - $oldItem->bad_stock;

                    $product = Item::find($oldItem->item_id);

                    if ($deliveryOrder->type === 'in') {

                        $product->decrement('stock', $cleanQty);

                        if ($oldItem->bad_stock > 0) {
                            $product->decrement('bad_stock', $oldItem->bad_stock);
                        }

                    } else {

                        $product->increment('stock', $cleanQty);

                    }

                }

            }


            /**
             * 2️⃣ Upload evidence baru jika ada
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
             * 3️⃣ Simpan signature baru jika ada
             */
            if ($request->sender_signature && str_contains($request->sender_signature, 'base64')) {

                $validated['sender_signature'] =
                    $this->saveSignature($request->sender_signature);
            }

            if ($request->receiver_signature && str_contains($request->receiver_signature, 'base64')) {

                $validated['receiver_signature'] =
                    $this->saveSignature($request->receiver_signature);
            }


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

                'sender_signature' => $validated['sender_signature'] ?? $deliveryOrder->sender_signature,
                'receiver_signature' => $validated['receiver_signature'] ?? $deliveryOrder->receiver_signature,

                'evidence' => $validated['evidence'] ?? $deliveryOrder->evidence,

                'notes' => $validated['notes'] ?? null,
            ]);

            //auto create invoice
            $isInvoiceCreated = Invoice::where('delivery_order_id', $deliveryOrder->id)->exists();
            if ($validated['status'] === 'done' && !$isInvoiceCreated) {
                $this->createInvoice($deliveryOrder);
            }


            /**
             * 5️⃣ Hapus item lama
             */
            $deliveryOrder->items()->delete();


            /**
             * 6️⃣ Insert item baru
             */
            foreach ($validated['items'] as $item) {

                $badStock = $item['bad_stock'] ?? 0;
                $cleanQty = $item['quantity'] - $badStock;

                DeliveryOrderItem::create([
                    'delivery_order_id' => $deliveryOrder->id,
                    'item_id' => $item['item_id'],
                    'quantity' => $item['quantity'],
                    'bad_stock' => $badStock,
                    'price' => $item['price'] ?? 0,
                ]);


                /**
                 * 7️⃣ Update stock jika status DONE
                 */
                if ($validated['status'] === 'done') {

                    $product = Item::find($item['item_id']);

                    if ($validated['type'] === 'in') {

                        $product->increment('stock', $cleanQty);

                        if ($badStock > 0) {
                            $product->increment('bad_stock', $badStock);
                        }

                    } else {

                        $product->decrement('stock', $cleanQty);

                    }

                }

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

    private function saveSignature($base64)
    {
        if (!$base64) return null;

        $image = str_replace('data:image/png;base64,', '', $base64);
        $image = str_replace(' ', '+', $image);

        $fileName = 'signature_' . uniqid() . '.png';

        $destination = public_path($this->signatureUploadPath);

        if (!File::exists($destination)) {
            File::makeDirectory($destination, 0755, true);
        }

        File::put(
            $destination.'/'.$fileName,
            base64_decode($image)
        );

        return $this->signatureSavePath.'/'.$fileName;
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
}