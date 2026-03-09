<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Unit;

class UnitController extends Controller
{
    public function index()
    {
        $units = Unit::all();
        // dd($units);

        return Inertia::render('admin/Units/Index', [
            'units' => $units
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'unit_code' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Unit::create($validated);
        return redirect()->route('master.units.index');
    }

    public function update(Request $request, Unit $unit)
    {
        $validated = $request->validate([
            'unit_code' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $unit->update($validated);
        return redirect()->route('master.units.index');
    }

    public function destroy(Unit $unit)
    {
        $unit->delete();
        return redirect()->route('master.units.index');
    }
}
