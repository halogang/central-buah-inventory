<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StockMovementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stockMovements = StockMovement::with('warehouse', 'item', 'user')->latest()->get();

        $user = Auth::user();
        $roleName = $user->roles->first()->name;

        if ($roleName === 'spv_gudang') {
            $stockMovements = StockMovement::with('warehouse', 'item', 'user')
                ->where('user_id', $user->id)->latest()->get();
        }

        return Inertia::render('admin/StockMovement/Index', [
            'stockMovements' => $stockMovements
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
        //
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
