<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Pos;
use App\Models\PosItem;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class POSController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productData = Item::with('unit', 'warehouse.branch')->whereHas('warehouse.branch', function($q){
            $q->where('name', 'Retail');
        })->where('stock', '>', 0)->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'price' => $item->selling_price,
                'stock' => $item->stock,
                'unit' => $item->unit->unit_code ?? 'pcs',
                'image' => $item->image,
                'thumbnail_url' => $item->thumbnail_url,
            ];
        });

        $posData = Pos::with('posItems')->latest()->get();

        return Inertia::render('admin/POS/Index', [
            'productData' => $productData,
            'posData' => $posData
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
        // dd($request->all());

        $validated = $request->validate([
            'date' => 'required|date',
            'total' => 'required|integer',
            'payment_method' => 'required|string',
            'paid_amount' => 'nullable|integer',
            'change_amount' => 'nullable|integer',
            'type' => 'required|string',
            'charge' => 'nullable|integer',

            'items.*.item_id' => 'required|exists:items,id',
            'items.*.item_name' => 'required|string',
            'items.*.unit' => 'required|string',
            'items.*.quantity' => 'required|numeric|min:0',
            'items.*.base_price' => 'required|numeric|min:0',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.total' => 'required|numeric|min:0',
        ]);

        DB::transaction(function () use ($validated) {

            $posData = collect($validated)->except('items')->toArray();
            $posData['user_id'] = Auth::id();
            $posData['pos_number'] = 'POS-' . now()->format('YmdHis');

            $pos = Pos::create($posData);

            $items = $validated['items'];

            foreach($items as $item) {

                $total = $item['price'] * $item['quantity'];
                
                //save pos item
                $posItem = PosItem::create([
                    'pos_id' => $pos->id,

                    'item_id' => $item['item_id']?? null,
                    'item_name' => $item['item_name'],
                    'unit' => $item['unit'],

                    'quantity' => $item['quantity'],
                    'base_price' => $item['base_price'],
                    'price' => $item['price'],
                    'total' => $total,
                ]);

                //update stock
                $product = Item::findOrFail($item['item_id']);
                $newStock = $product->stock - $item['quantity'];

                //create new stock movement
                StockMovement::create([
                    'item_id' => $product->id,
                    'warehouse_id' => $product->warehouse_id,
                    'type' => 'out',
                    'quantity' => $item['quantity'],
                    'bad_stock' => 0,
                    'stock_before' => $product->stock,
                    'stock_after' => $newStock,
                    'reference_type' => 'pos',
                    'reference_id' => $posItem->id,
                    'user_id' => Auth::id(),
                    'note' => 'POS Item ' . $posItem->item_name
                ]);

                $product->decrement('stock', $item['quantity']);
            }
            
        });

        // sementara return aja dulu
        return back()->with('success', 'Transaksi berhasil');
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
