<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CandidateMatch extends Model
{
    use HasFactory;

    protected $table = 'matches';

    protected $fillable = [
        'candidate_id',
        'job_id',
        'score',
        'status',
    ];

    protected $casts = [
        'score' => 'integer',
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
