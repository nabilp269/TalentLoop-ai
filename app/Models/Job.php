<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Match as CandidateMatch;

class Job extends Model
{
    use HasFactory;

    protected $table = 'vacancies';

    protected $fillable = [
        'title',
        'department',
        'location',
        'type',
        'status',
        'description',
        'requirements',
        'salary_range',
        'deadline',
    ];

    protected $casts = [
        'requirements' => 'array',
        'deadline'     => 'date',
    ];

    public function interviews()
    {
        return $this->hasMany(Interview::class);
    }

    public function matches()
    {
        return $this->hasMany(CandidateMatch::class);
    }
}
