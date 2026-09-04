<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('role');
            $table->string('location')->nullable();
            $table->unsignedTinyInteger('experience_years')->default(0);
            $table->json('skills')->nullable();
            $table->enum('status', ['Available', 'Interview', 'Hired', 'Rejected'])->default('Available');
            $table->unsignedTinyInteger('score')->default(0);
            $table->string('cv_path')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
