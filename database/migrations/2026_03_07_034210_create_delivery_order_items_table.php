<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('delivery_order_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('delivery_order_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('item_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->decimal('quantity', 15, 2)->default(0);
            $table->decimal('bad_stock', 15, 2)->default(0);

            $table->decimal('price', 15, 2)->default(0);

            $table->foreignId('cart_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();
            $table->decimal('cart_weight', 15, 2)->nullable();
            $table->decimal('cart_qty', 15, 2)->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('delivery_order_items');
    }
};
