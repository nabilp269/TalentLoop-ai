<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('department')->nullable();
            $table->string('location')->nullable();
            $table->enum('type', ['Full-time', 'Part-time', 'Contract', 'Internship'])->default('Full-time');
            $table->enum('status', ['Open', 'Closed', 'Draft'])->default('Open');
            $table->text('description')->nullable();
            $table->json('requirements')->nullable();
            $table->string('salary_range')->nullable();
            $table->date('deadline')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vacancies');
    }
};
