<?php

namespace Database\Seeders;

use App\Models\Candidate;
use Illuminate\Database\Seeder;

class CandidateSeeder extends Seeder
{
    public function run(): void
    {
        $candidates = [
            [
                'name'             => 'Andi Pratama',
                'email'            => 'andi.pratama@email.com',
                'phone'            => '081234567801',
                'role'             => 'Frontend Developer',
                'location'         => 'Surabaya, Indonesia',
                'experience_years' => 2,
                'skills'           => ['React', 'JavaScript', 'Figma'],
                'status'           => 'Available',
                'score'            => 94,
            ],
            [
                'name'             => 'Siti Rahma',
                'email'            => 'siti.rahma@email.com',
                'phone'            => '081234567802',
                'role'             => 'UI/UX Designer',
                'location'         => 'Malang, Indonesia',
                'experience_years' => 3,
                'skills'           => ['Figma', 'UI/UX', 'Prototyping'],
                'status'           => 'Available',
                'score'            => 91,
            ],
            [
                'name'             => 'Budi Santoso',
                'email'            => 'budi.santoso@email.com',
                'phone'            => '081234567803',
                'role'             => 'Backend Developer',
                'location'         => 'Sidoarjo, Indonesia',
                'experience_years' => 2,
                'skills'           => ['Laravel', 'PHP', 'PostgreSQL'],
                'status'           => 'Interview',
                'score'            => 87,
            ],
            [
                'name'             => 'Dinda Ayu',
                'email'            => 'dinda.ayu@email.com',
                'phone'            => '081234567804',
                'role'             => 'Product Designer',
                'location'         => 'Surabaya, Indonesia',
                'experience_years' => 4,
                'skills'           => ['Figma', 'Design System', 'Research'],
                'status'           => 'Available',
                'score'            => 89,
            ],
            [
                'name'             => 'Rizky Maulana',
                'email'            => 'rizky.maulana@email.com',
                'phone'            => '081234567805',
                'role'             => 'Full Stack Developer',
                'location'         => 'Jakarta, Indonesia',
                'experience_years' => 3,
                'skills'           => ['Laravel', 'React', 'MySQL'],
                'status'           => 'Hired',
                'score'            => 96,
            ],
            [
                'name'             => 'Nadia Putri',
                'email'            => 'nadia.putri@email.com',
                'phone'            => '081234567806',
                'role'             => 'Digital Marketing',
                'location'         => 'Bandung, Indonesia',
                'experience_years' => 2,
                'skills'           => ['SEO', 'Social Media', 'Analytics'],
                'status'           => 'Available',
                'score'            => 85,
            ],
            [
                'name'             => 'Fajar Ramadhan',
                'email'            => 'fajar.ramadhan@email.com',
                'phone'            => '081234567807',
                'role'             => 'Frontend Developer',
                'location'         => 'Surabaya, Indonesia',
                'experience_years' => 3,
                'skills'           => ['React', 'Node.js', 'TypeScript'],
                'status'           => 'Available',
                'score'            => 88,
            ],
            [
                'name'             => 'Ahmad Rizky',
                'email'            => 'ahmad.rizky@email.com',
                'phone'            => '081234567808',
                'role'             => 'Frontend Developer',
                'location'         => 'Surabaya, Indonesia',
                'experience_years' => 2,
                'skills'           => ['React', 'Laravel', 'JavaScript'],
                'status'           => 'Available',
                'score'            => 92,
            ],
            [
                'name'             => 'Dimas Pratama',
                'email'            => 'dimas.pratama@email.com',
                'phone'            => '081234567809',
                'role'             => 'Backend Developer',
                'location'         => 'Yogyakarta, Indonesia',
                'experience_years' => 4,
                'skills'           => ['Laravel', 'Vue', 'PostgreSQL'],
                'status'           => 'Interview',
                'score'            => 84,
            ],
            [
                'name'             => 'Putri Wulandari',
                'email'            => 'putri.wulandari@email.com',
                'phone'            => '081234567810',
                'role'             => 'Data Analyst',
                'location'         => 'Jakarta, Indonesia',
                'experience_years' => 3,
                'skills'           => ['Python', 'SQL', 'Tableau'],
                'status'           => 'Available',
                'score'            => 90,
            ],
        ];

        foreach ($candidates as $data) {
            Candidate::create($data);
        }
    }
}
