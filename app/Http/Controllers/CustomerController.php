<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();
        return Inertia::render('admin/Customers', [
            'customers' => $customers,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/Customers');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
        ]);

        Customer::create($validated);
        return Inertia::location(route('customers.index'));
    }

    public function show(Customer $customer)
    {
        return Inertia::render('admin/Customers', [
            'customer' => $customer,
        ]);
    }

    public function edit(Customer $customer)
    {
        return Inertia::render('admin/Customers', [
            'customer' => $customer,
        ]);
    }

    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
        ]);

        $customer->update($validated);
        return Inertia::location(route('customers.index'));
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();
        return Inertia::location(route('customers.index'));
    }
}
