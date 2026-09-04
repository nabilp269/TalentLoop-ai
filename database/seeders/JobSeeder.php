<?php

namespace Database\Seeders;

use App\Models\Job;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'title'        => 'Senior Frontend Developer',
                'department'   => 'Engineering',
                'location'     => 'Surabaya / Remote',
                'type'         => 'Full-time',
                'status'       => 'Open',
                'description'  => 'Kami mencari Senior Frontend Developer yang berpengalaman dengan React dan ekosistemnya. Kandidat akan bertanggung jawab membangun antarmuka pengguna yang responsif dan berkinerja tinggi.',
                'requirements' => ['Pengalaman min. 3 tahun dengan React', 'Menguasai TypeScript', 'Familiar dengan REST API', 'Pengalaman dengan Git & CI/CD'],
                'salary_range' => '12–18 juta / bulan',
                'deadline'     => now()->addDays(30)->toDateString(),
            ],
            [
                'title'        => 'UI/UX Designer',
                'department'   => 'Design',
                'location'     => 'Surabaya',
                'type'         => 'Full-time',
                'status'       => 'Open',
                'description'  => 'Bergabunglah sebagai UI/UX Designer untuk menciptakan pengalaman pengguna yang intuitif dan menarik untuk produk-produk kami.',
                'requirements' => ['Pengalaman min. 2 tahun di bidang UI/UX', 'Menguasai Figma', 'Memiliki portofolio yang kuat', 'Mampu melakukan user research'],
                'salary_range' => '8–12 juta / bulan',
                'deadline'     => now()->addDays(21)->toDateString(),
            ],
            [
                'title'        => 'Backend Developer (Laravel)',
                'department'   => 'Engineering',
                'location'     => 'Remote',
                'type'         => 'Full-time',
                'status'       => 'Open',
                'description'  => 'Kami membutuhkan Backend Developer yang solid dengan Laravel untuk membangun dan memelihara API yang skalabel.',
                'requirements' => ['Pengalaman min. 2 tahun dengan Laravel', 'Menguasai MySQL/PostgreSQL', 'Memahami RESTful API design', 'Pengalaman dengan Redis/Queue'],
                'salary_range' => '10–15 juta / bulan',
                'deadline'     => now()->addDays(25)->toDateString(),
            ],
            [
                'title'        => 'Digital Marketing Specialist',
                'department'   => 'Marketing',
                'location'     => 'Jakarta',
                'type'         => 'Full-time',
                'status'       => 'Open',
                'description'  => 'Mencari Digital Marketing Specialist untuk mengelola strategi pemasaran digital perusahaan termasuk SEO, SEM, dan social media.',
                'requirements' => ['Pengalaman min. 2 tahun digital marketing', 'Menguasai Google Ads & Meta Ads', 'Familiar dengan SEO/SEM', 'Analytical thinking'],
                'salary_range' => '7–10 juta / bulan',
                'deadline'     => now()->addDays(14)->toDateString(),
            ],
            [
                'title'        => 'Data Analyst',
                'department'   => 'Data & Analytics',
                'location'     => 'Jakarta / Remote',
                'type'         => 'Full-time',
                'status'       => 'Open',
                'description'  => 'Posisi Data Analyst untuk menganalisis data bisnis dan memberikan insight yang actionable kepada stakeholder.',
                'requirements' => ['Pengalaman min. 2 tahun sebagai Data Analyst', 'Menguasai SQL dan Python', 'Pengalaman dengan Tableau / Power BI', 'Kemampuan storytelling data'],
                'salary_range' => '9–13 juta / bulan',
                'deadline'     => now()->addDays(20)->toDateString(),
            ],
            [
                'title'        => 'Product Manager',
                'department'   => 'Product',
                'location'     => 'Jakarta',
                'type'         => 'Full-time',
                'status'       => 'Draft',
                'description'  => 'Product Manager untuk memimpin pengembangan produk dari ideasi hingga launch.',
                'requirements' => ['Pengalaman min. 3 tahun sebagai PM', 'Familiar dengan Agile/Scrum', 'Strong analytical skills', 'Excellent communication'],
                'salary_range' => '15–22 juta / bulan',
                'deadline'     => now()->addDays(45)->toDateString(),
            ],
        ];

        foreach ($jobs as $data) {
            Job::create($data);
        }
    }
}
