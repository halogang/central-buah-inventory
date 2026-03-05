<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    public function index()
    {
        $warehouses = Warehouse::orderBy('updated_at', 'desc')->get();
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
            'status' => 'nullable|in:active,nonactive',
        ]);

        $validated['status'] = $validated['status'] ?? 'nonactive';

        Warehouse::create($validated);
        return redirect()->route('master.warehouses.index');
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
            'status' => 'nullable|in:active,nonactive',
        ]);

        $validated['status'] = $validated['status'] ?? 'nonactive';

        $warehouse->update($validated);
        return redirect()->route('master.warehouses.index');
    }

    public function destroy(Warehouse $warehouse)
    {
        $warehouse->delete();
        return redirect()->route('master.warehouses.index');
    }
}
