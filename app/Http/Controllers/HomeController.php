<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\WebsiteInfo;

// use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::with([
            'items.unit'
        ])->where('type', 'barang')->get();

        $websiteInfo = WebsiteInfo::first();

        return inertia('Home', [
            'categories' => $categories,
            'websiteInfo' => $websiteInfo
        ]);
    }
}
