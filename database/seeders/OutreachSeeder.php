<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\Outreach;
use Illuminate\Database\Seeder;

class OutreachSeeder extends Seeder
{
    public function run(): void
    {
        $candidates = Candidate::whereIn('email', [
            'andi.pratama@email.com',
            'siti.rahma@email.com',
            'ahmad.rizky@email.com',
        ])->get()->keyBy('email');

        $data = [
            'andi.pratama@email.com' => [
                'channel' => 'Email',
                'status'  => 'Replied',
                'message' => 'Halo Andi, kami tertarik dengan profil Anda untuk posisi Frontend Developer. Apakah Anda berminat untuk berdiskusi lebih lanjut?',
                'sent_at' => now()->subDays(2),
            ],
            'siti.rahma@email.com' => [
                'channel' => 'WhatsApp',
                'status'  => 'Opened',
                'message' => 'Halo Siti, profil Anda sangat sesuai dengan kebutuhan kami untuk posisi UI/UX Designer.',
                'sent_at' => now()->subDays(1),
            ],
            'ahmad.rizky@email.com' => [
                'channel' => 'LinkedIn',
                'status'  => 'Sent',
                'message' => 'Hi Ahmad, we came across your profile and would love to discuss an exciting opportunity.',
                'sent_at' => now()->subHours(3),
            ],
        ];

        foreach ($data as $email => $outreach) {
            $candidate = $candidates[$email] ?? null;
            if ($candidate) {
                Outreach::create([
                    'candidate_id' => $candidate->id,
                    ...$outreach,
                ]);
            }
        }
    }
}
