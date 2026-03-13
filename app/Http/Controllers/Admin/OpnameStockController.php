<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\OpnameStock;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OpnameStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $roleName = $user->roles->first()->name;

        if ($roleName == 'spv_gudang') {
            
            $warehouses = Warehouse::where('user_id', $user->id)->get();
            $opnames = OpnameStock::with('warehouse', 'items', 'user')
            ->where('user_id', $user->id)
            ->withCount('items')
            ->latest()
            ->get();
        } else {
                
            $warehouses = Warehouse::all();
            $opnames = OpnameStock::with('warehouse', 'items', 'user')
            ->withCount('items')
            ->latest()
            ->get();   
        }
            
        $users = User::with('roles')
        ->whereHas('roles', function ($q) {
            $q->where('name', 'spv_gudang');
        })
        ->get();

        $items = Item::all();

        return Inertia::render('admin/StockManagement/OpnameStock/Index', [
            'opnames' => $opnames,
            'warehouses' => $warehouses,
            'items' => $items,
            'roleName' => $roleName,
            'users' => $users,
            'authUser' => $user
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
        // dd($request->all(    ));

        $validated = $request->validate([
            'date' => 'required|date',
            'warehouse_id' => 'nullable|exists:warehouses,id',
            'user_id' => 'nullable|exists:users,id',
            'note' => 'nullable|string',
            'items' => 'required|array',
            'updateItems' => 'required|boolean'
        ]);

        DB::transaction(function () use ($validated) {
            $user = Auth::user();
            $roleName = $user->roles->first()->name;

            $userId = $roleName === 'spv_gudang'
                ? $user->id
                : $validated['user_id'];

            $date = Carbon::parse($validated['date'])->format('Ymd');
            $warehouse = $validated['warehouse_id'] ?? '00';
            // hitung jumlah opname hari ini di gudang yang sama
            $count = OpnameStock::whereDate('date', $validated['date'])
                ->where('warehouse_id', $validated['warehouse_id'])
                ->count() + 1;

            

            $running = str_pad($count, 4, '0', STR_PAD_LEFT);

            $opnameNumber = "OPN/WH{$warehouse}/{$date}/{$running}";
            

            $opname = OpnameStock::create([
                'opname_number' => $opnameNumber,
                'date' => $validated['date'],
                'warehouse_id' => $validated['warehouse_id'],
                'user_id' => $userId,
                'note' => $validated['note'],
            ]);

            foreach ($validated['items'] as $row) {

                $difference = $row['physical_stock'] - $row['system_stock'];

                $opname->items()->create([
                    'item_id' => $row['item_id'],
                    'system_stock' => $row['system_stock'],
                    'physical_stock' => $row['physical_stock'],
                    'difference' => $difference,
                ]);

                if ($validated['updateItems']) {

                    $itemModel = Item::findOrFail($row['item_id']);

                    $itemModel->update([
                        'stock' => $row['physical_stock']
                    ]);
                }
            }
        });

        return redirect()->route('stok.stok-opname.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $opnameStock = OpnameStock::findOrFail($id);

        
        $opnameStock->load([
            'warehouse',
            'user',
            'items.item.category'
            ]);

        return Inertia::render(
            'admin/StockManagement/OpnameStock/Show',
            [
                'opname' => $opnameStock
            ]
        );
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
        $opnameStock = OpnameStock::findOrFail($id);
        // dd($request, $opnameStock);  

        DB::transaction(function () use ($request, $opnameStock) {

            $opnameStock->update([
                'date' => $request->date,
                'warehouse_id' => $request->warehouse_id,
                'checked_by' => $request->checked_by,
                'note' => $request->note,
            ]);

            $opnameStock->items()->delete();

            foreach ($request->items as $item) {

                $difference = $item['physical_stock'] - $item['system_stock'];

                $opnameStock->items()->create([
                    'item_id' => $item['item_id'],
                    'system_stock' => $item['system_stock'],
                    'physical_stock' => $item['physical_stock'],
                    'difference' => $difference,
                ]);
            }
        });

        return redirect()->route('stok.stok-opname.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $opnameStock = OpnameStock::findOrFail($id);

        $opnameStock->delete();
        return redirect()->route('stok.stok-opname.index');
    }
}
