<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        $categories = Category::where('type', 'barang')->get();
        $warehouses = Warehouse::all(['id','name']);

        return Inertia::render('admin/Items/Index', [
            'items' => $items,
            'categories' => $categories,
            'warehouses' => $warehouses,
        ]);
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
        return redirect()->route('master.items.show', $validated['category_id']);
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);

        $items = Item::with([
            'warehouse',
            'category'
        ])->where('category_id', $category->id)->get();

        $categories = Category::where('type', 'barang')->get();
        $warehouses = Warehouse::all(['id','name']);

        return Inertia::render('admin/Items/Show', [
            'items' => $items,
            'category' => $category,
            'categories' => $categories,
            'warehouses' => $warehouses,
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
        return redirect()->route('master.items.show', $validated['category_id']);
    }

    public function destroy(Item $item)
    {
        $categoryId = $item->category_id;
        $item->delete();
        return redirect()->route('master.items.show', $categoryId);
    }
}
