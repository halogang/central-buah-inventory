<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentMethodController extends Controller
{
    public function index()
    {
        $methods = PaymentMethod::all();
        return Inertia::render('admin/PaymentMethods', [
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
        return Inertia::location(route('payment_methods.index'));
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
        return Inertia::location(route('payment_methods.index'));
    }

    public function destroy(PaymentMethod $paymentMethod)
    {
        $paymentMethod->delete();
        return Inertia::location(route('payment_methods.index'));
    }
}
