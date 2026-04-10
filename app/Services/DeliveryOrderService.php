<?php

namespace App\Services;

use App\Models\DeliveryOrder;
use App\Models\DeliveryOrderItem;
use App\Models\Item;
use App\Models\StockMovement;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DeliveryorderService {

    public function handleItems($deliveryOrder, $items)
    {
        $totalAmount = 0;
        $totalWeight = 0;

        foreach ($items as $item) {

            $badStock = $item['bad_stock'] ?? 0;
            $qty = $item['quantity'] ?? 0;
            $cleanQty = $qty - $badStock;
            $price = $item['price'] ?? 0;

            DeliveryOrderItem::create([
                'delivery_order_id' => $deliveryOrder->id,
                'item_id' => $item['item_id'],
                'cart_id' => $item['cart_id'] ?? null,
                'cart_weight' => $item['cart_weight'] ?? 0,
                'cart_qty' => $item['cart_qty'] ?? 0,
                'quantity' => $qty,
                'bad_stock' => $badStock,
                'price' => $price,
            ]);

            $totalAmount += $qty * $price;
            $totalWeight += ($item['cart_qty'] ?? 0) * ($item['cart_weight'] ?? 0);
        }

        return [$totalAmount, $totalWeight];
    }

    public function updateStock($deliveryOrder, $items)
    {
        foreach ($items as $item) {

            $product = Item::find($item['item_id']);

            $badStock = $item['bad_stock'] ?? 0;
            $qty = $item['quantity'] ?? 0;
            $cleanQty = $qty - $badStock;

            $before = $product->stock;

            if ($deliveryOrder->type === 'in') {
                $product->increment('stock', $cleanQty);

                if ($badStock > 0) {
                    $product->increment('bad_stock', $badStock);
                }

                $type = 'in';

            } else {
                $product->decrement('stock', $cleanQty);
                $type = 'out';
            }

            $after = $product->fresh()->stock;

            StockMovement::create([
                'item_id' => $product->id,
                'warehouse_id' => $product->warehouse_id,
                'type' => $type,
                'quantity' => $cleanQty,
                'bad_stock' => $badStock,
                'stock_before' => $before,
                'stock_after' => $after,
                'reference_type' => 'delivery_order',
                'reference_id' => $deliveryOrder->id,
                'user_id' => Auth::id(),
                'note' => 'Delivery Order '.$deliveryOrder->do_number
            ]);
        }
    }

    public function rollbackStock($deliveryOrder)
    {
        foreach ($deliveryOrder->items as $item) {

            $product = Item::find($item->item_id);
            $cleanQty = $item->quantity - $item->bad_stock;

            if ($deliveryOrder->type === 'in') {
                $product->decrement('stock', $cleanQty);

                if ($item->bad_stock > 0) {
                    $product->decrement('bad_stock', $item->bad_stock);
                }

            } else {
                $product->increment('stock', $cleanQty);
            }
        }

        StockMovement::where('reference_id', $deliveryOrder->id)
            ->where('reference_type', 'delivery_order')
            ->delete();
    }

    public function generateDoNumber($type, $date = null)
    {
        $prefix = $type === 'in' ? 'SJM' : 'SJK';

        // 🔥 FIX: pastikan jadi Carbon
        $dateObj = $date ? Carbon::parse($date) : now();

        $doDate = $dateObj->format('Ymd');

        $lastNumber = DeliveryOrder::where('type', $type)
            ->whereDate('date', $dateObj->toDateString()) // 🔥 juga diperbaiki
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

        return "{$prefix}/{$doDate}/{$sequence}";
    }
}