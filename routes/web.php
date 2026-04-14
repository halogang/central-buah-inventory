<?php

use App\Http\Controllers\Admin\BranchController;
use App\Http\Controllers\Admin\CartController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\HomeController;
use \App\Http\Controllers\Admin\DeliveryOrderController;
use App\Http\Controllers\Admin\DeliveryScheduleController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\ItemController;
use App\Http\Controllers\Admin\OpnameStockController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\PaymentMethodController;
use App\Http\Controllers\Admin\PettyCashTransactionController;
use App\Http\Controllers\Admin\POSController;
use App\Http\Controllers\Admin\RealTimeStockController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\StockMovementController;
use App\Http\Controllers\Admin\SupplierController;
use App\Http\Controllers\Admin\UnitController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\WarehouseController;
use App\Http\Controllers\Admin\WebsiteInfoController;

Route::inertia('/', 'Home', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('dashboard', [DashboardController::class, 'index'])->middleware('permission:dashboard.view')->name('dashboard');


    Route::prefix('master')->name('master.')->group(function () {

    Route::get('website-info', [WebsiteInfoController::class, 'index'])
        ->middleware('permission:info_website.index')
        ->name('website-info.index');

    Route::put('website-info/{websiteInfo}', [WebsiteInfoController::class, 'update'])
        ->middleware('permission:info_website.update')
        ->name('website-info.update');

    Route::resource('categories', CategoryController::class)
        ->middleware('permission:kategori.index|kategori.create|kategori.update|kategori.delete');

    Route::resource('branches', BranchController::class)
        ->middleware('permission:branch.index|branch.create|branch.update|branch.delete');

    Route::resource('suppliers', SupplierController::class)
        ->middleware('permission:supplier.index|supplier.create|supplier.update|supplier.delete');

    Route::resource('customers', CustomerController::class)
        ->middleware('permission:pelanggan.index|pelanggan.create|pelanggan.update|pelanggan.delete');

    Route::resource('payment-methods', PaymentMethodController::class)
        ->middleware('permission:payment_method.index|payment_method.create|payment_method.update|payment_method.delete');

    Route::resource('items', ItemController::class)
        ->middleware('permission:barang.index|barang.create|barang.update|barang.delete');

    Route::resource('units', UnitController::class)
        ->middleware('permission:unit.index|unit.create|unit.update|unit.delete');

    Route::resource('carts', CartController::class)
        ->middleware('permission:keranjang.index|keranjang.create|keranjang.update|keranjang.delete');

    Route::resource('warehouses', WarehouseController::class)
        ->middleware('permission:gudang.index|gudang.create|gudang.update|gudang.delete');

    Route::resource('users', UserController::class)
        ->middleware('permission:user.index|user.create|user.update|user.delete');

    Route::put('users/{user}/password', [UserController::class, 'updatePassword'])
        ->middleware('permission:user.update')
        ->name('users.password.update');

    Route::resource('roles', RoleController::class)
            ->middleware('permission:role.index|role.create|role.update|role.delete');

    });


    Route::prefix('stok')->name('stok.')->group(function () {

        Route::resource('realtime', RealTimeStockController::class)
            ->middleware('permission:stock_realtime.index');

        Route::resource('stok-opname', OpnameStockController::class)
            ->middleware('permission:stock_opname.index|stock_opname.create|stock_opname.update|stock_opname.delete');

        Route::resource('movement', StockMovementController::class)
            ->middleware('permission:stock_movement.index|stock_movement.create|stock_movement.update|stock_movement.delete');

    });
    

    Route::resource('surat-jalan', DeliveryOrderController::class)
        ->middleware('permission:delivery_order.index|delivery_order.create|delivery_order.update|delivery_order.delete')
        ->parameters([
            'surat-jalan' => 'deliveryOrder'
        ]);;

    Route::get('/surat-jalan/{surat_jalan}/print', 
            [DeliveryOrderController::class, 'print']
        )->middleware('permission:delivery_order.index')
        ->name('surat-jalan.print');

    Route::patch('/surat-jalan/{surat_jalan}/update-status', 
            [DeliveryOrderController::class, 'updateStatus']
        )->middleware('permission:delivery_order.update')
        ->name('surat-jalan.update-status');

    Route::resource('delivery-schedules', DeliveryScheduleController::class)
        ->middleware('permission:delivery_schedule.index|delivery_schedule.create|delivery_schedule.update|delivery_schedule.delete');

    Route::get('/surat-jalan/preview-number/{type}', [DeliveryOrderController::class, 'previewNumber']);

    Route::resource('invoice', InvoiceController::class)
        ->middleware('permission:invoice.index|invoice.create|invoice.update|invoice.delete');
    
    Route::prefix('transactions')->group(function () {

        Route::post('/payments', [PaymentController::class, 'store'])
            ->name('transactions.payments.store')
            ->middleware('permission:finance.create'); // ⬅️ penting

    });

    Route::resource('delivery-schedules', DeliveryScheduleController::class);
    
    Route::get('/invoice/{invoice}/print', 
        [InvoiceController::class, 'print']
    )->name('invoice.print');

    Route::resource('keuangan', PettyCashTransactionController::class)
        ->middleware('permission:finance.index|finance.create|finance.update|finance.delete')
        ->parameters([
            'keuangan' => 'pettyCashTransaction'
        ]);

    Route::resource('laporan', ReportController::class)
        ->middleware('permission:report.index');

    Route::resource('pos', POSController::class)
        ->middleware('permission:pos.index|pos.create');
        
});

require __DIR__.'/settings.php';
