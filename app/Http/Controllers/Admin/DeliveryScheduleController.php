<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Customer;
use App\Models\DeliveryOrder;
use App\Models\DeliverySchedule;
use App\Models\Item;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeliveryScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = DeliveryOrder::with([
            'supplier',
            'customer',
            'items.item',
            'items.cart'
        ])->get()->map(function ($o) {
            return [
                'id' => (string) $o->id,
                'do_number' => $o->do_number,
                'date' => $o->date->format('Y-m-d'),
                'type' => $o->type,
                'status' => $o->status,
                'supplier_name' => optional($o->supplier)->name,
                'customer_name' => optional($o->customer)->name,
                'supplier_id' => optional($o->supplier)->id,
                'supplier' => optional($o->supplier),
                'customer_id' => optional($o->customer)->id,
                'customer' => optional($o->customer),
                'sender' => optional(User::where('name', $o->sender_name)->first())->only('id', 'name'),
                'sender_name' => $o->sender_name,
                'receiver_name' => $o->receiver_name,
                'note' => $o->note,
                'items' => $o->items->map(function ($item) {
                    return [
                        'item_id' => $item->item_id,
                        'name' => $item->item->name ?? '-',
                        'quantity' => $item->quantity,
                        'price' => $item->price,
                        'cart' => $item->cart,
                        'cart_id' => $item->cart_id,
                        'cart_name' => $item->cart ? $item->cart->name : null,
                        'cart_qty' => $item->cart_qty,
                        'cart_weight' => $item->cart_weight,
                    ];
                })->values()->toArray(),
            ];
        });

        $items = Item::with('warehouse.branch', 'unit')->whereHas('warehouse.branch', function($q) {
            $q->where('name', 'Grosir');
        })->get()->map(function ($i) {
            return [
                'id' => $i->id,
                'name' => $i->name,
                'selling_price' => $i->selling_price,
                'purchase_price' => $i->purchase_price,
                'stock' => $i->stock,
                'unit_code' => $i->unit->unit_code,
            ];
        })->values()->toArray();

        //add carts, supplier, customer, staf antar
        $carts = Cart::select('id', 'name')->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'name' => $c->name,
            ];
        })->values()->toArray();

        $suppliers = Supplier::select('id', 'name')->get()->map(function ($s) {
            return [
                'id' => $s->id,
                'name' => $s->name,
            ];
        })->values()->toArray();

        $customers = Customer::select('id', 'name')->get()->map(function ($c) {
            return [
                'id' => $c->id,
                'name' => $c->name,
            ];
        })->values()->toArray();

        $stafAntar = User::role('staff_antar')->select('id', 'name')->get()->map(function ($u) {
            return [
                'id' => $u->id,
                'name' => $u->name,
            ];
        })->values()->toArray();

        return Inertia::render('admin/DeliverySchedules/Index', [
            'deliveryOrders' => $orders,
            'items' => $items,
            'carts' => $carts,
            'suppliers' => $suppliers,
            'customers' => $customers,
            'stafAntar' => $stafAntar,
        ]);
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
    public function show(DeliverySchedule $deliverySchedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DeliverySchedule $deliverySchedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DeliverySchedule $deliverySchedule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeliverySchedule $deliverySchedule)
    {
        //
    }
}
