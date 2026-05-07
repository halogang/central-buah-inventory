<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('delivery_order_items', function (Blueprint $table) {

            /**
             * harga per kilo asli item
             */
            $table->decimal('unit_price', 15, 2)
                ->default(0)
                ->after('bad_stock');
        });

        Schema::table('delivery_orders', function (Blueprint $table) {

            /**
             * ongkos muat / angkut
             */
            $table->decimal('loading_cost', 15, 2)
                ->default(0)
                ->after('total_weight');
        });
    }

    public function down(): void
    {
        Schema::table('delivery_order_items', function (Blueprint $table) {
            $table->dropColumn('unit_price');
        });

        Schema::table('delivery_orders', function (Blueprint $table) {
            $table->dropColumn('loading_cost');
        });
    }
};