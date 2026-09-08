<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\CandidateMatch;

class Candidate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'role',
        'location',
        'experience_years',
        'skills',
        'status',
        'score',
        'cv_path',
        'notes',
    ];

    protected $casts = [
        'skills'           => 'array',
        'experience_years' => 'integer',
        'score'            => 'integer',
    ];

    public function outreach()
    {
        return $this->hasMany(Outreach::class);
    }

    public function interviews()
    {
        return $this->hasMany(Interview::class);
    }

    public function matches()
    {
        return $this->hasMany(CandidateMatch::class);
    }

    /** Two-letter initials from name */
    public function getInitialsAttribute(): string
    {
        $parts = explode(' ', trim($this->name));
        if (count($parts) >= 2) {
            return strtoupper(substr($parts[0], 0, 1) . substr($parts[1], 0, 1));
        }
        return strtoupper(substr($this->name, 0, 2));
    }
}
