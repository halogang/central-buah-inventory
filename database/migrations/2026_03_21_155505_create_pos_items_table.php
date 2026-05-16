<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pos_items', function (Blueprint $table) {
            $table->id();

            $table->foreignId('pos_id')->constrained()->cascadeOnDelete();

            $table->foreignId('item_id')->nullable()->constrained()->nullOnDelete();

            $table->string('item_name')->nullable();
            $table->string('unit')->nullable();

            $table->integer('quantity');

            $table->integer('base_price');

            // harga jual final sebelum qty
            $table->integer('price');

            // diskon per item
            $table->integer('discount')->default(0);

            // price * qty
            $table->integer('subtotal')->default(0);

            // subtotal - discount
            $table->integer('total');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pos_items');
    }
};
