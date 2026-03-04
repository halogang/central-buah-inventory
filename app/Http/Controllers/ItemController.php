<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with(['category','warehouse'])
                ->orderBy('updated_at', 'desc')
                ->get();
        $categories = Category::all(['id','name']);
        $warehouses = Warehouse::all(['id','name']);

        return Inertia::render('admin/Items', [
            'items' => $items,
            'categories' => $categories,
            'warehouses' => $warehouses,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Items');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'icon' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'unit' => 'required|string|in:kg,sisir,biji,pack',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'purchase_price' => 'nullable|numeric|min:0',
            'selling_price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'min_stock' => 'nullable|integer|min:0',
            'bad_stock' => 'nullable|integer|min:0',
        ]);

        Item::create($validated);
        return redirect()->route('master.items.index');
    }

    public function show(Item $item)
    {
        return Inertia::render('admin/Items', [
            'item' => $item,
        ]);
    }

    public function edit(Item $item)
    {
        return Inertia::render('admin/Items', [
            'item' => $item,
        ]);
    }

    public function update(Request $request, Item $item)
    {
        $validated = $request->validate([
            'icon' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'unit' => 'required|string|in:kg,sisir,biji,pack',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'purchase_price' => 'nullable|numeric|min:0',
            'selling_price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'min_stock' => 'nullable|integer|min:0',
            'bad_stock' => 'nullable|integer|min:0',
        ]);

        $item->update($validated);
        return redirect()->route('master.items.index');
    }

    public function destroy(Item $item)
    {
        $item->delete();
        return redirect()->route('master.items.index');
    }
}
