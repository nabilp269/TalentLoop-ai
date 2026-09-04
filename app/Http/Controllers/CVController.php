<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CVController extends Controller
{
    public function import()
    {
        return Inertia::render('CV/Import');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name'             => 'required|string|max:255',
            'email'            => 'required|email|unique:candidates,email',
            'phone'            => 'nullable|string|max:30',
            'role'             => 'required|string|max:255',
            'location'         => 'nullable|string|max:255',
            'experience_years' => 'nullable|integer|min:0|max:50',
            'skills'           => 'nullable|string', // comma-separated from form
            'cv_file'          => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'notes'            => 'nullable|string',
        ]);

        $cvPath = null;
        if ($request->hasFile('cv_file')) {
            $cvPath = $request->file('cv_file')->store('cvs', 'public');
        }

        // parse comma-separated skills into array
        $skills = [];
        if ($request->filled('skills')) {
            $skills = array_map('trim', explode(',', $request->input('skills')));
            $skills = array_filter($skills);
        }

        Candidate::create([
            'name'             => $request->name,
            'email'            => $request->email,
            'phone'            => $request->phone,
            'role'             => $request->role,
            'location'         => $request->location,
            'experience_years' => $request->experience_years ?? 0,
            'skills'           => array_values($skills),
            'status'           => 'Available',
            'score'            => 0,
            'cv_path'          => $cvPath,
            'notes'            => $request->notes,
        ]);

        return redirect()->route('candidates.index')
            ->with('success', 'CV berhasil di-import. Kandidat ditambahkan.');
    }
}
