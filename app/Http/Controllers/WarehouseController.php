<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    public function index()
    {
        $warehouses = Warehouse::all();
        return Inertia::render('admin/Warehouses', [
            'warehouses' => $warehouses,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Warehouses');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'capacity' => 'nullable|integer',
            'pic' => 'nullable|string|max:255',
            'status' => 'required|in:active,nonactive',
        ]);

        Warehouse::create($validated);
        return Inertia::location(route('warehouses.index'));
    }

    public function show(Warehouse $warehouse)
    {
        return Inertia::render('admin/Warehouses', [
            'warehouse' => $warehouse,
        ]);
    }

    public function edit(Warehouse $warehouse)
    {
        return Inertia::render('admin/Warehouses', [
            'warehouse' => $warehouse,
        ]);
    }

    public function update(Request $request, Warehouse $warehouse)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'capacity' => 'nullable|integer',
            'pic' => 'nullable|string|max:255',
            'status' => 'required|in:active,nonactive',
        ]);

        $warehouse->update($validated);
        return Inertia::location(route('warehouses.index'));
    }

    public function destroy(Warehouse $warehouse)
    {
        $warehouse->delete();
        return Inertia::location(route('warehouses.index'));
    }
}
