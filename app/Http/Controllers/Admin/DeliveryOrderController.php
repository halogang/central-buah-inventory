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
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Services\SignatureService;
use App\Services\DeliveryOrderService;
use App\Services\DeliveryOrderSyncService;

use App\Actions\PrepareDeliveryOrderData;
use App\Actions\HandleDeliverySignature;
use App\Actions\HandleDeliveryEvidence;
// use Illuminate\Support\Facades\File;
// use Illuminate\Support\Str;
// use Intervention\Image\Drivers\Gd\Driver;
// use Intervention\Image\ImageManager;

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
            'linked_delivery_order_id' => 'nullable|exists:delivery_orders,id',
            'sender_id' => 'nullable|exists:users,id',
            'status' => 'required|in:draft,sent,done',
            'date' => 'required|date',

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
        $user = Auth::user();

        $query = DeliveryOrder::with([
            'supplier',
            'customer',
            'items.item',
            'items.cart',
        ])->latest();

        // ✅ khusus staff antar
        if ($user->hasRole('staff_antar')) {
            $query->where('type', 'out');
        }

        $deliveryOrders = $query->get()->map(function ($do) {

            return [
                'id' => $do->id,
                'do_number' => $do->do_number,
                'type' => $do->type,
                'date' => $do->date->format('Y-m-d'),

                'supplier_id' => $do->supplier_id,
                'supplier' => $do->supplier?->name,

                'customer_id' => $do->customer_id,
                'customer' => $do->customer?->name,
                
                'sender_id' => User::where('name', $do->sender_name)->value('id'),

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
                        'unit' => $item->item?->unit,

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

        $items = Item::with('unit', 'warehouse.branch')->whereHas('warehouse.branch', function($q){
            $q->where('name', 'Grosir');
        })->get();

        return Inertia::render('admin/DeliveryOrder/Index', [
            'deliveryOrders' => $deliveryOrders,
            'isStaffAntar' => $user->hasRole('staff_antar'),
            'suppliers' => Supplier::select('id','name')->get(),
            'items' => $items,
            'customers' => Customer::select('id','name','phone')->get(),
            'carts' => Cart::select('id','name')->get(),
            'stafAntar' => User::role('staff_antar')->select('id','name')->get(),
        ]);
    }

    public function store (
        Request $request,
        SignatureService $signatureService,
        DeliveryOrderService $service,
        DeliveryOrderSyncService $syncService,
        PrepareDeliveryOrderData $prepareData,
        HandleDeliverySignature $signatureAction,
        HandleDeliveryEvidence $evidenceAction,
    ) {
        $validated = $this->validateRequest($request);

        $deliveryOrder = DB::transaction(function () use (
            &$validated,
            $request,
            $signatureService,
            $service,
            $prepareData,
            $signatureAction,
            $evidenceAction
        ) {

            /**
             * 🔥 1. PREPARE DATA (sender / receiver logic)
             * File: app/Actions/DeliveryOrder/PrepareDeliveryOrderData.php
             */
            $validated = $prepareData->handle($validated);

            /**
             * 🔥 2. HANDLE SIGNATURE (base64 → file)
             * File: app/Actions/DeliveryOrder/HandleDeliverySignature.php
             */
            $validated['sender_signature'] = $signatureAction->handle(
                $signatureService,
                $validated['sender_signature'] ?? null
            );

            $validated['receiver_signature'] = $signatureAction->handle(
                $signatureService,
                $validated['receiver_signature'] ?? null
            );

            /**
             * 🔥 3. HANDLE EVIDENCE (upload image)
             * File: app/Actions/DeliveryOrder/HandleDeliveryEvidence.php
             */
            if ($validated['status'] === 'done') {
                $validated['evidence'] = $evidenceAction->handle($request);
            }

            /**
             * 🔥 4. GENERATE DO NUMBER
             * File: app/Services/DeliveryOrderService.php
             */
            $doNumber = $service->generateDoNumber(
                $validated['type'],
                $validated['date']
            );

            /**
             * 🔥 5. CREATE DELIVERY ORDER
             */
            $deliveryOrder = DeliveryOrder::create([
                ...$validated,
                'linked_delivery_order_id' => $validated['linked_delivery_order_id'] ?? null,
                'do_number' => $doNumber,
            ]);

            /**
             * 🔥 6. HANDLE ITEMS + HITUNG TOTAL
             * File: app/Services/DeliveryOrderService.php
             */
            [$totalAmount, $totalWeight] =
                $service->handleItems($deliveryOrder, $validated['items']);

            /**
             * 🔥 7. UPDATE STOCK (JIKA DONE)
             */
            if ($validated['status'] === 'done') {
                $service->updateStock($deliveryOrder, $validated['items']);
            }

            /**
             * 🔥 8. UPDATE TOTAL
             */
            $deliveryOrder->update([
                'total_amount' => $totalAmount,
                'total_weight' => $totalWeight
            ]);

            /**
             * 🔥 9. CREATE LINKED DO IN (DELIVERY SCHEDULE)
             * File: app/Services/DeliveryOrderSyncService.php
             */
            // if ($validated['type'] === 'out') {
            //     $syncService->createLinkedIn(
            //         $deliveryOrder,
            //         $validated,
            //         $service
            //     );
            // }

            /**
             * 🔥 10. AUTO CREATE INVOICE
             */
            if ($validated['status'] === 'done') {
                $this->createInvoice($deliveryOrder);
            }

            return $deliveryOrder;
        });
            
        return back()->with([
            'success' => 'Surat jalan berhasil dibuat',
            'flash' => [
                'data' => [
                    'id' => $deliveryOrder->id
                ]
            ]
        ]);
    }

    public function update(
        Request $request,
        DeliveryOrder $deliveryOrder,
        SignatureService $signatureService,
        DeliveryOrderService $service,
        DeliveryOrderSyncService $syncService,
        PrepareDeliveryOrderData $prepareData,
        HandleDeliverySignature $signatureAction,
        HandleDeliveryEvidence $evidenceAction
    ) {
        $validated = $this->validateRequest($request);

        DB::transaction(function () use (
            &$validated,
            $request,
            $deliveryOrder,
            $signatureService,
            $service,
            $syncService,
            $prepareData,
            $signatureAction,
            $evidenceAction
        ) {

            /**
             * 🔥 1. PREPARE DATA
             */
            $validated = $prepareData->handle($validated);

            /**
             * 🔥 2. ROLLBACK STOCK (JIKA SEBELUMNYA DONE)
             * File: app/Services/DeliveryOrderService.php
             */
            if ($deliveryOrder->status === 'done') {
                $service->rollbackStock($deliveryOrder);
            }

            /**
             * 🔥 3. HANDLE SIGNATURE (replace lama)
             */
            $validated['sender_signature'] = $signatureAction->handle(
                $signatureService,
                $validated['sender_signature'] ?? null,
                $deliveryOrder->sender_signature
            );

            $validated['receiver_signature'] = $signatureAction->handle(
                $signatureService,
                $validated['receiver_signature'] ?? null,
                $deliveryOrder->receiver_signature
            );

            /**
             * 🔥 4. HANDLE EVIDENCE (merge existing + new + delete)
             */
            if ($validated['status'] === 'done') {
                $validated['evidence'] = $evidenceAction->handle(
                    $request,
                    $deliveryOrder->evidence ?? []
                );
            }

            /**
             * 🔥 5. UPDATE DELIVERY ORDER
             */
            $deliveryOrder->update([
                ...$validated,
                'evidence' => $validated['evidence'] ?? $deliveryOrder->evidence,
            ]);

            /**
             * 🔥 6. RESET ITEMS
             */
            $deliveryOrder->items()->delete();

            /**
             * 🔥 7. HANDLE ITEMS + HITUNG TOTAL
             */
            [$totalAmount, $totalWeight] =
                $service->handleItems($deliveryOrder, $validated['items']);

            /**
             * 🔥 8. UPDATE STOCK (JIKA DONE)
             */
            if ($validated['status'] === 'done') {
                $service->updateStock($deliveryOrder, $validated['items']);
            }

            /**
             * 🔥 9. UPDATE TOTAL
             */
            $deliveryOrder->update([
                'total_amount' => $totalAmount,
                'total_weight' => $totalWeight
            ]);

            /**
             * 🔥 10. SYNC LINKED DO (KHUSUS DO OUT)
             * File: app/Services/DeliveryOrderSyncService.php
             */
            if ($deliveryOrder->type === 'out') {
                $syncService->syncFromOut(
                    $deliveryOrder,
                    $validated,
                    $service
                );
            }

            /**
             * 🔥 11. HANDLE INVOICE
             */
            $invoice = Invoice::where('delivery_order_id', $deliveryOrder->id);

            if ($validated['status'] === 'done') {
                if (!$invoice->exists()) {
                    $this->createInvoice($deliveryOrder);
                }
            } else {
                // downgrade dari DONE → hapus invoice
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

    public function destroy(
        DeliveryOrder $deliveryOrder,
        DeliveryOrderService $service,
        DeliveryOrderSyncService $syncService
    ) {
        DB::transaction(function () use ($deliveryOrder, $service, $syncService) {

            /**
             * 🔥 HANDLE DELETE + LINKED DO
             * File: app/Services/DeliveryOrderSyncService.php
             */
            $syncService->deleteWithLinked($deliveryOrder, $service);
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

    public function updateStatus(Request $request, DeliveryOrder $surat_jalan)
    {
        $status = $request->status;

        if (!in_array($status, ['draft', 'sent', 'done'])) {
            return back()->with('error', 'Status tidak valid');
        }

        $surat_jalan->update([
            'status' => $status
        ]);

        return back()->with('success', 'Status berhasil diperbarui');
    }
}