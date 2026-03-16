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
        Schema::create('petty_cash_transactions', function (Blueprint $table) {
            $table->id();

            $table->date('date');

            $table->enum('type', ['income', 'expense']);

            $table->decimal('amount', 15, 2);

            // $table->foreignId('expense_category_id')
            //     ->nullable()
            //     ->constrained()
            //     ->nullOnDelete();
            $table->string('expense_category')->nullable();

            $table->text('description')->nullable();

            $table->foreignId('created_by')
                ->nullable()
                ->constrained('users')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('petty_cash_transactions');
    }
};
