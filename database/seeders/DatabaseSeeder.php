<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call(BranchSeeder::class);
        $this->call(WebsiteInfoSeeder::class);
        $this->call(RolePermissionSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(WarehouseSeeder::class);
        $this->call(SupplierSeeder::class);
        $this->call(CustomerSeeder::class);
        $this->call(PaymentMethodSeeder::class);
        $this->call(UnitSeeder::class);
        $this->call(CartSeeder::class);
        // $this->call(ItemSeeder::class);
    }
}
