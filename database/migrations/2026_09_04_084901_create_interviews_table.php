<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('candidate_id')->constrained()->cascadeOnDelete();
            $table->foreignId('job_id')->constrained('vacancies')->cascadeOnDelete();
            $table->dateTime('scheduled_at');
            $table->enum('type', ['Online', 'Offline', 'Phone'])->default('Online');
            $table->enum('status', ['Scheduled', 'Interview', 'Done', 'Cancelled'])->default('Scheduled');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('interviews');
    }
};
