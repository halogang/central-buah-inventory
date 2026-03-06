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

            Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
            Route::resource('suppliers', \App\Http\Controllers\Admin\SupplierController::class);
            Route::resource('customers', \App\Http\Controllers\Admin\CustomerController::class);
            Route::resource('payment-methods', \App\Http\Controllers\Admin\PaymentMethodController::class);
            Route::resource('items', \App\Http\Controllers\Admin\ItemController::class);

            // Gudang requires explicit Gudang permission
            Route::resource('warehouses', \App\Http\Controllers\Admin\WarehouseController::class)
                ->middleware('permission:Gudang');

            // Users and Roles require Pengguna & Role permission
            Route::resource('users', \App\Http\Controllers\Admin\UserController::class)
                ->middleware('permission:Pengguna & Role');

            Route::resource('roles', \App\Http\Controllers\Admin\RoleController::class)
                ->middleware('permission:Pengguna & Role');
        });

    Route::prefix('stok')
        ->name('stok.')
        ->middleware('permission:Manajemen Stok')
        ->group(function () {
            Route::resource('realtime', \App\Http\Controllers\Admin\RealTimeStockController::class);
            Route::resource('masuk', \App\Http\Controllers\Admin\StockInController::class);
            Route::resource('keluar', \App\Http\Controllers\Admin\StockOutController::class);
        });

    Route::resource('surat-jalan', \App\Http\Controllers\Admin\DeliveryOrderController::class)
        ->middleware('permission:Surat Jalan');

    Route::resource('invoice', \App\Http\Controllers\Admin\InvoiceController::class)
        ->middleware('permission:Invoice');

    Route::resource('keuangan', \App\Http\Controllers\Admin\FinanceController::class)
        ->middleware('permission:Keuangan');

    Route::resource('laporan', \App\Http\Controllers\Admin\ReportController::class)
        ->middleware('permission:Laporan');

    Route::resource('pos', \App\Http\Controllers\Admin\POSController::class)
        ->middleware('permission:POS Kasir');
});

require __DIR__.'/settings.php';
