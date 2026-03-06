<?php

namespace App\Http\Controllers;

use App\Models\Category;

// use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::with([
            'items'
        ])->where('type', 'barang')->get();

        return inertia('Home', [
            'categories' => $categories,
        ]);
    }
}
