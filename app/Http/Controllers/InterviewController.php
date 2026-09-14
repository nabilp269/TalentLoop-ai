<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Interview;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
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
            'decision'     => $i->decision,
            'scheduled_at' => $i->scheduled_at->format('d M Y, H:i'),
            'notes'        => $i->notes,
            'recording_url' => $i->recording_path ? Storage::disk('public')->url($i->recording_path) : null,
            'recorded_at'   => $i->recorded_at?->format('d M Y, H:i'),
            'candidate'    => [
                'id'       => $i->candidate->id,
                'name'     => $i->candidate->name,
                'role'     => $i->candidate->role,
                'initials' => $i->candidate->initials,
                'email'    => $i->candidate->email,
                'phone'    => $i->candidate->phone,
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

    public function session(Interview $interview)
    {
        $interview->load(['candidate', 'job']);

        return Inertia::render('Interviews/Session', [
            'interview' => [
                'id' => $interview->id,
                'type' => $interview->type,
                'status' => $interview->status,
                'notes' => $interview->notes,
                'recording_url' => $interview->recording_path ? Storage::disk('public')->url($interview->recording_path) : null,
                'recorded_at' => $interview->recorded_at?->format('d M Y, H:i'),
                'scheduled_at' => $interview->scheduled_at->format('d M Y, H:i'),
                'candidate' => [
                    'id' => $interview->candidate->id,
                    'name' => $interview->candidate->name,
                    'role' => $interview->candidate->role,
                    'email' => $interview->candidate->email,
                    'phone' => $interview->candidate->phone,
                ],
                'job' => [
                    'id' => $interview->job->id,
                    'title' => $interview->job->title,
                ],
            ],
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
            'status' => 'sometimes|required|in:Interview,Done,Cancelled',
            'notes'  => 'nullable|string',
            'decision' => 'nullable|in:Hired,Rejected,Consideration',
        ]);

        // Notes can be saved throughout an active interview without changing its status.
        if (! isset($data['status'])) {
            $interview->update($data);

            return back()->with('success', 'Catatan interview disimpan.');
        }

        $allowedTransitions = [
            'Scheduled' => ['Interview'],
            'Interview' => ['Done', 'Cancelled'],
        ];

        if (! in_array($data['status'], $allowedTransitions[$interview->status] ?? [], true)) {
            throw ValidationException::withMessages([
                'status' => 'Status interview tidak dapat diubah melalui tahap ini.',
            ]);
        }

        if ($data['status'] === 'Done' && empty($data['decision'])) {
            throw ValidationException::withMessages([
                'decision' => 'Pilih hasil interview terlebih dahulu.',
            ]);
        }

        $interview->update($data);

        if ($data['status'] === 'Done') {
            $candidateStatus = match ($data['decision']) {
                'Hired' => 'Hired',
                'Rejected' => 'Rejected',
                default => 'Interview',
            };

            $interview->candidate->update(['status' => $candidateStatus]);
        }

        return back()->with('success', 'Hasil interview berhasil disimpan.');
    }

    public function storeRecording(Request $request, Interview $interview)
    {
        $data = $request->validate([
            'recording' => 'required|file|mimetypes:video/webm,video/mp4,video/quicktime,audio/webm,audio/ogg,audio/mpeg,audio/mp4|max:512000',
        ], [
            'recording.required' => 'File rekaman wajib diunggah.',
            'recording.max' => 'Ukuran rekaman maksimal 500 MB.',
        ]);

        if ($interview->recording_path) {
            Storage::disk('public')->delete($interview->recording_path);
        }

        $path = $data['recording']->store("interview-recordings/{$interview->id}", 'public');
        $interview->update(['recording_path' => $path, 'recorded_at' => now()]);

        return back()->with('success', 'Rekaman interview berhasil disimpan.');
    }
}
