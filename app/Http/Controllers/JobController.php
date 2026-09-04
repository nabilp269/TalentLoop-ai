<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('department', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $jobs = $query->withCount('matches')->latest()->get()->map(fn ($j) => [
            'id'           => $j->id,
            'title'        => $j->title,
            'department'   => $j->department,
            'location'     => $j->location,
            'type'         => $j->type,
            'status'       => $j->status,
            'salary_range' => $j->salary_range,
            'deadline'     => $j->deadline?->format('d M Y'),
            'matches_count'=> $j->matches_count,
            'requirements' => $j->requirements ?? [],
        ]);

        return Inertia::render('Jobs/Index', [
            'jobs'    => $jobs,
            'filters' => $request->only('search', 'status'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Jobs/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'        => 'required|string|max:255',
            'department'   => 'nullable|string|max:255',
            'location'     => 'nullable|string|max:255',
            'type'         => 'nullable|in:Full-time,Part-time,Contract,Internship',
            'status'       => 'nullable|in:Open,Closed,Draft',
            'description'  => 'nullable|string',
            'requirements' => 'nullable|array',
            'requirements.*' => 'string|max:255',
            'salary_range' => 'nullable|string|max:100',
            'deadline'     => 'nullable|date',
        ]);

        $data['status'] = $data['status'] ?? 'Open';
        $data['type']   = $data['type'] ?? 'Full-time';

        $job = Job::create($data);

        return redirect()->route('jobs.show', $job)
            ->with('success', 'Lowongan berhasil dibuat.');
    }

    public function show(Job $job)
    {
        $job->load(['interviews.candidate', 'matches.candidate']);

        return Inertia::render('Jobs/Show', [
            'job' => [
                'id'           => $job->id,
                'title'        => $job->title,
                'department'   => $job->department,
                'location'     => $job->location,
                'type'         => $job->type,
                'status'       => $job->status,
                'description'  => $job->description,
                'requirements' => $job->requirements ?? [],
                'salary_range' => $job->salary_range,
                'deadline'     => $job->deadline?->format('d M Y'),
                'interviews'   => $job->interviews,
                'matches'      => $job->matches->map(fn ($m) => [
                    'id'        => $m->id,
                    'score'     => $m->score,
                    'status'    => $m->status,
                    'candidate' => [
                        'id'       => $m->candidate->id,
                        'name'     => $m->candidate->name,
                        'role'     => $m->candidate->role,
                        'initials' => $m->candidate->initials,
                    ],
                ]),
            ],
        ]);
    }

    public function destroy(Job $job)
    {
        $job->delete();

        return redirect()->route('jobs.index')
            ->with('success', 'Lowongan berhasil dihapus.');
    }
}
