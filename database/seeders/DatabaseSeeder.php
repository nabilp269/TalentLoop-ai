<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Default user
        User::firstOrCreate(
            ['email' => 'nabil@talentloop.com'],
            [
                'name'     => 'Nabil Putra',
                'password' => bcrypt('password'),
            ]
        );

        $this->call([
            JobSeeder::class,
            CandidateSeeder::class,
            InterviewSeeder::class,
            OutreachSeeder::class,
        ]);
    }
}
