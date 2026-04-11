<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset permission cache
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // ======================
        // PERMISSIONS
        // ======================

        // 10 Indonesian permissions (simplified, no redundancy)
        // $permissions = [
        //     'Dashboard',
        //     'Master Data',
        //     'Manajemen Stok',
        //     'Gudang',
        //     'Surat Jalan',
        //     'Invoice',
        //     'POS Kasir',
        //     'Keuangan',
        //     'Laporan',
        //     'Pengguna & Role',
        // ];

        $newPermissions = [

            //dashboard
            'dashboard.view',
            
            // ====================
            // MASTER DATA
            // ====================

            //Info Website
            'info_website.index',
            'info_website.update',

            //Barang
            'barang.index',
            'barang.create',
            'barang.update',
            'barang.delete',

            //Keranjang
            'keranjang.index',
            'keranjang.create',
            'keranjang.update',
            'keranjang.delete',

            //Gudang
            'gudang.index',
            'gudang.create',
            'gudang.update',
            'gudang.delete',

            //Kategori
            'kategori.index',
            'kategori.create',
            'kategori.update',
            'kategori.delete',

            //Supplier
            'supplier.index',
            'supplier.create',
            'supplier.update',
            'supplier.delete',

            //Pelanggan
            'pelanggan.index',
            'pelanggan.create',
            'pelanggan.update',
            'pelanggan.delete',

            // Pengguna & Role
            'user.index',
            'user.create',
            'user.update',
            'user.delete',

            'role.index',
            'role.create',
            'role.update',
            'role.delete',

            // Metode Pembayaran
            'payment_method.index',
            'payment_method.create',
            'payment_method.update',
            'payment_method.delete',

            // ======================
            // MANAJEMEN STOK
            // ======================

            // Stok Realtime
            'stock_realtime.index',

            // Stok Opname
            'stock_opname.index',
            'stock_opname.create',
            'stock_opname.update',
            'stock_opname.delete',

            // Stok Movement
            'stock_movement.index',
            'stock_movement.create',
            'stock_movement.update',
            'stock_movement.delete',

            // ======================
            // SURAT JALAN & INVOICE
            // ======================

            // Jadwal Surat Jalan
            'delivery_schedule.index',
            'delivery_schedule.create',
            'delivery_schedule.update',
            'delivery_schedule.delete',

            // Surat Jalan
            'delivery_order.index',
            'delivery_order.create',
            'delivery_order.update',
            'delivery_order.delete',

            // Invoice
            'invoice.index',
            'invoice.payment',

            // ======================
            // KEUANGAN
            // ======================

            'finance.index',
            'finance.create.income',
            'finance.create.expense',
            'finance.update',
            'finance.delete',

            // ======================
            // POS
            // ======================

            'pos.index',
            'pos.create',

            // ======================
            // LAPORAN
            // ======================

            'report.index',

        ];


        foreach ($newPermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // ======================
        // ROLES
        // ======================

        $owner = Role::firstOrCreate(
            ['name' => 'owner'],
            ['description' => 'Akses penuh']
        );
        $admin = Role::firstOrCreate(
            ['name' => 'admin'],
            ['description' => 'Administrator sistem']
        );
        $spv = Role::firstOrCreate(
            ['name' => 'spv_gudang'],
            ['description' => 'Supervisor gudang']
        );
        $kasir = Role::firstOrCreate(
            ['name' => 'kasir'],
            ['description' => 'Kasir toko']
        );
        $antar = Role::firstOrCreate(
            ['name' => 'staff_antar'],
            ['description' => 'Staf pengantar']
        );


        $all = fn($prefix) => collect($newPermissions)
            ->filter(fn($p) => str_starts_with($p, $prefix))
            ->values()
            ->toArray();

        // Owner = full access
        $owner->syncPermissions(Permission::all());

        // Admin = Dashboard, Master Data, Manajemen Stok, Invoice, Keuangan, Laporan
        $adminPermissions = array_merge(

            //Dashboard
            ['dashboard.view'],

            //Master Data (exclude user & role)
            collect($newPermissions)
                ->filter(fn($p) =>
                    str_starts_with($p, 'info_website') ||
                    str_starts_with($p, 'barang') ||
                    str_starts_with($p, 'keranjang') ||
                    str_starts_with($p, 'gudang') ||
                    str_starts_with($p, 'kategori') ||
                    str_starts_with($p, 'supplier') ||
                    str_starts_with($p, 'pelanggan') ||
                    str_starts_with($p, 'payment_method')
                )->toArray(),
            
            //Stok
            $all('stock_'),

            //invoice
            $all('invoice'),

            //keuangan
            $all('finance'),

            //laporan
            ['report.index']
        );

        $admin->syncPermissions($adminPermissions);

        // SPV Gudang = Manajemen Stok, Surat Jalan
        $spv->syncPermissions(array_merge(
            $all('stock_'),
            $all('delivery_')
        ));

        // Kasir = POS Kasir
        $kasir->syncPermissions($all('pos'));

        // Staff Antar = Surat Jalan
        $antar->syncPermissions($all('delivery_order'));

        // ======================
        // DEFAULT USERS
        // ======================

        $users = [
            ['name' => 'Owner', 'username' => 'owner', 'email' => 'owner@mail.com', 'role' => 'owner', 'phone' => '0812-0000-0000'],
            ['name' => 'Admin', 'username' => 'admin', 'email' => 'admin@mail.com', 'role' => 'admin', 'phone' => '0812-0000-0001'],
            ['name' => 'Lutfi', 'username' => 'lutfi', 'email' => 'lutfi@mail.com', 'role' => 'spv_gudang', 'phone' => '0812-0000-0002'],
            ['name' => 'Rayhan', 'username' => 'rayhan', 'email' => 'rayhan@mail.com', 'role' => 'spv_gudang', 'phone' => '0812-0000-0002'],
            ['name' => 'Fardan', 'username' => 'fardan', 'email' => 'fardan@mail.com', 'role' => 'spv_gudang', 'phone' => '0812-0000-0002'],
            ['name' => 'Josefh', 'username' => 'josefh', 'email' => 'josefh@mail.com', 'role' => 'spv_gudang', 'phone' => '0812-0000-0002'],
            ['name' => 'Maria', 'username' => 'maria', 'email' => 'maria@mail.com', 'role' => 'spv_gudang', 'phone' => '0812-0000-0002'],
            ['name' => 'Yefta', 'username' => 'yefta', 'email' => 'yefta@mail.com', 'role' => 'spv_gudang', 'phone' => '0812-0000-0002'],
            ['name' => 'Nanda', 'username' => 'nanda', 'email' => 'nanda@mail.com', 'role' => 'spv_gudang', 'phone' => '0812-0000-0002'],
            ['name' => 'Gusniar', 'username' => 'gusniar', 'email' => 'gusniar@mail.com', 'role' => 'spv_gudang', 'phone' => '0812-0000-0002'],
            ['name' => 'Kasir', 'username' => 'kasir', 'email' => 'kasir@mail.com', 'role' => 'kasir', 'phone' => '0812-0000-0003'],
            ['name' => 'Staff Antar', 'username' => 'staff_antar', 'email' => 'antar@mail.com', 'role' => 'staff_antar', 'phone' => '0812-0000-0004'],
        ];

        foreach ($users as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'username' => $data['username'],
                    'phone' => $data['phone'],
                    'password' => Hash::make('password'),
                ]
            );

            $user->assignRole($data['role']);
        }
    }
}