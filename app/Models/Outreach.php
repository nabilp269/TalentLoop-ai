<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Outreach extends Model
{
    use HasFactory;

    protected $table = 'outreach';

    protected $fillable = [
        'candidate_id',
        'channel',
        'status',
        'message',
        'sent_at',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
    ];

    public function candidate()
    {
        return $this->belongsTo(Candidate::class);
    }
}
