<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::all();
        return Inertia::render('admin/Items', [
            'items' => $items,
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
            'unit' => 'required|string|max:50',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'purchase_price' => 'nullable|numeric',
            'selling_price' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'min_stock' => 'nullable|integer',
            'bad_stock' => 'nullable|integer',
        ]);

        Item::create($validated);
        return Inertia::location(route('items.index'));
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
            'unit' => 'required|string|max:50',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'purchase_price' => 'nullable|numeric',
            'selling_price' => 'nullable|numeric',
            'stock' => 'nullable|integer',
            'min_stock' => 'nullable|integer',
            'bad_stock' => 'nullable|integer',
        ]);

        $item->update($validated);
        return Inertia::location(route('items.index'));
    }

    public function destroy(Item $item)
    {
        $item->delete();
        return Inertia::location(route('items.index'));
    }
}
