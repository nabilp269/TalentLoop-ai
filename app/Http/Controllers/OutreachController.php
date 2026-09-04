<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Outreach;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutreachController extends Controller
{
    public function index()
    {
        $outreaches = Outreach::with('candidate')
            ->latest()
            ->get()
            ->map(fn ($o) => [
                'id'        => $o->id,
                'channel'   => $o->channel,
                'status'    => $o->status,
                'message'   => $o->message,
                'sent_at'   => $o->sent_at?->format('d M Y, H:i'),
                'candidate' => [
                    'id'       => $o->candidate->id,
                    'name'     => $o->candidate->name,
                    'role'     => $o->candidate->role,
                    'initials' => $o->candidate->initials,
                ],
            ]);

        return Inertia::render('Outreach/Index', [
            'outreaches' => $outreaches,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'candidate_id' => 'required|exists:candidates,id',
            'channel'      => 'required|in:Email,WhatsApp,LinkedIn',
            'message'      => 'required|string',
        ]);

        Outreach::create([
            'candidate_id' => $data['candidate_id'],
            'channel'      => $data['channel'],
            'message'      => $data['message'],
            'status'       => 'Sent',
            'sent_at'      => now(),
        ]);

        return back()->with('success', 'Outreach berhasil dikirim.');
    }
}
