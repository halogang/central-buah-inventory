<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\OpnameStock;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OpnameStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $opnames = OpnameStock::with('warehouse', 'items')
            ->withCount('items')
            ->latest()
            ->get();
        
        $warehouses = Warehouse::all();
        $items = Item::all();

        return Inertia::render('admin/StockManagement/OpnameStock/Index', [
            'opnames' => $opnames,
            'warehouses' => $warehouses,
            'items' => $items
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
        $validated = $request->validate([
            'date' => 'required|date',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'checked_by' => 'required|string',
            'note' => 'nullable|string',
            'items' => 'required|array'
        ]);

        DB::transaction(function () use ($request) {

            $opname = OpnameStock::create([
                'opname_number' => 'OPN-' . now()->format('Ymd'),
                'date' => $request->date,
                'warehouse_id' => $request->warehouse_id,
                'checked_by' => $request->checked_by,
                'note' => $request->note,
            ]);

            foreach ($request->items as $item) {

                $difference = $item['physical_stock'] - $item['system_stock'];

                $opname->items()->create([
                    'item_id' => $item['item_id'],
                    'system_stock' => $item['system_stock'],
                    'physical_stock' => $item['physical_stock'],
                    'difference' => $difference,
                ]);
            }
        });

        return redirect()->route('stok.stok-opname.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $opnameStock = OpnameStock::findOrFail($id);

        
        $opnameStock->load([
            'warehouse',
            'items.item.category'
            ]);

        return Inertia::render(
            'admin/StockManagement/OpnameStock/Show',
            [
                'opname' => $opnameStock
            ]
        );
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
        $opnameStock = OpnameStock::findOrFail($id);
        // dd($request, $opnameStock);  

        DB::transaction(function () use ($request, $opnameStock) {

            $opnameStock->update([
                'date' => $request->date,
                'warehouse_id' => $request->warehouse_id,
                'checked_by' => $request->checked_by,
                'note' => $request->note,
            ]);

            $opnameStock->items()->delete();

            foreach ($request->items as $item) {

                $difference = $item['physical_stock'] - $item['system_stock'];

                $opnameStock->items()->create([
                    'item_id' => $item['item_id'],
                    'system_stock' => $item['system_stock'],
                    'physical_stock' => $item['physical_stock'],
                    'difference' => $difference,
                ]);
            }
        });

        return redirect()->route('stok.stok-opname.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $opnameStock = OpnameStock::findOrFail($id);

        $opnameStock->delete();
        return redirect()->route('stok.stok-opname.index');
    }
}
