<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')
        ->middleware('permission:Dashboard')
        ->name('dashboard');

    Route::get('/test-permission', function () {
        return 'ok';
    })->middleware('permission:Dashboard');

    Route::prefix('master')
        ->name('master.')
        ->middleware('permission:Master Data')
        ->group(function () {

            Route::resource('categories', \App\Http\Controllers\CategoryController::class);
            Route::resource('suppliers', \App\Http\Controllers\SupplierController::class);
            Route::resource('customers', \App\Http\Controllers\CustomerController::class);
            Route::resource('payment-methods', \App\Http\Controllers\PaymentMethodController::class);
            Route::resource('items', \App\Http\Controllers\ItemController::class);

            // Gudang requires explicit Gudang permission
            Route::resource('warehouses', \App\Http\Controllers\WarehouseController::class)
                ->middleware('permission:Gudang');

            // Users and Roles require Pengguna & Role permission
            Route::resource('users', \App\Http\Controllers\UserController::class)
                ->middleware('permission:Pengguna & Role');

            Route::resource('roles', \App\Http\Controllers\RoleController::class)
                ->middleware('permission:Pengguna & Role');
        });
});

require __DIR__.'/settings.php';
