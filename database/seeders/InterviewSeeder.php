<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\Interview;
use App\Models\Job;
use Illuminate\Database\Seeder;

class InterviewSeeder extends Seeder
{
    public function run(): void
    {
        $budi   = Candidate::where('email', 'budi.santoso@email.com')->first();
        $dimas  = Candidate::where('email', 'dimas.pratama@email.com')->first();
        $andi   = Candidate::where('email', 'andi.pratama@email.com')->first();

        $feJob      = Job::where('title', 'Senior Frontend Developer')->first();
        $beJob      = Job::where('title', 'Backend Developer (Laravel)')->first();

        if ($budi && $beJob) {
            Interview::create([
                'candidate_id' => $budi->id,
                'job_id'       => $beJob->id,
                'scheduled_at' => now()->addDays(3)->setHour(10)->setMinute(0),
                'type'         => 'Online',
                'status'       => 'Scheduled',
                'notes'        => 'Via Google Meet. Link akan dikirim via email.',
            ]);
        }

        if ($dimas && $beJob) {
            Interview::create([
                'candidate_id' => $dimas->id,
                'job_id'       => $beJob->id,
                'scheduled_at' => now()->addDays(5)->setHour(14)->setMinute(0),
                'type'         => 'Online',
                'status'       => 'Scheduled',
                'notes'        => 'Technical interview — Laravel & PostgreSQL.',
            ]);
        }

        if ($andi && $feJob) {
            Interview::create([
                'candidate_id' => $andi->id,
                'job_id'       => $feJob->id,
                'scheduled_at' => now()->subDays(5)->setHour(9)->setMinute(30),
                'type'         => 'Offline',
                'status'       => 'Done',
                'notes'        => 'Kantor Surabaya lt. 3.',
            ]);
        }
    }
}
