<?php

namespace App\Http\Controllers\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class CategoryController extends Controller
{
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
            'type' => 'required|in:barang,pengeluaran',
        ]);

        Category::create($validated);
        return Inertia::location(route('categories.index'));
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
            'type' => 'required|in:barang,pengeluaran',
        ]);

        $category->update($validated);
        return Inertia::location(route('categories.index'));
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return Inertia::location(route('categories.index'));
    }
}
