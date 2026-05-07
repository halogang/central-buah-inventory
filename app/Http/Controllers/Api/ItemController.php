<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Get all items from a specific warehouse
     */
    public function getItemsByWarehouse($warehouseId)
    {
        $warehouse = Warehouse::findOrFail($warehouseId);
        
        $items = $warehouse->items()
            ->select('id', 'name', 'stock', 'warehouse_id')
            ->where('stock', '>', 0)
            ->get();

        return response()->json($items);
    }

    /**
     * Search items in a warehouse by name
     */
    public function searchItemsByWarehouse($warehouseId, Request $request)
    {
        $warehouse = Warehouse::findOrFail($warehouseId);
        $searchTerm = strtolower($request->query('name', ''));

        if (empty($searchTerm)) {
            return response()->json([]);
        }

        $items = $warehouse->items()
            ->select('id', 'name', 'stock', 'warehouse_id')
            ->whereRaw('LOWER(name) LIKE ?', ['%' . $searchTerm . '%'])
            // ->where('stock', '>', 0)
            ->get();

        return response()->json($items);
    }
}
