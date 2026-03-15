<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\HomeController;
use \App\Http\Controllers\Admin\DeliveryOrderController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\WebsiteInfoController;

Route::inertia('/', 'Home', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', [DashboardController::class, 'index'])->middleware('permission:Dashboard')->name('dashboard');

    Route::get('/test-permission', function () {
        return 'ok';
    })->middleware('permission:Dashboard');

    Route::prefix('master')
        ->name('master.')
        ->middleware('permission:Master Data')
        ->group(function () {

            Route::get('website-info', [WebsiteInfoController::class, 'index'])
                ->name('website-info.index');

            Route::put('website-info/{websiteInfo}', [WebsiteInfoController::class, 'update'])
                ->name('website-info.update');

            Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
            Route::resource('suppliers', \App\Http\Controllers\Admin\SupplierController::class);
            Route::resource('customers', \App\Http\Controllers\Admin\CustomerController::class);
            Route::resource('payment-methods', \App\Http\Controllers\Admin\PaymentMethodController::class);
            Route::resource('items', \App\Http\Controllers\Admin\ItemController::class);
            Route::resource('units', \App\Http\Controllers\Admin\UnitController::class);
            Route::resource('carts', \App\Http\Controllers\Admin\CartController::class);

            // Gudang requires explicit Gudang permission
            Route::resource('warehouses', \App\Http\Controllers\Admin\WarehouseController::class)
                ->middleware('permission:Gudang');

            // Users and Roles require Pengguna & Role permission
            Route::resource('users', \App\Http\Controllers\Admin\UserController::class)
                ->middleware('permission:Pengguna & Role');
            Route::put('users/{user}/password', [\App\Http\Controllers\Admin\UserController::class, 'updatePassword'])
                ->name('users.password.update')
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
            Route::resource('stok-opname', \App\Http\Controllers\Admin\OpnameStockController::class);
            Route::resource('movement', \App\Http\Controllers\Admin\StockMovementController::class);
        });

    Route::resource('surat-jalan', DeliveryOrderController::class)
        ->middleware('permission:Surat Jalan');

    Route::get('/surat-jalan/{surat_jalan}/print', 
        [DeliveryOrderController::class, 'print']
    )->name('surat-jalan.print');

    Route::get('/surat-jalan/preview-number/{type}', [DeliveryOrderController::class, 'previewNumber']);

    Route::resource('invoice', InvoiceController::class)
        ->middleware('permission:Invoice');

    Route::get('/invoice/{invoice}/print', 
        [InvoiceController::class, 'print']
    )->name('invoice.print');

    Route::prefix('transactions')->group(function () {

        Route::post('/payments', [PaymentController::class, 'store'])
            ->name('transactions.payments.store');

    });

    Route::resource('keuangan', \App\Http\Controllers\Admin\PettyCashTransactionController::class)
        ->middleware('permission:Keuangan');

    Route::resource('laporan', \App\Http\Controllers\Admin\ReportController::class)
        ->middleware('permission:Laporan');

    Route::resource('pos', \App\Http\Controllers\Admin\POSController::class)
        ->middleware('permission:POS Kasir');

    Route::resource('laporan', \App\Http\Controllers\Admin\ReportController::class)
        ->middleware('permission:Laporan');

    Route::resource('stock-movement', \App\Http\Controllers\Admin\StockMovementController::class);
        // ->middleware('permission:Laporan');
        
});

require __DIR__.'/settings.php';
