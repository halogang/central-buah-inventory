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
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();

            $table->foreignId('item_id')->constrained()->cascadeOnDelete();
            $table->foreignId('warehouse_id')->nullable()->constrained()->nullOnDelete();

            // sumber transaksi
            $table->string('reference_type'); 
            $table->unsignedBigInteger('reference_id')->nullable();

            // jenis movement
            $table->enum('type', [
                'in',
                'out',
                'adjustment'
            ]);

            // perubahan stok
            $table->integer('quantity');

            // stok sebelum dan sesudah
            $table->integer('stock_before');
            $table->integer('stock_after');

            // bad stock movement
            $table->integer('bad_stock')->default(0);

            $table->text('note')->nullable();

            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
