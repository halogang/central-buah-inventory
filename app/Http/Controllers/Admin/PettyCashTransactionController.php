<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PettyCashTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PettyCashTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('admin/PettyCash/Index');
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
        $request->validate([
            'date' => 'required|date',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:1',
            'description' => 'nullable|string',
            'expense_category_id' => 'required_if:type,expense|exists:expense_categories,id'
        ]);

        // validasi tambahan jika expense
        if ($request->type === 'expense' && !$request->expense_category_id) {
            return back()->withErrors([
                'expense_category_id' => 'Kategori pengeluaran wajib diisi'
            ]);
        }

        PettyCashTransaction::create([
            'date' => $request->date,
            'type' => $request->type,
            'amount' => $request->amount,
            'expense_category_id' => $request->type === 'expense'
                ? $request->expense_category_id
                : null,
            'description' => $request->description,
            'created_by' => Auth::id()
        ]);

        return back()->with('success', 'Transaksi kas berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(PettyCashTransaction $pettyCashTransaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PettyCashTransaction $pettyCashTransaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PettyCashTransaction $pettyCashTransaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PettyCashTransaction $pettyCashTransaction)
    {
        //
    }
}
