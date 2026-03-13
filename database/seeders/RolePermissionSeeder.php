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
        $permissions = [
            'Dashboard',
            'Master Data',
            'Manajemen Stok',
            'Gudang',
            'Surat Jalan',
            'Invoice',
            'POS Kasir',
            'Keuangan',
            'Laporan',
            'Pengguna & Role',
        ];


        foreach ($permissions as $permission) {
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

        // Owner = full access
        $owner->syncPermissions(Permission::all());

        // Admin = Dashboard, Master Data, Manajemen Stok, Invoice, Keuangan, Laporan
        $admin->syncPermissions([
            'Dashboard',
            'Master Data',
            'Manajemen Stok',
            'Invoice',
            'Keuangan',
            'Laporan',
        ]);

        // SPV Gudang = Manajemen Stok, Surat Jalan
        $spv->syncPermissions([
            'Manajemen Stok',
            'Surat Jalan',
        ]);

        // Kasir = POS Kasir
        $kasir->syncPermissions([
            'POS Kasir',
        ]);

        // Staff Antar = Surat Jalan
        $antar->syncPermissions([
            'Surat Jalan',
        ]);

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