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
        $pettyCashTransactions = PettyCashTransaction::latest()->get();

        $totalIncome = $pettyCashTransactions
            ->where('type', 'income')
            ->sum('amount');

        $totalExpense = $pettyCashTransactions
            ->where('type', 'expense')
            ->sum('amount');

        $balance = $totalIncome - $totalExpense;

        return Inertia::render('admin/PettyCash/Index', [
            'pettyCashTransactions' => $pettyCashTransactions,
            'balance' => $balance
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
        $request->validate([
            'date' => 'required|date',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:1',
            'description' => 'nullable|string',
            'expense_category' => 'nullable|string'
        ]);

        // validasi tambahan jika expense
        if ($request->type === 'expense' && !$request->expense_category) {
            return back()->withErrors([
                'expense_category' => 'Kategori pengeluaran wajib diisi'
            ]);
        }

        PettyCashTransaction::create([
            'date' => $request->date,
            'type' => $request->type,
            'amount' => $request->amount,
            'expense_category' => $request->type === 'expense'
                ? $request->expense_category
                : null,
            'description' => $request->description,
            'created_by' => Auth::id()
        ]);

        return back()->with('success', 'Transaksi kas berhasil ditambahkan');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PettyCashTransaction $pettyCashTransaction)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:1',
            'description' => 'nullable|string',
            'expense_category' => 'nullable|string'
        ]);

        // validasi tambahan jika expense
        if ($request->type === 'expense' && !$request->expense_category) {
            return back()->withErrors([
                'expense_category' => 'Kategori pengeluaran wajib diisi'
            ]);
        }

        $pettyCashTransaction->update([
            'date' => $validated['date'],
            'type' => $validated['type'],
            'amount' => $validated['amount'],
            'description' => $validated['description'],
            'expense_category' => $validated['type'] === 'expense'
                ? ($validated['expense_category'] ?: $pettyCashTransaction->expense_category)
                : null,
        ]);

        return back()->with('success', 'Transasksi berhasil diperbarui');
    }

    public function destroy(PettyCashTransaction $pettyCashTransaction)
    {
        $pettyCashTransaction->delete();
        return back()->with('success', 'Transaksi berhasil dihapus');
    }
}
