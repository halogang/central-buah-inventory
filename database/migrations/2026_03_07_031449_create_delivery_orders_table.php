<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('delivery_orders', function (Blueprint $table) {
            $table->id();

            $table->date('date');
            
            $table->string('do_number')->nullable(); // nomor DO

            $table->enum('type', [
                'in',
                'out'
            ])->default('in');

            $table->foreignId('supplier_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();
            $table->foreignId('customer_id')
                ->nullable()
                ->constrained()
                ->nullOnDelete();

            $table->string('sender_name')->nullable();
            $table->string('receiver_name')->nullable();

            $table->string('evidence')->nullable(); // foto barang

            $table->enum('status', [
                'draft',
                'sent',
                'done'
            ])->default('draft');

            $table->string('sender_signature')->nullable();
            $table->string('receiver_signature')->nullable();

            $table->decimal('total_amount', 15, 2)->default(0);

            $table->text('note')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('delivery_orders');
    }
};
