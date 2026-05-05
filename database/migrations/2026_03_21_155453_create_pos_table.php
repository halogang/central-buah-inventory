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
        Schema::create('pos', function (Blueprint $table) {
            $table->id();
            $table->string('pos_number')->unique();
            $table->date('date');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

            $table->integer('subtotal')->nullable();
            $table->integer('discount')->nullable();
            $table->integer('tax')->nullable();
            $table->integer('total');

            $table->string('payment_method')->default('Tunai');
            
            $table->integer('paid_amount')->nullable();
            $table->integer('change_amount')->nullable();
            
            //add type (self buying or delivery) and charge / postage
            $table->string('type')->default('self-buying');
            $table->integer('charge')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pos');
    }
};
