<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Item;
use App\Models\Category;
use App\Models\StockMovement;
use App\Models\Unit;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    // default upload path (nanti bisa kamu ubah sendiri)
    // private $uploadPath = '/images/items';
    private $uploadPath = '../../public_html/images/items';
    private $savePath = '/images/items';

    public function index()
    {
        $items = Item::with(['category','warehouse.branch', 'unit'])
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

            $fileName = Str::uuid().'.webp';
            $thumbName = 'thumb_'.$fileName;

            $destination = public_path($this->uploadPath);
            $thumbDestination = public_path($this->uploadPath.'/thumb');

            // buat folder jika belum ada
            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            if (!File::exists($thumbDestination)) {
                File::makeDirectory($thumbDestination, 0755, true);
            }

            $manager = new ImageManager(new Driver());

            $img = $manager->read($image->getRealPath());

            /*
            =========================
            MAIN IMAGE
            =========================
            */

            $img->scale(width: 1200); // max width 1200px
            $img->toWebp(80)->save($destination.'/'.$fileName); // compress 80%

            /*
            =========================
            THUMBNAIL
            =========================
            */

            $thumb = $manager->read($image->getRealPath());
            $thumb->cover(300, 300); // thumbnail 300x300
            $thumb->toWebp(75)->save($thumbDestination.'/'.$thumbName);

            $validated['image'] = $this->savePath.'/'.$fileName;
        }

        $item = Item::create($validated);

        StockMovement::create([
            'item_id' => $item->id,
            'warehouse_id' => $item->warehouse_id,
            'type' => 'adjustment',
            'quantity' => $item->stock,
            'bad_stock' => $item->bad_stock,
            'stock_before' => 0,
            'stock_after' => $item->stock,
            'reference_type' => 'item',
            'reference_id' => $item->id,
            'user_id' => Auth::id(),
            'note' => 'Item '.$item->id,
        ]);

        return redirect()->route('master.items.show', $validated['category_id']);
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);

        $items = Item::with([
            'warehouse.branch',
            'category',
            'unit'
        ])->where('category_id', $category->id)->get();

        // dd($items);

        $categories = Category::where('type', 'barang')->get();
        $warehouses = Warehouse::with('branch')->get();
        $units = Unit::all();
        $branches = Branch::all();

        return Inertia::render('admin/Items/Show', [
            'items' => $items,
            'category' => $category,
            'categories' => $categories,
            'warehouses' => $warehouses,
            'units' => $units,
            'branches' => $branches,
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

        $destination = public_path($this->uploadPath);
        $thumbDestination = public_path($this->uploadPath.'/thumb');

        // upload image baru
        if ($request->hasFile('image')) {

            // hapus image lama
            if ($item->image) {
                $oldImage = public_path($item->image);
                $oldThumb = public_path(
                    dirname($item->image).'/thumb/thumb_'.basename($item->image)
                );

                if (File::exists($oldImage)) {
                    File::delete($oldImage);
                }

                if (File::exists($oldThumb)) {
                    File::delete($oldThumb);
                }
            }

            $image = $request->file('image');

            $filename = Str::uuid().'.webp';
            $thumbName = 'thumb_'.$filename;

            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            if (!File::exists($thumbDestination)) {
                File::makeDirectory($thumbDestination, 0755, true);
            }

            $manager = new ImageManager(new Driver());

            /*
            =============================
            MAIN IMAGE
            =============================
            */

            $img = $manager->read($image->getRealPath());

            $img->scale(width: 1200);

            $img->toWebp(80)->save($destination.'/'.$filename);

            /*
            =============================
            THUMBNAIL
            =============================
            */

            $thumb = $manager->read($image->getRealPath());

            $thumb->cover(300, 300);

            $thumb->toWebp(75)->save($thumbDestination.'/'.$thumbName);

            $validated['image'] = $this->savePath.'/'.$filename;
        }

        StockMovement::where('reference_type','item')
                    ->where('reference_id',$item->id)
                    ->delete();

        $before = $item->stock;
        $before = $item->stock;

        $item->update($validated);

        StockMovement::create([
            'item_id' => $item->id,
            'warehouse_id' => $item->warehouse_id,
            'type' => 'adjustment',
            'quantity' => abs($before - $item->stock),
            'bad_stock' => $validated['bad_stock'],
            'stock_before' => $before,
            'stock_after' => $item->stock,
            'reference_type' => 'item',
            'reference_id' => $item->id,
            'user_id' => Auth::id(),
            'note' => 'Item '.$item->id,
        ]);

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