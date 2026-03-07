<?php

namespace App\Http\Controllers\Admin;

// use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\DeliveryOrder;
use App\Models\DeliveryOrderItem;
use App\Models\Item;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DeliveryOrderController extends Controller
{
    public function index()
    {
        $deliveryOrders = DeliveryOrder::with([
            'supplier',
            'items.item'
        ])
        ->latest()
        ->get()
        ->map(function ($do) {
            return [
                'id' => $do->id,
                'do_number' => $do->do_number,
                'type' => $do->type,
                'date' => $do->date->format('d-m-Y'),
                'supplier' => $do->supplier?->name,
                'status' => $do->status,
                'items_count' => $do->items->count(),
                'total_quantity' => $do->items->sum('quantity'),
            ];
        });

        

        return Inertia::render('DeliveryOrder/Index', [
            'deliveryOrders' => $deliveryOrders,
            'suppliers' => Supplier::select('id','name')->get(),
            'items' => Item::select('id','name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'do_number' => 'required|string|max:255',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'status' => 'required|in:draft,sent,done',
            'type' => 'required|in:in,out',

            'items' => 'required|array|min:1',

            'items.*.item_id' => 'required|exists:items,id',
            'items.*.quantity' => 'required|numeric|min:0',
            'items.*.bad_stock' => 'nullable|numeric|min:0',
            'items.*.price' => 'nullable|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated) {

            $doNumber = $this->generateDoNumber($validated['type']);

            // 1️⃣ Create Delivery Order
            $deliveryOrder = DeliveryOrder::create([
                'do_number' => $doNumber,
                'date' => now(),
                'supplier_id' => $validated['supplier_id'],
                'type' => $validated['type'],
                'status' => $validated['status'],
            ]);

            // 2️⃣ Loop Items
            foreach ($validated['items'] as $item) {

                if (!$item['item_id']) {
                    continue;
                }

                $cleanQty = $item['quantity'] - ($item['bad_stock'] ?? 0);

                // create item record
                DeliveryOrderItem::create([
                    'delivery_order_id' => $deliveryOrder->id,
                    'item_id' => $item['item_id'],
                    'quantity' => $item['quantity'],
                    'bad_stock' => $item['bad_stock'] ?? 0,
                    'price' => $item['price'] ?? 0,
                ]);

                // 3️⃣ Update Stock jika DONE
                if ($deliveryOrder->status === 'done') {

                    $product = Item::find($item['item_id']);

                    if ($deliveryOrder->type === 'in') {

                        // barang masuk
                        $product->increment('stock', $cleanQty);

                        if ($item['bad_stock'] > 0) {
                            $product->increment('bad_stock', $item['bad_stock']);
                        }

                    } else {

                        // barang keluar
                        $product->decrement('stock', $cleanQty);

                    }

                }

            }

        });

        return redirect()->back()->with('success', 'Surat jalan berhasil dibuat');
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
}
