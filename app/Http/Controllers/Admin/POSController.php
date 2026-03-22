<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class POSController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productData = Item::with('unit')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'price' => $item->selling_price,
                'unit' => $item->unit->unit_code ?? 'pcs',
                'image' => $item->image,
            ];
        });

        return Inertia::render('admin/POS/Index', [
            'productData' => $productData
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());

        $validated = $request->validate([
            'date' => 'required|date',
            'total' => 'required|integer',
            'payment_method' => 'required|string',
            'paid_amount' => 'nullable|integer',
            'change_amount' => 'nullable|integer',
            'items' => 'required|array',
        ]);

        dd($validated);

        // sementara return aja dulu
        return back()->with('success', 'Transaksi berhasil');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
