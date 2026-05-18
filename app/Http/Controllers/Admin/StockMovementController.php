<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\StockMovement;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class StockMovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stockMovements = StockMovement::with('warehouse', 'item', 'user')->latest()->get();

        $user = Auth::user();
        $roleName = $user->roles->first()->name;

        $items = Item::all();
        $warehouses = Warehouse::all();

        if ($roleName === 'spv_gudang') {
            $stockMovements = StockMovement::with('warehouse', 'item', 'user')
                ->where('user_id', $user->id)->latest()->get();
        }

        return Inertia::render('admin/StockMovement/Index', [
            'stockMovements' => $stockMovements,
            'items' => $items,
            'warehouses' => $warehouses,
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

    /**
     * Move stock from one warehouse to another
     */
    public function moveStock(Request $request)
    {
        $validated = $request->validate([
            'source_item_id' => 'required|exists:items,id',
            'destination_item_id' => 'required|exists:items,id',
            'quantity' => 'required|numeric|min:0.01',
            'source_warehouse_id' => 'required|exists:warehouses,id',
            'destination_warehouse_id' => 'required|exists:warehouses,id',
        ]);

        DB::beginTransaction();

        try {
            $sourceItem = Item::findOrFail($validated['source_item_id']);
            $destinationItem = Item::findOrFail($validated['destination_item_id']);
            $quantity = $validated['quantity'];
            $user = Auth::user();

            if ($sourceItem->stock < $quantity) {
                throw ValidationException::withMessages([
                    'quantity' => 'Stok tidak cukup di gudang asal'
                ]);
            }

            $sourceWarehouse = Warehouse::findOrFail($validated['source_warehouse_id']);
            $destinationWarehouse = Warehouse::findOrFail($validated['destination_warehouse_id']);

            // OUT
            $stockBefore = $sourceItem->stock;
            $sourceItem->stock = $sourceItem->stock - $quantity;
            $sourceItem->save();

            StockMovement::create([
                'item_id' => $sourceItem->id,
                'warehouse_id' => $sourceWarehouse->id,
                'type' => 'movement',
                'reference_type' => 'stock_movement',
                'reference_id' => null,
                'quantity' => -$quantity,
                'stock_before' => $stockBefore,
                'stock_after' => $sourceItem->stock,
                'note' => "Moved from {$sourceWarehouse->name} to {$destinationWarehouse->name}",
                'user_id' => $user->id,
            ]);

            // IN
            $destBefore = $destinationItem->stock;
            $destinationItem->stock = $destinationItem->stock + $quantity;
            $destinationItem->save();

            StockMovement::create([
                'item_id' => $destinationItem->id,
                'warehouse_id' => $destinationWarehouse->id,
                'type' => 'movement',
                'reference_type' => 'stock_movement',
                'reference_id' => null,
                'quantity' => $quantity,
                'stock_before' => $destBefore,
                'stock_after' => $destinationItem->stock,
                'note' => "Moved from {$sourceWarehouse->name} to {$destinationWarehouse->name}",
                'user_id' => $user->id,
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Stok berhasil dipindahkan');

        } catch (\Throwable $e) {
            DB::rollBack();

            Log::error('Stock movement failed', [
                'message' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString(),
            ]);

            throw ValidationException::withMessages([
                'general' => $e->getMessage(),
            ]);
        }
    }
}
