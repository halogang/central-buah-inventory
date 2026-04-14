<?php

namespace App\Services;

use App\Models\DeliveryOrder;
use Carbon\Carbon;

class DeliveryOrderSyncService
{
    public function createLinkedIn($doOut, $validated, $service)
    {
        $doIn = DeliveryOrder::create([
            ...$validated,
            'type' => 'in',
            'linked_delivery_order_id' => $doOut->id,
            'date' => now()->subDays(7),
        ]);

        $service->handleItems($doIn, $validated['items']);

        return $doIn;
    }


    public function syncFromOut($doOut, $validated, $service)
    {
        $doIn = DeliveryOrder::where('linked_delivery_order_id', $doOut->id)->first();

        if (!$doIn) return;

        $doIn->items()->delete();

        // ✅ ambil tanggal dari DO OUT
        $outDate = Carbon::parse($validated['date']);

        $today = Carbon::today();

        // selisih hari
        $diffDays = $today->diffInDays($outDate, false);

        // ✅ LOGIC UTAMA
        if ($diffDays < 7) {
            $newDate = $today;
        } else {
            $newDate = $outDate->copy()->subDays(7);
        }

        $doIn->update([
            'date' => $newDate->toDateString(),
        ]);

        $service->handleItems($doIn, $validated['items']);
    }

    public function deleteWithLinked($deliveryOrder, $service)
    {
        /**
         * 🔥 CASE 1: DIA DO OUT (punya child DO IN)
         */
        if ($deliveryOrder->type === 'out') {

            $linked = DeliveryOrder::where('linked_delivery_order_id', $deliveryOrder->id)->first();

            if ($linked) {
                $service->deleteDeliveryOrder($linked);
            }

            $service->deleteDeliveryOrder($deliveryOrder);
            return;
        }

        /**
         * 🔥 CASE 2: DIA DO IN (punya parent DO OUT)
         * → hanya delete sendiri (sesuai rule kamu)
         */
        $service->deleteDeliveryOrder($deliveryOrder);
    }
}