<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

class CategoryController extends Controller
{
    private $uploadPath = '../../public_html/images/items';
    
    public function index()
    {
        $categories = Category::orderBy('updated_at', 'desc')->get();
        return Inertia::render('admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        // display the same page; frontend will open modal
        return Inertia::render('admin/Categories');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'type' => 'required|in:barang,pengeluaran',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {

            $image = $request->file('image');

            $filename = time().'_'.$image->getClientOriginalName();

            $destination = public_path($this->uploadPath);

            // buat folder jika belum ada
            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            $image->move($destination, $filename);

            $validated['image'] = $this->uploadPath.'/'.$filename;
        }

        if ($validated['type'] === 'pengeluaran') {
            $validated['icon'] = '💵';
        }


        Category::create($validated);
        return redirect()->route('master.categories.index');
    }

    public function show(Category $category)
    {
        return Inertia::render('admin/Categories', [
            'category' => $category,
        ]);
    }

    public function edit(Category $category)
    {
        return Inertia::render('admin/Categories', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'icon' => 'nullable|string',
            'type' => 'required|in:barang,pengeluaran',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $destination = public_path($this->uploadPath);

        // =============================
        // Jika upload gambar baru
        // =============================
        if ($request->hasFile('image')) {

            // hapus gambar lama jika ada
            if ($category->image && File::exists(public_path($category->image))) {
                File::delete(public_path($category->image));
            }

            $image = $request->file('image');

            $filename = time().'_'.$image->getClientOriginalName();

            // buat folder jika belum ada
            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            $image->move($destination, $filename);

            $validated['image'] = $this->uploadPath.'/'.$filename;
        }

        // =============================
        // Jika tipe pengeluaran
        // =============================
        if ($validated['type'] === 'pengeluaran') {

            // hapus gambar lama jika ada
            if ($category->image && File::exists(public_path($category->image))) {
                File::delete(public_path($category->image));
            }

            $validated['image'] = null;
            $validated['icon'] = '💵';
        }

        $category->update($validated);

        return redirect()->route('master.categories.index');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('master.categories.index');
    }
}
