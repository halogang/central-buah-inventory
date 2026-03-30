<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Item;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    public function index()
    {
        $warehouses = Warehouse::with('user', 'branch')->orderBy('updated_at', 'desc')->get();
        $users = User::with('roles')
        ->whereHas('roles', function ($q) {
            $q->where('name', 'spv_gudang');
        })
        ->get();
        
        return Inertia::render('admin/Warehouses/Index', [
            'users' => $users,
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
            'user_id' => 'nullable|exists:users,id',
            'status' => 'nullable|in:active,nonactive',
        ]);

        $validated['status'] = $validated['status'] ?? 'nonactive';

        Warehouse::create($validated);
        return redirect()->route('master.warehouses.index');
    }

    public function show(Warehouse $warehouse)
    {
        $warehouse = $warehouse->with('user')->first();

        $items = Item::with('category', 'unit')->where('warehouse_id', $warehouse->id)->get();
        $categories = Category::all();
        // dd($items);

        return Inertia::render('admin/Warehouses/Show', [
            'warehouse' => $warehouse,
            'items' => $items,
            'categories' => $categories
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
            'user_id' => 'nullable|exists:users,id',
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
