<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\PettyCashTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class PettyCashTransactionController extends Controller
{
    private $uploadPath = '../../public_html/images/petty_cash';    
    private $savePath = '/images/petty_cash';
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

        $categories = Category::where('type', 'pengeluaran')->get();

        return Inertia::render('admin/PettyCash/Index', [
            'pettyCashTransactions' => $pettyCashTransactions,
            'balance' => $balance,
            'categories' => $categories,
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
        $validated = $request->validate([
            'date' => 'required|date',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:1',
            'description' => 'nullable|string',
            'evidence' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'expense_category' => 'nullable|string'
        ]);

        if ($request->hasFile('evidence')) {
            
            $evidence = $request->file('evidence');

            $fileName = Str::uuid().'.webp';
            
            $destination = public_path($this->uploadPath);

            //create folder
            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            $manager = new ImageManager(new Driver);
            $img = $manager->read($evidence->getRealPath());

            $img->scale(width: 1200);
            $img->toWebp(80)->save($destination.'/'.$fileName);

            $validated['evidence'] = $this->savePath . '/' . $fileName;
        }

        // validasi tambahan jika expense
        if ($request->type === 'expense' && !$request->expense_category) {
            return back()->withErrors([
                'expense_category' => 'Kategori pengeluaran wajib diisi'
            ]);
        }

        PettyCashTransaction::create([
            'date' => $validated['date'],
            'type' => $validated['type'],
            'amount' => $validated['amount'],
            'evidence' => $validated['evidence'],
            'expense_category' => $validated['type'] === 'expense'
                ? $validated['expense_category']
                : null,
            'description' => $validated['description'],
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
            'evidence' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
            'expense_category' => 'nullable|string'
        ]);

        $destination = public_path($this->uploadPath);

        if ($request->hasFile('evidence')) {

            if ($pettyCashTransaction->evidence) {
                $oldEvidence = public_path($pettyCashTransaction->evidence);

                if (File::exists($oldEvidence)) {
                    File::delete($oldEvidence);
                }
            }

            $evidence = $request->file('evidence');

            $fileName = Str::uuid() . '.webp';

            if (!File::exists($destination)) {
                File::makeDirectory($destination, 0755, true);
            }

            $manager = new ImageManager(new Driver());

            $img = $manager->read($evidence->getRealPath());
            $img->scale(width: 1200);
            $img->toWebp(80)->save($destination . '/' . $fileName);

            $validated['evidence'] = $this->savePath . '/' . $fileName;
        }

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
            'evidence' => $validated['evidence'] ?? $pettyCashTransaction->evidence,
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
