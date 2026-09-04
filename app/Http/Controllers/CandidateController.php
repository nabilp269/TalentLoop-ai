<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Job;
use App\Models\Outreach;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateController extends Controller
{
    public function index(Request $request)
    {
        $query = Candidate::query();

        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('role', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $candidates = $query->latest()->get()->map(fn ($c) => [
            'id'               => $c->id,
            'name'             => $c->name,
            'email'            => $c->email,
            'phone'            => $c->phone,
            'role'             => $c->role,
            'location'         => $c->location,
            'experience_years' => $c->experience_years,
            'skills'           => $c->skills ?? [],
            'status'           => $c->status,
            'score'            => $c->score,
            'initials'         => $c->initials,
            'cv_path'          => $c->cv_path,
        ]);

        return Inertia::render('Candidates/Index', [
            'candidates' => $candidates,
            'filters'    => $request->only('search', 'status'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Candidates/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'             => 'required|string|max:255',
            'email'            => 'required|email|unique:candidates,email',
            'phone'            => 'nullable|string|max:30',
            'role'             => 'required|string|max:255',
            'location'         => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0|max:50',
            'skills'           => 'nullable|array',
            'skills.*'         => 'string|max:50',
            'status'           => 'nullable|in:Available,Interview,Hired,Rejected',
            'notes'            => 'nullable|string',
        ]);

        $data['skills']  = $data['skills'] ?? [];
        $data['score']   = 0;
        $data['status']  = $data['status'] ?? 'Available';

        $candidate = Candidate::create($data);

        return redirect()->route('candidates.show', $candidate)
            ->with('success', 'Kandidat berhasil ditambahkan.');
    }

    public function show(Candidate $candidate)
    {
        $candidate->load(['outreach', 'interviews.job']);

        return Inertia::render('Candidates/Show', [
            'candidate' => [
                'id'               => $candidate->id,
                'name'             => $candidate->name,
                'email'            => $candidate->email,
                'phone'            => $candidate->phone,
                'role'             => $candidate->role,
                'location'         => $candidate->location,
                'experience_years' => $candidate->experience_years,
                'skills'           => $candidate->skills ?? [],
                'status'           => $candidate->status,
                'score'            => $candidate->score,
                'initials'         => $candidate->initials,
                'cv_path'          => $candidate->cv_path,
                'notes'            => $candidate->notes,
                'outreach'         => $candidate->outreach,
                'interviews'       => $candidate->interviews,
            ],
        ]);
    }

    public function update(Request $request, Candidate $candidate)
    {
        $data = $request->validate([
            'name'             => 'sometimes|string|max:255',
            'email'            => 'sometimes|email|unique:candidates,email,' . $candidate->id,
            'phone'            => 'nullable|string|max:30',
            'role'             => 'sometimes|string|max:255',
            'location'         => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0|max:50',
            'skills'           => 'nullable|array',
            'status'           => 'nullable|in:Available,Interview,Hired,Rejected',
            'notes'            => 'nullable|string',
        ]);

        $candidate->update($data);

        return back()->with('success', 'Kandidat berhasil diperbarui.');
    }

    public function destroy(Candidate $candidate)
    {
        $candidate->delete();

        return redirect()->route('candidates.index')
            ->with('success', 'Kandidat berhasil dihapus.');
    }
}
