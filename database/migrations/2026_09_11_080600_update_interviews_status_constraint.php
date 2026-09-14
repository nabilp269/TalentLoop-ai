<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement('ALTER TABLE interviews DROP CONSTRAINT IF EXISTS interviews_status_check');

        DB::statement(
            "ALTER TABLE interviews ADD CONSTRAINT interviews_status_check
             CHECK (status IN ('Scheduled', 'Interview', 'Done', 'Cancelled'))"
        );
    }

    public function down(): void
    {
        DB::statement('ALTER TABLE interviews DROP CONSTRAINT IF EXISTS interviews_status_check');
    }
};
