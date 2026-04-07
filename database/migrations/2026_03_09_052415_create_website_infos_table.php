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
        Schema::create('website_infos', function (Blueprint $table) {
            $table->id();

            $table->string('nama_usaha');
            $table->text('alamat');
            $table->string('kontak');
            $table->string('email')->nullable();
            $table->string('npwp')->nullable();

            $table->string('jam_operasional');

            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();

            $table->string('link_maps')->nullable();

            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('whatsapp')->nullable();

            $table->string('footer_copyright')->nullable();

            $table->string('hero_image')->nullable();

            $table->text('about_content')->nullable();
            $table->string('about_image')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('website_infos');
    }
};
