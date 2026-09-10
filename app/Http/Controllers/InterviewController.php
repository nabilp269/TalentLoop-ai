<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Interview;
use App\Models\Job;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InterviewController extends Controller
{
    public function index(Request $request)
    {
        $query = Interview::with(['candidate', 'job']);

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $interviews = $query->latest('scheduled_at')->get()->map(fn ($i) => [
            'id'           => $i->id,
            'type'         => $i->type,
            'status'       => $i->status,
            'scheduled_at' => $i->scheduled_at->format('d M Y, H:i'),
            'notes'        => $i->notes,
            'candidate'    => [
                'id'       => $i->candidate->id,
                'name'     => $i->candidate->name,
                'role'     => $i->candidate->role,
                'initials' => $i->candidate->initials,
            ],
            'job' => [
                'id'    => $i->job->id,
                'title' => $i->job->title,
            ],
        ]);

        return Inertia::render('Interviews/Index', [
            'interviews' => $interviews,
            'filters'    => $request->only('status'),
        ]);
    }

    public function create(Request $request)
    {
        $candidates = Candidate::select('id', 'name', 'role')->orderBy('name')->get();
        $jobs       = Job::select('id', 'title')->where('status', 'Open')->orderBy('title')->get();

        return Inertia::render('Interviews/Create', [
            'candidates'         => $candidates,
            'jobs'               => $jobs,
            'defaultCandidateId' => $request->input('candidate_id'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'job_id'       => 'required|exists:vacancies,id',
            'scheduled_at' => 'required|date',
            'type'         => 'required|in:Online,Offline,Phone',
            'notes'        => 'nullable|string',
        ], [
            'candidate_id.required' => 'Pilih kandidat terlebih dahulu.',
            'candidate_id.exists'   => 'Kandidat yang dipilih tidak valid.',
            'job_id.required'       => 'Pilih posisi / lowongan terlebih dahulu.',
            'job_id.exists'         => 'Posisi / lowongan yang dipilih tidak valid.',
            'scheduled_at.required' => 'Waktu interview wajib diisi.',
            'type.required'         => 'Pilih tipe interview.',
        ]);

        $data['status'] = 'Scheduled';

        // update candidate status
        Candidate::find($data['candidate_id'])->update(['status' => 'Interview']);

        Interview::create($data);

        return redirect()->route('interviews.index')
            ->with('success', 'Interview berhasil dijadwalkan.');
    }

    public function update(Request $request, Interview $interview)
    {
        $data = $request->validate([
            'status' => 'required|in:Scheduled,Done,Cancelled',
            'notes'  => 'nullable|string',
        ]);

        $interview->update($data);

        return back()->with('success', 'Status interview diperbarui.');
    }
}
