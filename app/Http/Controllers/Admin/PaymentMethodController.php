<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentMethodController extends Controller
{
    public function index()
    {
        $methods = PaymentMethod::orderBy('updated_at', 'desc')->get();
        return Inertia::render('admin/PaymentMethods/Index', [
            'methods' => $methods,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/PaymentMethods');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'status' => 'required|in:active,nonactive',
        ]);

        PaymentMethod::create($validated);
        return redirect()->route('master.payment-methods.index');
    }

    public function show(PaymentMethod $paymentMethod)
    {
        return Inertia::render('admin/PaymentMethods', [
            'paymentMethod' => $paymentMethod,
        ]);
    }

    public function edit(PaymentMethod $paymentMethod)
    {
        return Inertia::render('admin/PaymentMethods', [
            'paymentMethod' => $paymentMethod,
        ]);
    }

    public function update(Request $request, PaymentMethod $paymentMethod)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'status' => 'required|in:active,nonactive',
        ]);

        $paymentMethod->update($validated);
        return redirect()->route('master.payment-methods.index');
    }

    public function destroy(PaymentMethod $paymentMethod)
    {
        $paymentMethod->delete();
        return redirect()->route('master.payment-methods.index');
    }
}
