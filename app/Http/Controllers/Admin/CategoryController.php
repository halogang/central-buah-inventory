<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class CategoryController extends Controller
{
    private $uploadPath = '../../public_html/images/categories';
    private $savePath = '/images/categories';
    
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
        $thumbDestination = public_path($this->uploadPath.'/thumb');

        // =============================
        // Upload gambar baru
        // =============================
        if ($request->hasFile('image')) {

            // hapus gambar lama
            if ($category->image) {

                $oldImage = public_path($category->image);
                $oldThumb = public_path(
                    dirname($category->image).'/thumb/thumb_'.basename($category->image)
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

        // =============================
        // Jika tipe pengeluaran
        // =============================
        if ($validated['type'] === 'pengeluaran') {

            if ($category->image) {

                $oldImage = public_path($category->image);
                $oldThumb = public_path(
                    dirname($category->image).'/thumb/thumb_'.basename($category->image)
                );

                if (File::exists($oldImage)) {
                    File::delete($oldImage);
                }

                if (File::exists($oldThumb)) {
                    File::delete($oldThumb);
                }
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
