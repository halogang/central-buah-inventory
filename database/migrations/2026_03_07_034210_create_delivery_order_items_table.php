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

            $table->integer('quantity')->default(0);
            $table->integer('bad_stock')->default(0);

            $table->decimal('price', 15, 2)->default(0);

            $table->foreignId('cart_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();
            $table->integer('cart_weight')->nullable();
            $table->integer('cart_qty')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('delivery_order_items');
    }
};
