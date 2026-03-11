<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Category;
use App\Models\Unit;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class ItemController extends Controller
{
    // default upload path (nanti bisa kamu ubah sendiri)
    private $uploadPath = '../../public_html/images/items';
    private $savePath = '/images/items';

    public function index()
    {
        $items = Item::with(['category','warehouse', 'unit'])
                ->orderBy('updated_at', 'desc')
                ->get();

        $categories = Category::where('type', 'barang')->get();

        $units = Unit::all();

        return Inertia::render('admin/Items/Index', [
            'items' => $items,
            'categories' => $categories,
            'units' => $units,
        ]);
    }

    public function store(Request $request)
    {
        // dd($request);

        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'unit_id' => 'required|exists:units,id',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'purchase_price' => 'nullable|numeric|min:0',
            'selling_price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'min_stock' => 'nullable|integer|min:0',
            'bad_stock' => 'nullable|integer|min:0',
        ]);

        // upload image
        if ($request->hasFile('image')) {

            $image = $request->file('image');

            $filename = time().'_'.$image->getClientOriginalName();

            $destination = public_path($this->uploadPath);

            // buat folder jika belum ada
            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            $image->move($destination, $filename);

            $validated['image'] = $this->savePath.'/'.$filename;
        }

        Item::create($validated);

        return redirect()->route('master.items.show', $validated['category_id']);
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);

        $items = Item::with([
            'warehouse',
            'category',
            'unit'
        ])->where('category_id', $category->id)->get();

        // dd($items);

        $categories = Category::where('type', 'barang')->get();
        $warehouses = Warehouse::all(['id','name']);
        $units = Unit::all();

        return Inertia::render('admin/Items/Show', [
            'items' => $items,
            'category' => $category,
            'categories' => $categories,
            'warehouses' => $warehouses,
            'units' => $units,
        ]);
    }

    public function update(Request $request, Item $item)
    {
        // dd($request);

        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'unit_id' => 'required|exists:units,id',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'purchase_price' => 'nullable|numeric|min:0',
            'selling_price' => 'nullable|numeric|min:0',
            'stock' => 'nullable|integer|min:0',
            'min_stock' => 'nullable|integer|min:0',
            'bad_stock' => 'nullable|integer|min:0',
        ]);

        // upload image baru
        if ($request->hasFile('image')) {

            // hapus image lama
            if ($item->image && File::exists(public_path($item->image))) {
                File::delete(public_path($item->image));
            }

            $image = $request->file('image');
            $filename = time().'_'.$image->getClientOriginalName();

            $destination = public_path($this->uploadPath);

            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            $image->move($destination, $filename);

            $validated['image'] = $this->savePath.'/'.$filename;
        }

        $item->update($validated);

        return redirect()->route('master.items.show', $validated['category_id']);
    }

    public function destroy(Item $item)
    {
        $categoryId = $item->category_id;

        // hapus image
        if ($item->image && File::exists(public_path($item->image))) {
            File::delete(public_path($item->image));
        }

        $item->delete();

        return redirect()->route('master.items.show', $categoryId);
    }
}