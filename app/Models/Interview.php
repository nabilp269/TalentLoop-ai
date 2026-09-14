<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $fillable = [
        'candidate_id',
        'job_id',
        'scheduled_at',
        'type',
        'status',
        'decision',
        'notes',
        'recording_path',
        'recorded_at',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'recorded_at' => 'datetime',
    ];

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}
